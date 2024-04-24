import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../shared/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../shared/auth.service';
import { Store } from '@ngrx/store';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let apiServiceMock: jasmine.SpyObj<ApiService>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    apiServiceMock = jasmine.createSpyObj('ApiService', ['getProduct']);
    authServiceMock = jasmine.createSpyObj('AuthService', ['']);
    storeMock = jasmine.createSpyObj('Store', ['']);

    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent, RouterTestingModule],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Store, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
