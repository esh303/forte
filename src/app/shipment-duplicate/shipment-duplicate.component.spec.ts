import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentDuplicateComponent } from './shipment-duplicate.component';

describe('ShipmentDuplicateComponent', () => {
  let component: ShipmentDuplicateComponent;
  let fixture: ComponentFixture<ShipmentDuplicateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentDuplicateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentDuplicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
