import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvviComponent } from './envvi.component';

describe('EnvviComponent', () => {
  let component: EnvviComponent;
  let fixture: ComponentFixture<EnvviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
