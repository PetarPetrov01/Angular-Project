import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { APIProduct } from '../../types/Product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  
products$: Observable<APIProduct[]>;

  constructor(apiService: ApiService){
    this.products$ = apiService.getProducts();
  }

}
