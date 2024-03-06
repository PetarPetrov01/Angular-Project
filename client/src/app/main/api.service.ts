import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIProduct, Product } from '../types/Product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<APIProduct[]>('/api/products');
  }

  addProduct(data: Product) {
   return this.http.post<APIProduct>('/api/products', data);
  }
}
