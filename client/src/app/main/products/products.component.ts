import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Subscription } from 'rxjs';

import { ApiService } from '../../shared/api.service';
import { APIProduct } from '../../types/Product';
import { LoaderCardComponent } from '../../shared/loader-card/loader-card.component';

import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderCardComponent, MatChipsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  // products$: Observable<APIProduct[]> | null;
  products: APIProduct[] | [] = [];
  queryParams: any = {};

  querySubcsription: Subscription | null = null;
  apiSubscription: Subscription | null = null;

  isLoading: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.querySubcsription = this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.queryParams = params;
      this.fetchProduts();
    });
  }

  fetchProduts() {
    this.isLoading = true;
    this.apiSubscription = this.apiService
      .getProducts(this.queryParams)
      .subscribe((prods) => {
        setTimeout(() => {
          this.products = prods;
          this.isLoading = false;
        }, 2000);
      });
  }

  changeCategory(category: string) {
    if (category == this.queryParams['category']) {
      return;
    }

    if (category) {
      this.router.navigate(['/products'], { queryParams: { category } });
    } else {
      this.router.navigate(['/products']);
    }
    this.fetchProduts();
  }

  ngOnDestroy(): void {
    this.querySubcsription?.unsubscribe();
    this.apiSubscription?.unsubscribe();
  }
}
