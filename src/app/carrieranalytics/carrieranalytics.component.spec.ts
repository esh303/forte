import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrieranalyticsComponent } from './carrieranalytics.component';

describe('CarrieranalyticsComponent', () => {
  let component: CarrieranalyticsComponent;
  let fixture: ComponentFixture<CarrieranalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrieranalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrieranalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
