import { Injectable } from '@angular/core';
// import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { remoteMethodApiUrl } from '../app.constant';
import { single } from 'rxjs/operators';

@Injectable()
export class PricingInfoService {

  public customerArray:any = [];
  public customerObject = {};
  public businessObject = {};
  public businessRules:any = [];
  public setAddFlag:any;
  public customerId:any;
  public currentPage:any;
  public itemsPage:any;
  public showAllCustomers = false;
  public billOfLadingValues = {};
  apiUrl = environment.apiUrl;
  public arrayData:any = [];
  public selectedValue:any;
  public setForAddCustomer = false;
  public deleteData:any;
  public createBolFromLtlQuote:any;
  public costplusFlag = false;
  rateSubject = new BehaviorSubject<any>(null);
  rateObservable = this.rateSubject.asObservable();
  referenceSubject = new BehaviorSubject<any>(null);
  referenceObservable = this.referenceSubject.asObservable();
  pricingSubject = new BehaviorSubject<any>(null);
  pricingObservable = this.pricingSubject.asObservable();
  quoteReferenceSubject = new BehaviorSubject<any>(null);
  quoteObservable = this.quoteReferenceSubject.asObservable();
  constructor(private httpC: HttpClient) {
  }

  customerValidation(tokenData:any) {
    const token = { token: tokenData };
    const url = this.apiUrl + remoteMethodApiUrl.accessTokenValidationUrl;
    return this.httpC.post(url, token)
      // .map((res: Response) => {
      //   if (res) {
      //     return res;
      //   } 
      // });
  }

  savePricingInfoYrc(data:any) {
    const payLoadData = { 'calculationDetail': data };
    const url = this.apiUrl + '/ClassificationFactor/generateBill';
    return this.httpC.post(url, payLoadData)
      // .map((res: any) => {
      //   if (res) {
      //     return res;
      //   } else {
      //   }
      // }).catch(err => {
      //   return Observable.throw(err); // observable needs to be returned or exception raised
      // });
  }

  savePricingInfoYrcAr(data: any) {
    const payLoadData = { 'calculationDetail': data };
    const url = this.apiUrl + '/ClassificationFactorAr/generateBill';
    return this.httpC.post(url, payLoadData);
  }

  saveReddawayAP(data:any) {
    const payLoadData = { 'calculationDetail': data };
    const url = this.apiUrl + '/Rates/generateBill';
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

  saveReddawayAR(data:any) {
    const payLoadData = { 'calculationDetail': data };
    const url = this.apiUrl + '/RatesAr/generateBill';
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

  savePricingInfoFed(data:any) {
    const payLoadData = { 'calculationDetail': data };
    const url = this.apiUrl + '/FedexClsFac/generateBill';
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

  savePricingInfoFedAR(data:any) {
    const payLoadData = { 'calculationDetail': data };
    const url = this.apiUrl + '/FedexClsFacAr/generateARBill';
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


  getData() {
    const url = this.apiUrl + remoteMethodApiUrl.loginValidationOnCustomerUrl;
    return this.httpC.get(url);
  }

  getCityState(zipcode:any) {
    const url = this.apiUrl + remoteMethodApiUrl.getZipcodeStateCityUrl + zipcode;
    return this.httpC.get(url);
  }
  getCityStateNew(zipcode:any) {
    const url = this.apiUrl + '/ClassificationFactorAr/getYrcCity?zipCode='+ zipcode;
    return this.httpC.get(url)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  getPickUpDetails(zipInfo:any) {
    const url = this.apiUrl + remoteMethodApiUrl.createBolPickupForFedexUrl;
    return this.httpC.post(url, { pickupData: zipInfo })
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  getPickUpId(completeForm:any) {
    const url = this.apiUrl + remoteMethodApiUrl.createBolPickupUrl;
    return this.httpC.post(url, { pickupData: completeForm })
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  getActiveReq() {
    const url = this.apiUrl + '/customersRateQuote';
    return this.httpC.get(url)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  createSalesRep(data:any, accessToken:any) {
    const payLoadData = { 'credentials': data };
    const url = this.apiUrl + remoteMethodApiUrl.createAdminUserUrl + accessToken;
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

  getSpecificCustomerName(salesRepId:any, accessToken:any) {
    const url = this.apiUrl + '/externalCustomersDetail?filter[where][salesRepId]=' + salesRepId + '&access_token=' + accessToken + '&filter[order]=companyName ASC';
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res) {
    //     return res;
    //   } else {
    //   }
    // });
  }

  getAllCustomerName(accessToken:any) {
    const url = this.apiUrl + '/externalCustomersDetail?access_token=' + accessToken + '&filter[order]=companyName ASC';
    return this.httpC.get(url);
  }

  getCustomer(accessToken:any) {
    const url = this.apiUrl + '/externalCustomersDetail?access_token =' + accessToken;
    return this.httpC.get(url);
  }

  getSpecificCustomer(id:any, accessToken:any) {
    const url = this.apiUrl + '/externalCustomersDetail?access_token =' + accessToken + '&filter[where][id]=' + id;
    return this.httpC.get(url);
  }

  saveQuoteDetails(data:any) {
    let date = new Date();
    const payLoadData = { 'quoteAndRateDetail': data };
    const url = this.apiUrl + remoteMethodApiUrl.createQuoteNumberUrl;
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

  sendEmailData(object:any) {
    const payLoadData = { 'mailDetail': object };
    const url = this.apiUrl + remoteMethodApiUrl.quoteDetailsMailingUrl;
    return this.httpC.post(url, payLoadData);
  }

  saveData(customer:any, data:any) {
    this.customerArray.push(data);
    this.businessRules.push(customer);
  }

  getCustomerValues() {
    return this.customerArray;
  }

  getBusinessRules() {
    return this.businessRules;
  }

  getyrcOnlineBol(payloadData:any) {
    const url = this.apiUrl + '/FedexMatrixAdj/getYrcDoc1';
    const httpOptions = {
      'responseType'  : 'blob'
       //'responseType'  : 'blob' as 'json'        //This also worked
    };
    
let data = { 'docInfo': payloadData};
    return this.httpC.post(url,data )
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }
  getSalesDetail(accessToken:any) {
    const url = this.apiUrl + '/AdminUser?access_token=' + accessToken + '&filter[where][status]=active';
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }
  getInternalSalesRep(id:any, accessToken:any) {
    const url = this.apiUrl + '/AdminUser?filter[where][id]=' + id + 'access_token=' + accessToken + '&filter[where][status]=active';
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }
  saveCustomerData(data:any, data1:any, accesstoken:any) {
    this.customerId = '';
    this.customerId = data1.id;
    let business = [];
    business = data;
    const payloadData1 = { 'businessRules': business };
    const payloadData = { 'customerDetails': data1, 'businessRules': business };
    const url = this.apiUrl + '/CustomersDetail/createNewCustomer?access_token=' + accesstoken;
    return this.httpC.post(url, payloadData)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  updateCustomerData(data:any, data1:any, accesstoken:any) {
    this.customerId = '';
    this.customerId = data1.id;
    let business = [];
    business = data;
    const payloadData = { 'customerDetails': data1, 'businessRules': business };
    const url = this.apiUrl + remoteMethodApiUrl.updateCustomerDataUrl + accesstoken;
    return this.httpC.post(url, payloadData)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  modifiedCustomer() {
    return this.customerId;
  }

  getCustomerData(accesstoken:any, id:any) {
    const url = this.apiUrl + '/externalCustomersDetail?filter[where][id]=' + id + '&access_token=' + accesstoken + '&filter[include][BusinessRules]';
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }

  getBusinessRules1(accessToken:any, id:any, category:any, directions:any, type:any, discount:any) {
    const url = this.apiUrl + '/BusinessRulesNew?access_token=' + accessToken + '&filter[where][and][0][companyId]=' + id +
      '&filter[where][and][1][category]=' + category + '&filter[where][and][2][directions]='
      + directions + '&filter[where][and][3][type]=' + type + '&filter[where][and][4][type]=' + discount;
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }

  getBusinessRulesEdit(accessToken:any, id:any, category:any, directions:any, type:any, discount:any, minCharge:any) {
    const url = this.apiUrl + '/BusinessRulesNew?access_token=' + accessToken +
      '&filter[where][and][0][customerId]=' + id +
      '&filter[where][and][1][category]=' + category + '&filter[where][and][2][directions]='
      + directions + '&filter[where][and][2][type]=' + type + '&filter[where][and][2][discount]='
      + discount + '&filter[where][and][3][minCharge]=' + minCharge;
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }

  get(accesstoken:any) {
    const url = this.apiUrl + '/externalCustomersDetail?access_token=' + accesstoken + '&filter[order]=id DESC&filter[include][BusinessRules]';
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // }).catch(err => {
    //   return Observable.throw(err); // observable needs to be returned or exception raised
    // });
  }
  getInternalSpecificCustomerData(salesRepId:any, accesstoken:any) {
    const url = this.apiUrl + '/externalCustomersDetail?filter[where][salesRepId]=' + salesRepId + 'access_token=' + accesstoken + '&filter[order]=id DESC&filter[include][BusinessRules]';
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // }).catch(err => {
    //   return Observable.throw(err); // observable needs to be returned or exception raised
    // });
  }

  saveCustomerForm(customer:any, assessorialArray:any, salesRepId:any) {
    const url = this.apiUrl + remoteMethodApiUrl.createCustomerDataUrl;
    const payloadData = {
      customerName: customer.customerName, address: customer.address,
      email: customer.email, ratingNotes: customer.ratingNotes,
      contactNumber: customer.contactNumber, assessorials: assessorialArray,
      salesRepId: salesRepId, createdOn: new Date()
    };
    return this.httpC.post(url, payloadData)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  getCustomerAccountId(customerName:any) {
    const url = this.apiUrl + remoteMethodApiUrl.getCustomerUsingCustomerNameUrl + customerName;
    return this.httpC.get(url);
  }

  saveApForm(accessToken:any, apForm:any) {
    const url = this.apiUrl + remoteMethodApiUrl.setMasterDataUrl + accessToken;
    return this.httpC.post(url, apForm)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  getApForm() {
    const url = this.apiUrl + remoteMethodApiUrl.getARSetMasterDataUrl;
    return this.httpC.get(url);
  }

  editSaveApForm(accessToken:any, edit:any) {
    const url = this.apiUrl + remoteMethodApiUrl.setMasterDataUrl + accessToken;
    return this.httpC.put(url, edit)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  getEmergencyStatus() {
    // const url = this.apiUrl + '/forteService/forteServiceStatus';
    const url = this.apiUrl + '/Master/forteServiceStatus';
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // }).catch(err => {
    //   return Observable.throw(err); // observable needs to be returned or exception raised
    // });
  }


  setEmergencyStatus(data:any) {
    const url = this.apiUrl + '/forteService/emergencyService';
    const object = {'emergencyData': data};
    return this.httpC.post(url, object)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }
  getpeakStatus() {
    const url = this.apiUrl + '/Master/getPeakSurchargeStatus';

    // const url = 'http://54.176.155.237:3000/api/Master/getPeakSurchargeStatus';
    // return this.httpC.get(url);
    
    return this.httpC.get(url, {responseType: 'text'})
    // .map((res) => {
    //   console.log(res);
    //   // if (res.status < 200 || res.status >= 300) {
    //   //   throw new Error('This request has failed ' + res.status);
    //   // } else {
    //     return res;
    //   // }
    // }).catch(err => {
    //   return Observable.throw(err); // observable needs to be returned or exception raised
    // });
  }

  setPeakCharge(data:any) {
    const url = this.apiUrl + '/Master/peakSurchargeControl';
    const object = {'controlData': data};
    return this.httpC.post(url, object)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  editSaveArForm(accessToken:any, editAr:any) {
    const url = this.apiUrl + remoteMethodApiUrl.setMasterDataUrl + accessToken;
    const edit = editAr;
    return this.httpC.put(url, edit)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  callsLogout(accessToken:any) {
    const url = this.apiUrl + remoteMethodApiUrl.logoutAdminUserUrl + accessToken;
    this.httpC.post(url, accessToken)
      .subscribe(res => {
      });
  }

  saveArForm(accessToken:any, data:any) {
    const url = this.apiUrl + remoteMethodApiUrl.setMasterDataUrl + accessToken;
    return this.httpC.post(url, data)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  getArForm() {
    const url = this.apiUrl + '/RecentRate?filter[where][type]=AR';
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }
  deleteAp(accessToken:any, index:any) {
    const url = this.apiUrl + '/RecentRate/' + index + '?access_token=' + accessToken;
    return this.httpC.delete(url)
    // .map((res: Response) => {
    //   return res;
    // });
  }
  deleteAr(accessToken:any, index:any) {
    const url = this.apiUrl + '/RecentRate/' + index + '?access_token=' + accessToken;
    return this.httpC.delete(url)
    // .map((res: Response) => {
    //   return res;
    // });
  }

  saveCustomerDetail(customer:any) {
    this.customerArray = customer;
  }

  getCustomerDetail() {
    return this.customerArray;
  }

  deleteCompanyRecord(id:any, accessToken:any) {
    const url = this.apiUrl + remoteMethodApiUrl.deleteCompanyUrl + accessToken;
    let data = { 'companyId': { 'id': id } };
    let payLoadData = data;
    return this.httpC.post(url, payLoadData)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  deleteBusinessRulesRecord(id:any, accessToken:any) {
    this.customerId = '';
    const url = this.apiUrl + '/BusinessRulesNew/' + id + '?access_token=' + accessToken;
    return this.httpC.delete(url)
    // .map((res: Response) => {
    //   return res;
    // });
  }

  deleteCustomerRecord(id:any, accessToken:any) {
    const url = this.apiUrl + '/externalCustomersDetail/' + id + '?access_token=' + accessToken;
    return this.httpC.delete(url)
    // .map((res: Response) => {
    //   return res;
    // });
  }

  deleteAllBusinessRulesRecord(id:any, accessToken:any) {
    const url = this.apiUrl + '/externalCustomersDetail/' + id + '/BusinessRules?access_token=' + accessToken;
    return this.httpC.delete(url)
    // .map((res: Response) => {
    //   return res;
    // });
  }
  deleteCustomerData(id:any, accessToken:any) {
    const url = this.apiUrl + remoteMethodApiUrl.deleteCustomerUrl + accessToken;
    const payLoadData = {
      deleteInfo: {
        'customerId': id
      }
    }
    return this.httpC.post(url, payLoadData)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }
  saveEditCustomer(customer:any, businessRule:any) {
    this.customerObject = customer;
    this.businessObject = businessRule;
  }

  saveAddRule(customer:any) {
    this.customerObject = customer;
  }

  getEditCustomer() {
    return this.customerObject;
  }

  getEditBusiness() {
    return this.businessObject;
  }

  setFlag(flag:any) {
    this.setAddFlag = flag;
  }

  getFlag() {
    return this.setAddFlag;
  }
  billOfLading(data:any) {
    const url = this.apiUrl + remoteMethodApiUrl.bolFedexMatrixUrl;
    let payLoadData;
    payLoadData = { bolData: data };
    return this.httpC.post(url, payLoadData)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }
  searchByQuoteNumber(quoteNumber:any) {
    // const url = this.apiUrl + '/QuoteDetails?filter[where][quoteReferenceId]=' + quoteNumber;
    const url = this.apiUrl + remoteMethodApiUrl.getQuoteDetailsByQuoteReferenceIdUrl + quoteNumber;
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res) {
    //     return res;
    //   } else {
    //   }
    // });
  }
  setBillOfLadingValues(data:any) {
    this.billOfLadingValues = data;
  }
  getBillOfLadingValues() {
    return this.billOfLadingValues;
  }

  getTrackingDetails(trackingNumber:any) {
    const url = this.apiUrl + remoteMethodApiUrl.getBolTrackingUrl;
    let payLoadData;
    payLoadData = { trackingData: trackingNumber };
    return this.httpC.post(url, payLoadData)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  getTrackingDetailsOriginZip(data:any) {
    const url = this.apiUrl + '/ZipCodeState?filter[where][city]='+ data;
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   return res;
    // });
  }

  getTrackingBillOfLading(companyId:any, salesRepId:any, accessToken:any, type:any, date:any, viewType:any) {
    let url;
    let filter;
    if (viewType === 'tracking') {
      if (type === 'externalCustomer') {
        // const whereFilter ='"where":{"and":[{"companyId":'+ companyId +'},{"access_token":"'+ accessToken +'"},{"or" : [{"pickupStatus": "pickup"}, {"isPickup": true}]},{"bolService":true}]}';
        const whereFilter = '"where":{"and":[{"companyId":' + companyId + '},{"access_token":"' + accessToken + '"},{"createdOn": {"gt":"' + date + '"}},{"status": {"neq":"inactive"}},{"or" : [{"pickupStatus": "pickup", "bolService":true}, {"isPickup": true, "bolService":true}, {"routinePickup":true}, {"otherCarrierName":"Rate Quote"}, {"trackLink": {"neq": "null"}} ]} ]}';
        // const filterCondition = '"where": {"createdOn": {"gt": '+ date +'}}';
        const orderby = '"order": "createdOn desc"';
        filter = '?filter={' + whereFilter + ',' + orderby + '}';
      } else if (type === 'admin') {
        // const whereAdminFilter = '"where":{"and":[{"access_token":"'+ accessToken +'"},{"or" : [{"pickupStatus":"pickup"}, {"isPickup": true}]},{"bolService":true}]}';
        const whereAdminFilter = '"where":{"and":[{"access_token":"' + accessToken + '"},{"createdOn": {"gt":"' + date + '"}},{"status": {"neq":"inactive"}},{"or" : [{"pickupStatus": "pickup", "bolService":true}, {"isPickup": true, "bolService":true}, {"routinePickup":true}, {"otherCarrierName":"Rate Quote"}, {"trackLink": {"neq": "null"}}]}]}';
        const orderby = '"order": "createdOn desc"';
        filter = '?filter={' + whereAdminFilter + ',' + orderby + '}';
      } else {
        const whereSalesrepFilter = '"where":{"and":[{"access_token":"' + accessToken + '"},{"salesRepId":' + salesRepId + '},{"createdOn": {"gt":"' + date + '"}},{"status": {"neq":"inactive"}},{"or" : [{"pickupStatus":"pickup"}, {"isPickup": true}]},{"bolService":true}]}';
        const orderby = '"order": "createdOn desc"';
        filter = '?filter={' + whereSalesrepFilter + ',' + orderby + '}';
      }
    }
    return this.httpC.get(this.apiUrl + '/billOfLading' + filter);
  }
  getTrackingAllBillOfLading(companyId:any, salesRepId:any, accessToken:any, type:any, date:any, viewType:any) {
    let url;
    let filter;
    if (viewType === 'tracking') {
      if (type === 'externalCustomer') {
        // const whereFilter ='"where":{"and":[{"companyId":'+ companyId +'},{"access_token":"'+ accessToken +'"},{"or" : [{"pickupStatus": "pickup"}, {"isPickup": true}]},{"bolService":true}]}';
        const whereFilter = '"where":{"and":[{"companyId":' + companyId + '},{"access_token":"' + accessToken + '"},{"status":{"neq": "inactive"}},{"or" : [{"pickupStatus": "pickup", "bolService":true}, {"isPickup": true, "bolService":true}, {"routinePickup":true}, {"otherCarrierName":"Rate Quote"}, {"trackLink": {"neq": "null"}} ]} ]}';
        // const filterCondition = '"where": {"createdOn": {"gt": '+ date +'}}';
        const orderby = '"order": "createdOn desc"';
        filter = '?filter={' + whereFilter + ',' + orderby + '}';
      } else if (type === 'admin') {
        // const whereAdminFilter = '"where":{"and":[{"access_token":"'+ accessToken +'"},{"or" : [{"pickupStatus":"pickup"}, {"isPickup": true}]},{"bolService":true}]}';
        const whereAdminFilter = '"where":{"and":[{"access_token":"' + accessToken + '"}, {"status":{"neq": "inactive"}},{"or" : [{"pickupStatus": "pickup", "bolService":true}, {"isPickup": true, "bolService":true}, {"routinePickup":true}, {"otherCarrierName":"Rate Quote"}, {"trackLink": {"neq": "null"}}]}]}';
        const orderby = '"order": "createdOn desc"';
        filter = '?filter={' + whereAdminFilter + ',' + orderby + '}';
      } else {
        const whereSalesrepFilter = '"where":{"and":[{"access_token":"' + accessToken + '"},{"salesRepId":' + salesRepId + '},{"createdOn": {"gt":"' + date + '"}}, {"status":{"neq": "inactive"}},{"or" : [{"pickupStatus":"pickup"}, {"isPickup": true}]},{"bolService":true}]}';
        const orderby = '"order": "createdOn desc"';
        filter = '?filter={' + whereSalesrepFilter + ',' + orderby + '}';
      }
    }
    return this.httpC.get(this.apiUrl + '/billOfLading' + filter);
  }

  getTrackingAllBillOfLadingNew(companyId:any, salesRepId:any, accessToken:any, type:any, date:any, viewType:any,fromDate:any,toDate:any) {
    let url;
    let filter;
    if (viewType === 'tracking') {
      if (type === 'externalCustomer') {
        // const whereFilter ='"where":{"and":[{"companyId":'+ companyId +'},{"access_token":"'+ accessToken +'"},{"or" : [{"pickupStatus": "pickup"}, {"isPickup": true}]},{"bolService":true}]}';
        const whereFilter = '"where":{"and":[{"companyId":' + companyId + '},{"access_token":"' + accessToken + '"},{"status":{"neq": "inactive"}},{"or" : [{"pickupStatus": "pickup", "bolService":true}, {"isPickup": true, "bolService":true}, {"routinePickup":true}, {"otherCarrierName":"Rate Quote"}, {"trackLink": {"neq": "null"}} ]},{"createdOn":{"between": ["' + fromDate + '", "' + toDate + '"]}} ]}';
        // const filterCondition = '"where": {"createdOn": {"gt": '+ date +'}}';
        const orderby = '"order": "createdOn desc"';
        const includeCondition = '"include":{"relation":"companyDetails","scope":{"fields":["id","companyName","referenceId"]}}';

        filter = '?filter={' + whereFilter + ',' + orderby + ',' + includeCondition + '}'
      } else if (type === 'admin') {
        // const whereAdminFilter = '"where":{"and":[{"access_token":"'+ accessToken +'"},{"or" : [{"pickupStatus":"pickup"}, {"isPickup": true}]},{"bolService":true}]}';
        const whereAdminFilter = '"where":{"and":[{"access_token":"' + accessToken + '"}, {"status":{"neq": "inactive"}},{"or" : [{"pickupStatus": "pickup", "bolService":true}, {"isPickup": true, "bolService":true}, {"routinePickup":true}, {"otherCarrierName":"Rate Quote"}, {"trackLink": {"neq": "null"}}]},{"createdOn":{"between": ["' + fromDate + '", "' + toDate + '"]}}]}';
        const orderby = '"order": "createdOn desc"';
        const includeCondition = '"include":{"relation":"companyDetails","scope":{"fields":["id","companyName","referenceId"]}}';

        filter = '?filter={' + whereAdminFilter + ',' + orderby + ',' + includeCondition + '}';
      } else {
        const whereSalesrepFilter = '"where":{"and":[{"access_token":"' + accessToken + '"},{"salesRepId":' + salesRepId + '},{"createdOn": {"gt":"' + date + '"}}, {"status":{"neq": "inactive"}},{"or" : [{"pickupStatus":"pickup"}, {"isPickup": true}]},{"bolService":true}]}';
        const orderby = '"order": "createdOn desc"';
        const includeCondition = '"include":{"relation":"companyDetails","scope":{"fields":["id","companyName","referenceId"]}}';

        filter = '?filter={' + whereSalesrepFilter + ',' + orderby + ',' + includeCondition + '}';
      }
    }
    return this.httpC.get(this.apiUrl + '/billOfLading' + filter);
  }
  searchTrack(search:any, type:any) {
    let url, searchDetails;
    if (type === 'tracking') {
      url = this.apiUrl + remoteMethodApiUrl.searchBolTrackUrl;
    } else {
      url = this.apiUrl + remoteMethodApiUrl.searchLtlTrackUrl;
    }
    searchDetails = { searchDetails: search };
    return this.httpC.post(url, searchDetails)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // }).catch(error => {
    //   return Observable.throw(error); // observable needs to be returned or exception raised
    // });
  }


  getCustomerInformation(id:any, accessToken:any) {
    const url = this.apiUrl + '/externalCustomersDetail?filter[where][id]=' + id + '&access_token=' + accessToken;
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res) {
    //     return res;
    //   } else {
    //   }
    // });
  }

  setEditCustomerData(customerData:any, accessToken:any, type:any) {
    let payloadData, url;
    payloadData = { 'updateCustomerDetail': customerData };
    url = this.apiUrl + '/externalCustomersDetail/updateBusinessRules?access_token=' + accessToken;
    return this.httpC.post(url, payloadData)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  // setNewCustomer(businessRules, customerData, accessToken, type) {
  //     let payloadData, url;
  //     if (type === 'createNewCustomer') {
  //       payloadData = {'customerData': customerData, 'businessRules': businessRules};
  //       url = this.apiUrl + '/externalCustomersDetail/createExternalCustomer?access_token=' + accessToken;
  //     } else {
  //       payloadData = {'updateCustomerDetail': customerData, 'updateBusinessRulesData': businessRules};
  //       url = this.apiUrl + '/externalCustomersDetail/updateBusinessRules?access_token=' + accessToken;
  //     }
  //     return this.httpC.post(url, payloadData)
  //       .map((res: Response) => {
  //         if (res.status < 200 || res.status >= 300) {
  //           throw new Error('This request has failed ' + res.status);
  //         } else {
  //           return res;
  //         }
  //       });
  //   }

  //   setNewRuleForCustomer(businessRules, accessToken) {
  //     const payloadData = {'businessRules': businessRules};
  //     const url = this.apiUrl + '/externalCustomersDetail/createBusinessRules?access_token=' + accessToken;
  //     return this.httpC.post(url, payloadData)
  //       .map((res: Response) => {
  //         if (res.status < 200 || res.status >= 300) {
  //           throw new Error('This request has failed ' + res.status);
  //         } else {
  //           return res;
  //         }
  //       });
  //   }

  setCurrentPageFlag(page:any) {
    this.currentPage = page;
  }

  getCurrentPageFlag() {
    return this.currentPage;
  }

  setItemsPerPageFlag(page:any) {
    this.itemsPage = page;

  }

  getRates(userData:any, type:any) {
    let url;
    let date;
    let i = 1;
    if (type === 'YRC AP') {
      // url = this.apiUrl + remoteMethodApiUrl.classificationFactorUrl;
      
      url = this.apiUrl + '/ClassificationFactor/generateBill1';
      date = new Date();
    } else if (type === 'YRC AR') {
      // url = this.apiUrl + remoteMethodApiUrl.classificationFactorArUrl;
      url = this.apiUrl + '/ClassificationFactorAr/generateBill1';
      date = new Date();
    } else if (type === 'FEDEX AP') {
      //   url = this.apiUrl + remoteMethodApiUrl.fedexClsFacUrl;
      url = this.apiUrl + '/FedexClsFac/generateBillNew';
      // url = this.apiUrl + '/FedexClsFac/fedexRateAp';
      date = new Date();
    } else if (type === 'FEDEX AR') {
      //  url = this.apiUrl + remoteMethodApiUrl.fedexClsFacArUrl;
      url = this.apiUrl + '/FedexClsFacAr/generateARBillNew1';
      date = new Date();
    } else if (type === 'REDDAWAY AP') {
      //  url = this.apiUrl + remoteMethodApiUrl.reddawayUrl;
      url = this.apiUrl + '/Rates/generateBill1';
      date = new Date();
    } else if (type === 'YRC OLDAP') {
      // url = this.apiUrl + remoteMethodApiUrl.classificationFactorUrl;
      
      url = this.apiUrl + '/ClassificationFactor/generateBillyrcSmc';
      date = new Date();
    } else if (type === 'REDDAWAY OLDAP') {
      // url = this.apiUrl + remoteMethodApiUrl.classificationFactorUrl;
      console.log('reddaway old ap')
      url = this.apiUrl + '/Rates/generateBillReddawaySmc';
      date = new Date();
    } else {
      // url = this.apiUrl + remoteMethodApiUrl.reddawayArUrl;
      url = this.apiUrl + '/RatesAr/generateBill1';
      date = new Date();
    }
    const payLoadData = { 'calculationDetail': userData };
    return this.httpC.post(url, payLoadData)
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

  getRatesnew(userData:any, type:any) {
    let url;
    let date;
    let i = 1;
    url = this.apiUrl + '/Rates/generateBillReddaway';
      date = new Date();
      const payLoadData = { 'calculationDetail': userData };
      return this.httpC.post(url, payLoadData)
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

  getRatesnew1(userData:any, type:any) {
    let url;
    let date;
    let i = 1;
    url = this.apiUrl + '/Rates/generateBillReddawaySmc';
      date = new Date();
      const payLoadData = { 'calculationDetail': userData };
      return this.httpC.post(url, payLoadData)
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

  getItemsPerPageFlag() {
    return this.itemsPage;
  }

  setCustomerId(customerId:any) {
    this.customerId = customerId;
  }

  getCustomerId() {
    return this.customerId;
  }

  getExternalCustomerDetails(id:any, accessToken:any) {
    const url = this.apiUrl + '/externalCustomersDetail?filter[where][id]=' + id + '&access_token=' + accessToken + '&filter[include][BusinessRules]';
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }

  reddawayMail(data:any, accessToken:any) {
    const url = this.apiUrl + remoteMethodApiUrl.reddawayMailUrl;
    const payLoadData = { 'reddawayMailData': data };
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


  getCarrierForCustomer(customerId:any, accessToken:any) {
    const url = this.apiUrl + '/BusinessRules?filter[where][customerId]=' + customerId + '&access_token=' + accessToken + '&filter[where][category]=AR';
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }


  quoteMailValidation(token:any) {
    const quoteToken = { 'token': token };
    const payLoadData = { 'quoteToken': quoteToken };
    const url = this.apiUrl + remoteMethodApiUrl.activeRequestQuoteLinkUrl;
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

  updateCustomerPassword(object:any, accessToken:any) {
    const quoteToken = { 'object': object };
    const payLoadData = { 'passwordData': object };
    const url = this.apiUrl + remoteMethodApiUrl.updateCustomerPasswordUrl + accessToken;
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


  assessorialFunction(selectedItems:any, assessorials:any, profileAssessorials:any, weight:any, type:any, category:any): any[] {
    console.log('selectedItems', selectedItems, 'assessorials', assessorials, profileAssessorials, weight, type, category);
    const finalAssessorialResult = [];
    let finalResult = 0;
    let crtValue = 0;
    let profileData = [];
    let assessorialArray = [];
    this.arrayData = []; 
    this.selectedValue = '';
    if (selectedItems.length > 0) {
      selectedItems.sort(function (a:any, b:any) {
        return (a.id - b.id);
      });
    }
    console.log('selectedItems', selectedItems);
    profileData = this.compare(profileAssessorials, selectedItems);
    let tempassessorialArray = [];
    tempassessorialArray = this.compare1(assessorials, selectedItems)
    assessorialArray = this.getUnique(tempassessorialArray, 'id');
    console.log('profileData', profileData);
    console.log('assessorialArray', assessorialArray);
    for (let s = 0; s < selectedItems.length; s++) {
      // if (type === 'YRC' || type === 'REDDAWAY') {
      if (selectedItems[s].id === 1 ) {
        if (profileData[s].liftGate === '') {
          if (assessorialArray.length > 0) {
            assessorialArray.forEach((ele:any) => {

            if (ele.id === '1') {
              if (ele.cwt === true) {
                const lsyrc = (Number(ele.cost) * weight) / 100;
                if (lsyrc > Number(ele.max)) {
                  crtValue = Number(ele.max);
                } else if (lsyrc < Number(ele.min)) {
                  crtValue = Number(ele.min);
                } else if (lsyrc > Number(ele.min)) {
                  crtValue = lsyrc;
                }
              } else {
                crtValue = Number(ele.cost);
              }
            } 
          });
            // else {
            //   crtValue = Number(ele.cost);
            // }
          }
        } else {
          crtValue = Number(profileData[s].liftGate);
        }
        console.log('liftGate selectedItems', crtValue);
        finalResult = finalResult + crtValue;
        console.log('liftGate selectedItems finalResult', finalResult);
        this.selectedValue = selectedItems[s].itemName + ' - ' + '$' + crtValue.toFixed(2).toString();
      }
      if (selectedItems[s].id === 2 ) {
        if (profileData[s].residential === '') {
          if (assessorialArray.length > 0) {
            assessorialArray.forEach((ele:any) => {

            if (ele.id === '2') {
              if (ele.cwt === true) {
                const rdyrc = (Number(ele.cost) * weight) / 100;
                if (rdyrc > Number(ele.max)) {
                  crtValue = Number(ele.max);
                } else if (rdyrc < Number(ele.min)) {
                  crtValue = Number(ele.min);
                } else if (rdyrc > Number(ele.min)) {
                  crtValue = rdyrc;
                }
              } else {
                crtValue = Number(ele.cost);
              }
            } 
            // else {
            //   crtValue = Number(ele.cost);
            // }
          });
          }
        } else {
          crtValue = Number(profileData[s].residential);
        }
        console.log('residential selectedItems crtValue', crtValue);
        finalResult = finalResult + crtValue;
        console.log('residential selectedItems finalResult', finalResult);
        this.selectedValue = selectedItems[s].itemName + ' - ' + '$' + crtValue.toString();
      }
      if (selectedItems[s].id === 3 ) {
        if (profileData[s].limitedAccessDelivery === '') {
          if (assessorialArray.length > 0) {
            assessorialArray.forEach((ele:any) => {

            if (ele.id === '3') {
              if (ele.cwt === true) {
                const rdyrc = (Number(ele.cost) * weight) / 100;
                if (rdyrc > Number(ele.max)) {
                  crtValue = Number(ele.max);
                } else if (rdyrc < Number(ele.min)) {
                  crtValue = Number(ele.min);
                } else if (rdyrc > Number(ele.min)) {
                  crtValue = rdyrc;
                }
              } else {
                crtValue = Number(ele.cost);
              }
            } 
            // else {
            //   crtValue = Number(ele.cost);
            // }
          });
          }

        } else {
          crtValue = Number(profileData[s].limitedAccessDelivery);
          console.log('limitedAccessDelivery selectedItems crtValue', crtValue);
        }
        console.log('limitedAccessDelivery selectedItems crtValue', crtValue);
        finalResult = finalResult + crtValue;
        console.log('limitedAccessDelivery selectedItems finalResult', finalResult);
        this.selectedValue = selectedItems[s].itemName + ' - ' + '$' + crtValue.toString();
      }
      if (selectedItems[s].id === 4) {
        if (profileData[s].insideDelivery === '') {
          if (assessorialArray.length > 0) {
            assessorialArray.forEach((ele:any) => {

            if (ele.id === '4') {
              if (ele.cwt === true) {
                const ideyrc = (Number(ele.cost) * weight) / 100;
                if (ideyrc > Number(ele.max)) {
                  crtValue = Number(ele.max);
                } else if (ideyrc < Number(ele.min)) {
                  crtValue = Number(ele.min);
                } else if (ideyrc > Number(ele.min)) {
                  crtValue = ideyrc;
                }
              } else {
                crtValue = Number(ele.cost);
              }
            } 
          });
            // else {
              // crtValue = Number(ele.cost);
            // }
          }
        } else {
          crtValue = Number(profileData[s].insideDelivery);
        }
        console.log('insideDelivery selectedItems finalResult', crtValue);
        finalResult = finalResult + crtValue;
        console.log('insideDelivery selectedItems finalResult', finalResult);
        this.selectedValue = selectedItems[s].itemName + ' - ' + '$' + crtValue.toString();
      }
      if (selectedItems[s].id === 5) {
        if (profileData[s].notify === '') {
          if (assessorialArray.length > 0) {
            assessorialArray.forEach((ele:any) => {

            if (ele.id === '5') {
              if (ele.cwt === true) {
                const ideyrc = (Number(ele.cost) * weight) / 100;
                if (ideyrc > Number(ele.max)) {
                  crtValue = Number(ele.max);
                } else if (ideyrc < Number(ele.min)) {
                  crtValue = Number(ele.min);
                } else if (ideyrc > Number(ele.min)) {
                  crtValue = ideyrc;
                }
              } else {
                crtValue = Number(ele.cost);
              }
            } 
          });
            // else {
            //   crtValue = Number(ele.cost);
            // }
          }
        } else {
          crtValue = Number(profileData[s].notify);
        }
        console.log('notify selectedItems crtValue', crtValue);
        finalResult = finalResult + crtValue;
        console.log('notify selectedItems finalResult', finalResult);
        this.selectedValue = selectedItems[s].itemName + ' - ' + '$' + crtValue.toString();
      }
      if (selectedItems[s].id === 7) {
        if (profileData[s].deliveryAppointmentRequired === '' || profileData[s].deliveryAppointmentRequired === null) {
          if (assessorialArray.length > 0) {
            assessorialArray.forEach((ele:any) => {

            if (ele.id === '7') {
              if (ele.cwt === true) {
                const ideyrc = (Number(ele.cost) * weight) / 100;
                if (ideyrc > Number(ele.max)) {
                  crtValue = Number(ele.max);
                } else if (ideyrc < Number(ele.min)) {
                  crtValue = Number(ele.min);
                } else if (ideyrc > Number(ele.min)) {
                  crtValue = ideyrc;
                }
              } else {
                crtValue = Number(ele.cost);
              }
            }
          }); 
            // else {
            //   crtValue = Number(ele.cost);
            // }
          }
        } else {
          crtValue = Number(profileData[s].deliveryAppointmentRequired);
        }
        console.log('notify selectedItems crtValue', crtValue);
        finalResult = finalResult + crtValue;
        console.log('notify selectedItems finalResult', finalResult);
        this.selectedValue = selectedItems[s].itemName + ' - ' + '$' + crtValue.toString();
      }

      if (selectedItems[s].id === 8) {
        if (profileData[s].hazmat === '' || profileData[s].hazmat === null) {
          if (assessorialArray.length > 0) {
            assessorialArray.forEach((ele:any) => {

            if (ele.id === '8') {
              if (ele.cwt === true) {
                const ideyrc = (Number(ele.cost) * weight) / 100;
                if (ideyrc > Number(ele.max)) {
                  crtValue = Number(ele.max);
                } else if (ideyrc < Number(ele.min)) {
                  crtValue = Number(ele.min);
                } else if (ideyrc > Number(ele.min)) {
                  crtValue = ideyrc;
                }
              } else {
                crtValue = Number(ele.cost);
              }
            } 
          });
            // else {
            //   crtValue = Number(ele.cost);
            // }
          }
        } else {
          crtValue = Number(profileData[s].hazmat);
        }
        console.log('notify selectedItems crtValue', crtValue);
        finalResult = finalResult + crtValue;
        console.log('notify selectedItems finalResult', finalResult);
        this.selectedValue = selectedItems[s].itemName + ' - ' + '$' + crtValue.toString();
      }
      if (selectedItems[s].id === 10) {
        if (profileData[s].liftGatePickup === '') {
          if (assessorialArray.length > 0) {
            assessorialArray.forEach((ele:any) => {
              if (ele.id === '1') {
                console.log('ele',ele);
                if (ele.cwt === true) {
                  const lsyrc = (Number(ele.cost) * Number(weight)) / 100;
                  if (lsyrc > Number(ele.max)) {
                    crtValue = Number(ele.max);
                  } else if (lsyrc < Number(ele.min)) {
                    crtValue = Number(ele.min);
                  } else if (lsyrc > Number(ele.min)) {
                    crtValue = lsyrc;
                  }
                } else {
                  crtValue = Number(ele.cost);
                }
              } 
              // else {
              //   crtValue = Number(profileData[s].liftGate);
              // }
            })
          
          }
        } else {
          crtValue = Number(profileData[s].liftGatePickup);
        }
        console.log('liftGate selectedItems', crtValue);
        finalResult = finalResult + crtValue;
        console.log('liftGate selectedItems finalResult', finalResult);
        this.selectedValue = selectedItems[s].itemName + ' - ' + '$' + crtValue.toString();
      }
      if (selectedItems[s].id === 11) {
        if (profileData[s].residentialPickup === '') {
          if (assessorialArray.length > 0) {
            assessorialArray.forEach((ele:any) => {

            if (ele.id === '2') {
              if (ele.cwt === true) {
                const rdyrc = (Number(ele.cost) * weight) / 100;
                if (rdyrc > Number(ele.max)) {
                  crtValue = Number(ele.max);
                } else if (rdyrc < Number(ele.min)) {
                  crtValue = Number(ele.min);
                } else if (rdyrc > Number(ele.min)) {
                  crtValue = rdyrc;
                }
              } else {
                crtValue = Number(ele.cost);
              }
            } 
            // else {
            //   crtValue = Number(ele.cost);
            // }
          });
          }
        } else {
          crtValue = Number(profileData[s].residentialPickup);
        }
        console.log('residential selectedItems crtValue', crtValue);
        finalResult = finalResult + crtValue;
        console.log('residential selectedItems finalResult', finalResult);
        this.selectedValue = selectedItems[s].itemName + ' - ' + '$' + crtValue.toString();
      }
      if (selectedItems[s].id === 12) {
        if (profileData[s].limitedaccesspickup === '') {
          if (assessorialArray.length > 0) {
            // console.log(ele)
            assessorialArray.forEach((ele:any) => {

            if (ele.id === '3') {
              if (ele.cwt === true) {
                const rdyrc = (Number(ele.cost) * weight) / 100;
                if (rdyrc > Number(ele.max)) {
                  crtValue = Number(ele.max);
                } else if (rdyrc < Number(ele.min)) {
                  crtValue = Number(ele.min);
                } else if (rdyrc > Number(ele.min)) {
                  crtValue = rdyrc;
                }
              } else {
                crtValue = Number(ele.cost);
              }
            } 
          });
            // else {
            //   crtValue = Number(ele.cost);
            // }
          }

        } else {
          crtValue = Number(profileData[s].limitedaccesspickup);
          console.log('limitedAccessDelivery selectedItems crtValue', crtValue);
        }
        console.log('limitedAccessDelivery selectedItems crtValue', crtValue);
        finalResult = finalResult + crtValue;
        console.log('limitedAccessDelivery selectedItems finalResult', finalResult);
        this.selectedValue = selectedItems[s].itemName + ' - ' + '$' + crtValue.toString();
      }
      this.arrayData.push(this.selectedValue);
      console.log('this.arrayData', this.arrayData);
    }
    finalAssessorialResult.push(finalResult);
    console.log('finalAssessorialResult', finalAssessorialResult);
    return finalAssessorialResult;
  }

  getAssessorial() {
    return this.arrayData;
  }

  compare(arr1:any, arr2:any) {
    let finalArray:any = [];
    arr1.forEach((e1:any) => arr2.forEach((e2:any) => {
      if (Number(e1.id) === e2.id) {
        finalArray.push(e1);
        console.log('finalArray', finalArray);
      } 
      // else if (Number(e1.id) === 10) {
      //   finalArray.push(e1);
      // }
    }
    ));
    return finalArray;
  }
  compare1(arr1:any, arr2:any) {
    let finalArray:any = [];
    arr1.forEach((e1:any) => arr2.forEach((e2:any) => {
      console.log('e1',e1);
      console.log('e2',e2)

      if (Number(e1.id) === e2.id) {
        finalArray.push(e1);
        console.log('finalArray', finalArray);
      } else if (Number(e2.id) === 10 || Number(e2.id) === 11 || Number(e2.id) === 12) {
        finalArray.push(e1);
      }
    }
    ));
    return finalArray;
  }

  getUnique(arr:any, comp:any) {
    console.log('arr unique', arr, comp);
    const unique = arr
      .map((e:any) => e[comp])
      // store the keys of the unique objects
      .map((e:any, i:any, final:any) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter((e:any) => arr[e]).map((e:any) => arr[e]);
    console.log('unique', unique);
    return unique;
  }

  addCustomersFlag(type:any) {
    if (type === 'add') {
      this.setForAddCustomer = true;
    } else {
      this.setForAddCustomer = false;
    }
  }
  setCostPlusFlag(type:any) {
    this.costplusFlag = type;
  }

  getCostPlusFlag() {
    return this.costplusFlag;
  }
  getAddCustomersFlag() {
    return this.setForAddCustomer;
  }
  setDeleteData(type:any) {
    this.deleteData = type;
  }
  getDeleteData() {
    return this.deleteData;
  }
  setBolQuoteId(quoteId:any){
    this.createBolFromLtlQuote = quoteId;
    // this.quoteReferenceSubject.next(quoteId);
    console.log(quoteId);
    }

    setQuoteId(quoteId:any){
      // this.createBolFromLtlQuote = quoteId;
      this.quoteReferenceSubject.next(quoteId);
      console.log(quoteId);
      } 
   getBolQuoteId(){
    return this.createBolFromLtlQuote;
    }

  getSingleShipment(userData:any) {
    let object = {};
    object = { calculationDetail: userData }
    const url = this.apiUrl + remoteMethodApiUrl.getSingleShipmentUrl;
    return this.httpC.post(url, object)
      // .map((res: Response) => {
      //   if (res) {
      //     return res;
      //   } else {
      //   }
      // }).catch(err => {
      //   return Observable.throw(err); // observable needs to be returned or exception raised
      // });
  }
  getCarriersForZipcodes(userData:any) {
    let object = {};
    object = { calcDetail: userData }
    const url = this.apiUrl + remoteMethodApiUrl.getRulesUrl;
    return this.httpC.post(url, object)
      // .map((res: Response) => {
      //   if (res) {
      //     return res;
      //   } else {
      //   }
      // }).catch(err => {
      //   return Observable.throw(err); // observable needs to be returned or exception raised
      // });
  }

  getTransitTime(userData:any) {
    let object = {};
    object = { calculationDetail: userData }
    const url = this.apiUrl + remoteMethodApiUrl.getTransitTimeUrl;
    return this.httpC.post(url, object)
      // .map((res: Response) => {
      //   if (res) {
      //     return res;
      //   } else {
      //   }
      // }).catch(err => {
      //   return Observable.throw(err); // observable needs to be returned or exception raised
      // });
  }



  updateBolTrackNumber(objectData:any) {
    let object = { trackAndProNumber: objectData };
    const url = this.apiUrl + remoteMethodApiUrl.updateBolTrackNumberUrl;
    return this.httpC.post(url, object)
      // .map((res: Response) => {
      //   if (res) {
      //     return res;
      //   } else {
      //   }
      // }).catch(err => {
      //   return Observable.throw(err); // observable needs to be returned or exception raised
      // });
  }

  getAdditionalRateForFedex(destination:any, accessToken:any) {
    let destinationZip = { zip: destination }
    let payLoadData = { destinationZip: destinationZip }
    const url = this.apiUrl + remoteMethodApiUrl.getFedexAdditionalRateUrl + accessToken;
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

  passRateCheckValue(getRatecheck:any) {
    this.rateSubject.next(getRatecheck);
  }

  passReferenceNumber(referenceNumber:any) {
  this.referenceSubject.next(referenceNumber);
  }

  passPricingValue(getPricingValue:any) {
    this.pricingSubject.next(getPricingValue);
  }
  getInwardDetails() {
    const url = this.apiUrl + '/inwardBillOfLading?filter[include][companyDetails]';
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res) {
    //     return res;
    //   } else {
    //   }
    // });
  }

  getInwardDetailsNew(data:any) {
    console.log(data);
    const url = this.apiUrl + '/inwardBillOfLading?filter[where][companyId]='+ data.companyId + '&filter[include][companyDetails]';
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res) {
    //     return res;
    //   } else {
    //   }
    // });
  }


  putInwardDetailsByID(data:any) {
    console.log(data.id)
    let url = this.apiUrl + '/inwardBillOfLading/' + data.id;
    return this.httpC.put(url, data)
      // .map((res: Response) => {
      //   // if (res.status < 200 || res.status >= 300) {
      //   //   throw new Error('This request has failed ' + res.status);
      //   // } else {
      //     return res;
      // });
  }


  getInwardDetailsCustomer(customerId:any,accessToken:any){
    // const searchDetails1 = {userType: "customer",       "customerId": customerId};
    const url = this.apiUrl + '/inwardBillOfLading?filter[where][companyId]=' + customerId + '&access_token=' + accessToken + '&filter[include][companyDetails]' ;
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res) {
    //     return res;
    //   } else {
    //   }
    // });

  }

  startCarrierService(objectData:any) {
    let object = { controlData: objectData };
    const url = this.apiUrl + '/Master/forteServiceControl';
    return this.httpC.post(url, object)
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