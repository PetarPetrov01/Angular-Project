import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { State, Store } from '@ngrx/store';
import { CartState, StateProduct } from '../../types/State';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

import * as CartActions from '../cart/cart.actions';
import { PopulatedProduct } from '../../types/Product';
import { MatDialog } from '@angular/material/dialog';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  products$ = new Observable<StateProduct[]>();
  products: StateProduct[] | null = null;

  prodsSubscription: Subscription | null = null;

  constructor(
    private store: Store<CartState>,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {
    this.products$ = this.store.select('cart');
    this.prodsSubscription = this.products$.subscribe((prods) => {
      this.products = prods;
    });
  }

  handleIncreaseQuantity(currentProduct: StateProduct) {
    this.store.dispatch(
      CartActions.addItem({ product: currentProduct, qty: 1 })
    );
  }

  handleDecreaseQuantity(currentProduct: StateProduct) {
    if (currentProduct.quantity <= 1) {
      this.matDialog.open(RemoveDialogComponent, {
        width: '300px',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '200ms',
        data: {
          productName: currentProduct?.name,
          _id: currentProduct?._id,
        },
      });
    } else {
      this.store.dispatch(
        CartActions.decreaseQuantity({ productId: currentProduct._id })
      );
    }
  }

  handleRemove(currentProduct: StateProduct){
    this.matDialog.open(RemoveDialogComponent, {
      width: '300px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms',
      data: {
        productName: currentProduct?.name,
        _id: currentProduct?._id,
      },
    });
  }

  get totalCount() {
    return this.products?.reduce((acc, prod) => acc + prod.quantity, 0);
  }

  get totalPrice() {
    return this.products?.reduce(
      (acc, prod) => acc + prod.quantity * prod.price,
      0
    );
  }

  isInWishList(product: StateProduct) {
    return !!this.authService.user?.wishlist.some((prod) => prod == product._id)
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.prodsSubscription) {
      this.prodsSubscription.unsubscribe();
    }
  }
}
