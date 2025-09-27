export const ORDER_STATUSES = new Set(['pending', 'processing', 'completed', 'on-hold', 'cancelled', 'refunded', 'failed', 'trash']);
export const PRODUCT_STATUSES = new Set(['publish', 'draft', 'pending', 'private']);

export const isNumericId = (s: string) => /^[0-9]+$/.test(s);
const clampInt = (n: any, min: number, max: number) => {
  const v = Number.parseInt(String(n), 10);
  if (Number.isNaN(v)) return undefined;
  return Math.min(Math.max(v, min), max);
};

export function pickListQuery(q: Record<string, any>, statuses?: Set<string>) {
  const out: Record<string, any> = {};
  const page = clampInt(q.page, 1, 100000);
  const per_page = clampInt(q.per_page, 1, 100); // WP REST upper bound: 100
  const status = q.status ? String(q.status) : undefined;
  const search = q.search ? String(q.search) : undefined;

  if (page) out.page = page;
  if (per_page) out.per_page = per_page;

  if (status) {
    if (statuses && !statuses.has(status)) throw createError({ statusCode: 400, statusMessage: 'Invalid status' });
    out.status = status;
  }

  if (search) {
    if (search.length > 60) throw createError({ statusCode: 400, statusMessage: 'Search too long' });
    out.search = search;
  }
  return out;
}
