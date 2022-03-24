import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoeComponent } from './histoe.component';

describe('HistoeComponent', () => {
  let component: HistoeComponent;
  let fixture: ComponentFixture<HistoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
