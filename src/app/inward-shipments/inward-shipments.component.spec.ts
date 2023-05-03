import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardShipmentsComponent } from './inward-shipments.component';

describe('InwardShipmentsComponent', () => {
  let component: InwardShipmentsComponent;
  let fixture: ComponentFixture<InwardShipmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InwardShipmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InwardShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
