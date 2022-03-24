import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnveloppeComponent } from './enveloppe.component';

describe('EnveloppeComponent', () => {
  let component: EnveloppeComponent;
  let fixture: ComponentFixture<EnveloppeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnveloppeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnveloppeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
