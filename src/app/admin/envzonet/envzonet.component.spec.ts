import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvzonetComponent } from './envzonet.component';

describe('EnvzonetComponent', () => {
  let component: EnvzonetComponent;
  let fixture: ComponentFixture<EnvzonetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvzonetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvzonetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
