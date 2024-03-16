import { Component, Inject, OnDestroy } from '@angular/core';
import {
  MatDialogRef,
  MatDialogClose,
  MatDialogActions,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as CartActions from '../cart.actions'

export interface DialogData {
  productName: string;
  _id: string;
}

@Component({
  selector: 'remove-dialog',
  templateUrl: 'remove-dialog.component.html',
  styleUrl: 'remove-dialog.component.css',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
})
export class RemoveDialogComponent {
  subscription: Subscription | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store
  ) {}

  onConfirm() {
   this.store.dispatch(CartActions.removeItem({productId: this.data._id}));
  }


}
