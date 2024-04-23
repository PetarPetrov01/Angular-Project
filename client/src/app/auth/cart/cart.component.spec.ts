import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { AuthService } from '../../shared/auth.service';
import { Store } from '@ngrx/store';
import { ApiService } from '../../shared/api.service';
import { StateProduct } from '../../types/State';
import { EMPTY, Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  let authServiceMock: jasmine.SpyObj<AuthService>;
  let apiServiceMock: jasmine.SpyObj<ApiService>;
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', [
      'setUserStorage',
      'setUserSubject',
    ]);
    apiServiceMock = jasmine.createSpyObj('ApiService', ['toggleWishlist'])
    storeMock = jasmine.createSpyObj('Store', ['dispatch','select']);

    await TestBed.configureTestingModule({
      imports: [CartComponent, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ApiService, useValue: apiServiceMock },
        { provide: Store, useValue: storeMock },
      ],
    }).compileComponents();

    storeMock.select.and.returnValue(EMPTY);

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
