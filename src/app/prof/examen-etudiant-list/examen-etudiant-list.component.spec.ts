import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenEtudiantListComponent } from './examen-etudiant-list.component';

describe('ExamenEtudiantListComponent', () => {
  let component: ExamenEtudiantListComponent;
  let fixture: ComponentFixture<ExamenEtudiantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenEtudiantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenEtudiantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
