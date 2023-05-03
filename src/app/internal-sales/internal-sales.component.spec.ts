import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalSalesComponent } from './internal-sales.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ErrorMessageComponent } from '../common/error-message.component';
import { DialogComponent } from '../dialog/dialog.component';
import { PricingInfoService } from '../services/pricing-info.service';
import { LoggerService } from '../services/logger.service';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { UseLocalStorage, SetAccessTokenLocal, ApTableData, ArTableData } from '../services/localStorage.service';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

class MockUser {
  public dummyData = [{'recentRateId': 1,
    'companyName': 'FEDEX ECONOMY',
    'type': 'AP',
    'fuelsurcharge': '12',
    'discount': '55',
    'amc': '15'}];
  public dummyArData = [{'recentRateId': 1,
    'companyName': 'FEDEX ECONOMY',
    'type': 'AR',
    'fuelsurcharge': '12',
    'discount': '55',
    'amc': '15'}];

  dummyState = [{'zipCodeStateId': 38239,
    'zipCode': '90001',
    'latitude': '33.973951',
    'longitude': '-118.248405',
    'city': 'Los Angeles',
    'state': 'CA',
    'county': 'Los Angeles'}];

  dummyCustomerData = [
    {'customerName': 'ANTHONY THOMAS PROFILE', 'accountNumber': '', 'type': 'Customer', 'mobileNumber': null,
      'salesRepId': 3,
      'ratingNotes': 'FEDEX PRIORITY EAST TO EAST 79 % $86.00 MIN EAST INTRASTATE 79 % $86.00 MIN FAK65- 50-92.5 ' +
      'FEDEX ECONOMY - CAN OFFER NOT ON SVC AGREEMENT US TO US 78.5 $105.00 MIN FAK65- 50-92.5', 'id': 2},
    {'customerName': 'RAM TECHNOLOGIES', 'accountNumber': '', 'type': 'Customer', 'mobileNumber': null, 'salesRepId': 3,
      'ratingNotes': 'FEDEX PRIORITY WEST TO WEST 70 %, $83.00 MIN FAK100 ON CLASS 100-250', 'id': 5},
    {'customerName': 'PRATT AND LARSON', 'accountNumber': '', 'type': 'Customer', 'mobileNumber': null, 'salesRepId': 3,
      'ratingNotes': 'PRICING FEDEX PRIORITY WEST TO EAST 75% 115.00 WEST INTRASTATE',
      'id': 8},
    {'customerName': 'GOLF WORKS', 'accountNumber': '', 'type': 'Customer', 'mobileNumber': '', 'salesRepId': 3,
      'ratingNotes': 'YRC ACCOUNT #873-2034 INTERSTATE 78% $72.00 MIN',
      'id': 11},
    {'customerName': 'IP CALLISON', 'accountNumber': 'IPCALL001', 'type': 'Customer', 'mobileNumber': '', 'salesRepId': 3,
      'ratingNotes': 'FEDEX PRIORITY-GENERIC-BILL TO FORTE',
      'id': 14},
    {'customerName': 'QUALITY BUSINESS', 'accountNumber': 'QUABUS', 'type': 'Customer', 'mobileNumber': '8965424454', 'salesRepId': 3,
      'ratingNotes': 'Fedex priority west to west 77% $77', 'id': 44},
    {'customerName': 'Realtek', 'accountNumber': 'REATEK', 'type': 'Customer', 'mobileNumber': '8789966665', 'salesRepId': 3,
      'ratingNotes': 'Fedex priority', 'id': 45},
    {'customerName': 'Xerox', 'accountNumber': 'Xerox', 'type': 'Customer', 'mobileNumber': '9364545487', 'salesRepId': 3,
      'ratingNotes': 'Fedex Priority', 'id': 47}];

  dummyAllCustomerData = [{'customerName': 'FSX PROFILE', 'accountNumber': '', 'type': 'Customer', 'mobileNumber': null,
    'salesRepId': 13, 'ratingNotes': 'FEDEX PRIORITY WEST TO WEST 84 % $80.00 MIN WEST INTRASTATE 84 % $80.00 MIN ' +
    'ALL FAK77.5 ON CLASS 77.5 TO CLASS 85 OUTBOUND SHIPMENT FROM WA ONLY ALL OTHER LANES',
    'id': 1},
    {'customerName': 'ANTHONY THOMAS PROFILE', 'accountNumber': 'ANTTHO', 'type': 'Customer', 'mobileNumber': null,
      'salesRepId': 11, 'ratingNotes': 'FEDEX PRIORITY EAST TO EAST 79 % $86.00 MIN EAST INTRASTATE 79 % $86.00 MIN', 'id': 2},
    {'customerName': 'TIMBER PRO PROFILE', 'accountNumber': 'TIMP', 'type': 'Customer', 'mobileNumber': null, 'salesRepId': 14,
      'ratingNotes': 'FEDEX PRIORITY WEST TO WEST 78.5% $74.00 MIN WEST INTRASTATE 78.5% $74.00 MIN ', 'id': 3},
    {'customerName': 'CAPITAL RESIN PROFILE', 'accountNumber': 'CAPRES', 'type': 'Customer', 'mobileNumber': null,
      'salesRepId': 13, 'ratingNotes': 'FEDEX PRIORITY EAST TO EAST 71.5 % $73.00 MIN FAK55 55-85 ', 'id': 4},
    ];
  logout = {};
  quoteDetails = {'quoteId': {'FEDEX ECONOMYAP': '0221003', 'YRCAR': '0221004', 'FEDEX ECONOMYAR': '0221003',
    'FEDEX PRIORITYAR': '0221005', 'YRCAP': '0221004', 'FEDEX PRIORITYAP': '0221005'}};
  yrcResponseAp = {'result': {'classWeight': [{'weight': 1000, 'classification': 77, 'classnew': '077'}],
    'origin': 90001, 'destination': '90099', 'originState': 'CA', 'destinationState': 'CA', 'customerId': 1, 'totalWeight': 1000,
    'yrcProfileRateAp': {'profileDiscount': '90.20', 'profileMinCharge': '115.00'}, 'shipTypes': 'Direct', 'newOrigin': '90099',
    'originalDestination': 90005, 'originBasingMatrixId': '90000', 'destinationBasingMatrixId': '90000', 'diffRate': 0,
    'finalDiffRate': 0, 'diffWeight': 0, 'crtRate': 0, 'type': 'Rate',
    'rate': [{'classification': 77, 'weight': 1000, 'rate': '94.15', 'DWRate': '83.79', 'finalRate': '941.50', 'finalDWRate': '837.90'}],
    'additionalRate': '75.00', 'additionalMinRate': 0}};
  yrcResponseDwRate = {'result': {'classWeight': [{'weight': 400, 'classification': 85, 'classnew': '085'}],
    'origin': 50073, 'destination': '60899', 'originState': 'IA', 'destinationState': 'IL', 'customerId': 1,
    'totalWeight': 400, 'yrcProfileRateAp': {'profileDiscount': '90.30', 'profileMinCharge': '115.00'},
    'shipTypes': 'Direct', 'newOrigin': '50099', 'originalDestination': 60803, 'originBasingMatrixId': '50000',
    'destinationBasingMatrixId': '60800', 'diffRate': '120.85', 'finalDiffRate': 604.25, 'diffWeight': 100,
    'crtRate': 120.85, 'type': 'DWRate',
    'rate': [{'classification': 85, 'weight': 400, 'rate': '159.02', 'DWRate': '120.85',
      'finalRate': '636.08', 'finalDWRate': '483.40'}],
    'additionalRate': 0, 'additionalMinRate': 0}};

  yrcResponseAr = {'result': {'classWeight': [{'weight': 1000, 'classification': 77, 'classnew': '077'}],
    'origin': 90001, 'destination': '90099', 'originState': 'CA', 'destinationState': 'CA', 'customerId': 1,
    'yrcProfileRateAr': [], 'shipTypes': 'Direct', 'newOrigin': '90099', 'originalDestination': 90005,
    'originBasingMatrixId': '90000', 'destinationBasingMatrixId': '90000', 'diffRate': 0, 'finalDiffRate': 0, 'diffWeight': 0,
    'crtRate': 0, 'type': 'Rate',
    'rate': [{'classification': 77, 'weight': 1000, 'rate': '113.95', 'DWRate': '101.58', 'finalRate': '1139.50',
      'finalDWRate': '1015.80'}], 'additionalRate': '75.00', 'additionalMinRate': 0}};
  fedexResponseAp = {'result': {'classWeight': [{'weight': 1000, 'classification': 77, 'classnew': '0775'}],
    'origin': 90001, 'destination': 90005, 'originState': 'CA', 'destinationState': 'CA', 'customerId': 1, 'FEprofileRate': [],
    'FPprofileRate': [], 'originBaseZipCode': '90001', 'destinationBaseZipCode': '90000', 'originalDestination': 90005,
    'rateBaseNumber': '070515', 'minCharges': '480.51',
    'rate': [{'classification': 77, 'weight': 1000, 'rate': '92.14', 'finalRate': '921.40'}],
    'originalDiffRateList': [{'crtRate': 0, 'diffWeight': 0, 'diffRate': 0, 'finalDiffRate': '921.40'}], 'discount': 0, 'mcf': 0}};
  fedexResponseAr = {'result': {'classWeight': [{'weight': 1000, 'classification': 77, 'classnew': '0775'}],
    'origin': 90001, 'destination': 90005, 'originState': 'CA', 'destinationState': 'CA', 'customerId': 1,
    'FEprofileRate': [], 'FPprofileRate': [], 'originBaseZipCode': '90001 ', 'destinationBaseZipCode': '90000 ',
    'originalDestination': 90005, 'rateBaseNumber': '070515', 'minCharges': '527.72',
    'rate': [{'classification': 77, 'weight': 1000, 'rate': '101.20', 'finalRate': '1012.00'}],
    'originalDiffRateList': [{'crtRate': 0, 'diffWeight': 0, 'diffRate': 0, 'finalDiffRate': '1012.00'}],
    'discount': 0, 'mcf': 0, 'additionalRate': 0}};
  public getApForm() {
    return Observable.of(this.dummyData);
  }
  public getArForm() {
    return Observable.of(this.dummyArData);
  }

  public getCityState() {
    return Observable.of(this.dummyState);
  }
  public getSpecificCustomerName() {
    return Observable.of(this.dummyCustomerData);
  }
  public getAllCustomerName() {
    return Observable.of(this.dummyAllCustomerData);
  }

  public callsLogout() {
    return Observable.of(this.logout);
  }

  public saveQuoteDetails() {
    return Observable.of(this.quoteDetails);
  }

  public savePricingInfoYrc() {
    return Observable.of(this.yrcResponseAp);
  }
  public savePricingInfoYrcDwRate() {
    return Observable.of(this.yrcResponseDwRate);
}
  public savePricingInfoYrcAr() {
    return Observable.of(this.yrcResponseAr);
  }

  public savePricingInfoFed() {
    return Observable.of(this.fedexResponseAp);
  }

  public savePricingInfoFedAR() {
    return Observable.of(this.fedexResponseAr);
  }
}

describe('InternalSalesComponent', () => {
  let component: InternalSalesComponent;
  let fixture: ComponentFixture<InternalSalesComponent>;
  let pricingInfoService: PricingInfoService;
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
  const apLocalStorage = [{'recentRateId': 1, 'companyName': 'FEDEX ECONOMY', 'type': 'AP', 'fuelsurcharge': '12',
    'discount': '55', 'amc': '15'}];
  const arLocalStorage = [{'recentRateId': 1, 'companyName': 'FEDEX ECONOMY', 'type': 'AR',
    'fuelsurcharge': '12', 'discount': '55',
    'amc': '15'}];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalSalesComponent, ErrorMessageComponent, DialogComponent ],
      imports: [ RouterModule, RouterTestingModule, ReactiveFormsModule, FormsModule, HttpModule,
        HttpClientModule, AngularMultiSelectModule ],
      providers: [ {provide: PricingInfoService, useClass: MockUser}, LoggerService,
        UseLocalStorage, SetAccessTokenLocal, ApTableData, ArTableData ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalSalesComponent);
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create token', () => {
    const service = TestBed.get(UseLocalStorage);
    service.setAccessToken('SalesRepName');
    localStorage.setItem('SalesRepName', JSON.stringify(userLocalStorage));
    expect(localStorage.getItem('SalesRepName')).toEqual(JSON.stringify(userLocalStorage));
  });

  it('should create get customer notes', () => {
    pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'getSpecificCustomerName').and.callThrough();
    component.getCustomerNotes();
    expect(component.customerFeatures).toBeDefined();
    expect(component.showSetMasterData).toBe(true);
  });

  it('should create get AP and AR methods', () => {
    pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'getApForm').and.callThrough();
    spyOn(pricingInfoService, 'getArForm').and.callThrough();
    component.getApData();
    component.getArData();
    expect(component.listOfApValues).toBeDefined();
    expect(component.listOfArValues).toBeDefined();
  });

  it('should check for class 77.5', () => {
    const value = 77.5;
    component.checkForClass(value);
    expect(component.transportOrigin.controls['className'].value).toBe('77');
  });

  it('should check for class 92.5', () => {
    const value = 92.5;
    component.checkForClass(value);
    component.filterClassValues.length = 1;
    expect(component.transportOrigin.controls['className'].value).toBe('92');
    expect(component.showErrorMessageForClass).toBe(false);
  });

  it('should check for class else condition', () => {
    const value = 155;
    component.checkForClass(value);
    component.filterClassValues.length = 0;
    expect(component.showErrorMessageForClass).toBe(true);
  });

  it('should check getAllCustomerNotes', () => {
    pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'getAllCustomerName').and.callThrough();
    component.salesRepType = 'customerServiceRep';
    component.getAllCustomerNotes();
    component.ngOnInit();
    expect(component.customerFeatures).toBeDefined();
    expect(component.showSetMasterData).toBe(false);
  });
  it('should check getAllCustomerNotes admin', () => {
    pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'getAllCustomerName').and.callThrough();
    component.salesRepType = 'administrator';
    component.getAllCustomerNotes();
    component.ngOnInit();
    expect(component.customerFeatures).toBeDefined();
    expect(component.showSetMasterData).toBe(true);

  });
  it('should check getAllCustomerNotes internalSalesRep', () => {
    pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'getAllCustomerName').and.callThrough();
    component.salesRepType = 'internalSalesRep';
    component.getAllCustomerNotes();
    component.ngOnInit();
    expect(component.customerFeatures).toBeDefined();
    expect(component.showSetMasterData).toBe(true);

  });

  it('should check getCustomerNotes();', () => {
    pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'getSpecificCustomerName').and.callThrough();
   // component.salesRepType = 'internalSalesRep';
    component.getCustomerNotes();
    // component.ngOnInit();
    expect(component.customerFeatures).toBeDefined();
   // expect(component.showSetMasterData).toBe(false);
  });

  it('should check checkOrigin If condition', () => {
    const origin = '';
    component.checkOrigin(origin);
    expect(component.showRemoveIcon).toBe(false);
    expect(component.errorMessage).toBe(false);
  });

  it('should check checkOrigin Else condition', () => {
    pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'getCityState').and.callThrough();
    const origin = 90001;
    component.checkOrigin(origin);
    component.getCity(origin);
    expect(component.showRemoveIcon).toBe(true);
    expect(component.getZipcodeValues).toBeDefined();
    expect(component.showZipcodes).toBe(true);
  });

it('should check getRating Notes', () => {
  pricingInfoService = TestBed.get(PricingInfoService);
  spyOn(pricingInfoService, 'getSpecificCustomerName').and.callThrough();
  const customer = 2;
  component.getCustomerNotes();
  component.getRatingNotes(customer);
  expect(component.customerFeatures).toBeDefined();
  expect(component.showRatingNotes).toBe(true);
  expect(component.showErrorCustomer).toBe(false);
});


  it('should check destination If condition', () => {
    const destination = '';
    component.checkDestination(destination);
    expect(component.showRemoveIconDest).toBe(false);
    expect(component.errorMessageDest).toBe(false);
  });

  it('should check checkOrigin Else condition', () => {
    pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'getCityState').and.callThrough();
    const destination = 90001;
    component.checkDestination(destination);
    component.getCityDest(destination);
    expect(component.getZipcodeValues).toBeDefined();
    expect(component.showZipcodeDest).toBe(true);
    expect(component.errorMessageDest).toBe(false);
  });
  it('should check checkOrigin Else condition length==0', () => {
    /*pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'getCityState').and.callThrough();*/
    const origin = '';
    component.checkOrigin(origin);
    component.getCity(origin);
    component.getZipcodeValues.length = 0;
    expect(component.errorMessage).toBe(false);
    expect(component.showZipcodes).toBe(true);
    /* expect(component.errorMessage).toBe('false');*/
  });

  it('should check checkOrigin Else condition length==0', () => {
    /*pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'getCityState').and.callThrough();*/
    const destination = '';
    component.checkDestination(destination);
    component.getCityDest(destination);
    component.getZipcodeValues.length = 0;
    expect(component.errorMessageDest).toBe(false);
    expect(component.showZipcodeDest).toBe(true);
    /* expect(component.errorMessage).toBe('false');*/
  });

  it('should check remove data OriginZipCode', () => {
    const removeData = 'originZipcode';
    component.remove(removeData);
    expect(component.showRemoveIcon).toBe(false);
    expect(component.showZipcodes).toBe(false);
    expect(component.showAllData).toBe(false);
    expect(component.showTable).toBe(false);
    expect(component.transportOrigin.controls['originZipcode'].value).toBe('');
  });

  it('should check remove data DestinationZipCode', () => {
    const removeData = 'destinationZipcode';
    component.remove(removeData);
    expect(component.showRemoveIconDest).toBe(false);
    expect(component.showZipcodeDest).toBe(false);
    expect(component.showAllData).toBe(false);
    expect(component.showTable).toBe(false);
    expect(component.transportOrigin.controls['destinationZipcode'].value).toBe('');
  });

  it('should check for clear method', () => {
    component.clear();
    expect(component.transportOrigin.controls['originZipcode'].value).toBe('');
    expect(component.transportOrigin.controls['destinationZipcode'].value).toBe('');
    expect(component.transportOrigin.controls['className'].value).toBe('');
    expect(component.transportOrigin.controls['weight'].value).toBe('');
    expect(component.transportOrigin.controls['customer'].value).toBe('');
    expect(component.transportOrigin.controls['ratingNotes'].value).toBe('');
    expect(component.showRemoveIcon).toBe(false);
    expect(component.showRemoveIconDest).toBe(false);
    expect(component.showTable).toBe(false);
    expect(component.showAllData).toBe(false);
    expect(component.showRatingNotes).toBe(false);
    expect(component.showZipcodes).toBe(false);
    expect(component.showZipcodeDest).toBe(false);
  });

  it('should check for the weight', () => {
    const weight = 1000;
    const object = {'customer': 'ANTHONY THOMAS PROFILE',
      'ratingNotes': 'FEDEX PRIORITY EAST TO EAST 79 % $86.00 MIN EAST INTRASTATE 79 % $86.00 MIN',
      'originZipcode': 90001, 'destinationZipcode': 90005, 'className': 55, 'weight': 1000};
    component.check(weight, object);
    expect(component.showCheckForWeight).toBe(false);
    expect(component.pricingObject).toBeDefined();
  });

  it('should check for the weight greater than 20000', () => {
    const weight = 25000;
    const object = {'customer': 'ANTHONY THOMAS PROFILE',
      'ratingNotes': 'FEDEX PRIORITY EAST TO EAST 79 % $86.00 MIN EAST INTRASTATE 79 % $86.00 MIN FAK65- 50-92.5',
      'originZipcode': 90001, 'destinationZipcode': 90005, 'className': 55, 'weight': 1000};
    component.check(weight, object);
    expect(component.showCheckForWeight).toBe(true);
    // expect(component.pricingObject).toBeDefined();
  });

  it('should call delete method', () => {
    const pricing = {className: 500, weight: 1000};
    const index = 1;
    component.delete(pricing, index);
    component.pricingDetail.splice(index, 1);
    component.pricingDetail.length = 0;
    expect(component.showTable).toBe(false);

  });

  it('should call refresh method', () => {
    pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'getApForm').and.callThrough();
    spyOn(pricingInfoService, 'getArForm').and.callThrough();
    component.refresh();
    component.getApData();
    component.getArData();
    expect(component.listOfApValues).toBeDefined();
    expect(component.listOfArValues).toBeDefined();
  });
  it('should check for assessorial method for Liftgate Service', () => {
    const selectedItems = [{ Fedexcost: '72.06', Yrccost: '8.80', id: 1, itemName: 'Liftgate Service'}];
    const weight = 2000;
    component.assessorialFunction(selectedItems, weight);
  });

  it('should check for assessorial method for Liftgate Service', () => {
    const selectedItems = [{ Fedexcost: '72.06', Yrccost: '8.80', id: 1, itemName: 'Liftgate Service'}];
    const weight = 8000;
    component.assessorialFunction(selectedItems, weight);
  });
  it('should check for assessorial method for Liftgate Service', () => {
    const selectedItems = [{ Fedexcost: '72.06', Yrccost: '8.80', id: 1, itemName: 'Liftgate Service'}];
    const weight = 500;
    component.assessorialFunction(selectedItems, weight);
  });

  it('should check for assessorial method for Residential Delivery', () => {
    const selectedItems = [{'id': 2, 'itemName': 'Residential Delivery', 'Yrccost': '11', 'Fedexcost': '76'}];
    const weight = 1000;
    component.assessorialFunction(selectedItems, weight);
  });
  it('should check for assessorial method for Residential Delivery', () => {
    const selectedItems = [{'id': 2, 'itemName': 'Residential Delivery', 'Yrccost': '11', 'Fedexcost': '76'}];
    const weight = 500;
    component.assessorialFunction(selectedItems, weight);
  });

  it('should check for assessorial method for Limited Access Delivery', () => {
    const selectedItems = [{'id': 3, 'itemName': 'Limited Access Delivery', 'Yrccost': '0', 'Fedexcost': '76'}];
    const weight = 1000;
    component.assessorialFunction(selectedItems, weight);
  });

  it('should check for assessorial method for Inside Delivery', () => {
    const selectedItems = [{'id': 4, 'itemName': 'Inside Delivery', 'Yrccost': '11.85', 'Fedexcost': '6.98', 'FedexcostAR': '11.40'}];
    const weight = 1000;
    component.assessorialFunction(selectedItems, weight);
  });
  it('should check for assessorial method for Inside Delivery', () => {
    const selectedItems = [{'id': 4, 'itemName': 'Inside Delivery', 'Yrccost': '11.85', 'Fedexcost': '6.98', 'FedexcostAR': '11.40'}];
    const weight = 1500;
    component.assessorialFunction(selectedItems, weight);
  });
  it('should check for assessorial method for Inside Delivery', () => {
    const selectedItems = [{'id': 4, 'itemName': 'Inside Delivery', 'Yrccost': '11.85', 'Fedexcost': '6.98', 'FedexcostAR': '11.40'}];
    const weight = 18000;
    component.assessorialFunction(selectedItems, weight);
  });
  it('should check for assessorial method for Notify', () => {
    const selectedItems = [{'id': 5, 'itemName': 'Notify', 'Yrccost': '0', 'Fedexcost': '0'}];
    const weight = 1000;
    component.assessorialFunction(selectedItems, weight);
  });
  it('should check for assessorial method for Notify', () => {
    const selectedItems = [{'id': 6, 'itemName': 'Others'}];
    const weight = 1000;
    component.assessorialFunction(selectedItems, weight);
  });

  it('should check clearData', () => {
    component.clearData();
  });

  it('should check netChargeArrSum', () => {
    const netCharge = ['100', '300'];
    component.netChargeArrSum(netCharge);
  });
  it('should check for add Item', () => {
    component.addItem();
    expect(component.showChooseClass).toBe(true);
  });
  it('should check if customer is entered wrongly', () => {
    const value = true;
    component.getData(value);
    expect(component.showErrorCustomer).toBe(true);
    expect(component.showRatingNotes).toBe(false);
  });

  it('should check if customer is entered correctly', () => {
    const value = false;
    component.getData(value);
    expect(component.showErrorCustomer).toBe(false);
    expect(component.showRatingNotes).toBe(false);
    expect(component.errorValue).toBe(false);
  });

  it('should check for assessorial item select ', () => {
    const item = {'id': 6};
    component.onItemSelect(item);
    expect(component.showForOthers).toBe(true);
  });
  it('should check for assessorial item select ', () => {
    const item = {'id': 5};
    component.onItemSelect(item);
    expect(component.showForOthers).toBe(false);
  });
  it('should check for assessorial item select ', () => {
    const item = {'id': 6};
    component.OnItemDeSelect(item);
    expect(component.showForOthers).toBe(false);
  });

  it('should check for saveOthers', () => {
    const form = {'amount': 100, 'amountIncDec': 'increment', 'reason': 'other goods'};
    component.saveOthers(form);
  });
  it('should call viewAllDetails', () => {
    component.viewAllDetails();
  });
  it('should call viewAllDetails', () => {
    component.viewAllDetailsFedexEco();
  });
  it('should call viewAllDetails', () => {
    component.viewAllDetailsFedexPri();
  });
  it('should call pricing method', () => {
    pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'savePricingInfoYrc').and.callThrough();
    spyOn(pricingInfoService, 'savePricingInfoYrcAr').and.callThrough();
    spyOn(pricingInfoService, 'savePricingInfoFed').and.callThrough();
    spyOn(pricingInfoService, 'savePricingInfoFedAR').and.callThrough();
    spyOn(pricingInfoService, 'getCityState').and.callThrough();
    const origin = 90001;
    component.checkOrigin(origin);
    component.getCity(origin);
    const service = TestBed.get(ApTableData);
    service.setAccessToken('aptableData');
    localStorage.setItem('aptableData', JSON.stringify(apLocalStorage));
    expect(localStorage.getItem('aptableData')).toEqual(JSON.stringify(apLocalStorage));
    const arService = TestBed.get(ArTableData);
    arService.setAccessToken('artableData');
    localStorage.setItem('artableData', JSON.stringify(arLocalStorage));
    expect(localStorage.getItem('artableData')).toEqual(JSON.stringify(arLocalStorage));
    component.customerId = 2;
    const object = {'customerId': component.customerId, 'customer': 2,
      'originState': component.filterValuesState, 'destinationState': component.filterValuesDestState,
      'ratingNotes': 'FEDEX PRIORITY EAST TO EAST 79 % $86.00 MIN ',
      'originZipcode': 90001, 'destinationZipcode': 90005};
    const pricingDetail = [{'classification': 55, 'weight': 800}];
    const selectedItem = {'id': 1, 'itemName': 'Liftgate Service', 'Yrccost': '8.80', 'Fedexcost': '72.06'};
    component.userData = {'origin': 90001, 'destination': 90005, 'customerId': component.customerId,
      'originState': component.filterValuesState, 'destinationState': component.filterValuesDestState };
    component.pricing(object, selectedItem, pricingDetail);
    expect(component.yrcApResponse).toBeDefined();
    expect(component.pricingInfo).toBeDefined();
    expect(component.showYrcData).toBe(true);
  });

  it('should call pricing method', () => {
    pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'savePricingInfoYrcDwRate').and.callThrough();
    spyOn(pricingInfoService, 'savePricingInfoYrcAr').and.callThrough();
    spyOn(pricingInfoService, 'savePricingInfoFed').and.callThrough();
    spyOn(pricingInfoService, 'savePricingInfoFedAR').and.callThrough();
    spyOn(pricingInfoService, 'getCityState').and.callThrough();
    const origin = 90001;
    component.checkOrigin(origin);
    component.getCity(origin);
    const service = TestBed.get(ApTableData);
    service.setAccessToken('aptableData');
    localStorage.setItem('aptableData', JSON.stringify(apLocalStorage));
    expect(localStorage.getItem('aptableData')).toEqual(JSON.stringify(apLocalStorage));
    const arService = TestBed.get(ArTableData);
    arService.setAccessToken('artableData');
    localStorage.setItem('artableData', JSON.stringify(arLocalStorage));
    expect(localStorage.getItem('artableData')).toEqual(JSON.stringify(arLocalStorage));
    component.customerId = 2;
    const object = {'customerId': component.customerId, 'customer': 2,
      'originState': component.filterValuesState, 'destinationState': component.filterValuesDestState,
      'ratingNotes': 'FEDEX PRIORITY EAST TO EAST 79 % $86.00 MIN ',
      'originZipcode': 50073, 'destinationZipcode': 60803};
    const pricingDetail = [{'classification': 55, 'weight': 800}];
    const selectedItem = {'id': 1, 'itemName': 'Liftgate Service', 'Yrccost': '8.80', 'Fedexcost': '72.06'};
    component.userData = {'origin': 50073, 'destination': 60803, 'customerId': component.customerId,
      'originState': component.filterValuesState, 'destinationState': component.filterValuesDestState };
    component.pricing(object, selectedItem, pricingDetail);
    expect(component.yrcApResponse).toBeDefined();
    expect(component.pricingInfo).toBeDefined();
    expect(component.showYrcData).toBe(true);
  });


  it('should call clear data method', () => {
    component.clearData();
    expect(component.transportOrigin.controls['originZipcode'].value).toBeDefined();
    expect(component.transportOrigin.controls['destinationZipcode'].value).toBeDefined();
  });

  it('should call callFunction method', () => {
    component.callFunction();
    expect(component.showTableAp).toBe(true);
    expect(component.showClearAll).toBe(true);
  });

  it('should call remove local storage method', () => {
    component.removeLocal();
  });


});
