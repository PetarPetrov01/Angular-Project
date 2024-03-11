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
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

export interface DialogData {
  productName: string;
  _id: string;
}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.component.html',
  styleUrl: 'delete-dialog.component.css',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
})
export class DeleteDialogComponent implements OnDestroy {
  subscription: Subscription | null = null;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private apiService: ApiService
  ) {}

  onConfirm() {
    this.subscription = this.apiService
      .deleteProduct(this.data._id)
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
