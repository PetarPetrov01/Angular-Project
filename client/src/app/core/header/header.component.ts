import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { CartState } from '../../types/State';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, MatMenuModule, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cartQuantity: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<CartState>
  ) {
    this.store
      .select('cart')
      .subscribe((prods) =>
      this.cartQuantity = prods.reduce((acc, prod) => (acc += prod.quantity), 0)
      );
  }

  get isLogged() {
    return this.authService.isLogged;
  }

  handleLogout() {
    this.authService.clearUserSession();
    this.router.navigate(['/']);
  }

  //To ensure visual indication on the parent anchor(dropdown)
  isProfileActive() {
    return this.router.url.includes('/profile');
  }
}
