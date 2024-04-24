import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../shared/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let apiServiceMock: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiServiceMock = jasmine.createSpyObj('ApiService', ['getProduct']);

    await TestBed.configureTestingModule({
      imports: [
        AddProductComponent,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: ApiService, useValue: apiServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
