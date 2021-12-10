import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEtudiantComponent } from './admin-etudiant.component';

describe('AdminEtudiantComponent', () => {
  let component: AdminEtudiantComponent;
  let fixture: ComponentFixture<AdminEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEtudiantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
