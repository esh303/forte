import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PricingInfoService } from '../services/pricing-info.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExternalService} from '../services/external.service';
import { LoggerService } from '../services/logger.service';
import { InternalScreeningService } from '../services/internal-screening.service';
import swal from 'sweetalert2';

declare var $: any;
// import {el} from '@angular/platform-browser/testing/src/browser_util';
// import {isNullOrUndefined} from 'util';
// import {isUndefined} from 'ngx-bootstrap/chronos/utils/type-checks';
// import { watchFile } from 'fs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public customerType:any;
  public salesRep:any;
  public salesRepValues:any;
  public salesRepId:any;
  public salesRepType:any;
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
  quickieFormUpdate: FormGroup = new FormGroup({});
  bookedStatusUpdateForm: FormGroup= new FormGroup({});
  fulltruckloadFormUpdate: FormGroup = new FormGroup({});
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
  public quoteIdUpdate:any;
  public lineItem:any = [];
  public hazmat:any;
  public rate:any;
  public logger:any;
  public listOfApValues:any;
  public listOfArValues:any;
  public quoteNumber:any;
  public weightTotal = 0;
  public piecesTotal = 0;
  public customerInformationForChat: any;
  public billOfLadingValues = {};
  public enableUpdateQuote = false;
  public volMinDate = new Date();
  public volMinDate2 = new Date();
  public nonVolMinDate = new Date();
  public nonVolMinDate2 = new Date();
  public showCancelOrder = false;
  public shipperTemplatesPresent = false;
  public consigneeTemplatesPresent = false;
  public templateId:any;
  public addressTemplateAutoFill: any;
  public addressTemplate: any;
  public shipperTemplate1:any = [];
  public shipperTemplate:any = [];
    public consigneeTemplate1:any = [];
    public consigneeTemplate:any = [];
public addressTemplatesPresent = false;
    public openType: any;
    public reason:any;
    public companyId:any;
    public ismeridian: boolean = true;
  constructor(private pricingInfoService: PricingInfoService, private fb: FormBuilder,
              private router: Router, private externalService: ExternalService,
              private internalService: InternalScreeningService,
            private loggerService: LoggerService) { }

  ngOnInit() {
    this.localStorage();
    this.getSalesRepDetails();
    this.callNotifications();
    this.buildForm();
    this.buildActiveRequestForm();
    window.scroll(0,0);
    this.getSalesData();
    /*this.accessToken = localStorage.getItem('accessToken');
    this.getCustomerInformation();*/
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
    if (this.salesRepValues.type === 'administrator') {
      //  this.showForExternalCustomer = false;
      //  this.showSetMasterData = true;
      this.salesRepValues.salesRepName = this.salesRepValues.salesRepName;
    } else if (this.salesRepValues.type === undefined || this.customerType === 'externalCustomer') {
      this.salesRepValues.salesRepName = this.salesRepValues.customerName;
      //  this.showForExternalCustomer = true;
    } else {
      //   this.showForExternalCustomer = false;
      //   this.showSetMasterData = false;
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
  cancelStatus() {
    this.tableValues = true;
}
declineQuote(id:any) {

}
sendMail(id:any) {

}

  callNotifications() {
    let type;
    let numberOfNotifications = [];
    let notificationLength;
    this.showNotifications = false;
    if (this.customerType === 'admin') {
      type = 'externalCustomer';
      this.externalService.getQuoteChat(type).subscribe(response => {
        this.initialMessage = response;
        console.log('this.message', this.initialMessage);
        if (this.initialMessage.length > 0) {
          this.showNotifications = true;
          this.message = this.removeDuplicates(this.initialMessage, 'quoteNumber');
          console.log('data', this.message);
          this.initialMessage.totalNotifications = this.initialMessage.length;
          for (let i = 0; i < this.message.length; i++) {
            this.message[i].createdOn = this.message[i].createdOn.replace('Z', '');

            console.log('bdfbhf');
            let quoteNumber = this.message[i].quoteNumber;
            console.log('quoteNumber', quoteNumber);
            numberOfNotifications = this.initialMessage.filter(function(el:any){
              return el.quoteNumber === quoteNumber;
            });
            console.log('numberOfNotifications', numberOfNotifications);
            if (numberOfNotifications.length > 0) {
              notificationLength = numberOfNotifications.length;
              console.log('notificationLength', notificationLength);
            } else {
              notificationLength = 1;
            }
            console.log('notificationLength else ', notificationLength);
            this.message[i].displayMessage = 'You got ' + notificationLength + ' messages from External Customer';

          }
        } else {
          console.log('initial else');
          this.initialMessage = [];
          this.showNotifications = false;
        }
      });
    } else {
      type = 'admin';
      this.externalService.getQuoteChatForExternalCustomer(type, this.customerId).subscribe(response => {
        this.initialMessage = response;
        console.log('this.initialMessage', this.initialMessage);
        if (this.initialMessage.length > 0) {
          this.showNotifications = true;
          this.message = this.removeDuplicates(this.initialMessage, 'quoteNumber');
          console.log('thiis.message', this.message);
          this.initialMessage.totalNotifications = this.initialMessage.length;
          for (let i = 0; i < this.message.length; i++) {
            this.message[i].createdOn = this.message[i].createdOn.replace('Z', '');

            let quoteNumber = this.message[i].quoteNumber;
            numberOfNotifications = this.initialMessage.filter(function(el:any){
              return el.quoteNumber === quoteNumber;
            });
            console.log('numberOfNotifications', numberOfNotifications);
            if (numberOfNotifications.length > 0) {
              notificationLength = numberOfNotifications.length;
              console.log('notificationLength', notificationLength);
            } else {
              notificationLength = 1;
            }
            console.log('notificationLength else', notificationLength);
            console.log('bdfbhf else');
            this.message[i].displayMessage = 'You got ' + notificationLength + ' messages from Admin';

          }
        } else {
          this.showNotifications = false;
          console.log('callNotifications else');
          this.initialMessage = [];
        }
      });
    }
    console.log('callNotifications');


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
    // if (this.shipmentDate !== null) {
    //   if (this.shipmentDate < this.deliveryDate) {
    //     this.showMessageForDatePicker = false;
    //   } else {
    //     this.showMessageForDatePicker = true;
    //   }
    // }
  }

  searchId(chat:any, quoteReferenceNumber:any) {
    console.log('chat', chat);
    this.showAllChat = true;
    this.showMinChat = false;
    this.amountUpdate.reset();
    this.showMessageForDatePicker = false;
    this.dateValidation = true;
    this.forOcean = false;
    this.forOther = false;
    this.forAir = false;
    this.forVolume = false;
    this.forTruck = false;
    this.fullQuote = false;
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
        });
      // this.logger = { 'method': 'getClickVal', 'message': 'Retrieving data for single quote', type: this.customerType, Quote: quoteReferenceNumber };
      // this.loggerService.info(this.logger);
      console.log('amount', this.clickIdData);
      console.log('completeData', data);
      if (this.clickIdData.salomonReferenceNumber === null) {
        this.clickIdData.salomonReferenceNumber = 'Not Assigned';
        console.log('Not Assigned', this.clickIdData.salomonReferenceNumber);
      }
      this.clickIdData.createdOn = this.clickIdData.createdOn.replace('Z', '');
      // this.maxDate = this.clickIdData.requestedDeliveryDate;
      // this.maxDate = Date.parse('this.maxDate');
      // new Date(b.createdOn).getTime();
      // this.maxDate.setDate(this.maxDate.getDate() + 9);
      // console.log('date', this.maxDate.getTime());
      // console.log('minDate', this.volMinDate);

      if (this.clickIdData.status === 'Rate Quote' && this.customerType === 'externalCustomer') {
        this.acceptCustomerFlag = true;
        if (this.clickIdData.quoteType === 'Quickie quote') {
          this.showFillInformation = true;
          this.quickieFormUpdate.patchValue({shipperCompanyName: this.externalCustomerParseData.companyName, 
            shipperContactName: this.externalCustomerParseData.customerName, 		
          shipperStreet1: this.externalCustomerParseData.address, companyCloseTime: new Date('17:00')});
        } else {
          this.showFillInformation = false;
        }
        this.bookedCustomerFlag = false;
      }
      else if ((this.clickIdData.status === 'Accepted' || this.clickIdData.status === 'Booked') && this.customerType === 'externalCustomer') {
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
      // if (this.clickIdData.transportationType === 'volume' && this.clickIdData.quoteType === 'fullRateQuote') {
      //   this.volumeType = true;
      //   this.nonVolumeType = false;
      // } else {
      //   this.nonVolumeType = true;
      //   this.volumeType = false;
      // }
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
      // if (typeof this.clickIdData.lineItem.Dimensions.Length === 'undefined' || this.clickIdData.lineItem.Dimensions.Length === null) {
      //   console.log('dimention Not Present');
      // }
      // if (this.clickIdData.lineItem.Dimensions === null) {
      //   console.log('dimention Not Present');
      // }
    }, (err:any) => {
      //  this.logger = { 'method': 'getClickVal', 'message': 'Error in retrieving  the data for quote', type: this.customerType, quote: quoteReferenceNumber };
      //  this.loggerService.info(this.logger);
    });
  }

  getDataForParticularChat(chat:any, quoteNumber:any) {
    console.log('chat', chat);
    this.externalService.getClickVal(quoteNumber).subscribe((data:any) => {
      /* this.tableValues = true;*/
      this.clickIdData = data[0];
      this.getChatById(this.quoteNumber, this.clickIdData.id, 'type');
      /*this.logger = {'method': 'getClickVal', 'message': 'Retrieving data for single quote', type: this.customerType, Quote: quoteReferenceNumber};
      this.loggerService.info(this.logger);*/
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
      shippersBillOfLading: [''],
      purchaseOrderNumber: [''],
      shipperIdNumber: [''] ,
      companyOpenTime: [''],
      companyCloseTime: ['']
      
    });
    this.bookedStatusUpdateForm = this.fb.group({
      shipmentReadyDate: ['', Validators.required],
      requestedDeliveryDate: ['', Validators.required],
      amount: ['', Validators.required]
    });
    this.fulltruckloadFormUpdate = this.fb.group({
      shipperCompanyName: ['', [Validators.required]],
      shipperContactName: ['', [Validators.required]],
      consigneeCompany: ['', Validators.required],
      consigneeContactName: [''],
      shippersBillOfLading: [''],
purchaseOrderNumber: [''],
shipperIdNumber: [''] ,
companyOpenTime: [''],
companyCloseTime: [new Date('17:00')]
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
  getCustomerInformation() {
    this.pricingInfoService.getCustomer(this.accessToken).subscribe(data=>{
      this.customerInformationForChat = data;
      console.log('this.customerInformationForChat', this.customerInformationForChat);
    });
  }

  getChatById(quoteNumber:any, id:any, identifier:any) {
    console.log('id', id);
    // this.quoteId = id;
    this.customerMessage = [];
    let customerDetails = [];
    // this.operationalTeamMessage = [];
    // this.externalService.setQuoteId(this.quoteId);
    this.externalService.getParticularChat(quoteNumber).subscribe((response:any) => {
      this.messageResponse = response;
      console.log('this.message', this.messageResponse);
      if (identifier === 'allchat') {
        if (this.messageResponse.length > 0) {
          for (let t = 0; t < this.messageResponse.length; t++) {
            this.messageResponse[t].createdOn = this.messageResponse[t].createdOn.replace('Z', '');
            let customerId = this.messageResponse[t].customerId;
            this.internalService.getSalesRepName(customerId, this.accessToken, 'externalCustomer').subscribe(data=>{
              this.customerInformationForChat = data;
              console.log('this.customerInformationForChat', this.customerInformationForChat);
            });
            console.log('this.customerInformationForChat', this.customerInformationForChat);
            customerDetails = this.customerInformationForChat;
            console.log('this.customerDetails', customerDetails);
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
            /*else {
                             this.customerMessage = [];
                         console.log('this.customerMessage Eslse', this.customerMessage);
                       }*/
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
            /*else {
                         this.operationalTeamMessage = [];
                         console.log('this.operationalTeamMessage elsee', this.operationalTeamMessage);
                       }*/
            console.log('this.customerMessage1', this.customerMessage);
            this.customerMessage.sort((a:any, b:any) => b.id - a.id);
            console.log('this.customerMessage1 sort', this.customerMessage);
          }
        }
      } else if (identifier === 'quotechat') {
        if (this.messageResponse.length > 3) {
          if (this.messageResponse.length > 0) {
            for (let t = 0; t < this.messageResponse.length; t++) {
              let customerId = this.messageResponse[t].customerId;
              // let customerId = this.messageResponse[i].customerId;
              this.internalService.getSalesRepName(customerId, this.accessToken, 'externalCustomer').subscribe(data=>{
                this.customerInformationForChat = data;
                console.log('this.customerInformationForChat', this.customerInformationForChat);
              });
              console.log('this.customerInformationForChat', this.customerInformationForChat);
              customerDetails = this.customerInformationForChat;
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
                console.log('this.customerInformationForChat', this.customerInformationForChat);
              });
              console.log('this.customerInformationForChat', this.customerInformationForChat);
              customerDetails = this.customerInformationForChat;
              console.log('this.customerDetails', customerDetails);
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
            /*else {
                         this.operationalTeamMessage = [];
                         console.log('this.operationalTeamMessage elsee', this.operationalTeamMessage);
                       }*/
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
    // this.showViewAllForm = true;
    // this.showActiveRequest = false;
    //  this.router.navigate(['/chat']);
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
        } else if ((this.pattern.test(formValue.nonVolumeAmount)) || (this.pattern.test(formValue.nonVolumeRefNum))) {
          // if ((formValue.nonVolumeRefNum !== '' && formValue.nonVolumeAmount !== '') && (formValue.nonVolumeRefNum !== null && formValue.nonVolumeAmount !== null)) {
          console.log('nonVolNumCheck1');
          Swal.fire({
            title: 'Oops!',
            text: 'Please Check The Amount & Reference Number!',
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
              'salomonReferenceNumber': formValue.nonVolumeRefNum,
              'shipmentReadyDate': formValue.nonVolumeReadyDate,
              'requestedDeliveryDate': formValue.nonVolumeDeliveryDate
            };
            // }
            console.log('updateAmount', this.updateAmount);
            this.externalService.updateAmount(this.updateAmount).subscribe((data:any) => {
              console.log('responce', data);
              if (data.result === true) {
                console.log('updated Successfully', data.result);
                $('#notification-modal').modal('hide');
                this.getSalesRepDetails();
                Swal.fire({
                  title: 'Updated!',
                  text: 'Updated Amount Sucessfully!',
                  icon: 'success',
                });
                //  this.logger = { 'method': 'updateAmount', 'message': 'Updating the rate', customerId: 0, type: this.customerType };
                // this.loggerService.info(this.logger);
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
              //   this.logger = { 'method': 'updateAmount', 'message': 'Error in Updating the Rate', customerId: 0, type: this.customerType };
              //   this.loggerService.info(this.logger);
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
      } else if ((this.pattern.test(formValue.nonVolumeAmount)) || (this.pattern.test(formValue.nonVolumeRefNum))) {
        // if ((formValue.nonVolumeRefNum !== '' && formValue.nonVolumeAmount !== '') && (formValue.nonVolumeRefNum !== null && formValue.nonVolumeAmount !== null)) {
        console.log('nonVolNumCheck2');
        Swal.fire({
          title: 'Oops!',
          text: 'Please Check The Amount & Reference Number!',
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
              'salomonReferenceNumber': formValue.volumeRefNum,
              'shipmentReadyDate': formValue.volumeReadyDate,
              'requestedDeliveryDate': formValue.volumeDeliveryDate
            };
          } else if (this.nonVolumeType === true) {
            this.updateAmount = {
              'quoteId': quoteId,
              'amount': formValue.nonVolumeAmount,
              'salomonReferenceNumber': formValue.nonVolumeRefNum,
              'shipmentReadyDate': formValue.nonVolumeReadyDate,
              'requestedDeliveryDate': formValue.nonVolumeDeliveryDate
            };
          }
          console.log('updateAmount', this.updateAmount);
          this.externalService.updateAmount(this.updateAmount).subscribe((data:any) => {
            console.log('responce', data);
            if (data.result === true) {
              console.log('updated Successfully', data.result);
              $('#notification-modal').modal('hide');
              this.getSalesRepDetails();
              Swal.fire({
                title: 'Updated!',
                text: 'Updated Amount Sucessfully!',
                icon: 'success',
              });
              this.showForOperationTeam = false;
              this.upDateSuccess = true;
              //    this.logger = { 'method': 'updateAmount', 'message': 'Updating the Rate', customerId: 0, type: this.customerType };
              //    this.loggerService.info(this.logger);
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
            //  this.logger = { 'method': 'updateAmount', 'message': 'Error in Updating the Rate', customerId: 0, type: this.customerType };
            //  this.loggerService.info(this.logger);
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
        } else if ((this.pattern.test(formValue.volumeAmount)) || (this.pattern.test(formValue.volumeRefNum))) {
          // if ((formValue.nonVolumeRefNum !== '' && formValue.nonVolumeAmount !== '') && (formValue.nonVolumeRefNum !== null && formValue.nonVolumeAmount !== null)) {
          console.log('nonVolNumCheck');
          Swal.fire({
            title: 'Oops!',
            text: 'Please Check The Amount & Reference Number!',
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
              'salomonReferenceNumber': formValue.volumeRefNum,
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
                $('#notification-modal').modal('hide');
                this.getSalesRepDetails();
                Swal.fire({
                  title: 'Updated!',
                  text: 'Updated Amount Sucessfully!',
                  icon: 'success',
                });
                this.showForOperationTeam = false;
                this.upDateSuccess = true;
                //  this.logger = { 'method': 'updateAmount', 'message': 'Updating the Rate', customerId: 0, type: this.customerType };
                //  this.loggerService.info(this.logger);
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
              //  this.logger = { 'method': 'updateAmount', 'message': 'Error in Updating the Rate', customerId: 0, type: this.customerType };
              //  this.loggerService.info(this.logger);
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
      } else if ((this.pattern.test(formValue.volumeAmount)) || (this.pattern.test(formValue.volumeRefNum))) {
        // if ((formValue.volumeRefNum === null && formValue.volumeAmount === null) && (formValue.volumeRefNum === null && formValue.volumeAmount === null)) {
        Swal.fire({
          title: 'Oops!',
          text: 'Please Check The Amount & Reference Number!',
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
              'salomonReferenceNumber': formValue.volumeRefNum,
              'shipmentReadyDate': formValue.volumeReadyDate,
              'requestedDeliveryDate': formValue.volumeDeliveryDate
            };
          } else if (this.nonVolumeType === true) {
            this.updateAmount = {
              'quoteId': quoteId,
              'amount': formValue.nonVolumeAmount,
              'salomonReferenceNumber': formValue.nonVolumeRefNum,
              'shipmentReadyDate': formValue.nonVolumeReadyDate,
              'requestedDeliveryDate': formValue.nonVolumeDeliveryDate
            };
          }
          console.log('updateAmount', this.updateAmount);
          this.externalService.updateAmount(this.updateAmount).subscribe((data:any) => {
            console.log('responce', data);
            if (data.result === true) {
              console.log('updated Successfully', data.result);
              $('#notification-modal').modal('hide');
              this.getSalesRepDetails();
              Swal.fire({
                title: 'Updated!',
                text: 'Updated Amount Sucessfully!',
                icon: 'success',
              });
              this.showForOperationTeam = false;
              this.upDateSuccess = true;
              //     this.logger = { 'method': 'updateAmount', 'message': 'Updating the Rate', customerId: 0, type: this.customerType };
              //     this.loggerService.info(this.logger);
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
            //  this.logger = { 'method': 'updateAmount', 'message': 'Error in Updating the Rate', customerId: 0, type: this.customerType };
            //  this.loggerService.info(this.logger);
          });
        } else {
          //console.log('error',data.result);
          swal.fire({
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
      this.companyId = 0;
      //this.upDateSuccess = false;

    } else if (this.customerType === 'externalCustomer') {
      this.externalCustomer = localStorage.getItem(('SalesRepName'));
      this.externalCustomerParseData = JSON.parse(this.externalCustomer);
      console.log('this.externalCustomerParseData', this.externalCustomerParseData);
      this.accessToken = localStorage.getItem(('accessToken'));
      this.customerId = this.externalCustomerParseData.id;
      this.salesRepId = this.externalCustomerParseData.salesRepId;
      this.companyId = this.externalCustomerParseData.companyId;
      console.log('salesRepId', this.salesRepId);
      this.showAdminChatData = false;
      this.showForCustomer = true;
      this.externalTeam = true;
      this.operationTeam = false;
      this.showSideMenu = true;
      this.addressTemplateData();
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
        'consigneeCountry': form.consigneeCountry,
        'shippersBillOfLading': form.shippersBillOfLading,
'purchaseOrderNumber': form.purchaseOrderNumber,
'shipperIdNumber': form.shipperIdNumber,
'companyOpenTime': form.companyOpenTime,
'companyCloseTime': form.companyCloseTime
      };
    } else {
      acceptObject = {
        'quoteId': quoteId,
        'status': 'Accepted',
        'shippersBillOfLading': form.shippersBillOfLading,
'purchaseOrderNumber': form.purchaseOrderNumber,
'shipperIdNumber': form.shipperIdNumber,
'companyOpenTime': form.companyOpenTime,
'companyCloseTime': form.companyCloseTime
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
  checkForNumber(value:any, type:any) {
    let numberData = this.checkNumber(value);
    console.log('numberData', numberData);
    if (type === 'nonVolumeRefNum') {
      if (numberData !== '' && numberData !== null) {
        this.amountUpdate.patchValue({nonVolumeRefNum: numberData});
      } else if (numberData !== null) {
        console.log('value null');
        this.amountUpdate.patchValue({nonVolumeRefNum: ''});
      }
    } else if (type === 'nonVolumeAmount') {
      if (numberData !== '' && numberData !== null) {
        this.amountUpdate.patchValue({nonVolumeAmount: numberData});
      } else {
        this.amountUpdate.patchValue({nonVolumeAmount: ''});
      }
    } else if (type === 'volumeRefNum') {
      if (numberData !== '' && numberData !== null) {
        this.amountUpdate.patchValue({volumeRefNum: numberData});
      } else {
        this.amountUpdate.patchValue({volumeRefNum: ''});
      }
    } else if (type === 'volumeAmount') {
      if (numberData !== '' && numberData !== null) {
        this.amountUpdate.patchValue({volumeAmount: numberData});
      } else {
        this.amountUpdate.patchValue({volumeAmount: ''});
      }
    }
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

   /*
   *Getting the AP and AR data
   */
  getSalesData() {
    this.getApData();
    this.getArData();
  }
  /* Getting the AP and AR data from table*/
  getApData() {
    this.pricingInfoService.getApForm().subscribe(data => {
      this.listOfApValues = data;
      console.log('this.listOfValues');
      if (this.listOfApValues.length > 0) {
        const tableApData = JSON.stringify(this.listOfApValues);
        localStorage.setItem('aptableData', tableApData);
      } else {
      }
      this.logger = {
        'method': 'getApForm',
        'message': 'AP(discount,minimum charge, fuel charge)',
        'AP Data': 'Ap Full Data'
      };
      this.loggerService.info(this.logger);
    });
  }

  getArData() {
    this.pricingInfoService.getArForm().subscribe((data:any) => {
      this.listOfArValues = data;
      console.log('this.listOfValues');
      if (this.listOfArValues.length > 0) {
        const tableArData = JSON.stringify(this.listOfArValues);
        let t;
        t = [{'id': '3'}, {'id': '4'}, {'id': '5'}];
        let newone;
        newone = JSON.stringify(t);
        let p;
        p = JSON.parse(newone);
        localStorage.setItem('artableData', tableArData);
      } else {
      }
      this.logger = {
        'method': 'getArForm',
        'message': 'AR(discount,minimum charge, fuel charge)',
        'AP Data': 'Ar Full Data'
      };
      this.loggerService.info(this.logger);
    });
  }

  bookedStatus(quoteId:any, form:any, setControlNumber:any) {
    console.log('quoteId', quoteId, 'form', form, setControlNumber);
    let object:any;
    object = {
      'quoteId': quoteId,
      'status': 'Booked',
    'amount': form.amount,
 'salomonReferenceNumber': setControlNumber,
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

  fullTruckload(clickedData:any) {
    console.log('clickedData', clickedData);
    this.fulltruckloadFormUpdate.patchValue({shipperCompanyName: clickedData.shipperCompanyName,
      shipperContactName: clickedData.shipperContactName,
      consigneeCompany: clickedData.consigneeCompany,
      consigneeContactName: clickedData.consigneeContactName,
companyOpenTime: new Date(),
       companyCloseTime: new Date('17:00')});
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
    this.externalService.getTemplate(this.companyId, this.openType).subscribe((response:any) => {
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

}
