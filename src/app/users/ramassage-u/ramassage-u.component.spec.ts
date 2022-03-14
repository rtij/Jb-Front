import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamassageUComponent } from './ramassage-u.component';

describe('RamassageUComponent', () => {
  let component: RamassageUComponent;
  let fixture: ComponentFixture<RamassageUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RamassageUComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RamassageUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
