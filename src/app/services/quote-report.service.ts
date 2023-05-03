import { Injectable } from '@angular/core';
// import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { remoteMethodApiUrl } from '../app.constant';

@Injectable()
export class QuoteReportService {
  public fetchData = {};
  apiUrl = environment.apiUrl;
  constructor(private httpC: HttpClient) {}
  /*Fetching Quote Details using Search */
  fetchByValue (reportForm:any, id:any, companyId:any,salesRepId:any, fromDate:any, toDate:any) {
   const url = this.apiUrl + '/QuoteDetailsNew/searchReport'
    this.fetchData = {customerId: id, quoteReferenceId: reportForm.quoteNo, originZipCode: reportForm.origin,
      destinationZipCode: reportForm.destination, from_date: fromDate, companyId: companyId,
      to_date: toDate, carrier: reportForm.carrier, salesRepId: salesRepId, category: reportForm.category, createdBy: ""};
    const payloadData = {'searchDetails': this.fetchData};
    return this.httpC.post(url, payloadData)
    //     .map ((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }

  /* Fetching QuoteDetails using QuoteId*/
  getParticularReport(quoteId:any) {
    const url = this.apiUrl + remoteMethodApiUrl.getQuoteDetailsByQuoteIdUrl + quoteId;
    return this.httpC.get(url);
  }

/* Fetching QuoteDetails using QuoteReferenceId*/
  getParticularReportUsingReferenceId(quoteReferenceId:any) {
    const url = this.apiUrl + remoteMethodApiUrl.getQuoteDetailsByQuoteReferenceIdUrl + quoteReferenceId;
    return this.httpC.get(url);
  }

  getParticularReportUsingReferenceIdNew(quoteReferenceId:any) {
    const url = this.apiUrl + remoteMethodApiUrl.getQuoteDetailsByQuoteIdUrl + quoteReferenceId;
    return this.httpC.get(url);
  }
  getParticularReportUsingReferenceIdnew(quoteReferenceId:any) {
    const url = this.apiUrl + '/QuoteDetailsNew?filter[where][quoteReferenceId]=' + quoteReferenceId + '&filter[include][companyDetails]';
    return this.httpC.get(url)
    //   .map ((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     console.log('Get Single Customer Data', res);
    //     return res;
    //   }
    // });
  }

  
/* Fetching QuoteDetails using id*/
  getReportUsingQuoteId(id:any) {
    const url = this.apiUrl + remoteMethodApiUrl.getQuoteDetailsByIdUrl + id;
    return this.httpC.get(url);
  }
/* Sending Report mail QuoteDetails using id*/
  sendMailFunction() {
    const url = this.apiUrl + remoteMethodApiUrl.quoteDetailsReportMailUrl;
    const payloadData = {'searchDetails': this.fetchData}; 
    return this.httpC.post(url, payloadData)
    //   .map ((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }

/* Fetching Quote Details for Web rate and AP rate */
  getWebRateComparison(quoteId:any, quoteIdWeb:any, accessToken:any) {
    const url = this.apiUrl + '/QuoteDetailsNew?filter[where][quoteId][inq]=' + quoteId
     +'&filter[where][quoteId][inq]='+ quoteIdWeb +'&access_token=' + accessToken;
    return this.httpC.get(url);
  }

  /* Analytics report of Quote Details */

  getAnalyticsReport(data:any) {
    const url = this.apiUrl + remoteMethodApiUrl.searchQuoteDetailsUrl;
    const payloadData = {'searchDetails': data}; // this searchdetails is the remote method object where we have to pass the data.
    return this.httpC.post(url, payloadData)
    //   .map ((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     console.log('Mail Function', res);
    //     return res;
    //   }
    // });
  }
}


