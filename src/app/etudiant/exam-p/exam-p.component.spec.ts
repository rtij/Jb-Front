import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPComponent } from './exam-p.component';

describe('ExamPComponent', () => {
  let component: ExamPComponent;
  let fixture: ComponentFixture<ExamPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
