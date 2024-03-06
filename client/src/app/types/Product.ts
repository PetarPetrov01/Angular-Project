export interface Product {
  name: string;
  description: string;
  image: string;
  category: string[];
  style: string;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  material: string[];
  color: string;
  price: number;
}

export interface APIProduct extends Product{
  _id: string;
  _ownerId: string;
  __v: string;
}

