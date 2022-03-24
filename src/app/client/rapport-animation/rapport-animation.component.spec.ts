import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportAnimationComponent } from './rapport-animation.component';

describe('RapportAnimationComponent', () => {
  let component: RapportAnimationComponent;
  let fixture: ComponentFixture<RapportAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
