interface OrderProduct {
  product: string;
  count: number;
}

export interface Order extends Array<OrderProduct> {}
