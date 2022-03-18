import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrneComponent } from './urne.component';

describe('UrneComponent', () => {
  let component: UrneComponent;
  let fixture: ComponentFixture<UrneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
