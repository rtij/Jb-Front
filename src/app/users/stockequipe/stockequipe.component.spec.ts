import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockequipeComponent } from './stockequipe.component';

describe('StockequipeComponent', () => {
  let component: StockequipeComponent;
  let fixture: ComponentFixture<StockequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockequipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
