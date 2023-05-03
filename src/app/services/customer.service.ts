import { Injectable } from '@angular/core';
// import {Http, Response, RequestOptions} from '@angular/http';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import {environment} from '../../environments/environment';
import {remoteMethodApiUrl} from '../app.constant';

@Injectable()
export class CustomerService {
  apiUrl = environment.apiUrl;
  public companyObject = {};
  public customerObject = {};
  public businessObject = {};
  public companyId:any;
  constructor(private httpC: HttpClient) {  
  }

  /* Retrieving All the company details */   
  getCompanyDetails(accessToken:any) {
    const url = this.apiUrl + '/companyDetails?access_token=' + accessToken + '&filter[where][status][neq]=inactive' + '&filter[order]=companyName ASC' ;
    return this.httpC.get(url);
  }

  /* Retrieving All the company details By Sales Rep Id */
  getCompanyDetailsBySalesRepId(salesRepId:any, accessToken:any) {
    const url = this.apiUrl + '/companyDetails?access_token=' + accessToken + '&filter[where][salesRepId]=' + salesRepId + '&filter[where][status][neq]=inactive' +'&filter[order]=companyName ASC';
    return this.httpC.get(url);
  }

  getcompanyContract(id:any) {
    const url = this.apiUrl + '/contractInfo?filter[where][companyId]=' + id ;
    return this.httpC.get(url);
  }
/* Retrieving company By Id */
  getCompanyById(id:any, accessToken:any) {
    const url = this.apiUrl + '/companyDetails?access_token=' + accessToken + '&filter[where][id]=' + id + '&filter[where][status][neq]=inactive';
    return this.httpC.get(url);
  }
  /* Retrieving Sales Rep Details */
  getSalesRepDetails(accessToken:any) {
    const url = this.apiUrl + '/AdminUser?access_token=' + accessToken + '&filter[order]=salesRepName ASC &filter[where][status]=active';
    return this.httpC.get(url);
  }
/* Retrieving all the details => Company, Customers, BusinessRules By companyId */
  getAllCompanyDataById(accesstoken:any, id:any) {
    const url = this.apiUrl + '/companyDetails?filter[where][id]=' + id + '&access_token=' + accesstoken + '&filter[where][status][neq]=inactive' + '&filter[include][BusinessRulesNew]';
    // &filter[include][externalCustomersDetail]
    return this.httpC.get(url);
  }

  getAllCompanyDataByIdWorkbook(accesstoken:any, id:any) {
    const url = this.apiUrl + '/companyDetails?filter[where][id]=' + id + '&access_token=' + accesstoken + '&filter[where][status][neq]=inactive' + '&filter[include][BusinessRulesNew]';
    // &filter[include][externalCustomersDetail]
    return this.httpC.get(url);
  }
/* Retrieving all the details => Company, Customers, BusinessRules */
getAllCompanyData(accessToken:any) {
    const url = this.apiUrl + '/companyDetails?access_token=' + accessToken + '&filter[where][status][neq]=inactive'+ '&filter[order]=id DESC&filter[include][BusinessRulesNew]';
    // &filter[include][externalCustomersDetail]
     return this.httpC.get(url);
   }
/* Retrieving all the details => Company, Customers, BusinessRules By SalesRepId*/
   getAllCompanyDataBySalesRepId(salesRepId:any, accessToken:any) {
    const url = this.apiUrl + '/companyDetails?access_token=' + accessToken +'&filter[where][salesRepId]=' + salesRepId +'&filter[order]=id DESC&filter[include][externalCustomersDetail]&filter[include][BusinessRulesNew]';
    return this.httpC.get(url);
  }
  getSalesRepData(accessToken:any, id:any) {
    console.log('getSalesRepData');
    const whereCondition = '"where":{"id": '+ id +'}';
    const columnFilter = '"fields":["salesRepName","email","id"]';
    const filter = '&filter={'+ whereCondition + ',' + columnFilter +'}';
    const url = this.apiUrl + '/AdminUser?access_token=' + accessToken +filter;
    return this.httpC.get(url);
  }
  /* Retrieving all the details for customer By Company Id */
    // getCustomerDataByCompanyId(companyId) {
    //   const url = this.apiUrl + '/externalCustomersDetail?access_token=' + this.accessToken +'&filter[where][companyId]=' + companyId;
    //   return this.httpC.get(url).map((res: Response) => {
    //     if (res.status < 200 || res.status >= 300) {
    //       throw new Error('This request has failed ' + res.status);
    //     } else {
    //       return res;
    //     }
    //   }).catch(err => {
    //     return Observable.throw(err); // observable needs to be returned or exception raised
    //   });
    // }

    getCustomerDataByCompanyId(companyId:any, accessToken:any) {
      const url = this.apiUrl + '/companyDetails/'+companyId +'/externalCustomersDetail?access_token=' + accessToken +'&filter[where][status][neq]=inactive';
      return this.httpC.get(url);
    }
    /* Retrieving details by Customer Id */
    getCustomerDataById(id:any, accessToken:any) {
      const url = this.apiUrl + '/externalCustomersDetail?filter[where][id]=' + id + 'access_token=' + accessToken;
      return this.httpC.get(url);
    }
    getCustomerDataById1(id:any) {
      const url = this.apiUrl + '/externalCustomersDetail?filter[where][id]=' + id ;
      return this.httpC.get(url);
    }

  /* Deleting BusinessRules By Id */
  deleteBusinessRulesById(id:any, accessToken:any) {
   // this.customerId = '';
    const url = this.apiUrl + '/BusinessRulesNew/' + id + '?access_token=' + accessToken;
    return this.httpC.delete(url);
    // return this.httpC.delete(url).map((res: Response) => {
    //   return res;
    // });
  }

  /*Delete => Making In active Customer by Id */
  deleteCustomer(id:any, accessToken:any) {
    let object = {id: id};
    const payLoadData = {'deleteInfo': object};
    const url = this.apiUrl + remoteMethodApiUrl.deleteCustomerUrl + accessToken;
    return this.httpC.post(url,payLoadData);
    return this.httpC.post(url,payLoadData).pipe()
    // return this.httpC.post(url, payLoadData)
    //   .map((res: Response) => {
    //     if (res) {
    //       return res;
    //     } else {
    //     }
    //   }).catch(err => {
    //     return Observable.throw(err); // observable needs to be returned or exception raised
    //   });
  }

  deleteCompany(id:any,sales:any) {
   let object = {'companyId': id, 'salesRepId':sales};
    const payLoadData = {'companyData': object}
    const url = this.apiUrl + "/companyInformation/deleteWorkbookCompany"
    return this.httpC.post(url, payLoadData)
    // return this.httpC.post(url, payLoadData)
    //   .map((res: Response) => {
    //     if (res) {
    //       return res;
    //     } else {
    //     }
    //   }).catch(err => {
    //     return Observable.throw(err); // observable needs to be returned or exception raised
    //   });
  }

  /* Passing Value for Editing Company Details*/
  
  saveEditCompany(company:any, businessRule:any) {
    this.companyObject = company;
    this.businessObject = businessRule;
  }
  getEditCompany() {
      return this.companyObject;
   }
   getEditBusiness() {
       return this.businessObject;
   }
   /* Passing values for Editing Customer Details */
   saveEditCustomer(customer:any) {
     this.customerObject = customer;
   }
   getEditCustomer() {
      return this.customerObject;
   }

   /* Edit and Update the password */
   updateCustomerPassword(object:any, accessToken:any) {
    const quoteToken = {'object': object};
    const payLoadData = {'passwordData': object};
    const url = this.apiUrl + remoteMethodApiUrl.updateCustomerPasswordUrl + accessToken;
    return this.httpC.post(url,payLoadData);
    // return this.httpC.post(url, payLoadData)
    //   .map((res: Response) => {
    //     if (res) {
    //       return res;
    //     } else {
    //     }
    //   }).catch(err => {
    //     return Observable.throw(err); // observable needs to be returned or exception raised
    //   });
  }



  setNewCompany(businessRules:any, companyData:any, type:any, accesstoken:any) {
    let payloadData, url;
    if (type === 'createNewCustomer') {
      payloadData = {'companyDetails': companyData, 'businessRules': businessRules};
      url = this.apiUrl + remoteMethodApiUrl.createCompanyUrl + accesstoken;
    } else {
      payloadData = {'updateCompanyDetail': companyData, 'updateBusinessRulesDetails': businessRules};
      url = this.apiUrl + remoteMethodApiUrl.updateBusinessRulesUrl + accesstoken;
    }
    return this.httpC.post(url,payloadData);
    // return this.httpC.post(url, payloadData)
    //   .map((res: Response) => {
    //     if (res.status < 200 || res.status >= 300) {
    //       throw new Error('This request has failed ' + res.status);
    //     } else {
    //       return res;
    //     }
    //   });
  }

  setNewRuleForCompany(businessRules:any, accessToken:any) {
    const payloadData = {'businessRules': businessRules};
    const url = this.apiUrl + remoteMethodApiUrl.createBusinessRulesUrl+ accessToken;
    return this.httpC.post(url, payloadData)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  setCustomerFromCompanyId(id:any) {
      this.companyId = id;
  }

  getCustomerFromCompanyId() {
    return this.companyId;
  }

  setCustomerData(customerData:any, type:any, accessToken:any) {
    let payloadData, url;
    if (type === 'add') {
    payloadData = {'customerData': customerData};
     url = this.apiUrl + remoteMethodApiUrl.createCustomerUrl + accessToken;
  } else {
     payloadData = {'updateExternalCustomerDetails': customerData};
     url = this.apiUrl + remoteMethodApiUrl.updateCustomerUrl + accessToken;
  }
    return this.httpC.post(url, payloadData)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  getCarrierForCustomer(companyId:any, accessToken:any) {
    const url = this.apiUrl + '/BusinessRulesNew?filter[where][companyId]=' + companyId + '&access_token=' + accessToken + '&filter[where][category]=AR';
    return this.httpC.get(url);
  }

  
  getAllDetailsForCompanyDownload(salesRepId:any, accessToken:any, type:any) {
    let url;
    if (type === 'admin') {
     url = this.apiUrl + '/companyDetails?access_token=' + accessToken + '&filter[where][status][neq]=inactive&filter[order]=companyName ASC &filter[include][externalCustomersDetail]&filter[include][BusinessRulesNew]';
  } else {
    url = this.apiUrl + '/companyDetails?filter[where][salesRepId]=' + salesRepId + 'access_token=' + accessToken + '&filter[where][status][neq]=inactive&filter[order]=companyName ASC&filter[include][externalCustomersDetail]&filter[include][BusinessRulesNew]';
  }
    return this.httpC.get(url);
  }
  updateFedexSubscription(data:any, id:any, accessToken:any) {
    let payloadData, url;
    url = this.apiUrl + remoteMethodApiUrl.updateCompanyDetailUrl+ accessToken;
    // if (type === 'add') {
    payloadData = data;
    return this.httpC.put(url, payloadData)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }
  getImage(imageUrl: string) {
    return this.httpC.get(imageUrl, {observe: 'response', responseType: 'blob'})
      // .map((res) => {
      //   return new Blob([res.body], {type: res.headers.get('Content-Type')});
      // })
  }
}
