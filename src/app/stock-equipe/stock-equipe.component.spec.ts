import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockEquipeComponent } from './stock-equipe.component';

describe('StockEquipeComponent', () => {
  let component: StockEquipeComponent;
  let fixture: ComponentFixture<StockEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockEquipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
