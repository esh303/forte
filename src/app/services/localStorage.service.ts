/**
 * Created by Admin on 1/30/2018.
 */

import { Injectable } from '@angular/core';
// import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UseLocalStorage {
  SalesRepName = {
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

  setAccessToken(token: string) {
    localStorage.setItem(token, JSON.stringify(this.SalesRepName));
  }

  getAccessToken(): string {
    const newLocal:any = localStorage.getItem(JSON.stringify(this.SalesRepName));
    return newLocal;
  }
}
export class SetAccessTokenLocal {
  accesstoken =  'H4vzIE49vcS9dA5Pm6JU8rAm9APazBfWFuySEq0mW41vW5MjU4UicCQqDsfFPXsw';

  setAccessToken(token: string) {
    localStorage.setItem(token, JSON.stringify(this.accesstoken));
  }

  getAccessToken(): string {
    const access1:any = localStorage.getItem(JSON.stringify(this.accesstoken));
    return access1;
  }
}

export class ApTableData {

 aptableData = [{'recentRateId': 1,
   'companyName': 'FEDEX ECONOMY',
   'type': 'AP',
   'fuelsurcharge': '12',
   'discount': '55',
   'amc': '15'}];

  setAccessToken(token: string) {
    localStorage.setItem(token, JSON.stringify(this.aptableData));
  }

  getAccessToken(): string {
    const access2:any = localStorage.getItem(JSON.stringify(this.aptableData));
    return access2;
  }
}

export class ArTableData {

  artableData = [{'recentRateId': 1,
    'companyName': 'FEDEX ECONOMY',
    'type': 'AR',
    'fuelsurcharge': '12',
    'discount': '55',
    'amc': '15'}];

  setAccessToken(token: string) {
    localStorage.setItem(token, JSON.stringify(this.artableData));
  }

  getAccessToken(): string {
    const access3:any = localStorage.getItem(JSON.stringify(this.artableData));
    return access3;
  }
}
