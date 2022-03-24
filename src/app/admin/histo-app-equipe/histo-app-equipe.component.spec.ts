import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoAppEquipeComponent } from './histo-app-equipe.component';

describe('HistoAppEquipeComponent', () => {
  let component: HistoAppEquipeComponent;
  let fixture: ComponentFixture<HistoAppEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoAppEquipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoAppEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
