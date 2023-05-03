import { Component, OnInit } from '@angular/core';
import { QuoteReportService } from '../services/quote-report.service';
import { PricingInfoService } from '../services/pricing-info.service';
import { ExcelService } from '../services/excel.service';
import { LoggerService } from '../services/logger.service';
import { CustomerService } from '../services/customer.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
// import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { ToastrService } from 'ngx-toastr';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
declare var $: any;
import * as moment from 'moment';
// import { checkAndUpdatePureExpressionDynamic } from '@angular/core/src/view/pure_expression';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  isNaN: Function = Number.isNaN;
  reportForm: FormGroup = new FormGroup({});
  public externalCustNameResponse: any;
  public testResponse: any;
  public customerNamesAll:any;
  public customerNames: any;
  public count: any;
  public highCost: any;
  public customer: any;
  public finalRate: any;
  public fuelDiscount:any;
  public charge: any;
  public discount: any;
  public assessorialCharges: any;
  public fuelCharges: any;
  public netCharges: any;
  public customerResponse: any;
  public totalCharge_dialog: any;
  public n: any;
  public userName:any;
  public cl: any;
  public origin_dialog: any;
  public destination_dialog: any;
  public accessorials: any;
  public destState:any;
  public destCity: any;
  public customerId: any;
  public rateClass = [];
  public finalRateClass = [];
  public classArray: any = [];
  public weightArray: any = [];
  public state: any;
  public city: any;
  public completeResponse: any;
  public singleCustomer: any;
  public class: any;
  public data: any;
  public accessToken: any;
  public q: any;
  public showErrorMessage = false;
  public p = 1;
  public pclass = [];
  public wclass = [];
  public val: any;
  public salesRep: any;
  public salesRepValues: any;
  public reportDataArray: any = [];
  public salesRepId: any;
  public carrierName: any;
  public numberPerPage:any;
  public mailResponse: any;
  public parseClass: any = [];
  public parseWeight: any = [];
  public singleReportData: any;
  public specificQuoteIdObject: any;
  public zipCodeCityAndState: any;
  public singleCustomerName: any;
  public rateDetailObject: any;
  i: any=0;
  public logger = {};
  public showTable = false;
  public showNextTable = false;
  public showErrorForCustomer = false;
  public searchDataErrorMessage = false;
  public showDownloadButton = false;
  public showLoader = false;
  public salesRepArray: any;
  public salesRepType: any;
  public salesRepName: any;
  public fromDateValue = '';
  public toDateValue = '';
  // public colorTheme = 'default';
  public disableDropDown = false;
  public responseAP: any = [];
  public responseAR: any = [];
  public webRateResponse: any = [];
  public numberOfPages = [5, 10, 15];
  public persons = [];
  public sendEmailArFlag: any;
  public quoteId: any;
  public companyId: any;
  public maxDate: any;
  public companyResponse: any;
  public assessorialList: any = [];
  public webrateComparisonResponse: any;
  public showForWebRate = false;
  public webRateComparisonFinalResponse: any;
  public specificQuoteIdObjectWeb: any;
  public rateDetailObjectForWeb: any;
  public assessorialListForWeb: any;
  public fuelChargesWeb: any;
  public chargeWeb: any;
  public colorPicker = 'theme-default';
  public costPlusResponse: any = [];
  highcostArray: any=[];
  oldRate: any;
  weightForCal:any =0;
  showMinimumCharge: any = false;
  finalRateCharge:any =0;
  showDeficitValue:any = false;
  costPlusFactorForYRC = 0;
  costPlusFactorForReddaway = 0;
  parseSetMasterData: any;
  category: any;
  totalapData: any = 0;
  selectPagination:any;
  constructor(private quoteReportService: QuoteReportService, private router: Router,
    private pricingInfoService: PricingInfoService, private toastr: ToastrService,
    private excelService: ExcelService, private loggerService: LoggerService,
    private datePipe: DatePipe, private hotkeysService: HotkeysService, private customerService: CustomerService) {
    this.excelService = excelService;
  }

  ngOnInit() {
    $("#success-alert").hide();
    this.getSalesRepDetails();
    this.getAdminUsers();
    this.buildForm();

    if (this.salesRepType === 'customerServiceRep' || this.salesRepType === 'administrator') {
      this.getAllCompanyNotes();
    } else {
      this.getCompany();
      this.reportForm.patchValue({ salesRepName: this.salesRepValues.id });
      this.disableDropDown = true;
    }
    this.maxDate = new Date();
  }

  buildForm() {
    this.reportForm = new FormGroup({
      salesRepName: new FormControl(''),
      customerName: new FormControl(''),
      from_date: new FormControl(''),
      to_date: new FormControl(''),
      quoteNo: new FormControl(''),
      origin: new FormControl(''),
      destination: new FormControl(''),
      carrier: new FormControl(''),
      category: new FormControl('')
    });
  }

  getAllCompanyNotes() {
    this.customerService.getCompanyDetails(this.accessToken).subscribe(getCustomerData => {
      this.customerNamesAll = getCustomerData;
      this.logger = {
        'method': 'getCompanyDetails',
        'message': 'Customers',
        'CustomerDetail ': 'All'
      };
      this.loggerService.info(this.logger);
      this.hotkeysService.add(new Hotkey('ALT + F3', (event: KeyboardEvent): boolean => {
        console.log('Typed hotkey');
        (document.getElementById('customer')as HTMLFormElement).focus();
        (document.getElementById('customer')as HTMLFormElement).click();
        return false; // Prevent bubbling
      }));
    });
  }

  getSalesRepDetails() {
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.accessToken = localStorage.getItem(('accessToken'));
    this.salesRepValues = JSON.parse(this.salesRep);
    this.salesRepId = this.salesRepValues.id;
    this.salesRepName = this.salesRepValues.salesRepName;
    console.log('this.salesRepId', this.salesRepId);
    this.salesRepType = this.salesRepValues.type;
  }

  selectRanges(page: any) {
    this.numberPerPage = Number(page);
  }

  getCompany() {
    this.customerService.getCompanyDetailsBySalesRepId(this.salesRepId, this.accessToken).subscribe(data => {
      this.customerNamesAll = data;
      this.logger = {
        'method': 'getCompanyDetailsBySalesRepId',
        'message': 'Retrieving customer name assigned to this salesrep',
        'SalesrepId': this.salesRepId
      };
      this.loggerService.info(this.logger);
    });

  }

  getAdminUsers() {
    this.pricingInfoService.getSalesDetail(this.accessToken).subscribe((names: any) => {
      this.salesRepArray = names;
      this.logger = {
        'method': 'getSalesDetail',
        'message': 'Retrieving salesrep details',
        'salesRepId': this.salesRepId
      };
      this.loggerService.info(this.logger);
    });
  }

  getCustomerName(e: any) {
    console.log('e', e, this.customerNamesAll);
    if (this.customerNamesAll.length > 0) {
      for (let c = 0; c < this.customerNamesAll.length; c++) {
        if (e === this.customerNamesAll[c].companyName) {
          this.companyId = this.customerNamesAll[c].id;
          this.customerId = this.customerNamesAll[c].id;
          this.showErrorForCustomer = false;
        } else {
          this.showErrorForCustomer = true;
        }
      }
    }
  }
  fromDate(value: any) {
    console.log('value', value);
    let valueNew = value;
    console.log('valueNew', valueNew);
    let dateNew = moment(valueNew).format('YYYY-MM-DD');
    console.log('dateNew', dateNew);
    this.fromDateValue = dateNew;
    console.log('newValue1', this.fromDateValue);
    let newDate = dateNew.split('-');
    console.log('newDate', newDate);
    let newDate1 = newDate[1] + '/' + newDate[2] + '/' + newDate[0];
    console.log('newDate1', newDate1);
    this.reportForm.patchValue({ from_date: newDate1 });
  }

  toDate(value: any) {
    console.log('value', value);
    let valueNew = value;
    console.log('valueNew', valueNew);
    let dateNew = moment(valueNew).format('YYYY-MM-DD');
    console.log('dateNew', dateNew);
    this.toDateValue = dateNew;
    console.log('newValue1', this.toDateValue);
    let newDate = dateNew.split('-');
    console.log('newDate', newDate);
    let newDate1 = newDate[1] + '/' + newDate[2] + '/' + newDate[0];
    console.log('newDate1', newDate1);
    this.reportForm.patchValue({ to_date: newDate1 });

  }

  reportClear() {
    if (this.salesRepType === 'customerServiceRep' || this.salesRepType === 'administrator') {
      this.reportForm.patchValue({
        origin: '',
        destination: '',
        customerName: '',
        from_date: '',
        to_date: '',
        quoteNo: '',
        carrier: '',
        category: '',
        salesRepName: ''
      });
      this.showTable = false;
      this.companyId = '';
      this.customerId = '';
      this.fromDateValue = '';
      this.toDateValue = '';
      this.showErrorMessage = false;
      this.showLoader = false;
      this.showDownloadButton = false;
      this.searchDataErrorMessage = false;
    } else {
      this.reportForm.patchValue({
        origin: '',
        destination: '',
        customerName: '',
        from_date: '',
        to_date: '',
        quoteNo: '',
        carrier: '',
        category: '',
      });

      this.showTable = false;
      this.companyId = '';
      this.customerId = '';
      this.fromDateValue = '';
      this.toDateValue = '';
      this.showErrorMessage = false;
      this.showLoader = false;
      this.showDownloadButton = false;
      this.searchDataErrorMessage = false;
    }
    (<HTMLInputElement>document.getElementById("fromDate")).value = '';
    (<HTMLInputElement>document.getElementById("toDate")).value = '';

  }
  shipmentDate(date:any) {
    console.log('date', date);
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

  // this method is used to send the search parameter as form and hits the remote method of api and gives only the filtered value

  getRecordsValue(reportForm: any) {
    console.log('reportForm', reportForm);
    this.reportDataArray = [];
    this.showErrorMessage = false;
    this.showLoader = true;
    this.showTable = false;
    this.showDownloadButton = false;
    if (reportForm.customerName !== '') {
      console.log('getRecords', reportForm);
      this.getReportDate(reportForm);
    } else {
      this.companyId = '';
      this.customerId = '';
      console.log('getRecords else', reportForm);
      this.getReportDate(reportForm);
    }
  }

  close() {
    this.showNextTable = false;
    this.pclass = [];
    this.wclass = [];
    this.rateClass = [];
    this.finalRateClass = [];
    this.state = '';
    this.city = '';
  }

  // this method is to fetch the CustomerId from CustomerName in the form:

  getReportDate(reportForm:any) {
    console.log('getReportData', reportForm, 'this.companyId', this.companyId);
    if (reportForm.customerName === '' && reportForm.destination === '' && reportForm.origin === ''
      && reportForm.from_date === '' && reportForm.to_date === '' && reportForm.quoteNo === '' &&
      reportForm.carrier === '' && reportForm.category === '' && reportForm.salesRepName === '') {
      this.searchDataErrorMessage = true;
      this.showLoader = false;
    } else {
      this.searchDataErrorMessage = false;
      if (reportForm.salesRepName === '') {
        this.salesRepId = '';
      } else {
        this.salesRepId = reportForm.salesRepName;
      }
      this.responseAR = [];
      this.responseAP = [];
      this.webRateResponse = [];
      this.oldRate = [];
      this.customerId = '';
      this.quoteReportService.fetchByValue(reportForm, this.customerId, this.companyId, this.salesRepId, this.fromDateValue, this.toDateValue).subscribe((data:any) => {
        console.log('data', data);
        this.testResponse = data;
        console.log('this.data.result', this.testResponse.result);
        if (this.testResponse.result.length > 0) {
          this.testResponse.result = this.testResponse.result.reverse();

          console.log('this.data.result', this.testResponse.result);
          this.showTable = true;
          this.showLoader = false;
          this.showDownloadButton = true;
          this.reportDataArray.push.apply(this.reportDataArray, this.testResponse.result);
          console.log('this.reportDataArrayone', this.reportDataArray);
          this.count = this.reportDataArray.length;
          if (this.count > 10) {
            this.numberPerPage = 10;
          } else {
            this.numberPerPage = this.count;
          }
          for (let i = 0; i < this.reportDataArray.length; i++) {
            // this.oldRate = []

            console.log(this.reportDataArray);
            if (this.reportDataArray[i].createdBy === "externalCustomer") {
              if (this.reportDataArray[i].externalCustomersDetail!== undefined) {
              this.reportDataArray[i].createdByName = this.reportDataArray[i].externalCustomersDetail.customerName;
            } else {
              this.reportDataArray[i].createdByName = '';
            }
            } else {
              // let salesRepId = this.reportDataArray[i].loginId;
              // let salesRepUserNameArray = [];
              // salesRepUserNameArray = this.salesRepArray.filter(function (el) {
              //   return el.id === salesRepId;
              // });
              let salesRepId = this.reportDataArray[i].loginId;
              
              let salesRepUserNameArray: any = [];
              console.log(this.salesRepArray, salesRepId);
              this.salesRepArray.forEach((ele: any) => {
                if (ele.id === Number(salesRepId)) {
                  salesRepUserNameArray.push(ele)
                }
              })
              // salesRepUserNameArray = this.salesRepArray.filter(function (el) {
              //   return el.id === salesRepId;
              // });
              console.log(salesRepUserNameArray);
              if (salesRepUserNameArray.length > 0) {
                this.reportDataArray[i].createdByName = salesRepUserNameArray[0].salesRepName;
              } else {
                this.reportDataArray[i].createdByName = '';
              }
            }
            let obj1 = [];
            this.weightArray = [];
            this.classArray = [];
            let date = this.reportDataArray[i].createdOn.split('T');
            console.log('date', date);
            let newDate = date[0].split('-');
            console.log('newDate', newDate);
            let newDisplayDate = newDate[1] + '/' + newDate[2] + '/' + newDate[0];
            console.log('newDisplayDate', newDisplayDate);
            this.reportDataArray[i].createdOn = newDisplayDate;
            obj1 = JSON.parse(this.reportDataArray[i].classAndWeight);
            for (this.n = 0; this.n < obj1.length; this.n++) {
              this.classArray.push(obj1[this.n].classification);
              this.weightArray.push(obj1[this.n].weight);
            }
            this.reportDataArray[i].h = [this.classArray];
            this.reportDataArray[i].x = [this.weightArray];
          }
          for (let k = 0; k < this.reportDataArray.length; k++) {

            let quoteReferenceId = this.reportDataArray[k].quoteReferenceId;
            if (quoteReferenceId && this.reportDataArray[k].category === 'AP') {
              this.responseAP.push(this.reportDataArray[k]);
              if (this.reportDataArray[k].carrier === 'YRC') {
                let x = this.reportDataArray[k];
                x.category = 'WEB';
                this.webRateResponse.push(x);

              }
            } else if (quoteReferenceId && this.reportDataArray[k].category === 'AR') {
            
              this.responseAR.push(this.reportDataArray[k]);
            } else if (quoteReferenceId && this.reportDataArray[k].category === 'WEB') {

              // if (this.reportDataArray[k].carrier === 'YRC') {
              //   this.reportDataArray.forEach((x) => {
              //     if (x.category === 'AP') {
              //       this.webRateResponse.push(x);
              //       console.log('jefrin', this.webRateResponse)
              //     }
              //   })
              //   // if (quoteReferenceId && this.reportDataArray[k].category === 'AP') {
              //     // this.responseAP.push(this.reportDataArray[k]);
              //   // } 
              //   if (quoteReferenceId && this.reportDataArray[k].category === 'WEB') {
              // this.oldRate.push(this.reportDataArray[k])
              //   }
              // } else {
                if (this.reportDataArray[k].carrier !== 'YRC') {
                this.webRateResponse.push(this.reportDataArray[k]);
                // this.oldRate = []
              } 
            } else if (quoteReferenceId && this.reportDataArray[k].category === 'COSTPLUS' || quoteReferenceId && this.reportDataArray[k].category === 'costPlus') {
              this.costPlusResponse.push(this.reportDataArray[k]);                                                            2222
            } else if (quoteReferenceId && this.reportDataArray[k].category === 'OLDAP') {
              
              // this.reportDataArray[k].newvalues = pricingInfo;
              console.log( this.reportDataArray[k]);
              this.oldRate.push(this.reportDataArray[k]);                                                            2222
            }

            console.log('Search Response final', 'this.responseAP', this.responseAP, 'this.responseAR', this.responseAR, 'this.webRateResponse', this.webRateResponse);
            this.responseAP = this.removeDuplicates(this.responseAP);
            this.responseAR = this.removeDuplicates(this.responseAR);
            this.webRateResponse = this.removeDuplicates(this.webRateResponse);
            this.costPlusResponse = this.removeDuplicates(this.costPlusResponse);
            console.log('Search Response final', 'this.responseAP', this.responseAP, 'this.responseAR', this.responseAR, 'this.webRateResponse', this.webRateResponse);
            console.log('Search Response final length', 'this.responseAP', this.responseAP.length, 'this.responseAR', this.responseAR.length, 'this.webRateResponse', this.webRateResponse.length);
            console.log('this.webRateResponse', this.webRateResponse);
            console.log('this.costPlusResponse', this.costPlusResponse);
            console.log('this.responseAR1', this.responseAR);
          }
          let ARFilter = [], webRateFilter = [], costPlusFilter= [],  APFilter = [], companyId: any;
          for (let i = 0; i < this.responseAP.length; i++) {
            console.log('jefrin',this.responseAP[i]);
            let quoteRefId = this.responseAP[i].quoteReferenceId;
            APFilter = this.responseAP.filter(function (el: any) {
              return el.quoteReferenceId === quoteRefId;
            });
            ARFilter = this.responseAR.filter(function (el: any) {
              return el.quoteReferenceId === quoteRefId;
            });
            webRateFilter = this.webRateResponse.filter(function (el: any) {
              return el.quoteReferenceId === quoteRefId;
            });
            costPlusFilter = this.costPlusResponse.filter(function(el: any) {
              return el.quoteReferenceId === quoteRefId;
            });
            companyId = this.responseAP[i].companyId;
            this.companyResponse = this.customerNamesAll.filter(function (el: any) {
              return el.id === companyId;
            });
            console.log('this.companyResponse', this.companyResponse);
            if (this.companyResponse.length > 0) {
              this.responseAP[i].companyName = this.companyResponse[0].companyName;
            } else {
              this.responseAP[i].companyName = '-';
            }
            // this.responseAP[i].oldRate = this.oldRate;
            if (APFilter.length > 0) {
              if (this.responseAP[i].carrier === 'YRC') {
                console.log('ssss', this.oldRate);
                if (this.oldRate.length > 0) {
                  this.oldRate.forEach((mx: any) => {
                    // let newv = mx.newvalues;
                    if (mx.quoteReferenceId === this.responseAP[i].quoteReferenceId) {
                      let newv = mx.newvalues;
                      console.log('newv',mx);
                      this.responseAP[i].totalCharge = mx.totalCharge;
                      this.responseAP[i].quoteIdAP = mx.quoteId;
                      this.responseAP[i].rateDetailOLDAP = newv

                    }
                  })
                }

              } else {
                this.responseAP[i].rateDetailOLDAP = [];
                this.responseAP[i].quoteIdAP = this.responseAP[i].quoteId;


              }

            }
            if (webRateFilter.length > 0) {
              console.log('webRateFilter', webRateFilter);
              let webRatex = JSON.parse(webRateFilter[0].rateDetail);
              // if (webRatex.totalCharge)
              if (webRatex.totalCharge !== '' && webRatex.totalCharge !== null && webRatex.totalCharge !== undefined && webRatex.totalCharge !== "NaN") {
                this.responseAP[i].webRate = webRatex.totalCharge;
                this.responseAP[i].webRateQuoteId = webRateFilter[0].quoteId;
              } else {
                this.responseAP[i].webRate = 0;
                this.responseAP[i].webRateQuoteId = webRateFilter[0].quoteId;
              }
              if (webRateFilter[0].carrier === 'YRC' || webRateFilter[0].carrier === 'REDDAWAY') {
                if (webRateFilter.length >1) {
                  this.responseAP[i].rateDetailWeb = webRateFilter[1].rateDetail;

                } else {
                  this.responseAP[i].rateDetailWeb = webRateFilter[0].rateDetail;

                }

              } else {
                this.responseAP[i].rateDetailWeb = webRateFilter[0].rateDetail;

              }

            } else {
              this.responseAP[i].webRate = 0;
              this.responseAP[i].webRateQuoteId = '';
              this.responseAP[i].rateDetailWeb = '';

            }
            if (ARFilter.length > 0) {
              console.log('ARFilter', ARFilter);

              let ArX = JSON.parse(ARFilter[0].rateDetail);

              if (ArX.totalCharge !== '' && ArX.totalCharge !== null && ArX.totalCharge !== undefined && ArX.totalCharge !== "NaN") {
                console.log('jefrin1',ARFilter);
                // let xx = JSON.parse(ARFilter[0].rateDetail);
                console.log('jefrin1',ArX);
                if (ArX.showcolor !== undefined) {
                  this.responseAP[i].showcolor = ArX.showcolor
                } else {
                  this.responseAP[i].showcolor = false

                }

                this.responseAP[i].totalChargeAR = ArX.totalCharge;
                this.responseAP[i].quoteIdAR = ARFilter[0].quoteId;
                this.responseAP[i].rateDetailAR = ArX;
                console.log('difference',this.responseAP[i],Number(this.responseAP[i].totalChargeAR[0]),this.responseAP[i].webRate);
                 if (this.responseAP[i].carrier === 'YRC'|| this.responseAP[i].carrier === 'REDDAWAY') {
                  this.responseAP[i].totalDifference = (((Number(this.responseAP[i].totalChargeAR[0]) - Number(this.responseAP[i].webRate)) / (Number(this.responseAP[i].totalChargeAR[0]))) * 100).toFixed();

                 } else {
                  this.responseAP[i].totalDifference = (((Number(this.responseAP[i].totalChargeAR[0]) - Number(this.responseAP[i].totalCharge)) / (Number(this.responseAP[i].totalChargeAR[0]))) * 100).toFixed();

                 }
                console.log('margin if', this.responseAP[i].totalDifference);
              } else {
                this.responseAP[i].totalChargeAR = 0;
                this.responseAP[i].quoteIdAR = ARFilter[0].quoteId;
                this.responseAP[i].rateDetailAR = ArX;
                this.responseAP[i].totalDifference = 0;
              }
            } else {
              this.responseAP[i].totalChargeAR = 0;
              this.responseAP[i].quoteIdAR = '';
              this.responseAP[i].rateDetailAR = '';
              this.responseAP[i].totalDifference = 0;
              console.log('margin else', this.responseAP[i].totalDifference);
            }
      
            if (costPlusFilter.length > 0) {
              console.log('webRateFilter', webRateFilter);
              if (costPlusFilter[0].totalCharge !== '' && costPlusFilter[0].totalCharge !== null && costPlusFilter[0].totalCharge !== undefined && costPlusFilter[0].totalCharge !== "NaN") {
                this.responseAP[i].costPlusRate = costPlusFilter[0].totalCharge;
                this.responseAP[i].costPlusRateQuoteId = costPlusFilter[0].quoteId;
                if (this.responseAP[i].totalDifference === 0) {
                  if (this.responseAP[i].carrier === 'YRC') {
                    this.responseAP[i].totalDifference = (((Number(this.responseAP[i].costPlusRate) - Number(this.responseAP[i].webRate)) / (Number(this.responseAP[i].costPlusRate))) * 100).toFixed();

                  } else {
                    this.responseAP[i].totalDifference = (((Number(this.responseAP[i].costPlusRate) - Number(this.responseAP[i].totalCharge)) / (Number(this.responseAP[i].costPlusRate))) * 100).toFixed();

                  }
                } else {
                  this.responseAP[i].totalDifference = 0;
                }
              } else {
                this.responseAP[i].costPlusRate = 0;
                this.responseAP[i].costPlusRateQuoteId = costPlusFilter[0].quoteId;
                this.responseAP[i].totalDifference = 0;
              }
            } else {
              this.responseAP[i].costPlusRate = 0;
              this.responseAP[i].costPlusRateQuoteId = '';
            }
            console.log('sst',this.responseAP[i]);

          }
        } else {
          console.log('else part', this.testResponse);
          this.showTable = false;
          this.showLoader = false;
          this.showErrorMessage = true;
          this.showDownloadButton = false;
        }
        this.logger = {
          'method': 'fetchByValue',
          'message': 'retrieving report details',
          'customerId': this.customerId
        };
        this.loggerService.info(this.logger);
      }, (err: any) => {
        this.showErrorMessage = true;
        this.showLoader = false;
      });
    }
  }

 YrcCalculation(response: any) {
   console.log(response);
 }

  getStateAndCity(zipCode: any) {
    this.city = '';
    this.state = '';
    this.pricingInfoService.getCityState(zipCode).subscribe(response => {
      this.zipCodeCityAndState = response;
      this.state = this.zipCodeCityAndState[0].state;
      this.city = this.zipCodeCityAndState[0].city;
      this.logger = {
        'method': 'getCityState',
        'message': 'retrieving city and state for zipcode',
        'zipCode': zipCode
      };
      this.loggerService.info(this.logger);
    });
  }
  getStateAndCityDest(zipCode: any) {
    this.destCity = '';
    this.destState = '';
    this.pricingInfoService.getCityState(zipCode).subscribe(data => {
      this.zipCodeCityAndState = data;
      this.destState = this.zipCodeCityAndState[0].state;
      this.destCity = this.zipCodeCityAndState[0].city;
      this.logger = {
        'method': 'getCityState',
        'message': 'retrieving city and state for zipcode',
        'zipCode': zipCode
      };
      this.loggerService.info(this.logger);
    });
  }

  // this method is to get the response for the particular quoteid:
  getResponseFromQuoteId(quoteId: any, type: any,extra: any) {
    this.totalapData = 0;
    console.log(extra);
    if (extra !== undefined) {
      this.totalapData = extra;

    }
    this.specificQuoteIdObject = {};
    this.rateDetailObject = {};
    this.singleReportData = [];
    this.rateDetailObject.assessorialList = [];
    this.assessorialList = [];
    $("#success-alert").hide();
    console.log('this.rateDetailObject.assessorialList', this.rateDetailObject.assessorialList);
    this.quoteReportService.getParticularReport(quoteId).subscribe(response => {
      this.singleReportData = response;
      this.quoteId = this.singleReportData[0].quoteReferenceId;
      // if (this.singleReportData[0].carrier === 'YRC' && this.singleReportData[0].category === 'OLDAP') {
      //   console.log(this.singleReportData);
      //   $('#Apquote_details').modal('show');

      // } else {
      //   $('#quote_details').modal('show');

      // }
      // if (type !== 'matrix') {
        if (this.singleReportData.length > 0) {
          this.specificQuoteIdObject = this.singleReportData[0];
          this.getStateAndCity(this.singleReportData[0].originZip);
          this.getStateAndCityDest(this.singleReportData[0].destinationZip);
          console.log('this.sendEmailArFlag', this.sendEmailArFlag, this.singleReportData);
          console.log('this.specificQuoteIdObject', this.specificQuoteIdObject);
          if (this.specificQuoteIdObject.carrier === 'OLDAP') {
            this.category = 'SMC3 AP';
          } else {
            this.category = this.specificQuoteIdObject.category;

          }
          if (this.singleReportData[0].category === 'AR') {
            this.sendEmailArFlag = true;
          } else if (this.singleReportData[0].category === 'COSTPLUS') {
            this.sendEmailArFlag = true;
          } else {
            this.sendEmailArFlag = false;
          }
          
          console.log('this.singleCustomerName', this.singleReportData[0].customerId, this.customerNamesAll,
            this.customerNamesAll[0].id);
          if (this.customerNamesAll.length > 0) {
            for (let i = 0; i < this.customerNamesAll.length; i++) {
              if (Number(this.singleReportData[0].companyId) === Number(this.customerNamesAll[i].id)) {
                this.singleCustomerName = this.customerNamesAll[i].companyName;
                console.log('this.singleCustomerName', this.singleCustomerName);
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
          console.log('this.rateDetailObject', this.rateDetailObject);
          console.log(this.rateDetailObject,this.rateDetailObject.fedexHighcost);
          this.highcostArray = [];
          if (this.rateDetailObject.fedexHighcost !== undefined) {

          
          this.highcostArray.push(this.rateDetailObject.fedexHighcost);
          }
          console.log(this.highcostArray);
          if (this.rateDetailObject.assessorialDataList !== undefined) {
          if (this.rateDetailObject.assessorialDataList.length > 0) {
            for (let i = 0; i < this.rateDetailObject.assessorialDataList.length; i++) {
              let dataNew = this.rateDetailObject.assessorialDataList[i].split('-');
              console.log('dataNew', dataNew);
              let dataObject = { name: dataNew[0], cost: dataNew[1].trim() };
              console.log('dataObject', dataObject);
              this.assessorialList.push(dataObject);

              console.log('this.assessorialList.', this.assessorialList);
            }
          }
        } else {
          this.assessorialList = []
        }
          // if (JSON.parse(this.singleReportData[0].classAndWeight).length > 0) {
          //   for (let w = 0; w < this.singleReportData[0].classAndWeight.length; w++) {
          //   this.weightArray.push(this.singleReportData[0].classAndWeight.weight)
          // }
          
          // }
          // this.rateDetailObject.totalWeight = this.netChargeArrSum(this.weightArray);
          console.log('this.rateDetailObject assess', this.rateDetailObject.assessorialDataList);
          this.fuelCharges = 0;
          console.log('jj',this.singleReportData[0].rateDetail);
          if (JSON.parse(this.singleReportData[0].rateDetail).netChargeResult !== undefined) {
            console.log('JSON.parse(this.singleReportData[0].rateDetail).netChargeResult.length',

            JSON.parse(this.singleReportData[0].rateDetail).netChargeResult);
          console.log('JSON.parse(this.singleReportData[0].rateDetail).netChargeResult.length',
            JSON.parse(this.singleReportData[0].rateDetail).netChargeResult.length);
          if (JSON.parse(this.singleReportData[0].rateDetail).netChargeResult.length > 0) {
            for (let g = 0; g < JSON.parse(this.singleReportData[0].rateDetail).netChargeResult.length; g++) {
              this.fuelCharges = this.fuelCharges + (Number(JSON.parse(this.singleReportData[0].rateDetail).netChargeResult[g]));
            }
          }
          else {
            for (let g = 0; g < JSON.parse(this.singleReportData[0].rateDetail).netChargeDiffResult.length; g++) {
              this.fuelCharges = this.fuelCharges + (Number(JSON.parse(this.singleReportData[0].rateDetail).netChargeDiffResult[g]));
            }
          }
         }  
        //  else {
        //     for (let g = 0; g < JSON.parse(this.singleReportData[0].rateDetail).netChargeDiffResult.length; g++) {
        //       this.fuelCharges = this.fuelCharges + (Number(JSON.parse(this.singleReportData[0].rateDetail).netChargeDiffResult[g]));
        //     }
        //   }
          console.log('JSON.parse(this.singleReportData[0].rateDetail).discountedRate.length',
            JSON.parse(this.singleReportData[0].rateDetail).discountedRate);
          console.log('JSON.parse(this.singleReportData[0].rateDetail).diffDiscountedRate.length',
            JSON.parse(this.singleReportData[0].rateDetail).diffDiscountedRate);
          this.charge = 0;
          if (JSON.parse(this.singleReportData[0].rateDetail).discountedRate.length > 0) {
            for (let f = 0; f < JSON.parse(this.singleReportData[0].rateDetail).discountedRate.length; f++) {
              this.charge = (this.charge + (Number(JSON.parse(this.singleReportData[0].rateDetail).discountedRate[f]))).toFixed(2);
            }
          } else {
            if (JSON.parse(this.singleReportData[0].rateDetail).diffDiscountedRate.length > 0) {
              for (let f = 0; f < JSON.parse(this.singleReportData[0].rateDetail).diffDiscountedRate.length; f++) {
                this.charge = (this.charge + (Number(JSON.parse(this.singleReportData[0].rateDetail).diffDiscountedRate[f]))).toFixed(2);
              }
            } else {
              console.log('else');
            }
          }
          this.showNextTable = true;

        } else {
          this.showNextTable = false;
        }
        this.logger = {
          'method': 'getParticularReport',
          'message': 'retrieving single report details using quoteId',
          'QuoteReferenceId': quoteId
        };
        this.loggerService.info(this.logger);
      });
  }

  /*Adding of array values Net charge */
  netChargeArrSum(netCharge: any) {
    let total = 0;
    netCharge.forEach(function (key: any) {
      total = total + Number(key);
    });
    return total;
  }

  getResponseForWebRate(quoteId: any) {
    this.specificQuoteIdObject = {};
    this.specificQuoteIdObjectWeb = {};
    this.rateDetailObject = {};
    this.rateDetailObjectForWeb = {};
    this.singleReportData = [];
    this.rateDetailObject.assessorialList = [];
    this.rateDetailObjectForWeb.assessorialList = [];
    
    this.assessorialList = [];
    this.assessorialListForWeb = [];
    let specificCompanyNameArray = [];
    let webRateArray: any = [];
    let finalTotalRate: any;
    (document.getElementById('additionalChargeId')as HTMLFormElement).className = 'td_left';
    (document.getElementById('totalChargeId')as HTMLFormElement).className = 'td_left';
    (document.getElementById('fuelChargeId')as HTMLFormElement).className = 'td_left';
    (document.getElementById('totalWeightId')as HTMLFormElement).className = 'td_left';
    (document.getElementById('additionalChargeId')as HTMLFormElement).className = 'td_left';
    (document.getElementById('AccessorialChargeId')as HTMLFormElement).className = 'td_left';
    this.quoteReportService.getParticularReportUsingReferenceId(quoteId).subscribe(response => {
      this.webrateComparisonResponse = response;
      console.log(this.webrateComparisonResponse)
      this.quoteId = this.webrateComparisonResponse[0].quoteReferenceId;
      if (this.webrateComparisonResponse.length > 0) {
        for (let w = 0; w < this.webrateComparisonResponse.length; w++) {
          let companyId = this.webrateComparisonResponse[w].companyId;
          specificCompanyNameArray = this.customerNamesAll.filter(function (el: any) {
            return el.id === companyId;
          })
          if (specificCompanyNameArray.length > 0) {
            this.singleCustomerName = specificCompanyNameArray[0].companyName;
          } else {
            this.singleCustomerName = '';
          }
          if (this.webrateComparisonResponse[w].category === 'WEB') {
            // if(this.webrateComparisonResponse[w].carrier === 'YRC') {
            //   console.log('1')
            //   webRateArray.push(this.webrateComparisonResponse[0])

            // } else {
            //   console.log('2');
            webRateArray.push(this.webrateComparisonResponse[w])
            // }
          } else if (this.webrateComparisonResponse[w].category === 'AP') {
            if(this.webrateComparisonResponse[w].carrier === 'YRC') {
              console.log('1')
              webRateArray.push(this.webrateComparisonResponse[w])
              // this.singleReportData.push(this.webrateComparisonResponse[w]);

            }  else {
              console.log('3');
              this.singleReportData.push(this.webrateComparisonResponse[w]);
            }


          } else if(this.webrateComparisonResponse[w].category === 'OLDAP') {
              
            console.log('2');
            this.singleReportData.push(this.webrateComparisonResponse[w]);
          
        }
        }
console.log(this.singleReportData);
        if (this.singleReportData.length > 0) {
          this.specificQuoteIdObject = this.singleReportData[0];
          this.getStateAndCity(this.singleReportData[0].originZip);
          this.getStateAndCityDest(this.singleReportData[0].destinationZip);

          this.rateDetailObject = JSON.parse(this.singleReportData[0].rateDetail);
          if (this.rateDetailObject.assessorialDataList.length > 0) {
            for (let i = 0; i < this.rateDetailObject.assessorialDataList.length; i++) {
              let dataNew = this.rateDetailObject.assessorialDataList[i].split('-');
              let dataObject = { name: dataNew[0], cost: dataNew[1].trim() };
              this.assessorialList.push(dataObject);
            }
          }
          this.fuelCharges = 0;
          console.log('this.singleReportData',this.singleReportData)
          // if (JSON.parse(this.singleReportData[0].rateDetail).netChargeResult !)
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
          this.showNextTable = true;

        }
        console.log('webRateArray', webRateArray);

        if (webRateArray.length > 0) {
          this.specificQuoteIdObjectWeb = webRateArray[0];
          console.log('webRateArray', webRateArray[0].rateDetail)
          console.log('webRateArray', webRateArray[0])
          this.rateDetailObjectForWeb = ''
          this.rateDetailObjectForWeb = JSON.parse(webRateArray[0].rateDetail);
          console.log('webRateArray', this.rateDetailObjectForWeb)

          console.log('this.rateDetailObjectForWeb', this.rateDetailObjectForWeb);
          if (this.rateDetailObjectForWeb.assessorialDataList.length > 0) {
            for (let i = 0; i < this.rateDetailObjectForWeb.assessorialDataList.length; i++) {
              let dataNew = this.rateDetailObjectForWeb.assessorialDataList[i].split('-');
              let dataObject = { name: dataNew[0], cost: dataNew[1].trim() };
              this.assessorialListForWeb.push(dataObject);
            }
          }
          console.log('this.rateDetailObject[r].weight', this.rateDetailObject.weight)

          if (this.rateDetailObjectForWeb.finalRate.length > 0) {
            if (this.rateDetailObjectForWeb.diffRate.length > 0) {
              finalTotalRate = this.netChargeArrSum(this.rateDetailObjectForWeb.finalRate) + this.netChargeArrSum(this.rateDetailObjectForWeb.diffRate);
            } else {
              finalTotalRate = this.netChargeArrSum(this.rateDetailObjectForWeb.finalRate);
            }
            if (this.rateDetailObjectForWeb.carrierType === 'REDDAWAY') {
              for (let r = 0; r < this.rateDetailObjectForWeb.finalRate.length; r++) {
                let rateWeb = (Number(this.rateDetailObjectForWeb.finalRate[r]) * 100 / Number(this.rateDetailObject.weight[r])).toFixed(2);

                this.rateDetailObjectForWeb.rate.push(rateWeb);
                console.log('this.rateDetailObject[r].weight', this.rateDetailObjectForWeb.rate);
              }
            } else {
              console.log('this.rateDetailObjectForWeb.rate Yrc', this.rateDetailObjectForWeb.rate);
              // // if (this.rateDetailObjectForWeb.rate.length > 0) {
              // //   this.rateDetailObjectForWeb.rate.push(this.rateDetailObjectForWeb.rate);
              //   
              // }
            }
          }

          if (this.rateDetailObjectForWeb.discount.length > 0) {
            this.rateDetailObjectForWeb.discount = this.rateDetailObjectForWeb.discount;
          } else {
            this.rateDetailObjectForWeb.discount = [];
          }

          this.fuelChargesWeb = 0;
          this.rateDetailObjectForWeb.fuelCharge = 0;
          if (JSON.parse(webRateArray[0].rateDetail).netChargeResult.length > 0) {
            for (let g = 0; g < JSON.parse(webRateArray[0].rateDetail).netChargeResult.length; g++) {
              this.fuelChargesWeb = this.fuelChargesWeb + (Number(JSON.parse(webRateArray[0].rateDetail).netChargeResult[g]));
              let netChargePercent = Number(JSON.parse(webRateArray[0].rateDetail).netChargeResult) * 100 / Number(finalTotalRate);
              console.log('netChargePercent', netChargePercent);
              this.rateDetailObjectForWeb.fuelCharge = netChargePercent.toFixed(2);
            }
          } else {
            this.fuelChargesWeb = 0;
            this.rateDetailObjectForWeb.fuelCharge = 0;
          }
          this.chargeWeb = 0;
          this.rateDetailObjectForWeb.discount = 0;
          if (this.rateDetailObjectForWeb.carrierType === 'REDDAWAY' || this.rateDetailObjectForWeb.carrierType === 'YRC') {
            if (JSON.parse(webRateArray[0].rateDetail).discountedRate.length > 0) {
              for (let f = 0; f < JSON.parse(webRateArray[0].rateDetail).discountedRate.length; f++) {
                // let discountedRate = this.chargeWeb + Number(finalTotalRate) - (Number(JSON.parse(webRateArray[0].rateDetail).discountedRate[f]));
                this.chargeWeb = this.chargeWeb + (Number(JSON.parse(webRateArray[0].rateDetail).discountedRate[f]));
                // this.chargeWeb = discountedRate.toFixed(2);
                console.log('this.chargeWeb', this.chargeWeb);
                let discountPercent = Number(JSON.parse(webRateArray[0].rateDetail).discountedRate) * 100 / Number(finalTotalRate);
                console.log('discountPercent', discountPercent);
                this.rateDetailObjectForWeb.discount = discountPercent.toFixed(2);
              }

            } else {
              this.chargeWeb = 0;
              this.rateDetailObjectForWeb.discount = 0;
            }
          } else {
            this.chargeWeb = finalTotalRate;
            this.rateDetailObjectForWeb.discount = 0;
          }
          this.showNextTable = true;

        }

        if (Number(this.rateDetailObjectForWeb.additionalCharge) !== Number(this.rateDetailObject.additionalCharge)) {
          // this.show
          console.log('difference');
          (document.getElementById('additionalChargeId')as HTMLFormElement).className = 'td_left difference';
        }
        if (Number(this.specificQuoteIdObjectWeb.totalCharge) !== Number(this.specificQuoteIdObject.totalCharge)) {
          (document.getElementById('totalChargeId')as HTMLFormElement).className = 'td_left difference';
        }
        if (Number(this.fuelChargesWeb) !== Number(this.fuelCharges)) {
          (document.getElementById('fuelChargeId')as HTMLFormElement).className = 'td_left difference';
        }

        if (Number(this.chargeWeb) !== Number(this.charge)) {

          (document.getElementById('totalWeightId')as HTMLFormElement).className = 'td_left difference';
        }
        if (this.assessorialList.length > 0) {
          if (this.assessorialList.length === this.assessorialListForWeb.length) {
            for (let a = 0; a < this.assessorialList.length; a++) {
              if (Number(this.assessorialList[a].cost) !== Number(this.assessorialListForWeb[a].cost)) {
               // document.getElementById('AccessorialChargeId').className = 'td_left difference';
              }
            }
          }
        }
        if (this.rateDetailObjectForWeb.assessorialChargeValue!== undefined && this.rateDetailObjectForWeb.assessorialChargeValue!== '') {
          if (Number(this.rateDetailObjectForWeb.assessorialChargeValue) !== Number(this.rateDetailObject.assessorialCharge)) {
             (document.getElementById('AccessorialChargeId')as HTMLFormElement).className = 'td_left difference';
          }
        }
      } else {
        this.showNextTable = false;
      }

    });

  }


  downloadData() {
    console.log('download');
    this.data = [];
    let parseClassWeight, parseRateDetail, parseRateDetailAR,parserateDetailOldAP;
    let userDetail = {};
    let companyName;
    console.log('jefrinn',this.oldRate);

    for (let i = 0; i < this.responseAP.length; i++) {
      console.log('this.responseAp[i]AP', this.responseAP[i]);
      let oldone;
// this.oldRate.forEach((mm) => {
//   if (this.responseAP[i].quoteReferenceId === mm.quoteReferenceId) {
//     console.log(JSON.parse(mm.rateDetail));
//     let parsedone = JSON.parse(mm.rateDetail);
//     oldone = parsedone.totalCharge;
//   }
// });    
  this.parseClass = [];
      this.parseWeight = [];
      console.log('this.responseAP[i].rateDetailAR ARRRR', this.responseAP[i].rateDetailAR);
      console.log('this.responseAP[i].rateDetail APPPP', this.responseAP[i].rateDetail);
      let OldAPRate;
      if (this.responseAP[i].rateDetailOLDAP !== undefined  ) {
        OldAPRate = this.responseAP[i].rateDetailOLDAP;

      } else {
        OldAPRate = '';

      }
      console.log('',OldAPRate);
      parseClassWeight = JSON.parse(this.responseAP[i].classAndWeight);
      if (this.responseAP[i].rateDetail !== '' && this.responseAP[i].rateDetail !== 0) {
        parseRateDetail = JSON.parse(this.responseAP[i].rateDetail);
      } else {
        parseRateDetail = [];
      }

      if (this.responseAP[i].rateDetailAR !== '' && this.responseAP[i].rateDetailAR !== 0) {
        // if (this.responseAP[i].rateDetailAR.totalCharge === undefined) {
          if (typeof this.responseAP[i].rateDetailAR === 'string') {
            parseRateDetailAR = JSON.parse(this.responseAP[i].rateDetailAR);
          } else {
            parseRateDetailAR = this.responseAP[i].rateDetailAR
          }
        
      } else {
        parseRateDetailAR = [];
      }
      let parseRateDetailWeb;
      if (this.responseAP[i].rateDetailWeb !== '' && this.responseAP[i].rateDetailWeb !== 0) {
        if (this.responseAP[i].rateDetailWeb.totalCharge === undefined) {

        parseRateDetailWeb = JSON.parse(this.responseAP[i].rateDetailWeb);
        }
      } else {
        parseRateDetailWeb = [];
      }


      // console.log('parseRateDetail', parseRateDetail.rate);
      // console.log('parseRateDetail', parseRateDetailWeb);
      // console.log('parseRateDetailAR', parseRateDetailAR.rate);
      // console.log('parseRateDetail', parseRateDetail);
      // console.log('parseRateDetailparseRateDetail.discountedRate', parseRateDetail.discountedRate);
      // console.log('parseRateDetailparseRateDetail.DiffdiscountedRate', parseRateDetail.diffDiscountedRate);
      // console.log('externalCustomersDetail', this.responseAP[i].externalCustomersDetail, i);
      for (let j = 0; j < parseClassWeight.length; j++) {
        const class1 = parseClassWeight[j].classification;
        const weight1 = parseClassWeight[j].weight;
        this.parseClass.push(class1);
        this.parseWeight.push(weight1);
      }
      if (parseRateDetail.discountedRate !== undefined) {
        if (parseRateDetail.discountedRate.length === 0) {
          if (parseRateDetail.diffDiscountedRate !== undefined) {
            parseRateDetail.discountedRate = parseRateDetail.diffDiscountedRate.toString();

          } else {
            parseRateDetail.discountedRate = '-';
          }
          console.log('Ifffffff', parseRateDetail.discountedRate, i);
        } else {
          parseRateDetail.discountedRate = parseRateDetail.discountedRate.toString();
          console.log('Elsernghnh', parseRateDetail.discountedRate, i);
        }
      } else {
        parseRateDetail.discountedRate = '-';
      }
      if (parseRateDetail.netChargeResult !== undefined) {
        if (parseRateDetail.netChargeResult.length === 0) {
          parseRateDetail.netChargeResult = parseRateDetail.netChargeDiffResult.toString();
          console.log('Ifffffff', parseRateDetail.netChargeResult, i);
        } else {
          parseRateDetail.netChargeResult = parseRateDetail.netChargeResult.toString();
          console.log('Elsernghnh', parseRateDetail.netChargeResult, i);
        }
      } else {
        parseRateDetail.netChargeResult = '-';
      }
      if (parseRateDetail.discount !== undefined) {
        parseRateDetail.discount = parseRateDetail.discount.toString();
      } else {
        parseRateDetail.discount = '-';
      }
      if (parseRateDetail.fuelCharge !== undefined) {
        parseRateDetail.fuelCharge = parseRateDetail.fuelCharge.toString();
      } else {
        parseRateDetail.fuelCharge = '-';
      }
      if (parseRateDetail.rate !== undefined) {
        parseRateDetail.rate = parseRateDetail.totalCharge[0].toString();
      } else {
        parseRateDetail.rate = '-';
      }
      console.log(OldAPRate,parseRateDetail,parseRateDetailAR)
      let rate1;
      if (OldAPRate.rate !== undefined && OldAPRate.rate !== '') {
        console.log('dd',OldAPRate);
        if (Array.isArray(OldAPRate.totalCharge)) {
          rate1 = OldAPRate.totalCharge[0];

        } else {
         rate1 = OldAPRate.totalCharge;

        }
      } else {
        console.log('dd',parseRateDetail);

        if (Array.isArray(parseRateDetail.totalCharge)) {

        rate1 = parseRateDetail.totalCharge[0];
        } else {
          // OldAPRate.rate1 = '0'
          rate1 = parseRateDetail.totalCharge;

        }
      }
      if (parseRateDetailWeb.rate !== undefined) {
        if (Array.isArray(parseRateDetailWeb.totalCharge)) {
          parseRateDetailWeb.rate1 = parseRateDetailWeb.totalCharge[0].toString();

        } else {
        parseRateDetailWeb.rate1 = parseRateDetailWeb.totalCharge.toString();
        }
      } else {
        parseRateDetailWeb.rate1 = '-';
      }
      if (parseRateDetailWeb.discountedRate !== undefined) {
        parseRateDetailWeb.discountedRate1 = parseRateDetailWeb.discountedRate.toString();
      } else {
        parseRateDetailWeb.discountedRate1 = '-';
      }
      if (parseRateDetail.finalRate !== undefined) {
        parseRateDetail.finalRate = parseRateDetail.finalRate.toString();
      } else {
        parseRateDetail.finalRate = '-';
      }
      if (parseRateDetailWeb.finalRate !== undefined) {
        parseRateDetailWeb.finalRate1 = parseRateDetailWeb.finalRate.toString();
      } else {
        parseRateDetailWeb.finalRate1 = '-';
      }
      if (parseRateDetail.highCostDeliveryCharge !== undefined) {
        parseRateDetail.highCostDeliveryCharge = parseRateDetail.highCostDeliveryCharge;
      } else {
        parseRateDetail.highCostDeliveryCharge = 0;
      }
      if (parseRateDetail.additionalCharge !== undefined) {
        parseRateDetail.additionalCharge = parseRateDetail.additionalCharge;
      } else {
        parseRateDetail.additionalCharge = 0;
      }
      if (parseRateDetail.assessorialCharge !== undefined) {
        parseRateDetail.assessorialCharge = parseRateDetail.assessorialCharge;
      } else {
        parseRateDetail.assessorialCharge = 0;
      }
      if (this.responseAP[i].companyName !== undefined) {
        companyName = this.responseAP[i].companyName;
      } else {
        companyName = '-';
      }
      let discount;
      console.log(parseRateDetailAR)
      console.log(parseRateDetailAR.discount);
      if (parseRateDetailAR.discount !== '' && parseRateDetailAR.discount !== undefined && parseRateDetailAR.discount !== null) {
        discount = parseRateDetailAR.discount.toString();
      } else {
        discount = 0;
      }
      let rate;
      if (parseRateDetailAR.rate !== '' && parseRateDetailAR.rate !== undefined && parseRateDetailAR.rate !== null) {
        if (Array.isArray(parseRateDetailAR.totalCharge)) {

        rate = parseRateDetailAR.totalCharge[0].toString();
        } else {
          rate = parseRateDetailAR.totalCharge.toString();

        }
      } else {
        rate = 0;
      }

      let fuelCharge;
      if (parseRateDetailAR.fuelCharge !== '' && parseRateDetailAR.fuelCharge !== undefined && parseRateDetailAR.fuelCharge !== null) {
        fuelCharge = parseRateDetailAR.fuelCharge.toString();
      } else {
        fuelCharge = 0;
      }
      let finalRate;
      if (parseRateDetailAR.finalRate !== '' && parseRateDetailAR.finalRate !== undefined && parseRateDetailAR.finalRate !== null) {
        finalRate = parseRateDetailAR.finalRate.toString();
      } else {
        finalRate = 0;
      }
      let finalRateApOld;
      if (OldAPRate.finalRate !== '' && OldAPRate.finalRate !== undefined && OldAPRate.finalRate !== null) {
        if (Array.isArray(OldAPRate.finalRate)) {

          finalRateApOld = OldAPRate.finalRate[0];
        } else {
          finalRateApOld = OldAPRate.finalRate;

        }
      } else {
        if (Array.isArray(parseRateDetail.finalRate)) {
          finalRateApOld = parseRateDetail.finalRate[0];

        } else {
          finalRateApOld = parseRateDetail.finalRate;

        }
      }
      let discountedRate;
      if (parseRateDetailAR.discountedRate !== '' && parseRateDetailAR.discountedRate !== undefined && parseRateDetailAR.discountedRate !== null) {
        discountedRate = parseRateDetailAR.discountedRate.toString();
      } else {
        discountedRate = 0;
      }
      let netChargeResult;
      if (parseRateDetailAR.netChargeResult !== '' && parseRateDetailAR.netChargeResult !== undefined && parseRateDetailAR.netChargeResult !== null) {
        netChargeResult = parseRateDetailAR.netChargeResult.toString();
      } else {
        netChargeResult = 0;
      }
      let highCostDeliveryCharge;
      if (parseRateDetailAR.highCostDeliveryCharge !== '' && parseRateDetailAR.highCostDeliveryCharge !== undefined && parseRateDetailAR.highCostDeliveryCharge !== null) {
        highCostDeliveryCharge = parseRateDetailAR.highCostDeliveryCharge.toString();
      } else {
        highCostDeliveryCharge = 0;
      }
      let additionalCharge;
      if (parseRateDetailAR.additionalCharge !== '' && parseRateDetailAR.additionalCharge !== undefined && parseRateDetailAR.additionalCharge !== null) {
        additionalCharge = parseRateDetailAR.additionalCharge.toString();
      } else {
        additionalCharge = 0;
      }
      let assessorialCharge;
      if (parseRateDetailAR.assessorialCharge !== '' && parseRateDetailAR.assessorialCharge !== undefined && parseRateDetailAR.assessorialCharge !== null) {
        assessorialCharge = parseRateDetailAR.assessorialCharge.toString();
      } else {
        assessorialCharge = 0;
      }
      console.log('parseRateDetailAR.discount', parseRateDetailAR.discount);
      console.log('parseRateDetailAR.finalRate', parseRateDetailAR.finalRate);
      userDetail = {
        'Company Name': companyName,
        'QuoteNo': this.responseAP[i].quoteReferenceId,
        'Carrier': this.responseAP[i].carrier,
        'Origin': this.responseAP[i].originZip,
        'Destination': this.responseAP[i].destinationZip,
        'Class': this.parseClass.toString(),
        'Weight': this.parseWeight.toString(),
        
        'AP Discount(%)': parseRateDetail.discount,
        'AR Discount(%)': discount,
        'AP Fuel Surcharge(%)': parseRateDetail.fuelCharge,
        'AR Fuel Surcharge(%)': fuelCharge,
        'SMC3 AP': rate1,
        'Web AP': parseRateDetailWeb.rate1,
        'AR Rate': rate,
        // 'OldApRate': '',
        'Web AP Charge': parseRateDetail.finalRate,
        'SMC3 AP Charge': finalRateApOld,
        'AR Charge': finalRate,
        // 'Web Discounted Rate': parseRateDetailWeb.discountedRate1,
        'AP Discounted Rate': parseRateDetail.discountedRate,
        'AR Discounted Rate': discountedRate,
        // 'Web Net charge': parseRateDetail.netChargeResult,
        'AP Net charge': parseRateDetail.netChargeResult,
        'AR Net charge': netChargeResult,
        'AP High cost delivery charges': parseRateDetail.highCostDeliveryCharge,
        'AR High cost delivery charges': highCostDeliveryCharge,
        'AP Additional charges': parseRateDetail.additionalCharge,
        'AR Additional charges': additionalCharge,
        'AP Accessorial charges': parseRateDetail.assessorialCharge,
        'AR Accessorial charges': assessorialCharge,
        'AP Price': this.responseAP[i].totalCharge,
        'AR Price': this.responseAP[i].totalChargeAR,
        'Margin': this.responseAP[i].totalDifference,
        'DateCreated': this.responseAP[i].createdOn,
        'Time': this.responseAP[i].time
      };
      let userDetailAR = {
        'AR Discount(%)': parseRateDetailAR.discount,
        'AR Fuel Surcharge(%)': parseRateDetailAR.fuelCharge
      }
      console.log('userDetailAR', userDetailAR);
      this.data.push(userDetail);
    }
    if (this.data.length > 0) {
      this.toastr.success('Report is generated successfully');
    } else {
      this.toastr.error('Error in generating report');
    }
    console.log('data', this.data);
    this.excelService.exportAsExcelFile(this.data, 'Report');
    this.logger = {
      'method': 'exportAsExcelFile',
      'message': 'Download report details',
      'salesrepId': this.salesRepId
    };
    this.loggerService.info(this.logger);
  }


  sendMail() {
    this.quoteReportService.sendMailFunction().subscribe((response: any) => {
      this.mailResponse = response;
      console.log('this.mailResponse', this.mailResponse);
      if (this.mailResponse.result === true) {
        this.toastr.success('Mail has been sent successfully');
      } else {
        this.toastr.error('Failed to send mail');
      }
      this.logger = {
        'method': 'sendMailFunction',
        'message': 'sending report to the mail',
        'salesrepId': this.salesRepId
      };
      this.loggerService.info(this.logger);
    });
  }

  sendMailAr(quoteId: any, salesRepId: any, type: any, category: any) {
  let object = {
    quoteId: quoteId,
    salesRepId: salesRepId,
    type: type,
  category: category
  }
  console.log('quoteId', quoteId);
  console.log('object', object);
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
}
