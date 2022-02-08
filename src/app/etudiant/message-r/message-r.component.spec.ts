import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRComponent } from './message-r.component';

describe('MessageRComponent', () => {
  let component: MessageRComponent;
  let fixture: ComponentFixture<MessageRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
