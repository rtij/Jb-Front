import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonetComponent } from './zonet.component';

describe('ZonetComponent', () => {
  let component: ZonetComponent;
  let fixture: ComponentFixture<ZonetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
