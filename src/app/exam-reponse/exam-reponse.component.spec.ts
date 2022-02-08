import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamReponseComponent } from './exam-reponse.component';

describe('ExamReponseComponent', () => {
  let component: ExamReponseComponent;
  let fixture: ComponentFixture<ExamReponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamReponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamReponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
