import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecettezonetComponent } from './recettezonet.component';

describe('RecettezonetComponent', () => {
  let component: RecettezonetComponent;
  let fixture: ComponentFixture<RecettezonetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecettezonetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecettezonetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
