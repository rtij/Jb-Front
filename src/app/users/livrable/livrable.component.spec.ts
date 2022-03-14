import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrableComponent } from './livrable.component';

describe('LivrableComponent', () => {
  let component: LivrableComponent;
  let fixture: ComponentFixture<LivrableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivrableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivrableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
