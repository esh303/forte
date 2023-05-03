import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { remoteMethodApiUrl } from '../app.constant';

@Injectable()
export class InternalScreeningService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  /* Fetching user token and id */
  fetchValidUser(login:any) {
    const url = this.apiUrl + remoteMethodApiUrl.loginAdminUserUrl;
    const data = { credentials: login };
    return this.http.post(url, data);
  }

  /* Fetching the User/Admin details using userId */
  getSalesRepName(userId:any, accessToken:any, type:any) {
    let url;
    if (type === 'externalCustomer') {
      url = this.apiUrl + '/externalCustomersDetail?filter[where][id]=' + userId + '&access_token=' + accessToken + '&filter[include][companyDetails]';
    } else {
      url = this.apiUrl + '/AdminUser?filter[where][id]=' + userId + '&access_token=' + accessToken;
    }
    return this.http.get(url);
  }
  /* Fetching sales rep data using userId */ 
  getSalesRepDetails(accessToken:any, id:any) {
    const whereCondition = '"where":{"id": ' + id + '}';
    const columnFilter = '"fields":["salesRepName","email","id"]';
    const filter = '&filter={' + whereCondition + ',' + columnFilter + '}';
    const url = this.apiUrl + '/AdminUser?access_token=' + accessToken + filter;
    return this.http.get(url);
  }
}

