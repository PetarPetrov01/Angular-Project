import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    NgIf
    NgIf,
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

  materialList = ['Wood', 'Metal', 'Plastic', 'Glass', 'Other'];

  constructor(private fb: FormBuilder) {}
  colorList = ['White','Black','Grey','Red','Green','Blue','Orange','Yellow','Brown','Purple','Pink']


  addProductForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    image: ['', Validators.required],
    category: ['', Validators.required],
    style: ['', Validators.required],
    height: ['', Validators.required],
    width: ['', Validators.required],
    depth: ['', Validators.required],
    material: ['', Validators.required],
    color: ['',Validators.required],
    price: ['', Validators.required],
  });

  handleClick() {
    console.log(this.addProductForm.get('width')?.errors);
    // console.log(this.addProductForm.value);
  }
}
