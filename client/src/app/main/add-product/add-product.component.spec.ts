import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../shared/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from '../products/products.component';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let apiServiceMock: jasmine.SpyObj<ApiService>;
  let activatedRouteMock: jasmine.SpyObj<ActivatedRoute>;
  let fb: jasmine.SpyObj<FormBuilder>;

  beforeEach(async () => {
    apiServiceMock = jasmine.createSpyObj('ApiService', ['getProduct']);
    activatedRouteMock = jasmine.createSpyObj('ActivatedRoute', ['params']);
    fb = jasmine.createSpyObj('FormBuilder', ['group']);

    await TestBed.configureTestingModule({
      imports: [
        AddProductComponent,
        RouterTestingModule.withRoutes([
          { path: 'products', component: ProductsComponent },
        ]),
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: FormBuilder, useValiue: fb },
      ],
    }).compileComponents();

    activatedRouteMock.params = of({});
    fb.group.and.returnValue(
      new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        image: new FormControl('', Validators.required),
        category: new FormControl([''], Validators.required),
        style: new FormControl('', Validators.required),
        height: new FormControl('', Validators.required),
        width: new FormControl('', Validators.required),
        depth: new FormControl('', Validators.required),
        material: new FormControl([''], Validators.required),
        color: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
      })
    );

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
