import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEnseignantComponent } from './admin-enseignant.component';

describe('AdminEnseignantComponent', () => {
  let component: AdminEnseignantComponent;
  let fixture: ComponentFixture<AdminEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEnseignantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
