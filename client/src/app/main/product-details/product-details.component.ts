import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable, Subscription, take, tap } from 'rxjs';
import { PopulatedProduct } from '../../types/Product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    private apiService: ApiService
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

  monthlyPrice(price: number | undefined): string {
    const promotion = 0.05;
    const monthly = Number(price) / 12;
    return (monthly * (1 - promotion)).toFixed(2);
  }

  addQty() {
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
      Number.isInteger(this.buyQty) == false
    ) {
      this.buyQty = 1;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
