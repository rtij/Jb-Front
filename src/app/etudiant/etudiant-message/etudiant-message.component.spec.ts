import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantMessageComponent } from './etudiant-message.component';

describe('EtudiantMessageComponent', () => {
  let component: EtudiantMessageComponent;
  let fixture: ComponentFixture<EtudiantMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudiantMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtudiantMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
