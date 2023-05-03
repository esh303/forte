import { Injectable } from '@angular/core';
// import {Http, Response, RequestOptions} from '@angular/http';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import {environment} from '../../environments/environment';
import {remoteMethodApiUrl} from '../app.constant';
import { DatePipe } from '@angular/common';


@Injectable()
export class ExternalService {
	apiUrl = environment.apiUrl;
	public quoteId:any;
  public templateType:any;
  public toolsValue:any;
  constructor(private httpC: HttpClient,
    private datePipe: DatePipe
    ) { }

  setRateQuote(data:any) {
    const url = this.apiUrl + remoteMethodApiUrl.activeRequestQuoteUrl;
    const quoteDetails = {quoteDetails: data};
    return this.httpC.post(url, quoteDetails)
      // .map((res: Response) => {
      //   if (res) {
      //     return res;
      //   } else {
      //   }
      // }).catch(err => {
      //   return Observable.throw(err); // observable needs to be returned or exception raised
      // });
  }
//   getMyBill() {
//     const url = this.apiUrl + remoteMethodApiUrl.getAllbillOfLadingUrlNew;
//     return this.httpC.get(url);
//   }

// getExternalBill(customerId, accessToken) {
//     const url = this.apiUrl + '/billOfLading?filter[where][companyId]=' + customerId + '&access_token=' + accessToken + '&filter[order]=createdOn DESC'+'&filter[include]=externalCustomersDetail';
//     return this.httpC.get(url).map((res: Response)=> {
//       if (res.status < 200 || res.status >= 300) {
//         throw new Error('This request has failed ' + res.status);
//       } else {
//         return res;
//       }
//     });
//   }

  getRateQuote(id:any, token:any, date:any, type:any, specification:any) {
    let url;
    if (type === 'ftltrack') {
      if (specification === 'allData') {
        url = this.apiUrl + '/customersRateQuote?filter[where][companyId]=' + id +'&filter[order]=createdOn DESC' +'&filter[where][status]=Shipped';
      } else {
    url = this.apiUrl + '/customersRateQuote?filter[where][companyId]=' + id +'&filter[where][createdOn][gt]='+ date +'&filter[order]=createdOn DESC' +'&filter[where][status]=Shipped';
  }
    } else {
      url = this.apiUrl + '/customersRateQuote?filter[where][companyId]=' + id +'&filter[order]=createdOn DESC';
    }
    return this.httpC.get(url);
  }
  getActiveReq(date:any, type:any) {
    let url;
    if (type === 'ftltrack') {
    url = this.apiUrl + '/customersRateQuote?[include]=externalCustomersDetail' + '&filter[where][createdOn][gte]='+ date +'&filter[order]=createdOn DESC';
  } else {
    url = this.apiUrl + '/customersRateQuote?[include]=externalCustomersDetail&filter[order]=createdOn DESC';
  }
    return this.httpC.get(url);
  }

// getMyBill() {
//     const url = this.apiUrl + remoteMethodApiUrl.getAllbillOfLadingUrl;
//     return this.httpC.get(url);
//   }

// getExternalBill(customerId, accessToken) {
//     const url = this.apiUrl + '/billOfLading?filter[where][companyId]=' + customerId + '&access_token=' + accessToken + '&filter[order]=createdOn DESC'+'&filter[where][status][neq]=inactive';
//     return this.httpC.get(url).map((res: Response)=> {
//       if (res.status < 200 || res.status >= 300) {
//         throw new Error('This request has failed ' + res.status);
//       } else {
//         return res;
//       }
//     });

//   }

  getMyBill() {
    var now = new Date();
var duedate = new Date(now);
duedate.setDate(now.getDate() - 60);
console.log(duedate);
let splittedDate = this.datePipe.transform(duedate, 'yyyy-MM-dd');
// const includeCondition = '{"include": [{"relation": "externalCustomersDetail","scope":{"fields": ["customerName"]}},{"relation": "AdminUser","scope":{"fields": ["salesRepName"]}}]}';
    // const includeFilter = '{"include": [{"relation": "externalCustomersDetail","scope":{"fields": ["customerName"]}},{"relation": "AdminUser","scope":{"fields": ["salesRepName"]}}]}';
    // const whereFilter = 'where: {order: createdOn DESC ,createdOn:'+splittedDate+'}';
    // const FILTER = '&filter={' + includeFilter + ',' + whereFilter + '}';
// let IncludeFilter = {"include": [{"relation": "externalCustomersDetail","scope":{"fields": ["customerName"]}},{"relation": "AdminUser","scope":{"fields": ["salesRepName"]}}]}
    // const url = this.apiUrl + remoteMethodApiUrl.getAllbillOfLadingUrlNew;
    const url = this.apiUrl + '/billOfLading?filter[order]=createdOn DESC'+'&filter[createdOn][gt]='+ splittedDate + '&filter[include]=externalCustomersDetail'+'&filter[include]=AdminUser'
    // + '&filter[createdOn]='+splittedDate
    return this.httpC.get(url);
  }

  getMyBillnew() {
    const searchDetails1 = {userType: 'admin'};
    const url = this.apiUrl + '/billOfLading/getBillOfLading';
    return this.httpC.post(url, {'searchDetails':searchDetails1})
    // .map((res: Response) => {
    //   if (res) {
    //     return res;
    //   } else {
    //   }
    // }).catch(err => {
    //   return Observable.throw(err); // observable needs to be returned or exception raised
    // });

  } 

getExternalBill(customerId:any, accessToken:any) {
    const url = this.apiUrl + '/billOfLading?filter[where][companyId]=' + customerId + '&access_token=' + accessToken + '&filter[order]=createdOn DESC'+'&filter[include]=externalCustomersDetail';
    return this.httpC.get(url)
    // .map((res: Response)=> {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }
  getExternalBillNew(customerId:any, accessToken:any) {
    const searchDetails1 = {userType: "customer",       "companyId": customerId};
    const url = this.apiUrl + '/billOfLading/getBillOfLading';
    return this.httpC.post(url, {'searchDetails':searchDetails1})
    // .map((res: Response) => {
    //   if (res) {
    //     return res;
    //   } else {
    //   }
    // }).catch(err => {
    //   return Observable.throw(err); // observable needs to be returned or exception raised
    // });

  }

  quoteRead(quoteID:any, type:any) {
    quoteID = '' + quoteID;
    const url = this.apiUrl + remoteMethodApiUrl.activeRequestQuoteViewedUrl;
    const quoteDetails = {'id': quoteID, type : type};
    return this.httpC.post(url, {quoteDetails: quoteDetails})
    // .map((res: Response) => {
    //   if (res) {
    //     return res;
    //   } else {
    //     return res;
    //   }
    // });
  }
  searchExternalBill(search:any) {
    const url = this.apiUrl + remoteMethodApiUrl.searchBolUrl;
    const searchDetails = {searchDetails: search};
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

  getSearchData(completeForm:any) {
    const url = this.apiUrl + remoteMethodApiUrl.activeRequestQuoteSearchUrl;
    return this.httpC.post(url, {searchDetails: completeForm})
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

  getIdTemplateSearchData(completeForm:any) {
    const url = this.apiUrl + remoteMethodApiUrl.searchItemTemplateUrl;
    return this.httpC.post(url, {searchDetails: completeForm})
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

  getAddressTemplateSearchData(completeForm:any) {
    const url = this.apiUrl + remoteMethodApiUrl.searchAddressTemplateUrl;
    return this.httpC.post(url, {searchDetails: completeForm})
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

  getClickVal(quoteReferenceNumber:any) {
    const url = this.apiUrl + remoteMethodApiUrl.getActiveRequestByQuoteRefIdUrl + quoteReferenceNumber;
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res) {
    //     return res;
    //   } else {
    //     return res;
    //   }
    // });
  }

  acceptOrDecline(acceptOrDecline:any) {
    const url = this.apiUrl + remoteMethodApiUrl.activeRequestQuoteStatusUpdateUrl;
    const statusDetail = {statusDetail: acceptOrDecline};
    return this.httpC.post(url, statusDetail)
    // .map((res: Response) => {
    //   if (res) {
    //     return res;
    //   } else {
    //     return res;
    //   }
    // });
  }
  saveTrackingDetails(object:any) {
    const url = this.apiUrl + remoteMethodApiUrl.activeRequestUpdateTrackLinkUrl;
    const trackingDetail = {trackDetails: object};
    return this.httpC.post(url, trackingDetail)
    // .map((res: Response) => {
    //   if (res) {
    //     return res;
    //   } else {
    //     return res;
    //   }
    // });
  }

  mailOnQuotetrack(id:any) {
    const url = this.apiUrl + remoteMethodApiUrl.activeRequestMailOnTrackLinkUrl;
    const trackingDetail = {quoteDetails: {id: id}};  
    return this.httpC.post(url, trackingDetail)
    // .map((res: Response) => {
    //   if (res) {
    //     return res;
    //   } else {
    //     return res;
    //   }
    // });
  }

  getUpdatedData(quoteId:any) {
    const url = this.apiUrl + remoteMethodApiUrl.getActiveRequestByIdUrl + quoteId;
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res) {
    //     return res;
    //   } else {
    //     return res;
    //   }
    // });
  }

  sendEmailData(value:any) {
    const url = this.apiUrl + remoteMethodApiUrl.activeRequestMailQuoteUrl;
    const rateQuoteMailInfo = {rateQuoteMailInfo: value};
    return this.httpC.post(url, rateQuoteMailInfo)
      // .map((res: Response) => {
      //   if (res) {
      //     return res;
      //   } else {
      //   }
      // }).catch(err => {
      //   return Observable.throw(err); // observable needs to be returned or exception raised
      // });
  }

  getChatMessage(id:any) {
    const url = this.apiUrl + '/customersRateQuote/' + id + '/rateQuoteChat?filter[order]=createdOn DESC';
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res) {
    //     return res;
    //   } else {
    //     return res;
    //   }
    // });
  }

  getParticularChat(id:any) {
    const url = this.apiUrl + '/rateQuoteChat?filter[where][quoteNumber]=' + id + '&?filter[order]=createdOn DESC';
    return this.httpC.get(url)
    // .map((res: Response) => {
    //   if (res) {
    //     return res;
    //   } else {
    //     return res;
    //   }
    // });
  }

  setChatMessage(message:any) {
    const url = this.apiUrl + remoteMethodApiUrl.activeRequestChatUrl;
    return this.httpC.post(url, message)
      // .map((res: Response) => {
      //   if (res) {
      //     return res;
      //   } else {
      //   }
      // }).catch(err => {
      //   return Observable.throw(err); // observable needs to be returned or exception raised
      // });
  }

  getAllChatMessage() {
    const url = this.apiUrl + remoteMethodApiUrl.getAllChatsUrl;
    return this.httpC.get(url)
      // .map((res: Response) => {
      //   if (res) {          
      //     return res;
      //   } else {
      //   }
      // }).catch(err => {
      //   return Observable.throw(err); // observable needs to be returned or exception raised
      // });
  }


  setQuoteId(quoteId:any) {
    this.quoteId = quoteId;
  }

  getQuoteId() {
    return this.quoteId;
  }

  updateAmount(object:any) {
   const url = this.apiUrl + remoteMethodApiUrl.activeRequestUpdateAmtUrl;
    return this.httpC.post(url,{amountDetails: object})
    //  .map ((res: Response) =>{
    //   if (res) {
    //     return res;
    //   }else {
    //   }
    // }).catch(error => {
    //     return Observable.throw(error); // observable needs to be returned or exception raised
    //   });
  }
  getAllCustomerName(accessToken:any) {
    const url = this.apiUrl + remoteMethodApiUrl.getAllExternalCustomers + accessToken;
    return this.httpC.get(url);
  }

  getMyBolType(accessToken:any, referenceNumber:any) {
    const url = this.apiUrl + '/billOfLading?access_token=' + accessToken + '&filter[where][bolReferenceNumber]=' + referenceNumber;
    return this.httpC.get(url);
  }

  getMyBolTypeById(accessToken:any, id:any) {
    const url = this.apiUrl + '/billOfLading?access_token=' + accessToken + '&filter[where][id]=' + id;
    return this.httpC.get(url);
  }

   getMyAccount(accesToken:any, object:any){
    const url = this.apiUrl + remoteMethodApiUrl.updatePickupInfoOnCustomerUrl + accesToken ;
    return this.httpC.post(url,{pickupInfo: object})
    //  .map ((res: Response) =>{
    //   if (res) {
    //     return res;
    //   }else {
    //   }
    // }).catch(error => {
    //     return Observable.throw(error); // observable needs to be returned or exception raised
    //   });

   }

   getSalesRepName(accessToken:any,salesRepId:any){
    const url = this.apiUrl + '/AdminUser/?access_token=' + accessToken +'&filter[where][id]=' + salesRepId;
    return this.httpC.get(url);
   }



  saveTemplate(object:any, type:any) {
    let url;

    if (type === 'address' || type === 'shipperAddress' || type === 'thirdparty') {
      url = this.apiUrl + remoteMethodApiUrl.addressTemplateUrl;
    } else {
      url = this.apiUrl + remoteMethodApiUrl.itemTemplateUrl;
    }
    const payLoadData = object;
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
  saveSplInstructionTemplate(object:any){
    let url;
    url = this.apiUrl + remoteMethodApiUrl.specialInstructionTemplateUrl;
    const payLoadData = object;
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

  getSplInstructions(companyId:any, salesRepId:any, type:any) {
    let url:any;
    if (type === 'externalCustomer') {
      url = this.apiUrl + remoteMethodApiUrl.specialInstructionTemplateUrl + '?filter[where][companyId]=' + companyId + '&filter[order]=templateName ASC';
    } else {

    }
    return this.httpC.get(url);
  }

  getSplInstructionsById(id:any) {
    let url;
    url = this.apiUrl + remoteMethodApiUrl.specialInstructionTemplateUrl + '?filter[where][id]=' + id + '&filter[order]=createdOn DESC';
    return this.httpC.get(url);
  }

  getTemplate(companyId:any, type:any) {
    let url;
    if (type === 'address') {
      url = this.apiUrl + remoteMethodApiUrl.addressTemplateUrl + '?filter[where][companyId]=' + companyId + '&filter[order]=templateName ASC';
    } else if (type === 'addressId') {
      url = this.apiUrl + remoteMethodApiUrl.addressTemplateUrl + '?filter[where][id]=' + companyId + '&filter[order]=createdOn DESC';
    } else if (type === 'itemId') {
      url = this.apiUrl + remoteMethodApiUrl.itemTemplateUrl + '?filter[where][id]=' + companyId + '&filter[order]=createdOn DESC';
    }else if (type === 'admin') {
      url = this.apiUrl + remoteMethodApiUrl.addressTemplateUrl + '?filter[order]=templateName ASC';
    } else {
      url = this.apiUrl + remoteMethodApiUrl.itemTemplateUrl + '?filter[where][companyId]=' + companyId + '&filter[order]=templateName ASC';
    } 
    return this.httpC.get(url);
  }
  getTemplateForSalesRep(salesRepId:any, type:any) {
    let url;
    if (type === 'address') {
      url = this.apiUrl + remoteMethodApiUrl.addressTemplateUrl + '?filter[where][salesRepId]=' + salesRepId + '&filter[order]=templateName ASC';
    } else if (type === 'addressId') {
      url = this.apiUrl + remoteMethodApiUrl.addressTemplateUrl + '?filter[where][id]=' + salesRepId + '&filter[order]=createdOn DESC';
    } else if (type === 'itemId') {
      url = this.apiUrl + remoteMethodApiUrl.itemTemplateUrl + '?filter[where][id]=' + salesRepId + '&filter[order]=createdOn DESC';
    } else {
      url = this.apiUrl + remoteMethodApiUrl.itemTemplateUrl + '?filter[where][salesRepId]=' + salesRepId + '&filter[order]=templateName ASC';
    }
    return this.httpC.get(url);
  }

  deleteTemplateDetail(id:any, type:any) {
    let url;
    if (type === 'address') {
      url = this.apiUrl + remoteMethodApiUrl.addressTemplateUrl + '/' + id;
    } else {
      url = this.apiUrl + remoteMethodApiUrl.itemTemplateUrl + '/' + id;
    }
    return this.httpC.delete(url)
    // .map((res: Response) => {
    //   return res;
    // });
  }

  updateTemplateDetail(form:any, type:any) {
    let url;
    if (type === 'address') {
      url = this.apiUrl + remoteMethodApiUrl.addressTemplateUrl;
    } else {
      url = this.apiUrl + remoteMethodApiUrl.itemTemplateUrl;
    }
    const payLoadData = form;
    return this.httpC.put(url, payLoadData)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  setQuoteChat(object:any) {
    const url = this.apiUrl + '/rateQuoteChat';
    const payLoadData = object;
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

  getQuoteChat(type:any) {
    let url;
    url = this.apiUrl + '/rateQuoteChat' + '?filter[where][createdBy]=' + type + '&filter[order]=createdOn DESC' + '&filter[where][read]=false';
    /*if (type === 'address') {

    } else if (type === 'addressId') {
      url = this.apiUrl + remoteMethodApiUrl.addressTemplateUrl + '?filter[where][id]=' + customerId + '&filter[order]=createdOn DESC';
    } else if (type === 'itemId') {
      url = this.apiUrl + remoteMethodApiUrl.itemTemplateUrl + '?filter[where][id]=' + customerId + '&filter[order]=createdOn DESC';
    } else {
      url = this.apiUrl + remoteMethodApiUrl.itemTemplateUrl + '?filter[where][customerId]=' + customerId + '&filter[order]=createdOn DESC';
    }*/
    return this.httpC.get(url);
  }

  getQuoteChatForExternalCustomer(type:any, customerId:any) {
    let url;
    url = this.apiUrl + '/rateQuoteChat?[filter][where][customerId]=' + customerId + '&filter[where][createdBy]=' + type + '&filter[order]=createdOn DESC' + '&filter[where][read]=false';
    return this.httpC.get(url);
  }

  updateQuoteChat(object:any) {

    const url = this.apiUrl + remoteMethodApiUrl.activeRequestUpdateMsgOnChat;
    const payLoadData = {messageInfo: object};
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

  getCustomerQuoteDetails(accessToken:any,companyId:any){
    
    const url = this.apiUrl+'/QuoteDetailsNew?access_token='+accessToken+'&filter[where][companyId]='+companyId+'&filter[where][category]=AR'+'&filter[where][createdBy]=externalCustomer' + '&filter[order]=quoteId DESC';
    return this.httpC.get(url);
  

  }
  getSearchQuoteData(data:any, accessToken:any) {
    const url = this.apiUrl + remoteMethodApiUrl.quoteDetailsSearchUrl+accessToken;
    const payLoadData = {searchDetails: data};
    return this.httpC.post(url, payLoadData)
    // .map((res: Response) => {
    // if (res) {
    // return res;
    // } else {
    // }
    // }).catch(err => {
    // return Observable.throw(err); // observable needs to be returned or exception raised
    // });
    }

    proNumberUpload(array:any) {
      const url = this.apiUrl + remoteMethodApiUrl.uploadReddawayProNumbersUrl;
      const payLoadData = {testData: array};
      return this.httpC.post(url, payLoadData)
      // .map((res: Response) => {
      // if (res) {
      // return res;
      // } else {
      // }
      // }).catch(err => {
      // return Observable.throw(err); // observable needs to be returned or exception raised
      // });
    }


    pdfBase64Upload(base64Data:any, object:any) {
      const url = this.apiUrl + remoteMethodApiUrl.bolPdfMailUrl;
      const data  =  {'pdf': base64Data};
      const payLoadData = {pdfData: data};
      return this.httpC.post(url, payLoadData)
      // .map((res: Response) => {
      // if (res) {
      // return res;
      // } else {
      // }
      // }).catch(err => {
      // return Observable.throw(err); // observable needs to be returned or exception raised
      // });
    }

    setTools(type:any) {
      this.toolsValue = type;
    }

    getTools() {
      return this.toolsValue;
    }

    getTrackDetailsOfBOL(companyId:any, salesRepId:any, accessToken:any, type:any, date:any, viewType:any, specification:any) {
        let url;
        let filter;
        let whereFilter;
        if (type === 'externalCustomer') {
          if (specification === 'previousWeekData') {
           whereFilter ='"where":{"and":[{"companyId":'+ companyId +'},{"access_token":"'+ accessToken +'"},{"createdOn": {"gt":"'+ date +'"}},{"or" : [{"pickupStatus": "pickup", "bolService":true}, {"isPickup": true, "bolService":true}]} ]}';
        } else {
          whereFilter ='"where":{"and":[{"companyId":'+ companyId +'},{"access_token":"'+ accessToken +'"},{"or" : [{"pickupStatus": "pickup", "bolService":true}, {"isPickup": true, "bolService":true}]} ]}';
        }
        const orderby = '"order": "createdOn desc"';
        filter = '?filter={' + whereFilter + ','+ orderby +'}';
        }
      
      return this.httpC.get(this.apiUrl + '/billOfLading' + filter)
      // .map((res: Response)=> {
      //   if (res.status < 200 || res.status >= 300) {
      //   throw new Error('This request has failed ' + res.status);
      //   } else {
      //   return res;
      //   }
      //   });
    }

    changeStatusInactiveInBol(id:any, accessToken:any) {
      const url = this.apiUrl + remoteMethodApiUrl.deleteBolAddShipmentUrl + accessToken;
      let payLoadData = {'shipmentId': {'id': id}};
      return this.httpC.post(url, payLoadData)
      // .map((res:Response) => {
      //   if (res) {
      //     return res;
      //   }
      // }).catch(err => {
      //   return Observable.throw(err);
      // }); 
    }

    saveBolRepsonse(data:any) {
      const url = this.apiUrl + '/billOfLading/'+data.id;
      return this.httpC.put(url, data)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
    }
    uploadPictures(data:any) {
      const url = this.apiUrl + '/container/bolDocuments/upload';
      return this.httpC.post(url, data)
          // .map((res: Response) => {
          //     return res;
          // });
    }
    uploadInvoiceNames(data:any) {
      const url = this.apiUrl + '/billOfLading/uploadInvoice';
      const payLoadData = { invoiceData: data };
      return this.httpC.post(url, payLoadData);
    }
}
