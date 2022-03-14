import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VilleiComponent } from './villei.component';

describe('VilleiComponent', () => {
  let component: VilleiComponent;
  let fixture: ComponentFixture<VilleiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VilleiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VilleiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
