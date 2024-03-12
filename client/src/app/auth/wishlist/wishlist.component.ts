import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ApiService } from '../../main/api.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { APIProduct, Product } from '../../types/Product';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  apiService = inject(ApiService);
  router = inject(Router);

  subscription: Subscription | null = null;
  wishlist: [APIProduct] | [] = [];

  ngOnInit(): void {
    this.subscription = this.fetchWishList()
  }

  fetchWishList(){
    return this.authService.getWishlist().subscribe((wishlist) => {
      this.wishlist = wishlist;
    });
  }

  onRemove(prodId: string){
    this.apiService.toggleWishList(prodId).subscribe((user)=>{
      this.router.navigate(['/auth/wishlist'])
      //sync user
      this.authService.setUserStorage(user);
      this.authService.setUserSubject(user);

      //sync list
      this.subscription = this.fetchWishList();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
