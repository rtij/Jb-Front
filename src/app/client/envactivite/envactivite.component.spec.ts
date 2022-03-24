import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvactiviteComponent } from './envactivite.component';

describe('EnvactiviteComponent', () => {
  let component: EnvactiviteComponent;
  let fixture: ComponentFixture<EnvactiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvactiviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvactiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
