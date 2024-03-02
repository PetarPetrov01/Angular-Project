import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  mockProds = [
    { img: 'assets/images/chair-modern.png', price: 199 },
    { img: 'assets/images/stool.png', price: 199 },
    { img: 'assets/images/lamp.png', price: 199 },
    { img: 'assets/images/chair-modern.png', price: 199 },
  ];
}
