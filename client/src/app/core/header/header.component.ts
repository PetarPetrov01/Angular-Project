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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  get isLogged() {
    return this.authService.isLogged;
  }

  handleLogout() {
    this.authService.clearUserSession();
    this.router.navigate(['/']);
  }

  //To ensure visual indication on the parent anchor(dropdown)
  isProfileActive(){
   return this.router.url.includes('/profile')
  }
}
