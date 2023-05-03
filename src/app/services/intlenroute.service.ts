import { Injectable } from '@angular/core';
// import { environment } from 'environments/environment';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject  } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { SetAccessTokenLocal } from './localStorage.service';

@Injectable()
export class IntlenrouteService {
  apiUrl = environment.apiUrl;
  markedItemsSubject = new BehaviorSubject<any>(null);
  markedItemsSubjectObservable = this.markedItemsSubject.asObservable();
  socketdataSubject = new BehaviorSubject<any>(null);
  socketdataObservable = this.socketdataSubject.asObservable();
  bolRoutingSubject = new BehaviorSubject<any>(null);
  bolRoutingObservable = this.bolRoutingSubject.asObservable();
  public fetchData = {};
  ftlRoutingSubject = new BehaviorSubject<any>(null);
  ftlRoutingSubjectObservable = this.ftlRoutingSubject.asObservable();

  constructor(private httpClient: HttpClient, private httpC: HttpClient) { }

  getStatusArray(accessToken:any) {
    // let FILTER = '&filter[where][customerId]=' + id;
    return this.httpClient.get(this.apiUrl +'/statusInfo?access_token='+ accessToken);
  }

  getSavedInventoryDetails(id:any, accessToken:any) {
    let url ;
    const includeCondition = '"include":{"relation":"companyDetails","scope":{"fields":["id","companyName"]}}';
    const includeFilter = '"include":{"relation":"warehouseInfo","scope":{'+ includeCondition + '}}';
    const whereFilter = '"where": {"id": ' + id +'}';
    const FILTER = '&filter={' + includeFilter + ',' + whereFilter + '}';
    return this.httpClient.get(this.apiUrl +'/containerInfo?access_token='+ accessToken + FILTER);

    // url = this.
    // url = this.
  }

  setTrafficData(data:any) {
    this.socketdataSubject.next(data);
  }
  getControlNumberAvailablity(data:any, accessToken:any) {
    let url;
    url = this.apiUrl +'/warehouseInfo/findControlNumber?access_token= ' + accessToken;
    let controlNumber = {'controlNumber' : data};
    return this.httpClient.post(url, controlNumber)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }

  getInventorySavedData(data:any, accessToken:any) {
    let url ;
    
    url = this.apiUrl + '/warehouseInfo/search?access_token=' + accessToken;
    const payloadData = {'searchInfo': data};
    return this.httpC.post(url, payloadData)
//     .map ((res: Response) => {
//   if (res.status < 200 || res.status >= 300) {
//     throw new Error('This request has failed ' + res.status);
//   } else {
//     return res;
//   }
// });
  }
  getEnrouteSavedData(data:any, accessToken:any) {
    let url ;
    
    url = this.apiUrl + '/containerInfo/search?access_token=' + accessToken;
    const payloadData = {'searchInfo': data};
    return this.httpC.post(url, payloadData)
//     .map ((res: Response) => {
//   if (res.status < 200 || res.status >= 300) {
//     throw new Error('This request has failed ' + res.status);
//   } else {
//     return res;
//   }
// });
  }

  editmarkForDock(accessToken:any, payloadData:any) {
    const url = this.apiUrl + '/warehouseInfo' + '?access_token=' + accessToken;
    const edit = payloadData;
    return this.httpC.put(url, edit)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }
  saveIntlRouteData(data:any, accessToken:any) {
    let url ;
    url = this.apiUrl + '/containerInfo/createShipment?access_token=' + accessToken;
    let payLoadData = {'containerData': data};
    return this.httpClient.post(url, payLoadData)
    // .map((res: Response) => {
    //   if (res.status < 200 || res.status >= 300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // });
  }

  updateSavedContainerDetails(data:any, accessToken:any) {
    let url ;
    url = this.apiUrl + '/containerInfo/updateContainer?access_token=' + accessToken;
    let payLoadData = {'containerData': data};
    return this.httpClient.post(url, payLoadData)
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
    return this.httpClient.get(this.apiUrl +'/shipmentDetails?access_token='+ accessToken + FILTER);
   }

   getCompanyInvoice(id:any, accessToken:any) {
    let FILTER = '&filter[where][companyId]=' + id;
    return this.httpClient.get(this.apiUrl +'/shipmentDetails?access_token='+ accessToken + FILTER);
  }
  uploadShimentlevelFiles(data:any) {
    const url = this.apiUrl + '/container/shipmentDocuments/upload';
    return this.httpClient.post(url, data)
    // .map((res: Response) => {
    //     return res;
    // });
  }
  setMarkedItems(data:any) {
    this.markedItemsSubject.next(data);
  }
  fetchByValue (customerInventoryStatusForm:any,companyId:any) {
    const url = this.apiUrl + '/warehouseInfo/search'
     this.fetchData = { "companyId" : companyId,  "controlNumber" : customerInventoryStatusForm.controlNo,
                        "description" : customerInventoryStatusForm.description, "estimatedTimeArrival" : customerInventoryStatusForm.eta,
                        "isbn" : customerInventoryStatusForm.isbn, "status" : customerInventoryStatusForm.status,
                        "type" : customerInventoryStatusForm.shipmentType, "poNumber" : customerInventoryStatusForm.po,
                        "dii" : customerInventoryStatusForm.daysInInventory
                      };
     const payloadData = {'searchInfo': this.fetchData};
     return this.httpC.post(url, payloadData)
    //      .map ((res: Response) => {
    //    if (res.status < 200 || res.status >= 300) {
    //      throw new Error('This request has failed ' + res.status);
    //    } else {
    //      return res;
    //    }
    //  });
   }
   getWarehouseAddress(accessToken:any) {
    return this.httpClient.get(this.apiUrl +'/warehouse?access_token='+ accessToken);
  }
   createShipment(data:any) {
    const url = this.apiUrl + '/shipmentInfo/createShipment';
    let payLoadData;
    payLoadData = { shipmentData: data };
    return this.httpC.post(url, payLoadData)
      // .map((res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('This request has failed ' + res.status);
      //   } else {
      //     return res;
      //   }
      // });
  }

  setBOLRoutingData(data:any) {
   this.bolRoutingSubject.next(data);
  }

  setFtlRoutingData(data:any) {
    this.ftlRoutingSubject.next(data);
  }


  editControlNoItems(accessToken:any, payloadData:any) {
    const url = this.apiUrl + '/warehouseInfo' + '?access_token=' + accessToken;
    const edit = payloadData;
    return this.httpC.put(url, edit)
    // .map((res:Response) => {
    //   if(res.status < 200 || res.status >300) {
    //     throw new Error('This request has failed ' + res.status);
    //   } else {
    //     return res;
    //   }
    // })
  }
}
