import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotuComponent } from './depotu.component';

describe('DepotuComponent', () => {
  let component: DepotuComponent;
  let fixture: ComponentFixture<DepotuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepotuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
