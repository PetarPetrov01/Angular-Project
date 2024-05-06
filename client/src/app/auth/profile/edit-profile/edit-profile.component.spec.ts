import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EditProfileComponent } from './edit-profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../shared/auth.service';
import { of } from 'rxjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let fb: jasmine.SpyObj<FormBuilder>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', [
      'user$',
      'editProfile',
    ]);
    fb = jasmine.createSpyObj('FormBuilder', ['group']);
    await TestBed.configureTestingModule({
      imports: [
        EditProfileComponent,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: FormBuilder, useValue: fb },
      ],
    }).compileComponents();

    authServiceMock.user$ = of({
      _id: '',
      username: '',
      email: '',
      password: '',
      wishlist: [],
    });

    fb.group.and.returnValue(
      new FormGroup({
        username: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
      })
    );

    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
