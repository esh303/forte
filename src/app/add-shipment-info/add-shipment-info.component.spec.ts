import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShipmentInfoComponent } from './add-shipment-info.component';

describe('AddShipmentInfoComponent', () => {
  let component: AddShipmentInfoComponent;
  let fixture: ComponentFixture<AddShipmentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShipmentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShipmentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
