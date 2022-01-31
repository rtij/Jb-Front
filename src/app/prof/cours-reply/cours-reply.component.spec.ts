import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursReplyComponent } from './cours-reply.component';

describe('CoursReplyComponent', () => {
  let component: CoursReplyComponent;
  let fixture: ComponentFixture<CoursReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
