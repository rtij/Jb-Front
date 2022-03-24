import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteSCComponent } from './recette-sc.component';

describe('RecetteSCComponent', () => {
  let component: RecetteSCComponent;
  let fixture: ComponentFixture<RecetteSCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetteSCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetteSCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
