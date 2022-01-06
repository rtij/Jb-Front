import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtuComponent } from './etu.component';

describe('EtuComponent', () => {
  let component: EtuComponent;
  let fixture: ComponentFixture<EtuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
