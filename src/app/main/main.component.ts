import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
// import { Http, Response } from '@angular/http';
import { ValidationService } from '../services/validation.service';
import { PricingInfoService } from '../services/pricing-info.service';
import { LoggerService } from '../services/logger.service';
import { CustomerService } from '../services/customer.service';
import { ErrorMessageComponent } from '../common/error-message.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastrService } from 'ngx-toastr';
// import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { ExternalService } from '../services/external.service';
// import { IfObservable } from 'rxjs/observable/IfObservable';
import { increasePercentForAR } from '../app.constant';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
// import wordsToNumbers from 'words-to-numbers';
declare var $: any;
 
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  /*@ViewChild('customer') private elementRef: ElementRef;

  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }*/
  transportOrigin: FormGroup = new FormGroup({});
  userData: any;
  pricingInfo: any;
  pricingInfoFedexEconomy: any;
  pricingInfoFedexPriority: any;
  listOfApValues: any;
  listOfArValues: any;
  quoteDetails: any;
  selectedItems: any = [];
  showTableZip = false;
  originZipArray: any = [];
  showTableZip1 = false;
  destinationZipArray: any = [];

  public mailResponse: any;
  public loader = false;
  public showBorder = false;
  public showAllData = false;
  public showAllYrcData = false;
  public showYrcData = false;
  public showFedexEcoData = false;
  public showFedexPriData = false;
  public showAllFedexEconomyData = false;
  public showAllFedexPriData = false;
  public showTooltip = false;
  public showDeficitValue = false;
  public showCheckForWeight = false;
  public hideYrcData = true;
  public hideFedexEcoData = false;
  public hideFedexPriData = false;
  public viewAllShowYrcData = false;
  public viewAllShowFedexEcoData = false;
  public viewAllShowFedexPriData = false;
  public showReddawayData = false;
  public showAllReddawayData = false;
  public hideReddawayData = false;
  public yrcResponse = false;
  public reddawayResponse = false;
  public reddawayResultAR: any;
  public fedexResponse = false;
  public fedexResponseAR = false;
  public showTable = false;
  public showTableAp = true;
  public totalRate: any;
  public totalValue:any;
  public totalValueAR: any;
  public parsetableApData: any;
  public parsetableArData: any;
  public parsetableFedexArData: any;
  public yrcDiscountAP: any;
  public yrcDiscountAR: any;
  public reddawayDiscountAP: any;
  public reddawayDiscountAR: any;
  public fedexEcoDiscountAR: any;
  public fedexPriDiscountAR: any;
  public yrcFuelsurchargeAP: any;
  public yrcFuelsurchargeAR: any;
  public reddawayFuelsurchargeAP: any;
  public reddawayFuelsurchargeAR: any;
  public fuelChargeYrcAP: any;
  public fuelChargeYrcAR: any;
  public fuelChargeReddawayAP: any;
  public fuelChargeReddawayAR: any;
  public fedexEcoDiscountAP: any;
  public fedexPriDiscountAP: any;
  public fedexEcoFuelsurchargeAP: any;
  public fedexPriFuelsurchargeAP: any;
  public fedexEcoFuelsurchargeAR: any;
  public fedexPriFuelsurchargeAR: any;
  public pricingDetail: any = [];
  public showRemoveIcon = false;
  public showRemoveIconDest = false;
  public showClearAll = false;
  public weightForCal: any;
  public showMinimumCharge = false;
  public showMinimumChargeAr = false;
  public getZipcodeValues: any;
  public showZipcodes = false;
  public showZipcodeDest = false;
  public filterValues: any;
  public filterValuesDest: any;
  public filterValuesState: any;
  public filterValuesDestState: any;
  public customerFeatures: any;
  public customerFeaturesAll: any;
  public customerData: any;
  public showYrcDataAR = false;
  public showMessageAp = false;
  public errorMessage: any = false;
  public errorMessageDest: any;
  public customerId: any;
  public customerName: any;
  public assessorials: any = [];
  public fedexApRate: any = [];
  public carrierName: any;
  public quote: any;
  public quoteId: any;
  public arrayData:any = [];
  public arrayDataYrc = [];
  public arrayDataReddaway = [];
  public arrayDataAR = [];
  public selectedValueYrc: any;
  public selectedValueAR: any;
  public selectedValue: any;
  public showErrorCustomer = false;
  public invalidErrorWeightMessage = false;
  public disableGetQuote = false;
  public errorValue = false;
  public showQuoteId = false;
  public addExtraValues: any;
  public salesRepId: any;
  public setSalesRepId: any;
  public finalRateCharge: any;
  public yrcArResponse: any;
  public fedexArResponse: any;
  public logger: any;
  public noshipmentData = false;
  public yrcAPFinalRateArray: any;
  public yrcARFinalRateArray: any;
  public reddawayAPFinalRateArray: any;
  public reddawayARFinalRateArray: any;
  public quoteDetailsArray: any = [];
  public addSingleShipmentValue: any;
  public showSingleShipmentValue = false;
  public showHighCostCharges = false;
  public showAdditionalCharge = false;
  public showErrorInternetConnection = false;
  public showAdminErrorMessage = false;
  public showChooseClass = false;
  public fedexAPFinalRateArray: any;
  public fedexARFinalRateArray: any;
  public netChargeValue: any;
  public netChargeDiffValue: any;
  public netChargePriValue: any;
  public netChargeDiffPriValue: any;
  public accessToken: any;
  public yrcResponseResult: any =[];
  public reddawayResponseResult: any;
  public assessorialArray = [];
  public arrayDataPriorityAR = [];
  public selectedValueEconomyAR: any;
  public selectedValuePriorityAR: any;
  public selectedValueReddaway: any;
  public showSingleShipmentValuePriorityAR = false;
  public showSingleShipmentValueEconomyAR = false;
  public showMinimumChargeForYrcAr = false;
  public showMinimumChargeForYrcAp = false;
  public addSingleShipmentValuePriorityAR: any;
  public addSingleShipmentValueEconomyAR: any;
  public onlineOffline: boolean = navigator.onLine;
  public parseSetMasterData: any;
  public resultArray: any = [];
  public showDirections: any;
  public salesRep: any;
  public salesRepValues: any;
  public salesRepType: any;
  public customerType: any;
  public carrierArray: any = [];
  public externalCustomerData: any;
  public showData = false;
  public resultObject:any = {};
  public carrierResponse: any;
  public operationMessage = false;
  public errorGetRateMsg = false;
  consigneeTemplatesPresent = false;
  public hideData = false;
  public hideshipmentData = false;
  public showServiceNotAvailableMsg = false;
  public showForInternalCustomer = false;
  public showErrorMessageForClass = false;
  public showErrorMessageForCarrier = false;
  public showIfNoRule = false;
  public salesRepDetails: any;
  public companyId: any;
  public modalData: any;
  public assessorialList: any = [];
  public openType: any;
  public itemTemplate: any;
  public itemTemplateAutoFill: any;
  public itemTemplatesPresent = false;
  public showClassForExternalCustomer = false;
  public showClassTable = false;
  public showViewTemplate = false;
  public hideViewTemplate = false;
  public noViewTemplate = false;
  public totalWeight: any = [];
  public singleShipmentValue:any;
  public response: any;
  public singleShipmentsetMasterData: any;
  public singleShipmentCharge: any;
  public getQuoteFlag = false;
  public noshipmentDestData = false;
  public finalTotalWeight: any;
  public singleShipmentFlag = false;
  public transitTime: any;
  public increasedValueForAR = Number(increasePercentForAR);
  public split: any;
  public costPlusArray: any;
  public applyCostPlusFlag = false;
  public responseForYRCAp: any;
  public responseForFedexAp: any;
  public responseForReddawayAp: any;
  public costPlusPercentFactor: any;
  public companyDetails: any;
  public localStorageArData: any;
  public highCostForFedex: any;
  public getARRule: any;
  public quoteDetailsId: any;
  public higherValueAP = false;
  public errorMsgForNorule = false;
  noshipmentDataMessage = false;
  emergencyStop = false;
  emergencyStopYRC = true;
  emergencyStopPriority = true;
  emergencyStopEconomy = true;
  emergencyStopReddaway= true;
  classArray:any = [50, 55, 60, 65, 70, 77, 77.5, 85, 92, 92.5, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];
  // dropdownSettings = {
  //   singleSelection: false,
  //   text: 'Select',
  //   enableCheckAll: false,
  //   unSelectAllText: 'UnSelect All',
  //   /*badgeShowLimit: '1',*/
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

  ];

  carrierValues = ['YRC', 'FEDEX ECONOMY', 'FEDEX PRIORITY', 'REDDAWAY'];
  highcostArray: any =[];
  showcolor = false;
  showNegativeMargin = false;
  showZiperror: any = false;
  selectedIndex = 0;

  /*
   *To clear local storage
   */
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
  }
  constructor(private formBuilder: FormBuilder, private pricingInfoService: PricingInfoService,
    private router: Router, private toastr: ToastrService,
    private loggerService: LoggerService, 
    // private hotkeysService: HotkeysService,
    private customerService: CustomerService, private externalService: ExternalService) {
    this.viewAllShowYrcData = true;
    this.viewAllShowFedexEcoData = true;
    this.viewAllShowFedexPriData = true;
    window.addEventListener('online', () => {
      this.onlineOffline = true;
    });
    window.addEventListener('offline', () => {
      this.onlineOffline = false;
    });
    // this.hotkeysService.add(new Hotkey('esc', (event: KeyboardEvent): boolean => {
    //   this.clear();
    //   return false; // Prevent bubbling
    // }));
    // this.hotkeysService.add(new Hotkey('a', (event: KeyboardEvent): boolean => {
    //   $('#classification').focus();
    //   return false; // Prevent bubbling
    // }));
  }

  ngOnInit() {
    this.accessToken = localStorage.getItem('accessToken');
    this.localStorageSalesData();
    this.information();
    // this.getCustomerNotes();
    this.getApData();
    this.getArData();
    $("#success-alert").hide();
  }

  localStorageSalesData() {
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.accessToken = localStorage.getItem(('accessToken'));
    this.salesRepValues = JSON.parse(this.salesRep);
    // let emergencyActive = localStorage.getItem(('EmergencyButton'));
    // console.log(emergencyActive);
    // this.emergencyStop = JSON.parse(emergencyActive);
    this.emergencyStatus();
    this.salesRepId = this.salesRepValues.id;
    this.salesRepType = this.salesRepValues.type;
    this.customerType = localStorage.getItem(('customerType'));
    this.costPlusArray = [];
    if (this.customerType === 'admin') {
      this.showForInternalCustomer = true;
      this.showClassForExternalCustomer = false;
      // this.
      this.carrierArray = [];
      this.customerId = 0;
      // this.setSalesRepId = this.salesRepValues.id;
      if (this.salesRepType === 'administrator' || this.salesRepType === 'customerServiceRep') {
        this.getAllCompanyDetails();
      } else {
        this.getCompanyDetailsOfSalesRep();
      }
      //   document.getElementById('customer').focus();
      this.noViewTemplate = true;
    } else {
      this.companyId = this.salesRepValues.companyId;
      this.setSalesRepId = this.salesRepValues.salesRepId;
      this.errorMsgForNorule = false;
      this.customerService.getCarrierForCustomer(this.companyId, this.accessToken).subscribe(data => {
        this.externalCustomerData = data;
        this.transportOrigin.patchValue({ customer: this.salesRepValues.companyName });
        (document.getElementById('originZipCode')as HTMLFormElement).focus();
        if (this.externalCustomerData) {
          this.pricingInfoService.getInternalSalesRep(this.salesRepValues.salesRepId, this.accessToken).subscribe((data: any) => {
            this.salesRepDetails = data[0];
            console.log('this.salesRepDetails', this.salesRepDetails);
          });
        }
        this.showForInternalCustomer = false;
        this.showClassForExternalCustomer = true;
        this.customerId = this.salesRepValues.id;
        this.costPlusArray = [];
        this.carrierArray = [];
        if (this.externalCustomerData.length > 0) {
          for (let i = 0; i < this.externalCustomerData.length; i++) {
            if (this.externalCustomerData[i].category === 'AR') {
              this.carrierArray.push(this.externalCustomerData[i].type);
            }
          }
          let costPlusNewArray = [];
          if (this.carrierArray.length > 0) {
            this.carrierArray = this.removeDuplicates(this.carrierArray);
            this.carrierArray.forEach((ele: any, index: any) => {
              if(ele === 'YRC') {
                if(this.emergencyStopYRC === false) {
                  this.carrierArray.splice(index,1)
                }
              } 
               if(ele === 'FEDEX ECONOMY') {
                if(this.emergencyStopEconomy === false) {
                  this.carrierArray.splice(index,1)
                } 
              } 
               if(ele === 'FEDEX PRIORITY') {
                if(this.emergencyStopPriority === false) {
                  this.carrierArray.splice(index,1)
                }
              } 
               if(ele === 'REDDAWAY') {
                if(this.emergencyStopReddaway === false) {
                  this.carrierArray.splice(index,1)
                }
              }
            })
            if (this.salesRepValues.companyDetails.costPlus === true) {
              if (this.salesRepValues.companyDetails.costPlusFactor.length > 0) {
                costPlusNewArray = this.salesRepValues.companyDetails.costPlusFactor;
                this.costPlusArray = costPlusNewArray;
              }
            }
            let newArray = [];
            if (costPlusNewArray.length > 0) {
              for (let c = 0; c < costPlusNewArray.length; c++) {
                this.carrierArray.push(costPlusNewArray[c].carrier);
                this.carrierArray = this.removeDuplicates(this.carrierArray);
                this.carrierArray.forEach((ele: any, index: any) => {
                  if(ele === 'YRC') {
                    if(this.emergencyStopYRC === false) {
                      this.carrierArray.splice(index,1)
                    }
                  } 
                   if(ele === 'FEDEX ECONOMY') {
                    if(this.emergencyStopEconomy === false) {
                      this.carrierArray.splice(index,1)
                    } 
                  } 
                   if(ele === 'FEDEX PRIORITY') {
                    if(this.emergencyStopPriority === false) {
                      this.carrierArray.splice(index,1)
                    }
                  } 
                   if(ele === 'REDDAWAY') {
                    if(this.emergencyStopReddaway === false) {
                      this.carrierArray.splice(index,1)
                    }
                  }
                })
              }
            }
          } else {
            this.carrierArray = [];
            this.errorGetRateMsg = false;
            let costPlusNewArray = [];
            this.costPlusArray = [];
            if (this.salesRepValues.companyDetails.costPlus === true) {
              if (this.salesRepValues.companyDetails.costPlusFactor.length > 0) {
                costPlusNewArray = this.salesRepValues.companyDetails.costPlusFactor;
                this.costPlusArray = costPlusNewArray;
              }
            }
            let newArray = [];
            if (costPlusNewArray.length > 0) {
              for (let c = 0; c < costPlusNewArray.length; c++) {
                newArray.push(costPlusNewArray[c].carrier);
                this.carrierArray = this.removeDuplicates(newArray);
              }
            }
            if (this.carrierArray.length > 0) {
            } else {
              this.transportOrigin.patchValue({ carrier: 'No Rule' });
              this.errorMsgForNorule = true;
            }
          }
        } else {
          this.carrierArray = [];
          this.costPlusArray = [];
          this.errorGetRateMsg = false;
          let costPlusNewArray = [];
          if (this.salesRepValues.companyDetails.costPlus === true) {
            if (this.salesRepValues.companyDetails.costPlusFactor.length > 0) {
              costPlusNewArray = this.salesRepValues.companyDetails.costPlusFactor;
              this.costPlusArray = costPlusNewArray;
              if (costPlusNewArray.length > 0) {
                for (let c = 0; c < costPlusNewArray.length; c++) {
                  this.carrierArray.push(costPlusNewArray[c].carrier);
                  this.carrierArray = this.removeDuplicates(this.carrierArray);
                }
              }
            }
          } else {
            this.carrierArray = [];
            this.errorGetRateMsg = true;
            this.transportOrigin.patchValue({ carrier: 'No Rule' });
            this.errorMsgForNorule = true;
          }
        }
        console.log(this.carrierArray);
        this.carrierArray.forEach((ele: any, index: any) => {
          if(ele === 'YRC') {
            if(this.emergencyStopYRC === false) {
              this.carrierArray.splice(index,1)
            }
          } 
           if(ele === 'FEDEX ECONOMY') {
            if(this.emergencyStopEconomy === false) {
              this.carrierArray.splice(index,1)
            } 
          } 
           if(ele === 'FEDEX PRIORITY') {
            if(this.emergencyStopPriority === false) {
              this.carrierArray.splice(index,1)
            }
          } 
           if(ele === 'REDDAWAY') {
            if(this.emergencyStopReddaway === false) {
              this.carrierArray.splice(index,1)
            }
          }
        })
      });
      this.itemTemplateData();
    }
  }
  // emergencyStatus() {
  //   this.pricingInfoService.getEmergencyStatus().subscribe((res) => {
  //     console.log(res);
  //     if (res.emergencyService === 'stop') {
  //       this.emergencyStop = false;
  //       console.log(this.emergencyStop)
  //     } else {
  //       this.emergencyStop = true;
  //     }
  //   })
  // }

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
  removeDuplicates(arr: any) {
    let unique_array = []
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) === -1) {
        unique_array.push(arr[i]);
      }
    }
    return unique_array;
  }
  information() {
    this.transportOrigin = this.formBuilder.group({
      origin: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      destination: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      classification: ['', [Validators.minLength(1), Validators.maxLength(6)]],
      weight: [''],
      customer: ['', [Validators.required]],
      carrier: ['', [Validators.required]]
    });
  }

  getAllCompanyDetails() {
    this.customerService.getCompanyDetails(this.accessToken).subscribe(response => {
      this.customerFeaturesAll = response;
    });
  }

  getCompanyDetailsOfSalesRep() {
    this.customerService.getCompanyDetailsBySalesRepId(this.salesRepId, this.accessToken).subscribe(response => {
      this.customerFeaturesAll = response;
    });
  }
  /*
   *Getting the AP and AR data
   */
  getSalesData() {
    if (localStorage.getItem('aptableData') === null) {
      this.getApData();
    } else {
      const tableData: any = localStorage.getItem('aptableData');
      this.listOfApValues = JSON.parse(tableData);
    }
    if (localStorage.getItem('artableData') === null) {
      this.getArData();
    } else {
      const tableArData: any = localStorage.getItem('artableData');
      this.listOfArValues = JSON.parse(tableArData);
    }
  }

  /* Getting the AP and AR data from table*/
  getApData() {
    this.pricingInfoService.getApForm().subscribe(data => {
      this.listOfApValues = data;
      if (this.listOfApValues.length > 0) {
        this.showTableAp = true;
        const tableApData = JSON.stringify(this.listOfApValues);
        localStorage.setItem('aptableData', tableApData);
      } else {
        this.showTableAp = false;
      }
    });
  }

  getArData() {
    this.pricingInfoService.getArForm().subscribe((data: any) => {
      this.listOfArValues = data;
      if (this.listOfArValues.length > 0) {
        this.showTableAp = true;
        const tableArData = JSON.stringify(this.listOfArValues);
        localStorage.setItem('artableData', tableArData);
      } else {
        this.showTableAp = false;
      }
    });
  }

  /*get the customer notes*/
  getCustomerNotes() {
    this.customerService.getCompanyDetails(this.accessToken).subscribe(getCustomerData => {
      this.customerFeaturesAll = getCustomerData;
      // this.customerFeaturesAll.sort(this.dynamicSort("companyName"));

    });
  }


  dynamicSort(property: any) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a: any, b: any) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  /**
   *  To display remove icon
   */

  checkOrigin(origin: any) {
    if (origin.target.value.length === 5) {

    if (origin.target.value === '') {
      this.showRemoveIcon = false;
      this.errorMessage = false;
    } else {
      this.showRemoveIcon = true;
      // this.getCity(origin);
      this.getCityState1(origin.target.value,'origin')
    }
  }
  }

  getCity(origin: any) {
    this.noshipmentData = false;

    this.pricingInfoService.getCityState(origin).subscribe((getArrayValues:any) => {
      this.getZipcodeValues = getArrayValues;
      // console.log(getArrayValues.lookupCityResponse);
      // console.log(getArrayValues.lookupCityResponse.cities);
      // console.log(getArrayValues.lookupCityResponse.cities.city);
      // let cityAndState: any = getArrayValues.lookupCityResponse.cities.city;
      if (this.getZipcodeValues.length > 0) {
        for (let i = 0; i < this.getZipcodeValues.length; i++) {
          this.filterValues = this.getZipcodeValues[i];
          this.filterValuesState = this.getZipcodeValues[i].state;
          // if (this.filterValuesState === 'HI' || this.filterValuesState === 'AK' ) {
          //  this.noshipmentData = true;
          // } else {
          this.showZipcodes = true;
          this.errorMessage = false;
          (document.getElementById('destinationZipCode') as HTMLFormElement).focus();
          // }
        }
      } else {
        this.showZipcodes = false;
        this.errorMessage = true;
        (document.getElementById('originZipCode') as HTMLFormElement).focus();
      }
      this.logger = { 'method': 'getCityState', 'message': 'Info Message', 'Origin Zipcode': origin };
      this.loggerService.info(this.logger);
    });
  }




  checkDestination(destination: any) {
    if (destination.target.value.length === 5) {
    if (destination.target.value === '') {
      this.showRemoveIconDest = false;
      this.errorMessageDest = false;
    } else {
      this.showRemoveIconDest = true;
      // this.getCityDest(destination);
      this.getCityState1(destination.target.value,'destination')

    }
  }
  }

  getCityDest(destination: any) {
    this.getQuoteFlag = true;
    this.noshipmentDestData = false;

    this.pricingInfoService.getCityState(destination).subscribe(getArrayValues => {
      this.getZipcodeValues = getArrayValues;
      if (this.getZipcodeValues.length > 0) {
        for (let i = 0; i < this.getZipcodeValues.length; i++) {
          this.filterValuesDest = this.getZipcodeValues[i];
          this.filterValuesDestState = this.getZipcodeValues[i].state;
          // if (this.filterValuesDestState === 'HI' || this.filterValuesDestState === 'AK' ) {
          //   this.noshipmentDestData = true;
          //  } else {
          this.showZipcodeDest = true;
          this.errorMessageDest = false;
          (document.getElementById('classification') as HTMLFormElement).focus();
          //  }
        }
      } else {
        this.showZipcodeDest = false;
        this.errorMessageDest = true;
        (document.getElementById('destinationZipCode') as HTMLFormElement).focus();
      }
      this.logger = { 'method': 'getCityState', 'message': 'Info Message', 'Destination': destination };
      this.loggerService.info(this.logger);
    });
  }

  getCityNameValue(value: any, type: any) {
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
      (document.getElementById('destinationZipCode') as HTMLFormElement).focus();
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
        (document.getElementById('classification')as HTMLFormElement).focus();
       }
console.log(this.showZipcodes, this.filterValues,this.filterValuesDest);
    }
 

  }
  getCityState1(zipCode: any, type: any) {
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
            CityArray.forEach((ele: any) => {
              this.originZipArray.push({'cityName': ele, 'state':cityAndState[0].state})
            })
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
            CityArray.forEach((ele: any) => {
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
                  this.filterValuesDestState = cityAndState[0].state;
                  if (this.filterValuesDestState === 'HI' || this.filterValuesDestState === 'AK' ) {
                    this.noshipmentDestData = true;
                   } else {
                  this.showZipcodeDest = true;
                  this.errorMessageDest = false;
                  (document.getElementById('classification')as HTMLFormElement).focus();
                   }
          }

        }
      }
      // this.getZipcodeValues = getArrayValues;
      // if (this.getZipcodeValues.length > 0) {
      //   for (let i = 0; i < this.getZipcodeValues.length; i++) {
      //     if (type === 'origin') {

      //       this.filterValues = this.getZipcodeValues[i];
      //       this.filterValuesState = this.getZipcodeValues[i].state;
      //       if (this.filterValuesState === 'HI' || this.filterValuesState === 'AK' ) {
      //         this.noshipmentData = true;
      //        } else {
      //       this.showZipcodes = true;
      //       this.errorMessage = false;
      //       document.getElementById('destinationZipCode').focus();
      //        }
      //     } else {
      //       this.filterValuesDest = this.getZipcodeValues[i];
      //       this.filterValuesDestState = this.getZipcodeValues[i].state;
      //       if (this.filterValuesDestState === 'HI' || this.filterValuesDestState === 'AK' ) {
      //         this.noshipmentDestData = true;
      //        } else {
      //       this.showZipcodeDest = true;
      //       this.errorMessageDest = false;
      //       document.getElementById('classification').focus();
      //        }
      //     }
      //   }
      // } else {
      //   if (type === 'origin') {
      //     this.showZipcodes = false;
      //     this.errorMessage = true;
      //     document.getElementById('originZipCode').focus();
      //   } else {
      //     this.showZipcodeDest = false;
      //     this.errorMessageDest = true;
      //     document.getElementById('destinationZipCode').focus();
      //   }
      // }
      this.logger = { 'method': 'getCityState', 'message': 'Info Message', 'Zipcode': zipCode };
      this.loggerService.info(this.logger);
    });
  }


  checkForZipCode(zipCode: any, type: any) {
    let zipcode;
    if (zipCode.key === 'Enter' && type === 'origin') {
      zipcode = zipCode.target.value;
      (document.getElementById('destinationZipCode')as HTMLFormElement).focus();
    } else if (zipCode.key === 'Enter' && type === 'destination') {
      zipcode = zipCode.target.value;
      (document.getElementById('classification')as HTMLFormElement).focus();
    } else {
      zipcode = zipCode;
    }
    if (zipCode === '') {
      this.showRemoveIcon = false;
      this.errorMessage = false;
      this.showRemoveIconDest = false;
      this.errorMessageDest = false;
      this.showZipcodes = false;
      this.showZipcodeDest = false;
    } else {
      if (type === 'origin') {
        this.showRemoveIcon = true;
        this.getCityState(zipCode, type);
      } else {
        this.showRemoveIconDest = true;
        this.getCityState(zipCode, type);
      }
    }
  }

  getCityState(zipCode: any, type: any) {    
    this.noshipmentData = false;

    this.pricingInfoService.getCityState(zipCode).subscribe(getArrayValues => {
      this.getZipcodeValues = getArrayValues;
      if (this.getZipcodeValues.length > 0) {
        for (let i = 0; i < this.getZipcodeValues.length; i++) {
          if (type === 'origin') {
            this.filterValues = this.getZipcodeValues[i];
            this.filterValuesState = this.getZipcodeValues[i].state;
            this.showZipcodes = true;
            this.errorMessage = false;
            (document.getElementById('destinationZipCode')as HTMLFormElement).focus();
          } else {
            this.filterValuesDest = this.getZipcodeValues[i];
            this.filterValuesDestState = this.getZipcodeValues[i].state;
            this.showZipcodeDest = true;
            this.errorMessageDest = false;
            (document.getElementById('classification')as HTMLFormElement).focus();
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
  checkForClass(event: any) {
    let classificationData;
    if (event.target.value !== '') {
    (document.getElementById('weight')as HTMLFormElement).focus();
    if (event.key === 'Enter') {
      classificationData = this.classArray.filter(function (el:any) {
        return el === Number(event.target.value);
      });
    } else {
      classificationData = this.classArray.filter(function (el:any) {
        return el === Number(event);
      });
    }
    if (classificationData.length > 0) {
      this.showErrorMessageForClass = false;
      (document.getElementById('weight')as HTMLFormElement).focus();
    } else {
      this.showErrorMessageForClass = true;
      (document.getElementById('classification')as HTMLFormElement).focus();
      this.transportOrigin.patchValue({ classification: '' });
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
    let event;
    let data = [];
    this.carrierResponse = {};
    this.carrierArray = [];
    this.errorGetRateMsg = false;
    this.errorMsgForNorule = false;
    this.transportOrigin.patchValue({ carrier: '' });
    if (customer.key === 'Enter') {
      event = Number(customer.target.value);
    } else {
      event = Number(customer);
    }
    if (this.customerFeaturesAll.length > 0) {
      for (let c = 0; c < this.customerFeaturesAll.length; c++) {
        if (event === this.customerFeaturesAll[c].id) {
          this.companyDetails = this.customerFeaturesAll[c];
          this.customerData = this.customerFeaturesAll[c].ratingNotes;
          // this.customerId = this.customerFeaturesAll[c].id;
          this.companyId = this.customerFeaturesAll[c].id;
          this.setSalesRepId = this.customerFeaturesAll[c].salesRepId;
          this.customerName = this.customerFeaturesAll[c].customerName;
          this.salesRepValues.companyName = this.customerFeaturesAll[c].companyName;
          this.showErrorCustomer = false;
          this.getQuoteFlag = true;
          this.transportOrigin.patchValue({ ratingNotes: this.customerData });
          (document.getElementById('originZipCode')as HTMLFormElement).focus();
          this.itemTemplateData();
          this.customerService.getCarrierForCustomer(this.companyId, this.accessToken).subscribe(response => {
            this.carrierResponse = response;
            this.pricingInfoService.getInternalSalesRep(this.customerFeaturesAll[c].salesRepId, this.accessToken).subscribe((data: any) => {
              this.salesRepDetails = data[0];
            });
            if (this.carrierResponse.length > 0) {
              for (let d = 0; d < this.carrierResponse.length; d++) {
                this.carrierArray.push(this.carrierResponse[d].type);
              }
              if (this.carrierArray.length > 0) {
                this.carrierArray = this.removeDuplicates(this.carrierArray);
                this.carrierArray.forEach((ele: any, index: any) => {
                  if(ele === 'YRC') {
                    if(this.emergencyStopYRC === false) {
                      this.carrierArray.splice(index,1)
                    }
                  } 
                   if(ele === 'FEDEX ECONOMY') {
                    if(this.emergencyStopEconomy === false) {
                      this.carrierArray.splice(index,1)
                    } 
                  } 
                   if(ele === 'FEDEX PRIORITY') {
                    if(this.emergencyStopPriority === false) {
                      this.carrierArray.splice(index,1)
                    }
                  } 
                   if(ele === 'REDDAWAY') {
                    if(this.emergencyStopReddaway === false) {
                      this.carrierArray.splice(index,1)
                    }
                  }
                })
              }
              if (this.companyDetails.costPlus === true) {
                if (this.companyDetails.costPlusFactor.length > 0) {
                  this.costPlusArray = this.companyDetails.costPlusFactor;
                }
              } else {
                this.costPlusArray = [];
              }
              if (this.carrierArray.length > 0) {
                if (this.costPlusArray.length > 0) {
                  for (let c = 0; c < this.costPlusArray.length; c++) {
                    this.carrierArray.push(this.costPlusArray[c].carrier);
                    this.carrierArray = this.removeDuplicates(this.carrierArray);
                  }
                }
              } else {
                if (this.costPlusArray.length > 0) {
                  for (let c = 0; c < this.costPlusArray.length; c++) {
                    this.carrierArray.push(this.costPlusArray[c].carrier);
                  }
                } else {
                  this.carrierArray = [];
                  this.costPlusArray = [];
                }
              }
              console.log(this.carrierArray)
         
            } else {
              this.carrierArray = [];
              this.costPlusArray = [];
              this.errorGetRateMsg = false;
              if (this.companyDetails.costPlus === true) {
                if (this.companyDetails.costPlusFactor.length > 0) {
                  this.costPlusArray = this.companyDetails.costPlusFactor;
                  if (this.costPlusArray.length > 0) {
                    for (let c = 0; c < this.costPlusArray.length; c++) {
                      this.carrierArray.push(this.costPlusArray[c].carrier);
                      this.carrierArray = this.removeDuplicates(this.carrierArray);
                      this.carrierArray.forEach((ele: any, index: any) => {
                        if(ele === 'YRC') {
                          if(this.emergencyStopYRC === false) {
                            this.carrierArray.splice(index,1)
                          }
                        } 
                         if(ele === 'FEDEX ECONOMY') {
                          if(this.emergencyStopEconomy === false) {
                            this.carrierArray.splice(index,1)
                          } 
                        } 
                         if(ele === 'FEDEX PRIORITY') {
                          if(this.emergencyStopPriority === false) {
                            this.carrierArray.splice(index,1)
                          }
                        } 
                         if(ele === 'REDDAWAY') {
                          if(this.emergencyStopReddaway === false) {
                            this.carrierArray.splice(index,1)
                          }
                        }
                      })
                    }
                  }
                }
              } else {
                 this.carrierArray = [];
                this.costPlusArray = [];
                this.errorGetRateMsg = true;
                this.transportOrigin.patchValue({ carrier: 'No Rule' });
                this.errorMsgForNorule = true;
              }
            }
          });
          break;
        } else {
          (document.getElementById('customer')as HTMLFormElement).focus();
        }
      }
    }
  }

  /**
   *  Removing Origin and destination zipcode
   */
  remove(removeData: any) {
    if (removeData === 'origin') {
      this.transportOrigin.patchValue({ origin: '' });
      this.showRemoveIcon = false;
      this.showZipcodes = false;
      this.pricingDetail = [];
      this.errorMessage = false;
      this.showTable = false;
      this.showAllData = false;
      this.filterValues = '';
      this.getQuoteFlag = true;
      (document.getElementById('originZipCode')as HTMLFormElement).focus();
    } else {
      this.transportOrigin.patchValue({ destination: '' });
      this.showRemoveIconDest = false;
      this.showZipcodeDest = false;
      this.pricingDetail = [];
      this.errorMessageDest = false;
      this.showTable = false;
      this.showAllData = false;
      this.filterValuesDest = '';
      this.getQuoteFlag = true;
      (document.getElementById('destinationZipCode')as HTMLFormElement).focus();
    }
  }

  /**
   * Clearing all input values
   */
  clear() {
    if (this.transportOrigin.controls['carrier'].value === 'No Rule') {
      this.transportOrigin.patchValue({
        origin: '', destination: ''
      });
    } else {
      this.transportOrigin.patchValue({
        origin: '', destination: '', carrier: ''
      });
    }
    this.selectedItems = [];
    this.pricingDetail = [];
    this.showRemoveIcon = false;
    this.loader = false;
    this.errorMessage = false;
    this.noshipmentData = false;
    this.errorMessageDest = false;
    this.showRemoveIconDest = false;
    this.showTable = false;
    this.showData = false;
    this.hideData = false;
    this.showZipcodes = false;
    this.showZipcodeDest = false;
    this.showClearAll = false;
    this.showZipcodeDest = false;
    this.showAdminErrorMessage = false;
    this.showServiceNotAvailableMsg = false;
    this.showIfNoRule = false;
    this.getQuoteFlag = true;
  }

  checkForCarrier(event: any, formValue: any) {
    let carrierData;

    let carrierAr = [];
    this.applyCostPlusFlag = false;
    // this.showData = true;

    if (event.key === 'Enter') {
      carrierData = event.target.value;
    } else {
      carrierData = event;
    }
    if (this.carrierArray.length > 0) {
      for (let i = 0; i < this.carrierArray.length; i++) {
        if (carrierData === this.carrierArray[i]) {
          carrierAr.push(this.carrierArray[i]);
          break;
        }
      }
    }
    if (carrierAr.length > 0) {
      if (this.costPlusArray.length > 0) {
        for (let c = 0; c < this.costPlusArray.length; c++) {
          if (carrierAr[0] === this.costPlusArray[c].carrier) {
            this.applyCostPlusFlag = true;
            let factorValue = this.costPlusArray[c].factor;
            this.costPlusPercentFactor = 1 + (Number(factorValue) / 100);
            this.getQuoteFlag = true;
            break;
          } else {
            this.applyCostPlusFlag = false;
            this.getQuoteFlag = true;
          }
        }
      }
    } else {
      if (this.costPlusArray.length > 0) {
        for (let c = 0; c < this.costPlusArray.length; c++) {
          if (carrierAr[0] === this.costPlusArray[c].carrier) {
            this.applyCostPlusFlag = true;
            let factorValue = this.costPlusArray[c].factor;
            this.costPlusPercentFactor = 1 + (Number(factorValue) / 100);
            break;
          } else {
            this.getQuoteFlag = true;
          }
        }
      }
    }
    console.log('event', event, formValue, this.errorMessage, this.errorMessageDest, 'errorgetRate', this.errorGetRateMsg, 'quoteFlag', this.getQuoteFlag);

    if (formValue.controls.carrier.status === 'VALID' 
    && formValue.controls.origin.status === 'VALID' 
    && formValue.controls.destination.status === 'VALID' 
  && this.pricingDetail.length > 0) {
    this.getQuoteFlag = true;
    console.log('event', event, formValue, this.errorMessage, this.errorMessageDest, 'errorgetRate', this.errorGetRateMsg, 'quoteFlag', this.getQuoteFlag);
   setTimeout(() => {
    (document.getElementById('getQuote')as HTMLFormElement).focus();

   }, 1000);

    } else {
      this.getQuoteFlag = false;
    }
  }
  checkNumber(value: any) {
    let num;
    if (isNaN(value)) {
      let numbers = value.match(/\d+/g).map(Number);
      num = numbers[0];
    } else {
      num = value;
    }
    return num;
  }

  checkForWeight(classification: any, value: any) {
    this.totalWeight = [];
    let numberData;
    if (value.key === 'Enter') {
      numberData = this.checkNumber(value.target.value);
    } else {
      numberData = this.checkNumber(value);
    }
    if (numberData > 10000) {
      this.showCheckForWeight = true;
      this.transportOrigin.patchValue({ weight: '' });
    } else {
      if (numberData >= 5000) {
        this.operationMessage = true;
      } else {
        this.operationMessage = false;
      }
      this.showCheckForWeight = false;
      this.transportOrigin.patchValue({ weight: numberData });
      if (classification !== '' && numberData !== '') {
        if (Number(numberData) !== 0) {
          this.invalidErrorWeightMessage = false;
          this.pricingDetail.push({ classification: classification, weight: numberData });
        } else {
          this.invalidErrorWeightMessage = true;
        }
      }
      if (this.pricingDetail.length > 0) {
        this.showTable = true;
        this.getQuoteFlag = true;
        (document.getElementById('carrier')as HTMLFormElement).focus();
        this.transportOrigin.patchValue({ classification: '', weight: '' });
        for (let i = 0; i < this.pricingDetail.length; i++) {
          this.totalWeight.push(this.pricingDetail[i].weight);
        }
        this.finalTotalWeight = this.netChargeArrSum(this.totalWeight)
      } else {
        this.showTable = false;
        (document.getElementById('weight')as HTMLFormElement).focus();
      }
    }
  }


  addItem(form: any) {
    let object = { classification: form.classification, weight: Number(form.weight) };
    this.pricingDetail.push(object);
    if (this.pricingDetail.length > 0) {
      this.showTable = true;
      this.transportOrigin.patchValue({ classification: '', weight: '' });
    } else {
      this.showTable = false;
    }
  }

  checkForClassification(pricingDetail: any) {
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
   * Check for weight >20000
   * @param weight
   * @param transport
   */
  check(weight: any, transport:any) {
    if (weight.value > 20000) {
      this.transportOrigin.patchValue({ weight: '' });
      (document.getElementById('weight')as HTMLFormElement).focus();
      this.showCheckForWeight = true;
    } else {
      if (isNaN(transport.weight)) {
        this.transportOrigin.patchValue({ weight: '' });
        this.invalidErrorWeightMessage = true;
      } else {
        this.invalidErrorWeightMessage = false;
        this.showCheckForWeight = false;
        const pricingDetail = {
          'weight': Number(transport.weight),
          'classification': transport.classification
        };
        if (pricingDetail.classification === '' || pricingDetail.weight === null ||
          pricingDetail.weight === undefined || pricingDetail.weight === 0) {
        } else {
          this.pricingDetail.push(pricingDetail);
          this.showTable = true;
        }
        this.transportOrigin.patchValue({ classification: '', weight: '' });
      }
    }
  }

  /**
   * Deleting the class and weight
   * @param pricing
   * @param index
   */
  delete(pricing: any, index: any) {
    this.pricingDetail.splice(index, 1);
    if (this.pricingDetail.length === 0) {
      this.showTable = false;
      this.getQuoteFlag = false;
      (document.getElementById('classification')as HTMLFormElement).focus();
    } else {
      this.getQuoteFlag = true;
    }
  }

  compare(arr1: any, arr2:any) {
    let finalArray: any = [];
    arr1.forEach((e1: any) => arr2.forEach((e2:any) => {
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

  /* It is made common in service */

  /*Adding of array values Net charge */
  netChargeArrSum(netCharge: any) {
    let total = 0;
    netCharge.forEach(function (key: any) {
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
  getQuote(transportOrigin: any, selectedItems: any, pricingDetail: any) {
    this.noshipmentData = false;
    (document.getElementById('myDiv')as HTMLFormElement).className = 'imgShow';
    this.showAdminErrorMessage = false;
    this.showErrorInternetConnection = false;
    this.showClearAll = true;
    this.showServiceNotAvailableMsg = false;
    this.loader = true;
    this.showData = false;
    this.hideData = false;
    this.hideshipmentData = false;

    this.showDeficitValue = false;
    this.showMinimumCharge = false;
    this.showIfNoRule = false;
    this.getQuoteFlag = false;
    this.singleShipmentFlag = false;
    this.higherValueAP = false;
    this.userData = {};
    this.userData.classWeight = [];
    this.assessorials = [];
    this.resultArray = [];
    this.resultObject = {};
    this.quoteDetailsArray = [];
    this.transitTime = '';
    this.quoteId = '';
    this.responseForFedexAp = {};
    this.responseForYRCAp = {};
    this.responseForReddawayAp = {};
    this.getARRule = [];
    this.userData.origin = transportOrigin.origin;
    this.userData.destination = transportOrigin.destination;
    this.userData.classWeight = this.checkForClassification(pricingDetail);
    this.userData.originState = this.filterValuesState;
    this.userData.originCity = this.filterValues;
    this.userData.destinationState = this.filterValuesDestState;
    this.userData.destinationCity = this.filterValuesDest.city;
    this.userData.customerId = this.customerId;
    this.userData.companyId = this.companyId;
    this.userData.carrierName = transportOrigin.carrier;
    this.userData.carrier = transportOrigin.carrier;
    this.userData.userType = this.customerType;
    this.userData.viewType = 'externalCustomer';
    this.selectedItems = selectedItems;
    let assessorialsName;
    console.log(this.userData, this.selectedItems);
    let AccessArray: any = [];
    this.selectedItems.forEach((ele: any) => {
      AccessArray.push(ele.itemName);
    });
    this.userData.accessorials = AccessArray;
    console.log(AccessArray,this.userData);


    if (this.userData.originState === 'AK' || this.userData.originState === 'HI' || this.userData.destinationState === 'AK' || this.userData.destinationState === 'HI') {
      (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
this.showData = false;
this.hideData = false;
this.noshipmentDataMessage = true;
    } else {
      this.noshipmentDataMessage = false;

    if (this.selectedItems.length > 0) {
      for (let s = 0; s < this.selectedItems.length; s++) {
        assessorialsName = this.selectedItems[s].itemName;
        this.assessorials.push(assessorialsName);
      }
    }
    const setMasterData: any = localStorage.getItem('artableData');
    this.parseSetMasterData = JSON.parse(setMasterData);
    for (let i = 0; i < this.parseSetMasterData.length; i++) {
      if (this.parseSetMasterData[i].companyName === 'YRC') {
        this.parseSetMasterData.assessorials = JSON.parse(this.parseSetMasterData[i].assessorials);
        if (this.parseSetMasterData.assessorials.length > 0) {
          for (let i = 0; i < this.parseSetMasterData.assessorials.length; i++) {
            if (this.parseSetMasterData.assessorials[i].name === 'Single Shipment') {
              this.singleShipmentsetMasterData = this.parseSetMasterData.assessorials[i];
              break;
            } else {
              this.singleShipmentsetMasterData = '';
            }
          }
        }
      }
    }
    if (this.applyCostPlusFlag === true) {
      this.highCostForFedex = 0;
      if (this.userData.carrier === 'FEDEX ECONOMY' || this.userData.carrier === 'FEDEX PRIORITY') {
        console.log('costplusfactor');
        this.pricingInfoService.getAdditionalRateForFedex(this.userData.destination, this.accessToken).subscribe((response: any) => {
          this.highCostForFedex = response.result;
          if (this.highCostForFedex === 0) {
            this.highCostForFedex = 0;
          } else {
            this.highCostForFedex = this.highCostForFedex + '.00';
          }
        });
      }
    }
    this.pricingInfoService.getSingleShipment(this.userData).subscribe((data:any) => {
      this.getARRule = data.result;
    });
    if (this.userData.carrierName === 'YRC') {
      if (this.userData.carrier === 'YRC' && this.finalTotalWeight < 500) {
        this.getQuoteFlag = false;
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
        this.singleShipmentFlag = true;
        this.pricingInfoService.getSingleShipment(this.userData).subscribe((data: any) => {
          this.response = data.result;
          if (this.response.length > 0) {
            if (this.response[0].singleShipment !== "" && this.response[0].singleShipment !== null && this.response[0].singleShipment !== undefined) {
              this.singleShipmentValue = this.response[0].singleShipment;              
              this.singleShipmentFlag = false;
              if (this.singleShipmentValue === 0) {
                this.singleShipmentFlag = false;
                $('#popup-modal').hide();
                this.getYrc();
              } else {
                this.singleShipmentFlag = false;
                $('#popup-modal').show();
                this.loader = false;
                this.showData = false;
              }
            } else if (this.singleShipmentsetMasterData.cost !== "" && this.singleShipmentsetMasterData.cost !== null && this.singleShipmentsetMasterData.cost !== undefined) {
              this.singleShipmentValue = this.singleShipmentsetMasterData.cost;              
              if (this.singleShipmentValue === 0) {
                this.singleShipmentFlag = false;
                $('#popup-modal').hide();
                this.getYrc();
              } else {
                $('#popup-modal').show();
              }
            } else {
              this.singleShipmentFlag = false;
              this.singleShipmentValue = 0;
              this.getYrc();              
            }
          } else {
            if (this.singleShipmentsetMasterData.cost !== "" && this.singleShipmentsetMasterData.cost !== null && this.singleShipmentsetMasterData.cost !== undefined) {
              this.singleShipmentValue = this.singleShipmentsetMasterData.cost;              
              if (this.singleShipmentValue === 0) {
                this.singleShipmentFlag = false;
                $('#popup-modal').hide();
                this.singleShipmentValue = 0;
                this.getYrc();
              } else {
                $('#popup-modal').show();
              }
            }
          }
        }, (err:any) => {
          this.singleShipmentValue = 0;
          this.getYrc();
        })
      } else {
        this.singleShipmentValue = 0;
        this.getYrc();
      }
    } else if (this.userData.carrierName === 'FEDEX ECONOMY' || this.userData.carrierName === 'FEDEX PRIORITY') {
      this.pricingInfoService.getRates(this.userData, 'FEDEX AP').subscribe((response:any) => {
        // if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
        //   this.resultObject = { carrierType: this.userData.carrierName };
        //   this.hideshipmentData = true;
        //   document.getElementById('myDiv').className = 'imgBlock';
        //   this.showData = false;
        // } else {
        if (Object.keys(response.result).length === 0 || response.result === undefined ) {
          this.hideData = true;
          this.resultObject = { carrierType: this.userData.carrierName };
          this.showData = false;
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

        } else if (response.result ==='Destination Base Zip Not Found') {
          this.hideData = true;
          this.resultObject = { carrierType: this.userData.carrierName };
          this.showData = false;
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

        } else {
          if (response.result === 'No Rules'  ) {
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          } else {
            this.responseForFedexAp = response;
            this.rateCalculationForFedex(response, this.userData.carrierName, 'AP', 'AP');
            if (this.applyCostPlusFlag === false) {
            } else {
              this.getFedexForCostPlus();
            }
          }
        }
      // }
      }, (err:any) => {
        this.logger = { 'method': 'getRates', 'message': 'FEDEX AP Error response', 'status': err.status };
        this.loggerService.error(this.logger);
        // document.getElementById('myDiv').className = 'imgBlock';
        if (err.status === 0) {
          // this.showErrorInternetConnection = true;
          // this.onlineOffline = true;
          setTimeout(() => {
            this.pricingInfoService.getRates(this.userData, 'FEDEX AP').subscribe((response:any) => {
              if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
                this.resultObject = { carrierType: this.userData.carrierName };
                this.hideshipmentData = true;
                (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                this.showData = false;
              } else {
              if (Object.keys(response.result).length === 0 || response.result === undefined) {
                this.hideData = true;
                this.resultObject = { carrierType: this.userData.carrierName };
                this.showData = false;
                (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

              } else if (response.result ==='Destination Base Zip Not Found') {
                this.hideData = true;
                this.resultObject = { carrierType: this.userData.carrierName };
                this.showData = false;
                (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

              }else {
                if (response.result === 'No Rules') {
                  (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                } else {
                  this.responseForFedexAp = response;
                  this.rateCalculationForFedex(response, this.userData.carrierName, 'AP', 'AP');
                  if (this.applyCostPlusFlag === false) {
                  } else {
                    this.getFedexForCostPlus();
                  }
                }
              }
            }
            }, (err:any) => {
              this.logger = { 'method': 'getRates', 'message': 'FEDEX AP Error response', 'status': err.status };
              this.loggerService.error(this.logger);
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              if (err.status === 0) {
                this.showErrorInternetConnection = true;
                this.onlineOffline = true;
              } else {
                this.showData = false;
                this.hideData = true;
                this.resultObject = { carrierType: this.userData.carrierName };
              }
            });
          }, 10000);
        } else {
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

          this.showData = false;
          this.hideData = true;
          this.resultObject = { carrierType: this.userData.carrierName };
        }
      });
      if (this.applyCostPlusFlag === false) {
        this.pricingInfoService.getRates(this.userData, 'FEDEX AR').subscribe((response:any) => {
          if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
            this.resultObject = { carrierType: this.userData.carrierName };
            this.hideshipmentData = true;
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
            this.showData = false;
          } else {
          if (Object.keys(response.result).length === 0 || response.result === undefined ) {
            this.hideData = true;
            this.resultObject = { carrierType: this.userData.carrierName };
            this.showData = false;
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

          } else if (response.result ==='Destination Base Zip Not Found') {
            this.hideData = true;
            this.resultObject = { carrierType: this.userData.carrierName };
            this.showData = false;
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

          } else {
            if (response.result === 'No Rules') {
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              this.showData = false;
              this.hideData = false;
              this.showIfNoRule = true;
              this.resultObject = { carrierType: this.userData.carrierName };
            } else {
              this.pricingInfoService.getTransitTime(this.userData).subscribe((response:any) => {
                this.transitTime = response;
                if (this.transitTime.result !== false) {
                  this.split = this.transitTime.result.split('_');
                  this.numbersArray.forEach((elem:any) =>{
                    if(elem.name === this.split[0]){
                      this.transitTime.result = elem.id;
                    } 
                    // else {
                    //   this.transitTime.result = 'NA';
    
                    // }
                  })
                  // this.transitTime.result = wordsToNumbers(this.split[0]);  
                } else {
                  this.transitTime.result = 'NA';
                }
              }, (err:any) => {
                this.transitTime.result = 'NA';
              });
              this.rateCalculationForFedex(response, this.userData.carrierName, 'AR', 'AR');
            }
          }
        }
        }, (err:any) => {
          this.logger = { 'method': 'getRates', 'message': 'FEDEX AR Error response', 'status': err.status };
          this.loggerService.error(this.logger);
          // document.getElementById('myDiv').className = 'imgBlock';
          if (err.status === 0) {
            // this.showErrorInternetConnection = true;
            // this.onlineOffline = true;
            setTimeout(() => {
              this.pricingInfoService.getRates(this.userData, 'FEDEX AR').subscribe((response:any) => {
                if (response.result === 'Shipments cannot be done to Alaska and Hawaii state. Please contact customer care.') {
                  this.resultObject = { carrierType: this.userData.carrierName };
                  (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                  this.showData = false;
                  this.hideshipmentData = true;
                } else {
                if (Object.keys(response.result).length === 0 || response.result === undefined) {
                  this.hideData = true;
                  this.resultObject = { carrierType: this.userData.carrierName };
                  this.showData = false;
                  (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

                } else if (response.result ==='Destination Base Zip Not Found') {
                  this.hideData = true;
                  this.resultObject = { carrierType: this.userData.carrierName };
                  this.showData = false;
                  (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

                } else {
                  if (response.result === 'No Rules') {
                    (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                    this.showData = false;
                    this.hideData = false;
                    this.showIfNoRule = true;
                    this.resultObject = { carrierType: this.userData.carrierName };
                  } else {
                    this.pricingInfoService.getTransitTime(this.userData).subscribe((response:any) => {
                      this.transitTime = response;
                      if (this.transitTime.result !== false) {
                        this.split = this.transitTime.result.split('_');
                        this.numbersArray.forEach((elem:any) =>{
                          if(elem.name === this.split[0]){
                            this.transitTime.result = elem.id;
                          } 
                          // else {
                          //   this.transitTime.result = 'NA';
          
                          // }
                        })
                        // this.transitTime.result = wordsToNumbers(this.split[0]);  
                      } else {
                        this.transitTime.result = 'NA';
                      }
                    }, (err:any) => {
                      this.transitTime.result = 'NA';
                    });
                    this.rateCalculationForFedex(response, this.userData.carrierName, 'AR', 'AR');
                  }
                }
              }
              }, (err:any) => {
                this.logger = { 'method': 'getRates', 'message': 'FEDEX AR Error response', 'status': err.status };
                this.loggerService.error(this.logger);
                (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                if (err.status === 0) {
                  this.showErrorInternetConnection = true;
                  this.onlineOffline = true;
                } else {
                  this.showData = false;
                  this.hideData = true;
                  this.resultObject = { carrierType: this.userData.carrierName };
                }
              });
            }, 10000);
          } else {
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

            this.showData = false;
            this.hideData = true;
            this.resultObject = { carrierType: this.userData.carrierName };
          }
        });
      }
    } else {
      this.pricingInfoService.getRatesnew(this.userData, 'REDDAWAY AP').subscribe((response:any) => {
        if (Object.keys(response.result).length === 0 || response.result === undefined) {
          this.hideData = true;
          this.showData = false;
          this.resultObject = { carrierType: 'REDDAWAY' };
        } else {
          if (response.result === 'service not available') {
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
            this.showData = false;
            this.showServiceNotAvailableMsg = true;
            this.hideData = false;
          } else {
            this.responseForReddawayAp = response;
            this.rateCalculationForYRCReddaway1(response, 'REDDAWAY', 'AP', 'AP');
            if (this.applyCostPlusFlag === false) {
            } else {
              this.getReddawayForCostPlus();
            }
          }
        }
      }, (err:any) => {
        this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AP Error response', 'status': err.status };
        this.loggerService.error(this.logger);
        // document.getElementById('myDiv').className = 'imgBlock';
        if (err.status === 0) {
          // this.showErrorInternetConnection = true;
          // this.onlineOffline = true;
          setTimeout(() => {
            this.pricingInfoService.getRatesnew(this.userData, 'REDDAWAY AP').subscribe((response:any) => {
              if (Object.keys(response.result).length === 0 || response.result === undefined) {
                this.hideData = true;
                this.showData = false;
                this.resultObject = { carrierType: 'REDDAWAY' };
              } else {
                if (response.result === 'service not available') {
                  (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                  this.showData = false;
                  this.showServiceNotAvailableMsg = true;
                  this.hideData = false;
                } else {
                  this.responseForReddawayAp = response;
                  this.rateCalculationForYRCReddaway(response, 'REDDAWAY', 'AP', 'AP');
                  if (this.applyCostPlusFlag === false) {
                  } else {
                    this.getReddawayForCostPlus();
                  }
                }
              }
            }, (err:any) => {
              this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AP Error response', 'status': err.status };
              this.loggerService.error(this.logger);
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              if (err.status === 0) {
                this.showErrorInternetConnection = true;
                this.onlineOffline = true;
              } else {
                this.showData = false;
                this.hideData = true;
                this.resultObject = { carrierType: 'REDDAWAY' };
              }
            });
          }, 10000);
        } else {
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

          this.showData = false;
          this.hideData = true;
          this.resultObject = { carrierType: 'REDDAWAY' };
        }
      });
      this.pricingInfoService.getRates(this.userData, 'REDDAWAY OLDAP').subscribe((response:any) => {
        if (Object.keys(response.result).length === 0 || response.result === undefined) {
          this.hideData = true;
          this.showData = false;
          this.resultObject = { carrierType: 'REDDAWAY' };
        } else {
          if (response.result === 'service not available') {
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
            this.showData = false;
            this.showServiceNotAvailableMsg = true;
            this.hideData = false;
          } else {
            this.responseForReddawayAp = response;
            this.rateCalculationForYRCReddaway2(response, 'REDDAWAY', 'AP', 'AP');
            if (this.applyCostPlusFlag === false) {
            } else {
              this.getReddawayForCostPlus();
            }
          }
        }
      }, (err:any) => {
        this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AP Error response', 'status': err.status };
        this.loggerService.error(this.logger);
        // document.getElementById('myDiv').className = 'imgBlock';
        if (err.status === 0) {
          // this.showErrorInternetConnection = true;
          // this.onlineOffline = true;
          setTimeout(() => {
            this.pricingInfoService.getRates(this.userData, 'REDDAWAY OLDAP').subscribe((response:any) => {
              if (Object.keys(response.result).length === 0 || response.result === undefined) {
                this.hideData = true;
                this.showData = false;
                this.resultObject = { carrierType: 'REDDAWAY' };
              } else {
                if (response.result === 'service not available') {
                  (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                  this.showData = false;
                  this.showServiceNotAvailableMsg = true;
                  this.hideData = false;
                } else {
                  this.responseForReddawayAp = response;
                  this.rateCalculationForYRCReddaway2(response, 'REDDAWAY', 'AP', 'AP');
                  if (this.applyCostPlusFlag === false) {
                  } else {
                    this.getReddawayForCostPlus();
                  }
                }
              }
            }, (err:any) => {
              this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AP Error response', 'status': err.status };
              this.loggerService.error(this.logger);
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              if (err.status === 0) {
                this.showErrorInternetConnection = true;
                this.onlineOffline = true;
              } else {
                this.showData = false;
                this.hideData = true;
                this.resultObject = { carrierType: 'REDDAWAY' };
              }
            });
          }, 10000);
        } else {
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

          this.showData = false;
          this.hideData = true;
          this.resultObject = { carrierType: 'REDDAWAY' };
        }
      });
      if (this.applyCostPlusFlag === false) {
        this.pricingInfoService.getRates(this.userData, 'REDDAWAY AR').subscribe((response:any) => {
          if (Object.keys(response.result).length === 0 || response.result === undefined) {
            this.hideData = true;
            this.showData = false;
            this.resultObject = { carrierName: 'REDDAWAY' };
          } else {
            if (response.result === 'service not available') {
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              this.showData = false;
              this.showServiceNotAvailableMsg = true;
              this.hideData = false;
              this.pricingInfoService.reddawayMail(this.userData, this.accessToken).subscribe((mailResponse:any) => {
                if (mailResponse.result === 'true') {
                }
              });
            } else if (response.result === 'No Rules') {
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              this.showData = false;
              this.hideData = false;
              this.showIfNoRule = true;
              this.resultObject = { carrierType: this.userData.carrierName };
            } else {
              this.pricingInfoService.getTransitTime(this.userData).subscribe((response:any) => {
                this.transitTime = response;
                if (this.transitTime.result !== false) {
                  this.transitTime.result = this.transitTime.result;
                } else {
                  this.transitTime.result = 'NA';
                }
              }, (err:any) => {
                this.transitTime.result = 'NA';
              });
              this.rateCalculationForYRCReddaway(response, 'REDDAWAY', 'AR', 'AR');
            }
          }
        }, (err:any) => {
          this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AR Error response', 'status': err.status };
          this.loggerService.error(this.logger);
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          if (err.status === 0) {
            // this.showErrorInternetConnection = true;
            // this.onlineOffline = true;
            setTimeout(() => {
              this.pricingInfoService.getRates(this.userData, 'REDDAWAY AR').subscribe((response:any) => {
                if (Object.keys(response.result).length === 0 || response.result === undefined) {
                  this.hideData = true;
                  this.showData = false;
                  this.resultObject = { carrierName: 'REDDAWAY' };
                } else {
                  if (response.result === 'service not available') {
                    (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                    this.showData = false;
                    this.showServiceNotAvailableMsg = true;
                    this.hideData = false;
                    this.pricingInfoService.reddawayMail(this.userData, this.accessToken).subscribe((mailResponse:any) => {
                      if (mailResponse.result === 'true') {
                      }
                    });
                  } else if (response.result === 'No Rules') {
                    (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                    this.showData = false;
                    this.hideData = false;
                    this.showIfNoRule = true;
                    this.resultObject = { carrierType: this.userData.carrierName };
                  } else {
                    this.pricingInfoService.getTransitTime(this.userData).subscribe((response:any) => {
                      this.transitTime = response;
                      if (this.transitTime.result !== false) {
                        this.transitTime.result = this.transitTime.result;
                      } else {
                        this.transitTime.result = 'NA';
                      }
                    }, (err:any) => {
                      this.transitTime.result = 'NA';
                    });
                    this.rateCalculationForYRCReddaway(response, 'REDDAWAY', 'AR', 'AR');
                  }
                }
              }, (err:any) => {
                this.logger = { 'method': 'getRates', 'message': 'REDDAWAY AR Error response', 'status': err.status };
                this.loggerService.error(this.logger);
                (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                if (err.status === 0) {
                  this.showErrorInternetConnection = true;
                  this.onlineOffline = true;
                } else {
                  this.showData = false;
                  this.hideData = true;
                  this.resultObject = { carrierType: 'REDDAWAY' };
                }
              });
            }, 10000);
          } else {
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';

            this.showData = false;
            this.hideData = true;
            this.resultObject = { carrierType: 'REDDAWAY' };
          }
        });
      }
    }
  }
  }
  rateCalculationForYRCReddaway(response:any, carrierType:any, category:any, factoring:any) {
    let date = new Date();
    console.log('RATE CALCULATION TIME FOR YRC', date);
    let discount, fuelSurcharge, rateId, amc, highCost, addCACharge, addRate, discountedRate:any,
      addSingleShipmentCharge, minimumClass, totalAssessorialCharge, assessorialCharge, customerBusinessRule = [], assessorialChargeArray = [], profileAssessorials = [];
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
    this.showSingleShipmentValue = false;
    this.showDeficitValue = false;
    this.showMinimumCharge = false;
    this.hideYrcData = false;
    this.localStorageArData = [];
    let staticData: any = localStorage.getItem('artableData');
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
    fuelSurchargeArray.push(fuelSurcharge);
    if (carrierType === 'YRC') {
      if (category === 'AP') {
        if (this.weightForCal < 500) {
          if (this.applyCostPlusFlag === true) {
            if (this.singleShipmentCharge !== '' && this.singleShipmentCharge !== null && this.singleShipmentCharge !== undefined) {
              addSingleShipmentCharge = this.singleShipmentCharge;
            } else {
              addSingleShipmentCharge = 0;
            }
          } else {
            if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
              addSingleShipmentCharge = profileSingleShipment;
            } else {
              if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
                addSingleShipmentCharge = singleShipmentsetMasterData.cost;
              } else {
                addSingleShipmentCharge = 0;
              }
            }
          }
        } else {
          addSingleShipmentCharge = 0;
        }
      } else {
        if (this.singleShipmentCharge !== '' && this.singleShipmentCharge !== null && this.singleShipmentCharge !== undefined) {
          addSingleShipmentCharge = this.singleShipmentCharge;
        } else {
          addSingleShipmentCharge = 0;
        }
      }
    } else {
      if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
        addSingleShipmentCharge = profileSingleShipment;
      } else {
        if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
          addSingleShipmentCharge = singleShipmentsetMasterData.cost;
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
    this.finalRateCharge = this.netChargeArrSum(finalRate);
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
      discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusPercentFactor));
    }
    /* Comparing discounted Rate and the minCharge given in the customer business rules and Amc in set master data*/
    if (profileMinimumCharge !== undefined && profileMinimumCharge !== '' && profileMinimumCharge !== null) {
      if (Number(profileMinimumCharge) > Number(discountedRateCalculation)) {
        // discountedRate = Number(profileMinimumCharge);
        if (factoring !== 'COSTPLUS') {
          discountedRate = Number(profileMinimumCharge);
          console.log('profileFedex1 ', discountedRate);
        } else {
          discountedRate = (Number(profileMinimumCharge)* Number(this.costPlusPercentFactor)).toFixed(2);
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
            discountedRate = (Number(amc)* Number(this.costPlusPercentFactor)).toFixed(2);
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
      addCACharge = Number(response.result.yrcCaCharge);
    } else {
      addCACharge = Number(response.result.reddawayCaCharge );

    }
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
      category: category,
      showMinimumCharge: this.showMinimumCharge,
      shipTypes: this.showDirections,
      carrierType: carrierType,
      netChargeValue: netChargeValue,
      totalChargeForComparing: totalChargeForComparing,
      factor: factoring,
      costPlusPercent: this.costPlusPercentFactor,
      totalWeight: this.finalTotalWeight,
      higherValueAP: this.higherValueAP,
      showcolor: this.showcolor
    };    
    console.log(this.showcolor);
    this.resultArray.push(this.pricingInfo);
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
      let Ap:any,Ar:any;
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
          console.log('jefrin',Ap,Ar);
          if (Ap.totalCharge > Ar.totalCharge[0]) {
            // this.showNegativeMargin = true;
            let charge = Number(Ap.totalCharge)/0.95;
            let addedCharge = charge;
            let charegArry = [];
            charegArry.push(addedCharge.toFixed(2));
            Ar.totalCharge = charegArry;
            Ar.showcolor = true;
            // this.showData = false;
          }

      (document.getElementById('myDiv') as HTMLFormElement).className = 'imgBlock';
      /*If AP netcharge value > AR netcharge it gives Error message as sales rep will contact you*/
      if (this.resultArray[1].factor !== 'COSTPLUS') {
          this.showData = true;
          this.resultArray.forEach((el:any) => {
            if (el.category === 'AR') {
              this.resultObject = el;

            }
          })
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          if (this.userData.carrier === 'YRC') {
            if (this.resultArray.length > 2) {
              this.giveRateDetails(this.resultArray, 'AR');
            }
          } else {
            if (this.resultArray.length > 1) {
            this.giveRateDetails(this.resultArray, 'AR');
          }
        }
      } else {
        this.showData = true;
        this.resultArray.forEach((el:any) => {
          if (el.category === 'AR') {
            this.resultObject = el;

          }
        })
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
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
      }
    }
  }

  rateCalculationForYRCReddaway2(response:any, carrierType:any, category:any, factoring:any) {
    let date = new Date();
    console.log('RATE CALCULATION TIME FOR YRC', date);
    let discount, fuelSurcharge, rateId, amc, highCost, addCACharge, addRate, discountedRate:any,
      addSingleShipmentCharge, minimumClass, totalAssessorialCharge, assessorialCharge, customerBusinessRule = [], assessorialChargeArray = [], profileAssessorials = [];
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
    this.showSingleShipmentValue = false;
    this.showDeficitValue = false;
    this.showMinimumCharge = false;
    this.hideYrcData = false;
    this.localStorageArData = [];
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
    fuelSurchargeArray.push(fuelSurcharge);
    if (carrierType === 'YRC') {
      if (category === 'AP') {
        if (this.weightForCal < 500) {
          if (this.applyCostPlusFlag === true) {
            if (this.singleShipmentCharge !== '' && this.singleShipmentCharge !== null && this.singleShipmentCharge !== undefined) {
              addSingleShipmentCharge = this.singleShipmentCharge;
            } else {
              addSingleShipmentCharge = 0;
            }
          } else {
            if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
              addSingleShipmentCharge = profileSingleShipment;
            } else {
              if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
                addSingleShipmentCharge = singleShipmentsetMasterData.cost;
              } else {
                addSingleShipmentCharge = 0;
              }
            }
          }
        } else {
          addSingleShipmentCharge = 0;
        }
      } else {
        if (this.singleShipmentCharge !== '' && this.singleShipmentCharge !== null && this.singleShipmentCharge !== undefined) {
          addSingleShipmentCharge = this.singleShipmentCharge;
        } else {
          addSingleShipmentCharge = 0;
        }
      }
    } else {
      if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
        addSingleShipmentCharge = profileSingleShipment;
      } else {
        if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
          addSingleShipmentCharge = singleShipmentsetMasterData.cost;
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
    this.finalRateCharge = this.netChargeArrSum(finalRate);
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
      discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusPercentFactor));
    }
    /* Comparing discounted Rate and the minCharge given in the customer business rules and Amc in set master data*/
    if (profileMinimumCharge !== undefined && profileMinimumCharge !== '' && profileMinimumCharge !== null) {
      if (Number(profileMinimumCharge) > Number(discountedRateCalculation)) {
        // discountedRate = Number(profileMinimumCharge);
        if (factoring !== 'COSTPLUS') {
          discountedRate = Number(profileMinimumCharge);
          console.log('profileFedex1 ', discountedRate);
        } else {
          discountedRate = (Number(profileMinimumCharge)* Number(this.costPlusPercentFactor)).toFixed(2);
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
            discountedRate = (Number(amc)* Number(this.costPlusPercentFactor)).toFixed(2);
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
    uniqueArray = this.selectedItems;
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
      addCACharge = Number(response.result.yrcCaCharge);
    } else {
      addCACharge = Number(response.result.reddawayCaCharge );

    }
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
      category: 'OLDAP',
      showMinimumCharge: this.showMinimumCharge,
      shipTypes: this.showDirections,
      carrierType: carrierType,
      netChargeValue: netChargeValue,
      totalChargeForComparing: totalChargeForComparing,
      factor: factoring,
      costPlusPercent: this.costPlusPercentFactor,
      totalWeight: this.finalTotalWeight,
      higherValueAP: this.higherValueAP,
      showcolor:false
    };    
    this.resultArray.push(this.pricingInfo);
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
        let Ap:any,Ar:any;
        console.log(this.applyCostPlusFlag);
        if (this.applyCostPlusFlag === false) {
        this.resultArray.forEach((ee:any, index:any) => {
          if (ee.category === "AP") {
            Ap = ee;

          };
          if (ee.category === "AR") {
            Ar = ee;

          };
        });
            console.log('jefrin',Ap,Ar);
            Apdiscountrate = Ap.discountedRate;
            let consoleArray;
            consoleArray = this.resultArray;
            if (Number(Ap.totalCharge) > Number(Ar.totalCharge[0])) {
              // this.showNegativeMargin = true;
              let charge = Number(Ap.totalCharge)/0.95;
              let addedCharge = charge;
              let charegArry = [];
              charegArry.push(addedCharge.toFixed(2));
              Ar.totalCharge = charegArry;
              Ar.showcolor = true;
              // this.showData = false;
            }
            this.resultArray.forEach((el:any) => {
              if (el.category === 'AR') {
                this.resultObject = el;
  
              }
            })
          }
      (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
 
      /*If AP netcharge value > AR netcharge it gives Error message as sales rep will contact you*/
      if (this.resultArray[1].factor !== 'COSTPLUS') {
          this.showData = true;
          this.resultArray.forEach((el:any) => {
            if (el.category === 'AR') {
              this.resultObject = el;

            }
          })
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          // this.giveRateDetails(this.resultArray, 'AR');
          // if (this.userData.carrier === 'YRC') {
            if (this.resultArray.length > 2) {
            this.giveRateDetails(this.resultArray, 'AR');
            }
          // } else {
          //   this.giveRateDetails(this.resultArray, 'AR');
  
          // }
        // }
      } else {
        this.showData = true;
        // this.resultObject = this.resultArray[1];
        this.resultArray.forEach((el:any) => {
          if (el.category === 'AR') {
            this.resultObject = el;

          }
        })
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
        // if (this.userData.carrier === 'YRC') {
          if (this.resultArray.length > 2) {
          this.giveRateDetails(this.resultArray, 'AR');
          }
        // } else {
        //   this.giveRateDetails(this.resultArray, 'AR');

        // }
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

  }}
for (let g = 0; g < response.result.netChargeResult.length; g++) {
netChargePercent = Number(response.result.netChargeResult) * 100 / Number(finalTotalRate);

}
let disRate = finalTotalRate - discountFull;

let discRate = [];
discRate.push(disRate.toFixed(2).toString());
let FSC = [];
FSC.push(netChargePercent.toFixed(2).toString())

console.log(discRate,FSC)
let netValue = disRate + netChargePercent * disRate /100;
console.log('discountRate',netValue);
console.log(netChargePercent,discountPercent)
let highCost = 0;
let totalAssessorialCharge = 0;
if (carrierType === 'YRC') {
  highCost = response.result.highCostDeliveryCharge
} else if (carrierType === 'REDDAWAY') {
  highCost = response.result.highCostDeliveryCharge + Number(response.result.extraCharges);

}
totalAssessorialCharge = Number(highCost) + Number(response.result.additionalCharge) +  Number(accessorialRate);
// let disRate = response.result.finalRate[0] - response.result.discountedRate[0];
// let netValue = disRate + netChargePercent * disRate /100;
console.log('discountRate',netValue);
    this.pricingInfo = {
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
      diffDiscountedRate:  discountaa,
      // diffNetCharge: netChargeArray,
      assessorialCharge: response.result.assessorialChargeValue,
      assessorialChargeValue: totalAssessorialCharge,
      assessorialDataList: accessArray,
      // netChargeResult: netChargeResultArray,
      netChargeDiffResult: response.result.netChargeResult,
      netChargeResult: response.result.netChargeResult,

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
      totalWeight: this.finalTotalWeight,
      higherValueAP: this.higherValueAP,
      showcolor: false
    };
    this.showData = true;
    console.log(this.resultArray);
    this.resultArray.push(this.pricingInfo);
    console.log(this.resultArray);

    if (this.pricingInfo.carrierType === 'YRC') {
     
      console.log('this.YRCArray Sort', this.resultArray);
      if (this.resultArray.length > 2) {
        // this.waitForProcessMessage = false;
        this.showAllData = true;
        this.hideYrcData = false;
        this.showYrcData = true;
        this.showYrcDataAR = true;
        this.showBorder = true;
        let Apdiscountrate;
        let Ap:any,Ar:any;
        this.resultArray.forEach((ee:any, index:any) => {
          if (ee.category === "AP") {
            Ap = ee;

          };
          if (ee.category === "AR") {
            Ar = ee;

          };
        });
            console.log('jefrin',Ap,Ar);
            Apdiscountrate = Ap.discountedRate;
            // if (Apdiscountrate > Ar.discountedRate) {
            //   console.log('jefrin',Apdiscountrate);
            //   let x = Ap.discountedRate * 1.05;
            //   let xarr= [];
            //   xarr.push(x.toFixed(2))
            //   Ar.discountedRate = xarr;
            //   Ar.showcolor = true;
            //   let y = x/((100-Ar.discount[0])/100);
            //   console.log('jefrin',y);
            //   let finalRate1 =[]
            //   finalRate1.push(y.toFixed(2));
            //   Ar.finalRate = finalRate1
            //   this.finalRateCharge = []

            //   this.finalRateCharge = this.netChargeArrSum(finalRate1);
            //   Ar.totalGrossCharge = this.finalRateCharge.toFixed(2);
            //   // discountedRateArray.push(discountedRate);
            //   /*Net charge => (1+(fuelSurchareg/100))*discountedRate */
            //   if (Ar.factoring !== 'COSTPLUS') {
            //     const netCharge = (1 + (Ar.fuelCharge[0] / 100)) * x;
            //     let netc = [];
            //     netc.push(netCharge.toFixed(2));
            //     Ar.netChargeArray = netc
            //     const netChargeResult = ((x) * (Ar.fuelCharge / 100));
            //     let resNetArray = []
            //     resNetArray.push(netChargeResult.toFixed(2));
            //     Ar.netChargeResultArray = resNetArray;
            //   } else {
            //     // const netCharge = (1 + (Ar.fuelCharge / 100)) * x;
            //     // netChargeArray.push(netCharge.toFixed(2));
            //     // const netChargeResult = ((discountedRate) * (fuelSurcharge / 100));
            //     // netChargeResultArray.push(netChargeResult.toFixed(2));
            //     const netCharge = (1 + (Ar.fuelCharge[0] / 100)) * x;
            //     let netc = [];
            //     netc.push(netCharge.toFixed(2));
            //     Ar.netChargeArray = netc
            //     const netChargeResult = ((x) * (Ar.fuelCharge / 100));
            //     let resNetArray = []
            //     resNetArray.push(netChargeResult.toFixed(2));
            //     Ar.netChargeResultArray = resNetArray;
            //   }
            //       const netChargeValue = this.netChargeArrSum(Ar.netChargeArray);

            //   // if (factoring !== "COSTPLUS") {
            //     const totalCharge = Number(Ar.highCostDeliveryCharge) + Number(Ar.additionalCharge) + Number(Ar.netChargeArray[0]) + Number(Ar.singleShipmentCharge) + Ar.assessorialCharge;
            //     let tt = [];
            //     Ar.totalCharge = tt;
            //     tt.push(totalCharge.toFixed(2));
            //     Ar.totalChargeArray = tt;
            //   // } else {
            //   //   const totalCharge = Number(highCost) + Number(addCACharge) + Number(netChargeValue) + Number(addSingleShipmentCharge) + assessorialCharge;
            //   //   totalChargeArray.push(totalCharge.toFixed(2));
            //   // }
            //   // finalRateCharge
            // }
            // if (Ap.totalCharge > Ar.totalCharge[0]) {
            //   // this.showNegativeMargin = true;
            //   // this.showData = false;
            //   let charge = Number(Ap.totalCharge)* 5/100;
            //   let addedCharge = charge + Number(Ap.totalCharge)
            //   let charegArry = [];
            //   charegArry.push(addedCharge.toFixed(2));
            //   Ar.totalCharge = charegArry;
              
            // }
            if (Ap.totalCharge > Ar.totalCharge[0]) {
              // this.showNegativeMargin = true;
              let charge = Number(Ap.totalCharge)/0.95;
              let addedCharge = charge;
              let charegArry = [];
              charegArry.push(addedCharge.toFixed(2));
              Ar.totalCharge = charegArry;
              Ar.showcolor = true;
              // this.showData = false;
            }
            this.resultArray.forEach((el:any) => {
              if (el.category === 'AR') {
                this.resultObject = el;
  
              }
            })
          // }
        let date = new Date();
        console.log('QUOTE REQUEST YRC METHOD CALL AR', date);
        // this.giveRateDetails(this.YRCArray);
        // document.getElementById('myDiv').className = 'imgBlock';
      }
    }

    // this.resultObject = this.resultArray[1];
     
    (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
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

  }

  rateCalculationForYRCReddawayCostplus(response:any, carrierType:any, category:any, factoring:any) {
    // if (carrierType === 'YRC') {
      // console.log(this.YRCArray);
      let discount, fuelSurcharge, rateId, amc, highCost, addCACharge, addRate, discountedRate:any,
      addSingleShipmentCharge, minimumClass, totalAssessorialCharge, assessorialCharge, customerBusinessRule = [], assessorialChargeArray = [], profileAssessorials:any = [];
    const weightArray:any = [], classificationArray = [], classification1 = [], finalRateArray = [], discountedRateArray:any = [],
      netChargeArray = [], netChargeResultArray = [], totalChargeArray = [];
    let finalRate:any = [], rate:any = [], crtRateArray:any = [], fuelSurchargeArray = [];
    const diffFinalRateArray:any = [], diffRateArray:any = [], discountArray = [], diffWeightArray:any = [];
    let profileMinimumCharge, profileLifeGateCharge, profileResidentialCharge, profileLimitedAccessDelivery,
      profileInsideDelivery, profileNotify, profileSingleShipment, singleShipmentsetMasterData, profiledeliveryAppointmentRequired,profilehazmat,profileLiftGatePickupCharge,profileResidentialPickupcharge,profilelimitedpickup;
    let currentFinalRate, currentRate, currentFinalDwRate, currentDwRate;
    let discountedRateCalculation;
    this.parseSetMasterData = [];
    this.showDirections = '';
    // this.showCACharge = false;
    // this.showHighCostDelivery = false;
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
this.resultArray.forEach((ele:any) =>{
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
this.resultArray.forEach((ele:any) =>{
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
          //  this.profile = {
          //       companyName: carrierType, discount: discount,
          //       fuelsurcharge: fuelSurcharge, recentRateId: rateId, amc: amc, type: category
          //     };
              // this.changeArValues(this.profile);
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
// if (carrierType === 'YRC') {
//           if (this.getRuleForYRCAR.length > 0) {
//             profileLifeGateCharge = this.getRuleForYRCAR[0].liftGateService;
//             profileLiftGatePickupCharge = this.getRuleForYRCAR[0].liftGateService;
//             profileResidentialCharge = this.getRuleForYRCAR[0].residentialDelivery;
//             profileLimitedAccessDelivery = this.getRuleForYRCAR[0].limitedAccessDelivery;
//             profileInsideDelivery = this.getRuleForYRCAR[0].insideDelivery;
//             profileNotify = this.getRuleForYRCAR[0].notify;
//             profileSingleShipment = this.getRuleForYRCAR[0].singleShipment;
//             profiledeliveryAppointmentRequired = this.getRuleForYRCAR[0].deliveryAppointmentRequired;
//             profilehazmat = this.getRuleForYRCAR[0].hazmat;
//             profileResidentialPickupcharge = this.getRuleForYRCAR[0].residentialDelivery;
//             profileLiftGatePickupCharge = this.getRuleForYRCAR[0].liftGateService;
//           profilelimitedpickup = this.getRuleForYRCAR[0].limitedAccessDelivery;
//             profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
//              {liftGatePickup: profileLiftGatePickupCharge, id: 10},
//               { residential: profileResidentialCharge, id: 2 },
//               { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
//               { insideDelivery: profileInsideDelivery, id: 4 },
//               { notify: profileNotify, id: 5 },
//               { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id : 7},
//               {hazmat: profilehazmat,id:8},
//               {liftGatePickup: profileLiftGatePickupCharge, 'id': 10},
//               {residentialPickup: profileResidentialPickupcharge, 'id': 11},
//               {limitedaccesspickup: profilelimitedpickup, 'id': 12});
//           } else {
//             profileAssessorials.push({ liftGate: '', 'id': 1 },
//               { residential: '', 'id': 2 },
//               { limitedAccessDelivery: '', 'id': 3 },
//               { insideDelivery: '', id: 4 },
//               { notify: '', 'id': 5 },
//               {deliveryAppointmentRequired: '' , 'id': 7},
//               {hazmat:'', 'id': 8},
//               {liftGatePickup: '', 'id': 10},
//               {residentialPickup: '', 'id': 11},
//               {limitedaccesspickup: '', 'id': 12}
//               );
//               this.profile = {
//                 companyName: carrierType, fuelsurcharge: fuelSurcharge, type: category,
//                 recentRateId: rateId, discount: discount, amc: profileMinimumCharge
//               };
//           }
//         } else {
//           if (carrierType === 'REDDAWAY') {
//             if (this.getRuleForReddawayAR.length > 0) {
//               profileLifeGateCharge = this.getRuleForReddawayAR[0].liftGateService;
//               profileResidentialCharge = this.getRuleForReddawayAR[0].residentialDelivery;
//               profileLimitedAccessDelivery = this.getRuleForReddawayAR[0].limitedAccessDelivery;
//               profileInsideDelivery = this.getRuleForReddawayAR[0].insideDelivery;
//               profileNotify = this.getRuleForReddawayAR[0].notify;
//               profileSingleShipment = this.getRuleForReddawayAR[0].singleShipment;
//               profiledeliveryAppointmentRequired = this.getRuleForReddawayAR[0].deliveryAppointmentRequired;
//               profilehazmat = this.getRuleForReddawayAR[0].hazmat;
//               profileResidentialPickupcharge = this.getRuleForReddawayAR[0].residentialDelivery;
//               profileLiftGatePickupCharge = this.getRuleForReddawayAR[0].liftGateService;
//             profilelimitedpickup = this.getRuleForReddawayAR[0].limitedAccessDelivery;
//               profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
//                 { residential: profileResidentialCharge, id: 2 },
//                 { limitedAccessDelivery: profileLimitedAccessDelivery, id: 3 },
//                 { insideDelivery: profileInsideDelivery, id: 4 },
//                 { notify: profileNotify, id: 5 },
//                 { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id: 7},
//                 {hazmat: profilehazmat , id:8},
//                 {liftGatePickup: profileLiftGatePickupCharge, 'id': 10},
//                 {residentialPickup: profileResidentialPickupcharge, 'id': 11},
//                 {limitedaccesspickup: profilelimitedpickup, 'id': 12});
//             } else {
//               profileAssessorials.push({ liftGate: '', 'id': 1 },
//                 { residential: '', 'id': 2 },
//                 { limitedAccessDelivery: '', 'id': 3 },
//                 { insideDelivery: '', id: 4 },
//                 { notify: '', 'id': 5 },
//                 {deliveryAppointmentRequired: '', 'id': 7},
//                 {hazmat: '', 'id':8},
//                 {liftGatePickup: '', 'id': 10},
//                 {residentialPickup: '', 'id': 11},
//                 {limitedaccesspickup: '', 'id': 12});
//             }
//           }
//         }
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
        discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusPercentFactor));
        console.log('discountedRateCalculation cost plus', discountedRateCalculation);
      } else {
        let discountedRateNewCalculation = (this.finalRateCharge * (1 - (discount / 100)));
        console.log('discountedRateNewCalculation', discountedRateNewCalculation);
        discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusPercentFactor));
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
console.log('xxxx',this.costPlusPercentFactor);
if (carrierType === 'YRC') {
      const totalCharge = Number(costplus.totalCharge) * Number(this.costPlusPercentFactor);
      totalChargeArray.push(totalCharge.toFixed(2));

} else {
  const totalCharge = Number(costplus.totalCharge) * Number(this.costPlusPercentFactor);
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
      this.resultArray.push(this.pricingInfo);
      if (this.resultArray.length > 1) {
        // this.waitForProcessMessage = false;
        this.showAllData = true;
        this.hideYrcData = false;
        this.showYrcData = true;
        this.showYrcDataAR = true;
        this.showBorder = true;
        // let Apdiscountrate;
        // let Ap,Ar;
        // this.resultArray.forEach((ee, index) => {
        //   if (ee.category === "AP") {
        //     Ap = ee;

        //   };
        //   if (ee.category === "AR") {
        //     Ar = ee;

        //   };
        // });
        //     console.log('jefrin',Ap,Ar);
        //     let consoleArray;
        //     consoleArray = this.resultArray;
        //     console.log('stacy',consoleArray, Apdiscountrate,Ar.discountedRate);
        //     Apdiscountrate = Ap.discountedRate;
        //     if (Number(Ap.totalCharge) > Number(Ar.totalCharge[0])) {
        //       // this.showNegativeMargin = true;
        //       let charge = Number(Ap.totalCharge)/0.95;
        //       let addedCharge = charge;
        //       let charegArry = [];
        //       charegArry.push(addedCharge.toFixed(2));
        //       Ar.totalCharge = charegArry;
        //       Ar.showcolor = true;
        //       // this.showData = false;
        //     }
           

            this.resultArray.forEach((el: any) => {
              if (el.category === 'COSTPLUS') {
                this.resultObject = el;
  
              }
            })
          // }
        let date = new Date();
        console.log('QUOTE REQUEST YRC METHOD CALL AR', date);
        // this.giveRateDetails(this.YRCArray);
        // document.getElementById('myDiv').className = 'imgBlock';
      }
    // }

    // this.resultObject = this.resultArray[1];
     
    (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
    // if (this.userData.carrier === 'YRC') {
      if (this.resultArray.length > 2) {
        this.giveRateDetails(this.resultArray, 'AR');
      }
  

    // }
  }
  rateCalculationForYRCReddawayCostplusNew(response: any, carrierType:any, category:any, factoring:any) {
    let date = new Date();
    console.log('RATE CALCULATION TIME FOR YRC', date);
    let discount, fuelSurcharge, rateId, amc, highCost, addCACharge, addRate, discountedRate:any,
      addSingleShipmentCharge, minimumClass, totalAssessorialCharge, assessorialCharge, customerBusinessRule: any = [], assessorialChargeArray = [], profileAssessorials = [];
    const weightArray:any = [], classificationArray:any = [], classification1:any = [], finalRateArray = [], discountedRateArray = [],
      netChargeArray = [], netChargeResultArray = [], totalChargeArray = [];
    let finalRate = [], rate = [], crtRateArray = [], fuelSurchargeArray: any = [];
    const diffFinalRateArray = [], diffRateArray = [], discountArray = [], diffWeightArray = [];
    let profileMinimumCharge, profileLifeGateCharge, profileResidentialCharge, profileLimitedAccessDelivery,
      profileInsideDelivery, profileNotify, profileSingleShipment, singleShipmentsetMasterData,profiledeliveryAppointmentRequired, profilehazmat, profileLiftGatePickupCharge,profileResidentialPickupcharge,profilelimitedpickup;
    this.parseSetMasterData = [];
    let currentFinalRate, currentRate;
    let discountedRateCalculation;
    this.showDirections = '';
    this.showSingleShipmentValue = false;
    this.showDeficitValue = false;
    this.showMinimumCharge = false;
    this.hideYrcData = false;
    this.localStorageArData = [];
    let staticData:any = localStorage.getItem('artableData');
    this.localStorageArData = JSON.parse(staticData);
    let costplusAp:any;
    // highcost = 0;
    this.resultArray.forEach((ele:any) =>{
      if (ele.category === 'AP') {
      console.log('xxxx', ele);
      costplusAp =ele;
      
      }
      })
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
    // fuelSurchargeArray.push(costplusAp.fuelCharge[0]);
    if (carrierType === 'YRC') {
      if (category === 'AP') {
        if (this.weightForCal < 500) {
          if (this.applyCostPlusFlag === true) {
            if (this.singleShipmentCharge !== '' && this.singleShipmentCharge !== null && this.singleShipmentCharge !== undefined) {
              addSingleShipmentCharge = this.singleShipmentCharge;
            } else {
              addSingleShipmentCharge = 0;
            }
          } else {
            if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
              addSingleShipmentCharge = profileSingleShipment;
            } else {
              if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
                addSingleShipmentCharge = singleShipmentsetMasterData.cost;
              } else {
                addSingleShipmentCharge = 0;
              }
            }
          }
        } else {
          addSingleShipmentCharge = 0;
        }
      } else {
        if (this.singleShipmentCharge !== '' && this.singleShipmentCharge !== null && this.singleShipmentCharge !== undefined) {
          addSingleShipmentCharge = this.singleShipmentCharge;
        } else {
          addSingleShipmentCharge = 0;
        }
      }
    } else {
      if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
        addSingleShipmentCharge = profileSingleShipment;
      } else {
        if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
          addSingleShipmentCharge = singleShipmentsetMasterData.cost;
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
    let finalRate11 = Number(costplusAp.totalGrossCharge) * Number(this.costPlusPercentFactor)/100;
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
      discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusPercentFactor));
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
          discountedRate = (Number(profileMinimumCharge)* Number(this.costPlusPercentFactor)).toFixed(2);
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
            discountedRate = (Number(amc)* Number(this.costPlusPercentFactor)).toFixed(2);
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
      costPlusPercent: this.costPlusPercentFactor,
      totalWeight: this.finalTotalWeight,
      higherValueAP: this.higherValueAP,
      showcolor: this.showcolor
    };    
    this.resultArray.push(this.pricingInfo);
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
      let Ap,Ar;
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
          console.log('jefrin',Ap,Ar);
      (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
      /*If AP netcharge value > AR netcharge it gives Error message as sales rep will contact you*/
      if (this.resultArray[1].factor !== 'COSTPLUS') {
        if (Number(this.resultArray[0].totalChargeForComparing) > Number(this.resultArray[1].totalChargeForComparing)) {
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          rateArray.push(this.resultArray[0]);
          this.resultArray = [];
          this.resultArray = rateArray;
          let factorValue = 5;
          this.costPlusPercentFactor = 1 + (Number(factorValue) / 100);
          this.higherValueAP = true;
          if (this.userData.carrier === 'YRC') {
            if (this.resultArray.length > 2) {
            this.getYRCForCostPlus();
            }
          } else {
            this.getReddawayForCostPlus();
          }
        } else {
          this.showData = true;
          this.resultArray.forEach((el:any) => {
            if (el.category === 'AR') {
              this.resultObject = el;

            }
          })
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          if (this.userData.carrier === 'YRC') {
            if (this.resultArray.length > 2) {
              this.giveRateDetails(this.resultArray, 'AR');
            }
          } else {
            if (this.resultArray.length > 1) {
            this.giveRateDetails(this.resultArray, 'AR');
          }
        }
        }
      } else {
        this.showData = true;
        // this.resultObject = this.resultArray[1];
        this.resultArray.forEach((el:any) => {
          if (el.category === 'AR') {
            this.resultObject = el;

          }
        })
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
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
      }
    }
  }
  rateCalculationForFedex(response:any, carrierType:any, category:any, factoring:any) {
    console.log(response);
    let date = new Date();
    console.log('RATE CALCULATION TIME FOR FEDEX', date);
    let discount, fuelSurcharge, rateId, amc, highCost, addRate, additionalRate, discountedRate:any, addSingleShipmentCharge,
      assessorialCharge, minimumClass, originalDiffRateList, customerBusinessRule = [], totalAssessorialCharge, assessorialChargeArray = [];
    const weightArray = [], classificationArray = [], fedexRateArray = [], dwRate = [], classification1 = [];
    const  rate = [], diffRateArray = [], diffFinalRateArray = [],
      crtRateArray = [], diffWeight = [], discountedRateArray = [], netChargeArray = [], netChargeResultArray = [],
      totalChargeArray = [], profileAssessorials = [], discountArray = [], fuelSurchargeArray = [];
      let finalRate:any = [];
    let profileMinimumCharge, profileLifeGateCharge, profileResidentialCharge, profileInsideDelivery,
      profileLimitedAccessDelivery, profileNotify, profileSingleShipment, singleShipmentsetMasterData,profiledeliveryAppointmentRequired, profilehazmat,profileLiftGatePickupCharge,profileResidentialPickupcharge,profilelimitedpickup;
    this.parseSetMasterData = [];
    let discountedRateCalculation;
    let currentFinalFedexRate, currentFedexRate, addCACharge;
    this.showDeficitValue = false;
    this.pricingInfoFedexEconomy = {};
    this.pricingInfoFedexPriority = {};
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
      /*Based on carrier type Fedex Economy and Fedex Priority*/
      if (carrierType === 'FEDEX ECONOMY') {
        customerBusinessRule = response.result.FEprofileRate;
      } else {
        customerBusinessRule = response.result.FPprofileRate;
      }
      highCost = 0;
      // if (response.result.additionalRate === 0) {
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
      // if (response.result.additionalRate === 0) {
      //   highCost = 0;
      // } else {
      //   highCost = response.result.additionalRate;
      // }
    }
    highCost = response.result.fedexHighCost.origin + response.result.fedexHighCost.destination;

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
      console.log('highCostForFedex',this.highCostForFedex)
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
    if (response.result.additionalRate === 0) {
      additionalRate = 0;
    } else {
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
          profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
            { residential: profileResidentialCharge, 'id': 2 },
            { limitedAccessDelivery: profileLimitedAccessDelivery, 'id': 3 },
            { insideDelivery: profileInsideDelivery, 'id': 4 },
            { notify: profileNotify, 'id': 5 },
            { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7 },
            { hazmat: profilehazmat, 'id': 8},
            {liftGatePickup: profileLiftGatePickupCharge,'id': 10 },
            {residentialPickup: profileResidentialPickupcharge, 'id':11},
            {limitedaccesspickup: profilelimitedpickup,'id': 12});
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
              { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, id: 7},
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
              { deliveryAppointmentRequired: '', 'id': 7},
              { hazmat: '', 'id': 8},
              {liftGatePickup: '','id': 10 },
            {residentialPickup: '', 'id':11},
            {limitedaccesspickup: '','id': 12});
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
            { residential: profileResidentialCharge, 'id': 2 },
            { limitedAccessDelivery: profileLimitedAccessDelivery, 'id': 3 },
            { insideDelivery: profileInsideDelivery, 'id': 4 },
            { notify: profileNotify, 'id': 5 },
            { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7},
            {hazmat : profilehazmat, 'id': 8},
            {liftGatePickup: profileLiftGatePickupCharge,'id': 10 },
            {residentialPickup: profileResidentialPickupcharge, 'id':11},
            {limitedaccesspickup: profilelimitedpickup,'id': 12});
        } else {
          profileAssessorials.push({ liftGate: '', 'id': 1 },
            { residential: '', 'id': 2 },
            { limitedAccessDelivery: '', 'id': 3 },
            { insideDelivery: '', 'id': 4 },
            { notify: '', 'id': 5 },
            { deliveryAppointmentRequired: '', 'id': 7},
            {hazmat : '', 'id': 8},
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
          {hazmat : '', 'id': 8},
          {liftGatePickup: '','id': 10 },
            {residentialPickup: '', 'id':11},
            {limitedaccesspickup: '','id': 12});
      }
    }
    discountArray.push(discount);
    fuelSurchargeArray.push(fuelSurcharge);
    if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
      addSingleShipmentCharge = profileSingleShipment;
    } else {
      if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
        addSingleShipmentCharge = singleShipmentsetMasterData.cost;
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
        minCharges = Number(response.result.minCharges) * this.increasedValueForAR
      } else {
        minCharges = Number(response.result.minCharges)
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
        const currentFedexRate = Number(response.result.rate[f].rate) * this.increasedValueForAR;
        rate.push(currentFedexRate.toFixed(2));
        const currentNewDWRate = Number(response.result.rate[f].DWRate) * this.increasedValueForAR;
        dwRate.push(currentNewDWRate.toFixed(2));
      } else {
        const currentFedexRate = Number(response.result.rate[f].rate);
        rate.push(currentFedexRate.toFixed(2));
        const currentNewDWRate = Number(response.result.rate[f].DWRate);
        dwRate.push(currentNewDWRate.toFixed(2));
      }
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
    if (factoring !== 'COSTPLUS') {
      discountedRateCalculation = (this.finalRateCharge * (1 - (discount / 100)));
    } else {
      let discountedRateNewCalculation = (this.finalRateCharge * (1 - (discount / 100)));
      discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusPercentFactor));
    }
    // const discountedRateCalculation = (this.finalRateCharge * (1 - (discount / 100)));    
    if (profileMinimumCharge !== undefined && profileMinimumCharge !== '' && 
    profileMinimumCharge !== null) {
      if (Number(profileMinimumCharge) > Number(discountedRateCalculation)) {
       
        if (factoring !== 'COSTPLUS') {
          discountedRate = Number(profileMinimumCharge);
          console.log('profileFedex1 ', discountedRate);
        } else {
          discountedRate = (Number(profileMinimumCharge)* Number(this.costPlusPercentFactor)).toFixed(2);
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
            discountedRate = (Number(amc)* Number(this.costPlusPercentFactor)).toFixed(2);
            console.log('profileFedex3 cost plus ', discountedRate);
          }
        } else {
          discountedRate = Number(discountedRateCalculation.toFixed(2));
        }
      } else {
        discountedRate = Number(discountedRateCalculation.toFixed(2));
      }
    }
    let newDiscountedRate = discountedRate + Number(highCost);
    discountedRateArray.push(newDiscountedRate);
    // discountedRateArray.push(discountedRate);
    const netCharge = (1 + (fuelSurcharge / 100)) * (newDiscountedRate);
    netChargeArray.push(netCharge.toFixed(2));
    const netChargeResult = ((newDiscountedRate) * (fuelSurcharge / 100));
    // discountedRateArray.push(discountedRate);
    // const netCharge = (1 + (fuelSurcharge / 100)) * (discountedRate);
    // netChargeArray.push(netCharge.toFixed(2));
    // const netChargeResult = ((discountedRate) * (fuelSurcharge / 100));
    netChargeResultArray.push(netChargeResult.toFixed(2));
    const netChargeValue = this.netChargeArrSum(netChargeArray);
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
    if (factoring !== 'COSTPLUS') {
      assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.parseSetMasterData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
    } else {
      assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
    }
    assessorialCharge = assessorialChargeArray[0];
    this.arrayData = this.pricingInfoService.getAssessorial();
    if(carrierType === 'FEDEX ECONOMY') {
      addCACharge = Number(response.result.fxfeCaCharge);
    } else {
      addCACharge = Number(response.result.fxfpCaCharge);

    }
    let peakCharge = response.result.peakSurcharge;
    console.log('CA0', peakCharge)
    if (factoring !== 'COSTPLUS') {
      totalAssessorialCharge = Number(assessorialCharge)  + Number(addCACharge) + Number(additionalRate) + Number(addSingleShipmentCharge) + Number(peakCharge);
      const totalCharge = (Number(netChargeValue))  + Number(addCACharge) + Number(additionalRate) + Number(addSingleShipmentCharge) + Number(assessorialCharge) + Number(peakCharge);
      totalChargeArray.push(totalCharge.toFixed(2));
    } else {
      totalAssessorialCharge = Number(assessorialCharge)  + Number(addCACharge) + Number(additionalRate) + Number(addSingleShipmentCharge)+ Number(peakCharge);
      const totalCharge = (Number(netChargeValue)) + Number(addCACharge) + Number(additionalRate) + Number(addSingleShipmentCharge) + Number(assessorialCharge) + Number(peakCharge);
      totalChargeArray.push(totalCharge.toFixed(2));
    } 
    classification1.splice(0, 2);
    const totalChargeForComparing = this.netChargeArrSum(totalChargeArray);
    // additionalRate = Number(additionalRate) + Number(addCACharge);
    this.pricingInfoFedexEconomy = {
      rate: rate,
      finalRate: finalRate,
      totalGrossCharge: this.finalRateCharge.toFixed(2),
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
      additionalCharge: addCACharge ,
      additionalCACharge: addCACharge,
      deliveryCharge: additionalRate,
      category: category,
      carrierType: carrierType,
      showMinimumCharge: this.showMinimumCharge,
      shipTypes: this.showDirections,
      netChargeValue: netChargeValue,
      totalChargeForComparing: totalChargeForComparing,
      factor: factoring,
      costPlusPercent: this.costPlusPercentFactor,
      totalWeight: this.finalTotalWeight,
      higherValueAP: this.higherValueAP,
      fedexHighcost: response.result.fedexHighCost,
      showcolor: false,
      peakSurcharge:peakCharge
    };
    this.resultArray.push(this.pricingInfoFedexEconomy);
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
      console.log(this.resultArray[1].totalCharge[0],this.resultArray[0].totalCharge[0]);
      (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
      /*If AP netcharge value > AR netcharge it gives Error message as sales rep will contact you*/
      if (this.resultArray[1].factor !== 'COSTPLUS') {
        console.log('jjj',this.resultArray);
        if (Number(this.resultArray[0].totalCharge[0]) > Number(this.resultArray[1].totalCharge[0])) {
          // this.showNegativeMargin = true;
          let charge = Number(this.resultArray[0].totalCharge)/0.95;
          let addedCharge = charge + Number(this.resultArray[0].totalCharge)
          let charegArry = [];
          this.resultArray[1].totalCharge = [];
          console.log('jjj',this.resultArray);

          charegArry.push(charge.toFixed(2));
          this.resultArray[1].totalCharge = charegArry;
          this.resultArray[1].showcolor = true;
          console.log('jjj',this.resultArray,charegArry);

          // this.showData = false;
        }
        // if (Number(this.resultArray[0].totalChargeForComparing) > Number(this.resultArray[1].totalChargeForComparing)) {
        //   document.getElementById('myDiv').className = 'imgBlock';
        //   rateArray.push(this.resultArray[0]);
        //   this.resultArray = [];
        //   this.resultArray = rateArray;
        //   let factorValue = 5;
        //   this.costPlusPercentFactor = 1 + (Number(factorValue) / 100);
        //   this.higherValueAP = true;
        //   if (this.userData.carrier === 'FEDEX ECONOMY' || this.userData.carrier === 'FEDEX PRIORITY') {
        //     this.getFedexForCostPlus();
        //   }
        // } else {
          this.showData = true;
          this.resultObject = this.resultArray[1];
          this.giveRateDetails(this.resultArray, 'AR');
        // }
      } else {
        this.showData = true;
        this.resultObject = this.resultArray[1];
        this.giveRateDetails(this.resultArray, 'AR');
      }
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
  giveRateDetails(rateDetail:any, value:any) {
    console.log('rateDetail', rateDetail);
    this.quote = {};
    this.quoteDetailsArray = [];
    this.quoteId = '';
    let category, highValue;
    this.quoteDetailsId;
    // rateDetail.forEach((ee,index) => {
      for(let i=0;i<rateDetail.length;i++) {
        if (rateDetail[0].carrierType=== 'FEDEX ECONOMY'|| rateDetail[0].carrierType === 'FEDEX PRIORITY') {
if (rateDetail[0].category === 'AP') {
  rateDetail[0].fedexHighcost = rateDetail[1].fedexHighcost;
  rateDetail[0].highCostDeliveryCharge = rateDetail[1].highCostDeliveryCharge;

  console.log(rateDetail);

}
        }
      }
    //   if (ee.carrierType === 'FEDEX ECONOMY'|| ee.carrierType === 'FEDEX PRIORITY') {
    //     if (ee.category === "AP" && index === 0) {
    //       console.log(index,ee[0]);
    //       console.log(ee[1]);
    //       ee[0].fedexHighcost = ee[1].fedexHighcost; 
    //     }
    //   }
    // })
    (document.getElementById('clear')as HTMLFormElement).focus();
    if (rateDetail.length > 0) {
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
          category = 'COSTPLUS';
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
          accessorials: this.assessorials,
          carrierName: this.userData.carrierName,
          rateDetail: JSON.stringify(rateDetail[i]),
          totalCharge: rateDetail[i].totalCharge,
          createdBy: this.salesRepType,
          highValue: highValue,
          category: category,
          higherValueAp: rateDetail[i].higherValueAP,
          salesRepId: this.setSalesRepId,
          viewType: 'externalCustomer',
          loginId: this.salesRepValues.id,
          originCityState: JSON.stringify({ 'city': this.filterValues.city, 'state': this.filterValues.state }),
          destinationCityState: JSON.stringify({ 'city': this.filterValuesDest.city, 'state': this.filterValuesDest.state })
        };
        this.quoteDetailsArray.push(this.quote);
      }
    }
    console.log('Quotes creation', this.quoteDetailsArray);
    if (this.quoteDetailsArray.length > 0) {
      this.pricingInfoService.saveQuoteDetails(this.quoteDetailsArray).subscribe((data:any) => {
        console.log(data);
        if (data.quoteId === false) {
          this.showQuoteId = false;
        } else if (data.quoteId === 'ap') {
          this.showAdminErrorMessage = true;
          this.showAllData = false;
        } else {
          this.showQuoteId = true;
          if (data.quoteId['YRCAR']) {
            this.quoteId = data.quoteId['YRCAR'];
            this.showQuoteId = true;
            this.quoteDetailsId = data.quoteId['YRCARID'];
          } else if (data.quoteId['YRCCOSTPLUS']) {
            this.quoteId = data.quoteId['YRCCOSTPLUS'];
            this.showQuoteId = true;
            this.quoteDetailsId = data.quoteId['YRCCOSTPLUSID'];
          } else if (data.quoteId['FEDEX ECONOMYAR']) {
            this.quoteId = data.quoteId['FEDEX ECONOMYAR'];
            this.showQuoteId = true;
            this.quoteDetailsId = data.quoteId['FEDEX ECONOMYARID'];
          } else if (data.quoteId['FEDEX ECONOMYCOSTPLUS']) {
            this.quoteId = data.quoteId['FEDEX ECONOMYCOSTPLUS'];
            this.showQuoteId = true;
            this.quoteDetailsId = data.quoteId['FEDEX ECONOMYCOSTPLUSID'];
          } else if (data.quoteId['FEDEX PRIORITYAR']) {
            this.quoteId = data.quoteId['FEDEX PRIORITYAR'];
            this.showQuoteId = true;
            this.quoteDetailsId = data.quoteId['FEDEX PRIORITYARID'];
          } else if (data.quoteId['FEDEX PRIORITYCOSTPLUS']) {
            this.quoteId = data.quoteId['FEDEX PRIORITYCOSTPLUS'];
            this.showQuoteId = true;
            this.quoteDetailsId = data.quoteId['FEDEX PRIORITYCOSTPLUSID'];
          } else if (data.quoteId['REDDAWAYAR']) {
            this.quoteId = data.quoteId['REDDAWAYAR'];
            this.showQuoteId = true;
            this.quoteDetailsId = data.quoteId['REDDAWAYARID'];
          } else if (data.quoteId['REDDAWAYCOSTPLUS']) {
            this.quoteId = data.quoteId['REDDAWAYCOSTPLUS'];
            this.showQuoteId = true;
            this.quoteDetailsId = data.quoteId['REDDAWAYCOSTPLUSID'];
          }
        }
      });
    }
  }
  sendMail(quoteId:any, salesRepId:any, type:any, category:any) {
    let object = {
      quoteId: quoteId,
      salesRepId: salesRepId,
      type: type,
      category: category
    }
    this.pricingInfoService.sendEmailData(object).subscribe(response => {
      this.mailResponse = response;
      if (type === 'salesRep') {
        if (this.mailResponse.result === true) {
          this.toastr.success('Mail has been sent successfully', '', {
            timeOut: 1000
          });
          $("#success-alert").show(1);
          $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
            $("#success-alert").slideUp(500);
          });
        } else {
          this.toastr.error('Failed to send mail');
        }
      } else {
        if (this.mailResponse.result === true) {
        this.toastr.success('Mail has been sent successfully', '', {
          timeOut: 1000
        });
      }
      }
      this.logger = {
        'method': 'sendMailFunction',
        'message': 'sending report to the mail',
        'salesrepId': this.salesRepId
      };
      this.loggerService.info(this.logger);
    });
  }


  removeLocal() {
    localStorage.removeItem('aptableData');
    localStorage.removeItem('artableData');
    return '';
  }

  checkArData(data:any) {
    this.modalData = {};
    this.modalData = data;
    console.log(data,data.fedexHighcost);
    console.log(this.resultArray);
    this.highcostArray = [];
    if (data.fedexHighcost !== undefined) {
      this.highcostArray.push(data.fedexHighcost);

    }
    console.log(this.highcostArray);
    this.assessorialList = [];
    if (this.modalData.netChargeResult.length > 0) {
      this.modalData.fuelCharges = this.modalData.netChargeResult[0];
    } else {
      this.modalData.fuelCharges = this.modalData.netChargeDiffResult[0];
    }
    if (this.modalData.discountedRate.length > 0) {
      this.modalData.discountCharge = this.modalData.discountedRate[0];
    } else {
      this.modalData.discountCharge = this.modalData.diffDiscountedRate[0];
    }
    if (this.modalData.assessorialDataList.length > 0) {
      for (let i = 0; i < this.modalData.assessorialDataList.length; i++) {
        let dataNew = this.modalData.assessorialDataList[i].split('-');        
        let dataObject = { name: dataNew[0], cost: dataNew[1].trim() };
        this.assessorialList.push(dataObject);        
      }
    }
    this.modalData.totalWeight = this.netChargeArrSum(this.totalWeight);
    this.resultArray.forEach((ele:any) => {
      if (ele.category === 'AP') {
        if (ele.carrierType === 'YRC' || ele.carrierType === 'REDDAWAY' ) {
          this.modalData.ApData = ele.totalCharge;

        } else {
          this.modalData.ApData = ele.totalCharge[0];

        }
      } 
      if (ele.category === 'AR') {
        this.modalData.showColor = ele.showcolor;

      }
    })
    console.log(this.modalData, this.customerType);
    // if (this.modalData.showColor === true && this.customerType !== 'externalCustomer') {
    //   $('#quote_details').hide();

    // } else {
    //   $('#quote_details').show();

    // }

    // this.modalData.showColor = this.resultArray[1].showcolor;
    // this.modalData.ApData = this.resultArray[0].totalCharge[0];
    // console.log(this)
  }

  createBol(quoteId:any, object:any) {
    // console.log(quoteId,object);
    // let quoteIdObject = { 'quoteNumber': quoteId };
    // let quoteObject = { 'quoteNumber': quoteId , 'quoteDetails': object };
    // this.pricingInfoService.setBolQuoteId(quoteIdObject);
    // this.pricingInfoService.setQuoteId(quoteObject);
    this.router.navigate(['/bill']);

  }

  itemTemplateData() {
    this.itemTemplatesPresent = false;
    this.openType = 'item';
    if (this.customerType === 'externalCustomer') {
      this.externalService.getTemplate(this.companyId, this.openType).subscribe(response => {
        this.itemTemplate = response;
        if (this.itemTemplate.length > 0) {
          this.itemTemplatesPresent = true;
          this.noViewTemplate = false;
          this.hideViewTemplate = true;
          this.showViewTemplate = false;

        } else {
          this.itemTemplatesPresent = false;
          this.noViewTemplate = true;
          this.hideViewTemplate = false;
          this.showViewTemplate = false;
        }
      });
    } else {
      this.externalService.getTemplate(this.companyId, this.openType).subscribe(response => {        
        this.itemTemplate = response;
        if (this.itemTemplate.length > 0) {
          this.itemTemplatesPresent = true;
          this.noViewTemplate = false;
          this.hideViewTemplate = true;
          this.showViewTemplate = false;
        } else {
          this.itemTemplatesPresent = false;
          this.noViewTemplate = true;
          this.hideViewTemplate = false;
          this.showViewTemplate = false;
        }
      });
    }
  }

  getItemClickValues(id: any) {
    this.openType = 'itemId';
    this.externalService.getTemplate(id, this.openType).subscribe(response => {
      this.itemTemplate = response;      
      this.itemTemplateAutoFill = this.itemTemplate[0];
      this.transportOrigin.patchValue({
        description: this.itemTemplateAutoFill.description,
        nmfc: this.itemTemplateAutoFill.nmfcNumber,
        classification: this.itemTemplateAutoFill.class,
      });
      (document.getElementById('weight')as HTMLFormElement).focus();
      this.itemTemplateData();
    });
  }

  viewTemplate() {
    this.showClassTable = !this.showClassTable;
    this.showViewTemplate = false;
    this.hideViewTemplate = true;
    this.noViewTemplate = false;
  }

  hideTemplate() {
    this.showViewTemplate = true;
    this.hideViewTemplate = false;
    this.noViewTemplate = false;
  }
  noTemplate() {
    this.showViewTemplate = false;
    this.hideViewTemplate = false;
    this.noViewTemplate = true;

  }

  getShipmentValue(shipmentValue:any, type:any) {    
    if (type === 'yes') {      
      this.singleShipmentCharge = shipmentValue;
      $('#popup-modal').hide();
      this.getYrc();
      (document.getElementById('myDiv')as HTMLFormElement).className = 'imgShow';
      this.singleShipmentFlag = true;
      this.showData = false;
    } else {
      this.singleShipmentCharge = 0;
      $('#popup-modal').hide();
      this.getYrc();
      (document.getElementById('myDiv')as HTMLFormElement).className = 'imgShow';
      this.showData = false;
    }
  }

  close() {
    $("#popup-modal").hide();
  }

  getYrc() {

  console.log('yrccostplus', this.applyCostPlusFlag);
    this.pricingInfoService.getRates(this.userData, 'YRC AP').subscribe((response:any) => {      
      if (Object.keys(response.result).length === 0 || response.result === undefined) {
        this.hideData = true;
        this.resultObject = { carrierType: 'YRC' };
        this.showData = false;
      } else if (response.result === false){
        this.hideData = true;
        this.showData = false;
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
        this.resultObject = { carrierType: 'YRC' };

      }else {
        if (response.result === 'No Rules') {
        } else {
          this.responseForYRCAp = response;
          console.log('Before')

          this.rateCalculationForYRCReddaway1(response, 'YRC', 'AP', 'AP');
          // if (this.applyCostPlusFlag === true) {
          //   this.getYRCForCostPlus();
          // }
          console.log('Afetr')
          if (this.applyCostPlusFlag === false) {
            this.pricingInfoService.getRates(this.userData, 'YRC AR').subscribe((response:any) => {
              if (Object.keys(response.result).length === 0 || response.result === undefined) {
                $('#popup-modal').hide();
                this.hideData = true;
                this.showData = false;
                this.resultObject = { carrierType: 'YRC' };
              } else if (response.result === false){
                this.hideData = true;
                this.showData = false;
                (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                this.resultObject = { carrierType: 'YRC' };
        
              } else {
                if (response.result === 'No Rules') {
                  (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
                  this.showData = false;
                  this.hideData = false;
                  this.showIfNoRule = true;
                  $('#popup-modal').hide();
      
                  this.resultObject = { carrierType: 'YRC' };
                } else {
                  this.pricingInfoService.getTransitTime(this.userData).subscribe((response:any) => {
                    this.transitTime = response;
                    if (this.transitTime.result !== false) {
                      this.transitTime.result = this.transitTime.result;
                    } else {
                      this.transitTime.result = 'NA';
                    }
                  }, (err:any) => {
                    this.transitTime.result = 'NA';
                  });
                  this.rateCalculationForYRCReddaway(response, 'YRC', 'AR', 'AR');
                }
              }
            }, (err:any) => {
              this.logger = { 'method': 'getRates', 'message': 'YRC AR Error response', 'status': err.status };
              this.loggerService.error(this.logger);
              (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
              if (err.status === 0) {
                this.showErrorInternetConnection = true;
                this.onlineOffline = true;
              }
            });
          } else {
            this.getYRCForCostPlus();

          }
          this.pricingInfoService.getRates(this.userData, 'YRC OLDAP').subscribe((response:any) => {      
            console.log(this.applyCostPlusFlag)
      
            if (Object.keys(response.result).length === 0 || response.result === undefined) {
              this.hideData = true;
              this.resultObject = { carrierType: 'YRC' };
              this.showData = false;
            } else {
              if (response.result === 'No Rules') {
              } else {
                this.responseForYRCAp = response;
                this.rateCalculationForYRCReddaway2(response, 'YRC', 'AP', 'AP');
                // if (this.applyCostPlusFlag === true) {
                //   this.getYRCForCostPlus();
                // }
              }
            }
          }, (err:any) => {
            this.logger = { 'method': 'getRates', 'message': 'YRC AP Error response', 'status': err.status };
            this.loggerService.error(this.logger);
            (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
            if (err.status === 0) {
              this.showErrorInternetConnection = true;
              this.onlineOffline = true;
            } else {
              this.showData = false;
              this.hideData = false;
            }
          });
        }
      }
    }, (err:any) => {
      this.logger = { 'method': 'getRates', 'message': 'YRC AP Error response', 'status': err.status };
      this.loggerService.error(this.logger);
      (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
      if (err.status === 0) {
        this.showErrorInternetConnection = true;
        this.onlineOffline = true;
      } else {
        this.showData = false;
        this.hideData = false;
      }
    });
  
   
  
  }
  getYRCForCostPlus() {
    this.pricingInfoService.getTransitTime(this.userData).subscribe((response:any) => {      
      this.transitTime = response;
      if (this.transitTime.result !== false) {
        this.transitTime.result = this.transitTime.result;
      } else {
        this.transitTime.result = 'NA';
      }
    }, (err:any) => {
      this.transitTime.result = 'NA';
    });
    console.log('ssss1');
    this.rateCalculationForYRCReddawayCostplus(this.responseForYRCAp, 'YRC', 'AP', 'COSTPLUS');
  }
  // getYRCForCostPlus1() {
  //   this.pricingInfoService.getTransitTime(this.userData).subscribe(response => {      
  //     this.transitTime = response;
  //     if (this.transitTime.result !== false) {
  //       this.transitTime.result = this.transitTime.result;
  //     } else {
  //       this.transitTime.result = 'NA';
  //     }
  //   }, err => {
  //     this.transitTime.result = 'NA';
  //   });
  //   console.log('ssss2');
  //   this.rateCalculationForYRCReddaway2(this.responseForYRCAp, 'YRC', 'AP', 'COSTPLUS');
  // }
  getFedexForCostPlus() {
    this.pricingInfoService.getTransitTime(this.userData).subscribe((response:any) => {      
      this.transitTime = response;
      if (this.transitTime.result !== false) {
        this.split = this.transitTime.result.split('_');
        this.numbersArray.forEach((elem:any) =>{
          if(elem.name === this.split[0]){
            this.transitTime.result = elem.id;
          } 
          // else {
          //   this.transitTime.result = 'NA';

          // }
        })
        // this.transitTime.result = wordsToNumbers(this.split[0]);
      } else {
        this.transitTime.result = 'NA';
      }
    }, (err:any) => {
      this.transitTime.result = 'NA';
    });
    this.rateCalculationForFedex(this.responseForFedexAp, this.userData.carrierName, 'AP', 'COSTPLUS');
  }
  getReddawayForCostPlus() {
    this.pricingInfoService.getTransitTime(this.userData).subscribe((response:any) => {
      this.transitTime = response;
      if (this.transitTime.result !== false) {
        this.transitTime.result = this.transitTime.result;
      } else {
        this.transitTime.result = 'NA';
      }
    }, (err:any) => {
      this.transitTime.result = 'NA';
    });
    this.rateCalculationForYRCReddawayCostplus(this.responseForReddawayAp, 'REDDAWAY', 'AP', 'COSTPLUS');
  }
}

