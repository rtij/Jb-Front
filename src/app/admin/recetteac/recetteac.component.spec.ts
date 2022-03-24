import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteacComponent } from './recetteac.component';

describe('RecetteacComponent', () => {
  let component: RecetteacComponent;
  let fixture: ComponentFixture<RecetteacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetteacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetteacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
