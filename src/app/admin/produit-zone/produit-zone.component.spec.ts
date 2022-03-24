import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitZoneComponent } from './produit-zone.component';

describe('ProduitZoneComponent', () => {
  let component: ProduitZoneComponent;
  let fixture: ComponentFixture<ProduitZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
