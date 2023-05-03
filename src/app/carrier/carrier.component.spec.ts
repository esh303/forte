import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierComponent } from './carrier.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Http, Response, RequestOptions } from '@angular/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes, Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UseLocalStorage, SetAccessTokenLocal } from '../services/localStorage.service';

describe('CarrierComponent', () => {
  let component: CarrierComponent;
  let fixture: ComponentFixture<CarrierComponent>;
  const userLocalStorage =  {
    'id': 19,
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
    'lastUpdated': '2018-02-13T10:47:13.000Z'

  };
  const accessTokenLocalStorage = 'H4vzIE49vcS9dA5Pm6JU8rAm9APazBfWFuySEq0mW41vW5MjU4UicCQqDsfFPXsw';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrierComponent ],
      imports: [ RouterModule, RouterTestingModule, HttpClientModule, HttpModule ],
      providers: [ UseLocalStorage, SetAccessTokenLocal ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierComponent);
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

  it('should set access token', () => {
    const accessTokenService = TestBed.get(SetAccessTokenLocal);
    accessTokenService.setAccessToken('accesstoken');
    localStorage.setItem('accesstoken', JSON.stringify(accessTokenLocalStorage));
    expect(localStorage.getItem('accesstoken')).toEqual(JSON.stringify(accessTokenLocalStorage));
  });

  /*it('should call logout method', () => {
    component.logout();
    const spyFunction = spyOn((<any>component).router, 'navigate');
    expect(spyFunction).toHaveBeenCalledWith(['/internalsalesreplogin']);
  });*/

  /*it('should call logout method',  ()=> {
    const spyFunction = spyOn((<any>component).router, 'navigate');
    *//*let pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'callsLogout').and.callThrough();*//*
    component.logout();
    expect(spyFunction).toHaveBeenCalledWith(['/internalsalesreplogin']);
    //const spyFunction = spyOn((<any>component).router, 'navigate');
    *//*let service: SetAccessTokenLocal;
    service = TestBed.get(SetAccessTokenLocal);
    service.setAccessToken('accesstoken');
    let pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'callsLogout').and.callThrough();*//*
    //component.logout();
    *//*localStorage.setItem('accesstoken', JSON.stringify(accessTokenLocalStorage));*//*
    // expect(localStorage.getItem('accesstoken')).toEqual(JSON.stringify(accessTokenLocalStorage));
    //expect(spyFunction).toHaveBeenCalledWith(['/internalsalesreplogin']);
  });*/

  /*it('should move to home page', () => {
    fixture.detectChanges();
    const spyFunction = spyOn((<any>component).router, 'navigate');
    component.goToMain();
    expect(spyFunction).toHaveBeenCalledWith(['/main']);
  });*/

});
