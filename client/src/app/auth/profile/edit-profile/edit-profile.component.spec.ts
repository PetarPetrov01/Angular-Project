import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileComponent } from './edit-profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../shared/auth.service';
import { of } from 'rxjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['user$']);
    await TestBed.configureTestingModule({
      imports: [
        EditProfileComponent,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();

    authServiceMock.user$ = of({
      _id: '',
      username: '',
      email: '',
      password: '',
      wishlist: [],
    });

    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
