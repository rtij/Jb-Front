import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRComponent } from './liste-r.component';

describe('ListeRComponent', () => {
  let component: ListeRComponent;
  let fixture: ComponentFixture<ListeRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
