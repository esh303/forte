import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillofladingsummaryComponent } from './billofladingsummary.component';

describe('BillofladingsummaryComponent', () => {
  let component: BillofladingsummaryComponent;
  let fixture: ComponentFixture<BillofladingsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillofladingsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillofladingsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
