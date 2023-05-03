import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PricingInfoService } from '../services/pricing-info.service';
import { ExternalService } from '../services/external.service';
import { CustomerService } from '../services/customer.service';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import * as moment from 'moment';
// import { watchFile } from 'fs';
import Swal from 'sweetalert2';

declare var $: any;
// declare var html2canvas: any;
declare var pdfMake: any;

@Component({ 
    selector: 'app-tracking',
    templateUrl: './tracking.component.html',
    styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
    trackingForm: FormGroup = new FormGroup({});
    updateTrackProNumberForm: FormGroup = new FormGroup({});
    public showTrackingTable = false;
    public showFedexTrackingDetails = false;
    public showYrcTrackingDetails = false;
    public showErrorMessage = false;
    public showLoader = false;
    public trackingResponse: any;
    public yrcResponse: any;
    public carrier: any;
    public proNumber:any;
    public refNumber:any;
    public shipments:any;
    public showFedex = false;
    public showYrc = false;
    public showReddaway = false;
    public showReddawayTrackingDetails = false;
    public number: any;
    public searchBy: any;
    public reddawayServiceType: any;
    public Service: any;
    public DatesOrTimes: any = [];
    public showYrcErrorMessage = false;
    public showFedexErrorMessage = false;
    public showReddawayErrorMessage = false;
    public externalCustomer: any;
    public externalCustomerParseData: any;
    public accessToken: any;
    public customerType: any;
    public trackingDetails: any;
    public hideFedexTrackingDetails = false;
    public hideYrcTrackingDetails = false;
    public hideReddawayTrackingDetails = false;
    public numberPerPage: any;
    public numberOfPages = [5, 10, 15];
    public selectPagination: any;
    public p = 1;
    public piecesCount: any = [];
    public palletCount: any = [];
    public bolValue: any;
    public myBolTotalPieces: any;
    public myBolTotalPallets: any;
    public totalPieces: any;
    public totalWeights: any;
    public carrierName = "";
    public searchLoader = false;
    public tableValues = false;
    public entryLoader = true;
    public showProNumber = false;
    public showTrackingNumber = false;
    public showReddawayNumber = false;
    public showSearchErrorMessage = false;
    public showTrackingLoader = false;
    public loginType: any;
    public showForExternalCustomer = false;
    public salesRepDetails: any;
    public companyDetails: any;
    public showForInterSalesRep = false;
    public showProErrorMessage = false;
    public updateResponse: any;
    public trackFtlArray: any = [];
    public trackShipmentArray: any = [];
    public trackBolArray: any = [];
    constructor(private fb: FormBuilder,
        private pricingInfoService: PricingInfoService,
        private externalService: ExternalService, private customerService: CustomerService) {
    }

    selectRanges(selectPagination: any) {
        this.numberPerPage = Number(selectPagination);
    }

    ngOnInit() {
        this.buildForm();
        this.updateForm();
        this.localStorageValues();
    }

    localStorageValues() {
        this.loginType = '';
        this.externalCustomer = localStorage.getItem(('SalesRepName'));
        this.externalCustomerParseData = JSON.parse(this.externalCustomer);
        this.customerType = localStorage.getItem(('customerType'));
        this.accessToken = localStorage.getItem(('accessToken'));
        console.log('this.externalCustomer', this.externalCustomer);
        if (this.customerType === 'externalCustomer') {
            console.log('this.externalCustomer 66t5r56gg', this.externalCustomer);
            this.showForExternalCustomer = true;
            this.loginType = this.customerType;
            this.getBillofLadingDetails();

            console.log('this.loginType 66t5r56gg', this.loginType);
            // this.trackingForm.patchValue({companyId: this.externalCustomerParseData.companyName});
        } else {
            this.showForExternalCustomer = false;
            if (this.externalCustomerParseData.type === 'administrator') {
                this.loginType = 'admin';
                this.getBillofLadingDetailsForAdmin();
                this.getAllCompanyNotes();
                this.getAdminUsers();
            } else {
                this.loginType = 'internalSalesRep';
                this.getBillofLadingDetailsForAdmin();
                this.getCompany();
                this.showForInterSalesRep = true;
                this.showForExternalCustomer = false;
                this.trackingForm.patchValue({ salesRepId: this.externalCustomerParseData.id });

            }
        }
    }


    buildForm() {
        this.trackingForm = this.fb.group({
            companyId: [''],
            salesRepId: [''],
            customerId: [''],
            shipperZip: '',
            consigneeZip: '',
            bolCarrier: '',
            bolTrackingNumber: ''
        });
    }

    updateForm() {
        this.updateTrackProNumberForm = this.fb.group({
            bolTrackingNumberOld: '',
            pickupConformationNumberOld: '',
            bolTrackingNumber: '',
            pickupConformationNumber: '',
            id: ''

        });
    }
    retrieveAllData() {
        if (this.customerType === 'externalCustomer') {
            this.getBillofLadingDetails()
        } else {
            this.getBillofLadingDetailsForAdmin();
        }
    }
    selectedCarrier(carrier: any) {
        if (carrier === 'FXFE' || carrier === 'FXFP') {
            // this.carrierName = 'FEDEX_FREIGHT_PRIORITY';
            if (carrier === 'FXFE') {
                this.carrierName = 'FEDEX_FREIGHT_ECONOMY';
            } else {
                this.carrierName = 'FEDEX_FREIGHT_PRIORITY';

            }
            this.showFedex = true;
            this.showYrc = false;
            this.showReddaway = false;
            this.showLoader = false;
            this.showYrcTrackingDetails = false;
            this.showFedexTrackingDetails = false;
            this.showErrorMessage = false;
            this.showReddawayTrackingDetails = false;
            this.showYrcErrorMessage = false;
            this.showFedexErrorMessage = false;
            this.showReddawayErrorMessage = false;
        } else if (carrier === 'YRC') {
            this.carrierName = carrier;

            this.showYrc = true;
            this.showFedex = false;
            this.showReddaway = false;
            this.showLoader = false;
            this.showErrorMessage = false;
            this.showFedexTrackingDetails = false;
            this.showYrcTrackingDetails = false;
            this.showReddawayTrackingDetails = false;
            this.showYrcErrorMessage = false;
            this.showFedexErrorMessage = false;
            this.showReddawayErrorMessage = false;
        } else if (carrier === 'REDDAWAY') {
            this.carrierName = carrier;

            this.showReddaway = true;
            this.showFedex = false;
            this.showYrc = false;
            this.showLoader = false;
            this.showErrorMessage = false;
            this.showFedexTrackingDetails = false;
            this.showYrcTrackingDetails = false;
            this.showReddawayTrackingDetails = false;
            this.showYrcErrorMessage = false;
            this.showFedexErrorMessage = false;
            this.showReddawayErrorMessage = false;
        } else if (carrier === 'OTHERS') {
            this.carrierName = carrier;
        } else {
            this.showReddaway = false;
            this.showFedex = false;
            this.showYrc = false;
            this.showLoader = false;
            this.showErrorMessage = false;
            this.showFedexTrackingDetails = false;
            this.showYrcTrackingDetails = false;
            this.showReddawayTrackingDetails = false;
            this.showYrcErrorMessage = false;
            this.showFedexErrorMessage = false;
            this.showReddawayErrorMessage = false;
        }
    }

    getAllCompanyNotes() {
        this.customerService.getCompanyDetails(this.accessToken).subscribe(getCustomerData => {
            this.companyDetails = getCustomerData;

        });
    }

    getCompany() {
        this.customerService.getCompanyDetailsBySalesRepId(this.externalCustomerParseData.salesRepId, this.accessToken).subscribe(data => {
            this.companyDetails = data;
        });

    }
    getAdminUsers() {
        this.pricingInfoService.getSalesDetail(this.accessToken).subscribe((names: any) => {
            this.salesRepDetails = names;

        });
    }
    track(trackingNumber: any, carrier: any) {
        console.log('traxkingNumber', trackingNumber, carrier);
        this.showErrorMessage = false;
        this.showFedexTrackingDetails = false;
        this.showYrcTrackingDetails = false;
        this.showReddawayTrackingDetails = false;
        this.showYrcErrorMessage = false;
        this.showFedexErrorMessage = false;
        this.showReddawayErrorMessage = false;
        this.hideFedexTrackingDetails = false;
        this.hideYrcTrackingDetails = false;
        this.hideReddawayTrackingDetails = false;
        this.shipments = [];
        this.DatesOrTimes = [];
        this.showLoader = false;
        this.showTrackingLoader = true;
        if (carrier === 'FEDEX_FREIGHT_ECONOMY') {
            carrier = 'FXFE';
        } else if (carrier === 'FEDEX_FREIGHT_PRIORITY') {
            carrier = 'FXFP';
        } else {
            carrier = carrier;
        }
        if (trackingNumber !== null && trackingNumber !== '' && trackingNumber !== undefined) {
            this.showProErrorMessage = false;
            if (carrier === 'FXFP' || carrier === 'FXFE') {
                console.log('1');
                let trackingForm = {
                    carrier: carrier,
                    number: "",
                    proNumber: "",
                    refNumber: "",
                    searchBy: "",
                    trackingNumber: trackingNumber

                }
                this.pricingInfoService.getTrackingDetails(trackingForm).subscribe((data: any) => {
                    this.trackingResponse = data;
                    this.showTrackingLoader = false;
                    console.log('trackingResponse', this.trackingResponse);
                    this.showLoader = false;
                    if (this.trackingResponse.result.HighestSeverity === 'SUCCESS') {
                        console.log('fedex', this.trackingResponse.result.HighestSeverity);
                        console.log('success', this.trackingResponse.result.CompletedTrackDetails[0].TrackDetails[0].Notification.Severity === 'SUCCESS');
                        if (this.trackingResponse.result.CompletedTrackDetails[0].TrackDetails[0].Notification.Severity === 'SUCCESS') {
                            this.showFedexTrackingDetails = true;
                            console.log('fedex', this.showFedexTrackingDetails);
                            this.trackingResponse.trackingDetail = this.trackingResponse.result.CompletedTrackDetails[0].TrackDetails[0];
                            this.trackingResponse.trackingHistory = this.trackingResponse.result.CompletedTrackDetails[0].TrackDetails[0].Events;
                            console.log('date', this.trackingResponse.trackingHistory);
                            let Fedex;
                            Fedex = this.trackingResponse.trackingDetail.Service.Type.replace('_', ' ');
                            this.Service = Fedex.replace('_', ' ');
                            if (this.trackingResponse.trackingDetail.DatesOrTimes.length > 0) {
                                for (let t = 0; t < this.trackingResponse.trackingDetail.DatesOrTimes.length; t++) {
                                    let Type;
                                    Type = this.trackingResponse.trackingDetail.DatesOrTimes[t].Type.replace('_', ' ');
                                    let DateOrTimestamp;
                                    DateOrTimestamp = this.trackingResponse.trackingDetail.DatesOrTimes[t].DateOrTimestamp;
                                    this.DatesOrTimes.push({ Type, DateOrTimestamp });
                                }
                            }
                            if (this.trackingResponse.trackingHistory.length > 0) {
                                for (let t = 0; t < this.trackingResponse.trackingHistory.length; t++) {
                                    let date;
                                    date = this.trackingResponse.trackingHistory[t].Timestamp;
                                    this.trackingResponse.trackingHistory[t].date = date;
                                    console.log('time', date);
                                    this.trackingResponse.trackingHistory[t].time = date;
                                }
                            }
                        } else {
                            this.showFedexErrorMessage = true;
                            this.showErrorMessage = false;
                            this.hideFedexTrackingDetails = true;
                            this.showFedexTrackingDetails = false;
                        }
                    }
                });
            } else if (carrier === 'YRC') {
                this.proNumber = trackingNumber;
                // this.refNumber = trackingForm.refNumber;
                this.carrier = carrier;
                let trackingForm = {
                    carrier: carrier,
                    number: "",
                    proNumber: trackingNumber,
                    refNumber: "",
                    searchBy: "",
                    trackingNumber: "",

                }
                this.pricingInfoService.getTrackingDetails(trackingForm).subscribe((data: any) => {
                    this.trackingResponse = data;
                    this.showTrackingLoader = false;

                    console.log('trackingdata', this.trackingResponse);

                    this.showLoader = false;
                    if (this.trackingResponse.result.result) {
                        if (this.trackingResponse.result.result.statusCode.$value === '00') {
                            this.showYrcTrackingDetails = true;
                            this.yrcResponse = this.trackingResponse.result.result;
                            this.shipments = this.yrcResponse.trackingDetails.trackingDetails;
                            console.log('yrcresponse', this.yrcResponse);
                            console.log('shipments', this.shipments);


                            if (this.shipments.length > 0) {
                                let shipmentLength;
                                shipmentLength = this.shipments.length - 1;
                                console.log('shipmentLength', shipmentLength, this.shipments.length);
                                this.shipments[shipmentLength].statusTime = '';
                            }
                            this.shipments.reverse();
                        } else {
                            this.showYrcErrorMessage = false;
                            this.hideYrcTrackingDetails = true;
                            this.showYrcTrackingDetails = false;

                        }
                    }
                });
            } else if (carrier === 'REDDAWAY') {
                let trackingForm = {
                    carrier: "REDDAWAY",
                    number: trackingNumber,
                    PRO: "",
                    refNumber: "",
                    searchBy: "PRO",
                    trackingNumber: "",
                }
                this.pricingInfoService.getTrackingDetails(trackingForm).subscribe((data: any) => {
                    this.trackingResponse = data;
                    console.log('myReddaway', this.trackingResponse.result.TrackDetailResponse.STATUS.MESSAGE);
                    this.showLoader = false;
                    this.showTrackingLoader = false;

                    if (this.trackingResponse.result) {
                        if (this.trackingResponse.result.TrackDetailResponse.STATUS.CODE === '0') {
                            this.showReddawayTrackingDetails = true;
                            this.reddawayServiceType = this.trackingResponse.result.TrackDetailResponse.TrackDetail.SERVICE_TYPE.replace('_', ' ');
                        } else {
                            this.showReddawayErrorMessage = false;
                            this.hideReddawayTrackingDetails = true;

                        }
                    }
                }, (err: any) => {
                    this.showErrorMessage = true;
                    this.hideReddawayTrackingDetails = false;
                    this.showTrackingLoader = false;

                });
            } else if (carrier === 'OTHERS') {

            } else {
                this.showLoader = false;
                this.showErrorMessage = true;

                this.hideReddawayTrackingDetails = false;
                this.showReddawayTrackingDetails = false;
            }
        } else {
            console.log('pronumber');
            this.showTrackingLoader = false;
            this.showProErrorMessage = true;

        }
    }

    search(myTracking: any) {
        if (myTracking.salesRepId === '' && myTracking.bolTrackingNumber === '' && myTracking.companyId === '' && myTracking.bolCarrier === '' && myTracking.shipperZip === '' &&
            myTracking.consigneeZip === '') {
            this.showErrorMessage = false;
            this.showSearchErrorMessage = true;
            this.searchLoader = false;
            this.showLoader = false;
            this.showTrackingTable = true;
        } else {
            this.showLoader = true;
            this.showErrorMessage = false;
            this.showTrackingTable = false;
            this.showSearchErrorMessage = false;
            if (this.loginType === 'externalCustomer') {
                myTracking.salesRepId = this.externalCustomerParseData.salesRepId;
                myTracking.customerId = this.externalCustomerParseData.id;
                myTracking.companyId = '';
            } else if (this.loginType === 'admin') {
                myTracking.salesRepId = myTracking.salesRepId;
                myTracking.customerId = '';
                myTracking.companyId = myTracking.companyId;
            } else {
                myTracking.salesRepId = this.externalCustomerParseData.id;
                myTracking.customerId = '';
                myTracking.companyId = myTracking.companyId;
            }
            myTracking.bolCarrier = this.carrierName;
            console.log('mytracking', myTracking);
            let viewType = 'tracking';
            this.trackShipmentArray = [], this.trackBolArray = [], this.trackFtlArray = [];
            this.pricingInfoService.searchTrack(myTracking, viewType).subscribe((data: any) => {
                let searchTrackDetails = data;
                this.showLoader = false;
                console.log('data', searchTrackDetails);
                this.trackingDetails = searchTrackDetails.result;
                console.log('data', this.trackingDetails);
                if (this.trackingDetails.length > 0) {
                    this.showTrackingTable = true;
                    this.trackingDetails.sort((a: any, b: any) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
                    this.bolValue = this.trackingDetails;
                    console.log('sortedbol', this.bolValue);
                    let trackingPagination = this.trackingDetails.length;
                    if (trackingPagination > 10) {
                        this.numberPerPage = 10;
                    } else {
                        this.numberPerPage = trackingPagination;
                    }
                    for (let t = 0; t < this.trackingDetails.length; t++) {
                        if (this.trackingDetails[t].otherCarrierName === 'Rate Quote' && this.trackingDetails[t].routinePickup === false && this.trackingDetails[t].bolService === false) {
                            this.trackFtlArray.push(this.trackingDetails[t]);
                            console.log('ftlArray', this.trackFtlArray);
                        }
                        if (this.trackingDetails[t].otherCarrierName !== 'Rate Quote' && this.trackingDetails[t].routinePickup === true && this.trackingDetails[t].bolService === false) {
                            this.trackShipmentArray.push(this.trackingDetails[t]);
                            console.log('shipmentArray', this.trackShipmentArray);
                        }
                        if (this.trackingDetails[t].otherCarrierName !== 'Rate Quote' && this.trackingDetails[t].routinePickup === false && this.trackingDetails[t].bolService === true) {
                            this.trackBolArray.push(this.trackingDetails[t]);
                            console.log('BolArray', this.trackBolArray);
                        }
                    }
                    if (this.trackBolArray.length > 0) {
                        for (let t = 0; t < this.trackBolArray.length; t++) {
                            let date = this.trackBolArray[t].createdOn.split('T');
                            console.log('date', date);
                            let newDate = date[0].split('-');
                            console.log('newDate', newDate);
                            let newDisplayDate = newDate[1] + '/' + newDate[2] + '/' + newDate[0];
                            this.trackBolArray[t].createdOn = newDisplayDate;
                            this.trackBolArray[t].bolRequest = JSON.parse(this.trackBolArray[t].bolRequest)
                            this.trackBolArray[t].bolRequest.shipperCompanyName = this.trackBolArray[t].bolRequest.shipper.companyName;
                            this.trackBolArray[t].bolRequest.shipperContactName = this.trackBolArray[t].bolRequest.shipper.contactName;
                            this.trackBolArray[t].bolRequest.consigneeCompanyName = this.trackBolArray[t].bolRequest.consignee.companyName;
                            this.trackBolArray[t].bolRequest.consigneeContactName = this.trackBolArray[t].bolRequest.consignee.contactName;
                            this.trackBolArray[t].bolRequest.origin = this.trackBolArray[t].bolRequest.shipper.postalCode;
                            this.trackBolArray[t].bolRequest.destination = this.trackBolArray[t].bolRequest.consignee.postalCode;
                            console.log('request', this.trackBolArray[t].bolRequest);
                            if (this.trackBolArray[t].bolCarrier === 'FEDEX_FREIGHT_PRIORITY') {
                                this.trackBolArray[t].bolResponse = JSON.parse(this.trackBolArray[t].bolResponse)
                                this.trackBolArray[t].bolCarrier = 'FXFP';
                                console.log('response', this.trackBolArray[t].bolResponse);
                                console.log('response123', this.trackBolArray[t].bolResponse.CompletedShipmentDetail.MasterTrackingId.TrackingNumber);
                                this.trackBolArray[t].trackingNumber = this.trackBolArray[t].bolResponse.CompletedShipmentDetail.MasterTrackingId.TrackingNumber;
                            } else if (this.trackBolArray[t].bolCarrier === 'FEDEX_FREIGHT_ECONOMY') {
                                this.trackBolArray[t].bolResponse = JSON.parse(this.trackBolArray[t].bolResponse)
                                this.trackBolArray[t].bolCarrier = 'FXFE';
                                console.log('response', this.trackBolArray[t].bolResponse);
                                console.log('response123', this.trackBolArray[t].bolResponse.CompletedShipmentDetail.MasterTrackingId.TrackingNumber);
                                this.trackBolArray[t].trackingNumber = this.trackBolArray[t].bolResponse.CompletedShipmentDetail.MasterTrackingId.TrackingNumber;
                            }
                            else if (this.trackBolArray[t].bolCarrier === 'YRC') {
                                this.trackBolArray[t].bolResponse = JSON.parse(this.trackBolArray[t].bolResponse)
                                console.log('yrcresponse', this.trackBolArray[t].bolResponse);
                                if (this.trackBolArray[t].bolResponse.submitBOLResponse.proNumber !== undefined) {
                                    this.trackBolArray[t].trackingNumber = this.trackBolArray[t].bolResponse.submitBOLResponse.proNumber.$value;
                                } else {
                                    this.trackBolArray[t].trackingNumber = '';
                                }
                                console.log('yrcresponse.trackingNumber', this.trackBolArray[t].trackingNumber);
                            }
                            else if (this.trackBolArray[t].bolCarrier === 'REDDAWAY') {
                                this.trackBolArray[t].bolResponse = this.trackBolArray[t].bolResponse;
                                this.trackBolArray[t].trackingNumber = this.trackBolArray[t].bolResponse;

                                console.log('reddawayresponse', this.trackBolArray[t].bolResponse);
                            } else {
                                this.trackBolArray[t].bolResponse = this.trackBolArray[t].bolResponse;
                                this.trackBolArray[t].trackingNumber = this.trackBolArray[t].bolResponse;
                                console.log('1 Others', this.trackBolArray[t].bolResponse);
                            }
                        }
                    }
                    if (this.trackFtlArray.length > 0) {
                        for (let f = 0; f < this.trackFtlArray.length; f++) {
                            let date = this.trackFtlArray[f].createdOn.split('T');
                            console.log('date', date);
                            let newDate = date[0].split('-');
                            console.log('newDate', newDate);
                            let newDisplayDate = newDate[1] + '/' + newDate[2] + '/' + newDate[0];
                            this.trackFtlArray[f].createdOn = newDisplayDate;
                            this.trackFtlArray[f].bolRequest = JSON.parse(this.trackFtlArray[f].bolRequest);
                            this.trackFtlArray[f].bolRequest.shipperCompanyName = this.trackFtlArray[f].bolRequest.shipper.companyName;
                            this.trackFtlArray[f].bolRequest.shipperContactName = this.trackFtlArray[f].bolRequest.shipper.contactName;
                            this.trackFtlArray[f].bolRequest.consigneeCompanyName = this.trackFtlArray[f].bolRequest.consignee.companyName;
                            this.trackFtlArray[f].bolRequest.consigneeContactName = this.trackFtlArray[f].bolRequest.consignee.contactName;
                            this.trackFtlArray[f].bolRequest.origin = this.trackFtlArray[f].bolRequest.shipper.postalCode;
                            this.trackFtlArray[f].bolRequest.destination = this.trackFtlArray[f].bolRequest.consignee.postalCode;
                            this.trackFtlArray[f].trackingNumber = this.trackFtlArray[f].bolTrackingNumber;
                        }
                    }
                    if (this.trackShipmentArray.length > 0) {
                        for (let f = 0; f < this.trackShipmentArray.length; f++) {
                            let date = this.trackShipmentArray[f].createdOn.split('T');
                            console.log('date', date);
                            let newDate = date[0].split('-');
                            console.log('newDate', newDate);
                            let newDisplayDate = newDate[1] + '/' + newDate[2] + '/' + newDate[0];
                            this.trackShipmentArray[f].createdOn = newDisplayDate;
                            this.trackShipmentArray[f].bolRequest = JSON.parse(this.trackShipmentArray[f].bolRequest);
                            this.trackShipmentArray[f].bolRequest.shipperCompanyName = this.trackShipmentArray[f].bolRequest.shipper.companyName;
                            this.trackShipmentArray[f].bolRequest.shipperContactName = this.trackShipmentArray[f].bolRequest.shipper.contactName;
                            this.trackShipmentArray[f].bolRequest.consigneeCompanyName = this.trackShipmentArray[f].bolRequest.consignee.companyName;
                            this.trackShipmentArray[f].bolRequest.consigneeContactName = this.trackShipmentArray[f].bolRequest.consignee.contactName;
                            this.trackShipmentArray[f].bolRequest.origin = this.trackShipmentArray[f].bolRequest.shipper.postalCode;
                            this.trackShipmentArray[f].bolRequest.destination = this.trackShipmentArray[f].bolRequest.consignee.postalCode;
                            this.trackShipmentArray[f].trackingNumber = this.trackShipmentArray[f].bolTrackingNumber;
                        }
                    }
                }
                else {
                    this.showErrorMessage = true;
                    this.showTrackingTable = false;
                    this.showLoader = false;
                }
            })

        }
    }


    clear() {
        this.trackingForm.patchValue({
            bolCarrier: '',
            shipperZip: '',
            consigneeZip: '',
            companyId: '',
            salesRepId: '',
            bolTrackingNumber: '',
            customerId: ''
        });
        this.showErrorMessage = false;
        this.carrierName = '';
        if (this.customerType === 'externalCustomer') {
            this.showForExternalCustomer = true;
            this.getBillofLadingDetails();
            this.trackingForm.patchValue({ companyId: this.externalCustomerParseData.id });
        } else {

            if (this.externalCustomerParseData.type === 'administrator') {
                this.loginType = 'admin';
                this.getBillofLadingDetailsForAdmin();

            } else {
                this.loginType = 'internalSalesRep';
                this.getBillofLadingDetailsForAdmin();

                this.trackingForm.patchValue({ salesRepId: this.externalCustomerParseData.id });

            }
        }
    }

    refresh() {
        this.trackingForm.patchValue({
            bolCarrier: '',
            shipperZip: '',
            consigneeZip: '',
            companyId: '',
            salesRepId: '',
            bolTrackingNumber: '',
            customerId: ''
        });
        this.showLoader = true;
        this.showErrorMessage = false;
        this.showTrackingTable = false;
        this.showSearchErrorMessage = false;
        if (this.customerType === 'externalCustomer') {

            this.getBillofLadingDetails();
            this.loginType = this.customerType;
            this.trackingForm.patchValue({ companyId: this.externalCustomerParseData.id });
        } else {
            this.showForExternalCustomer = false;
            if (this.externalCustomerParseData.type === 'administrator') {
                this.loginType = 'admin';
                this.getBillofLadingDetailsForAdmin();

            } else {
                this.loginType = 'internalSalesRep';
                this.getBillofLadingDetailsForAdmin();

                this.trackingForm.patchValue({ salesRepId: this.externalCustomerParseData.id });

            }
        }



    }



    getBillofLadingDetails() {
        console.log('this.loginType', this.loginType);
        let BolArray: any = [], shipmentArray: any = [], ftlArray: any = [];
        this.trackShipmentArray = [], this.trackBolArray = [], this.trackFtlArray = [];
        let dt = new Date();
        dt.setDate(dt.getDate() - 60);
        let dateNew = moment(dt).format("YYYY-MM-DD");
        console.log('dateNew', dateNew);
        let viewType = 'tracking';
        this.pricingInfoService.getTrackingBillOfLading(this.externalCustomerParseData.companyId, this.externalCustomerParseData.salesRepId, this.accessToken, this.loginType, dateNew, viewType).subscribe(data => {

            this.trackingDetails = data;
            this.entryLoader = false;
            this.showLoader = false;
            console.log('data', this.trackingDetails);
            if (this.trackingDetails.length > 0) {
                this.showTrackingTable = true;
                let trackingPagination = this.trackingDetails.length;
                if (trackingPagination > 10) {
                    this.numberPerPage = 10;
                } else {
                    this.numberPerPage = trackingPagination;
                }
                for (let t = 0; t < this.trackingDetails.length; t++) {
                    let date = this.trackingDetails[t].createdOn.split('T');
                    console.log('date', date);
                    let newDate = date[0].split('-');
                    console.log('newDate', newDate);
                    let newDisplayDate = newDate[1] + '/' + newDate[2] + '/' + newDate[0];
                    console.log('newDisplayDate', newDisplayDate);
                    if (this.trackingDetails[t].otherCarrierName === 'Rate Quote' && this.trackingDetails[t].routinePickup === false && this.trackingDetails[t].bolService === false) {
                        this.trackFtlArray.push(this.trackingDetails[t]);
                        console.log('ftlArray', ftlArray);
                    }
                    if (this.trackingDetails[t].otherCarrierName !== 'Rate Quote' && this.trackingDetails[t].routinePickup === true && this.trackingDetails[t].bolService === false) {
                        this.trackShipmentArray.push(this.trackingDetails[t]);
                        console.log('shipmentArray', shipmentArray);
                    }
                    if (this.trackingDetails[t].otherCarrierName !== 'Rate Quote' && this.trackingDetails[t].routinePickup === false && this.trackingDetails[t].bolService === true) {
                        this.trackBolArray.push(this.trackingDetails[t]);
                        console.log('BolArray', BolArray);
                    }
                }
                if (this.trackBolArray.length > 0) {
                    for (let t = 0; t < this.trackBolArray.length; t++) {
                        let date = this.trackBolArray[t].createdOn.split('T');
                        console.log('date', date);
                        let newDate = date[0].split('-');
                        console.log('newDate', newDate);
                        let newDisplayDate = newDate[1] + '/' + newDate[2] + '/' + newDate[0];
                        this.trackBolArray[t].createdOn = newDisplayDate;
                        this.trackBolArray[t].bolRequest = JSON.parse(this.trackBolArray[t].bolRequest)
                        this.trackBolArray[t].bolRequest.shipperCompanyName = this.trackBolArray[t].bolRequest.shipper.companyName;
                        this.trackBolArray[t].bolRequest.shipperContactName = this.trackBolArray[t].bolRequest.shipper.contactName;
                        this.trackBolArray[t].bolRequest.consigneeCompanyName = this.trackBolArray[t].bolRequest.consignee.companyName;
                        this.trackBolArray[t].bolRequest.consigneeContactName = this.trackBolArray[t].bolRequest.consignee.contactName;
                        this.trackBolArray[t].bolRequest.origin = this.trackBolArray[t].bolRequest.shipper.postalCode;
                        this.trackBolArray[t].bolRequest.destination = this.trackBolArray[t].bolRequest.consignee.postalCode;
                        console.log('request', this.trackBolArray[t].bolRequest);
                        if (this.trackBolArray[t].bolCarrier === 'FEDEX_FREIGHT_PRIORITY') {
                            this.trackBolArray[t].bolResponse = JSON.parse(this.trackBolArray[t].bolResponse)
                            this.trackBolArray[t].bolCarrier = 'FXFP';
                            console.log('response', this.trackBolArray[t].bolResponse);
                            console.log('response123', this.trackBolArray[t].bolResponse.CompletedShipmentDetail.MasterTrackingId.TrackingNumber);
                            this.trackBolArray[t].trackingNumber = this.trackBolArray[t].bolResponse.CompletedShipmentDetail.MasterTrackingId.TrackingNumber;
                        } else if (this.trackBolArray[t].bolCarrier === 'FEDEX_FREIGHT_ECONOMY') {
                            this.trackBolArray[t].bolResponse = JSON.parse(this.trackBolArray[t].bolResponse)
                            this.trackBolArray[t].bolCarrier = 'FXFE';
                            console.log('response', this.trackBolArray[t].bolResponse);
                            console.log('response123', this.trackBolArray[t].bolResponse.CompletedShipmentDetail.MasterTrackingId.TrackingNumber);
                            this.trackBolArray[t].trackingNumber = this.trackBolArray[t].bolResponse.CompletedShipmentDetail.MasterTrackingId.TrackingNumber;
                        }
                        else if (this.trackBolArray[t].bolCarrier === 'YRC') {
                            this.trackBolArray[t].bolResponse = JSON.parse(this.trackBolArray[t].bolResponse)
                            console.log('yrcresponse', this.trackBolArray[t].bolResponse);
                            if (this.trackBolArray[t].bolResponse.submitBOLResponse.proNumber !== undefined) {
                                this.trackBolArray[t].trackingNumber = this.trackBolArray[t].bolResponse.submitBOLResponse.proNumber.$value;
                            } else {
                                this.trackBolArray[t].trackingNumber = '';
                            }
                            console.log('yrcresponse.trackingNumber', this.trackBolArray[t].trackingNumber);
                        }
                        else if (this.trackBolArray[t].bolCarrier === 'REDDAWAY') {
                            this.trackBolArray[t].bolResponse = this.trackBolArray[t].bolResponse;
                            this.trackBolArray[t].trackingNumber = this.trackBolArray[t].bolResponse;

                            console.log('reddawayresponse', this.trackBolArray[t].bolResponse);
                        } else {
                            this.trackBolArray[t].bolResponse = this.trackBolArray[t].bolResponse;
                            this.trackBolArray[t].trackingNumber = this.trackBolArray[t].bolResponse;
                            console.log('1 Others', this.trackBolArray[t].bolResponse);
                        }
                    }
                }
                if (this.trackFtlArray.length > 0) {
                    for (let f = 0; f < this.trackFtlArray.length; f++) {
                        let date = this.trackFtlArray[f].createdOn.split('T');
                        console.log('date', date);
                        let newDate = date[0].split('-');
                        console.log('newDate', newDate);
                        let newDisplayDate = newDate[1] + '/' + newDate[2] + '/' + newDate[0];
                        this.trackFtlArray[f].createdOn = newDisplayDate;
                        this.trackFtlArray[f].bolRequest = JSON.parse(this.trackFtlArray[f].bolRequest);
                        this.trackFtlArray[f].bolRequest.shipperCompanyName = this.trackFtlArray[f].bolRequest.shipper.companyName;
                        this.trackFtlArray[f].bolRequest.shipperContactName = this.trackFtlArray[f].bolRequest.shipper.contactName;
                        this.trackFtlArray[f].bolRequest.consigneeCompanyName = this.trackFtlArray[f].bolRequest.consignee.companyName;
                        this.trackFtlArray[f].bolRequest.consigneeContactName = this.trackFtlArray[f].bolRequest.consignee.contactName;
                        this.trackFtlArray[f].bolRequest.origin = this.trackFtlArray[f].bolRequest.shipper.postalCode;
                        this.trackFtlArray[f].bolRequest.destination = this.trackFtlArray[f].bolRequest.consignee.postalCode;
                        this.trackFtlArray[f].trackingNumber = this.trackFtlArray[f].bolTrackingNumber;
                    }
                }
                if (this.trackShipmentArray.length > 0) {
                    for (let f = 0; f < this.trackShipmentArray.length; f++) {
                        let date = this.trackShipmentArray[f].createdOn.split('T');
                        console.log('date', date);
                        let newDate = date[0].split('-');
                        console.log('newDate', newDate);
                        let newDisplayDate = newDate[1] + '/' + newDate[2] + '/' + newDate[0];
                        this.trackShipmentArray[f].createdOn = newDisplayDate;
                        this.trackShipmentArray[f].bolRequest = JSON.parse(this.trackShipmentArray[f].bolRequest);
                        this.trackShipmentArray[f].bolRequest.shipperCompanyName = this.trackShipmentArray[f].bolRequest.shipper.companyName;
                        this.trackShipmentArray[f].bolRequest.shipperContactName = this.trackShipmentArray[f].bolRequest.shipper.contactName;
                        this.trackShipmentArray[f].bolRequest.consigneeCompanyName = this.trackShipmentArray[f].bolRequest.consignee.companyName;
                        this.trackShipmentArray[f].bolRequest.consigneeContactName = this.trackShipmentArray[f].bolRequest.consignee.contactName;
                        this.trackShipmentArray[f].bolRequest.origin = this.trackShipmentArray[f].bolRequest.shipper.postalCode;
                        this.trackShipmentArray[f].bolRequest.destination = this.trackShipmentArray[f].bolRequest.consignee.postalCode;
                        this.trackShipmentArray[f].trackingNumber = this.trackShipmentArray[f].bolTrackingNumber;
                    }
                }
            } else {
                this.showTrackingTable = false;
                this.showLoader = false;
                this.showErrorMessage = true;
            }
        });

    }

    getBillofLadingDetailsForAdmin() {
        let companyId = 0;
        let dt = new Date();
        dt.setDate(dt.getDate() - 60);
        let dateNew = moment(dt).format("YYYY-MM-DD");
        console.log('dateNew', dateNew);
        let viewType = 'tracking';
        this.pricingInfoService.getTrackingBillOfLading(companyId, this.externalCustomerParseData.id, this.accessToken, this.loginType, dateNew, viewType).subscribe(data => {

            this.trackingDetails = data;
            this.entryLoader = false;
            this.showLoader = false;
            console.log('data', this.trackingDetails);
            if (this.trackingDetails.length > 0) {
                this.showTrackingTable = true;
                let trackingPagination = this.trackingDetails.length;
                if (trackingPagination > 10) {
                    this.numberPerPage = 10;
                } else {
                    this.numberPerPage = trackingPagination;
                }
                for (let t = 0; t < this.trackingDetails.length; t++) {
                    let date = this.trackingDetails[t].createdOn.split('T');
                    console.log('date', date);
                    let newDate = date[0].split('-');
                    console.log('newDate', newDate);
                    let newDisplayDate = newDate[1] + '/' + newDate[2] + '/' + newDate[0];
                    console.log('newDisplayDate', newDisplayDate);
                    this.trackingDetails[t].createdOn = newDisplayDate;
                    this.trackingDetails[t].bolRequest = JSON.parse(this.trackingDetails[t].bolRequest)
                    this.trackingDetails[t].bolRequest.shipperCompanyName = this.trackingDetails[t].bolRequest.shipper.companyName;
                    this.trackingDetails[t].bolRequest.shipperContactName = this.trackingDetails[t].bolRequest.shipper.contactName;

                    this.trackingDetails[t].bolRequest.consigneeCompanyName = this.trackingDetails[t].bolRequest.consignee.companyName;
                    this.trackingDetails[t].bolRequest.consigneeContactName = this.trackingDetails[t].bolRequest.consignee.contactName;

                    this.trackingDetails[t].bolRequest.origin = this.trackingDetails[t].bolRequest.shipper.postalCode;
                    this.trackingDetails[t].bolRequest.destination = this.trackingDetails[t].bolRequest.consignee.postalCode;
                    console.log('request', this.trackingDetails[t].bolRequest);
                    if (this.trackingDetails[t].bolCarrier === 'FEDEX_FREIGHT_PRIORITY') {
                        this.trackingDetails[t].bolResponse = JSON.parse(this.trackingDetails[t].bolResponse)
                        this.trackingDetails[t].bolCarrier = 'FXFP';
                        console.log('response', this.trackingDetails[t].bolResponse);
                        console.log('response123', this.trackingDetails[t].bolResponse.CompletedShipmentDetail.MasterTrackingId.TrackingNumber);
                        this.trackingDetails[t].trackingNumber = this.trackingDetails[t].bolResponse.CompletedShipmentDetail.MasterTrackingId.TrackingNumber;
                    } else if (this.trackingDetails[t].bolCarrier === 'FEDEX_FREIGHT_ECONOMY') {
                        this.trackingDetails[t].bolResponse = JSON.parse(this.trackingDetails[t].bolResponse)
                        this.trackingDetails[t].bolCarrier = 'FXFE';
                        console.log('response', this.trackingDetails[t].bolResponse);
                        console.log('response123', this.trackingDetails[t].bolResponse.CompletedShipmentDetail.MasterTrackingId.TrackingNumber);
                        this.trackingDetails[t].trackingNumber = this.trackingDetails[t].bolResponse.CompletedShipmentDetail.MasterTrackingId.TrackingNumber;
                    }
                    else if (this.trackingDetails[t].bolCarrier === 'YRC') {
                        this.trackingDetails[t].bolResponse = JSON.parse(this.trackingDetails[t].bolResponse)
                        console.log('yrcresponse', this.trackingDetails[t].bolResponse);
                        if (this.trackingDetails[t].bolResponse.submitBOLResponse.proNumber !== undefined) {
                            this.trackingDetails[t].trackingNumber = this.trackingDetails[t].bolResponse.submitBOLResponse.proNumber.$value;
                        } else {
                            this.trackingDetails[t].trackingNumber = '';
                        }
                        console.log('yrcresponse.trackingNumber', this.trackingDetails[t].trackingNumber);
                    }
                    else {
                        this.trackingDetails[t].bolResponse = this.trackingDetails[t].bolResponse;
                        this.trackingDetails[t].trackingNumber = this.trackingDetails[t].bolResponse;
                        console.log('reddawayresponse', this.trackingDetails[t].bolResponse);
                    }
                    console.log('response', this.trackingDetails[t].bolResponse);
                }
            } else {
                this.showTrackingTable = false;
                this.showLoader = false;
                this.showErrorMessage = true;
            }
        });
    }

    checkMyBill(bolReferenceNumber: any) {
        this.piecesCount = [];
        this.palletCount = [];
        this.showProNumber = false;
        this.showTrackingNumber = false;
        this.externalService.getMyBolType(this.accessToken, bolReferenceNumber).subscribe((data: any) => {
            this.bolValue = data[0];

            console.log('bol', this.bolValue);
            this.bolValue.bolRequest = JSON.parse(this.bolValue.bolRequest);
            console.log('error', this.bolValue.bolService);

            if (this.bolValue.bolCarrier === 'FEDEX_FREIGHT_ECONOMY' && this.bolValue.bolService === true) {
                this.bolValue.bolResponse = JSON.parse(this.bolValue.bolResponse);
                this.bolValue.trackingNumber = this.bolValue.bolTrackingNumber;
                console.log('fxfe', this.bolValue.bolResponse);
                console.log('fxfe tracking', this.bolValue.trackingNumber);
                this.showTrackingNumber = true;
            } else if (this.bolValue.bolCarrier === 'FEDEX_FREIGHT_PRIORITY' && this.bolValue.bolService === true) {
                this.bolValue.bolResponse = JSON.parse(this.bolValue.bolResponse);
                this.bolValue.trackingNumber = this.bolValue.bolTrackingNumber;
                console.log('fxfp', this.bolValue.bolResponse);
                console.log('fxfp tracking', this.bolValue.trackingNumber);
                this.showTrackingNumber = true;
            } else if (this.bolValue.bolCarrier === 'YRC' && this.bolValue.bolService === true) {
                this.bolValue.bolResponse = JSON.parse(this.bolValue.bolResponse);
                if (this.bolValue.bolResponse.submitBOLResponse.proNumber.$value !== undefined) {
                    this.bolValue.proNumber = this.bolValue.bolTrackingNumber;

                    this.showProNumber = true;
                } else {
                    this.showProNumber = false;
                }
                console.log('yrc', this.bolValue.bolResponse);
                console.log('yrc pronmber', this.bolValue.proNumber);
            } else {
                // this.bolValue.trackingNumber = '';
            }
            console.log('my', this.bolValue.bolResponse);
            let removeClassification;
            let classification;
            let lineItemArray = [];
            let lineItemNewArray = [];
            let object;
            if (this.bolValue.bolCarrier === 'YRC') {
                if (this.bolValue.bolRequest.billPaidTo.name === "BILLTOFORTE") {
                    this.bolValue.thirdParty = 'to Forte';
                    this.bolValue.thirdPartyCity = 'Fife';
                    this.bolValue.thirdPartyCompanyName = 'Forte';
                    this.bolValue.thirdPartyPostalCode = '98424';
                    this.bolValue.thirdPartyState = 'WA';
                    this.bolValue.thirdPartyStreet = '301 54th Ave. E.Ste 200';
                } else {
                    if (this.bolValue.bolRequest.billPaidTo.name === 'THIRDPARTY') {
                        this.bolValue.thirdParty = 'Third Party';
                        this.bolValue.thirdPartyCity = this.bolValue.bolRequest.billPaidTo.city;
                        this.bolValue.thirdPartyCompanyName = this.bolValue.bolRequest.billPaidTo.companyName;
                        this.bolValue.thirdPartyPostalCode = this.bolValue.bolRequest.billPaidTo.zip;
                        this.bolValue.thirdPartyState = this.bolValue.bolRequest.billPaidTo.state;
                        this.bolValue.thirdPartyStreet = this.bolValue.bolRequest.billPaidTo.address;
                    }
                }
                this.bolValue.createdOn = this.bolValue.createdOn;
                if (this.bolValue.rate !== "" && this.bolValue.rate !== null) {
                    this.bolValue.amount = this.bolValue.rate;
                } else {
                    this.bolValue.amount = '';
                }
                this.bolValue.serviceType = this.bolValue.bolCarrier;
                this.bolValue.spclInstructions = this.bolValue.bolRequest.specialInstructions;
                // this.bolValue.spclInstructions = this.bolValue.bolRequest.DeliveryInstructions;
                this.bolValue.poNumber = this.bolValue.purchaseOrderNumber;
                this.bolValue.shipperNumber = this.bolValue.shipperIdNumber;
                this.bolValue.ReferenceNumber = this.bolValue.bolReferenceNumber;
                this.bolValue.shipperName = this.bolValue.bolRequest.shipper.companyName;
                this.bolValue.shipperCity = this.bolValue.bolRequest.shipper.city;
                this.bolValue.shipperStreet1 = this.bolValue.bolRequest.shipper.street1;
                this.bolValue.shipperCountry = this.bolValue.bolRequest.shipper.country;
                this.bolValue.shipperZip = this.bolValue.bolRequest.shipper.postalCode;
                this.bolValue.shipperState = this.bolValue.bolRequest.shipper.state;
                this.bolValue.shipperContactName = this.bolValue.bolRequest.shipper.contactName;
                // this.bolValue.shipperPhoneNumber = this.bolValue.bolRequest.shipper.phoneNumber;
                this.bolValue.consigneeName = this.bolValue.bolRequest.consignee.companyName;
                this.bolValue.consigneeCity = this.bolValue.bolRequest.consignee.city;
                this.bolValue.consigneeCountry = this.bolValue.bolRequest.consignee.country;
                this.bolValue.consigneeZip = this.bolValue.bolRequest.consignee.postalCode;
                this.bolValue.consigneeState = this.bolValue.bolRequest.consignee.state;
                // this.bolValue.consigneePhoneNumber = this.bolValue.bolRequest.consignee.phoneNumber;
                this.bolValue.consigneeStreet1 = this.bolValue.bolRequest.consignee.street1;
                this.bolValue.shipment = this.bolValue.bolRequest.shipment;
                this.bolValue.pickupConformationNumber = this.bolValue.pickupConformationNumber;
                this.bolValue.consigneeContactName = this.bolValue.bolRequest.consignee.contactName;
                if (this.bolValue.bolRequest.shipper.phoneNumber !== '' && this.bolValue.bolRequest.shipper.phoneNumber !== null && this.bolValue.bolRequest.shipper.phoneNumber !== undefined) {
                    if (this.bolValue.bolRequest.shipper.phoneNumber.length > 10) {
                        this.bolValue.shipperPhoneNumber = this.bolValue.bolRequest.shipper.phoneNumber;
                    } else {
                        this.bolValue.shipperPhoneNumber = this.formatPhoneNumber(this.bolValue.bolRequest.shipper.phoneNumber);
                    }
                }
                if (this.bolValue.bolRequest.consignee.phoneNumber.length > 10) {
                    this.bolValue.consigneePhoneNumber = this.bolValue.bolRequest.consignee.phoneNumber;
                } else {
                    this.bolValue.consigneePhoneNumber = this.formatPhoneNumber(this.bolValue.bolRequest.consignee.phoneNumber);
                }
                this.bolValue.shipperPhoneNumber = this.bolValue.bolRequest.shipper.phoneNumber;
                lineItemArray = this.bolValue.bolRequest.lineItems;
                for (let i = 0; i < lineItemArray.length; i++) {
                    if (lineItemArray[i].FreightClass.length > 0) {
                        removeClassification = lineItemArray[i].FreightClass.replace('CLASS_', '');
                        if (removeClassification.startsWith('0')) {
                            classification = removeClassification.replace('0', '');
                        } else {
                            classification = removeClassification;
                        }
                        if (classification.length > 2) {
                            lineItemArray[i].FreightClass = classification.replace('_', '.');
                        } else {
                            lineItemArray[i].FreightClass = classification;
                        }

                    }
                    if (lineItemArray[i].isHazardous !== "" && lineItemArray[i].isHazardous !== undefined && lineItemArray[i].isHazardous !== null) {
                        lineItemArray[i].isHazardous = lineItemArray[i].isHazardous;
                    } else {
                        lineItemArray[i].isHazardous = false;
                    }
                    if (lineItemArray[i].PackageUnitType !== '' && lineItemArray[i].PackageUnitType !== undefined) {
                        this.piecesCount.push(lineItemArray[i].PackageQuantity);
                        console.log('pieCount', this.piecesCount);
                    }
                    if (lineItemArray[i].HandlingUnitType === 'PLT') {
                        this.palletCount.push(lineItemArray[i].HandlingUnitQuantity);
                        console.log('palCount', this.palletCount);
                    }

                    object = {
                        'isHazardous': lineItemArray[i].isHazardous,
                        'FreightClass': lineItemArray[i].FreightClass,
                        'HandlingUnitType': lineItemArray[i].HandlingUnitType,
                        'HandlingUnitQuantity': lineItemArray[i].HandlingUnitQuantity,
                        'PackageQuantity': lineItemArray[i].PackageQuantity,
                        'Pieces': lineItemArray[i].PackageQuantity,
                        'nmfc': lineItemArray[i].nmfc,
                        'Description': lineItemArray[i].Description,
                        'Dimensions': {
                            'Length': lineItemArray[i].Dimensions.Length,
                            'Width': lineItemArray[i].Dimensions.Width,
                            'Height': lineItemArray[i].Dimensions.Height
                        },
                        'Weight': lineItemArray[i].Weight.Value
                    };
                    lineItemNewArray.push(object);
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
                }
                this.bolValue.lineItem = lineItemNewArray;
                console.log('bolV', this.bolValue.lineItem);
                this.totalPieces = 0;
                this.totalWeights = 0;
                for (let i = 0; i < lineItemArray.length; i++) {
                    this.totalPieces += Number(lineItemArray[i].HandlingUnitQuantity);
                    this.totalWeights += Number(lineItemArray[i].Weight.Value);
                }
            } else if (this.bolValue.bolCarrier === 'REDDAWAY') {
                // this.bolValue.serviceType = this.bolValue.otherCarrierName;
                if (this.bolValue.bolRequest.billPaidTo.name === "BILLTOFORTE") {
                    this.bolValue.thirdParty = 'to Forte';
                    this.bolValue.thirdPartyCity = 'Fife';
                    this.bolValue.thirdPartyCompanyName = 'Forte';
                    this.bolValue.thirdPartyPostalCode = '98424';
                    this.bolValue.thirdPartyState = 'WA';
                    this.bolValue.thirdPartyStreet = '301 54th Ave. E.Ste 200';
                } else {
                    if (this.bolValue.bolRequest.billPaidTo.name === 'THIRDPARTY') {
                        this.bolValue.thirdParty = 'Third Party';
                        this.bolValue.thirdPartyCity = this.bolValue.bolRequest.billPaidTo.city;
                        this.bolValue.thirdPartyCompanyName = this.bolValue.bolRequest.billPaidTo.companyName;
                        this.bolValue.thirdPartyPostalCode = this.bolValue.bolRequest.billPaidTo.zip;
                        this.bolValue.thirdPartyState = this.bolValue.bolRequest.billPaidTo.state;
                        this.bolValue.thirdPartyStreet = this.bolValue.bolRequest.billPaidTo.address;
                    }
                }
                if (this.bolValue.bolService === true && this.bolValue.bolTrackingNumber !== null && this.bolValue.bolTrackingNumber !== '' && this.bolValue.bolTrackingNumber !== undefined) {
                    this.showReddawayNumber = true;
                } else {
                    this.showReddawayNumber = false;
                }
                this.bolValue.createdOn = this.bolValue.createdOn;
                if (this.bolValue.rate !== "" && this.bolValue.rate !== null) {
                    this.bolValue.amount = this.bolValue.rate;
                } else {
                    this.bolValue.amount = '';
                }
                this.bolValue.serviceType = this.bolValue.bolCarrier;
                // this.bolValue.spclInstructions = this.bolValue.bolRequest.DeliveryInstructions;
                this.bolValue.poNumber = this.bolValue.purchaseOrderNumber;
                this.bolValue.shipperNumber = this.bolValue.shipperIdNumber;
                this.bolValue.ReferenceNumber = this.bolValue.bolReferenceNumber;
                this.bolValue.shipperName = this.bolValue.bolRequest.shipper.companyName;
                this.bolValue.shipperCity = this.bolValue.bolRequest.shipper.city;
                this.bolValue.shipperStreet1 = this.bolValue.bolRequest.shipper.street1;
                this.bolValue.shipperCountry = this.bolValue.bolRequest.shipper.country;
                this.bolValue.shipperZip = this.bolValue.bolRequest.shipper.postalCode;
                this.bolValue.shipperState = this.bolValue.bolRequest.shipper.state;
                this.bolValue.shipperContactName = this.bolValue.bolRequest.shipper.contactName;
                // this.bolValue.shipperPhoneNumber = this.bolValue.bolRequest.shipper.phoneNumber;
                this.bolValue.consigneeName = this.bolValue.bolRequest.consignee.companyName;
                this.bolValue.consigneeCity = this.bolValue.bolRequest.consignee.city;
                this.bolValue.consigneeCountry = this.bolValue.bolRequest.consignee.country;
                this.bolValue.consigneeZip = this.bolValue.bolRequest.consignee.postalCode;
                this.bolValue.consigneeState = this.bolValue.bolRequest.consignee.state;
                // this.bolValue.consigneePhoneNumber = this.bolValue.bolRequest.consignee.phoneNumber;
                this.bolValue.consigneeStreet1 = this.bolValue.bolRequest.consignee.street1;
                this.bolValue.shipment = this.bolValue.bolRequest.shipment;
                this.bolValue.spclInstructions = this.bolValue.bolRequest.specialInstructions;
                this.bolValue.pickupConformationNumber = this.bolValue.pickupConformationNumber;
                this.bolValue.consigneeContactName = this.bolValue.bolRequest.consignee.contactName;
                if (this.bolValue.bolRequest.shipper.phoneNumber !== '' && this.bolValue.bolRequest.shipper.phoneNumber !== null && this.bolValue.bolRequest.shipper.phoneNumber !== undefined) {
                    if (this.bolValue.bolRequest.shipper.phoneNumber.length > 10) {
                        this.bolValue.shipperPhoneNumber = this.bolValue.bolRequest.shipper.phoneNumber;
                    } else {
                        this.bolValue.shipperPhoneNumber = this.formatPhoneNumber(this.bolValue.bolRequest.shipper.phoneNumber);
                    }
                }
                if (this.bolValue.bolRequest.consignee.phoneNumber.length > 10) {
                    this.bolValue.consigneePhoneNumber = this.bolValue.bolRequest.consignee.phoneNumber;
                } else {
                    this.bolValue.consigneePhoneNumber = this.formatPhoneNumber(this.bolValue.bolRequest.consignee.phoneNumber);
                }
                lineItemArray = this.bolValue.bolRequest.lineItems;
                for (let i = 0; i < lineItemArray.length; i++) {
                    if (lineItemArray[i].FreightClass.length > 0) {
                        removeClassification = lineItemArray[i].FreightClass.replace('CLASS_', '');
                        if (removeClassification.startsWith('0')) {
                            classification = removeClassification.replace('0', '');
                        } else {
                            classification = removeClassification;
                        }
                        if (classification.length > 2) {
                            lineItemArray[i].FreightClass = classification.replace('_', '.');
                        } else {
                            lineItemArray[i].FreightClass = classification;
                        }
                    }

                    if (lineItemArray[i].isHazardous !== "" && lineItemArray[i].isHazardous !== undefined && lineItemArray[i].isHazardous !== null) {
                        lineItemArray[i].isHazardous = lineItemArray[i].isHazardous;
                    } else {
                        lineItemArray[i].isHazardous = false;
                    }

                    if (lineItemArray[i].PackageUnitType !== '' && lineItemArray[i].PackageUnitType !== undefined) {
                        this.piecesCount.push(lineItemArray[i].PackageQuantity);
                        console.log('pieCount', this.piecesCount);
                    }
                    if (lineItemArray[i].HandlingUnitType === 'PLT') {
                        this.palletCount.push(lineItemArray[i].HandlingUnitQuantity);
                        console.log('palCount', this.palletCount);
                    }
                    object = {
                        'isHazardous': lineItemArray[i].isHazardous,
                        'FreightClass': lineItemArray[i].FreightClass,
                        'HandlingUnitType': lineItemArray[i].HandlingUnitType,
                        'HandlingUnitQuantity': lineItemArray[i].HandlingUnitQuantity,
                        'PackageQuantity': lineItemArray[i].PackageQuantity,
                        'Pieces': lineItemArray[i].PackageQuantity,
                        'nmfc': lineItemArray[i].nmfc,
                        'Description': lineItemArray[i].Description,
                        'Dimensions': {
                            'Length': lineItemArray[i].Dimensions.Length,
                            'Width': lineItemArray[i].Dimensions.Width,
                            'Height': lineItemArray[i].Dimensions.Height
                        },
                        'Weight': lineItemArray[i].Weight.Value
                    };
                    lineItemNewArray.push(object);
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
                }

                this.bolValue.lineItem = lineItemNewArray;
                this.totalPieces = 0;
                this.totalWeights = 0;
                for (let i = 0; i < lineItemArray.length; i++) {
                    this.totalPieces += Number(lineItemArray[i].HandlingUnitQuantity);
                    this.totalWeights += Number(lineItemArray[i].Weight.Value);
                }

            } else if (this.bolValue.bolCarrier === 'FEDEX_FREIGHT_ECONOMY' || this.bolValue.bolCarrier === 'FEDEX_FREIGHT_PRIORITY') {
                console.log('elseif', this.bolValue);
                let FEDEX;
                FEDEX = this.bolValue.bolCarrier.replace('_', ' ').replace('_', ' ');
                if (this.bolValue.bolRequest.billPaidTo.name === "BILLTOFORTE") {
                    this.bolValue.thirdParty = 'to Forte';
                    this.bolValue.thirdPartyCity = 'Fife';
                    this.bolValue.thirdPartyCompanyName = 'Forte';
                    this.bolValue.thirdPartyPostalCode = '98424';
                    this.bolValue.thirdPartyState = 'WA';
                    this.bolValue.thirdPartyStreet = '301 54th Ave. E.Ste 200';
                } else {
                    if (this.bolValue.bolRequest.billPaidTo.name === 'THIRDPARTY') {
                        this.bolValue.thirdParty = 'Third Party';
                        this.bolValue.thirdPartyCity = this.bolValue.bolRequest.billPaidTo.city;
                        this.bolValue.thirdPartyCompanyName = this.bolValue.bolRequest.billPaidTo.companyName;
                        this.bolValue.thirdPartyPostalCode = this.bolValue.bolRequest.billPaidTo.zip;
                        this.bolValue.thirdPartyState = this.bolValue.bolRequest.billPaidTo.state;
                        this.bolValue.thirdPartyStreet = this.bolValue.bolRequest.billPaidTo.address;
                    }
                }
                this.bolValue.createdOn = this.bolValue.createdOn;
                if (this.bolValue.rate !== "" && this.bolValue.rate !== null) {
                    this.bolValue.amount = this.bolValue.rate;
                } else {
                    this.bolValue.amount = '';
                }
                this.bolValue.serviceType = FEDEX;
                // this.bolValue.serviceType = this.bolValue.bolCarrier;
                // this.bolValue.spclInstructions = this.bolValue.bolRequest.DeliveryInstructions;
                this.bolValue.poNumber = this.bolValue.purchaseOrderNumber;
                this.bolValue.shipperNumber = this.bolValue.shipperIdNumber;
                this.bolValue.ReferenceNumber = this.bolValue.bolReferenceNumber;
                this.bolValue.shipperName = this.bolValue.bolRequest.shipper.companyName;
                this.bolValue.shipperCity = this.bolValue.bolRequest.shipper.city;
                this.bolValue.shipperStreet1 = this.bolValue.bolRequest.shipper.street1;
                this.bolValue.shipperCountry = this.bolValue.bolRequest.shipper.country;
                this.bolValue.shipperZip = this.bolValue.bolRequest.shipper.postalCode;
                this.bolValue.shipperState = this.bolValue.bolRequest.shipper.state;
                this.bolValue.shipperContactName = this.bolValue.bolRequest.shipper.contactName;
                // this.bolValue.shipperPhoneNumber = this.bolValue.bolRequest.shipper.phoneNumber;
                this.bolValue.consigneeName = this.bolValue.bolRequest.consignee.companyName;
                this.bolValue.consigneeCity = this.bolValue.bolRequest.consignee.city;
                this.bolValue.consigneeCountry = this.bolValue.bolRequest.consignee.country;
                this.bolValue.consigneeZip = this.bolValue.bolRequest.consignee.postalCode;
                this.bolValue.consigneeState = this.bolValue.bolRequest.consignee.state;
                // this.bolValue.consigneePhoneNumber = this.bolValue.bolRequest.consignee.phoneNumber;
                this.bolValue.consigneeStreet1 = this.bolValue.bolRequest.consignee.street1;
                this.bolValue.shipment = this.bolValue.bolRequest.shipment;
                this.bolValue.spclInstructions = this.bolValue.bolRequest.specialInstructions;
                this.bolValue.pickupConformationNumber = this.bolValue.pickupConformationNumber;
                this.bolValue.consigneeContactName = this.bolValue.bolRequest.consignee.contactName;
                if (this.bolValue.bolRequest.shipper.phoneNumber !== '' && this.bolValue.bolRequest.shipper.phoneNumber !== null && this.bolValue.bolRequest.shipper.phoneNumber !== undefined) {
                    if (this.bolValue.bolRequest.shipper.phoneNumber.length > 10) {
                        this.bolValue.shipperPhoneNumber = this.bolValue.bolRequest.shipper.phoneNumber;
                    } else {
                        this.bolValue.shipperPhoneNumber = this.formatPhoneNumber(this.bolValue.bolRequest.shipper.phoneNumber);
                    }
                }
                if (this.bolValue.bolRequest.consignee.phoneNumber.length > 10) {
                    this.bolValue.consigneePhoneNumber = this.bolValue.bolRequest.consignee.phoneNumber;
                } else {
                    this.bolValue.consigneePhoneNumber = this.formatPhoneNumber(this.bolValue.bolRequest.consignee.phoneNumber);
                }
                lineItemArray = this.bolValue.bolRequest.lineItems;
                for (let i = 0; i < lineItemArray.length; i++) {
                    if (lineItemArray[i].FreightClass.length > 0) {
                        removeClassification = lineItemArray[i].FreightClass.replace('CLASS_', '');
                        if (removeClassification.startsWith('0')) {
                            classification = removeClassification.replace('0', '');
                        } else {
                            classification = removeClassification;
                        }
                        if (classification.length > 2) {
                            lineItemArray[i].FreightClass = classification.replace('_', '.');
                        } else {
                            lineItemArray[i].FreightClass = classification;
                        }
                    }

                    if (lineItemArray[i].isHazardous !== "" && lineItemArray[i].isHazardous !== undefined && lineItemArray[i].isHazardous !== null) {
                        lineItemArray[i].isHazardous = lineItemArray[i].isHazardous;
                    } else {
                        lineItemArray[i].isHazardous = false;
                    }
                    if (lineItemArray[i].PackageUnitType !== '' && lineItemArray[i].PackageUnitType !== undefined) {
                        this.piecesCount.push(lineItemArray[i].PackageQuantity);
                        console.log('pieCount', this.piecesCount);
                    }
                    if (lineItemArray[i].HandlingUnitType === 'PALLET' || lineItemArray[i].HandlingUnitType === 'PLT') {
                        this.palletCount.push(lineItemArray[i].HandlingUnitQuantity);
                        console.log('palCount', this.palletCount);
                    }
                    // else {
                    // this.othersCount.push(lineItemArray[i].HandlingUnitQuantity);
                    // }
                    object = {
                        'isHazardous': lineItemArray[i].isHazardous,

                        'FreightClass': lineItemArray[i].FreightClass,
                        'HandlingUnitType': lineItemArray[i].HandlingUnitType,
                        'HandlingUnitQuantity': lineItemArray[i].HandlingUnitQuantity,
                        'PackageQuantity': lineItemArray[i].PackageQuantity,
                        'Pieces': lineItemArray[i].PackageQuantity,
                        'nmfc': lineItemArray[i].nmfc,
                        'Description': lineItemArray[i].Description,
                        'Dimensions': {
                            'Length': lineItemArray[i].Dimensions.Length,
                            'Width': lineItemArray[i].Dimensions.Width,
                            'Height': lineItemArray[i].Dimensions.Height
                        },
                        'Weight': lineItemArray[i].Weight.Value
                    };
                    lineItemNewArray.push(object);
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
                }
                this.bolValue.lineItem = lineItemNewArray;
                this.totalPieces = 0;
                this.totalWeights = 0;
                for (let i = 0; i < lineItemArray.length; i++) {
                    this.totalPieces += Number(lineItemArray[i].HandlingUnitQuantity);
                    this.totalWeights += Number(lineItemArray[i].Weight.Value);
                }

            }
            else {
                console.log('else');
                if (this.bolValue.otherCarrierName !== "Rate Quote") {
                    this.bolValue.serviceType = this.bolValue.otherCarrierName;
                    this.bolValue.shipperIdNumber = this.bolValue.shipperIdNumber;
                    this.bolValue.shippersBillOfLading = this.bolValue.shippersBillOfLading;
                    this.bolValue.purchaseOrderNumber = this.bolValue.purchaseOrderNumber;
                    this.bolValue.ReferenceNumber = this.bolValue.bolReferenceNumber;
                    lineItemArray = this.bolValue.bolRequest.lineItems;
                } else {
                    this.bolValue.serviceType = this.bolValue.bolCarrier;
                    this.bolValue.shipperIdNumber = this.bolValue.shipperIdNumber;
                    this.bolValue.shippersBillOfLading = this.bolValue.shippersBillOfLading;
                    this.bolValue.purchaseOrderNumber = this.bolValue.purchaseOrderNumber;
                    this.bolValue.ReferenceNumber = this.bolValue.controlNumber;
                    lineItemArray = JSON.parse(this.bolValue.bolRequest.lineItems);
                }
                if (this.bolValue.bolRequest.billPaidTo.name === "BILLTOFORTE") {
                    this.bolValue.thirdParty = 'to Forte';
                    this.bolValue.thirdPartyCity = 'Fife';
                    this.bolValue.thirdPartyCompanyName = 'Forte';
                    this.bolValue.thirdPartyPostalCode = '98424';
                    this.bolValue.thirdPartyState = 'WA';
                    this.bolValue.thirdPartyStreet = '301 54th Ave. E.Ste 200';
                } else {
                    if (this.bolValue.bolRequest.billPaidTo.name === 'THIRDPARTY') {
                        this.bolValue.thirdParty = 'Third Party';
                        this.bolValue.thirdPartyCity = this.bolValue.bolRequest.billPaidTo.city;
                        this.bolValue.thirdPartyCompanyName = this.bolValue.bolRequest.billPaidTo.companyName;
                        this.bolValue.thirdPartyPostalCode = this.bolValue.bolRequest.billPaidTo.zip;
                        this.bolValue.thirdPartyState = this.bolValue.bolRequest.billPaidTo.state;
                        this.bolValue.thirdPartyStreet = this.bolValue.bolRequest.billPaidTo.address;
                    } else if (this.bolValue.bolRequest.billPaidTo.name === 'PREPAID') {
                        this.bolValue.thirdParty = 'Prepaid';
                        this.bolValue.thirdPartyCity = this.bolValue.bolRequest.billPaidTo.city;
                        this.bolValue.thirdPartyCompanyName = this.bolValue.bolRequest.billPaidTo.companyName;
                        this.bolValue.thirdPartyPostalCode = this.bolValue.bolRequest.billPaidTo.zip;
                        this.bolValue.thirdPartyState = this.bolValue.bolRequest.billPaidTo.state;
                        this.bolValue.thirdPartyStreet = this.bolValue.bolRequest.billPaidTo.address;
                    } else if (this.bolValue.bolRequest.billPaidTo.name === 'COLLECT') {
                        this.bolValue.thirdParty = 'Collect';
                        this.bolValue.thirdPartyCity = this.bolValue.bolRequest.billPaidTo.city;
                        this.bolValue.thirdPartyCompanyName = this.bolValue.bolRequest.billPaidTo.companyName;
                        this.bolValue.thirdPartyPostalCode = this.bolValue.bolRequest.billPaidTo.zip;
                        this.bolValue.thirdPartyState = this.bolValue.bolRequest.billPaidTo.state;
                        this.bolValue.thirdPartyStreet = this.bolValue.bolRequest.billPaidTo.address;
                    }

                }                // this.bolValue.createdOn = this.bolValue.bolRequest.shipment;
                this.bolValue.createdOn = this.bolValue.createdOn;
                if (this.bolValue.rate !== "" && this.bolValue.rate !== null) {
                    this.bolValue.amount = this.bolValue.rate;
                } else {
                    this.bolValue.amount = '';
                }
                this.bolValue.spclInstructions = this.bolValue.bolRequest.specialInstructions;
                // this.bolValue.spclInstructions = this.bolValue.bolRequest.DeliveryInstructions;
                this.bolValue.poNumber = this.bolValue.purchaseOrderNumber;
                this.bolValue.shipperNumber = this.bolValue.shipperIdNumber;
                // this.bolValue.ReferenceNumber = this.bolValue.bolReferenceNumber;
                this.bolValue.shipperName = this.bolValue.bolRequest.shipper.companyName;
                this.bolValue.shipperCity = this.bolValue.bolRequest.shipper.city;
                this.bolValue.shipperStreet1 = this.bolValue.bolRequest.shipper.street1;
                this.bolValue.shipperCountry = this.bolValue.bolRequest.shipper.country;
                this.bolValue.shipperZip = this.bolValue.bolRequest.shipper.postalCode;
                this.bolValue.shipperState = this.bolValue.bolRequest.shipper.state;
                this.bolValue.shipperContactName = this.bolValue.bolRequest.shipper.contactName;
                // this.bolValue.shipperPhoneNumber = this.bolValue.bolRequest.shipper.phoneNumber;
                this.bolValue.consigneeName = this.bolValue.bolRequest.consignee.companyName;
                this.bolValue.consigneeCity = this.bolValue.bolRequest.consignee.city;
                this.bolValue.consigneeCountry = this.bolValue.bolRequest.consignee.country;
                this.bolValue.consigneeZip = this.bolValue.bolRequest.consignee.postalCode;
                this.bolValue.consigneeState = this.bolValue.bolRequest.consignee.state;
                // this.bolValue.consigneePhoneNumber = this.bolValue.bolRequest.consignee.phoneNumber;
                this.bolValue.consigneeStreet1 = this.bolValue.bolRequest.consignee.street1;
                this.bolValue.shipment = this.bolValue.bolRequest.shipment;
                this.bolValue.consigneeContactName = this.bolValue.bolRequest.consignee.contactName;
                if (this.bolValue.bolRequest.shipper.phoneNumber !== undefined && this.bolValue.bolRequest.shipper.phoneNumber !== null && this.bolValue.bolRequest.shipper.phoneNumber !== '') {


                    if (this.bolValue.bolRequest.shipper.phoneNumber.length > 10) {
                        this.bolValue.shipperPhoneNumber = this.bolValue.bolRequest.shipper.phoneNumber;
                    } else {
                        this.bolValue.shipperPhoneNumber = this.formatPhoneNumber(this.bolValue.bolRequest.shipper.phoneNumber);
                    }

                } else {
                    this.bolValue.shipperPhoneNumber = '-';
                }

                if (this.bolValue.bolRequest.consignee.phoneNumber !== undefined && this.bolValue.bolRequest.consignee.phoneNumber !== null && this.bolValue.bolRequest.consignee.phoneNumber !== '') {

                    if (this.bolValue.bolRequest.consignee.phoneNumber.length > 10) {
                        this.bolValue.consigneePhoneNumber = this.bolValue.bolRequest.consignee.phoneNumber;
                    } else {
                        this.bolValue.consigneePhoneNumber = this.formatPhoneNumber(this.bolValue.bolRequest.consignee.phoneNumber);
                    }

                } else {
                    this.bolValue.consigneePhoneNumber = '-';
                }

                console.log('item', lineItemArray);
                for (let i = 0; i < lineItemArray.length; i++) {
                    if (lineItemArray[i].FreightClass !== undefined) {
                        if (lineItemArray[i].FreightClass.length > 0) {
                            removeClassification = lineItemArray[i].FreightClass.replace('CLASS_', '');
                            if (removeClassification.startsWith('0')) {
                                classification = removeClassification.replace('0', '');
                            } else {
                                classification = removeClassification;
                            }
                            if (classification.length > 2) {
                                lineItemArray[i].FreightClass = classification.replace('_', '.');
                            } else {
                                lineItemArray[i].FreightClass = classification;
                            }
                        }
                    } else {

                    }
                    if (lineItemArray[i].isHazardous !== "" && lineItemArray[i].isHazardous !== undefined && lineItemArray[i].isHazardous !== null) {
                        lineItemArray[i].isHazardous = lineItemArray[i].isHazardous;
                    } else {
                        lineItemArray[i].isHazardous = false;
                    }


                    console.log('lineItemArray', lineItemArray[i]);
                    console.log('lineItemArray[i].Dimensions', lineItemArray[i].Dimensions);
                    if (lineItemArray[i].Dimensions !== undefined) {
                        if (lineItemArray[i].Dimensions.Length !== undefined && lineItemArray[i].Dimensions.Length !== null) {
                            console.log('lineItemArray', lineItemArray);
                            object = {
                                'isHazardous': lineItemArray[i].isHazardous,
                                'FreightClass': lineItemArray[i].FreightClass,
                                'HandlingUnitQuantity': lineItemArray[i].HandlingUnitQuantity,
                                'PackageQuantity': lineItemArray[i].PackageQuantity,
                                'Pieces': lineItemArray[i].Pieces,
                                'nmfc': lineItemArray[i].nmfc,
                                'Description': lineItemArray[i].Description,
                                'Dimensions': {
                                    'Length': lineItemArray[i].Dimensions.Length,
                                    'Width': lineItemArray[i].Dimensions.Width,
                                    'Height': lineItemArray[i].Dimensions.Height
                                },
                                'Weight': lineItemArray[i].Weight.Value
                            };
                        }
                    } else {
                        object = {
                            'isHazardous': lineItemArray[i].isHazardous,

                            'FreightClass': lineItemArray[i].FreightClass,
                            'HandlingUnitQuantity': lineItemArray[i].HandlingUnitQuantity,
                            'PackageQuantity': lineItemArray[i].PackageQuantity,
                            'Pieces': lineItemArray[i].Pieces,
                            'nmfc': lineItemArray[i].nmfc,
                            'Description': lineItemArray[i].Description,
                            'Dimensions': {
                                'Length': '',
                                'Width': '',
                                'Height': ''
                            },
                            'Weight': ''
                        };
                    }
                    lineItemNewArray.push(object);
                }

                this.bolValue.lineItem = lineItemNewArray;
                this.totalPieces = 0;
                this.totalWeights = 0;
                for (let i = 0; i < lineItemArray.length; i++) {
                    this.totalPieces += Number(lineItemArray[i].HandlingUnitQuantity);
                    this.totalWeights += Number(lineItemArray[i].Weight.Value);
                }

            }

        });

    }

    formatPhoneNumber(s: any) {
        let s2 = ('' + s).replace(/\D/g, '');
        let m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        return (!m) ? null : '(' + m[1] + ')' + m[2] + '-' + m[3];
    }
    netChargeArrSum(netCharge: any) {
        let total = 0;
        netCharge.forEach(function (key: any) {
            total = total + Number(key);
        });
        return total;
    }
    tracking(trackingNumber: any, carrier: any) {
        console.log('trackingNumber', trackingNumber, carrier);
    }



    downloadPdfTest(bolValue: any) {
        var data1;
        let bolName: any;
        if (this.bolValue.bolCarrier === 'FEDEX_FREIGHT_ECONOMY' || this.bolValue.bolCarrier === 'FEDEX_FREIGHT_PRIORITY') {
            if (this.bolValue.trackingNumber !== undefined) {
                bolName = "FEDEX" + "_" + this.bolValue.trackingNumber;
            } else {
                bolName = "FEDEX" + "_" + this.bolValue.bolResponse;
            }

        } else if (this.bolValue.bolCarrier === 'YRC') {
            console.log('this.bolValue.proNumber', this.bolValue.proNumber)
            if (this.bolValue.proNumber !== undefined) {
                bolName = "YRC" + "_" + this.bolValue.proNumber;
            } else if (this.bolValue.proNumber === undefined && this.showProNumber === false && this.bolValue.bolResponse === '') {
                bolName = "YRC" + "_" + this.bolValue.bolReferenceNumber;
            } else {
                bolName = "YRC" + "_" + this.bolValue.bolResponse;
            }

        } else if (this.bolValue.bolCarrier === 'REDDAWAY') {
            bolName = "Reddaway" + "_" + this.bolValue.bolResponse;
        } else {
            bolName = "Others" + "_" + this.bolValue.bolResponse;
        }
        var data:any = document.getElementById('bolContainer');
        html2canvas(data).then((canvas: any) => {
            // Few necessary setting options 
            var imgWidth = 605;
            var pageHeight = 612;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'pt', 'letter'); // A4 size page of PDF 
            var position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            pdf.save(bolName + ".pdf"); // Generated PDF 
        });
    }




    editTrackProNumber(data: any) {
        console.log('data', data);
        this.updateForm();
        this.updateTrackProNumberForm.patchValue({
            bolTrackingNumberOld: data.bolTrackingNumber,
            pickupConformationNumberOld: data.pickupConformationNumber,
            id: data.id
        });
    }
    updateTrackProNumber(value: any) {
        console.log('value', value);
        this.pricingInfoService.updateBolTrackNumber(value).subscribe((response: any) => {
            this.updateResponse = response.result;
            console.log('this.updae', response);
            if (this.updateResponse === true) {
                Swal.fire('Updated!',
                    'Updated Pro/Track Number Sucessfully!',
                    'success',
                );
            } else {
                Swal.fire( 'Oops!','Failed to update Pro/Track Number!','error');
            }
            this.localStorageValues();
        }, (err: any) => {
            Swal.fire('Oops!','Failed to update Pro/Track Number!','error');
        });

    }
}

