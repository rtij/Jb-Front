import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitSemaineCComponent } from './produit-semaine-c.component';

describe('ProduitSemaineCComponent', () => {
  let component: ProduitSemaineCComponent;
  let fixture: ComponentFixture<ProduitSemaineCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitSemaineCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitSemaineCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
