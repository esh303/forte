import { Component, OnInit } from '@angular/core';
import { PricingInfoService } from '../services/pricing-info.service';
import { LoggerService } from '../services/logger.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../services/excel.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import * as XLSX from 'xlsx';
import * as lod from 'lodash';
import * as _ from 'lodash';
declare const AWS: any;
@Component({
  selector: 'app-company-summary',
  templateUrl: './company-summary.component.html',
  styleUrls: ['./company-summary.component.css']
})
export class CompanySummaryComponent implements OnInit {

  customerForm: FormGroup = new FormGroup({});
  companySummaryForm: FormGroup= new FormGroup({});
  public salesRep:any;
  public salesRepValues:any;
  public salesRepId:any;
  public accessToken:any;
  public customerData: any;
  public count:any;
  public customer:any;
  public arrayValues = [];
  public finalArray = [];
  public viewFakArray:any = [];
  public showCustomerTable = false;
  public showNoRecordsFound = false;
  public showFak = false;
  public showDeletePopup = false;
  public showViewFAKValues = false;
  public showAllCustomersData = false;
  public businessRules:any;
  public salesRepArray:any;
  public numberPerPage:any;
  public customerFeatures:any;
  public customerFeaturesAll:any;
  public addMode = false;
  public setFlag = false;
  public showUploadPopup = false;
  public data:any;
  public logger:any;
  public file:any;
  public fileName:any;
  public customerTableDetail: any;
  public editCustomerId;
  public filteredArray:any;
  public countArray = [];
  public enableRemoveIcon = false;
  public singleFilteredArray:any;
  public mergedCustomerArray = [];
  public array = [];
  public excelData = [];
  public currentPage:any;
  public itemsPage:any;
  public customerId:any;
  public deleteCustomerId:any;
  public salesRepType:any;
  public deleteResponse:any;
  public customerResponse: any;
  public companyFeatures: any;
  public companyResponse: any;
  public showRefreshFlag = false;
  public showDeleteCustomerPopup = false;
  public companyId:any;
  public bucketName = 'logisticscustomerlist';
  public classArray = [50, 55, 60, 65, 70, 77, 85, 92, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];
  public assessorialData = ['Liftgate Service', 'Residential Delivery', 'Limited Access Delivery',
    'Notify', 'Inside Delivery'];
  public yrcCostPlusFactor:any = [];
  public reddawayCostPlusFactor:any = [];
  public fedexEcoCostPlusFactor:any = [];
  public fedexPriCostPlusFactor:any = [];
  public deleteCompanyId:any;
  public showDeletePopupForCompany = false;
  constructor(private pricingInfoService: PricingInfoService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private loggerService: LoggerService,
    private excelService: ExcelService,
    private datePipe: DatePipe,
    private customerService: CustomerService) {

    this.editCustomerId = this.pricingInfoService.modifiedCustomer();
    this.excelService = excelService;

  }

  ngOnInit() {
    this.accessToken = localStorage.getItem('accessToken');
    this.localStorageValues();
    this.getSalesRepData();
    this.currentPage = this.pricingInfoService.getCurrentPageFlag();
    this.customerId = this.pricingInfoService.getCustomerId();
    console.log('customer summary page ', this.currentPage, this.customerId);
    console.log('customer summary page ', this.showAllCustomersData);
    this.buildForm();


  }

  buildForm() {
    this.companySummaryForm = this.fb.group({
      company: ['Search By Company Name']
    });
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
      customerNumber: ['', Validators.required],
      ratingNotes: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      category: ['', Validators.required],
      carrierType: ['', Validators.required],
      directions: ['', Validators.required],
      discount: ['', Validators.required],
      minimumCharge: ['', Validators.required],
      contactNumber: ['', Validators.required],
      assessorialName: [''],
      charge: [''],
      presentFakValue: [''],
      fakRangeFrom: [''],
      fakRangeTo: [''],
      fakValue: [''],
      specialRule: [''],
      fromCityState: [''],
      toCityState: [''],
      salesRepId: ['', Validators.required]
    });

  }


  getCustomerNotes() {
    this.pricingInfoService.getSpecificCustomerName(this.salesRepId, this.accessToken).subscribe((data:any) => {
      console.log('this.customerNotes', data);
      this.customerFeaturesAll = data;
      this.customerFeaturesAll.sort(this.dynamicSort('companyName'));
    });
  }

  getDetailsOfCompany() {

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
  getAllCustomerNotes() {
    this.pricingInfoService.getAllCustomerName(this.accessToken).subscribe(data => {
      console.log('this.customerNotes ALl', data);
      this.customerFeaturesAll = data;
      this.customerFeaturesAll.sort(this.dynamicSort('companyName'));
    });
  }
  getParticularData(data:any) {
    console.log('data', data);
    this.customerFeatures = this.customerFeaturesAll.filter(function (el:any) {
      return el.companyName.startsWith(data.toUpperCase());
    });
  }

  localStorageValues() {
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.salesRepValues = JSON.parse(this.salesRep);
    this.salesRepId = this.salesRepValues.id;
    this.salesRepType = this.salesRepValues.type;
    this.companyId = this.pricingInfoService.getCustomerId();
    if (this.salesRepType === 'administrator' || this.salesRepType === 'customerServiceRep') {
      this.getAllCompanyDetails();
      if (this.companyId !== '' && this.companyId !== undefined && this.companyId !== null) {
        this.getCustomerInformation(this.companyId, 'chooseCompany1');
      } else {
        this.getCustomerData();
      }
    } else {
      if (this.companyId !== '' && this.companyId !== undefined && this.companyId !== null) {
        this.getCustomerInformation(this.companyId, 'chooseCompany1');
      } else {
        this.getCustomerData();
      }
      this.getCompanyDetailsOfSalesRep();
    }
  }
  getAllCompanyDetails() {
    this.customerService.getCompanyDetails(this.accessToken).subscribe(response => {
      this.companyFeatures = response;
    });
  }

  getCompanyDetailsOfSalesRep() {
    this.customerService.getCompanyDetailsBySalesRepId(this.salesRepId, this.accessToken).subscribe(response => {
      this.companyFeatures = response;
    });
  }

  getSalesRepData() {
    this.pricingInfoService.getSalesDetail(this.accessToken).subscribe((names:any) => {
      this.salesRepArray = names;
      console.log('this.salesRepArray', this.salesRepArray);
      this.logger = {
        'method': 'getSalesDetail',
        'message': 'Retrieving salesrep details',
        'salesRepId': this.salesRepId
      };
      this.loggerService.info(this.logger);
    });
  }

  addCustomer(company:any) {
    let object;
    object = company;
    object.category = 'add';
    this.customerService.saveEditCustomer(object);
    this.router.navigate(['/addCustomer']);
  }

  viewCustomer(id:any) {
    this.customerService.setCustomerFromCompanyId(id);
    this.router.navigate(['/addCustomer']);
    // this.customerService.getCustomerDataByCompanyId(id).subscribe(response => {
    //   this.customerResponse = response;
    // });
  }

  editCustomer(list:any) {
    let object;
    object = list;
    object.category = 'editCustomer';
    this.customerService.saveEditCustomer(object);
    this.router.navigate(['/addCustomer']);
  }

  getCustomerInformation(id:any, type:any) {
    let companyId:any
    if (type=== 'chooseCompany1') {
      companyId = id.target.value;
    } else {
      companyId = id;
    }
    console.log('companyId', companyId,type);
    let yrcArray:any = [], fedexEcoArray:any = [], fedexPriArray:any = [], reddawayArray:any = [];
    let newfedexEcoArray:any = [], newyrcArray:any = [], newfedexPriArray:any = [], newreddawayArray:any = [] ;
    this.yrcCostPlusFactor = [];
    this.reddawayCostPlusFactor = [];
    this.fedexEcoCostPlusFactor = [];
    this.fedexPriCostPlusFactor = [];
    if (companyId === '') {
      this.getCustomerData();
    } else {
      this.customerService.getAllCompanyDataById(this.accessToken, companyId).subscribe(data => {
        this.companyResponse = data;
        console.log('this.companyResponse', this.companyResponse);

        if (this.companyResponse.length > 0) {
          this.enableRemoveIcon = true;
          this.showRefreshFlag = true;
          this.currentPage = 1;
          this.pricingInfoService.setCurrentPageFlag(this.currentPage);
          this.customerId = companyId;
          console.log('currentpage', this.currentPage);
          this.pricingInfoService.setCustomerId(this.customerId);
          //this.numberPerPage = 2;
          if (type === 'chooseCompany1') {
            this.showCustomerTable = true;
          } else {
            this.showCustomerTable = false;
          }
          // if (this)
          for (let i = 0; i < this.companyResponse.length; i++) {
            if (this.companyResponse[i].costPlus === true) {
              if (this.companyResponse[i].costPlusFactor.length > 0) {
                this.yrcCostPlusFactor = this.companyResponse[i].costPlusFactor.filter(function (el:any) {
                      return el.carrier === 'YRC';
                     });
                     this.reddawayCostPlusFactor = this.companyResponse[i].costPlusFactor.filter(function (el:any) {
                      return el.carrier === 'REDDAWAY';
                     });
                     this.fedexEcoCostPlusFactor = this.companyResponse[i].costPlusFactor.filter(function (el:any) {
                      return el.carrier === 'FEDEX ECONOMY';
                     });
                     this.fedexPriCostPlusFactor = this.companyResponse[i].costPlusFactor.filter(function (el:any) {
                      return el.carrier === 'FEDEX PRIORITY';
                     });
                console.log('this.companyResponse[i].costPlusFactor', this.companyResponse[i].costPlusFactor);
               
                console.log('this.companyResponse[i].costPlusFactor New',
                  this.yrcCostPlusFactor, this.reddawayCostPlusFactor, this.fedexEcoCostPlusFactor, this.fedexPriCostPlusFactor);
              } else {
                this.yrcCostPlusFactor = [];
              this.reddawayCostPlusFactor = [];
              this.fedexEcoCostPlusFactor = [];
              this.fedexPriCostPlusFactor = [];
              }
            } else {
              this.yrcCostPlusFactor = [];
              this.reddawayCostPlusFactor = [];
              this.fedexEcoCostPlusFactor = [];
              this.fedexPriCostPlusFactor = [];
            }

            // if (this.companyResponse[i].specificPricing === true) {
            //   if (this.companyResponse[i].specificPricingList.length > 0) {

            //   }
            // }
          }
          console.log('this.companyResponse[i].costPlusFactor later',
            this.yrcCostPlusFactor, this.reddawayCostPlusFactor, this.fedexEcoCostPlusFactor, this.fedexPriCostPlusFactor);
          for (let i = 0; i < this.companyResponse.length; i++) {
            if (this.companyResponse[i].BusinessRulesNew.length > 0) {
              // for (let j = 0; j < this.companyResponse[i].BusinessRulesNew.length; j++) {
                yrcArray = this.companyResponse[i].BusinessRulesNew.filter(function(el:any){
                  return el.type === 'YRC'
                });
                reddawayArray = this.companyResponse[i].BusinessRulesNew.filter(function(el:any){
                  return el.type === 'REDDAWAY'
                });
                fedexEcoArray = this.companyResponse[i].BusinessRulesNew.filter(function(el:any){
                  return el.type === 'FEDEX ECONOMY'
                });
                fedexPriArray = this.companyResponse[i].BusinessRulesNew.filter(function(el:any){
                  return el.type === 'FEDEX PRIORITY'
                });
                let yrcInterstateArray = [], yrcIntrastateArray = [], yrcSpecialRules = [];
                if (yrcArray.length > 0) {
                  if (yrcArray.length > 0) {
                    yrcInterstateArray = yrcArray.filter(function(el:any){
                      return el.directions === 'INTERSTATE';
                    });
                    yrcInterstateArray = yrcInterstateArray.sort(function (a:any, b:any) {
                      if(a.category < b.category) { return -1; }
                      if(a.category > b.category) { return 1; }
                      return 0;
                    });
                    yrcIntrastateArray = yrcArray.filter(function(el:any){
                      return el.directions === 'INTRASTATE';
                    });
                    yrcIntrastateArray = yrcIntrastateArray.sort(function (a:any, b:any) {
                      if(a.category < b.category) { return -1; }
                      if(a.category > b.category) { return 1; }
                      return 0;
                    });
                    yrcSpecialRules = yrcArray.filter(function(el:any){
                      return el.directions === 'SPECIAL RULES';
                    });
                    yrcSpecialRules = yrcSpecialRules.sort(function (a:any, b:any) {
                      if(a.category < b.category) { return -1; }
                      if(a.category > b.category) { return 1; }
                      return 0;
                    });
                    // yrcArray.push.apply(yrcInterstateArray);
                    // yrcArray.push.apply(yrcIntrastateArray);
                    // yrcArray.push.apply(yrcSpecialRules);
                    newyrcArray = newyrcArray.concat(yrcInterstateArray,yrcIntrastateArray,yrcSpecialRules);
                    console.log('yrc rules separation', yrcArray, yrcArray.length);
                    // yrcArray = yrcArray.sort(function (a, b) {
                    //   if(a.category < b.category) { return -1; }
                    //   if(a.category > b.category) { return 1; }
                    //   return 0;
                    // });
              
                    console.log('yrc',yrcArray);
                  }
                  for (let y = 0; y < yrcArray.length; y++) {
                    if (this.yrcCostPlusFactor.length > 0) {
                      yrcArray[y].costPlusFactorNew = this.yrcCostPlusFactor[0].factor;
                      yrcArray[y].factor = 'AR';
                    } else {
                      yrcArray[y].costPlusFactorNew = '';
                      yrcArray[y].factor = 'AR';
                    }
                  }
                } else {
                  if (this.yrcCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.yrcCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: "",
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.yrcCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    yrcArray.push(object);
                    console.log('this.companyResponse[i].costPlusFactor yrcArray', yrcArray);
                  }
                }
                let reddawayArray1 = [], reddawayArray2 = [], reddawayArray3 = [], reddawayArray4 = [];
                if (reddawayArray.length > 0) {
                  if (reddawayArray.length > 0) {
                    reddawayArray1 = reddawayArray.filter(function(el:any){
                      return el.directions === 'REGIONAL DIRECT INTERSTATE';
                    });
                    reddawayArray1 = reddawayArray1.sort(function (a:any, b:any) {
                      if(a.category < b.category) { return -1; }
                      if(a.category > b.category) { return 1; }
                      return 0;
                    });
                    reddawayArray2 = reddawayArray.filter(function(el:any){
                      return el.directions === 'REGIONAL DIRECT INTRASTATE';
                    });
                    reddawayArray2 = reddawayArray2.sort(function (a:any, b:any) {
                      if(a.category < b.category) { return -1; }
                      if(a.category > b.category) { return 1; }
                      return 0;
                    });
                    reddawayArray3 = reddawayArray.filter(function(el:any){
                      return el.directions === 'REGIONAL INDIRECT';
                    });
                    reddawayArray3 = reddawayArray3.sort(function (a:any, b:any) {
                      if(a.category < b.category) { return -1; }
                      if(a.category > b.category) { return 1; }
                      return 0;
                    });
                    reddawayArray4 = reddawayArray.filter(function(el:any){
                      return el.directions === 'SPECIAL RULES';
                    });
                    reddawayArray4 = reddawayArray4.sort(function (a:any, b:any) {
                      if(a.category < b.category) { return -1; }
                      if(a.category > b.category) { return 1; }
                      return 0;
                    });
                    // reddawayArray.push.apply(reddawayArray1);
                    // reddawayArray.push.apply(reddawayArray2);
                    // reddawayArray.push.apply(reddawayArray3);
                    // reddawayArray.push.apply(reddawayArray4);
                    newreddawayArray = newreddawayArray.concat(reddawayArray1,reddawayArray2,reddawayArray3,reddawayArray4)
                    console.log('newFedexEconomyArray rules separation', newreddawayArray, reddawayArray.length);
                    // reddawayArray = reddawayArray.sort(function (a, b) {
                    //   if(a.category < b.category) { return -1; }
                    //   if(a.category > b.category) { return 1; }
                    //   return 0;
                    // });
              
                    console.log('reddawayArray eco',reddawayArray);
                  }
                  for (let y = 0; y < reddawayArray.length; y++) {
                    if (this.reddawayCostPlusFactor.length > 0) {
                      reddawayArray[y].costPlusFactorNew = this.reddawayCostPlusFactor[0].factor;
                      reddawayArray[y].factor = 'AR';
                    } else {
                      reddawayArray[y].costPlusFactorNew = '';
                      reddawayArray[y].factor = 'AR';
                    }
                  }
                } else {
                  if (this.reddawayCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.reddawayCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: "",
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.reddawayCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    reddawayArray.push(object);
                    console.log('this.companyResponse[i].costPlusFactor reddawayArray', reddawayArray);
                  }
                }
                console.log('fedexEcoArray', fedexEcoArray);
                let array1 = [], array2 = [], array3 = [], array4 = [];
                if (fedexEcoArray.length > 0) {
                  if (fedexEcoArray.length > 0) {
                    let filterArray = []
                    filterArray = fedexEcoArray.filter(function(el:any){
                      return el.directions === 'INTER REGIONAL';
                    });
                    console.log(filterArray);
                     array1 = filterArray.sort(function (a:any, b:any) {
                      if(a.category < b.category) { return -1; }
                      if(a.category > b.category) { return 1; }
                      return 0;
                    });
                    console.log('array1', array1);
                    array2 = fedexEcoArray.filter(function(el:any){
                      return el.directions === 'REGIONAL';
                    });
                    array2 = array2.sort(function (a:any, b:any) {
                      if(a.category < b.category) { return -1; }
                      if(a.category > b.category) { return 1; }
                      return 0;
                    });
                    console.log('array2', array2);
                    array3 = fedexEcoArray.filter(function(el:any){
                      return el.directions === 'INTRASTATE';
                    });
                    console.log('array3', array3);
                    array3 = array3.sort(function (a:any, b:any) {
                      if(a.category < b.category) { return -1; }
                      if(a.category > b.category) { return 1; }
                      return 0;
                    });
                    // array4 = array3.filter(function(el){
                    //   return el.directions === 'SPECIAL RULES';
                    // });
                    array4 = fedexEcoArray.filter(function(el:any){
                      return el.directions === 'SPECIAL RULES';
                    });
                    let apArray = [];
                    apArray = array4.filter(function(el:any){
                      return el.category === 'AP';
                    });
                    let arArray = [];
                    arArray = array4.filter(function(el:any){
                      return el.category === 'AR';
                    });
                    array4 = array4.sort(function (a:any, b:any) {
                      if(a.category < b.category) { return -1; }
                      if(a.category > b.category) { return 1; }
                      return 0;
                    });
                  //  apArray.forEach((ap) => {
                  //   arArray.forEach((ar) => {
                  //     console.log(ap, ar);
                  //   })
                  //  })
                  let sameRuleArray = [], differentRuleArray = [];
                   for(let i = 0; i< apArray.length; i++) {
                     for (let j= 0; j < arArray.length; j++) {
                     console.log(apArray[i], arArray[j]);
                     if (apArray[i].specificStateFlag === 'true' && arArray[j].specificStateFlag === 'true') {
                       if(apArray[i].specificStateList1 === arArray[j].specificStateList1) {
                        if(apArray[i].specificStateList2 === arArray[j].specificStateList2) {
                          sameRuleArray.push(apArray[i],arArray[j]);
                        }  else {
                          differentRuleArray.push(apArray[i],arArray[j])

                        }
                      //     console.log(j, arArray.length);
                      //     if (j === arArray.length -1) {
                      // differentRuleArray.push(apArray[i])
                     
                      //   }
                       }
                     

                     }
                     console.log(sameRuleArray);
                     console.log(differentRuleArray)
                     
                     }
                   }
//     var helper = {};
// var result = array4.reduce(function(r, o) {
//   var key =  o.specificStateList2+ '-' + o.category;
  
//   if(!helper[key]) {
//     helper[key] = Object.assign({}, o); // create a copy of o
//     r.push(helper[key]);
//   } else {
//     helper[key].used += o.used;
//     helper[key].instances += o.instances;
//   }

//   return r;
// }, []);
// const rulesByCompany = lod.groupBy(fedexEcoArray, ["type", "directions", "category","specificStateList1","specificStateList2"]);

// let listOfRules = [];

// let finalList = [];

// let rulesCompany  = this.companyResponse[0].BusinessRulesNew;
// console.log('BusinessRulesLength',rulesCompany.length);
// const rulesByCompanyType = lod.groupBy(rulesCompany, "type");

// for (var key in rulesByCompanyType) {
//   //console.log("key value is " + key);

//   listOfRules = rulesByCompanyType[key];

//   const rulesByDirections = lod.groupBy(listOfRules, ["directions"]);
//   console.log(rulesByDirections);


//   for (var directionKey in rulesByDirections) {
//     let rulesByStateList1 = rulesByDirections[directionKey];

//     const rulesByStateList1Keys = lod.groupBy(
//       rulesByStateList1,
//       "specificStateList1"
//     );

//     for (var stateListKey in rulesByStateList1Keys) {
//       let rulesByStateList2 = rulesByStateList1Keys[stateListKey];

//       //console.log("state1keys:" + rulesByStateList2.length);

//       const rulesByStateList2Keys = lod.groupBy(
//         rulesByStateList2,
//         "specificStateList2"
//       );

//       for (var stateList2Key in rulesByStateList2Keys) {
//         let byCategoryList = rulesByStateList2Keys[stateList2Key] || [];

//         const rulesBycategoryListKeys = lod.groupBy(
//           byCategoryList,
//           "category"
//         );

//         for (var categoryKey in rulesBycategoryListKeys) {
//           let byCategryArrayLis = rulesBycategoryListKeys[categoryKey] || [];
//           finalList.push(...byCategryArrayLis);
//         }
//       }
//     }
//   }
// }
// // let consolidatedFinalList = [];

// // finalList.forEach((elem, index) => {
// //   console.log(elem.length);

// //   elem.forEach((rule) => {
// //     consolidatedFinalList.push(rule);
// //   });
// //   //consolidatedFinalList.push(elem);
// // });

// // console.log(consolidatedFinalList);
// console.log('finalList:',finalList);

                    newfedexEcoArray = newfedexEcoArray.concat(array1,array2,array3);
                    console.log('newFedexEconomyArray rules separation', newfedexEcoArray, fedexEcoArray.length);
            
                    console.log('Fedex eco',fedexEcoArray);
                  }
                  for (let y = 0; y < fedexEcoArray.length; y++) {
                    if (this.fedexEcoCostPlusFactor.length > 0) {
                      fedexEcoArray[y].costPlusFactorNew = this.fedexEcoCostPlusFactor[0].factor;
                      fedexEcoArray[y].factor = 'AR';
                    } else {
                      fedexEcoArray[y].costPlusFactorNew = '';
                      fedexEcoArray[y].factor = 'AR';
                    }
                  }
                } else {
                  if (this.fedexEcoCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.fedexEcoCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: "",
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.fedexEcoCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    fedexEcoArray.push(object);
                    console.log('this.companyResponse[i].costPlusFactor fedexEcoArray', fedexEcoArray);
                  }
                }
                let fedexPriInterRegionalArray = [],fedexPriRegionalArray = [], fedexPriIntrastateArray = [], fedexPriSpecialRules = [];
                if (fedexPriArray.length > 0) {
                  if (fedexPriArray.length > 0) {
                    fedexPriInterRegionalArray = fedexPriArray.filter(function(el:any){
                      return el.directions === 'INTER REGIONAL';
                    });
                    fedexPriInterRegionalArray = fedexPriInterRegionalArray.sort(function (a:any, b:any) {
                      if(a.category < b.category) { return -1; }
                      if(a.category > b.category) { return 1; }
                      return 0;
                    });
                    fedexPriRegionalArray = fedexPriArray.filter(function(el:any){
                      return el.directions === 'REGIONAL';
                    });
                    fedexPriRegionalArray = fedexPriRegionalArray.sort(function (a:any, b:any) {
                      if(a.category < b.category) { return -1; }
                      if(a.category > b.category) { return 1; }
                      return 0;
                    });
                    fedexPriIntrastateArray = fedexPriArray.filter(function(el:any){
                      return el.directions === 'INTRASTATE';
                    });
                    fedexPriIntrastateArray = fedexPriIntrastateArray.sort(function (a:any, b:any) {
                      if(a.category < b.category) { return -1; }
                      if(a.category > b.category) { return 1; }
                      return 0;
                    });
                    fedexPriSpecialRules = fedexPriArray.filter(function(el:any){
                      return el.directions === 'SPECIAL RULES';
                    });
                    fedexPriSpecialRules = fedexPriSpecialRules.sort(function (a:any, b:any) {
                      if(a.category < b.category) { return -1; }
                      if(a.category > b.category) { return 1; }
                      return 0;
                    });
                    // fedexPriArray.push.apply(fedexPriInterRegionalArray);
                    // fedexPriArray.push.apply(fedexPriRegionalArray);
                    // fedexPriArray.push.apply(fedexPriIntrastateArray);
                    // fedexPriArray.push.apply(fedexPriSpecialRules);
                    newfedexPriArray = newfedexPriArray.concat(fedexPriInterRegionalArray,fedexPriRegionalArray,fedexPriIntrastateArray,fedexPriSpecialRules)
                    console.log('newFedexEconomyArray rules separation', newfedexPriArray, fedexPriArray.length);
                    // fedexPriArray = fedexPriArray.sort(function (a, b) {
                    //   if(a.category < b.category) { return -1; }
                    //   if(a.category > b.category) { return 1; }
                    //   return 0;
                    // });
              
                    console.log('Fedex eco',fedexPriArray);
                  }              
                  for (let y = 0; y < fedexPriArray.length; y++) {
                    if (this.fedexPriCostPlusFactor.length > 0) {
                      fedexPriArray[y].costPlusFactorNew = this.fedexPriCostPlusFactor[0].factor;
                      fedexPriArray[y].factor = 'AR';
                    } else {
                      fedexPriArray[y].costPlusFactorNew = '';
                      fedexPriArray[y].factor = 'AR';
                    }
                  }
                } else {
                  if (this.fedexPriCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.fedexPriCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: 1865,
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.fedexPriCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    fedexPriArray.push(object);
                    console.log('this.companyResponse[i].costPlusFactor fedexPriArray', fedexPriArray);
                  }
                }
              } else {
                if (this.yrcCostPlusFactor.length > 0) {
                  let object = {
                    category: "AR",
                    classRange: "",
                    classification: "",
                    companyId: "",
                    costPlusFactorNew: this.yrcCostPlusFactor[0].factor,
                    directions: "",
                    discount: "",
                    fak: "[]",
                    fakRange: "[]",
                    id: "",
                    insideDelivery: "",
                    liftGate: "",
                    limitedAccessDelivery: "",
                    minCharge: "",
                    notify: "",
                    residential: "",
                    singleShipment: "",
                    specificCityList1: "[]",
                    specificCityList2: "[]",
                    specificStateFlag: "false",
                    specificStateList1: "[]",
                    specificStateList2: "[]",
                    specificZipFlag: "false",
                    type: this.yrcCostPlusFactor[0].carrier,
                    factor: 'COSTPLUS'
                  }
                  yrcArray.push(object);
                }
                if (this.reddawayCostPlusFactor.length > 0) {
                  let object = {
                    category: "AR",
                    classRange: "",
                    classification: "",
                    companyId: "",
                    costPlusFactorNew: this.reddawayCostPlusFactor[0].factor,
                    directions: "",
                    discount: "",
                    fak: "[]",
                    fakRange: "[]",
                    id: "",
                    insideDelivery: "",
                    liftGate: "",
                    limitedAccessDelivery: "",
                    minCharge: "",
                    notify: "",
                    residential: "",
                    singleShipment: "",
                    specificCityList1: "[]",
                    specificCityList2: "[]",
                    specificStateFlag: "false",
                    specificStateList1: "[]",
                    specificStateList2: "[]",
                    specificZipFlag: "false",
                    type: this.reddawayCostPlusFactor[0].carrier,
                    factor: 'COSTPLUS'
                  }
                  reddawayArray.push(object);
                  console.log('this.companyResponse[i].costPlusFactor reddawayArray', reddawayArray);
                }
                if (this.fedexEcoCostPlusFactor.length > 0) {
                  let object = {
                    category: "AR",
                    classRange: "",
                    classification: "",
                    companyId: "",
                    costPlusFactorNew: this.fedexEcoCostPlusFactor[0].factor,
                    directions: "",
                    discount: "",
                    fak: "[]",
                    fakRange: "[]",
                    id: "",
                    insideDelivery: "",
                    liftGate: "",
                    limitedAccessDelivery: "",
                    minCharge: "",
                    notify: "",
                    residential: "",
                    singleShipment: "",
                    specificCityList1: "[]",
                    specificCityList2: "[]",
                    specificStateFlag: "false",
                    specificStateList1: "[]",
                    specificStateList2: "[]",
                    specificZipFlag: "false",
                    type: this.fedexEcoCostPlusFactor[0].carrier,
                    factor: 'COSTPLUS'
                  }
                  fedexEcoArray.push(object);
                  console.log('this.companyResponse[i].costPlusFactor fedexEcoArray', fedexEcoArray);
                }
                if (this.fedexPriCostPlusFactor.length > 0) {
                  let object = {
                    category: "AR",
                    classRange: "",
                    classification: "",
                    companyId: "",
                    costPlusFactorNew: this.fedexPriCostPlusFactor[0].factor,
                    directions: "",
                    discount: "",
                    fak: "[]",
                    fakRange: "[]",
                    id: 1865,
                    insideDelivery: "",
                    liftGate: "",
                    limitedAccessDelivery: "",
                    minCharge: "",
                    notify: "",
                    residential: "",
                    singleShipment: "",
                    specificCityList1: "[]",
                    specificCityList2: "[]",
                    specificStateFlag: "false",
                    specificStateList1: "[]",
                    specificStateList2: "[]",
                    specificZipFlag: "false",
                    type: this.fedexPriCostPlusFactor[0].carrier,
                    factor: 'COSTPLUS'
                  }
                  fedexPriArray.push(object);
                  console.log('this.companyResponse[i].costPlusFactor fedexPriArray', fedexPriArray);
                }
              }
            // this.companyResponse[i].BusinessRulesNew = [];
           
            // if (fedexEcoArray.length > 0) {
            //   this.companyResponse[i].BusinessRulesNew.push.apply(this.companyResponse[i].BusinessRulesNew, newfedexEcoArray); 
            // }
            // if (fedexPriArray.length > 0) {
            //   this.companyResponse[i].BusinessRulesNew.push.apply(this.companyResponse[i].BusinessRulesNew, newfedexPriArray);
             
            //   console.log('this.companyResponse before', this.companyResponse[i].BusinessRulesNew);
            // }
            // if (yrcArray.length > 0) {
            //   this.companyResponse[i].BusinessRulesNew.push.apply(this.companyResponse[i].BusinessRulesNew, newyrcArray);
            // }
            // if (reddawayArray.length > 0) {
            //   this.companyResponse[i].BusinessRulesNew.push.apply(this.companyResponse[i].BusinessRulesNew, newreddawayArray);
            // }
 let listOfRules = [];

let finalList = [];

let rulesCompany  = this.companyResponse[0].BusinessRulesNew;
console.log('BusinessRulesLength',rulesCompany.length);
const rulesByCompanyType = lod.groupBy(rulesCompany, "type");

for (var key in rulesByCompanyType) {
  //console.log("key value is " + key);

  listOfRules = rulesByCompanyType[key];
console.log(rulesByCompanyType[key]);
  const rulesByDirections = lod.groupBy(listOfRules, "directions");
  console.log(rulesByDirections);


  for (var directionKey in rulesByDirections) {
    let rulesByStateList1 = rulesByDirections[directionKey];

    const rulesByStateList1Keys = lod.groupBy(
      rulesByStateList1,
      "specificStateList1"
    );

    for (var stateListKey in rulesByStateList1Keys) {
      let rulesByStateList2 = rulesByStateList1Keys[stateListKey];

      //console.log("state1keys:" + rulesByStateList2.length);

      const rulesByStateList2Keys = lod.groupBy(
        rulesByStateList2,
        "specificStateList2"
      );

      for (var stateList2Key in rulesByStateList2Keys) {
        let byCategoryList = rulesByStateList2Keys[stateList2Key] || [];

        const rulesBycategoryListKeys = lod.groupBy(
          byCategoryList,
          "category"
        );

        for (var categoryKey in rulesBycategoryListKeys) {
          let byCategryArrayLis = rulesBycategoryListKeys[categoryKey] || [];
          finalList.push(...byCategryArrayLis);
        }
      }
    }
  }
}
console.log('finalList:',finalList);
                     this.companyResponse[i].BusinessRulesNew = [];
                     this.companyResponse[i].BusinessRulesNew = finalList;
          this.showNoRecordsFound = false;
          for (let i = 0; i < this.companyResponse.length; i++) {
            console.log('this.companyResponse After', this.companyResponse[i].BusinessRulesNew);
            // this.companyResponse[i].BusinessRulesNew = this.companyResponse[i].BusinessRulesNew.sort('type');
            console.log('this.companyResponse After New', this.companyResponse[i].BusinessRulesNew);
            // let finalBusinessRules = this.companyResponse[i].BusinessRulesNew
            for (let j = 0; j < this.companyResponse[i].BusinessRulesNew.length; j++) {

              if (this.companyResponse[i].BusinessRulesNew[j].specificStateFlag === 'true') {
                this.companyResponse[i].BusinessRulesNew[j].specificStateList1 = JSON.parse(this.companyResponse[i].BusinessRulesNew[j].specificStateList1);
                this.companyResponse[i].BusinessRulesNew[j].specificStateList2 = JSON.parse(this.companyResponse[i].BusinessRulesNew[j].specificStateList2);
                this.companyResponse[i].BusinessRulesNew[j].specificCityList1 = JSON.parse(this.companyResponse[i].BusinessRulesNew[j].specificCityList1);
                this.companyResponse[i].BusinessRulesNew[j].specificCityList2 = JSON.parse(this.companyResponse[i].BusinessRulesNew[j].specificCityList2);
              } else {

              }
            }
          }
        }
       } else {
         console.log('else part');
          this.enableRemoveIcon = false;
          this.showNoRecordsFound = true;
          this.showCustomerTable = false;
          this.showRefreshFlag = false;
        }
      });
    }
  }

  customerRemove(customerId:any) {
    if (customerId === false) {
      this.getCustomerData();
    }
  }

  getAllCustomerData() {
    this.customerService.getAllCompanyData(this.accessToken).subscribe(data => {
      this.customerData = data;
      console.log('data', this.customerData);
      this.count = this.customerData.length;
      if (this.customerData.length > 0) {
        this.enableRemoveIcon = false;
        this.numberPerPage = 2;
        this.showCustomerTable = false;
        this.showNoRecordsFound = false;
        for (let i = 0; i < this.customerData.length; i++) {
          for (let j = 0; j < this.customerData[i].BusinessRulesNew.length; j++) {
            if (this.customerData[i].BusinessRulesNew[j].specificStateFlag === 'true') {
              this.customerData[i].BusinessRulesNew[j].specificStateList1 = JSON.parse(this.customerData[i].BusinessRulesNew[j].specificStateList1);
              this.customerData[i].BusinessRulesNew[j].specificStateList2 = JSON.parse(this.customerData[i].BusinessRulesNew[j].specificStateList2);
              this.customerData[i].BusinessRulesNew[j].specificCityList1 = JSON.parse(this.customerData[i].BusinessRulesNew[j].specificCityList1);
              this.customerData[i].BusinessRulesNew[j].specificCityList2 = JSON.parse(this.customerData[i].BusinessRulesNew[j].specificCityList2);
            } else {

            }
          }
        }
      } else {
        this.showNoRecordsFound = true;
        this.showCustomerTable = false;
      }
      this.logger = { 'method': 'get', 'message': 'Retrieving customer details' };
      this.loggerService.info(this.logger);
    }, err => {
      this.showNoRecordsFound = true;
      this.showCustomerTable = false;
      this.logger = { 'method': 'get', 'message': 'Retrieving customer details Error' };
      this.loggerService.error(this.logger);
    });
  }

  getCustomerData() {
    let id = '';
    id = this.editCustomerId;
    let yrcArray:any = [], fedexEcoArray:any = [], fedexPriArray:any = [], reddawayArray:any = [];
    this.yrcCostPlusFactor = [];
    this.reddawayCostPlusFactor = [];
    this.fedexEcoCostPlusFactor = [];
    this.fedexPriCostPlusFactor = [];
    if (id !== undefined) {
      console.log('this.customerData If', this.customerData);
      this.currentPage = this.pricingInfoService.getCurrentPageFlag();
      this.itemsPage = this.pricingInfoService.getItemsPerPageFlag();
      this.customerService.getAllCompanyData(this.accessToken).subscribe(data => {
        this.customerData = data;
        this.customerTableDetail = data;
        this.showRefreshFlag = false;
        console.log('this.customerData flag set', this.customerData);
        if (id !== undefined || id !== null || id !== '') {
          // for (let i = 0; i < this.customerTableDetail.length; i++) {
          //   this.singleFilteredArray = this.customerTableDetail.filter(function (el) {
          //     return el.id === id;
          //   });
          // }
          // this.filteredArray = this.customerTableDetail.filter(function (el) {
          //   return el.id !== id;
          // });
          // this.mergedCustomerArray.push.apply(this.mergedCustomerArray, this.singleFilteredArray);
          //this.mergedCustomerArray.push.apply(this.mergedCustomerArray, this.filteredArray);
          // this.customerData = this.mergedCustomerArray;
          // if (this.customerData.length > 0) {
          //   if (this.itemsPage === undefined) {
          //     this.numberPerPage = 2;
          //   } else {
          //     this.numberPerPage = this.itemsPage;
          //   }

          let flagForAdd = this.pricingInfoService.getAddCustomersFlag();
          console.log('flagForAdd flag set', flagForAdd);
          if (flagForAdd === true) {
            this.customerData = [];
            this.customerData.push(this.customerTableDetail[0]);
            console.log('this.customerData flag set', this.customerData);
            this.showCustomerTable = true;
            this.companyResponse = this.customerData;
            
          } else {
            this.customerData = this.customerTableDetail;
            this.companyResponse = this.customerData;
            this.showCustomerTable = false;
            console.log('this.customerData flag set', this.customerData);
          }

          for (let i = 0; i < this.companyResponse.length; i++) {
            if (this.companyResponse[i].costPlus === true) {
              if (this.companyResponse[i].costPlusFactor.length > 0) {
                this.yrcCostPlusFactor = this.companyResponse[i].costPlusFactor.filter(function (el:any) {
                      return el.carrier === 'YRC';
                     });
                     this.reddawayCostPlusFactor = this.companyResponse[i].costPlusFactor.filter(function (el:any) {
                      return el.carrier === 'REDDAWAY';
                     });
                     this.fedexEcoCostPlusFactor = this.companyResponse[i].costPlusFactor.filter(function (el:any) {
                      return el.carrier === 'FEDEX ECONOMY';
                     });
                     this.fedexPriCostPlusFactor = this.companyResponse[i].costPlusFactor.filter(function (el:any) {
                      return el.carrier === 'FEDEX PRIORITY';
                     });
                console.log('this.companyResponse[i].costPlusFactor', this.companyResponse[i].costPlusFactor);
               
                console.log('this.companyResponse[i].costPlusFactor New',
                  this.yrcCostPlusFactor, this.reddawayCostPlusFactor, this.fedexEcoCostPlusFactor, this.fedexPriCostPlusFactor);
              } else {
                this.yrcCostPlusFactor = [];
              this.reddawayCostPlusFactor = [];
              this.fedexEcoCostPlusFactor = [];
              this.fedexPriCostPlusFactor = [];
              }
            } else {
              this.yrcCostPlusFactor = [];
              this.reddawayCostPlusFactor = [];
              this.fedexEcoCostPlusFactor = [];
              this.fedexPriCostPlusFactor = [];
            }
          }
          console.log('this.companyResponse[i].costPlusFactor later',
            this.yrcCostPlusFactor, this.reddawayCostPlusFactor, this.fedexEcoCostPlusFactor, this.fedexPriCostPlusFactor);
          for (let i = 0; i < this.companyResponse.length; i++) {
            if (this.companyResponse[i].BusinessRulesNew.length > 0) {
              // for (let j = 0; j < this.companyResponse[i].BusinessRulesNew.length; j++) {
                yrcArray = this.companyResponse[i].BusinessRulesNew.filter(function(el:any){
                  return el.type === 'YRC'
                });
                reddawayArray = this.companyResponse[i].BusinessRulesNew.filter(function(el:any){
                  return el.type === 'REDDAWAY'
                });
                fedexEcoArray = this.companyResponse[i].BusinessRulesNew.filter(function(el:any){
                  return el.type === 'FEDEX ECONOMY'
                });
                fedexPriArray = this.companyResponse[i].BusinessRulesNew.filter(function(el:any){
                  return el.type === 'FEDEX PRIORITY'
                });
                if (yrcArray.length > 0) {
                  for (let y = 0; y < yrcArray.length; y++) {
                    if (this.yrcCostPlusFactor.length > 0) {
                      yrcArray[y].costPlusFactorNew = this.yrcCostPlusFactor[0].factor;
                      yrcArray[y].factor = 'AR';
                    } else {
                      yrcArray[y].costPlusFactorNew = '';
                      yrcArray[y].factor = 'AR';
                    }
                  }
                } else {
                  if (this.yrcCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.yrcCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: "",
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.yrcCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    yrcArray.push(object);
                    console.log('this.companyResponse[i].costPlusFactor yrcArray', yrcArray);
                  }
                }
                if (reddawayArray.length > 0) {
                  for (let y = 0; y < reddawayArray.length; y++) {
                    if (this.reddawayCostPlusFactor.length > 0) {
                      reddawayArray[y].costPlusFactorNew = this.reddawayCostPlusFactor[0].factor;
                      reddawayArray[y].factor = 'AR';
                    } else {
                      reddawayArray[y].costPlusFactorNew = '';
                      reddawayArray[y].factor = 'AR';
                    }
                  }
                } else {
                  if (this.reddawayCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.reddawayCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: "",
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.reddawayCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    reddawayArray.push(object);
                    console.log('this.companyResponse[i].costPlusFactor reddawayArray', reddawayArray);
                  }
                }
                if (fedexEcoArray.length > 0) {
                  for (let y = 0; y < fedexEcoArray.length; y++) {
                    if (this.fedexEcoCostPlusFactor.length > 0) {
                      fedexEcoArray[y].costPlusFactorNew = this.fedexEcoCostPlusFactor[0].factor;
                      fedexEcoArray[y].factor = 'AR';
                    } else {
                      fedexEcoArray[y].costPlusFactorNew = '';
                      fedexEcoArray[y].factor = 'AR';
                    }
                  }
                } else {
                  if (this.fedexEcoCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.fedexEcoCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: "",
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.fedexEcoCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    fedexEcoArray.push(object);
                    console.log('this.companyResponse[i].costPlusFactor fedexEcoArray', fedexEcoArray);
                  }
                }
                if (fedexPriArray.length > 0) {
                  for (let y = 0; y < fedexPriArray.length; y++) {
                    if (this.fedexPriCostPlusFactor.length > 0) {
                      fedexPriArray[y].costPlusFactorNew = this.fedexPriCostPlusFactor[0].factor;
                      fedexPriArray[y].factor = 'AR';
                    } else {
                      fedexPriArray[y].costPlusFactorNew = '';
                      fedexPriArray[y].factor = 'AR';
                    }
                  }
                } else {
                  if (this.fedexPriCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.fedexPriCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: 1865,
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.fedexPriCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    fedexPriArray.push(object);
                    console.log('this.companyResponse[i].costPlusFactor fedexPriArray', fedexPriArray);
                  }
                }
              } else {
                if (this.yrcCostPlusFactor.length > 0) {
                  let object = {
                    category: "AR",
                    classRange: "",
                    classification: "",
                    companyId: "",
                    costPlusFactorNew: this.yrcCostPlusFactor[0].factor,
                    directions: "",
                    discount: "",
                    fak: "[]",
                    fakRange: "[]",
                    id: "",
                    insideDelivery: "",
                    liftGate: "",
                    limitedAccessDelivery: "",
                    minCharge: "",
                    notify: "",
                    residential: "",
                    singleShipment: "",
                    specificCityList1: "[]",
                    specificCityList2: "[]",
                    specificStateFlag: "false",
                    specificStateList1: "[]",
                    specificStateList2: "[]",
                    specificZipFlag: "false",
                    type: this.yrcCostPlusFactor[0].carrier,
                    factor: 'COSTPLUS'
                  }
                  yrcArray.push(object);
                }
                if (this.reddawayCostPlusFactor.length > 0) {
                  let object = {
                    category: "AR",
                    classRange: "",
                    classification: "",
                    companyId: "",
                    costPlusFactorNew: this.reddawayCostPlusFactor[0].factor,
                    directions: "",
                    discount: "",
                    fak: "[]",
                    fakRange: "[]",
                    id: "",
                    insideDelivery: "",
                    liftGate: "",
                    limitedAccessDelivery: "",
                    minCharge: "",
                    notify: "",
                    residential: "",
                    singleShipment: "",
                    specificCityList1: "[]",
                    specificCityList2: "[]",
                    specificStateFlag: "false",
                    specificStateList1: "[]",
                    specificStateList2: "[]",
                    specificZipFlag: "false",
                    type: this.reddawayCostPlusFactor[0].carrier,
                    factor: 'COSTPLUS'
                  }
                  reddawayArray.push(object);
                  console.log('this.companyResponse[i].costPlusFactor reddawayArray', reddawayArray);
                }
                if (this.fedexEcoCostPlusFactor.length > 0) {
                  let object = {
                    category: "AR",
                    classRange: "",
                    classification: "",
                    companyId: "",
                    costPlusFactorNew: this.fedexEcoCostPlusFactor[0].factor,
                    directions: "",
                    discount: "",
                    fak: "[]",
                    fakRange: "[]",
                    id: "",
                    insideDelivery: "",
                    liftGate: "",
                    limitedAccessDelivery: "",
                    minCharge: "",
                    notify: "",
                    residential: "",
                    singleShipment: "",
                    specificCityList1: "[]",
                    specificCityList2: "[]",
                    specificStateFlag: "false",
                    specificStateList1: "[]",
                    specificStateList2: "[]",
                    specificZipFlag: "false",
                    type: this.fedexEcoCostPlusFactor[0].carrier,
                    factor: 'COSTPLUS'
                  }
                  fedexEcoArray.push(object);
                  console.log('this.companyResponse[i].costPlusFactor fedexEcoArray', fedexEcoArray);
                }
                if (this.fedexPriCostPlusFactor.length > 0) {
                  let object = {
                    category: "AR",
                    classRange: "",
                    classification: "",
                    companyId: "",
                    costPlusFactorNew: this.fedexPriCostPlusFactor[0].factor,
                    directions: "",
                    discount: "",
                    fak: "[]",
                    fakRange: "[]",
                    id: 1865,
                    insideDelivery: "",
                    liftGate: "",
                    limitedAccessDelivery: "",
                    minCharge: "",
                    notify: "",
                    residential: "",
                    singleShipment: "",
                    specificCityList1: "[]",
                    specificCityList2: "[]",
                    specificStateFlag: "false",
                    specificStateList1: "[]",
                    specificStateList2: "[]",
                    specificZipFlag: "false",
                    type: this.fedexPriCostPlusFactor[0].carrier,
                    factor: 'COSTPLUS'
                  }
                  fedexPriArray.push(object);
                  console.log('this.companyResponse[i].costPlusFactor fedexPriArray', fedexPriArray);
                }
              }
            this.companyResponse[i].BusinessRulesNew = [];
            if (yrcArray.length > 0) {
              this.companyResponse[i].BusinessRulesNew.push.apply(this.companyResponse[i].BusinessRulesNew, yrcArray);
            }
            if (reddawayArray.length > 0) {
              this.companyResponse[i].BusinessRulesNew.push.apply(this.companyResponse[i].BusinessRulesNew, reddawayArray);
            }
            if (fedexEcoArray.length > 0) {
              this.companyResponse[i].BusinessRulesNew.push.apply(this.companyResponse[i].BusinessRulesNew, fedexEcoArray);
              
            }
            if (fedexPriArray.length > 0) {
              this.companyResponse[i].BusinessRulesNew.push.apply(this.companyResponse[i].BusinessRulesNew, fedexPriArray);
             
              console.log('this.companyResponse before', this.companyResponse[i].BusinessRulesNew);
            }
          // this.showCustomerTable = false;
          this.showNoRecordsFound = false;
          for (let i = 0; i < this.companyResponse.length; i++) {
            if (this.companyResponse[i].BusinessRulesNew.length > 0) {
              for (let j = 0; j < this.companyResponse[i].BusinessRulesNew.length; j++) {
                if (this.companyResponse[i].BusinessRulesNew[j].specificStateFlag === 'true') {
                  this.companyResponse[i].BusinessRulesNew[j].specificStateList1 = JSON.parse(this.companyResponse[i].BusinessRulesNew[j].specificStateList1);
                  this.companyResponse[i].BusinessRulesNew[j].specificStateList2 = JSON.parse(this.companyResponse[i].BusinessRulesNew[j].specificStateList2);
                  this.companyResponse[i].BusinessRulesNew[j].specificCityList1 = JSON.parse(this.companyResponse[i].BusinessRulesNew[j].specificCityList1);
                  this.companyResponse[i].BusinessRulesNew[j].specificCityList2 = JSON.parse(this.companyResponse[i].BusinessRulesNew[j].specificCityList2);
                } else {

                }
              }
            } else {

            }
          }
        }
       } else {
          this.showNoRecordsFound = true;
          this.showCustomerTable = false;
        }
      });
    } else {
      this.currentPage = this.pricingInfoService.getCurrentPageFlag();
      this.itemsPage = this.pricingInfoService.getItemsPerPageFlag();
      console.log('pageitems', this.itemsPage);
      this.customerService.getAllCompanyData(this.accessToken).subscribe(data => {
        this.customerData = data;
        this.companyResponse = this.customerData;
        this.showRefreshFlag = false;
        console.log('this.customerData Else', this.customerData);
        this.count = this.customerData.length;
        if (this.companyResponse.length > 0) {
          for (let i = 0; i < this.companyResponse.length; i++) {
            if (this.companyResponse[i].costPlus === true) {
              if (this.companyResponse[i].costPlusFactor.length > 0) {
                this.yrcCostPlusFactor = this.companyResponse[i].costPlusFactor.filter(function (el:any) {
                      return el.carrier === 'YRC';
                     });
                     this.reddawayCostPlusFactor = this.companyResponse[i].costPlusFactor.filter(function (el:any) {
                      return el.carrier === 'REDDAWAY';
                     });
                     this.fedexEcoCostPlusFactor = this.companyResponse[i].costPlusFactor.filter(function (el:any) {
                      return el.carrier === 'FEDEX ECONOMY';
                     });
                     this.fedexPriCostPlusFactor = this.companyResponse[i].costPlusFactor.filter(function (el:any) {
                      return el.carrier === 'FEDEX PRIORITY';
                     });
                console.log('this.companyResponse[i].costPlusFactor', this.companyResponse[i].costPlusFactor);
               
                console.log('this.companyResponse[i].costPlusFactor New',
                  this.yrcCostPlusFactor, this.reddawayCostPlusFactor, this.fedexEcoCostPlusFactor, this.fedexPriCostPlusFactor);
              } else {
                this.yrcCostPlusFactor = [];
              this.reddawayCostPlusFactor = [];
              this.fedexEcoCostPlusFactor = [];
              this.fedexPriCostPlusFactor = [];
              }
            } else {
              this.yrcCostPlusFactor = [];
              this.reddawayCostPlusFactor = [];
              this.fedexEcoCostPlusFactor = [];
              this.fedexPriCostPlusFactor = [];
            }
          }
          console.log('this.companyResponse[i].costPlusFactor later',
            this.yrcCostPlusFactor, this.reddawayCostPlusFactor, this.fedexEcoCostPlusFactor, this.fedexPriCostPlusFactor);
          for (let i = 0; i < this.companyResponse.length; i++) {
            if (this.companyResponse[i].BusinessRulesNew.length > 0) {
              // for (let j = 0; j < this.companyResponse[i].BusinessRulesNew.length; j++) {
                yrcArray = this.companyResponse[i].BusinessRulesNew.filter(function(el:any){
                  return el.type === 'YRC'
                });
                reddawayArray = this.companyResponse[i].BusinessRulesNew.filter(function(el:any){
                  return el.type === 'REDDAWAY'
                });
                fedexEcoArray = this.companyResponse[i].BusinessRulesNew.filter(function(el:any){
                  return el.type === 'FEDEX ECONOMY'
                });
                fedexPriArray = this.companyResponse[i].BusinessRulesNew.filter(function(el:any){
                  return el.type === 'FEDEX PRIORITY'
                });
                if (yrcArray.length > 0) {
                  for (let y = 0; y < yrcArray.length; y++) {
                    if (this.yrcCostPlusFactor.length > 0) {
                      yrcArray[y].costPlusFactorNew = this.yrcCostPlusFactor[0].factor;
                      yrcArray[y].factor = 'AR';
                    } else {
                      yrcArray[y].costPlusFactorNew = '';
                      yrcArray[y].factor = 'AR';
                    }
                  }
                } else {
                  if (this.yrcCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.yrcCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: "",
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.yrcCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    yrcArray.push(object);
                    console.log('this.companyResponse[i].costPlusFactor yrcArray', yrcArray);
                  }
                }
                if (reddawayArray.length > 0) {
                  for (let y = 0; y < reddawayArray.length; y++) {
                    if (this.reddawayCostPlusFactor.length > 0) {
                      reddawayArray[y].costPlusFactorNew = this.reddawayCostPlusFactor[0].factor;
                      reddawayArray[y].factor = 'AR';
                    } else {
                      reddawayArray[y].costPlusFactorNew = '';
                      reddawayArray[y].factor = 'AR';
                    }
                  }
                } else {
                  if (this.reddawayCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.reddawayCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: "",
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.reddawayCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    reddawayArray.push(object);
                    console.log('this.companyResponse[i].costPlusFactor reddawayArray', reddawayArray);
                  }
                }
                if (fedexEcoArray.length > 0) {
                  for (let y = 0; y < fedexEcoArray.length; y++) {
                    if (this.fedexEcoCostPlusFactor.length > 0) {
                      fedexEcoArray[y].costPlusFactorNew = this.fedexEcoCostPlusFactor[0].factor;
                      fedexEcoArray[y].factor = 'AR';
                    } else {
                      fedexEcoArray[y].costPlusFactorNew = '';
                      fedexEcoArray[y].factor = 'AR';
                    }
                  }
                } else {
                  if (this.fedexEcoCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.fedexEcoCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: "",
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.fedexEcoCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    fedexEcoArray.push(object);
                    console.log('this.companyResponse[i].costPlusFactor fedexEcoArray', fedexEcoArray);
                  }
                }
                if (fedexPriArray.length > 0) {
                  for (let y = 0; y < fedexPriArray.length; y++) {
                    if (this.fedexPriCostPlusFactor.length > 0) {
                      fedexPriArray[y].costPlusFactorNew = this.fedexPriCostPlusFactor[0].factor;
                      fedexPriArray[y].factor = 'AR';
                    } else {
                      fedexPriArray[y].costPlusFactorNew = '';
                      fedexPriArray[y].factor = 'AR';
                    }
                  }
                } else {
                  if (this.fedexPriCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.fedexPriCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: 1865,
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.fedexPriCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    fedexPriArray.push(object);
                    console.log('this.companyResponse[i].costPlusFactor fedexPriArray', fedexPriArray);
                  }
                }
              } else {
                if (this.yrcCostPlusFactor.length > 0) {
                  let object = {
                    category: "AR",
                    classRange: "",
                    classification: "",
                    companyId: "",
                    costPlusFactorNew: this.yrcCostPlusFactor[0].factor,
                    directions: "",
                    discount: "",
                    fak: "[]",
                    fakRange: "[]",
                    id: "",
                    insideDelivery: "",
                    liftGate: "",
                    limitedAccessDelivery: "",
                    minCharge: "",
                    notify: "",
                    residential: "",
                    singleShipment: "",
                    specificCityList1: "[]",
                    specificCityList2: "[]",
                    specificStateFlag: "false",
                    specificStateList1: "[]",
                    specificStateList2: "[]",
                    specificZipFlag: "false",
                    type: this.yrcCostPlusFactor[0].carrier,
                    factor: 'COSTPLUS'
                  }
                  yrcArray.push(object);
                }
                if (this.reddawayCostPlusFactor.length > 0) {
                  let object = {
                    category: "AR",
                    classRange: "",
                    classification: "",
                    companyId: "",
                    costPlusFactorNew: this.reddawayCostPlusFactor[0].factor,
                    directions: "",
                    discount: "",
                    fak: "[]",
                    fakRange: "[]",
                    id: "",
                    insideDelivery: "",
                    liftGate: "",
                    limitedAccessDelivery: "",
                    minCharge: "",
                    notify: "",
                    residential: "",
                    singleShipment: "",
                    specificCityList1: "[]",
                    specificCityList2: "[]",
                    specificStateFlag: "false",
                    specificStateList1: "[]",
                    specificStateList2: "[]",
                    specificZipFlag: "false",
                    type: this.reddawayCostPlusFactor[0].carrier,
                    factor: 'COSTPLUS'
                  }
                  reddawayArray.push(object);
                  console.log('this.companyResponse[i].costPlusFactor reddawayArray', reddawayArray);
                }
                if (this.fedexEcoCostPlusFactor.length > 0) {
                  let object = {
                    category: "AR",
                    classRange: "",
                    classification: "",
                    companyId: "",
                    costPlusFactorNew: this.fedexEcoCostPlusFactor[0].factor,
                    directions: "",
                    discount: "",
                    fak: "[]",
                    fakRange: "[]",
                    id: "",
                    insideDelivery: "",
                    liftGate: "",
                    limitedAccessDelivery: "",
                    minCharge: "",
                    notify: "",
                    residential: "",
                    singleShipment: "",
                    specificCityList1: "[]",
                    specificCityList2: "[]",
                    specificStateFlag: "false",
                    specificStateList1: "[]",
                    specificStateList2: "[]",
                    specificZipFlag: "false",
                    type: this.fedexEcoCostPlusFactor[0].carrier,
                    factor: 'COSTPLUS'
                  }
                  fedexEcoArray.push(object);
                  console.log('this.companyResponse[i].costPlusFactor fedexEcoArray', fedexEcoArray);
                }
                if (this.fedexPriCostPlusFactor.length > 0) {
                  let object = {
                    category: "AR",
                    classRange: "",
                    classification: "",
                    companyId: "",
                    costPlusFactorNew: this.fedexPriCostPlusFactor[0].factor,
                    directions: "",
                    discount: "",
                    fak: "[]",
                    fakRange: "[]",
                    id: 1865,
                    insideDelivery: "",
                    liftGate: "",
                    limitedAccessDelivery: "",
                    minCharge: "",
                    notify: "",
                    residential: "",
                    singleShipment: "",
                    specificCityList1: "[]",
                    specificCityList2: "[]",
                    specificStateFlag: "false",
                    specificStateList1: "[]",
                    specificStateList2: "[]",
                    specificZipFlag: "false",
                    type: this.fedexPriCostPlusFactor[0].carrier,
                    factor: 'COSTPLUS'
                  }
                  fedexPriArray.push(object);
                  console.log('this.companyResponse[i].costPlusFactor fedexPriArray', fedexPriArray);
                }
              }
            this.companyResponse[i].BusinessRulesNew = [];
            if (yrcArray.length > 0) {
              this.companyResponse[i].BusinessRulesNew.push.apply(this.companyResponse[i].BusinessRulesNew, yrcArray);
            }
            if (reddawayArray.length > 0) {
              this.companyResponse[i].BusinessRulesNew.push.apply(this.companyResponse[i].BusinessRulesNew, reddawayArray);
            }
            if (fedexEcoArray.length > 0) {
              this.companyResponse[i].BusinessRulesNew.push.apply(this.companyResponse[i].BusinessRulesNew, fedexEcoArray);
              
            }
            if (fedexPriArray.length > 0) {
              this.companyResponse[i].BusinessRulesNew.push.apply(this.companyResponse[i].BusinessRulesNew, fedexPriArray);
             
              console.log('this.companyResponse before', this.companyResponse[i].BusinessRulesNew);
            }

          for (let i = 0; i < this.companyResponse.length; i++) {
            if (this.companyResponse[i].BusinessRulesNew.length > 0) {
              for (let j = 0; j < this.companyResponse[i].BusinessRulesNew.length; j++) {
                if (this.companyResponse[i].BusinessRulesNew[j].specificStateFlag === 'true' || this.companyResponse[i].BusinessRulesNew[j].specificStateList1 > 0) {
                  this.companyResponse[i].BusinessRulesNew[j].specificStateList1 = JSON.parse(this.companyResponse[i].BusinessRulesNew[j].specificStateList1);
                  this.companyResponse[i].BusinessRulesNew[j].specificStateList2 = JSON.parse(this.companyResponse[i].BusinessRulesNew[j].specificStateList2);
                  this.companyResponse[i].BusinessRulesNew[j].specificCityList1 = JSON.parse(this.companyResponse[i].BusinessRulesNew[j].specificCityList1);
                  this.companyResponse[i].BusinessRulesNew[j].specificCityList2 = JSON.parse(this.companyResponse[i].BusinessRulesNew[j].specificCityList2);
                } else {
                }
              }
            } else {

            }
          }
          if (this.itemsPage === undefined) {
            this.numberPerPage = 2;
          } else {
            this.numberPerPage = this.itemsPage;
          }
          this.showCustomerTable = false;
          this.showNoRecordsFound = false;
        } 
      } else {
          this.showNoRecordsFound = true;
          this.showCustomerTable = false;
        }
        this.logger = { 'method': 'get', 'message': 'Retrieving customer details' };
        this.loggerService.info(this.logger);
      }, err => {
        this.showNoRecordsFound = true;
        this.showCustomerTable = false;
        this.logger = { 'method': 'get', 'message': 'Retrieving customer details Error' };
        this.loggerService.error(this.logger);
      });
    }
  }
  getInternalCustomerData() {
    let id = '';
    id = this.editCustomerId;
    let yrcArray:any = [], fedexEcoArray:any = [], fedexPriArray:any = [], reddawayArray:any = [];
    this.yrcCostPlusFactor = [];
    this.reddawayCostPlusFactor = [];
    this.fedexEcoCostPlusFactor = [];
    this.fedexPriCostPlusFactor = [];
    if (id !== undefined) {
      console.log('this.customerData If', this.customerData);
      this.currentPage = this.pricingInfoService.getCurrentPageFlag();
      this.itemsPage = this.pricingInfoService.getItemsPerPageFlag();
      let salesId = this.salesRepId;
      this.customerService.getAllCompanyDataBySalesRepId(this.salesRepId, this.accessToken).subscribe(data => {
        this.customerTableDetail = data;
        this.customerData = this.customerTableDetail.filter(function (el:any) {
          return el.salesRepId === salesId;
        });
        console.log('this.customerData', this.customerData);
        this.customerTableDetail = this.customerData;
        this.showRefreshFlag = false;
        if (id !== undefined || id !== null || id !== '') {
          for (let i = 0; i < this.customerTableDetail.length; i++) {
            this.singleFilteredArray = this.customerTableDetail.filter(function (el:any) {
              return el.id === id;
            });
          }
          this.filteredArray = this.customerTableDetail.filter(function (el:any) {
            return el.id !== id;
          });
          //  this.mergedCustomerArray.push.apply(this.mergedCustomerArray, this.singleFilteredArray);
          //  this.mergedCustomerArray.push.apply(this.mergedCustomerArray, this.filteredArray);
          //  this.customerData = this.mergedCustomerArray;
          if (this.customerData.length > 0) {
            if (this.itemsPage === undefined) {
              this.numberPerPage = 2;
            } else {
              this.numberPerPage = this.itemsPage;
            }

            this.showCustomerTable = false;
            this.showNoRecordsFound = false;
            for (let i = 0; i < this.customerData.length; i++) {
              if (this.customerData[i].costPlus === true) {
                if (this.customerData[i].costPlusFactor.length > 0) {
                  this.yrcCostPlusFactor = this.customerData[i].costPlusFactor.filter(function (el:any) {
                        return el.carrier === 'YRC';
                       });
                       this.reddawayCostPlusFactor = this.customerData[i].costPlusFactor.filter(function (el:any) {
                        return el.carrier === 'REDDAWAY';
                       });
                       this.fedexEcoCostPlusFactor = this.customerData[i].costPlusFactor.filter(function (el:any) {
                        return el.carrier === 'FEDEX ECONOMY';
                       });
                       this.fedexPriCostPlusFactor = this.customerData[i].costPlusFactor.filter(function (el:any) {
                        return el.carrier === 'FEDEX PRIORITY';
                       });
                  console.log('this.companyResponse[i].costPlusFactor', this.customerData[i].costPlusFactor);
                 
                  console.log('this.companyResponse[i].costPlusFactor New',
                    this.yrcCostPlusFactor, this.reddawayCostPlusFactor, this.fedexEcoCostPlusFactor, this.fedexPriCostPlusFactor);
                } else {
                  this.yrcCostPlusFactor = [];
                this.reddawayCostPlusFactor = [];
                this.fedexEcoCostPlusFactor = [];
                this.fedexPriCostPlusFactor = [];
                }
              } else {
                this.yrcCostPlusFactor = [];
                this.reddawayCostPlusFactor = [];
                this.fedexEcoCostPlusFactor = [];
                this.fedexPriCostPlusFactor = [];
              }
            }
            console.log('this.companyResponse[i].costPlusFactor later',
              this.yrcCostPlusFactor, this.reddawayCostPlusFactor, this.fedexEcoCostPlusFactor, this.fedexPriCostPlusFactor);
            for (let i = 0; i < this.customerData.length; i++) {
              if (this.customerData[i].BusinessRulesNew.length > 0) {
                // for (let j = 0; j < this.companyResponse[i].BusinessRulesNew.length; j++) {
                  yrcArray = this.customerData[i].BusinessRulesNew.filter(function(el:any){
                    return el.type === 'YRC'
                  });
                  reddawayArray = this.customerData[i].BusinessRulesNew.filter(function(el:any){
                    return el.type === 'REDDAWAY'
                  });
                  fedexEcoArray = this.customerData[i].BusinessRulesNew.filter(function(el:any){
                    return el.type === 'FEDEX ECONOMY'
                  });
                  fedexPriArray = this.customerData[i].BusinessRulesNew.filter(function(el:any){
                    return el.type === 'FEDEX PRIORITY'
                  });
                  if (yrcArray.length > 0) {
                    for (let y = 0; y < yrcArray.length; y++) {
                      if (this.yrcCostPlusFactor.length > 0) {
                        yrcArray[y].costPlusFactorNew = this.yrcCostPlusFactor[0].factor;
                        yrcArray[y].factor = 'AR';
                      } else {
                        yrcArray[y].costPlusFactorNew = '';
                        yrcArray[y].factor = 'AR';
                      }
                    }
                  } else {
                    if (this.yrcCostPlusFactor.length > 0) {
                      let object = {
                        category: "AR",
                        classRange: "",
                        classification: "",
                        companyId: "",
                        costPlusFactorNew: this.yrcCostPlusFactor[0].factor,
                        directions: "",
                        discount: "",
                        fak: "[]",
                        fakRange: "[]",
                        id: "",
                        insideDelivery: "",
                        liftGate: "",
                        limitedAccessDelivery: "",
                        minCharge: "",
                        notify: "",
                        residential: "",
                        singleShipment: "",
                        specificCityList1: "[]",
                        specificCityList2: "[]",
                        specificStateFlag: "false",
                        specificStateList1: "[]",
                        specificStateList2: "[]",
                        specificZipFlag: "false",
                        type: this.yrcCostPlusFactor[0].carrier,
                        factor: 'COSTPLUS'
                      }
                      yrcArray.push(object);
                      console.log('this.companyResponse[i].costPlusFactor yrcArray', yrcArray);
                    }
                  }
                  if (reddawayArray.length > 0) {
                    for (let y = 0; y < reddawayArray.length; y++) {
                      if (this.reddawayCostPlusFactor.length > 0) {
                        reddawayArray[y].costPlusFactorNew = this.reddawayCostPlusFactor[0].factor;
                        reddawayArray[y].factor = 'AR';
                      } else {
                        reddawayArray[y].costPlusFactorNew = '';
                        reddawayArray[y].factor = 'AR';
                      }
                    }
                  } else {
                    if (this.reddawayCostPlusFactor.length > 0) {
                      let object = {
                        category: "AR",
                        classRange: "",
                        classification: "",
                        companyId: "",
                        costPlusFactorNew: this.reddawayCostPlusFactor[0].factor,
                        directions: "",
                        discount: "",
                        fak: "[]",
                        fakRange: "[]",
                        id: "",
                        insideDelivery: "",
                        liftGate: "",
                        limitedAccessDelivery: "",
                        minCharge: "",
                        notify: "",
                        residential: "",
                        singleShipment: "",
                        specificCityList1: "[]",
                        specificCityList2: "[]",
                        specificStateFlag: "false",
                        specificStateList1: "[]",
                        specificStateList2: "[]",
                        specificZipFlag: "false",
                        type: this.reddawayCostPlusFactor[0].carrier,
                        factor: 'COSTPLUS'
                      }
                      reddawayArray.push(object);
                      console.log('this.customerData[i].costPlusFactor reddawayArray', reddawayArray);
                    }
                  }
                  if (fedexEcoArray.length > 0) {
                    for (let y = 0; y < fedexEcoArray.length; y++) {
                      if (this.fedexEcoCostPlusFactor.length > 0) {
                        fedexEcoArray[y].costPlusFactorNew = this.fedexEcoCostPlusFactor[0].factor;
                        fedexEcoArray[y].factor = 'AR';
                      } else {
                        fedexEcoArray[y].costPlusFactorNew = '';
                        fedexEcoArray[y].factor = 'AR';
                      }
                    }
                  } else {
                    if (this.fedexEcoCostPlusFactor.length > 0) {
                      let object = {
                        category: "AR",
                        classRange: "",
                        classification: "",
                        companyId: "",
                        costPlusFactorNew: this.fedexEcoCostPlusFactor[0].factor,
                        directions: "",
                        discount: "",
                        fak: "[]",
                        fakRange: "[]",
                        id: "",
                        insideDelivery: "",
                        liftGate: "",
                        limitedAccessDelivery: "",
                        minCharge: "",
                        notify: "",
                        residential: "",
                        singleShipment: "",
                        specificCityList1: "[]",
                        specificCityList2: "[]",
                        specificStateFlag: "false",
                        specificStateList1: "[]",
                        specificStateList2: "[]",
                        specificZipFlag: "false",
                        type: this.fedexEcoCostPlusFactor[0].carrier,
                        factor: 'COSTPLUS'
                      }
                      fedexEcoArray.push(object);
                      console.log('this.companyResponse[i].costPlusFactor fedexEcoArray', fedexEcoArray);
                    }
                  }
                  if (fedexPriArray.length > 0) {
                    for (let y = 0; y < fedexPriArray.length; y++) {
                      if (this.fedexPriCostPlusFactor.length > 0) {
                        fedexPriArray[y].costPlusFactorNew = this.fedexPriCostPlusFactor[0].factor;
                        fedexPriArray[y].factor = 'AR';
                      } else {
                        fedexPriArray[y].costPlusFactorNew = '';
                        fedexPriArray[y].factor = 'AR';
                      }
                    }
                  } else {
                    if (this.fedexPriCostPlusFactor.length > 0) {
                      let object = {
                        category: "AR",
                        classRange: "",
                        classification: "",
                        companyId: "",
                        costPlusFactorNew: this.fedexPriCostPlusFactor[0].factor,
                        directions: "",
                        discount: "",
                        fak: "[]",
                        fakRange: "[]",
                        id: 1865,
                        insideDelivery: "",
                        liftGate: "",
                        limitedAccessDelivery: "",
                        minCharge: "",
                        notify: "",
                        residential: "",
                        singleShipment: "",
                        specificCityList1: "[]",
                        specificCityList2: "[]",
                        specificStateFlag: "false",
                        specificStateList1: "[]",
                        specificStateList2: "[]",
                        specificZipFlag: "false",
                        type: this.fedexPriCostPlusFactor[0].carrier,
                        factor: 'COSTPLUS'
                      }
                      fedexPriArray.push(object);
                      console.log('this.customerData[i].costPlusFactor fedexPriArray', fedexPriArray);
                    }
                  }
                } else {
                  if (this.yrcCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.yrcCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: "",
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.yrcCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    yrcArray.push(object);
                  }
                  if (this.reddawayCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.reddawayCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: "",
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.reddawayCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    reddawayArray.push(object);
                    console.log('this.customerData[i].costPlusFactor reddawayArray', reddawayArray);
                  }
                  if (this.fedexEcoCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.fedexEcoCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: "",
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.fedexEcoCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    fedexEcoArray.push(object);
                    console.log('this.customerData[i].costPlusFactor fedexEcoArray', fedexEcoArray);
                  }
                  if (this.fedexPriCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.fedexPriCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: 1865,
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.fedexPriCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    fedexPriArray.push(object);
                    console.log('this.customerData[i].costPlusFactor fedexPriArray', fedexPriArray);
                  }
                }
              this.companyResponse[i].BusinessRulesNew = [];
              if (yrcArray.length > 0) {
                this.customerData[i].BusinessRulesNew.push.apply(this.customerData[i].BusinessRulesNew, yrcArray);
              }
              if (reddawayArray.length > 0) {
                this.customerData[i].BusinessRulesNew.push.apply(this.customerData[i].BusinessRulesNew, reddawayArray);
              }
              if (fedexEcoArray.length > 0) {
                this.customerData[i].BusinessRulesNew.push.apply(this.customerData[i].BusinessRulesNew, fedexEcoArray);
                
              }
              if (fedexPriArray.length > 0) {
                this.customerData[i].BusinessRulesNew.push.apply(this.customerData[i].BusinessRulesNew, fedexPriArray);
               
                console.log('this.companyResponse before', this.customerData[i].BusinessRulesNew);
              }
            for (let i = 0; i < this.customerData.length; i++) {
              if (this.customerData[i].BusinessRulesNew.length > 0) {
                for (let j = 0; j < this.customerData[i].BusinessRulesNew.length; j++) {
                  if (this.customerData[i].BusinessRulesNew[j].specificStateFlag === 'true') {
                    this.customerData[i].BusinessRulesNew[j].specificStateList1 = JSON.parse(this.customerData[i].BusinessRulesNew[j].specificStateList1);
                    this.customerData[i].BusinessRulesNew[j].specificStateList2 = JSON.parse(this.customerData[i].BusinessRulesNew[j].specificStateList2);
                    this.customerData[i].BusinessRulesNew[j].specificCityList1 = JSON.parse(this.customerData[i].BusinessRulesNew[j].specificCityList1);
                    this.customerData[i].BusinessRulesNew[j].specificCityList2 = JSON.parse(this.customerData[i].BusinessRulesNew[j].specificCityList2);
                  } else {

                  }
                }
              } else {

              }
            }
          } 
        } else {
            this.showNoRecordsFound = true;
            this.showCustomerTable = false;
          }
        }
      });
    } else {
      this.currentPage = this.pricingInfoService.getCurrentPageFlag();
      this.itemsPage = this.pricingInfoService.getItemsPerPageFlag();
      console.log('pageitems', this.itemsPage);
      let salesId = this.salesRepId;
      this.customerService.getAllCompanyData(this.accessToken).subscribe(data => {
        this.customerTableDetail = data;
        this.customerData = this.customerTableDetail.filter(function (el:any) {
          return el.salesRepId === salesId;
        });
        console.log('this.customerData', this.customerData);
        //this.customerData = data;
        this.showRefreshFlag = false;
        console.log('this.customerData Else', this.customerData);
        this.count = this.customerData.length;
        if (this.customerData.length > 0) {
          for (let i = 0; i < this.customerData.length; i++) {
            if (this.customerData[i].costPlus === true) {
              if (this.customerData[i].costPlusFactor.length > 0) {
                this.yrcCostPlusFactor = this.customerData[i].costPlusFactor.filter(function (el:any) {
                      return el.carrier === 'YRC';
                     });
                     this.reddawayCostPlusFactor = this.customerData[i].costPlusFactor.filter(function (el:any) {
                      return el.carrier === 'REDDAWAY';
                     });
                     this.fedexEcoCostPlusFactor = this.customerData[i].costPlusFactor.filter(function (el:any) {
                      return el.carrier === 'FEDEX ECONOMY';
                     });
                     this.fedexPriCostPlusFactor = this.customerData[i].costPlusFactor.filter(function (el:any) {
                      return el.carrier === 'FEDEX PRIORITY';
                     });
                console.log('this.companyResponse[i].costPlusFactor', this.customerData[i].costPlusFactor);
               
                console.log('this.companyResponse[i].costPlusFactor New',
                  this.yrcCostPlusFactor, this.reddawayCostPlusFactor, this.fedexEcoCostPlusFactor, this.fedexPriCostPlusFactor);
              } else {
                this.yrcCostPlusFactor = [];
              this.reddawayCostPlusFactor = [];
              this.fedexEcoCostPlusFactor = [];
              this.fedexPriCostPlusFactor = [];
              }
            } else {
              this.yrcCostPlusFactor = [];
              this.reddawayCostPlusFactor = [];
              this.fedexEcoCostPlusFactor = [];
              this.fedexPriCostPlusFactor = [];
            }
          }
          console.log('this.companyResponse[i].costPlusFactor later',
            this.yrcCostPlusFactor, this.reddawayCostPlusFactor, this.fedexEcoCostPlusFactor, this.fedexPriCostPlusFactor);
          for (let i = 0; i < this.customerData.length; i++) {
            if (this.customerData[i].BusinessRulesNew.length > 0) {
              // for (let j = 0; j < this.companyResponse[i].BusinessRulesNew.length; j++) {
                yrcArray = this.customerData[i].BusinessRulesNew.filter(function(el:any){
                  return el.type === 'YRC'
                });
                reddawayArray = this.customerData[i].BusinessRulesNew.filter(function(el:any){
                  return el.type === 'REDDAWAY'
                });
                fedexEcoArray = this.customerData[i].BusinessRulesNew.filter(function(el:any){
                  return el.type === 'FEDEX ECONOMY'
                });
                fedexPriArray = this.customerData[i].BusinessRulesNew.filter(function(el:any){
                  return el.type === 'FEDEX PRIORITY'
                });
                if (yrcArray.length > 0) {
                  for (let y = 0; y < yrcArray.length; y++) {
                    if (this.yrcCostPlusFactor.length > 0) {
                      yrcArray[y].costPlusFactorNew = this.yrcCostPlusFactor[0].factor;
                      yrcArray[y].factor = 'AR';
                    } else {
                      yrcArray[y].costPlusFactorNew = '';
                      yrcArray[y].factor = 'AR';
                    }
                  }
                } else {
                  if (this.yrcCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.yrcCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: "",
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.yrcCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    yrcArray.push(object);
                    console.log('this.companyResponse[i].costPlusFactor yrcArray', yrcArray);
                  }
                }
                if (reddawayArray.length > 0) {
                  for (let y = 0; y < reddawayArray.length; y++) {
                    if (this.reddawayCostPlusFactor.length > 0) {
                      reddawayArray[y].costPlusFactorNew = this.reddawayCostPlusFactor[0].factor;
                      reddawayArray[y].factor = 'AR';
                    } else {
                      reddawayArray[y].costPlusFactorNew = '';
                      reddawayArray[y].factor = 'AR';
                    }
                  }
                } else {
                  if (this.reddawayCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.reddawayCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: "",
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.reddawayCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    reddawayArray.push(object);
                    console.log('this.companyResponse[i].costPlusFactor reddawayArray', reddawayArray);
                  }
                }
                if (fedexEcoArray.length > 0) {
                  for (let y = 0; y < fedexEcoArray.length; y++) {
                    if (this.fedexEcoCostPlusFactor.length > 0) {
                      fedexEcoArray[y].costPlusFactorNew = this.fedexEcoCostPlusFactor[0].factor;
                      fedexEcoArray[y].factor = 'AR';
                    } else {
                      fedexEcoArray[y].costPlusFactorNew = '';
                      fedexEcoArray[y].factor = 'AR';
                    }
                  }
                } else {
                  if (this.fedexEcoCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.fedexEcoCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: "",
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.fedexEcoCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    fedexEcoArray.push(object);
                    console.log('this.companyResponse[i].costPlusFactor fedexEcoArray', fedexEcoArray);
                  }
                }
                if (fedexPriArray.length > 0) {
                  for (let y = 0; y < fedexPriArray.length; y++) {
                    if (this.fedexPriCostPlusFactor.length > 0) {
                      fedexPriArray[y].costPlusFactorNew = this.fedexPriCostPlusFactor[0].factor;
                      fedexPriArray[y].factor = 'AR';
                    } else {
                      fedexPriArray[y].costPlusFactorNew = '';
                      fedexPriArray[y].factor = 'AR';
                    }
                  }
                } else {
                  if (this.fedexPriCostPlusFactor.length > 0) {
                    let object = {
                      category: "AR",
                      classRange: "",
                      classification: "",
                      companyId: "",
                      costPlusFactorNew: this.fedexPriCostPlusFactor[0].factor,
                      directions: "",
                      discount: "",
                      fak: "[]",
                      fakRange: "[]",
                      id: 1865,
                      insideDelivery: "",
                      liftGate: "",
                      limitedAccessDelivery: "",
                      minCharge: "",
                      notify: "",
                      residential: "",
                      singleShipment: "",
                      specificCityList1: "[]",
                      specificCityList2: "[]",
                      specificStateFlag: "false",
                      specificStateList1: "[]",
                      specificStateList2: "[]",
                      specificZipFlag: "false",
                      type: this.fedexPriCostPlusFactor[0].carrier,
                      factor: 'COSTPLUS'
                    }
                    fedexPriArray.push(object);
                    console.log('this.customerData[i].costPlusFactor fedexPriArray', fedexPriArray);
                  }
                }
              } else {
                if (this.yrcCostPlusFactor.length > 0) {
                  let object = {
                    category: "AR",
                    classRange: "",
                    classification: "",
                    companyId: "",
                    costPlusFactorNew: this.yrcCostPlusFactor[0].factor,
                    directions: "",
                    discount: "",
                    fak: "[]",
                    fakRange: "[]",
                    id: "",
                    insideDelivery: "",
                    liftGate: "",
                    limitedAccessDelivery: "",
                    minCharge: "",
                    notify: "",
                    residential: "",
                    singleShipment: "",
                    specificCityList1: "[]",
                    specificCityList2: "[]",
                    specificStateFlag: "false",
                    specificStateList1: "[]",
                    specificStateList2: "[]",
                    specificZipFlag: "false",
                    type: this.yrcCostPlusFactor[0].carrier,
                    factor: 'COSTPLUS'
                  }
                  yrcArray.push(object);
                }
                if (this.reddawayCostPlusFactor.length > 0) {
                  let object = {
                    category: "AR",
                    classRange: "",
                    classification: "",
                    companyId: "",
                    costPlusFactorNew: this.reddawayCostPlusFactor[0].factor,
                    directions: "",
                    discount: "",
                    fak: "[]",
                    fakRange: "[]",
                    id: "",
                    insideDelivery: "",
                    liftGate: "",
                    limitedAccessDelivery: "",
                    minCharge: "",
                    notify: "",
                    residential: "",
                    singleShipment: "",
                    specificCityList1: "[]",
                    specificCityList2: "[]",
                    specificStateFlag: "false",
                    specificStateList1: "[]",
                    specificStateList2: "[]",
                    specificZipFlag: "false",
                    type: this.reddawayCostPlusFactor[0].carrier,
                    factor: 'COSTPLUS'
                  }
                  reddawayArray.push(object);
                  console.log('this.companyResponse[i].costPlusFactor reddawayArray', reddawayArray);
                }
                if (this.fedexEcoCostPlusFactor.length > 0) {
                  let object = {
                    category: "AR",
                    classRange: "",
                    classification: "",
                    companyId: "",
                    costPlusFactorNew: this.fedexEcoCostPlusFactor[0].factor,
                    directions: "",
                    discount: "",
                    fak: "[]",
                    fakRange: "[]",
                    id: "",
                    insideDelivery: "",
                    liftGate: "",
                    limitedAccessDelivery: "",
                    minCharge: "",
                    notify: "",
                    residential: "",
                    singleShipment: "",
                    specificCityList1: "[]",
                    specificCityList2: "[]",
                    specificStateFlag: "false",
                    specificStateList1: "[]",
                    specificStateList2: "[]",
                    specificZipFlag: "false",
                    type: this.fedexEcoCostPlusFactor[0].carrier,
                    factor: 'COSTPLUS'
                  }
                  fedexEcoArray.push(object);
                  console.log('this.companyResponse[i].costPlusFactor fedexEcoArray', fedexEcoArray);
                }
                if (this.fedexPriCostPlusFactor.length > 0) {
                  let object = {
                    category: "AR",
                    classRange: "",
                    classification: "",
                    companyId: "",
                    costPlusFactorNew: this.fedexPriCostPlusFactor[0].factor,
                    directions: "",
                    discount: "",
                    fak: "[]",
                    fakRange: "[]",
                    id: 1865,
                    insideDelivery: "",
                    liftGate: "",
                    limitedAccessDelivery: "",
                    minCharge: "",
                    notify: "",
                    residential: "",
                    singleShipment: "",
                    specificCityList1: "[]",
                    specificCityList2: "[]",
                    specificStateFlag: "false",
                    specificStateList1: "[]",
                    specificStateList2: "[]",
                    specificZipFlag: "false",
                    type: this.fedexPriCostPlusFactor[0].carrier,
                    factor: 'COSTPLUS'
                  }
                  fedexPriArray.push(object);
                  console.log('this.companyResponse[i].costPlusFactor fedexPriArray', fedexPriArray);
                }
              }
            this.customerData[i].BusinessRulesNew = [];
            if (yrcArray.length > 0) {
              this.customerData[i].BusinessRulesNew.push.apply(this.customerData[i].BusinessRulesNew, yrcArray);
            }
            if (reddawayArray.length > 0) {
              this.customerData[i].BusinessRulesNew.push.apply(this.customerData[i].BusinessRulesNew, reddawayArray);
            }
            if (fedexEcoArray.length > 0) {
              this.customerData[i].BusinessRulesNew.push.apply(this.customerData[i].BusinessRulesNew, fedexEcoArray);
              
            }
            if (fedexPriArray.length > 0) {
              this.customerData[i].BusinessRulesNew.push.apply(this.customerData[i].BusinessRulesNew, fedexPriArray);
             
              console.log('this.companyResponse before', this.customerData[i].BusinessRulesNew);
            }
          for (let i = 0; i < this.customerData.length; i++) {
            if (this.customerData[i].BusinessRulesNew.length > 0) {
              for (let j = 0; j < this.customerData[i].BusinessRulesNew.length; j++) {
                if (this.customerData[i].BusinessRulesNew[j].specificStateFlag === 'true' || this.customerData[i].BusinessRulesNew[j].specificStateList1 > 0) {
                  this.customerData[i].BusinessRulesNew[j].specificStateList1 = JSON.parse(this.customerData[i].BusinessRulesNew[j].specificStateList1);
                  this.customerData[i].BusinessRulesNew[j].specificStateList2 = JSON.parse(this.customerData[i].BusinessRulesNew[j].specificStateList2);
                  this.customerData[i].BusinessRulesNew[j].specificCityList1 = JSON.parse(this.customerData[i].BusinessRulesNew[j].specificCityList1);
                  this.customerData[i].BusinessRulesNew[j].specificCityList2 = JSON.parse(this.customerData[i].BusinessRulesNew[j].specificCityList2);
                } else {
                }
              }
            } else {

            }
          }
          if (this.itemsPage === undefined) {
            this.numberPerPage = 2;
          } else {
            this.numberPerPage = this.itemsPage;
          }

          this.showCustomerTable = false;
          this.showNoRecordsFound = false;
        }
       } else {
          this.showNoRecordsFound = true;
          this.showCustomerTable = false;
        }
        this.logger = { 'method': 'get', 'message': 'Retrieving customer details' };
        this.loggerService.info(this.logger);
      }, err => {
        this.showNoRecordsFound = true;
        this.showCustomerTable = false;
        this.logger = { 'method': 'get', 'message': 'Retrieving customer details Error' };
        this.loggerService.error(this.logger);
      });
    }
  }
  fileUpload(evt: any) {
    this.file = evt.target.files[0];
    this.fileName = this.file.name;

    this.logger = { 'method': 'fileUpload', 'message': 'Upload customer lists in s3 bucket' };
    this.loggerService.info(this.logger);
    this.showUploadPopup = true;
  }

  customersPage() {
    this.addMode = true;
    this.pricingInfoService.setFlag(this.addMode);
    this.router.navigate(['/company']);
  }

  checkForPagination(page:any) {
    console.log('pages', page);
    this.numberPerPage = Number(page);
    this.itemsPage = page;
    console.log('itempage', this.itemsPage);
    this.pricingInfoService.setItemsPerPageFlag(this.itemsPage);


  }

  pageChanged(event:any) {
    this.currentPage = event;
    console.log('currentpage', this.currentPage);
  }



  remove(customer:any) {
    this.companySummaryForm.patchValue({ company: '' });
    this.currentPage = '';
    this.pricingInfoService.setCurrentPageFlag(this.currentPage);
    this.customerId = '';
    this.pricingInfoService.setCustomerId(this.customerId);
    if (this.salesRepType === 'administrator' || this.salesRepType === 'customerServiceRep') {
      console.log('remove');
      //  this.getCustomerData();
      // this.getAllCustomerNotes();
    } else {
      console.log('remove all else');
      //  this.getInternalCustomerData();
      //  this.getCustomerNotes();
    }
  }

  editParticularBusinessRule(customer:any, businessRules:any, i:any) {
    console.log('edit', customer, businessRules, i);
    this.setFlag = false;
    this.pricingInfoService.setFlag(this.setFlag);
    console.log('customer', customer);
    this.pricingInfoService.saveEditCustomer(customer, businessRules);
    this.pricingInfoService.setCurrentPageFlag(this.currentPage);           
    if (businessRules.factor === 'COSTPLUS') {
      let costplus = true;
      this.pricingInfoService.setCostPlusFlag(costplus);
    } else {
      let costplus = false;
      this.pricingInfoService.setCostPlusFlag(costplus);
    }
    this.router.navigate(['/company']);
    this.logger = { 'method': 'saveEditCustomer', 'message': 'Editing particular Business rule' };
    this.loggerService.info(this.logger);
  }

  editCompany(customer:any, i:any) {
    console.log('edit', customer, i);
    this.setFlag = false;
    this.pricingInfoService.setFlag(this.setFlag);
    console.log('customer', customer);
    let businessRules = 'editCustomer';
    this.pricingInfoService.saveEditCustomer(customer, businessRules);
    this.pricingInfoService.setCurrentPageFlag(this.currentPage);
    this.router.navigate(['/company']);
    this.logger = { 'method': 'saveEditCustomer', 'message': 'Editing particular Business rule' };
    this.loggerService.info(this.logger);
  }

  companyEdit(company:any, i:any) {
    this.setFlag = false;
    this.pricingInfoService.setFlag(this.setFlag);
    console.log('customer', company);
    let businessRules = 'editCustomer';
    this.pricingInfoService.saveEditCustomer(company, businessRules);
    this.pricingInfoService.setCurrentPageFlag(this.currentPage);
    this.router.navigate(['/company']);
    this.logger = { 'method': 'saveEditCustomer', 'message': 'Editing particular Business rule' };
    this.loggerService.info(this.logger);
  }

  addRules(customer:any) {
    this.setFlag = false;
    console.log(customer);
    this.customer = {
      customerName: customer.customerName,
      companyName: customer.companyName,
      referenceId: customer.referenceId,
      id: customer.id,
      contactNumber: customer.contactNumber,
      ratingNotes: customer.ratingNotes,
      salesRepId: customer.salesRepId,
      email: customer.email,
      username: customer.username,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      zip: customer.zip,
      type: customer.type,
      createdOn: customer.createdOn,
      fedexSubscription: customer.fedexSubscription,
      premiumFactor: customer.premiumFactor,
      fedexCredentials: customer.fedexCredentials,
      costPlus: customer.costPlus,
      costPlusFactor: customer.costPlusFactor,
      specificPricing: customer.specificPricing,
      specificPricingList: customer.specificPricingList
    };
    const businessRules = {};
    this.pricingInfoService.setFlag(this.setFlag);
    this.pricingInfoService.saveEditCustomer(this.customer, businessRules);
    this.pricingInfoService.setCurrentPageFlag(this.currentPage);

    this.router.navigate(['/company']);
  }

  viewMore(businessRule:any) {
    this.viewFakArray = [];
    const fakRange = JSON.parse(businessRule.fakRange);
    const fak = JSON.parse(businessRule.fak);
    if (fakRange.length === 0 || fak.length === 0) {
      this.viewFakArray = [];
      this.showViewFAKValues = false;
    } else {
      for (let f = 0; f < fakRange.length; f++) {
        const data = fakRange[f].split('-');
        const data1 = data[0];
        const data2 = data[1];
        const fakData = fak[f];
        const fakValue = { fakRangeFrom: data1, fakRangeTo: data2, fakValue: fakData };
        this.viewFakArray.push(fakValue);
        this.showViewFAKValues = true;
      }
      if (this.viewFakArray.length > 0) {
        this.showFak = true;
      } else {
        this.showFak = false;
      }
    }
  }

  deleteCompany(id:any) {
    console.log('id', id);
    this.deleteCompanyId = id;
    this.showDeletePopupForCompany = true;
    this.pricingInfoService.setCurrentPageFlag(this.currentPage);
  }

  deleteIfYesForCompany() {
    this.pricingInfoService.deleteCompanyRecord(this.deleteCompanyId, this.accessToken).subscribe((data:any) => {
      this.toastr.success('Deleted successfully');
      this.showDeletePopupForCompany = false;
      this.editCustomerId = '';
      this.currentPage = this.currentPage;
      this.pricingInfoService.setCurrentPageFlag(this.currentPage);
      this.customerId = '';
      this.pricingInfoService.setCustomerId(this.customerId);
      this.pricingInfoService.setDeleteData('delete');
      // this.customerId =;
      this.pricingInfoService.setCustomerId(this.customerId);
      this.getCustomerInformation(this.deleteCompanyId, 'chooseCompany1');
      if (this.salesRepType === 'administrator') {
        this.getAllCompanyDetails();
        this.companySummaryForm.patchValue({
          company: ''
        });
      } else {
        this.getCompanyDetailsOfSalesRep();
        this.companySummaryForm.patchValue({
          company: ''
        });
      }
    }, (err:any) => {
      this.toastr.error('Failed to delete the record');
      this.showDeletePopupForCompany = false;
    });
  }

  cancelCompanyPopup() {
    this.showDeletePopupForCompany = false;
  }




  deleteParticularBusinessRule(businessRules:any, id:any) {
    this.businessRules = businessRules;
    this.pricingInfoService.setCurrentPageFlag(this.currentPage);
    this.showDeletePopup = true;

  }

  deleteIfYes() {
    console.log('this delete', this.businessRules);
    let deleteId = this.businessRules.id;
    console.log('this delete', this.businessRules.companyId);
    this.pricingInfoService.deleteBusinessRulesRecord(deleteId, this.accessToken).subscribe((data:any) => {
      this.toastr.success('Deleted successfully');
      this.showDeletePopup = false;
      this.editCustomerId = '';
      // this.getAllCustomerData();
      this.currentPage = this.currentPage;
      this.pricingInfoService.setCurrentPageFlag(this.currentPage);
      this.customerId = '';
      this.pricingInfoService.setCustomerId(this.customerId);
      this.pricingInfoService.setDeleteData('delete');
      console.log('this.customerId', this.businessRules.companyId);
      // this.customerId =;
      this.pricingInfoService.setCustomerId(this.customerId);
      this.getCustomerInformation(this.businessRules.companyId, 'chooseCompany1');
      // if (this.salesRepType === 'administrator' || this.salesRepType === 'customerServiceRep') {
      //   console.log('refresh');
      //   this.getCustomerData();
      //   this.getAllCustomerNotes();
      // } else {
      //   console.log('refresh else');
      //   this.getInternalCustomerData();
      //   this.getCustomerNotes();
      // }
    }, (err:any) => {
      this.toastr.error('Failed to delete the record');
      this.showDeletePopup = false;
    });
  }

  cancelPopup() {
    this.showDeletePopup = false;
    this.showUploadPopup = false;
    //  this.getCustomerData();
    this.currentPage = this.currentPage;
    this.pricingInfoService.setCurrentPageFlag(this.currentPage);
    this.customerId = '';
    this.pricingInfoService.setCustomerId(this.customerId);
    if (this.salesRepType === 'administrator' || this.salesRepType === 'customerServiceRep') {
      console.log('refresh');
      this.getCustomerData();
      this.getAllCustomerNotes();
    } else {
      console.log('refresh else');
      this.getInternalCustomerData();
      this.getCustomerNotes();
    }

  }

  cancelCustomerPopup() {
    this.showDeleteCustomerPopup = false;
  }

  /*cancelPopup () {
   this.showDeletePopup = false;
   this.showUploadPopup = false;
   this.getCustomerData();
   }*/

  uploadYes() {
    this.showUploadPopup = false;
    this.upload();
    // this.toastr.success('Uploaded successfully');
  }

  fileEvent(fileInput: any) {
    const file = fileInput.target.files[0];
    const fileName = file.name;
  }




  upload() {
    console.log('upload');
    const bucketName = this.bucketName;
    AWS.config.update({
      accessKeyId: 'AKIAJJYRSN3O3WPFWO3A',
      secretAccessKey: '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',
      'region': 'us-west-1'
    });
    const bucket = new AWS.S3({ params: { Bucket: '' + bucketName } });
    if (this.file) {
      const objKey = this.fileName;
      const params = {
        Key: objKey,
        ContentType: this.file.type,
        Body: this.file,
        ACL: 'public-read'
      };
      bucket.putObject(params, function (err:any, data:any) {
        console.log('err', err, 'data', data);
        if (data) {
          alert('Successfully Uploaded');
        }
      });
      // this.toastr.success('Successfully Uploaded');
      /*this.loginService.saveData(this.fileName).subscribe((response) => {

       },err=>{

       });*/
    } else {
      alert('Nothing to upload.');
    }
  }

  refresh() {
    this.companySummaryForm.patchValue({ company: '' });
    this.currentPage = '';
    this.pricingInfoService.setCurrentPageFlag(this.currentPage);
    this.customerId = '';
    this.pricingInfoService.setCustomerId(this.customerId);
    if (this.salesRepType === 'administrator' || this.salesRepType === 'customerServiceRep') {
      console.log('refresh');
      this.getCustomerData();
      this.getAllCustomerNotes();
    } else {
      console.log('refresh else');
      this.getInternalCustomerData();
      this.getCustomerNotes();
    }
  }

  deleteCustomer(customer:any) {
    console.log(customer.id);
    this.deleteCustomerId = customer.id;
    this.showDeleteCustomerPopup = true;
  }

  deleteCustomerData() {
    this.pricingInfoService.setCurrentPageFlag(this.currentPage);
    this.pricingInfoService.setItemsPerPageFlag(this.itemsPage);
    this.pricingInfoService.deleteCustomerData(this.deleteCustomerId, this.accessToken).subscribe((response:any) => {
      console.log('response Item', response);
      this.deleteResponse = response;
      if (this.deleteResponse.result === true) {
        this.showDeleteCustomerPopup = false;
        this.toastr.success('Deleted Successfully');
        if (this.salesRepType === 'administrator' || this.salesRepType === 'customerServiceRep') {
          console.log('customer 5');
          this.getCustomerData();
          this.getAllCustomerNotes();
        } else {
          console.log('customer 6');
          this.getInternalCustomerData();
          this.getCustomerNotes();
        }
      } else {
        this.showDeleteCustomerPopup = false;
        this.toastr.error('Failed to delete the record');
      }
    }, (err:any) => {
      this.showDeleteCustomerPopup = false;
      this.toastr.error('Failed to delete the record');
    });
  }

  formatPhoneNumber(s:any) {
    let s2 = ('' + s).replace(/\D/g, '');
    let m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ')' + m[2] + '-' + m[3];
  }
  downloadData() {
    console.log('download');
    this.data = [];
    let parseClassWeight, parseRateDetail;
    let userDetail = {};
    let customerType;
    let salesRepName;
    let userName;
    let salesRepId:any;
    let phoneNumber;
    let type;
    let salesRepresentativeName = [];
    if (this.salesRepType === 'administrator' || this.salesRepType === 'customerServiceRep') {
      type = 'admin';
    } else {
      type = 'internalSalesRep';
    }

    this.customerService.getAllDetailsForCompanyDownload(this.salesRepId, this.accessToken, type).subscribe(data => {
      this.customerFeaturesAll = data;
      // this.customerFeaturesAll = this.customerFeaturesAll.filter(function(a,b){
      //   return a.companyName - b.companyName;
      // });

      console.log('this.customerFeaturesAll dddff', this.customerFeaturesAll);
      if (this.customerFeaturesAll.length > 0) {
        console.log('this.customerFeaturesAll dddff', this.customerFeaturesAll);

        for (let i = 0; i < this.customerFeaturesAll.length; i++) {
          salesRepId = this.customerFeaturesAll[i].salesRepId;
          console.log('salesRepId', salesRepId);
          salesRepresentativeName = this.salesRepArray.filter(function (el:any) {
            return el.id === salesRepId;
          });
          if (salesRepresentativeName.length > 0) {
            console.log('salesRepresentativeName', salesRepresentativeName);
            salesRepName = salesRepresentativeName[0].salesRepId;
            console.log('salesRepName', salesRepName);
          } else {
            salesRepName = '-';
            console.log('salesRepName', salesRepName);
          }
          if (this.customerFeaturesAll[i].externalCustomersDetail.length > 0) {
            for (let j = 0; j < this.customerFeaturesAll[i].externalCustomersDetail.length; j++) {
              if (this.customerFeaturesAll[i].externalCustomersDetail[j].type === 'externalCustomer') {
                customerType = 'Web customer';
              } else {
                customerType = 'Non web customer';
              }

              phoneNumber = this.formatPhoneNumber(this.customerFeaturesAll[i].externalCustomersDetail[j].contactNumber);

              if (this.customerFeaturesAll[i].externalCustomersDetail[j].username !== undefined) {
                userName = this.customerFeaturesAll[i].externalCustomersDetail[j].username;
              } else {
                userName = '-';
              }
              userDetail = {
                'Company Name': this.customerFeaturesAll[i].companyName,
                'Account Id': this.customerFeaturesAll[i].referenceId,
                'Customer Name': this.customerFeaturesAll[i].externalCustomersDetail[j].customerName,
                'Email': this.customerFeaturesAll[i].externalCustomersDetail[j].email,
                'Sales RepId': salesRepName,
                'User Name': userName,
                'Address': this.customerFeaturesAll[i].address,
                'City': this.customerFeaturesAll[i].city,
                'State': this.customerFeaturesAll[i].state,
                'Zip': this.customerFeaturesAll[i].zip,
                'Contact Number': phoneNumber,
                'Rating Notes': this.customerFeaturesAll[i].ratingNotes,
                'Customer Type': customerType,
                'Date Created': this.datePipe.transform(this.customerFeaturesAll[i].created, 'MM-dd-yyyy')
              };
              this.data.push(userDetail);
            }
          } else {
            userDetail = {
              'Company Name': this.customerFeaturesAll[i].companyName,
              'Account Id': this.customerFeaturesAll[i].referenceId,
              'Customer Name': '-',
              'Email': '-',
              'Sales RepId': salesRepName,
              'User Name': '-',
              'Address': this.customerFeaturesAll[i].address,
              'City': this.customerFeaturesAll[i].city,
              'State': this.customerFeaturesAll[i].state,
              'Zip': this.customerFeaturesAll[i].zip,
              'Contact Number': '-',
              'Rating Notes': this.customerFeaturesAll[i].ratingNotes,
              'Customer Type': '-',
              'Date Created': this.datePipe.transform(this.customerFeaturesAll[i].created, 'MM-dd-yyyy')
            };
            this.data.push(userDetail);
          }
        }
        if (this.data.length > 0) {
          this.toastr.success('Companies list are downloaded successfully');
        } else {
          this.toastr.error('Error in downloading the companies list');
        }

        console.log('data', this.data);
        this.excelService.exportAsExcelFile(this.data, 'Customer Data');
        this.logger = {
          'method': 'exportAsExcelFile',
          'message': 'Download report details',
          'salesrepId': this.salesRepId
        };
        this.loggerService.info(this.logger);
        // this.downloadData1();
        //  new Angular2Csv(this.data, 'Report', options);
      }
    });
  }
}
