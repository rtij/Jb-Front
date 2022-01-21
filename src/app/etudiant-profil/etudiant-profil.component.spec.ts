import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantProfilComponent } from './etudiant-profil.component';

describe('EtudiantProfilComponent', () => {
  let component: EtudiantProfilComponent;
  let fixture: ComponentFixture<EtudiantProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudiantProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtudiantProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
