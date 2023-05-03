import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { remoteMethodApiUrl } from '../app.constant';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import { BehaviorSubject  } from 'rxjs';

@Injectable()
export class InvoiceService {
  apiUrl = environment.apiUrl;
  companyData:any;
  companyData1:any;
  invoiceData:any;
  public message = new BehaviorSubject<any>(null);
  public customerInfo = new BehaviorSubject<any>(null);
  socketdataSubject = new BehaviorSubject<any>(null);
  socketdataObservable = this.socketdataSubject.asObservable();
  trafficDataSubject = new BehaviorSubject<any>(null);
  trafficDataObservable = this.trafficDataSubject.asObservable();
  trafficDataEnableSubject = new BehaviorSubject<any>(null);
  trafficDataEnableObservable = this.trafficDataEnableSubject.asObservable();
  notificationSubject = new BehaviorSubject<any>(null);
  notificationObservable = this.notificationSubject.asObservable();
  myMethod$: Observable<any>;
  customerMethod$: Observable<any>;
  fedexApResponse: any;
  fedexARResponse: any;
  yrcApResponse: any;
  yrcArResponse: any;
  reddawayARResponse: any;
  reddawayApResponse: any;
  setLoadedData: any;
  selectedAnalyticsCode: any;
  socketInitialization: any;
  constructor( private httpClient: HttpClient) { 
    this.myMethod$ = this.message.asObservable();
    this.customerMethod$ = this.customerInfo.asObservable();
  }
 
  
  myMethod(value: any) {
    console.log('value', value);
    this.message.next(value); //it is publishing this value to all the subscribers that have already subscribed to this message
  }

  customerMethod(data:any) {
    console.log('data', data);
    this.customerInfo.next(data);
  }
  setCompanyInformation(data:any) {
    this.companyData = data;
  }

  setCompanyInformation1(data:any) {
    console.log(data);
    this.companyData1 = data;
  }
  setUploadedData(data:any) {
    this.setLoadedData = data;
  }

  getUploadedData() {
    return this.setLoadedData;
  }

  setSocketData(data:any) {
    this.socketdataSubject.next(data);
  }
 
  getCompanyInformation() {
    return this.companyData;
  }

  getCompanyInformation1() {
    return this.companyData1;
  }
  setInvoiceDetails(data:any) {
    this.invoiceData = data;
  }
  getInvoiceDetails() {
    return this.invoiceData;
  }
  setTrafficData(data:any) {
    this.trafficDataSubject.next(data);
  }
  
  getSalesRepDetails(accessToken:any) {
        const whereCondition = '"where": {"status": "active"}';
        const fields = '"fields" :["id", "salesRepId", "salesRepName"]';
        const FILTER = '&filter={' + fields + ',' + whereCondition + '}';
        return this.httpClient.get(this.apiUrl +'/AdminUser?access_token='+accessToken+FILTER);
  }
  
  getCompanyDetails(id:any, accessToken:any) {
    const url = this.apiUrl + '/companyInformation/getCompanyNames';
    let object = {'id': id};
    let payLoadData = {'salesRepId': object};
    return this.httpClient.post(url, payLoadData)
      // .map((res: Response) => {
      //   if (res) {
      //     return res;
      //   } else {
      //   }
      // }).catch(err => {
      //   return Observable.throw(err); // observable needs to be returned or exception raised
      // });
  }
 
  getCompanyDetailsnew(id:any, accessToken:any) {
    console.log(id);
    return this.httpClient.get(this.apiUrl +'/companyInformation?access_token='+accessToken);
  }
  getCompanyDetailsnewUsingId(id:any, accessToken:any) {
    console.log(id);
    return this.httpClient.get(this.apiUrl +'/companyInformation?access_token='+accessToken+'&filter[where][salesRepId]=' + id);
  }

getRates(userData:any, type:any) {
    let url;
    let date;
    let i = 1;
    if (type === 'YRC AP') {
      url = this.apiUrl + '/companyInvoice/yrcAp';
      date = new Date();
    } else if (type === 'YRC AR') {
      url = this.apiUrl + '/companyInvoice/yrcAr';
      date = new Date();
    } else if (type === 'FEDEX AP') {
      url = this.apiUrl + '/companyInvoice/fedexAp';
      date = new Date();
    } else if (type === 'FEDEX AR') {
      url = this.apiUrl + '/companyInvoice/fedexAr';
      date = new Date();
    } else if (type === 'REDDAWAY AP') {
      url = this.apiUrl + '/companyInvoice/reddawayAp';
      date = new Date();
    } else {
      url = this.apiUrl + '/companyInvoice/reddawayAr';
      date = new Date();
    }
    const payLoadData = { 'calculationDetail': userData };
    return this.httpClient.post(url, payLoadData)
      // .map((res: Response) => {
      //   if (res) {
      //     i = i + 1;
      //     date = new Date();
      //     return res;
      //   } else {
      //   }
      // }).catch(err => {
      //   return Observable.throw(err); // observable needs to be returned or exception raised
      // });
  }


  saveCustomerInfo(data:any) {
    let url = this.apiUrl + '/companyInformation';
    return this.httpClient.post(url, data)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  saveCustomerInfo1(data:any) {
    let url = this.apiUrl + '/companyInformation/createCompany';
    const payLoadData = { 'companyDatas': data };

    return this.httpClient.post(url, payLoadData)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  updateCustomerInfo(data:any) {
    console.log(data.id)
    let url = this.apiUrl + '/companyInformation/' + data.id;
    return this.httpClient.put(url, data)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  saveInvoiceInfo(invoiceDetails:any) {
    let url = this.apiUrl + '/companyInvoice/createInvoice';
    let payLoadData = {'invoiceData': invoiceDetails};
    return this.httpClient.post(url, payLoadData)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }

 

  updateInvoiceInfo(data:any) {
    console.log(data.id)
    let url = this.apiUrl + '/companyInvoice/' + data.id;
    return this.httpClient.put(url, data)
      // .map((res: Response) => {
      //   // if (res.status < 200 || res.status >= 300) {
      //   //   throw new Error('This request has failed ' + res.status);
      //   // } else {
      //     return res;
      // });
  }

  saveInvoiceInfoNew(data:any, ruleArray:any) {
    let url = this.apiUrl + '/analyticsCode/saveInvoice';
    let payLoadData = {'analyticsData': data , 'rules': ruleArray};
    return this.httpClient.post(url, payLoadData)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }
  saveInvoicerawDataNew(data:any) {
    let url = this.apiUrl + '/companyInvoice/saveRawData';
    return this.httpClient.post(url, {invoiceData: data})
    // .map((res: Response) => {
    //     return res;
    // });
    // let payLoadData = {'analyticsData': data , 'rules': ruleArray};
    // return this.httpClient.post(url, payLoadData)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }
  saveContract(data:any) {
    let url = this.apiUrl + '/contractInfo/createContract';
    let payLoadData = {'contractData': data };
    return this.httpClient.post(url, payLoadData)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }
 
  updateInvoiceInfoNew(data:any) {
    console.log(data.id)
    let url = this.apiUrl + '/companyInvoice/' + data.id;
    return this.httpClient.put(url, data)
      // .map((res: Response) => {
      //   // if (res.status < 200 || res.status >= 300) {
      //   //   throw new Error('This request has failed ' + res.status);
      //   // } else {
      //     return res;
      // });
  }

  getCompanyInvoice(id:any, accessToken:any) {
    let FILTER = '&filter[where][customerId]=' + id;
    return this.httpClient.get(this.apiUrl +'/companyInvoice?access_token='+accessToken+FILTER);
  }

  uploadPictures(data:any) {
    const url = this.apiUrl + '/container/customerPictures/upload';
    return this.httpClient.post(url, data)
        // .map((res: Response) => {
        //     return res;
        // });
  }

  uploadPricingPictures(data:any) {
    const url = this.apiUrl + '/container/prePricingPictures/upload';
    return this.httpClient.post(url, data)
        // .map((res: Response) => {
        //     return res;
        // });
  }

  setFedexApResponse(data:any) {
    this.fedexApResponse = data;
  }
  getFedexApResponse() {
    return this.fedexApResponse ;
  }
  setFedexARResponse(data:any) {
    this.fedexARResponse = data;
  }
  getFedexARResponse() {
    return this.fedexARResponse ;
  }
  setYrcApResponse(data:any) {
    this.yrcApResponse = data;
  }
  getYrcApResponse() {
    return this.yrcApResponse ;
  }
  setYrcARResponse(data:any) {
    this.yrcArResponse = data;
  }
  getYrcARResponse() {
    return this.yrcArResponse ;
  }
  setRedawayARResponse(data:any) {
    this.reddawayARResponse = data;
  }
  getRedawayARResponse(){
    return this.reddawayARResponse;
  }
  setRedawayApResponse(data:any) {
    this.reddawayApResponse = data;
  }
  getRedawayApResponse(){
    return this.reddawayApResponse;
  }
  deleteUploaded(container:any, file:any) {
    const url = this.apiUrl + '/container/' + container + '/files/' + file;
    return this.httpClient.delete(url)
        // .map((res: Response) => {
        //     return res;
        // });
  }
  saveUploadedInvoice(data:any) {
    // console.log(data);
    // if (data.id === 0) {
      const url = this.apiUrl + '/companyInvoice/invoiceUpload';
      return this.httpClient.post(url, {invoiceData: data})
          // .map((res: Response) => {
          //     return res;
          // });
    // } else {
    //   const url = this.apiUrl + '/companyInvoice/' + data.id;
    //   return this.httpClient.put(url, data)
    //   .map((res: Response) => {
    //               return res;
    //   });
    // }
  
  }

  saveUploadedInvoiceNew(data:any) {
    // console.log(data);
    // if (data.id === 0) {
      const url = this.apiUrl + '/companyInvoice/createInvoiceNew';
      return this.httpClient.post(url, {invoiceData: data})
          // .map((res: Response) => {
          //     return res;
          // });
    // } else {
    //   const url = this.apiUrl + '/companyInvoice/' + data.id;
    //   return this.httpClient.put(url, data)
    //   .map((res: Response) => {
    //               return res;
    //   });
    // }
  
  }

  // getAnalyticsCode(id) {
  //   const url = this.apiUrl + '/companyInformation/getAnalyticsCode';
  //   return this.httpClient.post(url, {companyInfo : id})
  //       .map((res: Response) => {
  //           return res;
  //       }); 
  // }
  getAnalyticsCode(id:any) {
    const url = this.apiUrl + '/analyticsCode'+ '?filter[order]=id DESC&filter[where][companyId]=' + id;
    return this.httpClient.get(url)
        // .map((res: Response) => {
        //     return res;
        // }); 
  }
  setAnalyticsCode(passingObject:any) {
    this.selectedAnalyticsCode = passingObject;
  }

  getSelectedAnalyticsCode() {
    return this.selectedAnalyticsCode;
  }
  
  setnotificationValue(data:any) {
    this.notificationSubject.next(data);
  }

  applyNewRule(apivalue:any, ruleArray:any) {
    console.log(apivalue,ruleArray);
    const url = this.apiUrl + '/analyticsCode/applyWorkBookRules';
    return this.httpClient.post(url, {'quotesInfo': apivalue, 'rules': ruleArray})
        // .map((res: Response) => {
        //     return res;
        // });
  }

  approvalWorkbookRequest(data:any) {
     const url = this.apiUrl + '/WorkBookApproval';
    return this.httpClient.post(url, data)
        // .map((res: Response) => {
        //     return res;
        // });
  }
  approvalWorkbookRequestById(data:any) {

    const url = this.apiUrl + '/WorkBookApproval/'+data.id;
    return this.httpClient.put(url, data)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
 }


 analyticscodebyId(data:any) {
  const url = this.apiUrl + '/analyticsCode/'+data.id;
    return this.httpClient.put(url, data)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
 }

  getApprovalrequest(type:any) {
const whereCondition = '"where": {"status": "' + type + '"}';
const includeSalesRep = '{"relation": "AdminUser"}';
const includeAnalytics = '{"relation": "analyticsCode"}';
const includeTable = '"include":' + includeSalesRep + ',' + includeAnalytics;


        let FILTER = '?filter[where][status]=' + type + '&filter[include]=AdminUser&filter[include]=analyticsCode' + '&filter[order]=id DESC' ;
        // let includeFilter = 
      return this.httpClient.get(this.apiUrl +'/WorkBookApproval' +FILTER);
  }
  
  getSelectedCodeInvoice(id:any) {
    return this.httpClient.get(this.apiUrl + '/saveInvoice?filter[include]=companyInvoice&filter[where][analyticsId]=' + id);
    // http://52.52.76.24:3000/api/saveInvoice?filter[include]=companyInvoice&filter[where][analyticsId]=2
    // if (data.carrierValue === 'FXFP') {
    //   let FILTER = '?filter[where][fxfpAnalyticsCode]=' + data.filterValue;
    //   return this.httpClient.get(this.apiUrl +'/companyInvoice'+FILTER);
    // } else if (data.carrierValue === 'FXFE') {
    //   let FILTER = '?filter[where][fxfeAnalyticsCode]=' + data.filterValue;
    //   return this.httpClient.get(this.apiUrl +'/companyInvoice'+FILTER);
    // } else if (data.carrierValue === 'YRC') {
    //   let FILTER = '?filter[where][yrcAnalyticsCode]=' + data.filterValue;
    //   return this.httpClient.get(this.apiUrl +'/companyInvoice'+FILTER);
    // }
 
  }

  setTrafficDataEnable(data:any) {
    this.trafficDataEnableSubject.next(data);
  }
validateZip(zip:any) {
  return this.httpClient.get(this.apiUrl +'/ZipCodeState?filter[where][zipCode]=' + zip );

}
  saveWorkBookRule(value:any) {
    let url = this.apiUrl + '/WorkBookRules';
    return this.httpClient.post(url, value)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }
 
  getWorkBookRule(id:any,carrier:any) {
    return this.httpClient.get(this.apiUrl +'/WorkBookRules?filter[where][analyticsId]=' + id );

  }
  approveCompanyRules(data:any) {
    const url = this.apiUrl + '/companyInformation/approveCompanyNew';
    return this.httpClient.post(url, {'approvalData': data})
        // .map((res: Response) => {
        //     return res;
        // });
  }

  putWorkBookRule(data:any) {
    let url = this.apiUrl + '/WorkBookRules';
    return this.httpClient.put(url, data)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  deleteRule(id:any) {
    let url = this.apiUrl + '/WorkBookRules/'+ id ;
    return this.httpClient.delete(url)
    // .map((res: Response) => {
    //   return res;
    // });
  }
}