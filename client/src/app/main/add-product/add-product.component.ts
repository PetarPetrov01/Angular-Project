import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { ApiService } from '../api.service';
import { PopulatedProduct, Product } from '../../types/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit, OnDestroy {
  editProdSubscription: Subscription | null = null;
  editProductId: string | null = null;
  isEditing: boolean = false;

  categoryList = [
    'Living room',
    'Bedroom',
    'Dining room',
    'Home office',
    'Outdoor',
  ];

  materialList = ['Wood', 'Metal', 'Plastic', 'Glass', 'Other'];

  colorList = [
    'white',
    'black',
    'grey',
    'red',
    'green',
    'blue',
    'orange',
    'yellow',
    'brown',
    'purple',
    'pink',
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const editedProductId = params['id'] || null;
      if (editedProductId) {
        this.editProductId = editedProductId;
        this.isEditing = true;

        this.editProdSubscription = this.apiService
          .getProduct(editedProductId)
          .subscribe((currentProd) => {
            const { dimensions, ...editProduct } = currentProd;

            this.addProductForm.patchValue({
              width: String(dimensions.width),
              height: String(dimensions.height),
              depth: String(dimensions.depth),
              name: editProduct.name,
              category: editProduct.category ? editProduct.category : [],
              color: editProduct.color,
              description: editProduct.description,
              image: editProduct.image,
              material: editProduct.material,
              price: String(editProduct.price),
              style: editProduct.style,
            });
          });
      }
    });
  }

  addProductForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    image: ['', Validators.required],
    category: [[''], Validators.required],
    style: ['', Validators.required],
    height: ['', Validators.required],
    width: ['', Validators.required],
    depth: ['', Validators.required],
    material: [[''], Validators.required],
    color: ['', Validators.required],
    price: ['', Validators.required],
  });

  handleClick() {
    if (this.addProductForm.invalid) {
      return;
    }

    const { width, height, depth, ...values } = this.addProductForm.value;
    const dimensions = {
      width: Number(width),
      height: Number(height),
      depth: Number(depth),
    };

    const safeValues = {
      name: values.name || '',
      description: values.description || '',
      image: values.image || '',
      category: Array.isArray(values.category) ? values.category : [],
      style: values.style || '',
      material: Array.isArray(values.material) ? values.material : [],
      color: values.color || '',
      price: Number(values.price) || 0,
    };

    const data: Product = {
      ...safeValues,
      dimensions,
    };

    console.log(data);
    if (this.isEditing && this.editProductId) {
      this.apiService.updateProduct(this.editProductId,data).subscribe((prod)=>{
        console.log('EDITED');
        console.log(prod);
        this.router.navigate([`/products/${this.editProductId}`]);
      })
    } else {
      this.apiService.addProduct(data).subscribe((prod) => {
        console.log('CREATED');
        console.log(prod);
        this.router.navigate(['/products']);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.editProdSubscription) {
      this.editProdSubscription.unsubscribe();
    }
  }
}
