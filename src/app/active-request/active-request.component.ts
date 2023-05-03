import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ExternalService } from '../services/external.service';
import { PricingInfoService } from '../services/pricing-info.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoggerService } from '../services/logger.service';
// import swal from 'sweetalert';
import swal from 'sweetalert2'
import * as moment from 'moment';
declare var $: any;
// import { el } from '@angular/platform-browser/testing/src/browser_util';
// import { isNullOrUndefined } from 'util';
import Swal from 'sweetalert2';
// import { watchFile } from 'fs';
// import { isUndefined } from 'ngx-bootstrap/chronos/utils/type-checks';

@Component({
  selector: 'app-active-request',
  templateUrl: './active-request.component.html',
  styleUrls: ['./active-request.component.css']
})
export class ActiveRequestComponent implements OnInit, OnDestroy {
  searchForm: FormGroup = new FormGroup({});
  activeRequest: FormGroup = new FormGroup({});
  chatForm: FormGroup = new FormGroup({});
  chatHistoryForm: FormGroup = new FormGroup({});
  amountUpdate: FormGroup = new FormGroup({});
  quickieFormUpdate: FormGroup = new FormGroup({});
  bookedStatusUpdateForm: FormGroup = new FormGroup({});
  fulltruckloadFormUpdate: FormGroup = new FormGroup({});
  trackingForm: FormGroup = new FormGroup({});
  customItemTemplate:any =[];
  public fedex: any;
  setControlNumber:any;
  reason:any;
  public yrc:any;
  public reddaway:any;
  public emailRequest:any;
  public quoteId:any;
  public showActiveRequest = true;
  public showEmailId = false;
  public showSubjectNotes = false;
  public showOthers = false;
  public bolData: any;
  public clickIdData: any;
  public lineItem: any;
  public searchData: any;
  public completeForm: any;
  public externalCustomer: any;
  public externalCustomerParseData: any;
  public accessToken: any;
  public salesRepId: any;
  public customerType: any;
  public note: any;
  public p = 1;
  public weightTotal = 0;
  public piecesTotal = 0;
  public tableValues = false;
  public searchErrorMessage = false;
  public fullQuote = false;
  public quikeQuote = false;
  public hazmat: any;
  public nonVolumeType = false;
  public volumeType = false;
  public showChatHistoryTable = false;
  public showViewAllForm = false;
  public showAdminChatData = false;
  public showForOperationTeamBooked = false;
  public numberOfPages = [5, 10, 15];
  public numberPerPage = 0;
  public message:any;
  public displayName: any;
  public totalItems = 0;
  public selectPagination: any;
  public currentPage = 0;
  public chatObject = {};
  public customerMessage:any = [];
  public operationalTeamMessage:any = [];
  public rate: any;
  public showForOperationTeam = false;
  public showForCustomer = false;
  public quoteIdUpdate: any;
  public upDateSuccess = false;
  public forTruck = false;
  public forVolume = false;
  public forAir = false;
  public forOcean = false;
  public forOther = false;
  public acceptCustomerFlag = false;
  public bookedCustomerFlag = false;
  public showErrorMessage = false;
  public acceptData: any;
  public sendEmailForId : any;
  public showError : any;
  public volMinDate = new Date();
  public volMinDate2 = new Date();
  public nonVolMinDate = new Date();
  public nonVolMinDate2 = new Date();
  public updateAmount: any;
  public showLoader = false;
  public tableLoader = true;
  public showErrorCustomer = false;
  public showMailSentPopUp = false;
  public customerFeatures: any;
  public shipmentDate:any;
  public deliveryDate:any;
  public showMessageForDatePicker = false;
  public dateValidation = true;
  public declinedData: any;
  public formValue: any;
  public date: any;
  public customerId: any;
  public pattern = /^[a-zA-Z!@#$%^&*()_+\-=\[\]{};':'\\|,<>\/?]*$/;
  public externalTeam = false;
  public operationTeam = false;
  public showSideMenu = false;
  public showFillInformation = false;
  public preBolData: any;
  public shipperInput = false;
  public adminShipperInput = false;
  public showAllChat = false;
  public showMinChat = false;
  public showChat = true;
  public showConsigneeInformation = false;
  public showShipperInformation = false;
  public enableUpdateQuote = false;
  public shipperPhoneNumber:any;
  public consigneePhoneNumber:any;
  public logger:any;
  public interval:any;
  public quoteNumber:any;
  public customerInformationForChat: any;
  public adminTable = false;
  public userTable = false;
  public itemTemplatesPresent = false;
  public addressTemplatesPresent = false;
  public setMsgForControlNumber = false;
  public openType: any;
  public templateId: any;
  public addressTemplate: any;
  public itemTemplate: any;
  public addressTemplateAutoFill: any;
  public shipperTemplate:any = [];
  public consigneeTemplate:any = [];
  public shipperTemplatesPresent = false;
  public consigneeTemplatesPresent = false;
  public shipperTemplate1:any = [];
  public consigneeTemplate1:any = [];
  public amountUpdateAfterBook = false;
  public showforBooked = false;
  public salomonReferenceNumber: any;
  public showCancelOrder = false;
  public ismeridian: boolean = false;
  public companyId:any;
  public setSalesRepId:any;
  public messageReadResponce: any;
  public showForTracking = false;
  public trackingData: any;
  public mailResponse: any;
  public type:any;
  public specification = 'previousWeekData';
  public headerName:any;
  public trackFtlName = 'Track FTL';
  public activeQuoteName = 'Active Rate Quote Requests'
  constructor(private externalService: ExternalService, private fb: FormBuilder, private router: Router,
    private zone: NgZone,
    private loggerService: LoggerService,
    private pricingInfoService: PricingInfoService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      if (this.type === 'ftltrack') {
        this.headerName = this.trackFtlName;
      } else {
        this.headerName = this.activeQuoteName;
      }
    });
    this.localStorage();
  }

  ngOnInit() {
    this.interval = window.setInterval(() => {
      console.log('interval');
      this.localStorage();
    }, 60000);
    this.buildForm();
    window.scroll(0, 0);
    this.buildActiveRequestForm();
    this.getAllShipperName();
    if (this.customerType === 'admin') {
      this.adminShipperInput = true;
      this.shipperInput = false;
    } else {
      this.shipperInput = true;
      this.adminShipperInput = false;
    }
  }

  getAddressClickValues(id:any, type:any) {
    this.openType = 'addressId';
    this.externalService.getTemplate(id, this.openType).subscribe(response => {
      this.addressTemplate = response;      
      this.addressTemplateAutoFill = this.addressTemplate[0];
      if (type === 'shipperid') {
        this.shipperPhoneNumber = this.addressTemplateAutoFill.contactNumber;
        this.checkPhoneNumber(this.addressTemplateAutoFill.contactNumber, 'shipper');
        this.quickieFormUpdate.patchValue({
          shipperCompanyName: this.addressTemplateAutoFill.companyName,
          shipperContactName: this.addressTemplateAutoFill.contactName,
          shipperStreet1: this.addressTemplateAutoFill.street1,
          shipperStreet2: this.addressTemplateAutoFill.street2,
        });
      } else {
        this.consigneePhoneNumber = this.addressTemplateAutoFill.contactNumber;
        this.checkPhoneNumber(this.addressTemplateAutoFill.contactNumber, 'consignee');
        this.quickieFormUpdate.patchValue({
          consigneeCompany: this.addressTemplateAutoFill.companyName,
          consigneeContactName: this.addressTemplateAutoFill.contactName,
          consigneeStreet1: this.addressTemplateAutoFill.street1,
          consigneeStreet2: this.addressTemplateAutoFill.street2,
        });
      }
      this.addressTemplateData();
    });
  }
  itemTemplateData() {
    this.itemTemplatesPresent = false;
    this.openType = 'item';
    if (this.customerType === 'externalCustomer') {
      this.externalService.getTemplate(this.companyId, this.openType).subscribe(response => {
        this.itemTemplate = response;
        if (this.itemTemplate.length <= 0) {
          this.itemTemplatesPresent = true;
        }
      });
    } else {
      this.externalService.getTemplateForSalesRep(this.setSalesRepId, this.openType).subscribe(response => {
        this.itemTemplate = response;
        if (this.itemTemplate.length <= 0) {
          this.itemTemplatesPresent = true;
        }
      });
    }
  }
  addressTemplateData() {
    this.shipperTemplatesPresent = false;
    this.consigneeTemplatesPresent = false;
    this.shipperTemplate1 = [];
    this.consigneeTemplate1 = [];
    this.addressTemplatesPresent = false;
    this.openType = 'address';
    if (this.customerType === 'externalCustomer') {
      this.externalService.getTemplate(this.companyId, this.openType).subscribe((response : any) => {
        this.addressTemplate = response;
        for (let i = 0; i < this.addressTemplate.length; i++) {
          if (response[i].type === 'shipper') {
            this.shipperTemplate1.push(response[i]);
          } else if (response[i].type === 'consignee') {
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
      });
    } else {
      this.externalService.getTemplateForSalesRep(this.setSalesRepId, this.openType).subscribe((response:any) => {
        this.addressTemplate = response;
        for (let i = 0; i < this.addressTemplate.length; i++) {
          if (response[i].type === 'shipper') {
            this.shipperTemplate1.push(response[i]);
          } else if (response[i].type === 'consignee') {
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
      });
    }
  }
  retrieveAllData(type:any) {
    if (type === 'showAll') {
      this.specification = 'allData';
    } else {
      this.specification = 'previousWeekData';
    }
    if (this.customerType === 'admin') {
      this.tableData();
    } else {
      this.getCustomersRateQuote();
    }
  }
  localStorage() {
    this.customerType = localStorage.getItem(('customerType'));
    this.externalCustomer = localStorage.getItem(('SalesRepName'));
    this.externalCustomerParseData = JSON.parse(this.externalCustomer);
    this.templateId = this.externalCustomerParseData.id;
    this.accessToken = localStorage.getItem(('accessToken'));
    if (this.customerType === 'admin') {
      this.tableData();
      this.adminTable = true;
      this.userTable = false;
      this.showAdminChatData = true;
      this.operationTeam = true;
      this.externalTeam = false;
      this.accessToken = localStorage.getItem(('accessToken'));
      this.showSideMenu = false;
      this.companyId = 0;
      this.setSalesRepId = this.externalCustomerParseData.id;
    } else if (this.customerType === 'externalCustomer') {
      this.customerId = this.externalCustomerParseData.id;
      this.salesRepId = this.externalCustomerParseData.salesRepId;
      this.adminTable = false;
      this.userTable = true;
      this.showAdminChatData = false;
      this.showForCustomer = true;
      this.externalTeam = true;
      this.operationTeam = false;
      this.showSideMenu = true;
      this.companyId = this.externalCustomerParseData.companyId;
      this.setSalesRepId = 0;
      this.getCustomersRateQuote();
    }
    this.addressTemplateData();
    this.itemTemplateData();
  }

  getCustomersRateQuote() {
    this.tableLoader = true;
    let dt = new Date();
    dt.setDate(dt.getDate() - 7);
    let dateNew = moment(dt).format("YYYY-MM-DD");
    this.externalService.getRateQuote(this.companyId, this.accessToken, dateNew, this.type, this.specification).subscribe(data => {
      this.preBolData = data;
      for (let i = 0; i < this.preBolData.length; i++) {
        if (this.preBolData[i].salomonReferenceNumber === null) {
          this.preBolData[i].salomonReferenceNumber = 'Not Assigned';          
        }
        this.preBolData[i].createdOn = this.preBolData[i].createdOn.replace('Z', '');
      }
      this.bolData = this.preBolData;
      this.tableLoader = false;
      this.totalItems = this.bolData.length;
      if (this.totalItems > 10) {
        this.numberPerPage = 10;
      } else {
        this.numberPerPage = this.totalItems;
      }
      if (this.bolData.length > 0) {
        this.searchErrorMessage = false;
        this.tableValues = true;
      } else {
        this.searchErrorMessage = true;
        this.tableValues = false;
      }
      this.logger = { 'method': 'getRateQuote', 'message': 'Retrieving Customers rate quote as External customer' };
      this.loggerService.info(this.logger);
    }, err => {
      this.searchErrorMessage = true;
      this.tableValues = false;
      this.tableLoader = false;
      this.logger = {
        'method': 'getRateQuote', 'message': 'Retrieving Customers rate quote as External customer',
        customerId: this.customerId, type: this.customerType
      };
      this.loggerService.info(this.logger);
    });
  }

  refreshButtonCheck(form:any, type:any) {
    if (type === 'user') {
      this.submitSearch(form);
    } else if (type === 'admin') {
      if (form.quoteReferenceNumber === '' && form.shipperZip === '' && form.consigneeZip === '' && form.shipperCompanyName === '' && form.consigneeCompany === '' && form.status === '' && form.transportationType === '' && form.quoteType === '' &&
        form.shipmentType === '' && form.customerId === '' && form.salesRepId === '' && form.controlNumber === '') {
        this.tableData();
      } else {
        this.submitSearch(form);
      }
    }
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
    if (type === 'nonVolume') {
      if ((formValue.nonVolumeReadyDate !== '' && formValue.nonVolumeDeliveryDate !== '')) {
        if (this.deliveryDate < this.shipmentDate) {
          Swal.fire({
            title: 'Oops!',
            text: 'Please Enter the Shipment & Delivery Date Correctly!',
            icon: 'error'
                    });
        } else if ((this.pattern.test(formValue.nonVolumeAmount))) {
          Swal.fire({
            title: 'Oops!',
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
              'shipmentReadyDate': formValue.nonVolumeReadyDate,
              'requestedDeliveryDate': formValue.nonVolumeDeliveryDate
            };
            this.externalService.updateAmount(this.updateAmount).subscribe((data:any) => {
              if (data.result === true) {
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
              });
            }, (error:any) => {
              Swal.fire({
                title: 'Oops!',
                text: 'Updated Failed!',
                icon: 'error',
              });
              this.logger = { 'method': 'updateAmount', 'message': 'Error in Updating the Rate', customerId: 0, type: this.customerType };
              this.loggerService.info(this.logger);
            });
          } else {
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
        Swal.fire({
          title: 'Oops!',
          text: 'Please Check The Amount!',
          icon: 'error'
        });
      } else {
        if (formValue !== '') {
          this.showForOperationTeam = true;
          this.upDateSuccess = false;
          this.tableValues = true;
          if (this.volumeType === true) {
            this.updateAmount = {
              'quoteId': quoteId,
              'amount': formValue.volumeAmount,
              'shipmentReadyDate': formValue.volumeReadyDate,
              'requestedDeliveryDate': formValue.volumeDeliveryDate
            };
          } else if (this.nonVolumeType === true) {
            this.updateAmount = {
              'quoteId': quoteId,
              'amount': formValue.nonVolumeAmount,
              'shipmentReadyDate': formValue.nonVolumeReadyDate,
              'requestedDeliveryDate': formValue.nonVolumeDeliveryDate
            };
          }
          this.externalService.updateAmount(this.updateAmount).subscribe((data:any) => {
            if (data.result === true) {
              $('#rate-modal').modal('hide');
              this.localStorage();
              swal.fire({
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
              this.upDateSuccess = true;
            });
          }, (error: any) => {
            console.log('error', error);
            swal.fire({
              title: 'Oops!',
              text: 'Updated Failed!',
              icon: 'error',

            });
            this.logger = { 'method': 'updateAmount', 'message': 'Error in Updating the Rate', customerId: 0, type: this.customerType };
            this.loggerService.info(this.logger);
          });
        } else {
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
          Swal.fire({
            title: 'Oops!',
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
              'amount': formValue.volumeAmount,
              'shipmentReadyDate': formValue.volumeReadyDate,
              'requestedDeliveryDate': formValue.volumeDeliveryDate
            };
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
        Swal.fire({
          title: 'Oops!',
          text: 'Please Check The Amount!',
          icon: 'error'
        });
      } else {
        if (formValue !== '') {
          this.showForOperationTeam = true;
          this.upDateSuccess = false;
          this.tableValues = true;
          if (this.volumeType === true) {
            this.updateAmount = {
              'quoteId': quoteId,
              'amount': formValue.volumeAmount,
              'shipmentReadyDate': formValue.volumeReadyDate,
              'requestedDeliveryDate': formValue.volumeDeliveryDate
            };
          } else if (this.nonVolumeType === true) {
            this.updateAmount = {
              'quoteId': quoteId,
              'amount': formValue.nonVolumeAmount,
              'shipmentReadyDate': formValue.nonVolumeReadyDate,
              'requestedDeliveryDate': formValue.nonVolumeDeliveryDate
            };
          }
          this.externalService.updateAmount(this.updateAmount).subscribe((data:any) => {
            if (data.result === true) {
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
              this.upDateSuccess = true;
            });
          }, (error:any) => {
            Swal.fire({
              title: 'Oops!',
              text: 'Updated Failed!',
              icon: 'error',
            });
            this.logger = { 'method': 'updateAmount', 'message': 'Error in Updating the Rate', customerId: 0, type: this.customerType };
            this.loggerService.info(this.logger);
          });
        } else {
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
  }


  tableData() {
    this.tableLoader = true;
    let dt = new Date();
    dt.setDate(dt.getDate() - 7);
    let dateNew = moment(dt).format("YYYY-MM-DD");
    this.externalService.getActiveReq(dateNew, this.type).subscribe(
      data => {
        this.preBolData = data;
        for (let i = 0; i < this.preBolData.length; i++) {
          if (this.preBolData[i].salomonReferenceNumber === null) {
            this.preBolData[i].salomonReferenceNumber = 'Not Assigned';
          }
          this.preBolData[i].createdOn = this.preBolData[i].createdOn.replace('Z', '');
        }
        this.bolData = this.preBolData;
        this.tableLoader = false;
        this.totalItems = this.bolData.length;
        if (this.totalItems > 10) {
          this.numberPerPage = 10;
        } else {
          this.numberPerPage = this.totalItems;
        }
        if (this.bolData.length > 0) {
          this.tableValues = true;
        } else {
          this.searchErrorMessage = true;
          this.tableValues = false;
        }
        this.logger = { 'method': 'getActiveReq', 'message': 'Retrieving the Customers rate quote as admin', customerId: 0, type: this.customerType };
        this.loggerService.info(this.logger);
      }, err => {
        this.searchErrorMessage = true;
        this.tableValues = false;
        this.tableLoader = false;
        this.logger = {
          'method': 'getRateQuote', 'message': 'Retrieving Customers rate quote as External customer',
          customerId: this.customerId, type: this.customerType
        };
        this.loggerService.info(this.logger);
      }
    );
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
      notes: [''],
    });
    this.amountUpdate = this.fb.group({
      volumeAmount: ['', [Validators.required]],
      volumeReadyDate: [this.volMinDate, [Validators.required]],
      volumeDeliveryDate: [this.volMinDate2, [Validators.required]],
      nonVolumeAmount: ['', [Validators.required]],
      nonVolumeReadyDate: [this.nonVolMinDate, [Validators.required]],
      nonVolumeDeliveryDate: [this.nonVolMinDate2, [Validators.required]],
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
      shipperIdNumber: [''],
      companyOpenTime: [''],
      companyCloseTime: ['']

    });
    this.bookedStatusUpdateForm = this.fb.group({
      shipmentReadyDate: ['', Validators.required],
      requestedDeliveryDate: ['', Validators.required],
      amount: ['', Validators.required],
      controlNumber: ['']
    });
    this.fulltruckloadFormUpdate = this.fb.group({
      shipperCompanyName: ['', [Validators.required]],
      shipperContactName: ['', [Validators.required]],
      consigneeCompany: ['', Validators.required],
      consigneeContactName: [''],
      shippersBillOfLading: [''],
      purchaseOrderNumber: [''],
      shipperIdNumber: [''],
      companyOpenTime: [''],
      companyCloseTime: [new Date('17:00')]
    });
    this.trackingForm = this.fb.group({
      trackLink: ['', [Validators.required]],
      trackingNumber: ['', [Validators.required]]
    });

    if (this.type === 'ftltrack') {
      this.searchForm.patchValue({ status: 'Shipped' });
    } else {
      this.searchForm.patchValue({
        quoteReferenceNumber: '',
        shipperZip: '',
        consigneeZip: '',
        shipperCompanyName: '',
        consigneeCompany: '',
        status: '',
        transportationType: '',
        quoteType: '',
        shipmentType: '',
        customerId: '',
        salesRepId: '',
        controlNumber: ''
      });
    }
  }

  buildActiveRequestForm() {
    this.activeRequest = this.fb.group({
      fedex: [false],
      yrc: [false],
      reddaway: [false],
      othersCarrier: [false],
      others: [''],
      notes: [''],
    });
  }

  searchId(data:any, quoteReferenceNumber:any) {
    this.amountUpdateAfterBook = false;
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
    this.quoteIdUpdate = '';
    this.rate = '';
    this.weightTotal = 0;
    this.piecesTotal = 0;
    console.log(quoteReferenceNumber);
    this.quoteNumber = quoteReferenceNumber;
    this.quoteId = data.id;
    this.externalService.getClickVal(quoteReferenceNumber).subscribe((data:any) => {
      this.tableValues = true;
      this.clickIdData = data[0];
      this.logger = { 'method': 'getClickVal', 'message': 'Retrieving data for single quote', type: this.customerType, Quote: quoteReferenceNumber };
      this.loggerService.info(this.logger);
      if (this.clickIdData.salomonReferenceNumber === null || this.clickIdData.salomonReferenceNumber === undefined) {
        this.clickIdData.salomonReferenceNumber = 'Not Assigned';
      } else if (this.clickIdData.salomonReferenceNumber !== null && this.clickIdData.salomonReferenceNumber !== undefined) {
        this.salomonReferenceNumber = this.clickIdData.salomonReferenceNumber;
      }
      this.clickIdData.createdOn = this.clickIdData.createdOn.replace('Z', '');
      if (this.clickIdData.shipperPhone !== undefined && this.clickIdData.shipperPhone !== "" && this.clickIdData.shipperPhone !== null) {
        if (this.clickIdData.shipperPhone.length > 10) {
          this.shipperPhoneNumber = this.clickIdData.shipperPhone;
        } else {
          this.shipperPhoneNumber = this.clickIdData.shipperPhone;
          this.clickIdData.shipperPhone = this.formatPhoneNumber(this.clickIdData.shipperPhone);
        }
      }
      if (this.clickIdData.consigneePhone !== undefined && this.clickIdData.consigneePhone !== "" && this.clickIdData.consigneePhone !== null) {
        if (this.clickIdData.consigneePhone.length > 10) {
          this.consigneePhoneNumber = this.clickIdData.consigneePhone;
        } else {
          this.consigneePhoneNumber = this.clickIdData.consigneePhone;
          this.clickIdData.consigneePhone = this.formatPhoneNumber(this.clickIdData.consigneePhone);
        }
      }
      if (this.clickIdData.status === 'Rate Quote' && this.customerType === 'externalCustomer') {
        this.acceptCustomerFlag = true;
        let quoteID = this.clickIdData.id;
        this.externalService.quoteRead(quoteID, this.customerType).subscribe((data:any) => {
          this.messageReadResponce = data;
          if (this.messageReadResponce.result === true) {
            this.localStorage();
          }
        });
        if (this.clickIdData.quoteType === 'Quickie quote') {
          this.showFillInformation = true;
          this.shipperPhoneNumber = this.externalCustomerParseData.contactNumber;
          this.checkPhoneNumber(this.externalCustomerParseData.contactNumber, 'shipper')
          this.quickieFormUpdate.patchValue({
            shipperCompanyName: this.externalCustomerParseData.companyName,
            shipperContactName: this.externalCustomerParseData.customerName,
            shipperStreet1: this.externalCustomerParseData.address, companyCloseTime: new Date('17:00')
          });
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
        let quoteID = this.clickIdData.id;
        this.externalService.quoteRead(quoteID, this.customerType).subscribe((data:any) => {
          this.messageReadResponce = data;
          if (this.messageReadResponce.result === true) {
            this.localStorage();
          }
        });
      } else if (this.clickIdData.status === 'Booked') {
        if (this.clickIdData.shipmentReadyDate !== null) {
          let date = this.clickIdData.shipmentReadyDate.replace('Z', '');
          this.clickIdData.shipmentReadyDate = new Date(date);
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
        this.showforBooked = true;
        this.amountUpdateAfterBook = true;
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
        if (this.customerType === 'admin') {
          this.showForOperationTeam = true;
        } else {
          this.showForOperationTeam = false;
        }
        this.upDateSuccess = false;
      } else if (this.clickIdData.status === 'Accepted') {
        if (this.customerType === 'admin') {
          this.showForOperationTeamBooked = true;
          this.upDateSuccess = true;
          this.showConsigneeInformation = true;
          this.showShipperInformation = true;
          let quoteID = this.clickIdData.id;
          this.externalService.quoteRead(quoteID, this.customerType).subscribe((data:any) => {
            this.messageReadResponce = data;
            if (this.messageReadResponce.result === true) {
              this.localStorage();
            }
          });
          if (this.clickIdData.shipmentReadyDate !== null) {
            let date = this.clickIdData.shipmentReadyDate.replace('Z', '');
            this.clickIdData.shipmentReadyDate = new Date(date);
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
        }
      }
      if (this.customerType === 'admin' && this.clickIdData.status === 'Rate Request') {
        let quoteID = this.clickIdData.id;
        this.externalService.quoteRead(quoteID, this.customerType).subscribe((data:any) => {
          this.messageReadResponce = data;
          if (this.messageReadResponce.result === true) {
            this.localStorage();
          }
        });
      }
      if (this.customerType === 'admin' && this.clickIdData.status === 'Booked') {
        this.showForTracking = true;
      } else if (this.customerType === 'admin' && this.clickIdData.status === 'Shipped') {
        this.showForTracking = false;
        this.showCancelOrder = true;
      }
      if (this.customerType === 'externalCustomer' && this.clickIdData.status === 'Shipped') {
        let quoteID = this.clickIdData.id;
        this.externalService.quoteRead(quoteID, this.customerType).subscribe((data:any) => {
          this.messageReadResponce = data;
          if (this.messageReadResponce.result === true) {
            this.localStorage();
          }
        });
        this.showCancelOrder = true;
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
      for (let n = 0; n < this.lineItem.length; n++) {
        if (this.lineItem[n].hazMat === true) {
          this.hazmat = 'Required';
        } else {
          this.hazmat = 'Not Required';
        }
        this.weightTotal += Number(this.lineItem[n].Weight.Value);
        this.piecesTotal += Number(this.lineItem[n].Pieces);
      }
    }, (err:any) => {
      this.logger = { 'method': 'getClickVal', 'message': 'Error in retrieving  the data for quote', type: this.customerType, quote: quoteReferenceNumber };
      this.loggerService.info(this.logger);
    });
  }
  checkPhoneNumber(value:any, type:any) {
    let phoneNumber;
    phoneNumber = this.formatPhoneNumber(value);
    if (type === 'shipper') {
      this.shipperPhoneNumber = value;
      this.quickieFormUpdate.patchValue({ shipperPhone: phoneNumber });
    } else {
      this.consigneePhoneNumber = value;
      this.quickieFormUpdate.patchValue({ consigneePhone: phoneNumber });
    }
  }
  formatPhoneNumber(s:any) {
    let s2 = ('' + s).replace(/\D/g, '');
    let m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ')' + m[2] + '-' + m[3];
  }
  acceptQuote(quoteId:any, quoteType:any, form:any) {
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
        'consigneeCompany': form.consigneeCompany,
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
    this.externalService.acceptOrDecline(acceptObject).subscribe((data:any) => {
      this.acceptData = data;
      if (this.acceptData.result === true) {
        $('#rate-modal').modal('hide');
        this.localStorage();
        Swal.fire({
          title: 'Accepted!',
          text: 'Accepted Rate Sucessfully!',
          icon: 'success',
        });
        this.acceptCustomerFlag = false;
        this.logger = { 'method': 'acceptOrDecline', 'message': 'Updating the Status', type: this.customerType, object: acceptObject };
        this.loggerService.info(this.logger);
      } else {
        Swal.fire({
          title: 'Oops!',
          text: 'Failed to Accept!',
          icon: 'error'
        });
      }
    }, (err:any) => {
      this.logger = { 'method': 'acceptOrDecline', 'message': 'Error in Updating the Status', type: this.customerType, object: acceptObject };
      this.loggerService.error(this.logger);
    });
  }
  cancelStatus() {
    this.tableValues = true;
  }
  declineQuote(quoteId:any) {
    let acceptOrDecline = {
      'quoteId': quoteId,
      'status': 'Declined'
    };
    this.externalService.acceptOrDecline(acceptOrDecline).subscribe((data:any) => {
      this.declinedData = data;
      this.logger = { 'method': 'acceptOrDecline', 'message': 'Declining the Status', type: this.customerType, object: acceptOrDecline };
      this.loggerService.info(this.logger);
      if (this.declinedData.result === true) {
        $('#rate-modal').modal('hide');
        this.localStorage();
        swal.fire({
          title: 'Declined!',
          text: 'Declined Sucessfully!',
          icon: 'success',
        });
        this.acceptCustomerFlag = false;
      } else {
        Swal.fire({
          title: 'Oops!',
          text: 'Failed to Decline!',
          icon: 'error'
        });
      }
    }, (err:any) => {
      this.logger = { 'method': 'acceptOrDecline', 'message': 'Error in Decline the Status', type: this.customerType, object: acceptOrDecline };
      this.loggerService.info(this.logger);
    });
  }


  submitSearch(searchForm:any) {
    if (this.customerType === 'externalCustomer') {
      searchForm.customerId = this.customerId;
    }
    this.selectPagination = '';
    this.tableValues = false;
    this.searchErrorMessage = false;
    this.showLoader = true;
    if (this.type === 'ftltrack') {
      searchForm.status = 'Shipped';
    }
    this.completeForm = searchForm;
    this.externalService.getSearchData(this.completeForm).subscribe((data:any) => {      
      this.searchData = data;
      this.showLoader = false;
      if (this.searchData.result.length > 0) {
        this.searchData.result.sort((a:any, b:any) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
        this.bolData = this.searchData.result;
        console.log('bolData', this.bolData);
        this.tableValues = true;
      }
      for (let i = 0; i < this.bolData.length; i++) {
        if (this.bolData[i].salomonReferenceNumber === null) {
          this.bolData[i].salomonReferenceNumber = 'Not Assigned';
        }
        this.bolData[i].createdOn = this.bolData[i].createdOn.replace('Z', '');
      }
      this.totalItems = this.bolData.length;
      if (this.totalItems > 10) {
        this.numberPerPage = 10;
      } else {
        this.numberPerPage = this.totalItems;
      }
      if (this.searchData.result.length === 0) {
        this.searchErrorMessage = true;
        this.tableValues = false;
      } else if (this.searchData.result === false) {
        this.searchErrorMessage = true;
        this.tableValues = false;
      } else {
        this.tableValues = true;
      }
      this.logger = {
        'method': 'getSearchData', 'message': 'Searching the Data in Active request', type: this.customerType,
        searchData: this.completeForm
      };
      this.loggerService.info(this.logger);
    }, (error:any) => {
      console.log('error', error);
      if (error.error.status === 0) {
        this.searchErrorMessage = true;
        this.tableValues = false;
      }
      this.logger = { 'method': 'getSearchData', 'message': 'Error in searching the data', type: this.customerType, searchData: this.completeForm };
      this.loggerService.error(this.logger);
    });
  }

  clear() {
    this.selectPagination = '';
    this.clearSearchForm();
this.clearAmountUpdateForm();
    this.searchErrorMessage = false;
  }

  clearSearchForm() {
    this.searchForm.reset({
      'quoteReferenceNumber': '',
      'shipperZip': '',
      'consigneeZip': '',
      'shipperCompanyName': '',
      'consigneeCompany': '',
      'status': '',
      'transportationType': '',
      'quoteType': '',
      'shipmentType': '',
      'customerId': '',
      'salesRepId': '',
      'controlNumber': ''
    });
  }
  clearAmountUpdateForm() {
    this.amountUpdate.reset({
      'volumeReadyDate': '',
      'volumeDeliveryDate': '',
      'volumeAmount': '',
      'nonVolumeAmount': '',
      'nonVolumeReadyDate': '',
      'nonVolumeDeliveryDate': '',
    });
  }
  refresh() {
    this.tableValues = false;
    this.selectPagination = '';
    this.clearSearchForm();
    this.clearAmountUpdateForm();
    this.localStorage();
    this.searchErrorMessage = false;
  }

  selectedCarrier(value:any) {
    if (value === true) {
      this.showEmailId = true;
    } else {
      this.showEmailId = false;
    }
  }

  sendMail(id:any) {
    this.sendEmailForId = id;
    this.buildActiveRequestForm();
  }

  send(value:any) {
    this.showMailSentPopUp = false;
    this.showError = {};
    this.emailRequest = value;
    this.emailRequest.quoteId = this.sendEmailForId;
    if ((value.othersCarrier === false && value.yrc === false && value.reddaway === false && value.fedex === false) ||
      (value.othersCarrier === '' && value.yrc === '' && value.reddaway === '' && value.fedex === '')) {
      if (value.notes === '') {        
        this.showErrorMessage = true;
        this.showError = { name: 'carrier name and notes' };
      } else {
        this.showErrorMessage = true;
        this.showError = { name: 'carrier name' };
      }
    } else {
      if (value.othersCarrier === true) {
        if (value.others !== '' && value.notes !== '') {
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
          console.log('this.emailRequest value', value);
          this.showErrorMessage = true;
          this.showError = { name: 'Email and Notes' };
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
          this.showError = { name: 'Notes' };
        }
      }
    }
    if (value.fedex === true && value.yrc === true && value.reddaway === true && value.othersCarrier === true) {
      this.displayName = { name: 'Fedex, Yrc, Reddaway, Others' };
    } else if (value.fedex === true && value.yrc === true && value.reddaway === true) {
      this.displayName = { name: 'Fedex, Yrc, Reddaway' };
    } else if (value.fedex === true && value.yrc === true) {
      this.displayName = { name: 'Fedex, Yrc' };
    } else if (value.fedex === true) {
      this.displayName = { name: 'Fedex' };
    } else {
      this.displayName = { name: 'Reddaway' };
    }
  }

  cancel() {
    this.activeRequest.patchValue({ fedex: '', yrc: '', reddaway: '', others: '', notes: '', othersCarrier: '' });
    this.showEmailId = false;
  }

  selectRanges(selectPagination:any) {
    this.numberPerPage = Number(selectPagination);
  }

  viewAll() {
    this.quoteId = this.externalService.getQuoteId();
    this.getChatById(this.quoteNumber, this.quoteId, 'allchat');
  }

  backToActive() {
    this.showViewAllForm = false;
    this.showActiveRequest = true;
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

  getChatById(quoteNumber:any, id:any, identifier:any) {    
    let customerDetails:any = [];
    this.customerMessage = [];
    this.operationalTeamMessage = [];
    this.externalService.setQuoteId(this.quoteId);
    this.externalService.getParticularChat(quoteNumber).subscribe((response:any) => {
      this.message = response;
      this.logger = { 'method': 'getParticularChat', 'message': 'Retrieving chat by Id', type: this.customerType, customerId: id };
      this.loggerService.info(this.logger);
      let object;
      if (this.customerType === 'admin') {
        object = {
          "quoteId": id,
          "createdBy": "externalCustomer"
        }
      } else {
        object = {
          "quoteId": id,
          "createdBy": "admin"
        }
      }
      this.externalService.updateQuoteChat(object).subscribe((response:any) => {        
      });
      if (identifier === 'allchat') {
        if (this.message.length > 0) {
          for (let t = 0; t < this.message.length; t++) {
            this.message[t].createdOn = this.message[t].createdOn.replace('Z', '');
            if (this.customerFeatures !== null) {
              let customerId = this.message[t].customerId;
              customerDetails = this.customerFeatures.filter(function (el:any) {
                return el.id === customerId;
              });
            } else {
              customerDetails.push({ customerName: '', companyName: '' })
            }
            if (this.message[t].createdBy === 'externalCustomer') {
              let currentDate = new Date();
              let newDate = currentDate.toJSON();
              let date = this.message[t].createdOn;
              let date12 = date - Number(newDate);
              let data = {
                customerMessage: this.message[t].message,
                createdOn: this.message[t].createdOn,
                postedBy: customerDetails[0].customerName,
                companyName: customerDetails[0].companyName,
                id: this.message[t].id,
                image: false
              };
              this.customerMessage.push(data);
              console.log('this.customerMessage', this.customerMessage);
            }
            if (this.message[t].createdBy === 'admin') {
              let data = {
                customerMessage: this.message[t].message,
                createdOn: this.message[t].createdOn,
                postedBy: 'Forte Logistics',
                id: this.message[t].id,
                image: true
              };
              this.customerMessage.push(data);
            }
            this.customerMessage.sort((a:any, b:any) => b.id - a.id);
          }
        }
      } else if (identifier === 'quotechat') {
        if (this.message.length > 3) {
          if (this.message.length > 0) {
            for (let t = 0; t < this.message.length; t++) {
              let customerId = this.message[t].customerId;
              customerDetails = this.customerFeatures.filter(function (el:any) {
                return el.id === customerId;
              });
              this.message[t].createdOn = this.message[t].createdOn.replace('Z', '');
            }
            let i = this.message.length;
            i = i - 1;
            let r = i - 2;
            for (i - 1; r <= i; i--) {
              let customerId = this.message[i].customerId;
              customerDetails = this.customerFeatures.filter(function (el:any) {
                return el.id === customerId;
              });
              if (this.message[i].createdBy === 'externalCustomer') {
                let currentDate = new Date();
                let newDate = currentDate.toJSON();
                let date = this.message[i].createdOn;
                let date12 = date - Number(newDate);
                let data = {
                  customerMessage: this.message[i].message,
                  createdOn: this.message[i].createdOn,
                  postedBy: customerDetails[0].customerName,
                  companyName: customerDetails[0].companyName,
                  id: this.message[i].id,
                  image: false
                };
                this.customerMessage.push(data);
              }
              if (this.message[i].createdBy === 'admin') {
                let data = {
                  customerMessage: this.message[i].message,
                  createdOn: this.message[i].createdOn,
                  postedBy: 'Forte Logistics',
                  id: this.message[i].id,
                  image: true
                };
                this.customerMessage.push(data);                
              }
            }
            this.customerMessage.sort((a:any, b:any) => b.id - a.id);
          }
        } else {
          this.viewAll();
        }
      }
      this.showChatHistoryTable = true;
    }, (err:any) => {
      this.logger = { 'method': 'getChatMeassage', 'message': 'Error in retrieving chat', type: this.customerType, customerId: id };
      this.loggerService.error(this.logger);
    });
    this.showChat = true;
  }

  sendChat(message:any, identifier:any) {
    if (this.customerType === 'admin') {
      message.operationalTeamMessage = message.message;
      message.customerMessage = '';
    } else {
      message.customerMessage = message.message;
      message.operationalTeamMessage = '';
    }
    let currentDate1 = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });  
    message.createdOn = currentDate1;
    message.customerRateQuoteId = this.quoteId;
    this.externalService.setChatMessage(message).subscribe((response:any) => {
      this.getChatById(this.quoteNumber, this.quoteId, identifier);
      this.logger = { 'method': 'setChatMessage', 'message': 'chat messages', type: this.customerType, '': message };
      this.loggerService.info(this.logger);
    });
    this.chatForm.patchValue({
      message: ''
    });
    this.showChat = false;
  }


  sendChatMessage(form:any, identifier:any) {
    let object;
    let currentDate1 = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    if (this.customerType === 'admin') {
      object =
        {
          customerRateQuoteId: this.clickIdData.id,
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
        {
          customerRateQuoteId: this.clickIdData.id,
          customerId: this.customerId,
          quoteNumber: this.clickIdData.quoteReferenceNumber,
          message: form.message,
          read: false,
          createdBy: this.customerType,
          createdOn: currentDate1,
          id: 0
        }
    }
    this.externalService.setQuoteChat(object).subscribe((data:any) => {
      this.getChatById(this.quoteNumber, this.quoteId, identifier);
    });
    this.chatForm.patchValue({
      message: ''
    });
    this.showChat = false;
  }
  getData(value:any) {
    if (value === true) {
      this.showErrorCustomer = true;
      setTimeout(() => {
        this.showErrorCustomer = false;
        this.searchForm.patchValue({ shipperCompanyName: '' });
      }, 2000);
    } else {
      this.showErrorCustomer = false;
    }
  }

  getRatingNotes(id:any) {
    if (this.customerFeatures.length > 0) {
      for (let c = 0; c < this.customerFeatures.length; c++) {
        if (id === this.customerFeatures[c].id) {
        }
      }
    }
  }

  getAllShipperName() {
    this.externalService.getAllCustomerName(this.accessToken).subscribe(getCustomerData => {
      this.customerFeatures = getCustomerData;
    });
  }

  close() {
    this.showMailSentPopUp = false;
    $('#mail-modal').modal('hide');
    this.showEmailId = false;
    this.buildActiveRequestForm();
  }

  onValueChange(date:any, type:any) {    
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

  checkForNumber(value:any, type:any) {
    let numberData = this.checkNumber(value);
    if (type === 'nonVolumeAmount') {
      if (numberData !== '' && numberData !== null) {
        this.amountUpdate.patchValue({ nonVolumeAmount: numberData });
      } else {
        this.amountUpdate.patchValue({ nonVolumeAmount: '' });
      }
    }
    else if (type === 'volumeAmount') {
      if (numberData !== '' && numberData !== null) {
        this.amountUpdate.patchValue({ volumeAmount: numberData });
      } else {
        this.amountUpdate.patchValue({ volumeAmount: '' });
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
  setValues(value:any) {
    if (value === undefined) {
      this.setMsgForControlNumber = true;
    } else {
      this.setMsgForControlNumber = false;
    }

  }

  bookModal(setControlNumber:any) {
    if (setControlNumber !== undefined && setControlNumber !== "" && setControlNumber !== null) {
      this.setMsgForControlNumber = false;
    } else {
      this.setMsgForControlNumber = true;
    }
  }
  bookedStatus(quoteId:any, form:any, setControlNumber:any) {
    this.setMsgForControlNumber = false;
    if (form.controlNumber !== "" && form.controlNumber !== null && form.controlNumber !== undefined) {
      this.setMsgForControlNumber = false;
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
        this.acceptData = data;
        this.logger = { 'method': 'acceptOrDecline', 'message': 'Updating to booked status', type: this.customerType, object: object };
        this.loggerService.info(this.logger);
        if (this.acceptData.result === true) {
          $('#rate-modal').modal('hide');
          this.localStorage();
          Swal.fire({
            title: 'Booked!',
            text: 'Booked Sucessfully!',
            icon: 'success',
          });
          this.acceptCustomerFlag = false;
          this.salomonReferenceNumber = object.salomonReferenceNumber;
        } else {
          Swal.fire({
            title: 'Oops!',
            text: 'Failed to Book!',
            icon: 'error'
          });
        }
      }, (err:any) => {
        this.logger = { 'method': 'acceptOrDecline', 'message': 'Error in updating to booked status', type: this.customerType, object: object };
        this.loggerService.error(this.logger);
      });
    } else {
      this.setMsgForControlNumber = true;
    }
  }
  bookedStatusUpdate(quoteId:any, form:any) {
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
      this.acceptData = data;
      this.logger = { 'method': 'acceptOrDecline', 'message': 'Updating to booked status', type: this.customerType, object: object };
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
      } else {
        Swal.fire({
          title: 'Oops!',
          text: 'Failed to Updated!',
          icon: 'error'
        });
      }
    }, (err:any) => {
      this.logger = { 'method': 'acceptOrDecline', 'message': 'Error in updating to booked status', type: this.customerType, object: object };
      this.loggerService.error(this.logger);
    });
  }


  fullTruckload(clickedData:any) {
    this.fulltruckloadFormUpdate.patchValue({
      shipperCompanyName: clickedData.shipperCompanyName,
      shipperContactName: clickedData.shipperContactName,
      consigneeCompany: clickedData.consigneeCompany,
      consigneeContactName: clickedData.consigneeContactName,
      companyOpenTime: new Date(),
      companyCloseTime: new Date('17:00')
    });
  }
  cancelStatusUpdate(id:any, reason:any) {
    let object:any;
    object = {
      'quoteId': id,
      'status': 'Cancelled',
      'cancelledBy': this.customerType,
      'cancelReason': reason
    };
    this.externalService.acceptOrDecline(object).subscribe((data:any) => {
      this.acceptData = data;
      this.logger = { 'method': 'acceptOrDecline', 'message': 'Updating to booked status', type: this.customerType, object: object };
      this.loggerService.info(this.logger);
      if (this.acceptData.result === true) {
        $('#rate-modal').modal('hide');
        this.localStorage();
        Swal.fire({
          title: 'Cancelled!',
          text: 'Cancelled Sucessfully!',
          icon: 'success',
        });
        this.acceptCustomerFlag = false;
      } else {
        Swal.fire({
          title: 'Oops!',
          text: 'Failed to Cancel!',
          icon: 'error'
        });        
      }
    }, (err:any) => {
      this.logger = { 'method': 'acceptOrDecline', 'message': 'Error in updating to booked status', type: this.customerType, object: object };
      this.loggerService.error(this.logger);
    });
  }

  saveTrackingInfo(id:any, data:any) {
    let object:any;
    object = {
      "id": id,
      "trackingNumber": data.trackingNumber,
      "trackLink": data.trackLink
    }
    this.externalService.saveTrackingDetails(object).subscribe((response:any) => {
      this.trackingData = response;
      if (this.trackingData.result === true) {
        this.localStorage();
        Swal.fire({
          title: 'Tracking!',
          text: 'Tracking Number updated Sucessfully!',
          icon: 'success',
        });
        this.showForTracking = false;
        this.logger = { 'method': 'saveTrackingDetails', 'message': ' Updating the Tracking Number', type: this.customerType, object: object };
        this.loggerService.info(this.logger);
      } else {
        Swal.fire({
          title: 'Oops!',
          text: 'Failed to Update!',
          icon: 'error'
        });
      }
    });
  }

  sendMailOnTrack(id:any) {
    this.externalService.mailOnQuotetrack(id).subscribe((response:any) => {
      this.mailResponse = response;
      if (this.mailResponse.result === true) {
        Swal.fire({
          title: 'Mail!',
          text: 'Mail has been sent Sucessfully!',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: 'Oops!',
          text: 'Failed to send Mail!',
          icon: 'error'
        });
      }
    });
  }
  ngOnDestroy() {    
    window.clearInterval(this.interval);
  }
}
