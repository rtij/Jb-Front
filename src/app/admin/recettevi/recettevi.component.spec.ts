import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteviComponent } from './recettevi.component';

describe('RecetteviComponent', () => {
  let component: RecetteviComponent;
  let fixture: ComponentFixture<RecetteviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetteviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetteviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
