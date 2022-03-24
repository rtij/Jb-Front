import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvsemainecComponent } from './envsemainec.component';

describe('EnvsemainecComponent', () => {
  let component: EnvsemainecComponent;
  let fixture: ComponentFixture<EnvsemainecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvsemainecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvsemainecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
