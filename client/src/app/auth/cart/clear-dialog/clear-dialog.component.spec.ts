import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearDiaologComponent } from './clear-dialog.component';

describe('ClearDiaologComponent', () => {
  let component: ClearDiaologComponent;
  let fixture: ComponentFixture<ClearDiaologComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearDiaologComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClearDiaologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
