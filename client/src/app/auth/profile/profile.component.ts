import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { AuthService } from '../../shared/auth.service';

import { APIProduct, PopulatedProduct } from '../../types/Product';
import { User } from '../../types/User';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DeleteDialogComponent } from '../../shared/delete-diaolog/delete-dialog.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | undefined;
  products: APIProduct[] | [] = [];

  userSubscription: Subscription | null = null;
  postsSubscription: Subscription | null = null;

  authService = inject(AuthService);
  matDialog = inject(MatDialog);
  router = inject(Router);

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.postsSubscription = this.authService
      .getOwnProducts()
      .subscribe((products) => {
        this.products = products;
      });
  }

  onEditProfile() {
    this.matDialog.open(EditProfileComponent);
  }

  handleLogout() {
    this.authService.clearUserSession();
    this.router.navigate(['/']);
  }

  onDelete(
    product: APIProduct,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    this.matDialog.open(DeleteDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        productName: product?.name,
        _id: product?._id,
      },
    });
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
