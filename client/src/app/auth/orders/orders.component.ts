import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../shared/auth.service';

import { DateFormatterPipe } from '../../shared/pipes/date-formatter.pipe';
import { DecimalSlicePipe } from '../../shared/pipes/decimal-slice.pipe';
import { FloorPricePipe } from '../../shared/pipes/floor-price.pipe';

import { APIOrder } from '../../types/Order';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    DateFormatterPipe,
    FloorPricePipe,
    DecimalSlicePipe,
    RouterLink,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: APIOrder[] | [] = [];

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.authService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  handleDelete(orderId: string) {
    this.authService.deleteOrder(orderId).subscribe((res) => {
      this.fetchOrders();
    });
  }
}
