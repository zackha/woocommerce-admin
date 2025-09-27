export function getAuthHeader(event: any) {
  const { wcKey, wcSecret } = useRuntimeConfig(event);
  if (!wcKey || !wcSecret) {
    throw createError({ statusCode: 500, statusMessage: 'Woo credentials not configured' });
  }
  return 'Basic ' + Buffer.from(`${wcKey}:${wcSecret}`, 'utf-8').toString('base64');
}

export function getBaseUrl(event: any) {
  const { wcUrl } = useRuntimeConfig(event);
  const base = String(wcUrl || '').replace(/\/+$/, '');
  if (!base) throw createError({ statusCode: 500, statusMessage: 'Woo base URL not configured' });
  let u: URL;
  try {
    u = new URL(base);
  } catch {
    throw createError({ statusCode: 500, statusMessage: 'Invalid wcUrl' });
  }
  if (u.protocol !== 'https:') throw createError({ statusCode: 500, statusMessage: 'wcUrl must use HTTPS' });
  return `${base}/wp-json/wc/v3`;
}

export async function wcFetchRaw(event: any, path: string, opts: { method?: string; params?: any; body?: any } = {}) {
  const headers: Record<string, string> = {
    Authorization: getAuthHeader(event),
    Accept: 'application/json',
  };
  if (opts.body) headers['Content-Type'] = 'application/json';

  const base = getBaseUrl(event);
  const res = await $fetch.raw(base + path, {
    method: (opts.method || 'GET') as
      | 'GET'
      | 'HEAD'
      | 'PATCH'
      | 'POST'
      | 'PUT'
      | 'DELETE'
      | 'CONNECT'
      | 'OPTIONS'
      | 'TRACE'
      | 'get'
      | 'head'
      | 'patch'
      | 'post'
      | 'put'
      | 'delete'
      | 'connect'
      | 'options'
      | 'trace',
    params: opts.params,
    body: opts.body,
    headers,
    timeout: 10_000,
  });
  return res;
}
