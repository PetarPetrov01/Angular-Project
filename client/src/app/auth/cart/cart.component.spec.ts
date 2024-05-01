import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { AuthService } from '../../shared/auth.service';
import { Store } from '@ngrx/store';
import { ApiService } from '../../shared/api.service';
import { CartState, StateProduct } from '../../types/State';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  let authServiceMock: jasmine.SpyObj<AuthService>;
  let apiServiceMock: jasmine.SpyObj<ApiService>;
  let storeMock: jasmine.SpyObj<Store>;

  const productsSubjectMock = new BehaviorSubject<StateProduct[]>([]);

  const mockCartState: StateProduct[] = [
    {
      _id: '123',
      name: '',
      description: '',
      image: '',
      category: [''],
      style: '',
      dimensions: {
        height: 1,
        width: 1,
        depth: 1,
      },
      material: [''],
      color: '',
      price: 1,
      __v: '1',
      _ownerId: {
        _id: '123',
        email: 'test@mail.com',
        username: 'Test1',
        wishlist: [],
      },
      quantity: 1,
      createdAt: '2024-03-10T11:27:12.452+00:00',
    },
  ];

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', [
      'setUserStorage',
      'setUserSubject',
    ]);
    apiServiceMock = jasmine.createSpyObj('ApiService', ['toggleWishlist']);
    storeMock = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    await TestBed.configureTestingModule({
      imports: [CartComponent, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ApiService, useValue: apiServiceMock },
        { provide: Store, useValue: storeMock },
      ],
    }).compileComponents();

    storeMock.select.and.returnValue(productsSubjectMock.asObservable());

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The cart should be empty', () => {
    productsSubjectMock.next([]);
    expect(component.products?.length).toBeFalsy();
  });

  it('The cart should have products', () => {
    productsSubjectMock.next(mockCartState);
    expect(component.products).toBeTruthy();
    expect(component.products).toEqual(mockCartState);
  });
});
