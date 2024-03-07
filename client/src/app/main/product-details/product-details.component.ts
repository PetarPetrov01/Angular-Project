import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable, Subscription, take, tap } from 'rxjs';
import { PopulatedProduct } from '../../types/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: PopulatedProduct | null = null;
  productId: string = '';
  subscription: Subscription | null = null;

  constructor(
    private activated: ActivatedRoute,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.activated.params.subscribe((params) => {
      this.productId = params['id'];
      this.subscription = this.apiService.getProduct(this.productId).subscribe(prod=>{
        this.product = prod;
      })
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
