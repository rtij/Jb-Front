import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteEquipeComponent } from './recette-equipe.component';

describe('RecetteEquipeComponent', () => {
  let component: RecetteEquipeComponent;
  let fixture: ComponentFixture<RecetteEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetteEquipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetteEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
