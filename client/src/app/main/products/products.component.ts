import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, tap } from 'rxjs';
import { APIProduct } from '../../types/Product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products$: Observable<APIProduct[]> | null;

  constructor(apiService: ApiService) {
    this.products$ = apiService.getProducts()
    // this.products$ = null // Test empty arr;
  }
}
