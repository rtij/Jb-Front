import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvequipeComponent } from './envequipe.component';

describe('EnvequipeComponent', () => {
  let component: EnvequipeComponent;
  let fixture: ComponentFixture<EnvequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvequipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
