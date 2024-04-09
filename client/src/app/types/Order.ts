import { APIProduct } from './Product';

interface OrderProduct {
  product: string;
  count: number;
}

export interface Order extends Array<OrderProduct> {}

export interface APIOrderProduct extends Omit<OrderProduct,'product'>{
  _id: string,
  product: APIProduct
}

export interface APIOrder {
  _id: string;
  products: APIOrderProduct[];
  createdAt: string;
}
