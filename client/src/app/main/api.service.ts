import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIProduct, PopulatedProduct, Product } from '../types/Product';
import { tap } from 'rxjs';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProducts(params: Params) {
    return this.http.get<APIProduct[]>('/api/products', { params });
  }

  getProduct(productId: string) {
    return this.http.get<PopulatedProduct>(`/api/products/${productId}`).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  addProduct(data: Product) {
    return this.http.post<APIProduct>('/api/products', data);
  }

  updateProduct(productId: string, data: Product) {
    return this.http.put<APIProduct>(`/api/products/${productId}`, data);
  }
}
