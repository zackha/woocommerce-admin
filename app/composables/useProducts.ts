export type Product = {
  id: number;
  name: string;
  status: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  stock_quantity: number | null;
  manage_stock: boolean;
  date_created: string;
  image: { id: number; src: string; alt: string } | null;
};
export type ProductDetail = Product & { images: Array<{ id: number; src: string; alt: string }>; description: string };

export const useProducts = () => {
  const { call } = useWoo();
  const list = (params: { page?: number; per_page?: number; status?: string; search?: string }) => call<Product[]>(`/products`, { method: 'GET', query: params });
  const getById = (id: string | number) => call<ProductDetail>(`/products/${id}`, { method: 'GET' });
  return { list, getById };
};
