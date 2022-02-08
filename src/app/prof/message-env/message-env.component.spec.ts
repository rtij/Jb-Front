import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageEnvComponent } from './message-env.component';

describe('MessageEnvComponent', () => {
  let component: MessageEnvComponent;
  let fixture: ComponentFixture<MessageEnvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageEnvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageEnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
