import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoqteComponent } from './histoqte.component';

describe('HistoqteComponent', () => {
  let component: HistoqteComponent;
  let fixture: ComponentFixture<HistoqteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoqteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoqteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
