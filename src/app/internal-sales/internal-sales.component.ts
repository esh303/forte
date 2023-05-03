import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
// import { ValidationService } from '../services/validation.service';
import { PricingInfoService } from '../services/pricing-info.service';
import { LoggerService } from '../services/logger.service';
import { CustomerService } from '../services/customer.service';
// import { ErrorMessageComponent } from '../common/error-message.component';
import { classArray } from '../app.constant';
// import { BrowserModule } from '@angular/platform-browser';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

// import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { increasePercentForAR } from '../app.constant';
// import {wordsToNumbers} from 'words-to-numbers';
// import wordsToNumbers from 'words-to-numbers';
// import { access } from 'fs';
declare var $: any;

@Component({
  selector: 'app-internal-sales',
  templateUrl: './internal-sales.component.html',
  styleUrls: ['./internal-sales.component.css']
})

export class InternalSalesComponent implements OnInit {
  transportOrigin: FormGroup = new FormGroup({});
  APForm: FormGroup = new FormGroup({});
  ARForm: FormGroup = new FormGroup({});
  formForOthers: FormGroup = new FormGroup({});
  userData: any;
  pricingInfo: any;
  pricingInfoFedexEconomy: any;
  listOfApValues: any;
  listOfArValues: any;
  selectedItems:any = [];
  public pricingDetail:any = [];
  public arrayData:any = [];
  public showBorder = false;
  public showBorder1 = false;
  public showAllData = false;
  public showYrcData = false;
  public showYrcDataAR = false;
  public showFedexEcoData = false;
  public showFedexEcoDataAR = false;
  public showFedexPriData = false;
  public hideReddawayData = false;
  public noredShipmentData = false;
  public showReddawayData = false;
  public showReddawayDataAR = false;
  public hideReddawayDataAR = false;
  public showTooltip = false;
  public showDeficitValue = false;
  public showDeficitValueFedex = false;
  public showHighCostDelivery = false;
  public showHighCostDeliveryFedex = false;
  tableEditAr:any;
  tableEditAp:any;
  public showErrorMessageForClass = false;
  public showCheckForWeight = false;
  public operationMessage = false;
  public hideYrcData = false;
  public noyrcShipment = false;
  public hideFedexEcoData = false;
  public nofedexecoData = false;
  public hideFedexPriData = false;
  public nofedexpriData = false;
  public viewAllShowYrcData = false;
  public viewAllShowFedexEcoData = false;
  public viewAllShowFedexPriData = false;
  public viewAllShowReddawayData = false;
  public showTable = false;
  public showTableAp = false;
  public totalRate:any;
  public totalValue:any;
  public totalValueAR:any;
  public showRemoveIcon = false;
  public showRemoveIconDest = false;
  public showClearAll = false;
  public weightForCal:any;
  public showMinimumCharge = false;
  public getZipcodeValues:any;
  public showZipcodes = false;
  public showZipcodeDest = false;
  public filterValues:any;
  public filterValuesState:any;
  public filterValuesDest:any;
  public filterValuesDestState:any;
  public customerFeatures:any;
  public customerFeaturesAll:any;
  public customerData:any;
  public showForOthers:any = false;
  public showQuoteId = false;
  public showErrorCustomer = false;
  public errorValue = false;
  public errorMessage:any;
  public errorMessageDest:any;
  public amountValue:any;
  public amountIncDecData:any;
  public selectedValue:any;
  public customerId:any;
  public quoteDetails:any;
  public quoteIdYRC:any;
  public quoteIdFedexEco:any;
  public quoteIdFedexPri:any;
  public quoteIdReddaway:any;
  public sendArrayValues:any = [];
  public accessorials:any = [];
  public addExtraValues:any;
  public addSingleShipmentValue:any;
  public invalidErrorWeightMessage = false;
  public showChooseClass = false;
  public accessToken:any;
  public salesRep:any;
  public salesRepId:any;
  public customerName:any;
  public salesRepValues:any;
  public finalRateCharge:any;
  public logger:any;
  public salesRepType:any;
  public pricingObject:any;
  public showMessageForAp = false;
  public showErrorInternetConnection = false;
  public onlineOffline: boolean = navigator.onLine;
  public parseSetMasterData:any;
  public profile:any;
  public showDirections:any;
  public showCACharge = false;
  public YRCArray:any = [];
  public fedexArray:any = [];
  public reddawayArray:any = [];
  public priority:any = [];
  public showLoader = false;
  public waitForProcessMessage = false;
  public waitForProcessMessageForReddaway = false;
  public results: any;
  public reddawayResponse: any;
  public errorForOthers = false;
  public customerEnterFlag = false;
  public getQuoteFlag = false;
  public showRatingNotes = false;
  public showRatingNotesForCustomers = false;
  public classArray:any = classArray;
  public companyId:any;
  public setSalesRepId:any;
  public transitTime:any;
  public transitTimeyrc:any;
  public transitTimeReddaway:any;
  consigneeTemplatesPresent:any = false;
  public transitTimeFedexEconomy:any;
  public transitTimeFedexPriority:any;
  public companyData:any;
  public increasedValueForAR = Number(increasePercentForAR);
  public applyCostPlusForYRC = false;
  public applyCostPlusForFedexEco = false;
  public applyCostPlusForFedexPri = false;
  public applyCostPlusForReddaway = false;
  public costPlusFactorForYRC:any;
  public costPlusFactorForFedexEco:any;
  public costPlusFactorForFedexPri:any;
  public costPlusFactorForReddaway:any;
  public setMasterDataForYrcAr:any;
  public setMasterDataForReddawayAr:any;
  public setMasterDataForFedexEcoAr:any;
  public setMasterDataForFedexPriAr:any;
  public getRuleForYRCAR:any;
  public getRuleForReddawayAR:any;
  public getRuleForFedexEcoAR:any;
  public getRuleForFedexPriAR:any;
  public localStorageArData:any;
  public highCostForFedex:any;
  public noshipmentData = false;
  public noshipmentDestData = false;
  numbersArray:any = [
    {'name':'ONE','id':1},
    {'name':'TWO','id':2},
    {'name':'THREE','id':3},
    {'name':'FOUR','id':4},
    {'name':'FIVE','id':5},
    {'name':'SIX','id':6},
    {'name':'SEVEN','id':7},
    {'name':'EIGHT','id':8},
    {'name':'NINE','id':9},
    {'name':'TEN','id':10},
    {'name':'ELEVEN','id':11},
    {'name':'TWELVE','id':12},
    {'name':'THIRTEEN','id':13},
    {'name':'FOURTEEN','id':14},
    {'name':'FIFTEEN','id':15},
    {'name':'SIXTEEN','id':16},
    {'name':'SEVENTEEN','id':17},
    {'name':'EIGHTEEN','id':18},
    {'name':'NINETEEN','id':19},
    {'name':'TWENTY','id':20}
  ];
  emergencyStop = true;
  emergencyStopYRC = true;
  emergencyStopPriority = true;
  emergencyStopEconomy = true;
  emergencyStopReddaway= true;
  split:any;
  // dropdownSettings :IDropdownSettings = {
  //   singleSelection: false,
  //   text: 'Select',
  //   enableCheckAll: false,
  //   // selectAllText: 'Select All',
  //   // unSelectAllText: 'UnSelect All',
  //   enableSearchFilter: false,
  //   classes: 'myclass custom-class'
  // };
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'itemName',
    // selectAllText: 'Select All',
    // unSelectAllText: 'UnSelect All',
    // itemsShowLimit: 3,
    enableCheckAll: false,
    allowSearchFilter: false
  }


  dropdownList = [ 
    { 'id': 1, 'itemName': 'LiftGate PickUp', 'Yrccost': '8.80', 'Fedexcost': '72.06' },
    { 'id': 10, 'itemName': 'LiftGate Delivery', 'Yrccost': '8.80', 'Fedexcost': '72.06' },
    { 'id': 2, 'itemName': 'Residential PickUp', 'Yrccost': '11', 'Fedexcost': '76' },
    { 'id': 11, 'itemName': 'Residential Delivery', 'Yrccost': '11', 'Fedexcost': '76' },
    { 'id': 3, 'itemName': 'Limited Access PickUp', 'Yrccost': '0', 'Fedexcost': '76' },
    { 'id': 12, 'itemName': 'Limited Access Delivery', 'Yrccost': '0', 'Fedexcost': '76' },
    { 'id': 4, 'itemName': 'Inside Delivery', 'Yrccost': '11.85', 'Fedexcost': '6.98', 'FedexcostAR': '11.40' },
    { 'id': 5, 'itemName': 'Notify', 'Yrccost': '0', 'Fedexcost': '0' },
    { 'id': 7, 'itemName': 'Delivery Appointment Required', 'Yrccost': '0', 'Fedexcost':'0'},
    {'id':8, 'itemName':'HazMat', 'Yrccost': '0', 'Fedexcost':'0'}
    // {'id': 6, 'itemName': 'Others'}
  ];
  @ViewChild('customer')
  private elementRef!: ElementRef;
  showcolor = false;
  showTableZip = false;
  originZipArray:any = [];
  showTableZip1 = false;
  destinationZipArray:any = [];
  selectedIndex = 0;


  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
    console.log('this.elementRef.nativeElement', this.elementRef.nativeElement);
    (document.getElementById('customer')as HTMLFormElement).click();
  }

  /*
   *To clear local storage
   */
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event:any) {
  }
  constructor(private formBuilder: FormBuilder, private pricingInfoService: PricingInfoService,
    private router: Router,
    private loggerService: LoggerService,
    // private hotkeysService: HotkeysService,
    private customerService: CustomerService) {
    console.log('increasedValueForAR', this.increasedValueForAR);
    this.viewAllShowYrcData = true;
    this.viewAllShowFedexEcoData = true;
    this.viewAllShowFedexPriData = true;
    this.viewAllShowReddawayData = true;
    window.addEventListener('online', () => {
      this.onlineOffline = true;
    });
    window.addEventListener('offline', () => {
      this.onlineOffline = false;
    });
    this.localStorageSalesData();
    this.getSalesData();
    // this.hotkeysService.add(new Hotkey('esc', (event: KeyboardEvent): boolean => {
    //   console.log('Typed hotkey');
    //   this.clear();
    //   return false; // Prevent bubbling
    // }));
    // this.hotkeysService.add(new Hotkey('a', (event: KeyboardEvent): boolean => {
    //   console.log('Typed hotkey');
    //   (document.getElementById('classification')as HTMLFormElement).focus();
    //   return false; // Prevent bubbling
    // }));
  }
  ngOnInit() {
    // console.log('wordtonumber', wordsToNumbers('one hundred'));
    this.information();
    this.emergencyStatus();
    this.customerId = 0;
    if (this.salesRepType === 'customerServiceRep' || this.salesRepType === 'administrator') {
      this.getAllCompanyNotes();
    } else {
      this.getCompanyNotes();
    }
  }

  information() {
    this.transportOrigin = this.formBuilder.group({
      origin: ['98127', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      destination: ['90001', [Validators.minLength(5), Validators.maxLength(5)]],
      classification: ['', [Validators.minLength(1), Validators.maxLength(6)]],
      weight: ['', [Validators.minLength(1), Validators.maxLength(6)]],
      customer: ['', [Validators.required]],
      ratingNotes: ['', [Validators.required]]
    });
    this.APForm = this.formBuilder.group({
      id: [''],
      apCompany: [''],
      apDiscount: [''],
      apFsc: [''],
      apAmc: ['']
    });
    this.ARForm = this.formBuilder.group({
      id: [''],
      arCompany: [''],
      arDiscount: [''],
      arFsc: [''],
      arAmc: ['']
    });
    this.formForOthers = this.formBuilder.group({
      reason: ['', [Validators.required]],
      amountIncDec: ['increment', [Validators.required]],
      amount: ['', [Validators.required]]
    });
  }

  localStorageSalesData() {
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.accessToken = localStorage.getItem(('accessToken'));
    this.salesRepValues = JSON.parse(this.salesRep);
    this.salesRepId = this.salesRepValues.id;
    this.salesRepType = this.salesRepValues.type;
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
      if (this.listOfArValues.length > 0) {
        const tableArData = JSON.stringify(this.listOfArValues);
        let t;
        t = [{ 'id': '3' }, { 'id': '4' }, { 'id': '5' }];
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
  /*get the customer notes*/
  getCompanyNotes() {
    this.customerService.getCompanyDetailsBySalesRepId(this.salesRepId, this.accessToken).subscribe(getCustomerData => {
      this.customerFeaturesAll = getCustomerData;
      console.log('this.customerFeatures', this.customerFeaturesAll);
      this.logger = {
        'method': 'getArForm',
        'message': 'Customers assigned to this salesrepId',
        'CustomerDetail ': this.salesRepId
      };
      this.loggerService.info(this.logger);
    });
  }
  getAllCompanyNotes() {
    this.customerService.getCompanyDetails(this.accessToken).subscribe(getCustomerData => {
      this.customerFeaturesAll = getCustomerData;
      // this.customerFeaturesAll.sort(this.dynamicSort('companyName'));
      console.log('this.customerFeatures', this.customerFeaturesAll);
      this.logger = { 'method': 'getCompanyDetails', 'message': 'Customers', 'CustomerDetail ': 'All' };
      this.loggerService.info(this.logger);
    });
  }

  dynamicSort(property:any) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a:any, b:any) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }
  checkForAmt(value:any) {
    if (value === '') {
      this.errorForOthers = true;
    } else {
      this.errorForOthers = false;
    }
  }

  saveOthers(form:any) {
    this.amountValue = '';
    this.amountValue = form.amount;
    if (this.amountValue === '') {
      this.amountValue = 0;
    } else {
      this.amountValue = this.amountValue;
    }
    this.amountIncDecData = form.amountIncDec;
    if (this.amountIncDecData === '' || this.amountIncDecData === null) {
      this.amountIncDecData = 'increment';
    }
    this.showForOthers = false;
    this.transportOrigin.patchValue({ reason: '', amountIncDec: '', amount: '' });
  }


  onItemSelect(item: any) {
    if (item.id === 9) {
      this.showForOthers = true;
    } else {
      this.showForOthers = false;
    }
    console.log(this.selectedItems);
  }

  OnItemDeSelect(item: any) {
    if (item.id === 9) {
      this.showForOthers = false;
    }
  }

  /**
   *  To display remove icon and zipcode state and city
   */

  checkForZipCode(zipCode:any, type:any) {
    console.log('zipCode', zipCode.target.value,zipCode.target.value.length, type);
    let zipcode;
    if (zipCode.target.value.length === 5) {
    if (zipCode.target.value.key === 'Enter' && type === 'origin') {
      zipcode = zipCode.target.value;
      // document.getElementById('destinationZipCode').focus();
    } else if (zipCode.target.value.key === 'Enter' && type === 'destination') {
      zipcode = zipCode.target.value;
      // (document.getElementById('classification')as HTMLFormElement).focus();
    } else {
      zipcode = zipCode.target.value;
    }
    if (zipCode.target.value === '') {
      this.showRemoveIcon = false;
      this.errorMessage = false;
      this.showRemoveIconDest = false;
      this.errorMessageDest = false;
      this.showZipcodes = false;
      this.showZipcodeDest = false;
    } else {
      if (type === 'origin') {
        this.noshipmentData = false;

        this.showRemoveIcon = true;
        this.getCityState1(zipcode, type);
      } else {
        this.noshipmentDestData = false;

        this.showRemoveIconDest = true;
        this.getCityState1(zipcode, type);
      }
    }
  }
}

  
 
  getCityState(zipCode:any, type:any) {
    this.getQuoteFlag = true;
    this.pricingInfoService.getCityState(zipCode).subscribe(getArrayValues => {
      this.getZipcodeValues = getArrayValues;
      if (this.getZipcodeValues.length > 0) {
        for (let i = 0; i < this.getZipcodeValues.length; i++) {
          if (type === 'origin') {

            this.filterValues = this.getZipcodeValues[i];
            this.filterValuesState = this.getZipcodeValues[i].state;
            if (this.filterValuesState === 'HI' || this.filterValuesState === 'AK' ) {
              this.noshipmentData = true;
             } else {
            this.showZipcodes = true;
            this.errorMessage = false;
            (document.getElementById('destinationZipCode')as HTMLFormElement).focus();
             }
          } else {
            this.filterValuesDest = this.getZipcodeValues[i];
            this.filterValuesDestState = this.getZipcodeValues[i].state;
            if (this.filterValuesDestState === 'HI' || this.filterValuesDestState === 'AK' ) {
              this.noshipmentDestData = true;
             } else {
            this.showZipcodeDest = true;
            this.errorMessageDest = false;
            (document.getElementById('classification')as HTMLFormElement).focus();
             }
          }
        }
      } else {
        if (type === 'origin') {
          this.showZipcodes = false;
          this.errorMessage = true;
          (document.getElementById('originZipCode')as HTMLFormElement).focus();
        } else {
          this.showZipcodeDest = false;
          this.errorMessageDest = true;
          (document.getElementById('destinationZipCode')as HTMLFormElement).focus();
        }
      }
      this.logger = { 'method': 'getCityState', 'message': 'Info Message', 'Zipcode': zipCode };
      this.loggerService.info(this.logger);
    });
  }
  getCityNameValue(value:any, type:any) {
    console.log(value);
    if (type === "origin") {
      this.filterValues = value.cityName;
      this.filterValuesState = value.state;
      if (this.filterValuesState === 'HI' || this.filterValuesState === 'AK' ) {
        this.noshipmentData = true;
       } else {
      this.showZipcodes = true;
      this.errorMessage = false;
      this.showTableZip = false;
      // this.showTableZip1 = false;
      (document.getElementById('destinationZipCode')as HTMLFormElement).focus();
       }
console.log(this.showZipcodes, this.filterValues);
    } else if (type === "destination") {
      // let 
      this.filterValuesDest = [];
      let obbb = {city:value.cityName, state:value.state}
      this.filterValuesDest = obbb;
      this.filterValuesDestState = value.state;
      if (this.filterValuesDestState === 'HI' || this.filterValuesDestState === 'AK' ) {
        this.noshipmentData = true;
       } else {
        this.showZipcodeDest = true;
        this.errorMessageDest = false;
        // this.showTableZip = false;
        this.showTableZip1 = false;
        this.showErrorMessageForClass = false;
        this.showChooseClass =false;
        (document.getElementById('classification')as HTMLFormElement).focus();
       }
console.log(this.showZipcodes, this.filterValues,this.filterValuesDest);
    }
 

  }
  getCityState1(zipCode:any, type:any) {
    this.getQuoteFlag = true;
    this.showTableZip = false;
    this.showTableZip1 = false;

    this.pricingInfoService.getCityState(zipCode).subscribe((getArrayValues : any) => {
      console.log(getArrayValues);
      this.originZipArray =[];
      this.destinationZipArray = [];
      let cityAndState: any = getArrayValues;
      let CityArray = getArrayValues[0].yrcCity;
      console.log(CityArray);
      // getArrayValues.yrcCity;
      if (cityAndState && cityAndState.length > 0) {
        // console.log(response.lookupCityResponse.cities.city[0].name.$value);

        if (CityArray.length > 1) {
          if (type === 'origin') {
            this.showTableZip = true;
            CityArray.forEach((ele:any) => {
              this.originZipArray.push({'cityName': ele, 'state':cityAndState[0].state, 'selectedFocus': false})
            })
            // $('#0').focus();
            this.originZipArray[0].selectedFocus = true;
            setTimeout(() => {
              var id = $("tr:focus").attr("0");
              id++;
              if (id > 6) {
                id = 0;
              }
              $("#consigneeTableId tr[tabindex=0]").focus();
            },500);
              this.selectedIndex = 0;
          } else {
            this.showTableZip1 = true;
            CityArray.forEach((ele:any) => {
              this.destinationZipArray.push({'cityName': ele, 'state':cityAndState[0].state})
            })
            setTimeout(() => {
              var id = $("tr:focus").attr("0");
              id++;
              if (id > 6) {
                id = 0;
              }
              $("#consigneeTableId1 tr[tabindex=0]").focus();
            },500);
              this.selectedIndex = 0;
          }
         
          // CityArray.forEach((ele) => {
          //   this.originZipArray.push({'cityName': ele, 'state':cityAndState[0].state})
          // })
          // this.originZipArray = CityArray;
        } else {
          if (type === 'origin') {
            this.filterValues = cityAndState[0].city;
            this.filterValuesState = cityAndState[0].state;
            if (this.filterValuesState === 'HI' || this.filterValuesState === 'AK' ) {
              this.noshipmentData = true;
             } else {
            this.showZipcodes = true;
            this.errorMessage = false;
            (document.getElementById('destinationZipCode')as HTMLFormElement).focus();
             }
console.log(this.showZipcodes, this.filterValues, this.filterValuesState);
          } else {
            let obbb = {city:cityAndState[0].city, state:cityAndState[0].state}

            this.filterValuesDest = obbb;
                  this.filterValuesDestState = cityAndState[0].state.$value;
                  if (this.filterValuesDestState === 'HI' || this.filterValuesDestState === 'AK' ) {
                    this.noshipmentDestData = true;
                   } else {
                  this.showZipcodeDest = true;
                  this.errorMessageDest = false;
                  this.showErrorMessageForClass = false;
        this.showChooseClass =false;
                  (document.getElementById('classification')as HTMLFormElement).focus();
                   }
          }

        }
      }
   
      this.logger = { 'method': 'getCityState', 'message': 'Info Message', 'Zipcode': zipCode };
      this.loggerService.info(this.logger);
    });
  }

  checkKeyInput(event:any) {
    console.log(event);
    if (event === 13) {
      console.log(this.selectedIndex);
      // $('#buttoniD').focus();
      $('tabindex[' + this.selectedIndex + ']').focus();
    }
  }
  scroll(event: KeyboardEvent, id:any,type:any) {
    //up 38 down 40
    // event.preventDefault();
    console.log(event);
    if (type === 'origin') {
    if (event.keyCode === 40) {
      var id = $("tr:focus").attr("tabindex");
      id++;
      if (id > this.originZipArray.length) {
        id = 0;
      }
      $("#consigneeTableId tr[tabindex=" + id + "]").focus();
      this.selectedIndex++;
    } else if (event.keyCode === 38) {
      var id = $("tr:focus").attr("tabindex");
      id--;
      if (id > 6) {
        id = 0;
      }
      $("#consigneeTableId tr[tabindex=" + id + "]").focus();
      this.selectedIndex--;
    } else if (event.key === 'Enter') {
      console.log(this.selectedIndex-1);
      this.getCityNameValue(this.originZipArray[this.selectedIndex-1],'origin')
    }
  } else if (type === 'destination') {
    // this.selectedIndex = 0;
    if (event.keyCode === 40) {
      var id = $("tr:focus").attr("tabindex");
      id++;
      if (id > this.destinationZipArray.length) {
        id = 0;
      }
      $("#consigneeTableId1 tr[tabindex=" + id + "]").focus();
      this.selectedIndex++;
    } else if (event.keyCode === 38) {
      var id = $("tr:focus").attr("tabindex");
      id--;
      if (id > 6) {
        id = 0;
      }
      $("#consigneeTableId1 tr[tabindex=" + id + "]").focus();
      this.selectedIndex--;
    } else if (event.key === 'Enter') {
      console.log(this.selectedIndex-1);
      this.getCityNameValue(this.destinationZipArray[this.selectedIndex-1],'destination')
    }
  }
    console.log(this.selectedIndex);
  }

  emergencyStatus() {
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
        this.emergencyStop = false;
        console.log(this.emergencyStop)
      } else {
        this.emergencyStop = true;
      }
    })
  }

  checkForClass(event:any) {
    console.log('event', event);
    this.invalidErrorWeightMessage = false;
    if (event.target.value !== '') {
    (document.getElementById('weight')as HTMLFormElement).focus();
    let classificationData;
    if (event.key === 'Enter') {
      console.log('event', event.target.value);
      classificationData = this.classArray.filter(function (el:any) {
        return el === Number(event.target.value);
      });
    } else {
      classificationData = this.classArray.filter(function (el:any) {
        return el === Number(event);
      });
    } 
    console.log('classification', classificationData);
    if (classificationData.length > 0) {
      this.showErrorMessageForClass = false;
      console.log('classification If', classificationData);
      (document.getElementById('weight')as HTMLFormElement).focus();
    } else {
      console.log('classification Else', classificationData);
      this.showErrorMessageForClass = true;
      (document.getElementById('classification')as HTMLFormElement).focus();
      setTimeout(() => {
        this.showErrorMessageForClass = false;
      }, 5000);
    }
    } else {
      this.showErrorMessageForClass = false;
      this.showChooseClass = false;
    }
  }

  /*
   Customer rating notes
   */
  getRatingNotes(customer:any) {
    this.applyCostPlusForYRC = false;
    this.applyCostPlusForFedexEco = false;
    this.applyCostPlusForFedexPri = false;
    this.applyCostPlusForReddaway = false;
    this.costPlusFactorForYRC = 0;
    this.costPlusFactorForFedexEco = 0;
    this.costPlusFactorForFedexPri = 0;
    this.costPlusFactorForReddaway = 0;
    console.log('customer', customer);
    let event;
    let data = [];
    if (customer.key === 'Enter') {
      console.log(customer);
      event = Number(customer.target.value);
      console.log('event', event);
    } else {
      event = Number(customer);
      console.log('event else', event);
    }
    this.customerEnterFlag = true;
    if (this.customerFeaturesAll.length > 0) {
      for (let c = 0; c < this.customerFeaturesAll.length; c++) {
        console.log('event2', this.customerFeaturesAll[c].id, event);
        if (event === this.customerFeaturesAll[c].id) {
          console.log('customer 123', customer, event);
          this.customerData = this.customerFeaturesAll[c].ratingNotes;
          this.companyId = this.customerFeaturesAll[c].id;
          this.customerName = this.customerFeaturesAll[c].customerName;
          this.setSalesRepId = this.customerFeaturesAll[c].salesRepId;
          this.showErrorCustomer = false;
          console.log('this.customerData', this.customerData);
          this.companyData = this.customerFeaturesAll[c];
          console.log('this.companyData', this.companyData);
          this.getQuoteFlag = true;
          if (this.companyData.costPlus === true) {
            if (this.companyData.costPlusFactor.length > 0) {
              for (let c = 0; c < this.companyData.costPlusFactor.length; c++) {
                if ('YRC' === this.companyData.costPlusFactor[c].carrier) {
                  this.applyCostPlusForYRC = true;
                  this.costPlusFactorForYRC = 1 + (Number(this.companyData.costPlusFactor[c].factor) / 100);
                }
                if ('FEDEX ECONOMY' === this.companyData.costPlusFactor[c].carrier) {
                  this.applyCostPlusForFedexEco = true;
                  this.costPlusFactorForFedexEco = 1 + (Number(this.companyData.costPlusFactor[c].factor) / 100);
                }
                if ('FEDEX PRIORITY' === this.companyData.costPlusFactor[c].carrier) {
                  this.applyCostPlusForFedexPri = true;
                  this.costPlusFactorForFedexPri = 1 + (Number(this.companyData.costPlusFactor[c].factor) / 100);
                }
                if ('REDDAWAY' === this.companyData.costPlusFactor[c].carrier) {
                  this.applyCostPlusForReddaway = true;
                  this.costPlusFactorForReddaway = 1 + (Number(this.companyData.costPlusFactor[c].factor) / 100);
                }
              }
            } else {
              this.applyCostPlusForYRC = false;
              this.applyCostPlusForFedexEco = false;
              this.applyCostPlusForFedexPri = false;
              this.applyCostPlusForReddaway = false;
            }
          } else {
            this.applyCostPlusForYRC = false;
            this.applyCostPlusForFedexEco = false;
            this.applyCostPlusForFedexPri = false;
            this.applyCostPlusForReddaway = false;
          }
          console.log('this.companyData', this.companyData, 'YRC', this.applyCostPlusForYRC,
            'FEDEX ECO', this.applyCostPlusForFedexEco, 'FEDEX Pri', this.applyCostPlusForFedexPri, 'reddaway', this.applyCostPlusForReddaway);
          console.log('cost plus', this.costPlusFactorForYRC, this.costPlusFactorForFedexEco, this.costPlusFactorForFedexPri, this.costPlusFactorForReddaway);
          if (this.customerData !== '' && this.customerData !== null) {
            let sort = this.customerData.substring(0, 150);
            console.log('sort', sort);
            console.log('After sort', this.customerData);
            this.transportOrigin.patchValue({ ratingNotes: this.customerData });
            this.showRatingNotes = true;
          } else {
            this.showRatingNotes = false;
            this.transportOrigin.patchValue({ ratingNotes: '' });
          }
          (document.getElementById('originZipCode')as HTMLFormElement).focus();
          break;
        } else {
          console.log('customer else', customer);
          (document.getElementById('customer')as HTMLFormElement).focus();
        }
      }
    }
  }
  ratingNotes() {
    $('#ratingBootstrap').modal('show')
    $(document).keypress(function (e:any) {
      if (e.which === 13) {
        $('#ratingBootstrap').modal('hide')
        (document.getElementById('originZipCode')as HTMLFormElement).focus();
      }
    });
    this.showRatingNotesForCustomers = true;
  }
  windowClose() {
    $('#ratingBootstrap').modal('hide')
    (document.getElementById('originZipCode')as HTMLFormElement).focus();
  }


  /**
   *  Removing Origin and destination zipcode
   */
  remove(removeData:any) {
    if (removeData === 'origin') {
      this.transportOrigin.patchValue({ origin: '' });
      this.showRemoveIcon = false;
      this.showZipcodes = false;
      (document.getElementById('originZipCode')as HTMLFormElement).focus();
    } else {
      this.transportOrigin.patchValue({ destination: '' });
      this.showRemoveIconDest = false;
      this.showZipcodeDest = false;
      (document.getElementById('destinationZipCode')as HTMLFormElement).focus();
    }
    this.pricingDetail = [];
    this.getQuoteFlag = true;
    this.showTable = false;
    this.showAllData = false;
  }

  /**
   * Clearing all input values
   */
  clear() {
    console.log('clear');
    this.transportOrigin.patchValue({
      origin: '', destination: '', classification: '',
      weight: ''
    });
    this.filterValues = '';
    this.filterValuesDest = '';
    this.pricingDetail = [];
    this.showRemoveIcon = false;
    this.showRemoveIconDest = false;
    this.selectedItems = [];
    this.showTableAp = false;
    this.showTable = false;
    this.showAllData = false;
    this.showClearAll = false;
    this.showZipcodeDest = false;
    this.getQuoteFlag = true;
    this.showZipcodes = false;
    this.showErrorInternetConnection = false;
    (document.getElementById('originZipCode')as HTMLFormElement).focus();
    this.logger = { 'method': 'getCityState', 'message': 'Clear all values' };
    this.loggerService.debug(this.logger);
  }

  /**
   * Check for weight >20000
   * @param weight
   * @param transport
   */
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

  checkForWeight(classification:any, value:any) {
    console.log('weight');
    let numberData;
    this.showCheckForWeight = false;
    this.operationMessage = false;
    if (value.key === 'Enter') {
      numberData = this.checkNumber(value.target.value);
    } else {
      numberData = this.checkNumber(value);
    }
    if (numberData > 10000) {
      this.showCheckForWeight = true;
      this.transportOrigin.patchValue({ weight: '' });
    } else {
      if (numberData > 5000) {
        this.operationMessage = true;
        // this.transportOrigin.patchValue({ weight: '' });

      } else {
        this.operationMessage = false;
      // }
      this.showCheckForWeight = false;
      this.transportOrigin.patchValue({ weight: numberData });
      if (classification !== '' && numberData !== '') {
        if (Number(numberData) !== 0) {
          this.invalidErrorWeightMessage = false;
          // this.pricingDetail.push({ classification: classification, weight: numberData });
          this.addItem(this.transportOrigin.value);
          (document.getElementById('getQuote')as HTMLFormElement).focus();

          console.log('this.pricingDetail', this.pricingDetail);
        } else {
          console.log('this.pricingDetailElse ');
          this.invalidErrorWeightMessage = true;
        }
      }
      if (this.pricingDetail.length > 0) {
        this.showTable = true;
        this.getQuoteFlag = true;
        this.transportOrigin.patchValue({ classification: '', weight: '' });
        if (this.showLoader === false) {
          this.getQuoteFlag = true;
          setTimeout(() => {
            (document.getElementById('getQuote')as HTMLFormElement).focus();

          }, 1000);
        } else {
          console.log('else loader');
        }
      } else {
        this.showTable = false;
        // document.getElementById('getQuote').focus();
      }
    }
  }
  }

  addItem(form:any) {
    console.log(this.pricingDetail);
    let object = { classification: form.classification, weight: Number(form.weight) };
    if (this.showCheckForWeight === false && this.operationMessage === false) {
      this.pricingDetail.push(object);

    }
    if (this.pricingDetail.length > 0) {
      this.showTable = true;
      this.transportOrigin.patchValue({ classification: '', weight: '' });
    } else {
      this.showTable = false;
    }
    setTimeout(() => {
      (document.getElementById('getQuote')as HTMLFormElement).focus();

    }, 1000);
  }
  /*
  Classification (77.5->77, 92.5->92)
 */
  checkForClassification(pricingDetail:any) {
    let classification;
    let classInfo = [];
    classInfo = pricingDetail;
    for (let p = 0; p < classInfo.length; p++) {
      if (classInfo[p].classification === '77.5') {
        classification = 77;
        classInfo[p].classification = classification;
      } else {
        if (classInfo[p].classification === '92.5') {
          classification = 92;
          classInfo[p].classification = classification;
        } else {
          classInfo[p].classificaton = classInfo[p].classification;
        }
      }
    }
    return classInfo;
  }
  /**
   * Deleting the class and weight
   * @param pricing
   * @param index
   */
  delete(pricing:any, index:any) {
    this.pricingDetail.splice(index, 1);
    if (this.pricingDetail.length === 0) {
      this.showTable = false;
      (document.getElementById('classification')as HTMLFormElement).focus();
      this.getQuoteFlag = false;
    } else {
      this.getQuoteFlag = true;
    }
  }

  /*
   Changing the AP and AR Discount, Minimum charge Data in the table
   */
  changeArValues(profile:any) {
    let arraySorting:any;
    arraySorting = [];
    let j = 1;
    if (profile !== undefined) {
      if (profile.type === 'AR') {
        for (let i = 0; i < this.listOfArValues.length; i++) {
          if (profile.companyName === this.listOfArValues[i].companyName) {
            this.listOfArValues.splice(i, j);
            j++;
          }
        }
        this.listOfArValues.push(profile);
        let sortOrder;
        sortOrder = this.listOfArValues.filter(function (el:any) {
          return el.companyName === 'FEDEX PRIORITY';
        });
        let sortOrder1;
        sortOrder1 = this.listOfArValues.filter(function (el:any) {
          return el.companyName === 'FEDEX ECONOMY';
        });
        let sortOrder2;
        sortOrder2 = this.listOfArValues.filter(function (el:any) {
          return el.companyName === 'YRC';
        });
        let sortOrder3;
        sortOrder3 = this.listOfArValues.filter(function (el:any) {
          return el.companyName === 'REDDAWAY';
        });
        arraySorting.push.apply(arraySorting, sortOrder);
        arraySorting.push.apply(arraySorting, sortOrder1);
        arraySorting.push.apply(arraySorting, sortOrder2);
        arraySorting.push.apply(arraySorting, sortOrder3);
        this.listOfArValues = arraySorting;
      } else {
        for (let i = 0; i < this.listOfApValues.length; i++) {
          if (profile.companyName === this.listOfApValues[i].companyName) {
            this.listOfApValues.splice(i, j);
            j++;
          }
        }
        this.listOfApValues.push(profile);
        let sortOrder;
        sortOrder = this.listOfApValues.filter(function (el:any) {
          return el.companyName === 'FEDEX PRIORITY';
        });
        let sortOrder1;
        sortOrder1 = this.listOfApValues.filter(function (el:any) {
          return el.companyName === 'FEDEX ECONOMY';
        });
        let sortOrder2;
        sortOrder2 = this.listOfApValues.filter(function (el:any) {
          return el.companyName === 'YRC';
        });
        let sortOrder3;
        sortOrder3 = this.listOfApValues.filter(function (el:any) {
          return el.companyName === 'REDDAWAY';
        });
        arraySorting.push.apply(arraySorting, sortOrder);
        arraySorting.push.apply(arraySorting, sortOrder1);
        arraySorting.push.apply(arraySorting, sortOrder2);
        arraySorting.push.apply(arraySorting, sortOrder3);
        this.listOfApValues = arraySorting;
      }
    }
  }

  giveRateDetails(rateDetail:any) {
    console.log('giveRateDetails', rateDetail);
    let date = new Date();
    console.log('QUOTE REQUEST TIME', date);
    this.showTableAp = true;
    this.showClearAll = true;
    this.quoteDetails = {};
    this.sendArrayValues = [];
    let arrayValues = [];
    let category, highValue; 
    
    if (rateDetail.length > 1) {
      for(let i=0;i<rateDetail.length;i++) {
        if (rateDetail[0].carrierType=== 'FEDEX ECONOMY'|| rateDetail[0].carrierType === 'FEDEX PRIORITY') {
if (rateDetail[0].category === 'AP') {
  rateDetail[0].fedexHighcost = rateDetail[1].fedexHighcost
  rateDetail[0].highCostDeliveryCharge = rateDetail[1].highCostDeliveryCharge;

  console.log(rateDetail);

}
        }
      }
      for (let r = 0; r < rateDetail.length; r++) {
        if (rateDetail[r].factor === 'COSTPLUS') {
          highValue = 'COSTPLUS';
          category = 'COSTPLUS';
        } else {
          highValue = 'AR';
          category = rateDetail[r].category;
        }
        this.quoteDetails = {
          customerId: this.customerId,
          companyId: this.companyId,
          ratingNotes: this.customerData,
          originZip: this.userData.origin,
          destinationZip: this.userData.destination,
          classAndWeight: this.userData.classWeight,
          accessorials: this.accessorials,
          carrierName: rateDetail[r].carrierType,
          rateDetail: JSON.stringify(rateDetail[r]),
          totalCharge: rateDetail[r].totalCharge,
          createdBy: this.salesRepType,
          highValue: highValue,
          category: category,
          higherValueAp: false,
          salesRepId: this.setSalesRepId,
          viewType: 'administrator',
          loginId: this.salesRepValues.id,
          originCityState: JSON.stringify({ 'city': this.filterValues, 'state': this.filterValuesState }),
          destinationCityState: JSON.stringify({ 'city': this.filterValuesDest.city, 'state': this.filterValuesDest.state })
        };
        this.sendArrayValues.push(this.quoteDetails);
      }
    }
    console.log('arrayValues', this.sendArrayValues);
    if (this.sendArrayValues.length > 1) {
      this.pricingInfoService.saveQuoteDetails(this.sendArrayValues).subscribe((data:any) => {
        let date = new Date();
        console.log('QUOTE RESPONSE', date);
        if (data.quoteId === false) {
          this.showQuoteId = false;
        } else {
          this.showQuoteId = true;
          if (data.quoteId['YRCAR']) {
            let date = new Date();
            console.log('QUOTE REQUEST TIME FOR QUOTE YRC AR', date);
            this.quoteIdYRC = data.quoteId['YRCAR'];
           

          } else if (data.quoteId['YRCCOSTPLUS']) {
            let date = new Date();
            console.log('QUOTE REQUEST TIME FOR QUOTE YRC AR', date);
            this.quoteIdYRC = data.quoteId['YRCCOSTPLUS'];
          }else if (data.quoteId['FEDEX ECONOMYAR']) {
            this.quoteIdFedexEco = data.quoteId['FEDEX ECONOMYAR'];
            
            let date = new Date();
            console.log('QUOTE REQUEST TIME FOR QUOTE FEDEX ECONOMY AR', date, this.quoteIdFedexPri, this.quoteIdFedexEco);
          } else if (data.quoteId['FEDEX ECONOMYCOSTPLUS']) {
            this.quoteIdFedexEco = data.quoteId['FEDEX ECONOMYCOSTPLUS'];
            
            let date = new Date();
            console.log('QUOTE REQUEST TIME FOR QUOTE FEDEX ECONOMY AR', date, this.quoteIdFedexPri, this.quoteIdFedexEco);
          }  else if (data.quoteId['FEDEX PRIORITYAR']) {
            this.quoteIdFedexPri = data.quoteId['FEDEX PRIORITYAR'];
            let date = new Date();
            console.log('QUOTE REQUEST TIME FOR QUOTE FEDEX PRIORITY AR', date);
          } else if (data.quoteId['FEDEX PRIORITYCOSTPLUS']) {
            this.quoteIdFedexPri = data.quoteId['FEDEX PRIORITYCOSTPLUS'];
            let date = new Date();
            console.log('QUOTE REQUEST TIME FOR QUOTE FEDEX PRIORITY AR', date);
          }
          else if (data.quoteId['REDDAWAYAR']){
            this.quoteIdReddaway = data.quoteId['REDDAWAYAR'];
            let date = new Date();
            console.log('QUOTE REQUEST TIME FOR QUOTE REDDAWAY AR', date);
          } else if (data.quoteId['REDDAWAYCOSTPLUS']) {
            this.quoteIdReddaway = data.quoteId['REDDAWAYCOSTPLUS'];
            let date = new Date();
            console.log('QUOTE REQUEST TIME FOR QUOTE REDDAWAY AR', date);
          }
          (document.getElementById('clear')as HTMLFormElement).focus();
        }
        this.logger = { 'method': 'saveQuoteDetails', 'message': 'Quote Number is generated', 'Quote Number': data };
        this.loggerService.info(this.logger);
      });
    }
  }


  refresh() {
    this.getApData();
    this.getArData();
  }

  compare(arr1:any, arr2:any) {
    let finalArray:any = [];
    arr1.forEach((e1:any) => arr2.forEach((e2:any) => {
      if (e1.id === e2.id) {
        finalArray.push(e1);
        console.log('finalArray', finalArray);
      }
    }
    ));
    return finalArray;
  }

  /**
   * calculation for the accessorials
   * @param selectedItems
   * @param weight
   * @returns {number}
   */
  /* It has made common in service*/


  viewAllDetails() {
    this.viewAllShowYrcData = !this.viewAllShowYrcData;
  }

  viewAllDetailsFedexEco() {
    this.viewAllShowFedexEcoData = !this.viewAllShowFedexEcoData;
  }

  viewAllDetailsFedexPri() {
    this.viewAllShowFedexPriData = !this.viewAllShowFedexPriData;
  }

  viewAllDetailsReddaway() {
    this.viewAllShowReddawayData = !this.viewAllShowReddawayData;
  }


  /*Adding of array values Net charge */
  netChargeArrSum(netCharge:any) {
    let total = 0;
    netCharge.forEach(function (key:any) {
      total = total + Number(key);
    });
    return total;
  }

  clearData() {
    this.transportOrigin.controls['origin'].enable();
    this.transportOrigin.controls['destination'].enable();
  }

  /**
   * Get Quote function
   * @param transportOrigin
   * @param selectedItems
   * @param pricingDetail
   */
  getQuote(transportOrigin:any, selectedItems:any, pricingDetail:any) {
    (document.getElementById('team')as HTMLFormElement).scrollIntoView(true);
    (document.getElementById('myDiv')as HTMLFormElement).className = 'imgShow';
    this.showLoader = true;
    this.getQuoteFlag = false;
    let date = new Date();
    console.log('get Quote time timestamp loader', date, selectedItems);
    this.userData = {};
    this.accessorials = [];
    this.fedexArray = [];
    this.priority = [];
    this.YRCArray = [];
    this.reddawayArray = [];
    this.userData.classWeight = [];
    this.sendArrayValues = [];
    this.highCostForFedex;
    let classAndWeight = [];
    this.quoteIdYRC = '';
    this.quoteIdFedexEco = '';
    this.quoteIdFedexPri = '';
    this.quoteIdReddaway = '';
    this.reddawayResponse = '';
    let classWeight = pricingDetail;
    classAndWeight = this.checkForClassification(classWeight);
    console.log('classAndWeight', classAndWeight);
    this.userData.origin = transportOrigin.origin;
    this.userData.destination = transportOrigin.destination;
    this.userData.classWeight = classAndWeight;
    this.userData.carrier = 'ALL';
    this.selectedItems = selectedItems;
    this.userData.originState = this.filterValuesState;
    this.userData.originCity = this.filterValues;
    this.userData.destinationState = this.filterValuesDest.state;
    this.userData.destinationCity = this.filterValuesDest.city;
    this.userData.customerId = this.customerId;
    this.userData.companyId = this.companyId;
    this.userData.userType = 'admin';
    this.userData.viewType = 'admin';
    
    this.viewAllShowFedexPriData = false;
    this.viewAllShowFedexEcoData = false;
    this.viewAllShowYrcData = false;
    this.viewAllShowReddawayData = false;
    this.showAllData = false;
    this.showTableAp = false;
    this.showClearAll = false;
    this.waitForProcessMessage = false;
    this.waitForProcessMessageForReddaway = false;
    this.showErrorInternetConnection = false;
    this.showMessageForAp = false;
    let accessorialsName;
    if (this.selectedItems.length > 0) {
      for (let s = 0; s < this.selectedItems.length; s++) {
        accessorialsName = this.selectedItems[s].itemName;
        this.accessorials.push(accessorialsName);
      }
    }
    let AccessArray:any = [];
    this.selectedItems.forEach((ele:any) => {
      AccessArray.push(ele.itemName);
    });
    this.userData.accessorials = AccessArray;
    console.log(AccessArray,this.userData);
    console.log('REQUEST', this.userData);
    let requestTimestamp = new Date();
    console.log('REQUEST FROM get Quote time timestamp', requestTimestamp);
    this.logger = { 'method': 'getQuote', 'message': 'Passing Request to the Api methods', 'request': this.userData, 'timeStamp': date };
    this.loggerService.info(this.logger);
    this.pricingInfoService.getRates(this.userData, 'YRC AP').subscribe((response:any) => {
      console.log('RESPONSE YRC AP', response);
      let yrcApTimestamp = new Date();
      console.log('RESPONSE TIME FOR YRC AP', yrcApTimestamp);
      this.logger = { 'method': 'getRates', 'message': 'YRC AP', 'response': 'Pass', 'timeStamp': yrcApTimestamp };
      this.loggerService.info(this.logger);
      if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

        this.showAllData = true;
        this.showYrcData = false;
        // this.hideYrcData = true;
        this.noyrcShipment = true;
      } else {
      if (Object.keys(response.result).length === 0 || response.result === undefined) {
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
        this.showAllData = true;
        this.showYrcData = false;
        // this.noyrcShipment = true;

        this.hideYrcData = true;
      } else {
        console.log('Costplus', this.applyCostPlusForYRC);
        this.rateCalculationForYRCReddaway1(response, 'YRC', 'AP', 'AP');
        if (this.applyCostPlusForYRC === true) {
          let object = this.userData;
          object.carrier = 'YRC';
          this.pricingInfoService.getSingleShipment(object).subscribe((data:any) => {
            console.log('xx',data)
            this.getRuleForYRCAR = data.result;
            this.rateCalculationForYRCReddawayCostplus(response, 'YRC', 'AP', 'COSTPLUS');
          }, (err:any) => {
            this.getRuleForYRCAR = [];
            this.rateCalculationForYRCReddawayCostplus(response, 'YRC', 'AP', 'COSTPLUS');
          });
          this.pricingInfoService.getTransitTime(object).subscribe((response:any) => {
            console.log('transitTime', object);
            this.transitTimeyrc = response;
            if (this.transitTimeyrc.result !== false) {
              this.transitTimeyrc.yrcResult = this.transitTimeyrc.result;
            } else {
              this.transitTimeyrc.yrcResult = 'NA';
            }
            console.log('yrctime', this.transitTimeyrc);
          }, (err:any) => {
            this.transitTimeyrc.yrcResult = 'NA';
          }); 
        }
      }
    }
    }, (err:any) => {
      this.logger = { 'method': 'getRates', 'message': 'YRC AP Error', 'status': err.status };
      this.loggerService.error(this.logger);
      // document.getElementById('myDiv').className = 'imgBlock';
      if (err.status === 0) {
        // this.showErrorInternetConnection = true;
        setTimeout(() => {
          let requestTimestamp = new Date();
          console.log('REQUEST FROM get Quote time timestamp', requestTimestamp);
          this.logger = { 'method': 'getQuote', 'message': 'Passing Request to the Api methods', 'request': this.userData, 'timeStamp': date };
          this.loggerService.info(this.logger);
          this.pricingInfoService.getRates(this.userData, 'YRC AP').subscribe((response:any) => {
            console.log('RESPONSE YRC AP', response);
            let yrcApTimestamp = new Date();
            console.log('RESPONSE TIME FOR YRC AP', yrcApTimestamp);
            this.logger = { 'method': 'getRates', 'message': 'YRC AP', 'response': 'Pass', 'timeStamp': yrcApTimestamp };
            this.loggerService.info(this.logger);
            if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
      
              this.showAllData = true;
              this.showYrcData = false;
              // this.hideYrcData = true;
              this.noyrcShipment = true;
            } else {
            if (Object.keys(response.result).length === 0 || response.result === undefined) {
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              this.showAllData = true;
              this.showYrcData = false;
              this.hideYrcData = true;
            } else {
              this.rateCalculationForYRCReddaway1(response, 'YRC', 'AP', 'AP');
              if (this.applyCostPlusForYRC === true) {
                let object = this.userData;
                object.carrier = 'YRC';
                this.pricingInfoService.getSingleShipment(object).subscribe((data:any) => {
                  this.getRuleForYRCAR = data.result;
                  this.rateCalculationForYRCReddawayCostplus(response, 'YRC', 'AP', 'COSTPLUS');
                }, (err:any) => {
                  this.getRuleForYRCAR = [];
                  this.rateCalculationForYRCReddawayCostplus(response, 'YRC', 'AP', 'COSTPLUS');
                });
                this.pricingInfoService.getTransitTime(object).subscribe((response:any) => {
                  console.log('transitTime', object);
                  this.transitTimeyrc = response;
                  if (this.transitTimeyrc.result !== false) {
                    this.transitTimeyrc.yrcResult = this.transitTimeyrc.result;
                  } else {
                    this.transitTimeyrc.yrcResult = 'NA';
                  }
                  console.log('yrctime', this.transitTimeyrc);
                }, (err:any) => {
                  this.transitTimeyrc.yrcResult = 'NA';
                }); 
              }
            }
          }
          }, (err:any) => {
            this.logger = { 'method': 'getRates', 'message': 'YRC AP Error', 'status': err.status };
            this.loggerService.error(this.logger);
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
            if (err.status === 0) {
              this.showErrorInternetConnection = true;
              this.onlineOffline = true;
            } else {
              this.showAllData = true;
              this.hideYrcData = true;
            }
          });
          // this.getQuote(transportOrigin, selectedItems, pricingDetail);

        }, 10000);

        // this.onlineOffline = true;
      } else {
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

        this.showAllData = true;
        this.hideYrcData = true;
      }
    });
  
    if (this.applyCostPlusForYRC === false) {
      this.pricingInfoService.getRates(this.userData, 'YRC AR').subscribe((response:any) => {
        console.log('RESPONSE YRC AR', response);
        let yrcArTimestamp = new Date();
        console.log('RESPONSE TIME FOR YRC AR', yrcArTimestamp);
        this.logger = { 'method': 'getRates', 'message': 'YRC AR', 'response': 'Pass', 'timeStamp': yrcArTimestamp };
        this.loggerService.info(this.logger);
        if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

          this.showAllData = true;
          this.showYrcData = false;
          // this.hideYrcData = true;
          this.noyrcShipment = true;

        } else {
        if (Object.keys(response.result).length === 0 || response.result === undefined) {
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          this.showAllData = true;
          this.hideYrcData = true;
          this.showYrcDataAR = false;
        } else {
          let object = this.userData;
          object.carrier = "YRC"
          this.pricingInfoService.getTransitTime(object).subscribe((response:any) => {
            console.log('transitTime', object);
            this.transitTimeyrc = response;
            if (this.transitTimeyrc.result !== false) {
              this.transitTimeyrc.yrcResult = this.transitTimeyrc.result;
            } else {
              this.transitTimeyrc.yrcResult = 'NA';
            }
            console.log('yrctime', this.transitTimeyrc);
          }, (err:any) => {
            this.transitTimeyrc.yrcResult = 'NA';
          })
          this.rateCalculationForYRCReddaway(response, 'YRC', 'AR', 'AR');
        } 
      }
      }, (err:any) => {
        this.logger = { 'method': 'getRates', 'message': 'YRC AR Error response', 'status': err.status };
        this.loggerService.error(this.logger);
        // document.getElementById('myDiv').className = 'imgBlock';
        if (err.status === 0) {
          // this.showErrorInternetConnection = true;
          // this.getQuote(transportOrigin, selectedItems, pricingDetail);
          setTimeout(() => {
            this.pricingInfoService.getRates(this.userData, 'YRC AR').subscribe((response:any) => {
              console.log('RESPONSE YRC AR', response);
              let yrcArTimestamp = new Date();
              console.log('RESPONSE TIME FOR YRC AR', yrcArTimestamp);
              this.logger = { 'method': 'getRates', 'message': 'YRC AR', 'response': 'Pass', 'timeStamp': yrcArTimestamp };
              this.loggerService.info(this.logger);
              if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
                (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
      
                this.showAllData = true;
                this.showYrcData = false;
                // this.hideYrcData = true;
                this.noyrcShipment = true;
      
              } else {
              if (Object.keys(response.result).length === 0 || response.result === undefined) {
                (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                this.showAllData = true;
                this.hideYrcData = true;
                this.showYrcDataAR = false;
              } else {
                let object = this.userData;
                object.carrier = "YRC"
                this.pricingInfoService.getTransitTime(object).subscribe((response:any) => {
                  console.log('transitTime', object);
                  this.transitTimeyrc = response;
                  if (this.transitTimeyrc.result !== false) {
                    this.transitTimeyrc.yrcResult = this.transitTimeyrc.result;
                  } else {
                    this.transitTimeyrc.yrcResult = 'NA';
                  }
                  console.log('yrctime', this.transitTimeyrc);
                }, (err:any) => {
                  this.transitTimeyrc.yrcResult = 'NA';
                })
                this.rateCalculationForYRCReddaway(response, 'YRC', 'AR', 'AR');
              }
            }
            }, (err:any) => {
              this.logger = { 'method': 'getRates', 'message': 'YRC AR Error response', 'status': err.status };
              this.loggerService.error(this.logger);
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              if (err.status === 0) {
                this.showErrorInternetConnection = true;
                // this.getQuote(transportOrigin, selectedItems, pricingDetail);
                this.onlineOffline = true;
              } else {
                this.showAllData = true;
                this.showYrcDataAR = false;
                this.hideYrcData = true;
              }
            });
          }, 10000);
          // this.onlineOffline = true;
        } else {
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

          this.showAllData = true;
          this.showYrcDataAR = false;
          this.hideYrcData = true;
        }
      });
    }
    setTimeout(() => {
      this.pricingInfoService.getRates(this.userData, 'YRC OLDAP').subscribe((response:any) => {
        console.log('RESPONSE YRC AP', response);
        let yrcApTimestamp = new Date();
        console.log('RESPONSE TIME FOR YRC AP', yrcApTimestamp);
        this.logger = { 'method': 'getRates', 'message': 'YRC AP', 'response': 'Pass', 'timeStamp': yrcApTimestamp };
        this.loggerService.info(this.logger);
        if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
  
          this.showAllData = true;
          this.showYrcData = false;
          // this.hideYrcData = true;
          this.noyrcShipment = true;
        } else {
        if (Object.keys(response.result).length === 0 || response.result === undefined) {
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          this.showAllData = true;
          this.showYrcData = false;
          // this.noyrcShipment = true;
  
          this.hideYrcData = true;
        } else {
          this.rateCalculationForYRCReddaway2(response, 'YRC', 'AP', 'AP');
          if (this.applyCostPlusForYRC === true) {
            let object = this.userData;
            object.carrier = 'YRC';
            this.pricingInfoService.getSingleShipment(object).subscribe((data:any) => {
              this.getRuleForYRCAR = data.result;
              this.rateCalculationForYRCReddaway1(response, 'YRC', 'AP', 'COSTPLUS');
            }, (err:any) => {
              this.getRuleForYRCAR = [];
              this.rateCalculationForYRCReddaway1(response, 'YRC', 'AP', 'COSTPLUS');
            });
        
          }
        }
      }
      }, (err:any) => {
        this.logger = { 'method': 'getRates', 'message': 'YRC AP Error', 'status': err.status };
        this.loggerService.error(this.logger);
        // document.getElementById('myDiv').className = 'imgBlock';
        if (err.status === 0) {
          // this.showErrorInternetConnection = true;
          setTimeout(() => {
            let requestTimestamp = new Date();
            console.log('REQUEST FROM get Quote time timestamp', requestTimestamp);
            this.logger = { 'method': 'getQuote', 'message': 'Passing Request to the Api methods', 'request': this.userData, 'timeStamp': date };
            this.loggerService.info(this.logger);
            this.pricingInfoService.getRates(this.userData, 'YRC OLDAP').subscribe((response:any) => {
              console.log('RESPONSE YRC AP', response);
              let yrcApTimestamp = new Date();
              console.log('RESPONSE TIME FOR YRC AP', yrcApTimestamp);
              this.logger = { 'method': 'getRates', 'message': 'YRC AP', 'response': 'Pass', 'timeStamp': yrcApTimestamp };
              this.loggerService.info(this.logger);
              if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
                (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
        
                this.showAllData = true;
                this.showYrcData = false;
                // this.hideYrcData = true;
                this.noyrcShipment = true;
              } else {
              if (Object.keys(response.result).length === 0 || response.result === undefined) {
                (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                this.showAllData = true;
                this.showYrcData = false;
                this.hideYrcData = true;
              } else {
                this.rateCalculationForYRCReddaway2(response, 'YRC', 'AP', 'AP');
                if (this.applyCostPlusForYRC === true) {
                  let object = this.userData;
                  object.carrier = 'YRC';
                  this.pricingInfoService.getSingleShipment(object).subscribe((data:any) => {
                    this.getRuleForYRCAR = data.result;
                    this.rateCalculationForYRCReddaway2(response, 'YRC', 'AP', 'COSTPLUS');
                  }, (err:any) => {
                    this.getRuleForYRCAR = [];
                    this.rateCalculationForYRCReddaway2(response, 'YRC', 'AP', 'COSTPLUS');
                  });
       
                }
              }
            }
            }, (err:any) => {
              this.logger = { 'method': 'getRates', 'message': 'YRC AP Error', 'status': err.status };
              this.loggerService.error(this.logger);
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              if (err.status === 0) {
                this.showErrorInternetConnection = true;
                this.onlineOffline = true;
              } else {
                this.showAllData = true;
                this.hideYrcData = true;
              }
            });
            // this.getQuote(transportOrigin, selectedItems, pricingDetail);
  
          }, 10000);
  
          // this.onlineOffline = true;
        } else {
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
  
          this.showAllData = true;
          this.hideYrcData = true;
        }
      });
    }, 1500);
   
    this.pricingInfoService.getRates(this.userData, 'FEDEX AP').subscribe((response:any) => {
      console.log('RESPONSE FEDEX AP', response);
      let fedexApTimestamp = new Date();
      console.log('RESPONSE TIME FOR FEDEX AP', fedexApTimestamp);
      this.logger = { 'method': 'getRates', 'message': 'FEDEX AP', 'response': 'Pass', 'timeStamp': fedexApTimestamp };
      this.loggerService.info(this.logger);
      if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
        this.showAllData = true;
        // this.hideFedexEcoData = true;
        this.nofedexecoData = true;
        // this.hideFedexPriData = true;
        this.showFedexPriData = false;
        this.showFedexEcoData = false;
        this.nofedexpriData = true;
      } else {
        this.nofedexpriData = false;

      if (Object.keys(response.result).length === 0 || response.result === undefined) {
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
        this.showAllData = true;
        this.hideFedexEcoData = true;
        this.hideFedexPriData = true;
        this.showFedexPriData = false;
        this.showFedexEcoData = false;
      } else {
        this.rateCalculationForFedex(response, 'FEDEX ECONOMY', 'AP', 'AP');
        this.rateCalculationForFedex(response, 'FEDEX PRIORITY', 'AP', 'AP');
        if (this.applyCostPlusForFedexEco === true) {
          let object = this.userData;
          object.carrier = "FEDEX ECONOMY";
          this.pricingInfoService.getAdditionalRateForFedex(this.userData.destination, this.accessToken).subscribe((response:any) => {
            console.log('response this.highCostForFedex', response);
            this.highCostForFedex = response.result;
            if (this.highCostForFedex === 0) {
              this.highCostForFedex = 0;
            } else {
                this.highCostForFedex = this.highCostForFedex + '.00';
            }
          });
          this.pricingInfoService.getSingleShipment(object).subscribe((data:any) => {
            this.getRuleForFedexEcoAR = data.result;
            this.rateCalculationForFedex(response, 'FEDEX ECONOMY', 'AP', 'COSTPLUS');
          }, (err:any) => {
            this.getRuleForFedexEcoAR = [];
            this.rateCalculationForFedex(response, 'FEDEX ECONOMY', 'AP', 'COSTPLUS');
          });
          this.pricingInfoService.getTransitTime(object).subscribe((response:any) => {
            console.log('transitTime', object);
            this.transitTimeFedexEconomy = response;
            if (this.transitTimeFedexEconomy.result !== false) {
              this.split = this.transitTimeFedexEconomy.result.split('_');
              this.numbersArray.forEach((elem:any) =>{
                if(elem.name === this.split[0]){
                  this.transitTimeFedexEconomy.fedexEconomyResult = elem.id;
                } 
              })
              // this.transitTimeFedexEconomy.fedexEconomyResult = wordsToNumbers(this.split[0]);
            } else {
              this.transitTimeFedexEconomy.fedexEconomyResult = 'NA';
            }
            console.log('time', this.transitTimeFedexEconomy);
          }, (err:any) => {
            this.transitTimeFedexEconomy.fedexEconomyResult = 'NA';
          })
          
        }
        if (this.applyCostPlusForFedexPri === true) {
          this.pricingInfoService.getAdditionalRateForFedex(this.userData.destination, this.accessToken).subscribe((response:any) => {
            console.log('response this.highCostForFedex', response);
            this.highCostForFedex = response.result;
            if (this.highCostForFedex === 0) {
              this.highCostForFedex = 0;
            } else {
                this.highCostForFedex = this.highCostForFedex + '.00';
            }
          });
          let object = this.userData;
          object.carrier = "FEDEX PRIORITY";
          this.pricingInfoService.getSingleShipment(object).subscribe((data:any) => {
            this.getRuleForFedexPriAR = data.result;
            this.rateCalculationForFedex(response, 'FEDEX PRIORITY', 'AP', 'COSTPLUS');
          }, (err:any) => {
            this.getRuleForFedexPriAR = [];
            this.rateCalculationForFedex(response, 'FEDEX PRIORITY', 'AP', 'COSTPLUS');
          });
          this.pricingInfoService.getTransitTime(object).subscribe((response:any) => {
            console.log('transitTime', object);
            this.transitTimeFedexPriority = response;
            if (this.transitTimeFedexPriority.result !== false) {
              this.split = this.transitTimeFedexPriority.result.split('_');
              // this.transitTimeFedexPriority.fedexPriorityResult = wordsToNumbers(this.split[0]);
              this.numbersArray.forEach((elem:any) =>{
                if(elem.name === this.split[0]){
                  this.transitTimeFedexPriority.fedexPriorityResult = elem.id;
                } 
                // else {
                //   this.transitTimeFedexPriority.fedexPriorityResult = 'NA';

                // }
              })
            } else {
              this.transitTimeFedexPriority.fedexPriorityResult = 'NA';
            }
            console.log('time', this.transitTimeFedexPriority);
          }, (err:any) => {
            this.transitTimeFedexPriority.fedexPriorityResult = 'NA';
          })
          
        }
      }
    }
    }, (err:any) => {
      this.logger = { 'method': 'getRates', 'message': 'Fedex AP error response', 'status': err.status };
      this.loggerService.error(this.logger);
      // document.getElementById('myDiv').className = 'imgBlock';
      if (err.status === 0) {
        // this.showErrorInternetConnection = true;
        // this.getQuote(transportOrigin, selectedItems, pricingDetail);
        setTimeout(() => {
          this.pricingInfoService.getRates(this.userData, 'FEDEX AP').subscribe((response:any) => {
            console.log('RESPONSE FEDEX AP', response);
            let fedexApTimestamp = new Date();
            console.log('RESPONSE TIME FOR FEDEX AP', fedexApTimestamp);
            this.logger = { 'method': 'getRates', 'message': 'FEDEX AP', 'response': 'Pass', 'timeStamp': fedexApTimestamp };
            this.loggerService.info(this.logger);
            if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              this.showAllData = true;
              // this.hideFedexEcoData = true;
              // this.hideFedexPriData = true;
              this.showFedexPriData = false;
              this.showFedexEcoData = false;
              this.nofedexpriData = true;
            } else {
              this.nofedexpriData = false;

            if (Object.keys(response.result).length === 0 || response.result === undefined) {
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              this.showAllData = true;
              this.hideFedexEcoData = true;
              this.hideFedexPriData = true;
              this.showFedexPriData = false;
              this.showFedexEcoData = false;

            } else {
              this.rateCalculationForFedex(response, 'FEDEX ECONOMY', 'AP', 'AP');
              this.rateCalculationForFedex(response, 'FEDEX PRIORITY', 'AP', 'AP');
              if (this.applyCostPlusForFedexEco === true) {
                let object = this.userData;
                object.carrier = "FEDEX ECONOMY";
                this.pricingInfoService.getAdditionalRateForFedex(this.userData.destination, this.accessToken).subscribe((response:any) => {
                  console.log('response this.highCostForFedex', response);
                  this.highCostForFedex = response.result;
                  if (this.highCostForFedex === 0) {
                    this.highCostForFedex = 0;
                  } else {
                      this.highCostForFedex = this.highCostForFedex + '.00';
                  }
                });
                this.pricingInfoService.getSingleShipment(object).subscribe((data:any) => {
                  this.getRuleForFedexEcoAR = data.result;
                  this.rateCalculationForFedex(response, 'FEDEX ECONOMY', 'AP', 'COSTPLUS');
                }, (err:any) => {
                  this.getRuleForFedexEcoAR = [];
                  this.rateCalculationForFedex(response, 'FEDEX ECONOMY', 'AP', 'COSTPLUS');
                });
                this.pricingInfoService.getTransitTime(object).subscribe((response:any) => {
                  console.log('transitTime', object);
                  this.transitTimeFedexEconomy = response;
                  if (this.transitTimeFedexEconomy.result !== false) {
                    this.split = this.transitTimeFedexEconomy.result.split('_');
                    this.numbersArray.forEach((elem:any) =>{
                      if(elem.name === this.split[0]){
                        this.transitTimeFedexEconomy.fedexEconomyResult = elem.id;
                      } 
                      // else {
                      //   this.transitTimeFedexEconomy.fedexEconomyResult = 'NA';
      
                      // }
                    })
                    // this.transitTimeFedexEconomy.fedexEconomyResult = wordsToNumbers(this.split[0]);
                  } else {
                    this.transitTimeFedexEconomy.fedexEconomyResult = 'NA';
                  }
                  console.log('time', this.transitTimeFedexEconomy);
                }, (err:any) => {
                  this.transitTimeFedexEconomy.fedexEconomyResult = 'NA';
                })
                
              }
              if (this.applyCostPlusForFedexPri === true) {
                this.pricingInfoService.getAdditionalRateForFedex(this.userData.destination, this.accessToken).subscribe((response:any) => {
                  console.log('response this.highCostForFedex', response);
                  this.highCostForFedex = response.result;
                  if (this.highCostForFedex === 0) {
                    this.highCostForFedex = 0;
                  } else {
                      this.highCostForFedex = this.highCostForFedex + '.00';
                  }
                });
                let object = this.userData;
                object.carrier = "FEDEX PRIORITY";
                this.pricingInfoService.getSingleShipment(object).subscribe((data:any) => {
                  this.getRuleForFedexPriAR = data.result;
                  this.rateCalculationForFedex(response, 'FEDEX PRIORITY', 'AP', 'COSTPLUS');
                }, (err:any) => {
                  this.getRuleForFedexPriAR = [];
                  this.rateCalculationForFedex(response, 'FEDEX PRIORITY', 'AP', 'COSTPLUS');
                });
                this.pricingInfoService.getTransitTime(object).subscribe((response:any) => {
                  console.log('transitTime', object);
                  this.transitTimeFedexPriority = response;
                  if (this.transitTimeFedexPriority.result !== false) {
                    this.split = this.transitTimeFedexPriority.result.split('_');
                    this.numbersArray.forEach((elem:any) =>{
                      if(elem.name === this.split[0]){
                        this.transitTimeFedexPriority.fedexPriorityResult = elem.id;
                      } 
                      // else {
                      //   this.transitTimeFedexPriority.fedexPriorityResult = 'NA';
      
                      // }
                    })
                    // this.transitTimeFedexPriority.fedexPriorityResult = wordsToNumbers(this.split[0]);
                  } else {
                    this.transitTimeFedexPriority.fedexPriorityResult = 'NA';
                  }
                  console.log('time', this.transitTimeFedexPriority);
                }, (err:any) => {
                  this.transitTimeFedexPriority.fedexPriorityResult = 'NA';
                })
                
              }
            }
          }
          }, (err:any) => {
            this.logger = { 'method': 'getRates', 'message': 'Fedex AP error response', 'status': err.status };
            this.loggerService.error(this.logger);
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
            if (err.status === 0) {
              this.showErrorInternetConnection = true;
              // this.getQuote(transportOrigin, selectedItems, pricingDetail);
              this.onlineOffline = true;
            } else {
              this.showAllData = true;
              this.hideFedexEcoData = true;
              this.hideFedexPriData = true;
            }
          });

        }, 10000);

        // this.onlineOffline = true;
      } else {
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

        this.showAllData = true;
        this.hideFedexEcoData = true;
        this.hideFedexPriData = true;
      }
    });
    if (this.applyCostPlusForFedexEco === false || this.applyCostPlusForFedexPri === false) {
      this.pricingInfoService.getRates(this.userData, 'FEDEX AR').subscribe((response:any) => {
        console.log('RESPONSE FEDEX AR', response);
        let fedexArTimestamp = new Date();
        console.log('RESPONSE TIME FOR FEDEX AR', fedexArTimestamp);
        this.logger = { 'method': 'getRates', 'message': 'FEDEX AP', 'response': 'Pass', 'timeStamp': fedexArTimestamp };
        this.loggerService.info(this.logger);
        if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          this.showAllData = true;
          // this.hideFedexEcoData = true;
          // this.hideFedexPriData = true;
          this.showFedexPriData = false;
          this.showFedexEcoData = false;
          this.nofedexpriData = true;

        } else {
          this.nofedexpriData = false;

        if (Object.keys(response.result).length === 0 || response.result === undefined) {
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          this.showAllData = true;
          this.hideFedexEcoData = true;
          this.hideFedexPriData = true;
          this.showFedexPriData = false;
          this.showFedexEcoData = false;
        } else {
          let objectForEco = this.userData;
          // let econo
          objectForEco.carrier = "FEDEX ECONOMY"
          this.pricingInfoService.getTransitTime(objectForEco).subscribe((response:any) => {
            console.log('transitTime', object);
            this.transitTimeFedexEconomy = response;
            console.log(this.transitTimeFedexEconomy);
            if (this.transitTimeFedexEconomy.result !== false) {
              this.split = this.transitTimeFedexEconomy.result.split('_');
              // this.transitTimeFedexEconomy.fedexEconomyResult = Number(this.split[0]);
              this.numbersArray.forEach((elem:any) =>{
                console.log(elem.name , this.split[0]);
                console.log(typeof(elem.name), typeof(this.split[0]));
                if (this.transitTimeFedexEconomy.fedexEconomyResult !== 'NA') {
                if(elem.name === this.split[0]){
                  this.transitTimeFedexEconomy.fedexEconomyResult = elem.id;
                  // return;
                }
                //  else {
                //   this.transitTimeFedexEconomy.fedexEconomyResult = 'NA';

                // }
              }
              })
            } else {
              this.transitTimeFedexEconomy.fedexEconomyResult = 'NA';
            }
            console.log('time', this.transitTimeFedexEconomy);
          }, (err:any) => {
            this.transitTimeFedexEconomy.fedexEconomyResult = 'NA';
          })

          let object = this.userData;
          object.carrier = "FEDEX PRIORITY"
          this.pricingInfoService.getTransitTime(object).subscribe((response:any) => {
            console.log('transitTime', object);
            this.transitTimeFedexPriority = response;
            if (this.transitTimeFedexPriority.result !== false) {
              this.split = this.transitTimeFedexPriority.result.split('_');
              this.numbersArray.forEach((elem:any) =>{
                if(elem.name === this.split[0]){
                  this.transitTimeFedexPriority.fedexPriorityResult = elem.id;
                } 
                // else {
                //   this.transitTimeFedexPriority.fedexPriorityResult = 'NA';

                // }
              })
              // this.transitTimeFedexPriority.fedexPriorityResult = wordsToNumbers(this.split[0]);
            } else {
              this.transitTimeFedexPriority.fedexPriorityResult = 'NA';
            }
            console.log('time', this.transitTimeFedexPriority);
          }, (err:any) => {
            this.transitTimeFedexPriority.fedexPriorityResult = 'NA';
          })
          if (this.applyCostPlusForFedexEco === false) {
          this.rateCalculationForFedex(response, 'FEDEX ECONOMY', 'AR', 'AR');
        } 
        if (this.applyCostPlusForFedexPri === false) {
            this.rateCalculationForFedex(response, 'FEDEX PRIORITY', 'AR', 'AR');
        }
        }
      }
      }, (err:any) => {
        this.logger = { 'method': 'getRates', 'message': 'Fedex AR error response', 'status': err.status };
        this.loggerService.error(this.logger);
        // document.getElementById('myDiv').className = 'imgBlock';
        if (err.status === 0) {
          // this.showErrorInternetConnection = true;
          // this.getQuote(transportOrigin, selectedItems, pricingDetail);
          setTimeout(() => {
            // this.getQuote(transportOrigin, selectedItems, pricingDetail);
            this.pricingInfoService.getRates(this.userData, 'FEDEX AR').subscribe((response:any) => {
              console.log('RESPONSE FEDEX AR', response);
              let fedexArTimestamp = new Date();
              console.log('RESPONSE TIME FOR FEDEX AR', fedexArTimestamp);
              this.logger = { 'method': 'getRates', 'message': 'FEDEX AP', 'response': 'Pass', 'timeStamp': fedexArTimestamp };
              this.loggerService.info(this.logger);
              if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
                (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                this.showAllData = true;
                // this.hideFedexEcoData = true;
                // this.hideFedexPriData = true;
                this.showFedexPriData = false;
                this.showFedexEcoData = false;
                this.nofedexpriData = true;
      
              } else {
                this.nofedexpriData = false;
              if (Object.keys(response.result).length === 0 || response.result === undefined) {
                (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                this.showAllData = true;
                this.hideFedexEcoData = true;
                this.hideFedexPriData = true;
                this.showFedexPriData = false;
                this.showFedexEcoData = false;
              } else {
                let objectForEco = this.userData;
                objectForEco.carrier = "FEDEX ECONOMY"
                this.pricingInfoService.getTransitTime(objectForEco).subscribe((response:any) => {
                  console.log('transitTime', object);
                  this.transitTimeFedexEconomy = response;
                  if (this.transitTimeFedexEconomy.result !== false) {
                    this.split = this.transitTimeFedexEconomy.result.split('_');
                    this.numbersArray.forEach((elem:any) =>{
                      if(elem.name === this.split[0]){
                        this.transitTimeFedexEconomy.fedexEconomyResult = elem.id;
                      } 
                      // else {
                      //   this.transitTimeFedexEconomy.fedexEconomyResult = 'NA';
      
                      // }
                    })
                    // this.transitTimeFedexEconomy.fedexEconomyResult = wordsToNumbers(this.split[0]);
                  } else {
                    this.transitTimeFedexEconomy.fedexEconomyResult = 'NA';
                  }
                  console.log('time', this.transitTimeFedexEconomy);
                }, (err:any) => {
                  this.transitTimeFedexEconomy.fedexEconomyResult = 'NA';
                })
      
                let object = this.userData;
                object.carrier = "FEDEX PRIORITY"
                this.pricingInfoService.getTransitTime(object).subscribe((response:any) => {
                  console.log('transitTime', object);
                  this.transitTimeFedexPriority = response;
                  if (this.transitTimeFedexPriority.result !== false) {
                    this.split = this.transitTimeFedexPriority.result.split('_');
                    this.numbersArray.forEach((elem:any) =>{
                      if(elem.name === this.split[0]){
                        this.transitTimeFedexPriority.fedexPriorityResult = elem.id;
                      } 
                      // else {
                      //   this.transitTimeFedexPriority.fedexPriorityResult = 'NA';
      
                      // }
                    })
                    // this.transitTimeFedexPriority.fedexPriorityResult = wordsToNumbers(this.split[0]);
                  } else {
                    this.transitTimeFedexPriority.fedexPriorityResult = 'NA';
                  }
                  console.log('time', this.transitTimeFedexPriority);
                }, (err:any) => {
                  this.transitTimeFedexPriority.fedexPriorityResult = 'NA';
                })
                if (this.applyCostPlusForFedexEco === false) {
                this.rateCalculationForFedex(response, 'FEDEX ECONOMY', 'AR', 'AR');
              } 
              if (this.applyCostPlusForFedexPri === false) {
                  this.rateCalculationForFedex(response, 'FEDEX PRIORITY', 'AR', 'AR');
              }
              }
            }
            }, (err:any) => {
              this.nofedexpriData = false;

              this.logger = { 'method': 'getRates', 'message': 'Fedex AR error response', 'status': err.status };
              this.loggerService.error(this.logger);
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              if (err.status === 0) {
                this.showErrorInternetConnection = true;   
                this.onlineOffline = true;
              } else {
                this.showAllData = true;
                this.hideFedexEcoData = true;
                this.hideFedexPriData = true;
              }
            });
  
          }, 10000);

          // this.onlineOffline = true;
        } else {
          this.nofedexpriData = false;

          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          this.showAllData = true;
          this.hideFedexEcoData = true;
          this.hideFedexPriData = true;
        }
      });
    }

    this.pricingInfoService.getRatesnew(this.userData, 'REDDAWAY AP').subscribe((response:any) => {
      console.log('RESPONSE REDDAWAY AP', response);
      let reddawayApTimestamp = new Date();
      console.log('RESPONSE TIME For REDDAWAY AP', reddawayApTimestamp);
      this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AP', 'response': 'Pass', 'timeStamp': reddawayApTimestamp };
      this.loggerService.info(this.logger);
      if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

        this.showAllData = true;
        this.showReddawayData = false;
        this.noredShipmentData = true;
        // this.hideReddawayData = true;
      } else {
        this.noredShipmentData = false;
      if (Object.keys(response.result).length === 0 || response.result === undefined) {
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
        this.showAllData = true;
        this.showReddawayData = false;
        this.hideReddawayData = true;
      } else {
        this.reddawayResponse = response.result;
        if (response.result === 'service not available') {
          this.showReddawayData = false;
          this.hideReddawayData = false;
          this.viewAllShowReddawayData = false;
        } else {
          this.rateCalculationForYRCReddaway1(response, 'REDDAWAY', 'AP', 'AP');
          if (this.applyCostPlusForReddaway === true) {
            let object = this.userData;
            object.carrier = "REDDAWAY";
            this.pricingInfoService.getSingleShipment(object).subscribe((data:any) => {
              this.getRuleForReddawayAR = data.result;
              this.rateCalculationForYRCReddaway1(response, 'REDDAWAY', 'AP', 'COSTPLUS');
            }, (err:any) => {
              this.getRuleForReddawayAR = [];
              this.rateCalculationForYRCReddaway1(response, 'REDDAWAY', 'AP', 'COSTPLUS');
            });
            this.pricingInfoService.getTransitTime(object).subscribe((response:any) => {
              console.log('transitTime', object);
              this.transitTimeReddaway = response;
              if (this.transitTimeReddaway.result !== false) {
                this.transitTimeReddaway.reddawayResult = this.transitTimeReddaway.result;
              } else {
                this.transitTimeReddaway.reddawayResult = 'NA';
              }
              console.log('time', this.transitTime);
            }, (err:any) => {
              this.transitTimeReddaway.reddawayResult = 'NA';
            })
           
          }
        }
      }
    }
    }, (err:any) => {
      this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AP Error', 'status': err.status };
      this.loggerService.error(this.logger);
      // document.getElementById('myDiv').className = 'imgBlock';
      if (err.status === 0) {
        // this.showErrorInternetConnection = true;
        // this.getQuote(transportOrigin, selectedItems, pricingDetail);
        setTimeout(() => {
          this.pricingInfoService.getRatesnew(this.userData, 'REDDAWAY AP').subscribe((response:any) => {
            console.log('RESPONSE REDDAWAY AP', response);
            let reddawayApTimestamp = new Date();
            console.log('RESPONSE TIME For REDDAWAY AP', reddawayApTimestamp);
            this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AP', 'response': 'Pass', 'timeStamp': reddawayApTimestamp };
            this.loggerService.info(this.logger);
            if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              this.showAllData = true;
              this.showReddawayData = false;
              // this.hideReddawayData = true;
              this.noredShipmentData = true;
            } else {
            if (Object.keys(response.result).length === 0 || response.result === undefined) {
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              this.showAllData = true;
              this.showReddawayData = false;
              this.hideReddawayData = true;
            } else {
              this.reddawayResponse = response.result;
              if (response.result === 'service not available') {
                this.showReddawayData = false;
                this.hideReddawayData = false;
                this.viewAllShowReddawayData = false;
              } else {
                this.rateCalculationForYRCReddaway1(response, 'REDDAWAY', 'AP', 'AP');
                if (this.applyCostPlusForReddaway === true) {
                  let object = this.userData;
                  object.carrier = "REDDAWAY";
                  this.pricingInfoService.getSingleShipment(object).subscribe((data:any) => {
                    this.getRuleForReddawayAR = data.result;
                    this.rateCalculationForYRCReddaway1(response, 'REDDAWAY', 'AP', 'COSTPLUS');
                  }, (err:any) => {
                    this.getRuleForReddawayAR = [];
                    this.rateCalculationForYRCReddaway1(response, 'REDDAWAY', 'AP', 'COSTPLUS');
                  });
                  this.pricingInfoService.getTransitTime(object).subscribe((response:any) => {
                    console.log('transitTime', object);
                    this.transitTimeReddaway = response;
                    if (this.transitTimeReddaway.result !== false) {
                      this.transitTimeReddaway.reddawayResult = this.transitTimeReddaway.result;
                    } else {
                      this.transitTimeReddaway.reddawayResult = 'NA';
                    }
                    console.log('time', this.transitTime);
                  }, (err:any) => {
                    this.transitTimeReddaway.reddawayResult = 'NA';
                  })
                 
                }
              }
            }
          }
          }, (err:any) => {
            this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AP Error', 'status': err.status };
            this.loggerService.error(this.logger);
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
            if (err.status === 0) {
              this.showErrorInternetConnection = true;
              // this.getQuote(transportOrigin, selectedItems, pricingDetail);
              // setTimeout(() => {
      
              // }, 3000);
      
              this.onlineOffline = true;
            } else {
              this.showAllData = true;
              this.hideReddawayData = true;
            }
          });
        }, 10000);

        // this.onlineOffline = true;
      } else {
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

        this.showAllData = true;
        this.hideReddawayData = true;
      }
    });
    this.pricingInfoService.getRates(this.userData, 'REDDAWAY OLDAP').subscribe((response:any) => {
      console.log('RESPONSE REDDAWAY AP', response);
      let reddawayApTimestamp = new Date();
      console.log('RESPONSE TIME For REDDAWAY AP', reddawayApTimestamp);
      this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AP', 'response': 'Pass', 'timeStamp': reddawayApTimestamp };
      this.loggerService.info(this.logger);
      if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

        this.showAllData = true;
        this.showReddawayData = false;
        this.noredShipmentData = true;
        // this.hideReddawayData = true;
      } else {
        this.noredShipmentData = false;
      if (Object.keys(response.result).length === 0 || response.result === undefined) {
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
        this.showAllData = true;
        this.showReddawayData = false;
        this.hideReddawayData = true;
      } else {
        this.reddawayResponse = response.result;
        if (response.result === 'service not available') {
          this.showReddawayData = false;
          this.hideReddawayData = false;
          this.viewAllShowReddawayData = false;
        } else {
          this.rateCalculationForYRCReddaway2(response, 'REDDAWAY', 'AP', 'AP');
          if (this.applyCostPlusForReddaway === true) {
            let object = this.userData;
            object.carrier = "REDDAWAY";
            this.pricingInfoService.getSingleShipment(object).subscribe((data:any) => {
              this.getRuleForReddawayAR = data.result;
              this.rateCalculationForYRCReddawayCostplus(response, 'REDDAWAY', 'AP', 'COSTPLUS');
            }, (err:any) => {
              this.getRuleForReddawayAR = [];
              this.rateCalculationForYRCReddawayCostplus(response, 'REDDAWAY', 'AP', 'COSTPLUS');
            });
            this.pricingInfoService.getTransitTime(object).subscribe((response:any) => {
              console.log('transitTime', object);
              this.transitTimeReddaway = response;
              if (this.transitTimeReddaway.result !== false) {
                this.transitTimeReddaway.reddawayResult = this.transitTimeReddaway.result;
              } else {
                this.transitTimeReddaway.reddawayResult = 'NA';
              }
              console.log('time', this.transitTime);
            }, (err:any) => {
              this.transitTimeReddaway.reddawayResult = 'NA';
            })
           
          }
        }
      }
    }
    }, (err:any) => {
      this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AP Error', 'status': err.status };
      this.loggerService.error(this.logger);
      // document.getElementById('myDiv').className = 'imgBlock';
      if (err.status === 0) {
        // this.showErrorInternetConnection = true;
        // this.getQuote(transportOrigin, selectedItems, pricingDetail);
        setTimeout(() => {
          this.pricingInfoService.getRates(this.userData, 'REDDAWAY OLDAP').subscribe((response:any) => {
            console.log('RESPONSE REDDAWAY AP', response);
            let reddawayApTimestamp = new Date();
            console.log('RESPONSE TIME For REDDAWAY AP', reddawayApTimestamp);
            this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AP', 'response': 'Pass', 'timeStamp': reddawayApTimestamp };
            this.loggerService.info(this.logger);
            if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              this.showAllData = true;
              this.showReddawayData = false;
              // this.hideReddawayData = true;
              this.noredShipmentData = true;
            } else {
            if (Object.keys(response.result).length === 0 || response.result === undefined) {
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              this.showAllData = true;
              this.showReddawayData = false;
              this.hideReddawayData = true;
            } else {
              this.reddawayResponse = response.result;
              if (response.result === 'service not available') {
                this.showReddawayData = false;
                this.hideReddawayData = false;
                this.viewAllShowReddawayData = false;
              } else {
                this.rateCalculationForYRCReddaway2(response, 'REDDAWAY', 'AP', 'AP');
                if (this.applyCostPlusForReddaway === true) {
                  let object = this.userData;
                  object.carrier = "REDDAWAY";
                  this.pricingInfoService.getSingleShipment(object).subscribe((data:any) => {
                    this.getRuleForReddawayAR = data.result;
                    this.rateCalculationForYRCReddawayCostplus(response, 'REDDAWAY', 'AP', 'COSTPLUS');
                  }, (err:any) => {
                    this.getRuleForReddawayAR = [];
                    this.rateCalculationForYRCReddawayCostplus(response, 'REDDAWAY', 'AP', 'COSTPLUS');
                  });
                  this.pricingInfoService.getTransitTime(object).subscribe((response:any) => {
                    console.log('transitTime', object);
                    this.transitTimeReddaway = response;
                    if (this.transitTimeReddaway.result !== false) {
                      this.transitTimeReddaway.reddawayResult = this.transitTimeReddaway.result;
                    } else {
                      this.transitTimeReddaway.reddawayResult = 'NA';
                    }
                    console.log('time', this.transitTime);
                  }, (err:any) => {
                    this.transitTimeReddaway.reddawayResult = 'NA';
                  })
                 
                }
              }
            }
          }
          }, (err:any) => {
            this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AP Error', 'status': err.status };
            this.loggerService.error(this.logger);
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
            if (err.status === 0) {
              this.showErrorInternetConnection = true;
              // this.getQuote(transportOrigin, selectedItems, pricingDetail);
              // setTimeout(() => {
      
              // }, 3000);
      
              this.onlineOffline = true;
            } else {
              this.showAllData = true;
              this.hideReddawayData = true;
            }
          });
        }, 10000);

        // this.onlineOffline = true;
      } else {
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

        this.showAllData = true;
        this.hideReddawayData = true;
      }
    });
    if (this.applyCostPlusForReddaway === false) {
      this.pricingInfoService.getRates(this.userData, 'REDDAWAY AR').subscribe((response:any) => {
        console.log('REQUEST REDDAWAY AR', response);
        let reddawayArTimestamp = new Date();
        console.log('RESPONSE TIME FOR REDDAWAY AR', reddawayArTimestamp);
        this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AR', 'response': 'Pass', 'timeStamp': reddawayArTimestamp };
        this.loggerService.info(this.logger);
        if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

          this.showAllData = true;
          this.showReddawayData = false;
          this.noredShipmentData = true;
          // this.hideReddawayData = true;
        } else {
          this.noredShipmentData = false;
        if (Object.keys(response.result).length === 0 || response.result === undefined) {
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          this.showAllData = true;
          this.hideReddawayData = true;
          this.showReddawayDataAR = false;
        } else {
          this.reddawayResponse = response.result;
          if (response.result === 'service not available') {
            this.showReddawayDataAR = false;
            this.hideReddawayDataAR = false;
            this.viewAllShowReddawayData = false;
            this.pricingInfoService.reddawayMail(this.userData, this.accessToken).subscribe((mailResponse:any) => {
              console.log('response', mailResponse);
              if (mailResponse.result === 'true') {
                console.log('response', mailResponse);
              }
            });
          } else {
            let object = this.userData;
            object.carrier = "REDDAWAY"
            this.pricingInfoService.getTransitTime(object).subscribe((response:any) => {
              console.log('transitTime', object);
              this.transitTimeReddaway = response;
              if (this.transitTimeReddaway.result !== false) {
                this.transitTimeReddaway.reddawayResult = this.transitTimeReddaway.result;
              } else {
                this.transitTimeReddaway.reddawayResult = 'NA';
              }
              console.log('time', this.transitTime);
            }, (err:any) => {
              this.transitTimeReddaway.reddawayResult = 'NA';
            })
            this.rateCalculationForYRCReddaway(response, 'REDDAWAY', 'AR', 'AR');
          }
        }
      }
      }, (err:any) => {
        this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AR Error response', 'status': err.status };
        this.loggerService.error(this.logger);
        // document.getElementById('myDiv').className = 'imgBlock';
        if (err.status === 0) {
          // this.showErrorInternetConnection = true;
          // this.getQuote(transportOrigin, selectedItems, pricingDetail);
          setTimeout(() => {
            this.pricingInfoService.getRates(this.userData, 'REDDAWAY AR').subscribe((response:any) => {
              console.log('REQUEST REDDAWAY AR', response);
              let reddawayArTimestamp = new Date();
              console.log('RESPONSE TIME FOR REDDAWAY AR', reddawayArTimestamp);
              this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AR', 'response': 'Pass', 'timeStamp': reddawayArTimestamp };
              this.loggerService.info(this.logger);
              if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
                (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
      
                this.showAllData = true;
                this.showReddawayData = false;
                // this.hideReddawayData = true;
                this.noredShipmentData = true;
              } else {
                this.noredShipmentData = false;
              if (Object.keys(response.result).length === 0 || response.result === undefined) {
                (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                this.showAllData = true;
                this.hideReddawayData = true;
                this.showReddawayDataAR = false;
              } else {
                this.reddawayResponse = response.result;
                if (response.result === 'service not available') {
                  this.showReddawayDataAR = false;
                  this.hideReddawayDataAR = false;
                  this.viewAllShowReddawayData = false;
                  this.pricingInfoService.reddawayMail(this.userData, this.accessToken).subscribe((mailResponse:any) => {
                    console.log('response', mailResponse);
                    if (mailResponse.result === 'true') {
                      console.log('response', mailResponse);
                    }
                  });
                } else {
                  let object = this.userData;
                  object.carrier = "REDDAWAY"
                  this.pricingInfoService.getTransitTime(object).subscribe((response:any) => {
                    console.log('transitTime', object);
                    this.transitTimeReddaway = response;
                    if (this.transitTimeReddaway.result !== false) {
                      this.transitTimeReddaway.reddawayResult = this.transitTimeReddaway.result;
                    } else {
                      this.transitTimeReddaway.reddawayResult = 'NA';
                    }
                    console.log('time', this.transitTime);
                  }, (err:any) => {
                    this.transitTimeReddaway.reddawayResult = 'NA';
                  })
                  this.rateCalculationForYRCReddaway(response, 'REDDAWAY', 'AR', 'AR');
                }
              }
            }
            }, (err:any) => {
              this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AR Error response', 'status': err.status };
              this.loggerService.error(this.logger);
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              if (err.status === 0) {
                this.showErrorInternetConnection = true;
                // this.getQuote(transportOrigin, selectedItems, pricingDetail);
                // setTimeout(() => {
                //   this.getQuote(transportOrigin, selectedItems, pricingDetail);
        
                // }, 3000);
      
                this.onlineOffline = true;
              } else {
                this.showAllData = true;
                this.hideReddawayData = true;
              }
            });  
          }, 10000);

          // this.onlineOffline = true;
        } else {
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

          this.showAllData = true;
          this.hideReddawayData = true;
        }
      });
    }
  }

  rateCalculationForYRCReddaway(response:any, carrierType:any, category:any, factoring:any) {
    let date = new Date();
    console.log('RATE CALCULATION TIME FOR YRC', date, response, carrierType, category, factoring);
    let discount, fuelSurcharge, rateId, amc, highCost, addCACharge, addRate, discountedRate,
      addSingleShipmentCharge, minimumClass, totalAssessorialCharge, assessorialCharge, customerBusinessRule:any = [], assessorialChargeArray = [], profileAssessorials = [];
    const weightArray = [], classificationArray = [], classification1 = [], finalRateArray = [], discountedRateArray = [],
      netChargeArray = [], netChargeResultArray = [], totalChargeArray = [];
    let finalRate = [], rate = [], crtRateArray = [], fuelSurchargeArray = [];
    const diffFinalRateArray = [], diffRateArray = [], discountArray = [], diffWeightArray = [];
    let profileMinimumCharge, profileLifeGateCharge, profileResidentialCharge, profileLimitedAccessDelivery,
      profileInsideDelivery, profileNotify, profileSingleShipment, singleShipmentsetMasterData, profiledeliveryAppointmentRequired,profilehazmat,profileLiftGatePickupCharge,profileResidentialPickupcharge,profilelimitedpickup;
    let currentFinalRate, currentRate, currentFinalDwRate, currentDwRate;
    let discountedRateCalculation;
    this.parseSetMasterData = [];
    this.showDirections = '';
    this.showCACharge = false;
    this.showHighCostDelivery = false;
    this.showDeficitValue = false;
    this.showMinimumCharge = false;
    this.hideYrcData = false;
    this.arrayData = [];
    const setMasterData:any = localStorage.getItem('artableData');
    this.localStorageArData = JSON.parse(setMasterData);
    if (category === 'AP') {
      /*set master data discount, minimum charge values which is stored in local storage */
      const setMasterData:any = localStorage.getItem('aptableData');
      this.parseSetMasterData = JSON.parse(setMasterData);
      console.log('this.parseSetMasterData YRC', this.parseSetMasterData);
      if (carrierType === 'YRC') {
        console.log('customerBusinessRule AP', response.result.yrcProfileRateAp);
        /* YRC AP customer rule will be as object it may contain discount, mc or it will return as empty {}*/
        if (Object.keys(response.result.yrcProfileRateAp).length === 0 || response.result.yrcProfileRateAp === '') {
          customerBusinessRule = [];
          console.log('customerBusinessRule', customerBusinessRule);
        } else {
          /*For yrc AP thr is no assessorial charges so inorder to calculate for all carrier,
          have added empty variable on it so that static values will be taken*/
          /*Customer specific rules*/
          if (response.result.yrcProfileRateAp.liftGateService !== undefined) {
            customerBusinessRule.push(response.result.yrcProfileRateAp);
            console.log('customerBusinessRule AP Else', customerBusinessRule);
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
            console.log('customerBusinessRule AP Else', customerBusinessRule);
          }
        }
      } else {
        customerBusinessRule = response.result.reddawayProfileRateAp;
        console.log('customerBusinessRule AP', customerBusinessRule);
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
        } 
      } else {
        customerBusinessRule = response.result.reddawayProfileRateAr;
        console.log('customerBusinessRule AR', customerBusinessRule);
      }
    }
    if (factoring !== 'COSTPLUS') {
      for (let i = 0; i < this.parseSetMasterData.length; i++) {
        if (this.parseSetMasterData[i].companyName === carrierType) {
          discount = this.parseSetMasterData[i].discount;
          fuelSurcharge = this.parseSetMasterData[i].fuelsurcharge;
          rateId = this.parseSetMasterData[i].recentRateId;
          amc = this.parseSetMasterData[i].amc;
          this.parseSetMasterData.assessorials = JSON.parse(this.parseSetMasterData[i].assessorials);
          console.log('this.parseSetMasterData.assessorials', this.parseSetMasterData.assessorials);
          if (this.parseSetMasterData.assessorials.length > 0) {
            for (let i = 0; i < this.parseSetMasterData.assessorials.length; i++) {
              if (this.parseSetMasterData.assessorials[i].name === 'Single Shipment') {
                singleShipmentsetMasterData = this.parseSetMasterData.assessorials[i];
                break;
              } else {
                singleShipmentsetMasterData = '';
              }
            }
          };
          this.profile = {
            companyName: carrierType, discount: discount,
            fuelsurcharge: fuelSurcharge, recentRateId: rateId, amc: amc, type: category
          };
          if (this.filterValues.state === 'CA' || this.filterValuesDest.state === 'CA') {
            if (this.parseSetMasterData[i].caCharge !== '' && this.parseSetMasterData[i].caCharge !== null && this.parseSetMasterData[i].caCharge !== undefined) {
              addCACharge = Number(this.parseSetMasterData[i].caCharge);
            } else {
              addCACharge = 0;
            }
          } else {
            addCACharge = 0;
          }
        }
        this.changeArValues(this.profile);
      }
    } else {
		for (let apData = 0; apData < this.parseSetMasterData.length; apData++) {
		if (this.parseSetMasterData[apData].companyName === carrierType) {
          discount = this.parseSetMasterData[apData].discount;
          fuelSurcharge = this.parseSetMasterData[apData].fuelsurcharge;
          rateId = this.parseSetMasterData[apData].recentRateId;
          amc = this.parseSetMasterData[apData].amc;
		  // if (this.parseSetMasterData.assessorials.length > 0) {
      //       for (let i = 0; i < this.parseSetMasterData.assessorials.length; i++) {
      //         if (this.parseSetMasterData.assessorials[i].name === 'Single Shipment') {
      //           singleShipmentsetMasterData = this.parseSetMasterData.assessorials[i];
      //           break;
      //         } else {
      //           singleShipmentsetMasterData = '';
      //         }
      //       }
      //     };
		  }
		   this.profile = {
            companyName: carrierType, discount: discount,
            fuelsurcharge: fuelSurcharge, recentRateId: rateId, amc: amc, type: category
          };
          this.changeArValues(this.profile);
		}
      for (let i = 0; i < this.localStorageArData.length; i++) {
        if (this.localStorageArData[i].companyName === carrierType) {
          this.localStorageArData.assessorials = JSON.parse(this.localStorageArData[i].assessorials);
          if (this.localStorageArData.assessorials.length > 0) {
            for (let i = 0; i < this.localStorageArData.assessorials.length; i++) {
              if (this.localStorageArData.assessorials[i].name === 'Single Shipment') {
                singleShipmentsetMasterData = this.localStorageArData.assessorials[i];
                console.log('singleShipmentMasterData', singleShipmentsetMasterData);
                break;
              } else {
                singleShipmentsetMasterData = '';
              }
            }
          }
          if (this.filterValues.state === 'CA' || this.filterValuesDest.state === 'CA') {
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
      } else if (Number(additionalRateCalculation) > Number(response.result.additionalMaxRate)){
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
            { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7},
            {hazmat: profilehazmat, 'id':8},
            {liftGatePickup: profileLiftGatePickupCharge, 'id': 10},
            {residentialPickup: profileResidentialPickupcharge, 'id': 11},
            {limitedaccesspickup: profilelimitedpickup, 'id': 12});
          this.profile = {};
          this.profile = {
            companyName: carrierType, fuelsurcharge: fuelSurcharge, type: category,
            recentRateId: rateId, discount: discount, amc: profileMinimumCharge
          };
          this.changeArValues(this.profile);
        } else {
          if (carrierType === 'YRC') {
            if (this.getRuleForYRCAR.length > 0) {
              profileLifeGateCharge = this.getRuleForYRCAR[0].liftGateService;
              profileResidentialCharge = this.getRuleForYRCAR[0].residentialDelivery;
              profileLimitedAccessDelivery = this.getRuleForYRCAR[0].limitedAccessDelivery;
              profileInsideDelivery = this.getRuleForYRCAR[0].insideDelivery;
              profileNotify = this.getRuleForYRCAR[0].notify;
              profileSingleShipment = this.getRuleForYRCAR[0].singleShipment;
              profiledeliveryAppointmentRequired = this.getRuleForYRCAR[0].deliveryAppointmentRequired;
              profilehazmat = this.getRuleForYRCAR[0].hazmat;
              profileLiftGatePickupCharge = this.getRuleForYRCAR[0].liftGateService;
              profileResidentialPickupcharge = this.getRuleForYRCAR[0].residentialDelivery;
              profilelimitedpickup = this.getRuleForYRCAR[0].limitedAccessDelivery;
              profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                { residential: profileResidentialCharge, id: 2 },
                { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
                { insideDelivery: profileInsideDelivery, id: 4 },
                { notify: profileNotify, id: 5 },
                { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7},
                {hazmat: profilehazmat, 'id':8},
                {liftGatePickup: profileLiftGatePickupCharge, 'id': 10},
            {residentialPickup: profileResidentialPickupcharge, 'id': 11},
            {limitedaccesspickup: profilelimitedpickup, 'id': 12});
              this.profile = {};
              this.profile = {
                companyName: carrierType, fuelsurcharge: fuelSurcharge, type: category,
                recentRateId: rateId, discount: discount, amc: profileMinimumCharge
              };
            } else {
              profileAssessorials.push({ liftGate: '', 'id': 1 },
                { residential: '', 'id': 2 },
                { limitedAccessDelivery: '', 'id': 3 },
                { insideDelivery: '', id: 4 },
                { notify: '', 'id': 5 },
                { deliveryAppointmentRequired: '', 'id': 7},
                {hazmat: '', 'id':8},
                {liftGatePickup: '', 'id': 10},
            {residentialPickup: '', 'id': 11},
            {limitedaccesspickup: '', 'id': 12}
                );
              this.profile = {
                companyName: carrierType, fuelsurcharge: fuelSurcharge, type: category,
                recentRateId: rateId, discount: discount, amc: profileMinimumCharge
              };
            }
          } else {
            if (carrierType === 'REDDAWAY') {
              if (this.getRuleForReddawayAR.length > 0) {
                profileLifeGateCharge = this.getRuleForReddawayAR[0].liftGateService;
                profileResidentialCharge = this.getRuleForReddawayAR[0].residentialDelivery;
                profileLimitedAccessDelivery = this.getRuleForReddawayAR[0].limitedAccessDelivery;
                profileInsideDelivery = this.getRuleForReddawayAR[0].insideDelivery;
                profileNotify = this.getRuleForReddawayAR[0].notify;
                profileSingleShipment = this.getRuleForReddawayAR[0].singleShipment;
                profiledeliveryAppointmentRequired = this.getRuleForReddawayAR[0].deliveryAppointmentRequired;
                profilehazmat = this.getRuleForReddawayAR[0].hazmat;
                profileLiftGatePickupCharge = this.getRuleForReddawayAR[0].liftGateService;
              profileResidentialPickupcharge = this.getRuleForReddawayAR[0].residentialDelivery;
              profilelimitedpickup = this.getRuleForReddawayAR[0].limitedAccessDelivery;

                profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                  { residential: profileResidentialCharge, id: 2 },
                  { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
                  { insideDelivery: profileInsideDelivery, id: 4 },
                  { notify: profileNotify, id: 5 },
                  {deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id: 7},
                  {hazmat: profilehazmat, id:8},
                  {liftGatePickup: profileLiftGatePickupCharge, 'id': 10},
                  {residentialPickup: profileResidentialPickupcharge, 'id': 11},
                  {limitedaccesspickup: profilelimitedpickup, 'id': 12});
                this.profile = {};
                this.profile = {
                  companyName: carrierType, fuelsurcharge: fuelSurcharge, type: category,
                  recentRateId: rateId, discount: discount, amc: profileMinimumCharge
                };
              } else {
                profileAssessorials.push({ liftGate: '', 'id': 1 },
                  { residential: '', 'id': 2 },
                  { limitedAccessDelivery: '', 'id': 3 },
                  { insideDelivery: '', id: 4 },
                  { notify: '', 'id': 5 },
                   {deliveryAppointmentRequired: '', 'id': 7},
                   {hamzt:'','id':8},
                   {liftGatePickup: '', 'id': 10},
                   {residentialPickup: '', 'id': 11},
                   {limitedaccesspickup: '', 'id': 12});
                this.profile = {
                  companyName: carrierType, fuelsurcharge: fuelSurcharge, type: category,
                  recentRateId: rateId, discount: discount, amc: profileMinimumCharge
                };
              }
            }
          }
          }  
        } 
      } else {
          if (response.result.shipTypes === 'Direct') {
            this.showDirections = 'Direct';
            discount = discount;
            fuelSurcharge = fuelSurcharge;
            this.profile = {
              companyName: carrierType, discount: discount,
              fuelsurcharge: fuelSurcharge, recentRateId: rateId, amc: amc, type: category
            };
            this.changeArValues(this.profile);
          } else {
            this.showDirections = 'Non-Direct';
            discount = 0;
            fuelSurcharge = fuelSurcharge;
            this.profile = {
              companyName: carrierType, discount: discount,
              fuelsurcharge: fuelSurcharge, recentRateId: rateId, amc: amc, type: category
            };
            this.changeArValues(this.profile);
          }
          if (factoring === 'COSTPLUS') {
            if (carrierType === 'YRC') {
              if (this.getRuleForYRCAR.length > 0) {
                profileLifeGateCharge = this.getRuleForYRCAR[0].liftGateService;
                profileLiftGatePickupCharge = this.getRuleForYRCAR[0].liftGateService;
                profileResidentialCharge = this.getRuleForYRCAR[0].residentialDelivery;
                profileLimitedAccessDelivery = this.getRuleForYRCAR[0].limitedAccessDelivery;
                profileInsideDelivery = this.getRuleForYRCAR[0].insideDelivery;
                profileNotify = this.getRuleForYRCAR[0].notify;
                profileSingleShipment = this.getRuleForYRCAR[0].singleShipment;
                profiledeliveryAppointmentRequired = this.getRuleForYRCAR[0].deliveryAppointmentRequired;
                profilehazmat = this.getRuleForYRCAR[0].hazmat;
                profileResidentialPickupcharge = this.getRuleForYRCAR[0].residentialDelivery;
                profileLiftGatePickupCharge = this.getRuleForYRCAR[0].liftGateService;
              profilelimitedpickup = this.getRuleForYRCAR[0].limitedAccessDelivery;
                profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                 {liftGatePickup: profileLiftGatePickupCharge, id: 10},
                  { residential: profileResidentialCharge, id: 2 },
                  { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
                  { insideDelivery: profileInsideDelivery, id: 4 },
                  { notify: profileNotify, id: 5 },
                  { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id : 7},
                  {hazmat: profilehazmat,id:8},
                  {liftGatePickup: profileLiftGatePickupCharge, 'id': 10},
                  {residentialPickup: profileResidentialPickupcharge, 'id': 11},
                  {limitedaccesspickup: profilelimitedpickup, 'id': 12});
              } else {
                profileAssessorials.push({ liftGate: '', 'id': 1 },
                  { residential: '', 'id': 2 },
                  { limitedAccessDelivery: '', 'id': 3 },
                  { insideDelivery: '', id: 4 },
                  { notify: '', 'id': 5 },
                  {deliveryAppointmentRequired: '' , 'id': 7},
                  {hazmat:'', 'id': 8},
                  {liftGatePickup: '', 'id': 10},
                  {residentialPickup: '', 'id': 11},
                  {limitedaccesspickup: '', 'id': 12}
                  );
              }
            } else {
              if (carrierType === 'REDDAWAY') {
                if (this.getRuleForReddawayAR.length > 0) {
                  profileLifeGateCharge = this.getRuleForReddawayAR[0].liftGateService;
                  profileResidentialCharge = this.getRuleForReddawayAR[0].residentialDelivery;
                  profileLimitedAccessDelivery = this.getRuleForReddawayAR[0].limitedAccessDelivery;
                  profileInsideDelivery = this.getRuleForReddawayAR[0].insideDelivery;
                  profileNotify = this.getRuleForReddawayAR[0].notify;
                  profileSingleShipment = this.getRuleForReddawayAR[0].singleShipment;
                  profiledeliveryAppointmentRequired = this.getRuleForReddawayAR[0].deliveryAppointmentRequired;
                  profilehazmat = this.getRuleForReddawayAR[0].hazmat;
                  profileResidentialPickupcharge = this.getRuleForReddawayAR[0].residentialDelivery;
                  profileLiftGatePickupCharge = this.getRuleForReddawayAR[0].liftGateService;
                profilelimitedpickup = this.getRuleForReddawayAR[0].limitedAccessDelivery;
                  profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                    { residential: profileResidentialCharge, id: 2 },
                    { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
                    { insideDelivery: profileInsideDelivery, id: 4 },
                    { notify: profileNotify, id: 5 },
                    { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id: 7},
                    {hazmat: profilehazmat , id:8},
                    {liftGatePickup: profileLiftGatePickupCharge, 'id': 10},
                    {residentialPickup: profileResidentialPickupcharge, 'id': 11},
                    {limitedaccesspickup: profilelimitedpickup, 'id': 12});
                } else {
                  profileAssessorials.push({ liftGate: '', 'id': 1 },
                    { residential: '', 'id': 2 },
                    { limitedAccessDelivery: '', 'id': 3 },
                    { insideDelivery: '', id: 4 },
                    { notify: '', 'id': 5 },
                    {deliveryAppointmentRequired: '', 'id': 7},
                    {hazmat: '', 'id':8},
                    {liftGatePickup: '', 'id': 10},
                    {residentialPickup: '', 'id': 11},
                    {limitedaccesspickup: '', 'id': 12});
                }
              }
            }
          } else {
            profileAssessorials.push({ liftGate: '', 'id': 1 },
              { residential: '', 'id': 2 },
              { limitedAccessDelivery: '', 'id': 3 },
              { insideDelivery: '', id: 4 },
              { notify: '', 'id': 5 },
              {deliveryAppointmentRequired: '', 'id': 7},
              {hazmat:'', 'id':8},
              {liftGatePickup: '', 'id': 10},
                    {residentialPickup: '', 'id': 11},
                    {limitedaccesspickup: '', 'id': 12});
          }
        }
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
        discountArray.push(discount);
        fuelSurchargeArray.push(fuelSurcharge);
        /*
        check the type is Rate or DwRate
         */
        /* For Category AR add 6% on Rate and Gross charge as per the 2019 rules  */
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
                  currentRate = Number(response.result.rate[t].rate) * this.increasedValueForAR;
                } else {
                  currentFinalRate = Number(response.result.minCharges);
                  currentRate = Number(response.result.rate[t].rate);
                }
                finalRate.push(currentFinalRate.toFixed(2));
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
                  currentFinalDwRate = Number(response.result.rate[t].finalDWRate) * this.increasedValueForAR;
                } else {
                  currentFinalDwRate = Number(response.result.rate[t].finalDWRate);
                }
                finalRate.push(currentFinalDwRate.toFixed(2));
              }
            } else {
              this.showMinimumCharge = false;
              if (category === 'AR') {
                currentFinalDwRate = Number(response.result.rate[t].finalDWRate) * this.increasedValueForAR;
              } else {
                currentFinalDwRate = Number(response.result.rate[t].finalDWRate);
              }
              finalRate.push(currentFinalDwRate.toFixed(2));
            }
            if (category === 'AR') {
              currentDwRate = Number(response.result.rate[t].DWRate) * this.increasedValueForAR;
            } else {
              currentDwRate = Number(response.result.rate[t].DWRate);
            }
            rate.push(currentDwRate.toFixed(2));
          }
        }
        this.finalRateCharge = this.netChargeArrSum(finalRate);
        /*Compare diffRate is given => if it is given deficit value will be taken diffRate, diffFinalRate and crtRate, if not normal rate and final rate is considered */
        if (response.result.diffRate === 0 && response.result.diffWeight === 0 && response.result.finalDiffRate === 0 && response.result.crtRate === 0) {
          this.showDeficitValue = false;
        } else {
          this.showDeficitValue = true;
          if (category === 'AR') {
            const currentDiffRate = Number(response.result.diffRate) * this.increasedValueForAR;
            diffRateArray.push(currentDiffRate.toFixed(2));
            const currentCrtRate = Number(response.result.crtRate) * this.increasedValueForAR;
            crtRateArray.push(currentCrtRate.toFixed(2));
            const currentFinalDiffRate = Number(response.result.finalDiffRate) * this.increasedValueForAR;
            diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
          } else {
            const currentDiffRate = Number(response.result.diffRate);
            diffRateArray.push(currentDiffRate.toFixed(2));
            const currentCrtRate = Number(response.result.crtRate);
            crtRateArray.push(currentCrtRate.toFixed(2));
            const currentFinalDiffRate = Number(response.result.finalDiffRate);
            diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
          }
          const weight = Number(response.result.diffWeight);
          diffWeightArray.push(weight);
          this.finalRateCharge = this.finalRateCharge + this.netChargeArrSum(diffRateArray);
        }
        /*Discounted Rate => finalRate * (1-(discount/100))*/
        console.log('discountedRateCalculation Before', this.finalRateCharge, 'discount', discount, this.costPlusFactorForYRC, this.costPlusFactorForReddaway);
        if (factoring !== 'COSTPLUS') {
           discountedRateCalculation = (this.finalRateCharge * (1 - (discount / 100)));
           console.log('discountedRateCalculation cost plus', discountedRateCalculation);
        } else {
          if (carrierType === 'YRC') {
            let discountedRateNewCalculation = (this.finalRateCharge * (1 - (discount / 100)));
            console.log('discountedRateNewCalculation', discountedRateNewCalculation);
            discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusFactorForYRC));
            console.log('discountedRateCalculation cost plus', discountedRateCalculation);
          } else {
            let discountedRateNewCalculation = (this.finalRateCharge * (1 - (discount / 100)));
            console.log('discountedRateNewCalculation', discountedRateNewCalculation);
            discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusFactorForReddaway));
            console.log('discountedRateCalculation cost plus', discountedRateCalculation);
          }
        }
        // Comparing discounted Rate and the minCharge given in the customer business rules
        console.log('profileMinimum Charge YRC', profileMinimumCharge, 'amc', amc, 'discountedRateCalculation', discountedRateCalculation);
        if (profileMinimumCharge !== undefined && profileMinimumCharge !== '' && profileMinimumCharge !== null) {
          if (Number(profileMinimumCharge) > Number(discountedRateCalculation)) {
            discountedRate = Number(profileMinimumCharge);
            console.log('profileMinimum1 ', discountedRate);
          } else {
            discountedRate = Number(discountedRateCalculation.toFixed(2));
            console.log('profileMinimum2 ', discountedRate);
          }
          // discountedRate = 9000
        } else {
          if (amc !== '' && amc !== null && amc !== undefined) {
            if (Number(amc) > Number(discountedRateCalculation)) {
              discountedRate = Number(amc);
              console.log('profileMinimum3 ', discountedRate);
            } else {
              discountedRate = Number(discountedRateCalculation.toFixed(2));
              console.log('profileMinimum4 ', discountedRate);
            }
          } else {
            discountedRate = Number(discountedRateCalculation.toFixed(2));
            console.log('profileMinimum4 ', discountedRate);
          }
          // discountedRate = 9000

        }


        console.log('Final discount Rate YRCjef', discountedRate);
        discountedRateArray.push(discountedRate);
        /*Net charge => (1+(fuelSurchareg/100))*discountedRate */
        const netCharge = (1 + (fuelSurcharge / 100)) * discountedRate;
        netChargeArray.push(netCharge.toFixed(2));
        const netChargeResult = ((discountedRate) * (fuelSurcharge / 100));
        netChargeResultArray.push(netChargeResult.toFixed(2));
        let assessorialUnique = [], uniqueArray = [];
        console.log('this.selectedItems before duplicating', this.selectedItems);
        // assessorialUnique = this.getUnique(this.selectedItems, 'name');
        // console.log('assessorialUnique', assessorialUnique);
        uniqueArray = this.selectedItems;
        console.log('assessorialUnique After', uniqueArray);
        /* assessorial function => static values if customer rule is given that value will be considered*/
        if (factoring !== 'COSTPLUS') {
          assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.parseSetMasterData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
        } else {
          if (carrierType === 'YRC') {
            assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
          } else {
            assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
          }
        } 
        assessorialCharge = assessorialChargeArray[0];
        this.arrayData = this.pricingInfoService.getAssessorial();
        const netChargeValue = this.netChargeArrSum(netChargeArray);
        if(carrierType === 'YRC') {
          addCACharge = Number(response.result.yrcCaCharge);
          this.logger = {
            'method': 'CAChargeYrc',
            'message': 'CAChargeAddedSuccessfully',
            'Value': addCACharge,
            'Category':category
          };
          this.loggerService.info(this.logger);
        } else {
          addCACharge = Number(response.result.reddawayCaCharge );
          this.logger = {
            'method': 'CAChargeReddaway',
            'message': 'CAChargeAddedSuccessfully',
            'Value': addCACharge,
            'Category':category

          };
          this.loggerService.info(this.logger);
    
        }
        totalAssessorialCharge = Number(highCost) + Number(addCACharge) + Number(addSingleShipmentCharge) + Number(assessorialCharge);
        /*totalCharge => Add netCharge, assessorialCharge, addCACharge, highCost, addSingleShipmentCharge */
        let totalCharge = Number(highCost) + Number(addCACharge) + Number(netChargeValue) + Number(addSingleShipmentCharge) + Number(assessorialCharge);
    if (carrierType === 'YRC') {
      this.YRCArray.forEach((ee:any) => {
        if (ee.category === "AP") {
          console.log('jefrin', ee);
          if (ee.totalCharge > totalCharge) {
            let charge = Number(ee.totalCharge)/0.95;
            let addedCharge = charge;
            let charegArry = [];
            charegArry.push(addedCharge.toFixed(2));
            totalCharge = addedCharge;
            this.showcolor = true;
          }
        }
      })
    }
    if (carrierType === 'REDDAWAY') {
      this.reddawayArray.forEach((ee:any) => {
        if (ee.category === "AP") {
          console.log('jefrin', ee);
          if (ee.totalCharge > totalCharge) {
            let charge = Number(ee.totalCharge)/0.95;
            let addedCharge = charge;
            let charegArry = [];
            charegArry.push(addedCharge.toFixed(2));
            totalCharge = addedCharge;
            this.showcolor = true;
          }
        }
      })
    }
 
        totalChargeArray.push(totalCharge.toFixed(2));
        const totalChargeForComparing = this.netChargeArrSum(totalChargeArray);
        classification1.splice(0, 2);
        minimumClass = Math.min(...classificationArray);
        rate = [];
        let cwtWeight = 0;
        if (diffWeightArray.length > 0) {
           cwtWeight = Number(this.weightForCal) + Number(diffWeightArray[0]);

        } else {
           cwtWeight = Number(this.weightForCal);

        }
        // let cwtWeight = Number(this.weightForCal) + Number(diffWeightArray[0]);
        let ratevalue = (Number(this.finalRateCharge) / (cwtWeight/100)).toFixed(2);
        rate.push(ratevalue);
        this.pricingInfo = {
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
          totalChargeForComparing: totalChargeForComparing,
          factor: factoring,
          totalWeight: this.weightForCal,
          showcolor: this.showcolor

        };
        if (this.pricingInfo.carrierType === 'YRC') {
          this.YRCArray.push(this.pricingInfo);
          if (this.YRCArray.length > 2) {
            this.YRCArray.sort(function (a:any, b:any) {
              return (a.category - b.category);
            });

            let teeeArr = []
            let Ap = this.YRCArray.filter(function (el:any) {
              return el.category === 'AP';
            });
            teeeArr.push(Ap[0]);
            let Ar = this.YRCArray.filter(function (el:any) {
              return el.category === 'AR';
            });
            teeeArr.push(Ar[0]);
            let oldAp = this.YRCArray.filter(function (el:any) {
              return el.category === 'OLDAP';
            });
            teeeArr.push(oldAp[0]);
            console.log('jefrinnnnn', teeeArr);
this.YRCArray = [];
this.YRCArray = teeeArr;
          }
          console.log('this.YRCArray Sort', this.YRCArray);
          if (this.YRCArray.length > 2) {
            this.waitForProcessMessage = false;
            this.showAllData = true;
            this.hideYrcData = false;
            this.showYrcData = true;
            this.showYrcDataAR = true;
            this.showBorder = true;
            if (this.reddawayResponse === 'service not available') {
              this.showAllData = true;
              this.showMessageForAp = true;
            }
            let date = new Date();
            console.log('QUOTE REQUEST YRC METHOD CALL AR', date);
            this.giveRateDetails(this.YRCArray);
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          }

        }
        if (this.pricingInfo.carrierType === 'REDDAWAY') {
          this.reddawayArray.push(this.pricingInfo);
          this.waitForProcessMessage = false;
          this.waitForProcessMessageForReddaway = false;
          if (this.reddawayArray.length > 1) {
            this.reddawayArray.sort(function (a:any, b:any) {
              return (a.category - b.category);
            });
            if (this.reddawayArray[0].category !== 'AP') {
              this.reddawayArray.reverse();
            }
          }
          if (this.reddawayArray.length > 2) {
            console.log('this.reddawayArray Sort', this.reddawayArray);
            this.showAllData = true;
            this.showReddawayData = true;
            this.showReddawayDataAR = true;
            let date = new Date();
            console.log('QUOTE REQUEST REDDAWAY METHOD CALL AR', date);
            this.giveRateDetails(this.reddawayArray);
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          }
        }
      }

      rateCalculationForYRCReddaway1(response:any, carrierType:any, category:any, factoring:any) {
        console.log(response, carrierType, category);
        if (response.result.finalRate !== undefined) {
        this.finalRateCharge = this.netChargeArrSum(response.result.finalRate);
        } else {
          this.finalRateCharge = [];
        }
        let classA:any = [];
        let weighta:any = []
    
    this.userData.classWeight.forEach((ele:any) => {
      classA.push( ele.classification);
      weighta.push(ele.weight)
    });
    let classification1 = classA;
    let classificationArray = classA;
    this.weightForCal = this.netChargeArrSum(weighta);
    let netChargePercent = 0;
    let finalTotalRate = 0;
     let discountPercent = 0;
     let discountFull =0;
     let accessArray:any =[];
     let discountaa = [];
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
      
          accessArray.push('Limited Access -' + splitted[1]);
          accessorialRate += Number(splitted[1]);
    
        }
      })
    
    }
  
    if (response.result.finalRate.length > 0) {
      if (response.result.diffRate.length > 0) {
        finalTotalRate = this.netChargeArrSum(response.result.finalRate) + this.netChargeArrSum(response.result.crtRate);
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

      }}
      console.log('discountPercent',discountPercent)
      let disRate = 0;
      disRate = finalTotalRate - discountFull;
      if (response.result.diffRate.length > 0) {
        let d = finalTotalRate - response.result.diffRate;
      }

for (let g = 0; g < response.result.netChargeResult.length; g++) {
  // netChargeRee = 
   netChargePercent = Number(response.result.netChargeResult) * 100 / Number(disRate);

}

let discRate = [];
discRate.push(disRate.toFixed(2).toString());
let FSC = [];
FSC.push(netChargePercent.toFixed(2).toString())

console.log(discRate,FSC)
let netValue = disRate + netChargePercent * disRate /100;
let highCost = 0;
let totalAssessorialCharge =0;
console.log('discountRate',netValue);
if (carrierType === 'YRC') {
  highCost = response.result.highCostDeliveryCharge
} else if (carrierType === 'REDDAWAY') {
  highCost = response.result.highCostDeliveryCharge + Number(response.result.extraCharges);

}
totalAssessorialCharge = Number(highCost) + Number(response.result.additionalCharge) +  Number(accessorialRate);
let rate = []
// let cwtWeight = Number(this.weightForCal) + Number(response.result.diffWeight[0]);
let cwtWeight = 0;
if (response.result.diffWeight.length > 0) {
   cwtWeight = Number(this.weightForCal) + Number(response.result.diffWeight[0]);

} else {
   cwtWeight = Number(this.weightForCal);

}
        let ratevalue = (Number(this.finalRateCharge) / (cwtWeight/100)).toFixed(2);
        rate.push(ratevalue);
        this.pricingInfo = {
          rate: rate,
          finalRate: response.result.finalRate,
          totalGrossCharge: this.finalRateCharge.toFixed(2),
          discount: discountPercent.toFixed(2),
          fuelChargeYrc: FSC,
          fuelCharge: FSC,
          // discountedRate1:  disRate.toFixed(2),
          discountedRate:  discountaa,

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
          crtRate: rate,
          diffDiscountedRate:  discountaa[0],
          // diffNetCharge: netChargeArray,
          assessorialCharge: response.result.assessorialChargeValue,
          assessorialChargeValue: totalAssessorialCharge,
          assessorialDataList: accessArray,
          netChargeResult: response.result.netChargeResult,
          // netChargeDiffResult: netChargeResultArray,
          additionalCharge: response.result.additionalCharge,
          singleShipmentCharge: response.result.singleShipmentCharge,
          highCostDeliveryCharge: highCost,
          category: category,
          showMinimumCharge: this.showMinimumCharge,
          shipTypes: this.showDirections,
          carrierType: carrierType,
          showcolor: false,
          // netChargeValue: netChargeValue,
          // totalChargeForComparing: totalChargeForComparing,
          factor: factoring,
          totalWeight: this.weightForCal,
          // higherValueAP: this.higherValueAP
        };
        console.log(this.pricingInfo)
        this.showAllData = true;
        // this.resultObject = this.resultArray[1];
        if (this.pricingInfo.carrierType === 'YRC') {
          this.YRCArray.push(this.pricingInfo);
          if (this.YRCArray.length > 2) {
            this.YRCArray.sort(function (a:any, b:any) {
              return (a.category - b.category);
            });
            if (this.YRCArray[0].category !== 'AP') {
              this.YRCArray.reverse();
            }
            let teeeArr = []
            let Ap = this.YRCArray.filter(function (el:any) {
              return el.category === 'AP';
            });
            teeeArr.push(Ap[0]);
            let Ar = this.YRCArray.filter(function (el:any) {
              return el.category === 'AR';
            });
            teeeArr.push(Ar[0]);
            let oldAp = this.YRCArray.filter(function (el:any) {
              return el.category === 'OLDAP';
            });
            teeeArr.push(oldAp[0]);
            console.log('jefrinnnnn', teeeArr);
this.YRCArray = [];
this.YRCArray = teeeArr;
          }
          console.log('this.YRCArray Sort', this.YRCArray);
          if (this.YRCArray.length > 2) {
            this.waitForProcessMessage = false;
            this.showAllData = true;
            this.hideYrcData = false;
            this.showYrcData = true;
            this.showYrcDataAR = true;
            this.showBorder = true;            
            if (this.reddawayResponse === 'service not available') {
              this.showAllData = true;
              this.showMessageForAp = true;
            }
            let date = new Date();
            console.log('QUOTE REQUEST YRC METHOD CALL AR', date);
            this.giveRateDetails(this.YRCArray);
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          }
        }
        if (this.pricingInfo.carrierType === 'REDDAWAY') {
          this.reddawayArray.push(this.pricingInfo);
          this.waitForProcessMessage = false;
          this.waitForProcessMessageForReddaway = false;
          if (this.reddawayArray.length > 1) {
            this.reddawayArray.sort(function (a:any, b:any) {
              return (a.category - b.category);
            });
            if (this.reddawayArray[0].category !== 'AP') {
              this.reddawayArray.reverse();
            }
          }
          if (this.reddawayArray.length > 2) {
            console.log('this.reddawayArray Sort', this.reddawayArray);
            this.showAllData = true;
            this.showReddawayData = true;
            this.showReddawayDataAR = true;
            let date = new Date();
            if (this.pricingInfo.carrierType === 'REDDAWAY') {
              let Ap,Ar;

            this.reddawayArray.forEach((ee:any, index:any) => {
              if (ee.category === "AP") {
                Ap = ee;

              };
              if (ee.category === "AR") {
                Ar = ee;

              };
            });
              }
            console.log('QUOTE REQUEST REDDAWAY METHOD CALL AR', date);
            this.giveRateDetails(this.reddawayArray);
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          }
        }        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
    
        // this.giveRateDetails(this.resultArray, 'AR');
    
      }   

      rateCalculationForYRCReddawayCostplus(response:any, carrierType:any, category:any, factoring:any) {
        // if (carrierType === 'YRC') {
          console.log(this.YRCArray);
          let discount, fuelSurcharge, rateId, amc, highCost, addCACharge, addRate, discountedRate:any,
          addSingleShipmentCharge, minimumClass, totalAssessorialCharge, assessorialCharge, customerBusinessRule = [], assessorialChargeArray = [], profileAssessorials = [];
        const weightArray:any = [], classificationArray = [], classification1 = [], finalRateArray = [], discountedRateArray = [],
          netChargeArray = [], netChargeResultArray = [], totalChargeArray = [];
        let finalRate:any = [], rate:any = [], crtRateArray:any = [], fuelSurchargeArray:any = [];
        const diffFinalRateArray:any = [], diffRateArray:any = [], discountArray = [], diffWeightArray:any = [];
        let profileMinimumCharge, profileLifeGateCharge, profileResidentialCharge, profileLimitedAccessDelivery,
          profileInsideDelivery, profileNotify, profileSingleShipment, singleShipmentsetMasterData, profiledeliveryAppointmentRequired,profilehazmat,profileLiftGatePickupCharge,profileResidentialPickupcharge,profilelimitedpickup;
        let currentFinalRate, currentRate, currentFinalDwRate, currentDwRate;
        let discountedRateCalculation;
        this.parseSetMasterData = [];
        this.showDirections = '';
        this.showCACharge = false;
        this.showHighCostDelivery = false;
        this.showDeficitValue = false;
        this.showMinimumCharge = false;
        this.hideYrcData = false;
        this.arrayData = [];
        let costplus:any;
        // const setMasterData = localStorage.getItem('artableData');
        const setMasterData:any = localStorage.getItem('aptableData');
        this.parseSetMasterData = JSON.parse(setMasterData);
        console.log('this.parseSetMasterData YRC', this.parseSetMasterData);
        this.localStorageArData = JSON.parse(setMasterData);
        if (carrierType === 'YRC') {
          // if(this.YRCArray.length > 1) {
    this.YRCArray.forEach((ele:any) =>{
    if (ele.category === 'AP') {
    console.log('xxxx', ele);
    costplus =ele;
    
    }
    })
            weightArray.push(costplus.weight[0]);
            // const classification = response.result.classWeight[i].classification;
            classificationArray.push(costplus.classification[0]);
            classification1.push(costplus.classification[0]);
          // }
          this.weightForCal = this.netChargeArrSum(weightArray);
        } else if (carrierType === 'REDDAWAY') {
          // if(this.YRCArray.length > 1) {
    this.reddawayArray.forEach((ele:any) =>{
    if (ele.category === 'AP') {
    console.log('xxxx', ele);
    costplus =ele;
    
    }
    })
            weightArray.push(costplus.weight[0]);
            // const classification = response.result.classWeight[i].classification;
            classificationArray.push(costplus.classification[0]);
            classification1.push(costplus.classification[0]);
          // }
          this.weightForCal = this.netChargeArrSum(weightArray);
        }
      
          for (let apData = 0; apData < this.parseSetMasterData.length; apData++) {
            if (this.parseSetMasterData[apData].companyName === carrierType) {
                  discount = this.parseSetMasterData[apData].discount;
                  fuelSurcharge = this.parseSetMasterData[apData].fuelsurcharge;
                  rateId = this.parseSetMasterData[apData].recentRateId;
                  amc = this.parseSetMasterData[apData].amc;
                  console.log(this.parseSetMasterData[apData].assessorials)
                  // if(this.parseSetMasterData.assessorials[0] === '[') {
                    this.parseSetMasterData[apData].assessorials = JSON.parse(this.parseSetMasterData[apData].assessorials)
    
                  // }
              if (this.parseSetMasterData[apData].assessorials.length > 0) {
                    for (let i = 0; i < this.parseSetMasterData[apData].assessorials.length; i++) {
                      if (this.parseSetMasterData[apData].assessorials[i].name === 'Single Shipment') {
                        singleShipmentsetMasterData = this.parseSetMasterData[apData].assessorials[i];
                        break;
                      } else {
                        singleShipmentsetMasterData = '';
                      }
                    }
                  };
              }
               this.profile = {
                    companyName: carrierType, discount: discount,
                    fuelsurcharge: fuelSurcharge, recentRateId: rateId, amc: amc, type: category
                  };
                  this.changeArValues(this.profile);
            }
            // if (this.getRuleForYRCAR.length > 0) {
            //   profileLifeGateCharge = this.getRuleForYRCAR[0].liftGateService;
            //   profileResidentialCharge = this.getRuleForYRCAR[0].residentialDelivery;
            //   profileLimitedAccessDelivery = this.getRuleForYRCAR[0].limitedAccessDelivery;
            //   profileInsideDelivery = this.getRuleForYRCAR[0].insideDelivery;
            //   profileNotify = this.getRuleForYRCAR[0].notify;
            //   profileSingleShipment = this.getRuleForYRCAR[0].singleShipment;
            //   profiledeliveryAppointmentRequired = this.getRuleForYRCAR[0].deliveryAppointmentRequired;
            //   profilehazmat = this.getRuleForYRCAR[0].hazmat;
            //   profileLiftGatePickupCharge = this.getRuleForYRCAR[0].liftGateService;
            //   profileResidentialPickupcharge = this.getRuleForYRCAR[0].residentialDelivery;
            //   profilelimitedpickup = this.getRuleForYRCAR[0].limitedAccessDelivery;
            //   profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
            //     { residential: profileResidentialCharge, id: 2 },
            //     { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
            //     { insideDelivery: profileInsideDelivery, id: 4 },
            //     { notify: profileNotify, id: 5 },
            //     { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7},
            //     {hazmat: profilehazmat, 'id':8},
            //     {liftGatePickup: profileLiftGatePickupCharge, 'id': 10},
            // {residentialPickup: profileResidentialPickupcharge, 'id': 11},
            // {limitedaccesspickup: profilelimitedpickup, 'id': 12});
            //   this.profile = {};
            //   this.profile = {
            //     companyName: carrierType, fuelsurcharge: fuelSurcharge, type: category,
            //     recentRateId: rateId, discount: discount, amc: profileMinimumCharge
            //   };
            // } else {
            //   profileAssessorials.push({ liftGate: '', 'id': 1 },
            //     { residential: '', 'id': 2 },
            //     { limitedAccessDelivery: '', 'id': 3 },
            //     { insideDelivery: '', id: 4 },
            //     { notify: '', 'id': 5 },
            //     { deliveryAppointmentRequired: '', 'id': 7},
            //     {hazmat: '', 'id':8},
            //     {liftGatePickup: '', 'id': 10},
            // {residentialPickup: '', 'id': 11},
            // {limitedaccesspickup: '', 'id': 12}
            //     );
            //   this.profile = {
            //     companyName: carrierType, fuelsurcharge: fuelSurcharge, type: category,
            //     recentRateId: rateId, discount: discount, amc: profileMinimumCharge
            //   };
            // }
    if (carrierType === 'YRC') {
              if (this.getRuleForYRCAR.length > 0) {
                profileLifeGateCharge = this.getRuleForYRCAR[0].liftGateService;
                profileLiftGatePickupCharge = this.getRuleForYRCAR[0].liftGateService;
                profileResidentialCharge = this.getRuleForYRCAR[0].residentialDelivery;
                profileLimitedAccessDelivery = this.getRuleForYRCAR[0].limitedAccessDelivery;
                profileInsideDelivery = this.getRuleForYRCAR[0].insideDelivery;
                profileNotify = this.getRuleForYRCAR[0].notify;
                profileSingleShipment = this.getRuleForYRCAR[0].singleShipment;
                profiledeliveryAppointmentRequired = this.getRuleForYRCAR[0].deliveryAppointmentRequired;
                profilehazmat = this.getRuleForYRCAR[0].hazmat;
                profileResidentialPickupcharge = this.getRuleForYRCAR[0].residentialDelivery;
                profileLiftGatePickupCharge = this.getRuleForYRCAR[0].liftGateService;
              profilelimitedpickup = this.getRuleForYRCAR[0].limitedAccessDelivery;
                profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                 {liftGatePickup: profileLiftGatePickupCharge, id: 10},
                  { residential: profileResidentialCharge, id: 2 },
                  { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
                  { insideDelivery: profileInsideDelivery, id: 4 },
                  { notify: profileNotify, id: 5 },
                  { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id : 7},
                  {hazmat: profilehazmat,id:8},
                  {liftGatePickup: profileLiftGatePickupCharge, 'id': 10},
                  {residentialPickup: profileResidentialPickupcharge, 'id': 11},
                  {limitedaccesspickup: profilelimitedpickup, 'id': 12});
              } else {
                profileAssessorials.push({ liftGate: '', 'id': 1 },
                  { residential: '', 'id': 2 },
                  { limitedAccessDelivery: '', 'id': 3 },
                  { insideDelivery: '', id: 4 },
                  { notify: '', 'id': 5 },
                  {deliveryAppointmentRequired: '' , 'id': 7},
                  {hazmat:'', 'id': 8},
                  {liftGatePickup: '', 'id': 10},
                  {residentialPickup: '', 'id': 11},
                  {limitedaccesspickup: '', 'id': 12}
                  );
                  this.profile = {
                    companyName: carrierType, fuelsurcharge: fuelSurcharge, type: category,
                    recentRateId: rateId, discount: discount, amc: profileMinimumCharge
                  };
              }
            } else {
              if (carrierType === 'REDDAWAY') {
                if (this.getRuleForReddawayAR.length > 0) {
                  profileLifeGateCharge = this.getRuleForReddawayAR[0].liftGateService;
                  profileResidentialCharge = this.getRuleForReddawayAR[0].residentialDelivery;
                  profileLimitedAccessDelivery = this.getRuleForReddawayAR[0].limitedAccessDelivery;
                  profileInsideDelivery = this.getRuleForReddawayAR[0].insideDelivery;
                  profileNotify = this.getRuleForReddawayAR[0].notify;
                  profileSingleShipment = this.getRuleForReddawayAR[0].singleShipment;
                  profiledeliveryAppointmentRequired = this.getRuleForReddawayAR[0].deliveryAppointmentRequired;
                  profilehazmat = this.getRuleForReddawayAR[0].hazmat;
                  profileResidentialPickupcharge = this.getRuleForReddawayAR[0].residentialDelivery;
                  profileLiftGatePickupCharge = this.getRuleForReddawayAR[0].liftGateService;
                profilelimitedpickup = this.getRuleForReddawayAR[0].limitedAccessDelivery;
                  profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                    { residential: profileResidentialCharge, id: 2 },
                    { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
                    { insideDelivery: profileInsideDelivery, id: 4 },
                    { notify: profileNotify, id: 5 },
                    { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id: 7},
                    {hazmat: profilehazmat , id:8},
                    {liftGatePickup: profileLiftGatePickupCharge, 'id': 10},
                    {residentialPickup: profileResidentialPickupcharge, 'id': 11},
                    {limitedaccesspickup: profilelimitedpickup, 'id': 12});
                } else {
                  profileAssessorials.push({ liftGate: '', 'id': 1 },
                    { residential: '', 'id': 2 },
                    { limitedAccessDelivery: '', 'id': 3 },
                    { insideDelivery: '', id: 4 },
                    { notify: '', 'id': 5 },
                    {deliveryAppointmentRequired: '', 'id': 7},
                    {hazmat: '', 'id':8},
                    {liftGatePickup: '', 'id': 10},
                    {residentialPickup: '', 'id': 11},
                    {limitedaccesspickup: '', 'id': 12});
                }
              }
            }
            if (carrierType === 'YRC') {
              if (this.weightForCal < 500) {
                if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
                  addSingleShipmentCharge = Number(profileSingleShipment);
                } else {
                  if (singleShipmentsetMasterData !== undefined) {
                  if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
                    addSingleShipmentCharge = Number(singleShipmentsetMasterData.cost);
                  }} else {
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
                if (singleShipmentsetMasterData !== undefined) {
                if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
                  addSingleShipmentCharge = Number(singleShipmentsetMasterData.cost);
                } }else {
                  addSingleShipmentCharge = 0;
                
              }
              }
            }
            discountArray.push(discount);
            fuelSurchargeArray.push(fuelSurcharge);
    if (carrierType === 'YRC') {
            let discountedRateNewCalculation = (this.finalRateCharge * (1 - (discount / 100)));
            console.log('discountedRateNewCalculation', discountedRateNewCalculation);
            discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusFactorForYRC));
            console.log('discountedRateCalculation cost plus', discountedRateCalculation);
          } else {
            let discountedRateNewCalculation = (this.finalRateCharge * (1 - (discount / 100)));
            console.log('discountedRateNewCalculation', discountedRateNewCalculation);
            discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusFactorForReddaway));
            console.log('discountedRateCalculation cost plus', discountedRateCalculation);
          }
          console.log('profileMinimum Charge YRC', profileMinimumCharge, 'amc', amc, 'discountedRateCalculation', discountedRateCalculation);
          if (profileMinimumCharge !== undefined && profileMinimumCharge !== '' && profileMinimumCharge !== null) {
            if (Number(profileMinimumCharge) > Number(discountedRateCalculation)) {
              discountedRate = Number(profileMinimumCharge);
              console.log('profileMinimum1 ', discountedRate);
            } else {
              discountedRate = Number(discountedRateCalculation.toFixed(2));
              console.log('profileMinimum2 ', discountedRate);
            }
            // discountedRate = 9000
          } else {
            if (amc !== '' && amc !== null && amc !== undefined) {
              if (Number(amc) > Number(discountedRateCalculation)) {
                discountedRate = Number(amc);
                console.log('profileMinimum3 ', discountedRate);
              } else {
                discountedRate = Number(discountedRateCalculation.toFixed(2));
                console.log('profileMinimum4 ', discountedRate);
              }
            } else {
              discountedRate = Number(discountedRateCalculation.toFixed(2));
              console.log('profileMinimum4 ', discountedRate);
            }
            // discountedRate = 9000
    
          }
          console.log('Final discount Rate YRCjef', discountedRate);
            discountedRateArray.push(discountedRate);
           const netCharge = (1 + (fuelSurcharge / 100)) * discountedRate;
            netChargeArray.push(netCharge.toFixed(2));
            const netChargeResult = ((discountedRate) * (fuelSurcharge / 100));
            netChargeResultArray.push(netChargeResult.toFixed(2));
          assessorialCharge = 0;
          let assessorialChargeValue = 0;
          let uniqueArray = this.selectedItems;
    if (this.selectedItems.length > 0) {
          if (carrierType === 'YRC') {
            assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
          } else {
            assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
          }
          assessorialCharge = assessorialChargeArray[0];
    
        } else {
          assessorialChargeArray = [];
          assessorialCharge = 0;
        }
        
        this.arrayData = this.pricingInfoService.getAssessorial();
        const netChargeValue = this.netChargeArrSum(netChargeArray);
        addCACharge = 0;
        // if(carrierType === 'YRC') {
        //   addCACharge = Number(response.result.yrcCaCharge);
        //   this.logger = {
        //     'method': 'CAChargeYrc',
        //     'message': 'CAChargeAddedSuccessfully',
        //     'Value': addCACharge,
        //     'Category':category
        //   };
        //   this.loggerService.info(this.logger);
        // } else {
        //   addCACharge = Number(response.result.reddawayCaCharge );
        //   this.logger = {
        //     'method': 'CAChargeReddaway',
        //     'message': 'CAChargeAddedSuccessfully',
        //     'Value': addCACharge,
        //     'Category':category
    
        //   };
        //   this.loggerService.info(this.logger);
    
        // }
        highCost = 0
        totalAssessorialCharge = Number(highCost) + Number(addCACharge) + Number(addSingleShipmentCharge) + Number(assessorialCharge);
        /*totalCharge => Add netCharge, assessorialCharge, addCACharge, highCost, addSingleShipmentCharge */
    console.log('xxxx',this.costPlusFactorForYRC);
    if (carrierType === 'YRC') {
          const totalCharge = Number(costplus.totalCharge) * Number(this.costPlusFactorForYRC);
          totalChargeArray.push(totalCharge.toFixed(2));
    
    } else {
      const totalCharge = Number(costplus.totalCharge) * Number(this.costPlusFactorForReddaway);
      totalChargeArray.push(totalCharge.toFixed(2));
    
    
    }
        const totalChargeForComparing = this.netChargeArrSum(totalChargeArray);
        classification1.splice(0, 2);
        minimumClass = Math.min(...classificationArray);
          this.pricingInfo = {
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
            category: 'COSTPLUS',
            showMinimumCharge: this.showMinimumCharge,
            shipTypes: this.showDirections,
            carrierType: carrierType,
            // totalChargeForComparing: totalChargeForComparing,
            factor: factoring,
            totalWeight: this.weightForCal,
            showcolor: false
    
          };
          console.log(this.pricingInfo);
          if (this.pricingInfo.carrierType === 'YRC') {
            this.YRCArray.push(this.pricingInfo);
          this.YRCArray.push(this.pricingInfo);
          if (this.YRCArray.length > 2) {
            let teeeArr = []
            let Ap = this.YRCArray.filter(function (el:any) {
              return el.category === 'AP';
            });
            teeeArr.push(Ap[0]);
            let Ar = this.YRCArray.filter(function (el:any) {
              return el.category === 'COSTPLUS';
            });
            teeeArr.push(Ar[0]);
            let oldAp = this.YRCArray.filter(function (el:any) {
              return el.category === 'OLDAP';
            });
            teeeArr.push(oldAp[0]);
            console.log('jefrinnnnn', teeeArr);
            this.YRCArray = [];
            this.YRCArray = teeeArr;
            this.waitForProcessMessage = false;
            this.showAllData = true;
            this.hideYrcData = false;
            this.showYrcData = true;
            this.showYrcDataAR = true;
            this.showBorder = true;
            if (this.reddawayResponse === 'service not available') {
              this.showAllData = true;
              this.showMessageForAp = true;
            }
            let date = new Date();
            console.log('QUOTE REQUEST YRC METHOD CALL AR', date);
            this.giveRateDetails(this.YRCArray);
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          }
        }
        if (this.pricingInfo.carrierType === 'REDDAWAY') {
          this.reddawayArray.push(this.pricingInfo);
        this.reddawayArray.push(this.pricingInfo);
        if (this.reddawayArray.length > 2) {
          let teeeArr = []
          let Ap = this.reddawayArray.filter(function (el:any) {
            return el.category === 'AP';
          });
          teeeArr.push(Ap[0]);
          let Ar = this.reddawayArray.filter(function (el:any) {
            return el.category === 'COSTPLUS';
          });
          teeeArr.push(Ar[0]);
          let oldAp = this.reddawayArray.filter(function (el:any) {
            return el.category === 'OLDAP';
          });
          teeeArr.push(oldAp[0]);
          console.log('jefrinnnnn', teeeArr);
          this.reddawayArray = [];
          this.reddawayArray = teeeArr;
          this.waitForProcessMessage = false;
          this.showAllData = true;
          this.hideYrcData = false;
          this.showYrcData = true;
          this.showYrcDataAR = true;
          this.showBorder = true;
          if (this.reddawayResponse === 'service not available') {
            this.showAllData = true;
            this.showMessageForAp = true;
          } else {
            this.showAllData = true;
            this.showReddawayData = true;
            this.showReddawayDataAR = true;
          }
          
          let date = new Date();
          console.log('QUOTE REQUEST YRC METHOD CALL AR', date);
          this.giveRateDetails(this.reddawayArray);
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
        }
      }
    
        // }
      }

      rateCalculationForYRCReddawayCostplusNew(response:any, carrierType:any, category:any, factoring:any) {
        let date = new Date();
        console.log('RATE CALCULATION TIME FOR YRC', date);
        let discount, fuelSurcharge, rateId, amc, highCost, addCACharge, addRate, discountedRate:any,
          addSingleShipmentCharge, minimumClass, totalAssessorialCharge, assessorialCharge, customerBusinessRule:any = [], assessorialChargeArray = [], profileAssessorials = [];
        const weightArray = [], classificationArray = [], classification1 = [], finalRateArray = [], discountedRateArray = [],
          netChargeArray = [], netChargeResultArray = [], totalChargeArray = [];
        let finalRate = [], rate = [], crtRateArray = [], fuelSurchargeArray = [];
        const diffFinalRateArray = [], diffRateArray = [], discountArray = [], diffWeightArray = [];
        let profileMinimumCharge, profileLifeGateCharge, profileResidentialCharge, profileLimitedAccessDelivery,
          profileInsideDelivery, profileNotify, profileSingleShipment, singleShipmentsetMasterData,profiledeliveryAppointmentRequired, profilehazmat, profileLiftGatePickupCharge,profileResidentialPickupcharge,profilelimitedpickup;
        this.parseSetMasterData = [];
        let currentFinalRate, currentRate;
        let discountedRateCalculation;
        this.showDirections = '';
        // this.showSingleShipmentValue = false;
        this.showDeficitValue = false;
        this.showMinimumCharge = false;
        this.hideYrcData = false;
        this.localStorageArData = [];
        let staticData:any = localStorage.getItem('artableData');
        this.localStorageArData = JSON.parse(staticData);
        let costplusAp:any;
        // highcost = 0;
        if (carrierType === 'YRC') {
        this.YRCArray.forEach((ele:any) =>{
          if (ele.category === 'AP') {
          console.log('xxxx', ele);
          costplusAp =ele;
          
          }
          })
        }
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
              if (this.filterValues.state === 'CA' || this.filterValuesDest.state === 'CA') {
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
              if (this.filterValues.state === 'CA' || this.filterValuesDest.state === 'CA') {
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
          } else if (Number(additionalRateCalculation) > Number(response.result.additionalMaxRate)){
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
                { deliveryAppointmentRequired:profiledeliveryAppointmentRequired, 'id': 7 },
                { hazmat : profilehazmat, 'id':8},
                {liftGatePickup: profileLiftGatePickupCharge,'id': 10 },
                {residentialPickup: profileResidentialPickupcharge, 'id':11},
                {limitedaccesspickup: profilelimitedpickup,'id': 12});
            } else {
              if (this.getRuleForYRCAR.length > 0) {
                profileLifeGateCharge = this.getRuleForYRCAR[0].liftGateService;
                profileResidentialCharge = this.getRuleForYRCAR[0].residentialDelivery;
                profileLimitedAccessDelivery = this.getRuleForYRCAR[0].limitedAccessDelivery;
                profileInsideDelivery = this.getRuleForYRCAR[0].insideDelivery;
                profileNotify = this.getRuleForYRCAR[0].notify;
                profileSingleShipment = this.getRuleForYRCAR[0].singleShipment;
                profiledeliveryAppointmentRequired = this.getRuleForYRCAR[0].deliveryAppointmentRequired;
                profilehazmat = this.getRuleForYRCAR[0].hazmat;
                profileLiftGatePickupCharge = this.getRuleForYRCAR[0].liftGateService;
                profileResidentialPickupcharge = this.getRuleForYRCAR[0].residentialDelivery;         
               profilelimitedpickup = this.getRuleForYRCAR[0].limitedAccessDelivery;
                profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                  { residential: profileResidentialCharge, 'id': 2 },
                  { limitedAccessDelivery: profileLimitedAccessDelivery, 'id': 3 },
                  { insideDelivery: profileInsideDelivery, 'id': 4 },
                  { notify: profileNotify, 'id': 5 },
                  { deliveryAppointmentRequired:profiledeliveryAppointmentRequired, 'id': 7 },
                  { hazmat: profilehazmat, 'id': 8},
                  {liftGatePickup: profileLiftGatePickupCharge,'id': 10 },
                  {residentialPickup: profileResidentialPickupcharge, 'id':11},
                  {limitedaccesspickup: profilelimitedpickup,'id': 12});
              } else {
                profileAssessorials.push({ liftGate: '', 'id': 1 },
                  { residential: '', 'id': 2 },
                  { limitedAccessDelivery: '', 'id': 3 },
                  { insideDelivery: '', 'id': 4 },
                  { notify: '', 'id': 5 },
                  { deliveryAppointmentRequired: '', 'id': 7 },
                  { hazmat: '', 'id': 8},
                  {liftGatePickup: '','id': 10 },
                  {residentialPickup: '', 'id':11},
                  {limitedaccesspickup: '','id': 12});
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
            if (this.getRuleForYRCAR.length > 0) {
              profileLifeGateCharge = this.getRuleForYRCAR[0].liftGateService;
              profileResidentialCharge = this.getRuleForYRCAR[0].residentialDelivery;
              profileLimitedAccessDelivery = this.getRuleForYRCAR[0].limitedAccessDelivery;
              profileInsideDelivery = this.getRuleForYRCAR[0].insideDelivery;
              profileNotify = this.getRuleForYRCAR[0].notify;
              profileSingleShipment = this.getRuleForYRCAR[0].singleShipment;
              profiledeliveryAppointmentRequired = this.getRuleForYRCAR[0].deliveryAppointmentRequired;
              profilehazmat = this.getRuleForYRCAR[0].hazmat;
              profileLiftGatePickupCharge = this.getRuleForYRCAR[0].liftGateService;
              profileResidentialPickupcharge = this.getRuleForYRCAR[0].residentialDelivery;         
             profilelimitedpickup = this.getRuleForYRCAR[0].limitedAccessDelivery;
              profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                { residential: profileResidentialCharge, 'id': 2 },
                { limitedAccessDelivery: profileLimitedAccessDelivery, 'id': 3 },
                { insideDelivery: profileInsideDelivery, 'id': 4 },
                { notify: profileNotify, 'id': 5 },
                { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7 },
                { hazmat: profilehazmat, 'id': 8 },
                {liftGatePickup: profileLiftGatePickupCharge,'id': 10 },
                {residentialPickup: profileResidentialPickupcharge, 'id':11},
                {limitedaccesspickup: profilelimitedpickup,'id': 12});
            } else {
              profileAssessorials.push({ liftGate: '', 'id': 1 },
                { residential: '', 'id': 2 },
                { limitedAccessDelivery: '', 'id': 3 },
                { insideDelivery: '', 'id': 4 },
                { notify: '', 'id': 5 },
                {deliveryAppointmentRequired: '', 'id': 7},
                { hazmat: '', 'id': 8 },
                {liftGatePickup: '','id': 10 },
                {residentialPickup: '', 'id':11},
                {limitedaccesspickup: '','id': 12});
            }
          } else {
            profileAssessorials.push({ liftGate: '', 'id': 1 },
              { residential: '', 'id': 2 },
              { limitedAccessDelivery: '', 'id': 3 },
              { insideDelivery: '', 'id': 4 },
              { notify: '', 'id': 5 },
              { deliveryAppointmentRequired: '', 'id': 7},
              { hazmat: '', 'id': 8 },
              {liftGatePickup: '','id': 10 },
              {residentialPickup: '', 'id':11},
              {limitedaccesspickup: '','id': 12});
          }
        }
        discountArray.push(discount);
        fuelSurchargeArray.push(costplusAp.fuelCharge[0]);
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
        let finalRate11 = Number(costplusAp.totalGrossCharge) * Number(this.costPlusFactorForYRC)/100;
         finalRate = [];
         finalRate.push(costplusAp.totalGrossCharge);
        finalRate.push(finalRate11);
        console.log('costplus',finalRate11,costplusAp);
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
          discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusFactorForYRC));
        }
        console.log('CostplusDiscountedratecalculation',discountedRateCalculation);
        /* Comparing discounted Rate and the minCharge given in the customer business rules and Amc in set master data*/
        if (profileMinimumCharge !== undefined && profileMinimumCharge !== '' && profileMinimumCharge !== null) {
          if (Number(profileMinimumCharge) > Number(discountedRateCalculation)) {
            // discountedRate = Number(profileMinimumCharge);
            if (factoring !== 'COSTPLUS') {
              discountedRate = Number(profileMinimumCharge);
              console.log('profileFedex1 ', discountedRate);
            } else {
              discountedRate = (Number(profileMinimumCharge)* Number(this.costPlusFactorForYRC)).toFixed(2);
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
                discountedRate = (Number(amc)* Number(this.costPlusFactorForYRC)).toFixed(2);
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
        if(carrierType === 'YRC') {
          addCACharge = Number(response.result.additionalCharge);
        } else {
          addCACharge = Number(response.result.reddawayCaCharge );
    
        }
        highCost = 0;
        console.log('total',highCost,addCACharge,addSingleShipmentCharge,assessorialCharge)
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
        this.pricingInfo = {
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
          category: 'AR',
          showMinimumCharge: this.showMinimumCharge,
          shipTypes: this.showDirections,
          carrierType: carrierType,
          netChargeValue: netChargeValue,
          totalChargeForComparing: totalChargeForComparing,
          factor: factoring,
          costPlusPercent: this.costPlusFactorForYRC,
          totalWeight: this.weightForCal,
                    // higherValueAP: this.higherValueAP,
          showcolor: this.showcolor
        };    
        if (this.pricingInfo.carrierType === 'YRC') {
          this.YRCArray.push(this.pricingInfo);
          if (this.YRCArray.length > 2) {
            this.YRCArray.sort(function (a:any, b:any) {
              return (a.category - b.category);
            });

            let teeeArr = []
            let Ap = this.YRCArray.filter(function (el:any) {
              return el.category === 'AP';
            });
            teeeArr.push(Ap[0]);
            let Ar = this.YRCArray.filter(function (el:any) {
              return el.category === 'AR';
            });
            teeeArr.push(Ar[0]);
            let oldAp = this.YRCArray.filter(function (el:any) {
              return el.category === 'OLDAP';
            });
            teeeArr.push(oldAp[0]);
            console.log('jefrinnnnn', teeeArr);
this.YRCArray = [];
this.YRCArray = teeeArr;


            // if (this.YRCArray[0].category !== 'AP') {
            //   this.YRCArray.reverse();
            // }
          }
          console.log('this.YRCArray Sort', this.YRCArray);
          if (this.YRCArray.length > 2) {
            this.waitForProcessMessage = false;
            this.showAllData = true;
            this.hideYrcData = false;
            this.showYrcData = true;
            this.showYrcDataAR = true;
            this.showBorder = true;
            if (this.reddawayResponse === 'service not available') {
              this.showAllData = true;
              this.showMessageForAp = true;
            }
            let date = new Date();
            console.log('QUOTE REQUEST YRC METHOD CALL AR', date);
            this.giveRateDetails(this.YRCArray);
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          }
        }
        if (this.pricingInfo.carrierType === 'REDDAWAY') {
          this.reddawayArray.push(this.pricingInfo);
          this.waitForProcessMessage = false;
          this.waitForProcessMessageForReddaway = false;
          if (this.reddawayArray.length > 1) {
            this.reddawayArray.sort(function (a:any, b:any) {
              return (a.category - b.category);
            });
            if (this.reddawayArray[0].category !== 'AP') {
              this.reddawayArray.reverse();
            }
          }
          if (this.reddawayArray.length > 2) {
            console.log('this.reddawayArray Sort', this.reddawayArray);
            this.showAllData = true;
            this.showReddawayData = true;
            this.showReddawayDataAR = true;
            let date = new Date();
            console.log('QUOTE REQUEST REDDAWAY METHOD CALL AR', date);
            this.giveRateDetails(this.reddawayArray);
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          }
        }
      }
      
      rateCalculationForYRCReddaway2(response:any, carrierType:any, category:any, factoring:any) {
        let date = new Date();
        console.log('RATE CALCULATION TIME FOR YRC', date, response, carrierType, category, factoring);
        let discount, fuelSurcharge, rateId, amc, highCost, addCACharge, addRate, discountedRate,
          addSingleShipmentCharge, minimumClass, totalAssessorialCharge, assessorialCharge, customerBusinessRule:any = [], assessorialChargeArray = [], profileAssessorials = [];
        const weightArray = [], classificationArray = [], classification1 = [], finalRateArray = [], discountedRateArray = [],
          netChargeArray = [], netChargeResultArray = [], totalChargeArray = [];
        let finalRate = [], rate = [], crtRateArray = [], fuelSurchargeArray = [];
        const diffFinalRateArray = [], diffRateArray = [], discountArray = [], diffWeightArray = [];
        let profileMinimumCharge, profileLifeGateCharge, profileResidentialCharge, profileLimitedAccessDelivery,
          profileInsideDelivery, profileNotify, profileSingleShipment, singleShipmentsetMasterData, profiledeliveryAppointmentRequired,profilehazmat,profileLiftGatePickupCharge,profileResidentialPickupcharge,profilelimitedpickup;
        let currentFinalRate, currentRate, currentFinalDwRate, currentDwRate;
        let discountedRateCalculation;
        this.parseSetMasterData = [];
        this.showDirections = '';
        this.showCACharge = false;
        this.showHighCostDelivery = false;
        this.showDeficitValue = false;
        this.showMinimumCharge = false;
        this.hideYrcData = false;
        this.arrayData = [];
        const setMasterData:any = localStorage.getItem('artableData');
        this.localStorageArData = JSON.parse(setMasterData);
        if (category === 'AP') {
          /*set master data discount, minimum charge values which is stored in local storage */
          const setMasterData:any = localStorage.getItem('aptableData');
          this.parseSetMasterData = JSON.parse(setMasterData);
          console.log('this.parseSetMasterData YRC', this.parseSetMasterData);
          if (carrierType === 'YRC') {
            console.log('customerBusinessRule AP', response.result.yrcProfileRateAp);
            /* YRC AP customer rule will be as object it may contain discount, mc or it will return as empty {}*/
            if (Object.keys(response.result.yrcProfileRateAp).length === 0 || response.result.yrcProfileRateAp === '') {
              customerBusinessRule = [];
              console.log('customerBusinessRule', customerBusinessRule);
            } else {
              /*For yrc AP thr is no assessorial charges so inorder to calculate for all carrier,
              have added empty variable on it so that static values will be taken*/
              /*Customer specific rules*/
              if (response.result.yrcProfileRateAp.liftGateService !== undefined) {
                customerBusinessRule.push(response.result.yrcProfileRateAp);
                console.log('customerBusinessRule AP Else', customerBusinessRule);
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
                console.log('customerBusinessRule AP Else', customerBusinessRule);
              }
            }
          } else {
            customerBusinessRule = response.result.reddawayProfileRateAp;
            console.log('customerBusinessRule AP', customerBusinessRule);
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
            } 
          } else {
            customerBusinessRule = response.result.reddawayProfileRateAr;
            console.log('customerBusinessRule AR', customerBusinessRule);
          }
        }
        if (factoring !== 'COSTPLUS') {
          for (let i = 0; i < this.parseSetMasterData.length; i++) {
            if (this.parseSetMasterData[i].companyName === carrierType) {
              discount = this.parseSetMasterData[i].discount;
              fuelSurcharge = this.parseSetMasterData[i].fuelsurcharge;
              rateId = this.parseSetMasterData[i].recentRateId;
              amc = this.parseSetMasterData[i].amc;
              this.parseSetMasterData.assessorials = JSON.parse(this.parseSetMasterData[i].assessorials);
              console.log('this.parseSetMasterData.assessorials', this.parseSetMasterData.assessorials);
              if (this.parseSetMasterData.assessorials.length > 0) {
                for (let i = 0; i < this.parseSetMasterData.assessorials.length; i++) {
                  if (this.parseSetMasterData.assessorials[i].name === 'Single Shipment') {
                    singleShipmentsetMasterData = this.parseSetMasterData.assessorials[i];
                    break;
                  } else {
                    singleShipmentsetMasterData = '';
                  }
                }
              };
              this.profile = {
                companyName: carrierType, discount: discount,
                fuelsurcharge: fuelSurcharge, recentRateId: rateId, amc: amc, type: category
              };
              if (this.filterValues.state === 'CA' || this.filterValuesDest.state === 'CA') {
                if (this.parseSetMasterData[i].caCharge !== '' && this.parseSetMasterData[i].caCharge !== null && this.parseSetMasterData[i].caCharge !== undefined) {
                  addCACharge = Number(this.parseSetMasterData[i].caCharge);
                } else {
                  addCACharge = 0;
                }
              } else {
                addCACharge = 0;
              }
            }
            this.changeArValues(this.profile);
          }
        } else {
        for (let apData = 0; apData < this.parseSetMasterData.length; apData++) {
        if (this.parseSetMasterData[apData].companyName === carrierType) {
              discount = this.parseSetMasterData[apData].discount;
              fuelSurcharge = this.parseSetMasterData[apData].fuelsurcharge;
              rateId = this.parseSetMasterData[apData].recentRateId;
              amc = this.parseSetMasterData[apData].amc;
          // if (this.parseSetMasterData.assessorials.length > 0) {
          //       for (let i = 0; i < this.parseSetMasterData.assessorials.length; i++) {
          //         if (this.parseSetMasterData.assessorials[i].name === 'Single Shipment') {
          //           singleShipmentsetMasterData = this.parseSetMasterData.assessorials[i];
          //           break;
          //         } else {
          //           singleShipmentsetMasterData = '';
          //         }
          //       }
          //     };
          }
           this.profile = {
                companyName: carrierType, discount: discount,
                fuelsurcharge: fuelSurcharge, recentRateId: rateId, amc: amc, type: category
              };
              this.changeArValues(this.profile);
        }
          for (let i = 0; i < this.localStorageArData.length; i++) {
            if (this.localStorageArData[i].companyName === carrierType) {
              this.localStorageArData.assessorials = JSON.parse(this.localStorageArData[i].assessorials);
              if (this.localStorageArData.assessorials.length > 0) {
                for (let i = 0; i < this.localStorageArData.assessorials.length; i++) {
                  if (this.localStorageArData.assessorials[i].name === 'Single Shipment') {
                    singleShipmentsetMasterData = this.localStorageArData.assessorials[i];
                    console.log('singleShipmentMasterData', singleShipmentsetMasterData);
                    break;
                  } else {
                    singleShipmentsetMasterData = '';
                  }
                }
              }
              if (this.filterValues.state === 'CA' || this.filterValuesDest.state === 'CA') {
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
          } else if (Number(additionalRateCalculation) > Number(response.result.additionalMaxRate)){
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
                { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7},
                {hazmat: profilehazmat, 'id':8},
                {liftGatePickup: profileLiftGatePickupCharge, 'id': 10},
                {residentialPickup: profileResidentialPickupcharge, 'id': 11},
                {limitedaccesspickup: profilelimitedpickup, 'id': 12});
              this.profile = {};
              this.profile = {
                companyName: carrierType, fuelsurcharge: fuelSurcharge, type: category,
                recentRateId: rateId, discount: discount, amc: profileMinimumCharge
              };
              this.changeArValues(this.profile);
            } else {
              if (carrierType === 'YRC') {
                if (this.getRuleForYRCAR.length > 0) {
                  profileLifeGateCharge = this.getRuleForYRCAR[0].liftGateService;
                  profileResidentialCharge = this.getRuleForYRCAR[0].residentialDelivery;
                  profileLimitedAccessDelivery = this.getRuleForYRCAR[0].limitedAccessDelivery;
                  profileInsideDelivery = this.getRuleForYRCAR[0].insideDelivery;
                  profileNotify = this.getRuleForYRCAR[0].notify;
                  profileSingleShipment = this.getRuleForYRCAR[0].singleShipment;
                  profiledeliveryAppointmentRequired = this.getRuleForYRCAR[0].deliveryAppointmentRequired;
                  profilehazmat = this.getRuleForYRCAR[0].hazmat;
                  profileLiftGatePickupCharge = this.getRuleForYRCAR[0].liftGateService;
                  profileResidentialPickupcharge = this.getRuleForYRCAR[0].residentialDelivery;
                  profilelimitedpickup = this.getRuleForYRCAR[0].limitedAccessDelivery;
                  profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                    { residential: profileResidentialCharge, id: 2 },
                    { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
                    { insideDelivery: profileInsideDelivery, id: 4 },
                    { notify: profileNotify, id: 5 },
                    { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7},
                    {hazmat: profilehazmat, 'id':8},
                    {liftGatePickup: profileLiftGatePickupCharge, 'id': 10},
                {residentialPickup: profileResidentialPickupcharge, 'id': 11},
                {limitedaccesspickup: profilelimitedpickup, 'id': 12});
                  this.profile = {};
                  this.profile = {
                    companyName: carrierType, fuelsurcharge: fuelSurcharge, type: category,
                    recentRateId: rateId, discount: discount, amc: profileMinimumCharge
                  };
                } else {
                  profileAssessorials.push({ liftGate: '', 'id': 1 },
                    { residential: '', 'id': 2 },
                    { limitedAccessDelivery: '', 'id': 3 },
                    { insideDelivery: '', id: 4 },
                    { notify: '', 'id': 5 },
                    { deliveryAppointmentRequired: '', 'id': 7},
                    {hazmat: '', 'id':8},
                    {liftGatePickup: '', 'id': 10},
                {residentialPickup: '', 'id': 11},
                {limitedaccesspickup: '', 'id': 12}
                    );
                  this.profile = {
                    companyName: carrierType, fuelsurcharge: fuelSurcharge, type: category,
                    recentRateId: rateId, discount: discount, amc: profileMinimumCharge
                  };
                }
              } else {
                if (carrierType === 'REDDAWAY') {
                  if (this.getRuleForReddawayAR.length > 0) {
                    profileLifeGateCharge = this.getRuleForReddawayAR[0].liftGateService;
                    profileResidentialCharge = this.getRuleForReddawayAR[0].residentialDelivery;
                    profileLimitedAccessDelivery = this.getRuleForReddawayAR[0].limitedAccessDelivery;
                    profileInsideDelivery = this.getRuleForReddawayAR[0].insideDelivery;
                    profileNotify = this.getRuleForReddawayAR[0].notify;
                    profileSingleShipment = this.getRuleForReddawayAR[0].singleShipment;
                    profiledeliveryAppointmentRequired = this.getRuleForReddawayAR[0].deliveryAppointmentRequired;
                    profilehazmat = this.getRuleForReddawayAR[0].hazmat;
                    profileLiftGatePickupCharge = this.getRuleForReddawayAR[0].liftGateService;
                  profileResidentialPickupcharge = this.getRuleForReddawayAR[0].residentialDelivery;
                  profilelimitedpickup = this.getRuleForReddawayAR[0].limitedAccessDelivery;
    
                    profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                      { residential: profileResidentialCharge, id: 2 },
                      { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
                      { insideDelivery: profileInsideDelivery, id: 4 },
                      { notify: profileNotify, id: 5 },
                      {deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id: 7},
                      {hazmat: profilehazmat, id:8},
                      {liftGatePickup: profileLiftGatePickupCharge, 'id': 10},
                      {residentialPickup: profileResidentialPickupcharge, 'id': 11},
                      {limitedaccesspickup: profilelimitedpickup, 'id': 12});
                    this.profile = {};
                    this.profile = {
                      companyName: carrierType, fuelsurcharge: fuelSurcharge, type: category,
                      recentRateId: rateId, discount: discount, amc: profileMinimumCharge
                    };
                  } else {
                    profileAssessorials.push({ liftGate: '', 'id': 1 },
                      { residential: '', 'id': 2 },
                      { limitedAccessDelivery: '', 'id': 3 },
                      { insideDelivery: '', id: 4 },
                      { notify: '', 'id': 5 },
                       {deliveryAppointmentRequired: '', 'id': 7},
                       {hamzt:'','id':8},
                       {liftGatePickup: '', 'id': 10},
                       {residentialPickup: '', 'id': 11},
                       {limitedaccesspickup: '', 'id': 12});
                    this.profile = {
                      companyName: carrierType, fuelsurcharge: fuelSurcharge, type: category,
                      recentRateId: rateId, discount: discount, amc: profileMinimumCharge
                    };
                  }
                }
              }
              }  
            } 
          } else {
              if (response.result.shipTypes === 'Direct') {
                this.showDirections = 'Direct';
                discount = discount;
                fuelSurcharge = fuelSurcharge;
                this.profile = {
                  companyName: carrierType, discount: discount,
                  fuelsurcharge: fuelSurcharge, recentRateId: rateId, amc: amc, type: category
                };
                this.changeArValues(this.profile);
              } else {
                this.showDirections = 'Non-Direct';
                discount = 0;
                fuelSurcharge = fuelSurcharge;
                this.profile = {
                  companyName: carrierType, discount: discount,
                  fuelsurcharge: fuelSurcharge, recentRateId: rateId, amc: amc, type: category
                };
                this.changeArValues(this.profile);
              }
              if (factoring === 'COSTPLUS') {
                if (carrierType === 'YRC') {
                  if (this.getRuleForYRCAR.length > 0) {
                    profileLifeGateCharge = this.getRuleForYRCAR[0].liftGateService;
                    profileLiftGatePickupCharge = this.getRuleForYRCAR[0].liftGateService;
                    profileResidentialCharge = this.getRuleForYRCAR[0].residentialDelivery;
                    profileLimitedAccessDelivery = this.getRuleForYRCAR[0].limitedAccessDelivery;
                    profileInsideDelivery = this.getRuleForYRCAR[0].insideDelivery;
                    profileNotify = this.getRuleForYRCAR[0].notify;
                    profileSingleShipment = this.getRuleForYRCAR[0].singleShipment;
                    profiledeliveryAppointmentRequired = this.getRuleForYRCAR[0].deliveryAppointmentRequired;
                    profilehazmat = this.getRuleForYRCAR[0].hazmat;
                    profileResidentialPickupcharge = this.getRuleForYRCAR[0].residentialDelivery;
                    profileLiftGatePickupCharge = this.getRuleForYRCAR[0].liftGateService;
                  profilelimitedpickup = this.getRuleForYRCAR[0].limitedAccessDelivery;
                    profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                     {liftGatePickup: profileLiftGatePickupCharge, id: 10},
                      { residential: profileResidentialCharge, id: 2 },
                      { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
                      { insideDelivery: profileInsideDelivery, id: 4 },
                      { notify: profileNotify, id: 5 },
                      { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id : 7},
                      {hazmat: profilehazmat,id:8},
                      {liftGatePickup: profileLiftGatePickupCharge, 'id': 10},
                      {residentialPickup: profileResidentialPickupcharge, 'id': 11},
                      {limitedaccesspickup: profilelimitedpickup, 'id': 12});
                  } else {
                    profileAssessorials.push({ liftGate: '', 'id': 1 },
                      { residential: '', 'id': 2 },
                      { limitedAccessDelivery: '', 'id': 3 },
                      { insideDelivery: '', id: 4 },
                      { notify: '', 'id': 5 },
                      {deliveryAppointmentRequired: '' , 'id': 7},
                      {hazmat:'', 'id': 8},
                      {liftGatePickup: '', 'id': 10},
                      {residentialPickup: '', 'id': 11},
                      {limitedaccesspickup: '', 'id': 12}
                      );
                  }
                } else {
                  if (carrierType === 'REDDAWAY') {
                    if (this.getRuleForReddawayAR.length > 0) {
                      profileLifeGateCharge = this.getRuleForReddawayAR[0].liftGateService;
                      profileResidentialCharge = this.getRuleForReddawayAR[0].residentialDelivery;
                      profileLimitedAccessDelivery = this.getRuleForReddawayAR[0].limitedAccessDelivery;
                      profileInsideDelivery = this.getRuleForReddawayAR[0].insideDelivery;
                      profileNotify = this.getRuleForReddawayAR[0].notify;
                      profileSingleShipment = this.getRuleForReddawayAR[0].singleShipment;
                      profiledeliveryAppointmentRequired = this.getRuleForReddawayAR[0].deliveryAppointmentRequired;
                      profilehazmat = this.getRuleForReddawayAR[0].hazmat;
                      profileResidentialPickupcharge = this.getRuleForReddawayAR[0].residentialDelivery;
                      profileLiftGatePickupCharge = this.getRuleForReddawayAR[0].liftGateService;
                    profilelimitedpickup = this.getRuleForReddawayAR[0].limitedAccessDelivery;
                      profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                        { residential: profileResidentialCharge, id: 2 },
                        { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
                        { insideDelivery: profileInsideDelivery, id: 4 },
                        { notify: profileNotify, id: 5 },
                        { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id: 7},
                        {hazmat: profilehazmat , id:8},
                        {liftGatePickup: profileLiftGatePickupCharge, 'id': 10},
                        {residentialPickup: profileResidentialPickupcharge, 'id': 11},
                        {limitedaccesspickup: profilelimitedpickup, 'id': 12});
                    } else {
                      profileAssessorials.push({ liftGate: '', 'id': 1 },
                        { residential: '', 'id': 2 },
                        { limitedAccessDelivery: '', 'id': 3 },
                        { insideDelivery: '', id: 4 },
                        { notify: '', 'id': 5 },
                        {deliveryAppointmentRequired: '', 'id': 7},
                        {hazmat: '', 'id':8},
                        {liftGatePickup: '', 'id': 10},
                        {residentialPickup: '', 'id': 11},
                        {limitedaccesspickup: '', 'id': 12});
                    }
                  }
                }
              } else {
                profileAssessorials.push({ liftGate: '', 'id': 1 },
                  { residential: '', 'id': 2 },
                  { limitedAccessDelivery: '', 'id': 3 },
                  { insideDelivery: '', id: 4 },
                  { notify: '', 'id': 5 },
                  {deliveryAppointmentRequired: '', 'id': 7},
                  {hazmat:'', 'id':8},
                  {liftGatePickup: '', 'id': 10},
                        {residentialPickup: '', 'id': 11},
                        {limitedaccesspickup: '', 'id': 12});
              }
            }
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
            discountArray.push(discount);
            fuelSurchargeArray.push(fuelSurcharge);
            /*
            check the type is Rate or DwRate
             */
            /* For Category AR add 6% on Rate and Gross charge as per the 2019 rules  */
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
                      currentRate = Number(response.result.rate[t].rate) * this.increasedValueForAR;
                    } else {
                      currentFinalRate = Number(response.result.minCharges);
                      currentRate = Number(response.result.rate[t].rate);
                    }
                    finalRate.push(currentFinalRate.toFixed(2));
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
                      currentFinalDwRate = Number(response.result.rate[t].finalDWRate) * this.increasedValueForAR;
                    } else {
                      currentFinalDwRate = Number(response.result.rate[t].finalDWRate);
                    }
                    finalRate.push(currentFinalDwRate.toFixed(2));
                  }
                } else {
                  this.showMinimumCharge = false;
                  if (category === 'AR') {
                    currentFinalDwRate = Number(response.result.rate[t].finalDWRate) * this.increasedValueForAR;
                  } else {
                    currentFinalDwRate = Number(response.result.rate[t].finalDWRate);
                  }
                  finalRate.push(currentFinalDwRate.toFixed(2));
                }
                if (category === 'AR') {
                  currentDwRate = Number(response.result.rate[t].DWRate) * this.increasedValueForAR;
                } else {
                  currentDwRate = Number(response.result.rate[t].DWRate);
                }
                rate.push(currentDwRate.toFixed(2));
              }
            }
            this.finalRateCharge = this.netChargeArrSum(finalRate);
            /*Compare diffRate is given => if it is given deficit value will be taken diffRate, diffFinalRate and crtRate, if not normal rate and final rate is considered */
            if (response.result.diffRate === 0 && response.result.diffWeight === 0 && response.result.finalDiffRate === 0 && response.result.crtRate === 0) {
              this.showDeficitValue = false;
            } else {
              this.showDeficitValue = true;
              if (category === 'AR') {
                const currentDiffRate = Number(response.result.diffRate) * this.increasedValueForAR;
                diffRateArray.push(currentDiffRate.toFixed(2));
                const currentCrtRate = Number(response.result.crtRate) * this.increasedValueForAR;
                crtRateArray.push(currentCrtRate.toFixed(2));
                const currentFinalDiffRate = Number(response.result.finalDiffRate) * this.increasedValueForAR;
                diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
              } else {
                const currentDiffRate = Number(response.result.diffRate);
                diffRateArray.push(currentDiffRate.toFixed(2));
                const currentCrtRate = Number(response.result.crtRate);
                crtRateArray.push(currentCrtRate.toFixed(2));
                const currentFinalDiffRate = Number(response.result.finalDiffRate);
                diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
              }
              const weight = Number(response.result.diffWeight);
              diffWeightArray.push(weight);
              this.finalRateCharge = this.finalRateCharge + this.netChargeArrSum(diffRateArray);
            }
            /*Discounted Rate => finalRate * (1-(discount/100))*/
            console.log('discountedRateCalculation Before', this.finalRateCharge, 'discount', discount, this.costPlusFactorForYRC, this.costPlusFactorForReddaway);
            if (factoring !== 'COSTPLUS') {
               discountedRateCalculation = (this.finalRateCharge * (1 - (discount / 100)));
               console.log('discountedRateCalculation cost plus', discountedRateCalculation);
            } else {
              if (carrierType === 'YRC') {
                let discountedRateNewCalculation = (this.finalRateCharge * (1 - (discount / 100)));
                console.log('discountedRateNewCalculation', discountedRateNewCalculation);
                discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusFactorForYRC));
                console.log('discountedRateCalculation cost plus', discountedRateCalculation);
              } else {
                let discountedRateNewCalculation = (this.finalRateCharge * (1 - (discount / 100)));
                console.log('discountedRateNewCalculation', discountedRateNewCalculation);
                discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusFactorForReddaway));
                console.log('discountedRateCalculation cost plus', discountedRateCalculation);
              }
            }
            // Comparing discounted Rate and the minCharge given in the customer business rules
            console.log('profileMinimum Charge YRC', profileMinimumCharge, 'amc', amc, 'discountedRateCalculation', discountedRateCalculation);
            if (profileMinimumCharge !== undefined && profileMinimumCharge !== '' && profileMinimumCharge !== null) {
              if (Number(profileMinimumCharge) > Number(discountedRateCalculation)) {
                discountedRate = Number(profileMinimumCharge);
                console.log('profileMinimum1 ', discountedRate);
              } else {
                discountedRate = Number(discountedRateCalculation.toFixed(2));
                console.log('profileMinimum2 ', discountedRate);
              }
              // discountedRate = 9000
            } else {
              if (amc !== '' && amc !== null && amc !== undefined) {
                if (Number(amc) > Number(discountedRateCalculation)) {
                  discountedRate = Number(amc);
                  console.log('profileMinimum3 ', discountedRate);
                } else {
                  discountedRate = Number(discountedRateCalculation.toFixed(2));
                  console.log('profileMinimum4 ', discountedRate);
                }
              } else {
                discountedRate = Number(discountedRateCalculation.toFixed(2));
                console.log('profileMinimum4 ', discountedRate);
              }
              // discountedRate = 9000
    
            }
    //         let Apdiscountrate;
    //         console.log('jefrin',this.YRCArray);
    //         this.YRCArray.forEach((ee) => {
    //           if (ee.category === "AP") {
    //             console.log('jefrin',ee);
    //             Apdiscountrate = ee.discountedRate[0];
    //             if (Number(Apdiscountrate) > discountedRate) {
    //               console.log('jefrin',discount);
    //               let x = Apdiscountrate * 1.05;
    //               discountedRate = x;
    // this.showcolor = true;
    //               let y = x/((100-discount)/100);
    //               console.log('jefrin',y);
    //               finalRate.push(y);
    //               this.finalRateCharge = []
    //               this.finalRateCharge = this.netChargeArrSum(finalRate);
    
    //               // finalRateCharge
    //             }
    //           }
    //         })
    
            console.log('Final discount Rate YRCjef', discountedRate);
            discountedRateArray.push(discountedRate);
            /*Net charge => (1+(fuelSurchareg/100))*discountedRate */
            const netCharge = (1 + (fuelSurcharge / 100)) * discountedRate;
            netChargeArray.push(netCharge.toFixed(2));
            const netChargeResult = ((discountedRate) * (fuelSurcharge / 100));
            netChargeResultArray.push(netChargeResult.toFixed(2));
            let assessorialUnique = [], uniqueArray = [];
            console.log('this.selectedItems before duplicating', this.selectedItems);
            // assessorialUnique = this.getUnique(this.selectedItems, 'name');
            // console.log('assessorialUnique', assessorialUnique);
            uniqueArray = this.selectedItems;
            // if (uniqueArray.length > 0) {
            //   for (let a = 0; a < uniqueArray.length; a++) {
            //     // if (uniqueArray[a].itemName === 'LiftGate Delivery') {
            //     //   uniqueArray[a].itemName = 'LiftGate Delivery';
            //     // } else if (uniqueArray[a].itemName === 'LiftGate PickUp') {
            //     //   uniqueArray[a].itemName = 'LiftGate Delivery';
            //     // }else
            //      if (uniqueArray[a].itemName === 'Residential PickUp') {
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
              if (carrierType === 'YRC') {
                assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
              } else {
                assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
              }
            }
            assessorialCharge = assessorialChargeArray[0];
            this.arrayData = this.pricingInfoService.getAssessorial();
            const netChargeValue = this.netChargeArrSum(netChargeArray);
            if(carrierType === 'YRC') {
              addCACharge = Number(response.result.yrcCaCharge);
              this.logger = {
                'method': 'CAChargeYrc',
                'message': 'CAChargeAddedSuccessfully',
                'Value': addCACharge,
                'Category':category
              };
              this.loggerService.info(this.logger);
            } else {
              addCACharge = Number(response.result.reddawayCaCharge );
              this.logger = {
                'method': 'CAChargeReddaway',
                'message': 'CAChargeAddedSuccessfully',
                'Value': addCACharge,
                'Category':category
    
              };
              this.loggerService.info(this.logger);
        
            }
            totalAssessorialCharge = Number(highCost) + Number(addCACharge) + Number(addSingleShipmentCharge) + Number(assessorialCharge);
            /*totalCharge => Add netCharge, assessorialCharge, addCACharge, highCost, addSingleShipmentCharge */
            const totalCharge = Number(highCost) + Number(addCACharge) + Number(netChargeValue) + Number(addSingleShipmentCharge) + Number(assessorialCharge);
            totalChargeArray.push(totalCharge.toFixed(2));
            const totalChargeForComparing = this.netChargeArrSum(totalChargeArray);
            classification1.splice(0, 2);
            minimumClass = Math.min(...classificationArray);
            this.pricingInfo = {
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
              category: 'OLDAP',
              showMinimumCharge: this.showMinimumCharge,
              shipTypes: this.showDirections,
              carrierType: carrierType,
              totalChargeForComparing: totalChargeForComparing,
              factor: factoring,
              totalWeight: this.weightForCal,
              showcolor: this.showcolor
    
            };
            if (this.pricingInfo.carrierType === 'YRC') {
              this.YRCArray.push(this.pricingInfo);
              if (this.YRCArray.length > 2) {
                this.YRCArray.sort(function (a:any, b:any) {
                  return (a.category - b.category);
                });
                if (this.YRCArray[0].category !== 'AP') {
                  this.YRCArray.reverse();
                }
                let teeeArr = []
                let Ap = this.YRCArray.filter(function (el:any) {
                  return el.category === 'AP';
                });
                teeeArr.push(Ap[0]);
                let Ar = this.YRCArray.filter(function (el:any) {
                  return el.category === 'AR';
                });
                teeeArr.push(Ar[0]);
                let oldAp = this.YRCArray.filter(function (el:any) {
                  return el.category === 'OLDAP';
                });
                teeeArr.push(oldAp[0]);
                console.log('jefrinnnnn', teeeArr);
    this.YRCArray = [];
    this.YRCArray = teeeArr;
              }
              console.log('this.YRCArray Sort', this.YRCArray);
              if (this.YRCArray.length > 2) {
                this.waitForProcessMessage = false;
                this.showAllData = true;
                this.hideYrcData = false;
                this.showYrcData = true;
                this.showYrcDataAR = true;
                this.showBorder = true;
                if (this.reddawayResponse === 'service not available') {
                  this.showAllData = true;
                  this.showMessageForAp = true;
                }
                let date = new Date();
                console.log('QUOTE REQUEST YRC METHOD CALL AR', date);
                this.giveRateDetails(this.YRCArray);
                (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              }
            }
            if (this.pricingInfo.carrierType === 'REDDAWAY') {
              this.reddawayArray.push(this.pricingInfo);
              this.waitForProcessMessage = false;
              this.waitForProcessMessageForReddaway = false;
              if (this.reddawayArray.length > 1) {
                this.reddawayArray.sort(function (a:any, b:any) {
                  return (a.category - b.category);
                });
                if (this.reddawayArray[0].category !== 'AP') {
                  this.reddawayArray.reverse();
                }
              }
              if (this.reddawayArray.length > 2) {
                console.log('this.reddawayArray Sort', this.reddawayArray);
                this.showAllData = true;
                this.showReddawayData = true;
                this.showReddawayDataAR = true;
                let date = new Date();
                console.log('QUOTE REQUEST REDDAWAY METHOD CALL AR', date);
                this.giveRateDetails(this.reddawayArray);
                (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              }
            }
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
    

      rateCalculationForFedex(response:any, carrierType:any, category:any, factoring:any) {
        console.log('Request', response, carrierType, category, factoring);
               let date = new Date();
               console.log('RATE CALCULATION TIME FOR FEDEX', date);
               let discount, fuelSurcharge, rateId, amc, highCost, addRate, additionalRate, discountedRate, addSingleShipmentCharge,
                 assessorialCharge, minimumClass, originalDiffRateList, customerBusinessRule = [], totalAssessorialCharge, assessorialChargeArray = [];
               const weightArray = [], classificationArray = [], fedexRateArray = [], dwRate = [], classification1 = [];
               const finalRate = [], rate = [], diffRateArray = [], diffFinalRateArray = [],
                 crtRateArray = [], diffWeight = [], discountedRateArray = [], netChargeArray = [], netChargeResultArray = [],
                 totalChargeArray = [], profileAssessorials = [], discountArray = [], fuelSurchargeArray = [];
               let profileMinimumCharge, profileLifeGateCharge, profileResidentialCharge, profileInsideDelivery, profileLimitedAccessDelivery, profileNotify, profileSingleShipment, 
               singleShipmentsetMasterData,profiledeliveryAppointmentRequired,profilehazmat,profileLiftGatePickupCharge,profileResidentialPickupcharge,profilelimitedpickup;
               this.parseSetMasterData = [];
               let discountedRateCalculation;
               let currentFinalFedexRate, currentFedexRate, currentNewDWRate, addCACharge;
               this.showDeficitValueFedex = false;
               this.profile = {};
               this.pricingInfoFedexEconomy = {};
               this.finalRateCharge = 0;
               this.arrayData = [];
               this.showMinimumCharge = false;
               this.localStorageArData = [];
               let staticData:any = localStorage.getItem('artableData');
               this.localStorageArData = JSON.parse(staticData);
               /*set master data discount, minimum charge values which is stored in local storage based on the category*/
               if (category === 'AP') {
                 const setMasterData:any = localStorage.getItem('aptableData');
                 this.parseSetMasterData = JSON.parse(setMasterData);
                 console.log('masterApdata', this.parseSetMasterData);
                 /*Based on carrier type Fedex Economy and Fedex Priority*/
                 if (carrierType === 'FEDEX ECONOMY') {
                   customerBusinessRule = response.result.FEprofileRate;
                 } else {
                   customerBusinessRule = response.result.FPprofileRate;
                 }
                //  if (response.result.additionalRate === 0) {
                //   highCost = 0;
                // } else {
                //   highCost = Number(response.result.additionalRate);
                // }
                             } else {
                 const setMasterData:any = localStorage.getItem('artableData');
                 this.parseSetMasterData = JSON.parse(setMasterData);
                 if (carrierType === 'FEDEX ECONOMY') {
                   customerBusinessRule = response.result.FEprofileRate;
                 } else {
                   customerBusinessRule = response.result.FPprofileRate;
                 }
                //  if (response.result.additionalRate === 0) {
                //    highCost = 0;
                //  } else {
                //    highCost = Number(response.result.additionalRate);
                //  }
               }
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
                           console.log('singleShipmentMasterData', singleShipmentsetMasterData);
                           break;
                         } else {
                           singleShipmentsetMasterData = '';
                         }
                       }
                     }
                     this.profile = {
                       companyName: carrierType, discount: discount,
                       fuelsurcharge: fuelSurcharge, amc: amc,
                       recentRateId: rateId, type: category
                     };
                     this.changeArValues(this.profile);
                     console.log('Filtevalues', this.filterValues);
                     if (this.filterValues.state === 'CA' || this.filterValuesDest.state === 'CA') {
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
           for (let i = 0; i < this.parseSetMasterData.length; i++) {
                   if (this.parseSetMasterData[i].companyName === carrierType) {
                     discount = this.parseSetMasterData[i].discount;
                     fuelSurcharge = this.parseSetMasterData[i].fuelsurcharge;
                     rateId = this.parseSetMasterData[i].recentRateId;
                     amc = this.parseSetMasterData[i].amc;
                this.profile = {
                       companyName: carrierType, discount: discount,
                       fuelsurcharge: fuelSurcharge, amc: amc,
                       recentRateId: rateId, type: category
                     };
               }
               this.changeArValues(this.profile);
               }
                 for (let i = 0; i < this.localStorageArData.length; i++) {
                   if (this.localStorageArData[i].companyName === carrierType) {
                     this.localStorageArData.assessorials = JSON.parse(this.localStorageArData[i].assessorials);
                     if (this.localStorageArData.assessorials.length > 0) {
                       for (let i = 0; i < this.localStorageArData.assessorials.length; i++) {
                         if (this.localStorageArData.assessorials[i].name === 'Single Shipment') {
                           singleShipmentsetMasterData = this.localStorageArData.assessorials[i];
                           console.log('singleShipmentMasterData', singleShipmentsetMasterData);
                           break;
                         } else {
                           singleShipmentsetMasterData = '';
                         }
                       }
                     }
                     console.log('Filtevalues1', this.filterValues);

                     if (this.filterValues.state === 'CA' || this.filterValuesDest.state === 'CA') {
                      console.log('Filtevalues2', this.filterValues);

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
                 if (this.highCostForFedex !== '' && this.highCostForFedex!== null && this.highCostForFedex!==undefined) {
                   highCost = this.highCostForFedex;
                 } else {
                   highCost = 0;
                 }
               }
              //  if (category === "AP") {
              //    highcost = 0;
              //    highcost = response.
              //  }
              // highCost = response.result.fedexHighCost.origin + response.result.fedexHighCost.destination;

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
               if (response.result.additionalRate === 0) {
                 additionalRate = 0;
               } else {
                 additionalRate = response.result.additionalRate;
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
                   fuelSurcharge = fuelSurcharge;
                   this.profile = {
                     companyName: carrierType, discount: discount,
                     fuelsurcharge: fuelSurcharge, amc: profileMinimumCharge,
                     recentRateId: rateId, type: category
                   };
                   this.changeArValues(this.profile);
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
                     profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                       { residential: profileResidentialCharge, 'id': 2 },
                       { limitedAccessDelivery: profileLimitedAccessDelivery, 'id': 3 },
                       { insideDelivery: profileInsideDelivery, 'id': 4 },
                       { notify: profileNotify, 'id': 5 },
                       {deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7},
                       {hazmat: profilehazmat, 'id': 8},
                       {liftGatePickup: profileLiftGatePickupCharge,'id': 10 },
                       {residentialPickup: profileResidentialPickupcharge, 'id':11},
                       {limitedaccesspickup: profilelimitedpickup,'id': 12});
                   } else {
                     if (carrierType === 'FEDEX ECONOMY') {
                       if (this.getRuleForFedexEcoAR.length > 0) {
                         profileLifeGateCharge = this.getRuleForFedexEcoAR[0].liftGateService;
                         profileResidentialCharge = this.getRuleForFedexEcoAR[0].residentialDelivery;
                         profileLimitedAccessDelivery = this.getRuleForFedexEcoAR[0].limitedAccessDelivery;
                         profileInsideDelivery = this.getRuleForFedexEcoAR[0].insideDelivery;
                         profileNotify = this.getRuleForFedexEcoAR[0].notify;
                         profileSingleShipment = this.getRuleForFedexEcoAR[0].singleShipment;
                         profiledeliveryAppointmentRequired = this.getRuleForFedexEcoAR[0].deliveryAppointmentRequired;
                         profilehazmat = this.getRuleForFedexEcoAR[0].hazmat;
                         profileLiftGatePickupCharge = this.getRuleForFedexEcoAR[0].liftGateService;
                         profileResidentialPickupcharge = this.getRuleForFedexEcoAR[0].residentialDelivery;
                         profilelimitedpickup = this.getRuleForFedexEcoAR[0].limitedAccessDelivery;
                         profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                         { residential: profileResidentialCharge, 'id': 2 },
                         { limitedAccessDelivery: profileLimitedAccessDelivery, 'id': 3 },
                         { insideDelivery: profileInsideDelivery, 'id': 4 },
                         { notify: profileNotify, 'id': 5 },
                         {deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7},
                         {hazmat: profilehazmat,'id':8},
                         {liftGatePickup: profileLiftGatePickupCharge,'id': 10 },
                         {residentialPickup: profileResidentialPickupcharge, 'id':11},
                         {limitedaccesspickup: profilelimitedpickup,'id': 12});
                       } else {
                     profileAssessorials.push({ liftGate: '', 'id': 1 },
                       { residential: '', 'id': 2 },
                       { limitedAccessDelivery: '', 'id': 3 },
                       { insideDelivery: '', 'id': 4 },
                       { notify: '', 'id': 5 },
                       {deliveryAppointmentRequired: '', 'id': 7},
                       {hazmat: '', 'id':8},
                       {liftGatePickup: '','id': 10 },
                       {residentialPickup: '', 'id':11},
                       {limitedaccesspickup: '','id': 12});
                       }
                     } else {
                 if (this.getRuleForFedexPriAR.length > 0) {
                   profileLifeGateCharge = this.getRuleForFedexPriAR[0].liftGateService;
                   profileResidentialCharge = this.getRuleForFedexPriAR[0].residentialDelivery;
                   profileLimitedAccessDelivery = this.getRuleForFedexPriAR[0].limitedAccessDelivery;
                   profileInsideDelivery = this.getRuleForFedexPriAR[0].insideDelivery;
                   profileNotify = this.getRuleForFedexPriAR[0].notify;
                   profileSingleShipment = this.getRuleForFedexPriAR[0].singleShipment;
                   profiledeliveryAppointmentRequired = this.getRuleForFedexPriAR[0].deliveryAppointmentRequired;
                   profilehazmat = this.getRuleForFedexPriAR[0].hazmat;
                   profileLiftGatePickupCharge = this.getRuleForFedexPriAR[0].liftGateService;
                   profileResidentialPickupcharge = this.getRuleForFedexPriAR[0].residentialDelivery;
                   profilelimitedpickup = this.getRuleForFedexPriAR[0].limitedAccessDelivery;
                   profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                   { residential: profileResidentialCharge, 'id': 2 },
                   { limitedAccessDelivery: profileLimitedAccessDelivery, 'id': 3 },
                   { insideDelivery: profileInsideDelivery, 'id': 4 },
                   { notify: profileNotify, 'id': 5 },
                   {deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7},
                   {hazmat: profilehazmat, 'id': 8},
                   {liftGatePickup: profileLiftGatePickupCharge,'id': 10 },
                   {residentialPickup: profileResidentialPickupcharge, 'id':11},
                   {limitedaccesspickup: profilelimitedpickup,'id': 12});

                 } else {
                  profileAssessorials.push({ liftGate: '', 'id': 1 },
                  { residential: '', 'id': 2 },
                  { limitedAccessDelivery: '', 'id': 3 },
                  { insideDelivery: '', 'id': 4 },
                  { notify: '', 'id': 5 },
                  {deliveryAppointmentRequired: '', 'id' : 7},
                  {hazmat: '', 'id': 8},
                  {liftGatePickup: '','id': 10 },
                  {residentialPickup: '', 'id':11},
                  {limitedaccesspickup: '','id': 12});
                 }
               }
             }
           }
           } else {
               if (response.result.discount === 0) {
                 discount = discount;
                 fuelSurcharge = fuelSurcharge;
                 this.profile = {
                   companyName: carrierType, discount: discount,
                   fuelsurcharge: fuelSurcharge, amc: amc,
                   recentRateId: rateId, type: category
                 };
                 this.changeArValues(this.profile);
               } else {
                 discount = response.result.discount;
                 fuelSurcharge = fuelSurcharge;
                 this.profile = {
                   companyName: carrierType, discount: discount,
                   fuelsurcharge: fuelSurcharge, amc: amc,
                   recentRateId: rateId, type: category
                 };
                 this.changeArValues(this.profile);
               }
               if (factoring !== 'COSTPLUS') {
                 profileAssessorials.push({ liftGate: '', 'id': 1 },
                   { residential: '', 'id': 2 },
                   { limitedAccessDelivery: '', 'id': 3 },
                   { insideDelivery: '', 'id': 4 },
                   { notify: '', 'id': 5 },
                   {deliveryAppointmentRequired: '', 'id': 7},
                   {hazmat:'', 'id':8},
                   {liftGatePickup: '','id': 10 },
                   {residentialPickup: '', 'id':11},
                   {limitedaccesspickup: '','id': 12});
               } else {
                 if (carrierType === 'FEDEX ECONOMY') {
                   if (this.getRuleForFedexEcoAR.length > 0) {
                     profileLifeGateCharge = this.getRuleForFedexEcoAR[0].liftGateService;
                     profileResidentialCharge = this.getRuleForFedexEcoAR[0].residentialDelivery;
                     profileLimitedAccessDelivery = this.getRuleForFedexEcoAR[0].limitedAccessDelivery;
                     profileInsideDelivery = this.getRuleForFedexEcoAR[0].insideDelivery;
                     profileNotify = this.getRuleForFedexEcoAR[0].notify;
                     profileSingleShipment = this.getRuleForFedexEcoAR[0].singleShipment;
                     profiledeliveryAppointmentRequired = this.getRuleForFedexEcoAR[0].deliveryAppointmentRequired;
                     profilehazmat = this.getRuleForFedexEcoAR[0].hazmat;
                     profileLiftGatePickupCharge = this.getRuleForFedexEcoAR[0].liftGateService;
                     profileResidentialPickupcharge = this.getRuleForFedexEcoAR[0].residentialDelivery;
                     profilelimitedpickup = this.getRuleForFedexEcoAR[0].limitedAccessDelivery;

                     profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                     { residential: profileResidentialCharge, 'id': 2 },
                     { limitedAccessDelivery: profileLimitedAccessDelivery, 'id': 3 },
                     { insideDelivery: profileInsideDelivery, 'id': 4 },
                     { notify: profileNotify, 'id': 5 },
                     { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7},
                     {hazmat: profilehazmat, 'id':8},
                     {liftGatePickup: profileLiftGatePickupCharge,'id': 10 },
                     {residentialPickup: profileResidentialPickupcharge, 'id':11},
                     {limitedaccesspickup: profilelimitedpickup,'id': 12});
                   } else {
                     profileAssessorials.push({ liftGate: '', 'id': 1 },
                       { residential: '', 'id': 2 },
                       { limitedAccessDelivery: '', 'id': 3 },
                       { insideDelivery: '', 'id': 4 },
                       { notify: '', 'id': 5 },
                       {deliveryAppointmentRequired: '', 'id': 7},
                       {hazmat: '', 'id':8},
                       {liftGatePickup: '','id': 10 },
                       {residentialPickup: '', 'id':11},
                       {limitedaccesspickup: '','id': 12});
                   }
                 } else {
                   if (this.getRuleForFedexPriAR.length > 0) {
                     profileLifeGateCharge = this.getRuleForFedexPriAR[0].liftGateService;
                     profileResidentialCharge = this.getRuleForFedexPriAR[0].residentialDelivery;
                     profileLimitedAccessDelivery = this.getRuleForFedexPriAR[0].limitedAccessDelivery;
                     profileInsideDelivery = this.getRuleForFedexPriAR[0].insideDelivery;
                     profileNotify = this.getRuleForFedexPriAR[0].notify;
                     profileSingleShipment = this.getRuleForFedexPriAR[0].singleShipment;
                     profiledeliveryAppointmentRequired = this.getRuleForFedexPriAR[0].deliveryAppointmentRequired;
                     profilehazmat = this.getRuleForFedexPriAR[0].hazmat;
                     profileLiftGatePickupCharge = this.getRuleForFedexPriAR[0].liftGateService;
                     profileResidentialPickupcharge = this.getRuleForFedexPriAR[0].residentialDelivery;
                     profilelimitedpickup = this.getRuleForFedexPriAR[0].limitedAccessDelivery;

                     profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
                     { residential: profileResidentialCharge, 'id': 2 },
                     { limitedAccessDelivery: profileLimitedAccessDelivery, 'id': 3 },
                     { insideDelivery: profileInsideDelivery, 'id': 4 },
                     { notify: profileNotify, 'id': 5 },
                     {deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7},
                     {hazmat: profilehazmat, 'id': 8},
                     {liftGatePickup: profileLiftGatePickupCharge,'id': 10 },
                     {residentialPickup: profileResidentialPickupcharge, 'id':11},
                     {limitedaccesspickup: profilelimitedpickup,'id': 12});
                   } else {
                     profileAssessorials.push({ liftGate: '', 'id': 1 },
                       { residential: '', 'id': 2 },
                       { limitedAccessDelivery: '', 'id': 3 },
                       { insideDelivery: '', 'id': 4 },
                       { notify: '', 'id': 5 },
                       {deliveryAppointmentRequired: '', 'id' : 7},
                       {hazmat: '', 'id': 8},
                       {liftGatePickup: '','id': 10 },
                       {residentialPickup: '', 'id':11},
                       {limitedaccesspickup: '','id': 12});
                   }
                 }
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
                 const fedexRateNew = Number(response.result.rate[i].finalRate) * this.increasedValueForAR;
                 fedexRateArray.push(fedexRateNew.toFixed(2));
               } else {
                 const fedexRateNew = Number(response.result.rate[i].finalRate);
                 fedexRateArray.push(fedexRateNew.toFixed(2));
               }
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
                 finalRate.push(currentFinalFedexRate.toFixed(2));
               } else {
                 this.showMinimumCharge = false;
                 if (category === 'AR') {
                   currentFinalFedexRate = Number(response.result.rate[f].finalRate) * this.increasedValueForAR;
                 } else {
                   currentFinalFedexRate = Number(response.result.rate[f].finalRate);
                 }
                 finalRate.push(currentFinalFedexRate.toFixed(2));
               }
               if (category === 'AR') {
                 currentFedexRate = Number(response.result.rate[f].rate) * this.increasedValueForAR;
                 currentNewDWRate = Number(response.result.rate[f].DWRate) * this.increasedValueForAR;
               } else {
                 currentFedexRate = Number(response.result.rate[f].rate);
                 currentNewDWRate = Number(response.result.rate[f].DWRate)
               }
               rate.push(currentFedexRate.toFixed(2));
               dwRate.push(currentNewDWRate.toFixed(2));
             }
             this.finalRateCharge = this.netChargeArrSum(finalRate);
             originalDiffRateList = response.result.originalDiffRateList[0];
             if (originalDiffRateList.diffRate === 0 && originalDiffRateList.diffWeight === 0 && originalDiffRateList.crtRate === 0) {
               this.showDeficitValueFedex = false;
             } else {
               this.showDeficitValueFedex = true;
               if (category === 'AR') {
                 const currentDiffRate = Number(originalDiffRateList.diffRate) * this.increasedValueForAR;
                 diffRateArray.push(currentDiffRate.toFixed(2));
                 const currentCrtRate = Number(originalDiffRateList.crtRate) * this.increasedValueForAR;
                 crtRateArray.push(currentCrtRate.toFixed(2));
                 const currentFinalDiffRate = Number(originalDiffRateList.finalDiffRate) * this.increasedValueForAR;
                 diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
               } else {
                 const currentDiffRate = Number(originalDiffRateList.diffRate);
                 diffRateArray.push(currentDiffRate.toFixed(2));
                 const currentCrtRate = Number(originalDiffRateList.crtRate);
                 crtRateArray.push(currentCrtRate.toFixed(2));
                 const currentFinalDiffRate = Number(originalDiffRateList.finalDiffRate);
                 diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
               }
               const weight = Number(originalDiffRateList.diffWeight);
               diffWeight.push(weight);
               this.finalRateCharge = this.finalRateCharge + this.netChargeArrSum(diffRateArray);
             }
             console.log(this.finalRateCharge)
            //  this.finalRateCharge = this.finalRateCharge + Number(highCost);
            //  console.log(this.finalRateCharge)
             if (factoring !== 'COSTPLUS') {
               discountedRateCalculation = (this.finalRateCharge * (1 - (discount / 100)));
             } else {
               if (carrierType === 'FEDEX ECONOMY') {
                 let discountedRateNewCalculation = (this.finalRateCharge * (1 - (discount / 100)));
                 discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusFactorForFedexEco));
               } else {
                 let discountedRateNewCalculation = (this.finalRateCharge * (1 - (discount / 100)));
                 discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusFactorForFedexPri));
               }
             }
             console.log('profileMinimum F', profileMinimumCharge, 'amc', amc);
             console.log('profileMinimumFedex1', profileMinimumCharge, 'amc', amc, 'discountedRateCalculation', discountedRateCalculation);
             if (profileMinimumCharge !== undefined && profileMinimumCharge !== '' && profileMinimumCharge !== null) {
               if (Number(profileMinimumCharge) > Number(discountedRateCalculation)) {
                 discountedRate = Number(profileMinimumCharge);
                 console.log('profileFedex1 ', discountedRate);
               } else {
                 discountedRate = Number(discountedRateCalculation.toFixed(2));
                 console.log('profileFedex2 ', discountedRate);
               }
             } else {
               if (amc !== '' && amc !== null && amc !== undefined) {
                 if (Number(amc) > Number(discountedRateCalculation)) {
                   discountedRate = Number(amc);
                   console.log('profileFedex3 ', discountedRate);
                 } else {
                   discountedRate = Number(discountedRateCalculation.toFixed(2));
                   console.log('profileFedex4 ', discountedRate);
                 }
               } else {
                 discountedRate = Number(discountedRateCalculation.toFixed(2));
                 console.log('profileFedex4 ', discountedRate);
               }
             }
             console.log('Final discount Rate Fedex', discountedRate);
             let newDiscountedRate = discountedRate + Number(highCost);
             discountedRateArray.push(newDiscountedRate);
             const netCharge = (1 + (fuelSurcharge / 100)) * (newDiscountedRate);
             netChargeArray.push(netCharge.toFixed(2));
             const netChargeResult = ((newDiscountedRate) * (fuelSurcharge / 100));
            //  discountedRateArray.push(discountedRate);
            //  const netCharge = (1 + (fuelSurcharge / 100)) * (discountedRate);
            //  netChargeArray.push(netCharge.toFixed(2));
            //  const netChargeResult = ((discountedRate) * (fuelSurcharge / 100));
             netChargeResultArray.push(netChargeResult.toFixed(2));
             const netChargeValue = this.netChargeArrSum(netChargeArray);
             let assessorialUnique = [], uniqueArray = [];
             console.log('this.selectedItems before duplicating', this.selectedItems);
            //  assessorialUnique = this.getUnique(this.selectedItems, 'name');
            //  console.log('assessorialUnique', assessorialUnique);
             uniqueArray = this.selectedItems;
            //  if (uniqueArray.length > 0) {
            //   for (let a = 0; a < uniqueArray.length; a++) {
            //     // if (uniqueArray[a].itemName === 'LiftGate Delivery') {
            //     //   uniqueArray[a].itemName = 'LiftGate Delivery';
            //     // } else if (uniqueArray[a].itemName === 'LiftGate PickUp') {
            //     //   uniqueArray[a].itemName = 'LiftGate Delivery';
            //     // }else 
            //     if (uniqueArray[a].itemName === 'Residential PickUp') {
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
            //  }
             if (factoring !== 'COSTPLUS') {
               assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.parseSetMasterData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
             } else {
               assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
             }
             assessorialCharge = assessorialChargeArray[0];
             this.arrayData = this.pricingInfoService.getAssessorial();
             if(carrierType === 'FEDEX ECONOMY') {
              addCACharge = Number(response.result.fxfeCaCharge);
              this.logger = {
                'method': 'CAChargeEconomy',
                'message': 'CAChargeAddedSuccessfully',
                'Value': addCACharge,
                'Category':category
              };
              this.loggerService.info(this.logger);
            } else {
              addCACharge = Number(response.result.fxfpCaCharge);
              this.logger = {
                'method': 'CAChargePriority',
                'message': 'CAChargeAddedSuccessfully',
                'Value': addCACharge,
                'Category':category
              };
              this.loggerService.info(this.logger);
        
            }
            let peakCharge = response.result.peakSurcharge;

            console.log(addCACharge);
             totalAssessorialCharge = Number(assessorialCharge)  + Number(additionalRate) + Number(addSingleShipmentCharge) + Number(addCACharge) + Number(peakCharge);
             const totalCharge = (Number(netChargeValue)) + Number(additionalRate) + Number(addSingleShipmentCharge) + Number(assessorialCharge) + Number(addCACharge) + Number(peakCharge);
             console.log(totalAssessorialCharge, totalCharge);
             totalChargeArray.push(totalCharge.toFixed(2));
             classification1.splice(0, 2);
             const totalChargeForComparing = this.netChargeArrSum(totalChargeArray);
             console.log('addCACharge', addCACharge);
             this.pricingInfoFedexEconomy = {
               rate: rate,
               finalRate: finalRate,
               discount: discountArray,
               fuelCharge: fuelSurchargeArray,
               discountedRate: discountedRateArray,
               netCharge: netChargeArray,
               totalCharge: totalChargeArray,
               assessorialCharge: assessorialCharge,
               totalGrossCharge: this.finalRateCharge.toFixed(2),
               /*totalRate: totalFullFedexRate,*/
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
               deliveryCharge: additionalRate,
               netChargeResult: netChargeResultArray,
               netChargeDiffResult: netChargeResultArray,
               highCostDeliveryCharge: highCost,
               additionalCharge: addCACharge,
               additionalCACharge: addCACharge,
               category: category,
               carrierType: carrierType,
               showMinimumCharge: this.showMinimumCharge,
               shipTypes: this.showDirections,
               totalChargeForComparing: totalChargeForComparing,
               factor: factoring,
               totalWeight: this.weightForCal, 
               fedexHighcost: response.result.fedexHighCost,
               showcolor: false,
               peakSurcharge:peakCharge


             };
             if (this.pricingInfoFedexEconomy.carrierType === 'FEDEX ECONOMY') {
               this.fedexArray.push(this.pricingInfoFedexEconomy);
               if (this.fedexArray.length > 1) {
                 this.fedexArray.sort(function (a:any, b:any) {
                   return (a.category - b.category);
                 });
                 if (this.fedexArray[0].category !== 'AP') {
                   this.fedexArray.reverse();
                 }
               }
             } else {
               this.priority.push(this.pricingInfoFedexEconomy);
               if (this.priority.length > 1) {
                 this.priority.sort(function (a:any, b:any) {
                   return (a.category - b.category);
                 });
                 if (this.priority[0].category !== 'AP') {
                   this.priority.reverse();
                 }
               }
             }
             console.log('this.fedexArray length', this.fedexArray, this.priority);
             if (this.fedexArray.length > 1 && this.priority.length > 1) {
               this.showLoader = false;
               this.showAllData = true;
               this.showFedexPriData = true;
               this.hideFedexPriData = false;
               this.showFedexEcoData = true;
               this.showFedexEcoDataAR = true;
               this.hideFedexEcoData = false;
               this.showBorder1 = true;
               let date = new Date();
               if (this.fedexArray[0].totalCharge[0] > this.fedexArray[1].totalCharge[0]) {
                // this.showNegativeMargin = true;
                let charge = Number(this.fedexArray[0].totalCharge)/0.95;
                let addedCharge = charge + Number(this.fedexArray[0].totalCharge)
                let charegArry = [];
                this.fedexArray[1].totalCharge = [];
                console.log('jjj',this.fedexArray);
      
                charegArry.push(charge.toFixed(2));
                this.fedexArray[1].totalCharge = charegArry;
                this.fedexArray[1].showcolor = true;
                console.log('jjj',this.fedexArray,charegArry);
      
                // this.showData = false;
              }

              if (this.priority[0].totalCharge[0] > this.priority[1].totalCharge[0]) {
                // this.showNegativeMargin = true;
                let charge = Number(this.priority[0].totalCharge)/0.95;
                let addedCharge = charge + Number(this.priority[0].totalCharge)
                let charegArry = [];
                this.priority[1].totalCharge = [];
                console.log('jjj',this.priority);
      
                charegArry.push(charge.toFixed(2));
                this.priority[1].totalCharge = charegArry;
                this.priority[1].showcolor = true;
                console.log('jjj',this.priority,charegArry);
      
                // this.showData = false;
              }
               console.log('QUOTE REQUEST METHOD FEDEX CALL AR', date);
               let array = [];
               this.giveRateDetails(this.fedexArray);
               this.giveRateDetails(this.priority);
               (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
             }
           } 
    removeLocal() {
      localStorage.removeItem('aptableData');
      localStorage.removeItem('artableData');
      return '';
    }
  }
