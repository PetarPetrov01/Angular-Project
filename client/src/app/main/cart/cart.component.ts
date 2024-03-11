import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // this.apiService.getProductsInCart();
    // this.products = prods;
  }
}
