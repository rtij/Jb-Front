import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockFaritanyComponent } from './stock-faritany.component';

describe('StockFaritanyComponent', () => {
  let component: StockFaritanyComponent;
  let fixture: ComponentFixture<StockFaritanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockFaritanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockFaritanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
