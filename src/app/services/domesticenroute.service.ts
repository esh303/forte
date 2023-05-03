import { Injectable } from '@angular/core';
// import { environment } from 'environments/environment';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DomesticenrouteService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  saveIntlRouteData(data:any, accessToken:any) {
    let url ;
    url = this.apiUrl + '/domesticShipment?access_token=' + accessToken;
    return this.httpClient.post(url, data)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }
   getIntlRouteData(id:any, accessToken:any) {
    let FILTER = '&filter[where][companyId]=' + id;
    return this.httpClient.get(this.apiUrl +'/domesticShipment?access_token='+ accessToken + FILTER);
   }

   getCompanyInvoice(id:any, accessToken:any) {
    let FILTER = '&filter[where][companyId]=' + id;
    return this.httpClient.get(this.apiUrl +'/domesticShipment?access_token='+ accessToken + FILTER);
  }
  uploadShimentlevelFiles(data:any) {
    const url = this.apiUrl + '/container/shipmentDocuments/upload';
    return this.httpClient.post(url, data)
    // .map((res: Response) => {
    //     return res;
    // });
  }
}
