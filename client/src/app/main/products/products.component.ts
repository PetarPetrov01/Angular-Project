import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';

import { Subscription } from 'rxjs';

import { ApiService } from '../../shared/api.service';
import { APIProduct } from '../../types/Product';
import { LoaderCardComponent } from '../../shared/loader-card/loader-card.component';

import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoaderCardComponent,
    MatChipsModule,
    FormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: APIProduct[] | [] = [];
  queryParams: Params = {};

  querySubcsription: Subscription | null = null;
  apiSubscription: Subscription | null = null;

  isLoading: boolean = false;
  search: string = '';
  sort: string = '';

  sortOptions = [
    {
      value: 'name asc',
      text: 'Name ascending',
    },
    {
      value: 'name desc',
      text: 'Name descending',
    },
    {
      value: 'price asc',
      text: 'Price ascending',
    },
    {
      value: 'price desc',
      text: 'Price descending',
    },
  ];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.querySubcsription = this.route.queryParams.subscribe((params) => {
      this.queryParams = params;

      this.sort = this.queryParams['sort'] || '';
      this.search = this.queryParams['search'] || '';
      this.fetchProducts();
    });
  }

  fetchProducts() {
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

    const newCategory = category ? category : null;

    this.router.navigate(['/products'], {
      queryParams: { category: newCategory },
      queryParamsHandling: 'merge',
    });

    this.fetchProducts();
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

    this.router.navigate(['/products'], {
      queryParams: { search },
      queryParamsHandling: 'merge',
    });
    this.fetchProducts();
  }

  onSortChange() {
    this.router.navigate(['/products'], {
      queryParams: { sort: this.sort },
      queryParamsHandling: 'merge',
    });
    this.fetchProducts();
  }
  
  onClear(){
    if(Object.keys(this.queryParams).length < 1){
      return
    }

    this.router.navigate(['/products'])
    this.fetchProducts();
  }

  get hasQueryParams(){
    return !!Object.keys(this.queryParams).length
  }

  ngOnDestroy(): void {
    this.querySubcsription?.unsubscribe();
    this.apiSubscription?.unsubscribe();
  }
}
