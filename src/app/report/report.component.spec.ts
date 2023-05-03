import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportComponent } from './report.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuoteReportService } from '../services/quote-report.service';
import { PricingInfoService } from '../services/pricing-info.service';
import { ExcelService } from '../services/excel.service';
import { UseLocalStorage, SetAccessTokenLocal } from '../services/localStorage.service';

import { HttpModule } from '@angular/http';

import { RouterModule, Routes} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from '../services/interceptor.class';
import { LoggerService } from '../services/logger.service';
import { HttpClient } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


class ToastrMessage {
  public success() {
    return 'Logged in successfully';
  }
}

class MockExcel {
  excelData = [{}];
  public exportAsExcelFile() {
    return this.excelData;
  }
}
class MockZipcode {
  dummyState = [{'zipCodeStateId': 38239,
    'zipCode': '90001',
    'latitude': '33.973951',
    'longitude': '-118.248405',
    'city': 'Los Angeles',
    'state': 'CA',
    'county': 'Los Angeles'}];

  logout = {};
  salesRepData = [{'salesRepId': '', 'salesRepName': 'bruce', 'mobileNumber': '123456780', 'type': 'administrator',
    'invalidLoginAttempt': 0, 'realm': '', 'username': 'bruce', 'credentials': 'object', 'challenges': 'object',
    'email': 'bruce@fortetlc.com', 'emailVerified': false, 'status': '', 'created': '2018-02-13T10:47:13.000Z',
    'lastUpdated': '2018-02-13T10:47:13.000Z', 'id': 19},
    {'salesRepId': '', 'salesRepName': 'mike', 'mobileNumber': '123456780', 'type': 'administrator', 'invalidLoginAttempt': 0,
      'realm': '', 'username': 'mike', 'credentials': 'object', 'challenges': 'object', 'email': 'mike@fortetlc.com',
      'emailVerified': false, 'status': '', 'created': '2018-02-13T10:47:13.000Z', 'lastUpdated': '2018-02-13T10:47:13.000Z',
      'id': 20},
    {'salesRepId': 'RZI', 'salesRepName': 'Randi Zaborowski', 'mobileNumber': '8901837378', 'type': 'customerServiceRep',
      'invalidLoginAttempt': 0, 'realm': null, 'username': null, 'credentials': null, 'challenges': null,
      'email': 'randi@fortetlc.com', 'emailVerified': null, 'status': null, 'created': null, 'lastUpdated': null, 'id': 21},
    {'salesRepId': 'BAS', 'salesRepName': 'Bob Schuler', 'mobileNumber': '5039536338', 'type': 'internalSalesRep',
      'invalidLoginAttempt': 0, 'realm': null, 'username': null, 'credentials': null, 'challenges': null,
      'email': 'bob@fortetlc.com', 'emailVerified': null, 'status': null, 'created': null, 'lastUpdated': null, 'id': 22},
    {'salesRepId': 'JRB', 'salesRepName': 'Jim Bonaventure', 'mobileNumber': '6148329923', 'type': 'internalSalesRep',
      'invalidLoginAttempt': 3, 'realm': null, 'username': null, 'credentials': null, 'challenges': null,
      'email': 'jim@fortetlc.com', 'emailVerified': null, 'status': null, 'created': null, 'lastUpdated': null, 'id': 23},
    {'salesRepId': 'GDJ', 'salesRepName': 'Greg Joyce', 'mobileNumber': '9845545232', 'type': 'internalSalesRep',
      'invalidLoginAttempt': 0, 'realm': null, 'username': null, 'credentials': null, 'challenges': null,
      'email': 'greg@fortetlc.com', 'emailVerified': null, 'status': null, 'created': null, 'lastUpdated': null, 'id': 24},
    {'salesRepId': 'CJJ', 'salesRepName': 'CJ Jones', 'mobileNumber': '9856556322', 'type': 'internalSalesRep',
      'invalidLoginAttempt': 0, 'realm': null, 'username': null, 'credentials': null, 'challenges': null,
      'email': 'cj@fortetlc.com', 'emailVerified': null, 'status': null, 'created': null, 'lastUpdated': null, 'id': 25}];
  customerData = [{'customerName': 'FSX PROFILE', 'accountNumber': '', 'type': 'Customer', 'mobileNumber': null,
    'salesRepId': 22,
    'ratingNotes': 'FEDEX PRIORITY WEST TO WEST 84 % $80.00 MIN WEST INTRASTATE 84 % $80.00 MIN ALL FAK77.5', 'id': 1},
    {'customerName': 'ANTHONY THOMAS PROFILE', 'accountNumber': 'ANTTHO', 'type': 'Customer', 'mobileNumber': null, 'salesRepId': 23,
      'ratingNotes': 'FEDEX PRIORITY EAST TO EAST 79 % $86.00 MIN EAST INTRASTATE 79 % $86.00 MIN FAK65- 50-92.5 ', 'id': 2},
    {'customerName': 'TIMBER PRO PROFILE', 'accountNumber': 'TIMP', 'type': 'Customer', 'mobileNumber': null, 'salesRepId': 24,
      'ratingNotes': 'FEDEX PRIORITY WEST TO WEST 78.5% $74.00 MIN WEST INTRASTATE 78.5% $74.00 MIN', 'id': 3},
      {'customerName': 'CAPITAL RESIN PROFILE', 'accountNumber': 'CAPRES', 'type': 'Customer', 'mobileNumber': null, 'salesRepId': 22,
        'ratingNotes': 'FEDEX PRIORITY EAST TO EAST 71.5 % $73.00 MIN FAK55 55-85 EAST INTRASTATE 71.5 % $73.00 MIN ', 'id': 4}];
  public getCityState() {
    return Observable.of(this.dummyState);
  }



  public getAllCustomerName() {
    return Observable.of(this.customerData);
  }
  public getSalesDetail() {
    return Observable.of(this.salesRepData);
  }
  public callsLogout() {
    return Observable.of(this.logout);
  }
}

class MockUser {
  dummyData = [
    {'customerName': 'ANTHONY THOMAS PROFILE', 'type': 'Customer', 'mobileNumber': null, 'salesRepId': 3,
      'ratingNotes': 'FEDEX PRIORITY EAST TO EAST 79 % $86.00 MIN EAST INTRASTATE 79 % $86.00 MIN FAK65- 50-92.5',
      'realm': null, 'username': null, 'credentials': null, 'challenges': null, 'email': 'antony@gmail.com',
      'emailVerified': null, 'status': null, 'created': null, 'lastUpdated': null, 'id': 2},
    {'customerName': 'RAM TECHNOLOGIES', 'type': 'Customer', 'mobileNumber': null, 'salesRepId': 3,
      'ratingNotes': 'FEDEX PRIORITY WEST TO WEST 70 %, $83.00 MIN FAK100 ON CLASS 100-250, FAK150 ON CLASS 300 ',
      'realm': null, 'username': null, 'credentials': null, 'challenges': null, 'email': 'ram@gmail.com',
      'emailVerified': null, 'status': null, 'created': null, 'lastUpdated': null, 'id': 5},
    {'customerName': 'PRATT AND LARSON', 'type': 'Customer', 'mobileNumber': null, 'salesRepId': 3,
      'ratingNotes': 'PRICING FEDEX PRIORITY WEST TO EAST 75% 115.00 WEST INTRASTATE 85% $75.00 WEST TO WEST 85% $75.00 ',
      'realm': null, 'username': null, 'credentials': null, 'challenges': null, 'email': 'pratt@gmail.com',
      'emailVerified': null, 'status': null, 'created': null, 'lastUpdated': null, 'id': 8},
    {'customerName': 'GOLF WORKS', 'type': 'Customer', 'mobileNumber': '', 'salesRepId': 3,
      'ratingNotes': 'YRC ACCOUNT #873-2034 INTERSTATE 78% $72.00 MIN INTRASTATE 78% $72.00 MIN',
      'realm': '', 'username': null, 'credentials': null, 'challenges': null, 'email': 'golf@gmail.com',
      'emailVerified': null, 'status': null, 'created': null, 'lastUpdated': null, 'id': 11},
    {'customerName': 'IP CALLISON', 'type': 'Customer', 'mobileNumber': '', 'salesRepId': 3,
      'ratingNotes': 'FEDEX PRIORITY-GENERIC-BILL TO FORTE WEST TO WEST 75% $75.00 MIN WEST INTRASTATE 73% $75.00 ',
      'realm': '', 'username': null, 'credentials': null, 'challenges': null, 'email': 'callison@gmail.com',
      'emailVerified': null, 'status': null, 'created': null, 'lastUpdated': null, 'id': 14}];

  reportData = {
    'result': [
      {
        'quoteId': 1104,
        'quoteReferenceId': '1222021',
        'customerId': 2,
        'salesRepId': '3',
        'originZip': '98421',
        'destinationZip': '94544',
        'classAndWeight': '[{\"weight\":1225,\"classification\":100}]',
        'time': '04:40 PM',
        'accessorials': '',
        'carrier': 'YRC',
        'totalCharge': '857.20',
        'rateDetail': '{\"highCostDeliveryCharge\":0,\"rate\":[\"176.77\"],' +
        '\"finalRate\":[\"2165.43\"],\"discount\":[\"68\"],\"fuelChargeYrc\":[\"22.55\"],' +
        '\"fuelCharge\":[\"22.55\"],\"discountedRate\":[\"692.94\"],\"netCharge\":[\"849.20\"],' +
        '\"totalCharge\":[\"857.20\"],\"fuelChargeDiff\":\"22.55\",\"discountDiff\":\"68\",\"weight\":[1225],' +
        '\"classification\":[100],\"classification1\":[],\"diffWeight\":[],\"diffRate\":[],\"crtRate\":[],' +
        '\"diffDiscountedRate\":[],\"diffNetCharge\":[],\"diffFinalRate\":[],\"assessorialCharge\":0,' +
        '\"assessorialChargeValue\":8,\"assessorialDataList\":[],\"shipType\":\"Direct\",' +
        '\"netChargeResult\":[\"156.26\"],\"netChargeDiffResult\":[],' +
        '\"additionalCharge\":8,\"singleShipmentCharge\":0}',
        'createdOn': '2017-12-22T00:00:00.000Z',
        'CustomersDetail': {
          'customerName': 'ANTHONY THOMAS PROFILE',
          'type': 'Customer',
          'mobileNumber': null,
          'salesRepId': 3,
          'ratingNotes': 'FEDEX PRIORITY EAST TO EAST 79 % $86.00 MIN EAST INTRASTATE 79 % $86.00 MIN',
          'id': 2
        }
      }
    ]
  };

  singleResponseData = [
    {'quoteId': 1847,
      'quoteReferenceId': '0209004',
      'customerId': 14,
      'salesRepId': '3',
      'originZip': '03241',
      'destinationZip': '10001',
      'classAndWeight': '[{\'weight\':1100,\'classification\':85}]',
      'time': ' 8:03:31 PM',
      'accessorials': '',
      'carrier': 'YRC',
      'category': 'AP',
      'totalCharge': '2846.56',
      'rateDetail': '{\"highCostDeliveryCharge\":104,\"rate\":[\"207.77\"],\"discount\":[0],' +
      '\"fuelChargeYrc\":[\"20\"],\"fuelCharge\":[\"20\"],\"finalRate\":[\"2285.47\"],' +
      '\"discountedRate\":[\"2285.47\"],\"netCharge\":[\"2742.56\"],\"netChargeResult\":[\"457.09\"],' +
      '\"netChargeDiffResult\":[],\"cwtCharge\":[],\"totalCharge\":[\"2846.56\"],\"totalRate\":\"2285.47\",' +
      '\"assessorialCharge\":0,\"classification\":[85],\"classification1\":[],\"weight\":[1100],' +
      '\'shipType\':\'Non Direct\',\'fuelChargeDiff\':\'20\',\'discountDiff\':0,\"diffClass\":85,' +
      '\"diffRate\":[],\"diffFinalRate\":[],\"crtRate\":[],\"diffWeight\":[],\"diffdiscountedRate\":[],' +
      '\"diffNetCharge\":[],\"additionalCharge\":0,\"assessorialDataList\":[],\"assessorialChargeValue\":\"104.00\"}',
      'createdOn': '2018-02-08T00:00:00.000Z'}];
  mailData = {'result': true};

  public fetchByValue() {
    return Observable.of(this.reportData);
  }

  public getParticularReport() {
    return Observable.of(this.singleResponseData);
  }

  public getAllCustomerNames() {
    return Observable.of(this.dummyData);
  }

  public sendMailFunction() {
    return Observable.of(this.mailData);
  }

}

describe('ReportComponent',  () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;
  const userLocalStorage = {
    'salesRepId': '',
    'salesRepName': 'bruce',
    'mobileNumber': '123456780',
    'type': 'administrator',
    'invalidLoginAttempt': 0,
    'realm': '',
    'username': 'bruce',
    'credentials': 'object',
    'challenges': 'object',
    'email': 'bruce@fortetlc.com',
    'emailVerified': false,
    'status': '',
    'created': '2018-02-13T10:47:13.000Z',
    'lastUpdated': '2018-02-13T10:47:13.000Z',
    'id': 19
  };
  const accessTokenLocalStorage = 'H4vzIE49vcS9dA5Pm6JU8rAm9APazBfWFuySEq0mW41vW5MjU4UicCQqDsfFPXsw';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportComponent ],
      imports: [ FormsModule, ReactiveFormsModule, HttpModule, RouterModule,
        RouterTestingModule, HttpClientModule, NgxPaginationModule ],
      providers: [ { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
        { provide: ExcelService, useClass: MockExcel }, UseLocalStorage, SetAccessTokenLocal,
        { provide: QuoteReportService, useClass: MockUser}, { provide: ToastrService, useClass: ToastrMessage},
        {provide: PricingInfoService, useClass: MockZipcode}, LoggerService, DatePipe ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = value;
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);

  });

  it('should create',  () => {
    expect(component).toBeTruthy();
  });

  it('should create token', () => {
    const service = TestBed.get(UseLocalStorage);
    service.setAccessToken('SalesRepName');
    localStorage.setItem('SalesRepName', JSON.stringify(userLocalStorage));
    expect(localStorage.getItem('SalesRepName')).toEqual(JSON.stringify(userLocalStorage));
  });

  it('should call getCustomer',  () => {
    const quoteReportService = TestBed.get(QuoteReportService);
    spyOn(quoteReportService, 'getAllCustomerNames').and.callThrough();
    component.getCustomer();
    expect(component.customerNames).toBeDefined();
  });


  it('should call reportClear ',  () => {
    component.reportClear();
    expect(component.reportForm.controls['origin'].value).toBe('');
    expect(component.reportForm.controls['destination'].value).toBe('');
    expect(component.reportForm.controls['customerName'].value).toBe('');
    expect(component.reportForm.controls['from_date'].value).toBe('');
    expect(component.reportForm.controls['to_date'].value).toBe('');
    expect(component.reportForm.controls['quoteNo'].value).toBe('');
    expect(component.customerId).toBe('');
    expect(component.showTable).toBe(false);
    expect(component.showErrorMessage).toBe(false);
  });

  it('should call get customer name',  () => {
    const quoteReportService = TestBed.get(QuoteReportService);
    spyOn(quoteReportService, 'getAllCustomerNames').and.callThrough();
    const customerName = 'IP CALLISON';
    component.getCustomerName(customerName);
    expect(component.showErrorForCustomer).toBe(true);
  });



  /*it('should call else part of the get customer name',  () => {
    component.customerNames.length = 0;
    const customerName = 'IP CALLISON';
    component.getCustomerName(customerName);
    expect(component.showErrorForCustomer).toBe(true);
  });*/

  it('should call close method',  () => {
    component.close();
    component.pclass = [];
    component.wclass = [];
    component.rateClass = [];
    component.finalRateClass = [];
    component.state = '';
    component.city = '';
    expect(component.showNextTable).toBe(false);
  });

  it('should call getStateAndCity method',  () => {
    const pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'getCityState').and.callThrough();
    const zipCode = 90001;
    component.getStateAndCity(zipCode);
    expect(component.zipCodeCityAndState).toBeDefined();
  });

  it('should call salesrep data', () => {
    const pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'getSalesDetail').and.callThrough();
    component.getSalesRepData();
    expect(component.salesRepArray).toBeDefined();
  });
  it('should call get customerNotes', () => {
    const pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'getAllCustomerName').and.callThrough();
    component.getAllCustomerNotes();
    expect(component.customerNames).toBeDefined();
  });
  it('should call getStateAndCity method',  () => {
    const pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'getCityState').and.callThrough();
    const zipCode = 90001;
    component.getStateAndCityDest(zipCode);
    expect(component.zipCodeCityAndState).toBeDefined();
  });
  it('should call getRecordsValue with null values ',  () => {
    // quoteReportService = TestBed.get(QuoteReportService);
    //  spyOn(quoteReportService, 'fetchByValue').and.callThrough();
    const value = {'quoteNo': '', 'customerName': '', 'customerId': '', 'salesRepId': '',
      'origin': '', 'destination': '',  'from_date': '',  'to_date': '', 'carrier': '', 'category': ''};
    const form = {value: value};
    // component.getRecordsValue(form);
    component.getReportDate(form);

    expect(component.searchDataErrorMessage).toBe(false);
  });

  it('should call getRecordsValue ',  () => {
    const quoteReportService = TestBed.get(QuoteReportService);
    spyOn(quoteReportService, 'fetchByValue').and.callThrough();
    const value = {'quoteReferenceId': 1222021, 'customerId': '', 'salesRepId': 3, 'originZipCode': '',
      'destinationZipCode': '',  'from_date': '',  'to_date': '', 'carrier': ''};
    const form = {value: value};
    component.getRecordsValue(form);
    component.getReportDate(form);
    expect(component.testResponse).toBeDefined();
    expect(component.showErrorMessage).toBe(false);
  });

 /* it('should call Else Method ' , () => {
    const value = {'quoteReferenceId': '', 'customerId': '', 'salesRepId': '3', 'originZipCode': '',
    'destinationZipCode': '',  'from_date': '',  'to_date': '', 'carrier': '', 'category': ''};
    const form = {value: value};

    component.getRecordsValue(form);
    component.getReportDate(form);
    component.testResponse.length = 0;
    expect(component.showTable).toBe(true);
    expect(component.showErrorMessage).toBe(false);
   *//* expect(component.showDownloadButton).toBe(false);
    expect(component.showLoader).toBe(false);*//*
  });*/

  it('should call Individual QuoteId method', () => {
    const quoteReportService = TestBed.get(QuoteReportService);
    spyOn(quoteReportService, 'getParticularReport').and.callThrough();
    const value = 1847;
    component.getResponseFromQuoteId(value);
    expect(component.singleReportData).toBeDefined();
  });


  /*it('should call Download data method', () => {
    quoteReportService = TestBed.get(QuoteReportService);
    spyOn(quoteReportService, 'fetchByValue').and.callThrough();
    *//*excelService = TestBed.get(ExcelService);
    spyOn(excelService, 'exportAsExcelFile').and.callThrough();*//*
    component.downloadData();
    expect(component.testResponse).toBeDefined();
    component.reportDataArray = component.testResponse;
    expect(component.reportDataArray).toBeDefined();
  });*/

  it('should call send mail data method', () => {
    const quoteReportService = TestBed.get(QuoteReportService);
    spyOn(quoteReportService, 'sendMailFunction').and.callThrough();
    component.sendMail();
    expect(component.mailResponse).toBeDefined();
   // expect(component.reportDataArray).toBeDefined();
  });


  /*it('should call logout method',  ()=> {
    let service: SetAccessTokenLocal;
    service = TestBed.get(SetAccessTokenLocal);
    service.setAccessToken('accesstoken');
    localStorage.setItem('accesstoken', JSON.stringify(accessTokenLocalStorage));
    expect(localStorage.getItem('accesstoken')).toEqual(JSON.stringify(accessTokenLocalStorage));

    pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'callsLogout').and.callThrough();
   // let spyFunction = spyOn((<any>component).router, 'navigate');
   // localStorage.removeItem('SalesRepName');
    component.logout();
   // expect(spyFunction).toHaveBeenCalledWith(['/internalsalesreplogin']);
  });*/
});
