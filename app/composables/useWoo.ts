export type FetchOptions = { method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; query?: Record<string, any>; body?: any };

export const useWoo = () => {
  const call = async <T = any>(path: string, opts: FetchOptions = {}) => {
    return $fetch<{ data: T; meta?: any }>(`/api/woo${path}`, {
      method: opts.method || 'GET',
      query: opts.query,
      body: opts.body,
    });
  };
  return { call };
};
