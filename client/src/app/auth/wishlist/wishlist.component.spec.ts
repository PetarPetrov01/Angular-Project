import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WishlistComponent } from './wishlist.component';

import { Store } from '@ngrx/store';
import { ApiService } from '../../shared/api.service';
import { FloorPricePipe } from '../../shared/pipes/floor-price.pipe';
import { DecimalSlicePipe } from '../../shared/pipes/decimal-slice.pipe';
import { AuthService } from '../../shared/auth.service';
import { EMPTY, of } from 'rxjs';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let apiServiceMock: jasmine.SpyObj<ApiService>;
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', [
      'getWishlist',
      'setUserStorage',
      'setUserSubject',
    ]);
    apiServiceMock = jasmine.createSpyObj('ApiService', ['toggleWishList']);
    storeMock = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FloorPricePipe,
        DecimalSlicePipe,
        WishlistComponent,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ApiService, useValue: apiServiceMock },
        { provide: Store, useValue: storeMock },
      ],
    }).compileComponents();

  });

  beforeEach(() => {
    authServiceMock.getWishlist.and.returnValue(EMPTY)

    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Test config', () => {
    expect(true).toBeTruthy();
  });
});
