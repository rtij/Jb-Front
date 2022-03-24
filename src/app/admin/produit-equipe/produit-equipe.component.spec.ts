import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitEquipeComponent } from './produit-equipe.component';

describe('ProduitEquipeComponent', () => {
  let component: ProduitEquipeComponent;
  let fixture: ComponentFixture<ProduitEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitEquipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
