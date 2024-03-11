import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ApiService } from '../api.service';
import { AuthService } from '../../auth/auth.service';
import { PopulatedProduct } from '../../types/Product';

import { DeleteDialogComponent } from './delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DeleteDialogComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: PopulatedProduct | null = null;
  productId: string = '';
  subscription: Subscription | null = null;

  buyQty: number = 1;

  constructor(
    private activated: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activated.params.subscribe((params) => {
      this.productId = params['id'];
      this.subscription = this.apiService
        .getProduct(this.productId)
        .subscribe((prod) => {
          this.product = prod;
        });
    });
  }

  get isUser() {
    return this.authService.isLogged;
  }

  get isOwner() {
    return this.product?._ownerId._id == this.authService.user?._id;
  }

  monthlyPrice(price: number | undefined): string {
    const promotion = 0.05;
    const monthly = Number(price) / 12;
    return (monthly * (1 - promotion)).toFixed(2);
  }

  addQty() {
    if (this.buyQty >= 50) {
      return;
    }
    this.buyQty += 1;
  }

  removeQty() {
    if (this.buyQty <= 1) {
      return;
    }
    this.buyQty -= 1;
  }

  onInputBlur() {
    if (
      !this.buyQty ||
      this.buyQty < 1 ||
      this.buyQty > 50 ||
      Number.isInteger(this.buyQty) == false
    ) {
      this.buyQty = 1;
    }
  }

  onDelete(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.matDialog.open(DeleteDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        productName: this.product?.name
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
