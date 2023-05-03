import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyWareHouseComponent } from './company-ware-house.component';

describe('CompanyWareHouseComponent', () => {
  let component: CompanyWareHouseComponent;
  let fixture: ComponentFixture<CompanyWareHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyWareHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyWareHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
