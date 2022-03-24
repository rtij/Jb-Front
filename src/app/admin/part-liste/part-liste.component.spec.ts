import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartListeComponent } from './part-liste.component';

describe('PartListeComponent', () => {
  let component: PartListeComponent;
  let fixture: ComponentFixture<PartListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
