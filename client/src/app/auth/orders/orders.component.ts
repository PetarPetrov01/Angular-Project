import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { APIOrder } from '../../types/Order';
import { DateFormatterPipe } from '../../shared/pipes/date-formatter.pipe';
import { DecimalSlicePipe } from '../../shared/pipes/decimal-slice.pipe';
import { FloorPricePipe } from '../../shared/pipes/floor-price.pipe';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe, FloorPricePipe, DecimalSlicePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: APIOrder[] | [] = [];

  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }
}
