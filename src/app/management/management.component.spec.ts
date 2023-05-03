import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagementComponent } from './management.component';
import { PricingInfoService } from '../services/pricing-info.service';
import { LoggerService } from '../services/logger.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
// import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';



class MockUser {
  dummyData = [{
    'recentRateId': 1,
    'companyName': 'FEDEX ECONOMY',
    'type': 'AP',
    'fuelsurcharge': '12.5',
    'discount': '55',
    'amc': '15'
  }];
  deleteData = [];


  dummyArData = [
    {'recentRateId': 8, 'companyName': 'YRC', 'type': 'AR', 'fuelsurcharge': '22.55', 'discount': '68', 'amc': '100'},
    {'recentRateId': 12, 'companyName': 'FEDEX PRIORITY', 'type': 'AR', 'fuelsurcharge': '22.5', 'discount': '55', 'amc': '90'}];

  public getApForm() {
    return Observable.of(this.dummyData);
  }
  public getArForm() {
    return Observable.of(this.dummyArData);
  }

  public saveApForm() {
    return Observable.of(this.dummyData);
  }
  public saveArForm() {
    return Observable.of(this.dummyData);
  }
  public editSaveApForm() {
    return Observable.of(this.dummyData);
  }
  public editSaveArForm() {
    return Observable.of(this.dummyData);
  }
  public deleteAp() {
    return Observable.of(this.deleteData);
  }
  public deleteAr() {
    return Observable.of(this.deleteData);
  }
}

describe('ManagementComponent', () => {
  let component: ManagementComponent;
  let fixture: ComponentFixture<ManagementComponent>;
  let service: PricingInfoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementComponent ],
      imports: [ ReactiveFormsModule, RouterModule, RouterTestingModule, HttpModule, HttpClientModule ],
      providers: [ {provide: PricingInfoService, useClass: MockUser}, LoggerService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit method', () => {
    service = TestBed.get(PricingInfoService);
    spyOn(service, 'getApForm').and.callThrough();
    spyOn(service, 'getArForm').and.callThrough();
    component.ngOnInit();
    expect(component.listOfApValues).toBeDefined();
    expect(component.listOfArValues).toBeDefined();
  });

  it('should call ngOnInit method Else Method' , () => {
    component.listOfApValues.length = 0;
    component.listOfArValues.length = 0;
    component.getData();
    expect(component.showDetailApTable).toBe(false);
    expect(component.showDetailArTable).toBe(false);
  });

  it('should call save method', () => {
    spyOn(service, 'saveApForm').and.callThrough();
    const data = {'value': {'recentRateId': 0,
      'companyName': 'FEDEX ECONOMY',
      'type': 'AP',
      'fuelsurcharge': '12.5',
      'discount': '55',
      'amc': '15'}} ;
    component.saveAPData(data);
    expect(component.saveResponse).toBeDefined();
  });

  it('should call save AR method', () => {
    spyOn(service, 'saveArForm').and.callThrough();
    const data = {'value': {'recentRateId': 0,
      'companyName': 'FEDEX ECONOMY',
      'type': 'AP',
      'fuelsurcharge': '12.5',
      'discount': '55',
      'amc': '15'}} ;
    component.saveARData(data);
    expect(component.saveResponse).toBeDefined();

  });

  it('should provide logout information', () => {
    const spyFunction = spyOn((<any>component).router, 'navigate');
    component.logout();
    localStorage.removeItem('loginInfo');
    console.log('loginInfo');
    expect(spyFunction).toHaveBeenCalledWith(['/internal']);
  });

  it('should provide duplicate Company for AP', () => {
    const apCompany = 'YRC';
    let data =  component.listOfApValues;
    data = [{companyName: 'YRC'}];
    component.listOfApValues = data;
    component.duplicateCompany(apCompany);
    expect( component.showErrorMsg).toBe(true);
  });

  it('should provide duplicate Company for when it is false', () => {
    const apCompany = 'YRC';
    let data =  component.listOfApValues;
    data = [{companyName: 'FEDEX ECONOMY'}];
    component.listOfApValues = data;
    component.duplicateCompany(apCompany);
    expect( component.showErrorMsg).toBe(false);
  });

  it('should provide duplicate company for AR when it is false', () => {
    const arCompany = 'FEDEX ECONOMY';
    let data = component.listOfArValues;
    data = [{companyName: 'YRC'}];
    component.listOfArValues = data;
    component.duplicateArCompany(arCompany);
    expect(component.showErrorMsgAr).toBe(false);
  });

  it('should provide duplicate company for AR', () => {
    const arCompany = 'YRC';
    let data = component.listOfArValues;
    data = [{companyName: 'YRC', discount: '18.5', fuelsurcharge: '16', amc: '80', recentRateId: 1}];
    component.listOfArValues = data;
    component.duplicateArCompany(arCompany);
    expect(component.showErrorMsgAr).toBe(true);
  });

  it('should call edit Ap data', () => {
    const data = {companyName: 'YRC', discount: '12.5', fuelsurcharge: '15', amc: '50', recentRateId: 1};
    const ap = {data: data};
    component.editApData(ap);
    expect(component.showEditAp).toBe(true);
  });

  it('should call edit Ar data', () => {
    const data = {companyName: 'YRC', discount: '12.5', fuelsurcharge: '15', amc: '50', recentRateId: 1};
    const ar = {data: data};
    component.editArData(ar);
    expect(component.showEditAr).toBe(true);
  });

  it('should call editSaveAPData method', () => {
    spyOn(service, 'editSaveApForm').and.callThrough();
    const data = {'value':
    {'recentRateId': 0,
      'companyName': 'FEDEX ECONOMY',
      'type': 'AP',
      'fuelsurcharge': '12',
      'discount': '55',
      'amc': '15'}
    };
    component.editSaveAPData(data);
    expect(component.showEditAp).toBe(false);
  });

  it('should call editSaveARData method', () => {
    spyOn(service, 'editSaveArForm').and.callThrough();
    const data = {'value':
    {'recentRateId': 0,
      'companyName': 'FEDEX ECONOMY',
      'type': 'AR',
      'fuelsurcharge': '12',
      'discount': '55',
      'amc': '15'}
    };
    component.editSaveArData(data);
    expect(component.showEditAr).toBe(false);
  });

  it('should call delete Ap data method', () => {
    spyOn(service, 'deleteAp').and.callThrough();
    const data = {'value':
    {'recentRateId': 1,
      'companyName': 'FEDEX ECONOMY',
      'type': 'AP',
      'fuelsurcharge': '12',
      'discount': '55',
      'amc': '15'}
    };
    const list = 1;
    component.deleteApData(data, list);
  });

  it('should call delete Ar data method', () => {
    spyOn(service, 'deleteAr').and.callThrough();
    const data = {'value':
    {'recentRateId': 1,
      'companyName': 'FEDEX ECONOMY',
      'type': 'AP',
      'fuelsurcharge': '12',
      'discount': '55',
      'amc': '15'}
    };
    const list = 1;
    component.deleteArData(data, list);
  });

  it('should call cancel of AP data', () => {
    const type = 'ap';
    component.cancel(type);
    expect(component.APForm.controls['apCompany'].value).toBe('');
    expect(component.APForm.controls['apDiscount'].value).toBe('');
    expect(component.APForm.controls['apFsc'].value).toBe('');
    expect(component.APForm.controls['apAmc'].value).toBe('');
    expect(component.showEditAp).toBe(false);
  });

  it('should call cancel of AR data when it is not defined', () => {
    const type = '';
    component.cancel(type);
    expect(component.ARForm.controls['arCompany'].value).toBe('');
    expect(component.ARForm.controls['arDiscount'].value).toBe('');
    expect(component.ARForm.controls['arFsc'].value).toBe('');
    expect(component.ARForm.controls['arAmc'].value).toBe('');
    expect(component.showEditAr).toBe(false);
  });

  /*it('should call cancel of AR data', () => {
   let type = '';
   component.cancel(type);
   expect(component.showEditAr).toBe(false);
   });*/


});

