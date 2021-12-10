import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParametreComponent } from './admin-parametre.component';

describe('AdminParametreComponent', () => {
  let component: AdminParametreComponent;
  let fixture: ComponentFixture<AdminParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminParametreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
