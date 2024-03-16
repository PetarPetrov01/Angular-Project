import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { AuthService } from '../../shared/auth.service';

import { APIProduct } from '../../types/Product';
import { User } from '../../types/User';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | undefined;
  products: APIProduct[] | null = null

  userSubscription: Subscription | null = null;
  postsSubscription: Subscription | null = null;

  authService = inject(AuthService);

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.postsSubscription = this.authService.getOwnProducts().subscribe((products)=>{
      this.products = products;
    })
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }
}
