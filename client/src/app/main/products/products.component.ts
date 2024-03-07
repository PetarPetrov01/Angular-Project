import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, Subscription, tap } from 'rxjs';
import { APIProduct } from '../../types/Product';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  // products$: Observable<APIProduct[]> | null;
  products: APIProduct[] | null = null;
  queryParams: any = {};

  querySubcsription: Subscription | null = null;
  apiSubscription: Subscription | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.products$ = null // Test empty arr;
  }

  ngOnInit(): void {
    this.querySubcsription = this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
      this.fetchProduts();
    });
  }

  fetchProduts() {
    this.apiSubscription = this.apiService
      .getProducts(this.queryParams)
      .subscribe((prods) => {
        this.products = prods;
      });
  }

  changeCategory(category: string) {
    if(category == this.queryParams['category']){
      return;
    }

    if (category){
      this.router.navigate(['/products'], { queryParams: { category } });
    } else {
      this.router.navigate(['/products']);
    }
    this.fetchProduts()
  }

  ngOnDestroy(): void {
    this.querySubcsription?.unsubscribe();
    this.apiSubscription?.unsubscribe();
  }
}
