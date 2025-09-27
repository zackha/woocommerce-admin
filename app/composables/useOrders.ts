export type Order = {
  id: number;
  status: string;
  total: string;
  currency: string;
  date_created: string;
  billing?: { first_name?: string; last_name?: string; email?: string; phone?: string };
  line_items?: Array<{ id: number; name: string; quantity: number; total: string }>;
};

export const useOrders = () => {
  const { call } = useWoo();
  const list = (params: { page?: number; per_page?: number; status?: string; search?: string }) => call<Order[]>(`/orders`, { method: 'GET', query: params });
  const getById = (id: string | number) => call<Order>(`/orders/${id}`, { method: 'GET' });
  const getNotes = (id: string | number) => call<any[]>(`/orders/${id}/notes`, { method: 'GET' });
  const updateStatus = (id: string | number, status: string) => call<Order>(`/orders/${id}`, { method: 'PUT', body: { status } });
  const addNote = (id: string | number, note: string) => call(`/orders/${id}/notes`, { method: 'POST', body: { note, customer_note: false } });
  return { list, getById, getNotes, updateStatus, addNote };
};
