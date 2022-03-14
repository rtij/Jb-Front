import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockaComponent } from './stocka.component';

describe('StockaComponent', () => {
  let component: StockaComponent;
  let fixture: ComponentFixture<StockaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
