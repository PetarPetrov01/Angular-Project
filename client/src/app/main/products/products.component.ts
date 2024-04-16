import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';

import { Subject, Subscription, debounceTime, fromEvent } from 'rxjs';

import { ApiService } from '../../shared/api.service';
import { APIProduct } from '../../types/Product';
import { LoaderCardComponent } from '../../shared/loader-card/loader-card.component';

import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { FloorPricePipe } from '../../shared/pipes/floor-price.pipe';
import { DecimalSlicePipe } from '../../shared/pipes/decimal-slice.pipe';
import { NotificationService } from '../../shared/notification/notification.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoaderCardComponent,
    MatChipsModule,
    FormsModule,
    FloorPricePipe,
    DecimalSlicePipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: APIProduct[] | [] = [];
  queryParams: Params = {};

  categoryChange$: Subject<string> = new Subject<string>();
  hasDebounced: boolean = false;

  querySubscription: Subscription | null = null;
  apiSubscription: Subscription | null = null;

  isLoading: boolean = false;
  search: string = '';
  sort: string = '';

  sortOptions = [
    {
      value: 'name:asc',
      text: 'Name (A to Z)',
    },
    {
      value: 'name:desc',
      text: 'Name (Z to A)',
    },
    {
      value: 'price:asc',
      text: 'Price ascending',
    },
    {
      value: 'price:desc',
      text: 'Price descending',
    },
    {
      value: 'createdAt:asc',
      text: 'Oldest first',
    },
    {
      value: 'createdAt desc',
      text: 'Newest first',
    },
  ];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.querySubscription = this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
      this.sort = this.queryParams['sort'] || '';
      this.search = this.queryParams['search'] || '';

      this.categoryChange$.pipe(debounceTime(1000)).subscribe((category) => {
        this.fetchProducts();
      });

      if (!this.hasDebounced) {
        this.fetchProducts();
      }
    });

  }

  fetchProducts() {
    this.isLoading = true;
    this.apiSubscription = this.apiService
      .getProducts(this.queryParams)
      .subscribe((prods) => {
        this.isLoading = false;
        this.products = prods;
      });
  }

  changeCategory(category: string) {
    if (category == this.queryParams['category']) {
      return;
    }

    const newCategory = category ? category : null;
    //If empty string is passed to the params, it still remains in the query, while passing null, complete removes it:
    //Passing '' => /products?category=
    //Passing null => /products 

    this.hasDebounced = true;
    //For the initial click (while its still false)

    this.categoryChange$.next(newCategory || '');
    this.router.navigate(['/products'], {
      queryParams: { category: newCategory },
      queryParamsHandling: 'merge',
    });
  }

  onSearch() {
    let search;

    if (this.search) {
      search = this.search;
    } else if (this.queryParams['search']) {
      //   If the user has searched and clears the search
      search = null;
    } else {
      return;
    }

    this.hasDebounced = false;

    this.router.navigate(['/products'], {
      queryParams: { search },
      queryParamsHandling: 'merge',
    });
  }

  onSortChange() {
    this.hasDebounced = false;

    this.router.navigate(['/products'], {
      queryParams: { sort: this.sort },
      queryParamsHandling: 'merge',
    });
  }

  onClear() {
    if (Object.keys(this.queryParams).length < 1) {
      return;
    }

    this.hasDebounced = false;
    this.router.navigate(['/products']);
  }

  get hasQueryParams() {
    return !!Object.keys(this.queryParams).length;
  }

  ngOnDestroy(): void {
    this.querySubscription?.unsubscribe();
    this.apiSubscription?.unsubscribe();
  }
}
