import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitAcComponent } from './produit-ac.component';

describe('ProduitAcComponent', () => {
  let component: ProduitAcComponent;
  let fixture: ComponentFixture<ProduitAcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitAcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
