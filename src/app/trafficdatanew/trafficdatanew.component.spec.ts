import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficdatanewComponent } from './trafficdatanew.component';

describe('TrafficdatanewComponent', () => {
  let component: TrafficdatanewComponent;
  let fixture: ComponentFixture<TrafficdatanewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficdatanewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficdatanewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
