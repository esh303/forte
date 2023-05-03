import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { classArray } from '../app.constant';
import { PricingInfoService } from '../services/pricing-info.service';
import { InvoiceService } from '../services/invoice.service';
import { increasePercentForAR } from '../app.constant';
declare var $: any;
// import * as moment from 'moment';
// import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ChatService } from '../services/chat.service';
import { WebSocketService } from '../services/web-socket.service';
import { NgxSpinnerService } from 'ngx-spinner';
// import { el } from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-trafficdatanew',
  templateUrl: './trafficdatanew.component.html',
  styleUrls: ['./trafficdatanew.component.css']
})
export class TrafficdatanewComponent implements OnInit {
  invoiceForm: FormGroup = new FormGroup({});
  multiclassForm : FormGroup = new FormGroup({});
  classArray:any = classArray;
  zipcodeResponse: any;
  userData: any;
  p = 1;
  AccessList: any;
  public numberOfPages = [5, 10, 15];
  responseObject: any;
  companyInformation: any;
  zipCodeErrorResponseForDestination = false;
  zipCodeErrorResponseForOrigin = false;
  public shipmentDateValue: any;
  disableAnalyticsButton = false;
  carrierArray = ['YRC', 'FEDEX_FREIGHT_ECONOMY', 'FEDEX_FREIGHT_PRIORITY', 'REDDAWAY'];

  colorPicker = 'theme-default';
  public headerDetailForShipment: any;

  assessorialNames = [
    // { 'id': 1, 'itemName': 'LiftGate Service', 'name': 'LG', 'Yrccost': '8.80', 'Fedexcost': '72.06' },
    // { 'id': 2, 'itemName': 'Residential Delivery', 'name': 'RD', 'Yrccost': '11', 'Fedexcost': '76' },
    // { 'id': 3, 'itemName': 'Limited Access Delivery', 'name': 'LA', 'Yrccost': '0', 'Fedexcost': '76' },
    // { 'id': 4, 'itemName': 'Inside Delivery', 'name': 'ID', 'Yrccost': '11.85', 'Fedexcost': '6.98', 'FedexcostAR': '11.40' },
    // { 'id': 5, 'itemName': 'Notify', 'name': 'NTFY', 'Yrccost': '0', 'Fedexcost': '0' },
    // // { 'id': 6, 'itemName': 'High Cost', 'name': 'HC', 'Yrccost': '0', 'Fedexcost': '0' },
    // { 'id': 7, 'itemName': 'Single Shipment', 'name':'SS', 'Yrccost': '0', 'Fedexcost': '0' },
    // {'id': 8, 'itemName': 'Delivery Appointment Required', 'name': 'DAR', 'Yrccost': '0', 'Fedexcost': '0'},
    // {'id': 9, 'itemName': 'Others', 'name': 'OC', 'Yrccost': '0','Fedexcost': '0'}
    { 'id': 1, 'itemName': 'LiftGate PickUp', 'name': 'LGP', 'Yrccost': '8.80', 'Fedexcost': '72.06' },
    { 'id': 2, 'itemName': 'Residential PickUp', 'name': 'RDP', 'Yrccost': '11', 'Fedexcost': '76' },
    { 'id': 3, 'itemName': 'Limited Access PickUp', 'name': 'LAP', 'Yrccost': '0', 'Fedexcost': '76' },
    { 'id': 4, 'itemName': 'Inside Delivery', 'name': 'ID', 'Yrccost': '11.85', 'Fedexcost': '6.98', 'FedexcostAR': '11.40' },
    { 'id': 5, 'itemName': 'Notify', 'name': 'NTFY', 'Yrccost': '0', 'Fedexcost': '0' },
    // { 'id': 6, 'itemName': 'High Cost', 'name': 'HC', 'Yrccost': '0', 'Fedexcost': '0' },
    { 'id': 0, 'itemName': 'Single Shipment', 'name':'SS', 'Yrccost': '0', 'Fedexcost': '0' },
    { 'id': 7, 'itemName': 'Delivery Appointment Required', 'name': 'DAR','Yrccost': '0', 'Fedexcost':'0'},
    {'id':8, 'itemName':'HazMat', 'Yrccost': '0',  'name': 'HT','Fedexcost':'0'},
    {'id': 9, 'itemName': 'Others', 'name': 'OC', 'Yrccost': '0','Fedexcost': '0'},
    { 'id': 10, 'itemName': 'LiftGate Delivery','name': 'LGD', 'Yrccost': '8.80', 'Fedexcost': '72.06' },
    { 'id': 11, 'itemName': 'Residential Delivery', 'name': 'RDD', 'Yrccost': '11', 'Fedexcost': '76' },
    { 'id': 12, 'itemName': 'Limited Access Delivery',  'name': 'LAD','Yrccost': '0', 'Fedexcost': '76' },
  
  ];
  maxDate = new Date();
  outBoundArray: any = [];
  inBoundArray: any = [];
  itemArray:any = [];
  parseSetMasterData: any;
  localStorageArData: any;
  weightForCal: any;
  selectedItems: any = [];
  arrayData: any;
  allShipmentsRateArray = [];
  public increasedValueForAR = Number(increasePercentForAR);
  finalRateCharge: any;
  resultArray: any;
  showLoader = false;
  loader = false;
  forteCarrier:any;
  resultForPriorityArray: any = [];
  resultForReddawayArray: any = [];
  resultForYRCArray: any = [];
  indexForArray: any;
  companyDetails;
  accessToken:any;
  loginDetails: any;
  public invoiceDetails = {};
  assessorialArray: any = [];
  showAccessorials = false;
  showErrorMessageForClass = false;
  showTableForViewAssessorials = false;
  updateFlag = false;
  editIndex: any;
  newArray: any = [];
  messagesArr: any = [];
  socketDataBoolean = false;
  processingLoader = false;
  completedLoader = false;
  viewAssessorialArray: any;
  uploadedData: any;
  public selectPagination: any;
  public numberPerPage = 10;
  public totalItems: any;
  formattedArray: any = [];
  trafficDataEnableSubscriber: Subscription = new Subscription;
  selectedAnalyticsCodeData: any;
  trafficManualFlow = false;
  newTrafficDataArray: any = [];
  socketDataSubscriber: Subscription = new Subscription;
  socketData: any;
  invalidInputData: any = [];
  enableTable = false;
  selectedCarrier:any;
  responseLength: any;
  trafficDataEnable: any;
  validatingArray = [];
  showOtherAccessorial = false;
  iterator = 0;
  multiclassTable:any = [];
  errorMessageForWeightCount: any = false;
  totalHeaderWeight: any;
  totalWeightForPieces:any= 0;
  showWeightVarianceMsg:any = '';
  weightEntered = false;
  constructor(
    private fb: FormBuilder,
    private pricingInfoService: PricingInfoService,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router, 
    private datePipe: DatePipe,
    private chat: ChatService,
    private wsService: WebSocketService, 
    private spinner: NgxSpinnerService) {
      this.companyDetails = this.invoiceService.getCompanyInformation1();
      console.log('this.companyDetails initialization', this.companyDetails);
  }

  ngOnInit() {
    this.accessToken = localStorage.getItem('accessToken');
    let details: any = localStorage.getItem(('SalesRepName'));
    this.loginDetails = JSON.parse(details);
    console.log('this.loginDetails', this.loginDetails);
    this.companyDetails = this.invoiceService.getCompanyInformation1();
    console.log('this.companyDetails initialization', this.companyDetails);
    this.buildForm();
    if (this.companyDetails !== null && this.companyDetails !== undefined) {
    this.trafficDataEnableSubscriber = this.invoiceService.trafficDataEnableObservable.subscribe((response) => {
      console.log(response);
      this.trafficDataEnable = response;
      if(response !== null && response !== undefined) {
        this.selectedCarrier = response.forteCarrier;
        this.itemArray = response.values;
        for (let i = 0;i < this.itemArray.length; i++) {
          this.itemArray[i].slNo = i + 1;
          if (this.itemArray[i].classWeight === undefined) {
            let classAndWeightArray = [];

            classAndWeightArray.push({ classification: this.itemArray[i].class, weight: this.itemArray[i].weight });
            this.itemArray[i].classWeight = classAndWeightArray
          }
         
        }
        this.newTrafficDataArray = response.values;
        console.log(this.newTrafficDataArray );
      } else {
        this.itemArray = [];
      }
    });
    // this.itemArray = [];
    this.uploadedData = this.invoiceService.getUploadedData();
    console.log(this.uploadedData);
    if (this.uploadedData !== null && this.uploadedData !== undefined && this.uploadedData !== '') {
      // this.uploadedData.forEach((element,index) => {

      // })
      this.AccessList = this.uploadedData[0].Accesslist;
console.log('1test', this.AccessList);

    this.validatingArray = this.uploadedData;
    this.validatingArray.forEach((element, index) => {
      // this.loader  = true;
      this.validateRows(element, index);
//       this.AccessList = this.validatingArray[0].AccessList;
// console.log('1test', this.AccessList);
    });
//     this.AccessList = this.itemArray[0].AccessList;
// console.log('1test', this.AccessList);

    for (let i = 0;i < this.itemArray.length; i++) {
      let classAndWeightArray = [];

      this.itemArray[i].slNo = i + 1;
      // classAndWeightArray.push({ classification: this.itemArray[i].class, weight: this.itemArray[i].weight });
      classAndWeightArray.push({ classification: this.itemArray[i].class, weight: this.itemArray[i].weight.replace(/[^0-9]/g, '') });

      this.itemArray[i].classWeight = classAndWeightArray
    }
    console.log('ItemArrayq',this.itemArray)
    } 
    // else {
    //   this.itemArray = [];
      
    // }
    let iterationArray;
    this.selectedAnalyticsCodeData = this.invoiceService.getSelectedAnalyticsCode();
          console.log('this.itemArray If', this.selectedAnalyticsCodeData);
          if(this.selectedAnalyticsCodeData !== undefined && this.selectedAnalyticsCodeData.filterValue !== ''){
            // this.loader = true;
            this.invoiceService.getSelectedCodeInvoice(this.selectedAnalyticsCodeData.analyticsId).subscribe((res: any)=> {
              console.log(res);
              if(res[0].companyInvoice.rateResponse === null) {
                console.log('sta');
                this.uploadedData = res;
                iterationArray = res;
              let newArrayData:any = [];
              // let multiclassValue;
              iterationArray.forEach((element: any) => {
                let object = element.companyInvoice;
                if (object.pieces !== null ) {
                  object.pallets = object.pieces;
                  // object.pallets = object.pieces;
                }
                if (object.originCity === null) {
                this.pricingInfoService.getCityState(object.originZip).subscribe((response:any) => {
                  object.originCity = response[0].city;
                  // this.invoiceForm.patchValue({ originCity: this.zipcodeResponse[0].city, originState: this.zipcodeResponse[0].state });

                });
              }
              if (object.destinationCity === null) {
                this.pricingInfoService.getCityState(object.destinationZip).subscribe((response:any) => {
                  object.destinationCity = response[0].city;
                  // this.invoiceForm.patchValue({ originCity: this.zipcodeResponse[0].city, originState: this.zipcodeResponse[0].state });

                });
              }
                if (object.classWeight !== null) {
                  let x: string = object.classWeight[0].classification.toString();

                  for (let i = 1; i < object.classWeight.length; i++) {
                    x += "," + object.classWeight[i].classification;
                  }
                  // multiclassValue = x;
                  object.class = x;

                  let y: string = object.classWeight[0].weight.toString();
                  let changedWeight = y.replace(/[^0-9]/g, '');
                  console.log(changedWeight);
                  for (let i = 1; i < object.classWeight.length; i++) {
                    y += "," + object.classWeight[i].weight;
                  }
                  // multiclassValue = x;
                  object.weight = changedWeight
                }
                newArrayData.push(object);

              });
              this.itemArray = newArrayData;

                this.selectedAnalyticsCodeData = undefined;
                let passingObject = undefined
                this.invoiceService.setAnalyticsCode(passingObject);
              } else {

              
              iterationArray = res;
              let newArrayData: any = [];
              // let multiclassValue;
              iterationArray.forEach((element: any) => {
                let object = element.companyInvoice;
                if (object.originCity === null) {
                  this.pricingInfoService.getCityState(object.originZip).subscribe((response:any) => {
                    object.originCity = response[0].city;
                    // this.invoiceForm.patchValue({ originCity: this.zipcodeResponse[0].city, originState: this.zipcodeResponse[0].state });
  
                  });
                }
                if (object.destinationCity === null) {
                  this.pricingInfoService.getCityState(object.destinationZip).subscribe((response:any) => {
                    object.destinationCity = response[0].city;
                    // this.invoiceForm.patchValue({ originCity: this.zipcodeResponse[0].city, originState: this.zipcodeResponse[0].state });
  
                  });
                }
                object.selected = element.selected;
                object.forteResponse = element.forteResponse;
                object.rules = element.rules;
                object.forteCarrier = element.carrier
                console.log(object);
                if (object.classWeight !== null) {
                  let x: string = object.classWeight[0].classification.toString();

                  for (let i = 1; i < object.classWeight.length; i++) {
                    x += "," + object.classWeight[i].classification;
                  }
                  // multiclassValue = x;
                  object.class = x;

                  let y: string = object.classWeight[0].weight.toString();
                  let changedWeight = y.replace(/[^0-9]/g, '');
                  console.log(changedWeight);
                  for (let i = 1; i < object.classWeight.length; i++) {
                    y += "," + object.classWeight[i].weight;
                  }
                  // multiclassValue = x;
                  object.weight =changedWeight 
                }

                newArrayData.push(object);
console.log(object);
              });
console.log(newArrayData);

              this.itemArray = newArrayData;
            }
              for (let i = 0;i < this.itemArray.length; i++) {
                this.itemArray[i].slNo = i + 1;
              }
             console.log(this.itemArray);
            });
          }
        }
  }

  validateRows(element: any, index: any) {
    if (element.shipmentDate === null) {
      element.shipmentDate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
    } else {
    if (index === 'manual') {
      element.slNo = this.itemArray.length + 1;
    }
    console.log(element);
    if (new Date(element.shipmentDate)) {
      // console.log(element);
      element.invalidDate = false;
    } else {
      element.invalidDate = true;
      // console.log(element.shipmentDate)
    }
  }
  this.validateOriginZip(element);

  }
  validateOriginZip(element:any) {
    console.log(element);
    const numbers = new RegExp(/^[0-9]+$/);
    if (numbers.test(element.originZip)) {
      console.log(element.originZip);
      if (element.originZip.length === 5) {
        this.invoiceService.validateZip(element.originZip).subscribe((res:any) => {
          if(res.length > 0) {
            element.invalidOriginZip = false;

          } else {
            element.invalidOriginZip = true;

          }
        })
      } else {
        element.invalidOriginZip = true;
      }

    } else {
      console.log('enteer numbers ');
      element.invalidOriginZip = true;
    }
    this.validateDestinationZip(element);
    // this.itemArray.push(element);

  }
  validateDestinationZip(element:any) {
    console.log(element);
    const numbers = new RegExp(/^[0-9]+$/);
    if (numbers.test(element.destinationZip)) {
      console.log(element.destinationZip);
      if (element.destinationZip.length === 5) {
        this.invoiceService.validateZip(element.destinationZip).subscribe((res:any) => {
          if(res.length > 0) {
            element.invalidDestinationZip = false;

          } else {
            element.invalidDestinationZip = true;

          }
        })
      } else {
        element.invalidDestinationZip = true;
      }

    } else {
      console.log('enteer numbers ');
      element.invalidDestinationZip = true;
    }
    this.validateoriginState(element);
    }
  validateoriginState(element:any) {
    const numbers = new RegExp(/^[A-Z]+$/);
    if (element.originState !== undefined ) {
   if (element.originState.length === 2) {
    if (numbers.test(element.originState)) {
      element.invalidoriginState = false;

    } else {
      element.invalidoriginState = true;
    }
   } else {
      element.invalidoriginState = true;
    }
  } else {
    element.invalidoriginState = true;

  }
    console.log('state',(element));
    this.validatedestinationState(element);
    }
    validatedestinationState(element:any) {
      const numbers = new RegExp(/^[A-Z]+$/);
      if (element.destinationState !== undefined) {
      if (element.destinationState.length === 2) {
       if (numbers.test(element.destinationState)) {
         element.invaliddestinationState = false;
   
       } else {
         element.invaliddestinationState = true;
       }
      } else {
         element.invaliddestinationState = true;
       }
      } else {
        element.invaliddestinationState = true;

      }
       console.log('destination',(element));

       this.validateClass(element);
      }

  validateClass(element: any) {
   element.invalidClass = this.classArray.includes(Number(element.class));

console.log(element.invalidClass);
this.validateWeight(element);
  }
  validateWeight(element: any) {
    
    if(typeof element.weight === 'string') {
      // if (element.weight.includes(',')) {
      //   let weight = element.weight;
      //   console.log(weight);
      //   element.weight = weight.replace(',', '');
      //   console.log(element.weight);
  
      // } else {
        element.weight  = element.weight;
      // }
    } else {
      let tempweight = element.weight;
      console.log(tempweight);
      element.weight = tempweight.toString();
      console.log(element);
      if (element.weight.includes(',')) {
        let weight = element.weight;
        console.log(weight);
        element.weight = weight.replace(',', '');
        console.log(element.weight);
  
      } else {
        element.weight  = element.weight;
      }
    }
  
    
    this.validateInvoiceAmount(element);

  }
  validateInvoiceAmount(element: any) {
    let invoiceAmountValidate
    if (element.invoiceAmount.includes('$')) {
      invoiceAmountValidate = element.invoiceAmount.split('$');
    } else {
      invoiceAmountValidate = element.invoiceAmount;

    }
    console.log('invoice', invoiceAmountValidate);
    const numbersInvoice = new RegExp(/^[0-9.]+$/);
    if (numbersInvoice.test(invoiceAmountValidate)) {
      element.invalidInvoiceAmount = false;
      console.log(element.invoiceAmount);
    } else {
      element.invalidInvoiceAmount = true;

    }
    console.log(this.editIndex);
    if (this.editIndex === undefined) {
      this.itemArray.push(element);
    } else {
      this.itemArray[this.editIndex] = element;
    }
    this.validateShipmentDate(element);

  }
  validateShipmentDate(element:any) {
    console.log('shipmentDate',element);
    // let iterator = 0;
    this.iterator = this.iterator + 1;
    const datePattern = new RegExp(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/);
    if (datePattern.test(element.shipmentDate)) {
      console.log(new Date());
      console.log(new Date(element.shipmentDate));
      if (new Date() > new Date(element.shipmentDate)) {
         element.invalidShipmentDate = false;
      } else {
        element.invalidShipmentDate = true;
      }
    } else {
      element.invalidShipmentDate = true;
    //   if (new Date() > new Date(element.shipmentDate)) {
    //     element.invalidShipmentDate = false;
    //  } else {
    //    element.invalidShipmentDate = true;
    //  }
    }
  this.validateAccess(element);
  }
  validateAccess(element: any) {
    console.log(element);
    let totalAcess = 0;
    if(element.assessorial.length > 0) {
      console.log('1test',element);
console.log('1test',this.AccessList);
      // element.assessorialCharge = 0;
      if (this.AccessList !== undefined) {
        console.log('1test',this.AccessList);

      // this.AccessList.forEach((el) => {
        element.assessorial.forEach((re:any) => {
          let exp = this.AccessList.find((mm: any) => mm.name === re.shortName);
          console.log('1test',exp);
          if (exp !== undefined) {

            console.log(exp , re);
            re.charge = exp.charge;
            console.log(exp , re);


          }
          totalAcess = Number(totalAcess) + Number(re.charge);
           element.assessorialCharge = totalAcess.toString();

          // if(el.name === re.shortName) {
          //   re.charge = el.charge;
          //   // element.assessorialCharge = element.assessorialCharge + re.charge;

          // }
        })
      // })
    }
    }
  }

  selectRanges(selectPagination: any) {
    this.numberPerPage = Number(selectPagination);
  }

  buildForm() {
    this.invoiceForm = this.fb.group({
      customerId: [''],
      salesRepId: [''],
      carrier: ['', Validators.required],
      forteCarrier: ['', Validators.required],
      typeOfInvoice: ['Out Bound'],
      originZip: [''],
      originCity: [''],
      originState: [''],
      destinationZip: [''],
      destinationcity: [''],
      destinationState: [''],
      pallets: ['',Validators.required],
      class: ['',Validators.required],
      weight: ['',Validators.required],
      fuelCharge: [''],
      invoiceAmount: [''],
      shipmentDate: [''],
      assessorial: [''],
      assessorialCharge: [''],
      otherassessorial: [''],
      otherassessorialCharge: [''],
      multiclass: [false]
    });
    this.multiclassForm = this.fb.group({
      classification : [''],
      multiclassweight : [''],
      weightEnter : ['']

    });
    (document.getElementById('shipmentDate')as HTMLFormElement).focus();
    (<HTMLInputElement>document.getElementById("shipmentDate")).focus;
    if (this.companyDetails !== null && this.companyDetails!== undefined) {
      this.invoiceForm.patchValue({
        customerId: this.companyDetails.companyName
      });
    } else {
      this.invoiceForm.patchValue({
        customerId: ''
      });
    }
    // this.fetchCompanyInvoice();
  }
  checkForCarrier(value: any) {
    this.invoiceForm.patchValue({
      forteCarrier: value
    });
    console.log(value, this.invoiceForm.value);
  }
  submitCarrier() {
    console.log(this.socketData);
    this.selectedCarrier = this.invoiceForm.value.forteCarrier;
    if (this.uploadedData !== undefined && this.uploadedData !== null && this.uploadedData !== '') {
      console.log('SockeT On');
      $('#carrierModal').modal('hide');
      // this.loader = true;
            this.fetchCompanyInvoice();
    } else {
      $('#carrierModal').modal('hide');
      this.fetchCompanyInvoice();


    }  }

  fetchCompanyInvoice() {
    if (this.companyDetails !== null && this.companyDetails !== undefined) {
      // this.loader = true;
      let resultlength = 0;
      this.newTrafficDataArray = [];

      if (this.itemArray !== undefined) {
        this.itemArray.forEach((element: any) => {
          element.forteCarrier = this.invoiceForm.value.forteCarrier;
          // this.selectedCarrier = this.invoiceForm.value.forteCarrier;
          console.log(element);
          let classAndWeightArray: any =[];
          for (let i = 0;i < element.classWeight.length;i ++) {
            let weight = element.classWeight[i].weight.toString();
            let changedWeight = weight.replace(/[^0-9]/g, '');
            element.classWeight[i].weight = changedWeight;
            // classAndWeightArray.push({ classification: element.class, weight:changedWeight });
            // element.classWeight = classAndWeightArray
          }
          this.loader = true;
          // this.itemArray.forEach((mm) => {
            // let classAndWeightArray =[];
            if (element.classWeight === null) {
              console.log(element);
              // classAndWeightArray.push({ classification: element.class, weight: element.weight });
              let changedWeight = element.weight.replace(/[^0-9]/g, '');
              classAndWeightArray.push({ classification: element.class, weight:changedWeight });
              element.classWeight = classAndWeightArray
    
            }
            console.log(element);
            // if (element.originCity === undefined) {
            //   this.pricingInfoService.getCityState(element.originZip).subscribe(response => {
            //     console.log(response);
            //   });
            // }
          
          // this.spinner.show();
            // let apiArray = [];
            // element.forEach((obj) => {
            //   if (obj)
            // })
            if (element.originCity === undefined) {
              this.pricingInfoService.getCityState(element.originZip).subscribe(response => {
          this.invoiceService.saveUploadedInvoiceNew(element).subscribe((res: any) => {
            console.log(res);
            // this.loader = false;
            resultlength = resultlength + 1;
            this.responseLength = resultlength;
            this.processingLoader = true;
            let temporaryResponse;
            if (res.result !== 'Validation Error' && res.result !== 'Invoice Data Empty' && res.result !== 'Invalid Class' && res.result !== 'false') {
              console.log(res.result);
              temporaryResponse = res.result;
              console.log('carrier', this.invoiceForm.value.forteCarrier);
              if (this.invoiceForm.value.forteCarrier === 'YRC') {
                temporaryResponse.yrcRules = temporaryResponse.rules;
              } else  if (this.invoiceForm.value.forteCarrier === 'REDDAWAY') {
                temporaryResponse.reddawayRules = temporaryResponse.rules;
              } else  if (this.invoiceForm.value.forteCarrier === 'FEDEX_FREIGHT_ECONOMY') {
                temporaryResponse.economyRules = temporaryResponse.rules;
              } else  if (this.invoiceForm.value.forteCarrier === 'FEDEX_FREIGHT_PRIORITY') {
                temporaryResponse.priorityRules = temporaryResponse.rules;
              }
              this.newTrafficDataArray.push(temporaryResponse);
              this.newTrafficDataArray.sort(function(a: any, b: any) { 
                return a.slNo - b.slNo;
              })
            } else {
              element.createdOn = this.getValidTimeZone(new Date());
              this.invalidInputData.push(element);

            }
            console.log('condition', resultlength, this.itemArray.length);
            if (resultlength === this.itemArray.length) {
              let passingObject = {
                carrier: this.selectedCarrier,
                values: this.newTrafficDataArray,
                invalidData: this.invalidInputData,
                
              }
              this.invoiceService.setTrafficDataEnable(passingObject);
              this.invoiceService.setTrafficData(passingObject);
              let object = '';
              this.invoiceService.setSocketData(object);
              // this.loader = false;
              this.processingLoader = false;
              this.loader = false;

              this.spinner.hide();

              this.router.navigate(['/carrierAnalytics']);
            }
          });
        });
      } else {
        this.invoiceService.saveUploadedInvoiceNew(element).subscribe((res: any) => {
          console.log(res);
          // this.loader = false;
          resultlength = resultlength + 1;
          this.responseLength = resultlength;
          this.processingLoader = true;
          let temporaryResponse;
          if (res.result !== 'Validation Error' && res.result !== 'Invoice Data Empty' && res.result !== 'Invalid Class' && res.result !== 'false') {
            console.log(res.result);
            temporaryResponse = res.result;
            console.log('carrier', this.invoiceForm.value.forteCarrier);
            let xxx = JSON.parse(res.result.rateResponse);

            if (this.invoiceForm.value.forteCarrier === 'YRC') {
              temporaryResponse.yrcRules = temporaryResponse.rules;
            } else  if (this.invoiceForm.value.forteCarrier === 'REDDAWAY') {
              temporaryResponse.reddawayRules = temporaryResponse.rules;
            } else  if (this.invoiceForm.value.forteCarrier === 'FEDEX_FREIGHT_ECONOMY') {
              temporaryResponse.economyRules = temporaryResponse.rules;
            } else  if (this.invoiceForm.value.forteCarrier === 'FEDEX_FREIGHT_PRIORITY') {
              temporaryResponse.priorityRules = temporaryResponse.rules;
            }
            console.log('xxxxxx',xxx.yrcAp);
            if (this.invoiceForm.value.forteCarrier === 'YRC' && xxx.yrcAp === false) {
              this.invalidInputData.push(element);

            } else {
            this.newTrafficDataArray.push(temporaryResponse);
            this.newTrafficDataArray.sort(function(a: any, b: any) { 
              return a.slNo - b.slNo;
            })
          }
          } else {
            element.createdOn = this.getValidTimeZone(new Date());
            this.invalidInputData.push(element);

          }
          console.log('condition', resultlength, this.itemArray.length);
          if (resultlength === this.itemArray.length) {
            let passingObject = {
              carrier: this.selectedCarrier,
              values: this.newTrafficDataArray,
              invalidData: this.invalidInputData
            }
            this.invoiceService.setTrafficDataEnable(passingObject);
            this.invoiceService.setTrafficData(passingObject);
            let object = '';
            this.invoiceService.setSocketData(object);
            // this.loader = false;
            this.processingLoader = false;
            this.loader = false;

            this.spinner.hide();

            this.router.navigate(['/carrierAnalytics']);
          }
        });
      }
        });
      }
    }
  }
  
  getValidTimeZone(date: any) {
    if (date !== undefined) {
      if (date.toString().endsWith('Z')) {
        return new Date(date.trim().split('Z')[0]);
      } else {
        return date;
      }
    }
  }
  assessorialName(value: any) {
    console.log('value', value);
  }
  addAssessorials(formValue: any) {
    console.log('formValue', formValue);
    let object = {};
    let newArray = [], chargeForAssessorials = [];
    this.showAccessorials = false;
    console.log(this.assessorialNames);
    newArray = this.assessorialNames.filter(function(el){
      return el.id === Number(formValue.assessorial)
    });
    if (newArray.length > 0) {
      object = { assessorialName: newArray[0].itemName, charge: formValue.assessorialCharge, shortName: newArray[0].name };
      this.assessorialArray.push(object);
      this.selectedItems = newArray;
    } else {
      this.selectedItems = [];
    }
    
    
    console.log('this.assessorial', this.assessorialArray);
    if (this.assessorialArray.length > 0) {
      this.showAccessorials = true;
      this.invoiceForm.patchValue({
        assessorialCharge: '',
        assessorial: ''
      });
      
      this.invoiceForm.patchValue({
       // assessorialCharge: chargeValues
      });
    } else {
      this.showAccessorials = false;
    }

  }

  addAssessorials1(formValue: any) {
    console.log('formValue', formValue);
    let object = {};
    let newArray = [], chargeForAssessorials = [];
    this.showAccessorials = false;
    newArray = this.assessorialNames.filter(function(el){
      return el.id === formValue.assessorial
    });
    if (newArray.length > 0) {
      object = { assessorialName: newArray[0].itemName + '/' + formValue.otherassessorial , charge: formValue.otherassessorialCharge, shortName: formValue.otherassessorial };
      this.assessorialArray.push(object);
      this.selectedItems = newArray;
    } else {
      this.selectedItems = [];
    }
    
    
    console.log('this.assessorial', this.assessorialArray);
    if (this.assessorialArray.length > 0) {
      this.showAccessorials = true;
      this.invoiceForm.patchValue({
        otherassessorialCharge: '',
        otherassessorial: ''
      });
      
      this.invoiceForm.patchValue({
       // assessorialCharge: chargeValues
      });
    } else {
      this.showAccessorials = false;
    }

  }
  deleteAssessorial(assessorial: any, index: any) {
    this.assessorialArray.splice(index, 1);
    this.selectedItems.splice(index, 1);
    if (this.assessorialArray.length > 0) {
      this.showAccessorials = true;
    } else {
      this.showAccessorials = false;
    }
  }

  viewAssessorialDetails(item: any) {
    console.log('item', item);
    this.showTableForViewAssessorials = true;
    //this.viewAssessorialArray = item.assessorial;
    this.viewAssessorialArray = item;
    console.log('this.viewAssessorialArray', this.viewAssessorialArray);
   // $('#view-assessorial').show();
    // this.viewAssessorialArray.assessorialChargeArray = item.assessorial;
    // this.viewAssessorialArray.totalAssessorialCharge = item.assessorialCharge; 
  }
  checkForClass(event: any) {
    console.log('event', event);
    (document.getElementById('weight')as HTMLFormElement).focus();
    let classificationData;
    if (event.key === 'Enter') {
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
    } else {
      this.showErrorMessageForClass = true;
      console.log('classification Else', classificationData);
    }
  }

  checkForClass1(event: any) {
    console.log('event', event);
    (document.getElementById('weightForPieces')as HTMLFormElement).focus();
    let classificationData;
    if (event.key === 'Enter') {
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
    } else {
      console.log('classification Else', classificationData);
    }
  }

  checkForShipmentDate(event: any) {
    console.log(event);
    const pattern = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    // if (event.target.value.which === 13) {
    if (event.target.value !== pattern) {
      this.invoiceForm.patchValue({
        shipmentDate: ''
      }
      );

    }
  }
  checkEnterKey(event: any, type: any) {
    let carrierData;
    console.log(event);
    if (event.which === 13) {
      // this.checkForShipmentDate(event.target.value);
      event.preventDefault();
      if (type === 'shipmentDate') {
        (document.getElementById('carrier')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'carrier') {
        (document.getElementById('originZip')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'originZip') {
        if (this.zipCodeErrorResponseForOrigin === false) {
          (document.getElementById('destinationZip')as HTMLFormElement).focus();
          event.preventDefault();
        } else {
          (document.getElementById('originZip')as HTMLFormElement).focus();
          event.preventDefault();
        }
        this.checkForZipCodes(this.invoiceForm.controls['originZip'].value, 'origin');

      } else if (type === 'destinationZip') {
        if (this.zipCodeErrorResponseForDestination === false) {
          (document.getElementById('pieces')as HTMLFormElement).focus();
          event.preventDefault();
        } else {
          (document.getElementById('destinationZip')as HTMLFormElement).focus();
          event.preventDefault();
        }
        this.checkForZipCodes(this.invoiceForm.controls['destinationZip'].value, 'destination')

      } else if (type === 'pieces') {
        (document.getElementById('classification')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'classification') {
        (document.getElementById('weightDiv')as HTMLFormElement).click();
        (document.getElementById('weight')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'weight') {
        console.log(this.invoiceForm);
        console.log(this.multiclassForm);
        if (this.invoiceForm.value.multiclass === true) {
            // $('#add-pieces-modal').modal('show');
            this.invoiceForm.patchValue({
              weight: this.multiclassForm.value.weightEnter
            })
            this.weightEntered = true;
            setTimeout(() => {
              (document.getElementById('classificationMulti')as HTMLFormElement).focus();
            event.preventDefault();
            }, 1000);
            
        } else if (this.invoiceForm.value.multiclass === false) {
          (document.getElementById('fuelCharge')as HTMLFormElement).focus();
          event.preventDefault();
        }
       
      }else if (type === 'classificationMulti') {
        (document.getElementById('weightForPieces')as HTMLFormElement).focus();
        // (document.getElementById('weight').focus();
        event.preventDefault();
      }else if (type === 'weightForPieces') {
        (document.getElementById('multiclassButton')as HTMLFormElement).click();
        // (document.getElementById('weight').focus();
        event.preventDefault();
      } else if (type === 'fuelCharge') {
        (document.getElementById('invoiceAmt')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'invoiceAmt') {
        (document.getElementById('AddrowBtn')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'assessorialCharge') {
        (document.getElementById('addBtn')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'otherassessorial') {
        (document.getElementById('otherassessorialCharge')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'otherassessorialCharge') {
        (document.getElementById('otheraddBtn')as HTMLFormElement).focus();
        event.preventDefault();
      }
    }
  }

  addValue(data: any) {
    console.log(data);
    this.invoiceForm.patchValue({
      weight: this.multiclassForm.value.weightEnter
    })
    this.weightEntered = true;
    setTimeout(() => {
      (document.getElementById('classificationMulti')as HTMLFormElement).focus();
    // event.preventDefault();
    }, 1000);
  }

  clearForm(type: any ) {
    if (type === 'form') {
      this.invoiceForm.patchValue({
        typeOfInvoice: 'Out Bound',
        carrier: '',
        originZip: '',
        originCity: '',
        originState: '',
        destinationZip: '',
        destinationcity: '',
        destinationState: '',
        shipmentDate: ''
      });
    } else {
      this.invoiceForm.patchValue({
        typeOfInvoice: this.userData.typeOfInvoice,
      });

      if (this.invoiceForm.controls['typeOfInvoice'].value === 'Out Bound') {
        this.invoiceForm.patchValue({
          destinationZip: '',
          destinationcity: '',
          destinationState: ''
        });
      } else if (this.invoiceForm.controls['typeOfInvoice'].value === 'In Bound') {
        this.invoiceForm.patchValue({
          originZip: '',
          originCity: '',
          originState: ''
        });
      }
    }
    this.invoiceForm.patchValue({
      forteCarrier: '',
      pallets: '',
      class: '',
      weight: '',
      fuelCharge: '',
      invoiceAmount: '',
      assessorial: '',
      assessorialCharge: '',
      shipmentDate: '',
      originZip: '',
      originCity: '',
      originState: '',
      destinationZip: '',
      destinationcity: '',
      destinationState: '',
      carrier: '',
      multiclass: false

    });
    this.updateFlag = false;
    (<HTMLInputElement>document.getElementById("shipmentDate")).value = '';
    (<HTMLInputElement>document.getElementById("shipmentDate")).focus;    
  }


  fillTypeOfInvoice() {
    if (this.companyDetails !== null) {
      if (this.invoiceForm.controls['originZip'].value === this.companyDetails.companyZip) {
        this.invoiceForm.patchValue({
          typeOfInvoice: 'Out Bound'
        });
      } else if (this.invoiceForm.controls['destinationZip'].value === this.companyDetails.companyZip) {
        this.invoiceForm.patchValue({
          typeOfInvoice: 'In Bound'
        });
      } else {
        this.invoiceForm.patchValue({
          typeOfInvoice: 'Third Party'
        });
      }
    } else {
      this.invoiceForm.patchValue({
        typeOfInvoice: 'Third Party'
      });
    }
  }

  checkForZipCodes(zipcode: any, type: any) {
    console.log('zip', zipcode, type, this.companyDetails)
    this.zipCodeErrorResponseForDestination = false;
    this.zipCodeErrorResponseForOrigin = false;
    this.fillTypeOfInvoice();
    this.pricingInfoService.getCityState(zipcode).subscribe(response => {
      this.zipcodeResponse = response;
      if (this.zipcodeResponse.length > 0) {
        if (type === 'origin') {
          this.invoiceForm.patchValue({ originCity: this.zipcodeResponse[0].city, originState: this.zipcodeResponse[0].state });
        } else {
          this.invoiceForm.patchValue({ destinationcity: this.zipcodeResponse[0].city, destinationState: this.zipcodeResponse[0].state });
        }
      } else {
        if (type === 'origin') {
          this.zipCodeErrorResponseForDestination = false;
          this.zipCodeErrorResponseForOrigin = true;
        } else {
          this.zipCodeErrorResponseForOrigin = false;
          this.zipCodeErrorResponseForDestination = true;
        }
      }
    });
  }
  fromDate(value: any) {    
    this.shipmentDateValue = value.target.value;
    this.invoiceForm.patchValue({ shipmentDate: value.target.value });
  }

  getRate(invoiceForm: any) {
    console.log('invoiceForm', invoiceForm);
    if (invoiceForm.multiclass === '') {
      this.invoiceForm.patchValue({
        multiclass : false
      })
    }
    this.weightEntered = false;

    console.log('array', this.itemArray);
    this.resultArray = [];
    let classAndWeightArray = [], assessorialValues = [];
    this.resultForPriorityArray = [];
    this.resultForReddawayArray = [];
    this.resultForYRCArray = [];
    this.resultArray = [];
    this.allShipmentsRateArray = [];
    this.userData = {};
    let classification;
    let userObject = {};
    let classValues = [];
   // this.selectedItems = [];
    this.showErrorMessageForClass = false;
    this.showAccessorials = false;

    classValues = this.classArray.filter(function (el:any) {
      return el === invoiceForm.class
    });

    // if (classValues.length > 0) {
      this.showErrorMessageForClass = false;
      if (this.multiclassTable.length >1 && this.invoiceForm.value.multiclass === true) {
        this.multiclassTable.forEach((res: any) => {
          if (res.classification === '77.5') {
            classification = 77;
          } else if (invoiceForm.class === '92.5') {
            classification = 92;
          } else {
            classification = res.classification;
          }
          classAndWeightArray.push({ 'classification': classification, weight: res.multiclassweight });
        })
      } else {
      if (invoiceForm.class === '77.5') {
        classification = 77;
      } else if (invoiceForm.class === '92.5') {
        classification = 92;
      } else {
        classification = invoiceForm.class;
      }
      let weight = invoiceForm.weight.replace(/[^0-9]/g, '');
      classAndWeightArray.push({ classification: classification, weight: weight });
    }

    
    
      console.log(this.multiclassTable);
      console.log(classAndWeightArray)
      let chargeForAssessorials = [];
      assessorialValues.push({ assessorial: invoiceForm.assessorial.itemName, assessorialCharge: invoiceForm.assessorialCharge });
      this.userData.origin = invoiceForm.originZip;
      this.userData.destination = invoiceForm.destinationZip;
      this.userData.weight = invoiceForm.weight;
      this.userData.class =  invoiceForm.class;
      this.userData.classWeight = classAndWeightArray;
      this.userData.carrier = 'ALL';
      this.userData.originState = invoiceForm.originState;
      this.userData.originCity = invoiceForm.originCity;
      this.userData.destinationState = invoiceForm.destinationState;
      this.userData.destinationCity = invoiceForm.destinationcity;
      this.userData.customerId = invoiceForm.customerId;
      this.userData.forteCarrier = invoiceForm.forteCarrier;
      this.userData.shipmentDate =  this.datePipe.transform(this.shipmentDateValue,"yyyy-MM-dd");
      this.userData.pallets = invoiceForm.pallets;
      this.userData.invoiceAmount = invoiceForm.invoiceAmount;
      this.userData.fuelCharge = invoiceForm.fuelCharge;
      this.userData.customerCarrier = invoiceForm.carrier;
      this.userData.typeOfInvoice = invoiceForm.typeOfInvoice;
      this.userData.userType = 'admin';
      this.userData.viewType = 'admin';
      this.userData.createdVia = 'Application';
      console.log('invoiceForm userData', this.userData);
      for (let a = 0; a < this.assessorialArray.length; a++) {
        chargeForAssessorials.push(this.assessorialArray[a].charge);
    }
    if (this.selectedItems.length > 0) {
      for (let s = 0; s < this.selectedItems.length; s++) {
        if (this.selectedItems[s].itemName === 'LiftGate Service') {
          this.selectedItems[s].itemName = 'liftGate';
        }
         if (this.selectedItems[s].itemName === 'Residential Delivery') {
          this.selectedItems[s].itemName = 'residential'
        } 
         if (this.selectedItems[s].itemName === 'Limited Access Delivery') {
          this.selectedItems[s].itemName = 'limitedAccessDelivery'
        }
         if (this.selectedItems[s].itemName === 'Inside Delivery') {
          this.selectedItems[s].itemName = 'insideDelivery'
        } 
        if (this.selectedItems[s].itemName === 'Notify') {
          this.selectedItems[s].itemName = 'notify';
        }
      }
    } else {

    }
    let chargeValues = this.netChargeArrSum(chargeForAssessorials);
    let multiclassValue, multiclassweight,newClassValue;
    console.log(this.userData);
    console.log(this.invoiceForm.value)
    if (this.multiclassTable.length >1 && this.invoiceForm.value.multiclass === true) {
      let x: string = this.multiclassTable[0].classification.toString();

      for (let i = 1; i < this.multiclassTable.length; i++) {
        x += "," + this.multiclassTable[i].classification;
      }
      multiclassValue = x;
    } else if (this.invoiceForm.value.multiclass === false) {
      multiclassValue = this.userData.classWeight[0].classification
    }

    if (this.multiclassTable.length >1 && this.invoiceForm.value.multiclass === true) {
      let y: string = this.multiclassTable[0].multiclassweight.toString();

      for (let j = 1; j < this.multiclassTable.length; j++) {
        y += "," + this.multiclassTable[j].multiclassweight;
      }
      multiclassweight = y;
    } else if (this.invoiceForm.value.multiclass === false) {
      multiclassweight = this.userData.classWeight[0].weight
    }
    console.log(multiclassValue,multiclassweight)

  
    userObject = {
        shipmentDate: this.userData.shipmentDate,
        carrier: this.userData.customerCarrier,
        typeOfInvoice: this.userData.typeOfInvoice,
        forteCarrier: this.userData.forteCarrier,
        originZip: this.userData.origin,
        originCity: this.userData.originCity,
        originState: this.userData.originState,
        destinationZip: this.userData.destination,
        destinationCity: this.userData.destinationCity,
        destinationState: this.userData.destinationState,
        pallets: this.userData.pallets,
        class: multiclassValue,
        weight:multiclassweight ,
        classWeight : classAndWeightArray,
        fuelCharge: this.userData.fuelCharge,
        invoiceAmount: this.userData.invoiceAmount,
        assessorial : this.assessorialArray,
        companyId: this.companyDetails.id,
        salesRepId: this.companyDetails.salesRepId,
        companyName: this.companyDetails.companyName,
        pieces: this.userData.pallets,
        assessorialCharge: chargeValues,
        createdVia: 'Application',
        slNo:'',
        id: 0
      }
      console.log('update flag',this.updateFlag);
      if (this.updateFlag !== true) {
        if (this.uploadedData === undefined) {
        this.itemArray.push(userObject);
        this.formattedArray.push(userObject);
        this.itemArray.forEach((element: any, index: any) => {
          console.log(element, index);
          element.slNo = index + 1;
        });
        // swal({
        //   title: 'Success!',
        //   text: 'Row has been added Sucessfully!',
        //   icon: 'success',
        // });

        this.validateShipmentDate(userObject);
      }  else {
        // userObject.slNo = this.itemArray.length + 1;
        this.validateRows(userObject,'manual');
      }
      if (this.selectedAnalyticsCodeData !== undefined) {
        this.uploadedData = this.itemArray;
        this.selectedAnalyticsCodeData = undefined;
        let passingObject = undefined
        this.invoiceService.setAnalyticsCode(passingObject);
        
      }
      } else {
        console.log(this.editIndex);
        console.log('user', userObject);
        console.log('data', this.userData);
        console.log(this.formattedArray);
        this.itemArray[this.editIndex].shipmentDate = this.userData.shipmentDate;
        this.itemArray[this.editIndex].carrier = this.userData.customerCarrier;
        this.itemArray[this.editIndex].forteCarrier =this.userData.forteCarrier;
        this.itemArray[this.editIndex].typeOfInvoice = this.userData.typeOfInvoice;
        this.itemArray[this.editIndex].originZip = this.userData.origin;
        this.itemArray[this.editIndex].originCity =this.userData.originCity;
        this.itemArray[this.editIndex].originState = this.userData.originState;
        this.itemArray[this.editIndex].destinationZip = this.userData.destination;
        this.itemArray[this.editIndex].destinationCity = this.userData.destinationCity;
        this.itemArray[this.editIndex].destinationState = this.userData.destinationState;
        this.itemArray[this.editIndex].pallets = this.userData.pallets;
        this.itemArray[this.editIndex].class = multiclassValue;
        this.itemArray[this.editIndex].weight = multiclassweight;
        this.itemArray[this.editIndex].fuelCharge = this.userData.fuelCharge;
        this.itemArray[this.editIndex].invoiceAmount = this.userData.invoiceAmount;
        this.itemArray[this.editIndex].assessorial = this.assessorialArray;
        this.itemArray[this.editIndex].companyId = this.companyDetails.id;
        this.itemArray[this.editIndex].salesRepId = this.companyDetails.salesRepId;
        this.itemArray[this.editIndex].companyName = this.companyDetails.companyName;
        this.itemArray[this.editIndex].pieces = this.userData.pallets;
        this.itemArray[this.editIndex].retrievedTableDataFlag = false;
        this.itemArray[this.editIndex].classWeight = classAndWeightArray
        this.itemArray[this.editIndex].assessorialCharge = chargeValues;
       this.formattedArray = this.itemArray[this.editIndex];
      //  swal({
      //   title: 'Success!',
      //   text: 'Row has been edited Sucessfully!',
      //   icon: 'success',
      // });
      this.itemArray.forEach((mm: any) => {
        classAndWeightArray =[];
        if (mm.classWeight === null) {
          classAndWeightArray.push({ classification: mm.class, weight: mm.weight });

        }
      })
      if (this.selectedAnalyticsCodeData !== undefined) {
        this.uploadedData = this.itemArray;
        this.selectedAnalyticsCodeData = undefined;
        let passingObject = undefined
        this.invoiceService.setAnalyticsCode(passingObject);
        
      }
      console.log(this.uploadedData)
       this.validateRows(this.itemArray[this.editIndex], this.editIndex);
       
      }
      
      if (this.updateFlag !== true) {
      if (this.itemArray.length > 0) {
        this.indexForArray = this.itemArray.length - 1;
        (document.getElementById('shipmentDate')as HTMLFormElement).focus();
      }
    } else {
      this.indexForArray = this.editIndex;
      
    }
    this.assessorialArray = [];
    console.log('this.itemArray', this.itemArray);
    console.log(this.formattedArray);
    console.log(this.editIndex);
    // if (this.itemArray.length === 1) {
    //   userObject = this.itemArray[0];
    // } else if (this.itemArray.length > 1) {
    //   userObject = this.itemArray[this.itemArray.length - 1];
    // }
    this.showLoader = true;
    console.log('itens', this.newTrafficDataArray);
    // this.newTrafficDataArray.pop();
   
    // this.newTrafficDataArray = this.newTrafficDataArray.filter((element) => {
    //  return element.rateResponse !== undefined;
    // });
    console.log('itens', this.itemArray);
    this.uploadedData = this.itemArray;

    // this.invoiceService.saveUploadedInvoiceNew(userObject).subscribe((res: any) => {
    //   console.log(res);
    //   this.showLoader = false;
    //   if (this.editIndex !== undefined) {
    //     for(let i=0; i< this.itemArray.length; i++) {
    //       this.itemArray.splice(this.editIndex ,1,res.result);
    //   }
    //   } else {
    //     this.itemArray.pop();
    //     this.itemArray.push(res.result);

    //   }
      
    //   this.trafficManualFlow = true;
    //   this.selectedAnalyticsCodeData = undefined;
    //   // this.formattedArray.push(res.result)new
    //   // this.itemArray = this.formattedArray;
    //   console.log('itens', this.itemArray);
    //   this.itemArray = this.itemArray;
    // })


    // this.loader = true;
    // this.invoiceService.saveUploadedInvoice(this.formattedArray).subscribe((res) => {
    //   console.log(res);
      // setTimeout(() => {
        // this.loader = false;
        // this.formattedArray = [];
        // this.router.navigate(['/Workbook']);
        // }, 12000);
 

    // });
  
    
      this.clearForm('rate');
      this.multiclassTable = [];
    
    // }
    // else {
    //   this.showErrorMessageForClass = true;
    // }
    this.updateFlag = false;

  }

  netChargeArrSum(netCharge: any) {
    let total = 0;
    netCharge.forEach(function (key: any) {
      total = total + Number(key);
    });
    return total;
  }

  carrierAnalytics() {
    console.log(this.itemArray);
    console.log(this.formattedArray);
    if (this.itemArray !== undefined && this.itemArray.length > 0) {
      // if (this.uploadedData !== undefined) {
      // // this.loader = true;
      // let resultlength = 0;
      // this.newTrafficDataArray = [];
      // this.openCarrierModal();
      // this.itemArray.forEach((element, index) => {
      //   console.log(element);
      //   this.invoiceService.saveUploadedInvoiceNew(element).subscribe((res: any) => {
      //     console.log(res);
      //     resultlength = resultlength + 1;
      //       // for(let i=0; i< this.itemArray.length; i++) {
      //         if (res.result != 'Validation Error'&& res.result != 'Invoice Data Empty' && res.result != 'Invalid Class'  && res.result != 'false') {
      //           console.log(res.result);
      //         // this.newTrafficDataArray.splice(index ,1,res.result);
      //         this.newTrafficDataArray.push(res.result);
      //     // }
      //     // this.trafficManualFlow = true;
        
      //   } 
      //   // else {
      //   //   this.newTrafficDataArray.splice(index,1);
      //   // }
      //     // this.selectedAnalyticsCodeData = undefined;
      //     // console.log('itens', this.newTrafficDataArray);
      //     // this.itemArray = this.itemArray;
      //     console.log('condition', resultlength, this.itemArray.length);
      //     if (resultlength === this.itemArray.length) {
      //       let passingObject ={
      //         carrier: this.selectedCarrier,
      //         values: this.newTrafficDataArray
    
      //       }
      //       this.invoiceService.setTrafficDataEnable(passingObject);
      //       this.invoiceService.setTrafficData(passingObject);
      //       let object = '';
      //       this.invoiceService.setSocketData(object);
      //       this.loader = false;

      //       this.router.navigate(['/carrierAnalytics']);
      //     }
      //   });
        
      // });
       
      // }  else if (this.trafficManualFlow === true) {
      //   console.log('conditionerf', this.trafficManualFlow);
      //   let passingObject ={
      //     carrier: this.selectedCarrier,
      //     values: this.itemArray

      //   }
      //   this.invoiceService.setTrafficDataEnable(passingObject);
      //   this.invoiceService.setTrafficData(passingObject);
      //   let object = '';
      //   this.invoiceService.setSocketData(object);
      //   this.router.navigate(['/carrierAnalytics']);
      if (this.selectedAnalyticsCodeData !== undefined) {
        console.log(this.selectedAnalyticsCodeData);
        let passing = {
          filterValue: this.selectedAnalyticsCodeData.filterValue,
          carrierValue: this.itemArray[0].forteCarrier,
          analyticsId: this.selectedAnalyticsCodeData.analyticsId,
          notes: this.selectedAnalyticsCodeData.notes,
          contractPerson: this.selectedAnalyticsCodeData.contractPerson,
        contractAddress : this.selectedAnalyticsCodeData.contractAddress,
        contractDate : this.selectedAnalyticsCodeData.contractDate,
        contractPosition : this.selectedAnalyticsCodeData.contractPosition,
        costPlus: this.selectedAnalyticsCodeData.costPlus,
        billToAddress :this.selectedAnalyticsCodeData.billtoAddress

        }; 
        this.invoiceService.setAnalyticsCode(passing);
        // let carrier = this.selectedAnalyticsCodeData.split('_');
        let passingObject ={
          carrier: this.itemArray[0].forteCarrier,
          values: this.itemArray,
          invalidData : [],
          notes: this.selectedAnalyticsCodeData.notes
        }
        this.invoiceService.setTrafficDataEnable(passingObject);
        this.invoiceService.setTrafficData(passingObject);
        let object = '';
        this.invoiceService.setSocketData(object);
        this.router.navigate(['/carrierAnalytics']);

      } else if (this.uploadedData !== undefined){
        this.openCarrierModal();
      } else if (this.trafficDataEnable !== undefined) {
        console.log(this.trafficDataEnable);
        let passingObject ={
          carrier: this.trafficDataEnable.carrier,
          values: this.itemArray

        }
        this.invoiceService.setTrafficDataEnable(passingObject);
        this.invoiceService.setTrafficData(passingObject);
        let object = '';
        this.invoiceService.setSocketData(object);
        this.router.navigate(['/carrierAnalytics']);
      }
      }
      
  }

  getAllValues() {
    let array = [];
    let rateResponseArray = [];
    if (this.itemArray.length > 0) {
      // for (let i = 0; i < this.itemArray.length; i++) {
      //   if (this.itemArray[i].retrievedTableDataFlag === false) {
      //     if (this.itemArray[i].yrcData !== undefined && this.itemArray[i].reddawayData !== undefined &&
      //       this.itemArray[i].fedexEcoData !== undefined
      //       && this.itemArray[i].fedexPriorityData !== undefined) {
      //       if (this.itemArray[i].yrcData.length > 1 && this.itemArray[i].reddawayData.length > 1 &&
      //         this.itemArray[i].fedexEcoData.length > 1 && this.itemArray[i].fedexPriorityData.length > 1) {
      //         array.push(i);
      //       }
      //     }
      //   } else {
      //     rateResponseArray = JSON.parse(this.itemArray[i].rateResponse);
      //     console.log('rateResponseArray', rateResponseArray);
      //     this.itemArray[i].yrcData = rateResponseArray[0].yrcData;
      //     this.itemArray[i].fedexEcoData = rateResponseArray[1].fedexEcoData;
      //     this.itemArray[i].fedexPriorityData = rateResponseArray[2].fedexPriorityData;
      //     this.itemArray[i].reddawayData = rateResponseArray[3].reddawayData;
      //     if (this.itemArray[i].yrcData !== undefined && this.itemArray[i].reddawayData !== undefined &&
      //       this.itemArray[i].fedexEcoData !== undefined
      //       && this.itemArray[i].fedexPriorityData !== undefined) {
      //       if (this.itemArray[i].yrcData.length > 1 && this.itemArray[i].reddawayData.length > 1 &&
      //         this.itemArray[i].fedexEcoData.length > 1 && this.itemArray[i].fedexPriorityData.length > 1) {
      //         array.push(i);
      //       }
      //     }
      //   }
      // }
      // if (array.length > 0) {
      //   if (array.length === this.itemArray.length) {
      //     this.showLoader = false;
      //     this.updateFlag = false;
      //     console.log('itemArray 6', this.itemArray);
      //     let object = { values: this.itemArray, carrier: 'FEDEX PRIORITY' };
      //     console.log('onject', object);
      //     this.saveData();
      //     this.setMessage(object);
      //     this.router.navigate(['/Workbook']);
      //   } else {
      //     this.showLoader = true;
      //     setTimeout(() => {
      //       this.carrierAnalytics();
      //     }, 5000)
      //   }
      // } else {
      //   this.showLoader = true;
      //   setTimeout(() => {
      //     this.carrierAnalytics();
      //   }, 7000);
      // }
      this.showLoader = false;
      this.updateFlag = false;
      console.log('itemArray 6', this.itemArray);
      this.saveData();
      // this.router.navigate(['/Workbook']);
    }
  }

  setMessage(event: any) {
    console.log('event', event);
  //  this.invoiceService.myMethod(event);
  this.invoiceService.setInvoiceDetails(event);
  }
  ngOnDestroy() {
    console.log('destroy');
  }
  routingLink() {
    console.log('Redirecting to Customer screen');
    this.router.navigate(['/customerInfoworkbook']);
  }

  saveData() {
    let array = [], newArray = [];
    if (this.itemArray.length > 0) {
      for (let i = 0; i < this.itemArray.length; i++) {
        if (this.itemArray[i].id !== ''&& this.itemArray[i].id!== null && this.itemArray[i].id!==undefined) {
        } else {
          array.push({ yrcData: this.itemArray[i].yrcData }, { fedexEcoData: this.itemArray[i].fedexEcoData }, { fedexPriorityData: this.itemArray[i].fedexPriorityData }, { reddawayData: this.itemArray[i].reddawayData });
          this.itemArray[i].rateResponse = JSON.stringify(array);
          newArray.push(this.itemArray[i]);
        }
        // this.itemArray[i].assessorial = JSON.stringify(this.itemArray[i].assessorial);
      }
      console.log('this.itemArray', this.itemArray, 'newArray', newArray);
      if (newArray.length > 0) {
      this.invoiceService.saveInvoiceInfo(newArray).subscribe((response:any) => {
        console.log('response for save data', response);
        // swal({
        //   title: 'Success!',
        //   text: 'Invoice Details has been stored Sucessfully!',
        //   icon: 'success',
        // });
        Swal.fire('Success!','Invoice Details has been stored Sucessfully!','success'        )
      }, (err:any) => {
        Swal.fire(
          'Oops!',
          'Failed to store Invoice Information',
          'error'
        );
      });
    }
    }
  }

  saveRawData() {
    console.log(this.itemArray);
    let apiArray1: any = []
    for( let i =0;i<this.itemArray.length;i++) {
      this.invoiceService.saveInvoicerawDataNew(this.itemArray[i]).subscribe((res: any) => {
        console.log(res);
        if(res.result.id !== '') {
          let newObject = {
            invoiceId: res.result.id,
            carrier: '',
            forteResponse: '',
            selected: true,
            rules: ''
      
          }
          apiArray1.push(newObject);

          let date, month, hour, minutes, seconds;
          var today = new Date();
          var sec = today.getSeconds();
          var min = today.getMinutes();
          var hr = today.getHours();
          var dd = today.getDate();
          var mm = today.getMonth() + 1;
          if (dd < 10) {
            date = '0' + dd;
          } else {
            date = dd;
          }
          if (mm < 10) {
            month = '0' + mm;
          } else {
            month = mm;
          }
          if (sec < 10) {
            seconds = '0' + sec;
          } else {
            seconds = sec;
          }
          if (min < 10) {
            minutes = '0' + min;
          } else {
            minutes = min;
          }
          if (hr < 10) {
            hour = '0' + hr;
          } else {
            hour = hr;
          }
          var yyyy = today.getFullYear();
          console.log(date, month, yyyy);
          let companyName = (this.companyDetails.companyName).replace(/\s/g, "");
          let savinganalyticsCode = companyName + '_' + month + date + yyyy + hour + minutes + seconds + '-RawData';
          let apiArray = [];
          console.log(apiArray1);
          if (apiArray1.length === this.itemArray.length) {
            let apiObject = {
              analyticsCode: savinganalyticsCode,
              companyId: this.companyDetails.id,
              notes: savinganalyticsCode,
              updateRate: apiArray1
            }
            let beforefinalArray:any = [];
            this.invoiceService.saveInvoiceInfoNew(apiObject, beforefinalArray).subscribe((res: any) => {
              console.log(res);
              if (res.result === true) {
                  Swal.fire({
                  title: 'Success!',
                  text: 'Raw Data is stored successfully!',
                  icon: 'success',
                });
                // this.toastr.success('Invoice information is stored successfully');
                // this.saveworkbookRule();
                // this.loader = false;
                // $('#requestModal').modal('hide');
                this.router.navigate(['/uploadWorksheet']);
              }
            });
          }
        }
        // if (res.result === true) {
        //     swal({
        //     title: 'Success!',
        //     text: 'Raw Data is stored successfully!',
        //     icon: 'success',
        //   });
        //   // this.toastr.success('Invoice information is stored successfully');
        //   // this.saveworkbookRule();
        //   // this.loader = false;
        //   // $('#requestModal').modal('hide');
        //   // this.router.navigate(['/uploadWorksheet']);
        // }
      });
    }

    // let apiObject1 = {
    //   analyticsCode: savinganalyticsCode,
    //   companyId: this.companyDetails.id,
    //   notes: savinganalyticsCode,
    //   updateRate: apiArray
    // }
   
  
  
  }
  deleteItemArray(item:any, i:any) {	
    console.log('Editing item', item, i);	
    this.editIndex = i - 1;	
    let shipDate:any;
    this.updateFlag = true;	
    this.itemArray.splice(this.editIndex,1);	
    // this.
    for (let i = 0;i < this.itemArray.length; i++) {
      this.itemArray[i].slNo = i + 1;
    }
    console.log(this.itemArray);
  }
  editItemArray(item: any, i: any) {
    console.log('Editing item', item, i);
    this.editIndex = i - 1;
    let shipDate:any;
    this.updateFlag = true;
    if (item.shipmentDate.includes('T')) {
         var today = item.shipmentDate.split('-');
         console.log(today[2]);
    var date = today[2].split('T');
    console.log(date);
    shipDate = today[1] + '/' +date[0]  + '/' + today[0];
    console.log(shipDate);
    } else if (item.shipmentDate.includes('-')) {
      var today = item.shipmentDate.split('-');
      shipDate = today[1] + '/' + today[2]  + '/' + today[0] ;
    } else {
      shipDate = item.shipDate;

    }

    
//     var seconds = String(today.getSeconds());
// var minutes = String(today.getMinutes());
// var hour = String(today.getHours());
// var dd = today.getDate();
// var mm = today.getMonth() + 1;
// if (dd < 10)  date = '0' + dd;
// if (mm < 10) month = '0' + mm;
// var yyyy = today.getFullYear();
// console.log(today, date);
// console.log(shipDate);
    // (<HTMLInputElement>document.getElementById("shipmentDate")).value  = item.shipmentDate;
    this.invoiceForm.patchValue({
      shipmentDate: shipDate,
      carrier: item.carrier,
      originZip: item.originZip,
      customerId: this.companyDetails.companyName,
      salesRepId: item.salesRepId,
      forteCarrier: item.forteCarrier,
      typeOfInvoice: item.typeOfInvoice,
      originCity: item.originCity,
      originState: item.originState,
      destinationZip: item.destinationZip,
      destinationcity: item.destinationCity,
      destinationState: item.destinationState,
      pallets: item.pallets,
      // class: item.class,
      // weight: item.weight,
      fuelCharge: item.fuelCharge,
      invoiceAmount: item.invoiceAmount,
      assessorial: [''],
      assessorialCharge: ['']
    });
    if (item.classWeight !== null) {
      console.log('if');

      if (item.classWeight.length === 1) {
        this.invoiceForm.patchValue({
          class: item.classWeight[0].classification,
        weight: item.classWeight[0].weight
        });
        this.invoiceForm.patchValue({
          'multiclass': ''
        });
      } else if (item.classWeight.length > 1) {
             item.classWeight.forEach((ele:any,index: any) => {
               this.multiclassTable.push({'classification':ele.classification, 'multiclassweight': ele.weight})
             })
             this.invoiceForm.patchValue({
              'multiclass': true
            });
// this.multiclassTable = item.classWeight
      }

    } else {
      console.log('else');
      this.invoiceForm.patchValue({
        class: item.class,
      weight: item.weight,
      multiclass: ''

      });
    }
    if(item.assessorial.length > 0) {
      this.assessorialArray = item.assessorial;
      this.showAccessorials = true;
    } else {
      this.showAccessorials = false;
    }
    (document.getElementById('shipmentDate')as HTMLFormElement).focus();
  }
  // deleteItemArray(item: any, i: any) {	
  //       console.log('Editing item', item, i);	
  //       this.editIndex = i - 1;	
  //       let shipDate:any;
  //       this.updateFlag = true;	
  //       this.itemArray.splice(this.editIndex,1);	
  //       console.log(this.itemArray);
  //     }
  openCarrierModal() {
    $('#carrierModal').modal('show');
  }

  getBusisnessRule() {
    this.router.navigate(['/promoteRule']);
  }

  selectAccessorials(formValue: any) {
    console.log('Access',formValue);
    if (formValue.assessorial === '9') {
    this.showOtherAccessorial = true;
    // $('#otherassessorial').focus();
    (document.getElementById('otherassessorial')as HTMLFormElement).focus();
    // event.preventDefault();


    }
  }
  checkGetRate(val: any) {
    // this.getRateCheck = val;
console.log('val', val);
if (val.srcElement.checked === true) {

  $('#add-pieces-modal').modal('show');
  (document.getElementById('weightId')as HTMLFormElement).focus();

}
  }

  addClassMulti(data: any) {
    console.log(data);
    let weightArray = []
    this.multiclassTable.push(data);
    
    this.multiclassForm.patchValue({
      classification : '',
      multiclassweight: '',
      weightEnter : ''
    })
    if (this.multiclassTable.length > 0) {
      // this.multiclassTable.push(data);

      for (let i = 0; i < this.multiclassTable.length; i++) {
        weightArray.push(this.multiclassTable[i].multiclassweight);
      }
      console.log(weightArray)
      let weight = this.netChargeArrSum(weightArray);
      console.log(weight)
      let differenceWeight = Number(this.invoiceForm.value.weight) - Number(weight);
    console.log(differenceWeight);
      this.headerDetailForShipment = differenceWeight;
      this.addShipmentInfo()
    } 
    console.log(this.multiclassTable)
  }
  deletemulticlassrow (data: any, i: any) {
    this.multiclassTable.splice(i, 1);
  }

  addShipmentInfo() {
    this.errorMessageForWeightCount = false;
    let oldObject;
  
      if (this.multiclassTable.length > 0) {
        let sumOfPiecesWeight = [];
        if (this.multiclassTable.length > 0) {
          for (let p = 0; p < this.multiclassTable.length; p++) {
            sumOfPiecesWeight.push(this.multiclassTable[p].multiclassweight);
            console.log('this.sumOfPiecesWeight', sumOfPiecesWeight);
          }
        }
        this.totalWeightForPieces = this.netChargeArrSum(sumOfPiecesWeight);
        console.log('sumOfPiecesWeight', sumOfPiecesWeight);
        this.totalHeaderWeight = Number(this.invoiceForm.value.weight);
        if (Number(this.totalWeightForPieces) > Number(this.invoiceForm.value.weight)) {
          this.errorMessageForWeightCount = true;
          let differenceWeight = Number(this.totalWeightForPieces) - Number(this.invoiceForm.value.weight);
          this.showWeightVarianceMsg = 'There is a over weight of ' + Number(differenceWeight) + ' pounds from the total weight of ' + Number(this.totalHeaderWeight) + ' pounds.'
          setTimeout(() => {
            // this.errorMessageForWeightCount = false;
            this.showWeightVarianceMsg = '';
          }, 5000);
          console.log('errorMessageForWeightCount if >', this.errorMessageForWeightCount);
        } else {
          let differenceObject = Number(this.invoiceForm.value.weight) - Number(this.totalWeightForPieces);
          console.log('differenceObject', differenceObject);
          if (Number(differenceObject) > 0) {
            this.errorMessageForWeightCount = true;
            this.showWeightVarianceMsg = 'There is a variance of ' + Number(differenceObject) + ' pounds under weight from ' + Number(this.invoiceForm.value.weight) + ' pounds.';
            setTimeout(() => {
              // this.errorMessageForWeightCount = false;
              this.showWeightVarianceMsg = ''
            }, 5000);
            console.log('errorMessageForWeightCount if <', this.errorMessageForWeightCount);
          } else {
            this.errorMessageForWeightCount = false;
            // $('#add-pieces-modal').modal('hide');
           
          }
        }
        console.log( this.errorMessageForWeightCount);
        setTimeout(() => {
          if (this.errorMessageForWeightCount === false ) {
            $('#add-pieces-modal').modal('hide');
            (document.getElementById('fuelCharge')as HTMLFormElement).focus();
            // event.preventDefault();
  
          } else {
            (document.getElementById('classificationMulti')as HTMLFormElement).focus();
            // event.preventDefault();
          }
        }, 500);
      
      } 
    
 
  
  }
}
