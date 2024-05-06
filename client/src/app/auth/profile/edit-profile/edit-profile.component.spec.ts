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

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create edit form with required fields', () => {
    expect(component.editForm instanceof FormGroup).toBeTrue();
  });

  it('Should not call editProfile on invalid form', () => {
    component.onConfirm();
    expect(authServiceMock.editProfile).not.toHaveBeenCalled();
  });

  it('Edit form should be invalid if empty', () => {
    expect(component.editForm.invalid).toBeTruthy();
  });

  it('Email should be invalid ',()=>{
    component.editForm.setValue({
      username: 'testUser',
      email: 'invalid@email-com',
    });

    expect(component.editForm.get('email')?.hasError('email')).toBeTruthy();
  })

  it('Should call editProfile on valid form submission',  () => {
    component.editForm.setValue({
      username: 'testUser',
      email: 'testex@example.com',
    });

    component.onConfirm();
    expect(authServiceMock.editProfile).toHaveBeenCalledWith(
      'testUser',
      'testex@example.com'
    );
  });
});
