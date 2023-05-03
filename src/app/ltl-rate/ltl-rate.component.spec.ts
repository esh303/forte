import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LtlRateComponent } from './ltl-rate.component';

describe('LtlRateComponent', () => {
  let component: LtlRateComponent;
  let fixture: ComponentFixture<LtlRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LtlRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LtlRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
