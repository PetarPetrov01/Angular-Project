import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { State, Store } from '@ngrx/store';
import { CartState, StateProduct } from '../../types/State';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import * as CartActions from '../cart/cart.actions'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  products$ = new Observable<StateProduct[]>();

  constructor(private apiService: ApiService, private store: Store<CartState>) {
    this.products$ = this.store.select('cart');
    this.products$.subscribe(prods=> console.log(prods));
  }

  handleIncreaseQuantity(currentProduct: StateProduct){
    this.store.dispatch(CartActions.addItem({product: currentProduct,qty: 1}))
  }

  handleDecreaseQuantity(currentProduct: StateProduct){
    if (currentProduct.quantity <=1){
      this.store.dispatch(CartActions.removeItem({productId: currentProduct._id}))
    } else {
      this.store.dispatch(CartActions.decreaseQuantity({productId : currentProduct._id}))
    }
  }


  ngOnInit(): void {
    // this.apiService.getProductsInCart();
    // this.products = prods;
  }
}
