import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PricingInfoService } from '../services/pricing-info.service';
import { DatePipe } from '@angular/common';
import { ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
// import { BsDatepickerConfig } from "ngx-bootstrap";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { setDate } from "ngx-bootstrap/chronos/utils/date-setters";
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { ExternalService } from '../services/external.service';
// import { ExternalService } from 'app/services/external.service';
declare var $: any;
// declare var html2canvas: any;
declare var pdfMake: any;
// import swal from 'sweetalert2';
import Swal from "sweetalert2"


@Component({
    selector: 'app-billofladingsummary',
    templateUrl: './billofladingsummary.component.html',
    styleUrls: ['./billofladingsummary.component.css']
})

export class BillofladingsummaryComponent implements OnInit, PipeTransform {
    @Pipe({
        name: 'datex'
    })
    pickupForm: FormGroup = new FormGroup({});
    public minDate = new Date();
    public billOfLadingValues: any;
    public yrcBillOfLadingResponse: any;
    public getZipCode: any;
    public completeForm: any;
    public YrcCity: any;
    img:any;
    public YrcState: any;
    public YrcErrorMessage = false;
    public showFedexResult = false;
    public showYrcResult = false;
    public arrayResp = false;
    public objectResp = false;
    public base64Data: any;
    public pickUpId: any;
    public pickupConfirmation: any;
    public YrcOut: any;
    public showPickUpConfirmation = false;
    public showPickUpConfirmationError = false;
    public showYrcError = false;
    public showPickUpYrcConfirmation = false;
    public fedExButton = false;
    public yrcButton = false;
    public ismeridian = false;
    public showPickUpReddawayConfirmation = false;
    public showReddawayError = false;
    public popUpYrc = true;
    public showReddawayResult = false;
    public pdfValue: any;
    //public detailArray = [];
    public totalPieces: any;
    public totalWeights: any;
    public createBillOfLading: any;
    public loading = false;
    public showErrorResponseFedex = false;
    public showCommonError = false;
    public showAddField = true;
    public showAddedValue = false;
    public bolService = false;
    public externalCustomerParseData: any;
    public externalCustomer: any;
    public contactNumber: any;
    public bsValue: Date = new Date();
    public d = new Date();
    public mytime: any;
    public showLoaderFedEx = false;
    public showLoaderYrc = false;
    public showLoaderReddaway = false;
    public showProNumber = false;
    public showTrackingNumber = false;
    public showReddawayNumber = false;
    public showForExternalCustomer = false;
    public customerType: any;
    public showReddawayErrorPickUpFailed = false;
    public showPickUpError = false;
    public invalidDateErrorMsg = false;
    public yrcPickUpNumber: any;
    public accessToken: any;
    public printLabelValue: any;
    public lineItemArray = [];
    public piecesCount = [];
    public palletCount = [];
    public othersCount = [];
    bolType: any;
    // removeClassification: any;
    // removeClassification: any;
    @ViewChild('content')
    content!: ElementRef;
    printData: any;
    showTracking!: boolean;
    showOthersTrackingNumber!: boolean;
    printCarrier: any;
    // public printData: any;
    // printCarrier: any;
    countForPrint = 0;
    // showTracking: boolean;
    // showTracking: boolean;
    printContent: any;
    bolPrint: any;
    printContent1: any;
    tableCount!: number;
    iterateData: any;
    printcontentLength: any;
    table:any = [];
    bolRequestLineItems: any;
    myBolTotalPallets!: number;
    myBolTotalPieces!: number;
    lineItemNewArray = [];
    removeClassification: any;
    classification: any;
    getRateCheck: any;
    specificPricing: any;

    constructor(private pricingInfoService: PricingInfoService, private fb: FormBuilder, private datePipe: DatePipe, private router: Router,
        private externalService: ExternalService, private bsDatepickerConfig: BsDatepickerConfig) {
        this.getBillOfLadingResponses();
        this.pricingInfoService.rateObservable.subscribe((data) => {
            console.log('data', data);
            this.getRateCheck = data;
        });
        this.pricingInfoService.pricingObservable.subscribe((res) => {
            console.log(res);
            this.specificPricing = res;
        })
    }

    ngOnInit() {
        this.buildForm();
        this.localStorageSalesData();
        this.setDate();
        window.scroll(0, 0);
    }

    setDate() {
        this.d.setHours(16);
        this.d.setMinutes(0);
        this.mytime = this.d;
    }

    localStorageSalesData() {
        this.externalCustomer = localStorage.getItem(('SalesRepName'));
        this.customerType = localStorage.getItem(('customerType'));
        this.accessToken = localStorage.getItem(('accessToken'));
        this.externalCustomerParseData = JSON.parse(this.externalCustomer);
        console.log('externalCustomerParseData', this.externalCustomerParseData);
        let address;

        if (this.customerType === 'admin') {
            this.showForExternalCustomer = false;
            if (this.billOfLadingValues.shipperPhoneNumber !== undefined && this.billOfLadingValues.shipperPhoneNumber !== null && this.billOfLadingValues.shipperPhoneNumber !== '') {
                if (this.billOfLadingValues.shipperPhoneNumber.length > 10) {
                    this.contactNumber = this.billOfLadingValues.shipperPhoneNumber;
                } else {
                    this.contactNumber = this.formatPhoneNumber(this.billOfLadingValues.shipperPhoneNumber);
                }
            }
            if (this.billOfLadingValues.shipperStreet2 !== '' && this.billOfLadingValues.shipperStreet2 !== null && this.billOfLadingValues.shipperStreet2 !== undefined) {
                address = this.billOfLadingValues.shipperStreet1 + ',' + this.billOfLadingValues.shipperStreet2;
                console.log('address street2', address);
            } else {
                address = this.billOfLadingValues.shipperStreet1;
            }
            this.pickupForm.patchValue({
                pickUpName: this.billOfLadingValues.shipperContactName,
                pickUpCompanyName: this.billOfLadingValues.shipperCompanyName,
                pickUpContactNumber: this.contactNumber,
                pickUpStreet: address,
                pickUpZip: this.billOfLadingValues.shipperPostalCode,
                pickUpStateProvinceCode: this.billOfLadingValues.shipperState,
                pickUpCity: this.billOfLadingValues.shipperCity,
                pickUpReadyTime: new Date(),
                companyClosingTime: new Date('16:00'),
                thirdPartyEmailAddress: 'operations@fortetlc.com'
            });
        } else {
            this.showForExternalCustomer = true;
            if (this.billOfLadingValues.shipperPhoneNumber !== undefined && this.billOfLadingValues.shipperPhoneNumber !== null &&
                this.billOfLadingValues.shipperPhoneNumber !== '') {
                if (this.billOfLadingValues.shipperPhoneNumber.length > 10) {
                    this.contactNumber = this.billOfLadingValues.shipperPhoneNumber;
                } else {
                    this.contactNumber = this.formatPhoneNumber(this.billOfLadingValues.shipperPhoneNumber);
                }
            }
            else {
                if (this.externalCustomerParseData.contactNumber !== undefined && this.externalCustomerParseData.contactNumber !== null && this.externalCustomerParseData.contactNumber !== '') {
                    if (this.externalCustomerParseData.contactNumber.length > 10) {
                        this.contactNumber = this.externalCustomerParseData.contactNumber;
                    } else {
                        this.contactNumber = this.formatPhoneNumber(this.externalCustomerParseData.contactNumber);
                    }
                }
            }
            if (this.billOfLadingValues.shipperStreet2 !== '' && this.billOfLadingValues.shipperStreet2 !== null && this.billOfLadingValues.shipperStreet2 !== undefined) {
                address = this.billOfLadingValues.shipperStreet1 + ',' + this.billOfLadingValues.shipperStreet2;
                console.log('address street2', address);
            } else {
                address = this.billOfLadingValues.shipperStreet1;
            }
            this.pickupForm.patchValue({
                pickUpName: this.billOfLadingValues.shipperContactName,
                pickUpCompanyName: this.billOfLadingValues.shipperCompanyName,
                pickUpContactNumber: this.contactNumber,
                pickUpStreet: address,
                pickUpZip: this.billOfLadingValues.shipperPostalCode,
                pickUpStateProvinceCode: this.billOfLadingValues.shipperState,
                pickUpCity: this.billOfLadingValues.shipperCity,
                pickUpReadyTime: new Date(),
                companyClosingTime: new Date('16:00'),
                thirdPartyEmailAddress: 'operations@fortetlc.com'
                // pickUpDate: new Date()
            });
        }
    }

    buildForm() {
        this.pickupForm = this.fb.group({
            pickUpDate: [this.minDate, [Validators.required]],
            pickUpZip: ['', [Validators.required, Validators.maxLength(6)]],
            pickUpName: ['', [Validators.required]],
            pickUpCompanyName: ['', [Validators.required]],
            pickUpContactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            pickUpStreet: ['', [Validators.required, Validators.minLength(2)]],
            pickUpCity: ['', [Validators.required, Validators.minLength(2)]],
            pickUpStateProvinceCode: ['', [Validators.required, Validators.minLength(2)]],
            pickUpCountryCode: ['US', [Validators.required]],
            pickUpReadyTime: ['', [Validators.required]],
            companyClosingTime: ['', [Validators.required]],
            bolId: this.pickUpId,
            emailAddress: ['', [Validators.required]],
            thirdPartyEmailAddress: ['', [Validators.required]],
            shipperName: ['', [Validators.required]],
            shipperEmail: ['', [Validators.required]],
            shipperPhone: ['', [Validators.required]],
        });
    }

    getBillOfLadingResponses() {
        this.bolService = false;
        this.billOfLadingValues = this.pricingInfoService.getBillOfLadingValues();
        this.pricingInfoService.setBillOfLadingValues(this.billOfLadingValues);
        console.log('this.billOfLadingValues', this.billOfLadingValues);
        if (this.billOfLadingValues.bolService === true) {
            this.bolService = true;
        } else if (this.billOfLadingValues.bolService === false) {
            this.bolService = false;
        }
        console.log('this.billOfLadingValues Summary', this.billOfLadingValues);
        if (this.billOfLadingValues.serviceType === 'FEDEX_FREIGHT_ECONOMY' ||
            this.billOfLadingValues.serviceType === 'FEDEX_FREIGHT_PRIORITY') {
            if (this.billOfLadingValues.lineItemsFormat !== undefined && this.billOfLadingValues.lineItemsFormat !== '' && this.billOfLadingValues.lineItemsFormat !== null) {
                this.billOfLadingValues.shipmentInformation = this.billOfLadingValues.lineItemsFormat;
            } else {
                this.billOfLadingValues.shipmentInformation = this.billOfLadingValues.lineItems;
            }
            this.base64Data = this.billOfLadingValues.pdfCode;
            this.pickUpId = this.billOfLadingValues.id;
            this.classTrimming();
            let carrier;
            carrier = this.billOfLadingValues.serviceType.replace('_', ' ');
            this.billOfLadingValues.serviceType = carrier.replace('_', ' ');
            this.showYrcResult = false;
            this.showReddawayResult = false;
            this.showFedexResult = true;
        } else if (this.billOfLadingValues.serviceType === 'YRC') {
            this.billOfLadingValues = this.billOfLadingValues;
            console.log('yrcResult', this.billOfLadingValues);
            if (this.billOfLadingValues.lineItemsFormat !== undefined && this.billOfLadingValues.lineItemsFormat !== '' && this.billOfLadingValues.lineItemsFormat !== null) {
                this.billOfLadingValues.shipmentInformation = this.billOfLadingValues.lineItemsFormat;
            } else {
                this.billOfLadingValues.shipmentInformation = this.billOfLadingValues.lineItems;
            }
            this.arrayResp = true;
            this.showYrcResult = true;
            this.pickUpId = this.billOfLadingValues.id;
            this.classTrimming();
        } else if (this.billOfLadingValues.serviceType === 'REDDAWAY') {
            if (this.billOfLadingValues.lineItemsFormat !== undefined && this.billOfLadingValues.lineItemsFormat !== '' && this.billOfLadingValues.lineItemsFormat !== null) {
                this.billOfLadingValues.shipmentInformation = this.billOfLadingValues.lineItemsFormat;
            } else {
                this.billOfLadingValues.shipmentInformation = this.billOfLadingValues.lineItems;
            }
            this.pickUpId = this.billOfLadingValues.id;
            this.classTrimming();
            this.showYrcResult = false;
            this.showFedexResult = false;
            this.showReddawayResult = true;
        } else {
            this.billOfLadingValues.serviceType = this.billOfLadingValues.otherServiceType;
            if (this.billOfLadingValues.lineItemsFormat !== undefined && this.billOfLadingValues.lineItemsFormat !== '' && this.billOfLadingValues.lineItemsFormat !== null) {
                this.billOfLadingValues.shipmentInformation = this.billOfLadingValues.lineItemsFormat;
            } else {
                this.billOfLadingValues.shipmentInformation = this.billOfLadingValues.lineItems;
            }
            this.pickUpId = this.billOfLadingValues.id;
            this.classTrimming();
            this.showYrcResult = false;
            this.showFedexResult = false;
            this.showReddawayResult = true;
        }
    }

    classTrimming() {
        let removeClassification;
        let classification;
        console.log('this.billOfLadingValues', this.billOfLadingValues);
        console.log('this.billOfLadingValues. lineItemsFormat', this.billOfLadingValues.lineItemsFormat);
        if (this.billOfLadingValues.lineItemsFormat !== undefined) {
            if (this.billOfLadingValues.lineItemsFormat.length > 0) {
                for (let c = 0; c < this.billOfLadingValues.lineItemsFormat.length; c++) {
                    if (this.billOfLadingValues.lineItemsFormat[c].bolType !== "Multi Classed Pallet") {
                        removeClassification = this.billOfLadingValues.lineItemsFormat[c].FreightClass.replace('CLASS_', '');
                        console.log('classification', removeClassification);
                        if (removeClassification.startsWith('0')) {
                            classification = removeClassification.replace('0', '');
                        } else {
                            classification = removeClassification;
                        }
                        if (classification.length > 2) {
                            this.billOfLadingValues.lineItemsFormat[c].FreightClass = classification.replace('_', '.');
                        } else {
                            this.billOfLadingValues.lineItemsFormat[c].FreightClass = classification;
                        }
                    }
                    if (this.billOfLadingValues.lineItemsFormat[c].bolType === "Multi Classed Pallet") {
                        if (this.billOfLadingValues.lineItemsFormat[c].newAddPieces.length > 0) {
                            for (let a = 0; a < this.billOfLadingValues.lineItemsFormat[c].newAddPieces.length; a++) {
                                // if (this.billOfLadingValues.lineItemsFormat[c].newAddPieces[a].FreightClass.length > 0) {
                                removeClassification = this.billOfLadingValues.lineItemsFormat[c].newAddPieces[a].FreightClass.replace('CLASS_', '');
                                console.log('classification', removeClassification);
                                if (removeClassification.startsWith('0')) {
                                    classification = removeClassification.replace('0', '');
                                } else {
                                    classification = removeClassification;
                                }
                                if (classification.length > 2) {
                                    this.billOfLadingValues.lineItemsFormat[c].newAddPieces[a].FreightClass = classification.replace('_', '.');
                                } else {
                                    this.billOfLadingValues.lineItemsFormat[c].newAddPieces[a].FreightClass = classification;
                                }
                            }
                            // }
                        }
                    }
                }

            }
        }
    }
    close() {
        console.log('close');
        this.pdfValue = {};
    }

    public pdf() {
        const doc:any = new jsPDF();
        const specialElementHandlers = {
            '#editor': function (element: any, renderer: any) {
                return true;
            }
        };
        // let content = this.content.nativeElement;
        doc.fromHTML($('#content').html(), 17, 17, {
            'width': 500,
            'elementHandlers': specialElementHandlers
        });
        //doc.save('sample-file.pdf');
    }
    datepatch() {
        this.billOfLadingValues.shipTimestamp = moment(this.billOfLadingValues.shipTimestamp).format('MM/DD/YYYY');
        let date = this.billOfLadingValues.shipTimestamp;
        console.log(date);
        this.pickupForm.patchValue({
            pickUpDate: date
        });
        this.invalidDate(date);
    }
    showswal() {
        Swal.fire({
            title: "Warning!",
            text: "Please re-create the BOL if you want to change these fields",
            icon: "success"
          });
    }
    invalidDate(pickUpDate: any) {
        this.invalidDateErrorMsg = false;
        console.log('invalid');
        if (pickUpDate === 'Invalid date') {
            this.invalidDateErrorMsg = true;
        } else {
            this.invalidDateErrorMsg = false;
        }
    }
    createPickup(pickupForm: any) {
        window.scroll(0, 0);
        this.showPickUpError = false;
        this.showYrcResult = false;
        this.showFedexResult = false;
        this.showReddawayResult = false;
        this.objectResp = false;
        this.arrayResp = false;
        this.showLoaderFedEx = false;
        this.showLoaderYrc = false;
        this.showLoaderReddaway = false;
        this.showReddawayErrorPickUpFailed = false;
        // this.popUpYrc = false;
        this.completeForm = pickupForm;
        console.log('this.completeForm', this.completeForm);
        console.log('this.externalCustomerParseData.customerName', this.externalCustomerParseData.customerName, this.billOfLadingValues.shipperContactName);
        if (this.billOfLadingValues.serviceType === 'YRC') {
            if (this.customerType !== 'admin') {

                if (this.billOfLadingValues.shipperContactName !== '' && this.billOfLadingValues.shipperContactName !== null && this.billOfLadingValues.shipperContactName !== undefined) {
                    this.completeForm.shipperName = this.billOfLadingValues.shipperContactName;
                } else {
                    this.completeForm.shipperName = this.externalCustomerParseData.customerName;
                }
                console.log('1');
            } else {

                if (this.billOfLadingValues.shipperContactName !== '' && this.billOfLadingValues.shipperContactName !== null && this.billOfLadingValues.shipperContactName !== undefined) {
                    this.completeForm.shipperName = this.billOfLadingValues.shipperContactName;
                } else {
                    if (this.completeForm.pickUpName !== '' && this.completeForm.pickUpName !== null && this.completeForm.pickUpName !== undefined) {
                        this.completeForm.shipperName = this.completeForm.pickUpName;
                    } else {

                        this.pricingInfoService.getSpecificCustomer(this.billOfLadingValues.customerId, this.accessToken).subscribe((response: any) => {
                            this.completeForm.shipperName = response[0].customerName;
                        });
                    }

                }
                console.log('2');
            }
            console.log('this.completeForm.shipperName final ', this.completeForm.shipperName);
            this.completeForm.shipperEmail = this.externalCustomerParseData.email;
            this.completeForm.shipperPhone = this.contactNumber;
            this.showLoaderYrc = true;
            // this.completeForm.pickUpDate = this.datePipe.transform(pickupForm.pickUpDate, 'MM/dd/yyyy');
            this.completeForm.pickUpDate = moment(pickupForm.pickUpDate).format('MM/DD/YYYY');
            this.completeForm.pickUpReadyTime = moment(pickupForm.pickUpReadyTime).format('HH:mm');
            this.completeForm.companyClosingTime = moment(pickupForm.companyClosingTime).format('HH:mm');
        } else if (this.billOfLadingValues.serviceType === 'REDDAWAY') {
            this.showLoaderReddaway = true;
            this.completeForm.pickUpContactNumber = this.completeForm.pickUpContactNumber.replace('(', '');
            this.completeForm.pickUpContactNumber = this.completeForm.pickUpContactNumber.replace(')', '');
            this.completeForm.pickUpContactNumber = this.completeForm.pickUpContactNumber.replace('-', '');
            this.completeForm.pickUpContactNumber = this.completeForm.pickUpContactNumber.replace(' ', '');
            this.completeForm.pickUpDate = moment(pickupForm.pickUpDate).format('YYYYMMDD');
            this.completeForm.pickUpDateFormat = moment(pickupForm.pickUpDate).format('MM/DD/YYYY')
            this.completeForm.pickUpReadyTime = moment(pickupForm.pickUpReadyTime).format('HHmmss');
            this.completeForm.companyClosingTime = moment(pickupForm.companyClosingTime).format('HH:mm');
        } else if (this.billOfLadingValues.serviceType === 'FEDEX FREIGHT ECONOMY' || this.billOfLadingValues.serviceType === 'FEDEX FREIGHT PRIORITY') {
            this.showLoaderFedEx = true;
            // this.completeForm.pickUpReadyTime = this.datePipe.transform(pickupForm.pickUpReadyTime, 'HH:mm:ss');
            this.completeForm.pickUpReadyTime = moment(pickupForm.pickUpReadyTime).format('HH:mm:ss');
            console.log("formatReadyTime", this.completeForm.pickUpReadyTime);
            console.log('format', pickupForm.pickUpDate);
            this.completeForm.pickUpDate = moment(pickupForm.pickUpDate).format('YYYY-MM-DD');
            console.log('format1', this.completeForm.pickUpDate);
            this.completeForm.pickUpDate = this.completeForm.pickUpDate + 'T' + this.completeForm.pickUpReadyTime + '-05:00';
            // this.completeForm.companyClosingTime = this.datePipe.transform(pickupForm.companyClosingTime, 'HH:mm:ss');
            this.completeForm.companyClosingTime = moment(pickupForm.companyClosingTime).format('HH:mm');
            console.log('formatCloseTime', this.completeForm.companyClosingTime);
        }
        console.log('pickUpForm', this.completeForm);
        this.pricingInfoService.getPickUpId(this.completeForm).subscribe((data: any) => {
            console.log('data', data);
            console.log('serviceType', this.billOfLadingValues.serviceType);
            this.pickupConfirmation = data;
            this.showLoaderFedEx = false;
            this.showLoaderYrc = false;
            this.showLoaderReddaway = false;
            if (this.billOfLadingValues.serviceType === 'FEDEX FREIGHT ECONOMY' || this.billOfLadingValues.serviceType === 'FEDEX FREIGHT PRIORITY') {
                if (this.pickupConfirmation.result.Notifications !== undefined) {
                    if (this.pickupConfirmation.result.Notifications[0].Severity === 'SUCCESS') {
                        this.showPickUpConfirmation = true;
                        this.showPickUpConfirmationError = false;
                        this.billOfLadingValues = {};
                        this.pricingInfoService.setBillOfLadingValues(this.billOfLadingValues);
                        this.billOfLadingValues = this.pricingInfoService.getBillOfLadingValues();
                        let createBol = {};
                        this.pricingInfoService.setBolQuoteId(createBol);
                        console.log('Destroyed BOL Summary Val', this.billOfLadingValues);
                        window.scroll(0, 0);
                    } else {
                        this.showPickUpConfirmationError = true;
                        this.showPickUpConfirmation = false;
                        window.scroll(0, 0);
                    }
                } else {
                    this.showPickUpConfirmationError = true;
                    this.showPickUpConfirmation = false;
                    window.scroll(0, 0);
                }
            } else if (this.billOfLadingValues.serviceType === 'YRC') {
                if (this.pickupConfirmation.result.isSuccess === true) {
                    this.showYrcError = false;
                    this.showPickUpYrcConfirmation = true;
                    if (this.pickupConfirmation.result.referenceIds.length > 1) {
                        this.yrcPickUpNumber = this.pickupConfirmation.result.referenceIds[0] + ',' + this.pickupConfirmation.result.referenceIds[1];
                    } else if (this.pickupConfirmation.result.referenceIds.length === 1) {
                        this.yrcPickUpNumber = this.pickupConfirmation.result.referenceIds[0];
                    } else {
                        this.yrcPickUpNumber = "";
                    }
                    this.billOfLadingValues = {};
                    this.pricingInfoService.setBillOfLadingValues(this.billOfLadingValues);
                    this.billOfLadingValues = this.pricingInfoService.getBillOfLadingValues();
                    let createBol = {};
                    this.pricingInfoService.setBolQuoteId(createBol);
                    console.log('Destroyed BOL Summary Val', this.billOfLadingValues);
                    window.scroll(0, 0);
                } else {
                    this.showPickUpYrcConfirmation = false;
                    this.showYrcError = true;
                    this.YrcOut = 'Internal Server Error';
                    window.scroll(0, 0);
                }
            } else if (this.billOfLadingValues.serviceType === 'REDDAWAY') {
                if (this.pickupConfirmation.result === 'Reddaway Pickup') {
                    this.showReddawayErrorPickUpFailed = true;
                }
                else if (this.pickupConfirmation.result.PICKUPREQUESTRESPONSE.STATUS.CODE === '0') {
                    this.showPickUpReddawayConfirmation = true;
                    this.showReddawayError = false;
                    this.billOfLadingValues = {};
                    this.pricingInfoService.setBillOfLadingValues(this.billOfLadingValues);
                    this.billOfLadingValues = this.pricingInfoService.getBillOfLadingValues();
                    let createBol = {};
                    this.pricingInfoService.setBolQuoteId(createBol);
                    console.log('Destroyed BOL Summary Val', this.billOfLadingValues);
                    window.scroll(0, 0);
                } else {
                    this.showReddawayError = true;
                    this.showPickUpReddawayConfirmation = false;
                    window.scroll(0, 0);
                }
            }
        }, (err: any) => {
            this.showPickUpError = true;
            this.showYrcResult = false;
            this.showFedexResult = false;
            this.showReddawayResult = false;
            this.objectResp = false;
            this.arrayResp = false;
            this.showLoaderFedEx = false;
            this.showLoaderYrc = false;
            this.showLoaderReddaway = false;
            this.showReddawayErrorPickUpFailed = false;
        });
    }

    // printLabel(billOfLading) {
    //     this.printLabelValue = this.pricingInfoService.getBillOfLadingValues(); 
    // }

    public export(billOfLading: any) {
        this.pdfValue = this.pricingInfoService.getBillOfLadingValues();
        console.log('this.pdfValue', this.pdfValue);
        console.log('this.pdfValue', this.pdfValue.lineItemsFormat);
        if (this.billOfLadingValues.lineItemsFormat !== undefined && this.billOfLadingValues.lineItemsFormat !== '' && this.billOfLadingValues.lineItemsFormat !== null) {
            this.pdfValue.lineItemsFormat = this.pdfValue.lineItemsFormat;
        } else {
            this.pdfValue.lineItemsFormat = this.pdfValue.lineItems;
        }
        this.totalPieces = 0;
        this.totalWeights = 0;
        this.showTrackingNumber = false;
        this.showProNumber = false;
        this.pdfValue.previewTotalPallets = 0;
        this.pdfValue.previewTotalPieces = 0;
        this.pdfValue.specificPricing = this.specificPricing;
        if (this.pdfValue.accessorials !== undefined) {
            if (this.pdfValue.accessorials.length > 0) {
                this.pdfValue.accessorials = this.pdfValue.accessorials;
                this.pdfValue.accessorials.forEach((element: any, index: any) => {
               if (element.includes('Delivery Appointment Required')) {
                   this.pdfValue.accessorials.splice(index,1);
               }
                });
            } else {
                this.pdfValue.accessorials = '';
            }
        } else {
            this.pdfValue.accessorials = '';
        }
        if (this.pdfValue.pickupDate !== '' && this.pdfValue.pickupDate !== null && this.pdfValue.pickupDate !== undefined) {
            // let pickData = moment(this.pdfValue.pickUpDate).format('MM/DD/YYYY');
            this.pdfValue.pickupDate = this.pdfValue.pickupDate;
        } else {
            let pickData = moment(this.pdfValue.shipTimestamp).format('MM/DD/YYYY');
            this.pdfValue.pickupDate = this.pdfValue.shipTimestamp;
        }
        if (this.pdfValue.billPaidTo === undefined) {
            this.pdfValue.billPaidTo = { name: 'Third Party', companyName: 'Forte', city: 'Fife', state: 'WA', zip: '98424', address: '301 54th Ave. E.Ste 200' }
        } else if (this.pdfValue.billPaidTo.name === 'BILLTOFORTE') {
            this.pdfValue.billPaidTo = { name: 'to Forte', companyName: 'Forte', city: 'Fife', state: 'WA', zip: '98424', address: '301 54th Ave. E.Ste 200' }
        } else if (this.pdfValue.billPaidTo.name === 'THIRDPARTY') {
            this.pdfValue.billPaidTo = { name: 'Third Party', companyName: this.pdfValue.billPaidTo.companyName, city: this.pdfValue.billPaidTo.city, state: this.pdfValue.billPaidTo.state, zip: this.pdfValue.billPaidTo.zip, address: this.pdfValue.billPaidTo.address };
        } else if (this.pdfValue.billPaidTo.name === 'PREPAY') {
            this.pdfValue.billPaidTo = { name: 'Prepaid', companyName: this.pdfValue.billPaidTo.companyName, city: this.pdfValue.billPaidTo.city, state: this.pdfValue.billPaidTo.state, zip: this.pdfValue.billPaidTo.zip, address: this.pdfValue.billPaidTo.address };
        } else if (this.pdfValue.billPaidTo.name === 'COLLECT') {
            this.pdfValue.billPaidTo = { name: 'Collect', companyName: this.pdfValue.billPaidTo.companyName, city: this.pdfValue.billPaidTo.city, state: this.pdfValue.billPaidTo.state, zip: this.pdfValue.billPaidTo.zip, address: this.pdfValue.billPaidTo.address };
        } else {
            this.pdfValue.billPaidTo = { name: 'Third Party', companyName: 'Forte', city: 'Fife', state: 'WA', zip: '98424', address: '301 54th Ave. E.Ste 200' }
        }
        console.log('thid.pdfValue final', this.pdfValue);
        for (let i = 0; i < this.pdfValue.lineItemsFormat.length; i++) {
            console.log(this.pdfValue.lineItemsFormat[i].shipmentType);
            if (this.pdfValue.lineItemsFormat[i].shipmentType === 'Multi Classed Pallet') {
                this.totalPieces += Number(this.pdfValue.lineItemsFormat[i].HandlingUnitQuantity);
                if (this.pdfValue.lineItemsFormat[i].HandlingUnitType === 'PLT' || this.pdfValue.lineItemsFormat[i].HandlingUnitType === 'PALLET' || this.pdfValue.lineItemsFormat[i].HandlingUnitType === 'Pallets') {
                    this.pdfValue.previewTotalPallets += Number(this.pdfValue.lineItemsFormat[i].HandlingUnitQuantity);
                }
                for (let a = 0; a < this.pdfValue.lineItemsFormat[i].newAddPieces.length; a++) {
                    this.pdfValue.previewTotalPieces += Number(this.pdfValue.lineItemsFormat[i].newAddPieces[a].Pieces);
                    this.totalWeights += Number(this.pdfValue.lineItemsFormat[i].newAddPieces[a].Weight.Value);

                }
            } else if (this.pdfValue.lineItemsFormat[i].shipmentType === 'Itemized') {
                this.totalPieces += Number(this.pdfValue.lineItemsFormat[i].HandlingUnitQuantity);
                if (this.pdfValue.lineItemsFormat[i].HandlingUnitType === 'PLT' || this.pdfValue.lineItemsFormat[i].HandlingUnitType === 'PALLET' || this.pdfValue.lineItemsFormat[i].HandlingUnitType === 'Pallets') {
                    this.pdfValue.previewTotalPallets += Number(this.pdfValue.lineItemsFormat[i].HandlingUnitQuantity);
                    this.totalWeights += Number(this.pdfValue.lineItemsFormat[i].Weight.Value);

                }
                console.log(this.pdfValue.lineItemsFormat[i]);
                for (let a = 0; a < this.pdfValue.lineItemsFormat[i].newAddPieces.length; a++) {
                    this.pdfValue.previewTotalPieces += Number(this.pdfValue.lineItemsFormat[i].newAddPieces[a].Pieces);
                }
            } else {
                this.totalPieces += Number(this.pdfValue.lineItemsFormat[i].HandlingUnitQuantity);
                if (this.pdfValue.lineItemsFormat[i].HandlingUnitType === 'PLT' || this.pdfValue.lineItemsFormat[i].HandlingUnitType === 'PALLET' || this.pdfValue.lineItemsFormat[i].HandlingUnitType === 'Pallets') {
                    this.pdfValue.previewTotalPallets += Number(this.pdfValue.lineItemsFormat[i].HandlingUnitQuantity);
                    this.totalWeights += Number(this.pdfValue.lineItemsFormat[i].Weight.Value);

                }
                this.pdfValue.previewTotalPieces += Number(this.pdfValue.lineItemsFormat[i].PackageQuantity);

            }
            // this.totalWeights += Number(this.pdfValue.lineItemsFormat[i].Weight.Value);
        }

        if (this.pdfValue.serviceType === "YRC") {
            if (this.billOfLadingValues.proNumber !== undefined && this.billOfLadingValues.proNumber !== null && this.billOfLadingValues.proNumber !== "") {
                this.showProNumber = true;
            } else {
                this.showProNumber = false;
            }
            console.log('billOfLadingValues');
            console.log('billOfLading', this.pdfValue.lineItemsFormat);
            // let removeClassification;
            // let classification;
            if (this.pdfValue.lineItemsFormat.length > 0) {
                for (let c = 0; c < this.pdfValue.lineItemsFormat.length; c++) {
                    if (this.pdfValue.lineItemsFormat[c].bolType === 'Non Itemized') {
                        this.removeClassification = this.pdfValue.lineItemsFormat[c].FreightClass.replace('CLASS_', '');
                        console.log('classification', this.removeClassification);
                        if (this.removeClassification.startsWith('0')) {
                            this.classification = this.removeClassification.replace('0', '');
                        } else {
                            this.classification = this.removeClassification;
                        }
                        if (this.classification.length > 2) {
                            this.pdfValue.lineItemsFormat[c].FreightClass = this.classification.replace('_', '.');
                        } else {
                            this.pdfValue.lineItemsFormat[c].FreightClass = this.classification;
                        }
                        // this.totalWeights += Number(this.pdfValue.lineItemsFormat[c].Weight.Value);
                        // this.pdfValue.previewTotalPieces += Number(this.pdfValue.lineItemsFormat[c].PackageQuantity);
                    } else if (this.pdfValue.lineItemsFormat[c].bolType === "Multi Classed Pallet") {
                        if (this.pdfValue.lineItemsFormat[c].newAddPieces.length > 0) {
                            for (let a = 0; a < this.pdfValue.lineItemsFormat[c].newAddPieces.length; a++) {
                                if (this.pdfValue.lineItemsFormat[c].newAddPieces[a].FreightClass.length > 0) {
                                    this.removeClassification = this.pdfValue.lineItemsFormat[c].newAddPieces[a].FreightClass.replace('CLASS_', '');
                                    console.log('classification', this.removeClassification);
                                    if (this.removeClassification.startsWith('0')) {
                                        this.classification = this.removeClassification.replace('0', '');
                                    } else {
                                        this.classification = this.removeClassification;
                                    }
                                    if (this.classification.length > 2) {
                                        this.pdfValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification.replace('_', '.');
                                    } else {
                                        this.pdfValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification;
                                    }
                                    // this.totalWeights += Number(this.pdfValue.lineItemsFormat[c].newAddPieces[a].Weight.Value);
                                    // this.pdfValue.previewTotalPieces += Number(this.pdfValue.lineItemsFormat[c].newAddPieces[a].PackageQuantity);
                                }
                            }
                        }
                    } else if (this.pdfValue.lineItemsFormat[c].bolType === "Itemized") {
                        if (this.pdfValue.lineItemsFormat[c].newAddPieces.length > 0) {
                            for (let a = 0; a < this.pdfValue.lineItemsFormat[c].newAddPieces.length; a++) {
                                if (this.pdfValue.lineItemsFormat[c].newAddPieces[a].FreightClass.length > 0) {
                                    this.removeClassification = this.pdfValue.lineItemsFormat[c].newAddPieces[a].FreightClass.replace('CLASS_', '');
                                    console.log('classification', this.removeClassification);
                                    if (this.removeClassification.startsWith('0')) {
                                        this.classification = this.removeClassification.replace('0', '');
                                    } else {
                                        this.classification = this.removeClassification;
                                    }
                                    if (this.classification.length > 2) {
                                        this.pdfValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification.replace('_', '.');
                                    } else {
                                        this.pdfValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification;
                                    }
                                    // this.totalWeights += Number(this.pdfValue.lineItemsFormat[c].newAddPieces[a].Weight.Value);
                                    // this.pdfValue.previewTotalPieces += Number(this.pdfValue.lineItemsFormat[c].newAddPieces[a].PackageQuantity);
                                }
                            }
                        }
                    }

                }
            }
            this.pdfValue.thirdPartyCity = 'Fife';
            this.pdfValue.thirdPartyCompanyName = 'Forte';
            this.pdfValue.thirdPartyPostalCode = '98424';
            this.pdfValue.thirdPartyState = 'WA';
            this.pdfValue.thirdPartyStreet = '301 54TH AVE. E., SUITE 200';
        } else if (this.pdfValue.serviceType !== 'YRC' && this.pdfValue.serviceType !== 'FEDEX FREIGHT ECONOMY' &&
            this.pdfValue.serviceType !== 'FEDEX FREIGHT PRIORITY' && this.pdfValue.serviceType !== 'REDDAWAY') {
            console.log('console others');
            this.pdfValue.serviceType = this.pdfValue.otherServiceType;
            this.pdfValue.thirdPartyCity = '';
            this.pdfValue.thirdPartyCompanyName = '';
            this.pdfValue.thirdPartyPostalCode = '';
            this.pdfValue.thirdPartyState = '';
            this.pdfValue.thirdPartyStreet = '';
        } else {
            this.pdfValue.thirdPartyCity = 'Fife';
            this.pdfValue.thirdPartyCompanyName = 'Forte';
            this.pdfValue.thirdPartyPostalCode = '98424';
            this.pdfValue.thirdPartyState = 'WA';
            this.pdfValue.thirdPartyStreet = '301 54TH AVE. E., SUITE 200';
            if (this.pdfValue.serviceType === 'FEDEX FREIGHT ECONOMY' && this.pdfValue.trackingNumber !== null && this.pdfValue.trackingNumber !== '' && this.pdfValue.trackingNumber !== undefined) {
                this.showTrackingNumber = true;
            } else if (this.pdfValue.serviceType === 'FEDEX FREIGHT PRIORITY' && this.pdfValue.trackingNumber !== null && this.pdfValue.trackingNumber !== '' && this.pdfValue.trackingNumber !== undefined) {
                this.showTrackingNumber = true;
            } else {
                this.showTrackingNumber = false;
            }
            console.log('this.showTrackingNumber', this.showTrackingNumber);
            if (this.pdfValue.serviceType === 'REDDAWAY' && this.pdfValue.bolService === true) {
                this.showReddawayNumber = true;
            } else {
                this.showReddawayNumber = false;
            }
            // if (this.pdfValue.lineItemsFormat.length > 0) {
                for (let c = 0; c < this.pdfValue.lineItemsFormat.length; c++) {
                    if (this.pdfValue.lineItemsFormat[c].bolType === 'Non Itemized') {
                        this.removeClassification = this.pdfValue.lineItemsFormat[c].FreightClass.replace('CLASS_', '');
                        console.log('classification', this.removeClassification);
                        if (this.removeClassification.startsWith('0')) {
                            this.classification = this.removeClassification.replace('0', '');
                        } else {
                            this.classification = this.removeClassification;
                        }
                        if (this.classification.length > 2) {
                            this.pdfValue.lineItemsFormat[c].FreightClass = this.classification.replace('_', '.');
                        } else {
                            this.pdfValue.lineItemsFormat[c].FreightClass = this.classification;
                        }
                        // this.totalWeights += Number(this.pdfValue.lineItemsFormat[c].Weight.Value);
                        // this.pdfValue.previewTotalPieces += Number(this.pdfValue.lineItemsFormat[c].PackageQuantity);
                    } else if (this.pdfValue.lineItemsFormat[c].bolType === "Multi Classed Pallet") {
                        if (this.pdfValue.lineItemsFormat[c].newAddPieces.length > 0) {
                            for (let a = 0; a < this.pdfValue.lineItemsFormat[c].newAddPieces.length; a++) {
                                if (this.pdfValue.lineItemsFormat[c].newAddPieces[a].FreightClass.length > 0) {
                                    this.removeClassification = this.pdfValue.lineItemsFormat[c].newAddPieces[a].FreightClass.replace('CLASS_', '');
                                    console.log('classification', this.removeClassification);
                                    if (this.removeClassification.startsWith('0')) {
                                        this.classification = this.removeClassification.replace('0', '');
                                    } else {
                                        this.classification = this.removeClassification;
                                    }
                                    if (this.classification.length > 2) {
                                        this.pdfValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification.replace('_', '.');
                                    } else {
                                        this.pdfValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification;
                                    }
                                    // this.totalWeights += Number(this.pdfValue.lineItemsFormat[c].newAddPieces[a].Weight.Value);
                                    // this.pdfValue.previewTotalPieces += Number(this.pdfValue.lineItemsFormat[c].newAddPieces[a].PackageQuantity);
                                }
                            }
                        }
                    } else if (this.pdfValue.lineItemsFormat[c].bolType === "Itemized") {
                        if (this.pdfValue.lineItemsFormat[c].newAddPieces.length > 0) {
                            for (let a = 0; a < this.pdfValue.lineItemsFormat[c].newAddPieces.length; a++) {
                                if (this.pdfValue.lineItemsFormat[c].newAddPieces[a].FreightClass.length > 0) {
                                    this.removeClassification = this.pdfValue.lineItemsFormat[c].newAddPieces[a].FreightClass.replace('CLASS_', '');
                                    console.log('classification', this.removeClassification);
                                    if (this.removeClassification.startsWith('0')) {
                                        this.classification = this.removeClassification.replace('0', '');
                                    } else {
                                        this.classification = this.removeClassification;
                                    }
                                    if (this.classification.length > 2) {
                                        this.pdfValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification.replace('_', '.');
                                    } else {
                                        this.pdfValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification;
                                    }
                                    // this.totalWeights += Number(this.pdfValue.lineItemsFormat[c].newAddPieces[a].Weight.Value);
                                    // this.pdfValue.previewTotalPieces += Number(this.pdfValue.lineItemsFormat[c].newAddPieces[a].PackageQuantity);
                                }
                            }
                        }
                    }


                }
            // }
        }
    }


    YrcZipCode(zipcode: any) {
        console.log('zipcode', zipcode);
        this.YrcCity = '';
        this.YrcState = '';
        this.pricingInfoService.getCityState(zipcode).subscribe(getArrayValues => {
            this.getZipCode = getArrayValues;
            console.log('getArrayValues', getArrayValues);
            if (this.getZipCode.length > 0) {
                for (let i = 0; i < this.getZipCode.length; i++) {
                    this.YrcCity = this.getZipCode[i].city;
                    this.YrcState = this.getZipCode[i].state;
                    this.pickupForm.patchValue({ pickUpCity: this.YrcCity, pickUpStateProvinceCode: this.YrcState });
                    this.YrcErrorMessage = false;
                }
            } else {
                this.YrcErrorMessage = true;
            }
        });
    }

    checkPhoneNumber(value:any) {
        let phoneNumber = this.formatPhoneNumber(value);
        this.pickupForm.patchValue({ pickUpContactNumber: phoneNumber });
    }

    formatPhoneNumber(s: any) {
        let s2 = ('' + s).replace(/\D/g, '');
        let m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        return (!m) ? null : '(' + m[1] + ')' + m[2] + '-' + m[3];
    }

    downloadPdfTest() {
        var data1;
        let bolName: any;
        if (this.billOfLadingValues.serviceType === 'FEDEX FREIGHT ECONOMY' || this.billOfLadingValues.serviceType === 'FEDEX FREIGHT PRIORITY') {
            if (this.billOfLadingValues.trackingNumber !== undefined) {
                bolName = "FEDEX" + "_" + this.billOfLadingValues.trackingNumber;
            } else {
                bolName = "FEDEX" + "_" + this.billOfLadingValues.referenceNumber;
            }
        } else if (this.billOfLadingValues.serviceType === 'YRC') {

            if (this.billOfLadingValues.proNumber !== undefined) {
                bolName = "YRC" + "_" + this.billOfLadingValues.proNumber;
            } else {
                bolName = "YRC" + "_" + this.billOfLadingValues.referenceNumber;
            }
        } else if (this.billOfLadingValues.serviceType === 'REDDAWAY') {
            bolName = "Reddaway" + "_" + this.billOfLadingValues.refNumber;
        } else {
            bolName = "Others" + "_" + this.billOfLadingValues.referenceNumber;
        }
        var data:any = document.getElementById('bolContainer');
        html2canvas(data).then((canvas: any) => {
            // Few necessary setting options 
            var imgWidth = 560;
            var pageHeight = 1000;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'pt', 'letter'); // A4 size page of PDF 
            var position = 1;
            pdf.addImage(contentDataURL, 'PNG', 1, position, imgWidth, imgHeight)
            pdf.save(bolName + ".pdf"); // Generated PDF 
        });
    }

    transform(value: any, format: string = ""): string {
        // Try and parse the passed value.
        var momentDate = moment(value);

        // If moment didn't understand the value, return it unformatted.
        if (!momentDate.isValid()) return value;

        // Otherwise, return the date formatted as requested.
        return momentDate.format(format);
    }

    finishPickupLater() {
        this.billOfLadingValues = {};
        this.pricingInfoService.setBillOfLadingValues(this.billOfLadingValues);
        this.billOfLadingValues = this.pricingInfoService.getBillOfLadingValues();
        let createBol = {};
        this.pricingInfoService.setBolQuoteId(createBol);
        console.log('Destroyed BOL Summary Val', this.billOfLadingValues);
        this.router.navigate(['/my_bill']);
    }

    printBOL(billOfLadingValues: any) {
        this.export(billOfLadingValues);
        setTimeout(() => {
            const printContent = (document.getElementById('section1')as HTMLFormElement).innerHTML;
            const WindowPrt: any = window.open('', '', 'left=0,top=0,width=1400,height=1300,toolbar=0,scrollbars=0,status=0');
            WindowPrt.document.write('<html><head></head><body onload="window.print()">' + printContent + '</body></html>');
            WindowPrt.document.close();
            WindowPrt.focus();
            WindowPrt.print();
            WindowPrt.close();
        }, 3000)
    }

    printLabel(referenceNumber: any) {
        this.showProNumber = false;
        this.showTracking = false;
        this.showReddawayNumber = false;
        this.showOthersTrackingNumber = false;
        $('#popup-modal').modal('show');
        this.externalService.getMyBolType(this.accessToken, referenceNumber).subscribe((data:any) => {
            console.log(data);
            this.printData = data[0];
            this.printCarrier = this.printData.bolCarrier;
            this.printData.bolRequest = JSON.parse(this.printData.bolRequest);
            this.printData.lineItems = this.printData.bolRequest.lineItems;
            this.printData.shipment = this.printData.bolRequest.shipment;
            this.printData.shippersBillOfLading = this.printData.shippersBillOfLading;
            this.printData.purchaseOrderNumber = this.printData.purchaseOrderNumber;
            this.printData.shipperIdNumber = this.printData.shipperIdNumber;
            this.printData.shipperName = this.printData.bolRequest.shipper.companyName;
            this.printData.shipperCity = this.printData.bolRequest.shipper.city;
            this.printData.shipperStreet1 = this.printData.bolRequest.shipper.street1;
            // this.printData.shipperStreet2 = this.printData.bolrequest.shipper.;
            this.printData.shipperCountry = this.printData.bolRequest.shipper.country;
            this.printData.shipperZip = this.printData.bolRequest.shipper.postalCode;
            this.printData.shipperState = this.printData.bolRequest.shipper.state;
            this.printData.shipperContactName = this.printData.bolRequest.shipper.contactName;
            this.printData.shipperPhoneNumber = this.printData.bolRequest.shipper.phoneNumber;
            this.printData.consigneeState = this.printData.bolRequest.consignee.state;
            this.printData.consigneeStreet1 = this.printData.bolRequest.consignee.street1;
            // this.printData.consigneeStreet2 = this.printData.bolrequest.consignee.street2;
            this.printData.consigneeName = this.printData.bolRequest.consignee.companyName;
            this.printData.consigneeCity = this.printData.bolRequest.consignee.city;
            this.printData.consigneeCountry = this.printData.bolRequest.consignee.country;
            this.printData.consigneeCountry = this.printData.bolRequest.consignee.country;
            this.printData.consigneeZip = this.printData.bolRequest.consignee.postalCode;
            this.printData.consigneeContactName = this.printData.bolRequest.consignee.contactName;
            this.printData.consigneePhoneNumber = this.printData.bolRequest.consignee.phoneNumber;
            this.printData.spclInstructions = this.printData.bolRequest.specialInstructions;
            this.printData.billPaidToname = this.printData.bolRequest.billPaidTo;
            // this.printData.consigneeState = this.printData.bolRequest.consignee.state;
            this.printData.thirdPartyCity = 'Fife';
            this.printData.thirdPartyCompanyName = 'Forte';
            this.printData.thirdPartyPostalCode = '98424';
            this.printData.thirdPartyState = 'WA';
            this.printData.thirdPartyStreet = '301 54th Ave. E.Ste 200';
            if (this.printData.accessorials !== undefined) {
                console.log('1',this.printData);

                if (this.printData.accessorials.length > 0) {
                    console.log('2',this.printData);

                    this.printData.accessorials = JSON.parse(this.printData.accessorials);
                    for (let k = 0 ;k < this.printData.accessorials.length;k ++) {
                        console.log('3',this.printData.accessorials);

                        if (this.printData.accessorials[k] === 'Delivery Appointment Required') {
                            this.printData.accessorials.splice(k,1);
                            console.log('4',this.printData);
                        }
                        if (this.printData.accessorials[k] === 'Hazmat') {
                            this.printData.accessorials.splice(k,1);
                        }
                    }
                //     this.printData.accessorials.forEach((element, index) => {
                //    if (element.includes('Delivery Appointment Required')) {
                //        this.printData.accessorials.splice(index,1);
                //    }
                //     });
                } else {
                    this.printData.accessorials = '';
                }
            } else {
                this.printData.accessorials = '';
            }
            console.log('jefrin', this.printData);
            if (this.printData.bolRequest.billPaidTo !== undefined) {
              if (this.printData.bolRequest.billPaidTo.name === 'BILLTOFORTE') {
                // tslint:disable-next-line:max-line-length
                this.printData.billPaidTo = { name: 'to Forte', companyName: this.printData.thirdPartyCompanyName, address: this.printData.thirdPartyStreet, zip: this.printData.thirdPartyPostalCode, city: this.printData.thirdPartyCity, state: this.printData.thirdPartyState };
              } else if (this.printData.bolRequest.billPaidTo.name === 'PREPAID') {
                // tslint:disable-next-line:max-line-length
                this.printData.billPaidTo = { name: 'Prepaid', companyName: this.printData.bolRequest.billPaidTo.companyName, address: this.printData.bolRequest.billPaidTo.address, zip: this.printData.bolRequest.billPaidTo.zip, city: this.printData.bolRequest.billPaidTo.city, state: this.printData.bolRequest.billPaidTo.state };
              } else if (this.printData.bolRequest.billPaidTo.name === 'COLLECT') {
                // tslint:disable-next-line:max-line-length
                this.printData.billPaidTo = { name: 'Collect', companyName: this.printData.bolRequest.billPaidTo.companyName, address: this.printData.bolRequest.billPaidTo.address, zip: this.printData.bolRequest.billPaidTo.zip, city: this.printData.bolRequest.billPaidTo.city, state: this.printData.bolRequest.billPaidTo.state };
              } else {
                // tslint:disable-next-line:max-line-length
                this.printData.billPaidTo = { name: 'Third Party', companyName: this.printData.bolRequest.billPaidTo.companyName, address: this.printData.bolRequest.billPaidTo.address, zip: this.printData.bolRequest.billPaidTo.zip, city: this.printData.bolRequest.billPaidTo.city, state: this.printData.bolRequest.billPaidTo.state };
              }
            } else {
              // tslint:disable-next-line:max-line-length
              this.printData.billPaidTo = { name: 'to Forte', companyName: this.printData.thirdPartyCompanyName, address: this.printData.thirdPartyStreet, zip: this.printData.thirdPartyPostalCode, city: this.printData.thirdPartyCity, state: this.printData.thirdPartyState };
            }
            /*     this.printData.spclInstructions = this.printData.bolRequest.specialInstructions;
                this.printData.billPaidToname = this.printData.bolRequest.billPaidTo;
                // this.printData.consigneeState = this.printData.bolRequest.consignee.state;
                this.printData.thirdPartyCity = 'Fife';
                this.printData.thirdPartyCompanyName = 'Forte';
                this.printData.thirdPartyPostalCode = '98424';
                this.printData.thirdPartyState = 'WA';
                this.printData.thirdPartyStreet = '301 54th Ave. E.Ste 200';
                if (this.printData.bolRequest.billPaidTo !== undefined) {
                  if (this.printData.bolRequest.billPaidTo.name === 'BILLTOFORTE') {
                    // tslint:disable-next-line:max-line-length
                    this.printData.billPaidTo = { name: 'to Forte', companyName: this.printData.thirdPartyCompanyName, address: this.printData.thirdPartyStreet, zip: this.printData.thirdPartyPostalCode, city: this.printData.thirdPartyCity, state: this.printData.thirdPartyState };
                  } else if (this.printData.bolRequest.billPaidTo.name === 'PREPAID') {
                    // tslint:disable-next-line:max-line-length
                    this.printData.billPaidTo = { name: 'Prepaid', companyName: this.printData.bolRequest.billPaidTo.companyName, address: this.printData.bolRequest.billPaidTo.address, zip: this.printData.bolRequest.billPaidTo.zip, city: this.printData.bolRequest.billPaidTo.city, state: this.printData.bolRequest.billPaidTo.state };
                  } else if (this.printData.bolRequest.billPaidTo.name === 'COLLECT') {
                    // tslint:disable-next-line:max-line-length
                    this.printData.billPaidTo = { name: 'Collect', companyName: this.printData.bolRequest.billPaidTo.companyName, address: this.printData.bolRequest.billPaidTo.address, zip: this.printData.bolRequest.billPaidTo.zip, city: this.printData.bolRequest.billPaidTo.city, state: this.printData.bolRequest.billPaidTo.state };
                  } else {
                    // tslint:disable-next-line:max-line-length
                    this.printData.billPaidTo = { name: 'Third Party', companyName: this.printData.bolRequest.billPaidTo.companyName, address: this.printData.bolRequest.billPaidTo.address, zip: this.printData.bolRequest.billPaidTo.zip, city: this.printData.bolRequest.billPaidTo.city, state: this.printData.bolRequest.billPaidTo.state };
                  }
                } else {
                  // tslint:disable-next-line:max-line-length
                  this.printData.billPaidTo = { name: 'to Forte', companyName: this.printData.thirdPartyCompanyName, address: this.printData.thirdPartyStreet, zip: this.printData.thirdPartyPostalCode, city: this.printData.thirdPartyCity, state: this.printData.thirdPartyState };
                }
                this.lineItemArray = this.printData.bolRequest.lineItems;
                for (let i = 0; i < this.lineItemArray.length; i++) {
                  if (this.lineItemArray[i].FreightClass.length > 0) {
                    this.removeClassification = this.lineItemArray[i].FreightClass.replace('CLASS_', '');
                    if (this.removeClassification.startsWith('0')) {
                      this.classification = this.removeClassification.replace('0', '');
                    } else {
                      this.classification = this.removeClassification;
                    }
                    if (this.classification.length > 2) {
                        this.lineItemArray[i].FreightClass = this.classification.replace('_', '.');
                    } else {
                        this.lineItemArray[i].FreightClass = this.classification;
                    }
                    if (this.lineItemArray[i].bolType === 'Itemize') {
                      this.bolType = 'Itemize';
                    } else if (this.lineItemArray[i].bolType === 'Multi Classed Pallet') {
                      this.bolType = 'Multi Classed Pallet';
                    } else {
                      this.bolType = 'Non Itemize';
                    }
        
                  }
                  if (this.lineItemArray[i].isHazardous !== "" && this.lineItemArray[i].isHazardous !== undefined && this.lineItemArray[i].isHazardous !== null) {
                    this.lineItemArray[i].isHazardous = this.lineItemArray[i].isHazardous;
                  } else {
                    this.lineItemArray[i].isHazardous = false;
                  }
                  if (this.lineItemArray[i].PackageUnitType !== '' && this.lineItemArray[i].PackageUnitType !== undefined) {
                    this.piecesCount.push(this.lineItemArray[i].PackageQuantity);
                    console.log('pieCount', this.piecesCount);
                  }
                  if (this.lineItemArray[i].HandlingUnitType === 'PLT' || this.lineItemArray[i].HandlingUnitType === 'PALLET' || this.lineItemArray[i].HandlingUnitType === 'Pallets') {
                    this.palletCount.push(this.lineItemArray[i].HandlingUnitQuantity);
                    console.log('palCount', this.palletCount);
                  }
        
                 let  object = {
                    'isHazardous': this.lineItemArray[i].isHazardous,
                    'FreightClass': this.lineItemArray[i].FreightClass,
                    'HandlingUnitType': this.lineItemArray[i].HandlingUnitType,
                    'HandlingUnitQuantity': this.lineItemArray[i].HandlingUnitQuantity,
                    'PackageQuantity': this.lineItemArray[i].PackageQuantity,
                    'Pieces': this.lineItemArray[i].PackageQuantity,
                    'nmfc': this.lineItemArray[i].nmfc,
                    'Description': this.lineItemArray[i].Description,
                    'cube': this.lineItemArray[i].cube,
                    'bolType': this.bolType,
                    'Dimensions': {
                      'Length': this.lineItemArray[i].Dimensions.Length,
                      'Width': this.lineItemArray[i].Dimensions.Width,
                      'Height': this.lineItemArray[i].Dimensions.Height
                    },
                    'Weight': {
                      'Units': 'LB',
                      'Value': this.lineItemArray[i].Weight.Value
                    }
                  };
                  this.lineItemNewArray.push(object);
                }
                if (this.piecesCount.length > 0) {
                  this.myBolTotalPieces = this.netChargeArrSum(this.piecesCount);
                  console.log('totalPcs', this.myBolTotalPieces);
                } else {
                  this.myBolTotalPieces = 0;
                }
                if (this.palletCount.length > 0) {
                  this.myBolTotalPallets = this.netChargeArrSum(this.palletCount);
                  console.log('totalpall', this.myBolTotalPallets);
                } else {
                  this.myBolTotalPallets = 0;
                } */
//                 if (this.printData.bolCarrier === 'OTHERS') {
// if (this.printData.otherCarrierName !== null || this.printData.otherCarrierName !== '') {
//     this.printData.serviceType = this.printData.otherCarrierName;

// } else {
//     this.printData.serviceType = this.printData.bolCarrier;

// }
//                 } else {
                    this.printData.serviceType = this.printData.bolCarrier;

                // }
            this.printData.ReferenceNumber = this.printData.bolReferenceNumber;
            if (this.printData.bolCarrier === 'FEDEX_FREIGHT_ECONOMY' && this.printData.bolService === true) {
                this.printData.bolResponse = JSON.parse(this.printData.bolResponse);
                this.printData.trackingNumber = this.printData.bolTrackingNumber;
                this.showTracking = true;
            } else if (this.printData.bolCarrier === 'FEDEX_FREIGHT_PRIORITY' && this.printData.bolService === true) {
                this.printData.bolResponse = JSON.parse(this.printData.bolResponse);
                this.printData.trackingNumber = this.printData.bolTrackingNumber;
                this.showTracking = true;
            } else if (this.printData.bolCarrier === 'YRC' && this.printData.bolService === true) {
                this.printData.bolResponse = JSON.parse(this.printData.bolResponse);
                if (this.printData.bolResponse) {
                    this.printData.proNumber = this.printData.bolTrackingNumber;
                    this.showProNumber = true;
                } else {
                    this.showProNumber = false;
                }
            } else {
                if (this.printData.bolCarrier === 'OTHERS' && this.printData.otherCarrierName === 'Rate Quote') {
                    if (this.printData.trackLink !== null && this.printData.bolTrackingNumber !== null) {
                        this.showOthersTrackingNumber = true;
                        this.printData.trackingNumber = this.printData.bolTrackingNumber;
                    } else {
                        this.showOthersTrackingNumber = false;
                    }
                } else if (this.printData.bolCarrier === 'OTHERS') {
                    if (this.printData.bolTrackingNumber !== null && this.printData.routinePickup === true) {
                        this.showOthersTrackingNumber = true;
                        this.printData.trackingNumber = this.printData.bolTrackingNumber;
                    } else {
                        this.showOthersTrackingNumber = false;
                    }
                }
            }
            console.log(this.printData);
            this.printData.isHazardous = this.printData.lineItems[0].isHazardous;

        });
        this.export(this.printData);

    }

    printlabelForRefNo(data:any) {
        console.log(data);
        this.tableCount = data;
        let m = Math.floor(data / 4);
        if (data % 4 === 0) {
            this.iterateData = m;
        } else {
            this.iterateData = m + 1;
        }
        for (let i = 0; i < this.tableCount; i++) {
            this.table.push(this.printData);
        }
        console.log(this.table);
        console.log(m + ',' + data);
        setTimeout(() => {

            if (data !== 0 && data > 0 && data !== '' && data !== null) {
                this.printContent = (document.getElementById('print-label')as HTMLFormElement).innerHTML;
                this.printContent1 = (document.getElementById('section2')as HTMLFormElement).innerHTML;
            } else if (data === 0 || data === '' || data === null) {

                this.printContent1 = (document.getElementById('section2')as HTMLFormElement).innerHTML;
                // console.log(this.printContent);

            }
            const WindowPrt: any = window.open('', '', 'left=0,top=0,width=1400,height=1300,toolbar=0,scrollbars=0,status=0');
            if (data !== 0) {
                this.printcontentLength = 0;
                WindowPrt.document.open();
                for (let i = 0;i < this.table.length; i ++) {
                  // tslint:disable-next-line:max-line-length
                  WindowPrt.document.write('<html><head></head><body onload="window.print();setTimeout(function(){window.close();}, 2000)"> ' + this.printContent + '<h2>' + (i + 1) + '  of  ' + this.table.length +  '</h2><div class="pagebreak" style="page-break-after: always;"> </div></body></html>');
                }
                // WindowPrt.moveTo(200, 200);
                
                WindowPrt.document.write('<html><head></head><body onload="window.print();setTimeout(function(){window.close();}, 2000)">' + this.printContent1 + '</body></html>');
          
          
              } else {
                console.log(data);
                WindowPrt.document.open();
                WindowPrt.document.write('<html><head></head><body onload="window.print();setTimeout(function(){window.close();}, 2000)">' + this.printContent1 + '</body></html>');
            }
                WindowPrt.document.close();
            //  WindowPrt.close();
            this.table = [];


        }, 4000);
        $('#popup-modal').modal('hide');
        $('#label-modal').modal('hide');
        $('#bolType-modal').modal('hide');

    }
    printlabelForRefNolabel(data:any) {
        // this.showBol = true;
        console.log(data);
        this.tableCount = data;
        let m = Math.floor(data / 4);
    if (data % 4 === 0) {
      this.iterateData = m;
    } else {
      this.iterateData = m + 1;
    }
    for (let i = 0; i< this.tableCount; i++) {
      this.table.push(this.printData);
    }
    console.log(this.table);
    console.log(m + ',' + data);
        const WindowPrt: any = window.open('', '', 'fullscreen = 1,toolbar=0,scrollbars=0,status=0');
        // if (data !== 0) {
          this.printcontentLength = 0;
          this.printContent = (document.getElementById('print-label')as HTMLFormElement).innerHTML;
    
          WindowPrt.document.open();
          for (let i = 0;i < this.table.length; i ++) {
            console.log('Jefrin');
            // tslint:disable-next-line:max-line-length
            WindowPrt.document.write('<html><head></head><body onload="window.print();setTimeout(function(){window.close();}, 2000)"> ' + this.printContent + '<h2>' + (i + 1) + '  of  ' + this.table.length +  '</h2><div class="pagebreak" style="page-break-after: always;"> </div></body></html>');
          }
           WindowPrt.document.close();
        //    this.showBol = false;
          this.table = [];
    
     
        // }, 4000);
    
        // $('#popup-modal').modal('hide');
        // $('#bolType-modal').modal('hide');
    
      }
    
      printlabelForRefNoBOL(data: any) {
        // this.showBol = true;
        console.log(data);
        this.tableCount = data;
        let m = Math.floor(data / 4);
    if (data % 4 === 0) {
      this.iterateData = m;
    } else {
      this.iterateData = m + 1;
    }
    for (let i = 0; i< this.tableCount; i++) {
      this.table.push(this.printData);
    }
    console.log(this.table);
    console.log(m + ',' + data);
        const WindowPrt: any = window.open('', '', 'fullscreen = 1,toolbar=0,scrollbars=0,status=0');
        // if (data !== 0) {
          this.printcontentLength = 0;
          this.printContent = (document.getElementById('section2')as HTMLFormElement).innerHTML;
    
          WindowPrt.document.open();
          // for (let i = 0;i < this.table.length; i ++) {
            console.log('Jefrin');
            // tslint:disable-next-line:max-line-length
            WindowPrt.document.write('<html><head></head><body onload="window.print();setTimeout(function(){window.close();}, 2000)"> ' + this.printContent + '<div class="pagebreak" style="page-break-after: always;"> </div></body></html>');
          // }
           WindowPrt.document.close();
        //    this.showBol = false;
          this.table = [];
    
     
        // }, 4000);
    
        // $('#popup-modal').modal('hide');
        // $('#bolType-modal').modal('hide');
    
      }
    

    closeLabelModal() {
        $('#label-modal').modal('hide');
        $('#bolType-modal').modal('hide');


    }


    checkEnterKey(event: any, value: any) {
        console.log(event);
        if (event.which === 13) {
            this.printlabelForRefNo(value);
        }
    }
    netChargeArrSum(netCharge: any) {
        let total = 0;
        netCharge.forEach(function (key:any) {
            total = total + Number(key);
        });
        return total;
    }

    stateValidation(event: any) {
        // console.log(event);
        var key = event.keyCode;
        return ((key >= 65 && key <= 90) || key === 8);
    };
    downloadOnlineOdf() {
        const pdfInBase64 = 'JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg==\n';
      this.solution1(pdfInBase64);
        // this.solution1(base64Data);
    }
    solution1(base64Data: any) {

        var arrBuffer = this.base64ToArrayBuffer(base64Data);
        var newBlob = new Blob([arrBuffer], {type: "application/pdf"});
        const nav = (window.navigator as any);
        if (window.navigator && nav.msSaveOrOpenBlob) {
            nav.msSaveOrOpenBlob(newBlob);
        return;
        }
        var data = window.URL.createObjectURL(newBlob);
        var link = document.createElement('a');
        document.body.appendChild(link); //required in FF, optional for Chrome
        link.href = data;
        link.download = "file.pdf";
        link.click();
        window.URL.revokeObjectURL(data);
        link.remove();
        }
        
        base64ToArrayBuffer(data: any) {
        var binaryString = window.atob(data);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
        }
        return bytes;
        }
}