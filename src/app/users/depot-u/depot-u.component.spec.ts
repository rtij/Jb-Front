import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotUComponent } from './depot-u.component';

describe('DepotUComponent', () => {
  let component: DepotUComponent;
  let fixture: ComponentFixture<DepotUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepotUComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
