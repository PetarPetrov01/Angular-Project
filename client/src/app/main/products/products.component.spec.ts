import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../shared/api.service';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let apiServiceMock: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiServiceMock = jasmine.createSpyObj('ApiService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [ProductsComponent, RouterTestingModule],
      providers: [{ provide: ApiService, useValue: apiServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
