import { Component, OnInit, OnDestroy } from '@angular/core';
import { PricingInfoService } from '../services/pricing-info.service';
import { InternalScreeningService } from '../services/internal-screening.service';
import { ExternalService } from '../services/external.service';
import { LoggerService } from '../services/logger.service';
import { InvoiceService } from '../services/invoice.service';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';
declare let $: any;
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public showSetMasterData = false;
  public showForExternalCustomer = false;
  public salesRep:any;
  public salesRepValues:any;
  public salesRepId:any;
  alerts:any = []
  public salesRepType:any;
  public customerType:any;
  public accessToken:any;
  public notifications:any;
  public customerMessage:any = [];
  public message: any;
  public messageResponse: any;
  public customerId = '';
  public clickIdData: any;
  public initialMessage: any;
  searchForm: FormGroup = new FormGroup({});
  activeRequest: FormGroup = new FormGroup({});
  chatForm: FormGroup = new FormGroup({});
  chatHistoryForm: FormGroup = new FormGroup({});
  amountUpdate: FormGroup = new FormGroup({});
  quickieFormUpdate: FormGroup= new FormGroup({});
  bookedStatusUpdateForm: FormGroup = new FormGroup({});
  public fullQuote = false;
  public quikeQuote = false;
  public showShipperInformation = false;
  public showConsigneeInformation = false;
  public nonVolumeType = false;
  public volumeType = false;
  public showChat = false;
  public upDateSuccess = false;
  public forTruck = false;
  public forVolume = false;
  public forAir = false;
  public forOcean = false;
  public forOther = false;
  public showMinChat = false;
  public showAllChat = false;
  public quoteId:any;
  public formValue:any;
  public deliveryDate:any;
  public shipmentDate:any;
  public tableValues = false;
  public acceptCustomerFlag = false;
  public showAdminChatData = false;
  public externalTeam = false;
  public operationTeam = false;
  public showSideMenu = false;
  public showForCustomer = false;
  public externalCustomer:any;
  public shipperPhoneNumber:any;
  public consigneePhoneNumber:any;
  public externalCustomerParseData:any;
  public acceptData:any;
  public pattern = /^[a-zA-Z!@#$%^&*()_+\-=\[\]{};':'\\|,<>\/?]*$/;
  public updateAmount = {};
  public showForOperationTeam = false;
  public showForOperationTeamBooked = false;
  public showFillInformation = false;
  public bookedCustomerFlag = false;
  public showMessageForDatePicker = false;
  public dateValidation = false;
  public showNotifications = false;
  public showMailSentPopUp = false;
  public showErrorMessage = false;
  public showEmailId = false;
  public setMsgForControlNumber = false;
  public showError:any;
  public displayName:any;
  public emailRequest:any;
  public quoteIdUpdate:any;
  public sendEmailForId:any;
  public lineItem:any = [];
  public hazmat:any;
  public rate:any;
  public quoteNumber:any;
  public weightTotal = 0;
  public piecesTotal = 0;
  public interval:any;
  public logger:any;
  public reason:any;
  public billOfLadingValues = {};
  public customerInformationForChat: any;
  public nonVolMinDate:any = new Date();
  public nonVolMinDate2:any = new Date();
  public volMinDate:any = new Date();
  public volMinDate2:any = new Date();
  public showCancelOrder = false;
  public amountUpdateAfterBook = false;
  public salomonReferenceNumber:any;
  public shipperTemplatesPresent = false;
  public consigneeTemplatesPresent = false;
  public templateId:any;
  public addressTemplateAutoFill: any;
  public addressTemplate: any;
  public shipperTemplate1:any = [];
  public shipperTemplate:any = [];
    public consigneeTemplate1:any = [];
    public consigneeTemplate = [];
public addressTemplatesPresent = false;
public showforBooked = false;
    public openType: any;
    public showManageProNumbers = false;
    showApprovalNotifications = false;
    // private unsubscribe: BehaviorSubject<void>;
  itemArray:any = [];
  companyDetails: any;
  constructor(private pricingInfoService: PricingInfoService, private fb: FormBuilder,
              private router: Router, private externalService: ExternalService,
              private loggerService: LoggerService,
              private internalService: InternalScreeningService,
              private invoiceService: InvoiceService
              ) { }

  ngOnInit() {
    this.localStorage();
    this.getSalesRepDetails();
    this.interval = window.setInterval(() => {
      console.log('interval');
      this.callNotifications();
    }, 20000);
    this.callNotifications();
    this.buildForm();
    this.buildActiveRequestForm();

  }
  getSalesRepDetails() {
    this.customerType = localStorage.getItem(('customerType'));
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.salesRepValues = JSON.parse(this.salesRep);
    console.log('this.salesRepValues', this.salesRepValues);
    console.log('this.salesRepValues', this.salesRepValues.type);
    this.salesRepId = this.salesRepValues.id;
    this.salesRepType = this.salesRepValues.type;
    console.log('this.salesRepId', this.salesRepId);
    console.log('this.customerType', this.customerType);
    console.log('this.salesRepValues.salesRepName', this.salesRepValues.salesRepName);
    if (this.customerType === 'admin') {
    if(this.salesRepValues.salesRepName.length > 7) {
      let sales = this.salesRepValues.salesRepName.split(' ');
      console.log('sales', sales);
      this.salesRepValues.salesRepresentative = sales[0];
      
    } else {
      this.salesRepValues.salesRepresentative = this.salesRepValues.salesRepName;
    }
  } else {
    if(this.salesRepValues.customerName.length > 7) {
      let sales = this.salesRepValues.customerName.split(' ');
      console.log('sales', sales);
      this.salesRepValues.salesRepresentative = sales[0];
      
    } else {
      this.salesRepValues.salesRepresentative = this.salesRepValues.customerName;
    }
  }
    if (this.salesRepValues.type === 'administrator') {
      this.showForExternalCustomer = false;
      this.showSetMasterData = true;
      this.showManageProNumbers = true;
      this.salesRepValues.salesRepName = this.salesRepValues.salesRepName;
    } else if (this.salesRepValues.type === undefined || this.customerType === 'externalCustomer') {
     // this.salesRepValues.salesRepName = this.salesRepValues.customerName;
      this.showForExternalCustomer = true;
      this.showManageProNumbers = false;
    } else {
      this.showForExternalCustomer = false;
      this.showSetMasterData = false;
      this.showManageProNumbers = false;
    }
  }
  logout() {
    this.pricingInfoService.setBillOfLadingValues(this.billOfLadingValues);
    this.billOfLadingValues = this.pricingInfoService.getBillOfLadingValues();
    console.log('Destroyed BOL Summary Val', this.billOfLadingValues);
    this.accessToken = localStorage.getItem('accessToken');
    this.pricingInfoService.callsLogout(this.accessToken);
    localStorage.removeItem('SalesRepName');
    localStorage.removeItem('accesstoken');
    this.router.navigate(['/internalsalesreplogin']);
  }

  routing() {
    $(document).ready(function(){
      $('#customerActive').on('click', function(){
        $("#customerSummary").toggleClass('active');
      });
    });
    this.customerId = '';
    let currentPage = '';
    this.pricingInfoService.setCustomerId(this.customerId);
    this.pricingInfoService.setCurrentPageFlag(currentPage);
    this.pricingInfoService.addCustomersFlag('addingNew');
    this.router.navigate(['/companySummary']);
  }
  dashboardRouting() {
    let createBol = {};
    this.pricingInfoService.setBillOfLadingValues(createBol);
    this.router.navigate(['/dashboard']);
    
  }
  getCustomerInformation(id:any) {
  this.pricingInfoService.getSpecificCustomer(id, this.accessToken).subscribe(data=>{
  return this.customerInformationForChat = data;
});
}
  callNotifications() {
    let type;
    let numberOfNotifications = [];
	let notificationLength:any;
    this.showNotifications = false;
    if (this.customerType === 'admin') {
      type = 'externalCustomer';
      this.externalService.getQuoteChat(type).subscribe(response => {
        this.initialMessage = response;

        if (this.initialMessage.length > 0) {
          this.showNotifications = true;
          this.message = this.removeDuplicates(this.initialMessage, 'quoteNumber');

          this.initialMessage.totalNotifications = this.initialMessage.length;
          for (let i = 0; i < this.message.length; i++) {
            this.message[i].createdOn = this.message[i].createdOn.replace('Z', '');


              let quoteNumber = this.message[i].quoteNumber;

              numberOfNotifications = this.initialMessage.filter(function(el:any){
                return el.quoteNumber === quoteNumber;
              });

              if (numberOfNotifications.length > 0) {
                notificationLength = numberOfNotifications.length;

              } else {
                notificationLength = 1;
              }

              this.message[i].displayMessage = 'You got ' + notificationLength + ' messages from External Customer';

          }
        } else {

          this.initialMessage = [];
          this.showNotifications = false;
        }
        console.log(this.salesRep);
        if (this.salesRepValues.type === 'administrator') {
        let datatype = 'requested';
        this.invoiceService.getApprovalrequest(datatype).subscribe((res: any) => {
          console.log('approval', res);
          // notificationLength = notificationLength + res.length;

          if (res.length > 0) {
                        console.log('length', this.initialMessage)

            if ( notificationLength !== undefined) {
              if (this.initialMessage.length > 0) {
            this.initialMessage.totalNotifications = notificationLength + res.length;
              } else {
                this.initialMessage = res;
                this.initialMessage.totalNotifications = notificationLength + res.length;
              }
            } else {
               if (this.initialMessage.length > 0) {
                          this.initialMessage.totalNotifications =  res.length;
               } else {
                this.initialMessage = res;
                this.initialMessage.totalNotifications =  res.length;

              }
            }

            this.showApprovalNotifications = true;
            console.log('length', this.initialMessage)
                      console.log('length', this.initialMessage.length, this.showApprovalNotifications);

          this.alerts = [];
          res.forEach((ele:any) => {
            console.log(ele)
            // ele.AdminUser.salesRepName +
            let displayMessage =  ele.AdminUser.salesRepName +' has submitted workbook for your approval '  ;
            let createddate = ele.created.replace('Z', '');
         this.alerts.push ({'message': displayMessage, 'analyticsCode': ele.analyticsCode.code,'createdOn': createddate, 'value': ele })
          });
                      console.log(this.alerts)

          } else {
                        this.showApprovalNotifications = false;
          }
        })
      } else {
        this.showApprovalNotifications = false;
        this.alerts = [];
      }
      });
    } else {
      type = 'admin';
      this.externalService.getQuoteChatForExternalCustomer(type, this.customerId).subscribe(response => {
        this.initialMessage = response;

        if (this.initialMessage.length > 0) {
          this.showNotifications = true;
          this.message = this.removeDuplicates(this.initialMessage, 'quoteNumber');

          this.initialMessage.totalNotifications = this.initialMessage.length;
          for (let i = 0; i < this.message.length; i++) {
            this.message[i].createdOn = this.message[i].createdOn.replace('Z', '');

              let quoteNumber = this.message[i].quoteNumber;
              numberOfNotifications = this.initialMessage.filter(function(el:any){
                return el.quoteNumber === quoteNumber;
              });

              if (numberOfNotifications.length > 0) {
                notificationLength = numberOfNotifications.length;

              } else {
                notificationLength = 1;
              }


              this.message[i].displayMessage = 'You got ' + notificationLength + ' messages from Admin';

          }
        } else {
          this.showNotifications = false;

          this.initialMessage = [];
        }
      });
    }
    console.log('callNotifications');


  }

  movetoAnalytics(alertValue:any) {
    console.log(alertValue);
    let iterationArray:any;
    let companyInfo:any;
    this.invoiceService.getCompanyDetailsnew(this.salesRepValues.id, this.accessToken).subscribe((response: any) => {
      console.log(response);
      this.companyDetails = response;
      this.companyDetails.forEach((obj:any) => {
        if (obj.id === alertValue.value.companyId) {
          obj.salesRepName = obj.salesRepId;
          obj.salesRepId = this.salesRepValues.id;
          obj.createdBy = this.salesRepValues.id;
          obj.companyName = obj.companyName.toUpperCase();
        console.log('this. setobject', obj);
        companyInfo = obj;
        this.invoiceService.setCompanyInformation1(obj);
        }
      })
      // this.companyDetails.sort(this.dynamicSort('companyName'));
      // if (this.companyDetails.length > 0) {
      //   for (let c = 0; c < this.companyDetails.length; c++) {
      //     this.companyNames.push(this.companyDetails[c].companyName);
      //   }
      // }
    });
    this.invoiceService.getSelectedCodeInvoice(alertValue.value.analyticsId).subscribe((res)=> {
      console.log(res);
      iterationArray = res;
      let newArrayData:any = [];
      iterationArray.forEach((element:any) => {
        let object = element.companyInvoice;
        object.selected = element.selected;
        object.forteResponse = element.forteResponse;
        object.rules = element.rules;
        object.forteCarrier = element.carrier
        newArrayData.push(object);
console.log(object);
      });
console.log(newArrayData);
      this.itemArray = newArrayData;
      for (let i = 0;i < this.itemArray.length; i++) {
        this.itemArray[i].slNo = i + 1;
      }
     console.log(this.itemArray);
     if (this.itemArray.length > 0) {
      let passing = {
        filterValue: alertValue.value.analyticsCode.code,
        carrierValue: this.itemArray[0].forteCarrier,
        analyticsId: alertValue.value.analyticsId,
        notes: alertValue.value.analyticsCode.notes
      };
      this.invoiceService.setAnalyticsCode(passing);
      // let carrier = this.selectedAnalyticsCodeData.split('_');
      let passingObject ={
        carrier: this.itemArray[0].forteCarrier,
        values: this.itemArray,
        invalidData : [],
        notes: alertValue.value.analyticsCode.notes
      }
      this.invoiceService.setTrafficDataEnable(passingObject);
      this.invoiceService.setTrafficData(passingObject);
      let object = '';
      this.invoiceService.setSocketData(object);
      let apiObject =  {
        "salesRepId": alertValue.value.salesRepId,
        "companyId": alertValue.value.companyId,
        "analyticsId": alertValue.value.analyticsId,
        "id": alertValue.value.id,
        "status": "approved"
      }

      this.invoiceService.setnotificationValue(apiObject);

      this.invoiceService.approvalWorkbookRequestById(apiObject).subscribe((res:any) => {
        console.log(res);
          console.log('approval', res);
        });
        if (companyInfo !==undefined) {
      this.router.navigate(['/carrierAnalytics']); 
        }
     }
    });
  
   }

  popUpShowAllChat(identifier:any) {
    if (identifier === 'allchat') {
      this.showMinChat = true;
      this.showAllChat = false;
      this.quoteId = this.externalService.getQuoteId();
      this.getChatById(this.quoteNumber, this.quoteId, 'allchat');
    } else if (identifier === 'quotechat') {
      this.showAllChat = true;
      this.showMinChat = false;
      this.quoteId = this.externalService.getQuoteId();
      this.getChatById(this.quoteNumber, this.quoteId, 'quotechat');
    }
  }

  selectedCarrier(value:any) {
    console.log('type', value);
    if (value === true) {
      this.showEmailId = true;

    } else {
      this.showEmailId = false;
//this.showSubjectNotes = true;
    }

  }

  sendChatMessage(form:any, identifier:any) {
    let object;
    let currentDate1 = new Date().toLocaleString('en-US', {timeZone: 'America/Los_Angeles'});
    console.log('currentDate1', currentDate1);
    if (this.customerType === 'admin') {
      object =
        {    customerRateQuoteId: this.clickIdData.id,
          customerId: this.clickIdData.customerId,
          quoteNumber: this.clickIdData.quoteReferenceNumber,
          message: form.message,
          read: false,
          createdBy: this.customerType,
          createdOn: currentDate1,
          id: 0
        };
    } else {
      object =
        {    customerRateQuoteId: this.clickIdData.id,
          customerId: this.customerId,
          quoteNumber: this.clickIdData.quoteReferenceNumber,
          message: form.message,
          read: false,
          createdBy: this.customerType,
          createdOn: currentDate1,
          id: 0
        };
    }
    console.log('object', object);
    this.externalService.setQuoteChat(object).subscribe((data:any)=> {
      console.log('data', data);
      this.getChatById(this.quoteNumber, this.quoteId, identifier);
    });
    this.chatForm.patchValue({
      message: ''
    });
    this.showChat = false;
  }

  onValueChange(date:any, type:any) {
    console.log('date', date);
    if (type === 'shipment') {
      this.shipmentDate = date;
    } else {
      this.deliveryDate = date;
      if (this.deliveryDate !== null) {
        if (this.deliveryDate < this.shipmentDate) {
          this.showMessageForDatePicker = true;
        } else {
          this.showMessageForDatePicker = false;
        }
      }
    }
  }

  searchId(chat:any, quoteReferenceNumber:any) {
    console.log('chat', chat);
    this.showAllChat = true;
    this.showMinChat = false;
    this.amountUpdate.reset();
    this.showMessageForDatePicker = false;
    this.amountUpdateAfterBook = false;
    this.dateValidation = true;
    this.forOcean = false;
    this.forOther = false;
    this.forAir = false;
    this.forVolume = false;
    this.forTruck = false;
    this.fullQuote = false;
    this.showforBooked = false;
    this.quikeQuote = false;
    this.bookedCustomerFlag = false;
    this.acceptCustomerFlag = false;
    this.showFillInformation = false;
    this.showForOperationTeam = false;
    this.upDateSuccess = false;
    this.nonVolumeType = false;
    this.volumeType = false;
    this.showForOperationTeamBooked = false;
    this.showConsigneeInformation = false;
    this.showShipperInformation = false;
    console.log('working');
    this.quoteIdUpdate = '';
    this.rate = '';
    this.weightTotal = 0;
    this.piecesTotal = 0;
    console.log(quoteReferenceNumber, chat);
    this.quoteNumber = quoteReferenceNumber;
    this.quoteId = chat.id;
    // this.externalService.getMessage(quoteReferenceNumber).subscribe(data => {
    // this.note = data;
    // this.note = this.note[0].customerMessage;
    // console.log('customerNote', this.note);
    // });
    this.externalService.getClickVal(quoteReferenceNumber).subscribe((data:any) => {
      this.tableValues = true;
      this.clickIdData = data[0];
      let object;
      if (this.customerType === 'admin') {
        object = {
          "quoteId" : chat.customerRateQuoteId,
          "createdBy" : "externalCustomer"
        }
      } else {
        object = {
          "quoteId": chat.customerRateQuoteId,
          "createdBy": "admin"
        }
      }
      console.log('this.clickIdData', this.clickIdData);
        this.externalService.updateQuoteChat(object).subscribe((response:any)=>{
          console.log('resposnedjdfhjbfdjfdfd', response);
        });
      this.logger = { 'method': 'getClickVal', 'message': 'Retrieving data for single quote', type: this.customerType, Quote: quoteReferenceNumber };
      this.loggerService.info(this.logger);
      console.log('amount', this.clickIdData);
      console.log('completeData', data);
      if (this.clickIdData.salomonReferenceNumber === null) {
        this.clickIdData.salomonReferenceNumber = 'Not Assigned';
        console.log('Not Assigned', this.clickIdData.salomonReferenceNumber);
      }
      this.clickIdData.createdOn = this.clickIdData.createdOn.replace('Z', '');
      if (this.clickIdData.status === 'Rate Quote' && this.customerType === 'externalCustomer') {
        this.acceptCustomerFlag = true;
        if (this.clickIdData.quoteType === 'Quickie quote') {
          this.showFillInformation = true;
        } else {
          this.showFillInformation = false;
        }
        this.bookedCustomerFlag = false;
      }
      else if ((this.clickIdData.status === 'Accepted' || this.clickIdData.status === 'Booked') && this.customerType === 'externalCustomer') {
        this.amountUpdateAfterBook = true;
        this.bookedCustomerFlag = true;
        this.acceptCustomerFlag = false;
        this.showConsigneeInformation = true;
        this.showShipperInformation = true;
        this.upDateSuccess = true;
      } else if (this.clickIdData.status === 'Booked') {
        this.bookedCustomerFlag = true;
        this.acceptCustomerFlag = false;
        this.showConsigneeInformation = true;
        this.showShipperInformation = true;
        this.upDateSuccess = true;
        this.amountUpdateAfterBook = true;
        this.showforBooked = true;
      }
      if (this.clickIdData.status === 'Cancelled') {
        this.showCancelOrder = true;
      } else {
        this.showCancelOrder = false;
      }
      if (this.clickIdData.status === 'Rate Request') {
        // (this.clickIdData.amount !== '' && this.clickIdData.amount !== null && this.clickIdData.salomonReferenceNumber !== '' && this.clickIdData.salomonReferenceNumber !== null){
        if (this.customerType === 'admin') {
          console.log('whats')
          this.showForOperationTeam = true;
          this.upDateSuccess = false;
        } else {
          this.upDateSuccess = false;
          this.showForOperationTeam = false;
        }
        //this.upDateSuccess = true;
        //this.showForOperationTeam = false;
      } else if (this.clickIdData.status === 'Accepted') {
        if (this.customerType === 'admin') {
          console.log('whats');
          console.log('what,s', this.clickIdData);

          this.showForOperationTeamBooked = true;
          this.upDateSuccess = true;
          this.showConsigneeInformation = true;
          this.showShipperInformation = true;
          if (this.clickIdData.shipmentReadyDate !== null) {
            let date = this.clickIdData.shipmentReadyDate.replace('Z', '');
            this.clickIdData.shipmentReadyDate =  new Date(date);
          } else {

          }
          if (this.clickIdData.requestedDeliveryDate !== null) {
            let deliveryDate = this.clickIdData.requestedDeliveryDate.replace('Z', '');
            this.clickIdData.requestedDeliveryDate = new Date(deliveryDate);
          }
          this.bookedStatusUpdateForm.patchValue({
            shipmentReadyDate: this.clickIdData.shipmentReadyDate,
            requestedDeliveryDate: this.clickIdData.requestedDeliveryDate,
            amount: this.clickIdData.amount
          });
        } else {
          this.upDateSuccess = true;
          this.showForOperationTeamBooked = false;
        }
      } else {
        if (this.customerType === 'admin') {
          this.showForOperationTeam = false;
          this.upDateSuccess = true;
        } else {
          this.upDateSuccess = true;
          this.showForOperationTeam = false;
        }
        //this.showForOperationTeam = true;
        //this.upDateSuccess = false;
      }
      if (this.clickIdData.quoteType === 'Quickie quote') {
        this.quikeQuote = true;
        this.nonVolumeType = true;
        this.volumeType = false;
      } else {
        this.fullQuote = true;
        this.volumeType = true;
        this.nonVolumeType = false;
      }
      if (this.clickIdData.transportationType === 'truckload') {
        this.forTruck = true;
        this.forOther = true;
        this.forVolume = false;
        this.forAir = false;
        this.forOcean = false;
      } else if (this.clickIdData.transportationType === 'volume') {
        this.forVolume = true;
        this.forOther = true;
        this.forTruck = false;
        this.forAir = false;
        this.forOcean = false;
      } else if (this.clickIdData.transportationType === 'air') {
        this.forAir = true;
        this.forOther = true;
        this.forVolume = false;
        this.forTruck = false;
        this.forOcean = false;
      } else if (this.clickIdData.transportationType === 'ocean') {
        this.forOcean = true;
        this.forOther = false;
        this.forAir = false;
        this.forVolume = false;
        this.forTruck = false;
      }
      this.lineItem = JSON.parse(this.clickIdData.lineItem);
      console.log('lineVal', this.clickIdData.lineItem);
      for (let n = 0; n < this.lineItem.length; n++) {
        if (this.lineItem[n].hazMat === true) {
          this.hazmat = 'Required';
        } else {
          this.hazmat = 'Not Required';
        }
        this.weightTotal += Number(this.lineItem[n].Weight.Value);
        console.log('Weight', Number(this.lineItem[n].Weight.Value));
        console.log('weightTotal', this.weightTotal);
        this.piecesTotal += Number(this.lineItem[n].Pieces);
        console.log('piecesTotal', this.piecesTotal);
      }
    }, (err:any) => {
      this.logger = { 'method': 'getClickVal', 'message': 'Error in retrieving  the data for quote', type: this.customerType, quote: quoteReferenceNumber };
      this.loggerService.info(this.logger);
    });
  }

  getDataForParticularChat(chat:any, quoteNumber:any) {
	  console.log('chat', chat);
    this.externalService.getClickVal(quoteNumber).subscribe((data:any) => {
     /* this.tableValues = true;*/
      this.clickIdData = data[0];
      this.getChatById(this.quoteNumber, this.clickIdData.id, 'type');
      this.logger = {'method': 'getClickVal', 'message': 'Retrieving data for single quote', type: this.customerType, Quote: quoteNumber};
      this.loggerService.info(this.logger);
      console.log('amount', this.clickIdData);
      console.log('completeData', data);
      if (this.clickIdData.salomonReferenceNumber === null) {
        this.clickIdData.salomonReferenceNumber = 'Not Assigned';
        console.log('Not Assigned', this.clickIdData.salomonReferenceNumber);
      }
      if (this.clickIdData.quoteType === 'Quickie quote') {
        this.fullQuote = false;
        this.quikeQuote = true;
        this.nonVolumeType = true;
        if (this.clickIdData.status === 'Accepted') {
          this.showConsigneeInformation = true;
          this.showShipperInformation = true;
        } else {
          this.showConsigneeInformation = false;
          this.showShipperInformation = true;
        }
      } else {
        this.fullQuote = true;
        this.quikeQuote = false;
        this.volumeType = true;
      }
    });
  }
  declineQuote(id:any) {

  }
  buildForm() {
    this.searchForm = this.fb.group({
      quoteReferenceNumber: ['', [Validators.required]],
      shipperZip: ['', [Validators.required]],
      consigneeZip: ['', [Validators.required]],
      shipperCompanyName: ['', [Validators.required]],
      consigneeCompany: ['', [Validators.required]],
      status: ['', [Validators.required]],
      transportationType: ['', [Validators.required]],
      quoteType: ['', [Validators.required]],
      shipmentType: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      salesRepId: ['', [Validators.required]],
      controlNumber: ['', [Validators.required]]
    });
    this.activeRequest = this.fb.group({
      fedex: [false],
      yrc: [false],
      reddaway: [false],
      othersCarrier: [false],
      others: [''],
      //subject: [''],
      notes: [''],
    });
    this.amountUpdate = this.fb.group({
      volumeAmount: ['', [Validators.required]],
     volumeRefNum: ['', [Validators.required]],
      volumeReadyDate: ['', [Validators.required]],
      volumeDeliveryDate: ['', [Validators.required]],
      nonVolumeAmount: ['', [Validators.required]],
      nonVolumeRefNum: ['', [Validators.required]],
      nonVolumeReadyDate: ['', [Validators.required]],
      nonVolumeDeliveryDate: ['', [Validators.required]],
    });

    this.chatForm = this.fb.group({
      message: ['', [Validators.required]]
    });
    this.chatHistoryForm = this.fb.group({
      message: ['', [Validators.required]]
    });
    this.quickieFormUpdate = this.fb.group({
      shipperCompanyName: ['', [Validators.required]],
      shipperContactName: ['', [Validators.required]],
      shipperPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      shipperStreet1: ['', [Validators.required]],
      shipperStreet2: [''],
      shipperCountry: ['USA', Validators.required],
      consigneeCompany: ['', Validators.required],
      consigneeContactName: [''],
      consigneePhone: ['', Validators.required],
      consigneeStreet1: ['', Validators.required],
      consigneeStreet2: [''],
      consigneeCountry: ['USA', Validators.required],
    });
    this.bookedStatusUpdateForm = this.fb.group({
      shipmentReadyDate: ['', Validators.required],
      requestedDeliveryDate: ['', Validators.required],
      amount: ['', Validators.required],
      controlNumber: ['']
    });
  }

  buildActiveRequestForm() {
    this.activeRequest = this.fb.group({
      fedex: [false],
      yrc: [false],
      reddaway: [false],
      othersCarrier: [false],
      others: [''],
//subject: [''],
      notes: [''],
    });
  }


  getChatById(quoteNumber:any, id:any, identifier:any) {
    console.log('id', id);
   // this.quoteId = id;
    this.customerMessage = [];
    let customerDetails: any;
   // this.operationalTeamMessage = [];
   // this.externalService.setQuoteId(this.quoteId);
    this.externalService.getParticularChat(quoteNumber).subscribe((response:any) => {
      this.messageResponse = response;
      this.logger = {'method': 'getChatMessage', 'message': 'Retrieving chat by Id', type: this.customerType, customerId: id};
      this.loggerService.info(this.logger);
      console.log('this.message', this.messageResponse);
      if (identifier === 'allchat') {
        if (this.messageResponse.length > 0) {
          for (let t = 0; t < this.messageResponse.length; t++) {
            this.messageResponse[t].createdOn = this.messageResponse[t].createdOn.replace('Z', '');
            let customerId = this.messageResponse[t].customerId;
            this.internalService.getSalesRepName(customerId, this.accessToken, 'externalCustomer').subscribe(data=>{
              this.customerInformationForChat = data;
              if (this.customerInformationForChat !== undefined) {
                if (this.customerInformationForChat.length > 0) {
                  customerDetails = this.customerInformationForChat;
                } else {
                  customerDetails.push({customerName: '', companyName: ''});
                }
              } else {
                customerDetails.push({customerName: '', companyName: ''});
              }
              if (this.messageResponse[t].createdBy === 'externalCustomer') {
                let currentDate = new Date();
                let newDate = currentDate.toJSON();
                console.log('currentDate', currentDate, 'newDate ', newDate);
                let date = this.messageResponse[t].createdOn;
                console.log('date', date);
                // let oldDate = new Date(date);
                // console.log('oldDate', oldDate);
                let date12 = date - Number(newDate);
                console.log('date', date12);
                let data = {
                  customerMessage: this.messageResponse[t].message,
                  createdOn: this.messageResponse[t].createdOn,
                  postedBy: customerDetails[0].customerName,
                  companyName: customerDetails[0].companyName,
                  id: this.messageResponse[t].id,
                  image: false
                };
                this.customerMessage.push(data);
                console.log('this.customerMessage', this.customerMessage);
              }
              if (this.messageResponse[t].createdBy === 'admin') {
                let data = {
                  customerMessage: this.messageResponse[t].message,
                  createdOn: this.messageResponse[t].createdOn,
                  postedBy: 'Forte Logistics',
                  id: this.messageResponse[t].id,
                  image: true
                };
                this.customerMessage.push(data);
                // console.log('this.operationalTeamMessage', this.operationalTeamMessage);
              }
              console.log('this.customerMessage1', this.customerMessage);
              if (this.customerMessage.length > 0) {
                this.customerMessage.sort((a:any, b:any) => b.id - a.id);
                console.log('this.customerMessage1 sort', this.customerMessage);
              }
            });
            console.log('this.customerInformationForChat', this.customerInformationForChat);

            console.log('this.customerDetails', customerDetails);

          }

        }
      } else if (identifier === 'quotechat') {
        if (this.messageResponse.length > 3) {
          if (this.messageResponse.length > 0) {
            for (let t = 0; t < this.messageResponse.length; t++) {
              let customerId = this.messageResponse[t].customerId;
              this.internalService.getSalesRepName(customerId, this.accessToken, 'externalCustomer').subscribe(data=>{
                this.customerInformationForChat = data;
                if (this.customerInformationForChat!== undefined) {
                  if (this.customerInformationForChat.length > 0) {
                    customerDetails = this.customerInformationForChat;
                  } else {
                    customerDetails.push({customerName: '', companyName: ''});
                  }
                } else {
                  customerDetails.push({customerName: '', companyName: ''});
                }

              });
              console.log('this.customerInformationForChat', this.customerInformationForChat);

              console.log('this.customerDetails', customerDetails);

              this.messageResponse[t].createdOn = this.messageResponse[t].createdOn.replace('Z', '');
            }
            let i = this.messageResponse.length;
            console.log('before message length i', i);
            i = i - 1;
            let r = i - 2;
            console.log('message length i', i);
            console.log('message length r', r);
            for (i - 1; r <= i; i--) {
              let customerId = this.messageResponse[i].customerId;
              this.internalService.getSalesRepName(customerId, this.accessToken, 'externalCustomer').subscribe(data=>{
                this.customerInformationForChat = data;
                if (this.customerInformationForChat!== undefined) {
                  if (this.customerInformationForChat.length > 0) {
                    customerDetails = this.customerInformationForChat;
                  } else {
                    customerDetails.push({customerName: '', companyName: ''});
                  }
                } else {
                  customerDetails.push({customerName: '', companyName: ''});
                }

                console.log('this.customerInformationForChat', this.customerInformationForChat);
              });
              console.log('this.customerInformationForChat', this.customerInformationForChat);


              if (this.messageResponse[i].createdBy === 'externalCustomer') {
                let currentDate = new Date();
                let newDate = currentDate.toJSON();
                console.log('currentDate', currentDate, 'newDate ', newDate);
                let date = this.messageResponse[i].createdOn;
                console.log('date', date);
                // let oldDate = new Date(date);
                // console.log('oldDate', oldDate);
                let date12 = date - Number(newDate);
                console.log('date', date12);
                let data = {
                  customerMessage: this.messageResponse[i].message,
                  createdOn: this.messageResponse[i].createdOn,
                  postedBy: customerDetails[0].customerName,
                  companyName: customerDetails[0].companyName,
                  id: this.messageResponse[i].id,
                  image: false
                };
                this.customerMessage.push(data);
                console.log('this.customerMessage', this.customerMessage);
              }
              if (this.messageResponse[i].createdBy === 'admin') {
                let data = {
                  customerMessage: this.messageResponse[i].message,
                  createdOn: this.messageResponse[i].createdOn,
                  postedBy: 'Forte Logistics',
                  id: this.messageResponse[i].id,
                  image: true
                };
                this.customerMessage.push(data);
                // console.log('this.operationalTeamMessage', this.operationalTeamMessage);
              }
            }
            console.log('this.customerMessage2', this.customerMessage);
            this.customerMessage.sort((a:any, b:any) => b.id - a.id);
            console.log('this.customerMessage2 sort', this.customerMessage);
          }
        } else {
          this.viewAll();
        }
      }
      this.showChat = true;
      this.callNotifications();
    });

  }

  viewAll() {
    this.quoteId = this.externalService.getQuoteId();
    this.getChatById(this.quoteNumber, this.quoteId, 'allchat');
  }

  updateRate(formValue:any, quoteId:any, type:any) {
    this.formValue = formValue;
    if (formValue.nonVolumeReadyDate === null) {
      formValue.nonVolumeReadyDate = '';
    }
    if (formValue.nonVolumeDeliveryDate === null) {
      formValue.nonVolumeDeliveryDate = '';
    }
    if (formValue.volumeReadyDate === null) {
      formValue.volumeReadyDate = '';
    }
    if (formValue.volumeDeliveryDate === null) {
      formValue.volumeDeliveryDate = '';
    }
    console.log('formValue', formValue);
    if (type === 'nonVolume') {
      if ((formValue.nonVolumeReadyDate !== '' && formValue.nonVolumeDeliveryDate !== '')) {
        console.log('time check');
        if (this.deliveryDate < this.shipmentDate) {
          Swal.fire({
            title: 'Oops!',
            text: 'Please Enter the Shipment & Delivery Date Correctly!',
            icon: 'error'
          });
        } else if ((this.pattern.test(formValue.nonVolumeAmount))) {
          // if ((formValue.nonVolumeRefNum !== '' && formValue.nonVolumeAmount !== '') && (formValue.nonVolumeRefNum !== null && formValue.nonVolumeAmount !== null)) {
          console.log('nonVolNumCheck1');
          Swal.fire({
            title: 'Oops!',
            // text: 'Please Check The Amount & Reference Number!',
            text: 'Please Check The Amount!',
            icon: 'error'
          });
        } else {
          if (formValue !== '') {
            this.showForOperationTeam = true;
            this.upDateSuccess = false;
            this.tableValues = true;

            this.updateAmount = {
              'quoteId': quoteId,
              'amount': formValue.nonVolumeAmount,
              // 'salomonReferenceNumber': formValue.nonVolumeRefNum,
              'shipmentReadyDate': formValue.nonVolumeReadyDate,
              'requestedDeliveryDate': formValue.nonVolumeDeliveryDate
            };
            // }
            console.log('updateAmount', this.updateAmount);
            this.externalService.updateAmount(this.updateAmount).subscribe((data:any) => {
              console.log('responce', data);
              if (data.result === true) {
                console.log('updated Successfully', data.result);
                $('#rate-modal').modal('hide');
                this.localStorage();
                Swal.fire({
                  title: 'Updated!',
                  text: 'Updated Amount Sucessfully!',
                  icon: 'success',
                });
                this.logger = { 'method': 'updateAmount', 'message': 'Updating the rate', customerId: 0, type: this.customerType };
                this.loggerService.info(this.logger);
                this.showForOperationTeam = false;
                this.upDateSuccess = true;
              } else if (data.result === false) {
                Swal.fire({
                  title: 'Oops!',
                  text: 'Reference Number Already Exists!',
                  icon: 'error'
                });
              }
              this.externalService.getUpdatedData(quoteId).subscribe((data:any) => {
                this.tableValues = true;
                this.clickIdData = data[0];
                console.log('gvgv', this.clickIdData);
                // this.showForOperationTeam = false;
                // this.upDateSuccess = true;
              });
            }, (error:any) => {
              console.log('error', error);
              Swal.fire({
                title: 'Oops!',
                text: 'Updated Failed!',
                icon: 'error',
              });
              this.logger = { 'method': 'updateAmount', 'message': 'Error in Updating the Rate', customerId: 0, type: this.customerType };
              this.loggerService.info(this.logger);
            });
          } else {
            //console.log('error',data.result);
            Swal.fire({
              title: 'Oops!',
              text: 'Please Enter the Reference Number and Rate!',
              icon: 'error'
            });

            this.showForOperationTeam = true;
            this.upDateSuccess = false;
          }
        }
      } else if ((this.pattern.test(formValue.nonVolumeAmount))) {
        // if ((formValue.nonVolumeRefNum !== '' && formValue.nonVolumeAmount !== '') && (formValue.nonVolumeRefNum !== null && formValue.nonVolumeAmount !== null)) {
        console.log('nonVolNumCheck2');
        Swal.fire({
          title: 'Oops!',
          // text: 'Please Check The Amount & Reference Number!',
          text: 'Please Check The Amount!',
          icon: 'error'
        });
      } else {
        if (formValue !== '') {
          this.showForOperationTeam = true;
          this.upDateSuccess = false;
          this.tableValues = true;
          // console.log('rate',amount);
          // console.log('id',quoteId);
          if (this.volumeType === true) {
            this.updateAmount = {
              'quoteId': quoteId,
              'amount': formValue.volumeAmount,
              // 'salomonReferenceNumber': formValue.volumeRefNum,
              'shipmentReadyDate': formValue.volumeReadyDate,
              'requestedDeliveryDate': formValue.volumeDeliveryDate
            };
          } else if (this.nonVolumeType === true) {
            this.updateAmount = {
              'quoteId': quoteId,
              'amount': formValue.nonVolumeAmount,
              // 'salomonReferenceNumber': formValue.nonVolumeRefNum,
              'shipmentReadyDate': formValue.nonVolumeReadyDate,
              'requestedDeliveryDate': formValue.nonVolumeDeliveryDate
            };
          }
          console.log('updateAmount', this.updateAmount);
          this.externalService.updateAmount(this.updateAmount).subscribe((data:any) => {
            console.log('responce', data);
            if (data.result === true) {
              console.log('updated Successfully', data.result);
              $('#rate-modal').modal('hide');
              this.localStorage();
              Swal.fire({
                title: 'Updated!',
                text: 'Updated Amount Sucessfully!',
                icon: 'success',
              });
              this.showForOperationTeam = false;
              this.upDateSuccess = true;
              this.logger = { 'method': 'updateAmount', 'message': 'Updating the Rate', customerId: 0, type: this.customerType };
              this.loggerService.info(this.logger);
            } else if (data.result === false) {
              Swal.fire({
                title: 'Oops!',
                text: 'Reference Number Already Exists!',
                icon: 'error'
              });
            }
            this.externalService.getUpdatedData(quoteId).subscribe((data:any) => {
              this.tableValues = true;
              this.clickIdData = data[0];
              // console.log('gvgv', this.clickIdData);
              // this.showForOperationTeam = false;
              this.upDateSuccess = true;
            });
          }, (error:any) => {
            console.log('error', error);
            Swal.fire({
              title: 'Oops!',
              text: 'Updated Failed!',
              icon: 'error'

            });
            this.logger = { 'method': 'updateAmount', 'message': 'Error in Updating the Rate', customerId: 0, type: this.customerType };
            this.loggerService.info(this.logger);
          });
        } else {
          //console.log('error',data.result);
          Swal.fire({
            title: 'Oops!',
            text: 'Please Enter the Reference Number and Rate!',
            icon: 'error'
          });

          this.showForOperationTeam = true;
          this.upDateSuccess = false;
        }
      }
    } else if (type === 'volume') {
      if ((formValue.volumeReadyDate !== '' && formValue.volumeDeliveryDate !== '')) {
        console.log('time check');
        if (this.deliveryDate < this.shipmentDate) {
          Swal.fire({
            title: 'Oops!',
            text: 'Please Enter the Shipment & Delivery Date Correctly!',
            icon: 'error'
          });
        } else if ((this.pattern.test(formValue.volumeAmount))) {
          // if ((formValue.nonVolumeRefNum !== '' && formValue.nonVolumeAmount !== '') && (formValue.nonVolumeRefNum !== null && formValue.nonVolumeAmount !== null)) {
          console.log('nonVolNumCheck');
          Swal.fire({
            title: 'Oops!',
            // text: 'Please Check The Amount & Reference Number!',
            text: 'Please Check The Amount!',
            icon: 'error'
          });
        } else {
          if (formValue !== '') {
            this.showForOperationTeam = true;
            this.upDateSuccess = false;
            this.tableValues = true;
            // console.log('rate',amount);
            // console.log('id',quoteId);
            // if (this.volumeType === true) {
            this.updateAmount = {
              'quoteId': quoteId,
              'amount': formValue.volumeAmount,
              // 'salomonReferenceNumber': formValue.volumeRefNum,
              'shipmentReadyDate': formValue.volumeReadyDate,
              'requestedDeliveryDate': formValue.volumeDeliveryDate
            };
            // } else if (this.nonVolumeType === true) {
            //   this.updateAmount = {
            //     'quoteId': quoteId,
            //     'amount': formValue.nonVolumeAmount,
            //     'salomonReferenceNumber': formValue.nonVolumeRefNum,
            //     'shipmentReadyDate': formValue.nonVolumeReadyDate,
            //     'requestedDeliveryDate': formValue.nonVolumeDeliveryDate
            //   };
            // }
            console.log('updateAmount', this.updateAmount);
            this.externalService.updateAmount(this.updateAmount).subscribe((data:any) => {
              console.log('responce', data);
              if (data.result === true) {
                console.log('updated Successfully', data.result);
                $('#rate-modal').modal('hide');
                this.localStorage();
                Swal.fire({
                  title: 'Updated!',
                  text: 'Updated Amount Sucessfully!',
                  icon: 'success',
                });
                this.showForOperationTeam = false;
                this.upDateSuccess = true;
                this.logger = { 'method': 'updateAmount', 'message': 'Updating the Rate', customerId: 0, type: this.customerType };
                this.loggerService.info(this.logger);
              } else if (data.result === false) {
                Swal.fire({
                  title: 'Oops!',
                  text: 'Reference Number Already Exists!',
                  icon: 'error'
                });
              }
              this.externalService.getUpdatedData(quoteId).subscribe((data:any) => {
                this.tableValues = true;
                this.clickIdData = data[0];
                // console.log('gvgv', this.clickIdData);
                // this.showForOperationTeam = false;
                this.upDateSuccess = true;
              });
            }, (error:any) => {
              console.log('error', error);
              Swal.fire({
                title: 'Oops!',
                text: 'Updated Failed!',
                icon: 'error',
              });
              this.logger = { 'method': 'updateAmount', 'message': 'Error in Updating the Rate', customerId: 0, type: this.customerType };
              this.loggerService.info(this.logger);
            });
          } else {
            //console.log('error',data.result);
            Swal.fire({
              title: 'Oops!',
              text: 'Please Enter the Reference Number and Rate!',
              icon: 'error'
            });

            this.showForOperationTeam = true;
            this.upDateSuccess = false;
          }
        }
      } else if ((this.pattern.test(formValue.volumeAmount))) {
        // if ((formValue.volumeRefNum === null && formValue.volumeAmount === null) && (formValue.volumeRefNum === null && formValue.volumeAmount === null)) {
        Swal.fire({
          title: 'Oops!',
          // text: 'Please Check The Amount & Reference Number!',
          text: 'Please Check The Amount!',
          icon: 'error'
        });
      } else {
        if (formValue !== '') {
          this.showForOperationTeam = true;
          this.upDateSuccess = false;
          this.tableValues = true;
          // console.log('rate',amount);
          // console.log('id',quoteId);
          if (this.volumeType === true) {
            this.updateAmount = {
              'quoteId': quoteId,
              'amount': formValue.volumeAmount,
              // 'salomonReferenceNumber': formValue.volumeRefNum,
              'shipmentReadyDate': formValue.volumeReadyDate,
              'requestedDeliveryDate': formValue.volumeDeliveryDate
            };
          } else if (this.nonVolumeType === true) {
            this.updateAmount = {
              'quoteId': quoteId,
              'amount': formValue.nonVolumeAmount,
              // 'salomonReferenceNumber': formValue.nonVolumeRefNum,
              'shipmentReadyDate': formValue.nonVolumeReadyDate,
              'requestedDeliveryDate': formValue.nonVolumeDeliveryDate
            };
          }
          console.log('updateAmount', this.updateAmount);
          this.externalService.updateAmount(this.updateAmount).subscribe((data:any) => {
            console.log('responce', data);
            if (data.result === true) {
              console.log('updated Successfully', data.result);
              $('#rate-modal').modal('hide');
              this.localStorage();
              Swal.fire({
                title: 'Updated!',
                text: 'Updated Amount Sucessfully!',
                icon: 'success',
              });
              this.showForOperationTeam = false;
              this.upDateSuccess = true;
              this.logger = { 'method': 'updateAmount', 'message': 'Updating the Rate', customerId: 0, type: this.customerType };
              this.loggerService.info(this.logger);
            } else if (data.result === false) {
              Swal.fire({
                title: 'Oops!',
                text: 'Reference Number Already Exists!',
                icon: 'error'
              });
            }
            this.externalService.getUpdatedData(quoteId).subscribe((data:any) => {
              this.tableValues = true;
              this.clickIdData = data[0];
              // console.log('gvgv', this.clickIdData);
              // this.showForOperationTeam = false;
              this.upDateSuccess = true;
            });
          }, (error:any) => {
            console.log('error', error);
            Swal.fire({
              title: 'Oops!',
              text: 'Updated Failed!',
              icon: 'error',
            });
            this.logger = { 'method': 'updateAmount', 'message': 'Error in Updating the Rate', customerId: 0, type: this.customerType };
            this.loggerService.info(this.logger);
          });
        } else {
          //console.log('error',data.result);
          Swal.fire({
            title: 'Oops!',
            text: 'Please Enter the Reference Number and Rate!',
            icon: 'error'
          });

          this.showForOperationTeam = true;
          this.upDateSuccess = false;
        }
      }
    }
    // if (/^[a-z]+$/i.test(formValue.nonVolumeAmount)) {
    //   console.log('check');
    // }
  }




  removeDuplicates(originalArray:any, objKey:any) {
    var trimmedArray = [];
    var values = [];
    var value;

    for(var i = 0; i < originalArray.length; i++) {
      value = originalArray[i][objKey];

      if(values.indexOf(value) === -1) {
        trimmedArray.push(originalArray[i]);
        values.push(value);
      }
    }

    return trimmedArray;

  }
  localStorage() {
    this.customerType = localStorage.getItem(('customerType'));
    console.log('customerType', this.customerType);
    if (this.customerType === 'admin') {
   //   this.tableData();
      this.showAdminChatData = true;
      this.showForOperationTeam = true;
      this.operationTeam = true;
      this.externalTeam = false;
      this.accessToken = localStorage.getItem(('accessToken'));
      this.showSideMenu = false;
      //this.upDateSuccess = false;

    } else if (this.customerType === 'externalCustomer') {
      this.externalCustomer = localStorage.getItem(('SalesRepName'));
      this.externalCustomerParseData = JSON.parse(this.externalCustomer);
      console.log('this.externalCustomerParseData', this.externalCustomerParseData);
      this.accessToken = localStorage.getItem(('accessToken'));
      this.customerId = this.externalCustomerParseData.id;
      this.salesRepId = this.externalCustomerParseData.salesRepId;
      console.log('salesRepId', this.salesRepId);
      this.showAdminChatData = false;
      this.showForCustomer = true;
      this.externalTeam = true;
      this.operationTeam = false;
      this.showSideMenu = true;
      // this.getCustomersRateQuote();
    }

  }

  checkPhoneNumber(value:any, type:any) {
    let phoneNumber;
    if (type === 'shipper') {
      this.shipperPhoneNumber = value;
      phoneNumber = this.formatPhoneNumber(value);
      this.quickieFormUpdate.patchValue({shipperPhone: phoneNumber});
    } else {
      this.consigneePhoneNumber = value;
      phoneNumber = this.formatPhoneNumber(value);
      this.quickieFormUpdate.patchValue({consigneePhone: phoneNumber});
    }
  }
  formatPhoneNumber(s:any) {
    let s2 = ('' + s).replace(/\D/g, '');
    let m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ')' + m[2] + '-' + m[3];
  }

  acceptQuote(quoteId:any, quoteType:any, form:any) {
    console.log('quoteId', quoteId, 'quoteType', quoteType, 'form', form);
    let acceptObject = {};
    if (quoteType === 'Quickie quote') {
      acceptObject = {
        'quoteId': quoteId,
        'status': 'Accepted',
        'shipperCompanyName': form.shipperCompanyName,
        'shipperContactName': form.shipperContactName,
        'shipperPhone': this.shipperPhoneNumber,
        'shipperStreet1': form.shipperStreet1,
        'shipperStreet2': form.shipperStreet2,
        'shipperCountry': form.shipperCountry,
        'consigneeCompany': form.consigneeCompany ,
        'consigneeContactName': form.consigneeContactName,
        'consigneePhone': this.consigneePhoneNumber,
        'consigneeStreet1': form.consigneeStreet1,
        'consigneeStreet2': form.consigneeStreet2,
        'consigneeCountry': form.consigneeCountry
      };
    } else {
      acceptObject = {
        'quoteId': quoteId,
        'status': 'Accepted'
      };
    }
    console.log('acceptObject', acceptObject);
    this.externalService.acceptOrDecline(acceptObject).subscribe((data:any) => {
      console.log('data', data);
      this.acceptData = data;
      if (this.acceptData.result === true) {
        $('#rate-modal').modal('hide');
        console.log('Accepted Successfully', this.acceptData.result);
        this.localStorage();
        Swal.fire({
          title: 'Accepted!',
          text: 'Accepted Rate Sucessfully!',
          icon: 'success',
        });
        this.acceptCustomerFlag = false;
        this.logger = { 'method': 'acceptOrDecline', 'message': 'Updating the Status', type: this.customerType, object: acceptObject };
        this.loggerService.info(this.logger);
        //this.tableValues =false;
      } else {

        Swal.fire({
          title: 'Oops!',
          text: 'Failed to Accept!',
          icon: 'error'
        });
        //this.tableValues =false;
      }
    }, (err:any) => {
      this.logger = { 'method': 'acceptOrDecline', 'message': 'Error in Updating the Status', type: this.customerType, object: acceptObject };
      this.loggerService.error(this.logger);
    });
  }
  
  checkNumber(value:any) {
    let num;
    if (isNaN(value)) {
      let numbers = value.match(/\d+/g).map(Number);
      num = numbers[0];
    } else {
      num = value;
    }
    return num;
  }

  checkForNumber(value:any, type:any) {
    let numberData = this.checkNumber(value);
    console.log('numberData', numberData);
    // if (type === 'nonVolumeRefNum') {
    //   if (numberData !== '' && numberData !== null) {
    //     this.amountUpdate.patchValue({nonVolumeRefNum: numberData});
    //   } else if (numberData !== null) {
    //     console.log('value null');
    //     this.amountUpdate.patchValue({nonVolumeRefNum: ''});
    //   }
    // } else
      if (type === 'nonVolumeAmount') {
      if (numberData !== '' && numberData !== null) {
        this.amountUpdate.patchValue({nonVolumeAmount: numberData});
      } else {
        this.amountUpdate.patchValue({nonVolumeAmount: ''});
      }
    }
    // else if (type === 'volumeRefNum') {
    //   if (numberData !== '' && numberData !== null) {
    //     this.amountUpdate.patchValue({volumeRefNum: numberData});
    //   } else {
    //     this.amountUpdate.patchValue({volumeRefNum: ''});
    //   }
    // }
    else if (type === 'volumeAmount') {
      if (numberData !== '' && numberData !== null) {
        this.amountUpdate.patchValue({volumeAmount: numberData});
      } else {
        this.amountUpdate.patchValue({volumeAmount: ''});
      }
    }
  }
  ngOnDestroy() {
    console.log('destroy');
    
   // this.unsubscribe.next();
    
    // this.unsubscribe(this.customerInfo);
    window.clearInterval(this.interval);
  }
  // unsubscribe(subscription: Subscription) {
  //   if (subscription != null) {
  //     subscription.unsubscribe();
  //   }
  // }

  sendMail(id:any) {
    console.log('id', id);
    this.sendEmailForId = id;
    this.buildActiveRequestForm();

  }

  send(value:any) {
    console.log('event', value);
    this.showMailSentPopUp = false;
    this.showError = {};
    this.emailRequest = value;
    this.emailRequest.quoteId = this.sendEmailForId;
    console.log('this.emailRequest', this.emailRequest);
    if ((value.othersCarrier === false && value.yrc === false && value.reddaway === false && value.fedex === false) ||
      (value.othersCarrier === '' && value.yrc === '' && value.reddaway === '' && value.fedex === '')) {
      if (value.notes === '') {
        console.log('all false');
        this.showErrorMessage = true;
        this.showError = {name: 'carrier name and notes'};
      } else {
        this.showErrorMessage = true;
        this.showError = {name: 'carrier name'};
      }

    } else {
      if (value.othersCarrier === true) {
        if (value.others !== '' && value.notes !== '') {
          this.showErrorMessage = false;
          console.log('this.emailRequest', value);
          this.externalService.sendEmailData(this.emailRequest).subscribe((data:any) => {
            let response = data;
            this.logger = { 'method': 'sendEmailData', 'message': 'Sending Mail', type: this.customerType, Data: this.emailRequest };
            this.loggerService.info(this.logger);
            if (response.result === true) {
              this.showMailSentPopUp = true;
            } else {
              this.showMailSentPopUp = false;
            }
          }, (err:any) => {
            this.logger = { 'method': 'sendEmailData', 'message': 'Error in Sending Mail', type: this.customerType, Data: this.emailRequest };
            this.loggerService.error(this.logger);
          });
        } else {
          console.log('this.emailRequest value', value);
          this.showErrorMessage = true;
          this.showError = {name: 'Email and Notes'};
        }
      } else {
        if (value.notes !== '') {
          this.showErrorMessage = false;
          this.externalService.sendEmailData(this.emailRequest).subscribe((data:any) => {
            let response = data;
            this.logger = { 'method': 'sendEmailData', 'message': 'Sending Mail', type: this.customerType, Data: this.emailRequest };
            this.loggerService.info(this.logger);
            if (response.result === true) {
              this.showMailSentPopUp = true;
            } else {
              this.showMailSentPopUp = false;
            }
          }, (err:any) => {
            this.logger = { 'method': 'sendEmailData', 'message': 'Error in Sending Mail', type: this.customerType, Data: this.emailRequest };
            this.loggerService.error(this.logger);
          });
        } else {
          this.showErrorMessage = true;
          this.showError = {name: 'Notes'};
        }
      }
    }

    //let name = {fedex:'fedex',yrc: 'yrc', reddaway:'reddaway'};

    // this.emailRequest.push(name);
    if (value.fedex === true && value.yrc === true && value.reddaway === true && value.othersCarrier === true) {
      this.displayName = {name: 'Fedex, Yrc, Reddaway, Others'};
    } else if (value.fedex === true && value.yrc === true && value.reddaway === true) {
      this.displayName = {name: 'Fedex, Yrc, Reddaway'};
    } else if (value.fedex === true && value.yrc === true) {
      this.displayName = {name: 'Fedex, Yrc'};
    } else if (value.fedex === true) {
      this.displayName = {name: 'Fedex'};
    } else {
      this.displayName = {name: 'Reddaway'};
    }

    //  this.activeRequest.patchValue({fedex: '', yrc: '', reddaway: '', others: '', notes: '', othersCarrier: ''});
    //  this.showEmailId = false;
  }


  bookModal(setControlNumber:any) {
    if (setControlNumber !== undefined && setControlNumber !== "" && setControlNumber !== null) {
       this.setMsgForControlNumber = false; 
    } else {
     this.setMsgForControlNumber = true;
    }
  }
  bookedStatus(quoteId:any, form:any) {
    console.log('quoteId', quoteId, 'form', form);
    let object:any;
    object = {
      'quoteId': quoteId,
      'status': 'Booked',
    'amount': form.amount,
    'salomonReferenceNumber': form.controlNumber,
      'shipmentReadyDate': form.shipmentReadyDate,
      'requestedDeliveryDate': form.requestedDeliveryDate
    };
    this.externalService.acceptOrDecline(object).subscribe((data:any) => {
      console.log('data', data);
      this.acceptData = data;
      this.logger = {'method': 'acceptOrDecline', 'message': 'Updating to booked status', type: this.customerType, object: object};
      this.loggerService.info(this.logger);
      if (this.acceptData.result === true) {
        this.salomonReferenceNumber = form.controlNumber
        $('#notification-modal').modal('hide');
        console.log('Accepted Successfully', this.acceptData.result);
        this.localStorage();
        Swal.fire({
          title: 'Booked!',
          text: 'Booked Sucessfully!',
          icon: 'success',
        });
        this.acceptCustomerFlag = false;
        //this.tableValues =false;
      } else {

        Swal.fire({
          title: 'Oops!',
          text: 'Failed to Book!',
          icon: 'error'
        });
        //this.tableValues =false;
      }

    }, (err:any) => {
      this.logger = { 'method': 'acceptOrDecline', 'message': 'Error in updating to booked status', type: this.customerType, object: object };
      this.loggerService.error(this.logger);
    });
  }
  cancel() {
    this.activeRequest.patchValue({fedex: '', yrc: '', reddaway: '', others: '', notes: '', othersCarrier: ''});
    this.showEmailId = false;
  }

  cancelStatusUpdate(id:any, reason:any) {
    console.log('id', id, reason);
    let object:any;
    object = {
      'quoteId': id,
      'status': 'Cancelled',
'cancelledBy': this.customerType,
'cancelReason': reason
    };
    this.externalService.acceptOrDecline(object).subscribe((data:any) => {
      console.log('data', data);
      this.acceptData = data;
      this.logger = {'method': 'acceptOrDecline', 'message': 'Updating to booked status', type: this.customerType, object: object};
      this.loggerService.info(this.logger);
      if (this.acceptData.result === true) {
        $('#rate-modal').modal('hide');
        console.log('Accepted Successfully', this.acceptData.result);
        this.localStorage();
        swal.fire({
          title: 'Cancelled!',
          text: 'Cancelled Sucessfully!',
          icon: 'success',
        });
        this.acceptCustomerFlag = false;
        //this.tableValues =false;
      } else {

        Swal.fire({
          title: 'Oops!',
          text: 'Failed to Cancel!',
          icon: 'error'
        });
        //this.tableValues =false;
      }

    }, (err:any) => {
      this.logger = { 'method': 'acceptOrDecline', 'message': 'Error in updating to booked status', type: this.customerType, object: object };
      this.loggerService.error(this.logger);
    });
  }

  bookedStatusUpdate(quoteId:any, form:any) {
    console.log('quoteId', quoteId, 'form', form);
    let object:any;
    object = {
      'salomonReferenceNumber': this.salomonReferenceNumber,
      'quoteId': quoteId,
      'status': 'Booked',
      'amount': form.amount,
      'shipmentReadyDate': form.shipmentReadyDate,
      'requestedDeliveryDate': form.requestedDeliveryDate
    };
    this.externalService.acceptOrDecline(object).subscribe((data:any) => {
      console.log('data', data);
      this.acceptData = data;
      this.logger = {'method': 'acceptOrDecline', 'message': 'Updating to booked status', type: this.customerType, object: object};
      this.loggerService.info(this.logger);
      if (this.acceptData.result === true) {
        $('#rate-modal').modal('hide');
        console.log('Accepted Successfully', this.acceptData.result);
        this.localStorage();
        Swal.fire({
          title: 'Success!',
          text: 'Updated Sucessfully!',
          icon: 'success',
        });
        this.acceptCustomerFlag = false;
        //this.tableValues =false;
      } else {

        Swal.fire({
          title: 'Oops!',
          text: 'Failed to Updated!',
          icon: 'error'
        });
        //this.tableValues =false;
      }

    }, (err:any) => {
      this.logger = { 'method': 'acceptOrDecline', 'message': 'Error in updating to booked status', type: this.customerType, object: object };
      this.loggerService.error(this.logger);
    });
  }
  getAddressClickValues(id:any, type:any) {
    this.openType = 'addressId';
    this.externalService.getTemplate(id, this.openType).subscribe(response => {
      console.log('addressTempAutoFillVal', response);
      this.addressTemplate = response;
      console.log('id', id);
      this.addressTemplateAutoFill = this.addressTemplate[0];
      console.log('val', this.addressTemplateAutoFill);
      if (type === 'shipperid') {
        this.shipperPhoneNumber = this.addressTemplateAutoFill.contactNumber;		
        this.checkPhoneNumber(this.addressTemplateAutoFill.contactNumber, 'shipper');
        this.quickieFormUpdate.patchValue({
          shipperCompanyName: this.addressTemplateAutoFill.companyName,
          shipperContactName: this.addressTemplateAutoFill.contactName,
          // shipperPhone: this.addressTemplateAutoFill.contactNumber,
          shipperStreet1: this.addressTemplateAutoFill.street1,
          shipperStreet2: this.addressTemplateAutoFill.street2,
        });
      } else {
        this.consigneePhoneNumber = this.addressTemplateAutoFill.contactNumber;		
console.log('this.consigneePhoneNumber', this.consigneePhoneNumber);		
this.checkPhoneNumber(this.addressTemplateAutoFill.contactNumber, 'consignee');
        this.quickieFormUpdate.patchValue({
          consigneeCompany: this.addressTemplateAutoFill.companyName,
          consigneeContactName: this.addressTemplateAutoFill.contactName,
          // consigneePhone: this.addressTemplateAutoFill.contactNumber,
          consigneeStreet1: this.addressTemplateAutoFill.street1,
          consigneeStreet2: this.addressTemplateAutoFill.street2,
        });
      }
      this.addressTemplateData();
    });
  }
  addressTemplateData() {
    this.shipperTemplatesPresent = false;
    this.consigneeTemplatesPresent = false;
    this.shipperTemplate1 = [];
    this.consigneeTemplate1 = [];
    this.addressTemplatesPresent = false;
    this.openType = 'address';
    this.externalService.getTemplate(this.templateId, this.openType).subscribe((response:any) => {
      console.log('addressTempAutoFillVal', response);
      this.addressTemplate = response;
      for (let i = 0; i < this.addressTemplate.length; i++) {
        if (response[i].type === 'shipper') {
          console.log('type', response[i].type);
          this.shipperTemplate1.push(response[i]);
        } else if (response[i].type === 'consignee') {
          console.log('type', response[i].type);
          this.consigneeTemplate1.push(response[i]);
        }
      }
      if (this.shipperTemplate1.length <= 0) {
        this.shipperTemplatesPresent = true;
      } else {
        this.shipperTemplate = this.shipperTemplate1;
      }
      if (this.consigneeTemplate1.length <= 0) {
        this.consigneeTemplatesPresent = true;
      } else {
        this.consigneeTemplate = this.consigneeTemplate1;
      }
      // if (this.addressTemplate.length <= 0) {
      //   this.addressTemplatesPresent = true;
      // }
    });
  }

  routingForClass(type:any) {
    console.log('type', type);
    if (type=='class') {
     // window.location.reload(); 
    this.externalService.setTools('class');
    this.router.navigate(['/calculator', 'class']);
    } else if (type== 'density') {
      // window.location.reload();
      this.externalService.setTools('density');
      this.router.navigate(['/calculator', 'density']);
    } else if (type === 'activeRequest') {
      console.log('type If', type);
      this.router.navigate(['/active_request', 'ftl']);
    } else if (type === 'customerInfo') {
      let companyInfo = null;
      this.invoiceService.setCompanyInformation(companyInfo);
      this.router.navigate(['/Customer_Info']);
    } else if (type === 'company')  {
      this.router.navigate(['/companyWarehouse']);
    } else if (type === 'warehouse') {
      this.router.navigate(['/warehouse']);
    } else if (type === 'intlenroute') {
      this.router.navigate(['/intlEnRoute']);
    } else if (type === 'domesticenroute') {
      this.router.navigate(['/domesticEnRoute']);
    } else if (type === 'inventory') {
      this.router.navigate(['/inventory']);
    } else if (type === 'information') {
      this.router.navigate(['/enrouteInformation']);
    } else if (type === 'workbookInfo') { 
      let object  = undefined;
      this.invoiceService.setCompanyInformation1(object);
      let emptyArray = null;
    this.invoiceService.setTrafficData(emptyArray);
    this.invoiceService.setTrafficDataEnable(emptyArray);
      this.router.navigate(['/customerInfoworkbook']);
    }
  }

  getBolScreen() {
    let billOfLadingValues = {};
    this.pricingInfoService.setBillOfLadingValues(billOfLadingValues);
    let createBol = {};
    this.pricingInfoService.setBolQuoteId(createBol);
    this.router.navigate(['/BOLNEW']);
  } 
}
