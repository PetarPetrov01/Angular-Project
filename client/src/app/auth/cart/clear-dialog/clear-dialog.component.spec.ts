import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { ClearDiaologComponent } from './clear-dialog.component';

describe('ClearDiaologComponent', () => {
  let component: ClearDiaologComponent;
  let fixture: ComponentFixture<ClearDiaologComponent>;
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    storeMock = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [ClearDiaologComponent],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClearDiaologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should dispatch store onConfirm',()=>{
    component.onConfirm()
    expect(storeMock.dispatch).toHaveBeenCalled();
  })
});
