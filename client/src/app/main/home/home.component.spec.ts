import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ApiService } from '../../shared/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiServiceMock: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiServiceMock = jasmine.createSpyObj('ApiService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
      providers: [{ provide: ApiService, useValue: apiServiceMock }],
    }).compileComponents();

    apiServiceMock.getProducts.and.returnValue(EMPTY);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
