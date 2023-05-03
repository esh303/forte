import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { classArrayForBillOfLading } from '../app.constant';
import { PricingInfoService } from '../services/pricing-info.service';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { LoggerService } from '../services/logger.service';
import { DatePipe } from '@angular/common';
import { ExternalService } from '../services/external.service';
import { QuoteReportService } from '../services/quote-report.service';
// import { TypeaheadMatch } from 'ngx-bootstrap';
// import {TypeaheadMatch} from 'ngx-bootstrap'
import { increasePercentForAR } from '../app.constant';
import { ToastrService } from 'ngx-toastr';
// import * as moment from 'moment';
import * as moment from 'moment-timezone';
// import { RATING_CONTROL_VALUE_ACCESSOR } from 'ngx-bootstrap/rating/rating.component';
import { Subscription } from 'rxjs';
// import { patch } from 'webdriver-js-extender';
declare var $: any;
// import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { ElementRef } from '@angular/core';
// import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import Swal from 'sweetalert2';
// var moment = require('moment-timezone');
import { IDropdownSettings } from 'ng-multiselect-dropdown';



@Component({
  selector: 'app-bol',
  templateUrl: './bol.component.html',
  styleUrls: ['./bol.component.css']
})
export class BolComponent implements OnInit, OnDestroy {
  @ViewChild("descriptionToggle") select:any=  ElementRef;
  @ViewChild("tabletemplate") inp: any = ElementRef;
  billOfLading: FormGroup = new FormGroup({});
  assessorialForm: FormGroup= new FormGroup({});
  showModal = false;
  addressTemplateNameForm: FormGroup = new FormGroup({});
  itemTemplateNameForm: FormGroup = new FormGroup({});
  editLineItemUpdateForm: FormGroup = new FormGroup({});
  hazmadForm: FormGroup = new FormGroup({});
  reddawayMessage:any;
  splInstructionsTemplateNameForm: FormGroup= new FormGroup({});
  piecesForm: FormGroup =new FormGroup({});
  editShipmentInformationForm: FormGroup = new FormGroup({});
  submitted:any = false;
  @ViewChild('dropdownRef') dropdownRef: any;
  showyrcArError:any = false;
  showfedexArError:any = false;
  showMessageForFedexAr:any = false;
  showReddawayMessage:any = false;
  public descriptionErrorMsg = false;
  public showShipmentErrorMeassage = false;
  yrcErrorMessage:any;
  showMessageFedexAR:any;
  fedexArError:any;
  public previewValue:any;
  public previewTotalPieces: any = 0;
  public previewTotalPallets: any = 0;
  public previewTotalOthers: any = 0;
  public totalPieces: any =0;
  public totalWeights: any =0;
  public showAddedValue = false;
  public showErrorMessage = false;
  public consigneeErrorMessage = false;
  public shipperErrorMessage = false;
  public thirdPartyErrorMessage = false;
  public showShipmentErrorMsg = false;
  public existingQuoteErrorMsg = false;
  public showQuoteDetail = false;
  public showThirdParty = false;
  public showAddField = true;
  public setFlagForExisting = false;
  public setFlagForNotExisting = true;
  public detailArray:any = [];
  public classArray = classArrayForBillOfLading;
  // public getZipCode: any;
  public quoteDetails: any;
  public editIndex:any;
  public accessToken;
  public destinationCity:any;
  public destinationState:any;
  public originCity:any;
  public originState:any;
  public thirdPartyCity:any;
  public thirdPartyState:any;
  public logger:any;
  public salesRepId:any;
  public setSalesRepId:any;
  public fuelCharges:any;
  public charge:any;
  public addRowForExistingQuote = false;
  public errorResponseInGetRate = false;
  public getRateMsg = false;
  public serviceCarrierType:any;
  public showAdminErrorMessage = false;
  public addressTemplatesPresent = false;
  public showInputForOthers = false;
  public shipperTemplate:any = [];
  public consigneeTemplate:any = [];
  public items:any;
  selectedIndex = 0;
  public thirdPartyTemplate:any = [];
  public shipperTemplatesPresent = false;
  public consigneeTemplatesPresent = false;
  public shipperTemplate1:any = [];
  public consigneeTemplate1:any = [];
  public thirdPartyTemplate1:any = [];
  public description = '';
  public othersCount = [];
  public setFlagForDimensions = false;
  public showFlagForDimensions = false;
  public showShipmentTable = true;
  public packageQuantityValue:any;
  public showIfNoMixedPallet = false;
  public showAddedValueForMixedPallet = false;
  public showForItemize = false;
  public increasedValueForAR = Number(increasePercentForAR);
  public combiningAllShipmentsRequestArray:any = [];
  public splInstructionTemplatesPresent = false;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public mask1 = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /[s]/, /[S]/, /\d/, /\d/];
  specialInstructionsCharacterCount: any;
  public enableDescriptionValue = false;
  public isDoublePress = false;
  public lastPressed:any;
  charArray:any = [];
  // dropdownSettings = {
  //   singleSelection: false,
  //   text: 'Select',
  //   enableCheckAll: false,
  //   selectAllText: 'Select All',
  //   unSelectAllText: 'UnSelect All',
  //   /* badgeShowLimit: '1',*/
  //   enableSearchFilter: false,
  //   classes: 'myclass custom-class',
  //   escapeToClose: this.showModal

  // };
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'itemName',
    enableCheckAll: false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    // selectAllText: 'Select All',
    // unSelectAllText: 'UnSelect All',
    // itemsShowLimit: 3,
    allowSearchFilter: false
  }
  dropdownSettingsDisabled : IDropdownSettings = {
    singleSelection: false,
    // text: 'Select',
    enableCheckAll: false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    idField: 'id',
    textField: 'itemName',
    /* badgeShowLimit: '1',*/
    // enableSearchFilter: false,
    // disabled: true,
    // classes: 'myclass custom-class',
    // escapeToClose: this.showModal
  }
  //  { 'id': 1, 'itemName': 'LiftGate Service', 'Yrccost': '8.80', 'Fedexcost': '72.06', 'name': 'LiftGate' },
  dropdownList = [
    { 'id': 1, 'itemName': 'LiftGate Pickup', 'Yrccost': '8.80', 'Fedexcost': '72.06', 'name': 'LiftGate' },
    { 'id': 10, 'itemName': 'LiftGate Delivery', 'Yrccost': '8.80', 'Fedexcost': '72.06', 'name': 'LiftGate' },
    { 'id': 2, 'itemName': 'Residential PickUp', 'Yrccost': '11', 'Fedexcost': '76' },
    { 'id': 11, 'itemName': 'Residential Delivery', 'Yrccost': '11', 'Fedexcost': '76' },
    { 'id': 3, 'itemName': 'Limited Access PickUp', 'Yrccost': '0', 'Fedexcost': '76' },
    { 'id': 12, 'itemName': 'Limited Access Delivery', 'Yrccost': '0', 'Fedexcost': '76' },
    { 'id': 4, 'itemName': 'Inside Delivery', 'Yrccost': '11.85', 'Fedexcost': '6.98', 'FedexcostAR': '11.40', 'name': 'Inside Delivery' },
    { 'id': 5, 'itemName': 'Notify', 'Yrccost': '0', 'Fedexcost': '0', 'name': 'Notify' },
    { 'id': 7, 'itemName': 'Delivery Appointment Required', 'Yrccost': '0', 'Fedexcost': '0' },
    { 'id': 8, 'itemName': 'Hazmat', 'Yrccost': '0', 'Fedexcost': '0' }

  ];
  public reddawayResultAR:any;
  public reddawayDiscountAR:any;
  public reddawayFuelsurchargeAR:any;
  public reddawayProfileRateAr:any;
  public fuelChargeReddawayAR:any;
  public reddawayARFinalRateArray:any;
  public arrayDataReddaway:any;
  public reddawayAPFinalRateArray:any;
  public pricingInfoReddawayAR:any;
  public totalHandlingUnits:any;
  public createBillOfLading: any;
  public responseData: any;
  public quoteResponse: any;
  public customerData: any;
  public rateDetailObject: any;
  public showLoader = false;
  public showForOthers = false;
  public showErrorCustomer = false;
  public customerFeatures:any;
  public salesRep:any;
  public salesRepValues:any;
  public salesRepType:any;
  public userData: any;
  public customerId:any;
  public customer:any;
  public pricingDetail:any = [];
  public showPreview = false;
  public pricingInfoFedexEconomyAR:any;
  public pricingInfoFedexPriorityAR:any;
  public fedexArResponse: any;
  public parsetableFedexArData: any;
  public fedexEcoDiscountAR:any;
  public fedexEcoFuelsurchargeAR:any;
  public fedexPriDiscountAR:any;
  public fedexPriFuelsurchargeAR:any;
  public netChargeDiffValue:any;
  public netChargeValue:any;
  public netChargeDiffPriValue:any;
  public netChargePriValue:any;
  public finalRateCharge:any;
  public quote:any;
  public quoteId:any;
  public quoteDetailsArray:any = [];
  public yrcAPFinalRateArray:any;
  public carrierName:any;
  public pricingInfoAR:any;
  public yrcArResponse:any;
  public parsetableArData:any;
  public yrcDiscountAR:any;
  public yrcFuelsurchargeAR:any;
  public fuelChargeYrcAR:any;
  public addExtraValues:any;
  public totalRate:any;
  public totalValueAR:any;
  public selectedItems:any = [];
  public arrayData:any = [];
  public arrayDataAR:any = [];
  public addSingleShipmentValue:any;
  public yrcARFinalRateArray:any;
  public arrayDataYrc:any;
  public amountValue:any;
  public amountIncDecData:any;
  public selectedValueYrc:any;
  public selectedValueAR:any;
  public selectedValue:any;
  public fedexARFinalRateArray:any;
  public showCommonError = false;
  public fedexAPFinalRateArray:any;
  public showErrorResponseYrc = false;
  public showForm = true;
  public showErrorResponseFedex = false;
  public minDate:any;
  public maxDate = new Date();
  public loading = false;
  public showErrorForFedex = false;
  public customerType:any;
  public loginCustomerId:any;
  public showGetRateButton = true;
  public showRate = true;
  public invalidErrorMessage:any;
  public showCheckForWeight:any;
  public invalidErrorWeightMessage:any;
  public operationMessage:any;
  public checkForWeight = false;
  public showForYrc = false;
  public parseSetMasterData:any;
  public handlingUnitTypeArray = ['CTN', 'PLT', 'PCS', 'DRM'];
  public packageUnitArray = ['PLT', 'PCS', 'DRM', 'CTN'];
  public weightUnitTypeArray = ['ttl', 'ea.'];
  public weightForCal:any;
  public pricingInformation:any;
  public showDeficitValue = false;
  public showMinimumCharge = false;
  public showSingleShipmentValue = false;
  public showDirections:any;
  public showShipperName = false;
  public resultArray:any = [];
  public weightUnit = 'ttl';
  public serviceNotAvailableMsg = false;
  public showNmfcErrorMsg = false;
  public addressTemplate:any;
  public openType: any;
  public tempArray:any;
  public templateId: any;
  public shipperPhoneNumber:any;
  public addressTemplateAutoFill: any;
  public itemTemplate: any;
  public itemTemplateAutoFill: any;
  public addTemp: any;
  public itemTemp: any;
  public carrierResponse: any;
  public carrierArray:any = [];
  public errorGetRateMsg = false;
  public showIfNoRule = false;
  public showCarrierNoRule = false;
  public showCarrierRule = false;
  public addressTemplateName: any;
  public itemTemplateName: any;
  public newAddressTemplate: any;
  public newItemTemplate: any;
  public itemIndex: any;
  public setSpecificRule = false;
  public createStoreFlag = false;
  public carrierValueArray = ['YRC', 'FXFP', 'FXFE', 'REDDAWAY'];
  public itemTemplatesPresent = false;
  public invalidQuoteMsg = false;
  public invalidQuoteCarrierMsg = false;
  public showForAdminCarrier = false;
  public billOfLadingValues: any;
  public accessorials:any = [];
  public lengthOfDetailArray:any;
  public showErrorMsgForGetRate = false;
  public salesRepDetails: any;
  public palletCount:any = [];
  public piecesCount:any = [];
  public palletData:any;
  public piecesData:any;
  public backButtonCarrier = false;
  public showSideMenu = false;
  public companyId:any;
  public totalChargeValue:any;
  public editRowArray:any;
  public nmfcUpdate = '';
  public descriptionUpdate = '';
  public errorMsgForUpdate = false;
  public disableQuoteNumber = false;
  public setEditModalFlag = false;
  public serviceTypeForExisting:any;
  public errorResponse:any;
  public rateErrorResponse = false;
  public specificQuoteIdObject:any;
  public singleReportData:any;
  public assessorialList:any = [];
  public sendEmailArFlag = false;
  public singleCustomerName:any;
  public singleReportDataResponse: any;
  public showPrepaid = false;
  public showCollect = false;
  public showCarrierErrorMsg = false;
  public bolShipmentNewDate:any;
  public mailResponse:any;
  public originCityState:any;
  public destinationCityState:any;
  public getARRule:any;
  public costPlusPercentFactor:any;
  public applyCostFactor = false;
  public localStorageArData:any;
  public highCostForFedex:any;
  public quoteDetailsId:any;
  public costPlusArray:any = [];
  public responseDataForRate: any;
  public higherValueAp = false;
  public factorization:any;
  public newWeight:any;
  public selectedItemValue:any = [];
  public showAllValues = false;
  public showForMixedPallet = false;
  public piecesListArray:any = [];
  public showForMultiClassPiecesList = false;
  public showUpdateIcon = false;
  public piecesIndex:any;
  public addPiecesHeader:any;
  public piecesForMultiClassListArray:any = [];
  public piecesForItemizeListArray:any = [];
  public piecesClassListArray:any = [];
  public rowIndex:any;
  public showForAddPiecesInTable = true;
  public rowSpanValues:any;
  public piecesDetailsArray:any = [];
  public showEditPiecesForm = false;
  public rowValues:any;
  public combiningAllShipmentsArray:any = [];
  public errorMessageForWeightCount = false;
  public showWeightVarianceMsg:any;
  public totalWeightForPieces:any;
  public totalHeaderWeight:any;
  public headerDetailForShipment:any;
  public multiClassShipmentTable = true;
  public nonItemizeShipmentTable = true
  public noRuleErrorMsg = false;
  public disableCertainFields = false;
  public rulesCarrierArray:any = [];
  public errorMessageForPiecesCount = false;
  public thirdPartyTemplatesPresent = false;
  public totalPiecesForMultiClass:any;
  public showPiecesVarianceMsg:any;
  public totalHeaderPieces:any;
  public showoverdimensionerror = false;
  public splInstructionTemplate:any;
  isDisabledNonItemize = false;
  isDisabledItemize = false;
  isDisabledMultiClass = false;
  getRateCheck = false;
  continueBOLId = false;
  getReferenceNumber: any;
  referenceSubsciption: Subscription;
  quoteSubscription: Subscription;
  getRateFlag = false;
  pickCarrierFlag = false;
  showCompanyname: any = false;
  companyName: any;
  billPaidNamePricing: any = false;
  selectedItem: any;
  billPaidNamePricingname: any;
  public enableAutoComplete = true;
  filterData:any = [];
  getQuoteId: any;
  public companyDetails: any;
  companySpecificName: any;
  companyData: any;
  closeDescription = false;
  showTableZip = false;
  consigneeZipArray:any = [];
  patchHazadDescription = false;
  showNoShipmentError = false;
  showToolTip = false;
  showEnteringForm = false;
  disableCarrier:any;
  noshipmentDataMessage = false;
  emergencyStop = false;
  emergencyStopYRC = true;
  emergencyStopPriority = true;
  emergencyStopEconomy = true;
  emergencyStopReddaway= true;
  voltlTable = false;
  detailvoltlArray:any = [];
  highcostArray: any =[];
  showcolor = false;

  constructor(private externalService: ExternalService,
    private fb: FormBuilder,
    private pricingInfoService: PricingInfoService,
    private router: Router,
    private customerService: CustomerService,
    private loggerService: LoggerService,
    private quoteReportService: QuoteReportService,
    private toastr: ToastrService,
    // private hotkeysService: HotkeysService,
    private datePipe: DatePipe) {
    this.accessToken = localStorage.getItem('accessToken');
    this.getAllCompanyNotes();
    this.maxDate.setDate(this.maxDate.getDate() + 9);
    this.referenceSubsciption = this.pricingInfoService.referenceObservable.subscribe((data) => {
      console.log('data', data);
      this.getReferenceNumber = data;
    });
    this.emergencyStatus();
    console.log('acc',this.dropdownList);

    this.quoteSubscription = this.pricingInfoService.quoteObservable.subscribe((res) => {
      console.log('res', res);
      this.getQuoteId = res;
    });
    console.log(this.getQuoteId);

  }

  ngOnInit() {
    $("#success-alert").hide();
    this.buildForm();
    this.buildAccessorialForm();
    this.buildHazmadForm();
    this.getAllCompanyNotes();
    if (this.getReferenceNumber === null || this.getReferenceNumber === '') {
      if (this.getQuoteId !== null || this.getQuoteId === '') {
        this.buildForm();
        this.editForm();
        this.editShipmentForm();
        this.piecesValidationForm();
        this.localStorageSalesData();
        this.getBolValues();
        this.showCompanyname = false;
      } else {
        this.buildForm();
        this.editForm();
        this.editShipmentForm();
        this.piecesValidationForm();
        this.localStorageSalesData();
        // this.getBolValues();
        this.showCompanyname = false;
      }


    }
    else {
      this.buildForm();
      this.editForm();
      this.editShipmentForm();
      this.piecesValidationForm();
      // this.pricingInfoService.getBillOfLadingValues()
      this.patchBolValues(this.getReferenceNumber);
    }

    if (this.salesRepType === 'customerServiceRep') {
      // this.getAllShipperName();
      this.showShipperName = false;
    } else if (this.salesRepType === 'administrator') {
      // this.getAllShipperName();
      this.showShipperName = false;
    } else {
      this.showShipperName = true;

    }

    window.scroll(0, 0);
  }
  emergencyStatus() {
    // this.pricingInfoService.getEmergencyStatus().subscribe((res) => {
    //   console.log(res);
    //   if (res.emergencyService === 'stop') {
    //     this.emergencyStop = false;
    //     console.log(this.emergencyStop)
    //   } else {
    //     this.emergencyStop = true;
    //   }
    // })
    this.pricingInfoService.getEmergencyStatus().subscribe((res:any) => {
      console.log(res);
      if (res.yrc === true) {
        this.emergencyStopYRC = true;
      } else {
        this.emergencyStopYRC = false;
        // this.selectedCarrier.push('YRC');

      }
      if (res.reddaway === true) {
        this.emergencyStopReddaway = true;
      } else {
        this.emergencyStopReddaway = false;
      }
      if (res.fxfe === true) {
        this.emergencyStopEconomy = true;
      } else {
        this.emergencyStopEconomy = false;
      }
      if (res.fxfp === true) {
        this.emergencyStopPriority = true;
      } else {
        this.emergencyStopPriority = false;
      }
      if (res.yrc === false || res.reddaway === false || res.fxfe === false || res.fxfp === false) {
        this.emergencyStop = true;
        console.log(this.emergencyStop)
      } else {
        this.emergencyStop = false;
      }
    })
  }


  getAllCompanyNotes() {
    this.customerService.getCompanyDetails(this.accessToken).subscribe(getCustomerData => {
      this.companyDetails = getCustomerData;
      console.log(this.companyDetails);

    });
  }
  editForm() {
    this.editLineItemUpdateForm = this.fb.group({
      handlingUnitQuantityUpdate: [''],
      handlingUnitTypeUpdate: ['PLT'],
      packageQuantityUpdate: [''],
      packageUnitTypeUpdate: ['CTN'],
      lengthUpdate: [''],
      widthUpdate: [''],
      heightUpdate: [''],
      descriptionUpdate: [''],
      nmfcUpdate: [''],
      hazmatUpdate: [''],
      weightUpdate: [''],
      weightUnitUpdate: ['']
    });
  }
  editShipmentForm() {
    this.editShipmentInformationForm = this.fb.group({
      handlingUnitQuantity: [''],
      handlingUnitType: ['PLT'],
      packageQuantity: [''],
      packageUnitType: [''],
      length: [''],
      width: [''],
      height: [''],
      description: [''],
      nmfc: [''],
      hazmat: [''],
      weight: [''],
      weightUnit: ['ttl'],
      cube: [''],
      classification: ['']
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.billOfLading.controls; }

  ngAfterViewInit() {
    // this.renderer.selectRootElement(this.input["nativeElement"]).focus()
    // #descnote
    // document.getElementById('tasknote').focus();
  }

  patchBolValues(patchData:any) {
    console.log(patchData);
    this.customerType = localStorage.getItem(('customerType'));
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.salesRepValues = JSON.parse(this.salesRep);
    this.templateId = this.salesRepValues.id;
    this.addressTemplateData();
    this.companyId = patchData.companyId;
    // this.templateId = this.salesRepValues.companyId;
    this.salesRepType = this.salesRepValues.type;
    if (this.customerType === 'admin') {
      this.showCompanyname = true;
      this.loginCustomerId = 0;
      this.salesRepId = this.salesRepValues.id;
      this.customerId = 0;
      this.setSalesRepId = this.salesRepValues.id;
      // this.companyId = 0;
      this.carrierArray = this.carrierValueArray;
      this.showForAdminCarrier = true;
      this.showGetRateButton = false;
      this.showSideMenu = false;
      console.log('customer', this.shipperTemplate);
      console.log('admin', this.shipperTemplate1);
      this.shipperTemplate1.forEach((obj:any) => {
        if (obj.companyId === this.companyId) {
          this.companyName = obj.companyName;
        }
      });
    } else {
      this.showCompanyname = false;
      this.loginCustomerId = this.salesRepValues.id;
      this.salesRepId = this.salesRepValues.salesRepId;
      this.customerId = this.salesRepValues.id;
      this.companyId = this.salesRepValues.companyId;
      this.setSalesRepId = 0;
      this.showForAdminCarrier = false;
      this.pricingInfoService.getInternalSalesRep(this.salesRepId, this.accessToken).subscribe((data:any) => {
        this.salesRepDetails = data[0];
      });
      this.showSideMenu = true;
      this.customerService.getSalesRepData(this.accessToken, this.salesRepValues.salesRepId).subscribe((response:any) => {
        this.salesRepValues.salesRepName = response[0].salesRepName;
        this.salesRepValues.salesRepEmail = response[0].email;
        console.log('this.salesRepValues', this.salesRepValues);
      });
      console.log('customer', this.shipperTemplate);
      console.log('admin', this.shipperTemplate1);

    }
    this.piecesForItemizeListArray = [];
    this.piecesForMultiClassListArray = [];
    this.detailArray = [];
    patchData.bolRequest = patchData.bolRequest;

    patchData.lineItems = patchData.bolRequest.lineItems;
    let phoneNumber = this.formatPhoneNumber(patchData.bolRequest.consignee.phoneNumber);
    let shipperContactNumber = this.formatPhoneNumber(patchData.bolRequest.shipper.phoneNumber);
    if (patchData.bolRequest.billPaidTo.name === 'BILLTOFORTE') {
      this.billOfLading.patchValue({
        thirdParty: 'BillToForte'
      });
    }
    if (patchData.pickupDate !== null) {
      this.billOfLading.patchValue({
        pickupDate: patchData.pickupDate
      });
    } else {
      this.billOfLading.patchValue({
        pickupDate: ''
      });
    }
    if (patchData.shipTimestamp !== null) {
      this.billOfLading.patchValue({
        shipTimestamp: patchData.shipTimestamp
      });
    } else {
      this.billOfLading.patchValue({
        shipTimestamp: ''
      });
    }
    this.billOfLading.patchValue({
      shipTimestamp: new Date()
    })
    let timestamp = new Date();
    console.log('timestamp', timestamp);
    let pstDate = moment(timestamp).tz("America/Los_Angeles").format();
    // let pstDate = moment(timestamp).tz("America/Los_Angeles").format();

    // moment(timestamp).t
    let newValue = pstDate.split('T');
    console.log('pstNrewvbgfrd', new Date(newValue[0]));
    let newDate = new Date(newValue[0]);
    this.bolShipmentNewDate = newDate;
    this.minDate = newDate;
    console.log('this.bolShipmentNewDate', this.bolShipmentNewDate);
    this.customerService.getCarrierForCustomer(this.companyId, this.accessToken).subscribe(response => {
      this.carrierResponse = response;
      let carrier;
      if (this.carrierResponse.length > 0) {
        for (let d = 0; d < this.carrierResponse.length; d++) {
          if (this.carrierResponse[d].type === 'FEDEX ECONOMY') {
            carrier = 'FXFE';
          } else if (this.carrierResponse[d].type === 'FEDEX PRIORITY') {
            carrier = 'FXFP';
          } else {
            carrier = this.carrierResponse[d].type;
          }
          this.carrierArray.push(carrier);
        }
        if (this.carrierArray.length > 0) {
          this.carrierArray = this.removeDuplicates(this.carrierArray);
          this.showCarrierRule = true;
        }
      } else {
        this.carrierArray = [];
        this.errorGetRateMsg = true;
        this.showCarrierRule = false;
        this.showCarrierNoRule = false;
      }
    });
    this.billOfLading.patchValue({
      shipperCompanyName: patchData.bolRequest.shipper.companyName,
      shipperContactName: patchData.bolRequest.shipper.contactName,
      shipperPhoneNumber: shipperContactNumber,
      shipperStreet1: patchData.bolRequest.shipper.street1,
      shipperStreet2: patchData.bolRequest.shipper.street2,
      shipperCountry: 'USA',
      shipperPostalCode: patchData.bolRequest.shipper.postalCode,
      shipperCity: patchData.bolRequest.shipper.city,
      shipperState: patchData.bolRequest.shipper.state,
      // shipperPhoneNumber: shipperContactNumber,
      consigneeCompanyName: patchData.bolRequest.consignee.companyName,
      consigneeContactName: patchData.bolRequest.consignee.contactName,
      consigneePhoneNumber: phoneNumber,
      consigneeStreet1: patchData.bolRequest.consignee.street1,
      consigneeStreet2: patchData.bolRequest.consignee.street2,
      consigneeCountry: 'USA',
      consigneePostalCode: patchData.bolRequest.consignee.postalCode,
      consigneeCity: patchData.bolRequest.consignee.city,
      consigneeState: patchData.bolRequest.consignee.state,
      shipmentType: patchData.bolRequest.lineItemsFormat[0].shipmentType,
      // consigneePostalCode : patchData.lineItems.consignee.z
      specialInstructions: patchData.bolRequest.specialInstructions,
      accessorials: patchData.accessorials
    });
    this.specialInstructionsCharacterCount = this.billOfLading.value.specialInstructions.length;

    // this.thirdParty(this.billOfLadingValues.
    for (let i = 0; i < patchData.bolRequest.lineItemsFormat.length; i++) {
      if (patchData.bolRequest.lineItemsFormat[i].shipmentType === 'Itemized') {
        this.billOfLading.patchValue({
          shipmentType: 'Itemized'
        })
        patchData.bolRequest.lineItemsFormat[i].HandlingUnitType = 'PLT';
        patchData.bolRequest.lineItemsFormat[i].PackageUnitType = 'CTN';
        this.piecesForItemizeListArray = patchData.bolRequest.lineItemsFormat;
        // (<HTMLInputElement>document.getElementById("cpf3")).value = '';
      } else if (patchData.bolRequest.lineItemsFormat[i].shipmentType === 'Multi Classed Pallet' || patchData.bolRequest.lineItemsFormat[i].showFlag === "Multi Class Pallet") {
        patchData.bolRequest.lineItemsFormat[i].HandlingUnitType = 'PLT';
        patchData.bolRequest.lineItemsFormat[i].PackageUnitType = 'CTN';
        this.piecesForMultiClassListArray = patchData.bolRequest.lineItemsFormat;
        console.log('multiclassArray', this.piecesForMultiClassListArray);
        this.billOfLading.patchValue({
          shipmentType: 'Multi Classed Pallet'
        });
        if (patchData.bolRequest.lineItemsFormat[i].newAddPieces.length > 0) {
          for (let j = 0; j < patchData.bolRequest.lineItemsFormat[i].newAddPieces.length; j++) {
            this.removeClassification = patchData.bolRequest.lineItemsFormat[i].newAddPieces[j].FreightClass.split('_')[1];

            console.log(this.removeClassification);
            patchData.bolRequest.lineItemsFormat[i].newAddPieces[j].FreightClass = this.removeClassification;
            // this.pricingDetail.push(patchData.bolRequest.lineItemsFormat[i].newAddPieces[j])
          }
        } else {
          patchData.bolRequest.lineItemsFormat[i].newAddPieces = [];
        }


      } else {
        patchData.bolRequest.lineItemsFormat[i].HandlingUnitType = 'PLT';
        patchData.bolRequest.lineItemsFormat[i].PackageUnitType = 'CTN';
        this.detailArray = patchData.bolRequest.lineItemsFormat;
        this.billOfLading.patchValue({
          shipmentType: 'Non Itemized'
        });
        // (<HTMLInputElement>document.getElementById("cpf3")).value = '';
      }
      //  let  objectForRate = {
      //     'weight': Number(value.weight),
      //     'classification': classValue
      //   };
      //   this.pricingDetail.push(objectForRate);
    }

    let weightArray = [], piecesArray = [];
    if (this.detailArray.length > 0 || this.piecesForItemizeListArray.length > 0 || this.piecesForMultiClassListArray.length > 0) {
      this.showAddField = true;
      this.showShipmentTable = true;
      if (this.showIfNoMixedPallet === true) {
        this.showAddedValue = true;
        this.showAddedValueForMixedPallet = false;
      } else {
        this.showAddedValueForMixedPallet = true;
        this.showAddedValue = false;
      }
    } else {
      this.showAddedValue = false;;
    }
    patchData.lineItems = patchData.lineItemsFormat;
    this.combiningArray();
    this.combiningArrayForRequest();
    this.disableShipmentType(this.billOfLading.value);


    this.addressTemplateNameForm = this.fb.group({
      addressTempName: ['', [Validators.required]],
      selectedCompany: ''
    });
    this.itemTemplateNameForm = this.fb.group({
      itemTempName: ['', [Validators.required]]
    });
    this.splInstructionsTemplateNameForm = this.fb.group({
      splInstructionTempName: ['', [Validators.required]]
    })
    this.datepatch();
    this.showIfNoMixedPallet = true;
    this.itemTemplateData();

    this.getAllShipperName();
    this.splInstructionTemplateData();
    // this.getBolValues();

  }
  checkDescription(value:any) {
    console.log('desc');
    console.log('value', value);
    this.description = value;
    this.billOfLading.controls['description'].setValue(this.description);
    if (value !== '') {
      $('#description-modal').modal('show');
      $('#tasknote').focus();
    }
  }

  checkDescription1(value:any) {
    console.log('desc');
    console.log('value', value);
    this.description = value;
    this.enableDescriptionValue = true;

    this.piecesForm.controls['description'].setValue(this.description);
    // if (value !== '') {
    $('#description-modal').modal('show');
    setTimeout(() => {
      $('#tasknote').focus();
    }, 100);

    //   event.preventDefault();
    // }
  }

  checkDescription2(value:any) {
    console.log('desc');
    console.log('value', value);
    this.description = value;
    this.enableDescriptionValue = true;

    this.editShipmentInformationForm.controls['description'].setValue(this.description);
    // if (value !== '') {
    $('#description-modal1').modal('show');
    setTimeout(() => {
      $('#tasknote').focus();
    }, 100);
  }
  checkSpecialInstructionsCount(event:any) {
    console.log(event);
    this.specialInstructionsCharacterCount = event.target.value.length;
  }
  getBolValues() {
    this.selectedItems = [];
    let createBol = this.pricingInfoService.getBolQuoteId();
    console.log('Quote Id', createBol);
    this.billOfLadingValues = this.pricingInfoService.getBillOfLadingValues();
    console.log('Storage bol values', this.billOfLadingValues);
    if (createBol !== null && createBol !== '' && createBol !== undefined) {
      console.log('If block', createBol);
      if (Object.keys(createBol).length !== 0) {
        this.billOfLading.patchValue({
          quoteNumber: createBol.quoteNumber
        });
        let quoteArray:any = [], array:any;
        this.quoteReportService.getParticularReportUsingReferenceId(this.billOfLadingValues.quoteNumber).subscribe(response => {
          console.log('quotesgd', response);
          array = response;
          if (array.length > 0) {
            for (let a = 0; a < array.length; a++) {
              if (array[a].category === 'COSTPLUS') {
                quoteArray.push(array[a]);
                if (quoteArray.length > 0) {
                  for (let b = 0; b < quoteArray.length; b++) {
                    this.factorization = quoteArray[b].category;
                  }
                }
                break;
              } else if (array[a].category === 'AR') {
                quoteArray.push(array[a]);
                if (quoteArray.length > 0) {
                  for (let b = 0; b < quoteArray.length; b++) {
                    this.factorization = quoteArray[b].category;
                  }
                }
                break;
              }
            }
          }
        });
        this.existingQuote(createBol);
      }
    } else {
      console.log('Back', this.billOfLadingValues);
      console.log('Else block');
      console.log('show Detail Array', this.showAddedValue);
      // this.classTrimming(this.billOfLadingValues);
      if (Object.keys(this.billOfLadingValues).length !== 0 && this.billOfLadingValues !== null) {
        if (this.billOfLadingValues.billOfReferenceNumber === null) {
          this.billOfLadingValues.billOfReferenceNumber = '';
        } else if (this.billOfLadingValues.billOfLadingTitle === null) {
          this.billOfLadingValues.billOfLadingTitle = '';
        } else if (this.billOfLadingValues.serviceType === null) {
          this.billOfLadingValues.serviceType = '';
        } else if (this.billOfLadingValues.shipTimestamp === null) {
          this.billOfLadingValues.shipTimestamp = '';
        } else if (this.billOfLadingValues.shippersBillOfLading === null) {
          this.billOfLadingValues.shippersBillOfLading = '';
        } else if (this.billOfLadingValues.purchaseOrderNumber === null) {
          this.billOfLadingValues.purchaseOrderNumber = '';
        } else if (this.billOfLadingValues.shipperIdNumber === null) {
          this.billOfLadingValues.shipperIdNumber = '';
        } else if (this.billOfLadingValues.shipperCompanyName === null) {
          this.billOfLadingValues.shipperCompanyName = '';
        } else if (this.billOfLadingValues.shipperContactName === null) {
          this.billOfLadingValues.shipperContactName = '';
        } else if (this.billOfLadingValues.shipperPhoneNumber === null) {
          this.billOfLadingValues.shipperPhoneNumber = '';
        } else if (this.billOfLadingValues.shipperStreet1 === null) {
          this.billOfLadingValues.shipperStreet1 = '';
        } else if (this.billOfLadingValues.shipperStreet2 === null) {
          this.billOfLadingValues.shipperStreet2 = '';
        } else if (this.billOfLadingValues.shipperCountry === null) {
          this.billOfLadingValues.shipperCountry = '';
        } else if (this.billOfLadingValues.shipperPostalCode === null) {
          this.billOfLadingValues.shipperPostalCode = '';
        } else if (this.billOfLadingValues.shipperCity === null) {
          this.billOfLadingValues.shipperCity = '';
        } else if (this.billOfLadingValues.shipperState === null) {
          this.billOfLadingValues.shipperState = '';
        } else if (this.billOfLadingValues.consigneeCompanyName === null) {
          this.billOfLadingValues.consigneeCompanyName = '';
        } else if (this.billOfLadingValues.consigneeContactName === null) {
          this.billOfLadingValues.consigneeContactName = '';
        } else if (this.billOfLadingValues.consigneePhoneNumber === null) {
          this.billOfLadingValues.consigneePhoneNumber = '';
        } else if (this.billOfLadingValues.consigneeStreet1 === null) {
          this.billOfLadingValues.consigneeStreet1 = '';
        } else if (this.billOfLadingValues.consigneeStreet2 === null) {
          this.billOfLadingValues.consigneeStreet2 = '';
        } else if (this.billOfLadingValues.consigneeCountry === null) {
          this.billOfLadingValues.consigneeCountry = '';
        } else if (this.billOfLadingValues.consigneePostalCode === null) {
          this.billOfLadingValues.consigneePostalCode = '';
        } else if (this.billOfLadingValues.consigneeCity === null) {
          this.billOfLadingValues.consigneeCity = '';
        } else if (this.billOfLadingValues.consigneeState === null) {
          this.billOfLadingValues.consigneeState = '';
        } else if (this.billOfLadingValues.billToForte === null) {
          this.billOfLadingValues.billToForte = '';
        } else if (this.billOfLadingValues.thirdParty === null) {
          this.billOfLadingValues.thirdParty = 'BillToForte';
        } else if (this.billOfLadingValues.thirdPartyCompanyName === null) {
          this.billOfLadingValues.thirdPartyCompanyName = '';
        } else if (this.billOfLadingValues.thirdPartyStreet === null) {
          this.billOfLadingValues.thirdPartyStreet = '';
        } else if (this.billOfLadingValues.thirdPartyPostalCode === null) {
          this.billOfLadingValues.thirdPartyPostalCode = '';
        } else if (this.billOfLadingValues.thirdPartyCity === null) {
          this.billOfLadingValues.thirdPartyCity = '';
        } else if (this.billOfLadingValues.thirdPartyState === null) {
          this.billOfLadingValues.thirdPartyState = '';
        } else if (this.billOfLadingValues.specialInstructions === null) {
          this.billOfLadingValues.specialInstructions = '';
        } else if (this.billOfLadingValues.quoteNumber === null) {
          this.billOfLadingValues.quoteNumber = '';
        }
        this.factorization = this.billOfLadingValues.factorization;
        if (this.billOfLadingValues.consigneeCity !== '' && this.billOfLadingValues.consigneeCity !== null) {
          console.log('Storing values from BOL Summary', this.billOfLadingValues);
          if (this.billOfLadingValues.serviceType === 'FEDEX FREIGHT ECONOMY' || this.billOfLadingValues.serviceType === 'FEDEX_FREIGHT_ECONOMY') {
            this.billOfLadingValues.serviceType = 'FXFE';
          } else if (this.billOfLadingValues.serviceType === 'FEDEX FREIGHT PRIORITY' || this.billOfLadingValues.serviceType === 'FEDEX_FREIGHT_PRIORITY') {
            this.billOfLadingValues.serviceType = 'FXFP';
          } else if (this.billOfLadingValues.serviceType === 'YRC') {
            this.billOfLadingValues.serviceType = 'YRC';
          } else if (this.billOfLadingValues.serviceType === 'REDDAWAY') {
            this.billOfLadingValues.serviceType = 'REDDAWAY';
          }

          else if (this.billOfLadingValues.serviceType !== 'FEDEX FREIGHT ECONOMY' || this.billOfLadingValues.serviceType === 'FEDEX_FREIGHT_ECONOMY'
            && this.billOfLadingValues.serviceType !== 'FEDEX FREIGHT PRIORITY' || this.billOfLadingValues.serviceType === 'FEDEX_FREIGHT_PRIORITY'
            && this.billOfLadingValues.serviceType !== 'YRC' && this.billOfLadingValues.serviceType !== 'REDDAWAY') {
            this.billOfLadingValues.serviceType = 'OTHERS';
            this.billOfLadingValues.otherServiceType = this.billOfLadingValues.otherServiceType;
            this.billOfLading.patchValue({
              otherServiceType: this.billOfLadingValues.otherServiceType
            });
          }
          console.log('Storing In bound BOL Summary Val3', this.billOfLadingValues);
          // shipTimestamp: this.billOfLadingValues.shipTimestamp,
          this.billOfLading.patchValue({
            billOfReferenceNumber: this.billOfLadingValues.billOfReferenceNumber,
            billOfLadingTitle: this.billOfLadingValues.billOfLadingTitle,
            serviceType: this.billOfLadingValues.serviceType,
            shippersBillOfLading: this.billOfLadingValues.shippersBillOfLading,
            purchaseOrderNumber: this.billOfLadingValues.purchaseOrderNumber,
            shipperIdNumber: this.billOfLadingValues.shipperIdNumber,
            shipperCompanyName: this.billOfLadingValues.shipperCompanyName,
            shipperContactName: this.billOfLadingValues.shipperContactName,
            shipperPhoneNumber: this.billOfLadingValues.shipperPhoneNumber,
            shipperStreet1: this.billOfLadingValues.shipperStreet1,
            shipperStreet2: this.billOfLadingValues.shipperStreet2,
            shipperCountry: this.billOfLadingValues.shipperCountry,
            shipperPostalCode: this.billOfLadingValues.shipperPostalCode,
            shipperCity: this.billOfLadingValues.shipperCity,
            shipperState: this.billOfLadingValues.shipperState,
            consigneeCompanyName: this.billOfLadingValues.consigneeCompanyName,
            consigneeContactName: this.billOfLadingValues.consigneeContactName,
            consigneePhoneNumber: this.billOfLadingValues.consigneePhoneNumber,
            consigneeStreet1: this.billOfLadingValues.consigneeStreet1,
            consigneeStreet2: this.billOfLadingValues.consigneeStreet2,
            consigneeCountry: this.billOfLadingValues.consigneeCountry,
            consigneePostalCode: this.billOfLadingValues.consigneePostalCode,
            consigneeCity: this.billOfLadingValues.consigneeCity,
            consigneeState: this.billOfLadingValues.consigneeState,
            billToForte: this.billOfLadingValues.billToForte,
            thirdParty: this.billOfLadingValues.thirdParty,
            thirdPartyCompanyName: this.billOfLadingValues.thirdPartyCompanyName,
            thirdPartyStreet: this.billOfLadingValues.thirdPartyStreet,
            thirdPartyPostalCode: this.billOfLadingValues.thirdPartyPostalCode,
            thirdPartyCity: this.billOfLadingValues.thirdPartyCity,
            thirdPartyState: this.billOfLadingValues.thirdPartyState,
            specialInstructions: this.billOfLadingValues.specialInstructions,
            rate: this.billOfLadingValues.rate,
            quoteNumber: this.billOfLadingValues.quoteNumber,
            shipmentType: this.billOfLadingValues.shipmentType
            // thirdPartyCity: this.billOfLadingValues.thirdPartyCity,
          });
          let billThirdParty;
          if (this.billOfLadingValues.billPaidTo.name === 'BILLTOFORTE') {
            billThirdParty = 'BillToForte';
            this.billOfLading.patchValue({
              billToForte: billThirdParty
            });
          } else if (this.billOfLadingValues.billPaidTo.name === 'THIRDPARTY') {
            billThirdParty = 'ThirdParty';
            this.billOfLading.patchValue({
              billToForte: billThirdParty
            });
          } else if (this.billOfLadingValues.billPaidTo.name === 'PREPAY') {
            billThirdParty = 'Prepay';
            this.billOfLading.patchValue({
              billToForte: billThirdParty
            });
          } else if (this.billOfLadingValues.billPaidTo.name === 'COLLECT') {
            billThirdParty = 'Collect';
            this.billOfLading.patchValue({
              billToForte: billThirdParty
            });
          } else {
            billThirdParty = 'BillToForte';
            this.billOfLading.patchValue({
              billToForte: billThirdParty
            });
          }
          let array: any;
          let quoteArray:any = [];
          this.quoteReportService.getParticularReportUsingReferenceId(this.billOfLadingValues.quoteNumber).subscribe(response => {
            array = response;
            if (array.length > 0) {
              for (let a = 0; a < array.length; a++) {
                if (array[a].category === 'COSTPLUS') {
                  quoteArray.push(array[a]);
                  if (quoteArray.length > 0) {
                    for (let b = 0; b < quoteArray.length; b++) {
                      this.factorization = quoteArray[b].category;
                    }
                  }
                  break;
                } else if (array[a].category === 'AR') {
                  quoteArray.push(array[a]);
                  if (quoteArray.length > 0) {
                    for (let b = 0; b < quoteArray.length; b++) {
                      this.factorization = quoteArray[b].category;
                    }
                  }
                  break;
                }
              }
            }
          });
          if (this.billOfLadingValues.serviceType === 'YRC') {
            this.serviceCarrierType = this.billOfLadingValues.serviceType;
            this.showForYrc = true;
            this.handlingUnitTypeArray = ['CTN', 'PLT', 'PCS', 'DRM'];
            this.packageUnitArray = ['CTN', 'PLT', 'PCS', 'DRM'];
          } else {
            this.serviceCarrierType = this.billOfLadingValues.serviceType;
            if (this.billOfLadingValues.serviceType === 'OTHERS') {
              this.showInputForOthers = true;
              this.handlingUnitTypeArray = ['PLT', 'PCS', 'DRM'];
            } else {
              this.showForYrc = false;
              this.handlingUnitTypeArray = ['CTN', 'PLT', 'PCS', 'DRM'];
            }
          }
          if (this.billOfLadingValues.carrierFlag === true) {
            this.createStoreFlag = true;
            this.showGetRateButton = false;
            this.backButtonCarrier = true;
            this.showRate = true;
            this.lengthOfDetailArray = 0;
          } else if (this.billOfLadingValues.carrierFlag === false) {
            this.createStoreFlag = false;
            this.showGetRateButton = false;
            this.backButtonCarrier = false;
            this.showRate = false;
            this.lengthOfDetailArray = 0;
          }
          this.setEditModalFlag = true;
          // this.setFlagForExisting = true;
          let totalWeight;
          this.totalPieces = 0;
          this.totalWeights = 0;
          this.previewTotalPieces = 0;
          this.previewTotalPallets = 0;
          this.totalHandlingUnits = '';
          this.piecesCount = [], this.palletCount = [];
          let weightArray = [], piecesArray = [];
          this.pricingDetail = [], this.detailArray = [], this.pricingDetail = [];
          // this.classTrimming(this.billOfLadingValues);
          console.log('this.billOfladib line items', this.billOfLadingValues.lineItems);
          if (this.billOfLadingValues.lineItems !== undefined) {
            if (this.billOfLadingValues.lineItems.length > 0) {
              this.showAddField = true;
              this.showAddedValue = true;
              // this.classTrimming(this.billOfLadingValues);
              console.log(this.billOfLadingValues.lineItems);
              console.log('Back and LI this.showAddedValue', this.showAddedValue, this.billOfLadingValues.lineItems.length);
              for (let d = 0; d < this.billOfLadingValues.lineItems.length; d++) {
                // this.billOfLadingValues.lineItems[d].FreightClass = this.billOfLadingValues.lineItems[d].FreightClass.replace('CLASS_0', '')
                let addPieces = this.billOfLadingValues.lineItems[d].HandlingUnitQuantity;
                let addWeight = this.billOfLadingValues.lineItems[d].Weight.Value;
                // let removeClassification = this.billOfLadingValues.lineItems[d].FreightClass.split('_')[1];
                // this.billOfLadingValues.lineItems[d].FreightClass = removeClassification;
                if (this.billOfLadingValues.lineItems[d].bolType === 'Non Itemize') {
                  let removeClassification = this.billOfLadingValues.lineItems[d].FreightClass.split('_')[1];
                  this.billOfLadingValues.lineItems[d].FreightClass = removeClassification;
                  console.log(this.billOfLadingValues.lineItems[d].FreightClass);
                  this.detailArray.push(this.billOfLadingValues.lineItems[d]);

                } else if (this.billOfLadingValues.lineItems[d].bolType === 'Itemize') {
                  this.piecesForItemizeListArray.push(this.billOfLadingValues.lineItems[d]);

                } else if (this.billOfLadingValues.lineItems[d].bolType === 'Multi Class Pallet') {
                  this.piecesForMultiClassListArray.push(this.billOfLadingValues.lineItems[d]);
                }
                console.log('LineItem Back values', this.detailArray, this.piecesForItemizeListArray, this.piecesForMultiClassListArray)
                let objectForRate;
                objectForRate = {
                  'weight': Number(this.billOfLadingValues.lineItems[d].Weight.Value),
                  'classification': this.billOfLadingValues.lineItems[d].FreightClass
                };
                this.pricingDetail.push(objectForRate);
                if (this.billOfLadingValues.lineItems[d].weightUnit === 'ea.') {
                  totalWeight = Number(addPieces) * Number(addWeight);
                  weightArray.push(totalWeight);
                } else {
                  totalWeight = Number(addWeight);
                  weightArray.push(totalWeight);
                }
                piecesArray.push(addPieces);
                if (this.billOfLadingValues.lineItems[d].PackageUnitType !== '' && this.billOfLadingValues.lineItems[d].PackageUnitType !== undefined) {
                  this.piecesCount.push(this.billOfLadingValues.lineItems[d].PackageQuantity);
                }
                if (this.billOfLadingValues.lineItems[d].HandlingUnitType === 'PLT' || this.billOfLadingValues.lineItems[d].HandlingUnitType === 'PALLET' || this.billOfLadingValues.lineItems[d].HandlingUnitType === 'Pallets') {
                  this.palletCount.push(this.billOfLadingValues.lineItems[d].HandlingUnitQuantity);
                }
              }
              if (this.piecesCount.length > 0) {
                this.previewTotalPieces = this.netChargeArrSum(this.piecesCount);
              } else {
                this.previewTotalPieces = 0;
              }
              if (this.palletCount.length > 0) {
                this.previewTotalPallets = this.netChargeArrSum(this.palletCount);
              } else {
                this.previewTotalPallets = 0;
              }
              this.totalPieces = this.netChargeArrSum(piecesArray);
              this.totalWeights = this.netChargeArrSum(weightArray);
              this.detailArray = this.billOfLadingValues.lineItems;
              if (this.detailArray.length > 0 || this.piecesForItemizeListArray.length > 0 || this.piecesForMultiClassListArray.length > 0) {
                this.showAddedValue = true;
                this.showShipmentTable = false;
              } else {
                this.showShipmentTable = true;
              }
              this.descriptionErrorMsg = false;
            } else {
              this.showAddedValue = false;
              this.showShipmentTable = true;
            }
          } else {
            this.showAddedValue = false;
            this.showShipmentTable = true;
          }
          if (this.billOfLadingValues.accessorials !== undefined) {
            if (this.billOfLadingValues.accessorials.length > 0) {
              for (let a = 0; a < this.billOfLadingValues.accessorials.length; a++) {
                for (let b = 0; b < this.dropdownList.length; b++) {
                  if (this.billOfLadingValues.accessorials[a] === this.dropdownList[b].itemName) {
                    this.selectedItems.push(this.dropdownList[b]);
                  }
                }
              }
            }
          } else {
            this.selectedItems = [];
          }
        }
        this.billOfLading.patchValue({
          hazmat: false,
          handlingUnitQuantity: '',
          handlingUnitType: 'PLT',
          weightUnitType: 'ttl',
          packageQuantity: '',
          packageUnitType: 'CTN',
          weight: '',
          description: '',
          length: '',
          width: '',
          height: '',
          nmfc: '',
          classification: '',
          cube: ''
        });
      } else {
        // this.showAddedValue = false;
      }
      if (this.detailArray.length > 0) {
        this.showAddedValue = true;
        this.showShipmentTable = true;
        this.nonItemizeShipmentTable = true;
      } else {
        this.showShipmentTable = true;
        if (this.piecesForItemizeListArray.length > 0) {
          this.nonItemizeShipmentTable = true;
        } else if (this.piecesForMultiClassListArray.length > 0) {
          this.multiClassShipmentTable = true;
          this.nonItemizeShipmentTable = false;
        } else {

        }
        // if (this.combiningAllShipmentsArray.length > 0) {
        //   this.showAddedValue = true;
        //   this.showShipmentTable = true;
        // } else {
        //   this.showAddedValue = false;
        //   this.showShipmentTable = true;
        // }
      }
    }
    console.log('this.detailArray new flag', this.detailArray, this.piecesForItemizeListArray, this.piecesForMultiClassListArray, this.showAddedValue);
    // this.billOfLadingValues = {};
    // this.pricingInfoService.setBillOfLadingValues(this.billOfLadingValues);
    // this.billOfLadingValues = this.pricingInfoService.getBillOfLadingValues();
    // console.log('Destroyed BOL Summary Val', this.billOfLadingValues);
    this.existingQuoteErrorMsg = false;
    this.showGetRateButton = true;
  }
  classTrimming(val:any) {
    let removeClassification;
    let classification;
    if (val.lineItems !== undefined) {
      if (val.lineItems.length > 0) {
        for (let c = 0; c < val.lineItems.length; c++) {
          console.log(val.lineItems[c]);
          if (val.lineItems[c].FreightClass !== undefined) {
            removeClassification = val.lineItems[c].FreightClass.split('_')[1];
            val.lineItems[c].FreightClass = removeClassification;

            // removeClassification = val.lineItems[c].FreightClass.replace('CLASS_', '');
            // if (removeClassification.startsWith('0')) {
            //   classification = removeClassification.replace('0', '');
            // } else {
            //   classification = removeClassification;
            // }
            // if (classification.length > 2) {
            //   val.lineItems[c].FreightClass = classification.replace('_', '.');
            // } else {
            //   val.lineItems[c].FreightClass = classification;
            // }
          }
        }
      }
      this.billOfLadingValues = val;
    } else {
    }
  }

  buildForm() {
    this.billOfLading = this.fb.group({
      billOfReferenceNumber: ['', [Validators.minLength(2), Validators.maxLength(25)]],
      billOfLadingTitle: ['', [Validators.minLength(2), Validators.maxLength(25)]],
      quoteNumber: [''],
      serviceType: [''],
      shipTimestamp: ['', [Validators.required]],
      pickupDate: ['', []],
      shippersBillOfLading: ['', [Validators.minLength(2), Validators.maxLength(25)]],
      purchaseOrderNumber: ['', [Validators.minLength(2), Validators.maxLength(25)]],
      shipperIdNumber: ['', [Validators.minLength(2), Validators.maxLength(25)]],
      shipperCompanyName: ['', [Validators.required]],
      shipperContactName: [''],
      shipperPhoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      shipperStreet1: ['', [Validators.required, Validators.minLength(2)]],
      shipperStreet2: [''],
      shipperCountry: ['USA'],
      shipperPostalCode: ['', [Validators.required, Validators.maxLength(5)]],
      shipperCity: ['', [Validators.required, Validators.minLength(2)]],
      shipperState: ['', [Validators.required, Validators.minLength(2)]],
      consigneeCompanyName: ['', [Validators.required]],
      consigneeContactName: [''],
      consigneePhoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      consigneeStreet1: ['', [Validators.required, Validators.minLength(3)]],
      consigneeStreet2: [''],
      consigneeCountry: ['USA'],
      consigneePostalCode: ['', [Validators.required, Validators.maxLength(5)]],
      consigneeCity: ['', [Validators.required, Validators.minLength(2)]],
      consigneeState: ['', [Validators.required, Validators.minLength(2)]],
      hazmat: [''],
      handlingUnits: [''],
      weight: [''],
      totalWeight: [''],
      description: [''],
      length: [''],
      width: [''],
      height: [''],
      nmfc: ['', Validators.required],
      amount: [''],
      classification: [''],
      totalClassification: [''],
      cube: [''],
      specialInstructions: [''],
      accessorials: [''],
      rate: [''],
      volumeQuoteNumber: [''],
      billToForte: [''],
      thirdParty: ['BillToForte'],
      cod: [''],
      reason: [''],
      amountIncDec: [''],
      thirdPartyCompanyName: [''],
      thirdPartyStreet: [''],
      thirdPartyPostalCode: [''],
      thirdPartyCity: [''],
      thirdPartyState: [''],
      thirdPartyPhoneNumber: [''],
      handlingUnitQuantity: [''],
      handlingUnitType: ['PLT'],
      weightUnitType: ['ttl'],
      packageQuantity: [''],
      packageUnitType: ['CTN'],
      otherServiceType: [''],
      mixedPallet: ['false'],
      shipmentType: ['Non Itemized']
    });
    this.nonItemizeShipmentTable = true;
    this.multiClassShipmentTable = false;
    this.addressTemplateNameForm = this.fb.group({
      addressTempName: ['', [Validators.required]],
      selectedCompany: ''
    });
    this.itemTemplateNameForm = this.fb.group({
      itemTempName: ['', [Validators.required]]
    });
    this.splInstructionsTemplateNameForm = this.fb.group({
      splInstructionTempName: ['', [Validators.required]]
    })
    this.datepatch();
    this.showIfNoMixedPallet = true;
    this.checkForShipmentType(this.billOfLading.controls['shipmentType'].value);
    this.thirdParty('BillToForte', this.billOfLading.value);
  }

  datepatch() {
    let dateNew = new Date();
  }

  eventHandler(event:any) {
    console.log(event);
    if (event.which === 13) {
      // event.preventDefault();
      $('#buttoniD').focus();
     }
  }

  scroll(event: KeyboardEvent, id:any) {
    //up 38 down 40
    // event.preventDefault();
    console.log(event);
    if (event.keyCode === 40) {
      var id = $("tr:focus").attr("tabindex");
      id++;
      if (id > 6) {
        id = 0;
      }
      $("#consigneeTableId tr[tabindex=" + id + "]").focus();
      this.selectedIndex++;
    } else if (event.keyCode === 38) {
      this.selectedIndex--;
    }
  }

  checkKeyInput(event:any, type:any) {
    console.log(event);
    if (event.which === 13) {
      console.log(this.selectedIndex);
      // $('#buttoniD').focus();
      $('tabindex[' + this.selectedIndex + ']').focus();
    }
  }
  // isSelected(item) {
  //   return this.selectedItem ?
  //      this.selectedItem.id === this.consigneeTemplate.id : false;
  // }

  thirdParty(value:any, form:any) {
    if (value === 'ThirdParty') {
      this.showPrepaid = false;
      this.showCollect = false;
      this.showThirdParty = true;
      let data;
      data = { name: 'Forte', street: '301 54th Ave. E.Ste 200', city: 'Fife', state: 'WA', zip: '98424' };
      this.billOfLading.patchValue({
        thirdPartyCompanyName: data.name,
        thirdPartyPostalCode: data.zip,
        thirdPartyStreet: data.street,
        thirdPartyState: data.state,
        thirdPartyCity: data.city
      });
    } else if (value === 'Collect') {
      this.showThirdParty = false;
      this.showPrepaid = false;
      this.showCollect = true;
      let consigneeStreet;
      if (form.consigneeStreet2 !== null && form.consigneeStreet2 !== '' && form.consigneeStreet2 !== undefined) {
        consigneeStreet = form.consigneeStreet1 + ',' + form.consigneeStreet2;
      } else {
        consigneeStreet = form.consigneeStreet1;
      }
      this.billOfLading.patchValue({
        thirdPartyCompanyName: form.consigneeCompanyName,
        thirdPartyPostalCode: form.consigneePostalCode,
        thirdPartyStreet: consigneeStreet,
        thirdPartyPhoneNumber: form.consigneePhoneNumber,
        thirdPartyState: form.consigneeState,
        thirdPartyCity: form.consigneeCity
      });
    } else if (value === 'Prepay') {
      this.showThirdParty = false;
      this.showCollect = false;
      this.showPrepaid = true;
      let shipperStreet;
      if (form.shipperStreet2 !== null && form.shipperStreet2 !== '' && form.shipperStreet2 !== undefined) {
        shipperStreet = form.shipperStreet1 + ',' + form.shipperStreet2;
      } else {
        shipperStreet = form.shipperStreet1;
      }
      this.billOfLading.patchValue({
        thirdPartyCompanyName: form.shipperCompanyName,
        thirdPartyPostalCode: form.shipperPostalCode,
        thirdPartyStreet: shipperStreet,
        thirdPartyPhoneNumber: form.shipperPhoneNumber,
        thirdPartyState: form.shipperState,
        thirdPartyCity: form.shipperCity
      });
    }
    else {
      this.showThirdParty = false;
      this.showCollect === false;
      this.showPrepaid = false;
    }
  }

  close() {
    this.previewValue = {};
  }
  checkForMixedPallet(type:any) {
    console.log('type', type);
    this.detailArray = [];
    this.piecesListArray = [];
    this.showAddedValueForMixedPallet = false;
    this.showAddedValue = false;
    if (type === 'true') {
      this.showAllValues = true;
      this.showForMixedPallet = true;
      this.showIfNoMixedPallet = false;
      this.billOfLading.patchValue({
        totalWeight: '',
        totalClassification: '',
        hazmat: false
      });
    } else {
      this.showAllValues = false;
      this.showForMixedPallet = false;
      this.showIfNoMixedPallet = true;
      this.piecesListArray = [];
      console.log('this.billOfLading', this.billOfLading);
      this.billOfLading.patchValue({
        hazmat: ''
      });
    }
    this.billOfLading.patchValue({
      handlingUnitQuantity: '',
      handlingUnitType: 'PLT',
      packageQuantity: '',
      packageUnitType: 'CTN',
      weight: '',
      weightUnitType: 'ttl',
      description: '',
      length: '',
      width: '',
      height: '',
      classification: '',
      cube: ''
    });
  }
  closePiecesModal(addPiecesHeader:any) {
    // if (addPiecesHeader === 'Itemized') {
    //   $('#add-pieces-modal').modal('hide');
    // } else {
    //   $('#add-pieces-modal').modal('hide');
    // }
    let oldObject;
    if (addPiecesHeader === 'Itemized') {
      oldObject = this.piecesForItemizeListArray[this.rowIndex];

      if (this.piecesListArray.length > 0) {
        // $('#add-pieces-modal').modal('hide');
        //   this.detailArray.splice(this.rowIndex, 1);
        // oldObject = this.piecesForItemizeListArray[this.rowIndex];
        // if (this.piecesForItemizeListArray.length > 0) {
        //   this.rowIndex = this.piecesForItemizeListArray.length;
        // } else {
        //   this.rowIndex = 0;
        // }
        //  this.piecesForItemizeListArray.push(oldObject);
        if (this.piecesListArray.length > 0) {
          let sumOfPiecesWeight:any = [], sumOfPieces = [];
          this.totalWeightForPieces, this.totalHeaderWeight;
          if (this.piecesListArray.length > 0) {
            for (let p = 0; p < this.piecesListArray.length; p++) {
              // sumOfPiecesWeight.push(this.piecesListArray[p].Weight.Value);
              sumOfPieces.push(this.piecesListArray[p].PackageQuantity);
              console.log('this.sumOfPiecesWeight', sumOfPiecesWeight, sumOfPieces);
            }
          }
          // this.totalWeightForPieces = this.netChargeArrSum(sumOfPiecesWeight);
          this.totalPiecesForMultiClass = this.netChargeArrSum(sumOfPieces);
          console.log('sumOfPiecesWeight', sumOfPiecesWeight);
          // this.totalHeaderWeight = Number(oldObject.Weight.Value);
          this.totalHeaderPieces = Number(oldObject.PackageQuantity);
          console.log(this.totalPiecesForMultiClass, Number(oldObject.PackageQuantity));
          if (Number(this.totalPiecesForMultiClass) > Number(oldObject.PackageQuantity)) {
            this.errorMessageForPiecesCount = true;
            let differenceInPieces = Number(this.totalPiecesForMultiClass) - Number(oldObject.PackageQuantity);
            this.showPiecesVarianceMsg = 'There is a excess of ' + Number(differenceInPieces) + 'Pcs in ' + Number(this.totalHeaderPieces) + ' total PCS';
            // this.showPiecesVarianceMsg = 'The' + Number(differenceInPieces) + ' PCS is more than the ' + Number(this.totalHeaderPieces) + ' total PCS'
            setTimeout(() => {
              // this.errorMessageForPiecesCount = false;
              this.showPiecesVarianceMsg = '';
            }, 5000);
            console.log(this.showPiecesVarianceMsg, differenceInPieces, this.totalPiecesForMultiClass,);

          } else if (Number(this.totalPiecesForMultiClass) < Number(oldObject.PackageQuantity)) {
            let differenceObject = Number(oldObject.PackageQuantity) - Number(this.totalPiecesForMultiClass);
            // if (Number(differenceObject) > Number(this.totalPiecesForMultiClass)) {
            this.errorMessageForPiecesCount = true;
            let differenceInPieces = Number(oldObject.PackageQuantity) - Number(this.totalPiecesForMultiClass);
            this.showPiecesVarianceMsg = 'There is a shortage of ' + Number(differenceInPieces) + 'Pcs in ' + Number(this.totalHeaderPieces) + ' total PCS';

            // this.showPiecesVarianceMsg = 'The' + Number(differenceInPieces) + ' PCS is less than  ' + Number(this.totalHeaderPieces) + ' total PCS'
            setTimeout(() => {
              // this.errorMessageForPiecesCount = false;
              this.showPiecesVarianceMsg = '';
            }, 5000);
            console.log(this.showPiecesVarianceMsg, differenceInPieces, this.totalPiecesForMultiClass,);
          } else {
            this.errorMessageForPiecesCount = false;
            this.showPiecesVarianceMsg = '';
            this.piecesForItemizeListArray[this.rowIndex].newAddPieces = this.piecesListArray;
            this.piecesForItemizeListArray[this.rowIndex].showFlag = 'Itemize';
            if (this.piecesForItemizeListArray.length > 0) {
              for (let p = 0; p < this.piecesForItemizeListArray.length; p++) {
                if (this.piecesForItemizeListArray[p].newAddPieces.length > 0) {
                  this.piecesForItemizeListArray[p].rowSpanValues = this.piecesForItemizeListArray[p].newAddPieces.length;
                  console.log('this.piecesForItemizeListArray[p].rowSpanValues ', this.piecesForItemizeListArray[p].rowSpanValues);
                }
              }
            }
          }
          console.log(this.errorMessageForPiecesCount);
          setTimeout(() => {
            if (this.errorMessageForPiecesCount === false) {
              $('#add-pieces-modal').modal('hide');

            }
          }, 500);



        }
      }
    } else {
      oldObject = this.piecesForMultiClassListArray[this.rowIndex];
      console.log('OldObject', this.piecesClassListArray[this.rowIndex]);
      if (this.piecesClassListArray.length > 0) {
        let sumOfPiecesWeight = [], sumOfPieces = [];
        this.totalWeightForPieces, this.totalHeaderWeight;
        if (this.piecesClassListArray.length > 0) {
          for (let p = 0; p < this.piecesClassListArray.length; p++) {
            sumOfPiecesWeight.push(this.piecesClassListArray[p].Weight.Value);
            sumOfPieces.push(this.piecesClassListArray[p].PackageQuantity);
            console.log('this.sumOfPiecesWeight', sumOfPiecesWeight, sumOfPieces);
          }
        }
        this.totalWeightForPieces = this.netChargeArrSum(sumOfPiecesWeight);
        this.totalPiecesForMultiClass = this.netChargeArrSum(sumOfPieces);
        console.log('sumOfPiecesWeight', sumOfPiecesWeight);
        this.totalHeaderWeight = Number(oldObject.Weight.Value);
        this.totalHeaderPieces = Number(oldObject.PackageQuantity);
        console.log(this.totalPiecesForMultiClass, Number(oldObject.PackageQuantity));
        if (Number(this.totalPiecesForMultiClass) > Number(oldObject.PackageQuantity)) {
          this.errorMessageForPiecesCount = true;
          let differenceInPieces = Number(this.totalPiecesForMultiClass) - Number(oldObject.PackageQuantity);
          this.showPiecesVarianceMsg = 'There is a excess of ' + Number(differenceInPieces) + 'Pcs in ' + Number(this.totalHeaderPieces) + ' total PCS';
          // this.showPiecesVarianceMsg = 'The' + Number(differenceInPieces) + ' PCS is more than the ' + Number(this.totalHeaderPieces) + ' total PCS'
          setTimeout(() => {
            // this.errorMessageForPiecesCount = false;
            this.showPiecesVarianceMsg = '';
          }, 5000);
          console.log(this.showPiecesVarianceMsg, differenceInPieces, this.totalPiecesForMultiClass,);

        } else if (Number(this.totalPiecesForMultiClass) < Number(oldObject.PackageQuantity)) {
          let differenceObject = Number(oldObject.PackageQuantity) - Number(this.totalPiecesForMultiClass);
          // if (Number(differenceObject) > Number(this.totalPiecesForMultiClass)) {
          this.errorMessageForPiecesCount = true;
          let differenceInPieces = Number(oldObject.PackageQuantity) - Number(this.totalPiecesForMultiClass);
          this.showPiecesVarianceMsg = 'There is a shortage of ' + Number(differenceInPieces) + 'Pcs in ' + Number(this.totalHeaderPieces) + ' total PCS';
          // this.showPiecesVarianceMsg = 'The' + Number(differenceInPieces) + ' PCS is less than  ' + Number(this.totalHeaderPieces) + ' total PCS'
          setTimeout(() => {
            // this.errorMessageForPiecesCount = false;
            this.showPiecesVarianceMsg = '';
          }, 5000);
          console.log(this.showPiecesVarianceMsg, differenceInPieces, this.totalPiecesForMultiClass,);
        }
        else {
          this.errorMessageForPiecesCount = false;
          this.showPiecesVarianceMsg = '';
        }

        if (Number(this.totalWeightForPieces) > Number(oldObject.Weight.Value)) {
          this.errorMessageForWeightCount = true;
          let differenceWeight = Number(this.totalWeightForPieces) - Number(oldObject.Weight.Value);
          this.showWeightVarianceMsg = 'There is a over weight of ' + Number(differenceWeight) + ' pounds from the total weight of ' + Number(this.totalHeaderWeight) + ' pounds.'
          setTimeout(() => {
            // this.errorMessageForWeightCount = false;
            this.showWeightVarianceMsg = '';
          }, 5000);
          console.log('errorMessageForWeightCount if >', this.errorMessageForWeightCount);
        } else {
          let differenceObject = Number(oldObject.Weight.Value) - Number(this.totalWeightForPieces);
          console.log('differenceObject', differenceObject);
          if (Number(differenceObject) > 40) {
            this.errorMessageForWeightCount = true;
            this.showWeightVarianceMsg = 'There is a variance of ' + Number(differenceObject) + ' pounds under weight from ' + Number(oldObject.Weight.Value) + ' pounds.';
            setTimeout(() => {
              // this.errorMessageForWeightCount = false;
              this.showWeightVarianceMsg = ''
            }, 5000);
            console.log('errorMessageForWeightCount if <', this.errorMessageForWeightCount);
          } else {
            this.errorMessageForWeightCount = false;
            console.log('differenceObject else', differenceObject);

            console.log('this.piecesForMultiClassListArray', this.piecesForMultiClassListArray);
            this.piecesForMultiClassListArray[this.rowIndex].newAddPieces = this.piecesClassListArray;
            this.piecesForMultiClassListArray[this.rowIndex].showFlag = 'Multi Classed Pallet';
            // $('#add-pieces-modal').modal('hide');
            if (this.piecesForMultiClassListArray.length > 0) {
              for (let p = 0; p < this.piecesForMultiClassListArray.length; p++) {
                if (this.piecesForMultiClassListArray[p].newAddPieces.length > 0) {
                  this.piecesForMultiClassListArray[p].rowSpanValues = this.piecesForMultiClassListArray[p].newAddPieces.length;
                  console.log('this.piecesForMultiClassListArray[p].rowSpanValues ', this.piecesForMultiClassListArray[p].rowSpanValues);
                }
              }
            }
          }
        }
        console.log(this.errorMessageForPiecesCount, this.errorMessageForWeightCount);
        setTimeout(() => {
          if (this.errorMessageForWeightCount === false && this.errorMessageForPiecesCount === false) {
            $('#add-pieces-modal').modal('hide');

          }
        }, 500);

      }
    }
    console.log('this.detailArray ', this.detailArray);
    console.log('this.this.piecesForMultiClassListArray ', this.piecesForMultiClassListArray, this.rowIndex, this.piecesForMultiClassListArray);
    console.log('this.piecesForItemizeListArray ', this.piecesForItemizeListArray, this.rowIndex, this.piecesListArray);
    this.description = '';
    this.billOfLading.patchValue({
      hazmat: false,
      handlingUnitQuantity: '',
      handlingUnitType: 'PLT',
      weightUnitType: 'ttl',
      packageQuantity: '',
      packageUnitType: 'CTN',
      weight: '',
      description: '',
      length: '',
      width: '',
      height: '',
      nmfc: '',
      classification: '',
      cube: '',
      totalWeight: '',
      totalClassification: ''
    });
    $('#SpecialInstructionsId').focus();
  }

  getCarrierForZipCodes(billOfLading:any) {
    console.log(billOfLading);
    this.noshipmentDataMessage = false;
    console.log(this.customerType);
    this.getAllDetails(billOfLading);
    this.userData.carrierName = "";
    this.userData.carrier = "";
    this.userData.category = 'AR';
    this.pricingInfoService.getCarriersForZipcodes(this.userData).subscribe((response:any) => {
      console.log('response', response);
      this.rulesCarrierArray = response.result;
      if (this.rulesCarrierArray.length > 0) {
        for (let r = 0; r < this.rulesCarrierArray.length; r++) {
          if (this.rulesCarrierArray[r] === 'FEDEX ECONOMY') {
            this.rulesCarrierArray[r] = 'FXFE';
          } else if (this.rulesCarrierArray[r] === 'FEDEX PRIORITY') {
            this.rulesCarrierArray[r] = 'FXFP';
          } else {
            this.rulesCarrierArray[r] = this.rulesCarrierArray[r];
          }

        }
        console.log( this.emergencyStopEconomy, this.rulesCarrierArray)

        if (this.emergencyStop === true && this.customerType !== 'admin') {
          console.log(this.emergencyStopEconomy)

        this.rulesCarrierArray.forEach((ele:any, index:any) => {
          console.log(ele, this.emergencyStopEconomy,this.rulesCarrierArray.length);

          if(ele === 'YRC') {
            if(this.emergencyStopYRC === false) {
              this.rulesCarrierArray.splice(index,1)
            }
          } 
           if(ele === 'FXFE' || ele === 'FEDEX ECONOMY') {
             console.log(ele, this.emergencyStopEconomy)
            if(this.emergencyStopEconomy === false) {
              this.rulesCarrierArray.splice(index,1)
            } 
          } 
           if(ele === 'FXFP' || ele === 'FEDEX PRIORITY') {
            if(this.emergencyStopPriority === false) {
              this.rulesCarrierArray.splice(index,1)
            }
          } 
           if(ele === 'REDDAWAY') {
            if(this.emergencyStopReddaway === false) {
              this.rulesCarrierArray.splice(index,1)
            }
          }
        })
      }
        this.rulesCarrierArray.push('OTHERS');
      } else {
        this.rulesCarrierArray.push('OTHERS');
      }
      // $("#getRate-modal").modal('show');
      console.log(this.userData);
      if (this.userData.originState === 'AK' || this.userData.destinationState === 'AK' || this.userData.originState === 'HI' || this.userData.destinationState === 'HI') {
        billOfLading.serviceType === 'Others';
        this.billOfLading.patchValue({
          serviceType: 'OTHERS'
        });
        if (this.salesRepType !== 'administrator') {
          this.disableCarrier = true;
        } else {
          this.disableCarrier = null;
        }
        this.noshipmentDataMessage = true;
        console.log(this.noshipmentDataMessage);
        this.checkForServiceType('OTHERS', this.billOfLading.value)
      }
      // if (this.userData)	
      if (this.emergencyStop === true && this.customerType !== 'admin') {
        console.log(this.emergencyStopEconomy)

      this.rulesCarrierArray.forEach((ele:any, index:any) => {
        console.log(ele, this.emergencyStopEconomy,this.rulesCarrierArray.length);

        if(ele === 'YRC') {
          if(this.emergencyStopYRC === false) {
            this.rulesCarrierArray.splice(index,1)
          }
        } 
         if(ele === 'FXFE' || ele === 'FEDEX ECONOMY') {
           console.log(ele, this.emergencyStopEconomy)
          if(this.emergencyStopEconomy === false) {
            this.rulesCarrierArray.splice(index,1)
          } 
        } 
         if(ele === 'FXFP' || ele === 'FEDEX PRIORITY') {
          if(this.emergencyStopPriority === false) {
            this.rulesCarrierArray.splice(index,1)
          }
        } 
         if(ele === 'REDDAWAY') {
          if(this.emergencyStopReddaway === false) {
            this.rulesCarrierArray.splice(index,1)
          }
        }
      })
    }
      setTimeout(() => {
        $("#getRate-modal").modal('show');
      }, 1000);
      console.log(this.getQuoteId);

      if (this.getQuoteId !== null) {
        if (this.getQuoteId.quoteDetails.carrierType === 'FEDEX ECONOMY') {
          this.getQuoteId.quoteDetails.carrierType = 'FXFE';
        } else if (this.getQuoteId.quoteDetails.carrierType === 'FEDEX PRIORITY') {
          this.getQuoteId.quoteDetails.carrierType = 'FXFP';
        } else {
          this.getQuoteId.quoteDetails.carrierType = this.getQuoteId.quoteDetails.carrierType;
        }
        this.billOfLading.patchValue({
          serviceType: this.getQuoteId.quoteDetails.carrierType
        });
      }

    });
  }
  localStorageSalesData() {
    this.customerType = localStorage.getItem(('customerType'));
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.salesRepValues = JSON.parse(this.salesRep);
    this.templateId = this.salesRepValues.id;
    // this.templateId = this.salesRepValues.companyId;
    this.salesRepType = this.salesRepValues.type;
    if (this.customerType === 'admin') {
      this.loginCustomerId = 0;
      this.salesRepId = this.salesRepValues.id;
      this.customerId = 0;
      this.setSalesRepId = this.salesRepValues.id;
      this.companyId = 0;
      this.carrierArray = this.carrierValueArray;
      this.showForAdminCarrier = true;
      this.showGetRateButton = false;
      this.showSideMenu = false;
      setTimeout(() => {
        $('#shipperFocusId').focus();
      }, 1000);
    } else {
      this.loginCustomerId = this.salesRepValues.id;
      this.salesRepId = this.salesRepValues.salesRepId;
      this.customerId = this.salesRepValues.id;
      this.companyId = this.salesRepValues.companyId;
      this.setSalesRepId = 0;
      this.showForAdminCarrier = false;
      this.pricingInfoService.getInternalSalesRep(this.salesRepId, this.accessToken).subscribe((data:any) => {
        this.salesRepDetails = data[0];
      });
      this.showSideMenu = true;
      this.customerService.getSalesRepData(this.accessToken, this.salesRepValues.salesRepId).subscribe((response:any) => {
        this.salesRepValues.salesRepName = response[0].salesRepName;
        this.salesRepValues.salesRepEmail = response[0].email;
        console.log('this.salesRepValues', this.salesRepValues);
      });
      setTimeout(() => {
        $('#consigneeFocus').focus();
      }, 1000);

    }
    if (this.salesRepValues.pickupInformation !== null && this.salesRepValues.pickupInformation !== undefined) {
      this.shipperPhoneNumber = this.salesRepValues.pickupInformation.contactNumber;
      let phoneNumber = this.formatPhoneNumber(this.salesRepValues.pickupInformation.contactNumber);
      this.billOfLading.patchValue({
        shipperCompanyName: this.salesRepValues.pickupInformation.companyName,
        shipperContactName: this.salesRepValues.pickupInformation.customerName,
        shipperPhoneNumber: phoneNumber,
        shipperStreet1: this.salesRepValues.pickupInformation.address1,
        shipperStreet2: this.salesRepValues.pickupInformation.address2,
        shipperCountry: 'USA',
        shipperPostalCode: this.salesRepValues.pickupInformation.zip,
        shipperCity: this.salesRepValues.pickupInformation.city,
        shipperState: this.salesRepValues.pickupInformation.state
      });
    } else {
      this.shipperPhoneNumber = this.salesRepValues.contactNumber;
      let phoneNumber = this.formatPhoneNumber(this.salesRepValues.contactNumber);
      this.billOfLading.patchValue({
        shipperCompanyName: this.salesRepValues.companyName,
        shipperContactName: this.salesRepValues.customerName,
        shipperPhoneNumber: phoneNumber,
        shipperStreet1: this.salesRepValues.address,
        shipperCountry: 'USA',
        shipperPostalCode: this.salesRepValues.zip,
        shipperCity: this.salesRepValues.city,
        shipperState: this.salesRepValues.state,
      });
    }
    this.billOfLading.patchValue({
      shipTimestamp: new Date()
    })
    let timestamp = new Date();
    console.log('timestamp', timestamp);
    let pstDate = moment(timestamp).tz("America/Los_Angeles").format();
    let newValue = pstDate.split('T');
    console.log('pstNrewvbgfrd', new Date(newValue[0]));
    let newDate = new Date(newValue[0]);
    this.bolShipmentNewDate = newDate;
    this.minDate = newDate;
    console.log('this.bolShipmentNewDate', this.bolShipmentNewDate);
    this.customerService.getCarrierForCustomer(this.companyId, this.accessToken).subscribe(response => {
      this.carrierResponse = response;
      let carrier;
      if (this.carrierResponse.length > 0) {
        for (let d = 0; d < this.carrierResponse.length; d++) {
          if (this.carrierResponse[d].type === 'FEDEX ECONOMY') {
            carrier = 'FXFE';
          } else if (this.carrierResponse[d].type === 'FEDEX PRIORITY') {
            carrier = 'FXFP';
          } else {
            carrier = this.carrierResponse[d].type;
          }
          this.carrierArray.push(carrier);
        }
        if (this.carrierArray.length > 0) {
          this.carrierArray = this.removeDuplicates(this.carrierArray);
          this.showCarrierRule = true;
        }
      } else {
        this.carrierArray = [];
        this.errorGetRateMsg = true;
        this.showCarrierRule = false;
        this.showCarrierNoRule = false;
      }
    });
    this.itemTemplateData();
    this.addressTemplateData();
    this.getAllShipperName();
    this.splInstructionTemplateData();
    // this.getBolValues();
  }

  getAllShipperName() {
    this.pricingInfoService.getAllCustomerName(this.accessToken).subscribe(getCustomerData => {
      this.customerFeatures = getCustomerData;
      console.log('customerfeatures', this.customerFeatures)
      this.logger = { 'method': 'getAllCustomerName', 'message': 'Customers', 'CustomerDetail ': 'All' };
      this.loggerService.info(this.logger);
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

  removeDuplicates(arr:any) {
    let unique_array = []
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) === -1) {
        unique_array.push(arr[i]);
      }
    }
    return unique_array;
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



  checkEnterKey(event:any, type:any) {
    console.log('event', event, type);
    let carrierData;
    if (type === 'classification') {
      this.showToolTip = true;
    }
    if (event.which === 13) {
      event.preventDefault();
      if (type === 'handlingUnitQuantity') {
        if (type === 'handlingUnitQuantity') {
          (document.getElementById('packageQuantity')as HTMLFormElement).focus();
          event.preventDefault();
        } else {
          (document.getElementById('weight')as HTMLFormElement).focus();
          event.preventDefault();
        }
      } else if (type === 'packageQuantity') {
        (document.getElementById('weight')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'packageQuantityMultiClass') {
        (document.getElementById('weightForMultiClass')as HTMLFormElement).focus();
        event.preventDefault();
      }
      else if (type === 'weight') {
        if (event.target.value !== '') {
          (document.getElementById('desc')as HTMLFormElement).focus();
          event.preventDefault();
        }
      } else if (type === 'weightForMultiClass') {
        (document.getElementById('length')as HTMLFormElement).focus();
        event.preventDefault();
      }
      if (type === 'desc') {
        (document.getElementById('length')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'length') {
        console.log(this.billOfLading);
        if(Number(this.billOfLading.value.length) >= 96 || Number(this.billOfLading.value.height) >= 96 || Number(this.billOfLading.value.width) >= 96) {
          this.showoverdimensionerror = true;
        } else if(Number(this.billOfLading.value.length) < 96 ){
          this.showoverdimensionerror = false;
        }
        (document.getElementById('width')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'width') {
        if(Number(this.billOfLading.value.width) >= 96 || Number(this.billOfLading.value.length) >= 96 || Number(this.billOfLading.value.height) >= 96) {
          this.showoverdimensionerror = true;
        } else if(Number(this.billOfLading.value.width) < 96 ){
          this.showoverdimensionerror = false;
        }
        (document.getElementById('height')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'height') {
        if(Number(this.billOfLading.value.height) >= 96 || Number(this.billOfLading.value.length) >= 96 || Number(this.billOfLading.value.width) >= 96) {
          this.showoverdimensionerror = true;
        } else if(Number(this.billOfLading.value.height) < 96 ){
          this.showoverdimensionerror = false;
               }
               $('#cpf3').focus();
               (<HTMLInputElement>document.getElementById("cpf3")).focus;  
        event.preventDefault();
      } else if (type === 'nmfc') {
        (document.getElementById('classification')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'classification') {
        this.showToolTip = true;
       (document.getElementById('addButton')as HTMLFormElement).focus();
        //  $('#addButton').focus();
        event.preventDefault();
      } else if (type === 'heightForMultiClass') {
        // $('#addButton').focus();
       (document.getElementById('addButton')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'cube') {
        this.addRow(this.billOfLading.value);
       (document.getElementById('addButton')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'handlingUnitTypeUpdate') {
       (document.getElementById('packageQuantityUpdate')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'packageQuantityUpdate') {
       (document.getElementById('descriptionUpdate')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'lengthUpdate') {
        (document.getElementById('widthUpdate')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'widthUpdate') {
        (document.getElementById('heightUpdate')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'heightUpdate') {
        $('#cpf10').focus();
        (<HTMLInputElement>document.getElementById("cpf10")).focus;
      } else if (type === 'descriptionUpdate') {
        (document.getElementById('lengthUpdate')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'packageQuantityForPieces') {
        (document.getElementById('weightForPieces')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'weightForPieces') {
        // if (this.showForItemize === false) {
        (document.getElementById('descForPieces1')as HTMLFormElement).focus();
        event.preventDefault();

        // } else {
        //   document.getElementById('descForPieces').focus();
        // }

      }
      //  else if (type === 'descForPieces') {
      //   // if (this.showForItemize === false) {
      //   //   $('#cpf9').focus();
      //   //   (<HTMLInputElement>document.getElementById("cpf9")).focus;
      //   // } else {
      //     document.getElementById('addBtn').focus();
      //     event.preventDefault();

      // } 
      else if (type === 'nmfcForPieces') {
        // document.getElementById('classificationForPieces').focus();
        if (this.showForItemize === false) {
          $('#classificationForPieces').focus();

        }
        event.preventDefault();
      } else if (type === 'classificationForPieces') {
        // document.getElementById('addBtn').focus();
        $('#addBtn').focus();
        event.preventDefault();
      } else if (type === 'packageQuantityForEdit') {
        (document.getElementById('weightForEdit')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'weightForEdit') {
        (document.getElementById('descForEdit')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'descForEdit') {
        if (this.showForMultiClassPiecesList === true) {
          $('#cpf11').focus();
          (<HTMLInputElement>document.getElementById("cpf11")).focus;
        } else {
          if (this.showForAddPiecesInTable === true) {
            (document.getElementById('saveBtn')as HTMLFormElement).focus();
          } else {
            (document.getElementById('updateBtn')as HTMLFormElement).focus();
          }
        }
        event.preventDefault();
      } else if (type === 'nmfcEdit') {
        (document.getElementById('classificationEdit')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'classificationEdit') {
        if (this.showForAddPiecesInTable === true) {
          (document.getElementById('saveBtn')as HTMLFormElement).focus();
        } else {
          (document.getElementById('updateBtn')as HTMLFormElement).focus();
        }
        event.preventDefault();
      }
    } else if (event.keyCode === 27) {
      this.billOfLading.patchValue({
        handlingUnitQuantity: 1
      });
      console.log('this.multiClassShipmentTable', this.multiClassShipmentTable);
      // $('#packageQuantity').focus();
      this.addShipmentInfo(this.billOfLading.value, this.addPiecesHeader);
    } else if (event.keyCode === 9) {
      if (type === 'cube') {
        // document.getElementById('addButton').focus();	
        // event.preventDefault();	
        this.addRow(this.billOfLading.value);
      }
    }
  }

  checkEnterKey1(event:any, type:any) {
    console.log(type, event);
    if (type === 'descForPieces') {
      if (event.keyCode === 13) {
        console.log('show', this.showForItemize);
        // if (this.showForItemize === false) {
        //   console.log('show', this.showForItemize);
        //   setTimeout(() => {
        //     $('#cpf9').focus();
        //   }, 100);

        // } else {
        $('#addBtn').focus();
        // }
        // document.getElementById('cpf9').focus();
        // event.preventDefault();
        // }
      }
      // else if(event.keyCode === 39) {
      //   console.log('type', type);
      //   this.enableAutoComplete = true;

      //   // $('#descriptionToggle').focus();


      // } 

      // } else if (type === 'descriptionToggle') {
      //   if (event.which === 13) {
      //     $('#tabletemplate').focus();
      //     document.getElementById('addBtn').focus();

      //   } 
      // else if (event.keyCode === 39) {
      //   $('#descriptionModalid').focus();
      // } 
      // else if (event.keyCode === 37) {
      //   $('#descForPieces').click();
      // }
      //   else if (event.keyCode === 27) {
      //   $('#weightForPieces').click();
      // }
    } else if (type === "nmfcForPieces") {
      console.log('test');

      if (event.which === 13) {
        (document.getElementById('classificationForPieces')as HTMLFormElement).focus();
        event.preventDefault();
        // setTimeout(() => {
        //   $('#classificationForPieces').focus();
        // }, 500);
      }
    } else if (type === "classificationForPieces") {
      if (event.which === 13) {
        $('#addBtn').focus();
      }
    } else if (type === 'Pieces1') {
      console.log('fgfg');

      if (event.which === 13) {
        if (this.enableAutoComplete === true) {
          $('#addBtn').focus();
        } else {
          // setTimeout(() => {
          console.log('testgdfed');
          $('#cpf9').focus();
          // }, 100);

        }
      }
    }
  }
  applyFilter(filterValue: string) {
    console.log(filterValue);
    // if (filterValue.length >= 2) {
    // this.enableAutoComplete = true;
    // $('#descForPieces1').focus();
    // document.getElementById('descForPieces1').focus();

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

    // } else if (filterValue.length < 2) {
    //   console.log('filterLength', filterValue);
    //   this.enableAutoComplete = false;
    //   // this.viewCustomer();
    // }

  }

  valueFormatter = (data: any) => {
    console.log(data);
    if (this.filterData.length = 0) {
      this.filterData.push(this.itemTemplate);
      this.itemTemplate = this.filterData;
    } else {
      this.filterData.push(data);
      this.itemTemplate = this.filterData;
      console.log('filterData', this.filterData);
      return data.templateName;
    }
  }
  getDescription(event:any) {
    console.log(event.item.description);
    console.log(this.billOfLading.value);
    this.piecesForm.patchValue({
      description: event.item.description,
      nmfc: event.item.nmfcNumber,
      classification: event.item.class,
    });
    $('#addBtn').focus();
    // this.billOfLading.controls['description'].setValue(event.item.description);
    console.log(this.billOfLading.value);

  }

  listFormatter = (data: any) => {
    console.log(data);
    return data.templateName;
  }
  checkEnterKey2(event:any, type:any, tabindex:any) {
    console.log(event, type, tabindex);
  }

  checkWeight(value:any) {
    if (value !== '') {
      let numberData = this.checkNumber(value);
      this.newWeight = value;
    } else {
      this.newWeight = '';
    }
  }
  checkmodalenterKey(event:any, value:any) {
    console.log(event, value);
    if (event.keyCode === 13) {
      if (value === 'contact') {
        $('#contactNumber').focus();
      } else if (value === 'contactNumber') {
        $('#hours').focus();

      } else if (value === 'hours') {
        $('#alternateName').focus();

      } else if (value === 'alternateName') {
        $('#alternateNumber').focus();

      }
      // else if (value === 'alternateNumber') {
      //   $('#modalSave').focus();

      // }
    }
  }
  /*  checkForNumber(value, type) {
     this.packageQuantityValue = 0;
     let numberData = this.checkNumber(value);
     if (type === 'handlingUnits') {
       this.billOfLading.patchValue({ handlingUnitQuantity: numberData });
     } else {
       if (type === 'weight') {
         if (numberData > 20000) {
           this.checkForWeight = true;
           this.billOfLading.patchValue({ weight: '' });
         } else {
           this.checkForWeight = false;
           this.billOfLading.patchValue({ weight: numberData });
         }
       } else if (type === 'length') {
         this.billOfLading.patchValue({ length: numberData });
       } else if (type === 'width') {
         this.billOfLading.patchValue({ width: numberData });
       } else if (type === 'height') {
         this.billOfLading.patchValue({ height: numberData });
         this.showFlagForDimensions = false;
       }else if (type === 'package') {
         this.packageQuantityValue = numberData;
         this.billOfLading.patchValue({ packageQuantity: numberData });
         if (numberData >= 1) {
           this.setFlagForDimensions = true;
           this.showFlagForDimensions = true;
         } else {
           this.setFlagForDimensions = false;
           this.showFlagForDimensions = false;
         }
         if (numberData >= 1) {
           if (this.billOfLading.controls.length.value !== '' && this.billOfLading.controls.width.value !== '' && this.billOfLading.controls.height.value !== '') {
             this.setFlagForDimensions = false;
             this.showFlagForDimensions = false;
           } else {
             this.showFlagForDimensions = true;
             this.setFlagForDimensions = true;
           }
         } else {
           this.showFlagForDimensions = false;
           this.setFlagForDimensions = false;
         }
         // this.checkDimensions(value, type);
       } else if (type === 'packageQuantityUpdate') {
         this.editLineItemUpdateForm.patchValue({ packageQuantityUpdate: numberData });
         if (numberData > 7) {
           this.setFlagForDimensions = true;
           this.showFlagForDimensions = true;
         } else {
           this.setFlagForDimensions = false;
           this.showFlagForDimensions = false;
         }
       } else if (type === 'handlingUnitQuantityUpdate') {
         this.editLineItemUpdateForm.patchValue({ handlingUnitQuantityUpdate: numberData });
       } else if (type === 'lengthUpdate') {
         this.editLineItemUpdateForm.patchValue({ lengthUpdate: numberData });
       } else if (type === 'widthUpdate') {
         this.editLineItemUpdateForm.patchValue({ widthUpdate: numberData });
       } else if (type === 'heightUpdate') {
         this.editLineItemUpdateForm.patchValue({ heightUpdate: numberData });
       } else if (type === 'handlingUnitsEdit') {
         this.editShipmentInformationForm.patchValue({
           handlingUnitQuantity: numberData
         });
         document.getElementById('handlingUnitQuantityEdit').className = 'form-control';
       } else if (type === 'packageEdit') {
         this.editShipmentInformationForm.patchValue({
           packageQuantity: numberData
         });
         document.getElementById('packageQuantityEdit').className = 'form-control';
       } else {
         this.billOfLading.patchValue({ height: numberData });
         this.setFlagForDimensions = false;
         this.showFlagForDimensions = false;
       }
     }
   } */
  checkForenterKeyEdit(event:any, type:any) {
    console.log(event, type);
    if (type === 'HandlingUnitsEdit') {
      if (event.keyCode === 13) {
        setTimeout(() => {
          // (document.getElementById('packageQuantityEdit')as HTMLFormElement).focus();
          $('#weight').focus();

        }, 100);
      }
    } else if (type === 'lengthEdit') {
      if (event.keyCode === 13) {
        setTimeout(() => {
          $('#widthEdit').focus();
        }, 100);
      }
    } else if (type === 'widthEdit') {
      if (event.keyCode === 13) {
        setTimeout(() => {
          $('#heightEdit').focus();
        }, 100);
      }
    } else if (type === 'widthEdit') {
      if (event.keyCode === 13) {
        setTimeout(() => {
          $('#nmfcEdit').focus();
        }, 100);
      }
    } else if (type === 'nmfcEdit') {
      if (event.keyCode === 13) {
        setTimeout(() => {
          $('#classificationedit').focus();
        }, 100);
      }
    } else if (type === 'classificationedit') {
      if (event.keyCode === 13) {
        setTimeout(() => {
          $('#packageQuantityEdit').focus();
        }, 100);
      }
    } else if (type === 'packageQuantityEdit') {
      if (event.keyCode === 13) {
        setTimeout(() => {
          $('#descEdit').focus();
        }, 100);
      }
    } else if (type === 'descEdit') {
      if (event.keyCode === 13) {
        setTimeout(() => {
          $('#updateEdit').focus();
        }, 100);
      }
    }
    //   $('#description-modal1').modal('show');
    //   setTimeout(() => {
    //     $('#tasknote').focus();
    //   }, 100);
    // }
  }
  checkForNumber(value:any, type:any) {
    this.packageQuantityValue = 0;
    let numberData = this.checkNumber(value);
    if (type === 'handlingUnits') {
      this.billOfLading.patchValue({ handlingUnitQuantity: numberData });
    } else {
      if (type === 'weight') {
        if (this.billOfLading.value.shipmentType === 'voltl') {
          if (numberData > 48000) {
            this.checkForWeight = true;
            this.billOfLading.patchValue({ weight: '' });
          } else {
            this.checkForWeight = false;
            this.billOfLading.patchValue({ weight: numberData });
          }
        } else {
          if (numberData > 20000) {
            this.checkForWeight = true;
            this.billOfLading.patchValue({ weight: '' });
          } else {
            this.checkForWeight = false;
            this.billOfLading.patchValue({ weight: numberData });
          }
        }
      } else if (type === 'length') {
        this.billOfLading.patchValue({ length: numberData });
      } else if (type === 'width') {
        this.billOfLading.patchValue({ width: numberData });
      } else if (type === 'package') {
        this.packageQuantityValue = numberData;
        this.billOfLading.patchValue({ packageQuantity: numberData });
        if (numberData > 7) {
          this.setFlagForDimensions = true;
          this.showFlagForDimensions = true;
        } else {
          this.setFlagForDimensions = false;
          this.showFlagForDimensions = false;
        }
        if (numberData > 7) {
          if (this.billOfLading.controls['length'].value !== '' && this.billOfLading.controls['width'].value !== '' && this.billOfLading.controls['height'].value !== '') {
            this.setFlagForDimensions = false;
            this.showFlagForDimensions = false;
          } else {
            this.showFlagForDimensions = true;
            this.setFlagForDimensions = true;
          }
        } else {
          this.showFlagForDimensions = false;
          this.setFlagForDimensions = false;
        }
        // this.checkDimensions(value, type);
      } else if (type === 'packageQuantityUpdate') {
        this.editLineItemUpdateForm.patchValue({ packageQuantityUpdate: numberData });
        if (numberData > 7) {
          this.setFlagForDimensions = true;
          this.showFlagForDimensions = true;
        } else {
          this.setFlagForDimensions = false;
          this.showFlagForDimensions = false;
        }
      } else if (type === 'handlingUnitQuantityUpdate') {
        this.editLineItemUpdateForm.patchValue({ handlingUnitQuantityUpdate: numberData });
      } else if (type === 'lengthUpdate') {
        this.editLineItemUpdateForm.patchValue({ lengthUpdate: numberData });
      } else if (type === 'widthUpdate') {
        this.editLineItemUpdateForm.patchValue({ widthUpdate: numberData });
      } else if (type === 'heightUpdate') {
        this.editLineItemUpdateForm.patchValue({ heightUpdate: numberData });
      } else if (type === 'handlingUnitsEdit') {
        this.editShipmentInformationForm.patchValue({
          handlingUnitQuantity: numberData
        });
        // document.getElementById('handlingUnitQuantityEdit').className = 'form-control';
      } else if (type === 'packageEdit') {
        this.editShipmentInformationForm.patchValue({
          packageQuantity: numberData
        });
        (document.getElementById('packageQuantityEdit')as HTMLFormElement).className = 'form-control';
      } else {
        this.billOfLading.patchValue({ height: numberData });
        this.setFlagForDimensions = false;
        this.showFlagForDimensions = false;
      }
    }
  }
  checkDimensions(formValue:any, type:any) {
    console.log('formValue', formValue, type);
    // this.billOfLading.patchValue({
    //   description: event.item.description,
    //   nmfc: event.item.nmfcNumber,
    //   classification: event.item.class,
    // });
    // if (formValue.length)
    if (formValue.length.includes(".")) {
      console.log("string contains dot");
      let x;
      x = Math.round(Number(formValue.length))
      this.billOfLading.patchValue({
        length: x.toString()
      });
      formValue.length = Math.round(Number(formValue.length));
      console.log(formValue);
    }
    if (formValue.width.includes(".")) {
      console.log("string contains dot");
      let x;
      x = Math.round(Number(formValue.width))
      this.billOfLading.patchValue({
        width: x.toString()
      });
      formValue.width = Math.round(Number(formValue.width));
      console.log(formValue);
    }
    if (formValue.height.includes(".")) {
      console.log("string contains dot");
      let x;
      x = Math.round(Number(formValue.height))
      this.billOfLading.patchValue({
        height: x.toString()
      });
      formValue.height = Math.round(Number(formValue.height));
      console.log(formValue);
    }
    if (type === 'billOfLading') {
      if (Number(formValue.packageQuantity) === undefined) {
        if (formValue.length !== '' && formValue.width !== '' && formValue.height !== '') {
          this.setFlagForDimensions = false;
          this.showFlagForDimensions = false;
        } else {
          this.showFlagForDimensions = true;
          this.setFlagForDimensions = true;
        }
      } else {
        this.showFlagForDimensions = false;
        this.setFlagForDimensions = false;
      }
    } else {
      if (Number(formValue.packageQuantityUpdate) > 7) {
        if (formValue.lengthUpdate !== '' && formValue.widthUpdate !== '' && formValue.heightUpdate !== '') {
          this.setFlagForDimensions = false;
          this.showFlagForDimensions = false;
        } else {
          this.showFlagForDimensions = true;
          // this.setFlagForDimensions = true;
        }
      } else {
        this.showFlagForDimensions = false;
        this.setFlagForDimensions = false;
      }
    }
    this.calculateCube(formValue);
  }

  ngOnDestroy() {
    if (this.referenceSubsciption !== null && this.referenceSubsciption !== undefined) {
      this.referenceSubsciption.unsubscribe();
      console.log(this.referenceSubsciption);


    }
    this.pricingInfoService.passReferenceNumber('');
    if (this.quoteSubscription !== null && this.quoteSubscription !== undefined) {
      this.quoteSubscription.unsubscribe();
      console.log(this.quoteSubscription);
    }
    // this.pricingInfoService.referenceSubject.unsubscribe();
  }

  calculateCube(value:any) {
    let cube;
    if (value.length !== '' && value.width !== '' && value.height !== '') {
      cube = ((Number(value.length) * Number(value.width) * Number(value.height)) / 1728).toFixed(2);
      console.log('cube', cube);
      this.billOfLading.patchValue({
        cube: cube
      });
    }
  }

  getRateForOthers() {

  }

  /*  checkForServiceType(type, value) {
     console.log('check for service type', type, value);
     this.showAddedValue = true;
     this.showThirdParty = false;
     //this.detailArray = [];
     this.lengthOfDetailArray = 1;
     //this.pricingDetail = [];
     // this.combiningAllShipmentsArray = [];
     this.backButtonCarrier = false;
     this.serviceCarrierType = '';
     this.showInputForOthers = false;
     this.invalidQuoteCarrierMsg = false;
     this.invalidQuoteMsg = false;
     this.applyCostFactor = false;
     this.costPlusPercentFactor = 0;
     this.costPlusArray = [];
     this.errorGetRateMsg = false;
     this.noRuleErrorMsg = false;
     this.billOfLading.patchValue({ quoteNumber: '', thirdParty: "BillToForte" });
     if (type === 'YRC') {
       this.serviceCarrierType = type;
       this.showForYrc = true;
       this.handlingUnitTypeArray = ['CTN', 'PLT', 'PCS', 'DRM'];
       this.packageUnitArray = ['CTN', 'PLT', 'PCS', 'DRM'];
     } else {
       this.serviceCarrierType = type;
       if (type === 'OTHERS') {
         console.log('check for service type 2', type, value);
         this.showInputForOthers = true;
         this.showThirdParty = true;
         this.handlingUnitTypeArray = ['PLT', 'PCS', 'DRM', 'CTN'];
         this.packageUnitArray = ['CTN', 'PLT', 'PCS', 'DRM'];
         let data;
         data = { name: 'Forte', street: '301 54th Ave. E.Ste 200', city: 'Fife', state: 'WA', zip: '98424' };
         this.billOfLading.patchValue({
           thirdParty: "ThirdParty",
           thirdPartyCompanyName: data.name,
           thirdPartyPostalCode: data.zip,
           thirdPartyStreet: data.street,
           thirdPartyState: data.state,
           thirdPartyCity: data.city
         });
       } else {
         this.showForYrc = false;
         this.handlingUnitTypeArray = ['CTN', 'PLT', 'PCS', 'DRM'];
         this.packageUnitArray = ['CTN', 'PLT', 'PCS', 'DRM'];
       }
     }
     if (this.customerType !== 'admin') {
       if (this.carrierArray.length > 0) {
         for (let j = 0; j < this.carrierArray.length; j++) {
           if (type === this.carrierArray[j]) {
             if (this.salesRepValues.companyDetails.costPlus === true) {
               if (this.salesRepValues.companyDetails.costPlusFactor.length > 0) {
                 this.costPlusArray = this.salesRepValues.companyDetails.costPlusFactor;
                 let carrierName;
                 if (type === 'FXFE') {
                   carrierName = 'FEDEX ECONOMY'
                 } else if (type === 'FXFP') {
                   carrierName = 'FEDEX PRIORITY';
                 } else {
                   carrierName = type;
                 }
                 for (let c = 0; c < this.costPlusArray.length; c++) {
                   if (carrierName === this.costPlusArray[c].carrier) {
                     let factorValue = this.costPlusArray[c].factor;
                     this.costPlusPercentFactor = 1 + (Number(factorValue) / 100);
                     this.applyCostFactor = true;
                   } else {
                     this.costPlusPercentFactor = 1;
                     this.applyCostFactor = false;
                   }
                 }
                 if (this.applyCostFactor === true) {
                   this.factorization = 'COSTPLUS';
                   } else {
                     this.factorization = carrierName;
                   }
               }
             }
             this.backButtonCarrier = true;
             this.showGetRateButton = true;
             this.createStoreFlag = true;
             this.showRate = true;
             this.noRuleErrorMsg = false;
             break;
           } else {
             if (this.salesRepValues.companyDetails.costPlus === true) {
               if (this.salesRepValues.companyDetails.costPlusFactor.length > 0) {
                 this.costPlusArray = this.salesRepValues.companyDetails.costPlusFactor;
                 let carrierName;
                 if (type === 'FXFE') {
                   carrierName = 'FEDEX ECONOMY'
                 } else if (type === 'FXFP') {
                   carrierName = 'FEDEX PRIORITY';
                 } else {
                   carrierName = type;
                 }
                 for (let c = 0; c < this.costPlusArray.length; c++) {
                   if (carrierName === this.costPlusArray[c].carrier) {
                     let factorValue = this.costPlusArray[c].factor;
                     this.costPlusPercentFactor = 1 + (Number(factorValue) / 100);
                     this.applyCostFactor = true;
                     this.backButtonCarrier = true;
                     this.showGetRateButton = true;
                     this.createStoreFlag = true;
                     this.showRate = true;
                     this.noRuleErrorMsg = false;
                     break;
                   } else {
                     console.log('check for service type 7', type, value);
                     this.costPlusPercentFactor = 1;
                     this.applyCostFactor = false;
                     this.showGetRateButton = false;
                     this.showRate = false;
                     this.createStoreFlag = false;
                     this.showGetRateButton = false;
                     this.noRuleErrorMsg = true;
                   }
                 }
               }
             } else {
               console.log('check for service type 6', type, value);
               this.backButtonCarrier = false;
               this.showGetRateButton = true;
               this.showRate = false;
               this.createStoreFlag = false;
               this.applyCostFactor = false;
               this.noRuleErrorMsg = true;
             }
           }
         }
       } else {
         if (this.salesRepValues.companyDetails.costPlus === true) {
           if (this.salesRepValues.companyDetails.costPlusFactor.length > 0) {
             this.costPlusArray = this.salesRepValues.companyDetails.costPlusFactor;
             let carrierName;
             if (type === 'FXFE') {
               carrierName = 'FEDEX ECONOMY'
             } else if (type === 'FXFP') {
               carrierName = 'FEDEX PRIORITY';
             } else {
               carrierName = type;
             }
             for (let c = 0; c < this.costPlusArray.length; c++) {
               if (carrierName === this.costPlusArray[c].carrier) {
                 let factorValue = this.costPlusArray[c].factor;
                 this.costPlusPercentFactor = 1 + (Number(factorValue) / 100);
                 this.applyCostFactor = true;
                 this.backButtonCarrier = true;
                 this.showGetRateButton = true;
                 this.createStoreFlag = true;
                 this.showRate = true;
                 this.noRuleErrorMsg = false;
                 if (this.applyCostFactor === true) {
                   this.factorization = 'COSTPLUS';
                   } else {
                     this.factorization = carrierName;
                   }
                 break;
               } else {
                 this.costPlusPercentFactor = 1;
                 this.applyCostFactor = false;
                 this.backButtonCarrier = false;
                 this.showGetRateButton = false;
                 this.createStoreFlag = false;
                 this.showRate = false;
                 this.noRuleErrorMsg = true;
               }
             }
           }
         } else {
           console.log('check for service type 5', type, value);
           this.backButtonCarrier = false;
           this.showGetRateButton = true;
           this.showRate = true;
           this.createStoreFlag = false;
           this.applyCostFactor = false;
           //  this.noRuleErrorMsg = true;
         }
       }
     } else {
       if (this.quoteDetails !== undefined) {
         if (this.quoteDetails.quoteReferenceId !== undefined) {
           this.showGetRateButton = false;
           this.showRate = true;
           this.createStoreFlag = true;
         }
       } else {
         this.showGetRateButton = false;
         this.showRate = false;
         this.createStoreFlag = false;
         this.noRuleErrorMsg = true;
       }
     }
   } */


  checkForServiceType(type:any, value:any) {
    console.log('check for service type', type, value);
    this.showAddedValue = true;
    this.showThirdParty = false;
    this.noshipmentDataMessage = false;
    //this.detailArray = [];
    this.lengthOfDetailArray = 1;
    //this.pricingDetail = [];
    // this.combiningAllShipmentsArray = [];
    this.backButtonCarrier = false;
    this.serviceCarrierType = '';
    this.showInputForOthers = false;
    this.invalidQuoteCarrierMsg = false;
    this.invalidQuoteMsg = false;
    this.applyCostFactor = false;
    this.costPlusPercentFactor = 0;
    this.costPlusArray = [];
    this.errorGetRateMsg = false;
    this.noRuleErrorMsg = false;
    this.factorization = '';
    // this.billOfLading.patchValue({ quoteNumber: '', thirdParty: "BillToForte" });
    if (type === 'YRC') {
      this.serviceCarrierType = type;
      this.showForYrc = true;
      this.handlingUnitTypeArray = ['CTN', 'PLT', 'PCS', 'DRM'];
      this.packageUnitArray = ['CTN', 'PLT', 'PCS', 'DRM'];
    } else {
      this.serviceCarrierType = type;
      if (type === 'OTHERS') {
        console.log('check for service type 2', type, value);
        this.showInputForOthers = true;
        this.showThirdParty = true;
        this.handlingUnitTypeArray = ['PLT', 'PCS', 'DRM', 'CTN'];
        this.packageUnitArray = ['CTN', 'PLT', 'PCS', 'DRM'];
        let data;
        data = { name: 'Forte', street: '301 54th Ave. E.Ste 200', city: 'Fife', state: 'WA', zip: '98424' };
        this.billOfLading.patchValue({
          thirdParty: "ThirdParty",
          thirdPartyCompanyName: data.name,
          thirdPartyPostalCode: data.zip,
          thirdPartyStreet: data.street,
          thirdPartyState: data.state,
          thirdPartyCity: data.city
        });
        if (value.consigneeState === 'AK' || value.consigneeState === 'HI') {
          this.noshipmentDataMessage = true;
        }
      } else {
        this.noshipmentDataMessage = false;
        this.showForYrc = false;
        this.handlingUnitTypeArray = ['CTN', 'PLT', 'PCS', 'DRM'];
        this.packageUnitArray = ['CTN', 'PLT', 'PCS', 'DRM'];
      }
    }
    if (this.customerType !== 'admin') {
      if (this.carrierArray.length > 0) {
        for (let j = 0; j < this.carrierArray.length; j++) {
          console.log('this.carrierArray Carrier Choose', this.carrierArray[j]);
          if (type === this.carrierArray[j]) {
            console.log('this.carrierArray Carrier Choose 1', this.salesRepValues.companyDetails);
            if (this.salesRepValues.companyDetails.costPlus === true) {
              if (this.salesRepValues.companyDetails.costPlusFactor.length > 0) {
                this.costPlusArray = this.salesRepValues.companyDetails.costPlusFactor;
                let carrierName;
                if (type === 'FXFE') {
                  carrierName = 'FEDEX ECONOMY'
                } else if (type === 'FXFP') {
                  carrierName = 'FEDEX PRIORITY';
                } else {
                  carrierName = type;
                }
                console.log('this.carrierArray Carrier Choose 2', this.salesRepValues.companyDetails, this.costPlusArray);

                for (let c = 0; c < this.costPlusArray.length; c++) {
                  if (carrierName === this.costPlusArray[c].carrier) {
                    let factorValue = this.costPlusArray[c].factor;
                    this.costPlusPercentFactor = 1 + (Number(factorValue) / 100);
                    this.applyCostFactor = true;
                  } else {
                    this.costPlusPercentFactor = 1;
                    this.applyCostFactor = false;
                  }
                }
                if (this.applyCostFactor === true) {
                  this.factorization = 'COSTPLUS';
                } else {
                  this.factorization = carrierName;
                }
              }
            }
            this.backButtonCarrier = true;
            this.showGetRateButton = true;
            this.createStoreFlag = true;
            this.showRate = true;
            this.noRuleErrorMsg = false;
            // if (this.applyCostFactor === true) {
            //   this.factorization = carrierName;
            //   }
            break;
          } else {
            if (this.salesRepValues.companyDetails.costPlus === true) {
              if (this.salesRepValues.companyDetails.costPlusFactor.length > 0) {
                this.costPlusArray = this.salesRepValues.companyDetails.costPlusFactor;
                let carrierName;
                if (type === 'FXFE') {
                  carrierName = 'FEDEX ECONOMY'
                } else if (type === 'FXFP') {
                  carrierName = 'FEDEX PRIORITY';
                } else {
                  carrierName = type;
                }
                for (let c = 0; c < this.costPlusArray.length; c++) {
                  if (carrierName === this.costPlusArray[c].carrier) {
                    let factorValue = this.costPlusArray[c].factor;
                    this.costPlusPercentFactor = 1 + (Number(factorValue) / 100);
                    this.applyCostFactor = true;
                    this.backButtonCarrier = true;
                    this.showGetRateButton = true;
                    this.createStoreFlag = true;
                    this.showRate = true;
                    this.noRuleErrorMsg = false;
                    if (this.applyCostFactor === true) {
                      this.factorization = 'COSTPLUS';
                    } else {
                      this.factorization = carrierName;
                    }
                    break;
                  } else {
                    console.log('check for service type 7', type, value);
                    this.costPlusPercentFactor = 1;
                    this.applyCostFactor = false;
                    this.showGetRateButton = false;
                    this.showRate = false;
                    this.createStoreFlag = false;
                    this.showGetRateButton = false;
                    this.noRuleErrorMsg = true;
                  }
                }
              }
            } else {
              console.log('check for service type 6', type, value);
              this.backButtonCarrier = false;
              this.showGetRateButton = true;
              this.showRate = false;
              this.createStoreFlag = false;
              this.applyCostFactor = false;
              this.noRuleErrorMsg = true;
            }
          }
        }
      } else {
        if (this.salesRepValues.companyDetails.costPlus === true) {
          if (this.salesRepValues.companyDetails.costPlusFactor.length > 0) {
            this.costPlusArray = this.salesRepValues.companyDetails.costPlusFactor;
            let carrierName;
            if (type === 'FXFE') {
              carrierName = 'FEDEX ECONOMY'
            } else if (type === 'FXFP') {
              carrierName = 'FEDEX PRIORITY';
            } else {
              carrierName = type;
            }
            for (let c = 0; c < this.costPlusArray.length; c++) {
              if (carrierName === this.costPlusArray[c].carrier) {
                let factorValue = this.costPlusArray[c].factor;
                this.costPlusPercentFactor = 1 + (Number(factorValue) / 100);
                this.applyCostFactor = true;
                this.backButtonCarrier = true;
                this.showGetRateButton = true;
                this.createStoreFlag = true;
                this.showRate = true;
                this.noRuleErrorMsg = false;
                if (this.applyCostFactor === true) {
                  this.factorization = 'COSTPLUS';
                } else {
                  this.factorization = carrierName;
                }
                break;
              } else {
                this.costPlusPercentFactor = 1;
                this.applyCostFactor = false;
                this.backButtonCarrier = false;
                this.showGetRateButton = false;
                this.createStoreFlag = false;
                this.showRate = false;
                this.noRuleErrorMsg = true;
              }
            }
          }
        } else {
          console.log('check for service type 5', type, value);
          this.backButtonCarrier = false;
          this.showGetRateButton = true;
          this.showRate = true;
          this.createStoreFlag = false;
          this.applyCostFactor = false;
          //  this.noRuleErrorMsg = true;
        }
      }
    } else {
      if (this.quoteDetails !== undefined) {
        if (this.quoteDetails.quoteReferenceId !== undefined) {
          this.showGetRateButton = false;
          this.showRate = true;
          this.createStoreFlag = true;
        }
      } else {
        this.showGetRateButton = false;
        this.showRate = false;
        this.createStoreFlag = false;
        this.noRuleErrorMsg = true;
      }
    }
    console.log(this.companyData);
    this.companyDetails.forEach((obj:any) => {
      if (obj.id === this.companyId) {
        this.companySpecificName = obj.companyName;
        this.companyData = obj;
      }

    });
    if (this.companyData.specificPricing === true) {
      let carrierName:any;
      if (type === 'FXFE') {
        carrierName = 'FEDEX ECONOMY'
      } else if (type === 'FXFP') {
        carrierName = 'FEDEX PRIORITY';
      } else {
        carrierName = type;
      }
      this.billPaidNamePricingname = this.companyData.specificPricingList.find((check:any) => check === carrierName);
      this.billPaidNamePricing = this.billPaidNamePricingname !== undefined ? true : false;
      this.pricingInfoService.passPricingValue(this.billPaidNamePricing);
      console.log(this.billPaidNamePricing);
    } else {
      this.billPaidNamePricing = false;
      this.pricingInfoService.passPricingValue(this.billPaidNamePricing);
    }
  }

  addPiecesInEditForm(type:any) {
    this.showEditPiecesForm = true;
    if (type === 'Itemized') {
      this.showForMultiClassPiecesList = false;
    } else {
      this.showForMultiClassPiecesList = true;
    }
    this.showForAddPiecesInTable = true;
  }
  addPieces(value:any, bolForm:any, type:any) {
    console.log('value', value, type);
    let weightArray = [], totalPiecesArray = [];
    this.headerDetailForShipment.differenceWeight;
    this.headerDetailForShipment.differencePieces;
    let flagName;
    this.showForAddPiecesInTable = false;
    this.errorMessageForPiecesCount = false;
    this.errorMessageForWeightCount = false;
    value.nmfc = value.nmfc.replace(/_/gm, '');
    (document.getElementById('packageUnitType')as HTMLFormElement).focus();
    if (type === 'Itemized') {
      flagName = 'Itemize';
    } else {
      flagName = 'Multi Class Pallet';
    }
    this.showForAddPiecesInTable = true;
    let object;
    object = {
      'isHazardous': value.hazmat,
      'weightUnit': value.weightUnit,
      'FreightClass': value.classification,
      'HandlingUnitQuantity': value.handlingUnitQuantity,
      'HandlingUnitType': value.handlingUnitType,
      'PackageQuantity': value.packageQuantity,
      'PackageUnitType': value.packageUnitType,
      'Pieces': value.packageQuantity,
      'PurchaseOrderNumber': value.purchaseOrderNumber,
      'nmfc': value.nmfc,
      'Description': value.description,
      'Weight': {
        'Units': 'LB',
        'Value': value.weight
      },
      'Dimensions': {
        'Length': value.length,
        'Width': value.width,
        'Height': value.height,
        'Units': 'IN'
      },
      showFlag: flagName
    };
    console.log('object', object);

    //  this.removeClassification = object.FreightClass.split('_')[1];
    // object.FreightClass = this.removeClassification;
    console.log('object', object);
    if (type === 'Itemized') {
      this.piecesListArray.push(object);
    } else {
      this.piecesClassListArray.push(object);
    }

    console.log('this.piecesListArray', this.piecesListArray);
    console.log('piecesForMultiClassListArray', this.piecesForMultiClassListArray);
    if (this.piecesListArray.length > 0) {
      for (let i = 0; i < this.piecesListArray.length; i++) {
        weightArray.push(this.piecesListArray[i].Weight.Value);
        totalPiecesArray.push(this.piecesListArray[i].PackageQuantity);
      }
      let weight = this.netChargeArrSum(weightArray);
      let pieces = this.netChargeArrSum(totalPiecesArray);
      let differenceWeight = Number(this.headerDetailForShipment.Weight.Value) - Number(weight);
      let differencePieces = Number(this.headerDetailForShipment.PackageQuantity) - Number(pieces);
      this.headerDetailForShipment.differenceWeight = differenceWeight;
      this.headerDetailForShipment.differencePieces = differencePieces;
      console.log('this.headerDetailForShipment For Itemize', this.headerDetailForShipment);

    } else {
      if (this.piecesClassListArray.length > 0) {
        for (let i = 0; i < this.piecesClassListArray.length; i++) {
          weightArray.push(this.piecesClassListArray[i].Weight.Value);
          totalPiecesArray.push(this.piecesClassListArray[i].PackageQuantity);
        }
        let weight = this.netChargeArrSum(weightArray);
        let pieces = this.netChargeArrSum(totalPiecesArray);
        let differenceWeight = Number(this.headerDetailForShipment.Weight.Value) - Number(weight);
        let differencePieces = Number(this.headerDetailForShipment.PackageQuantity) - Number(pieces);
        this.headerDetailForShipment.differenceWeight = differenceWeight;
        this.headerDetailForShipment.differencePieces = differencePieces;
        console.log('this.headerDetailForShipment For Multi class', this.headerDetailForShipment);
        this.piecesForm.controls['classification'].setValue('');
        (<HTMLInputElement>document.getElementById("cpf9")).value = '';
      }
    }
    this.clearPiecesForm();
    // if (type !== 'Itemized') {
    $('#packageQuantityForPieces').focus();
    // event.preventDefault();
    // (<HTMLInputElement>document.getElementById("cpf11")).value = '';
    // }
    console.log('this.headerDetailForShipment', this.headerDetailForShipment);
    this.addShipmentInfo(this.billOfLading.value, this.addPiecesHeader);
  }
  clearPiecesForm() {
    this.piecesForm.controls['packageQuantity'].setValue('');
    this.piecesForm.controls['description'].setValue('');
    this.piecesForm.controls['nmfc'].setValue('');
    this.piecesForm.controls['weight'].setValue('');
    this.piecesForm.controls['classification'].setValue('');
    (<HTMLInputElement>document.getElementById("cpf9")).value = '';
  }

  editPieces(data:any, i:any, type:any) {
    console.log('Edit Pieces data', data, i, type);
    $('#packageQuantityForPieces').focus();
    this.piecesIndex = i;
    this.showUpdateIcon = true;
    this.showForAddPiecesInTable = false;
    this.showEditPiecesForm = false;
    this.errorMessageForWeightCount = false;
    if (type === 'editItemize') {
      this.showEditPiecesForm = true;
      this.showForMultiClassPiecesList = false;
      this.piecesForm.patchValue({
        classification: data.FreightClass,
        nmfc: data.nmfc
      });
    } else if (type === 'editMultiClass') {
      this.showEditPiecesForm = true;
      this.showForMultiClassPiecesList = true;
      this.piecesForm.patchValue({
        classification: data.FreightClass,
        nmfc: data.nmfc
      });
    } else {
      this.showForAddPiecesInTable = false;
    }
    if (type === 'Multi Classed Pallet') {
      this.piecesForm.patchValue({
        classification: data.FreightClass,
        nmfc: data.nmfc
      });
    }
    this.piecesForm.patchValue({
      packageQuantity: data.PackageQuantity,
      packageUnitType: data.PackageUnitType,
      description: data.Description,
      weight: data.Weight.Value,
      weightUnitType: data.weightUnit,
    });
  }
  updatePieces(data:any, editBolForm:any, type:any, formType:any) {
    console.log('Update for pieces ndata Update', data,
      'editBolForm', editBolForm, 'type', type, this.editIndex, 'formType', formType);
    console.log(' this.piecesForMultiClassListArray', this.piecesForMultiClassListArray);
    this.errorMessageForWeightCount = false;
    let array = [], weightArray = [], totalPiecesArray = [];
    if (type === 'Itemized') {
      this.updateItemizedValues(data);
    } else if (type === 'Multi Classed') {
      this.updateMultiClassPalletValues(data);
    }
    this.showForAddPiecesInTable = true;
    if (type === 'Multi Classed') {
      this.piecesForm.controls['classification'].setValue('');
      (<HTMLInputElement>document.getElementById("cpf9")).value = '';
    }
    this.showEditPiecesForm = false;
    this.piecesForm.controls['packageQuantity'].setValue('');
    this.piecesForm.controls['description'].setValue('');
    this.piecesForm.controls['nmfc'].setValue('');
    this.piecesForm.controls['weight'].setValue('');
    this.showEditPiecesForm = false;
    this.showFlagForDimensions = false;
    this.clearForm();
    this.addShipmentInfo(this.billOfLading.value, this.addPiecesHeader);
  }

  updatePiecesForEdit(data:any, editBolForm:any, type:any, formType:any) {
    let array = [], weightArray = [], totalPiecesArray = [];
    editBolForm.nmfc = editBolForm.nmfc.replace(/_/gm, '');
    if (formType === 'editFeature') {
      if (editBolForm.hazmat === "false" || editBolForm.hazmat === '' || editBolForm.hazmat === null || editBolForm.hazmat === undefined) {
        editBolForm.hazmat = false;
      } else {
        editBolForm.hazmat = true;
      }
      if (type === 'Itemized') {
        this.piecesForItemizeListArray[this.editIndex].isHazardous = editBolForm.hazmat;
        this.piecesForItemizeListArray[this.editIndex].weightUnit = editBolForm.weightUnit;
        this.piecesForItemizeListArray[this.editIndex].FreightClass = editBolForm.classification;
        this.piecesForItemizeListArray[this.editIndex].HandlingUnitQuantity = editBolForm.handlingUnitQuantity;
        this.piecesForItemizeListArray[this.editIndex].HandlingUnitType = editBolForm.handlingUnitType;
        this.piecesForItemizeListArray[this.editIndex].PackageQuantity = editBolForm.packageQuantity;
        this.piecesForItemizeListArray[this.editIndex].PackageUnitType = editBolForm.packageUnitType;
        this.piecesForItemizeListArray[this.editIndex].Pieces = editBolForm.packageQuantity;
        this.piecesForItemizeListArray[this.editIndex].PurchaseOrderNumber = editBolForm.purchaseOrderNumber;
        this.piecesForItemizeListArray[this.editIndex].nmfc = editBolForm.nmfc;
        this.piecesForItemizeListArray[this.editIndex].Description = editBolForm.description;
        this.piecesForItemizeListArray[this.editIndex].Weight.Value = editBolForm.weight;
        this.piecesForItemizeListArray[this.editIndex].Dimensions.Length = editBolForm.length;
        this.piecesForItemizeListArray[this.editIndex].Dimensions.width = editBolForm.width;
        this.piecesForItemizeListArray[this.editIndex].Dimensions.height = editBolForm.height;
        this.piecesForItemizeListArray[this.editIndex].cube = editBolForm.cube;
        this.piecesForItemizeListArray[this.editIndex].newAddPieces = this.piecesListArray;
        if (this.piecesListArray.length > 0) {
          for (let p = 0; p < this.piecesListArray.length; p++) {
            if (this.piecesForItemizeListArray[this.editIndex].newAddPieces.length > 0) {
              this.piecesForItemizeListArray[this.editIndex].rowSpanValues = this.piecesForItemizeListArray[this.editIndex].newAddPieces.length;
              console.log('this.piecesForMultiClassListArray[p].rowSpanValues ', this.piecesForItemizeListArray[this.editIndex].rowSpanValues);
            }
          }
        }
      } else {
        if (editBolForm.handlingUnitQuantity !== '' && editBolForm.packageQuantity !== '' && editBolForm.weight !== '') {
          this.piecesForMultiClassListArray[this.editIndex].isHazardous = editBolForm.hazmat;
          this.piecesForMultiClassListArray[this.editIndex].weightUnit = editBolForm.weightUnit;
          this.piecesForMultiClassListArray[this.editIndex].FreightClass = editBolForm.classification;
          this.piecesForMultiClassListArray[this.editIndex].HandlingUnitQuantity = editBolForm.handlingUnitQuantity;
          this.piecesForMultiClassListArray[this.editIndex].HandlingUnitType = editBolForm.handlingUnitType;
          this.piecesForMultiClassListArray[this.editIndex].PackageQuantity = editBolForm.packageQuantity;
          this.piecesForMultiClassListArray[this.editIndex].PackageUnitType = editBolForm.packageUnitType;
          this.piecesForMultiClassListArray[this.editIndex].Pieces = editBolForm.packageQuantity;
          this.piecesForMultiClassListArray[this.editIndex].PurchaseOrderNumber = editBolForm.purchaseOrderNumber;
          this.piecesForMultiClassListArray[this.editIndex].nmfc = editBolForm.nmfc;
          this.piecesForMultiClassListArray[this.editIndex].Description = editBolForm.description;
          this.piecesForMultiClassListArray[this.editIndex].Weight.Value = editBolForm.weight;
          this.piecesForMultiClassListArray[this.editIndex].Dimensions.Length = editBolForm.length;
          this.piecesForMultiClassListArray[this.editIndex].Dimensions.width = editBolForm.width;
          this.piecesForMultiClassListArray[this.editIndex].Dimensions.height = editBolForm.height;
          this.piecesForMultiClassListArray[this.editIndex].cube = editBolForm.cube;
          this.piecesForMultiClassListArray[this.editIndex].newAddPieces = this.piecesClassListArray;
          if (this.piecesClassListArray.length > 0) {
            for (let p = 0; p < this.piecesClassListArray.length; p++) {
              if (this.piecesForMultiClassListArray[this.editIndex].newAddPieces.length > 0) {
                this.piecesForMultiClassListArray[this.editIndex].rowSpanValues = this.piecesForMultiClassListArray[this.editIndex].newAddPieces.length;
                console.log('this.piecesForMultiClassListArray[p].rowSpanValues ', this.piecesForMultiClassListArray[this.editIndex].rowSpanValues);
              }
            }
          }
          (<HTMLInputElement>document.getElementById("cpf11")).value = '';
          for (let i = 0; i < this.piecesClassListArray.length; i++) {
            weightArray.push(this.piecesClassListArray[i].Weight.Value);
            totalPiecesArray.push(this.piecesClassListArray[i].PackageQuantity);
          }
          console.log('this.piecesClassListArray', this.piecesClassListArray);
          // let sumOfPiecesWeight = this.netChargeArrSum(weightArray);
          this.totalWeightForPieces = this.netChargeArrSum(weightArray);
          console.log('this.totalWeightForPieces', this.totalWeightForPieces);
          if (Number(this.totalWeightForPieces) > Number(this.rowValues.Weight.Value)) {
            this.errorMessageForWeightCount = true;
            let differenceWeight = Number(this.totalWeightForPieces) - Number(this.rowValues.Weight.Value);
            console.log('differenceObject If', differenceWeight);
            this.showWeightVarianceMsg = 'There is a over weight of ' + Number(differenceWeight) + ' pounds from the total weight of ' + Number(this.totalHeaderWeight) + ' pounds.'
            setTimeout(() => {
              // this.errorMessageForWeightCount = false;
              this.showPiecesVarianceMsg = '';
            }, 7000);
            console.log('errorMessageForWeightCount if >', this.errorMessageForWeightCount);
          } else {
            let differenceObject = Number(this.rowValues.Weight.Value) - Number(this.totalWeightForPieces);
            console.log('differenceObject', differenceObject);
            if (Number(differenceObject) > 40) {
              this.errorMessageForWeightCount = true;
              this.showWeightVarianceMsg = 'There is a variance of ' + Number(differenceObject) + ' pounds under weight from ' + Number(this.rowValues.Weight.Value) + ' pounds.';
              console.log('errorMessageForWeightCount if <', this.errorMessageForWeightCount);
              setTimeout(() => {
                // this.errorMessageForWeightCount = false;
                this.showPiecesVarianceMsg = '';
              }, 7000);
            } else {
              this.errorMessageForWeightCount = false;
            }
          }
          this.showEditPiecesForm = false;
        } else {
          console.log('Else part of editing quotes from Ltl');
        }
      }
    } else {
    }
    this.piecesForm.controls['packageQuantity'].setValue('');
    this.piecesForm.controls['description'].setValue('');
    this.piecesForm.controls['nmfc'].setValue('');
    this.piecesForm.controls['weight'].setValue('');
    this.showFlagForDimensions = false;
    this.clearForm();
  }
  updateItemizedValues(data:any) {
    console.log('update itemize', data);
    let weightArray = [], totalPiecesArray = [];
    if (data.packageQuantity === '' || data.description === '' || data.weight === '') {
    } else {
      this.piecesListArray[this.piecesIndex].PackageQuantity = data.packageQuantity;
      this.piecesListArray[this.piecesIndex].PackageUnitType = data.packageUnitType;
      this.piecesListArray[this.piecesIndex].Pieces = data.packageQuantity;
      this.piecesListArray[this.piecesIndex].Description = data.description;
      this.piecesListArray[this.piecesIndex].weightUnit = data.weightUnit;
      this.piecesListArray[this.piecesIndex].Weight.Value = data.weight;
      console.log('this.piecesListArray', this.piecesListArray);
      for (let i = 0; i < this.piecesListArray.length; i++) {
        weightArray.push(this.piecesListArray[i].Weight.Value);
        totalPiecesArray.push(this.piecesListArray[i].PackageQuantity);
      }
      let weight = this.netChargeArrSum(weightArray);
      let pieces = this.netChargeArrSum(totalPiecesArray);
      let differenceWeight = Number(this.headerDetailForShipment.Weight.Value) - Number(weight);
      let differencePieces = Number(this.headerDetailForShipment.PackageQuantity) - Number(pieces);
      this.headerDetailForShipment.differenceWeight = differenceWeight;
      this.headerDetailForShipment.differencePieces = differencePieces;
      console.log('this.headerDetailForShipment For Itemize', this.headerDetailForShipment);
      this.showEditPiecesForm = false;
      this.clearPiecesForm();
    }
  }
  updateMultiClassPalletValues(data:any) {
    console.log('update multi class', data);
    let weightArray = [], totalPiecesArray = [];
    if (data.packageQuantity === '' || data.description === '' || data.weight === '') {
    } else {
      this.piecesClassListArray[this.piecesIndex].FreightClass = data.classification;
      this.piecesClassListArray[this.piecesIndex].PackageQuantity = data.packageQuantity;
      this.piecesClassListArray[this.piecesIndex].PackageUnitType = data.packageUnitType;
      this.piecesClassListArray[this.piecesIndex].Pieces = data.packageQuantity;
      this.piecesClassListArray[this.piecesIndex].nmfc = data.nmfc;
      this.piecesClassListArray[this.piecesIndex].Description = data.description;
      this.piecesClassListArray[this.piecesIndex].weightUnit = data.weightUnit;
      this.piecesClassListArray[this.piecesIndex].Weight.Value = data.weight;
      this.clearPiecesForm();

      console.log('this.piecesListArray', this.piecesClassListArray);
      for (let i = 0; i < this.piecesClassListArray.length; i++) {
        weightArray.push(this.piecesClassListArray[i].Weight.Value);
        totalPiecesArray.push(this.piecesClassListArray[i].PackageQuantity);
      }
      let weight = this.netChargeArrSum(weightArray);
      let pieces = this.netChargeArrSum(totalPiecesArray);
      let differenceWeight = Number(this.headerDetailForShipment.Weight.Value) - Number(weight);
      let differencePieces = Number(this.headerDetailForShipment.PackageQuantity) - Number(pieces);
      this.headerDetailForShipment.differenceWeight = differenceWeight;
      this.headerDetailForShipment.differencePieces = differencePieces;
      console.log('this.headerDetailForShipment For Multi class', this.rowValues);
      this.totalWeightForPieces = this.netChargeArrSum(weightArray);
      console.log('this.totalWeightForPieces', this.totalWeightForPieces);
      if (Number(this.totalWeightForPieces) > Number(this.headerDetailForShipment.Weight.Value)) {
        this.errorMessageForWeightCount = true;
        let differenceWeight = Number(this.totalWeightForPieces) - Number(this.headerDetailForShipment.Weight.Value);
        console.log('differenceObject If', differenceWeight);
        this.showWeightVarianceMsg = 'There is a over weight of ' + Number(differenceWeight) + ' pounds from the total weight of ' + Number(this.totalHeaderWeight) + ' pounds.'
        console.log('errorMessageForWeightCount if >', this.errorMessageForWeightCount);
        setTimeout(() => {
          // this.errorMessageForWeightCount = false;
          this.showPiecesVarianceMsg = '';
        }, 7000);
      } else {
        let differenceObject = Number(this.headerDetailForShipment.Weight.Value) - Number(this.totalWeightForPieces);
        console.log('differenceObject', differenceObject);
        if (Number(differenceObject) > 40) {
          this.errorMessageForWeightCount = true;
          this.showWeightVarianceMsg = 'There is a variance of ' + Number(differenceObject) + ' pounds under weight from ' + Number(this.rowValues.Weight.Value) + ' pounds.';
          console.log('errorMessageForWeightCount if <', this.errorMessageForWeightCount);
          setTimeout(() => {
            // this.errorMessageForWeightCount = false;
            this.showPiecesVarianceMsg = '';
          }, 7000);
        } else {
          this.errorMessageForWeightCount = false;
        }
      }
      this.piecesForm.controls['classification'].setValue('');
      (<HTMLInputElement>document.getElementById("cpf9")).value = '';
    }
    this.showEditPiecesForm = false;
  }

  deletePieces(data:any, i:any, type:any) {
    if (type === 'Itemize') {
      this.piecesListArray.splice(i, 1);
    } else {
      this.piecesClassListArray.splice(i, 1);
    }
    // this.pricingDetail.splice(i, 1); 
  }
  clearShipmentInfo() {

  }
  editShipmentInfo() {

  }
  deleteShipmentInfo(data:any, i:any) {
    this.detailArray.splice(i, 1);
  }
  addShipmentInfo(value:any, type:any) {
    this.errorMessageForWeightCount = false;
    console.log('this.rowIndex', this.rowIndex);
    let oldObject;
    if (type === 'Itemized') {
      oldObject = this.piecesForItemizeListArray[this.rowIndex];

      if (this.piecesListArray.length > 0) {
        // $('#add-pieces-modal').modal('hide');
        //   this.detailArray.splice(this.rowIndex, 1);
        // oldObject = this.piecesForItemizeListArray[this.rowIndex];
        // if (this.piecesForItemizeListArray.length > 0) {
        //   this.rowIndex = this.piecesForItemizeListArray.length;
        // } else {
        //   this.rowIndex = 0;
        // }
        //  this.piecesForItemizeListArray.push(oldObject);
        if (this.piecesListArray.length > 0) {
          let sumOfPiecesWeight:any = [], sumOfPieces = [];
          this.totalWeightForPieces, this.totalHeaderWeight;
          if (this.piecesListArray.length > 0) {
            for (let p = 0; p < this.piecesListArray.length; p++) {
              // sumOfPiecesWeight.push(this.piecesListArray[p].Weight.Value);
              sumOfPieces.push(this.piecesListArray[p].PackageQuantity);
              console.log('this.sumOfPiecesWeight', sumOfPiecesWeight, sumOfPieces);
            }
          }
          // this.totalWeightForPieces = this.netChargeArrSum(sumOfPiecesWeight);
          this.totalPiecesForMultiClass = this.netChargeArrSum(sumOfPieces);
          console.log('sumOfPiecesWeight', sumOfPiecesWeight);
          // this.totalHeaderWeight = Number(oldObject.Weight.Value);
          this.totalHeaderPieces = Number(oldObject.PackageQuantity);
          console.log(this.totalPiecesForMultiClass, Number(oldObject.PackageQuantity));
          if (Number(this.totalPiecesForMultiClass) > Number(oldObject.PackageQuantity)) {
            this.errorMessageForPiecesCount = true;
            let differenceInPieces = Number(this.totalPiecesForMultiClass) - Number(oldObject.PackageQuantity);
            this.showPiecesVarianceMsg = 'There is a excess of ' + Number(differenceInPieces) + 'Pcs in ' + Number(this.totalHeaderPieces) + ' total PCS';
            // this.showPiecesVarianceMsg = 'The' + Number(differenceInPieces) + ' PCS is more than the ' + Number(this.totalHeaderPieces) + ' total PCS'
            setTimeout(() => {
              // this.errorMessageForPiecesCount = false;
              this.showPiecesVarianceMsg = '';
            }, 5000);
            console.log(this.showPiecesVarianceMsg, differenceInPieces, this.totalPiecesForMultiClass,);

          } else if (Number(this.totalPiecesForMultiClass) < Number(oldObject.PackageQuantity)) {
            let differenceObject = Number(oldObject.PackageQuantity) - Number(this.totalPiecesForMultiClass);
            // if (Number(differenceObject) > Number(this.totalPiecesForMultiClass)) {
            this.errorMessageForPiecesCount = true;
            let differenceInPieces = Number(oldObject.PackageQuantity) - Number(this.totalPiecesForMultiClass);
            this.showPiecesVarianceMsg = 'There is a shortage of ' + Number(differenceInPieces) + 'Pcs in ' + Number(this.totalHeaderPieces) + ' total PCS';
            // this.showPiecesVarianceMsg = 'The' + Number(differenceInPieces) + ' PCS is less than  ' + Number(this.totalHeaderPieces) + ' total PCS'
            setTimeout(() => {
              // this.errorMessageForPiecesCount = false;
              this.showPiecesVarianceMsg = '';
            }, 5000);
            console.log(this.showPiecesVarianceMsg, differenceInPieces, this.totalPiecesForMultiClass,);
          } else {
            this.errorMessageForPiecesCount = false;
            this.showPiecesVarianceMsg = '';
            this.piecesForItemizeListArray[this.rowIndex].newAddPieces = this.piecesListArray;
            this.piecesForItemizeListArray[this.rowIndex].showFlag = 'Itemize';
            if (this.piecesForItemizeListArray.length > 0) {
              for (let p = 0; p < this.piecesForItemizeListArray.length; p++) {
                if (this.piecesForItemizeListArray[p].newAddPieces.length > 0) {
                  this.piecesForItemizeListArray[p].rowSpanValues = this.piecesForItemizeListArray[p].newAddPieces.length;
                  console.log('this.piecesForItemizeListArray[p].rowSpanValues ', this.piecesForItemizeListArray[p].rowSpanValues);
                }
              }
            }
          }
          console.log(this.errorMessageForPiecesCount);
          setTimeout(() => {
            if (this.errorMessageForPiecesCount === false) {
              $('#add-pieces-modal').modal('hide');

            } else {
            }
          }, 500);



        }
      }
    } else {
      oldObject = this.piecesForMultiClassListArray[this.rowIndex];
      console.log('OldObject', this.piecesClassListArray[this.rowIndex]);
      if (this.piecesClassListArray.length > 0) {
        let sumOfPiecesWeight = [], sumOfPieces = [];
        this.totalWeightForPieces, this.totalHeaderWeight;
        if (this.piecesClassListArray.length > 0) {
          for (let p = 0; p < this.piecesClassListArray.length; p++) {
            sumOfPiecesWeight.push(this.piecesClassListArray[p].Weight.Value);
            sumOfPieces.push(this.piecesClassListArray[p].PackageQuantity);
            console.log('this.sumOfPiecesWeight', sumOfPiecesWeight, sumOfPieces);
          }
        }
        this.totalWeightForPieces = this.netChargeArrSum(sumOfPiecesWeight);
        this.totalPiecesForMultiClass = this.netChargeArrSum(sumOfPieces);
        console.log('sumOfPiecesWeight', sumOfPiecesWeight);
        this.totalHeaderWeight = Number(oldObject.Weight.Value);
        this.totalHeaderPieces = Number(oldObject.PackageQuantity);
        console.log(this.totalPiecesForMultiClass, Number(oldObject.PackageQuantity));
        if (Number(this.totalPiecesForMultiClass) > Number(oldObject.PackageQuantity)) {
          this.errorMessageForPiecesCount = true;
          let differenceInPieces = Number(this.totalPiecesForMultiClass) - Number(oldObject.PackageQuantity);
          this.showPiecesVarianceMsg = 'There is a excess of ' + Number(differenceInPieces) + 'Pcs in ' + Number(this.totalHeaderPieces) + ' total PCS';
          // this.showPiecesVarianceMsg = 'The' + Number(differenceInPieces) + ' PCS is more than the ' + Number(this.totalHeaderPieces) + ' total PCS'
          setTimeout(() => {
            // this.errorMessageForPiecesCount = false;
            this.showPiecesVarianceMsg = '';
          }, 5000);
          console.log(this.showPiecesVarianceMsg, differenceInPieces, this.totalPiecesForMultiClass,);

        } else if (Number(this.totalPiecesForMultiClass) < Number(oldObject.PackageQuantity)) {
          let differenceObject = Number(oldObject.PackageQuantity) - Number(this.totalPiecesForMultiClass);
          // if (Number(differenceObject) > Number(this.totalPiecesForMultiClass)) {
          this.errorMessageForPiecesCount = true;
          let differenceInPieces = Number(oldObject.PackageQuantity) - Number(this.totalPiecesForMultiClass);
          this.showPiecesVarianceMsg = 'There is a shortage of ' + Number(differenceInPieces) + 'Pcs in ' + Number(this.totalHeaderPieces) + ' total PCS';

          // this.showPiecesVarianceMsg = 'The' + Number(differenceInPieces) + ' PCS is less than  ' + Number(this.totalHeaderPieces) + ' total PCS'
          setTimeout(() => {
            // this.errorMessageForPiecesCount = false;
            this.showPiecesVarianceMsg = '';
          }, 5000);
          console.log(this.showPiecesVarianceMsg, differenceInPieces, this.totalPiecesForMultiClass,);
        }
        else {
          this.errorMessageForPiecesCount = false;
          this.showPiecesVarianceMsg = '';
        }

        if (Number(this.totalWeightForPieces) > Number(oldObject.Weight.Value)) {
          this.errorMessageForWeightCount = true;
          let differenceWeight = Number(this.totalWeightForPieces) - Number(oldObject.Weight.Value);
          this.showWeightVarianceMsg = 'There is a over weight of ' + Number(differenceWeight) + ' pounds from the total weight of ' + Number(this.totalHeaderWeight) + ' pounds.'
          setTimeout(() => {
            // this.errorMessageForWeightCount = false;
            this.showWeightVarianceMsg = '';
          }, 5000);
          console.log('errorMessageForWeightCount if >', this.errorMessageForWeightCount);
        } else {
          let differenceObject = Number(oldObject.Weight.Value) - Number(this.totalWeightForPieces);
          console.log('differenceObject', differenceObject);
          if (Number(differenceObject) > 40) {
            this.errorMessageForWeightCount = true;
            this.showWeightVarianceMsg = 'There is a variance of ' + Number(differenceObject) + ' pounds under weight from ' + Number(oldObject.Weight.Value) + ' pounds.';
            setTimeout(() => {
              // this.errorMessageForWeightCount = false;
              this.showWeightVarianceMsg = ''
            }, 5000);
            console.log('errorMessageForWeightCount if <', this.errorMessageForWeightCount);
          } else {
            this.errorMessageForWeightCount = false;
            console.log('differenceObject else', differenceObject);

            console.log('this.piecesForMultiClassListArray', this.piecesForMultiClassListArray);
            this.piecesForMultiClassListArray[this.rowIndex].newAddPieces = this.piecesClassListArray;
            this.piecesForMultiClassListArray[this.rowIndex].showFlag = 'Multi Classed Pallet';
            // $('#add-pieces-modal').modal('hide');
            if (this.piecesForMultiClassListArray.length > 0) {
              for (let p = 0; p < this.piecesForMultiClassListArray.length; p++) {
                if (this.piecesForMultiClassListArray[p].newAddPieces.length > 0) {
                  this.piecesForMultiClassListArray[p].rowSpanValues = this.piecesForMultiClassListArray[p].newAddPieces.length;
                  console.log('this.piecesForMultiClassListArray[p].rowSpanValues ', this.piecesForMultiClassListArray[p].rowSpanValues);
                }
              }
            }
          }
        }
        console.log(this.errorMessageForPiecesCount, this.errorMessageForWeightCount);
        setTimeout(() => {
          if (this.errorMessageForWeightCount === false && this.errorMessageForPiecesCount === false) {
            $('#add-pieces-modal').modal('hide');

          }
        }, 500);

      }
    }
    console.log('this.detailArray ', this.detailArray);
    console.log('this.this.piecesForMultiClassListArray ', this.piecesForMultiClassListArray, this.rowIndex, this.piecesForMultiClassListArray);
    console.log('this.piecesForItemizeListArray ', this.piecesForItemizeListArray, this.rowIndex, this.piecesListArray);
    this.description = '';
    this.billOfLading.patchValue({
      hazmat: false,
      handlingUnitQuantity: '',
      handlingUnitType: 'PLT',
      weightUnitType: 'ttl',
      packageQuantity: '',
      packageUnitType: 'CTN',
      weight: '',
      description: '',
      length: '',
      width: '',
      height: '',
      nmfc: '',
      classification: '',
      cube: '',
      totalWeight: '',
      totalClassification: ''
    });
    $('#packageQuantityForPieces').focus();
    this.enableDescriptionValue = false;
  }
  checkForShipmentType(type:any) {
    console.log('type', type);
    this.showShipmentTable = true;
    this.nonItemizeShipmentTable = false;
    this.multiClassShipmentTable = false;
    this.voltlTable = false;

    this.enableDescriptionValue = false;
    if (type === 'Multi Classed Pallet') {
      this.nonItemizeShipmentTable = false;
      this.multiClassShipmentTable = true;
      this.billOfLading.patchValue({
        handlingUnitQuantity: 1
      });
      this.showForItemize = false;
      console.log('this.multiClassShipmentTable', this.multiClassShipmentTable);
      // document.getElementById('packageQuantityForMultiClass').focus();
      setTimeout(() => {
        $('#packageQuantityForMultiClass').focus();
      }, 100);
    } else if (type === 'Itemized') {
      // this.showFlagForDimensions = true;
      // this.showNmfcErrorMsg = true;
      // this.checkForWeight = true;
      this.multiClassShipmentTable = false;
      this.nonItemizeShipmentTable = true;
      this.billOfLading.patchValue({
        handlingUnitQuantity: 1
      });
      this.showForItemize = true;
      // document.getElementById('packageQuantity').focus();
      setTimeout(() => {
        $('#packageQuantity').focus();
      }, 100);
    } else if (type === 'Non Itemized') {
      this.nonItemizeShipmentTable = true;
      this.multiClassShipmentTable = false;
      this.showForItemize = true;
      this.billOfLading.patchValue({
        handlingUnitQuantity: 1
      });

      setTimeout(() => {
        $('#handlingUnitQuantity').focus();
      }, 100);
    } else if (type === 'voltl') {
      this.nonItemizeShipmentTable = false;
      this.multiClassShipmentTable = false;
      this.showNoShipmentError = true;
      this.disableCarrier = true;
      this.voltlTable = true;
      this.billOfLading.patchValue({
        handlingUnitQuantity: 1
      });
      this.billOfLading.patchValue({
        serviceType: 'OTHERS'
      });

      // this.showAddedValue = false;
      setTimeout(() => {
        $('#handlingUnitQuantity').focus();
      }, 100);
    }
  }
  removeClassification: any;
  addRow(value:any) {
    console.log('value', value);
    let object;
    let dataObject;
    let classValue;
    let objectForRate;
    let cube;
    this.showCarrierErrorMsg = false;
    this.showToolTip = false;

    this.piecesCount = [], this.palletCount = [], this.othersCount = [];
    // ..... for getting rate ......
    // if (value.serviceType !== '' && value.serviceType !== null && value.serviceType !== undefined) {
    this.showCarrierErrorMsg = false;
    if (Number(value.classification) === 77.5) {
      classValue = 77;
    } else if (Number(value.classification) === 92.5) {
      classValue = 92;
    } else {
      classValue = value.classification;
    }
    objectForRate = {
      'weight': Number(value.weight),
      'classification': classValue
    };
    value.nmfc = value.nmfc.replace(/_/gm, '');
    this.pricingDetail.push(objectForRate);
    if (value.serviceType === 'FXFE' || value.serviceType === 'FXFP') {
      if (value.handlingUnitType === 'PLT') {
        value.handlingUnitType = 'PALLET';
      } else if (value.handlingUnitType === 'PCS') {
        value.handlingUnitType = 'PIECE';
      } else if (value.handlingUnitType === 'DRM') {
        value.handlingUnitType = 'DRUM';
      } else if (value.handlingUnitType === 'CTN') {
        value.handlingUnitType = 'CARTON';
      } else {
        value.handlingUnitType = 'PALLET';
      }
      if (value.hazmat === "") {
        value.hazmat = false;
      }
    }
    if (value.packageQuantity === '' || value.packageQuantity === null) {
      value.packageQuantity = 0;
    }
    if (value.hazmat === "") {
      value.hazmat = false;
    }
    if (value.serviceType === 'REDDAWAY') {
      if (value.handlingUnitType === 'PLT') {
        value.handlingUnitType = 'Pallets';
      } else if (value.handlingUnitType === 'PCS') {
        value.handlingUnitType = 'Pieces';
      } else if (value.handlingUnitType === 'DRM') {
        value.handlingUnitType = 'Drums';
      } else if (value.handlingUnitType === 'CTN') {
        value.handlingUnitType = 'Cartons';
      } else {
        value.handlingUnitType = 'Pallets';
      }
      if (value.hazmat === "") {
        value.hazmat = false;
      }
    }
    if (value.handlingUnitQuantity !== '' && value.weight !== '' &&
      value.length !== '' && value.length !== null && value.width !== null && value.width !== '' &&
      value.height !== '' && value.height !== null) {
      if (value.length !== '' && value.width !== '' && value.height !== '') {
        cube = (Number(value.length) * Number(value.width) * Number(value.height) / 1728).toFixed(2);
      }
      object = {
        'isHazardous': value.hazmat,
        'weightUnit': value.weightUnitType,
        'FreightClass': value.classification,
        'HandlingUnitQuantity': value.handlingUnitQuantity,
        'HandlingUnitType': value.handlingUnitType,
        'PackageQuantity': value.packageQuantity,
        'PackageUnitType': value.packageUnitType,
        'Pieces': value.packageQuantity,
        'PurchaseOrderNumber': value.purchaseOrderNumber,
        'nmfc': value.nmfc,
        'Description': value.description,
        'cube': cube,
        'Weight': {
          'Units': 'LB',
          'Value': value.weight
        },
        'Dimensions': {
          'Length': value.length,
          'Width': value.width,
          'Height': value.height,
          'Units': 'IN'
        },
        newAddPieces: [],
        shipmentType: value.shipmentType
      };
    } else {
      object = {
        'isHazardous': value.hazmat,
        'weightUnit': value.weightUnitType,
        'FreightClass': value.classification,
        'HandlingUnitQuantity': value.handlingUnitQuantity,
        'HandlingUnitType': value.handlingUnitType,
        'PackageQuantity': value.packageQuantity,
        'PackageUnitType': value.packageUnitType,
        'Pieces': value.packageQuantity,
        'nmfc': value.nmfc,
        'PurchaseOrderNumber': value.purchaseOrderNumber,
        'Description': value.description,
        'cube': '',
        'Weight': {
          'Units': 'LB',
          'Value': value.weight
        },
        'Dimensions': {
          'Length': '',
          'Width': '',
          'Height': '',
          'Units': 'IN'
        },
        newAddPieces: [],
        shipmentType: value.shipmentType
      };
    }

    // this.removeClassification = object.FreightClass.split('_')[1];
    // object.FreightClass = this.removeClassification;
    console.log('object', object);
    if (object.shipmentType === 'Itemized') {
      this.piecesForItemizeListArray.push(object);
      // document.getElementById('addButton').focus();

      // $('#addnewpieces').focus();
      // (<HTMLInputElement>document.getElementById("cpf3")).value = '';
    } else if (object.shipmentType === 'Multi Classed Pallet') {
      this.piecesForMultiClassListArray.push(object);
      // $('#addnewpieces').focus();
      // let index;
      // for (let i =0; i< this.piecesForMultiClassListArray.length; i ++) {
      //   index = i;
      // }
      (document.getElementById('addButton')as HTMLFormElement).focus();

    } else if (object.shipmentType === 'voltl') {
      this.detailvoltlArray.push(object);
      this.checkForServiceType('OTHERS', this.billOfLading.value);
      // $('#addnewpieces').focus();
      // let index;
      // for (let i =0; i< this.piecesForMultiClassListArray.length; i ++) {
      //   index = i;
      // }
      (document.getElementById('addButton')as HTMLFormElement).focus();

    } else {
      this.detailArray.push(object);
      (<HTMLInputElement>document.getElementById("cpf3")).value = '';
    }

    console.log('this.detailArray', this.detailArray);
    let totalWeight;
    this.totalPieces = 0;
    this.totalWeights = 0;
    this.totalHandlingUnits = '';
    let weightArray = [], piecesArray = [];
    if (this.detailArray.length > 0 || this.piecesForItemizeListArray.length > 0 || this.piecesForMultiClassListArray.length > 0 || this.detailvoltlArray.length > 0) {
      this.showAddField = true;
      if (this.showIfNoMixedPallet === true) {
        this.showAddedValue = true;
        this.showAddedValueForMixedPallet = false;
      } else {
        this.showAddedValueForMixedPallet = true;
        this.showAddedValue = false;
      }

      //this.showPiecesList = false;
      this.piecesListArray = [];
      this.showShipmentErrorMeassage = false;
      for (let d = 0; d < this.detailArray.length; d++) {
        let addPieces = this.detailArray[d].HandlingUnitQuantity;
        let addWeight = this.detailArray[d].Weight.Value;
        if (this.detailArray[d].weightUnit === 'ea.') {
          totalWeight = Number(addPieces) * Number(addWeight);
          weightArray.push(totalWeight);
        } else {
          totalWeight = Number(addWeight);
          weightArray.push(totalWeight);
        }
        piecesArray.push(addPieces);
        if (this.detailArray[d].PackageUnitType !== '' || this.detailArray[d].PackageUnitType !== undefined) {
          this.piecesCount.push(this.detailArray[d].PackageQuantity);
        }
        if (this.detailArray[d].HandlingUnitType === 'PLT' || this.detailArray[d].HandlingUnitType === 'PALLET' ||
          this.detailArray[d].HandlingUnitType === 'Pallets') {
          this.palletCount.push(this.detailArray[d].HandlingUnitQuantity);
        }
      }
      if (this.piecesCount.length > 0) {
        this.previewTotalPieces = this.netChargeArrSum(this.piecesCount);
      } else {
        this.previewTotalPieces = 0;
      }
      if (this.palletCount.length > 0) {
        this.previewTotalPallets = this.netChargeArrSum(this.palletCount);
      } else {
        this.previewTotalPallets = 0;
      }
      this.totalPieces = this.netChargeArrSum(piecesArray);
      this.totalWeights = this.netChargeArrSum(weightArray);
      this.lengthOfDetailArray = this.detailArray.length;
      this.descriptionErrorMsg = false;
    } else {
      this.showAddedValue = false;
    }
    this.clearForm();
    this.description = '';
    this.newWeight = '';

    this.combiningArray();
    // } else {
    //   this.showCarrierErrorMsg = true;
    // }
    this.disableShipmentType(value);
    if (value.shipmentType === 'Itemized') {
      console.log('add')
      // this.piecesForItemizeListArray.push(object);
      let index = this.piecesForItemizeListArray.length - 1;
      setTimeout(() => {
        $('#addnewpieces' + index).focus();
      }, 100);
      // (<HTMLInputElement>document.getElementById("cpf3")).value = '';
    } else if (value.shipmentType === 'Multi Classed Pallet') {
      // this.piecesForMultiClassListArray.push(object);
      console.log(value.shipmentType);
      let index = this.piecesForMultiClassListArray.length - 1;
      // index = thi
      setTimeout(() => {
        $('#addnewpieces' + index).focus();
      }, 100);
    } else {
      // this.detailArray.push(object);
      (<HTMLInputElement>document.getElementById("cpf3")).value = '';
    }

  }

  disableShipmentType(value:any) {
    console.log('value disabledShipment', value);
    this.isDisabledNonItemize = false;
    this.isDisabledItemize = false;
    this.isDisabledMultiClass = false;
    if (value.shipmentType === 'Non Itemized') {
      this.isDisabledItemize = true;
      this.isDisabledMultiClass = true;
    } else if (value.shipmentType === 'Itemized') {
      this.isDisabledNonItemize = true;
      this.isDisabledMultiClass = true;
    } else {
      this.isDisabledNonItemize = true;
      this.isDisabledItemize = true;

    }

    this.checkForShipmentType(value.shipmentType)
  }
  clearForm() {
    this.billOfLading.patchValue({
      hazmat: false,
      handlingUnitQuantity: '',
      handlingUnitType: 'PLT',
      weightUnitType: 'ttl',
      packageQuantity: '',
      packageUnitType: 'CTN',
      weight: '',
      description: '',
      length: '',
      width: '',
      height: '',
      nmfc: '',
      classification: '',
      cube: '',
      totalWeight: '',
      totalClassification: ''
    });
  }
  editOnLtlQuote(value:any, type:any) {
    if (type === 'package') {
      this.headerDetailForShipment.PackageQuantity = value;
    } else {
      let packageUnitType = value;
      this.piecesForm.controls['packageUnitType'].setValue(packageUnitType);
      this.headerDetailForShipment.PackageUnitType = value;
    }
  }
  editRow(row:any, i:any) {
    console.log('row', row, i);
    $('#new-edit-modal').modal('show');
    $('#handlingUnitQuantityEdit').focus();
    // event.preventDefault();

    // row.nmfc = row.nmfc.replace(/_/gm,'');
    this.editIndex = i;
    this.showAddField = true;
    // this.piecesListArray = [];
    // this.piecesClassListArray = [];
    let hazmat;
    this.rowValues;
    this.disableCertainFields = false;
    if (row.HandlingUnitType === 'PIECE' || row.HandlingUnitType === 'Pieces') {
      row.HandlingUnitType = 'PCS';
    } else if (row.HandlingUnitType === 'PALLET' || row.HandlingUnitType === 'Pallets') {
      row.HandlingUnitType = 'PLT';
    } else if (row.HandlingUnitType === 'CARTON' || row.HandlingUnitType === 'Cartons') {
      row.HandlingUnitType = 'CTN';
    } else if (row.HandlingUnitType === 'DRUM' || row.HandlingUnitType === 'Drums') {
      row.HandlingUnitType = 'DRM';
    }
    if (row.isHazardous === true) {
      hazmat = "true";
    } else {
      hazmat = "false";
    }
    if (row.Dimensions === undefined) {
      this.editShipmentInformationForm.patchValue({
        weightUnit: row.weightUnit,
        handlingUnits: row.HandlingUnits,
        handlingUnitQuantity: row.HandlingUnitQuantity,
        handlingUnitType: row.HandlingUnitType,
        packageQuantity: row.PackageQuantity,
        packageUnitType: row.PackageUnitType,
        weight: row.Weight.Value,
        description: row.Description,
        classification: row.FreightClass,
        hazmat: hazmat,
        cube: row.cube
      });
    } else {
      this.editShipmentInformationForm.patchValue({
        weightUnit: row.weightUnit,
        handlingUnits: row.HandlingUnits,
        handlingUnitQuantity: row.HandlingUnitQuantity,
        handlingUnitType: row.HandlingUnitType,
        packageQuantity: row.PackageQuantity,
        packageUnitType: row.PackageUnitType,
        weight: row.Weight.Value,
        description: row.Description,
        length: row.Dimensions.Length,
        width: row.Dimensions.Width,
        height: row.Dimensions.Height,
        nmfc: row.nmfc,
        classification: row.FreightClass,
        hazmat: hazmat,
        cube: row.cube
      });
    }
    this.rowValues = row;
    this.headerDetailForShipment = row;
    this.piecesDetailsArray = row;
    if (row.showFlag === 'Itemize') {
      this.piecesListArray = row.newAddPieces;
    } else {
      this.piecesClassListArray = row.newAddPieces;
    }
    if (row.feature === 'editOnLtl') {
      // this.piecesClassListArray = [];
      // this.piecesListArray = [];
      this.disableCertainFields = true;

    } else {
      this.disableCertainFields = false;
    }
    this.showEditPiecesForm = false;
    console.log(this.piecesListArray, this.piecesClassListArray);
  }
  combiningArray() {
    this.combiningAllShipmentsArray = [];
    console.log('combiningArray');
    console.log('this.detailArray', this.detailArray);
    console.log('this.piecesForItemizeListArray', this.piecesForItemizeListArray);
    console.log('this.piecesForMultiClassListArray', this.piecesForMultiClassListArray);
    let piecesNewArray = [], newObject = {};
    this.totalPieces = 0;
    this.previewTotalPallets = 0;
    this.previewTotalPieces = 0;
    this.totalWeights = 0;
    if (this.detailArray.length > 0) {
      for (let n = 0; n < this.detailArray.length; n++) {
        this.detailArray[n].bolType = 'Non Itemize';
        this.combiningAllShipmentsArray.push(this.detailArray[n]);
      }
    }
    if (this.piecesForItemizeListArray.length > 0) {
      for (let i = 0; i < this.piecesForItemizeListArray.length; i++) {
        this.piecesForItemizeListArray[i].bolType = 'Itemize';
        if (this.piecesForItemizeListArray[i].newAddPieces.length > 0) {
          for (let n = 0; n < this.piecesForItemizeListArray[i].newAddPieces.length; n++) {
            newObject = this.piecesForItemizeListArray[i].newAddPieces[0];
            this.piecesForItemizeListArray[i].firstObject = newObject;
            console.log('this.piecesForItemizeListArray[i].firstObject', this.piecesForItemizeListArray[i].firstObject);
          }
        }
        this.combiningAllShipmentsArray.push(this.piecesForItemizeListArray[i]);
        console.log('this.combiningAllShipmentsArray', this.combiningAllShipmentsArray);
      }
    }
    if (this.piecesForMultiClassListArray.length > 0) {
      for (let m = 0; m < this.piecesForMultiClassListArray.length; m++) {
        this.piecesForMultiClassListArray[m].bolType = 'Multi Classed Pallet';
        if (this.piecesForMultiClassListArray[m].newAddPieces.length > 0) {
          for (let n = 0; n < this.piecesForMultiClassListArray[m].newAddPieces.length; n++) {
            newObject = this.piecesForMultiClassListArray[m].newAddPieces[0];
            this.piecesForMultiClassListArray[m].firstObject = newObject;
            console.log('this.piecesForItemizeListArray[i].firstObject', this.piecesForMultiClassListArray[m].firstObject);
          }
        }
        this.combiningAllShipmentsArray.push(this.piecesForMultiClassListArray[m]);
      }
    }
    if (this.detailvoltlArray.length > 0) {
      for (let n = 0; n < this.detailvoltlArray.length; n++) {
        this.detailvoltlArray[n].bolType = 'voltl';
        this.combiningAllShipmentsArray.push(this.detailvoltlArray[n]);
      }
    }
    let totalHandlingUnitArray = [], totalHUPalletsArray = [], totalPiecesArray = [], totalWeightArray = [];
    console.log('this.combiningArray', this.combiningAllShipmentsArray);
    if (this.combiningAllShipmentsArray.length > 0) {
      for (let c = 0; c < this.combiningAllShipmentsArray.length; c++) {
        totalHandlingUnitArray.push(this.combiningAllShipmentsArray[c].HandlingUnitQuantity);
        if (this.combiningAllShipmentsArray[c].HandlingUnitType === 'PLT' || this.combiningAllShipmentsArray[c].HandlingUnitType === 'PALLET' || this.combiningAllShipmentsArray[c].HandlingUnitType === 'Pallets') {
          totalHUPalletsArray.push(this.combiningAllShipmentsArray[c].HandlingUnitQuantity);
        }
        if (this.combiningAllShipmentsArray[c].PackageQuantity !== '') {
          totalPiecesArray.push(this.combiningAllShipmentsArray[c].PackageQuantity);
        }
        totalWeightArray.push(this.combiningAllShipmentsArray[c].Weight.Value);
      }
      this.totalPieces = this.netChargeArrSum(totalHandlingUnitArray);
      this.previewTotalPallets = this.netChargeArrSum(totalHUPalletsArray);
      this.previewTotalPieces = this.netChargeArrSum(totalPiecesArray);
      this.totalWeights = this.netChargeArrSum(totalWeightArray);
    }
  }

  combiningArrayForRequest() {
    this.combiningAllShipmentsRequestArray = [];
    console.log('combiningArray');
    console.log('this.detailArray', this.detailArray);
    console.log('this.piecesForItemizeListArray', this.piecesForItemizeListArray);
    console.log('this.piecesForMultiClassListArray', this.piecesForMultiClassListArray);
    let piecesNewArray = [], newObject = {};
    this.totalPieces = 0;
    this.previewTotalPallets = 0;
    this.previewTotalPieces = 0;
    this.totalWeights = 0;
    if (this.detailArray.length > 0) {
      for (let n = 0; n < this.detailArray.length; n++) {
        this.detailArray[n].bolType = 'Non Itemize';
        if (this.billOfLading.controls['serviceType'].value === 'FXFE' || this.billOfLading.controls['serviceType'].value === 'FXFP' || this.billOfLading.controls['serviceType'].value === 'FEDEX_FREIGHT_ECONOMY' || this.billOfLading.controls['serviceType'].value === 'FEDEX_FREIGHT_PRIORITY') {
          if (this.detailArray[n].HandlingUnitType === 'PLT') {
            this.detailArray[n].HandlingUnitType = 'PALLET';
          } else if (this.detailArray[n].HandlingUnitType === 'PCS') {
            this.detailArray[n].HandlingUnitType = 'PIECE';
          } else if (this.detailArray[n].HandlingUnitType === 'DRM') {
            this.detailArray[n].HandlingUnitType = 'DRUM';
          } else if (this.detailArray[n].HandlingUnitType === 'CTN') {
            this.detailArray[n].HandlingUnitType = 'CARTON';
          } else {
            this.detailArray[n].HandlingUnitType = 'PALLET';
          }
          if (this.detailArray[n].isHazardous === "") {
            this.detailArray[n].isHazardous = false;
          }
        } else if (this.billOfLading.controls['serviceType'].value === 'REDDAWAY') {

          if (this.detailArray[n].HandlingUnitType === 'PLT') {
            this.detailArray[n].HandlingUnitType = 'Pallets';
          } else if (this.detailArray[n].HandlingUnitType === 'PCS') {
            this.detailArray[n].HandlingUnitType = 'Pieces';
          } else if (this.detailArray[n].HandlingUnitType === 'DRM') {
            this.detailArray[n].HandlingUnitType = 'Drums';
          } else if (this.detailArray[n].HandlingUnitType === 'CTN') {
            this.detailArray[n].HandlingUnitType = 'Cartons';
          } else {
            this.detailArray[n].HandlingUnitType = 'Pallets';
          }
          if (this.detailArray[n].isHazardous === "") {
            this.detailArray[n].isHazardous = false;
          }
        }
        this.combiningAllShipmentsRequestArray.push(this.detailArray[n]);
        console.log('this. detail Array 1', this.combiningAllShipmentsRequestArray);
      }
    }
    if (this.piecesForItemizeListArray.length > 0) {
      for (let i = 0; i < this.piecesForItemizeListArray.length; i++) {
        this.piecesForItemizeListArray[i].bolType = 'Itemize';
        if (this.piecesForItemizeListArray[i].newAddPieces.length > 0) {
          for (let n = 0; n < this.piecesForItemizeListArray[i].newAddPieces.length; n++) {
            newObject = this.piecesForItemizeListArray[i].newAddPieces[0];
            this.piecesForItemizeListArray[i].firstObject = newObject;
            console.log('this.piecesForItemizeListArray[i].firstObject', this.piecesForItemizeListArray[i].firstObject);
            // this.piecesForItemizeListArray[i].newAddPieces.splice([n],1);
            if (this.billOfLading.controls['serviceType'].value === 'FXFE' || this.billOfLading.controls['serviceType'].value === 'FXFP' || this.billOfLading.controls['serviceType'].value === 'FEDEX_FREIGHT_ECONOMY' || this.billOfLading.controls['serviceType'].value === 'FEDEX_FREIGHT_PRIORITY') {
              if (this.piecesForItemizeListArray[i].HandlingUnitType === 'PLT') {
                this.piecesForItemizeListArray[i].HandlingUnitType = 'PALLET';
              } else if (this.piecesForItemizeListArray[i].HandlingUnitType === 'PCS') {
                this.piecesForItemizeListArray[i].HandlingUnitType = 'PIECE';
              } else if (this.piecesForItemizeListArray[i].HandlingUnitType === 'DRM') {
                this.piecesForItemizeListArray[i].HandlingUnitType = 'DRUM';
              } else if (this.piecesForItemizeListArray[i].HandlingUnitType === 'CTN') {
                this.piecesForItemizeListArray[i].HandlingUnitType = 'CARTON';
              } else {
                this.piecesForItemizeListArray[i].HandlingUnitType = 'PALLET';
              }
              if (this.piecesForItemizeListArray[i].isHazardous === "") {
                this.piecesForItemizeListArray[i].isHazardous = false;
              }
            } else if (this.billOfLading.controls['serviceType'].value === 'REDDAWAY') {

              if (this.piecesForItemizeListArray[i].HandlingUnitType === 'PLT') {
                this.piecesForItemizeListArray[i].HandlingUnitType = 'Pallets';
              } else if (this.piecesForItemizeListArray[i].HandlingUnitType === 'PCS') {
                this.piecesForItemizeListArray[i].HandlingUnitType = 'Pieces';
              } else if (this.piecesForItemizeListArray[i].HandlingUnitType === 'DRM') {
                this.piecesForItemizeListArray[i].HandlingUnitType = 'Drums';
              } else if (this.piecesForItemizeListArray[i].HandlingUnitType === 'CTN') {
                this.piecesForItemizeListArray[i].HandlingUnitType = 'Cartons';
              } else {
                this.piecesForItemizeListArray[i].HandlingUnitType = 'Pallets';
              }
              if (this.piecesForItemizeListArray[i].isHazardous === "") {
                this.piecesForItemizeListArray[i].isHazardous = false;
              }
            }
          }
        }
        this.combiningAllShipmentsRequestArray.push(this.piecesForItemizeListArray[i]);
        console.log('this. Itemize Array 1', this.combiningAllShipmentsRequestArray);
      }
    }
    if (this.piecesForMultiClassListArray.length > 0) {
      for (let m = 0; m < this.piecesForMultiClassListArray.length; m++) {
        this.piecesForMultiClassListArray[m].bolType = 'Multi Classed Pallet';
        if (this.piecesForMultiClassListArray[m].newAddPieces.length > 0) {
          for (let n = 0; n < this.piecesForMultiClassListArray[m].newAddPieces.length; n++) {
            newObject = this.piecesForMultiClassListArray[m].newAddPieces[0];
            this.piecesForMultiClassListArray[m].firstObject = newObject;
            if (this.billOfLading.controls['serviceType'].value === 'FXFE' || this.billOfLading.controls['serviceType'].value === 'FXFP' || this.billOfLading.controls['serviceType'].value === 'FEDEX_FREIGHT_ECONOMY' || this.billOfLading.controls['serviceType'].value === 'FEDEX_FREIGHT_PRIORITY') {
              if (this.piecesForMultiClassListArray[m].HandlingUnitType === 'PLT') {
                this.piecesForMultiClassListArray[m].HandlingUnitType = 'PALLET';
              } else if (this.piecesForMultiClassListArray[m].HandlingUnitType === 'PCS') {
                this.piecesForMultiClassListArray[m].HandlingUnitType = 'PIECE';
              } else if (this.piecesForMultiClassListArray[m].HandlingUnitType === 'DRM') {
                this.piecesForMultiClassListArray[m].HandlingUnitType = 'DRUM';
              } else if (this.piecesForMultiClassListArray[m].HandlingUnitType === 'CTN') {
                this.piecesForMultiClassListArray[m].HandlingUnitType = 'CARTON';
              } else {
                this.piecesForMultiClassListArray[m].HandlingUnitType = 'PALLET';
              }
              if (this.piecesForMultiClassListArray[m].isHazardous === "") {
                this.piecesForMultiClassListArray[m].isHazardous = false;
              }
            } else if (this.billOfLading.controls['serviceType'].value === 'REDDAWAY') {

              if (this.piecesForMultiClassListArray[m].HandlingUnitType === 'PLT') {
                this.piecesForMultiClassListArray[m].HandlingUnitType = 'Pallets';
              } else if (this.piecesForMultiClassListArray[m].HandlingUnitType === 'PCS') {
                this.piecesForMultiClassListArray[m].HandlingUnitType = 'Pieces';
              } else if (this.piecesForMultiClassListArray[m].HandlingUnitType === 'DRM') {
                this.piecesForMultiClassListArray[m].HandlingUnitType = 'Drums';
              } else if (this.piecesForMultiClassListArray[m].HandlingUnitType === 'CTN') {
                this.piecesForMultiClassListArray[m].HandlingUnitType = 'Cartons';
              } else {
                this.piecesForMultiClassListArray[m].HandlingUnitType = 'Pallets';
              }
              if (this.piecesForMultiClassListArray[m].isHazardous === "") {
                this.piecesForMultiClassListArray[m].isHazardous = false;
              }
            }
            console.log('this.piecesForItemizeListArray[i].firstObject', this.piecesForMultiClassListArray[m].firstObject);
            // this.piecesForItemizeListArray[i].newAddPieces.splice([n],1);
            this.piecesForMultiClassListArray[m].newAddPieces[n].HandlingUnitQuantity = this.piecesForMultiClassListArray[m].HandlingUnitQuantity;
            this.piecesForMultiClassListArray[m].newAddPieces[n].HandlingUnitType = this.piecesForMultiClassListArray[m].HandlingUnitType;
            this.piecesForMultiClassListArray[m].newAddPieces[n].isHazardous = this.piecesForMultiClassListArray[m].isHazardous;
            this.piecesForMultiClassListArray[m].newAddPieces[n].PurchaseOrderNumber = this.piecesForMultiClassListArray[m].PurchaseOrderNumber;
            if (this.piecesForMultiClassListArray[m].Dimensions.Length === undefined && this.piecesForMultiClassListArray[m].Dimensions.Width === undefined && this.piecesForMultiClassListArray[m].Dimensions.Height === undefined) {
              this.piecesForMultiClassListArray[m].newAddPieces[n].Dimensions.Length = '';
              this.piecesForMultiClassListArray[m].newAddPieces[n].Dimensions.Width = '';
              this.piecesForMultiClassListArray[m].newAddPieces[n].Dimensions.Height = '';
            } else {
              this.piecesForMultiClassListArray[m].newAddPieces[n].Dimensions.Length = '';
              this.piecesForMultiClassListArray[m].newAddPieces[n].Dimensions.Width = '';
              this.piecesForMultiClassListArray[m].newAddPieces[n].Dimensions.Height = '';
            }
            this.combiningAllShipmentsRequestArray.push(this.piecesForMultiClassListArray[m].newAddPieces[n]);
            console.log('this. Multi class Array 1', this.combiningAllShipmentsRequestArray);
          }
        }

      }
    }

    if (this.detailvoltlArray.length > 0) {
      for (let n = 0; n < this.detailvoltlArray.length; n++) {
        this.detailvoltlArray[n].bolType = 'voltl';
        if (this.billOfLading.controls['serviceType'].value === 'FXFE' || this.billOfLading.controls['serviceType'].value === 'FXFP' || this.billOfLading.controls['serviceType'].value === 'FEDEX_FREIGHT_ECONOMY' || this.billOfLading.controls['serviceType'].value === 'FEDEX_FREIGHT_PRIORITY') {
          if (this.detailvoltlArray[n].HandlingUnitType === 'PLT') {
            this.detailvoltlArray[n].HandlingUnitType = 'PALLET';
          } else if (this.detailvoltlArray[n].HandlingUnitType === 'PCS') {
            this.detailvoltlArray[n].HandlingUnitType = 'PIECE';
          } else if (this.detailvoltlArray[n].HandlingUnitType === 'DRM') {
            this.detailvoltlArray[n].HandlingUnitType = 'DRUM';
          } else if (this.detailvoltlArray[n].HandlingUnitType === 'CTN') {
            this.detailvoltlArray[n].HandlingUnitType = 'CARTON';
          } else {
            this.detailvoltlArray[n].HandlingUnitType = 'PALLET';
          }
          if (this.detailvoltlArray[n].isHazardous === "") {
            this.detailvoltlArray[n].isHazardous = false;
          }
        } else if (this.billOfLading.controls['serviceType'].value === 'REDDAWAY') {

          if (this.detailArray[n].HandlingUnitType === 'PLT') {
            this.detailArray[n].HandlingUnitType = 'Pallets';
          } else if (this.detailArray[n].HandlingUnitType === 'PCS') {
            this.detailArray[n].HandlingUnitType = 'Pieces';
          } else if (this.detailArray[n].HandlingUnitType === 'DRM') {
            this.detailArray[n].HandlingUnitType = 'Drums';
          } else if (this.detailArray[n].HandlingUnitType === 'CTN') {
            this.detailArray[n].HandlingUnitType = 'Cartons';
          } else {
            this.detailArray[n].HandlingUnitType = 'Pallets';
          }
          if (this.detailArray[n].isHazardous === "") {
            this.detailArray[n].isHazardous = false;
          }
        }
        this.combiningAllShipmentsRequestArray.push(this.detailvoltlArray[n]);
        console.log('this. detail Array 1', this.combiningAllShipmentsRequestArray);
      }
    }
    let totalHandlingUnitArray = [], totalHUPalletsArray = [], totalPiecesArray = [], totalWeightArray = [];
    console.log('this.combiningAllShipmentsRequestArray', this.combiningAllShipmentsRequestArray);
    if (this.combiningAllShipmentsRequestArray.length > 0) {
      for (let c = 0; c < this.combiningAllShipmentsRequestArray.length; c++) {
        totalHandlingUnitArray.push(this.combiningAllShipmentsRequestArray[c].HandlingUnitQuantity);
        if (this.combiningAllShipmentsRequestArray[c].PackageQuantity !== '') {
          if (this.combiningAllShipmentsRequestArray[c].showFlag === 'Multi Class Pallet') {
            totalPiecesArray.push(this.combiningAllShipmentsRequestArray[c].PackageQuantity);
          } else {
            totalPiecesArray.push(this.combiningAllShipmentsRequestArray[c].PackageQuantity);
          }

        }
        totalWeightArray.push(this.combiningAllShipmentsRequestArray[c].Weight.Value);
        if (this.combiningAllShipmentsRequestArray[c].HandlingUnitType === 'PLT' || this.combiningAllShipmentsRequestArray[c].HandlingUnitType === 'PALLET' || this.combiningAllShipmentsRequestArray[c].HandlingUnitType === 'Pallets') {
          if (this.combiningAllShipmentsRequestArray[c].showFlag === 'Multi Class Pallet') {
            totalHUPalletsArray.push(this.combiningAllShipmentsRequestArray[c].HandlingUnitQuantity);
            break;
          } else {
            totalHUPalletsArray.push(this.combiningAllShipmentsRequestArray[c].HandlingUnitQuantity);
          }
        }
      }
      this.totalPieces = this.netChargeArrSum(totalHandlingUnitArray);
      this.previewTotalPallets = this.netChargeArrSum(totalHUPalletsArray);
      this.previewTotalPieces = this.netChargeArrSum(totalPiecesArray);
      this.totalWeights = this.netChargeArrSum(totalWeightArray);
    }
  }


  editDetailForExisting(detail:any, i:any) {
    this.editIndex = '';
    this.editIndex = i;
    this.editRowArray = detail;
    if (detail.Description !== '' && detail.HandlingUnitQuantity !== '' && detail.HandlingUnitType !== '' && detail.PackageQuantity !== '' && detail.PackageUnitType !== '') {
      $('#edit-modal').modal('show');
      this.editForm();
      this.editLineItemUpdateForm.patchValue({
        handlingUnitQuantityUpdate: detail.HandlingUnitQuantity,
        handlingUnitTypeUpdate: detail.HandlingUnitType,
        packageQuantityUpdate: detail.PackageQuantity,
        packageUnitTypeUpdate: detail.PackageUnitType,
        lengthUpdate: detail.Dimensions.Length,
        widthUpdate: detail.Dimensions.Width,
        heightUpdate: detail.Dimensions.Height,
        descriptionUpdate: detail.Description,
        nmfcUpdate: detail.nmfc
      })
    } else {
      $('#edit-modal').modal('show');
      (document.getElementById('handlingUnitQuantityUpdate')as HTMLFormElement).focus();
      (<HTMLInputElement>document.getElementById("cpf10")).value = '';
      this.editForm();
    }
  }
  saveDescNmfc(formValue:any) {
    this.errorMsgForUpdate = false;
    if (formValue.descriptionUpdate !== '' && formValue.descriptionUpdate !== null && formValue.descriptionUpdate !== undefined
      && formValue.handlingUnitQuantityUpdate !== '' && formValue.handlingUnitQuantityUpdate !== null && formValue.handlingUnitQuantityUpdate !== undefined
      && formValue.packageQuantityUpdate !== '' && formValue.packageQuantityUpdate !== null && formValue.packageQuantityUpdate !== undefined && this.showFlagForDimensions === false) {
      this.piecesCount = [], this.palletCount = [], this.othersCount = [];
      this.previewTotalPallets = 0;
      this.previewTotalPieces = 0;
      let piecesArray = [], weightArray = [], totalWeight;
      this.errorMsgForUpdate = false;
      if (this.serviceCarrierType === 'FXFE' || this.serviceCarrierType === 'FXFP') {
        if (formValue.handlingUnitTypeUpdate === 'PLT') {
          formValue.handlingUnitTypeUpdate = 'PALLET';
        } else if (formValue.handlingUnitTypeUpdate === 'PCS') {
          formValue.handlingUnitTypeUpdate = 'PIECE';
        } else if (formValue.handlingUnitTypeUpdate === 'DRM') {
          formValue.handlingUnitTypeUpdate = 'DRUM';
        } else if (formValue.handlingUnitTypeUpdate === 'CTN') {
          formValue.handlingUnitTypeUpdate = 'CARTON';
        } else {
          formValue.handlingUnitTypeUpdate = 'PALLET';
        }
      }
      if (formValue.packageQuantity === '' || formValue.packageQuantity === null) {
        formValue.packageQuantity = 0;
      }
      if (this.serviceCarrierType === 'REDDAWAY') {
        if (formValue.handlingUnitTypeUpdate === 'PLT') {
          formValue.handlingUnitTypeUpdate = 'Pallets';
        } else if (formValue.handlingUnitTypeUpdate === 'PCS') {
          formValue.handlingUnitTypeUpdate = 'Pieces';
        } else if (formValue.handlingUnitTypeUpdate === 'DRM') {
          formValue.handlingUnitTypeUpdate = 'Drums';
        } else if (formValue.handlingUnitTypeUpdate === 'CTN') {
          formValue.handlingUnitTypeUpdate = 'Cartons';
        } else {
          formValue.handlingUnitTypeUpdate = 'Pallets';
        }
      }
      this.detailArray[this.editIndex].Description = formValue.descriptionUpdate;
      this.detailArray[this.editIndex].nmfc = formValue.nmfcUpdate;
      this.detailArray[this.editIndex].HandlingUnitQuantity = formValue.handlingUnitQuantityUpdate;
      this.detailArray[this.editIndex].PackageQuantity = formValue.packageQuantityUpdate;
      this.detailArray[this.editIndex].PackageUnitType = formValue.packageUnitTypeUpdate;
      this.detailArray[this.editIndex].HandlingUnitType = formValue.handlingUnitTypeUpdate;
      this.detailArray[this.editIndex].Dimensions.Length = formValue.lengthUpdate;
      this.detailArray[this.editIndex].Dimensions.Width = formValue.widthUpdate;
      this.detailArray[this.editIndex].Dimensions.Height = formValue.heightUpdate;
      this.detailArray[this.editIndex].Pieces = formValue.packageQuantityUpdate;
      this.nmfcUpdate = '';
      this.descriptionUpdate = '';
      $('#edit-modal').modal('hide');
      (<HTMLInputElement>document.getElementById("cpf10")).value = '';
      if (this.detailArray.length > 0) {
        for (let d = 0; d < this.detailArray.length; d++) {
          let addPieces = this.detailArray[d].HandlingUnitQuantity;
          let addWeight = this.detailArray[d].Weight.Value;
          if (this.detailArray[d].weightUnit === 'ea.') {
            totalWeight = Number(addPieces) * Number(addWeight);
            weightArray.push(totalWeight);
          } else {
            totalWeight = Number(addWeight);
            weightArray.push(totalWeight);
          }
          piecesArray.push(addPieces);
          if (this.detailArray[d].PackageUnitType !== '' || this.detailArray[d].PackageUnitType !== undefined) {
            this.piecesCount.push(this.detailArray[d].PackageQuantity);
          }
          if (this.detailArray[d].HandlingUnitType === 'PLT' || this.detailArray[d].HandlingUnitType === 'PALLET' || this.detailArray[d].HandlingUnitType === 'Pallets') {
            this.palletCount.push(this.detailArray[d].HandlingUnitQuantity);
          }
          if (this.detailArray[d].Description !== '' && this.detailArray[d].Description !== null && this.detailArray[d].Description !== undefined) {
            this.descriptionErrorMsg = false;
          } else {
            this.descriptionErrorMsg = true;
          }

        }
        if (this.piecesCount.length > 0) {
          this.previewTotalPieces = this.netChargeArrSum(this.piecesCount);
        } else {
          this.previewTotalPieces = 0;
        }
        if (this.palletCount.length > 0) {
          this.previewTotalPallets = this.netChargeArrSum(this.palletCount);
        } else {
          this.previewTotalPallets = 0;
        }
        this.totalPieces = this.netChargeArrSum(piecesArray);
        this.totalWeights = this.netChargeArrSum(weightArray);
        this.lengthOfDetailArray = this.detailArray.length;
      } else {
        this.descriptionErrorMsg = false;
      }
    } else {
      this.errorMsgForUpdate = true;
      $('#edit-modal').modal('show');
    }
  }


  updateRow(value:any, type:any) {
    console.log('updateWholeRow', value, type, 'this.detailArray', this.detailArray);
    console.log('this.rowValues', this.rowValues, 'Non Itemize', this.detailArray, 'itemize', this.piecesForItemizeListArray, 'Multi class', this.piecesForMultiClassListArray);
    let hazmatValue;
    this.showFlagForDimensions = false;
    value.nmfc = value.nmfc.replace(/_/gm, '');
    if (type === 'addFeature') {
      // this.detailArray.splice(this.editIndex, 1);
      // this.pricingDetail.splice(this.editIndex, 1)
      this.addRow(value);
    } else {
      if (value.hazmat === 'false' || value.hazmat === '' || value.hazmat === undefined || value.hazmat === null) {
        hazmatValue = false;
      } else {
        hazmatValue = true;
      }
      if (this.rowValues.bolType === "Non Itemize" || this.getQuoteId !== null) {
        // this.detailArray.splice(this.editIndex, 1);
        console.log(this.detailArray);
        this.detailArray[this.editIndex].isHazardous = hazmatValue;
        this.detailArray[this.editIndex].weightUnit = value.weightUnit;
        this.detailArray[this.editIndex].FreightClass = value.classification;
        this.detailArray[this.editIndex].HandlingUnitQuantity = value.handlingUnitQuantity;
        this.detailArray[this.editIndex].HandlingUnitType = value.handlingUnitType;
        this.detailArray[this.editIndex].PackageQuantity = value.packageQuantity;
        this.detailArray[this.editIndex].PackageUnitType = value.packageUnitType;
        this.detailArray[this.editIndex].Pieces = value.packageQuantity;
        this.detailArray[this.editIndex].PurchaseOrderNumber = value.purchaseOrderNumber;
        this.detailArray[this.editIndex].nmfc = value.nmfc;
        this.detailArray[this.editIndex].Description = value.description;
        this.detailArray[this.editIndex].Weight.Value = value.weight;
        this.detailArray[this.editIndex].Dimensions.Length = value.length;
        this.detailArray[this.editIndex].Dimensions.Width = value.width;
        this.detailArray[this.editIndex].Dimensions.Height = value.height;
        this.detailArray[this.editIndex].cube = value.cube;
        this.detailArray[this.editIndex].newAddPieces = [];
        this.clearForm();
        $('#new-edit-modal').modal('hide');

      } else if (this.rowValues.bolType === "Itemize") {
        if (this.piecesListArray.length === 0) {
          this.piecesListArray = [];
        }
        this.piecesForItemizeListArray[this.editIndex].isHazardous = hazmatValue;
        this.piecesForItemizeListArray[this.editIndex].weightUnit = value.weightUnit;
        this.piecesForItemizeListArray[this.editIndex].FreightClass = value.classification;
        this.piecesForItemizeListArray[this.editIndex].HandlingUnitQuantity = value.handlingUnitQuantity;
        this.piecesForItemizeListArray[this.editIndex].HandlingUnitType = value.handlingUnitType;
        this.piecesForItemizeListArray[this.editIndex].PackageQuantity = value.packageQuantity;
        this.piecesForItemizeListArray[this.editIndex].PackageUnitType = value.packageUnitType;
        this.piecesForItemizeListArray[this.editIndex].Pieces = value.packageQuantity;
        this.piecesForItemizeListArray[this.editIndex].PurchaseOrderNumber = value.purchaseOrderNumber;
        this.piecesForItemizeListArray[this.editIndex].nmfc = value.nmfc;
        this.piecesForItemizeListArray[this.editIndex].Description = value.description;
        this.piecesForItemizeListArray[this.editIndex].Weight.Value = value.weight;
        this.piecesForItemizeListArray[this.editIndex].Dimensions.Length = value.length;
        this.piecesForItemizeListArray[this.editIndex].Dimensions.width = value.width;
        this.piecesForItemizeListArray[this.editIndex].Dimensions.height = value.height;
        this.piecesForItemizeListArray[this.editIndex].cube = value.cube;
        this.piecesForItemizeListArray[this.editIndex].newAddPieces = this.piecesListArray;
        if (this.piecesListArray.length > 0) {
          for (let p = 0; p < this.piecesListArray.length; p++) {
            if (this.piecesForItemizeListArray[this.editIndex].newAddPieces.length > 0) {
              this.piecesForItemizeListArray[this.editIndex].rowSpanValues = this.piecesForItemizeListArray[this.editIndex].newAddPieces.length;
              console.log('this.piecesForItemizeListArray[p].rowSpanValues ', this.piecesForItemizeListArray[this.editIndex].rowSpanValues);
            }
          }
        }
      } else {
        if (this.piecesClassListArray.length === 0) {
          this.piecesClassListArray = [];
        }
        this.piecesForMultiClassListArray[this.editIndex].isHazardous = hazmatValue;
        this.piecesForMultiClassListArray[this.editIndex].weightUnit = value.weightUnit;
        this.piecesForMultiClassListArray[this.editIndex].FreightClass = value.classification;
        this.piecesForMultiClassListArray[this.editIndex].HandlingUnitQuantity = value.handlingUnitQuantity;
        this.piecesForMultiClassListArray[this.editIndex].HandlingUnitType = value.handlingUnitType;
        this.piecesForMultiClassListArray[this.editIndex].PackageQuantity = value.packageQuantity;
        this.piecesForMultiClassListArray[this.editIndex].PackageUnitType = value.packageUnitType;
        this.piecesForMultiClassListArray[this.editIndex].Pieces = value.packageQuantity;
        this.piecesForMultiClassListArray[this.editIndex].PurchaseOrderNumber = value.purchaseOrderNumber;
        this.piecesForMultiClassListArray[this.editIndex].nmfc = value.nmfc;
        this.piecesForMultiClassListArray[this.editIndex].Description = value.description;
        this.piecesForMultiClassListArray[this.editIndex].Weight.Value = value.weight;
        this.piecesForMultiClassListArray[this.editIndex].Dimensions.Length = value.length;
        this.piecesForMultiClassListArray[this.editIndex].Dimensions.width = value.width;
        this.piecesForMultiClassListArray[this.editIndex].Dimensions.height = value.height;
        this.piecesForMultiClassListArray[this.editIndex].cube = value.cube;
        this.piecesForMultiClassListArray[this.editIndex].newAddPieces = this.piecesClassListArray;
        if (this.piecesClassListArray.length > 0) {
          for (let p = 0; p < this.piecesClassListArray.length; p++) {
            if (this.piecesForMultiClassListArray[this.editIndex].newAddPieces.length > 0) {
              this.piecesForMultiClassListArray[this.editIndex].rowSpanValues = this.piecesForMultiClassListArray[this.editIndex].newAddPieces.length;
              console.log('this.piecesForMultiClassListArray[p].rowSpanValues ', this.piecesForMultiClassListArray[this.editIndex].rowSpanValues);
            }
          }
        }
      }
    }
  }

  deleteRow(index:any, detail:any, type:any) {
    if (type === 'Non Itemize') {
      this.detailArray.splice(index, 1);
      if (this.detailArray.length > 0) {
        this.isDisabledItemize = true;
        this.isDisabledMultiClass = true;
      } else {
        this.isDisabledItemize = false;
        this.isDisabledMultiClass = false;
      }
    } else {
      if (type === 'Multi Classed Pallet') {
        this.piecesForMultiClassListArray.splice(index, 1);
        if (this.piecesForMultiClassListArray.length > 0) {
          this.isDisabledItemize = true;
          this.isDisabledNonItemize = true;
        } else {
          this.isDisabledItemize = false;
          this.isDisabledNonItemize = false;
          this.billOfLading.patchValue({
            shipmentType: 'Non Itemized'
          });
        }
      } else if (type === 'Itemize') {
        this.piecesForItemizeListArray.splice(index, 1);
        if (this.piecesForItemizeListArray.length > 0) {
          this.isDisabledMultiClass = true;
          this.isDisabledNonItemize = true;
        } else {
          this.isDisabledMultiClass = false;
          this.isDisabledNonItemize = false;
          this.billOfLading.patchValue({
            shipmentType: 'Non Itemized'
          });
        }
      } else {
        this.isDisabledMultiClass = false;
        this.isDisabledNonItemize = false;
        this.isDisabledItemize = false;
      }
    }
    this.pricingDetail.splice(index, 1);
    this.billOfLading.patchValue({ rate: '' });
    let weightArray = [], piecesArray = [], totalWeight;
    this.piecesCount = [], this.palletCount = [], this.othersCount = [];
    if (this.detailArray.length > 0) {
      this.showAddField = true;
      this.showAddedValue = true;
      for (let d = 0; d < this.detailArray.length; d++) {
        let addPieces = this.detailArray[d].HandlingUnitQuantity;
        let addWeight = this.detailArray[d].Weight.Value;
        if (this.detailArray[d].weightUnit === 'ea.') {
          totalWeight = Number(addPieces) * Number(addWeight);
          weightArray.push(totalWeight);
        } else {
          totalWeight = Number(addWeight);
          weightArray.push(totalWeight);
        }
        piecesArray.push(addPieces);
        if (this.detailArray[d].PackageUnitType !== 'PCS' || this.detailArray[d].PackageUnitType !== undefined) {
          this.piecesCount.push(this.detailArray[d].PackageQuantity)
        }
        if (this.detailArray[d].HandlingUnitType === "PLT" || this.detailArray[d].HandlingUnitType === "PALLET" || this.detailArray[d].HandlingUnitType === 'Pallets') {
          this.palletCount.push(this.detailArray[d].PackageQuantity)
        }
      }
      this.previewTotalPieces = this.netChargeArrSum(this.piecesCount);
      this.previewTotalPallets = this.netChargeArrSum(this.palletCount);
      this.totalPieces = this.netChargeArrSum(piecesArray);
      this.totalWeights = this.netChargeArrSum(weightArray);
      this.getRateMsg = true;
    } else {
      this.showAddField = true;
      this.showAddedValue = false;
      this.clearForm();
      if (this.piecesForMultiClassListArray.length > 0) {
        this.showAddField = true;
        this.showAddedValue = true;
      }
      if (this.piecesForItemizeListArray.length > 0) {
        this.showAddField = true;
        this.showAddedValue = true;
      }
      (<HTMLInputElement>document.getElementById("cpf3")).value = '';
    }
  }

  getData(value:any) {
    console.log(value);
    if (value === false) {
      this.enableAutoComplete = true;
      // setTimeout(() => {
      //   this.showErrorCustomer = false;
      //   this.billOfLading.patchValue({ shipperCompanyName: '' });
      // }, 2000);
    } else {
      this.enableAutoComplete = false;
      // this.enableDescriptionValue = true;
      // $('#description-modal').modal('show');
      // $('#tasknote').focus();
      this.checkDescription1(this.piecesForm.controls['description'].value)
      // $('#descForPieces2').focus();
      // $('#description-modal1').modal('show');
      // event.preventDefault();
      // setTimeout(() => {
      // $('#description-modal').modal('show');
      // $('#tasknote').focus();
      //       }, 40);

    }
  }

  shipmentDate(date:any) {
    console.log('date', date);
  }

  shipperZipCode(zipcode:any) {
    if (this.backButtonCarrier === true) {
      this.lengthOfDetailArray = 1;
    }
    this.pricingInfoService.getCityState(zipcode).subscribe(response => {
      let cityAndState: any = response;
      if (cityAndState && cityAndState.length > 0) {
        this.billOfLading.patchValue({ shipperCity: cityAndState[0].city, shipperState: cityAndState[0].state });
        this.shipperErrorMessage = false;
      } else {
        this.shipperErrorMessage = true;
      }
    });
    /*
    this.originCity = '';
    this.originState = '';
    this.pricingInfoService.getCityState(zipcode).subscribe(getArrayValues => {
      this.getZipCode = getArrayValues;
      if (this.getZipCode.length > 0) {
        for (let i = 0; i < this.getZipCode.length; i++) {
          this.originCity = this.getZipCode[i].city;
          this.originState = this.getZipCode[i].state;
          this.billOfLading.patchValue({ shipperCity: this.originCity, shipperState: this.originState });
          this.shipperErrorMessage = false;
        }
      } else {
        this.shipperErrorMessage = true;
      }
    });
    */
  }

  // consigneeZipCode(zipcode) {
  //   if (this.backButtonCarrier === true) {
  //     this.lengthOfDetailArray = 1;
  //   }
  //   this.pricingInfoService.getCityState(zipcode).subscribe(response => {
  //     let cityAndState: any = response;
  //     if (cityAndState && cityAndState.length > 0) {
  //       this.billOfLading.patchValue({ consigneeCity: cityAndState[0].city, consigneeState: cityAndState[0].state });
  //       this.consigneeErrorMessage = false;
  //     } else {
  //       this.consigneeErrorMessage = true;
  //     }
  //   });

  //   /*
  //   this.pricingInfoService.getCityState(zipcode).subscribe(getArrayValues => {
  //     this.getZipCode = getArrayValues;
  //     if (this.getZipCode.length > 0) {
  //       for (let i = 0; i < this.getZipCode.length; i++) {
  //         this.destinationCity = this.getZipCode[i].city;
  //         this.destinationState = this.getZipCode[i].state;
  //         this.billOfLading.patchValue({ consigneeCity: this.destinationCity, consigneeState: this.destinationState });
  //         this.consigneeErrorMessage = false;
  //       }
  //     } else {
  //       this.consigneeErrorMessage = true;
  //     }
  //   });
  //   */
  // }


  consigneeZipCode(zipcode:any) {
    this.consigneeZipArray = [];
    this.showTableZip = false;
    if (this.backButtonCarrier === true) {
      this.lengthOfDetailArray = 1;
    }
    console.log(zipcode);
    this.pricingInfoService.getCityStateNew(zipcode).subscribe((response: any) => {
      console.log(response.lookupCityResponse);
      console.log(response.lookupCityResponse.cities);
      console.log(response.lookupCityResponse.cities.city);
      let cityAndState: any = response.lookupCityResponse.cities.city;
      // this.consigneeCity = cityAndState;

      console.log(cityAndState.length);
      if (cityAndState && cityAndState.length > 0) {
        // console.log(response.lookupCityResponse.cities.city[0].name.$value);

        if (cityAndState.length > 1) {
          this.showTableZip = true;
          cityAndState.forEach((res:any) => {
            this.consigneeZipArray.push({ "cityName": res.name.$value, "state": res.state.$value })
          })
          // this.consigneeZipArray = cityAndState;
          console.log(this.consigneeZipArray);
        } else {
          this.billOfLading.patchValue({ consigneeCity: cityAndState[0].name.$value, consigneeState: cityAndState[0].state.$value });
          this.consigneeErrorMessage = false;
          if (this.billOfLading.value.consigneeState === 'HI' || this.billOfLading.value.consigneeState === 'AK') {
            this.showNoShipmentError = true;
          } else {
            this.showNoShipmentError = false;
          }
        }
      } else if (cityAndState.length === undefined) {
        this.billOfLading.patchValue({ consigneeCity: cityAndState.name.$value, consigneeState: cityAndState.state.$value });
        this.consigneeErrorMessage = false;
        if (this.billOfLading.value.consigneeState === 'HI' || this.billOfLading.value.consigneeState === 'AK') {
          this.showNoShipmentError = true;
        } else {
          this.showNoShipmentError = false;
        }
      } else {
        this.showTableZip = false;

        this.consigneeErrorMessage = true;
      }
    });

    /*
    this.pricingInfoService.getCityState(zipcode).subscribe(getArrayValues => {
      this.getZipCode = getArrayValues;
      if (this.getZipCode.length > 0) {
        for (let i = 0; i < this.getZipCode.length; i++) {
          this.destinationCity = this.getZipCode[i].city;
          this.destinationState = this.getZipCode[i].state;
          this.billOfLading.patchValue({ consigneeCity: this.destinationCity, consigneeState: this.destinationState });
          this.consigneeErrorMessage = false;
        }
      } else {
        this.consigneeErrorMessage = true;
      }
    });
    */
  }

  consigneeZipCode1(zipcode:any) {
    if (this.backButtonCarrier === true) {
      this.lengthOfDetailArray = 1;
    }
    this.pricingInfoService.getCityState(zipcode).subscribe(response => {
      let cityAndState: any = response;
      if (cityAndState && cityAndState.length > 0) {
        this.billOfLading.patchValue({ consigneeCity: cityAndState[0].city, consigneeState: cityAndState[0].state });
        this.consigneeErrorMessage = false;
      } else {
        this.consigneeErrorMessage = true;
      }
    });
  }

  getCityNameValue(value:any) {
    console.log(value);
    this.billOfLading.patchValue({ consigneeCity: value.cityName, consigneeState: value.state });
    this.consigneeErrorMessage = false;
    this.showTableZip = false;
    if (this.billOfLading.value.consigneeState === 'HI' || this.billOfLading.value.consigneeState === 'AK') {
      this.showNoShipmentError = true;
    } else {
      this.showNoShipmentError = false;
    }

  }

  thirdPartyZipCode(zipcode:any) {
    if (this.backButtonCarrier === true) {
      this.lengthOfDetailArray = 1;
    }
    this.thirdPartyCity = '';
    this.thirdPartyState = '';
    this.pricingInfoService.getCityState(zipcode).subscribe(response => {
      let cityAndState: any = response;
      if (cityAndState && cityAndState.length > 0) {
        this.billOfLading.patchValue({ thirdPartyCity: cityAndState[0].city, thirdPartyState: cityAndState[0].state });
        this.thirdPartyErrorMessage = false;
      } else {
        this.thirdPartyErrorMessage = true;
      }
    });

    /*
    this.pricingInfoService.getCityState(zipcode).subscribe(getArrayValues => {
      this.getZipCode = getArrayValues;
      if (this.getZipCode.length > 0) {
        for (let i = 0; i < this.getZipCode.length; i++) {
          this.thirdPartyCity = this.getZipCode[i].city;
          this.thirdPartyState = this.getZipCode[i].state;
          this.billOfLading.patchValue({ thirdPartyCity: this.thirdPartyCity, thirdPartyState: this.thirdPartyState });
          this.thirdPartyErrorMessage = false;
        }
      } else {
        this.thirdPartyErrorMessage = true;
      }
    });
    */
  }

  checkForClassification(classification:any) {
    console.log(classification);
  }

  checkPhoneNumber(value:any, type:any) {
    let phoneNumber = this.formatPhoneNumber(value);
    if (type === 'consignee') {
      this.billOfLading.patchValue({ consigneePhoneNumber: phoneNumber });
    } else if (type === 'shipper') {
      this.billOfLading.patchValue({ shipperPhoneNumber: phoneNumber });
    } else {
      this.billOfLading.patchValue({ shipperPhoneNumber: phoneNumber });
    }
  }

  onItemSelect(item: any) {
    console.log('item', item);
    if (item.id === 9) {
      this.showForOthers = true;
    } else {
      this.showForOthers = false;
      // this.assessorialName.
    }
    if (item.itemName === 'Delivery Appointment Required') {
      this.showModal = true;
      this.dropdownRef.closeDropdown()

      $('#DeliveryModal').modal('show');
      $('#contact').focus();
    }

    if (item.itemName === 'Hazmat') {
      // this.billOfLading.patchValue({'hazmat' : true});
      // this.combiningAllShipmentsRequestArray.forEach((ele) => {
      //   ele.isHazardous = true;
      // })
      // this.combiningAllShipmentsArray.forEach((ele) => {
      //   ele.isHazardous = true;
      // })
      this.dropdownRef.closeDropdown()
      this.hazmadForm.patchValue({ 'description': '', 'unNumber': 'UN-' })
      $('#hazmadModal').modal('show');
      setTimeout(() => {
        console.log('focus')
        $('#emergencycontact').focus();

      }, 1000);
    }

  }

  // onClose(item) {
  //   console.log('itemselect',item)
  //   // if (item.itemName === 'Delivery Appointment Required') {
  //     $('#DeliveryModal').modal('show');
  //     $('#contact').focus();
  //   // }
  // }


  selecthazad(data:any) {
    console.log(data);
    if (data.hazmat === true) {
      console.log(this.selectedItems);
      let object = { id: 8, itemName: "Hazmat", Yrccost: "0", Fedexcost: "0" };
      const found = this.selectedItems.findIndex((el:any) => el.itemName === 'Hazmat');
      console.log(found);
      if (found === -1) {
        this.selectedItems.push(object);
      }
      this.onItemSelect(object);
    } else if (data.hazmat === false) {
      this.selectedItems.forEach((el:any, index:any) => {
        if (el.itemName === 'Hazmat') {
          this.selectedItems.splice(index, 1);
          let object = { id: 8, itemName: "Hazmat", Yrccost: "0", Fedexcost: "0" };
          this.OnItemDeSelect(object);
        }
      })
    }
  }

  saveDeliveryAppointment(formValue:any) {
    console.log(formValue);
    $('#DeliveryModal').modal('hide');
    let mappingString;
    // contactName: ['', Validators.required],
    // contactNumber: ['', Validators.required],
    // NotificationAlert: ['',Validators.required],
    // alternatecontactName: ['',Validators.required],
    if (formValue.alternatecontactName !== '' && formValue.alternatecontactNumber !== '') {
      mappingString = 'DELIVERY APPOINTMENT REQUIRED ' + (formValue.NotificationAlert) + ' HR CALL AHEAD TO ' + (formValue.contactName).toUpperCase() + ' AT ' +
        (formValue.contactNumber).toUpperCase() + ' TO SET UP APPOINTMENT. ALTERNATE CONTACT ' + (formValue.alternatecontactName).toUpperCase() + ' AT ' +
        (formValue.alternatecontactNumber).toUpperCase();
    } else {
      if (formValue.alternatecontactName === '' && formValue.alternatecontactNumber === '') {
        mappingString = 'DELIVERY APPOINTMENT REQUIRED ' + (formValue.NotificationAlert) + ' HR CALL AHEAD TO ' + (formValue.contactName).toUpperCase() + ' AT ' +
          (formValue.contactNumber).toUpperCase() + ' TO SET UP APPOINTMENT.'
      } else if (formValue.alternatecontactNumber === '') {
        mappingString = 'DELIVERY APPOINTMENT REQUIRED ' + (formValue.NotificationAlert) + ' HR CALL AHEAD TO ' + (formValue.contactName).toUpperCase() + ' AT ' +
          (formValue.contactNumber).toUpperCase() + ' TO SET UP APPOINTMENT. ALTERNATE CONTACT ' + (formValue.alternatecontactName).toUpperCase();
      } else {
        mappingString = 'DELIVERY APPOINTMENT REQUIRED ' + (formValue.NotificationAlert) + ' HR CALL AHEAD TO ' + (formValue.contactName).toUpperCase() + ' AT ' +
          (formValue.contactNumber).toUpperCase() + ' TO SET UP APPOINTMENT. ALTERNATE CONTACT ' + (formValue.alternatecontactName).toUpperCase() + ' AT ' +
          (formValue.alternatecontactNumber).toUpperCase();
      }
    }
    this.billOfLading.patchValue({
      specialInstructions: mappingString
    });
    console.log(this.billOfLading.value);
  }

  saveHazmatValue(formValue:any) {
    console.log(formValue);
    // if (formValue.unNumber.startsWith("UN-")) {
    //   console.log('true');
    // } else {
    //   console.log('false');
    // }
    $('#hazmadModal').modal('hide');
    let mappingString;
    console.log(this.patchHazadDescription);
    // contactName: ['', Validators.required],
    // contactNumber: ['', Validators.required],
    // NotificationAlert: ['',Validators.required],
    // alternatecontactName: ['',Validators.required],
    // if (formValue.alternatecontactName !== '' && formValue.alternatecontactNumber !== '') {
    let temp = 'HAZMAT EMERGENCY CONTACT INFORMATION - '
    mappingString = 'HAZMAT EMERGENCY CONTACT INFORMATION - ' + formValue.emergencycontactName + '   ' + formValue.emergencycontactNumber;
    mappingString.replace(temp, '<b>' + temp + '</b>');
    //  mappingString = mappingString.bold();
    //  if (this.patchHazadDescription === true) {
    this.billOfLading.patchValue({
      'description': formValue.unNumber + ' ' + formValue.description
    })
    //  } else {
    //    console.log(this.billOfLading.value.shipmentType);
    //    if (this.billOfLading.value.shipmentType === 'Non Itemized') {
    //      console.log(this.detailArray.length )
    //      if (this.detailArray.length === 1) {
    //      console.log(this.detailArray)
    //        this.detailArray[0].Description = this.detailArray[0].Description + ' ' + formValue.unNumber + ' ' + formValue.description 
    //      } else if (this.detailArray.length > 1) {
    //      console.log(this.detailArray)
    //       this.detailArray[this.detailArray.length - 1].Description = this.detailArray[this.detailArray.length - 1].Description +' ' + formValue.unNumber + ' ' + formValue.description 

    //      } else {
    //       this.billOfLading.patchValue({
    //         'description': formValue.unNumber + ' ' + formValue.description 
    //       });
    //              }
    //    } else if ( this.billOfLading.value.shipmentType === 'Itemized') {
    //      console.log(this.piecesForItemizeListArray);
    //      if (this.piecesForItemizeListArray.length === 1) {
    //       console.log(this.piecesForItemizeListArray)
    //         this.piecesForItemizeListArray[0].Description = this.piecesForItemizeListArray[0].Description + ' ' + formValue.unNumber + ' ' + formValue.description 
    //       } else if (this.piecesForItemizeListArray.length > 1) {
    //       console.log(this.piecesForItemizeListArray)
    //        this.piecesForItemizeListArray[this.piecesForItemizeListArray.length - 1].Description = this.piecesForItemizeListArray[this.piecesForItemizeListArray.length - 1].Description + ' ' + formValue.unNumber + ' ' + formValue.description 

    //       } else {
    //        this.billOfLading.patchValue({
    //          'description': formValue.unNumber + ' ' + formValue.description 
    //        });
    //    }
    //  }
    // }
    // }
    //  else {
    //     if (formValue.alternatecontactName === ''  && formValue.alternatecontactNumber === '') {
    //   mappingString = 'Hazmat ' +(formValue.NotificationAlert) + ' HR CALL AHEAD TO ' + (formValue.contactName).toUpperCase() + ' AT ' +
    //                      (formValue.contactNumber).toUpperCase() + ' TO SET UP APPOINTMENT.'
    // } else if(formValue.alternatecontactNumber === '') {
    //   mappingString = 'Hazmat ' +(formValue.NotificationAlert) + ' HR CALL AHEAD TO ' + (formValue.contactName).toUpperCase() + ' AT ' +
    //   (formValue.contactNumber).toUpperCase() + ' TO SET UP APPOINTMENT. ALTERNATE CONTACT ' + (formValue.alternatecontactName).toUpperCase() ;
    // } else {
    //   mappingString = 'Hazmat ' +(formValue.NotificationAlert) + ' HR CALL AHEAD TO ' + (formValue.contactName).toUpperCase() + ' AT ' +
    //   (formValue.contactNumber).toUpperCase() + ' TO SET UP APPOINTMENT. ALTERNATE CONTACT ' + (formValue.alternatecontactName).toUpperCase() + ' AT ' +
    //   (formValue.alternatecontactNumber).toUpperCase(); 
    // }
    // }
    this.billOfLading.patchValue({
      specialInstructions: mappingString
    });
    this.specialInstructionsCharacterCount = this.billOfLading.value.specialInstructions.length;

    setTimeout(() => {
      $('#handlingUnitQuantity').focus();


    }, 500);
    console.log(this.billOfLading.value);
  }
  buildAccessorialForm() {
    this.assessorialForm = this.fb.group({
      contactName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      NotificationAlert: ['', Validators.required],
      alternatecontactName: ['', Validators.required],
      alternatecontactNumber: ['', Validators.required]
    });
  }

  buildHazmadForm() {
    this.hazmadForm = this.fb.group({
      unNumber: ['UN-', Validators.required],
      emergencycontactName: ['', Validators.required],
      emergencycontactNumber: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  OnItemDeSelect(item: any) {
    if (item.id === 8) {
      this.showForOthers = false;
    }
    if (item.itemName === 'Delivery Appointment Required') {
      this.billOfLading.patchValue({
        specialInstructions: ''
      });
      this.buildAccessorialForm();
    }

  }

  saveOthers(form:any) {
    this.amountValue = '';
    this.amountValue = form.amount;
    this.amountIncDecData = form.amountIncDec;
    if (this.amountIncDecData === '' || this.amountIncDecData === null) {
      this.amountIncDecData = 'increment';
    }
    this.showForOthers = false;
    this.billOfLading.patchValue({ reason: '', amountIncDec: '', amount: '' });
  }

  changedDecimal(value1:any) {
    console.log(value1);
    let value = value1.target.value;
    if (value.endsWith("s") === true || value.endsWith("S") === true) {
      this.showNmfcErrorMsg = true;
    } else {
      this.showNmfcErrorMsg = false;
    }
  }
  
  calculateMultiClassArray() {
    let classValue, objectForRate, formatArray:any = [], weightArray = [],
      classArray = [], headerInWeight = 0, piecesInWeight, minimumClass;
    if (this.combiningAllShipmentsArray.length > 0) {
      for (let s = 0; s < this.combiningAllShipmentsArray.length; s++) {
        headerInWeight += Number(this.combiningAllShipmentsArray[s].Weight.Value);

        if (this.combiningAllShipmentsArray[s].bolType === 'Multi Classed Pallet') {
          for (let m = 0; m < this.combiningAllShipmentsArray[s].newAddPieces.length; m++) {
            if (Number(this.combiningAllShipmentsArray[s].newAddPieces[m].FreightClass) === 77.5) {
              classValue = 77;
            } else if (Number(this.combiningAllShipmentsArray[s].newAddPieces[m].FreightClass) === 92.5) {
              classValue = 92;
            } else {
              classValue = this.combiningAllShipmentsArray[s].newAddPieces[m].FreightClass;
            }
            objectForRate = {
              'weight': Number(this.combiningAllShipmentsArray[s].newAddPieces[m].Weight.Value),
              'classification': classValue
            };
            weightArray.push(Number(this.combiningAllShipmentsArray[s].newAddPieces[m].Weight.Value));
            classArray.push(classValue);
            formatArray.push(objectForRate);
            console.log('formatArray', formatArray);
            console.log('formatArray', weightArray);

          }

          console.log('formatArray returning', formatArray);
        }
      }

      piecesInWeight = this.netChargeArrSum(weightArray);
      console.log(piecesInWeight, headerInWeight);
      if (Number(headerInWeight) !== Number(piecesInWeight)) {
        let differenceInWeight = Number(headerInWeight) - Number(piecesInWeight);
        minimumClass = Math.min(...classArray);
        objectForRate = {
          'weight': Number(differenceInWeight),
          'classification': minimumClass
        }
        formatArray.push(objectForRate);
        console.log('formatArray when total < current ', formatArray);
      }
      console.log('formatArray returning', formatArray);
      return formatArray;

    }
  }
  getAllDetails(billOfLading:any) {
    console.log(billOfLading);
    this.userData = {};
    this.userData.classWeight = [];
    this.resultArray = [];
    this.accessorials = [];
    this.localStorageArData = [];
    this.totalChargeValue = '';
    this.errorResponse = '';
    this.responseDataForRate;
    this.selectedItemValue = [];
    let newArrayForShipment = [], formatToGetRateShipmentArray = [], formatArray:any = [];
    this.selectedItemValue = this.selectedItems;
    this.userData.origin = billOfLading.shipperPostalCode;
    this.userData.destination = billOfLading.consigneePostalCode;
    this.userData.originState = billOfLading.shipperState;
    this.userData.destinationState = billOfLading.consigneeState;
    this.userData.originCity = billOfLading.shipperCity;
    this.userData.destinationCity = billOfLading.consigneeCity;
    // this.userData.classWeight = this.pricingDetail;
    this.userData.ratingNotes = this.customerData;
    this.userData.userType = this.customerType;
    this.userData.viewType = 'externalCustomer';
    this.userData.companyId = this.companyId;
    let accessorialsName;
    this.combiningArray();
    newArrayForShipment = this.combiningAllShipmentsArray;
    console.log('this.selectedItems', this.selectedItems, this.selectedItemValue);
    console.log('newArrayForShipment', newArrayForShipment);
    let classValue, objectForRate;
    this.selectedItems.forEach((ele:any) => {
      if (ele.itemName === 'LiftGate Delivery Requested') {
        ele.id = 1;
      }
    })
    if (newArrayForShipment.length > 0) {
      for (let s = 0; s < newArrayForShipment.length; s++) {
        if (newArrayForShipment[s].bolType !== 'Multi Classed Pallet') {
          if (Number(newArrayForShipment[s].FreightClass) === 77.5) {
            classValue = 77;
          } else if (Number(newArrayForShipment[s].FreightClass) === 92.5) {
            classValue = 92;
          } else {
            classValue = newArrayForShipment[s].FreightClass;
          }
          objectForRate = {
            'weight': Number(newArrayForShipment[s].Weight.Value),
            'classification': classValue
          };
          formatToGetRateShipmentArray.push(objectForRate);
        } else {
          formatArray = this.calculateMultiClassArray();
          console.log('formatArray insiide', formatArray);
          if (formatArray.length > 0) {
            // for (let f = 0; f < formatArray.length; f++) {
            formatToGetRateShipmentArray = formatArray;
            // }
          }
        }
        this.userData.classWeight = formatToGetRateShipmentArray;
        console.log('formatToGetRateShipmentArray', formatToGetRateShipmentArray);
      }
    }

    if (this.selectedItems.length > 0) {
      console.log('this.selectedItems 1', this.selectedItems);
      for (let s = 0; s < this.selectedItems.length; s++) {
        console.log('this.selectedItems 2', this.selectedItems[s], s);
        accessorialsName = this.selectedItems[s].itemName;
        console.log('this.selectedItems 3', accessorialsName);
        this.accessorials.push(accessorialsName);
        console.log('this.accessorials request', this.accessorials);
      }
    }
    // this.selectedItems = this.accessorials;
    // console.log('this.accessorials request', this.selectedItems);
    this.customer = billOfLading.shipperCompanyName;
    this.lengthOfDetailArray = 0;
    this.userData.customerId = this.customerId;
    this.userData.selectedItems = this.selectedItems;
  }



  getRate(billOfLading:any) {
    // console.log('service type', billOfLading.controls.serviceType);
    console.log('getRate(billOfLading)', billOfLading);
    this.showLoader = true;
    this.serviceNotAvailableMsg = false;
    this.errorResponseInGetRate = false;
    this.showAdminErrorMessage = false;
    this.getRateMsg = false;
    this.showIfNoRule = false;
    this.rateErrorResponse = false;
    this.createStoreFlag = true;
    this.showErrorMsgForGetRate = false;
    this.higherValueAp = false;
    this.pricingInformation = {};
    this.getAllDetails(billOfLading);

    console.log('this.userData', this.userData);
    this.billOfLading.patchValue({
      rate: ''
    });
    let AccessArray:any = [];
    if (this.selectedItems.length > 0) {
      this.selectedItems.forEach((ele:any) => {
        if (ele.itemName === 'LiftGate Pickup Requested') {
          AccessArray.push('LiftGate PickUp');
        } else if (ele.itemName === 'LiftGate Delivery Requested') {
          AccessArray.push('LiftGate Delivery');
        } else {
          AccessArray.push(ele.itemName);

        }
      });
    }
    this.userData.accessorials = AccessArray;
    console.log(billOfLading.serviceType);
    if (billOfLading.serviceType === 'FXFE') {
      billOfLading.serviceType = 'FEDEX_FREIGHT_ECONOMY';
    } else if (billOfLading.serviceType === 'FXFP') {
      billOfLading.serviceType = 'FEDEX_FREIGHT_PRIORITY';
    }
    console.log(billOfLading.serviceType);
    if (billOfLading.serviceType === 'FEDEX_FREIGHT_ECONOMY') {
      this.userData.carrierName = 'FEDEX ECONOMY';
      this.userData.carrier = 'FEDEX ECONOMY';
      this.pricingInfoService.getRates(this.userData, 'FEDEX AP').subscribe((response:any) => {
        console.log('FEDEX AP', response);
        if (Object.keys(response.result).length === 0 || response.result === undefined) {
          this.showLoader = false;
        } else if (response.result === 'Destination Base Zip Not Found' || response.result === 'Origin Base Zip Not Found') {
          this.errorResponse = response.result;
          this.showLoader = false;
          this.rateErrorResponse = true;
          this.createStoreFlag = false;
          if (this.userData.originState === 'AK' || this.userData.destinationState === 'AK' || this.userData.originState === 'HI' || this.userData.destinationState === 'HI') {
            this.showEnteringForm = true;
          }
        } else {
          this.rateCalculationForFedex(response, this.userData.carrierName, 'AP', 'AP');
          this.responseDataForRate = response;
          if (this.applyCostFactor === true) {
            this.getFedexForCostPlus();
          }
        }
      }, (err:any) => {
        this.showLoader = false;
        this.errorResponseInGetRate = true;
        this.logger = { 'method': 'getRates', 'message': 'FEDEX AP Error response', 'status': err.status };
        this.loggerService.error(this.logger);
        if (err.status === 0) {
        } else {
        }
      });
      if (this.applyCostFactor === false) {
        this.pricingInfoService.getRates(this.userData, 'FEDEX AR').subscribe((response:any) => {
          console.log('NEW FEDEX AR', response);
          if (Object.keys(response.result).length === 0 || response.result === undefined) {
            this.showLoader = false;
          } else {
            if (response.result === 'No Rules') {
              this.showLoader = false;
              this.showIfNoRule = true;
              this.createStoreFlag = false;
            } else if (response.result === 'Destination Base Zip Not Found' || response.result === 'Origin Base Zip Not Found') {
              this.errorResponse = response.result;
              this.showLoader = false;
              this.rateErrorResponse = true;
              this.createStoreFlag = false;
              if (this.userData.originState === 'AK' || this.userData.destinationState === 'AK' || this.userData.originState === 'HI' || this.userData.destinationState === 'HI') {
                this.showEnteringForm = true;
              }
            } else {
              this.rateCalculationForFedex(response, this.userData.carrierName, 'AR', 'AR');
            }
          }
        }, (err:any) => {
          this.showLoader = false;
        });
      }
    } else if (billOfLading.serviceType === 'FEDEX_FREIGHT_PRIORITY') {
      this.userData.carrierName = 'FEDEX PRIORITY';
      this.userData.carrier = 'FEDEX PRIORITY';
      this.pricingInfoService.getRates(this.userData, 'FEDEX AP').subscribe((response:any) => {
        if (Object.keys(response.result).length === 0 || response.result === undefined) {
          this.showLoader = false;
        } else if (response.result === 'Destination Base Zip Not Found' || response.result === 'Origin Base Zip Not Found') {
          this.errorResponse = response.result;
          this.showLoader = false;
          this.rateErrorResponse = true;
          this.createStoreFlag = false;
          if (this.userData.originState === 'AK' || this.userData.destinationState === 'AK' || this.userData.originState === 'HI' || this.userData.destinationState === 'HI') {
            this.showEnteringForm = true;
          }
        } else {
          this.rateCalculationForFedex(response, this.userData.carrierName, 'AP', 'AP');
          this.responseDataForRate = response;
          if (this.applyCostFactor === true) {
            this.getFedexForCostPlus();
          }
        }
      }, (err:any) => {
        this.showLoader = false;
        this.errorResponseInGetRate = true;
        this.logger = { 'method': 'getRates', 'message': 'FEDEX AP Error response', 'status': err.status };
        this.loggerService.error(this.logger);
        if (err.status === 0) {
        } else {
        }
      });
      if (this.applyCostFactor === false) {
        this.pricingInfoService.getRates(this.userData, 'FEDEX AR').subscribe((response:any) => {
          if (Object.keys(response.result).length === 0 || response.result === undefined) {
            this.showLoader = false;
          } else {
            if (response.result === 'No Rules') {
              this.showLoader = false;
              this.showIfNoRule = true;
              this.createStoreFlag = false;
            } else if (response.result === 'Destination Base Zip Not Found' || response.result === 'Origin Base Zip Not Found') {
              this.errorResponse = response.result;
              this.showLoader = false;
              this.rateErrorResponse = true;
              this.createStoreFlag = false;
              if (this.userData.originState === 'AK' || this.userData.destinationState === 'AK' || this.userData.originState === 'HI' || this.userData.destinationState === 'HI') {
                this.showEnteringForm = true;
              }
            } else {
              this.rateCalculationForFedex(response, this.userData.carrierName, 'AR', 'AR');
            }
          }
        }, (err:any) => {
          this.showLoader = false;
          this.errorResponseInGetRate = true;
          this.logger = { 'method': 'getRates', 'message': 'FEDEX AR Error response', 'status': err.status };
        });
      }
    } else if (billOfLading.serviceType === 'YRC') {
      this.userData.carrierName = 'YRC';
      this.userData.carrier = 'YRC';
      this.pricingInfoService.getRates(this.userData, 'YRC OLDAP').subscribe((response:any) => {
        if (Object.keys(response.result).length === 0 || response.result === undefined) {
          this.showLoader = false;
        } else if (response.result === 'Destination Base Zip Not Found' || response.result === 'Origin Base Zip Not Found') {
          this.errorResponse = response.result;
          this.showLoader = false;
          this.rateErrorResponse = true;
          this.createStoreFlag = false;
          if (this.userData.originState === 'AK' || this.userData.destinationState === 'AK' || this.userData.originState === 'HI' || this.userData.destinationState === 'HI') {
            this.showEnteringForm = true;
          }
        } else {
          this.responseDataForRate = response;
          this.rateCalculationForYRCReddaway2(response, 'YRC', 'AP', 'AP');
          // if (this.applyCostFactor === true) {
          //   this.getYRCForCostPlus();
          // }
        }
      }, (err:any) => {
        this.logger = { 'method': 'getRates', 'message': 'YRC AP Error response', 'status': err.status };
        this.loggerService.error(this.logger);
        this.showLoader = false;
        this.errorResponseInGetRate = true;
        if (err.status === 0) {
        }
      });
      this.pricingInfoService.getRates(this.userData, 'YRC AP').subscribe((response:any) => {
        if (Object.keys(response.result).length === 0 || response.result === undefined) {
          this.showLoader = false;
        } else if (response.result === 'Destination Base Zip Not Found' || response.result === 'Origin Base Zip Not Found') {
          this.errorResponse = response.result;
          this.showLoader = false;
          this.rateErrorResponse = true;
          this.createStoreFlag = false;
          if (this.userData.originState === 'AK' || this.userData.destinationState === 'AK' || this.userData.originState === 'HI' || this.userData.destinationState === 'HI') {
            this.showEnteringForm = true;
          }
        } else {
          this.responseDataForRate = response;
          this.rateCalculationForYRCReddaway1(response, 'YRC', 'AP', 'AP');
          if (this.applyCostFactor === true) {
            this.getYRCForCostPlus();
          }
        }
      }, (err:any) => {
        this.logger = { 'method': 'getRates', 'message': 'YRC AP Error response', 'status': err.status };
        this.loggerService.error(this.logger);
        this.showLoader = false;
        this.errorResponseInGetRate = true;
        if (err.status === 0) {
        }
      });
      if (this.applyCostFactor === false) {
        this.pricingInfoService.getRates(this.userData, 'YRC AR').subscribe((response:any) => {
          if (Object.keys(response.result).length === 0 || response.result === undefined) {
            this.showLoader = false;
          } else {
            if (response.result === 'No Rules') {
              this.showLoader = false;
              this.showIfNoRule = true;
              this.createStoreFlag = false;
            } else if (response.result === 'Destination Base Zip Not Found' || response.result === 'Origin Base Zip Not Found') {
              this.errorResponse = response.result;
              this.showLoader = false;
              this.rateErrorResponse = true;
              this.createStoreFlag = false;
              if (this.userData.originState === 'AK' || this.userData.destinationState === 'AK' || this.userData.originState === 'HI' || this.userData.destinationState === 'HI') {
                this.showEnteringForm = true;
              }
            } else {
              this.rateCalculationForYRCReddaway(response, this.userData.carrierName, 'AR', 'AR');
            }
          }
        }, (err:any) => {
          this.showLoader = false;
          this.errorResponseInGetRate = true;
          this.logger = { 'method': 'getRates', 'message': 'YRC AR Error response', 'status': err.status };

        });
      }
    } else {
      this.userData.carrierName = 'REDDAWAY';
      this.userData.carrier = 'REDDAWAY';
      this.pricingInfoService.getRatesnew(this.userData, 'REDDAWAY AP').subscribe((response:any) => {
        if (Object.keys(response.result).length === 0 || response.result === undefined) {

        } else {
          if (response.result === 'service not available') {
            this.showLoader = false;
            this.serviceNotAvailableMsg = true;
            this.createStoreFlag = false;
            this.pricingInfoService.reddawayMail(this.userData, this.accessToken).subscribe((mailResponse:any) => {
              if (mailResponse.result === 'true') {
              }
            });
          } else if (response.result === 'Destination Base Zip Not Found' || response.result === 'Origin Base Zip Not Found') {
            this.errorResponse = response.result;
            this.showLoader = false;
            this.rateErrorResponse = true;
            this.createStoreFlag = false;
            if (this.userData.originState === 'AK' || this.userData.destinationState === 'AK' || this.userData.originState === 'HI' || this.userData.destinationState === 'HI') {
              this.showEnteringForm = true;
            }
          } else {
            this.responseDataForRate = response;
            this.rateCalculationForYRCReddaway1(response, 'REDDAWAY', 'AP', 'AP');
            if (this.applyCostFactor === true) {
              this.getReddawayForCostPlus();
            }
          }
        }
      }, (err:any) => {
        this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AP Error response', 'status': err.status };
        this.loggerService.error(this.logger);
        this.showLoader = false;
        this.errorResponseInGetRate = true;
      });
      this.pricingInfoService.getRates(this.userData, 'REDDAWAY OLDAP').subscribe((response:any) => {
        if (Object.keys(response.result).length === 0 || response.result === undefined) {

        } else {
          if (response.result === 'service not available') {
            this.showLoader = false;
            this.serviceNotAvailableMsg = true;
            this.createStoreFlag = false;
            this.pricingInfoService.reddawayMail(this.userData, this.accessToken).subscribe((mailResponse:any) => {
              if (mailResponse.result === 'true') {
              }
            });
          }  else if (response.result === 'Destination Base Zip Not Found' || response.result === 'Origin Base Zip Not Found') {	
            this.errorResponse = response.result;	
            this.showLoader = false;	
            this.rateErrorResponse = true;	
            this.createStoreFlag = false;	
            if(this.userData.originState === 'AK' || this.userData.destinationState === 'AK' || this.userData.originState === 'HI' || this.userData.destinationState === 'HI') {	
              this.showEnteringForm = true;	
            }	
          } else {
            this.responseDataForRate = response;
            this.rateCalculationForYRCReddaway2(response, 'REDDAWAY', 'AP', 'AP');
            if (this.applyCostFactor === true) {
              this.getReddawayForCostPlus();
            }
          }
        }
      }, (err:any) => {
        this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AP Error response', 'status': err.status };
        this.loggerService.error(this.logger);
        this.showLoader = false;
        this.errorResponseInGetRate = true;
      });
      if (this.applyCostFactor === false) {
        this.pricingInfoService.getRates(this.userData, 'REDDAWAY AR').subscribe((response:any) => {
          if (Object.keys(response.result).length === 0 || response.result === undefined) {
            this.showLoader = false;
          } else {
            if (response.result === 'service not available') {
              this.showLoader = false;
              this.serviceNotAvailableMsg = true;
              this.createStoreFlag = false;
              this.pricingInfoService.reddawayMail(this.userData, this.accessToken).subscribe((mailResponse:any) => {
                if (mailResponse.result === 'true') {
                }
              });
            } else if (response.result === 'Destination Base Zip Not Found' || response.result === 'Origin Base Zip Not Found') {
              this.errorResponse = response.result;
              this.showLoader = false;
              this.rateErrorResponse = true;
              this.createStoreFlag = false;
              if (this.userData.originState === 'AK' || this.userData.destinationState === 'AK' || this.userData.originState === 'HI' || this.userData.destinationState === 'HI') {
                this.showEnteringForm = true;
              }
            } else {
              if (response.result === 'No Rules') {
                this.showLoader = false;
                this.showIfNoRule = true;
                this.createStoreFlag = false;
              } else {
                this.serviceNotAvailableMsg = false;
                this.rateCalculationForYRCReddaway(response, this.userData.carrierName, 'AR', 'AR');
              }
            }
          }
        }, (err:any) => {
          this.showLoader = false;
          this.errorResponseInGetRate = true;
          this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AR Error response', 'status': err.status };

        });
      }
    }
  }
  getFedexForCostPlus() {
    this.pricingInfoService.getAdditionalRateForFedex(this.userData.destination, this.accessToken).subscribe((response:any) => {
      this.highCostForFedex = response.result;
      if (this.highCostForFedex !== 0) {
        this.highCostForFedex = this.highCostForFedex + '.00'
      } else {
        this.highCostForFedex = 0;
      }
    });
    this.pricingInfoService.getSingleShipment(this.userData).subscribe((data:any) => {
      this.getARRule = data.result;
      this.rateCalculationForFedex(this.responseDataForRate, this.userData.carrierName, 'AP', 'COSTPLUS');
    }, (err:any) => {
      this.getARRule = [];
      this.rateCalculationForFedex(this.responseDataForRate, this.userData.carrierName, 'AP', 'COSTPLUS');
    });
  }
  getYRCForCostPlus() {
    this.pricingInfoService.getSingleShipment(this.userData).subscribe((data:any) => {
      this.getARRule = data.result;
      this.rateCalculationForYRCReddawayCostplusNew(this.responseDataForRate, 'YRC', 'AP', 'COSTPLUS');
    }, (err:any) => {
      this.getARRule = [];
      this.rateCalculationForYRCReddawayCostplusNew(this.responseDataForRate, 'YRC', 'AP', 'COSTPLUS');
    });
  }

  // getYRCForCostPlus1() {
  //   this.pricingInfoService.getSingleShipment(this.userData).subscribe(data => {
  //     this.getARRule = data.result;
  //     this.rateCalculationForYRCReddaway1(this.responseDataForRate, 'YRC', 'AP', 'COSTPLUS');
  //   }, err => {
  //     this.getARRule = [];
  //     this.rateCalculationForYRCReddaway1(this.responseDataForRate, 'YRC', 'AP', 'COSTPLUS');
  //   });
  //   // this.rateCalculationForYRCReddaway2(this.responseForYRCAp, 'YRC', 'AP', 'COSTPLUS');
  // }
  getReddawayForCostPlus() {
    this.pricingInfoService.getSingleShipment(this.userData).subscribe((data:any) => {
      this.getARRule = data.result;
      this.rateCalculationForYRCReddawayCostplusNew(this.responseDataForRate, 'REDDAWAY', 'AP', 'COSTPLUS');
    }, (err:any) => {
      this.getARRule = [];
      this.rateCalculationForYRCReddawayCostplusNew(this.responseDataForRate, 'REDDAWAY', 'AP', 'COSTPLUS');
    });
  }
  // rateCalculationForYRCReddaway(response, carrierType, category, factoring) {
  //   let date = new Date();
  //   let discount, fuelSurcharge, rateId, amc, highCost, addCACharge, addRate, discountedRate,
  //     addSingleShipmentCharge, minimumClass, totalAssessorialCharge, assessorialCharge, customerBusinessRule = [],
  //     assessorialChargeArray = [], profileAssessorials = [];
  //   const weightArray = [], classificationArray = [], classification1 = [], finalRateArray = [],
  //     discountedRateArray = [],
  //     netChargeArray = [], netChargeResultArray = [], totalChargeArray = [];
  //   const finalRate = [], rate = [], crtRateArray = [], fuelSurchargeArray = [];
  //   const diffFinalRateArray = [], diffRateArray = [], discountArray = [], diffWeightArray = [];
  //   let profileMinimumCharge, profileLifeGateCharge, profileResidentialCharge, profileLimitedAccessDelivery,
  //     profileInsideDelivery, profileNotify, profileSingleShipment, singleShipmentsetMasterData,profiledeliveryAppointmentRequired,profilehazmat, profileLiftGatePickupCharge,profileResidentialPickupcharge,profilelimitedpickup;
  //   this.parseSetMasterData = [];
  //   this.pricingInformation = {};
  //   let finalRateCal;
  //   let currentFinalRate, currentRate, currentDwRate, currentFinalDwRate;
  //   this.showDirections = '';
  //   this.showSingleShipmentValue = false;
  //   this.showDeficitValue = false;
  //   this.showMinimumCharge = false;
  //   this.arrayData = [];
  //   let discountedRateCalculation;
  //   let staticData = localStorage.getItem('artableData');
  //   this.localStorageArData = JSON.parse(staticData);
  //   if (category === 'AP') {
  //     /*set master data discount, minimum charge values which is stored in local storage */
  //     const setMasterData = localStorage.getItem('aptableData');
  //     this.parseSetMasterData = JSON.parse(setMasterData);
  //     if (carrierType === 'YRC') {
  //       if (Object.keys(response.result.yrcProfileRateAp).length === 0 || response.result.yrcProfileRateAp === {}) {
  //         customerBusinessRule = [];
  //       } else {
  //         if (response.result.yrcProfileRateAp.liftGateService !== undefined) {
  //           customerBusinessRule.push(response.result.yrcProfileRateAp);
  //         } else {
  //           response.result.yrcProfileRateAp.liftGateService = '';
  //           response.result.yrcProfileRateAp.residentialDelivery = '';
  //           response.result.yrcProfileRateAp.limitedAccessDelivery = '';
  //           response.result.yrcProfileRateAp.insideDelivery = '';
  //           response.result.yrcProfileRateAp.notify = '';
  //           response.result.yrcProfileRateAp.singleShipment = '';
  //           response.result.yrcProfileRateAp.deliveryAppointmentRequired = '';
  //           response.result.yrcProfileRateAp.hazmat = '';
  //           customerBusinessRule.push(response.result.yrcProfileRateAp);
  //         }
  //       }
  //       /*
  //  check the origin state and destination state for 'CA' add 8.50 for YRC alone
  //   */
  //     } else {
  //       customerBusinessRule = response.result.reddawayProfileRateAp;
  //     }
  //   } else {
  //     /*set master data discount, minimum charge values which is stored in local storage */
  //     const setMasterData = localStorage.getItem('artableData');
  //     this.parseSetMasterData = JSON.parse(setMasterData);
  //     /*Customer specific rules*/
  //     if (carrierType === 'YRC') {
  //       customerBusinessRule = response.result.yrcProfileRateAr;
  //       if (customerBusinessRule.length > 0) {
  //         for (let c = 0; c < customerBusinessRule.length; c++) {
  //           if (customerBusinessRule[c].liftGateService !== undefined) {
  //           } else {
  //             customerBusinessRule[c].liftGateService = '';
  //             customerBusinessRule[c].residentialDelivery = '';
  //             customerBusinessRule[c].limitedAccessDelivery = '';
  //             customerBusinessRule[c].insideDelivery = '';
  //             customerBusinessRule[c].notify = '';
  //             customerBusinessRule[c].singleShipment = '';
  //             customerBusinessRule[c].deliveryAppointmentRequired = '';
  //             customerBusinessRule[c].hazmat = '';

  //           }
  //         }
  //       } else {

  //       }
  //       /*
  //  check the origin state and destination state for 'CA' add 8.50 for YRC alone
  //   */
  //     } else {
  //       customerBusinessRule = response.result.reddawayProfileRateAr;
  //     }
  //   }
  //   if (factoring !== 'COSTPLUS') {
  //     for (let i = 0; i < this.parseSetMasterData.length; i++) {
  //       if (this.parseSetMasterData[i].companyName === carrierType) {
  //         discount = this.parseSetMasterData[i].discount;
  //         fuelSurcharge = this.parseSetMasterData[i].fuelsurcharge;
  //         rateId = this.parseSetMasterData[i].recentRateId;
  //         amc = this.parseSetMasterData[i].amc;
  //         if (this.parseSetMasterData[i].assessorials !== undefined) {
  //           this.parseSetMasterData.assessorials = JSON.parse(this.parseSetMasterData[i].assessorials);
  //           if (this.parseSetMasterData.assessorials.length > 0) {
  //             for (let i = 0; i < this.parseSetMasterData.assessorials.length; i++) {
  //               if (this.parseSetMasterData.assessorials[i].name === 'Single Shipment') {
  //                 singleShipmentsetMasterData = this.parseSetMasterData.assessorials[i];
  //                 break;
  //               } else {
  //                 singleShipmentsetMasterData = '';
  //               }
  //             }
  //           }
  //         } else {
  //           // this.parseSetMasterData.assessorials = [];
  //         }
  //         // this.parseSetMasterData.assessorials = JSON.parse(this.parseSetMasterData[i].assessorials);
  //         if (this.userData.originState === 'CA' || this.userData.destinationState === 'CA') {
  //           if (this.parseSetMasterData[i].caCharge !== '' && this.parseSetMasterData[i].caCharge !== null && this.parseSetMasterData[i].caCharge !== undefined) {
  //             addCACharge = Number(this.parseSetMasterData[i].caCharge);
  //           } else {
  //             addCACharge = 0;
  //           }
  //         } else {
  //           addCACharge = 0;
  //         }
  //       }
  //     }
  //   } else {
  //     for (let apData = 0; apData < this.parseSetMasterData.length; apData++) {
  //       if (this.parseSetMasterData[apData].companyName === carrierType) {
  //         discount = this.parseSetMasterData[apData].discount;
  //         fuelSurcharge = this.parseSetMasterData[apData].fuelsurcharge;
  //         rateId = this.parseSetMasterData[apData].recentRateId;
  //         amc = this.parseSetMasterData[apData].amc;
  //       }
  //     }
  //     for (let i = 0; i < this.localStorageArData.length; i++) {
  //       if (this.localStorageArData[i].companyName === carrierType) {
  //         this.localStorageArData.assessorials = JSON.parse(this.localStorageArData[i].assessorials);
  //         if (this.localStorageArData.assessorials.length > 0) {
  //           for (let i = 0; i < this.localStorageArData.assessorials.length; i++) {
  //             if (this.localStorageArData.assessorials[i].name === 'Single Shipment') {
  //               singleShipmentsetMasterData = this.localStorageArData.assessorials[i];
  //               break;
  //             } else {
  //               singleShipmentsetMasterData = '';
  //             }
  //           }
  //         }
  //         if (this.originState === 'CA' || this.destinationState === 'CA') {
  //           if (this.localStorageArData[i].caCharge !== '' && this.localStorageArData[i].caCharge !== null && this.localStorageArData[i].caCharge !== undefined) {
  //             addCACharge = this.localStorageArData[i].caCharge;
  //           } else {
  //             addCACharge = 0;
  //           }
  //         } else {
  //           addCACharge = 0;
  //         }
  //       }
  //     }
  //   }
  //   for (let i = 0; i < response.result.classWeight.length; i++) {
  //     const weight = response.result.classWeight[i].weight;
  //     weightArray.push(weight);
  //     const classification = response.result.classWeight[i].classification;
  //     classificationArray.push(classification);
  //     classification1.push(classification);
  //   }
  //   this.weightForCal = this.netChargeArrSum(weightArray);
  //   /*Both the additional rate and additional min rate is given */
  //   /*AdditionalMinRate => additinalRate*totalWeight/100*/
  //   if (carrierType === 'YRC') {
  //     if (response.result.additionalMinRate !== 0) {
  //       const additionalRateCalculation = (Number(response.result.additionalRate) * (this.weightForCal / 100));
  //       if (Number(additionalRateCalculation) < Number(response.result.additionalMinRate)) {
  //         highCost = Number(response.result.additionalMinRate);
  //       } else {
  //         highCost = Number(additionalRateCalculation).toFixed(2);
  //       }
  //     } else {
  //       /*AdditionalMinRate is zero and additional rate is given*/
  //       if (response.result.additionalRate !== 0) {
  //         highCost = Number(response.result.additionalRate);
  //       } else {
  //         highCost = 0;
  //       }
  //     }
  //   } else {
  //     if (Number(response.result.additionalMaxRate) !== 0) {
  //       const additionalRateCalculation = (Number(response.result.additionalRate) * (this.weightForCal / 100));
  //       if (Number(additionalRateCalculation) < Number(response.result.additionalMinRate)) {
  //         highCost = Number(response.result.additionalMinRate);
  //       } else if (Number(additionalRateCalculation) > Number(response.result.additionalMaxRate)) {
  //         highCost = Number(response.result.additionalMaxRate);
  //       } else {
  //         highCost = Number(additionalRateCalculation).toFixed(2);
  //       }
  //     } else {
  //       if (Number(response.result.additionalRate) !== 0) {
  //         highCost = Number(response.result.additionalRate);
  //       } else {
  //         highCost = 0;
  //       }
  //     }
  //     console.log('reddaway highcost', highCost);
  //   }
  //   /* If Customer Business rule is given discount, minCharge is taken,
  //   Else part shipTypes is direct setmaster data values are taken,
  //   shipTypes is non-direct discount is 0 zero
  //    */
  //   if (customerBusinessRule.length > 0) {
  //     for (let pr = 0; pr < customerBusinessRule.length; pr++) {
  //       this.showDirections = response.result.shipTypes;
  //       discount = customerBusinessRule[pr].profileDiscount;
  //       fuelSurcharge = fuelSurcharge;
  //       if (customerBusinessRule[pr].profileMinCharge !== undefined) {
  //         profileMinimumCharge = customerBusinessRule[pr].profileMinCharge;
  //       } else {
  //         profileMinimumCharge = amc;
  //       }
  //       if (factoring !== 'COSTPLUS') {
  //         profileLifeGateCharge = customerBusinessRule[pr].liftGateService;
  //         profileResidentialCharge = customerBusinessRule[pr].residentialDelivery;
  //         profileLimitedAccessDelivery = customerBusinessRule[pr].limitedAccessDelivery;
  //         profileInsideDelivery = customerBusinessRule[pr].insideDelivery;
  //         profileNotify = customerBusinessRule[pr].notify;
  //         profileSingleShipment = customerBusinessRule[pr].singleShipment;
  //         profiledeliveryAppointmentRequired = customerBusinessRule[pr].deliveryAppointmentRequired;
  //         profilehazmat = customerBusinessRule[pr].hazmat;
  //         profileLiftGatePickupCharge = customerBusinessRule[pr].liftGateService;
  //         profileResidentialPickupcharge = customerBusinessRule[pr].residentialDelivery;         
  //        profilelimitedpickup = customerBusinessRule[pr].limitedAccessDelivery;
  //         profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
  //           { residential: profileResidentialCharge, id: 2 },
  //           { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
  //           { insideDelivery: profileInsideDelivery, id: 4 },
  //           { notify: profileNotify, id: 5 },
  //           {deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id: 7},
  //           {hazmat: profilehazmat, id: 8},
  //           {liftGatePickup: profileLiftGatePickupCharge,'id': 10 },
  //             {residentialPickup: profileResidentialPickupcharge, 'id':11},
  //             {limitedaccesspickup: profilelimitedpickup,'id': 12});
  //       } else {
  //         if (this.getARRule.length > 0) {
  //           profileLifeGateCharge = this.getARRule[0].liftGateService;
  //           profileResidentialCharge = this.getARRule[0].residentialDelivery;
  //           profileLimitedAccessDelivery = this.getARRule[0].limitedAccessDelivery;
  //           profileInsideDelivery = this.getARRule[0].insideDelivery;
  //           profileNotify = this.getARRule[0].notify;
  //           profileSingleShipment = this.getARRule[0].singleShipment;
  //           profiledeliveryAppointmentRequired = this.getARRule[0].deliveryAppointmentRequired;
  //           profilehazmat = this.getARRule[0].hazmat;
  //           profileLiftGatePickupCharge = this.getARRule[0].liftGateService;
  //           profileResidentialPickupcharge = this.getARRule[0].residentialDelivery;         
  //          profilelimitedpickup = this.getARRule[0].limitedAccessDelivery;

  //           profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
  //             { residential: profileResidentialCharge, id: 2 },
  //             { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
  //             { insideDelivery: profileInsideDelivery, id: 4 },
  //             { notify: profileNotify, id: 5 },
  //             { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id: 7},
  //             {hazmat: profilehazmat, id: 8},
  //             {liftGatePickup: profileLiftGatePickupCharge,'id': 10 },
  //             {residentialPickup: profileResidentialPickupcharge, 'id':11},
  //             {limitedaccesspickup: profilelimitedpickup,'id': 12});
  //         } else {
  //           profileAssessorials.push({ liftGate: '', 'id': 1 },
  //             { residential: '', 'id': 2 },
  //             { limitedAccessDelivery: '', 'id': 3 },
  //             { insideDelivery: '', id: 4 },
  //             { notify: '', 'id': 5 },
  //             {deliveryAppointmentRequired: '', 'id': 7},
  //             {hazmat: '', 'id': 8},
  //             {liftGatePickup: '','id': 10 },
  //             {residentialPickup: '', 'id':11},
  //             {limitedaccesspickup: '','id': 12});
  //         }
  //       }
  //     }
  //   } else {
  //     if (response.result.shipTypes === 'Direct') {
  //       this.showDirections = 'Direct';
  //       discount = discount;
  //       fuelSurcharge = fuelSurcharge;
  //     } else {
  //       this.showDirections = 'Non-Direct';
  //       if (carrierType === 'YRC') {
  //         discount = 80;
  //       } else {
  //         discount = 0;
  //       }
  //       fuelSurcharge = fuelSurcharge;
  //     }
  //     if (factoring === 'COSTPLUS') {
  //       if (this.getARRule.length > 0) {
  //         profileLifeGateCharge = this.getARRule[0].liftGateService;
  //         profileResidentialCharge = this.getARRule[0].residentialDelivery;
  //         profileLimitedAccessDelivery = this.getARRule[0].limitedAccessDelivery;
  //         profileInsideDelivery = this.getARRule[0].insideDelivery;
  //         profileNotify = this.getARRule[0].notify;
  //         profileSingleShipment = this.getARRule[0].singleShipment;
  //         profiledeliveryAppointmentRequired = this.getARRule[0].deliveryAppointmentRequired;
  //         profilehazmat = this.getARRule[0].hazmat;
  //         profileLiftGatePickupCharge = this.getARRule[0].liftGateService;
  //         profileResidentialPickupcharge = this.getARRule[0].residentialDelivery;         
  //        profilelimitedpickup = this.getARRule[0].limitedAccessDelivery;
  //         profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
  //           { residential: profileResidentialCharge, id: 2 },
  //           { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
  //           { insideDelivery: profileInsideDelivery, id: 4 },
  //           { notify: profileNotify, id: 5 },
  //           { deliveryAppointmentRequired: profiledeliveryAppointmentRequired , id: 7},
  //           { hazmat: profilehazmat, id: 8},
  //           {liftGatePickup: profileLiftGatePickupCharge,'id': 10 },
  //           {residentialPickup: profileResidentialPickupcharge, 'id':11},
  //           {limitedaccesspickup: profilelimitedpickup,'id': 12});
  //       } else {
  //         profileAssessorials.push({ liftGate: '', 'id': 1 },
  //           { residential: '', 'id': 2 },
  //           { limitedAccessDelivery: '', 'id': 3 },
  //           { insideDelivery: '', id: 4 },
  //           { notify: '', 'id': 5 },
  //           {deliveryAppointmentRequired: '', 'id': 7},
  //           { hazmat: '', 'id':8},
  //           {liftGatePickup: '','id': 10 },
  //             {residentialPickup: '', 'id':11},
  //             {limitedaccesspickup: '','id': 12});
  //       }
  //     } else {
  //       profileAssessorials.push({ liftGate: '', 'id': 1 },
  //         { residential: '', 'id': 2 },
  //         { limitedAccessDelivery: '', 'id': 3 },
  //         { insideDelivery: '', id: 4 },
  //         { notify: '', 'id': 5 },
  //         { deliveryAppointmentRequired: '', 'id': 7},
  //         { hazmat: '', 'id':8},
  //         {liftGatePickup: '','id': 10 },
  //             {residentialPickup: '', 'id':11},
  //             {limitedaccesspickup: '','id': 12});
  //     }
  //   }
  //   discountArray.push(discount);
  //   fuelSurchargeArray.push(fuelSurcharge);
  //   if (carrierType === 'YRC') {
  //     if (this.weightForCal < 500) {
  //       if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
  //         addSingleShipmentCharge = Number(profileSingleShipment);
  //       } else {
  //         if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
  //           addSingleShipmentCharge = Number(singleShipmentsetMasterData.cost);
  //         } else {
  //           addSingleShipmentCharge = 0;
  //         }
  //       }
  //     } else {
  //       addSingleShipmentCharge = 0;
  //     }
  //   } else {
  //     if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
  //       addSingleShipmentCharge = Number(profileSingleShipment);
  //     } else {
  //       if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
  //         addSingleShipmentCharge = Number(singleShipmentsetMasterData.cost);
  //       } else {
  //         addSingleShipmentCharge = 0;
  //       }
  //     }
  //   }
  //   /*
  //   check the type is Rate or DwRate
  //    */
  //   if (response.result.type === 'Rate') {
  //     console.log('YRC rate 1', response.result.rate);
  //     for (let i = 0; i < response.result.rate.length; i++) {
  //       if (category === 'AR') {
  //         finalRateCal = Number(response.result.rate[i].finalRate) * this.increasedValueForAR;
  //       } else {
  //         finalRateCal = Number(response.result.rate[i].finalRate);
  //       }
  //       finalRateArray.push(finalRateCal.toFixed(2));
  //       console.log('YRC rate 2', finalRateArray);
  //     }
  //   } else {
  //     for (let i = 0; i < response.result.rate.length; i++) {
  //       if (category === 'AR') {
  //         finalRateCal = Number(response.result.rate[i].finalDWRate) * this.increasedValueForAR;
  //       } else {
  //         finalRateCal = Number(response.result.rate[i].finalDWRate);
  //       }
  //       finalRateArray.push(finalRateCal.toFixed(2));
  //       console.log('YRC rate 3', finalRateArray);
  //     }
  //   }
  //   addRate = this.netChargeArrSum(finalRateArray);
  //   let minCharges;
  //   /*Compare final rate and mincharges if minCharges > final rate (mincharges is taken) if not final rate is taken*/

  //   for (let t = 0; t < response.result.rate.length; t++) {
  //     if (response.result.type === 'Rate') {
  //       if (carrierType === 'YRC') {
  //         if (category === 'AR') {
  //           minCharges = Number(response.result.minCharges) * this.increasedValueForAR;
  //         } else {
  //           minCharges = Number(response.result.minCharges);
  //         }
  //         if (Number(minCharges) > Number(addRate)) {
  //           this.showMinimumCharge = true;
  //           if (category === 'AR') {
  //             currentFinalRate = Number(response.result.minCharges) * this.increasedValueForAR;
  //           } else {
  //             currentFinalRate = Number(response.result.minCharges);
  //           }
  //           finalRate.push(currentFinalRate.toFixed(2));
  //         } else {
  //           this.showMinimumCharge = false;
  //           if (category === 'AR') {
  //             currentFinalRate = Number(response.result.rate[t].finalRate) * this.increasedValueForAR;
  //           } else {
  //             currentFinalRate = Number(response.result.rate[t].finalRate);
  //             currentRate = Number(response.result.rate[t].rate);
  //           }
  //           finalRate.push(currentFinalRate.toFixed(2));
  //         }
  //         if (category === 'AR') {
  //           currentRate = Number(response.result.rate[t].rate) * this.increasedValueForAR;
  //         } else {
  //           currentRate = Number(response.result.rate[t].rate);
  //         }
  //         rate.push(currentRate.toFixed(2));
  //       } else {
  //         this.showMinimumCharge = false;
  //         if (category === 'AR') {
  //           currentFinalRate = Number(response.result.rate[t].finalRate) * this.increasedValueForAR;
  //           currentRate = Number(response.result.rate[t].rate) * this.increasedValueForAR;
  //         } else {
  //           currentFinalRate = Number(response.result.rate[t].finalRate);
  //           currentRate = Number(response.result.rate[t].rate);
  //         }
  //         finalRate.push(currentFinalRate.toFixed(2));
  //         rate.push(currentRate.toFixed(2));
  //       }
  //     } else {
  //       /*If part is for YRC => it will check for (mincharges > total final rate) else part reddaway need not check*/
  //       if (carrierType === 'YRC') {
  //         if (category === 'AR') {
  //           minCharges = Number(response.result.minCharges) * this.increasedValueForAR;
  //         } else {
  //           minCharges = Number(response.result.minCharges);
  //         }
  //         if (Number(minCharges) > Number(addRate)) {
  //           this.showMinimumCharge = true;
  //           if (category === 'AR') {
  //             currentFinalRate = Number(response.result.minCharges) * this.increasedValueForAR;
  //           } else {
  //             currentFinalRate = Number(response.result.minCharges);
  //           }
  //           finalRate.push(currentFinalRate.toFixed(2));
  //           this.finalRateCharge = this.netChargeArrSum(finalRate);
  //         } else {
  //           this.showMinimumCharge = false;
  //           if (category === 'AR') {
  //             const currentFinalDwRate = Number(response.result.rate[t].finalDWRate) * this.increasedValueForAR;
  //             finalRate.push(currentFinalDwRate.toFixed(2));
  //           } else {
  //             const currentFinalDwRate = Number(response.result.rate[t].finalDWRate);
  //             finalRate.push(currentFinalDwRate.toFixed(2));
  //           }
  //         }
  //         if (category === 'AR') {
  //           const currentDwRate = Number(response.result.rate[t].DWRate) * this.increasedValueForAR;
  //           rate.push(currentDwRate.toFixed(2));
  //         } else {
  //           const currentDwRate = Number(response.result.rate[t].DWRate);
  //           rate.push(currentDwRate.toFixed(2));
  //         }
  //       } else {
  //         this.showMinimumCharge = false;
  //         if (category === 'AR') {
  //           const currentFinalDwRate = Number(response.result.rate[t].finalDWRate) * this.increasedValueForAR;
  //           finalRate.push(currentFinalDwRate.toFixed(2));
  //           const currentDwRate = Number(response.result.rate[t].DWRate) * this.increasedValueForAR;
  //           rate.push(currentDwRate.toFixed(2));
  //         } else {
  //           const currentFinalDwRate = Number(response.result.rate[t].finalDWRate);
  //           finalRate.push(currentFinalDwRate.toFixed(2));
  //           const currentDwRate = Number(response.result.rate[t].DWRate);
  //           rate.push(currentDwRate.toFixed(2));
  //         }
  //       }
  //     }
  //   }

  //   this.finalRateCharge = this.netChargeArrSum(finalRate);
  //   console.log('rate Array Calculation', rate, 'finalRate', finalRate);
  //   /*Compare diffRate is given => if it is given deficit value will be taken diffRate, diffFinalRate and crtRate, if not normal rate and final rate is considered */
  //   if (response.result.diffRate === 0 && response.result.diffWeight === 0 && response.result.finalDiffRate === 0 && response.result.crtRate === 0) {
  //     this.showDeficitValue = false;
  //   } else {
  //     this.showDeficitValue = true;
  //     if (category === 'AR') {
  //       const currentDiffRate = Number(response.result.diffRate) * this.increasedValueForAR;
  //       diffRateArray.push(currentDiffRate.toFixed(2));
  //       const currentFinalDiffRate = Number(response.result.finalDiffRate) * this.increasedValueForAR;
  //       diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
  //       const currentCrtRate = Number(response.result.crtRate) * this.increasedValueForAR;
  //       crtRateArray.push(currentCrtRate.toFixed(2));
  //     } else {
  //       const currentDiffRate = Number(response.result.diffRate);
  //       diffRateArray.push(currentDiffRate.toFixed(2));
  //       const currentFinalDiffRate = Number(response.result.finalDiffRate);
  //       diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
  //       const currentCrtRate = Number(response.result.crtRate);
  //       crtRateArray.push(currentCrtRate.toFixed(2));
  //     }
  //     const weight = Number(response.result.diffWeight);
  //     diffWeightArray.push(weight);
  //     this.finalRateCharge = this.finalRateCharge + this.netChargeArrSum(diffRateArray);
  //   }
  //   /*Discounted Rate => finalRate * (1-(discount/100))*/
  //   if (factoring !== 'COSTPLUS') {
  //     discountedRateCalculation = (this.finalRateCharge * (1 - (discount / 100)));
  //   } else {
  //     let discountedRateNewCalculation = (this.finalRateCharge * (1 - (discount / 100)));
  //     discountedRateCalculation = Number(discountedRateNewCalculation) * Number(this.costPlusPercentFactor);
  //   }
  //   // Comparing discounted Rate and the minCharge given in the customer business rules
  //   if (profileMinimumCharge !== undefined && profileMinimumCharge !== '' && profileMinimumCharge !== null) {
  //     if (Number(profileMinimumCharge) > Number(discountedRateCalculation)) {

  //       if (factoring !== 'COSTPLUS') {
  //         discountedRate = Number(profileMinimumCharge);
  //       } else {
  //         discountedRate = (Number(profileMinimumCharge) * Number(this.costPlusPercentFactor)).toFixed(2);
  //         console.log('discounted Rate ProfileMinimum charge 1', discountedRate);
  //       }
  //     } else {
  //       discountedRate = Number(discountedRateCalculation.toFixed(2));
  //     }
  //   } else {
  //     if (amc !== '' && amc !== null && amc !== undefined) {
  //       if (Number(amc) > Number(discountedRateCalculation)) {
  //         if (factoring !== 'COSTPLUS') {
  //           discountedRate = Number(amc);
  //         } else {
  //           discountedRate = (Number(amc) * Number(this.costPlusPercentFactor)).toFixed(2);
  //           console.log('discounted Rate AMC charge 1', discountedRate);
  //         }
  //       } else {
  //         discountedRate = Number(discountedRateCalculation.toFixed(2));
  //       }
  //     } else {
  //       discountedRate = Number(discountedRateCalculation.toFixed(2));
  //     }
  //   }
  //   discountedRateArray.push(discountedRate);
  //   /*Net charge => (1+(fuelSurchareg/100))*discountedRate */
  //   const netCharge = (1 + (fuelSurcharge / 100)) * discountedRate;
  //   netChargeArray.push(netCharge.toFixed(2));
  //   const netChargeResult = ((discountedRate) * (fuelSurcharge / 100));
  //   netChargeResultArray.push(netChargeResult.toFixed(2));
  //   let assessorialUnique = [], uniqueArray = [];
  //   console.log('this.selectedItems before duplicating', this.selectedItems, this.selectedItemValue);
  //   let myClonedArray = Object.assign([], this.selectedItemValue);
  //   console.log('myClonedArray', myClonedArray);
  //   let serviceName;
  //   // myClonedArray = this.getUnique(myClonedArray, 'name');
  //   myClonedArray = this.selectedItems;
  //   console.log('assessorialUnique', myClonedArray);
  //   console.log('assessorialUnique After', myClonedArray);
  //   /* assessorial function => static values if customer rule is given that value will be considered*/
  //   if (factoring !== 'COSTPLUS') {
  //     console.log('this.selectedItems new', this.selectedItems);
  //     assessorialChargeArray = this.pricingInfoService.assessorialFunction(myClonedArray, this.parseSetMasterData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
  //     //  assessorialChargeArray = this.pricingInfoService.assessorialFunction(this.selectedItems, this.parseSetMasterData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
  //   } else {
  //     console.log('this.selectedItems New 2', this.selectedItems);
  //     assessorialChargeArray = this.pricingInfoService.assessorialFunction(myClonedArray, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
  //     //  assessorialChargeArray = this.pricingInfoService.assessorialFunction(this.selectedItems, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
  //   }
  //   assessorialCharge = assessorialChargeArray[0];
  //   this.arrayData = this.pricingInfoService.getAssessorial();
  //   const netChargeValue = this.netChargeArrSum(netChargeArray);
  //   if(carrierType === 'YRC') {
  //     addCACharge = Number(response.result.yrcCaCharge);
  //   } else {
  //     addCACharge = Number(response.result.reddawayCaCharge );

  //   }
  //   console.log(addCACharge);
  //   totalAssessorialCharge = Number(highCost) + Number(addCACharge) + Number(addSingleShipmentCharge) + Number(assessorialCharge);
  //   /*totalCharge => Add netCharge, assessorialCharge, addCACharge, highCost, addSingleShipmentCharge */
  //   const totalCharge = Number(highCost) + Number(addCACharge) + Number(netChargeValue) + Number(addSingleShipmentCharge) + Number(assessorialCharge);
  //   totalChargeArray.push(totalCharge.toFixed(2));
  //   classification1.splice(0, 1);
  //   minimumClass = Math.min(...classificationArray);
  //   const totalChargeForComparing = this.netChargeArrSum(totalChargeArray);
  //   this.pricingInformation = {
  //     rate: rate,
  //     finalRate: finalRate,
  //     discount: discountArray,
  //     fuelChargeYrc: fuelSurchargeArray,
  //     fuelCharge: fuelSurchargeArray,
  //     discountedRate: discountedRateArray,
  //     netCharge: netChargeArray,
  //     totalCharge: totalChargeArray,
  //     fuelChargeDiff: fuelSurcharge,
  //     discountDiff: discount,
  //     weight: weightArray,
  //     classification: classificationArray,
  //     classification1: classification1,
  //     diffWeight: diffWeightArray,
  //     diffRate: diffRateArray,
  //     diffFinalRate: diffFinalRateArray,
  //     crtRate: crtRateArray,
  //     diffDiscountedRate: discountedRateArray,
  //     diffNetCharge: netChargeArray,
  //     assessorialCharge: assessorialCharge,
  //     assessorialChargeValue: totalAssessorialCharge,
  //     assessorialDataList: this.arrayData,
  //     netChargeResult: netChargeResultArray,
  //     netChargeDiffResult: netChargeResultArray,
  //     additionalCharge: addCACharge,
  //     singleShipmentCharge: addSingleShipmentCharge,
  //     highCostDeliveryCharge: highCost,
  //     category: category,
  //     showMinimumCharge: this.showMinimumCharge,
  //     shipTypes: this.showDirections,
  //     carrierType: carrierType,
  //     netChargeValue: netChargeValue,
  //     totalChargeForComparing: totalChargeForComparing,
  //     factor: factoring,
  //     totalWeight: this.weightForCal,
  //     higherValueAp: this.higherValueAp
  //   };
  //   this.resultArray.push(this.pricingInformation);
  //   if (this.resultArray.length > 1) {
  //     this.resultArray.sort(function (a, b) {
  //       return (a.category - b.category);
  //     });
  //     if (this.resultArray[0].category === 'AP') {

  //     } else {
  //       this.resultArray.reverse();
  //     }
  //   }
  //   console.log('this.pricingInformation', this.pricingInformation);
  //   console.log('this.resultArray responses', this.resultArray);
  //   let rateArray = [];
  //   if (this.resultArray.length > 1) {
  //     this.showLoader = false;
  //     if (this.resultArray[1].factor !== 'COSTPLUS') {
  //       if (Number(this.resultArray[0].totalChargeForComparing) > Number(this.resultArray[1].totalChargeForComparing)) {
  //         rateArray.push(this.resultArray[0]);
  //         this.resultArray = [];
  //         this.resultArray = rateArray;
  //         let factorValue = 15;
  //         this.costPlusPercentFactor = 1 + (Number(factorValue) / 100);
  //         this.higherValueAp = true;
  //         if (this.userData.carrier === 'YRC') {
  //           this.getYRCForCostPlus();
  //         } else {
  //           this.getReddawayForCostPlus();
  //         }
  //       } else {
  //         this.giveRateDetails(this.resultArray, 'AR');
  //         this.totalChargeValue = this.netChargeArrSum(this.resultArray[1].totalCharge);
  //         this.factorization = this.resultArray[1].factor;
  //       }
  //     } else {
  //       this.giveRateDetails(this.resultArray, 'AR');
  //       this.totalChargeValue = this.netChargeArrSum(this.resultArray[1].totalCharge);
  //       this.factorization = this.resultArray[1].factor;
  //     }
  //   }
  // }

  rateCalculationForYRCReddaway(response:any, carrierType:any, category:any, factoring:any) {
    let date = new Date();
    let discount:any, fuelSurcharge, rateId, amc, highCost, addCACharge, addRate, discountedRate:any,
      addSingleShipmentCharge, minimumClass, totalAssessorialCharge, assessorialCharge, customerBusinessRule = [],
      assessorialChargeArray = [], profileAssessorials = [];
    const weightArray = [], classificationArray = [], classification1 = [], finalRateArray = [],
      discountedRateArray = [],
      netChargeArray = [], netChargeResultArray = [], totalChargeArray = [];
    const finalRate:any = [], rate = [], crtRateArray = [], fuelSurchargeArray = [];
    const diffFinalRateArray = [], diffRateArray = [], discountArray = [], diffWeightArray = [];
    let profileMinimumCharge, profileLifeGateCharge, profileResidentialCharge, profileLimitedAccessDelivery,
      profileInsideDelivery, profileNotify, profileSingleShipment, singleShipmentsetMasterData, profiledeliveryAppointmentRequired, profilehazmat, profileLiftGatePickupCharge, profileResidentialPickupcharge, profilelimitedpickup;
    this.parseSetMasterData = [];
    this.pricingInformation = {};
    let finalRateCal;
    let currentFinalRate, currentRate, currentDwRate, currentFinalDwRate;
    this.showDirections = '';
    this.showSingleShipmentValue = false;
    this.showDeficitValue = false;
    this.showMinimumCharge = false;
    this.arrayData = [];
    let discountedRateCalculation;
    let staticData:any = localStorage.getItem('artableData');
    this.localStorageArData = JSON.parse(staticData);
    if (category === 'AP') {
      /*set master data discount, minimum charge values which is stored in local storage */
      const setMasterData:any = localStorage.getItem('aptableData');
      this.parseSetMasterData = JSON.parse(setMasterData);
      if (carrierType === 'YRC') {
        if (Object.keys(response.result.yrcProfileRateAp).length === 0 || response.result.yrcProfileRateAp === '') {
          customerBusinessRule = [];
        } else {
          if (response.result.yrcProfileRateAp.liftGateService !== undefined) {
            customerBusinessRule.push(response.result.yrcProfileRateAp);
          } else {
            response.result.yrcProfileRateAp.liftGateService = '';
            response.result.yrcProfileRateAp.residentialDelivery = '';
            response.result.yrcProfileRateAp.limitedAccessDelivery = '';
            response.result.yrcProfileRateAp.insideDelivery = '';
            response.result.yrcProfileRateAp.notify = '';
            response.result.yrcProfileRateAp.singleShipment = '';
            response.result.yrcProfileRateAp.deliveryAppointmentRequired = '';
            response.result.yrcProfileRateAp.hazmat = '';
            customerBusinessRule.push(response.result.yrcProfileRateAp);
          }
        }
        /*
   check the origin state and destination state for 'CA' add 8.50 for YRC alone
    */
      } else {
        customerBusinessRule = response.result.reddawayProfileRateAp;
      }
    } else {
      /*set master data discount, minimum charge values which is stored in local storage */
      const setMasterData:any = localStorage.getItem('artableData');
      this.parseSetMasterData = JSON.parse(setMasterData);
      /*Customer specific rules*/
      if (carrierType === 'YRC') {
        customerBusinessRule = response.result.yrcProfileRateAr;
        if (customerBusinessRule.length > 0) {
          for (let c = 0; c < customerBusinessRule.length; c++) {
            if (customerBusinessRule[c].liftGateService !== undefined) {
            } else {
              customerBusinessRule[c].liftGateService = '';
              customerBusinessRule[c].residentialDelivery = '';
              customerBusinessRule[c].limitedAccessDelivery = '';
              customerBusinessRule[c].insideDelivery = '';
              customerBusinessRule[c].notify = '';
              customerBusinessRule[c].singleShipment = '';
              customerBusinessRule[c].deliveryAppointmentRequired = '';
              customerBusinessRule[c].hazmat = '';

            }
          }
        } else {

        }
        /*
   check the origin state and destination state for 'CA' add 8.50 for YRC alone
    */
      } else {
        customerBusinessRule = response.result.reddawayProfileRateAr;
      }
    }
    if (factoring !== 'COSTPLUS') {
      for (let i = 0; i < this.parseSetMasterData.length; i++) {
        if (this.parseSetMasterData[i].companyName === carrierType) {
          discount = this.parseSetMasterData[i].discount;
          fuelSurcharge = this.parseSetMasterData[i].fuelsurcharge;
          rateId = this.parseSetMasterData[i].recentRateId;
          amc = this.parseSetMasterData[i].amc;
          if (this.parseSetMasterData[i].assessorials !== undefined) {
            this.parseSetMasterData.assessorials = JSON.parse(this.parseSetMasterData[i].assessorials);
            if (this.parseSetMasterData.assessorials.length > 0) {
              for (let i = 0; i < this.parseSetMasterData.assessorials.length; i++) {
                if (this.parseSetMasterData.assessorials[i].name === 'Single Shipment') {
                  singleShipmentsetMasterData = this.parseSetMasterData.assessorials[i];
                  break;
                } else {
                  singleShipmentsetMasterData = '';
                }
              }
            }
          } else {
            // this.parseSetMasterData.assessorials = [];
          }
          // this.parseSetMasterData.assessorials = JSON.parse(this.parseSetMasterData[i].assessorials);
          if (this.userData.originState === 'CA' || this.userData.destinationState === 'CA') {
            if (this.parseSetMasterData[i].caCharge !== '' && this.parseSetMasterData[i].caCharge !== null && this.parseSetMasterData[i].caCharge !== undefined) {
              addCACharge = Number(this.parseSetMasterData[i].caCharge);
            } else {
              addCACharge = 0;
            }
          } else {
            addCACharge = 0;
          }
        }
      }
    } else {
      for (let apData = 0; apData < this.parseSetMasterData.length; apData++) {
        if (this.parseSetMasterData[apData].companyName === carrierType) {
          discount = this.parseSetMasterData[apData].discount;
          fuelSurcharge = this.parseSetMasterData[apData].fuelsurcharge;
          rateId = this.parseSetMasterData[apData].recentRateId;
          amc = this.parseSetMasterData[apData].amc;
        }
      }
      for (let i = 0; i < this.localStorageArData.length; i++) {
        if (this.localStorageArData[i].companyName === carrierType) {
          this.localStorageArData.assessorials = JSON.parse(this.localStorageArData[i].assessorials);
          if (this.localStorageArData.assessorials.length > 0) {
            for (let i = 0; i < this.localStorageArData.assessorials.length; i++) {
              if (this.localStorageArData.assessorials[i].name === 'Single Shipment') {
                singleShipmentsetMasterData = this.localStorageArData.assessorials[i];
                break;
              } else {
                singleShipmentsetMasterData = '';
              }
            }
          }
          if (this.originState === 'CA' || this.destinationState === 'CA') {
            if (this.localStorageArData[i].caCharge !== '' && this.localStorageArData[i].caCharge !== null && this.localStorageArData[i].caCharge !== undefined) {
              addCACharge = this.localStorageArData[i].caCharge;
            } else {
              addCACharge = 0;
            }
          } else {
            addCACharge = 0;
          }
        }
      }
    }
    if (response.result.classWeight !== undefined) {
      for (let i = 0; i < response.result.classWeight.length; i++) {
        const weight = response.result.classWeight[i].weight;
        weightArray.push(weight);
        const classification = response.result.classWeight[i].classification;
        classificationArray.push(classification);
        classification1.push(classification);
      }
    }

    this.weightForCal = this.netChargeArrSum(weightArray);
    /*Both the additional rate and additional min rate is given */
    /*AdditionalMinRate => additinalRate*totalWeight/100*/
    if (carrierType === 'YRC') {
      if (response.result.additionalMinRate !== 0) {
        const additionalRateCalculation = (Number(response.result.additionalRate) * (this.weightForCal / 100));
        if (Number(additionalRateCalculation) < Number(response.result.additionalMinRate)) {
          highCost = Number(response.result.additionalMinRate);
        } else {
          highCost = Number(additionalRateCalculation).toFixed(2);
        }
      } else {
        /*AdditionalMinRate is zero and additional rate is given*/
        if (response.result.additionalRate !== 0) {
          highCost = Number(response.result.additionalRate);
        } else {
          highCost = 0;
        }
      }
    } else {
      if (Number(response.result.additionalMaxRate) !== 0) {
        const additionalRateCalculation = (Number(response.result.additionalRate) * (this.weightForCal / 100));
        if (Number(additionalRateCalculation) < Number(response.result.additionalMinRate)) {
          highCost = Number(response.result.additionalMinRate);
        } else if (Number(additionalRateCalculation) > Number(response.result.additionalMaxRate)) {
          highCost = Number(response.result.additionalMaxRate);
        } else {
          highCost = Number(additionalRateCalculation).toFixed(2);
        }
      } else {
        if (Number(response.result.additionalRate) !== 0) {
          highCost = Number(response.result.additionalRate);
        } else {
          highCost = 0;
        }
      }
      console.log('reddaway highcost', highCost);
    }
    /* If Customer Business rule is given discount, minCharge is taken,
    Else part shipTypes is direct setmaster data values are taken,
    shipTypes is non-direct discount is 0 zero
     */
    if (customerBusinessRule.length > 0) {
      for (let pr = 0; pr < customerBusinessRule.length; pr++) {
        this.showDirections = response.result.shipTypes;
        discount = customerBusinessRule[pr].profileDiscount;
        fuelSurcharge = fuelSurcharge;
        if (customerBusinessRule[pr].profileMinCharge !== undefined) {
          profileMinimumCharge = customerBusinessRule[pr].profileMinCharge;
        } else {
          profileMinimumCharge = amc;
        }
        if (factoring !== 'COSTPLUS') {
          profileLifeGateCharge = customerBusinessRule[pr].liftGateService;
          profileResidentialCharge = customerBusinessRule[pr].residentialDelivery;
          profileLimitedAccessDelivery = customerBusinessRule[pr].limitedAccessDelivery;
          profileInsideDelivery = customerBusinessRule[pr].insideDelivery;
          profileNotify = customerBusinessRule[pr].notify;
          profileSingleShipment = customerBusinessRule[pr].singleShipment;
          profiledeliveryAppointmentRequired = customerBusinessRule[pr].deliveryAppointmentRequired;
          profilehazmat = customerBusinessRule[pr].hazmat;
          profileLiftGatePickupCharge = customerBusinessRule[pr].liftGateService;
          profileResidentialPickupcharge = customerBusinessRule[pr].residentialDelivery;
          profilelimitedpickup = customerBusinessRule[pr].limitedAccessDelivery;
          profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
            { residential: profileResidentialCharge, id: 2 },
            { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
            { insideDelivery: profileInsideDelivery, id: 4 },
            { notify: profileNotify, id: 5 },
            { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id: 7 },
            { hazmat: profilehazmat, id: 8 },
            { liftGatePickup: profileLiftGatePickupCharge, 'id': 10 },
            { residentialPickup: profileResidentialPickupcharge, 'id': 11 },
            { limitedaccesspickup: profilelimitedpickup, 'id': 12 });
        } else {
          if (this.getARRule.length > 0) {
            profileLifeGateCharge = this.getARRule[0].liftGateService;
            profileResidentialCharge = this.getARRule[0].residentialDelivery;
            profileLimitedAccessDelivery = this.getARRule[0].limitedAccessDelivery;
            profileInsideDelivery = this.getARRule[0].insideDelivery;
            profileNotify = this.getARRule[0].notify;
            profileSingleShipment = this.getARRule[0].singleShipment;
            profiledeliveryAppointmentRequired = this.getARRule[0].deliveryAppointmentRequired;
            profilehazmat = this.getARRule[0].hazmat;
            profileLiftGatePickupCharge = this.getARRule[0].liftGateService;
            profileResidentialPickupcharge = this.getARRule[0].residentialDelivery;
            profilelimitedpickup = this.getARRule[0].limitedAccessDelivery;

            profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
              { residential: profileResidentialCharge, id: 2 },
              { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
              { insideDelivery: profileInsideDelivery, id: 4 },
              { notify: profileNotify, id: 5 },
              { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id: 7 },
              { hazmat: profilehazmat, id: 8 },
              { liftGatePickup: profileLiftGatePickupCharge, 'id': 10 },
              { residentialPickup: profileResidentialPickupcharge, 'id': 11 },
              { limitedaccesspickup: profilelimitedpickup, 'id': 12 });
          } else {
            profileAssessorials.push({ liftGate: '', 'id': 1 },
              { residential: '', 'id': 2 },
              { limitedAccessDelivery: '', 'id': 3 },
              { insideDelivery: '', id: 4 },
              { notify: '', 'id': 5 },
              { deliveryAppointmentRequired: '', 'id': 7 },
              { hazmat: '', 'id': 8 },
              { liftGatePickup: '', 'id': 10 },
              { residentialPickup: '', 'id': 11 },
              { limitedaccesspickup: '', 'id': 12 });
          }
        }
      }
    } else {
      if (response.result.shipTypes === 'Direct') {
        this.showDirections = 'Direct';
        discount = discount;
        fuelSurcharge = fuelSurcharge;
      } else {
        this.showDirections = 'Non-Direct';
        if (carrierType === 'YRC') {
          discount = 80;
        } else {
          discount = 0;
        }
        fuelSurcharge = fuelSurcharge;
      }
      if (factoring === 'COSTPLUS') {
        if (this.getARRule.length > 0) {
          profileLifeGateCharge = this.getARRule[0].liftGateService;
          profileResidentialCharge = this.getARRule[0].residentialDelivery;
          profileLimitedAccessDelivery = this.getARRule[0].limitedAccessDelivery;
          profileInsideDelivery = this.getARRule[0].insideDelivery;
          profileNotify = this.getARRule[0].notify;
          profileSingleShipment = this.getARRule[0].singleShipment;
          profiledeliveryAppointmentRequired = this.getARRule[0].deliveryAppointmentRequired;
          profilehazmat = this.getARRule[0].hazmat;
          profileLiftGatePickupCharge = this.getARRule[0].liftGateService;
          profileResidentialPickupcharge = this.getARRule[0].residentialDelivery;
          profilelimitedpickup = this.getARRule[0].limitedAccessDelivery;
          profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
            { residential: profileResidentialCharge, id: 2 },
            { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
            { insideDelivery: profileInsideDelivery, id: 4 },
            { notify: profileNotify, id: 5 },
            { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id: 7 },
            { hazmat: profilehazmat, id: 8 },
            { liftGatePickup: profileLiftGatePickupCharge, 'id': 10 },
            { residentialPickup: profileResidentialPickupcharge, 'id': 11 },
            { limitedaccesspickup: profilelimitedpickup, 'id': 12 });
        } else {
          profileAssessorials.push({ liftGate: '', 'id': 1 },
            { residential: '', 'id': 2 },
            { limitedAccessDelivery: '', 'id': 3 },
            { insideDelivery: '', id: 4 },
            { notify: '', 'id': 5 },
            { deliveryAppointmentRequired: '', 'id': 7 },
            { hazmat: '', 'id': 8 },
            { liftGatePickup: '', 'id': 10 },
            { residentialPickup: '', 'id': 11 },
            { limitedaccesspickup: '', 'id': 12 });
        }
      } else {
        profileAssessorials.push({ liftGate: '', 'id': 1 },
          { residential: '', 'id': 2 },
          { limitedAccessDelivery: '', 'id': 3 },
          { insideDelivery: '', id: 4 },
          { notify: '', 'id': 5 },
          { deliveryAppointmentRequired: '', 'id': 7 },
          { hazmat: '', 'id': 8 },
          { liftGatePickup: '', 'id': 10 },
          { residentialPickup: '', 'id': 11 },
          { limitedaccesspickup: '', 'id': 12 });
      }
    }
    discountArray.push(discount);
    fuelSurchargeArray.push(fuelSurcharge);
    if (carrierType === 'YRC') {
      if (this.weightForCal < 500) {
        if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
          addSingleShipmentCharge = Number(profileSingleShipment);
        } else {
          if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
            addSingleShipmentCharge = Number(singleShipmentsetMasterData.cost);
          } else {
            addSingleShipmentCharge = 0;
          }
        }
      } else {
        addSingleShipmentCharge = 0;
      }
    } else {
      if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
        addSingleShipmentCharge = Number(profileSingleShipment);
      } else {
        if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
          addSingleShipmentCharge = Number(singleShipmentsetMasterData.cost);
        } else {
          addSingleShipmentCharge = 0;
        }
      }
    }
    /*
    check the type is Rate or DwRate
     */
    if (response.result.type === 'Rate') {
      console.log('YRC rate 1', response.result.rate);
      for (let i = 0; i < response.result.rate.length; i++) {
        if (category === 'AR') {
          finalRateCal = Number(response.result.rate[i].finalRate) * this.increasedValueForAR;
        } else {
          finalRateCal = Number(response.result.rate[i].finalRate);
        }
        finalRateArray.push(finalRateCal.toFixed(2));
        console.log('YRC rate 2', finalRateArray);
      }
    } else {
      for (let i = 0; i < response.result.rate.length; i++) {
        if (category === 'AR') {
          finalRateCal = Number(response.result.rate[i].finalDWRate) * this.increasedValueForAR;
        } else {
          finalRateCal = Number(response.result.rate[i].finalDWRate);
        }
        finalRateArray.push(finalRateCal.toFixed(2));
        console.log('YRC rate 3', finalRateArray);
      }
    }
    addRate = this.netChargeArrSum(finalRateArray);
    let minCharges;
    /*Compare final rate and mincharges if minCharges > final rate (mincharges is taken) if not final rate is taken*/

    for (let t = 0; t < response.result.rate.length; t++) {
      if (response.result.type === 'Rate') {
        if (carrierType === 'YRC') {
          if (category === 'AR') {
            minCharges = Number(response.result.minCharges) * this.increasedValueForAR;
          } else {
            minCharges = Number(response.result.minCharges);
          }
          if (Number(minCharges) > Number(addRate)) {
            this.showMinimumCharge = true;
            if (category === 'AR') {
              currentFinalRate = Number(response.result.minCharges) * this.increasedValueForAR;
            } else {
              currentFinalRate = Number(response.result.minCharges);
            }
            finalRate.push(currentFinalRate.toFixed(2));
          } else {
            this.showMinimumCharge = false;
            if (category === 'AR') {
              currentFinalRate = Number(response.result.rate[t].finalRate) * this.increasedValueForAR;
            } else {
              currentFinalRate = Number(response.result.rate[t].finalRate);
              currentRate = Number(response.result.rate[t].rate);
            }
            finalRate.push(currentFinalRate.toFixed(2));
          }
          if (category === 'AR') {
            currentRate = Number(response.result.rate[t].rate) * this.increasedValueForAR;
          } else {
            currentRate = Number(response.result.rate[t].rate);
          }
          rate.push(currentRate.toFixed(2));
        } else {
          this.showMinimumCharge = false;
          if (category === 'AR') {
            currentFinalRate = Number(response.result.rate[t].finalRate) * this.increasedValueForAR;
            currentRate = Number(response.result.rate[t].rate) * this.increasedValueForAR;
          } else {
            currentFinalRate = Number(response.result.rate[t].finalRate);
            currentRate = Number(response.result.rate[t].rate);
          }
          finalRate.push(currentFinalRate.toFixed(2));
          rate.push(currentRate.toFixed(2));
        }
      } else {
        /*If part is for YRC => it will check for (mincharges > total final rate) else part reddaway need not check*/
        if (carrierType === 'YRC') {
          if (category === 'AR') {
            minCharges = Number(response.result.minCharges) * this.increasedValueForAR;
          } else {
            minCharges = Number(response.result.minCharges);
          }
          if (Number(minCharges) > Number(addRate)) {
            this.showMinimumCharge = true;
            if (category === 'AR') {
              currentFinalRate = Number(response.result.minCharges) * this.increasedValueForAR;
            } else {
              currentFinalRate = Number(response.result.minCharges);
            }
            finalRate.push(currentFinalRate.toFixed(2));
            this.finalRateCharge = this.netChargeArrSum(finalRate);
          } else {
            this.showMinimumCharge = false;
            if (category === 'AR') {
              const currentFinalDwRate = Number(response.result.rate[t].finalDWRate) * this.increasedValueForAR;
              finalRate.push(currentFinalDwRate.toFixed(2));
            } else {
              const currentFinalDwRate = Number(response.result.rate[t].finalDWRate);
              finalRate.push(currentFinalDwRate.toFixed(2));
            }
          }
          if (category === 'AR') {
            const currentDwRate = Number(response.result.rate[t].DWRate) * this.increasedValueForAR;
            rate.push(currentDwRate.toFixed(2));
          } else {
            const currentDwRate = Number(response.result.rate[t].DWRate);
            rate.push(currentDwRate.toFixed(2));
          }
        } else {
          this.showMinimumCharge = false;
          if (category === 'AR') {
            const currentFinalDwRate = Number(response.result.rate[t].finalDWRate) * this.increasedValueForAR;
            finalRate.push(currentFinalDwRate.toFixed(2));
            const currentDwRate = Number(response.result.rate[t].DWRate) * this.increasedValueForAR;
            rate.push(currentDwRate.toFixed(2));
          } else {
            const currentFinalDwRate = Number(response.result.rate[t].finalDWRate);
            finalRate.push(currentFinalDwRate.toFixed(2));
            const currentDwRate = Number(response.result.rate[t].DWRate);
            rate.push(currentDwRate.toFixed(2));
          }
        }
      }
    }

    this.finalRateCharge = this.netChargeArrSum(finalRate);
    console.log('rate Array Calculation', rate, 'finalRate', finalRate);
    /*Compare diffRate is given => if it is given deficit value will be taken diffRate, diffFinalRate and crtRate, if not normal rate and final rate is considered */
    if (response.result.diffRate === 0 && response.result.diffWeight === 0 && response.result.finalDiffRate === 0 && response.result.crtRate === 0) {
      this.showDeficitValue = false;
    } else {
      this.showDeficitValue = true;
      if (category === 'AR') {
        const currentDiffRate = Number(response.result.diffRate) * this.increasedValueForAR;
        diffRateArray.push(currentDiffRate.toFixed(2));
        const currentFinalDiffRate = Number(response.result.finalDiffRate) * this.increasedValueForAR;
        diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
        const currentCrtRate = Number(response.result.crtRate) * this.increasedValueForAR;
        crtRateArray.push(currentCrtRate.toFixed(2));
      } else {
        const currentDiffRate = Number(response.result.diffRate);
        diffRateArray.push(currentDiffRate.toFixed(2));
        const currentFinalDiffRate = Number(response.result.finalDiffRate);
        diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
        const currentCrtRate = Number(response.result.crtRate);
        crtRateArray.push(currentCrtRate.toFixed(2));
      }
      const weight = Number(response.result.diffWeight);
      diffWeightArray.push(weight);
      this.finalRateCharge = this.finalRateCharge + this.netChargeArrSum(diffRateArray);
    }
    /*Discounted Rate => finalRate * (1-(discount/100))*/
    if (factoring !== 'COSTPLUS') {
      discountedRateCalculation = (this.finalRateCharge * (1 - (discount / 100)));
    } else {
      let discountedRateNewCalculation = (this.finalRateCharge * (1 - (discount / 100)));
      discountedRateCalculation = Number(discountedRateNewCalculation) * Number(this.costPlusPercentFactor);
    }
    // Comparing discounted Rate and the minCharge given in the customer business rules
    if (profileMinimumCharge !== undefined && profileMinimumCharge !== '' && profileMinimumCharge !== null) {
      if (Number(profileMinimumCharge) > Number(discountedRateCalculation)) {

        if (factoring !== 'COSTPLUS') {
          discountedRate = Number(profileMinimumCharge);
        } else {
          discountedRate = (Number(profileMinimumCharge) * Number(this.costPlusPercentFactor)).toFixed(2);
          console.log('discounted Rate ProfileMinimum charge 1', discountedRate);
        }
      } else {
        discountedRate = Number(discountedRateCalculation.toFixed(2));
      }
    } else {
      if (amc !== '' && amc !== null && amc !== undefined) {
        if (Number(amc) > Number(discountedRateCalculation)) {
          if (factoring !== 'COSTPLUS') {
            discountedRate = Number(amc);
          } else {
            discountedRate = (Number(amc) * Number(this.costPlusPercentFactor)).toFixed(2);
            console.log('discounted Rate AMC charge 1', discountedRate);
          }
        } else {
          discountedRate = Number(discountedRateCalculation.toFixed(2));
        }
      } else {
        discountedRate = Number(discountedRateCalculation.toFixed(2));
      }
    }
    let Apdiscountrate;
    console.log('jefrin', this.resultArray);
    // if (this.userData.carrier === 'YRC') {
    this.resultArray.forEach((ee:any) => {
      if (ee.category === "AP") {
        console.log('jefrin', ee);
        Apdiscountrate = ee.discountedRate[0];
        if (Number(Apdiscountrate) > discountedRate) {
          console.log('jefrin', discount);
          let x = Apdiscountrate * 1.05;
          discountedRate = x.toFixed(2);
          this.showcolor = true;
          let y = x / ((100 - discount) / 100);
          console.log('jefrin', y);
          finalRate.push(y.toFixed(2));
          this.finalRateCharge = []
          this.finalRateCharge = this.netChargeArrSum(finalRate);

          // finalRateCharge
        }
      }
    })
    // }
    discountedRateArray.push(discountedRate);
    /*Net charge => (1+(fuelSurchareg/100))*discountedRate */
    const netCharge = (1 + (fuelSurcharge / 100)) * discountedRate;
    netChargeArray.push(netCharge.toFixed(2));
    const netChargeResult = ((discountedRate) * (fuelSurcharge / 100));
    netChargeResultArray.push(netChargeResult.toFixed(2));
    let assessorialUnique = [], uniqueArray = [];
    console.log('this.selectedItems before duplicating', this.selectedItems, this.selectedItemValue);
    let myClonedArray = Object.assign([], this.selectedItemValue);
    console.log('myClonedArray', myClonedArray);
    let serviceName;
    // myClonedArray = this.getUnique(myClonedArray, 'name');
    myClonedArray = this.selectedItems;
    console.log('assessorialUnique', myClonedArray);
    console.log('assessorialUnique After', myClonedArray);
    /* assessorial function => static values if customer rule is given that value will be considered*/
    if (factoring !== 'COSTPLUS') {
      console.log('this.selectedItems new', this.selectedItems);
      assessorialChargeArray = this.pricingInfoService.assessorialFunction(myClonedArray, this.parseSetMasterData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
      //  assessorialChargeArray = this.pricingInfoService.assessorialFunction(this.selectedItems, this.parseSetMasterData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
    } else {
      console.log('this.selectedItems New 2', this.selectedItems);
      assessorialChargeArray = this.pricingInfoService.assessorialFunction(myClonedArray, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
      //  assessorialChargeArray = this.pricingInfoService.assessorialFunction(this.selectedItems, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
    }
    assessorialCharge = assessorialChargeArray[0];
    this.arrayData = this.pricingInfoService.getAssessorial();
    const netChargeValue = this.netChargeArrSum(netChargeArray);
    if (carrierType === 'YRC') {
      addCACharge = Number(response.result.yrcCaCharge);
    } else {
      addCACharge = Number(response.result.reddawayCaCharge);

    }
    console.log(addCACharge);
    totalAssessorialCharge = Number(highCost) + Number(addCACharge) + Number(addSingleShipmentCharge) + Number(assessorialCharge);
    /*totalCharge => Add netCharge, assessorialCharge, addCACharge, highCost, addSingleShipmentCharge */
    const totalCharge = Number(highCost) + Number(addCACharge) + Number(netChargeValue) + Number(addSingleShipmentCharge) + Number(assessorialCharge);
    totalChargeArray.push(totalCharge.toFixed(2));
    classification1.splice(0, 1);
    minimumClass = Math.min(...classificationArray);
    const totalChargeForComparing = this.netChargeArrSum(totalChargeArray);
    this.pricingInformation = {
      rate: rate,
      finalRate: finalRate,
      discount: discountArray,
      fuelChargeYrc: fuelSurchargeArray,
      fuelCharge: fuelSurchargeArray,
      discountedRate: discountedRateArray,
      netCharge: netChargeArray,
      totalCharge: totalChargeArray,
      fuelChargeDiff: fuelSurcharge,
      discountDiff: discount,
      weight: weightArray,
      classification: classificationArray,
      classification1: classification1,
      diffWeight: diffWeightArray,
      diffRate: diffRateArray,
      diffFinalRate: diffFinalRateArray,
      crtRate: crtRateArray,
      diffDiscountedRate: discountedRateArray,
      diffNetCharge: netChargeArray,
      assessorialCharge: assessorialCharge,
      assessorialChargeValue: totalAssessorialCharge,
      assessorialDataList: this.arrayData,
      netChargeResult: netChargeResultArray,
      netChargeDiffResult: netChargeResultArray,
      additionalCharge: addCACharge,
      singleShipmentCharge: addSingleShipmentCharge,
      highCostDeliveryCharge: highCost,
      category: category,
      showMinimumCharge: this.showMinimumCharge,
      shipTypes: this.showDirections,
      carrierType: carrierType,
      netChargeValue: netChargeValue,
      totalChargeForComparing: totalChargeForComparing,
      factor: factoring,
      totalWeight: this.weightForCal,
      higherValueAp: this.higherValueAp,
      showcolor: this.showcolor

    };
    this.resultArray.push(this.pricingInformation);
    if (this.resultArray.length > 1) {
      this.resultArray.sort(function (a:any, b:any) {
        return (a.category - b.category);
      });
      if (this.resultArray[0].category === 'AP') {

      } else {
        this.resultArray.reverse();
      }
    }
    console.log('this.pricingInformation', this.pricingInformation);
    console.log('this.resultArray responses', this.resultArray);
    let rateArray = [];
    if (this.resultArray.length > 2) {
      this.showLoader = false;
      let Apdiscountrate;
      let Ap:any, Ar:any;
      let ARindex;
      this.resultArray.forEach((ee:any, index:any) => {
        if (ee.category === "AP") {
          Ap = ee;

        };
        if (ee.category === "AR") {
          Ar = ee;
          ARindex = index;

        };
      });
      console.log('jefrin', Ap, Ar);
      Apdiscountrate = Ap.discountedRate;
      if (Apdiscountrate > Ar.discountedRate) {
        console.log('jefrin', Apdiscountrate);
        let x = Ap.discountedRate * 1.05;
        let xarr = [];
        xarr.push(x.toFixed(2))
        Ar.discountedRate = xarr;
        Ar.showcolor = true;
        let y = x / ((100 - Ar.discount[0]) / 100);
        console.log('jefrin', y);
        let finalRate1 = []
        finalRate1.push(y.toFixed(2));
        Ar.finalRate = finalRate1
        this.finalRateCharge = []

        this.finalRateCharge = this.netChargeArrSum(finalRate1);
        Ar.totalGrossCharge = this.finalRateCharge.toFixed(2);
        // discountedRateArray.push(discountedRate);
        /*Net charge => (1+(fuelSurchareg/100))*discountedRate */
        if (Ar.factoring !== 'COSTPLUS') {
          const netCharge = (1 + (Ar.fuelCharge[0] / 100)) * x;
          let netc = [];
          netc.push(netCharge.toFixed(2));
          Ar.netChargeArray = netc
          const netChargeResult = ((x) * (Ar.fuelCharge / 100));
          let resNetArray = []
          resNetArray.push(netChargeResult.toFixed(2));
          Ar.netChargeResultArray = resNetArray;
        } else {

          const netCharge = (1 + (Ar.fuelCharge[0] / 100)) * x;
          let netc = [];
          netc.push(netCharge.toFixed(2));
          Ar.netChargeArray = netc
          const netChargeResult = ((x) * (Ar.fuelCharge / 100));
          let resNetArray = []
          resNetArray.push(netChargeResult.toFixed(2));
          Ar.netChargeResultArray = resNetArray;
        }
        const netChargeValue = this.netChargeArrSum(Ar.netChargeArray);

        // if (factoring !== "COSTPLUS") {
        const totalCharge = Number(Ar.highCostDeliveryCharge) + Number(Ar.additionalCharge) + Number(Ar.netChargeArray[0]) + Number(Ar.singleShipmentCharge) + Ar.assessorialCharge;
        let tt:any = [];
        Ar.totalCharge = tt;
        tt.push(totalCharge.toFixed(2));
        Ar.totalChargeArray = tt;
        // } else {
        //   const totalCharge = Number(highCost) + Number(addCACharge) + Number(netChargeValue) + Number(addSingleShipmentCharge) + assessorialCharge;
        //   totalChargeArray.push(totalCharge.toFixed(2));
        // }
        // finalRateCharge
        if(this.applyCostFactor === false) {

        if (Ap.totalCharge > Ar.totalCharge[0]) {
          this.showAdminErrorMessage = true;
          $("#getRate-modal").modal('hide');


        }
      }
      }
      if (Ap.totalCharge > Ar.totalCharge[0]) {
        // this.showNegativeMargin = true;
        let charge = Number(Ap.totalCharge)* 5/100;
        let addedCharge = charge + Number(Ap.totalCharge)
        let charegArry = [];
        charegArry.push(addedCharge.toFixed(2));
        Ar.totalCharge = charegArry;
        // this.showData = false;
      }
      if (this.resultArray[1].factor !== 'COSTPLUS') {
        // if (Number(this.resultArray[0].totalChargeForComparing) > Number(this.resultArray[1].totalChargeForComparing)) {
        //   rateArray.push(this.resultArray[0]);
        //   this.resultArray = [];
        //   this.resultArray = rateArray;
        //   let factorValue = 15;
        //   this.costPlusPercentFactor = 1 + (Number(factorValue) / 100);
        //   this.higherValueAp = true;
        //   if (this.userData.carrier === 'YRC') {
        //     // if()
        //     this.getYRCForCostPlus();
        //   } else {
        //     this.getReddawayForCostPlus();
        //   }
        // } else {
        if (this.userData.carrier === 'YRC') {
          if (this.resultArray.length > 2) {
            this.giveRateDetails(this.resultArray, 'AR');
          }
        } else {
          if (this.resultArray.length > 1) {

            this.giveRateDetails(this.resultArray, 'AR');
          }
        }
        // this.giveRateDetails(this.resultArray, 'AR');
        this.totalChargeValue = this.netChargeArrSum(this.resultArray[1].totalCharge);
        this.factorization = this.resultArray[1].factor;
        // }
      } else {
        // this.giveRateDetails(this.resultArray, 'AR');
        if (this.userData.carrier === 'YRC') {
          if (this.resultArray.length > 2) {
            this.giveRateDetails(this.resultArray, 'AR');
          }
        } else {
          if (this.resultArray.length > 1) {

            this.giveRateDetails(this.resultArray, 'AR');
          }
        }
        this.totalChargeValue = this.netChargeArrSum(this.resultArray[1].totalCharge);
        this.factorization = this.resultArray[1].factor;
      }
    }


  }

  rateCalculationForYRCReddawayCostplusNew(response:any, carrierType:any, category:any, factoring:any) {
    let date = new Date();
    console.log('RATE CALCULATION TIME FOR YRC', date);
    let discount, fuelSurcharge, rateId, amc, highCost, addCACharge, addRate, discountedRate:any,
      addSingleShipmentCharge, minimumClass, totalAssessorialCharge, assessorialCharge, customerBusinessRule:any = [], assessorialChargeArray = [], profileAssessorials = [];
    const weightArray = [], classificationArray = [], classification1 = [], finalRateArray = [], discountedRateArray = [],
      netChargeArray = [], netChargeResultArray = [], totalChargeArray = [];
    let finalRate = [], rate = [], crtRateArray = [], fuelSurchargeArray:any = [];
    const diffFinalRateArray = [], diffRateArray = [], discountArray = [], diffWeightArray = [];
    let profileMinimumCharge, profileLifeGateCharge, profileResidentialCharge, profileLimitedAccessDelivery,
      profileInsideDelivery, profileNotify, profileSingleShipment, singleShipmentsetMasterData, profiledeliveryAppointmentRequired, profilehazmat, profileLiftGatePickupCharge, profileResidentialPickupcharge, profilelimitedpickup;
    this.parseSetMasterData = [];
    let currentFinalRate, currentRate;
    let discountedRateCalculation;
    this.showDirections = '';
    this.showSingleShipmentValue = false;
    this.showDeficitValue = false;
    this.showMinimumCharge = false;
    // this.hideYrcData = false;
    this.localStorageArData = [];
    let staticData:any = localStorage.getItem('artableData');
    this.localStorageArData = JSON.parse(staticData);
    let costplusAp:any;
    // highcost = 0;

    this.resultArray.forEach((ele:any) => {
      if (ele.category === 'AP') {
        console.log('xxxx', ele);
        costplusAp = ele;

      }
    });
    console.log(costplusAp, this.resultArray);
        //   if (category === 'AP') {
    //     /*set master data discount, minimum charge values which is stored in local storage */
    //     const setMasterData = localStorage.getItem('aptableData');
    //     this.parseSetMasterData = JSON.parse(setMasterData);
    //     if (carrierType === 'YRC') {
    //       if (Object.keys(response.result.yrcProfileRateAp).length === 0 || response.result.yrcProfileRateAp === {}) {
    //         customerBusinessRule = [];
    //       } else {
    //         if (response.result.yrcProfileRateAp.liftGateService !== undefined) {
    //           customerBusinessRule.push(response.result.yrcProfileRateAp);
    //         } else {
    //           response.result.yrcProfileRateAp.liftGateService = '';
    //           response.result.yrcProfileRateAp.residentialDelivery = '';
    //           response.result.yrcProfileRateAp.limitedAccessDelivery = '';
    //           response.result.yrcProfileRateAp.insideDelivery = '';
    //           response.result.yrcProfileRateAp.notify = '';
    //           response.result.yrcProfileRateAp.singleShipment = '';
    //           response.result.yrcProfileRateAp.deliveryAppointmentRequired = '';
    //           response.result.yrcProfileRateAp.hazmat = '';
    //           customerBusinessRule.push(response.result.yrcProfileRateAp);
    //         }
    //       }
    //       /*
    //  check the origin state and destination state for 'CA' add 8.50 for YRC alone
    //   */
    //     } else {
    //       customerBusinessRule = response.result.reddawayProfileRateAp;
    //     }
    //   } else {
    //     /*set master data discount, minimum charge values which is stored in local storage */
    const setMasterData:any = localStorage.getItem('artableData');
    this.parseSetMasterData = JSON.parse(setMasterData);
    //     /*Customer specific rules*/
    //     if (carrierType === 'YRC') {
    //       customerBusinessRule = response.result.yrcProfileRateAr;
    //       if (customerBusinessRule.length > 0) {
    //         for (let c = 0; c < customerBusinessRule.length; c++) {
    //           if (customerBusinessRule[c].liftGateService !== undefined) {
    //           } else {
    //             customerBusinessRule[c].liftGateService = '';
    //             customerBusinessRule[c].residentialDelivery = '';
    //             customerBusinessRule[c].limitedAccessDelivery = '';
    //             customerBusinessRule[c].insideDelivery = '';
    //             customerBusinessRule[c].notify = '';
    //             customerBusinessRule[c].singleShipment = '';
    //             customerBusinessRule[c].deliveryAppointmentRequired = '';
    //             customerBusinessRule[c].hazmat = '';


    //           }
    //         }
    //       } else {
    //       }
    //     } else {
    //       customerBusinessRule = response.result.reddawayProfileRateAr;
    //     }
    //   }
    if (factoring !== 'COSTPLUS') {
      for (let i = 0; i < this.parseSetMasterData.length; i++) {
        if (this.parseSetMasterData[i].companyName === carrierType) {
          discount = this.parseSetMasterData[i].discount;
          fuelSurcharge = this.parseSetMasterData[i].fuelsurcharge;
          rateId = this.parseSetMasterData[i].recentRateId;
          amc = this.parseSetMasterData[i].amc;
          this.parseSetMasterData.assessorials = JSON.parse(this.parseSetMasterData[i].assessorials);
          if (this.parseSetMasterData.assessorials.length > 0) {
            for (let i = 0; i < this.parseSetMasterData.assessorials.length; i++) {
              if (this.parseSetMasterData.assessorials[i].name === 'Single Shipment') {
                singleShipmentsetMasterData = this.parseSetMasterData.assessorials[i];
                break;
              } else {
                singleShipmentsetMasterData = '';
              }
            }
          }
          if (this.userData.originState === 'CA' || this.userData.destinationState === 'CA') {
            if (this.parseSetMasterData[i].caCharge !== '' && this.parseSetMasterData[i].caCharge !== null && this.parseSetMasterData[i].caCharge !== undefined) {
              addCACharge = this.parseSetMasterData[i].caCharge;
            } else {
              addCACharge = 0;
            }
          } else {
            addCACharge = 0;
          }
        }
      }
    } else {
      console.log('armaster', this.parseSetMasterData);
      for (let apData = 0; apData < this.parseSetMasterData.length; apData++) {
        if (this.parseSetMasterData[apData].companyName === carrierType) {
          discount = this.parseSetMasterData[apData].discount;
          fuelSurcharge = this.parseSetMasterData[apData].fuelsurcharge;
          rateId = this.parseSetMasterData[apData].recentRateId;
          amc = this.parseSetMasterData[apData].amc;
        }
      }
      for (let i = 0; i < this.localStorageArData.length; i++) {
        if (this.localStorageArData[i].companyName === carrierType) {
          this.localStorageArData.assessorials = JSON.parse(this.localStorageArData[i].assessorials);
          if (this.localStorageArData.assessorials.length > 0) {
            for (let i = 0; i < this.localStorageArData.assessorials.length; i++) {
              if (this.localStorageArData.assessorials[i].name === 'Single Shipment') {
                singleShipmentsetMasterData = this.localStorageArData.assessorials[i];
                break;
              } else {
                singleShipmentsetMasterData = '';
              }
            }
          }
          if (this.userData.originState === 'CA' || this.userData.destinationState === 'CA') {
            if (this.localStorageArData[i].caCharge !== '' && this.localStorageArData[i].caCharge !== null && this.localStorageArData[i].caCharge !== undefined) {
              addCACharge = this.localStorageArData[i].caCharge;
            } else {
              addCACharge = 0;
            }
          } else {
            addCACharge = 0;
          }
        }
      }
    }
    // for (let i = 0; i < response.result.classWeight.length; i++) {
    //   const weight = response.result.classWeight[i].weight;
    //   weightArray.push(weight);
    //   const classification = response.result.classWeight[i].classification;
    //   classificationArray.push(classification);
    //   classification1.push(classification);
    // }
    weightArray.push(costplusAp.weight[0]);
    // const classification = response.result.classWeight[i].classification;
    classificationArray.push(costplusAp.classification[0]);
    classification1.push(costplusAp.classification[0]);
    this.weightForCal = this.netChargeArrSum(weightArray);
    /*Both the additional rate and additional min rate is given */
    /*AdditionalMinRate => additinalRate*totalWeight/100*/
    if (carrierType === 'YRC') {
      if (response.result.additionalMinRate !== 0) {
        const additionalRateCalculation = (Number(response.result.additionalRate) * (this.weightForCal / 100));
        if (Number(additionalRateCalculation) < Number(response.result.additionalMinRate)) {
          highCost = response.result.additionalMinRate;
        } else {
          highCost = Number(additionalRateCalculation).toFixed(2);
        }
      } else {
        /*AdditionalMinRate is zero and additional rate is given*/
        if (response.result.additionalRate !== 0) {
          highCost = response.result.additionalRate;
        } else {
          highCost = 0;
        }
      }
    } else {
      if (Number(response.result.additionalMaxRate) !== 0) {
        const additionalRateCalculation = (Number(response.result.additionalRate) * (this.weightForCal / 100));
        if (Number(additionalRateCalculation) < Number(response.result.additionalMinRate)) {
          highCost = Number(response.result.additionalMinRate);
        } else if (Number(additionalRateCalculation) > Number(response.result.additionalMaxRate)) {
          highCost = Number(response.result.additionalMaxRate);
        } else {
          highCost = Number(additionalRateCalculation).toFixed(2);
        }
      } else {
        if (Number(response.result.additionalRate) !== 0) {
          highCost = Number(response.result.additionalRate);
        } else {
          highCost = 0;
        }
      }
    }
    /* If Customer Business rule is given discount, minCharge is taken,
    Else part shipTypes is direct setmaster data values are taken,
    shipTypes is non-direct discount is 0 zero
     */
    if (customerBusinessRule.length > 0) {
      for (let pr = 0; pr < customerBusinessRule.length; pr++) {
        this.showDirections = response.result.shipTypes;
        discount = customerBusinessRule[pr].profileDiscount;
        fuelSurcharge = fuelSurcharge;
        if (customerBusinessRule[pr].profileMinCharge !== undefined) {
          profileMinimumCharge = customerBusinessRule[pr].profileMinCharge;
        } else {
          profileMinimumCharge = amc;
        }
        if (factoring !== 'COSTPLUS') {
          profileLifeGateCharge = customerBusinessRule[pr].liftGateService;
          profileResidentialCharge = customerBusinessRule[pr].residentialDelivery;
          profileLimitedAccessDelivery = customerBusinessRule[pr].limitedAccessDelivery;
          profileInsideDelivery = customerBusinessRule[pr].insideDelivery;
          profileNotify = customerBusinessRule[pr].notify;
          profileSingleShipment = customerBusinessRule[pr].singleShipment;
          profiledeliveryAppointmentRequired = customerBusinessRule[pr].deliveryAppointmentRequired;
          profilehazmat = customerBusinessRule[pr].hazmat;
          profileLiftGatePickupCharge = customerBusinessRule[pr].liftGateService;
          profileResidentialPickupcharge = customerBusinessRule[pr].residentialDelivery;
          profilelimitedpickup = customerBusinessRule[pr].limitedAccessDelivery;
          profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
            { residential: profileResidentialCharge, 'id': 2 },
            { limitedAccessDelivery: profileLimitedAccessDelivery, 'id': 3 },
            { insideDelivery: profileInsideDelivery, 'id': 4 },
            { notify: profileNotify, 'id': 5 },
            { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7 },
            { hazmat: profilehazmat, 'id': 8 },
            { liftGatePickup: profileLiftGatePickupCharge, 'id': 10 },
            { residentialPickup: profileResidentialPickupcharge, 'id': 11 },
            { limitedaccesspickup: profilelimitedpickup, 'id': 12 });
        } else {
          if (this.getARRule.length > 0) {
            profileLifeGateCharge = this.getARRule[0].liftGateService;
            profileResidentialCharge = this.getARRule[0].residentialDelivery;
            profileLimitedAccessDelivery = this.getARRule[0].limitedAccessDelivery;
            profileInsideDelivery = this.getARRule[0].insideDelivery;
            profileNotify = this.getARRule[0].notify;
            profileSingleShipment = this.getARRule[0].singleShipment;
            profiledeliveryAppointmentRequired = this.getARRule[0].deliveryAppointmentRequired;
            profilehazmat = this.getARRule[0].hazmat;
            profileLiftGatePickupCharge = this.getARRule[0].liftGateService;
            profileResidentialPickupcharge = this.getARRule[0].residentialDelivery;
            profilelimitedpickup = this.getARRule[0].limitedAccessDelivery;
            profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
              { residential: profileResidentialCharge, 'id': 2 },
              { limitedAccessDelivery: profileLimitedAccessDelivery, 'id': 3 },
              { insideDelivery: profileInsideDelivery, 'id': 4 },
              { notify: profileNotify, 'id': 5 },
              { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7 },
              { hazmat: profilehazmat, 'id': 8 },
              { liftGatePickup: profileLiftGatePickupCharge, 'id': 10 },
              { residentialPickup: profileResidentialPickupcharge, 'id': 11 },
              { limitedaccesspickup: profilelimitedpickup, 'id': 12 });
          } else {
            profileAssessorials.push({ liftGate: '', 'id': 1 },
              { residential: '', 'id': 2 },
              { limitedAccessDelivery: '', 'id': 3 },
              { insideDelivery: '', 'id': 4 },
              { notify: '', 'id': 5 },
              { deliveryAppointmentRequired: '', 'id': 7 },
              { hazmat: '', 'id': 8 },
              { liftGatePickup: '', 'id': 10 },
              { residentialPickup: '', 'id': 11 },
              { limitedaccesspickup: '', 'id': 12 });
          }
        }
      }
    } else {
      if (response.result.shipTypes === 'Direct') {
        this.showDirections = 'Direct';
        discount = discount;
        fuelSurcharge = fuelSurcharge;
      } else {
        this.showDirections = 'Non-Direct';
        if (carrierType === 'YRC') {
          discount = 80; // NON - Direct YRC->AP AND AR (Apply discount -> 80)
        } else {
          discount = 0;
        }
        fuelSurcharge = fuelSurcharge;
      }
      if (factoring === 'COSTPLUS') {
        if (this.getARRule.length > 0) {
          profileLifeGateCharge = this.getARRule[0].liftGateService;
          profileResidentialCharge = this.getARRule[0].residentialDelivery;
          profileLimitedAccessDelivery = this.getARRule[0].limitedAccessDelivery;
          profileInsideDelivery = this.getARRule[0].insideDelivery;
          profileNotify = this.getARRule[0].notify;
          profileSingleShipment = this.getARRule[0].singleShipment;
          profiledeliveryAppointmentRequired = this.getARRule[0].deliveryAppointmentRequired;
          profilehazmat = this.getARRule[0].hazmat;
          profileLiftGatePickupCharge = this.getARRule[0].liftGateService;
          profileResidentialPickupcharge = this.getARRule[0].residentialDelivery;
          profilelimitedpickup = this.getARRule[0].limitedAccessDelivery;
          profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
            { residential: profileResidentialCharge, 'id': 2 },
            { limitedAccessDelivery: profileLimitedAccessDelivery, 'id': 3 },
            { insideDelivery: profileInsideDelivery, 'id': 4 },
            { notify: profileNotify, 'id': 5 },
            { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7 },
            { hazmat: profilehazmat, 'id': 8 },
            { liftGatePickup: profileLiftGatePickupCharge, 'id': 10 },
            { residentialPickup: profileResidentialPickupcharge, 'id': 11 },
            { limitedaccesspickup: profilelimitedpickup, 'id': 12 });
        } else {
          profileAssessorials.push({ liftGate: '', 'id': 1 },
            { residential: '', 'id': 2 },
            { limitedAccessDelivery: '', 'id': 3 },
            { insideDelivery: '', 'id': 4 },
            { notify: '', 'id': 5 },
            { deliveryAppointmentRequired: '', 'id': 7 },
            { hazmat: '', 'id': 8 },
            { liftGatePickup: '', 'id': 10 },
            { residentialPickup: '', 'id': 11 },
            { limitedaccesspickup: '', 'id': 12 });
        }
      } else {
        profileAssessorials.push({ liftGate: '', 'id': 1 },
          { residential: '', 'id': 2 },
          { limitedAccessDelivery: '', 'id': 3 },
          { insideDelivery: '', 'id': 4 },
          { notify: '', 'id': 5 },
          { deliveryAppointmentRequired: '', 'id': 7 },
          { hazmat: '', 'id': 8 },
          { liftGatePickup: '', 'id': 10 },
          { residentialPickup: '', 'id': 11 },
          { limitedaccesspickup: '', 'id': 12 });
      }
    }
    discountArray.push(discount);
    // fuelSurchargeArray.push(costplusAp.fuelCharge[0]);
    if (carrierType === 'YRC') {
      if (this.weightForCal < 500) {
        if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
          addSingleShipmentCharge = Number(profileSingleShipment);
        } else {
          if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
            addSingleShipmentCharge = Number(singleShipmentsetMasterData.cost);
          } else {
            addSingleShipmentCharge = 0;
          }
        }
      } else {
        addSingleShipmentCharge = 0;
      }
    } else {
      if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
        addSingleShipmentCharge = Number(profileSingleShipment);
      } else {
        if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
          addSingleShipmentCharge = Number(singleShipmentsetMasterData.cost);
        } else {
          addSingleShipmentCharge = 0;
        }
      }
    }

    /*
    check the type is Rate or DwRate
     */
    if (response.result.type === 'Rate') {
      for (let i = 0; i < response.result.rate.length; i++) {
        if (category === 'AR') {
          currentFinalRate = Number(response.result.rate[i].finalRate) * this.increasedValueForAR;
        } else {
          currentFinalRate = Number(response.result.rate[i].finalRate);
        }
        finalRateArray.push(currentFinalRate.toFixed(2));
      }
    } else {
      for (let i = 0; i < response.result.rate.length; i++) {
        if (category === 'AR') {
          currentFinalRate = Number(response.result.rate[i].finalDWRate) * this.increasedValueForAR;
        } else {
          currentFinalRate = Number(response.result.rate[i].finalDWRate);
        }
        finalRateArray.push(currentFinalRate.toFixed(2));
      }
    }
    addRate = this.netChargeArrSum(finalRateArray);
    let minCharges;
    /*Compare final rate and mincharges if minCharges > final rate (mincharges is taken) if not final rate is taken*/
    for (let t = 0; t < response.result.rate.length; t++) {
      if (response.result.type === 'Rate') {
        if (carrierType === 'YRC') {
          if (category === 'AR') {
            minCharges = Number(response.result.minCharges) * this.increasedValueForAR;
          } else {
            minCharges = Number(response.result.minCharges);
          }
          if (Number(minCharges) > Number(addRate)) {
            this.showMinimumCharge = true;
            if (category === 'AR') {
              currentFinalRate = Number(response.result.minCharges) * this.increasedValueForAR;
            } else {
              currentFinalRate = Number(response.result.minCharges);
            }
            finalRate.push(currentFinalRate.toFixed(2));
          } else {
            this.showMinimumCharge = false;
            if (category === 'AR') {
              currentFinalRate = Number(response.result.rate[t].finalRate) * this.increasedValueForAR;
            } else {
              currentFinalRate = Number(response.result.rate[t].finalRate);
              currentRate = Number(response.result.rate[t].rate);
            }
            finalRate.push(currentFinalRate.toFixed(2));
          }
          if (category === 'AR') {
            currentRate = Number(response.result.rate[t].rate) * this.increasedValueForAR;
          } else {
            currentRate = Number(response.result.rate[t].rate);
          }
          rate.push(currentRate.toFixed(2));
        } else {
          this.showMinimumCharge = false;
          if (category === 'AR') {
            currentFinalRate = Number(response.result.rate[t].finalRate) * this.increasedValueForAR;
            currentRate = Number(response.result.rate[t].rate) * this.increasedValueForAR;
          } else {
            currentFinalRate = Number(response.result.rate[t].finalRate);
            currentRate = Number(response.result.rate[t].rate);
          }
          finalRate.push(currentFinalRate.toFixed(2));
          rate.push(currentRate.toFixed(2));
        }
      } else {
        /*If part is for YRC => it will check for (mincharges > total final rate) else part reddaway need not check*/
        if (carrierType === 'YRC') {
          if (category === 'AR') {
            minCharges = Number(response.result.minCharges) * this.increasedValueForAR;
          } else {
            minCharges = Number(response.result.minCharges);
          }
          if (Number(minCharges) > Number(addRate)) {
            this.showMinimumCharge = true;
            if (category === 'AR') {
              currentFinalRate = Number(response.result.minCharges) * this.increasedValueForAR;
            } else {
              currentFinalRate = Number(response.result.minCharges);
            }
            finalRate.push(currentFinalRate.toFixed(2));
            this.finalRateCharge = this.netChargeArrSum(finalRate);
          } else {
            this.showMinimumCharge = false;
            if (category === 'AR') {
              const currentFinalDwRate = Number(response.result.rate[t].finalDWRate) * this.increasedValueForAR;
              finalRate.push(currentFinalDwRate.toFixed(2));
            } else {
              const currentFinalDwRate = Number(response.result.rate[t].finalDWRate);
              finalRate.push(currentFinalDwRate.toFixed(2));
            }
          }
          if (category === 'AR') {
            const currentDwRate = Number(response.result.rate[t].DWRate) * this.increasedValueForAR;
            rate.push(currentDwRate.toFixed(2));
          } else {
            const currentDwRate = Number(response.result.rate[t].DWRate);
            rate.push(currentDwRate.toFixed(2));
          }
        } else {
          this.showMinimumCharge = false;
          if (category === 'AR') {
            const currentFinalDwRate = Number(response.result.rate[t].finalDWRate) * this.increasedValueForAR;
            finalRate.push(currentFinalDwRate.toFixed(2));
            const currentDwRate = Number(response.result.rate[t].DWRate) * this.increasedValueForAR;
            rate.push(currentDwRate.toFixed(2));
          } else {
            const currentFinalDwRate = Number(response.result.rate[t].finalDWRate);
            finalRate.push(currentFinalDwRate.toFixed(2));
            const currentDwRate = Number(response.result.rate[t].DWRate);
            rate.push(currentDwRate.toFixed(2));
          }
        }
      }
    }
    let finalRate11 = Number(costplusAp.totalGrossCharge) * Number(this.costPlusPercentFactor) / 100;
    finalRate = [];
    finalRate.push(costplusAp.totalGrossCharge);
    finalRate.push(finalRate11);
    console.log('costplus', finalRate11, costplusAp);
    this.finalRateCharge = finalRate11 + Number(costplusAp.totalGrossCharge);
    // this.finalRateCharge = this.netChargeArrSum(finalRate);
    /*Compare diffRate is given => if it is given deficit value will be taken diffRate, diffFinalRate and crtRate, if not normal rate and final rate is considered */
    if (response.result.diffRate === 0 && response.result.diffWeight === 0 && response.result.finalDiffRate === 0 && response.result.crtRate === 0) {
      this.showDeficitValue = false;
    } else {
      this.showDeficitValue = true;
      if (category === 'AR') {
        const currentDiffRate = Number(response.result.diffRate) * this.increasedValueForAR;
        diffRateArray.push(currentDiffRate.toFixed(2));
        const currentFinalDiffRate = Number(response.result.finalDiffRate) * this.increasedValueForAR;
        diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
        const currentCrtRate = Number(response.result.crtRate) * this.increasedValueForAR;
        crtRateArray.push(currentCrtRate.toFixed(2));
      } else {
        const currentDiffRate = Number(response.result.diffRate);
        diffRateArray.push(currentDiffRate.toFixed(2));
        const currentFinalDiffRate = Number(response.result.finalDiffRate);
        diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
        const currentCrtRate = Number(response.result.crtRate);
        crtRateArray.push(currentCrtRate.toFixed(2));
      }
      const weight = Number(response.result.diffWeight);
      diffWeightArray.push(weight);
      // this.finalRateCharge = this.finalRateCharge + this.netChargeArrSum(diffRateArray);
    }
    /*Discounted Rate => finalRate * (1-(discount/100))*/
    if (factoring !== 'COSTPLUS') {
      discountedRateCalculation = (this.finalRateCharge * (1 - (discount / 100)));
    } else {
      let discountedRateNewCalculation = (this.finalRateCharge * (1 - (discount / 100)));
      discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusPercentFactor));
    }
    console.log('CostplusDiscountedratecalculation', discountedRateCalculation);
    /* Comparing discounted Rate and the minCharge given in the customer business rules and Amc in set master data*/
    if (profileMinimumCharge !== undefined && profileMinimumCharge !== '' && profileMinimumCharge !== null) {
      if (Number(profileMinimumCharge) > Number(discountedRateCalculation)) {
        // discountedRate = Number(profileMinimumCharge);
        if (factoring !== 'COSTPLUS') {
          discountedRate = Number(profileMinimumCharge);
          console.log('profileFedex1 ', discountedRate);
        } else {
          discountedRate = (Number(profileMinimumCharge) * Number(this.costPlusPercentFactor)).toFixed(2);
          console.log('profileFedex3 cost plus ', discountedRate);
        }
      } else {
        discountedRate = Number(discountedRateCalculation.toFixed(2));
      }
    } else {
      if (amc !== '' && amc !== null && amc !== undefined) {
        if (Number(amc) > Number(discountedRateCalculation)) {
          if (factoring !== 'COSTPLUS') {
            discountedRate = Number(amc);
            console.log('profileFedex1 ', discountedRate);
          } else {
            discountedRate = (Number(amc) * Number(this.costPlusPercentFactor)).toFixed(2);
            console.log('profileFedex3 cost plus ', discountedRate);
          }

        } else {
          discountedRate = Number(discountedRateCalculation.toFixed(2));
        }
      } else {
        discountedRate = Number(discountedRateCalculation.toFixed(2));
      }
    }
    //     let Apdiscountrate;
    //     console.log('jefrin',this.resultArray);
    //     if (this.userData.carrier === 'YRC') {
    //     this.resultArray.forEach((ee) => {
    //       if (ee.category === "AP") {
    //         console.log('jefrin',ee);
    //         Apdiscountrate = ee.discountedRate[0];
    //         if (Number(Apdiscountrate) > discountedRate) {
    //           console.log('jefrin',discount);
    //           let x = Apdiscountrate * 1.05;
    //           discountedRate = x.toFixed(2);
    // this.showcolor = true;
    //           let y = x/((100-discount)/100);
    //           console.log('jefrin',y);
    //           finalRate = [];
    //           finalRate.push(y.toFixed(2));
    //           this.finalRateCharge = []
    //           this.finalRateCharge = this.netChargeArrSum(finalRate);

    //           // finalRateCharge
    //         }
    //       }
    //     })
    //   }
    discountedRateArray.push(discountedRate);
    /*Net charge => (1+(fuelSurchareg/100))*discountedRate */
    if (factoring !== 'COSTPLUS') {
      const netCharge = (1 + (fuelSurcharge / 100)) * discountedRate;
      netChargeArray.push(netCharge.toFixed(2));
      const netChargeResult = ((discountedRate) * (fuelSurcharge / 100));
      netChargeResultArray.push(netChargeResult.toFixed(2));
    } else {
      const netCharge = (1 + (fuelSurcharge / 100)) * discountedRate;
      netChargeArray.push(netCharge.toFixed(2));
      const netChargeResult = ((discountedRate) * (fuelSurcharge / 100));
      netChargeResultArray.push(netChargeResult.toFixed(2));
    }
    let assessorialUnique = [], uniqueArray = [];
    console.log('this.selectedItems before duplicating', this.selectedItems);
    // assessorialUnique = this.getUnique(this.selectedItems, 'name');
    // console.log('assessorialUnique', assessorialUnique);
    uniqueArray = this.selectedItems;
    // if (uniqueArray.length > 0) {
    //   for (let a = 0; a < uniqueArray.length; a++) {
    //     if (uniqueArray[a].itemName === 'LiftGate Delivery') {
    //       uniqueArray[a].itemName = 'LiftGate Delivery';
    //     } else if (uniqueArray[a].itemName === 'LiftGate PickUp') {
    //       uniqueArray[a].itemName = 'LiftGate Delivery';
    //     }else if (uniqueArray[a].itemName === 'Residential PickUp') {
    //       uniqueArray[a].itemName = 'Residential Delivery';
    //     }else if (uniqueArray[a].itemName === 'Residential Delivery') {
    //       uniqueArray[a].itemName = 'Residential Delivery';
    //     }else if (uniqueArray[a].itemName === 'Limited Access PickUp') {
    //       uniqueArray[a].itemName = 'Limited Access Delivery';
    //     }else if (uniqueArray[a].itemName === 'Limited Access Delivery') {
    //       uniqueArray[a].itemName = 'Limited Access Delivery';
    //     } else {
    //       uniqueArray[a].itemName = assessorialUnique[a].itemName;
    //     }
    //   }
    // }
    console.log('assessorialUnique After', uniqueArray);
    /* assessorial function => static values if customer rule is given that value will be considered*/
    if (factoring !== 'COSTPLUS') {
      assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.parseSetMasterData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
    } else {
      assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
    }
    assessorialCharge = assessorialChargeArray[0];
    this.arrayData = this.pricingInfoService.getAssessorial();
    const netChargeValue = this.netChargeArrSum(netChargeArray);
    if (carrierType === 'YRC') {
      addCACharge = Number(response.result.additionalCharge);
    } else {
      addCACharge = Number(response.result.reddawayCaCharge);

    }
    highCost = 0;
    console.log('total', highCost, addCACharge, addSingleShipmentCharge, assessorialCharge)
    totalAssessorialCharge = Number(highCost) + Number(addCACharge) + Number(addSingleShipmentCharge) + assessorialCharge;
    /*totalCharge => Add netCharge, assessorialCharge, addCACharge, highCost, addSingleShipmentCharge */
    if (factoring !== "COSTPLUS") {
      const totalCharge = Number(highCost) + Number(addCACharge) + Number(netChargeValue) + Number(addSingleShipmentCharge) + assessorialCharge;
      totalChargeArray.push(totalCharge.toFixed(2));
    } else {
      const totalCharge = Number(highCost) + Number(addCACharge) + Number(netChargeValue) + Number(addSingleShipmentCharge) + assessorialCharge;
      totalChargeArray.push(totalCharge.toFixed(2));
    }
    classification1.splice(0, 2);
    const totalChargeForComparing = this.netChargeArrSum(totalChargeArray)
    minimumClass = Math.min(...classificationArray);
    this.pricingInformation = {
      rate: rate,
      finalRate: finalRate,
      totalGrossCharge: this.finalRateCharge.toFixed(2),
      discount: discountArray,
      fuelChargeYrc: fuelSurchargeArray,
      fuelCharge: fuelSurchargeArray,
      discountedRate: discountedRateArray,
      netCharge: netChargeArray,
      totalCharge: totalChargeArray,
      fuelChargeDiff: fuelSurcharge,
      discountDiff: discount,
      weight: weightArray,
      classification: classificationArray,
      classification1: classification1,
      diffWeight: diffWeightArray,
      diffRate: diffRateArray,
      diffFinalRate: diffFinalRateArray,
      crtRate: crtRateArray,
      diffDiscountedRate: discountedRateArray,
      diffNetCharge: netChargeArray,
      assessorialCharge: assessorialCharge,
      assessorialChargeValue: totalAssessorialCharge,
      assessorialDataList: this.arrayData,
      netChargeResult: netChargeResultArray,
      netChargeDiffResult: netChargeResultArray,
      additionalCharge: addCACharge,
      singleShipmentCharge: addSingleShipmentCharge,
      highCostDeliveryCharge: highCost,
      category: category,
      showMinimumCharge: this.showMinimumCharge,
      shipTypes: this.showDirections,
      carrierType: carrierType,
      netChargeValue: netChargeValue,
      totalChargeForComparing: totalChargeForComparing,
      factor: factoring,
      costPlusPercent: this.costPlusPercentFactor,
      // totalWeight: this.finalTotalWeight,
      // higherValueAP: this.higherValueAP,
      // showcolor: this.showcolor
      totalWeight: this.weightForCal,
      higherValueAp: this.higherValueAp,
      showcolor: this.showcolor
    };
    this.resultArray.push(this.pricingInformation);
    if (this.resultArray.length > 1) {
      this.resultArray.sort(function (a:any, b:any) {
        return (a.category - b.category);
      });
      if (this.resultArray[0].category === 'AP') {
      } else {
        this.resultArray.reverse();
      }
    }

    let rateArray = [];
    if (this.resultArray.length > 1) {
      let Apdiscountrate;
      let Ap, Ar;
      let ARindex;
      this.resultArray.forEach((ee:any, index:any) => {
        if (ee.category === "AP") {
          Ap = ee;

        };
        if (ee.category === "AR") {
          Ar = ee;
          ARindex = index;

        };
      });
      console.log('jefrin', Ap, Ar);
  
      if (this.resultArray[1].factor !== 'COSTPLUS') {
        // if (Number(this.resultArray[0].totalChargeForComparing) > Number(this.resultArray[1].totalChargeForComparing)) {
        //   rateArray.push(this.resultArray[0]);
        //   this.resultArray = [];
        //   this.resultArray = rateArray;
        //   let factorValue = 15;
        //   this.costPlusPercentFactor = 1 + (Number(factorValue) / 100);
        //   this.higherValueAp = true;
        //   if (this.userData.carrier === 'YRC') {
        //     // if()
        //     this.getYRCForCostPlus();
        //   } else {
        //     this.getReddawayForCostPlus();
        //   }
        // } else {
        if (this.userData.carrier === 'YRC') {
          if (this.resultArray.length > 2) {

            this.giveRateDetails(this.resultArray, 'AR');
          }
        } else {
          if (this.resultArray.length > 1) {

            this.giveRateDetails(this.resultArray, 'AR');
          }
        }
        this.showLoader = false;

        // this.giveRateDetails(this.resultArray, 'AR');
        let apivalue:any; 
        this.resultArray.forEach((mm:any)=>{
         if(mm.category === 'AR') {
apivalue = mm;
         }
        })
        this.totalChargeValue = this.netChargeArrSum(apivalue.totalCharge);
        this.factorization = this.resultArray[1].factor;
        // }
      } else {
        // this.giveRateDetails(this.resultArray, 'AR');
        if (this.userData.carrier === 'YRC') {
          if (this.resultArray.length > 2) {
            this.giveRateDetails(this.resultArray, 'AR');
          }
        } else {
          if (this.resultArray.length > 1) {

            this.giveRateDetails(this.resultArray, 'AR');
          }
        }
        let apivalue:any;
        this.resultArray.forEach((mm:any)=>{
          if(mm.category === 'AR') {
 apivalue = mm;
          }
         })
        this.totalChargeValue = this.netChargeArrSum(apivalue.totalCharge);
        this.factorization = this.resultArray[1].factor;
      }
    }
  }
  rateCalculationForYRCReddaway2(response:any, carrierType:any, category:any, factoring:any) {
    let date = new Date();
    let discount, fuelSurcharge, rateId, amc, highCost, addCACharge, addRate, discountedRate:any,
      addSingleShipmentCharge, minimumClass, totalAssessorialCharge, assessorialCharge, customerBusinessRule = [],
      assessorialChargeArray = [], profileAssessorials = [];
    const weightArray = [], classificationArray = [], classification1 = [], finalRateArray = [],
      discountedRateArray = [],
      netChargeArray = [], netChargeResultArray = [], totalChargeArray = [];
    const finalRate = [], rate = [], crtRateArray = [], fuelSurchargeArray = [];
    const diffFinalRateArray = [], diffRateArray = [], discountArray = [], diffWeightArray = [];
    let profileMinimumCharge, profileLifeGateCharge, profileResidentialCharge, profileLimitedAccessDelivery,
      profileInsideDelivery, profileNotify, profileSingleShipment, singleShipmentsetMasterData, profiledeliveryAppointmentRequired, profilehazmat, profileLiftGatePickupCharge, profileResidentialPickupcharge, profilelimitedpickup;
    this.parseSetMasterData = [];
    this.pricingInformation = {};
    let finalRateCal;
    let currentFinalRate, currentRate, currentDwRate, currentFinalDwRate;
    this.showDirections = '';
    this.showSingleShipmentValue = false;
    this.showDeficitValue = false;
    this.showMinimumCharge = false;
    this.arrayData = [];
    let discountedRateCalculation;
    let staticData:any = localStorage.getItem('artableData');
    this.localStorageArData = JSON.parse(staticData);
    if (category === 'AP') {
      /*set master data discount, minimum charge values which is stored in local storage */
      const setMasterData:any = localStorage.getItem('aptableData');
      this.parseSetMasterData = JSON.parse(setMasterData);
      if (carrierType === 'YRC') {
        if (Object.keys(response.result.yrcProfileRateAp).length === 0 || response.result.yrcProfileRateAp === '') {
          customerBusinessRule = [];
        } else {
          if (response.result.yrcProfileRateAp.liftGateService !== undefined) {
            customerBusinessRule.push(response.result.yrcProfileRateAp);
          } else {
            response.result.yrcProfileRateAp.liftGateService = '';
            response.result.yrcProfileRateAp.residentialDelivery = '';
            response.result.yrcProfileRateAp.limitedAccessDelivery = '';
            response.result.yrcProfileRateAp.insideDelivery = '';
            response.result.yrcProfileRateAp.notify = '';
            response.result.yrcProfileRateAp.singleShipment = '';
            response.result.yrcProfileRateAp.deliveryAppointmentRequired = '';
            response.result.yrcProfileRateAp.hazmat = '';
            customerBusinessRule.push(response.result.yrcProfileRateAp);
          }
        }
        /*
   check the origin state and destination state for 'CA' add 8.50 for YRC alone
    */
      } else {
        customerBusinessRule = response.result.reddawayProfileRateAp;
      }
    } else {
      /*set master data discount, minimum charge values which is stored in local storage */
      const setMasterData:any = localStorage.getItem('artableData');
      this.parseSetMasterData = JSON.parse(setMasterData);
      /*Customer specific rules*/
      if (carrierType === 'YRC') {
        customerBusinessRule = response.result.yrcProfileRateAr;
        if (customerBusinessRule.length > 0) {
          for (let c = 0; c < customerBusinessRule.length; c++) {
            if (customerBusinessRule[c].liftGateService !== undefined) {
            } else {
              customerBusinessRule[c].liftGateService = '';
              customerBusinessRule[c].residentialDelivery = '';
              customerBusinessRule[c].limitedAccessDelivery = '';
              customerBusinessRule[c].insideDelivery = '';
              customerBusinessRule[c].notify = '';
              customerBusinessRule[c].singleShipment = '';
              customerBusinessRule[c].deliveryAppointmentRequired = '';
              customerBusinessRule[c].hazmat = '';

            }
          }
        } else {

        }
        /*
   check the origin state and destination state for 'CA' add 8.50 for YRC alone
    */
      } else {
        customerBusinessRule = response.result.reddawayProfileRateAr;
      }
    }
    if (factoring !== 'COSTPLUS') {
      for (let i = 0; i < this.parseSetMasterData.length; i++) {
        if (this.parseSetMasterData[i].companyName === carrierType) {
          discount = this.parseSetMasterData[i].discount;
          fuelSurcharge = this.parseSetMasterData[i].fuelsurcharge;
          rateId = this.parseSetMasterData[i].recentRateId;
          amc = this.parseSetMasterData[i].amc;
          if (this.parseSetMasterData[i].assessorials !== undefined) {
            this.parseSetMasterData.assessorials = JSON.parse(this.parseSetMasterData[i].assessorials);
            if (this.parseSetMasterData.assessorials.length > 0) {
              for (let i = 0; i < this.parseSetMasterData.assessorials.length; i++) {
                if (this.parseSetMasterData.assessorials[i].name === 'Single Shipment') {
                  singleShipmentsetMasterData = this.parseSetMasterData.assessorials[i];
                  break;
                } else {
                  singleShipmentsetMasterData = '';
                }
              }
            }
          } else {
            // this.parseSetMasterData.assessorials = [];
          }
          // this.parseSetMasterData.assessorials = JSON.parse(this.parseSetMasterData[i].assessorials);
          if (this.userData.originState === 'CA' || this.userData.destinationState === 'CA') {
            if (this.parseSetMasterData[i].caCharge !== '' && this.parseSetMasterData[i].caCharge !== null && this.parseSetMasterData[i].caCharge !== undefined) {
              addCACharge = Number(this.parseSetMasterData[i].caCharge);
            } else {
              addCACharge = 0;
            }
          } else {
            addCACharge = 0;
          }
        }
      }
    } else {
      for (let apData = 0; apData < this.parseSetMasterData.length; apData++) {
        if (this.parseSetMasterData[apData].companyName === carrierType) {
          discount = this.parseSetMasterData[apData].discount;
          fuelSurcharge = this.parseSetMasterData[apData].fuelsurcharge;
          rateId = this.parseSetMasterData[apData].recentRateId;
          amc = this.parseSetMasterData[apData].amc;
        }
      }
      for (let i = 0; i < this.localStorageArData.length; i++) {
        if (this.localStorageArData[i].companyName === carrierType) {
          this.localStorageArData.assessorials = JSON.parse(this.localStorageArData[i].assessorials);
          if (this.localStorageArData.assessorials.length > 0) {
            for (let i = 0; i < this.localStorageArData.assessorials.length; i++) {
              if (this.localStorageArData.assessorials[i].name === 'Single Shipment') {
                singleShipmentsetMasterData = this.localStorageArData.assessorials[i];
                break;
              } else {
                singleShipmentsetMasterData = '';
              }
            }
          }
          if (this.originState === 'CA' || this.destinationState === 'CA') {
            if (this.localStorageArData[i].caCharge !== '' && this.localStorageArData[i].caCharge !== null && this.localStorageArData[i].caCharge !== undefined) {
              addCACharge = this.localStorageArData[i].caCharge;
            } else {
              addCACharge = 0;
            }
          } else {
            addCACharge = 0;
          }
        }
      }
    }
    for (let i = 0; i < response.result.classWeight.length; i++) {
      const weight = response.result.classWeight[i].weight;
      weightArray.push(weight);
      const classification = response.result.classWeight[i].classification;
      classificationArray.push(classification);
      classification1.push(classification);
    }
    this.weightForCal = this.netChargeArrSum(weightArray);
    /*Both the additional rate and additional min rate is given */
    /*AdditionalMinRate => additinalRate*totalWeight/100*/
    if (carrierType === 'YRC') {
      if (response.result.additionalMinRate !== 0) {
        const additionalRateCalculation = (Number(response.result.additionalRate) * (this.weightForCal / 100));
        if (Number(additionalRateCalculation) < Number(response.result.additionalMinRate)) {
          highCost = Number(response.result.additionalMinRate);
        } else {
          highCost = Number(additionalRateCalculation).toFixed(2);
        }
      } else {
        /*AdditionalMinRate is zero and additional rate is given*/
        if (response.result.additionalRate !== 0) {
          highCost = Number(response.result.additionalRate);
        } else {
          highCost = 0;
        }
      }
    } else {
      if (Number(response.result.additionalMaxRate) !== 0) {
        const additionalRateCalculation = (Number(response.result.additionalRate) * (this.weightForCal / 100));
        if (Number(additionalRateCalculation) < Number(response.result.additionalMinRate)) {
          highCost = Number(response.result.additionalMinRate);
        } else if (Number(additionalRateCalculation) > Number(response.result.additionalMaxRate)) {
          highCost = Number(response.result.additionalMaxRate);
        } else {
          highCost = Number(additionalRateCalculation).toFixed(2);
        }
      } else {
        if (Number(response.result.additionalRate) !== 0) {
          highCost = Number(response.result.additionalRate);
        } else {
          highCost = 0;
        }
      }
      console.log('reddaway highcost', highCost);
    }
    /* If Customer Business rule is given discount, minCharge is taken,
    Else part shipTypes is direct setmaster data values are taken,
    shipTypes is non-direct discount is 0 zero
     */
    if (customerBusinessRule.length > 0) {
      for (let pr = 0; pr < customerBusinessRule.length; pr++) {
        this.showDirections = response.result.shipTypes;
        discount = customerBusinessRule[pr].profileDiscount;
        fuelSurcharge = fuelSurcharge;
        if (customerBusinessRule[pr].profileMinCharge !== undefined) {
          profileMinimumCharge = customerBusinessRule[pr].profileMinCharge;
        } else {
          profileMinimumCharge = amc;
        }
        if (factoring !== 'COSTPLUS') {
          profileLifeGateCharge = customerBusinessRule[pr].liftGateService;
          profileResidentialCharge = customerBusinessRule[pr].residentialDelivery;
          profileLimitedAccessDelivery = customerBusinessRule[pr].limitedAccessDelivery;
          profileInsideDelivery = customerBusinessRule[pr].insideDelivery;
          profileNotify = customerBusinessRule[pr].notify;
          profileSingleShipment = customerBusinessRule[pr].singleShipment;
          profiledeliveryAppointmentRequired = customerBusinessRule[pr].deliveryAppointmentRequired;
          profilehazmat = customerBusinessRule[pr].hazmat;
          profileLiftGatePickupCharge = customerBusinessRule[pr].liftGateService;
          profileResidentialPickupcharge = customerBusinessRule[pr].residentialDelivery;
          profilelimitedpickup = customerBusinessRule[pr].limitedAccessDelivery;
          profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
            { residential: profileResidentialCharge, id: 2 },
            { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
            { insideDelivery: profileInsideDelivery, id: 4 },
            { notify: profileNotify, id: 5 },
            { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id: 7 },
            { hazmat: profilehazmat, id: 8 },
            { liftGatePickup: profileLiftGatePickupCharge, 'id': 10 },
            { residentialPickup: profileResidentialPickupcharge, 'id': 11 },
            { limitedaccesspickup: profilelimitedpickup, 'id': 12 });
        } else {
          if (this.getARRule.length > 0) {
            profileLifeGateCharge = this.getARRule[0].liftGateService;
            profileResidentialCharge = this.getARRule[0].residentialDelivery;
            profileLimitedAccessDelivery = this.getARRule[0].limitedAccessDelivery;
            profileInsideDelivery = this.getARRule[0].insideDelivery;
            profileNotify = this.getARRule[0].notify;
            profileSingleShipment = this.getARRule[0].singleShipment;
            profiledeliveryAppointmentRequired = this.getARRule[0].deliveryAppointmentRequired;
            profilehazmat = this.getARRule[0].hazmat;
            profileLiftGatePickupCharge = this.getARRule[0].liftGateService;
            profileResidentialPickupcharge = this.getARRule[0].residentialDelivery;
            profilelimitedpickup = this.getARRule[0].limitedAccessDelivery;

            profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
              { residential: profileResidentialCharge, id: 2 },
              { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
              { insideDelivery: profileInsideDelivery, id: 4 },
              { notify: profileNotify, id: 5 },
              { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id: 7 },
              { hazmat: profilehazmat, id: 8 },
              { liftGatePickup: profileLiftGatePickupCharge, 'id': 10 },
              { residentialPickup: profileResidentialPickupcharge, 'id': 11 },
              { limitedaccesspickup: profilelimitedpickup, 'id': 12 });
          } else {
            profileAssessorials.push({ liftGate: '', 'id': 1 },
              { residential: '', 'id': 2 },
              { limitedAccessDelivery: '', 'id': 3 },
              { insideDelivery: '', id: 4 },
              { notify: '', 'id': 5 },
              { deliveryAppointmentRequired: '', 'id': 7 },
              { hazmat: '', 'id': 8 },
              { liftGatePickup: '', 'id': 10 },
              { residentialPickup: '', 'id': 11 },
              { limitedaccesspickup: '', 'id': 12 });
          }
        }
      }
    } else {
      if (response.result.shipTypes === 'Direct') {
        this.showDirections = 'Direct';
        discount = discount;
        fuelSurcharge = fuelSurcharge;
      } else {
        this.showDirections = 'Non-Direct';
        if (carrierType === 'YRC') {
          discount = 80;
        } else {
          discount = 0;
        }
        fuelSurcharge = fuelSurcharge;
      }
      if (factoring === 'COSTPLUS') {
        if (this.getARRule.length > 0) {
          profileLifeGateCharge = this.getARRule[0].liftGateService;
          profileResidentialCharge = this.getARRule[0].residentialDelivery;
          profileLimitedAccessDelivery = this.getARRule[0].limitedAccessDelivery;
          profileInsideDelivery = this.getARRule[0].insideDelivery;
          profileNotify = this.getARRule[0].notify;
          profileSingleShipment = this.getARRule[0].singleShipment;
          profiledeliveryAppointmentRequired = this.getARRule[0].deliveryAppointmentRequired;
          profilehazmat = this.getARRule[0].hazmat;
          profileLiftGatePickupCharge = this.getARRule[0].liftGateService;
          profileResidentialPickupcharge = this.getARRule[0].residentialDelivery;
          profilelimitedpickup = this.getARRule[0].limitedAccessDelivery;
          profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
            { residential: profileResidentialCharge, id: 2 },
            { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
            { insideDelivery: profileInsideDelivery, id: 4 },
            { notify: profileNotify, id: 5 },
            { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id: 7 },
            { hazmat: profilehazmat, id: 8 },
            { liftGatePickup: profileLiftGatePickupCharge, 'id': 10 },
            { residentialPickup: profileResidentialPickupcharge, 'id': 11 },
            { limitedaccesspickup: profilelimitedpickup, 'id': 12 });
        } else {
          profileAssessorials.push({ liftGate: '', 'id': 1 },
            { residential: '', 'id': 2 },
            { limitedAccessDelivery: '', 'id': 3 },
            { insideDelivery: '', id: 4 },
            { notify: '', 'id': 5 },
            { deliveryAppointmentRequired: '', 'id': 7 },
            { hazmat: '', 'id': 8 },
            { liftGatePickup: '', 'id': 10 },
            { residentialPickup: '', 'id': 11 },
            { limitedaccesspickup: '', 'id': 12 });
        }
      } else {
        profileAssessorials.push({ liftGate: '', 'id': 1 },
          { residential: '', 'id': 2 },
          { limitedAccessDelivery: '', 'id': 3 },
          { insideDelivery: '', id: 4 },
          { notify: '', 'id': 5 },
          { deliveryAppointmentRequired: '', 'id': 7 },
          { hazmat: '', 'id': 8 },
          { liftGatePickup: '', 'id': 10 },
          { residentialPickup: '', 'id': 11 },
          { limitedaccesspickup: '', 'id': 12 });
      }
    }
    discountArray.push(discount);
    fuelSurchargeArray.push(fuelSurcharge);
    if (carrierType === 'YRC') {
      if (this.weightForCal < 500) {
        if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
          addSingleShipmentCharge = Number(profileSingleShipment);
        } else {
          if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
            addSingleShipmentCharge = Number(singleShipmentsetMasterData.cost);
          } else {
            addSingleShipmentCharge = 0;
          }
        }
      } else {
        addSingleShipmentCharge = 0;
      }
    } else {
      if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
        addSingleShipmentCharge = Number(profileSingleShipment);
      } else {
        if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
          addSingleShipmentCharge = Number(singleShipmentsetMasterData.cost);
        } else {
          addSingleShipmentCharge = 0;
        }
      }
    }
    /*
    check the type is Rate or DwRate
     */
    if (response.result.type === 'Rate') {
      console.log('YRC rate 1', response.result.rate);
      for (let i = 0; i < response.result.rate.length; i++) {
        if (category === 'AR') {
          finalRateCal = Number(response.result.rate[i].finalRate) * this.increasedValueForAR;
        } else {
          finalRateCal = Number(response.result.rate[i].finalRate);
        }
        finalRateArray.push(finalRateCal.toFixed(2));
        console.log('YRC rate 2', finalRateArray);
      }
    } else {
      for (let i = 0; i < response.result.rate.length; i++) {
        if (category === 'AR') {
          finalRateCal = Number(response.result.rate[i].finalDWRate) * this.increasedValueForAR;
        } else {
          finalRateCal = Number(response.result.rate[i].finalDWRate);
        }
        finalRateArray.push(finalRateCal.toFixed(2));
        console.log('YRC rate 3', finalRateArray);
      }
    }
    addRate = this.netChargeArrSum(finalRateArray);
    let minCharges;
    /*Compare final rate and mincharges if minCharges > final rate (mincharges is taken) if not final rate is taken*/

    for (let t = 0; t < response.result.rate.length; t++) {
      if (response.result.type === 'Rate') {
        if (carrierType === 'YRC') {
          if (category === 'AR') {
            minCharges = Number(response.result.minCharges) * this.increasedValueForAR;
          } else {
            minCharges = Number(response.result.minCharges);
          }
          if (Number(minCharges) > Number(addRate)) {
            this.showMinimumCharge = true;
            if (category === 'AR') {
              currentFinalRate = Number(response.result.minCharges) * this.increasedValueForAR;
            } else {
              currentFinalRate = Number(response.result.minCharges);
            }
            finalRate.push(currentFinalRate.toFixed(2));
          } else {
            this.showMinimumCharge = false;
            if (category === 'AR') {
              currentFinalRate = Number(response.result.rate[t].finalRate) * this.increasedValueForAR;
            } else {
              currentFinalRate = Number(response.result.rate[t].finalRate);
              currentRate = Number(response.result.rate[t].rate);
            }
            finalRate.push(currentFinalRate.toFixed(2));
          }
          if (category === 'AR') {
            currentRate = Number(response.result.rate[t].rate) * this.increasedValueForAR;
          } else {
            currentRate = Number(response.result.rate[t].rate);
          }
          rate.push(currentRate.toFixed(2));
        } else {
          this.showMinimumCharge = false;
          if (category === 'AR') {
            currentFinalRate = Number(response.result.rate[t].finalRate) * this.increasedValueForAR;
            currentRate = Number(response.result.rate[t].rate) * this.increasedValueForAR;
          } else {
            currentFinalRate = Number(response.result.rate[t].finalRate);
            currentRate = Number(response.result.rate[t].rate);
          }
          finalRate.push(currentFinalRate.toFixed(2));
          rate.push(currentRate.toFixed(2));
        }
      } else {
        /*If part is for YRC => it will check for (mincharges > total final rate) else part reddaway need not check*/
        if (carrierType === 'YRC') {
          if (category === 'AR') {
            minCharges = Number(response.result.minCharges) * this.increasedValueForAR;
          } else {
            minCharges = Number(response.result.minCharges);
          }
          if (Number(minCharges) > Number(addRate)) {
            this.showMinimumCharge = true;
            if (category === 'AR') {
              currentFinalRate = Number(response.result.minCharges) * this.increasedValueForAR;
            } else {
              currentFinalRate = Number(response.result.minCharges);
            }
            finalRate.push(currentFinalRate.toFixed(2));
            this.finalRateCharge = this.netChargeArrSum(finalRate);
          } else {
            this.showMinimumCharge = false;
            if (category === 'AR') {
              const currentFinalDwRate = Number(response.result.rate[t].finalDWRate) * this.increasedValueForAR;
              finalRate.push(currentFinalDwRate.toFixed(2));
            } else {
              const currentFinalDwRate = Number(response.result.rate[t].finalDWRate);
              finalRate.push(currentFinalDwRate.toFixed(2));
            }
          }
          if (category === 'AR') {
            const currentDwRate = Number(response.result.rate[t].DWRate) * this.increasedValueForAR;
            rate.push(currentDwRate.toFixed(2));
          } else {
            const currentDwRate = Number(response.result.rate[t].DWRate);
            rate.push(currentDwRate.toFixed(2));
          }
        } else {
          this.showMinimumCharge = false;
          if (category === 'AR') {
            const currentFinalDwRate = Number(response.result.rate[t].finalDWRate) * this.increasedValueForAR;
            finalRate.push(currentFinalDwRate.toFixed(2));
            const currentDwRate = Number(response.result.rate[t].DWRate) * this.increasedValueForAR;
            rate.push(currentDwRate.toFixed(2));
          } else {
            const currentFinalDwRate = Number(response.result.rate[t].finalDWRate);
            finalRate.push(currentFinalDwRate.toFixed(2));
            const currentDwRate = Number(response.result.rate[t].DWRate);
            rate.push(currentDwRate.toFixed(2));
          }
        }
      }
    }

    this.finalRateCharge = this.netChargeArrSum(finalRate);
    console.log('rate Array Calculation', rate, 'finalRate', finalRate);
    /*Compare diffRate is given => if it is given deficit value will be taken diffRate, diffFinalRate and crtRate, if not normal rate and final rate is considered */
    if (response.result.diffRate === 0 && response.result.diffWeight === 0 && response.result.finalDiffRate === 0 && response.result.crtRate === 0) {
      this.showDeficitValue = false;
    } else {
      this.showDeficitValue = true;
      if (category === 'AR') {
        const currentDiffRate = Number(response.result.diffRate) * this.increasedValueForAR;
        diffRateArray.push(currentDiffRate.toFixed(2));
        const currentFinalDiffRate = Number(response.result.finalDiffRate) * this.increasedValueForAR;
        diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
        const currentCrtRate = Number(response.result.crtRate) * this.increasedValueForAR;
        crtRateArray.push(currentCrtRate.toFixed(2));
      } else {
        const currentDiffRate = Number(response.result.diffRate);
        diffRateArray.push(currentDiffRate.toFixed(2));
        const currentFinalDiffRate = Number(response.result.finalDiffRate);
        diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
        const currentCrtRate = Number(response.result.crtRate);
        crtRateArray.push(currentCrtRate.toFixed(2));
      }
      const weight = Number(response.result.diffWeight);
      diffWeightArray.push(weight);
      this.finalRateCharge = this.finalRateCharge + this.netChargeArrSum(diffRateArray);
    }
    /*Discounted Rate => finalRate * (1-(discount/100))*/
    if (factoring !== 'COSTPLUS') {
      discountedRateCalculation = (this.finalRateCharge * (1 - (discount / 100)));
    } else {
      let discountedRateNewCalculation = (this.finalRateCharge * (1 - (discount / 100)));
      discountedRateCalculation = Number(discountedRateNewCalculation) * Number(this.costPlusPercentFactor);
    }
    // Comparing discounted Rate and the minCharge given in the customer business rules
    if (profileMinimumCharge !== undefined && profileMinimumCharge !== '' && profileMinimumCharge !== null) {
      if (Number(profileMinimumCharge) > Number(discountedRateCalculation)) {

        if (factoring !== 'COSTPLUS') {
          discountedRate = Number(profileMinimumCharge);
        } else {
          discountedRate = (Number(profileMinimumCharge) * Number(this.costPlusPercentFactor)).toFixed(2);
          console.log('discounted Rate ProfileMinimum charge 1', discountedRate);
        }
      } else {
        discountedRate = Number(discountedRateCalculation.toFixed(2));
      }
    } else {
      if (amc !== '' && amc !== null && amc !== undefined) {
        if (Number(amc) > Number(discountedRateCalculation)) {
          if (factoring !== 'COSTPLUS') {
            discountedRate = Number(amc);
          } else {
            discountedRate = (Number(amc) * Number(this.costPlusPercentFactor)).toFixed(2);
            console.log('discounted Rate AMC charge 1', discountedRate);
          }
        } else {
          discountedRate = Number(discountedRateCalculation.toFixed(2));
        }
      } else {
        discountedRate = Number(discountedRateCalculation.toFixed(2));
      }
    }
    discountedRateArray.push(discountedRate);
    /*Net charge => (1+(fuelSurchareg/100))*discountedRate */
    const netCharge = (1 + (fuelSurcharge / 100)) * discountedRate;
    netChargeArray.push(netCharge.toFixed(2));
    const netChargeResult = ((discountedRate) * (fuelSurcharge / 100));
    netChargeResultArray.push(netChargeResult.toFixed(2));
    let assessorialUnique = [], uniqueArray = [];
    console.log('this.selectedItems before duplicating', this.selectedItems, this.selectedItemValue);
    let myClonedArray = Object.assign([], this.selectedItemValue);
    console.log('myClonedArray', myClonedArray);
    let serviceName;
    // myClonedArray = this.getUnique(myClonedArray, 'name');
    myClonedArray = this.selectedItems;
    console.log('assessorialUnique', myClonedArray);
    console.log('assessorialUnique After', myClonedArray);
    /* assessorial function => static values if customer rule is given that value will be considered*/
    if (factoring !== 'COSTPLUS') {
      console.log('this.selectedItems new', this.selectedItems);
      assessorialChargeArray = this.pricingInfoService.assessorialFunction(myClonedArray, this.parseSetMasterData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
      //  assessorialChargeArray = this.pricingInfoService.assessorialFunction(this.selectedItems, this.parseSetMasterData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
    } else {
      console.log('this.selectedItems New 2', this.selectedItems);
      assessorialChargeArray = this.pricingInfoService.assessorialFunction(myClonedArray, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
      //  assessorialChargeArray = this.pricingInfoService.assessorialFunction(this.selectedItems, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
    }
    assessorialCharge = assessorialChargeArray[0];
    this.arrayData = this.pricingInfoService.getAssessorial();
    const netChargeValue = this.netChargeArrSum(netChargeArray);
    if (carrierType === 'YRC') {
      addCACharge = Number(response.result.yrcCaCharge);
    } else {
      addCACharge = Number(response.result.reddawayCaCharge);

    }
    console.log(addCACharge);
    totalAssessorialCharge = Number(highCost) + Number(addCACharge) + Number(addSingleShipmentCharge) + Number(assessorialCharge);
    /*totalCharge => Add netCharge, assessorialCharge, addCACharge, highCost, addSingleShipmentCharge */
    const totalCharge = Number(highCost) + Number(addCACharge) + Number(netChargeValue) + Number(addSingleShipmentCharge) + Number(assessorialCharge);
    totalChargeArray.push(totalCharge.toFixed(2));
    classification1.splice(0, 1);
    minimumClass = Math.min(...classificationArray);
    const totalChargeForComparing = this.netChargeArrSum(totalChargeArray);
    this.pricingInformation = {
      rate: rate,
      finalRate: finalRate,
      discount: discountArray,
      fuelChargeYrc: fuelSurchargeArray,
      fuelCharge: fuelSurchargeArray,
      discountedRate: discountedRateArray,
      netCharge: netChargeArray,
      totalCharge: totalChargeArray,
      fuelChargeDiff: fuelSurcharge,
      discountDiff: discount,
      weight: weightArray,
      classification: classificationArray,
      classification1: classification1,
      diffWeight: diffWeightArray,
      diffRate: diffRateArray,
      diffFinalRate: diffFinalRateArray,
      crtRate: crtRateArray,
      diffDiscountedRate: discountedRateArray,
      diffNetCharge: netChargeArray,
      assessorialCharge: assessorialCharge,
      assessorialChargeValue: totalAssessorialCharge,
      assessorialDataList: this.arrayData,
      netChargeResult: netChargeResultArray,
      netChargeDiffResult: netChargeResultArray,
      additionalCharge: addCACharge,
      singleShipmentCharge: addSingleShipmentCharge,
      highCostDeliveryCharge: highCost,
      category: 'OLDAP',
      showMinimumCharge: this.showMinimumCharge,
      shipTypes: this.showDirections,
      carrierType: carrierType,
      netChargeValue: netChargeValue,
      totalChargeForComparing: totalChargeForComparing,
      factor: factoring,
      totalWeight: this.weightForCal,
      higherValueAp: this.higherValueAp,
      showcolor: false

    };
    this.resultArray.push(this.pricingInformation);
    if (this.resultArray.length > 1) {
      this.resultArray.sort(function (a:any, b:any) {
        return (a.category - b.category);
      });
      if (this.resultArray[0].category === 'AP') {

      } else {
        this.resultArray.reverse();
      }
    }
    console.log('this.pricingInformation', this.pricingInformation);
    console.log('this.resultArray responses', this.resultArray);
    let rateArray = [];
    if (this.resultArray.length > 2) {
      this.showLoader = false;
      let Apdiscountrate;
      let Ap:any, Ar:any;
      let ARindex;
      this.resultArray.forEach((ee:any, index:any) => {
        if (ee.category === "AP") {
          Ap = ee;

        };
        if (ee.category === "AR") {
          Ar = ee;
          ARindex = index;

        };
      });
      console.log('jefrin', Ap, Ar);
      Apdiscountrate = Ap.discountedRate;
      if (Apdiscountrate > Ar.discountedRate) {
        console.log('jefrin', Apdiscountrate);
        let x = Ap.discountedRate * 1.05;
        let xarr = [];
        xarr.push(x.toFixed(2))
        Ar.discountedRate = xarr;
        Ar.showcolor = true;
        let y = x / ((100 - Ar.discount[0]) / 100);
        console.log('jefrin', y);
        let finalRate1 = []
        finalRate1.push(y.toFixed(2));
        Ar.finalRate = finalRate1
        this.finalRateCharge = []

        this.finalRateCharge = this.netChargeArrSum(finalRate1);
        Ar.totalGrossCharge = this.finalRateCharge.toFixed(2);
        // discountedRateArray.push(discountedRate);
        /*Net charge => (1+(fuelSurchareg/100))*discountedRate */
        if (Ar.factoring !== 'COSTPLUS') {
          const netCharge = (1 + (Ar.fuelCharge[0] / 100)) * x;
          let netc = [];
          netc.push(netCharge.toFixed(2));
          Ar.netChargeArray = netc
          const netChargeResult = ((x) * (Ar.fuelCharge / 100));
          let resNetArray = []
          resNetArray.push(netChargeResult.toFixed(2));
          Ar.netChargeResultArray = resNetArray;
        } else {

          const netCharge = (1 + (Ar.fuelCharge[0] / 100)) * x;
          let netc = [];
          netc.push(netCharge.toFixed(2));
          Ar.netChargeArray = netc
          const netChargeResult = ((x) * (Ar.fuelCharge / 100));
          let resNetArray = []
          resNetArray.push(netChargeResult.toFixed(2));
          Ar.netChargeResultArray = resNetArray;
        }
        const netChargeValue = this.netChargeArrSum(Ar.netChargeArray);

        // if (factoring !== "COSTPLUS") {
        const totalCharge = Number(Ar.highCostDeliveryCharge) + Number(Ar.additionalCharge) + Number(Ar.netChargeArray[0]) + Number(Ar.singleShipmentCharge) + Ar.assessorialCharge;
        let tt:any = [];
        Ar.totalCharge = tt;
        tt.push(totalCharge.toFixed(2));
        Ar.totalChargeArray = tt;
        // } else {
        //   const totalCharge = Number(highCost) + Number(addCACharge) + Number(netChargeValue) + Number(addSingleShipmentCharge) + assessorialCharge;
        //   totalChargeArray.push(totalCharge.toFixed(2));
        // }
        // finalRateCharge
        if(this.applyCostFactor === false) {
        if (Ap.totalCharge > Ar.totalCharge[0]) {
          this.showAdminErrorMessage = true;
          $("#getRate-modal").modal('hide');
          // $('#hazmadModal').modal('hide');


        }
      }
      }
      if (Ap.totalCharge > Ar.totalCharge[0]) {
        // this.showNegativeMargin = true;
        let charge = Number(Ap.totalCharge)* 5/100;
        let addedCharge = charge + Number(Ap.totalCharge)
        let charegArry = [];
        charegArry.push(addedCharge.toFixed(2));
        Ar.totalCharge = charegArry;
        // this.showData = false;
      }
      let apivalue:any;
      this.resultArray.forEach((mm:any)=>{
        if(mm.category === 'AR') {
apivalue = mm;
        }
       });
       this.totalChargeValue = this.netChargeArrSum(apivalue.totalCharge);

      if (this.resultArray[1].factor !== 'COSTPLUS') {
        if (Number(this.resultArray[0].totalChargeForComparing) > Number(this.resultArray[1].totalChargeForComparing)) {
          rateArray.push(this.resultArray[0]);
          this.resultArray = [];
          this.resultArray = rateArray;
          let factorValue = 15;
          this.costPlusPercentFactor = 1 + (Number(factorValue) / 100);
          this.higherValueAp = true;
          if (this.userData.carrier === 'YRC') {
            this.getYRCForCostPlus();
          } else {
            this.getReddawayForCostPlus();
          }
        } else {
          // this.giveRateDetails(this.resultArray, 'AR');
          if (this.userData.carrier === 'YRC') {
            if (this.resultArray.length > 2) {
              this.giveRateDetails(this.resultArray, 'AR');
            }
          } else {
            this.giveRateDetails(this.resultArray, 'AR');

          }
          this.totalChargeValue = this.netChargeArrSum(apivalue.totalCharge);
          this.factorization = this.resultArray[1].factor;
        }
      } else {
        // this.giveRateDetails(this.resultArray, 'AR');
        if (this.userData.carrier === 'YRC') {
          if (this.resultArray.length > 2) {
            this.giveRateDetails(this.resultArray, 'AR');
          }
        } else {
          this.giveRateDetails(this.resultArray, 'AR');

        }
        this.factorization = this.resultArray[1].factor;
      }
    }
  }

  rateCalculationForYRCReddaway1(response:any, carrierType:any, category:any, factoring:any) {
    // this.pricingInfo = [];
    console.log(response);
    this.finalRateCharge = this.netChargeArrSum(response.result.finalRate);
    let classA:any = [];
    let weighta:any = []

    this.userData.classWeight.forEach((ele:any) => {
      classA.push(ele.classification);
      weighta.push(ele.weight)
    });
    let classification1 = classA;
    let classificationArray = classA;
    let netChargePercent = 0;
    let finalTotalRate = 0;
    let discountPercent = 0;
    let discountFull = 0;
    let discountaa = [];
    let accessArray:any = [];
    let accessorialRate = 0;
    if (response.result.assessorialDataList.length > 0) {
      response.result.assessorialDataList.forEach((el:any) => {
        let splitted = el.split('-');
        console.log('splitted', splitted);
        if (splitted[0] === 'LIMITED ACCESS PICKUP ' || splitted[0] === 'LIMITED ACCESS PICKUP ') {
          accessArray.push('Limited Access PickUp -' + splitted[1]);
          accessorialRate += Number(splitted[1]);
        } else if (splitted[0] === 'LIMITED ACCESS DELIVERY ') {
          accessArray.push('Limited Access Delivery -' + splitted[1]);
          accessorialRate += Number(splitted[1]);
        } else if (splitted[0] === 'RESIDENTIAL PICKUP FEE ') {
          accessArray.push('Residentail PickUp -' + splitted[1]);
          accessorialRate += Number(splitted[1]);
        } else if (splitted[0] === 'RESIDENTIAL DELIVERY FEE ' || splitted[0] === 'ResidentialDelivery') {
          accessArray.push('Residential Delivery -' + splitted[1]);
          accessorialRate += Number(splitted[1]);
        } else if (splitted[0] === 'LIFTGATE SERVICE DESTINATION ' || splitted[0] === 'LiftgateDelivery') {
          accessArray.push('LiftGate Delievry -' + splitted[1]);
          accessorialRate += Number(splitted[1]);
        } else if (splitted[0] === 'LIFTGATE SERVICE ORIGIN ' || splitted[0] === 'LiftgateService') {
          accessArray.push('LiftGate PickUp -' + splitted[1]);
          accessorialRate += Number(splitted[1]);
        } else if (splitted[0] === 'DELIVERY APPOINTMENT ') {
          accessArray.push('Delivery Appointment Required -' + splitted[1]);
          accessorialRate += Number(splitted[1]);
        } else if (splitted[0] === 'NOTIFY BEFORE DELIVERY ') {
          accessArray.push('Notify -' + splitted[1]);
          accessorialRate += Number(splitted[1]);
        } else if (splitted[0] === "INSIDE DELIVERY CHARGE " || splitted[0] === "InsideDelivery") {
          accessArray.push('Inside Delivery -' + splitted[1]);
          accessorialRate += Number(splitted[1]);
        } else if(splitted[0] === "HazardousMaterials") {
          console.log(splitted[0]);
          accessArray.push('Hazmat -' + splitted[1]);
          accessorialRate += Number(splitted[1]);
        }  else if(splitted[0] === "NonCommercialDelivery") {
          // console.log(splitted[0]);
          // this.selectedItems.forEach((mm) => {
          //   if(mm.itemName === "Limited Access PickUp") {
          //   accessArray.push('Limited Access PickUp -' + splitted[1]);
          //   // accessorialRate += Number(commercialValue);
          //   } else if(mm.itemName === "Limited Access Delivery") {
          //     accessArray.push('Limited Access Delivery -' + splitted[1]);
          //     accessorialRate += Number(commercialValue);
          //     }
          // })
          // commercialValue =  splitted[1];
          accessArray.push('Limited Access -' + splitted[1]);
          accessorialRate += Number(splitted[1]);
    
        }
      })
      // if (carrierType === 'REDDAWAY') {
      //   console.log(this.selectedItems);
      //   this.selectedItems.forEach((mm) => {
      //     if(mm.itemName === "Limited Access PickUp") {
      //     accessArray.push('Limited Access PickUp -' + commercialValue);
      //     // accessorialRate += Number(commercialValue);
      //     } else if(mm.itemName === "Limited Access Delivery") {
      //       accessArray.push('Limited Access Delivery -' + commercialValue);
      //       accessorialRate += Number(commercialValue);
      //       }
      //   })
      // }
    }
    if (response.result.finalRate.length > 0) {
      if (response.result.diffRate.length > 0) {
        finalTotalRate = this.netChargeArrSum(response.result.finalRate) + this.netChargeArrSum(response.result.diffRate);
      } else {
        finalTotalRate = this.netChargeArrSum(response.result.finalRate);
      }
    }
    if (response.result.discountedRate.length > 0) {
      for (let f = 0; f < response.result.discountedRate.length; f++) {
        discountFull = this.netChargeArrSum(response.result.discountedRate)
        let minusvalue = finalTotalRate - discountFull;

        discountaa.push(minusvalue.toFixed(2));
        discountPercent = Number(response.result.discountedRate) * 100 / Number(finalTotalRate);

      }
    }
    for (let g = 0; g < response.result.netChargeResult.length; g++) {
      netChargePercent = Number(response.result.netChargeResult) * 100 / Number(finalTotalRate);

    }
    let disRate = finalTotalRate - discountFull;

    let discRate = [];
    discRate.push(disRate.toFixed(2).toString());
    let FSC = [];
    FSC.push(netChargePercent.toFixed(2).toString())

    console.log(discRate, FSC)
    let netValue = disRate + netChargePercent * disRate / 100;
    console.log('discountRate', netValue);
    console.log(netChargePercent, discountPercent)
    let highCost = 0;
    let totalAssessorialCharge = 0;
    if (carrierType === 'YRC') {
      highCost = response.result.highCostDeliveryCharge
    } else if (carrierType === 'REDDAWAY') {
      highCost = response.result.highCostDeliveryCharge + Number(response.result.extraCharges);

    }
    totalAssessorialCharge = Number(highCost) + Number(response.result.additionalCharge) + Number(accessorialRate);
    // let disRate = response.result.finalRate[0] - response.result.discountedRate[0];
    // let netValue = disRate + netChargePercent * disRate /100;
    console.log('discountRate', netValue);
    this.pricingInformation = {
      rate: response.result.rate,
      finalRate: response.result.finalRate,
      totalGrossCharge: this.finalRateCharge.toFixed(2),
      discount: discountPercent.toFixed(2),
      fuelChargeYrc: FSC,
      fuelCharge: FSC,
      discountedRate: discountaa,
      netCharge: netValue.toFixed(2),
      totalCharge: response.result.totalCharge,
      fuelChargeDiff: response.result.fuelCharge,
      discountDiff: response.result.discount,
      weight: weighta,
      classification: classificationArray,
      classification1: classification1,
      diffWeight: response.result.diffWeight,
      diffRate: response.result.diffRate,
      // diffFinalRate: diffFinalRateArray,
      crtRate: response.result.crtRate,
      diffDiscountedRate: discountaa[0],
      // diffNetCharge: netChargeArray,
      assessorialCharge: response.result.assessorialChargeValue,
      assessorialChargeValue: totalAssessorialCharge,
      assessorialDataList: accessArray,
      // netChargeResult: netChargeResultArray,
      // netChargeDiffResult: netChargeResultArray,
      additionalCharge: response.result.additionalCharge,
      singleShipmentCharge: response.result.singleShipmentCharge,
      highCostDeliveryCharge: response.result.highCostDeliveryCharge,
      category: category,
      showMinimumCharge: this.showMinimumCharge,
      shipTypes: this.showDirections,
      carrierType: carrierType,
      // netChargeValue: netChargeValue,
      // totalChargeForComparing: totalChargeForComparing,
      factor: factoring,
      costPlusPercent: this.costPlusPercentFactor,
      totalWeight: this.weightForCal,
      higherValueAP: this.higherValueAp,
      showcolor: false

    };
    // this.showData = true;
    console.log(this.resultArray);
    this.resultArray.push(this.pricingInformation);
    console.log(this.resultArray);
    if (this.resultArray.length > 2) {
      this.showLoader = false;
      let Apdiscountrate;
      let Ap:any, Ar:any;
      this.resultArray.forEach((ee:any, index:any) => {
        if (ee.category === "AP") {
          Ap = ee;

        };
        if (ee.category === "AR") {
          Ar = ee;

        };
      });
      console.log('jefrin', Ap, Ar);
      Apdiscountrate = Ap.discountedRate;
      if (Apdiscountrate > Ar.discountedRate) {
        console.log('jefrin', Apdiscountrate);
        let x = Ap.discountedRate * 1.05;
        let xarr = [];
        xarr.push(x.toFixed(2))
        Ar.discountedRate = xarr;
        Ar.showcolor = true;
        let y = x / ((100 - Ar.discount[0]) / 100);
        console.log('jefrin', y);
        let finalRate1 = []
        finalRate1.push(y.toFixed(2));
        Ar.finalRate = finalRate1
        this.finalRateCharge = []

        this.finalRateCharge = this.netChargeArrSum(finalRate1);
        Ar.totalGrossCharge = this.finalRateCharge.toFixed(2);
        // discountedRateArray.push(discountedRate);
        /*Net charge => (1+(fuelSurchareg/100))*discountedRate */
        if (Ar.factoring !== 'COSTPLUS') {
          const netCharge = (1 + (Ar.fuelCharge[0] / 100)) * x;
          let netc = [];
          netc.push(netCharge.toFixed(2));
          Ar.netChargeArray = netc
          const netChargeResult = ((x) * (Ar.fuelCharge / 100));
          let resNetArray = []
          resNetArray.push(netChargeResult.toFixed(2));
          Ar.netChargeResultArray = resNetArray;
        } else {
          // const netCharge = (1 + (Ar.fuelCharge / 100)) * x;
          // netChargeArray.push(netCharge.toFixed(2));
          // const netChargeResult = ((discountedRate) * (fuelSurcharge / 100));
          // netChargeResultArray.push(netChargeResult.toFixed(2));
          const netCharge = (1 + (Ar.fuelCharge[0] / 100)) * x;
          let netc = [];
          netc.push(netCharge.toFixed(2));
          Ar.netChargeArray = netc
          const netChargeResult = ((x) * (Ar.fuelCharge / 100));
          let resNetArray = []
          resNetArray.push(netChargeResult.toFixed(2));
          Ar.netChargeResultArray = resNetArray;
        }
        const netChargeValue = this.netChargeArrSum(Ar.netChargeArray);

        // if (factoring !== "COSTPLUS") {
        const totalCharge = Number(Ar.highCostDeliveryCharge) + Number(Ar.additionalCharge) + Number(Ar.netChargeArray[0]) + Number(Ar.singleShipmentCharge) + Ar.assessorialCharge;
        let tt:any = [];
        Ar.totalCharge = tt;
        tt.push(totalCharge.toFixed(2));
        Ar.totalChargeArray = tt;
        if(this.applyCostFactor === false) {

        if (Ap.totalCharge > Ar.totalCharge[0]) {
          this.showAdminErrorMessage = true;
          $("#getRate-modal").modal('hide');


        }
      }
        // } else {
        //   const totalCharge = Number(highCost) + Number(addCACharge) + Number(netChargeValue) + Number(addSingleShipmentCharge) + assessorialCharge;
        //   totalChargeArray.push(totalCharge.toFixed(2));
        // }
        // finalRateCharge
      }
      if (Ap.totalCharge > Ar.totalCharge[0]) {
        // this.showNegativeMargin = true;
        let charge = Number(Ap.totalCharge)* 5/100;
        let addedCharge = charge + Number(Ap.totalCharge)
        let charegArry = [];
        charegArry.push(addedCharge.toFixed(2));
        Ar.totalCharge = charegArry;
        // this.showData = false;
      }
      // this.resultArray.forEach((el) => {
      //   if (el.category === 'AR') {
      //     this.resultObject = el;

      //   }
      // })

    }
    // this.resultObject = this.resultArray[0];
    // document.getElementById('myDiv').className = 'imgBlock';
    if (this.userData.carrier === 'YRC') {
      if (this.resultArray.length > 2) {
        this.giveRateDetails(this.resultArray, 'AR');
      }
    } else {
      this.giveRateDetails(this.resultArray, 'AR');

    }
    // this.giveRateDetails(this.resultArray, 'AR');

  }



  rateCalculationForFedex(response:any, carrierType:any, category:any, factoring:any) {
    let date = new Date();
    let discount, fuelSurcharge, rateId, amc, highCost, addRate, additionalRate, discountedRate:any,
      addSingleShipmentCharge,
      assessorialCharge, minimumClass, originalDiffRateList, customerBusinessRule = [], totalAssessorialCharge,
      assessorialChargeArray = [];
    const weightArray = [], classificationArray = [], fedexRateArray = [], dwRate = [], classification1 = [];
    const finalRate = [], rate = [], diffRateArray = [], diffFinalRateArray = [],
      crtRateArray = [], diffWeight = [], discountedRateArray = [], netChargeArray = [], netChargeResultArray = [],
      totalChargeArray = [], profileAssessorials = [], discountArray = [], fuelSurchargeArray = [];
    let profileMinimumCharge, profileLifeGateCharge, profileResidentialCharge, profileInsideDelivery,
      profileLimitedAccessDelivery, profileNotify, profiledeliveryAppointmentRequired, profileSingleShipment, singleShipmentsetMasterData, profilehazmat, profileLiftGatePickupCharge, profileResidentialPickupcharge, profilelimitedpickup;
    this.parseSetMasterData = [];
    let currentFinalFedexRate, currentFedexRate, currentNewDWRate, fedexRateNew, addCACharge;
    this.showDeficitValue = false;
    this.pricingInformation = {};
    this.finalRateCharge = 0;
    this.arrayData = [];
    this.showMinimumCharge = false;
    let discountedRateCalculation;
    let staticData:any = localStorage.getItem('artableData');
    this.localStorageArData = JSON.parse(staticData);
    /*set master data discount, minimum charge values which is stored in local storage based on the category*/
    if (category === 'AP') {
      const setMasterData:any = localStorage.getItem('aptableData');
      this.parseSetMasterData = JSON.parse(setMasterData);
      /*Based on carrier type Fedex Economy and Fedex Priority*/
      if (carrierType === 'FEDEX ECONOMY') {
        customerBusinessRule = response.result.FEprofileRate;
      } else {
        customerBusinessRule = response.result.FPprofileRate;
      }
      highCost = 0;
      if (response.result.additionalRate === 0) {
        highCost = 0;
      } else {
        highCost = Number(response.result.additionalRate);
      }
    } else {
      const setMasterData:any = localStorage.getItem('artableData');
      this.parseSetMasterData = JSON.parse(setMasterData);
      if (carrierType === 'FEDEX ECONOMY') {
        customerBusinessRule = response.result.FEprofileRate;
      } else {
        customerBusinessRule = response.result.FPprofileRate;
      }
      if (response.result.additionalRate === 0) {
        highCost = 0;
      } else {
        highCost = Number(response.result.additionalRate);
      }
    }
    if (factoring !== 'COSTPLUS') {
      for (let i = 0; i < this.parseSetMasterData.length; i++) {
        if (this.parseSetMasterData[i].companyName === carrierType) {
          discount = this.parseSetMasterData[i].discount;
          fuelSurcharge = this.parseSetMasterData[i].fuelsurcharge;
          rateId = this.parseSetMasterData[i].recentRateId;
          amc = this.parseSetMasterData[i].amc;
          if (this.parseSetMasterData[i].assessorials !== undefined) {
            this.parseSetMasterData.assessorials = JSON.parse(this.parseSetMasterData[i].assessorials);
            if (this.parseSetMasterData.assessorials.length > 0) {
              for (let i = 0; i < this.parseSetMasterData.assessorials.length; i++) {
                if (this.parseSetMasterData.assessorials[i].name === 'Single Shipment') {
                  singleShipmentsetMasterData = this.parseSetMasterData.assessorials[i];
                  break;
                } else {
                  singleShipmentsetMasterData = '';
                }
              }
            }
          } else {
            // this.parseSetMasterData.assessorials = [];
          }
          // this.parseSetMasterData.assessorials = JSON.parse(this.parseSetMasterData[i].assessorials);
          if (this.userData.originState === 'CA' || this.userData.destinationState === 'CA') {
            if (this.parseSetMasterData[i].caCharge !== '' && this.parseSetMasterData[i].caCharge !== null && this.parseSetMasterData[i].caCharge !== undefined) {
              addCACharge = Number(this.parseSetMasterData[i].caCharge);
            } else {
              addCACharge = 0;
            }
          } else {
            addCACharge = 0;
          }
        }
      }
    } else {
      for (let apData = 0; apData < this.parseSetMasterData.length; apData++) {
        if (this.parseSetMasterData[apData].companyName === carrierType) {
          discount = this.parseSetMasterData[apData].discount;
          fuelSurcharge = this.parseSetMasterData[apData].fuelsurcharge;
          rateId = this.parseSetMasterData[apData].recentRateId;
          amc = this.parseSetMasterData[apData].amc;
        }
      }
      for (let i = 0; i < this.localStorageArData.length; i++) {
        if (this.localStorageArData[i].companyName === carrierType) {
          this.localStorageArData.assessorials = JSON.parse(this.localStorageArData[i].assessorials);
          if (this.localStorageArData.assessorials.length > 0) {
            for (let i = 0; i < this.localStorageArData.assessorials.length; i++) {
              if (this.localStorageArData.assessorials[i].name === 'Single Shipment') {
                singleShipmentsetMasterData = this.localStorageArData.assessorials[i];
                break;
              } else {
                singleShipmentsetMasterData = '';
              }
            }
          }
          if (this.originState === 'CA' || this.destinationState === 'CA') {
            if (this.localStorageArData[i].caCharge !== '' && this.localStorageArData[i].caCharge !== null && this.localStorageArData[i].caCharge !== undefined) {
              addCACharge = this.parseSetMasterData[i].caCharge;
            } else {
              addCACharge = 0;
            }
          } else {
            addCACharge = 0;
          }
        }
      }
      if (this.highCostForFedex !== '' && this.highCostForFedex !== null && this.highCostForFedex !== undefined) {
        highCost = this.highCostForFedex;
      } else {
        highCost = 0;
      }
    }
    for (let w = 0; w < response.result.classWeight.length; w++) {
      const weight = response.result.classWeight[w].weight;
      weightArray.push(weight);
      const classification = response.result.classWeight[w].classification;
      classificationArray.push(classification);
      classification1.push(classification);
    }
    minimumClass = Math.min(...classificationArray);
    this.weightForCal = this.netChargeArrSum(weightArray);
    /*If non-direct zipcodes will have mcf*/
    if (response.result.mcf === 0) {
      additionalRate = 0;
    } else {
      // highCost = Number(response.result.mcf);
      additionalRate = 0;
    }
    if (response.result.shipTypes === 'R') {
      this.showDirections = 'Regional';
    } else {
      this.showDirections = 'Inter Regional';
    }
    if (customerBusinessRule.length > 0) {
      for (let f = 0; f < customerBusinessRule.length; f++) {
        discount = customerBusinessRule[f].profileDiscount;
        profileMinimumCharge = customerBusinessRule[f].profileMinCharge;
        if (factoring !== 'COSTPLUS') {
          profileLifeGateCharge = customerBusinessRule[f].liftGateService;
          profileResidentialCharge = customerBusinessRule[f].residentialDelivery;
          profileLimitedAccessDelivery = customerBusinessRule[f].limitedAccessDelivery;
          profileInsideDelivery = customerBusinessRule[f].insideDelivery;
          profileNotify = customerBusinessRule[f].notify;
          profileSingleShipment = customerBusinessRule[f].singleShipment;
          profiledeliveryAppointmentRequired = customerBusinessRule[f].deliveryAppointmentRequired;
          profilehazmat = customerBusinessRule[f].hazmat;
          profileLiftGatePickupCharge = customerBusinessRule[f].liftGateService;
          profileResidentialPickupcharge = customerBusinessRule[f].residentialDelivery;
          profilelimitedpickup = customerBusinessRule[f].limitedAccessDelivery;
          fuelSurcharge = fuelSurcharge;
          profileAssessorials.push({ liftGate: profileLifeGateCharge, id: 1 },
            { residential: profileResidentialCharge, id: 2 },
            { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
            { insideDelivery: profileInsideDelivery, id: 4 },
            { notify: profileNotify, id: 5 },
            { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id: 7 },
            { hazmat: profilehazmat, id: 8 },
            { liftGatePickup: profileLiftGatePickupCharge, 'id': 10 },
            { residentialPickup: profileResidentialPickupcharge, 'id': 11 },
            { limitedaccesspickup: profilelimitedpickup, 'id': 12 });
        } else {
          if (this.getARRule.length > 0) {
            profileLifeGateCharge = this.getARRule[0].liftGateService;
            profileResidentialCharge = this.getARRule[0].residentialDelivery;
            profileLimitedAccessDelivery = this.getARRule[0].limitedAccessDelivery;
            profileInsideDelivery = this.getARRule[0].insideDelivery;
            profileNotify = this.getARRule[0].notify;
            profileSingleShipment = this.getARRule[0].singleShipment;
            profiledeliveryAppointmentRequired = this.getARRule[0].deliveryAppointmentRequired;
            profilehazmat = this.getARRule[0].hazmat;
            profileLiftGatePickupCharge = this.getARRule[0].liftGateService;
            profileResidentialPickupcharge = this.getARRule[0].residentialDelivery;
            profilelimitedpickup = this.getARRule[0].limitedAccessDelivery;
            profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
              { residential: profileResidentialCharge, 'id': 2 },
              { limitedAccessDelivery: profileLimitedAccessDelivery, 'id': 3 },
              { insideDelivery: profileInsideDelivery, 'id': 4 },
              { notify: profileNotify, 'id': 5 },
              { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7 },
              { hazmat: profilehazmat, 'id': 8 },
              { liftGatePickup: profileLiftGatePickupCharge, 'id': 10 },
              { residentialPickup: profileResidentialPickupcharge, 'id': 11 },
              { limitedaccesspickup: profilelimitedpickup, 'id': 12 });
          } else {
            profileAssessorials.push({ liftGate: '', 'id': 1 },
              { residential: '', 'id': 2 },
              { limitedAccessDelivery: '', 'id': 3 },
              { insideDelivery: '', 'id': 4 },
              { notify: '', 'id': 5 },
              { deliveryAppointmentRequired: '', 'id': 7 },
              { hazmat: '', 'id': 8 },
              { liftGatePickup: '', 'id': 10 },
              { residentialPickup: '', 'id': 11 },
              { limitedaccesspickup: '', 'id': 12 });
          }
        }
      }
    } else {
      if (response.result.discount === 0) {
        discount = discount;
        fuelSurcharge = fuelSurcharge;
      } else {
        discount = response.result.discount;
        fuelSurcharge = fuelSurcharge;
      }
      if (factoring === 'COSTPLUS') {
        if (this.getARRule.length > 0) {
          profileLifeGateCharge = this.getARRule[0].liftGateService;
          profileResidentialCharge = this.getARRule[0].residentialDelivery;
          profileLimitedAccessDelivery = this.getARRule[0].limitedAccessDelivery;
          profileInsideDelivery = this.getARRule[0].insideDelivery;
          profileNotify = this.getARRule[0].notify;
          profileSingleShipment = this.getARRule[0].singleShipment;
          profiledeliveryAppointmentRequired = this.getARRule[0].deliveryAppointmentRequired;
          profilehazmat = this.getARRule[0].hazmat;
          profileLiftGatePickupCharge = this.getARRule[0].liftGateService;
          profileResidentialPickupcharge = this.getARRule[0].residentialDelivery;
          profilelimitedpickup = this.getARRule[0].limitedAccessDelivery;
          profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
            { residential: profileResidentialCharge, id: 2 },
            { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
            { insideDelivery: profileInsideDelivery, id: 4 },
            { notify: profileNotify, id: 5 },
            { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7 },
            { hazmat: profilehazmat, 'id': 8 },
            { liftGatePickup: profileLiftGatePickupCharge, 'id': 10 },
            { residentialPickup: profileResidentialPickupcharge, 'id': 11 },
            { limitedaccesspickup: profilelimitedpickup, 'id': 12 });
        } else {
          profileAssessorials.push({ liftGate: '', id: 1 },
            { residential: '', id: 2 },
            { limitedAccessDelivery: '', id: 3 },
            { insideDelivery: '', id: 4 },
            { notify: '', id: 5 },
            { deliveryAppointmentRequired: '', 'id': 7 },
            { hazmat: '', 'id': 8 },
            { liftGatePickup: '', 'id': 10 },
            { residentialPickup: '', 'id': 11 },
            { limitedaccesspickup: '', 'id': 12 });
        }
      } else {
        profileAssessorials.push({ liftGate: '', id: 1 },
          { residential: '', id: 2 },
          { limitedAccessDelivery: '', id: 3 },
          { insideDelivery: '', id: 4 },
          { notify: '', id: 5 },
          { deliveryAppointmentRequired: '', 'id': 7 },
          { hazmat: '', 'id': 8 },
          { liftGatePickup: '', 'id': 10 },
          { residentialPickup: '', 'id': 11 },
          { limitedaccesspickup: '', 'id': 12 });
      }
    }
    discountArray.push(discount);
    fuelSurchargeArray.push(fuelSurcharge);
    if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
      addSingleShipmentCharge = Number(profileSingleShipment);
    } else {
      if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
        addSingleShipmentCharge = Number(singleShipmentsetMasterData.cost);
      } else {
        addSingleShipmentCharge = 0;
      }
    }
    for (let i = 0; i < response.result.rate.length; i++) {
      if (category === 'AR') {
        fedexRateNew = Number(response.result.rate[i].finalRate) * this.increasedValueForAR;
      } else {
        fedexRateNew = Number(response.result.rate[i].finalRate);
      }
      fedexRateArray.push(fedexRateNew.toFixed(2));
    }
    addRate = this.netChargeArrSum(fedexRateArray);
    let minCharges;
    for (let f = 0; f < response.result.rate.length; f++) {
      if (category === 'AR') {
        minCharges = Number(response.result.minCharges) * this.increasedValueForAR;
      } else {
        minCharges = Number(response.result.minCharges);
      }
      if (Number(minCharges) > Number(addRate)) {
        this.showMinimumCharge = true;
        if (category === 'AR') {
          currentFinalFedexRate = Number(response.result.minCharges) * this.increasedValueForAR;
        } else {
          currentFinalFedexRate = Number(response.result.minCharges);
        }
      } else {
        this.showMinimumCharge = false;
        if (category === 'AR') {
          currentFinalFedexRate = Number(response.result.rate[f].finalRate) * this.increasedValueForAR;
        } else {
          currentFinalFedexRate = Number(response.result.rate[f].finalRate);
        }
      }
      finalRate.push(currentFinalFedexRate.toFixed(2));
      if (category === 'AR') {
        currentFedexRate = Number(response.result.rate[f].rate) * this.increasedValueForAR;
        currentNewDWRate = Number(response.result.rate[f].DWRate) * this.increasedValueForAR;
      } else {
        currentFedexRate = Number(response.result.rate[f].rate);
        currentNewDWRate = Number(response.result.rate[f].DWRate);
      }
      rate.push(currentFedexRate.toFixed(2));
      dwRate.push(currentNewDWRate.toFixed(2));
    }
    this.finalRateCharge = this.netChargeArrSum(finalRate);
    originalDiffRateList = response.result.originalDiffRateList[0];
    if (originalDiffRateList.diffRate === 0 && originalDiffRateList.diffWeight === 0 && originalDiffRateList.crtRate === 0) {
      this.showDeficitValue = false;
    } else {
      this.showDeficitValue = true;
      if (category === 'AR') {
        const currentDiffRate = Number(originalDiffRateList.diffRate) * this.increasedValueForAR;
        diffRateArray.push(currentDiffRate.toFixed(2));
        const currentFinalDiffRate = Number(originalDiffRateList.finalDiffRate) * this.increasedValueForAR;
        diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
        const currentCrtRate = Number(originalDiffRateList.crtRate) * this.increasedValueForAR;
        crtRateArray.push(currentCrtRate.toFixed(2));
      } else {
        const currentDiffRate = Number(originalDiffRateList.diffRate);
        diffRateArray.push(currentDiffRate.toFixed(2));
        const currentFinalDiffRate = Number(originalDiffRateList.finalDiffRate);
        diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
        const currentCrtRate = Number(originalDiffRateList.crtRate);
        crtRateArray.push(currentCrtRate.toFixed(2));
      }
      const weight = Number(originalDiffRateList.diffWeight);
      diffWeight.push(weight);
      this.finalRateCharge = this.finalRateCharge + this.netChargeArrSum(diffRateArray);
    }
    if (factoring !== '') {
      discountedRateCalculation = (this.finalRateCharge * (1 - (discount / 100)));
    } else {
      let discountedRateNewCalculation = (this.finalRateCharge * (1 - (discount / 100)));
      discountedRateCalculation = Number(discountedRateNewCalculation) * Number(this.costPlusPercentFactor);
    }
    if (profileMinimumCharge !== undefined && profileMinimumCharge !== '' && profileMinimumCharge !== null) {
      if (Number(profileMinimumCharge) > Number(discountedRateCalculation)) {
        if (factoring !== 'COSTPLUS') {
          discountedRate = Number(profileMinimumCharge);
          console.log('profileFedex1 ', discountedRate);
        } else {
          discountedRate = (Number(profileMinimumCharge) * Number(this.costPlusPercentFactor)).toFixed(2);
          console.log('profileFedex3 cost plus ', discountedRate);
        }
      } else {
        discountedRate = Number(discountedRateCalculation.toFixed(2));
      }
    } else {
      if (amc !== '' && amc !== null && amc !== undefined) {
        if (Number(amc) > Number(discountedRateCalculation)) {
          if (factoring !== 'COSTPLUS') {
            discountedRate = Number(amc);
            console.log('profileFedex1 ', discountedRate);
          } else {
            discountedRate = (Number(amc) * Number(this.costPlusPercentFactor)).toFixed(2);
            console.log('profileFedex3 cost plus ', discountedRate);
          }

        } else {
          discountedRate = Number(discountedRateCalculation.toFixed(2));
        }
      } else {
        discountedRate = Number(discountedRateCalculation.toFixed(2));
      }
    }
    discountedRateArray.push(discountedRate);
    const netCharge = (1 + (fuelSurcharge / 100)) * (discountedRate);
    netChargeArray.push(netCharge.toFixed(2));
    const netChargeResult = ((discountedRate) * (fuelSurcharge / 100));
    netChargeResultArray.push(netChargeResult.toFixed(2));
    const netChargeValue = this.netChargeArrSum(netChargeArray);
    let assessorialUnique = [], uniqueArray = [];
    console.log('this.selectedItems before duplicating', this.selectedItems, this.selectedItemValue);
    assessorialUnique = this.getUnique(this.selectedItemValue, 'name');
    console.log('assessorialUnique', assessorialUnique);
    uniqueArray = this.selectedItems;
    // if (uniqueArray.length > 0) {
    //   for (let a = 0; a < uniqueArray.length; a++) {
    //     if (uniqueArray[a].itemName === 'LiftGate Delivery Requested') {
    //       uniqueArray[a].itemName = 'LiftGate Service';
    //     } else if (uniqueArray[a].itemName === 'LiftGate Pickup Requested') {
    //       uniqueArray[a].itemName = 'LiftGate Service';
    //     } else {
    //       uniqueArray[a].itemName = assessorialUnique[a].itemName;
    //     }
    //   }
    // }
    console.log('assessorialUnique After', uniqueArray);
    if (factoring !== 'COSTPLUS') {
      assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.parseSetMasterData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
    } else {
      assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
    }
    assessorialCharge = assessorialChargeArray[0];
    this.arrayData = this.pricingInfoService.getAssessorial();
    if (carrierType === 'FEDEX ECONOMY') {
      addCACharge = Number(response.result.fxfeCaCharge);
    } else {
      addCACharge = Number(response.result.fxfpCaCharge);

    }
    let peakCharge = response.result.peakSurcharge;

    console.log(addCACharge);
    totalAssessorialCharge = Number(assessorialCharge) + Number(highCost) + Number(additionalRate) + Number(addSingleShipmentCharge) + Number(addCACharge) + Number(peakCharge);
    const totalCharge = (Number(netChargeValue)) + Number(highCost) + Number(additionalRate) + Number(addSingleShipmentCharge) + Number(assessorialCharge) + Number(addCACharge) + Number(peakCharge);
    totalChargeArray.push(totalCharge.toFixed(2));
    console.log(totalChargeArray);
    classification1.splice(0, 1);
    const totalChargeForComparing = this.netChargeArrSum(totalChargeArray);
    additionalRate = Number(additionalRate) + Number(addCACharge);
    console.log('additionalRate', additionalRate);
    this.pricingInformation = {
      rate: rate,
      finalRate: finalRate,
      discount: discountArray,
      fuelCharge: fuelSurchargeArray,
      discountedRate: discountedRateArray,
      netCharge: netChargeArray,
      totalCharge: totalChargeArray,
      assessorialCharge: assessorialCharge,
      classification: classificationArray,
      classification1: classification1,
      weight: weightArray,
      diffClass: minimumClass,
      diffRate: diffRateArray,
      diffFinalRate: diffFinalRateArray,
      crtRate: crtRateArray,
      diffWeight: diffWeight,
      fuelChargeDiff: fuelSurchargeArray,
      discountDiff: discountedRateArray,
      diffDiscountedRate: discountedRateArray,
      diffNetCharge: netChargeArray,
      assessorialDataList: this.arrayData,
      assessorialChargeValue: totalAssessorialCharge,
      singleShipmentCharge: addSingleShipmentCharge,
      netChargeResult: netChargeResultArray,
      netChargeDiffResult: netChargeResultArray,
      highCostDeliveryCharge: highCost,
      additionalCharge: additionalRate,
      additionalCACharge: addCACharge,
      category: category,
      carrierType: carrierType,
      showMinimumCharge: this.showMinimumCharge,
      shipTypes: this.showDirections,
      netChargeValue: netChargeValue,
      totalChargeForComparing: totalChargeForComparing,
      factor: factoring,
      totalWeight: this.weightForCal,
      higherValueAp: this.higherValueAp,
      fedexHighcost: response.result.fedexHighCost,
      showcolor: false,
      peakSurcharge: peakCharge


    };
    console.log(this.pricingInformation)
    this.resultArray.push(this.pricingInformation);
    if (this.resultArray.length > 1) {
      this.resultArray.sort(function (a:any, b:any) {
        return (a.category - b.category);
      });
      if (this.resultArray[0].category === 'AP') {
      } else {
        this.resultArray.reverse();
      }
    } 
    let rateArray = [];
    if (this.resultArray.length > 1) {
      this.showLoader = false;
      if (this.resultArray[1].factor !== 'COSTPLUS') {
        if (Number(this.resultArray[0].totalCharge[0]) > Number(this.resultArray[1].totalCharge[0])) {
          // rateArray.push(this.resultArray[0]);
          // this.resultArray = [];
          // this.resultArray = rateArray;
          // let factorValue = 15;
          // this.costPlusPercentFactor = 1 + (Number(factorValue) / 100);
          // this.higherValueAp = true;
          // if (this.userData.carrier === 'FEDEX ECONOMY' || this.userData.carrier === 'FEDEX PRIORITY') {
          //   this.getFedexForCostPlus();
          // }
          let charge = Number(this.resultArray[0].totalCharge)/0.95;
          let addedCharge = charge + Number(this.resultArray[0].totalCharge)
          let charegArry = [];
          this.resultArray[1].totalCharge = [];
          console.log('jjj',this.resultArray);

          charegArry.push(charge.toFixed(2));
          this.resultArray[1].totalCharge = charegArry;
          this.resultArray[1].showcolor = true;
          console.log('jjj',this.resultArray,charegArry);
          this.giveRateDetails(this.resultArray, 'AR');
          this.totalChargeValue = this.netChargeArrSum(this.resultArray[1].totalCharge);
          this.factorization = this.resultArray[1].factor;
          console.log('giveRateDetails(', this.resultArray[1]);
        } else {
          this.giveRateDetails(this.resultArray, 'AR');
          this.totalChargeValue = this.netChargeArrSum(this.resultArray[1].totalCharge);
          this.factorization = this.resultArray[1].factor;
          console.log('giveRateDetails(', this.resultArray[1]);
        }
      } else {
        this.giveRateDetails(this.resultArray, 'AR');
        this.totalChargeValue = this.netChargeArrSum(this.resultArray[1].totalCharge);
        this.factorization = this.resultArray[1].factor;
        console.log('giveRateDetails(', this.resultArray[1]);
      }
    }
  }
  deepCopy(arr:any) {
    var out = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      var item = arr[i];
      var obj:any = {};
      for (var k in item) {
        obj[k] = item[k];
      }
      out.push(obj);
    }
    return out;
  }

  giveRateDetails(rateDetail:any, value:any) {
    console.log(rateDetail);
    this.quote = {};
    this.quoteDetailsArray = [];
    this.quoteId = '';
    let category, highValue;
    this.quoteDetailsId = '';
    let assessorialUnique = [], uniqueArray = [], myClonedArrayNew = [];
    // let cloned = source.map(x => Object.assign({}, x));
    let myClonedArray = Object.assign([], this.selectedItemValue);
    console.log('myClonedArray', myClonedArray);
    let serviceName;
    var copy = this.deepCopy(myClonedArray);
    myClonedArrayNew = this.getUnique(copy, 'name');
    console.log('assessorialUnique', myClonedArray);
    let Ap:any, Ar:any, ARindex;
    rateDetail.forEach((ee:any, index:any) => {
      if (ee.category === "AP") {
        Ap = ee;

      };
      if (ee.category === "AR") {
        Ar = ee;
        ARindex = index;

      };
    });
    if (Ap.carrierType === 'YRC') {
      // if(this.applyCostFactor === false) {

      if (Number(Ap.totalCharge) > Number(Ar.totalCharge[0])) {
        this.showAdminErrorMessage = true;
        $("#getRate-modal").modal('hide');
      }

      // } else {


        if (myClonedArrayNew.length > 0) {
          for (let a = 0; a < myClonedArrayNew.length; a++) {
            if (myClonedArrayNew[a].itemName === 'LiftGate Delivery Requested') {
              myClonedArrayNew[a].itemName = 'LiftGate Service';
              uniqueArray.push(myClonedArrayNew[a].itemName);
            } else if (myClonedArrayNew[a].itemName === 'LiftGate Pickup Requested') {
              myClonedArrayNew[a].itemName = 'LiftGate Service';
              uniqueArray.push(myClonedArrayNew[a].itemName);
            } else {
              myClonedArrayNew[a].itemName = myClonedArrayNew[a].itemName;
              uniqueArray.push(myClonedArrayNew[a].itemName);
            }
          }
        }

        console.log('myClonedArrayNew', myClonedArrayNew, uniqueArray);
        if (rateDetail.length > 0) {
          for (let i = 0; i < rateDetail.length; i++) {
            if (rateDetail[0].carrierType === 'FEDEX ECONOMY' || rateDetail[0].carrierType === 'FEDEX PRIORITY') {
              if (rateDetail[0].category === 'AP') {
                rateDetail[0].fedexHighcost = rateDetail[1].fedexHighcost
                console.log(rateDetail);

              }
            }
          }
          for (let i = 0; i < rateDetail.length; i++) {
            // if (rateDetail[i].factor === 'AP' || rateDetail[i].factor === 'AR') {
            //   category = rateDetail[i].factor;
            //   highValue = value;
            // } else {
            //   category = 'COSTPLUS';
            //   highValue = 'COSTPLUS';
            // }
            if (rateDetail[i].factor === 'COSTPLUS') {
              highValue = 'COSTPLUS';
              if (rateDetail[i].category === 'OLDAP') {
                category = 'OLDAP';

              } else {
                category = 'COSTPLUS';
              }
            } else {
              highValue = 'AR';
              category = rateDetail[i].category;
            }
            this.quote = {
              customerId: this.customerId,
              companyId: this.companyId,
              ratingNotes: this.customerData,
              originZip: this.userData.origin,
              destinationZip: this.userData.destination,
              classAndWeight: this.userData.classWeight,
              accessorials: uniqueArray,
              carrierName: this.userData.carrierName,
              rateDetail: JSON.stringify(rateDetail[i]),
              totalCharge: rateDetail[i].totalCharge,
              createdBy: this.salesRepType,
              highValue: highValue,
              category: category,
              higherValueAp: rateDetail[i].higherValueAp,
              salesRepId: this.salesRepId,
              viewType: 'externalCustomer',
              loginId: this.salesRepValues.id,
              originCityState: JSON.stringify({ 'city': this.userData.originCity, 'state': this.userData.originState }),
              destinationCityState: JSON.stringify({ 'city': this.userData.destinationCity, 'state': this.userData.destinationState })
            };
            this.quoteDetailsArray.push(this.quote);
          }
        }
        console.log('this.quoteDetailsArray', this.quoteDetailsArray);
        if (this.quoteDetailsArray.length > 0) {
          this.pricingInfoService.saveQuoteDetails(this.quoteDetailsArray).subscribe((data:any) => {
            console.log('save quote details', data);
            this.showLoader = false;
            if (data.quoteId === false) {
            } else {
              if (this.quote.carrierName === 'YRC') {
                if (data.quoteId['YRCCOSTPLUS']) {
                  this.quoteId = data.quoteId['YRCCOSTPLUS'];
                  this.quoteDetailsId = data.quoteId['YRCCOSTPLUSID'];
                } else {
                  this.quoteId = data.quoteId['YRCAR'];
                  this.quoteDetailsId = data.quoteId['YRCARID'];
                }
              } else if (this.quote.carrierName === 'FEDEX ECONOMY') {
                if (data.quoteId['FEDEX ECONOMYAR']) {
                  this.quoteId = data.quoteId['FEDEX ECONOMYAR'];
                  this.quoteDetailsId = data.quoteId['FEDEX ECONOMYARID'];
                } else {
                  this.quoteId = data.quoteId['FEDEX ECONOMYCOSTPLUS'];
                  this.quoteDetailsId = data.quoteId['FEDEX ECONOMYCOSTPLUSID'];
                }
              } else if (this.quote.carrierName === 'FEDEX PRIORITY') {
                if (data.quoteId['FEDEX PRIORITYAR']) {
                  this.quoteId = data.quoteId['FEDEX PRIORITYAR'];
                  this.quoteDetailsId = data.quoteId['FEDEX PRIORITYARID'];
                } else {
                  this.quoteId = data.quoteId['FEDEX PRIORITYCOSTPLUS']
                  this.quoteDetailsId = data.quoteId['FEDEX PRIORITYCOSTPLUSID'];
                }
              } else {
                if (data.quoteId['REDDAWAYAR']) {
                  this.quoteId = data.quoteId['REDDAWAYAR'];
                  this.quoteDetailsId = data.quoteId['REDDAWAYARID'];
                } else {
                  this.quoteId = data.quoteId['REDDAWAYCOSTPLUS'];
                  this.quoteDetailsId = data.quoteId['REDDAWAYCOSTPLUSID'];
                }
              }
              this.billOfLading.patchValue({ quoteNumber: this.quoteId, rate: this.totalChargeValue });
              console.log('this.billOfLading.patchValue({ quoteNumber', this.billOfLading.controls, this.quoteId)
              this.disableQuoteNumber = false;
            }
            if (this.getRateCheck === false) {
              this.create(this.billOfLading.value);
            } else {
              if (this.factorization !== 'COSTPLUS' && this.getRateCheck === true) {
                // this.loading = true;

                if (this.errorResponseInGetRate === false) {
                  // $("#quote_details").modal('show');
                  this.getResponseFromQuoteId(this.quoteId, 'AR');
                  // this.loading = false;
                  this.showLoader = false;
                }
              }
              else if (this.factorization === 'COSTPLUS' && this.getRateCheck === true) {
                // this.loading = true;

                if (this.errorResponseInGetRate === false) {
                  // $("#costplus_quote_details").modal('show');
                  this.getResponseFromQuoteId(this.quoteId, 'COSTPLUS');
                  // this.loading = false;
                  this.showLoader = false;
                }

              }
            }
          }, (err:any) => {
          });
        }
      // }
    } else {


      if (myClonedArrayNew.length > 0) {
        for (let a = 0; a < myClonedArrayNew.length; a++) {
          if (myClonedArrayNew[a].itemName === 'LiftGate Delivery Requested') {
            myClonedArrayNew[a].itemName = 'LiftGate Service';
            uniqueArray.push(myClonedArrayNew[a].itemName);
          } else if (myClonedArrayNew[a].itemName === 'LiftGate Pickup Requested') {
            myClonedArrayNew[a].itemName = 'LiftGate Service';
            uniqueArray.push(myClonedArrayNew[a].itemName);
          } else {
            myClonedArrayNew[a].itemName = myClonedArrayNew[a].itemName;
            uniqueArray.push(myClonedArrayNew[a].itemName);
          }
        }
      }

      console.log('myClonedArrayNew', myClonedArrayNew, uniqueArray);
      if (rateDetail.length > 0) {
        for (let i = 0; i < rateDetail.length; i++) {
          if (rateDetail[0].carrierType === 'FEDEX ECONOMY' || rateDetail[0].carrierType === 'FEDEX PRIORITY') {
            if (rateDetail[0].category === 'AP') {
              rateDetail[0].fedexHighcost = rateDetail[1].fedexHighcost
              console.log(rateDetail);

            }
          }
        }
        for (let i = 0; i < rateDetail.length; i++) {
          // if (rateDetail[i].factor === 'AP' || rateDetail[i].factor === 'AR') {
          //   category = rateDetail[i].factor;
          //   highValue = value;
          // } else {
          //   category = 'COSTPLUS';
          //   highValue = 'COSTPLUS';
          // }
          if (rateDetail[i].factor === 'COSTPLUS') {
            highValue = 'COSTPLUS';
            if (rateDetail[i].category === 'OLDAP') {
              category = 'OLDAP';

            } else {
              category = 'COSTPLUS';
            }
          } else {
            highValue = 'AR';
            category = rateDetail[i].category;
          }
          this.quote = {
            customerId: this.customerId,
            companyId: this.companyId,
            ratingNotes: this.customerData,
            originZip: this.userData.origin,
            destinationZip: this.userData.destination,
            classAndWeight: this.userData.classWeight,
            accessorials: uniqueArray,
            carrierName: this.userData.carrierName,
            rateDetail: JSON.stringify(rateDetail[i]),
            totalCharge: rateDetail[i].totalCharge,
            createdBy: this.salesRepType,
            highValue: highValue,
            category: category,
            higherValueAp: rateDetail[i].higherValueAp,
            salesRepId: this.salesRepId,
            viewType: 'externalCustomer',
            loginId: this.salesRepValues.id,
            originCityState: JSON.stringify({ 'city': this.userData.originCity, 'state': this.userData.originState }),
            destinationCityState: JSON.stringify({ 'city': this.userData.destinationCity, 'state': this.userData.destinationState })
          };
          this.quoteDetailsArray.push(this.quote);
        }
      }
      console.log('this.quoteDetailsArray', this.quoteDetailsArray);
      if (this.quoteDetailsArray.length > 0) {
        this.pricingInfoService.saveQuoteDetails(this.quoteDetailsArray).subscribe((data:any) => {
          console.log('save quote details', data);
          this.showLoader = false;
          if (data.quoteId === false) {
          } else {
            if (this.quote.carrierName === 'YRC') {
              if (data.quoteId['YRCCOSTPLUS']) {
                this.quoteId = data.quoteId['YRCCOSTPLUS'];
                this.quoteDetailsId = data.quoteId['YRCCOSTPLUSID'];
              } else {
                this.quoteId = data.quoteId['YRCAR'];
                this.quoteDetailsId = data.quoteId['YRCARID'];
              }
            } else if (this.quote.carrierName === 'FEDEX ECONOMY') {
              if (data.quoteId['FEDEX ECONOMYAR']) {
                this.quoteId = data.quoteId['FEDEX ECONOMYAR'];
                this.quoteDetailsId = data.quoteId['FEDEX ECONOMYARID'];
              } else {
                this.quoteId = data.quoteId['FEDEX ECONOMYCOSTPLUS'];
                this.quoteDetailsId = data.quoteId['FEDEX ECONOMYCOSTPLUSID'];
              }
            } else if (this.quote.carrierName === 'FEDEX PRIORITY') {
              if (data.quoteId['FEDEX PRIORITYAR']) {
                this.quoteId = data.quoteId['FEDEX PRIORITYAR'];
                this.quoteDetailsId = data.quoteId['FEDEX PRIORITYARID'];
              } else {
                this.quoteId = data.quoteId['FEDEX PRIORITYCOSTPLUS']
                this.quoteDetailsId = data.quoteId['FEDEX PRIORITYCOSTPLUSID'];
              }
            } else {
              if (data.quoteId['REDDAWAYAR']) {
                this.quoteId = data.quoteId['REDDAWAYAR'];
                this.quoteDetailsId = data.quoteId['REDDAWAYARID'];
              } else {
                this.quoteId = data.quoteId['REDDAWAYCOSTPLUS'];
                this.quoteDetailsId = data.quoteId['REDDAWAYCOSTPLUSID'];
              }
            }
            this.billOfLading.patchValue({ quoteNumber: this.quoteId, rate: this.totalChargeValue });
            console.log('this.billOfLading.patchValue({ quoteNumber', this.billOfLading.controls, this.quoteId)
            this.disableQuoteNumber = false;
          }
          if (this.getRateCheck === false) {
            this.create(this.billOfLading.value);
          } else {
            if (this.factorization !== 'COSTPLUS' && this.getRateCheck === true) {
              // this.loading = true;

              if (this.errorResponseInGetRate === false) {
                // $("#quote_details").modal('show');
                this.getResponseFromQuoteId(this.quoteId, 'AR');
                // this.loading = false;
                this.showLoader = false;
              }
            }
            else if (this.factorization === 'COSTPLUS' && this.getRateCheck === true) {
              // this.loading = true;

              if (this.errorResponseInGetRate === false) {
                // $("#costplus_quote_details").modal('show');
                this.getResponseFromQuoteId(this.quoteId, 'COSTPLUS');
                // this.loading = false;
                this.showLoader = false;
              }

            }
          }
        }, (err:any) => {
        });
      }
    }


  }
  netChargeArrSum(netCharge:any) {
    let total = 0;
    netCharge.forEach(function (key:any) {
      total = total + Number(key);
    });
    return total;
  }

  compare(arr1:any, arr2:any) {
    let finalArray:any = [];
    arr1.forEach((e1:any) => arr2.forEach((e2:any) => {
      if (e1.id === e2.id) {
        finalArray.push(e1);
      }
    }
    ));
    return finalArray;
  }

  /**
   * calculation for the assessorials
   * @param selectedItems
   * @param weight
   * @returns {number}
   */

  getRatingNotes(id:any) {
    console.log(this.customerFeatures);
    if (this.customerFeatures.length > 0) {
      for (let c = 0; c < this.customerFeatures.length; c++) {
        if (id === this.customerFeatures[c].id) {
          this.customerData = this.customerFeatures[c].ratingNotes;
        }
      }
    }
  }

  preview(billOfLading:any) {
    this.previewValue = billOfLading;
    console.log('this.previewValue', this.previewValue);
    let accessorialsForPreview = [];
    this.combiningArray();
    if (this.accessorials.length > 0) {
      this.previewValue.accessorials = this.accessorials;
    } else {
      this.previewValue.accessorials = '';
    }
    if (this.previewValue.pickupDate !== '' && this.previewValue.pickupDate !== null && this.previewValue.pickupDate !== undefined) {
      this.previewValue.pickupDate = this.previewValue.pickupDate;
    } else {
      let newDate = moment(this.previewValue.shipment).format('MM/DD/YYYY');
      this.previewValue.pickupDate = newDate;
    }
    let FEDEX;
    FEDEX = billOfLading.serviceType.replace('_', ' ').replace('_', ' ');
    this.previewValue.serviceType = FEDEX;
    if (this.previewValue.serviceType === 'OTHERS') {
      this.previewValue.serviceType = billOfLading.otherServiceType;
      if (this.previewValue.thirdParty === 'BillToForte') {
        this.previewValue.thirdParty = 'to Forte';
      } else if (this.previewValue.thirdParty === 'Collect') {
        this.previewValue.thirdParty = 'Collect';
      } else if (this.previewValue.thirdParty === 'ThirdParty') {
        this.previewValue.thirdParty = 'Third Party';
      } else if (this.previewValue.thirdParty === 'Prepay') {
        this.previewValue.thirdParty = 'Prepaid';
      }
    } else {
      if (this.previewValue.thirdParty === 'BillToForte') {
        this.previewValue.thirdParty = 'to Forte';
        this.previewValue.thirdPartyCity = 'Fife';
        this.previewValue.thirdPartyCompanyName = 'Forte';
        this.previewValue.thirdPartyPostalCode = '98424';
        this.previewValue.thirdPartyState = 'WA';
        this.previewValue.thirdPartyStreet = '301 54th Ave. E.Ste 200';
      } else {
        if (this.previewValue.thirdParty === 'Collect') {
          this.previewValue.thirdParty = 'Collect';
        } else if (this.previewValue.thirdParty === 'Prepay') {
          this.previewValue.thirdParty = 'Prepaid';
        } else {
          this.previewValue.thirdParty = 'Third Party';
        }

        this.previewValue.thirdPartyCity = this.previewValue.thirdPartyCity;
        this.previewValue.thirdPartyCompanyName = this.previewValue.thirdPartyCompanyName;
        this.previewValue.thirdPartyPostalCode = this.previewValue.thirdPartyPostalCode;
        this.previewValue.thirdPartyState = this.previewValue.thirdPartyState;
        this.previewValue.thirdPartyStreet = this.previewValue.thirdPartyStreet;
      }
    }
  }

  create(billOfLading:any) {
    console.log(billOfLading);
    // delete billOfLading['totalHandlingUnits'];
    // delete billOfLading['previewTotalOthers'];
    this.showErrorMessage = false;
    // this.descriptionErrorMsg = false;  
    this.combiningArray();
    this.combiningArrayForRequest();
    console.log("Create BOL", this.combiningAllShipmentsRequestArray);
    console.log('billOfLading create', 'this.billOfLading.invalid', this.billOfLading.invalid,
      'this.combiningAllShipmentsRequestArray.length', this.combiningAllShipmentsRequestArray.length, 'this.descriptionErrorMsg', this.descriptionErrorMsg)
    this.submitted = true;
    if (this.submitted === true) {
    }
    // stop here if form is invalid

    if (this.combiningAllShipmentsRequestArray.length === 0) {
      if (this.combiningAllShipmentsRequestArray.length !== 0 || this.descriptionErrorMsg === true) {
        console.log('If stmt for create BOL 1');
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 7000);
      } else {
        console.log('If else stmt for create BOL 1');
        this.showShipmentErrorMeassage = true;
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 7000);
      }
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 7000);
      return;
    } else {
      console.log('Else stmt for create BOL');
      this.showErrorMessage = false;
      this.showShipmentErrorMeassage = false;
    }
    this.showErrorForFedex = false;
    if (billOfLading.serviceType === 'FXFE') {
      billOfLading.serviceType = 'FEDEX_FREIGHT_ECONOMY';
    } else if (billOfLading.serviceType === 'FXFP') {
      billOfLading.serviceType = 'FEDEX_FREIGHT_PRIORITY';
    }
    if (billOfLading.specialInstructions !== null && billOfLading.specialInstructions !== undefined) {
      billOfLading.specialInstructions = billOfLading.specialInstructions;
    } else {
      billOfLading.specialInstructions = '';
    }
    if (billOfLading.serviceType === 'FEDEX_FREIGHT_ECONOMY' || billOfLading.serviceType === 'FEDEX_FREIGHT_PRIORITY') {
      if (billOfLading.serviceType !== '' &&
        billOfLading.shipperCompanyName !== '' && billOfLading.shipperPhoneNumber !== '' &&
        billOfLading.shipperStreet1 !== '' && billOfLading.shipperCity !== '' &&
        billOfLading.shipperState !== '' && billOfLading.shipperPostalCode !== '' &&
        billOfLading.shipperCountry !== '' && billOfLading.consigneeCompanyName !== '' &&
        billOfLading.consigneePhoneNumber !== '' && billOfLading.consigneeStreet1 !== '' &&
        billOfLading.consigneeCity !== '' && billOfLading.consigneeState !== '' &&
        billOfLading.consigneePostalCode !== '' && billOfLading.consigneeCountry !== '' &&
        this.combiningAllShipmentsRequestArray.length > 0) {
        if (this.lengthOfDetailArray !== 0 && this.showGetRateButton === true) {
          this.showErrorMsgForGetRate = true;
        } else {
          if (this.descriptionErrorMsg === true) {
            this.descriptionErrorMsg = true;
            this.showErrorMessage = true;
            setTimeout(() => {
              this.showErrorMessage = false;
            }, 7000);
          } else {
            this.descriptionErrorMsg = false;
            this.showErrorMsgForGetRate = false;
            this.showErrorMessage = false;
            this.classFilter();
            this.loading = true;
            // this.detailArray.forEach(function(v){ delete v.weightUnit });
            billOfLading.lineItems = JSON.stringify(this.combiningAllShipmentsRequestArray);
            this.createBillOfLading = billOfLading;
            this.createBillOfLading.previewTotalPieces = this.previewTotalPieces;
            this.createBillOfLading.previewTotalPallets = this.previewTotalPallets;
            this.createBillOfLading.previewTotalOthers = this.previewTotalOthers;
            this.createBillOfLading.shipTimestamp = this.datePipe.transform(billOfLading.shipTimestamp, 'yyyy-MM-dd');
            this.createBillOfLading.pickupDate = this.datePipe.transform(billOfLading.pickupDate, 'yyyy-MM-dd');
            this.createBillOfLading.totalHandlingUnits = this.totalHandlingUnits;
            this.createBillOfLading.lineItems = this.combiningAllShipmentsRequestArray;
            this.createBillOfLading.lineItemsFormat = this.combiningAllShipmentsArray;
            this.createBillOfLading.customerId = this.loginCustomerId;
            this.createBillOfLading.companyId = this.companyId;
            this.createBillOfLading.salesRepId = this.salesRepId;
            this.createBillOfLading.bolService = this.createStoreFlag;
            this.createBillOfLading.carrierFlag = this.backButtonCarrier;
            // this.createBillOfLading.consigneePostalCode = JSON.stringify(billOfLading.consigneePostalCode);
            // this.createBillOfLading.shipperPostalCode = JSON.stringify(billOfLading.shipperPostalCode);
            if (billOfLading.thirdParty === 'BillToForte') {
              let name = billOfLading.thirdParty.toUpperCase();
              this.createBillOfLading.billPaidTo = { name: name };
            } else {
              let name = billOfLading.thirdParty.toUpperCase();
              this.createBillOfLading.billPaidTo = { name: name, companyName: billOfLading.thirdPartyCompanyName, address: billOfLading.thirdPartyStreet, contactNumber: billOfLading.thirdPartyPhoneNumber, zip: billOfLading.thirdPartyPostalCode, city: billOfLading.thirdPartyCity, state: billOfLading.thirdPartyState };
            }
            let accessorialsName;
            if (this.accessorials.length > 0) {
              this.createBillOfLading.accessorials = this.accessorials;
            } else if (this.selectedItems.length > 0) {
              for (let s = 0; s < this.selectedItems.length; s++) {
                accessorialsName = this.selectedItems[s].itemName;
                this.accessorials.push(accessorialsName);
              }
            } else {
              this.createBillOfLading.accessorials = [];
            }
            if (this.accessorials.length > 0) {
              this.createBillOfLading.accessorials = this.accessorials;
            } else {
              this.createBillOfLading.accessorials = [];
            }
            if (this.createBillOfLading.pickupDate === null) {
              this.createBillOfLading.pickupDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

            }
            if (this.createBillOfLading.shipTimestamp === null) {
              this.createBillOfLading.shipTimestamp = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

            }
            this.createBillOfLading.factorization = this.factorization;
            this.createBillOfLading.totalHandlingUnits = '';
            this.createBillOfLading.previewTotalOthers = '';
            console.log('steve createBillOfLading fedex', this.createBillOfLading);
            this.pricingInfoService.setBillOfLadingValues(this.createBillOfLading);
            this.pricingInfoService.billOfLading(this.createBillOfLading).subscribe((data:any) => {
              this.responseData = data;
              this.logger = {
                'method': 'billOfLading', 'message': 'Creating the bill of lading', type: this.customerType,
                carrier: billOfLading.serviceType, service: this.createStoreFlag
              };
              this.loggerService.info(this.logger);
              if (this.responseData.result) {
                if (this.responseData.result.Notifications !== undefined) {
                  if (this.responseData.result.Notifications[0].Severity === 'SUCCESS') {
                    this.createBillOfLading.trackingIdType = this.responseData.result.CompletedShipmentDetail.MasterTrackingId.TrackingIdType;
                    this.createBillOfLading.trackingNumber = this.responseData.result.CompletedShipmentDetail.MasterTrackingId.TrackingNumber;
                    this.createBillOfLading.bolReferenceNumber = this.responseData.result.bolReferenceNumber;
                    this.createBillOfLading.id = this.responseData.result.id;
                    this.createBillOfLading.quoteNumber = billOfLading.quoteNumber;
                    this.createBillOfLading.rate = billOfLading.rate;
                    console.log('steve createBillOfLading fedex after success response', this.createBillOfLading);
                    this.pricingInfoService.setBillOfLadingValues(this.createBillOfLading);
                    this.pricingInfoService.passRateCheckValue(this.getRateCheck);
                    this.router.navigate(['/billOfLadingSummary']);
                  } else if (this.responseData.result.Notifications[0].Severity === 'WARNING') {
                    this.createBillOfLading.trackingIdType = this.responseData.result.CompletedShipmentDetail.MasterTrackingId.TrackingIdType;
                    this.createBillOfLading.trackingNumber = this.responseData.result.CompletedShipmentDetail.MasterTrackingId.TrackingNumber;
                    this.createBillOfLading.bolReferenceNumber = this.responseData.result.bolReferenceNumber;
                    this.createBillOfLading.id = this.responseData.result.id;
                    this.createBillOfLading.quoteNumber = billOfLading.quoteNumber;
                    this.createBillOfLading.rate = billOfLading.rate;
                    console.log('steve createBillOfLading fedex after warning response', this.createBillOfLading);
                    this.pricingInfoService.setBillOfLadingValues(this.createBillOfLading);
                    this.pricingInfoService.passRateCheckValue(this.getRateCheck);
                    this.router.navigate(['/billOfLadingSummary']);
                  } else {
                    this.showForm = false;
                    this.showErrorResponseFedex = true;
                    this.loading = false;
                    window.scroll(0, 0);
                    this.showAddedValue = true;
                    this.showShipmentTable = true;
                  }
                } else if (this.responseData.result.refNumber) {
                  this.createBillOfLading.bolReferenceNumber = this.responseData.result.bolReferenceNumber;
                  this.createBillOfLading.referenceNumber = this.responseData.result.refNumber;
                  console.log('steve createBillOfLading fedex after refnumber response', this.createBillOfLading);
                  this.pricingInfoService.setBillOfLadingValues(this.createBillOfLading);
                  this.pricingInfoService.passRateCheckValue(this.getRateCheck);
                  this.router.navigate(['/billOfLadingSummary']);
                } else {
                  this.loading = false;
                  this.showForm = false;
                  this.showErrorResponseFedex = false;
                  this.showErrorForFedex = true;
                  window.scroll(0, 0);
                  this.showAddedValue = true;
                  this.showShipmentTable = true;
                }
              } else {
                this.showForm = false;
                this.showCommonError = true;
                this.loading = false;
                window.scroll(0, 0);
                this.showAddedValue = true;
                this.showShipmentTable = true;
              }
            }, (err:any) => {
              this.loading = false;
              this.showForm = false;
              this.showCommonError = true;
              window.scroll(0, 0);
              this.logger = {
                'method': 'billOfLading', 'message': 'Error in Creating the bill of lading', type: this.customerType,
                carrier: billOfLading.serviceType, service: this.createStoreFlag
              };
              this.loggerService.error(this.logger);
              this.showAddedValue = true;
              this.showShipmentTable = true;
            });
          }
        }
      } else {
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 7000);
        this.loading = false;
        window.scroll(0, 0);
        this.showAddedValue = true;
        this.showShipmentTable = true;
      }
    } else if (billOfLading.serviceType === 'YRC') {
      if (billOfLading.serviceType !== '' &&
        billOfLading.shipperCompanyName !== '' && billOfLading.shipperPhoneNumber !== '' &&
        billOfLading.shipperStreet1 !== '' && billOfLading.shipperCity !== '' &&
        billOfLading.shipperState !== '' && billOfLading.shipperPostalCode !== '' &&
        billOfLading.shipperCountry !== '' && billOfLading.consigneeCompanyName !== '' &&
        billOfLading.consigneePhoneNumber !== '' && billOfLading.consigneeStreet1 !== '' &&
        billOfLading.consigneeCity !== '' && billOfLading.consigneeState !== '' &&
        billOfLading.consigneePostalCode !== '' && billOfLading.consigneeCountry !== '' &&
        this.combiningAllShipmentsRequestArray.length > 0) {
        if (this.lengthOfDetailArray !== 0 && this.showGetRateButton === true && this.descriptionErrorMsg === false) {
          this.showErrorMsgForGetRate = true;
        } else {
          if (this.descriptionErrorMsg === true) {
            this.descriptionErrorMsg = true;
            this.showErrorMessage = true;
            setTimeout(() => {
              this.showErrorMessage = false;
            }, 7000);
          } else {
            this.showErrorMsgForGetRate = false;
            this.loading = true;
            this.showErrorMessage = false;
            this.classFilter();
            // this.detailArray.forEach(function(v){ delete v.weightUnit });
            this.createBillOfLading = billOfLading;
            this.createBillOfLading.previewTotalPieces = this.previewTotalPieces;
            this.createBillOfLading.previewTotalPallets = this.previewTotalPallets;
            this.createBillOfLading.previewTotalOthers = this.previewTotalOthers;
            this.createBillOfLading.shipTimestamp = this.datePipe.transform(billOfLading.shipTimestamp, 'yyyy-MM-dd');
            this.createBillOfLading.pickupDate = this.datePipe.transform(billOfLading.pickupDate, 'yyyy-MM-dd');
            this.createBillOfLading.totalHandlingUnits = this.totalHandlingUnits;
            this.createBillOfLading.lineItems = this.combiningAllShipmentsRequestArray;
            this.createBillOfLading.lineItemsFormat = this.combiningAllShipmentsArray;
            this.createBillOfLading.customerId = this.loginCustomerId;
            this.createBillOfLading.companyId = this.companyId;
            this.createBillOfLading.salesRepId = this.salesRepId;
            this.createBillOfLading.bolService = this.createStoreFlag;
            this.createBillOfLading.carrierFlag = this.backButtonCarrier;
            this.createBillOfLading.factorization = this.factorization;
            // this.createBillOfLading.consigneePostalCode = JSON.stringify(billOfLading.consigneePostalCode);
            // this.createBillOfLading.shipperPostalCode = JSON.stringify(billOfLading.shipperPostalCode);
            if (billOfLading.thirdParty === 'BillToForte') {
              let name = billOfLading.thirdParty.toUpperCase();
              this.createBillOfLading.billPaidTo = { name: name };
            } else {
              let name = billOfLading.thirdParty.toUpperCase();
              this.createBillOfLading.billPaidTo = { name: name, companyName: billOfLading.thirdPartyCompanyName, address: billOfLading.thirdPartyStreet, contactNumber: billOfLading.thirdPartyPhoneNumber, zip: billOfLading.thirdPartyPostalCode, city: billOfLading.thirdPartyCity, state: billOfLading.thirdPartyState };
            }
            let accessorialsName;
            if (this.accessorials.length > 0) {
              this.createBillOfLading.accessorials = this.accessorials;
            } else if (this.selectedItems.length > 0) {
              for (let s = 0; s < this.selectedItems.length; s++) {
                accessorialsName = this.selectedItems[s].itemName;
                this.accessorials.push(accessorialsName);
              }
            } else {
              this.createBillOfLading.accessorials = [];
            }
            if (this.accessorials.length > 0) {
              this.createBillOfLading.accessorials = this.accessorials;
            } else {
              this.createBillOfLading.accessorials = [];
            }
            if (this.createBillOfLading.pickupDate === null) {
              this.createBillOfLading.pickupDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

            }
            if (this.createBillOfLading.shipTimestamp === null) {
              this.createBillOfLading.shipTimestamp = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

            }
            this.createBillOfLading.factorization = this.factorization;
            this.createBillOfLading.totalHandlingUnits = '';
            this.createBillOfLading.previewTotalOthers = '';
            console.log('this.createBillOfLading YRC', this.createBillOfLading);
            this.pricingInfoService.setBillOfLadingValues(this.createBillOfLading);
            this.pricingInfoService.billOfLading(this.createBillOfLading).subscribe((data:any) => {
              this.responseData = data;
              this.logger = {
                'method': 'billOfLading', 'message': 'Creating the bill of lading', type: this.customerType,
                carrier: billOfLading.serviceType, service: this.createStoreFlag
              };
              this.loggerService.info(this.logger);
              if (this.responseData.result) {
                if (this.responseData.result.statusCode === 500) {
                  this.showForm = false;
                  this.showCommonError = true;
                  this.loading = false;
                  this.showAddedValue = true;
                  this.showShipmentTable = true;
                  window.scroll(0, 0);
                } else if (this.responseData.result.refNumber) {
                  this.createBillOfLading.bolReferenceNumber = this.responseData.result.bolReferenceNumber;
                  this.createBillOfLading.referenceNumber = this.responseData.result.refNumber;
                  console.log('this.createBillOfLading yrc without web service call', this.createBillOfLading);
                  this.pricingInfoService.setBillOfLadingValues(this.createBillOfLading);
                  this.pricingInfoService.passRateCheckValue(this.getRateCheck);
                  this.router.navigate(['/billOfLadingSummary']);
                } else if (this.responseData.result.submitBOLResponse.statusMessages.item.length > 0) {
                  if (this.responseData.result.submitBOLResponse.statusMessages.item[0].$value) {
                    this.responseData.result.submitBOLResponse.statusMessages.item.$value = this.responseData.result.submitBOLResponse.statusMessages.item[0].$value
                    this.showForm = false;
                    this.showErrorResponseYrc = true;
                    this.loading = false;
                    this.showAddedValue = true;
                    this.showShipmentTable = true;
                    window.scroll(0, 0);
                  }
                } else if (this.responseData.result.submitBOLResponse.statusMessages.item.$value === 'SUCCESS') {
                  this.createBillOfLading.bolReferenceNumber = this.responseData.result.bolReferenceNumber;
                  this.createBillOfLading.referenceNumber = this.responseData.result.refNumber;
                  this.responseData.serviceType = 'YRC';
                  this.createBillOfLading.rate = billOfLading.rate;
                  this.createBillOfLading.quoteNumber = billOfLading.quoteNumber;
                  this.createBillOfLading.purchaseOrderNumber = billOfLading.purchaseOrderNumber;
                  this.createBillOfLading.shipperIdNumber = billOfLading.shipperIdNumber;
                  this.createBillOfLading.shippersBillOfLading = billOfLading.shippersBillOfLading;
                  this.createBillOfLading.billOfLadingTitle = billOfLading.billOfLadingTitle;
                  this.createBillOfLading.billOfReferenceNumber = billOfLading.billOfReferenceNumber;
                  this.createBillOfLading.lineItems = this.combiningAllShipmentsRequestArray;
                  this.createBillOfLading.lineItemsFormat = this.combiningAllShipmentsArray;
                  this.createBillOfLading.shipTimestamp = this.createBillOfLading.shipTimestamp;
                  this.createBillOfLading.pickupDate = this.createBillOfLading.pickupDate;
                  this.createBillOfLading.specialInstructions = this.createBillOfLading.specialInstructions;
                  this.createBillOfLading.shipperPhoneNumber = this.createBillOfLading.shipperPhoneNumber;
                  this.createBillOfLading.consigneePhoneNumber = this.createBillOfLading.consigneePhoneNumber;
                  this.createBillOfLading.bolService = this.createStoreFlag;
                  this.createBillOfLading.proNumber = this.responseData.result.submitBOLResponse.proNumber.$value;
                  this.createBillOfLading.id = this.responseData.result.id;
                  console.log('this.createBillOfLading yrc After response', this.createBillOfLading);
                  this.pricingInfoService.setBillOfLadingValues(this.createBillOfLading);
                  this.pricingInfoService.passRateCheckValue(this.getRateCheck);
                  this.router.navigate(['/billOfLadingSummary']);
                } else {

                  if (Object.keys(this.responseData.result.submitBOLResponse.statusMessages.item).length !== 0) {
                    this.responseData.result.submitBOLResponse.statusMessages.item.$value = this.responseData.result.submitBOLResponse.statusMessages.item.$value;
                    this.showForm = false;
                    this.showErrorResponseYrc = true;
                    this.loading = false;
                    this.showAddedValue = true;
                    this.showShipmentTable = true;
                    window.scroll(0, 0);
                  } else {
                    this.showForm = false;
                    this.showErrorResponseYrc = true;
                    this.loading = false;
                    this.showAddedValue = true;
                    this.showShipmentTable = true;
                    window.scroll(0, 0);
                  }
                }
              } else {
                this.showForm = false;
                this.showCommonError = true;
                this.loading = false;
                this.showAddedValue = true;
                this.showShipmentTable = true;
                window.scroll(0, 0);
              }
            }, (err:any) => {
              this.showForm = false;
              this.showCommonError = true;
              this.loading = false;
              this.showAddedValue = true;
              this.showShipmentTable = true;
              window.scroll(0, 0);
              this.logger = {
                'method': 'billOfLading', 'message': 'Error in Creating the bill of lading', type: this.customerType,
                carrier: billOfLading.serviceType, service: this.createStoreFlag
              };
              this.loggerService.error(this.logger);
            });
          }
        }
      } else {
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 7000);
        this.loading = false;
        this.showAddedValue = true;
        this.showShipmentTable = true;
        window.scroll(0, 0);
      }
    } else if (billOfLading.serviceType === 'REDDAWAY') {
      if (billOfLading.serviceType !== '' &&
        billOfLading.shipperCompanyName !== '' && billOfLading.shipperPhoneNumber !== '' &&
        billOfLading.shipperStreet1 !== '' && billOfLading.shipperCity !== '' &&
        billOfLading.shipperState !== '' && billOfLading.shipperPostalCode !== '' &&
        billOfLading.shipperCountry !== '' && billOfLading.consigneeCompanyName !== '' &&
        billOfLading.consigneePhoneNumber !== '' && billOfLading.consigneeStreet1 !== '' &&
        billOfLading.consigneeCity !== '' && billOfLading.consigneeState !== '' &&
        billOfLading.consigneePostalCode !== '' && billOfLading.consigneeCountry !== '' &&
        this.combiningAllShipmentsArray.length > 0) {
        if (this.lengthOfDetailArray !== 0 && this.showGetRateButton === true && this.descriptionErrorMsg === false) {
          this.showErrorMsgForGetRate = true;
        } else {
          if (this.descriptionErrorMsg === true) {
            this.descriptionErrorMsg = true;
            this.showErrorMessage = true;
            setTimeout(() => {
              this.showErrorMessage = false;
            }, 7000);
          } else {
            this.showErrorMsgForGetRate = false;
            this.loading = true;
            this.showErrorMessage = false;
            this.classFilter();
            //  this.detailArray.forEach(function(v){ delete v.weightUnit });
            this.createBillOfLading = billOfLading;
            this.createBillOfLading.previewTotalPieces = this.previewTotalPieces;
            this.createBillOfLading.previewTotalPallets = this.previewTotalPallets;
            this.createBillOfLading.previewTotalOthers = this.previewTotalOthers;
            this.createBillOfLading.shipTimestamp = this.datePipe.transform(billOfLading.shipTimestamp, 'yyyy-MM-dd');
            this.createBillOfLading.pickupDate = this.datePipe.transform(billOfLading.pickupDate, 'yyyy-MM-dd');
            this.createBillOfLading.totalHandlingUnits = this.totalHandlingUnits;
            this.createBillOfLading.lineItems = this.combiningAllShipmentsRequestArray;
            this.createBillOfLading.lineItemsFormat = this.combiningAllShipmentsArray;
            this.createBillOfLading.customerId = this.loginCustomerId;
            this.createBillOfLading.companyId = this.companyId;
            this.createBillOfLading.salesRepId = this.salesRepId;
            this.createBillOfLading.bolService = this.createStoreFlag;
            this.createBillOfLading.carrierFlag = this.backButtonCarrier;
            this.createBillOfLading.factorization = this.factorization;
            // this.createBillOfLading.consigneePostalCode = JSON.stringify(billOfLading.consigneePostalCode);
            // this.createBillOfLading.shipperPostalCode = JSON.stringify(billOfLading.shipperPostalCode);
            if (billOfLading.thirdParty === 'BillToForte') {
              let name = billOfLading.thirdParty.toUpperCase();
              this.createBillOfLading.billPaidTo = { name: name };
            } else {
              let name = billOfLading.thirdParty.toUpperCase();
              this.createBillOfLading.billPaidTo = { name: name, companyName: billOfLading.thirdPartyCompanyName, address: billOfLading.thirdPartyStreet, contactNumber: billOfLading.thirdPartyPhoneNumber, zip: billOfLading.thirdPartyPostalCode, city: billOfLading.thirdPartyCity, state: billOfLading.thirdPartyState };
            }
            let accessorialsName;
            if (this.accessorials.length > 0) {
              this.createBillOfLading.accessorials = this.accessorials;
            } else if (this.selectedItems.length > 0) {
              for (let s = 0; s < this.selectedItems.length; s++) {
                accessorialsName = this.selectedItems[s].itemName;
                this.accessorials.push(accessorialsName);
              }
            } else {
              this.createBillOfLading.accessorials = [];
            }
            if (this.accessorials.length > 0) {
              this.createBillOfLading.accessorials = this.accessorials;
            } else {
              this.createBillOfLading.accessorials = [];
            }
            if (this.createBillOfLading.pickupDate === null) {
              this.createBillOfLading.pickupDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

            }
            if (this.createBillOfLading.shipTimestamp === null) {
              this.createBillOfLading.shipTimestamp = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

            }
            this.createBillOfLading.factorization = this.factorization;
            this.createBillOfLading.totalHandlingUnits = '';
            this.createBillOfLading.previewTotalOthers = '';
            console.log('this.createBillOfLading Reddaway before', this.createBillOfLading);
            this.pricingInfoService.setBillOfLadingValues(this.createBillOfLading);
            this.pricingInfoService.billOfLading(this.createBillOfLading).subscribe((data:any) => {
              this.responseData = data;
              this.logger = {
                'method': 'billOfLading', 'message': 'Creating the bill of lading', type: this.customerType,
                carrier: billOfLading.serviceType, service: this.createStoreFlag
              };
              this.loggerService.info(this.logger);
              if (this.responseData.result.refNumber) {
                this.createBillOfLading.refNumber = this.responseData.result.refNumber;
                this.createBillOfLading.id = this.responseData.result.id;
                this.createBillOfLading.quoteNumber = billOfLading.quoteNumber;
                this.createBillOfLading.rate = billOfLading.rate;
                this.responseData.specialInstructions = this.createBillOfLading.specialInstructions;
                this.createBillOfLading.bolReferenceNumber = this.responseData.result.bolReferenceNumber;
                this.createBillOfLading.factorization = this.factorization;
                console.log('Reddaway mapping data after response', this.createBillOfLading);
                this.pricingInfoService.setBillOfLadingValues(this.createBillOfLading);
                this.pricingInfoService.passRateCheckValue(this.getRateCheck);
                this.router.navigate(['/billOfLadingSummary']);
              } else {
                this.showForm = false;
                this.showCommonError = true;
                this.loading = false;
                this.showAddedValue = true;
                this.showShipmentTable = true;
                window.scroll(0, 0);
              }
            }, (err:any) => {
              this.showForm = false;
              this.showCommonError = true;
              this.loading = false;
              this.showAddedValue = true;
              this.showShipmentTable = true;
              window.scroll(0, 0);
              this.logger = {
                'method': 'billOfLading', 'message': 'Error in Creating the bill of lading', type: this.customerType,
                carrier: billOfLading.serviceType, service: this.createStoreFlag
              };
              this.loggerService.error(this.logger);
            });
          }
        }
      } else {
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 7000);
        this.loading = false;
        this.showAddedValue = true;
        this.showShipmentTable = true;
        window.scroll(0, 0);
      }
    } else if (billOfLading.serviceType === 'OTHERS') {
      if (billOfLading.serviceType !== '' &&
        billOfLading.shipperCompanyName !== '' && billOfLading.shipperPhoneNumber !== '' &&
        billOfLading.shipperStreet1 !== '' && billOfLading.shipperCity !== '' &&
        billOfLading.shipperState !== '' && billOfLading.shipperPostalCode !== '' &&
        billOfLading.shipperCountry !== '' && billOfLading.consigneeCompanyName !== '' &&
        billOfLading.consigneePhoneNumber !== '' && billOfLading.consigneeStreet1 !== '' &&
        billOfLading.consigneeCity !== '' && billOfLading.consigneeState !== '' &&
        billOfLading.consigneePostalCode !== '' && billOfLading.consigneeCountry !== '' &&
        this.combiningAllShipmentsRequestArray.length > 0) {
        console.log('others BOL');

        console.log('others BOL2');
        this.showErrorMsgForGetRate = false;
        this.loading = true;
        this.showErrorMessage = false;
        this.classFilter();
        //  this.detailArray.forEach(function(v){ delete v.weightUnit });
        this.createBillOfLading = billOfLading;
        this.createBillOfLading.previewTotalPieces = this.previewTotalPieces;
        this.createBillOfLading.previewTotalPallets = this.previewTotalPallets;
        this.createBillOfLading.previewTotalOthers = this.previewTotalOthers;
        this.createBillOfLading.shipTimestamp = this.datePipe.transform(billOfLading.shipTimestamp, 'yyyy-MM-dd');
        this.createBillOfLading.pickupDate = this.datePipe.transform(billOfLading.pickupDate, 'yyyy-MM-dd');
        this.createBillOfLading.totalHandlingUnits = this.totalHandlingUnits;
        this.createBillOfLading.lineItems = this.combiningAllShipmentsRequestArray;
        this.createBillOfLading.lineItemsFormat = this.combiningAllShipmentsArray;
        this.createBillOfLading.customerId = this.loginCustomerId;
        this.createBillOfLading.companyId = this.companyId;
        this.createBillOfLading.salesRepId = this.salesRepId;
        this.createBillOfLading.bolService = this.createStoreFlag;
        this.createBillOfLading.carrierFlag = this.backButtonCarrier;
        this.createBillOfLading.factorization = this.factorization;
        this.createBillOfLading.serviceType = 'OTHERS';
        this.createBillOfLading.otherServiceType = billOfLading.otherServiceType;
        if (billOfLading.thirdParty === 'BillToForte') {
          let name = billOfLading.thirdParty.toUpperCase();
          this.createBillOfLading.billPaidTo = { name: name };
        } else {
          let name = billOfLading.thirdParty.toUpperCase();
          this.createBillOfLading.billPaidTo = { name: name, companyName: billOfLading.thirdPartyCompanyName, address: billOfLading.thirdPartyStreet, contactNumber: billOfLading.thirdPartyPhoneNumber, zip: billOfLading.thirdPartyPostalCode, city: billOfLading.thirdPartyCity, state: billOfLading.thirdPartyState };
        }
        let accessorialsName;
        if (this.accessorials.length > 0) {
          this.createBillOfLading.accessorials = this.accessorials;
        } else if (this.selectedItems.length > 0) {
          for (let s = 0; s < this.selectedItems.length; s++) {
            accessorialsName = this.selectedItems[s].itemName;
            this.accessorials.push(accessorialsName);
          }
        } else {
          this.createBillOfLading.accessorials = [];
        }
        if (this.accessorials.length > 0) {
          this.createBillOfLading.accessorials = this.accessorials;
        } else {
          this.createBillOfLading.accessorials = [];
        }
        if (this.createBillOfLading.pickupDate === null) {
          this.createBillOfLading.pickupDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

        }
        if (this.createBillOfLading.shipTimestamp === null) {
          this.createBillOfLading.shipTimestamp = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

        }
        this.createBillOfLading.factorization = this.factorization;
        this.createBillOfLading.totalHandlingUnits = '';
        this.createBillOfLading.previewTotalOthers = '';
        console.log('this.createBillOfLading others before', this.createBillOfLading);
        this.pricingInfoService.setBillOfLadingValues(this.createBillOfLading);
        this.pricingInfoService.billOfLading(this.createBillOfLading).subscribe((data:any) => {
          console.log('data1', data)
          this.responseData = data;
          this.logger = {
            'method': 'billOfLading', 'message': 'Creating the bill of lading', type: this.customerType,
            carrier: billOfLading.serviceType, service: this.createStoreFlag
          };
          this.loggerService.info(this.logger);
          if (this.responseData.result.refNumber) {
            this.createBillOfLading.referenceNumber = this.responseData.result.refNumber;
            this.createBillOfLading.bolReferenceNumber = this.responseData.result.bolReferenceNumber;
            this.createBillOfLading.id = this.responseData.result.id;
            console.log('this.createBillOfLading others after response', this.createBillOfLading);
            this.pricingInfoService.setBillOfLadingValues(this.createBillOfLading);
            this.pricingInfoService.passRateCheckValue(this.getRateCheck);
            this.router.navigate(['/billOfLadingSummary']);
          } else {
            console.log('data')
            this.showForm = false;
            this.showCommonError = true;
            this.loading = false;
            window.scroll(0, 0);
          }
        }, (err:any) => {
          this.showAddedValue = true;
          this.showShipmentTable = true;
          window.scroll(0, 0);
          this.logger = {
            'method': 'billOfLading', 'message': 'Error in Creating the bill of lading', type: this.customerType,
            carrier: billOfLading.serviceType, service: this.createStoreFlag
          };
          this.loggerService.error(this.logger);
        });
        // }
      }
    } else if (billOfLading.serviceType === '') {
      if (billOfLading.shipTimestamp !== '' &&
        billOfLading.shipperCompanyName !== '' && billOfLading.shipperPhoneNumber !== '' &&
        billOfLading.shipperStreet1 !== '' && billOfLading.shipperCity !== '' &&
        billOfLading.shipperState !== '' && billOfLading.shipperPostalCode !== '' &&
        billOfLading.shipperCountry !== '' && billOfLading.consigneeCompanyName !== '' &&
        billOfLading.consigneePhoneNumber !== '' && billOfLading.consigneeStreet1 !== '' &&
        billOfLading.consigneeCity !== '' && billOfLading.consigneeState !== '' &&
        billOfLading.consigneePostalCode !== '' && billOfLading.consigneeCountry !== '' &&
        this.combiningAllShipmentsRequestArray.length > 0) {
        console.log('others BOL');

        console.log('others BOL2');
        this.showErrorMsgForGetRate = false;
        this.loading = true;
        this.showErrorMessage = false;
        this.classFilter();
        //  this.detailArray.forEach(function(v){ delete v.weightUnit });
        this.createBillOfLading = billOfLading;
        this.createBillOfLading.previewTotalPieces = this.previewTotalPieces;
        this.createBillOfLading.previewTotalPallets = this.previewTotalPallets;
        this.createBillOfLading.previewTotalOthers = this.previewTotalOthers;
        this.createBillOfLading.shipTimestamp = this.datePipe.transform(billOfLading.shipTimestamp, 'yyyy-MM-dd');
        this.createBillOfLading.pickupDate = this.datePipe.transform(billOfLading.pickupDate, 'yyyy-MM-dd');
        this.createBillOfLading.totalHandlingUnits = this.totalHandlingUnits;
        this.createBillOfLading.lineItems = this.combiningAllShipmentsRequestArray;
        this.createBillOfLading.lineItemsFormat = this.combiningAllShipmentsArray;
        this.createBillOfLading.customerId = this.loginCustomerId;
        this.createBillOfLading.companyId = this.companyId;
        this.createBillOfLading.salesRepId = this.salesRepId;
        this.createBillOfLading.bolService = false;
        this.createBillOfLading.carrierFlag = this.backButtonCarrier;
        this.createBillOfLading.factorization = this.factorization;
        this.createBillOfLading.serviceType = '';
        if (billOfLading.thirdParty === 'BillToForte') {
          let name = billOfLading.thirdParty.toUpperCase();
          this.createBillOfLading.billPaidTo = { name: name };
        } else {
          let name = billOfLading.thirdParty.toUpperCase();
          this.createBillOfLading.billPaidTo = { name: name, companyName: billOfLading.thirdPartyCompanyName, address: billOfLading.thirdPartyStreet, contactNumber: billOfLading.thirdPartyPhoneNumber, zip: billOfLading.thirdPartyPostalCode, city: billOfLading.thirdPartyCity, state: billOfLading.thirdPartyState };
        }
        let accessorialsName;
        if (this.accessorials.length > 0) {
          this.createBillOfLading.accessorials = this.accessorials;
        } else if (this.selectedItems.length > 0) {
          for (let s = 0; s < this.selectedItems.length; s++) {
            accessorialsName = this.selectedItems[s].itemName;
            this.accessorials.push(accessorialsName);
          }
        } else {
          this.createBillOfLading.accessorials = [];
        }
        if (this.accessorials.length > 0) {
          this.createBillOfLading.accessorials = this.accessorials;
        } else {
          this.createBillOfLading.accessorials = [];
        }
        console.log('this.createBillOfLading others without serivce type before', this.createBillOfLading);
        this.pricingInfoService.setBillOfLadingValues(this.createBillOfLading);
        this.pricingInfoService.billOfLading(this.createBillOfLading).subscribe((data:any) => {
          this.responseData = data;
          this.logger = {
            'method': 'billOfLading', 'message': 'Creating the bill of lading', type: this.customerType,
            carrier: billOfLading.serviceType, service: this.createStoreFlag
          };
          this.loggerService.info(this.logger);
          if (this.responseData.result.refNumber) {
            this.createBillOfLading.referenceNumber = this.responseData.result.refNumber;
            this.createBillOfLading.bolReferenceNumber = this.responseData.result.bolReferenceNumber;
            console.log('this.createBillOfLading others after response', this.createBillOfLading);
            this.pricingInfoService.setBillOfLadingValues(this.createBillOfLading);
            this.pricingInfoService.passRateCheckValue(this.getRateCheck);
            this.router.navigate(['/billOfLadingSummary']);
          } else {
            this.showForm = false;
            this.showCommonError = true;
            this.loading = false;
            window.scroll(0, 0);
          }
        }, (err:any) => {
          this.showAddedValue = true;
          this.showShipmentTable = true;
          window.scroll(0, 0);
          this.logger = {
            'method': 'billOfLading', 'message': 'Error in Creating the bill of lading', type: this.customerType,
            carrier: billOfLading.serviceType, service: this.createStoreFlag
          };
          this.loggerService.error(this.logger);
        });
        // }
      }
    } else {
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 7000);
      this.loading = false;
      this.showAddedValue = true;
      this.showShipmentTable = true;
      window.scroll(0, 0);
    }
    //  else {
    //   this.showErrorMessage = true;
    //   setTimeout(() => {
    //     this.showErrorMessage = false;
    //   }, 7000);
    //   this.loading = false;
    //   this.showAddedValue = true;
    //   this.showShipmentTable = true;
    //   window.scroll(0, 0);
    // }
  }


  classFilter() {
    if (this.combiningAllShipmentsRequestArray.length > 0) {
      for (let d = 0; d < this.combiningAllShipmentsRequestArray.length; d++) {
        if (this.combiningAllShipmentsRequestArray[d].FreightClass.toString().length > 1) {
          if (this.combiningAllShipmentsRequestArray[d].FreightClass === '77.5') {
            this.combiningAllShipmentsRequestArray[d].FreightClass = 'CLASS_' + '077_5';
          } else if (this.combiningAllShipmentsRequestArray[d].FreightClass === '92.5') {
            this.combiningAllShipmentsRequestArray[d].FreightClass = 'CLASS_' + '092_5';
          } else if (this.combiningAllShipmentsRequestArray[d].FreightClass.toString().length === 2) {
            this.combiningAllShipmentsRequestArray[d].FreightClass = 'CLASS_0' + this.combiningAllShipmentsRequestArray[d].FreightClass;
          } else {
            this.combiningAllShipmentsRequestArray[d].FreightClass = 'CLASS_' + this.combiningAllShipmentsRequestArray[d].FreightClass;
          }
        }
      }
    }
  }

  clearAllData() {
    this.billOfLading.reset();
    this.billOfLading.patchValue({
      consigneeCountry: 'USA', shipperCountry: 'USA',
      thirdParty: 'BillToForte',
      weightUnitType: 'ttl.',
      packageUnitType: 'CTN',
      handlingUnitType: 'PLT', length: '', width: '', height: '', purchaseOrderNumber: '', rate: '', shipmentType: 'Non Itemized'
    });
    if (this.carrierArray.length > 0) {
      this.setFlagForNotExisting = true;
      this.setFlagForExisting = false;
      this.showCarrierRule = true;
      this.setEditModalFlag = false;
    } else {
      //  this.billOfLading.patchValue({serviceType: 'No Rule'});
      this.setFlagForNotExisting = true;
      this.setFlagForExisting = false;
      this.errorGetRateMsg = true;
      this.showCarrierRule = false;
      this.setEditModalFlag = false;
    }

    this.localStorageSalesData();
    this.detailArray = [];
    this.pricingDetail = [];
    this.showAddedValue = false;
    this.showInputForOthers = false;
    this.errorGetRateMsg = false;
    // this.setFlagForExisting = false;
    this.serviceNotAvailableMsg = false;
    this.showGetRateButton = true;
    this.showRate = true;
    this.errorResponseInGetRate = false;
    this.addRowForExistingQuote = false;
    this.existingQuoteErrorMsg = false;
    this.invalidQuoteMsg = false;
    this.invalidQuoteCarrierMsg = false;
    this.disableQuoteNumber = false;
    this.selectedItems = [];
    this.errorMsgForUpdate = false;

  }

  formatPhoneNumber(s:any) {
    let s2 = ('' + s).replace(/\D/g, '');
    let m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ')' + m[2] + '-' + m[3];
  }

  existingQuote(billOfLading:any) {
    console.log('existingQuote', billOfLading);
    this.detailArray = [];
    this.selectedItems = [];
    this.setFlagForExisting = false;
    this.setFlagForNotExisting = false;
    this.invalidQuoteMsg = false;
    this.invalidQuoteCarrierMsg = false;
    this.setEditModalFlag = false;
    this.showShipmentTable = true;
    this.weightUnit = '';
    this.previewTotalPallets = 0;
    this.previewTotalPieces = 0;
    this.palletCount = [];
    this.piecesCount = [];
    this.costPlusArray = [];
    this.disableQuoteNumber = true;
    this.noRuleErrorMsg = false;
    this.detailArray = [], this.piecesForMultiClassListArray = [], this.piecesForItemizeListArray = [];
    let carrierName;
    if (this.carrierArray.length > 0) {
      if (this.salesRepValues.companyDetails !== undefined) {
        if (this.salesRepValues.companyDetails.costPlus === true) {
          if (this.salesRepValues.companyDetails.costPlusFactor.length > 0) {
            this.costPlusArray = this.salesRepValues.companyDetails.costPlusFactor;
            if (this.costPlusArray.length > 0) {
              for (let cp = 0; cp < this.costPlusArray.length; cp++) {
                if (this.costPlusArray[cp].carrier === 'FEDEX PRIORITY') {
                  carrierName = 'FXFP';
                } else if (this.costPlusArray[cp].carrier === 'FEDEX ECONOMY') {
                  carrierName = 'FXFE';
                } else {
                  carrierName = this.costPlusArray[cp].carrier;
                }
                this.carrierArray.push(carrierName);
                this.carrierArray = this.removeDuplicates(this.carrierArray);
              }
            }
          }
        }
      }
    } else {
      if (this.salesRepValues.companyDetails !== undefined) {
        if (this.salesRepValues.companyDetails.costPlus === true) {
          if (this.salesRepValues.companyDetails.costPlusFactor.length > 0) {
            this.costPlusArray = this.salesRepValues.companyDetails.costPlusFactor;
            if (this.costPlusArray.length > 0) {
              for (let cp = 0; cp < this.costPlusArray.length; cp++) {
                this.carrierArray.push(this.costPlusArray[cp].carrier);
                this.carrierArray = this.removeDuplicates(this.carrierArray);
              }
            }
          }
        }
      }
    }
    this.pricingInfoService.searchByQuoteNumber(billOfLading.quoteNumber).subscribe((response:any) => {
      console.log('', response);
      this.quoteResponse = response;
      this.logger = {
        'method': 'searchByQuoteNumber',
        'message': 'Retrieving data for Existing Quote number in bill of lading',
        type: this.customerType,
        QuoteNumber: billOfLading.quoteNumber
      };
      this.loggerService.info(this.logger);
      if (this.quoteResponse.length > 0) {
        this.existingQuoteErrorMsg = false;
        this.showGetRateButton = false;
        this.showRate = true;
        this.createStoreFlag = true;
        if (this.quoteResponse.length > 0) {
          for (let q = 0; q < this.quoteResponse.length; q++) {
            if (this.quoteResponse[q].category === 'AR' || this.quoteResponse[q].category === 'COSTPLUS') {
              this.quoteDetails = this.quoteResponse[q];
            }
          }
          //   this.quoteDetails = response[1];
          // } else {
          //   this.quoteDetails = response[0];
        }
        if (this.customerType === 'admin') {
          if (this.salesRepType === 'internalSalesRep') {
            if (this.quoteDetails.salesRepId === this.salesRepId) {
              this.backButtonCarrier = true;
              this.setFlagForExisting = true;
              this.disableQuoteNumber = true;
              this.setEditModalFlag = true;
              this.showShipmentTable = false;
              this.weightUnit = 'ttl';
              this.fetchQuoteDetails();

            } else {
              this.setFlagForNotExisting = true;
              this.existingQuoteErrorMsg = false;
              this.invalidQuoteMsg = true;
              this.addRowForExistingQuote = false;
              this.createStoreFlag = false;
              this.disableQuoteNumber = false;
              this.backButtonCarrier = false;
              this.showShipmentTable = true;
            }
          } else {
            this.setFlagForExisting = true;
            this.disableQuoteNumber = true;
            this.backButtonCarrier = true;
            this.setEditModalFlag = true;
            this.showShipmentTable = false;
            this.weightUnit = 'ttl';
            this.fetchQuoteDetails();

          }
        } else {
          console.log('quote response', this.quoteResponse);
          if (this.quoteDetails.companyId !== this.companyId) {
            this.setFlagForNotExisting = true;
            this.existingQuoteErrorMsg = false;
            this.invalidQuoteMsg = true;
            this.addRowForExistingQuote = false;
            this.createStoreFlag = false;
            this.disableQuoteNumber = false;
            this.backButtonCarrier = false;
            this.showShipmentTable = true;
          } else {
            this.disableQuoteNumber = true;
            this.backButtonCarrier = true;
            this.showShipmentTable = false;
            let carrierNew:any;
            let carrierData = [];
            if (this.carrierArray.length > 0) {
              if (this.quoteDetails.carrier === 'FEDEX ECONOMY') {
                carrierNew = 'FXFE';
              } else if (this.quoteDetails.carrier === 'FEDEX PRIORITY') {
                carrierNew = 'FXFP';
              } else {
                carrierNew = this.quoteDetails.carrier;
              }
              carrierData = this.carrierArray.filter(function (el:any) {
                return el === carrierNew;
              });
            }
            if (carrierData.length === 0) {
              this.invalidQuoteCarrierMsg = true;
              this.setFlagForNotExisting = true;
              this.existingQuoteErrorMsg = false;
              this.invalidQuoteMsg = false;
              this.addRowForExistingQuote = false;
              this.createStoreFlag = false;
              this.disableQuoteNumber = false;
            } else {
              this.disableQuoteNumber = true;
              this.invalidQuoteCarrierMsg = false;
              if (this.salesRepValues.zip === this.quoteDetails.originZip) {
                this.billOfLading.patchValue({
                  shipperCompanyName: this.salesRepValues.companyName,
                  shipperContactName: this.salesRepValues.customerName,
                  shippercontactNumber: this.salesRepValues.contactNumber,
                  shipperStreet1: this.salesRepValues.address
                });
              } else if (this.salesRepValues.pickupInformation !== null && this.salesRepValues.pickupInformation !== undefined) {
                if (this.salesRepValues.pickupInformation.zip === this.quoteDetails.originZip) {
                  this.billOfLading.patchValue({
                    shippercustomerName: this.salesRepValues.pickupInformation.customerName,
                    shippercontactNumber: this.salesRepValues.pickupInformation.contactNumber,
                    shipperStreet1: this.salesRepValues.pickupInformation.address1,
                    shipperStreet2: this.salesRepValues.pickupInformation.address2
                  });
                } else {
                  this.billOfLading.patchValue({
                    shipperCompanyName: '',
                    shipperContactName: '',
                    shipperPhoneNumber: '',
                    shipperStreet1: '',
                    shipperStreet2: ''
                  });
                }
              } else {
                this.billOfLading.patchValue({
                  shipperCompanyName: '',
                  shipperContactName: '',
                  shipperPhoneNumber: '',
                  shipperStreet1: '',
                  shipperStreet2: ''
                });
              }
              this.weightUnit = 'ttl';
              this.backButtonCarrier = true;
              this.fetchQuoteDetails();
            }
          }
        }
      } else {
        this.setFlagForNotExisting = true;
        this.existingQuoteErrorMsg = true;
        this.addRowForExistingQuote = false;
        this.createStoreFlag = false;
        this.backButtonCarrier = false;
        this.disableQuoteNumber = false;
        this.backButtonCarrier = false;
        this.showShipmentTable = true;
      }
    }, (err:any) => {
      this.logger = {
        'method': 'searchByQuoteNumber',
        'message': 'Error in Retrieving data for Existing Quote number in bill of lading',
        type: this.customerType,
        QuoteNumber: billOfLading.quoteNumber
      };
      this.loggerService.error(this.logger);
    });
    let createBol = '';
    this.pricingInfoService.setBolQuoteId(createBol);
  }


  fetchQuoteDetails() {
    console.log(this.quoteDetails);
    if (this.quoteDetails) {
      let carrier;
      let classAndWeight;
      if (this.quoteDetails.accessorials !== '') {
        let accessorials;
        accessorials = this.quoteDetails.accessorials;
        let accessorialsSplit = [];
        accessorialsSplit = accessorials.split(',');
        for (let a = 0; a < accessorialsSplit.length; a++) {
          for (let b = 0; b < this.dropdownList.length; b++) {
            if (accessorialsSplit[a] === 'LiftGate Service') {
              accessorialsSplit[a] = 'LiftGate Delivery';
              if (accessorialsSplit[a] === this.dropdownList[b].itemName) {
                this.selectedItems.push(this.dropdownList[b]);
              }
            } else {
              if (accessorialsSplit[a] === this.dropdownList[b].itemName) {
                this.selectedItems.push(this.dropdownList[b]);
              }
            }
          }
        }
      } else {
        this.selectedItems = [];
      }
      let carrierType;
      if (this.quoteDetails.carrier === 'FEDEX ECONOMY') {
        carrierType = 'FXFE';
      } else if (this.quoteDetails.carrier === 'FEDEX PRIORITY') {
        carrierType = 'FXFP';
      } else {
        carrierType = this.quoteDetails.carrier;
      }
      this.serviceCarrierType = carrierType;
      if (this.carrierArray.length > 0) {
        for (let i = 0; i < this.carrierArray.length; i++) {
          if (this.carrierArray[i] === carrierType) {
            this.setFlagForExisting = true;
            this.errorGetRateMsg = false;
            this.showCarrierRule = true;
            this.setFlagForNotExisting = false;
            this.setEditModalFlag = true;
            this.billOfLading.patchValue({ serviceType: carrierType });
            break;
          } else {
            this.errorGetRateMsg = true;
            this.showCarrierRule = false;
            // this.setFlagForNotExisting = false;
            this.setFlagForExisting = true;
            this.setEditModalFlag = true;
            this.billOfLading.patchValue({
              serviceType: this.quoteDetails.carrier
            });
          }
        }
      } else {
        this.carrierArray = [];
        this.errorGetRateMsg = true;
        this.showCarrierRule = false;
        /*this.setFlagForNotExisting = false;
        this.setFlagForExisting = false;*/
        this.billOfLading.patchValue({ serviceType: 'No Rule' });
      }
      classAndWeight = JSON.parse(this.quoteDetails.classAndWeight);

      let handlingUnitType, packageUnitType;
      if (this.quoteDetails.carrier === 'FEDEX ECONOMY' || this.quoteDetails.carrier === 'FEDEX PRIORITY') {
        handlingUnitType = 'PALLET';
        packageUnitType = 'CTN';
      } else if (this.quoteDetails.carrier === 'REDDAWAY') {
        handlingUnitType = 'Pallets';
        packageUnitType = 'CTN';
      } else {
        handlingUnitType = 'PLT';
        packageUnitType = 'CTN';
      }
      let totalWeightLtlArray = [], totalWeightForLtl, rowObject, newAddPieces = [];
      /*   if (classAndWeight.length > 1) {
          for (let l = 0; l < classAndWeight.length; l++) {
            totalWeightLtlArray.push(classAndWeight[l].weight);
            totalWeightForLtl = this.netChargeArrSum(totalWeightLtlArray);
          }
          for (let c = 0; c < classAndWeight.length; c++) {
            rowObject = {
              'isHazardous': false,
              'FreightClass': classAndWeight[c].classification,
              'HandlingUnitQuantity': '',
              'HandlingUnitType': handlingUnitType,
              'PackageQuantity': '',
              'PackageUnitType': packageUnitType,
              'Pieces': '',
              'weightUnit': this.weightUnit,
              'PurchaseOrderNumber': '',
              'Description': '',
              'Weight': {
                'Units': 'LB',
                'Value': classAndWeight[c].weight
              },
              'Dimensions': {
                'Length': '',
                'Width': '',
                'Height': '',
                'Units': 'IN'
              },
  
            };
            newAddPieces.push(rowObject)
          }
          let newObject = {
            'isHazardous': false,
            'FreightClass': '',
            'HandlingUnitQuantity': '',
            'HandlingUnitType': handlingUnitType,
            'PackageQuantity': '',
            'PackageUnitType': packageUnitType,
            'Pieces': '',
            'weightUnit': this.weightUnit,
            'PurchaseOrderNumber': '',
            'Description': '',
            'Weight': {
              'Units': 'LB',
              'Value': totalWeightForLtl
            },
            'Dimensions': {
              'Length': '',
              'Width': '',
              'Height': '',
              'Units': 'IN'
            },
            newAddPieces: newAddPieces,
            feature: 'editOnLtl'
          };
  
          this.piecesForMultiClassListArray.push(newObject);
          if (this.piecesForMultiClassListArray.length > 0) {
            for (let p = 0; p < this.piecesForMultiClassListArray.length; p++) {
              if (this.piecesForMultiClassListArray[p].newAddPieces.length > 0) {
                this.piecesForMultiClassListArray[p].rowSpanValues = this.piecesForMultiClassListArray[p].newAddPieces.length;
                console.log('this.piecesForMultiClassListArray[p].rowSpanValues ', this.piecesForMultiClassListArray[p].rowSpanValues);
              }
  
            }
  
          }
          console.log('quote response this.piecesForMultiClassListArray', this.piecesForMultiClassListArray);
  
        } else  */
      if (classAndWeight.length >= 1) {
        for (let c = 0; c < classAndWeight.length; c++) {
          let rowObject;

          rowObject = {
            'isHazardous': false,
            'FreightClass': classAndWeight[c].classification,
            'HandlingUnitQuantity': '',
            'HandlingUnitType': handlingUnitType,
            'PackageQuantity': '',
            'PackageUnitType': packageUnitType,
            'Pieces': '',
            'weightUnit': this.weightUnit,
            'PurchaseOrderNumber': '',
            'Description': '',
            'Weight': {
              'Units': 'LB',
              'Value': classAndWeight[c].weight
            },
            'Dimensions': {
              'Length': '',
              'Width': '',
              'Height': '',
              'Units': 'IN'
            }
          };
          this.detailArray.push(rowObject);
        }
      }
      this.totalPieces = 0;
      this.totalWeights = 0;
      let totalWeight, weightArray = [], piecesArray = [];
      for (let d = 0; d < this.detailArray.length; d++) {
        let addPieces = this.detailArray[d].HandlingUnitQuantity;
        let addWeight = this.detailArray[d].Weight.Value;
        if (this.detailArray[d].weightUnit === 'ttl') {
          totalWeight = Number(addWeight);
          weightArray.push(totalWeight);
        }
        piecesArray.push(addPieces);
        if (this.detailArray[d].PackageUnitType !== '' || this.detailArray[d].PackageUnitType !== undefined) {
          this.piecesCount.push(this.detailArray[d].PackageQuantity);
        }
        if (this.detailArray[d].HandlingUnitType === 'PLT' || this.detailArray[d].HandlingUnitType === 'PALLET' || this.detailArray[d].HandlingUnitType === 'Pallets') {
          this.palletCount.push(this.detailArray[d].HandlingUnitQuantity);
        }
        if (this.detailArray[d].Description !== '' && this.detailArray[d].Description !== null && this.detailArray[d].Description !== undefined) {
          this.descriptionErrorMsg = false;
        } else {
          this.descriptionErrorMsg = true;
        }
      }
      this.previewTotalPallets = this.netChargeArrSum(this.palletCount);
      this.previewTotalPieces = this.netChargeArrSum(this.piecesCount);
      this.totalPieces = this.netChargeArrSum(piecesArray);
      this.totalWeights = this.netChargeArrSum(weightArray);
      if (this.detailArray.length > 0) {
        this.showShipmentTable = true;
        this.showAddedValue = true;
        for (let d = 0; d < this.detailArray.length; d++) {
          if (this.detailArray[d].FreightClass === '77') {
            this.detailArray[d].FreightClass = "77.5";
          } else if (this.detailArray[d].FreightClass === '92') {
            this.detailArray[d].FreightClass = "92.5";
          } else {
            this.detailArray[d].FreightClass = this.detailArray[d].FreightClass;
          }
        }
        this.billOfLading.patchValue({
          shipmentType: 'Non Itemized'
        });
        this.descriptionErrorMsg = false;
      } else {
        if (this.piecesForMultiClassListArray.length > 0) {
          this.showShipmentTable = true;
          this.showAddedValue = true;
          this.billOfLading.patchValue({
            shipmentType: 'Multi Classed Pallet'
          });
          for (let i = 0; i < this.piecesForMultiClassListArray.length; i++) {
            for (let d = 0; d < this.piecesForMultiClassListArray[i].newAddPieces.length; d++) {
              if (this.piecesForMultiClassListArray[i].newAddPieces[d].FreightClass === '77') {
                this.piecesForMultiClassListArray[i].newAddPieces.FreightClass = "77.5";
              } else if (this.piecesForMultiClassListArray[i].newAddPieces[d].FreightClass === '92') {
                this.piecesForMultiClassListArray[i].newAddPieces[d].FreightClass = "92.5";
              } else {
                this.piecesForMultiClassListArray[i].newAddPieces[d].FreightClass = this.piecesForMultiClassListArray[i].newAddPieces[d].FreightClass;
              }
              this.piecesClassListArray.push(this.piecesForMultiClassListArray[i].newAddPieces[d]);
              console.log('this.piecesclaaaaaaa', this.piecesClassListArray);
            }
            // for (let m = 0; m <this.piecesForMultiClassListArray[i].newAddPieces.length; m++) {

            // }
          }
          this.descriptionErrorMsg = false;
        } else {
          this.showShipmentTable = false;
          this.showAddedValue = false;
        }
      }
      let customerId;
      customerId = this.quoteDetails.customerId;
      this.pricingInfoService.getCustomerInformation(customerId, this.accessToken).subscribe((data:any) => {
        this.customerData = data[0];
        if (this.customerData) {
          this.customerData.contactNumber = this.formatPhoneNumber(this.customerData.contactNumber);
          this.billOfLading.patchValue({
            shipperCompanyName: this.customerData.companyName,
            shipperPhoneNumber: this.customerData.contactNumber,
            shipperContactName: this.customerData.customerName,
            shipperStreet1: this.customerData.address
          });
        }
      });
      this.quoteDetails.class = '';
      this.factorization = this.quoteDetails.category;
      this.billOfLading.patchValue({
        shipperPostalCode: this.quoteDetails.originZip,
        consigneePostalCode: this.quoteDetails.destinationZip,
        rate: this.quoteDetails.totalCharge
      });
      this.shipperZipCode(this.quoteDetails.originZip);
      this.consigneeZipCode(this.quoteDetails.destinationZip);
      this.addRowForExistingQuote = true;
    }
  }

  back() {
    this.billOfLading.reset();
    this.billOfLading.patchValue({
      consigneeCountry: 'USA',
      shipperCountry: 'USA',
      packageUnitType: 'CTN',
      weightUnitType: 'ttl',
      thirdParty: 'BillToForte',
      purchaseOrderNumber: '',
      handlingUnitType: 'PLT', length: '', width: '', height: ''
    });
    this.localStorageSalesData();
    this.showErrorResponseFedex = false;
    this.showErrorForFedex = false;
    this.showErrorResponseYrc = false;
    this.showCommonError = false;
    this.errorResponseInGetRate = false;
    this.showForm = true;
    this.detailArray = [];
    this.pricingDetail = [];
    this.showAddedValue = false;
    this.showInputForOthers = false;
    this.errorGetRateMsg = false;
    this.setFlagForExisting = false;
    this.setFlagForNotExisting = true;
    this.errorGetRateMsg = false;
    this.showGetRateButton = true;
    this.showRate = true;
    this.setEditModalFlag = false;
    this.showShipmentTable = false;
    this.getBolValues();
  }

  splInstructionTemplateData() {
    this.splInstructionTemplate = [];
    this.splInstructionTemplatesPresent = false;
    if (this.customerType === 'externalCustomer') {
      this.externalService.getSplInstructions(this.companyId, this.setSalesRepId, this.customerType).subscribe(response => {
        this.splInstructionTemplate = response;
        if (this.splInstructionTemplate.length <= 0) {
          this.splInstructionTemplatesPresent = true;
        } else {
          this.splInstructionTemplatesPresent = false;
        }
      });
    } else {
      this.externalService.getSplInstructions(this.companyId, this.setSalesRepId, this.customerType).subscribe(response => {
        this.splInstructionTemplate = response;
        if (this.splInstructionTemplate.length <= 0) {
          this.splInstructionTemplatesPresent = true;
        } else {
          this.splInstructionTemplatesPresent = false;
        }
      })
    }

  }
  getItemClickValuesForSplInst(id:any, type:any) {
    this.externalService.getSplInstructionsById(id).subscribe((response:any) => {
      this.billOfLading.patchValue({
        specialInstructions: response[0].specialInstructions
      });
      $('#splInstructions-save-modal').modal('hide');
    });
  }

  addressTemplateData() {
    this.shipperTemplatesPresent = false;
    this.consigneeTemplatesPresent = false;
    this.thirdPartyTemplatesPresent = false;
    this.shipperTemplate1 = [];
    this.showNoShipmentError = false;
    this.disableCarrier = null;
    this.consigneeTemplate1 = [];
    this.thirdPartyTemplate1 = [];
    this.addressTemplatesPresent = false;
    this.openType = 'address';
    let loginType;
    if (this.customerType === 'externalCustomer') {
      // loginType = 'external';
      this.externalService.getTemplate(this.companyId, this.openType).subscribe((response:any) => {
        this.addressTemplate = response;
        for (let i = 0; i < this.addressTemplate.length; i++) {
          if (response[i].type === 'shipper') {
            this.shipperTemplate1.push(response[i]);
          } else if (response[i].type === 'consignee') {
            this.consigneeTemplate1.push(response[i]);
          } else {
            this.thirdPartyTemplate1.push(response[i]);
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

        if (this.thirdPartyTemplate1.length <= 0) {
          this.thirdPartyTemplatesPresent = true;
        } else {
          this.thirdPartyTemplate = this.thirdPartyTemplate1;
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
    console.log(this.shipperTemplate);
    console.log(this.shipperTemplate1);
  }

  getAddressClickValues(id:any, type:any) {
    this.openType = 'addressId';
    this.externalService.getTemplate(id, this.openType).subscribe(response => {
      this.addressTemplate = response;
      this.addressTemplateAutoFill = this.addressTemplate[0];
      if (type === 'shipperid') {
        this.checkPhoneNumber(this.addressTemplateAutoFill.contactNumber, 'shipper')

        if (this.setFlagForExisting === true) {
          this.billOfLading.patchValue({
            shipperCompanyName: this.addressTemplateAutoFill.companyName,
            shipperContactName: this.addressTemplateAutoFill.contactName,
            shipperStreet1: this.addressTemplateAutoFill.street1,
            shipperStreet2: this.addressTemplateAutoFill.street2
          });
        } else {
          this.billOfLading.patchValue({
            shipperCompanyName: this.addressTemplateAutoFill.companyName,
            shipperContactName: this.addressTemplateAutoFill.contactName,
            // shipperPhoneNumber: this.addressTemplateAutoFill.contactNumber,
            shipperStreet1: this.addressTemplateAutoFill.street1,
            shipperStreet2: this.addressTemplateAutoFill.street2,
            shipperPostalCode: this.addressTemplateAutoFill.zip,
            shipperCity: this.addressTemplateAutoFill.city,
            shipperState: this.addressTemplateAutoFill.state
          });
        }
        this.companyId = this.addressTemplateAutoFill.companyId;
        this.companyDetails.forEach((obj:any) => {
          if (obj.id === this.companyId) {
            this.companySpecificName = obj.companyName;
            this.companyData = obj;
          }

        });
        if (this.companyId === 0) {
          this.companyDetails.forEach((obj:any) => {
            if (obj.companyName.trim().substring(0, 8) === this.addressTemplateAutoFill.companyName.trim().substring(0, 8)) {
              this.companyId = obj.id;
            }
          })
        } else {
          this.companyId = this.addressTemplateAutoFill.companyId;

        }

        console.log(this.companyId);
      }
      else if (type === 'consignee') {
        this.checkPhoneNumber(this.addressTemplateAutoFill.contactNumber, 'consignee');
        if (this.setFlagForExisting === true) {
          this.billOfLading.patchValue({
            consigneeCompanyName: this.addressTemplateAutoFill.companyName,
            consigneeContactName: this.addressTemplateAutoFill.contactName,
            // consigneePhoneNumber: this.addressTemplateAutoFill.contactNumber,
            consigneeStreet1: this.addressTemplateAutoFill.street1,
            consigneeStreet2: this.addressTemplateAutoFill.street2
          });
        } else {
          this.billOfLading.patchValue({
            consigneeCompanyName: this.addressTemplateAutoFill.companyName,
            consigneeContactName: this.addressTemplateAutoFill.contactName,
            // consigneePhoneNumber: this.addressTemplateAutoFill.contactNumber,
            consigneeStreet1: this.addressTemplateAutoFill.street1,
            consigneeStreet2: this.addressTemplateAutoFill.street2,
            consigneePostalCode: this.addressTemplateAutoFill.zip,
            consigneeCity: this.addressTemplateAutoFill.city,
            consigneeState: this.addressTemplateAutoFill.state
          });
        }
        setTimeout(() => {
          $('#handlingUnitQuantity').focus();

        }, 500);
      } else {
        // this.checkPhoneNumber(this.addressTemplateAutoFill.contactNumber, 'thirdParty');
        this.billOfLading.patchValue({
          thirdPartyCompanyName: this.addressTemplateAutoFill.companyName,
          //  consigneeContactName: this.addressTemplateAutoFill.contactName,
          // consigneePhoneNumber: this.addressTemplateAutoFill.contactNumber,
          thirdPartyStreet: this.addressTemplateAutoFill.street1,
          consigneeStreet2: this.addressTemplateAutoFill.street2,
          thirdPartyPostalCode: this.addressTemplateAutoFill.zip,
          thirdPartyCity: this.addressTemplateAutoFill.city,
          thirdPartyState: this.addressTemplateAutoFill.state
        });
        // }
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

  getItemClickValues(id:any, type:any, piecesType:any) {
    console.log('id for Item', id, 'type', type, 'this.showForItemize', this.showForItemize);
    this.openType = 'itemId';
    this.externalService.getTemplate(id, this.openType).subscribe(response => {
      this.itemTemplate = response;
      this.itemTemplateAutoFill = this.itemTemplate[0];
      if (type === 'choose') {
        // if (this.showForItemize === false) {
        //   this.editShipmentInformationForm.patchValue({
        //     description: this.itemTemplateAutoFill.description
        //   });
        // } else {
        this.billOfLading.patchValue({
          description: this.itemTemplateAutoFill.description,
          nmfc: this.itemTemplateAutoFill.nmfcNumber,
          classification: this.itemTemplateAutoFill.class,
        });
        this.showToolTip = true;
        setTimeout(() => {
          (document.getElementById('addButton')as HTMLFormElement).focus();

        }, 500);
        // }
        this.description = this.itemTemplateAutoFill.description;
      } else if (type === 'chooseForPieces') {
        if (piecesType !== 'Itemized') {
          if (this.disableCertainFields !== true) {
            this.piecesForm.patchValue({
              description: this.itemTemplateAutoFill.description,
              nmfc: this.itemTemplateAutoFill.nmfcNumber,
              classification: this.itemTemplateAutoFill.class
            });
          } else {
            this.piecesForm.patchValue({
              description: this.itemTemplateAutoFill.description,
              nmfc: this.itemTemplateAutoFill.nmfcNumber,
            });
          }
        } else {
          this.piecesForm.patchValue({
            description: this.itemTemplateAutoFill.description
          });
        }
      } else {
        this.editLineItemUpdateForm.patchValue({
          descriptionUpdate: this.itemTemplateAutoFill.description,
          nmfcUpdate: this.itemTemplateAutoFill.nmfcNumber
        });
        this.description = this.itemTemplateAutoFill.description;
      }
      this.itemTemplateData();
    });
  }
  onChange(deviceValue:any) {
    console.log(deviceValue);
    this.addressTemplateNameForm.patchValue({
      selectedCompany: deviceValue.target.value
    })
  }

  addressTemplateSave(form:any, type:any, nameForm:any) {
    console.log(nameForm);
    if (type === 'address') {
      this.newAddressTemplate = {
        customerId: this.templateId,
        companyId: this.companyId,
        salesRepId: this.setSalesRepId,
        createdOn: new Date(),
        contactNumber: form.consigneePhoneNumber,
        templateName: nameForm.addressTempName,
        companyName: form.consigneeCompanyName,
        contactName: form.consigneeContactName,
        country: form.consigneeCountry,
        street1: form.consigneeStreet1,
        street2: form.consigneeStreet2,
        zip: form.consigneePostalCode,
        city: form.consigneeCity,
        state: form.consigneeState,
        type: 'consignee'
      };
    } else if (type === 'shipperAddress') {

      this.newAddressTemplate = {
        customerId: this.templateId,
        companyId: nameForm.selectedCompany,
        salesRepId: this.setSalesRepId,
        createdOn: new Date(),
        contactNumber: form.shipperPhoneNumber,
        templateName: nameForm.addressTempName,
        companyName: form.shipperCompanyName,
        contactName: form.shipperContactName,
        country: form.shipperCountry,
        street1: form.shipperStreet1,
        street2: form.shipperStreet2,
        zip: form.shipperPostalCode,
        city: form.shipperCity,
        state: form.shipperState,
        type: 'shipper'
      };
    } else {
      this.newAddressTemplate = {
        customerId: this.templateId,
        companyId: this.companyId,
        salesRepId: this.setSalesRepId,
        createdOn: new Date(),
        contactNumber: form.shipperPhoneNumber,
        templateName: nameForm.addressTempName,
        companyName: form.thirdPartyCompanyName,
        contactName: form.thirdPartyContactName,
        country: form.thirdPartyCountry,
        street1: form.thirdPartyStreet1,
        street2: form.shipperStreet2,
        zip: form.thirdPartyPostalCode,
        city: form.thirdPartyCity,
        state: form.thirdPartyState,
        type: 'thirdParty'
      };
    }

    this.externalService.saveTemplate(this.newAddressTemplate, type).subscribe((response:any) => {
      if (response.id !== null && response.id !== '') {
        this.addressTemplateNameForm.reset();
        this.addressTemplateData();
        $('#address-save-modal').modal('hide');
        $('#shipper-address-save-modal').modal('hide');
        Swal.fire({
          title: "Saved!",
          text: "Template is saved successfully!",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Failed to save Template!",
          icon: "error"
        });
      }
    }, (err:any) => {
      Swal.fire({
        title: "Oops!",
        text: "Failed to save Template!",
        icon: "error"
      });
    });
  }

  saveSplInstructions(formValue:any, type:any, nameForm:any) {
    let object = {
      companyId: this.companyId,
      specialInstructions: formValue.specialInstructions,
      createdOn: new Date(),
      templateName: nameForm.splInstructionTempName
    }
    console.log('object', object);
    this.externalService.saveSplInstructionTemplate(object).subscribe((response:any) => {
      if (response.id !== null && response.id !== '') {
        this.splInstructionsTemplateNameForm.reset();
        this.splInstructionTemplateData();
        $('#splInstructions-save-modal').modal('hide');
        Swal.fire({
          title: "Saved!",
          text: "Template is saved successfully!",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Failed to save Template!",
          icon: "error"
        });
      }
    }, (err:any) => {
      Swal.fire({
        title: "Oops!",
        text: "Failed to save Template!",
        icon: "error"
      });
    });

  }
  itemTemplateIndex(index:any) {
    this.itemIndex = index;
  }

  itemTemplateSave(form:any, type:any, nameForm:any) {
    this.newItemTemplate = {
      customerId: this.templateId,
      companyId: this.companyId,
      salesRepId: this.setSalesRepId,
      createdOn: new Date(),
      templateName: nameForm.itemTempName,
      description: this.detailArray[this.itemIndex].Description,
      weight: '',
      class: this.detailArray[this.itemIndex].FreightClass,
      nmfcNumber: this.detailArray[this.itemIndex].nmfc,
      harmonizedBCode: '',
      hazmat: this.detailArray[this.itemIndex].isHazardous,
      stackable: '',
      weightUnit: '',
      dimensions: {
        length: '',
        width: '',
        height: ''
      }
    };
    this.externalService.saveTemplate(this.newItemTemplate, type).subscribe((response:any) => {
      if (response.id !== null && response.id !== '') {
        this.itemTemplateNameForm.reset();
        this.itemTemplateData();
        $('#item-save-modal').modal('hide');
        Swal.fire({
          title: "Saved!",
          text: "Template is saved successfully!",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Failed to save Template!",
          icon: "error"
        });
      }
    }, (err:any) => {
      Swal.fire({
        title: "Oops!",
        text: "Failed to save Template!",
        icon: "error"
      });
    });
  }

  getStateAndCity(zip:any, type:any) {
    this.originCityState = {};
    this.destinationCityState = {};
    this.pricingInfoService.getCityState(zip).subscribe(response => {
      let cityAndState: any = response;
      if (cityAndState && cityAndState.length > 0) {
        if (type === 'origin') {
          this.originCityState = { city: cityAndState[0].city, state: cityAndState[0].state };
        } else {
          this.destinationCityState = { city: cityAndState[0].city, state: cityAndState[0].state };
        }
        this.shipperErrorMessage = false;
      } else {
        this.shipperErrorMessage = true;
      }
    });
  }
  /*
  this.pricingInfoService.getCityState(zip).subscribe(getArrayValues => {
    this.getZipCode = getArrayValues;
    if (this.getZipCode.length > 0) {
      for (let i = 0; i < this.getZipCode.length; i++) {
        if (type === 'origin') {
          this.originCityState = { city: this.getZipCode[i].city, state: this.getZipCode[i].state };
        } else {
          this.destinationCityState = { city: this.getZipCode[i].city, state: this.getZipCode[i].state };
        }
      }
    } else {
      this.shipperErrorMessage = true;
    }
  });
  */



  getResponseFromQuoteId(quoteId:any, type:any) {
    console.log('getResponseFromQuoteId(', quoteId, type);
    this.specificQuoteIdObject = {};
    this.rateDetailObject = {};
    this.singleReportData = [];
    this.rateDetailObject.assessorialList = [];
    this.assessorialList = [];
    this.quoteReportService.getParticularReportUsingReferenceIdnew(quoteId).subscribe((response:any) => {
      console.log('singleReportDataResponse', response);
      this.showRate = true;
      console.log(this.billOfLading.value);
      console.log(this.showRate);
      console.log(this.getRateFlag, this.pickCarrierFlag);
      // "billOfLading.controls.rate.value!=='' && showRate  && this.showLoader === false && this.getRateFlag === true && billOfLading.controls.serviceType.value != 'OTHERS' && this.pickCarrierFlag === false
      this.singleReportDataResponse = response;
      if (this.singleReportDataResponse.length > 0) {
        for (let s = 0; s < this.singleReportDataResponse.length; s++) {
          if (type === 'AR') {
            if (this.singleReportDataResponse[s].category === type) {
              this.singleReportData.push(this.singleReportDataResponse[s]);
              this.quoteId = this.singleReportData[0].quoteReferenceId;
              this.specificQuoteIdObject = this.singleReportData[0];
              let parsedvalue = JSON.parse(this.singleReportData[0].rateDetail)
              this.specificQuoteIdObject.showcolor = parsedvalue.showcolor;
              this.billOfLading.patchValue({
                rate: this.specificQuoteIdObject.totalCharge
              });
              if (this.billOfLading.controls['rate'].value !== undefined || this.billOfLading.controls['rate'].value !== null || this.billOfLading.controls['rate'].value !== '') {
                $('#createbolfocus').focus();
              }
              this.getStateAndCity(this.singleReportData[0].originZip, 'origin');
              this.getStateAndCity(this.singleReportData[0].destinationZip, 'destination');
              this.sendEmailArFlag = true;
              console.log('customerfeatures', this.singleCustomerName)

              // if (this.customerFeatures.length > 0) {
              //   for (let i = 0; i < this.customerFeatures.length; i++) {
              //     // console.log('general',this.singleReportData[0].companyId ,this.customerFeatures[i].id )
              //     if (Number(this.singleReportData[0].companyId) === Number(this.customerFeatures[i].id)) {
              //       console.log('true',this.singleReportData[0].companyId ,this.customerFeatures[i].id, this.singleCustomerName );

              //       this.singleCustomerName = this.customerFeatures[i].companyName;
              //       console.log(this.singleCustomerName);
              //     }
              //   }
              // }
              this.singleCustomerName = this.singleReportData[0].companyDetails.companyName;
              console.log(this.singleCustomerName);
              this.logger = {
                'method': 'getSingleCustomerName in component',
                'message': 'retrieving customerName from customerId',
                'customerId': this.singleReportData[0].customerId
              };
              this.loggerService.debug(this.logger);
              let rateDetail = JSON.parse(this.singleReportData[0].rateDetail);
              this.rateDetailObject = JSON.parse(this.singleReportData[0].rateDetail);
              this.highcostArray = [];
              if (this.rateDetailObject.fedexHighcost !== undefined) {
                this.highcostArray.push(this.rateDetailObject.fedexHighcost);

              }
              console.log(this.highcostArray);
              if (this.rateDetailObject.assessorialDataList.length > 0) {
                for (let i = 0; i < this.rateDetailObject.assessorialDataList.length; i++) {
                  let dataNew = this.rateDetailObject.assessorialDataList[i].split('-');
                  let dataObject = { name: dataNew[0], cost: dataNew[1].trim() };
                  this.assessorialList.push(dataObject);
                }
              }
              this.fuelCharges = 0;
              if (rateDetail.netChargeResult.length > 0) {
                for (let g = 0; g < rateDetail.netChargeResult.length; g++) {
                  this.fuelCharges = this.fuelCharges + (Number(rateDetail.netChargeResult[g]));
                }
              } else {
                for (let g = 0; g < rateDetail.netChargeDiffResult.length; g++) {
                  this.fuelCharges = this.fuelCharges + (Number(rateDetail.netChargeDiffResult[g]));
                }
              }
              this.charge = 0;
              if (rateDetail.discountedRate.length > 0) {
                for (let f = 0; f < rateDetail.discountedRate.length; f++) {
                  this.charge = this.charge + (Number(rateDetail.discountedRate[f]));
                }
              } else {
                if (rateDetail.diffDiscountedRate.length > 0) {
                  for (let f = 0; f < rateDetail.diffDiscountedRate.length; f++) {
                    this.charge = this.charge + (Number(rateDetail.diffDiscountedRate[f]));
                  }
                } else {
                }
              }

            } else {
              this.sendEmailArFlag = false;
            }
          } else {
            if (this.singleReportDataResponse[s].category === type) {

              this.singleReportData.push(this.singleReportDataResponse[s]);
              console.log('costpluss', this.singleReportDataResponse)
              this.quoteId = this.singleReportData[0].quoteReferenceId;
              this.specificQuoteIdObject = this.singleReportData[0];
              this.billOfLading.patchValue({
                rate: this.specificQuoteIdObject.totalCharge
              });
              if (this.billOfLading.controls['rate'].value !== undefined || this.billOfLading.controls['rate'].value !== null || this.billOfLading.controls['rate'].value !== '') {
                $('#createbolfocus').focus();
              }
              this.getStateAndCity(this.singleReportData[0].originZip, 'origin');
              this.getStateAndCity(this.singleReportData[0].destinationZip, 'destination');
              //  this.sendEmailArFlag = true;
              console.log('customerfeatures', this.customerFeatures)

              if (this.customerFeatures.length > 0) {
                for (let i = 0; i < this.customerFeatures.length; i++) {
                  if (Number(this.singleReportData[0].companyId) === Number(this.customerFeatures[i].id)) {
                    this.singleCustomerName = this.customerFeatures[i].companyName;
                  }
                }
              }
              this.logger = {
                'method': 'getSingleCustomerName in component',
                'message': 'retrieving customerName from customerId',
                'customerId': this.singleReportData[0].customerId
              };
              this.loggerService.debug(this.logger);
              this.rateDetailObject = JSON.parse(this.singleReportData[0].rateDetail);
              if (this.rateDetailObject.assessorialDataList.length > 0) {
                for (let i = 0; i < this.rateDetailObject.assessorialDataList.length; i++) {
                  let dataNew = this.rateDetailObject.assessorialDataList[i].split('-');
                  let dataObject = { name: dataNew[0], cost: dataNew[1].trim() };
                  this.assessorialList.push(dataObject);
                }
              }
              this.fuelCharges = 0;
              if (JSON.parse(this.singleReportData[0].rateDetail).netChargeResult.length > 0) {
                for (let g = 0; g < JSON.parse(this.singleReportData[0].rateDetail).netChargeResult.length; g++) {
                  this.fuelCharges = this.fuelCharges + (Number(JSON.parse(this.singleReportData[0].rateDetail).netChargeResult[g]));
                }
              } else {
                for (let g = 0; g < JSON.parse(this.singleReportData[0].rateDetail).netChargeDiffResult.length; g++) {
                  this.fuelCharges = this.fuelCharges + (Number(JSON.parse(this.singleReportData[0].rateDetail).netChargeDiffResult[g]));
                }
              }
              this.charge = 0;
              if (JSON.parse(this.singleReportData[0].rateDetail).discountedRate.length > 0) {
                for (let f = 0; f < JSON.parse(this.singleReportData[0].rateDetail).discountedRate.length; f++) {
                  this.charge = this.charge + (Number(JSON.parse(this.singleReportData[0].rateDetail).discountedRate[f]));
                }
              } else {
                if (JSON.parse(this.singleReportData[0].rateDetail).diffDiscountedRate.length > 0) {
                  for (let f = 0; f < JSON.parse(this.singleReportData[0].rateDetail).diffDiscountedRate.length; f++) {
                    this.charge = this.charge + (Number(JSON.parse(this.singleReportData[0].rateDetail).diffDiscountedRate[f]));
                  }
                } else {
                }
              }
            } else {
              this.sendEmailArFlag = false;
            }

          }
        }
        // this.showNextTable = true;
      } else {
        // this.showNextTable = false;
      }
      this.logger = {
        'method': 'getParticularReport',
        'message': 'retrieving single report details using quoteId',
        'QuoteReferenceId': quoteId
      };
      this.loggerService.info(this.logger);
    });
  }


  sendMailAr(quoteId:any, salesRepId:any, type:any, category:any) {
    let object = {
      quoteId: quoteId,
      salesRepId: salesRepId,
      type: type,
      category: category

    }
    this.pricingInfoService.sendEmailData(object).subscribe(emailDataFedPri => {
      this.mailResponse = emailDataFedPri;
      if (this.mailResponse.result === true) {
        $("#success-alert").show(1);
        $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
          $("#success-alert").slideUp(500);
        });
      } else {
        this.toastr.error('Failed to send mail');
        this.logger = {
          'method': 'sendMailFunction',
          'message': 'sending report to the mail',
          'salesrepId': this.salesRepId
        };
        this.loggerService.info(this.logger);
      }
    });
  }
  checkForValues(type:any, detail:any, i:any) {
    console.log('type', type, detail, i);
    this.headerDetailForShipment;
    this.addPiecesHeader = '';
    this.piecesValidationForm();
    this.piecesListArray = [];
    this.rowIndex;
    this.piecesClassListArray = [];
    // $('#add-pieces-modal').modal({backdrop: 'static', keyboard: false});
    if (type === 'Itemize') {
      this.showForItemize = true;
      this.addPiecesHeader = 'Itemized';
    } else {
      this.showForItemize = false;
      this.addPiecesHeader = 'Multi Classed';
    }
    (document.getElementById('packageQuantityForPieces')as HTMLFormElement).focus();
    this.headerDetailForShipment = detail;
    this.rowIndex = i;
    this.piecesForm.controls['packageUnitType'].setValue(detail.PackageUnitType);
    this.piecesForm.controls['weightUnit'].setValue(detail.weightUnit);
    // this.hotkeysService.add(new Hotkey('esc', (event: KeyboardEvent): boolean => {
    //   console.log('Typed hotkey');
    //   // $('#closeModal').focus();
    //   this.addShipmentInfo(this.billOfLading.value, this.addPiecesHeader);
    //   return false; // Prevent bubbling
    // }));
  }
  piecesValidationForm() {
    this.piecesForm = this.fb.group({
      packageQuantity: ['', [Validators.required]],
      packageUnitType: ['CTN'],
      weight: ['', [Validators.required]],
      weightUnit: ['ttl'],
      description: ['', [Validators.required]],
      classification: ['', [Validators.required]],
      nmfc: ['', [Validators.required]]
    });
  }
  checkGetRate(value:any) {
    let val = value.srcElement.checked
    this.getRateCheck = val;

  }
  continueBOL(billOfLading:any, bol:any) {
    this.continueBOLId = true;
    billOfLading.quoteNumber = this.quoteId;
    billOfLading.rate = this.totalChargeValue;
    this.create(billOfLading);
    // console.log('create(billOfLading,controls)', this.billOfLading);
    // console.log('create(billOfLading,controls)', this.billOfLadingValues);
  }
  async continueToBOL(billOfLading:any) {
    // console.log('continueToBOL');
    // console.log('continueToBOL', billOfLading);
    if (this.getQuoteId !== null) {
      this.create(billOfLading);
    } else {
      // if (this.emergencyStop === true && this.customerType !== 'admin') {
      //   console.log('emergencystopflow')
      //   this.showErrorMsgForGetRate = false;
      //   this.getRateForOthers();
      //   this.create(billOfLading);
      // } else {
        if (billOfLading.serviceType !== 'OTHERS') {
          console.log('billOfLading.serviceType', billOfLading.serviceType);

          if (this.factorization !== 'COSTPLUS' && this.getRateCheck === false) {
            this.loading = true;
            await this.getRate(billOfLading);

            // setTimeout(() => {
            //   console.log('getRate', billOfLading);
            // this.getResponseFromQuoteId(this.quoteId, 'AR');
            // }, 5000);
            // this.continueBOLId = true;
            // billOfLading.quoteNumber = this.quoteId;
            // billOfLading.rate = this.totalChargeValue;
            // this.loading = false;
            // this.create(billOfLading);
            // console.log('create(billOfLading,controls)', billOfLading);

          }
          else if (this.factorization === 'COSTPLUS' && this.getRateCheck === false) {
            this.loading = true;
            await this.getRate(billOfLading);

            // setTimeout( () => {
            //   console.log('getRate', billOfLading);
            //   this.getResponseFromQuoteId(this.quoteId, 'COSTPLUS');
            // }, 5000);
            // this.continueBOLId = true;
            // billOfLading.quoteNumber = this.quoteId;
            // billOfLading.rate = this.totalChargeValue;
            // this.loading = false;
            // this.create(billOfLading);
          }

        }
        else if (billOfLading.serviceType === 'OTHERS') {
          this.getRateForOthers();
          this.create(billOfLading);
        }
      // }
    }

  }

  bolCreation(billOfLading:any) {
    this.getCarrierForZipCodes(billOfLading.value);
  }
  async rateModal(billOfLading:any) {
    console.log('ratemodel::', billOfLading);
    this.specificQuoteIdObject = {};
    if (this.getQuoteId !== null) {
      console.log(this.getQuoteId);
      //   this.billOfLading = billOfLading;
      // console.log(this.billOfLading.value);
      this.getRateFlag = true;
      this.pickCarrierFlag = false;
      this.showRate = true;
      this.showLoader = false;
      this.billOfLading.patchValue({
        rate: this.getQuoteId.quoteDetails.totalCharge,
        quoteNumber: this.getQuoteId.quoteNumber
      });
      this.specificQuoteIdObject = this.getQuoteId.quoteDetails;
      this.factorization = 'AR';
      this.totalChargeValue = billOfLading.rate;
      this.getRateCheck = true;
      this.pricingInfoService.passRateCheckValue(this.getRateCheck);
      console.log(this.billOfLading.value);
    } else {
      if (this.factorization !== 'COSTPLUS' && this.getRateCheck === true) {
        this.showLoader = true;
        this.getRateFlag = true;
        this.pickCarrierFlag = false;
        // this.loading = true;
        await this.getRate(billOfLading);

        // if (this.errorResponseInGetRate === false) {
        //   $("#quote_details").modal('show');
        //   this.billOfLading.controls.rate.setValue(this.totalChargeValue);
        //   this.getResponseFromQuoteId(this.quoteId, 'AR');
        //   this.loading = false;
        //   console.log('getRate(billOfLading)', billOfLading);
        // }
      }
      else if (this.factorization === 'COSTPLUS' && this.getRateCheck === true) {
        this.showLoader = true;
        this.getRateFlag = true;
        this.pickCarrierFlag = false;
        // this.loading = true;
        await this.getRate(billOfLading);

        // if (this.errorResponseInGetRate === false) {
        //   $("#costplus_quote_details").modal('show');
        //   this.billOfLading.controls.rate.setValue(this.totalChargeValue);
        //   this.getResponseFromQuoteId(this.quoteId, 'COSTPLUS');
        //   this.loading = false;
        // }

      }
    }
  }
  pickCarrierShow() {
    this.pickCarrierFlag = true;
    this.getRateFlag = false
  }
  closeGetRateModal() {
    this.pickCarrierFlag = false;
    this.getRateFlag = false;
  }
  createBolnew(billOfLading:any) {
    this.create(billOfLading);
  }

  checkforAddpieces(event:any) {
    console.log(event);
    if (event.which === 13) {
      $('#add-pieces-modal').show();
      // event.preventDefault();

    }

  }

  checkEventHandling(event:any) {
    console.log(event);
    if (event.keyCode === 13) {
      this.createBolnew(this.billOfLading.value);
    } else if (event.keyCode === 39) {
      $('#pickanothercarrier').focus();
      // this.pickCarrierShow();
    } else if (event.keyCode === 37) {
      $('#viewCheck').focus();
      // if (this.factorization !== 'COSTPLUS') {
      //   this.getResponseFromQuoteId(this.billOfLading.controls.quoteNumber.value, 'AR');
      // } else if (this.factorization === 'COSTPLUS') {
      //  this.getResponseFromQuoteId(this.billOfLading.controls.quoteNumber.value, 'COSTPLUS');
      // }
    }
  }

  checkEventHandlingForPick(event:any) {
    console.log(event);
    if (event.keyCode === 13) {
      this.pickCarrierShow();
    } else if (event.keyCode === 39) {
      $('#viewCheck').focus();
    } else if (event.keyCode === 37) {
      $('#createbolfocus').focus();
    }
  }

  checkEventHandlingForView(event:any) {

    console.log(event);

    if (event.keyCode === 13) {
      if (this.factorization !== 'COSTPLUS') {
        this.getResponseFromQuoteId(this.billOfLading.controls['quoteNumber'].value, 'AR');
      } else if (this.factorization === 'COSTPLUS') {
        this.getResponseFromQuoteId(this.billOfLading.controls['quoteNumber'].value, 'COSTPLUS');
      }
    } else if (event.keyCode === 39) {
      $('#createbolfocus').focus();
    } else if (event.keyCode === 37) {
      $('#pickanothercarrier').focus();

    }
  }

  refreshPage() {
    this.enableDescriptionValue = false;
    if (this.getReferenceNumber === null || this.getReferenceNumber === '') {
      this.buildForm();
      this.editForm();
      this.editShipmentForm();
      this.piecesValidationForm();
      this.localStorageSalesData();
      this.showCompanyname = false;
      this.showAddedValue = false;
      this.detailArray = [];
      this.piecesForItemizeListArray = [];
      this.piecesForMultiClassListArray = [];
      this.billOfLading.patchValue({ shipmentType: 'Non Itemized' });
      this.isDisabledItemize = false;
      this.isDisabledMultiClass = false;
      this.isDisabledNonItemize = false;
      this.selectedItems = [];
    }
    else {
      this.buildForm();
      this.editForm();
      this.editShipmentForm();
      this.piecesValidationForm();
      // this.showCompanyname = false;
      this.localStorageSalesData();

      this.patchBolValues(this.getReferenceNumber);
      this.showAddedValue = false;
      this.detailArray = [];
      this.piecesForItemizeListArray = [];
      this.piecesForMultiClassListArray = [];
      this.billOfLading.patchValue({ shipmentType: 'Non Itemized' });
      this.isDisabledItemize = false;
      this.isDisabledMultiClass = false;
      this.isDisabledNonItemize = false;
      console.log(this.billOfLading);
      this.billOfLading.patchValue({
        consigneeCity: "",
        consigneeCompanyName: "",
        consigneeContactName: "",
        consigneeCountry: "USA",
        consigneePhoneNumber: "",
        consigneePostalCode: "",
        consigneeState: "",
        consigneeStreet1: "",
        consigneeStreet2: "",
        accessorials: "",
        specialInstructions: ""
      });
      this.selectedItems = [];
    }

  }



  checkForEnterKey(event:any, type:any) {
    console.log(type, event);
    // let CharArray = [];
    // let pressed;
    //   const handleDoublePresss = key => {
    //   console.log(key.key, 'pressed two times');
    //   this.closeDescription = true;
    // }
    // const keyPress = key => {
    //   if (key.keyCode === 13) {
    //     pressed = key.keyCode;

    //     console.log(pressed, this.isDoublePress,this.lastPressed);
    //     if (this.isDoublePress === true && pressed === this.lastPressed) {
    //       console.log(pressed, this.isDoublePress);
    //       // if (pressed === 13) {
    //       this.isDoublePress = false;
    //       handleDoublePresss(key);
    //       // }
    //     } else {
    //       // console.log('key else', key);
    //       this.isDoublePress = true;
    //       // setTimeout(() =>  {}
    //       // , 3000);
    //       setTimeout(() => {
    //         this.isDoublePress = false;
    //         this.closeDescription === false;
    //         console.log(this.isDoublePress);
    //       }, 2000);
    //       console.log(pressed, this.isDoublePress);

    //     }
    //     this.lastPressed = pressed;
    //   }
    // }
    if (type === 'descr') {
      this.charArray.push(event.key);
      console.log(this.charArray);
      if (this.charArray.length > 2) {
        this.charArray.forEach((obj:any, index:any) => {
          console.log(obj);
          if (obj === 'Enter') {
            // console.log(obj);
            if (obj === this.charArray[index - 1]) {
              this.closeDescription = true;
              console.log('cgararray', this.charArray);
            }
          }

        });
      }

      // keyPress(event);
      if (this.closeDescription === true) {
        // console.log('test');
        $('#description-modal').modal('hide');
        this.closeDescription = false;
        this.charArray = [];
        console.log(this.showForItemize, this.piecesForm.value);
        //  $('#length').focus();
        if (this.showForItemize !== false) {
          console.log(this.billOfLading.value.shipmentType);
          // console.log(this.piecesForItemizeListArray)
          if (this.piecesForm.value.description === '') {
            $('#length').focus();
            event.preventDefault();
          } else {
            $('#addBtn').focus();
          }

        } else {
          $('#cpf9').focus();
          event.preventDefault();
        }
      }





      // if (event.keyCode === 13) {
      //   $('#description-modal').modal('hide');
      //   console.log(this.showForItemize, this.piecesForm.value);
      //   //  $('#length').focus();
      //   if (this.showForItemize !== false) {
      //     console.log(this.billOfLading.value.shipmentType);
      //     // console.log(this.piecesForItemizeListArray)
      //     if (this.piecesForm.value.description === '') {
      //       $('#length').focus();
      //       event.preventDefault();
      //     } else {
      //       $('#addBtn').focus();
      //     }

      //   } else {
      //     $('#cpf9').focus();
      //     event.preventDefault();
      //   } 
      //   // $('#closeDescriptionBtn').focus();
      //   // event.preventDefault();
      // }
    } else if (type === 'descr1') {
      this.charArray.push(event.key);
      console.log(this.charArray);
      if (this.charArray.length > 2) {
        this.charArray.forEach((obj:any, index:any) => {
          console.log(obj);
          if (obj === 'Enter') {
            // console.log(obj);
            if (obj === this.charArray[index - 1]) {
              this.closeDescription = true;
              console.log('cgararray', this.charArray);
            }
          }

        });
      }

      // keyPress(event);
      if (this.closeDescription === true) {
        // console.log('test');
        $('#description-modal1').modal('hide');
        this.closeDescription = false;
        this.charArray = [];
        console.log(this.showForItemize, this.piecesForm.value);
        //  $('#length').focus();
        if (this.showForItemize !== false) {
          console.log(this.billOfLading.value.shipmentType);
          // console.log(this.piecesForItemizeListArray)
          if (this.piecesForm.value.description === '') {
            $('#length').focus();
            event.preventDefault();
          } else {
            $('#addBtn').focus();
          }

        } else {
          $('#cpf9').focus();
          event.preventDefault();
        }
      }


    } else if (type === 'close') {
      // this.description = event.target.value;
      // this.billOfLading.controls.description.setValue(this.description);
      $('#description-modal').modal('hide');
      console.log(this.showForItemize, this.piecesForm.value);
      //  $('#length').focus();
      if (this.showForItemize !== false) {
        if (this.showAddedValue === false) {
          $('#length').focus();
          event.preventDefault();
        } else {
          $('#addBtn').focus();
        }

      } else {
        $('#cpf9').focus();
        event.preventDefault();
      }


    } else if (type === 'descEdit') {
      $('#description-modal1').modal('show');
      setTimeout(() => {
        $('#tasknote').focus();
      }, 100);

    } else if (type === 'closemodal') {
      console.log(this.showForItemize);
      $('#description-modal1').modal('hide');
      if (this.showForItemize === false) {
        $('#addBtn').focus();
        event.preventDefault();
      } else {
        $('#cpf9').focus();
        event.preventDefault();
      }
    } else if (type === 'descrip') {
      $('#closeDescriptionBtn1').focus();
      event.preventDefault();
    }
  }

  getShipper(event:any, type:any) {
    console.log(event);

    // this.externalService.getTemplate(event.item.id, this.openType).subscribe(response => {
    //   this.addressTemplate = response;
    //   this.addressTemplateAutoFill = this.addressTemplate[0];
    if (type === 'shipper') {
      this.checkPhoneNumber(event.item.contactNumber, 'shipper')

      if (this.setFlagForExisting === true) {
        this.billOfLading.patchValue({
          shipperCompanyName: event.item.companyName,
          shipperContactName: event.item.contactName,
          shipperStreet1: event.item.street1,
          shipperStreet2: event.item.street2
        });
      } else {
        this.billOfLading.patchValue({
          shipperCompanyName: event.item.companyName,
          shipperContactName: event.item.contactName,
          // shipperPhoneNumber: this.addressTemplateAutoFill.contactNumber,
          shipperStreet1: event.item.street1,
          shipperStreet2: event.item.street2,
          shipperPostalCode: event.item.zip,
          shipperCity: event.item.city,
          shipperState: event.item.state
        });
      }
      this.companyId = event.item.companyId;
      this.companyDetails.forEach((obj:any) => {
        if (obj.id === this.companyId) {
          this.companySpecificName = obj.companyName;
          this.companyData = obj;
        }

      });
      if (this.companyId === 0) {
        this.companyDetails.forEach((obj:any) => {
          if (obj.companyName.trim().substring(0, 8) === event.item.companyName.trim().substring(0, 8)) {
            this.companyId = obj.id;
          }
        })
      } else {
        this.companyId = event.item.companyId;

      }

      console.log(this.companyId);
    }
    else if (type === 'consignee') {
      this.checkPhoneNumber(event.item.contactNumber, 'consignee');
      if (this.setFlagForExisting === true) {
        this.billOfLading.patchValue({
          consigneeCompanyName: event.item.companyName,
          consigneeContactName: event.item.contactName,
          // consigneePhoneNumber: this.addressTemplateAutoFill.contactNumber,
          consigneeStreet1: event.item.street1,
          consigneeStreet2: event.item.street2
        });
      } else {
        this.billOfLading.patchValue({
          consigneeCompanyName: event.item.companyName,
          consigneeContactName: event.item.contactName,
          // consigneePhoneNumber: this.addressTemplateAutoFill.contactNumber,
          consigneeStreet1: event.item.street1,
          consigneeStreet2: event.item.street2,
          consigneePostalCode: event.item.zip,
          consigneeCity: event.item.city,
          consigneeState: event.item.state
        });
      }
      setTimeout(() => {
        $('#handlingUnitQuantity').focus();

      }, 500);
    }
    // });
  }

  getshipperData(event:any) {
    console.log(event);
  }
}

