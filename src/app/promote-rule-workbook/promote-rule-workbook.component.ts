import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { CustomerService } from '../services/customer.service';
import { PricingInfoService } from '../services/pricing-info.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-promote-rule-workbook',
  templateUrl: './promote-rule-workbook.component.html',
  styleUrls: ['./promote-rule-workbook.component.css']
})
export class PromoteRuleWorkbookComponent implements OnInit {
  accessToken: any;
  loginDetails: any;
  companyDetails: any;
  companyResponse: any;
  companyFeatures: any;
  public enableRemoveIcon = false;
  public showRefreshFlag = false;
  public currentPage: any;
  public itemsPage: any;
  public customerId: any;
  public deleteCustomerId: any;
  public showCustomerTable = true;
  public bucketName = 'logisticscustomerlist';
  public classArray = [50, 55, 60, 65, 70, 77, 85, 92, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];
  public assessorialData = ['Liftgate Service', 'Residential Delivery', 'Limited Access Delivery',
    'Notify', 'Inside Delivery'];
  public yrcCostPlusFactor = [];
  public reddawayCostPlusFactor = [];
  public fedexEcoCostPlusFactor = [];
  public fedexPriCostPlusFactor = [];
  public showNoRecordsFound = false;
  public showTable = false;
  public viewFakArray = [];
  public showFak = false;
  public showDeletePopup = false;
  public showViewFAKValues = false;
  public showAllCustomersData = false;
  shippingManagerName: any;
  shippingManagerPost: any;
  firstDate: any;
  secondDate: any;
  contractAddrss: any;
  constructor(private invoiceService: InvoiceService, 
              private customerService:CustomerService, 
               private toastr: ToastrService,
              private pricingInfoService:PricingInfoService,private router: Router) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('accessToken');
    let details: any = localStorage.getItem(('SalesRepName'));
    this.loginDetails = JSON.parse(details);
    this.companyDetails = this.invoiceService.getCompanyInformation1();
    console.log('this.companyDetails initialization', this.companyDetails); 
    if (this.companyDetails !== undefined) {
      // this.showTable = true;
      if (this.companyDetails.paymentTerms === null) {
        this.companyDetails.paymentTerms = '20';
      }
      this.shippingManagerName = this.companyDetails.contactPersonName;
      if(this.companyDetails.contactPersonDesignation !== null && this.companyDetails.contactPersonDesignation !== '' && this.companyDetails.contactPersonDesignation !== undefined){
        this.shippingManagerPost = this.companyDetails.contactPersonDesignation
      } else {
        this.shippingManagerPost = 'Shipping Manager';
      }
      this.firstDate = '';
    this.secondDate = '';
    this.contractAddrss = this.companyDetails.companyName;
this.showTable = true;
setTimeout(() => {
  $("#firsteditdate").focus();

}, 1000);
    // this.getRules(this.companyDetails.id);
   } else {
    this.showTable = false;
   }
  }
  
  checkcontractKey(event: any,type: any) {
    if (event.keyCode === 13) {
      if (type === 'firstdate') {
        this.focusinputItem();
      } else if(type === 'name') {
        // this.next(this.shippingManagerName);
        this.focusinputItemDate1();
      } else if (type === 'post') {
        // this.next(this.shippingManagerName);
        // this.savecontractNames();
        setTimeout(() => {
          $('#shippingAddress').focus();
        }, 1000);
        
        // this.focusinputItemDate2();
      } else if (type === 'address') {
              this.focusinputItemDate2();
  
      }
      else if (type === 'secondDate') {
        // this.saveAnalyticsusingId();
      }
    }
  
  }

  focusinputItem() {
    setTimeout(() => {
      $('#shippingmanager1').focus();
    }, 1000);
  }

  focusinputItemDate() {
    setTimeout(() => {
      $('#firsteditdate').focus();
    }, 1000);
  }

focusinputItemDate1() {
  setTimeout(() => {
    $('#shippingmanager2').focus();
  }, 1000);
  
}

focusinputItemDate2() {
  setTimeout(() => {
    $('#secondeditdate').focus();
  }, 1000);
  
}
  // getRules(companyId) {
  //   let yrcArray = [], fedexEcoArray = [], fedexPriArray = [], reddawayArray = [];
  //   this.yrcCostPlusFactor = [];
  //   this.reddawayCostPlusFactor = [];
  //   this.fedexEcoCostPlusFactor = [];
  //   this.fedexPriCostPlusFactor = [];
  //   this.customerService.getAllCompanyDataById(this.accessToken, companyId).subscribe(data => {
  //     this.companyResponse = data;
  //     console.log('this.companyResponse', this.companyResponse);

  //     if (this.companyResponse.length > 0) {
  //       this.enableRemoveIcon = true;
  //       this.showRefreshFlag = true;
  //       this.currentPage = 1;
  //       this.pricingInfoService.setCurrentPageFlag(this.currentPage);
  //       this.customerId = companyId;
  //       console.log('currentpage', this.currentPage);
  //       this.pricingInfoService.setCustomerId(this.customerId);
  //       //this.numberPerPage = 2;
  //       // if (type === 'chooseCompany') {
  //         this.showCustomerTable = true;
  //       // } else {
  //       //   this.showCustomerTable = false;
  //       // }
  //       // if (this)
  //       for (let i = 0; i < this.companyResponse.length; i++) {
  //         if (this.companyResponse[i].costPlus === true) {
  //           if (this.companyResponse[i].costPlusFactor.length > 0) {
  //             this.yrcCostPlusFactor = this.companyResponse[i].costPlusFactor.filter(function (el) {
  //                   return el.carrier === 'YRC';
  //                  });
  //                  this.reddawayCostPlusFactor = this.companyResponse[i].costPlusFactor.filter(function (el) {
  //                   return el.carrier === 'REDDAWAY';
  //                  });
  //                  this.fedexEcoCostPlusFactor = this.companyResponse[i].costPlusFactor.filter(function (el) {
  //                   return el.carrier === 'FEDEX ECONOMY';
  //                  });
  //                  this.fedexPriCostPlusFactor = this.companyResponse[i].costPlusFactor.filter(function (el) {
  //                   return el.carrier === 'FEDEX PRIORITY';
  //                  });
  //             console.log('this.companyResponse[i].costPlusFactor', this.companyResponse[i].costPlusFactor);
             
  //             console.log('this.companyResponse[i].costPlusFactor New',
  //               this.yrcCostPlusFactor, this.reddawayCostPlusFactor, this.fedexEcoCostPlusFactor, this.fedexPriCostPlusFactor);
  //           } else {
  //             this.yrcCostPlusFactor = [];
  //           this.reddawayCostPlusFactor = [];
  //           this.fedexEcoCostPlusFactor = [];
  //           this.fedexPriCostPlusFactor = [];
  //           }
  //         } else {
  //           this.yrcCostPlusFactor = [];
  //           this.reddawayCostPlusFactor = [];
  //           this.fedexEcoCostPlusFactor = [];
  //           this.fedexPriCostPlusFactor = [];
  //         }

  //         // if (this.companyResponse[i].specificPricing === true) {
  //         //   if (this.companyResponse[i].specificPricingList.length > 0) {

  //         //   }
  //         // }
  //       }
  //       console.log('this.companyResponse[i].costPlusFactor later',
  //         this.yrcCostPlusFactor, this.reddawayCostPlusFactor, this.fedexEcoCostPlusFactor, this.fedexPriCostPlusFactor);
  //       for (let i = 0; i < this.companyResponse.length; i++) {
  //         if (this.companyResponse[i].BusinessRulesNew.length > 0) {
  //           // for (let j = 0; j < this.companyResponse[i].BusinessRulesNew.length; j++) {
  //             yrcArray = this.companyResponse[i].BusinessRulesNew.filter(function(el){
  //               return el.type === 'YRC'
  //             });
  //             reddawayArray = this.companyResponse[i].BusinessRulesNew.filter(function(el){
  //               return el.type === 'REDDAWAY'
  //             });
  //             fedexEcoArray = this.companyResponse[i].BusinessRulesNew.filter(function(el){
  //               return el.type === 'FEDEX ECONOMY'
  //             });
  //             fedexPriArray = this.companyResponse[i].BusinessRulesNew.filter(function(el){
  //               return el.type === 'FEDEX PRIORITY'
  //             });
  //             let yrcInterstateArray = [], yrcIntrastateArray = [], yrcSpecialRules = [];
  //             if (yrcArray.length > 0) {
  //               if (yrcArray.length > 0) {
  //                 yrcInterstateArray = yrcArray.filter(function(el){
  //                   return el.directions === 'INTERSTATE';
  //                 });
  //                 yrcIntrastateArray = yrcArray.filter(function(el){
  //                   return el.directions === 'INTRASTATE';
  //                 });
  //                 yrcSpecialRules = yrcArray.filter(function(el){
  //                   return el.directions === 'SPECIAL RULES';
  //                 });
  //                 yrcArray.push.apply(yrcInterstateArray);
  //                 yrcArray.push.apply(yrcIntrastateArray);
  //                 yrcArray.push.apply(yrcSpecialRules);
  //                 console.log('yrc rules separation', yrcArray, yrcArray.length);
  //                 yrcArray = yrcArray.sort(function (a, b) {
  //                   if(a.category < b.category) { return -1; }
  //                   if(a.category > b.category) { return 1; }
  //                   return 0;
  //                 });
            
  //                 console.log('yrc',yrcArray);
  //               }
  //               for (let y = 0; y < yrcArray.length; y++) {
  //                 if (this.yrcCostPlusFactor.length > 0) {
  //                   yrcArray[y].costPlusFactorNew = this.yrcCostPlusFactor[0].factor;
  //                   yrcArray[y].factor = 'AR';
  //                 } else {
  //                   yrcArray[y].costPlusFactorNew = '';
  //                   yrcArray[y].factor = 'AR';
  //                 }
  //               }
  //             } else {
  //               if (this.yrcCostPlusFactor.length > 0) {
  //                 let object = {
  //                   category: "AR",
  //                   classRange: "",
  //                   classification: "",
  //                   companyId: "",
  //                   costPlusFactorNew: this.yrcCostPlusFactor[0].factor,
  //                   directions: "",
  //                   discount: "",
  //                   fak: "[]",
  //                   fakRange: "[]",
  //                   id: "",
  //                   insideDelivery: "",
  //                   liftGate: "",
  //                   limitedAccessDelivery: "",
  //                   minCharge: "",
  //                   notify: "",
  //                   residential: "",
  //                   singleShipment: "",
  //                   specificCityList1: "[]",
  //                   specificCityList2: "[]",
  //                   specificStateFlag: "false",
  //                   specificStateList1: "[]",
  //                   specificStateList2: "[]",
  //                   specificZipFlag: "false",
  //                   type: this.yrcCostPlusFactor[0].carrier,
  //                   factor: 'COSTPLUS'
  //                 }
  //                 yrcArray.push(object);
  //                 console.log('this.companyResponse[i].costPlusFactor yrcArray', yrcArray);
  //               }
  //             }
  //             let reddawayArray1 = [], reddawayArray2 = [], reddawayArray3 = [], reddawayArray4 = [];
  //             if (reddawayArray.length > 0) {
  //               if (reddawayArray.length > 0) {
  //                 reddawayArray1 = reddawayArray.filter(function(el){
  //                   return el.directions === 'REGIONAL DIRECT INTERSTATE';
  //                 });
  //                 reddawayArray2 = reddawayArray.filter(function(el){
  //                   return el.directions === 'REGIONAL DIRECT INTRASTATE';
  //                 });
  //                 reddawayArray3 = reddawayArray.filter(function(el){
  //                   return el.directions === 'REGIONAL INDIRECT';
  //                 });
  //                 reddawayArray4 = reddawayArray.filter(function(el){
  //                   return el.directions === 'SPECIAL RULES';
  //                 });
  //                 reddawayArray.push.apply(reddawayArray1);
  //                 reddawayArray.push.apply(reddawayArray2);
  //                 reddawayArray.push.apply(reddawayArray3);
  //                 reddawayArray.push.apply(reddawayArray4);
  //                 console.log('newFedexEconomyArray rules separation', reddawayArray, reddawayArray.length);
  //                 reddawayArray = reddawayArray.sort(function (a, b) {
  //                   if(a.category < b.category) { return -1; }
  //                   if(a.category > b.category) { return 1; }
  //                   return 0;
  //                 });
            
  //                 console.log('reddawayArray eco',reddawayArray);
  //               }
  //               for (let y = 0; y < reddawayArray.length; y++) {
  //                 if (this.reddawayCostPlusFactor.length > 0) {
  //                   reddawayArray[y].costPlusFactorNew = this.reddawayCostPlusFactor[0].factor;
  //                   reddawayArray[y].factor = 'AR';
  //                 } else {
  //                   reddawayArray[y].costPlusFactorNew = '';
  //                   reddawayArray[y].factor = 'AR';
  //                 }
  //               }
  //             } else {
  //               if (this.reddawayCostPlusFactor.length > 0) {
  //                 let object = {
  //                   category: "AR",
  //                   classRange: "",
  //                   classification: "",
  //                   companyId: "",
  //                   costPlusFactorNew: this.reddawayCostPlusFactor[0].factor,
  //                   directions: "",
  //                   discount: "",
  //                   fak: "[]",
  //                   fakRange: "[]",
  //                   id: "",
  //                   insideDelivery: "",
  //                   liftGate: "",
  //                   limitedAccessDelivery: "",
  //                   minCharge: "",
  //                   notify: "",
  //                   residential: "",
  //                   singleShipment: "",
  //                   specificCityList1: "[]",
  //                   specificCityList2: "[]",
  //                   specificStateFlag: "false",
  //                   specificStateList1: "[]",
  //                   specificStateList2: "[]",
  //                   specificZipFlag: "false",
  //                   type: this.reddawayCostPlusFactor[0].carrier,
  //                   factor: 'COSTPLUS'
  //                 }
  //                 reddawayArray.push(object);
  //                 console.log('this.companyResponse[i].costPlusFactor reddawayArray', reddawayArray);
  //               }
  //             }
  //             console.log('fedexEcoArray', fedexEcoArray);
  //             let array1 = [], array2 = [], array3 = [], array4 = [];
  //             if (fedexEcoArray.length > 0) {
  //               if (fedexEcoArray.length > 0) {
  //                 array1 = fedexEcoArray.filter(function(el){
  //                   return el.directions === 'INTER REGIONAL';
  //                 });
  //                 console.log('array1', array1);
  //                 array2 = fedexEcoArray.filter(function(el){
  //                   return el.directions === 'REGIONAL';
  //                 });
  //                 console.log('array2', array2);
  //                 array3 = fedexEcoArray.filter(function(el){
  //                   return el.directions === 'INTRASTATE';
  //                 });
  //                 console.log('array3', array3);
  //                 array4 = fedexEcoArray.filter(function(el){
  //                   return el.directions === 'SPECIAL RULES';
  //                 });
  //                 console.log('array4', array4);
  //                 fedexEcoArray.push.apply(array1);
  //                 fedexEcoArray.push.apply(array2);
  //                  fedexEcoArray.push.apply(array3);
  //                  fedexEcoArray.push.apply(array4);
  //                 console.log('newFedexEconomyArray rules separation', fedexEcoArray, fedexEcoArray.length);
  //                 fedexEcoArray = fedexEcoArray.sort(function (a, b) {
  //                   if(a.category < b.category) { return -1; }
  //                   if(a.category > b.category) { return 1; }
  //                   return 0;
  //                 });
            
  //                 console.log('Fedex eco',fedexEcoArray);
  //               }
  //               for (let y = 0; y < fedexEcoArray.length; y++) {
  //                 if (this.fedexEcoCostPlusFactor.length > 0) {
  //                   fedexEcoArray[y].costPlusFactorNew = this.fedexEcoCostPlusFactor[0].factor;
  //                   fedexEcoArray[y].factor = 'AR';
  //                 } else {
  //                   fedexEcoArray[y].costPlusFactorNew = '';
  //                   fedexEcoArray[y].factor = 'AR';
  //                 }
  //               }
  //             } else {
  //               if (this.fedexEcoCostPlusFactor.length > 0) {
  //                 let object = {
  //                   category: "AR",
  //                   classRange: "",
  //                   classification: "",
  //                   companyId: "",
  //                   costPlusFactorNew: this.fedexEcoCostPlusFactor[0].factor,
  //                   directions: "",
  //                   discount: "",
  //                   fak: "[]",
  //                   fakRange: "[]",
  //                   id: "",
  //                   insideDelivery: "",
  //                   liftGate: "",
  //                   limitedAccessDelivery: "",
  //                   minCharge: "",
  //                   notify: "",
  //                   residential: "",
  //                   singleShipment: "",
  //                   specificCityList1: "[]",
  //                   specificCityList2: "[]",
  //                   specificStateFlag: "false",
  //                   specificStateList1: "[]",
  //                   specificStateList2: "[]",
  //                   specificZipFlag: "false",
  //                   type: this.fedexEcoCostPlusFactor[0].carrier,
  //                   factor: 'COSTPLUS'
  //                 }
  //                 fedexEcoArray.push(object);
  //                 console.log('this.companyResponse[i].costPlusFactor fedexEcoArray', fedexEcoArray);
  //               }
  //             }
  //             let fedexPriInterRegionalArray = [],fedexPriRegionalArray = [], fedexPriIntrastateArray = [], fedexPriSpecialRules = [];
  //             if (fedexPriArray.length > 0) {
  //               if (fedexPriArray.length > 0) {
  //                 fedexPriInterRegionalArray = fedexPriArray.filter(function(el){
  //                   return el.directions === 'INTER REGIONAL';
  //                 });
  //                 fedexPriRegionalArray = fedexPriArray.filter(function(el){
  //                   return el.directions === 'REGIONAL';
  //                 });
  //                 fedexPriIntrastateArray = fedexPriArray.filter(function(el){
  //                   return el.directions === 'INTRASTATE';
  //                 });
  //                 fedexPriSpecialRules = fedexPriArray.filter(function(el){
  //                   return el.directions === 'SPECIAL RULES';
  //                 });
  //                 fedexPriArray.push.apply(fedexPriInterRegionalArray);
  //                 fedexPriArray.push.apply(fedexPriRegionalArray);
  //                 fedexPriArray.push.apply(fedexPriIntrastateArray);
  //                 fedexPriArray.push.apply(fedexPriSpecialRules);
  //                 console.log('newFedexEconomyArray rules separation', fedexPriArray, fedexPriArray.length);
  //                 fedexPriArray = fedexPriArray.sort(function (a, b) {
  //                   if(a.category < b.category) { return -1; }
  //                   if(a.category > b.category) { return 1; }
  //                   return 0;
  //                 });
            
  //                 console.log('Fedex eco',fedexPriArray);
  //               }              
  //               for (let y = 0; y < fedexPriArray.length; y++) {
  //                 if (this.fedexPriCostPlusFactor.length > 0) {
  //                   fedexPriArray[y].costPlusFactorNew = this.fedexPriCostPlusFactor[0].factor;
  //                   fedexPriArray[y].factor = 'AR';
  //                 } else {
  //                   fedexPriArray[y].costPlusFactorNew = '';
  //                   fedexPriArray[y].factor = 'AR';
  //                 }
  //               }
  //             } else {
  //               if (this.fedexPriCostPlusFactor.length > 0) {
  //                 let object = {
  //                   category: "AR",
  //                   classRange: "",
  //                   classification: "",
  //                   companyId: "",
  //                   costPlusFactorNew: this.fedexPriCostPlusFactor[0].factor,
  //                   directions: "",
  //                   discount: "",
  //                   fak: "[]",
  //                   fakRange: "[]",
  //                   id: 1865,
  //                   insideDelivery: "",
  //                   liftGate: "",
  //                   limitedAccessDelivery: "",
  //                   minCharge: "",
  //                   notify: "",
  //                   residential: "",
  //                   singleShipment: "",
  //                   specificCityList1: "[]",
  //                   specificCityList2: "[]",
  //                   specificStateFlag: "false",
  //                   specificStateList1: "[]",
  //                   specificStateList2: "[]",
  //                   specificZipFlag: "false",
  //                   type: this.fedexPriCostPlusFactor[0].carrier,
  //                   factor: 'COSTPLUS'
  //                 }
  //                 fedexPriArray.push(object);
  //                 console.log('this.companyResponse[i].costPlusFactor fedexPriArray', fedexPriArray);
  //               }
  //             }
  //           } else {
  //             if (this.yrcCostPlusFactor.length > 0) {
  //               let object = {
  //                 category: "AR",
  //                 classRange: "",
  //                 classification: "",
  //                 companyId: "",
  //                 costPlusFactorNew: this.yrcCostPlusFactor[0].factor,
  //                 directions: "",
  //                 discount: "",
  //                 fak: "[]",
  //                 fakRange: "[]",
  //                 id: "",
  //                 insideDelivery: "",
  //                 liftGate: "",
  //                 limitedAccessDelivery: "",
  //                 minCharge: "",
  //                 notify: "",
  //                 residential: "",
  //                 singleShipment: "",
  //                 specificCityList1: "[]",
  //                 specificCityList2: "[]",
  //                 specificStateFlag: "false",
  //                 specificStateList1: "[]",
  //                 specificStateList2: "[]",
  //                 specificZipFlag: "false",
  //                 type: this.yrcCostPlusFactor[0].carrier,
  //                 factor: 'COSTPLUS'
  //               }
  //               yrcArray.push(object);
  //             }
  //             if (this.reddawayCostPlusFactor.length > 0) {
  //               let object = {
  //                 category: "AR",
  //                 classRange: "",
  //                 classification: "",
  //                 companyId: "",
  //                 costPlusFactorNew: this.reddawayCostPlusFactor[0].factor,
  //                 directions: "",
  //                 discount: "",
  //                 fak: "[]",
  //                 fakRange: "[]",
  //                 id: "",
  //                 insideDelivery: "",
  //                 liftGate: "",
  //                 limitedAccessDelivery: "",
  //                 minCharge: "",
  //                 notify: "",
  //                 residential: "",
  //                 singleShipment: "",
  //                 specificCityList1: "[]",
  //                 specificCityList2: "[]",
  //                 specificStateFlag: "false",
  //                 specificStateList1: "[]",
  //                 specificStateList2: "[]",
  //                 specificZipFlag: "false",
  //                 type: this.reddawayCostPlusFactor[0].carrier,
  //                 factor: 'COSTPLUS'
  //               }
  //               reddawayArray.push(object);
  //               console.log('this.companyResponse[i].costPlusFactor reddawayArray', reddawayArray);
  //             }
  //             if (this.fedexEcoCostPlusFactor.length > 0) {
  //               let object = {
  //                 category: "AR",
  //                 classRange: "",
  //                 classification: "",
  //                 companyId: "",
  //                 costPlusFactorNew: this.fedexEcoCostPlusFactor[0].factor,
  //                 directions: "",
  //                 discount: "",
  //                 fak: "[]",
  //                 fakRange: "[]",
  //                 id: "",
  //                 insideDelivery: "",
  //                 liftGate: "",
  //                 limitedAccessDelivery: "",
  //                 minCharge: "",
  //                 notify: "",
  //                 residential: "",
  //                 singleShipment: "",
  //                 specificCityList1: "[]",
  //                 specificCityList2: "[]",
  //                 specificStateFlag: "false",
  //                 specificStateList1: "[]",
  //                 specificStateList2: "[]",
  //                 specificZipFlag: "false",
  //                 type: this.fedexEcoCostPlusFactor[0].carrier,
  //                 factor: 'COSTPLUS'
  //               }
  //               fedexEcoArray.push(object);
  //               console.log('this.companyResponse[i].costPlusFactor fedexEcoArray', fedexEcoArray);
  //             }
  //             if (this.fedexPriCostPlusFactor.length > 0) {
  //               let object = {
  //                 category: "AR",
  //                 classRange: "",
  //                 classification: "",
  //                 companyId: "",
  //                 costPlusFactorNew: this.fedexPriCostPlusFactor[0].factor,
  //                 directions: "",
  //                 discount: "",
  //                 fak: "[]",
  //                 fakRange: "[]",
  //                 id: 1865,
  //                 insideDelivery: "",
  //                 liftGate: "",
  //                 limitedAccessDelivery: "",
  //                 minCharge: "",
  //                 notify: "",
  //                 residential: "",
  //                 singleShipment: "",
  //                 specificCityList1: "[]",
  //                 specificCityList2: "[]",
  //                 specificStateFlag: "false",
  //                 specificStateList1: "[]",
  //                 specificStateList2: "[]",
  //                 specificZipFlag: "false",
  //                 type: this.fedexPriCostPlusFactor[0].carrier,
  //                 factor: 'COSTPLUS'
  //               }
  //               fedexPriArray.push(object);
  //               console.log('this.companyResponse[i].costPlusFactor fedexPriArray', fedexPriArray);
  //             }
  //           }
  //         this.companyResponse[i].BusinessRulesNew = [];
         
  //         if (fedexEcoArray.length > 0) {
  //           this.companyResponse[i].BusinessRulesNew.push.apply(this.companyResponse[i].BusinessRulesNew, fedexEcoArray); 
  //         }
  //         if (fedexPriArray.length > 0) {
  //           this.companyResponse[i].BusinessRulesNew.push.apply(this.companyResponse[i].BusinessRulesNew, fedexPriArray);
           
  //           console.log('this.companyResponse before', this.companyResponse[i].BusinessRulesNew);
  //         }
  //         if (yrcArray.length > 0) {
  //           this.companyResponse[i].BusinessRulesNew.push.apply(this.companyResponse[i].BusinessRulesNew, yrcArray);
  //         }
  //         if (reddawayArray.length > 0) {
  //           this.companyResponse[i].BusinessRulesNew.push.apply(this.companyResponse[i].BusinessRulesNew, reddawayArray);
  //         }
       
  //       this.showNoRecordsFound = false;
  //       for (let i = 0; i < this.companyResponse.length; i++) {
  //         console.log('this.companyResponse After', this.companyResponse[i].BusinessRulesNew);
  //         // this.companyResponse[i].BusinessRulesNew = this.companyResponse[i].BusinessRulesNew.sort('type');
  //         console.log('this.companyResponse After New', this.companyResponse[i].BusinessRulesNew);
  //         for (let j = 0; j < this.companyResponse[i].BusinessRulesNew.length; j++) {

  //           if (this.companyResponse[i].BusinessRulesNew[j].specificStateFlag === 'true') {
  //             this.companyResponse[i].BusinessRulesNew[j].specificStateList1 = JSON.parse(this.companyResponse[i].BusinessRulesNew[j].specificStateList1);
  //             this.companyResponse[i].BusinessRulesNew[j].specificStateList2 = JSON.parse(this.companyResponse[i].BusinessRulesNew[j].specificStateList2);
  //             this.companyResponse[i].BusinessRulesNew[j].specificCityList1 = JSON.parse(this.companyResponse[i].BusinessRulesNew[j].specificCityList1);
  //             this.companyResponse[i].BusinessRulesNew[j].specificCityList2 = JSON.parse(this.companyResponse[i].BusinessRulesNew[j].specificCityList2);
  //           } else {

  //           }
  //         }
  //       }
  //     }
  //    } else {
  //      console.log('else part');
  //       this.enableRemoveIcon = false;
  //       this.showNoRecordsFound = true;
  //       this.showCustomerTable = false;
  //       this.showRefreshFlag = false;
  //     }
  //   });
  // }

  // viewMore(businessRule) {
  //   this.viewFakArray = [];
  //   const fakRange = JSON.parse(businessRule.fakRange);
  //   const fak = JSON.parse(businessRule.fak);
  //   if (fakRange.length === 0 || fak.length === 0) {
  //     this.viewFakArray = [];
  //     this.showViewFAKValues = false;
  //   } else {
  //     for (let f = 0; f < fakRange.length; f++) {
  //       const data = fakRange[f].split('-');
  //       const data1 = data[0];
  //       const data2 = data[1];
  //       const fakData = fak[f];
  //       const fakValue = { fakRangeFrom: data1, fakRangeTo: data2, fakValue: fakData };
  //       this.viewFakArray.push(fakValue);
  //       this.showViewFAKValues = true;
  //     }
  //     if (this.viewFakArray.length > 0) {
  //       this.showFak = true;
  //     } else {
  //       this.showFak = false;
  //     }
  //   }
  // }

  savecontractdetails() {
    let name = 'FTL_' + this.companyDetails.companyName +'_' + this.firstDate;
    let object = {
      "companyId": this.companyDetails.id,
      "contractName":name ,
      "contractPersion": this.shippingManagerName,
      "contractPosition": this.shippingManagerPost,
      "contractAddress": this.contractAddrss,
      "paymentTerms": this.companyDetails.paymentTerms
    }
    this.invoiceService.saveContract(object).subscribe((data:any) => {
      console.log(data);
      if (data.result !== false) {
        this.toastr.success('Contract has been created successfully!');

        // swal("Contract has been created successfully ", {
        //   icon: "success",
        // });
        this.router.navigate(['/customerInfoworkbook'])

      } else {
        this.toastr.error('Contract is not created. Do it again');

        // swal("Contract is not created. Do it again", {
        //   icon: "error",
        // })
      }
    })
  }

  onboardingCustomer() {
    let apiObject = {
      'companyId': this.companyDetails.id,
      'rules' : [],
      'costPlus' : false,
      'costPlusFactor': []
    }
    this.invoiceService.approveCompanyRules(apiObject).subscribe((res: any)=> {
      if(res.result) {
        this.router.navigate(['/customerInfoworkbook'])

      }
    });

  }
}
