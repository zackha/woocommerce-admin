import { wcFetchRaw } from '~~/server/utils/wc';
import { pickListQuery, ORDER_STATUSES, PRODUCT_STATUSES, isNumericId } from '~~/server/utils/validate';
import { shapeOrderListItem, shapeOrderDetail, shapeNote, shapeProductListItem, shapeProductDetail } from '~~/server/utils/wc-shape';

export default defineEventHandler(async event => {
  const method = (event.method || 'GET').toUpperCase();
  const raw = (event.context.params?.path ?? '') as string | string[];
  const subpath = Array.isArray(raw) ? raw.join('/') : raw;
  const clean = String(subpath || '').replace(/^\/+/, '');
  const seg = clean.split('/');
  const q = getQuery(event);

  // ===== ORDERS =====
  if (seg[0] === 'orders') {
    // GET /orders
    if (seg.length === 1) {
      if (method !== 'GET') throw createError({ statusCode: 405, statusMessage: 'Method not allowed' });
      const params = pickListQuery(q as Record<string, any>, ORDER_STATUSES);
      const res = await wcFetchRaw(event, '/orders', { params });
      const total = res.headers.get('x-wp-total');
      const totalPages = res.headers.get('x-wp-totalpages');
      if (total) setResponseHeader(event, 'x-wp-total', total);
      if (totalPages) setResponseHeader(event, 'x-wp-totalpages', totalPages);
      const data = Array.isArray(res._data) ? res._data.map(shapeOrderListItem) : [];
      return { data, meta: { total: total ? Number(total) : undefined, totalPages: totalPages ? Number(totalPages) : undefined } };
    }

    // /orders/:id
    if (seg.length === 2 && isNumericId(seg[1])) {
      const id = seg[1];

      if (method === 'GET') {
        const res = await wcFetchRaw(event, `/orders/${id}`);
        return { data: shapeOrderDetail(res._data) };
      }

      if (method === 'PUT') {
        const body = await readBody(event);
        const status = body?.status ? String(body.status) : undefined;
        if (!status || !ORDER_STATUSES.has(status)) throw createError({ statusCode: 400, statusMessage: 'Invalid status' });
        const res = await wcFetchRaw(event, `/orders/${id}`, { method: 'PUT', body: { status } });
        return { data: shapeOrderDetail(res._data) };
      }

      throw createError({ statusCode: 405, statusMessage: 'Method not allowed' });
    }

    // /orders/:id/notes
    if (seg.length === 3 && isNumericId(seg[1]) && seg[2] === 'notes') {
      const id = seg[1];
      if (method === 'GET') {
        const res = await wcFetchRaw(event, `/orders/${id}/notes`);
        const data = Array.isArray(res._data) ? res._data.map(shapeNote) : [];
        return { data };
      }
      if (method === 'POST') {
        const body = await readBody(event);
        const note = (body?.note ? String(body.note) : '').trim();
        const customer_note = Boolean(body?.customer_note ?? false);
        if (!note) throw createError({ statusCode: 400, statusMessage: 'Note is required' });
        if (note.length > 5000) throw createError({ statusCode: 400, statusMessage: 'Note too long' });
        const res = await wcFetchRaw(event, `/orders/${id}/notes`, { method: 'POST', body: { note, customer_note } });
        return { data: shapeNote(res._data) };
      }
      throw createError({ statusCode: 405, statusMessage: 'Method not allowed' });
    }

    throw createError({ statusCode: 404, statusMessage: 'Not allowed path' });
  }

  // ===== PRODUCTS (READ-ONLY) =====
  if (seg[0] === 'products') {
    // /products
    if (seg.length === 1) {
      if (method !== 'GET') throw createError({ statusCode: 405, statusMessage: 'Method not allowed' });
      const params = pickListQuery(q as Record<string, any>, PRODUCT_STATUSES);
      const res = await wcFetchRaw(event, '/products', { params });
      const total = res.headers.get('x-wp-total');
      const totalPages = res.headers.get('x-wp-totalpages');
      if (total) setResponseHeader(event, 'x-wp-total', total);
      if (totalPages) setResponseHeader(event, 'x-wp-totalpages', totalPages);
      const data = Array.isArray(res._data) ? res._data.map(shapeProductListItem) : [];
      return { data, meta: { total: total ? Number(total) : undefined, totalPages: totalPages ? Number(totalPages) : undefined } };
    }

    // /products/:id
    if (seg.length === 2 && isNumericId(seg[1])) {
      const id = seg[1];
      if (method !== 'GET') throw createError({ statusCode: 405, statusMessage: 'Method not allowed' });
      const res = await wcFetchRaw(event, `/products/${id}`);
      return { data: shapeProductDetail(res._data) };
    }

    throw createError({ statusCode: 404, statusMessage: 'Not allowed path' });
  }

  // default
  throw createError({ statusCode: 404, statusMessage: 'Not allowed path' });
});
