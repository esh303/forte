import { Injectable } from '@angular/core';
// import {Http, Response, RequestOptions} from '@angular/common/http';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import {environment} from '../../environments/environment';
import {remoteMethodApiUrl} from '../app.constant';

@Injectable()
export class WebserviceService {
  apiUrl = environment.apiUrl;
  constructor(private httpC: HttpClient) { }

/* Package screen Rate service, Pickup, label and Fetching all shipments */

  getRateService(data: any, accessToken: any) {
    const url = this.apiUrl + remoteMethodApiUrl.fedexWebsiteRateUrl+'?access_token=' + accessToken;
    let payLoadData = { rateObj: data};
    // return this.httpC.post(url, payLoadData)
    //   .map((res: Response) => {
    //     if (res) {
    //       return res;
    //     } else {
    //     }
    //   }).catch(err => {
    //     return Observable.throw(err); // observable needs to be returned or exception raised
    //   });
    // return this.httpC.post(url, payLoadData)
    return this.httpC.post(url, payLoadData)
    // .map(function (res: any) {
    //     if (res) {
    //       return res;
    //     } else {
    //     }
    //   }).catch((err: any) => {
    //   return Observable.(err); // observable needs to be returned or exception raised
    // });
  }

  addPickup(data:any, accessToken:any) {
    const url = this.apiUrl + remoteMethodApiUrl.packagePickupUrl+'?access_token=' + accessToken;
    let payLoadData = { pickupData	: data};
    return this.httpC.post(url, payLoadData)
      // .map((res: Response) => {
      //   if (res) {
      //     return res;
      //   } else {
      //   }
      // }).catch(err => {
      //   return Observable.throw(err); // observable needs to be returned or exception raised
      // });
  }


  getShipmentLabel(id:any, accessToken:any) {
    const url = this.apiUrl + remoteMethodApiUrl.packageLabelUrl+'?access_token=' + accessToken;
    let payLoadData = { shipingData	: {id: id}};
    return this.httpC.post(url, payLoadData)
      // .map((res: Response) => {
      //   if (res) {
      //     return res;
      //   } else {
      //   }
      // }).catch(err => {
      //   return Observable.throw(err); // observable needs to be returned or exception raised
      // });
  }

  getAllShipments(companyId:any, accessToken:any) {
    const url = this.apiUrl+remoteMethodApiUrl.packageUrl+'?access_token='+accessToken+'&filter[where][companyId]='+companyId+'&filter[order]=id DESC';
    return this.httpC.get(url);
  }

  /* Adding shipments and creating BOL in tracking screen */

  addShipmentCarrier(data:any, accessToken:any) {
    const url = this.apiUrl + remoteMethodApiUrl.routineShipmentUrl+'?access_token=' + accessToken;
    let payLoadData = { shipmentInfo: data};
    return this.httpC.post(url, payLoadData)
      // .map((res: Response) => {
      //   if (res) {
      //     return res;
      //   } else {
      //   }
      // }).catch(err => {
      //   return Observable.throw(err); // observable needs to be returned or exception raised
      // });
  }

}
