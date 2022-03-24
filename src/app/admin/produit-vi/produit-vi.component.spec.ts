import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitViComponent } from './produit-vi.component';

describe('ProduitViComponent', () => {
  let component: ProduitViComponent;
  let fixture: ComponentFixture<ProduitViComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitViComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
