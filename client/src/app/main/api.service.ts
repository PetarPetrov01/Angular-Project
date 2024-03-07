import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIProduct, PopulatedProduct, Product } from '../types/Product';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<APIProduct[]>('/api/products');
  }

  getProduct(productId: string){
    console.log(productId);
    return this.http.get<PopulatedProduct>(`/api/products/${productId}`).pipe(tap(res=>{
      console.log('From api')
      console.log(res);
    }))
  }

  addProduct(data: Product) {
   return this.http.post<APIProduct>('/api/products', data);
  }
}
