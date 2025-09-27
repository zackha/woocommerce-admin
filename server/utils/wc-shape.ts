export function firstImage(p: any) {
  const img = Array.isArray(p?.images) && p.images[0] ? p.images[0] : null;
  return img ? { id: img.id, src: img.src, alt: img.alt || img.name || '' } : null;
}

export function stripHtml(s?: string) {
  return String(s || '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

// Orders
export function shapeOrderListItem(o: any) {
  return {
    id: o.id,
    status: o.status,
    total: o.total,
    currency: o.currency,
    date_created: o.date_created,
    billing: {
      first_name: o?.billing?.first_name ?? undefined,
      last_name: o?.billing?.last_name ?? undefined,
      email: o?.billing?.email ?? undefined,
      phone: o?.billing?.phone ?? undefined,
    },
  };
}

export function shapeOrderDetail(o: any) {
  return {
    ...shapeOrderListItem(o),
    line_items: Array.isArray(o?.line_items) ? o.line_items.map((li: any) => ({ id: li.id, name: li.name, quantity: li.quantity, total: li.total })) : [],
  };
}

export function shapeNote(n: any) {
  return { id: n.id, note: n.note, date_created: n.date_created };
}

// Products
export function shapeProductListItem(p: any) {
  return {
    id: p.id,
    name: p.name,
    status: p.status,
    price: p.price,
    regular_price: p.regular_price,
    sale_price: p.sale_price,
    stock_status: p.stock_status,
    stock_quantity: p.stock_quantity ?? null,
    manage_stock: !!p.manage_stock,
    date_created: p.date_created,
    image: firstImage(p),
  };
}

export function shapeProductDetail(p: any) {
  return {
    ...shapeProductListItem(p),
    images: Array.isArray(p?.images) ? p.images.map((img: any) => ({ id: img.id, src: img.src, alt: img.alt || img.name || '' })) : [],
    description: stripHtml(p.description),
  };
}
