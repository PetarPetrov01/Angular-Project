import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { APIOrder } from '../../types/Order';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: APIOrder[] | [] = [];

  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.getOrders().subscribe((orders) => {
      console.log('orders')
      console.log(orders)
      this.orders = orders;
    });
  }
}
