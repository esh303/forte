import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkbookCustomerInfoComponent } from './workbook-customer-info.component';

describe('WorkbookCustomerInfoComponent', () => {
  let component: WorkbookCustomerInfoComponent;
  let fixture: ComponentFixture<WorkbookCustomerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkbookCustomerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkbookCustomerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
