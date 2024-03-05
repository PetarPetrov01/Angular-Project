import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  categoryList = [
    'Living room',
    'Bedroom',
    'Dining room',
    'Home office',
    'Outdoor',
  ];

  materialList = [
    'Wood',
    'Metal',
    'Plastic',
    'Glass',
    'Other'
  ]

  constructor(private fb: FormBuilder) {}
  addProductForm = this.fb.group({
    name: [''],
    description: [''],
    image: [''],
    category: [''],
    height: [''],
    width: [''],
    depth: [''],
    material: [''],
    price: [''],
  });

  handleClick() {
    console.log(this.addProductForm.value);
  }
}
