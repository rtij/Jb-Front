import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisiemComponent } from './saisiem.component';

describe('SaisiemComponent', () => {
  let component: SaisiemComponent;
  let fixture: ComponentFixture<SaisiemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaisiemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaisiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
