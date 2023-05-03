import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { InvoiceService } from '../services/invoice.service';
import { PricingInfoService } from '../services/pricing-info.service';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
// import {http} from '@angular/ht'
// import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {saveAs}  from 'file-saver';
// import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import Swal from 'sweetalert2';
import  html2canvas from "html2canvas";
import  jsPDF from 'jspdf';
declare var $: any;

@Component({
  selector: 'app-workbook-customer-info',
  templateUrl: './workbook-customer-info.component.html',
  styleUrls: ['./workbook-customer-info.component.css']
})
export class WorkbookCustomerInfoComponent implements OnInit {
  customerForm: FormGroup = new FormGroup({});
  accessToken: any;
  salesRepNames: any;
  editSalesrep: any = false; 
  zipcodeResponse: any;
  companyInfo: any;
  loginDetails: any;
  companyNames:any = [];
  companyDetails = [];
  imageData: any;
  companyInformation: any;
  showDifferentColor = false;
  companyInformationSub: any = new Subscription;
  zipCodeErrorResponse = false;
  zipCodeContactErrorResponse = false;
  customerDetails: any;
  salesRepArray: any = [];
  base64textString: any;
  showPicAttached = false;
  base64ToImage = '';
  base64: any;
  selectedPictures: any = [];
  file: any;
  picShowFlag = false;
  filenames: any = [];
  viewImageData = '';
  picturesNames: any = [];
  uploadedPictures: any = [];
  enableViewPicturesUploaded = false;
  pricingList: any = []
  enableViewPrePricingPicturesUploaded: boolean = false;
  uploadedPricingPictures: any = [];
  pricingNames: any = [];
  deletedUploadedPricingPictures: any = [];
  deletedUploadedPictures: any = [];
  trafficDataEnableSubscriber: Subscription = new Subscription;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  showContract = false;
  showerrorMessage = false;
  contractList: any = [];
  contractListFTL: any = [];
  contractListLTL: any = [];
  territoryArray: any = [];
  additionalPricingArray: any =[];
  contractAccessorialsArray: any = [];
  shippingManagerName: any;
  shippingManagerPost:any;
  firstDate: any;
  secondDate: any;
  contractAddrss: any;
  displayShipmentName: string = '';
  showSecondAddress = false;
  showFirstAddress = false;
  contractname: any;
  billadd1: any;
  billadd2: any;
  billadd3: any;
  billadd4: any;
  companyRulesArray: any;
  fxfeApArray:any = [];
fxfeArArray:any = [];
fxfpApArray:any = [];
fxfpArArray:any = [];
yrcApArray:any = [];
yrcArArray:any = [];
reddawayApArray:any = [];
reddawayArArray:any = [];
fedexRowspan = 0;
priorityrowspan = 0;
yrcrowspan = 0;
reddawayrowspan = 0;
  costplusArray: any;
  passingArray: any;
  specialRulesAccessorialArray: any;
  constructor(private invoiceService: InvoiceService,
    private fb: FormBuilder,
    private pricingInfoService: PricingInfoService,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router, private http: HttpClient,
    private datePipe: DatePipe) {
    console.log('Customer screen');

    //   this.companyInformationSub = this.invoiceService.customerMethod$.subscribe(
    //   response => {
    //     this.companyInformation = response;
    //     if (this.companyInformation['fromTab'] === 'Invoice' || this.companyInformation['fromTab'] === 'Workbook') {
    //       this.companyInformation.showFlag = true;
    //       console.log('this.companyInformation', this.companyInformation);
    //     } else {
    //       this.companyInformation = null;
    //     }
    //   }
    // );
  }

  ngOnInit() {
    console.log('Customer screen initializing');
    let details: any = localStorage.getItem(('SalesRepName'));
    this.loginDetails = JSON.parse(details);
    this.accessToken = localStorage.getItem('accessToken');
    this.getSalesRepNames();
     this.companyInformation = this.invoiceService.getCompanyInformation1();
   // this.companyInformation = null;
    console.log('this.companyInformation', this.companyInformation);
    this.buildForm();
    this.getDetails();
    this.fetchCompanyDetails();
    if(this.companyInformation !== undefined) {
    this.getContractList();

    }
    let object = '';
    this.invoiceService.setSocketData(object);
    this.trafficDataEnableSubscriber = this.invoiceService.trafficDataEnableObservable.subscribe((response) => {
      if(response !== null) {
        // this.itemArray = response ;
        // this.newTrafficDataArray = response;
        console.log(response );
      }
    });

  }
  buildForm() {
    console.log('Customer screen buildForm');
    this.customerForm = this.fb.group({
      salesRepId: ['', Validators.required],
      companyName: ['', Validators.required],
      typeOfUser: [true],
      isContactAddressSame: [true],
      companyShippingAddress: [''],
      companyZip: [''],
      companyCity: [''],
      companyState: [''],
      contactPersonName: [''],
      contactPersonDesignation: [''],
      contactPersonPhoneNumber: [''],
      contactPersonFax: [''],
      picturesAttached: [false],
      prePricingAuthorizationAttached: [false],
      accountPersonName: [''],
      accountPersonDesignation: [''],
      accountPersonPhoneNumber: [''],
      accountPersonFax: [''],
      accountPersonShippingAddress: [''],
      accountPersonZip: [''],
      accountPersonCity: [''],
      accountPersonState: [''],
      potentialAnnualForteRevenue: [''],
      paymentTerms: [''],
      estimatedExtendedCredit: [''],
      creditReport: [''],
      bolRequired: [false],
      poRequired: [true],
      ratingNotes: [''],
      apCarrier: [''],
      arCarrier: [''],
      createdBy: [''],
      pictures: [''],
      prePricing: [''],
      id: [0],
      workbookCompany : [false]
    });
    this.customerForm.patchValue({
      salesRepId: this.loginDetails.salesRepName
    });
  }
  getDetails() {
    console.log(this.loginDetails);
    if (this.loginDetails.type === 'administrator') {
      this.showContract = true;
    this.invoiceService.getCompanyDetailsnew(this.loginDetails.id, this.accessToken).subscribe((response: any) => {
      console.log(response);
      this.companyDetails = response;
      this.companyDetails.sort(this.dynamicSort('companyName'));
      if (this.companyDetails.length > 0) {
        console.log(this.companyDetails);
        this.companyDetails.forEach((ele:any) => {
          this.companyNames.push(ele.companyName);
        })
        // for (let c = 0; c < this.companyDetails.length; c++) {
        //   this.companyNames.push(this.companyDetails[c].companyName);
        // }
      }
    });
    } else if (this.loginDetails.type === 'internalSalesRep') {
      this.showContract = false;

      this.invoiceService.getCompanyDetailsnewUsingId(this.loginDetails.id, this.accessToken).subscribe((response: any) => {
        console.log(response);
        this.companyDetails = response;
        this.companyDetails.sort(this.dynamicSort('companyName'));
        if (this.companyDetails.length > 0) {
          this.companyDetails.forEach((ele) => {
            this.companyNames.push(ele);
          })
        }
      });
    }
  }

  getContractList() {
    this.setCustomerObject();

    console.log(this.companyInformation);
    this. showSecondAddress = false;
    this.showFirstAddress = false;
    this.customerService.getcompanyContract(this.companyInformation.id).subscribe((re: any) => {
      console.log(re);
      let apiRE: [] = re;
      this.contractList = []
      if (apiRE.length > 0) {
        apiRE.forEach((mm) => {
          this.contractList.push(mm);
          this.contractList.sort(function(a: any, b: any){return b.id - a.id});
console.log(this.contractList);
  
        })
      } else {
        this.contractList = [];
      }
     
    })
  }

  viewContractCompanyDetails() {
    this.contractListFTL = [];
    this.contractListLTL = [];
this.contractList.forEach((ele: any) => {
  let ff = ele.contractName.split('_');
  if (ff[0] === 'FTL') {
    this.contractListFTL.push(ele);
    this.contractListFTL.sort(function(a: any, b: any){return b.id - a.id});
console.log(this.contractListFTL);
  } else if (ff[0] === 'LTL') {
    this.contractListLTL.push(ele);
    this.contractListFTL.sort(function(a: any, b: any){return b.id - a.id});
    console.log(this.contractListLTL);

  }

})
  }
  checkcompanyName(name: any) {
    console.log('name', name);
    console.log(this.companyDetails);
    console.log(this.companyNames);
    let existingCompanyName = this.companyNames.filter((e:any) => {
      return name.toUpperCase() === e;
    });
    console.log(existingCompanyName);
    if (existingCompanyName.length > 0 ) {
      this.showerrorMessage = true;
    } else {
      this.showerrorMessage = false;

    }
  }
  changeSalesRep() {
    this.editSalesrep = true;
    this.getSalesRepNames();
  }
  getSalesRepNames() {
    this.invoiceService.getSalesRepDetails(this.accessToken).subscribe(response => {
      this.salesRepNames = response;
      if (this.companyInformation!==null && this.companyInformation!==undefined) {
        let salesRepId = this.companyInformation.salesRepId;
        console.log(salesRepId)

        if (this.salesRepNames!== undefined) {
          if (this.salesRepNames.length > 0) {
            if (this.editSalesrep === false) {
              this.salesRepArray = this.salesRepNames.filter(function(el:any){
                return el.id === salesRepId;
        
              });
            } else {
              let name: any;
              let sname:any =this.companyInformation.salesRepName;
              this.salesRepArray = this.salesRepNames;
              console.log(sname)
              name = this.salesRepNames.filter(function(el:any){
                return el.salesRepName === sname;
        
              });
              console.log(name)

              this.customerForm.patchValue({
          salesRepId: name[0].salesRepName
        }); 
            }
        
  
        // this.customerForm.patchValue({
        //   salesRepId: this.salesRepArray[0].salesRepName
        // }); 
      }
      }
    }
    });
  }
  editsave(customerForm:any) {
    console.log(customerForm);
    customerForm.workbookCompany = this.companyInformation.workbookCompany;
this.saveData(customerForm);

  }
  patchContactInfo(value: any, type:any) {
    console.log(type);
    // this.showDifferentColor = false;
    if (type === 'companyShippingAddress') {
      if (value.isContactAddressSame === true) {
        this.customerForm.patchValue({
          accountPersonShippingAddress: value.companyShippingAddress
        });
      }
    } else if (type === 'companyZip') {
      if (value.isContactAddressSame === true) {
        this.customerForm.patchValue({
          accountPersonZip: value.companyZip,
         
        });
        this.checkForZipCodes(this.customerForm.controls['accountPersonZip'].value, 'contactZip')
      }
    } else if (type === 'companyCity') {
      if (value.isContactAddressSame === true) {
        this.customerForm.patchValue({
      accountPersonState: value.companyState,
      accountPersonCity: value.companyCity
        })
      }
    } else if (type === 'contactPersonFax') {
      if (value.isContactAddressSame === true) {
        this.customerForm.patchValue({
          accountPersonFax: value.contactPersonFax
        });
      }
    } else if (type === 'contactPersonPhoneNumber') {
      if (value.isContactAddressSame === true) {
        this.customerForm.patchValue({
          accountPersonPhoneNumber: value.contactPersonPhoneNumber,
          contactPersonPhoneNumber: value.contactPersonPhoneNumber
        });
      } else {
        this.customerForm.patchValue({
          contactPersonPhoneNumber: value.contactPersonPhoneNumber
        });
      }
    } else if (type === 'accountPersonPhoneNumber') {
      // if (value.isContactAddressSame === true) {
        this.customerForm.patchValue({
          accountPersonPhoneNumber: value.accountPersonPhoneNumber,
          contactPersonPhoneNumber: value.contactPersonPhoneNumber
        });
      // }
    }
  }
  checkForCompany(event: any, formValue: any) {
    console.log(event);

    let companyValues = [];
    this.uploadedPricingPictures = [];
    this.uploadedPictures = [];
    // this.invoiceService.trafficDataEnableSubject.unsubscribe();
        // this.getSalesRepNames();
        let emptyArray = null;
        let data = undefined;
        this.invoiceService.setTrafficData(emptyArray);
        let object = {
          carrier: '',
          values: [],
          invalidData: []
        }
        this.invoiceService.setTrafficDataEnable(object);
        this.invoiceService.setUploadedData(data);

        // this.invoiceService.trafficDataEnableSubject.unsubscribe();

        let passingObject = undefined;
        this.invoiceService.setAnalyticsCode(passingObject);  
          companyValues = this.companyDetails.filter(function (el: any) {
      return el.companyName === event.target.value;
    });
    if (companyValues.length > 0) {
      this.companyInformation = companyValues[0];
      console.log('this.companyInformation', this.companyInformation);
      this.companyInformation.typeOfUser = true;
      this.companyInformation.idSalesRep = this.companyInformation.salesRepId;

      let salesRepId = this.companyInformation.salesRepId;
      this.salesRepArray = this.salesRepNames.filter(function (el: any) {
        return el.id === salesRepId;
      });
      this.customerForm.reset();
      this.companyInformation.salesRepId = this.salesRepArray[0].salesRepName;
      if (this.companyInformation.isContactAddressSame === null || this.companyInformation.isContactAddressSame !== undefined) {
        this.companyInformation.isContactAddressSame = true;
      }
      if (this.companyInformation.status !== 'active' && this.companyInformation.status === undefined) {
        // this.customerForm.patchValue({...this.companyInformation});
        this.patchAllValues();
        // this.customerForm.patchValue({
        //   companyName: this.companyInformation.companyName,
        //   isContactAddressSame: this.companyInformation.isContactAddressSame, typeOfUser: true,
        // //  salesRepId: this.salesRepArray[0].salesRepName,
        //   companyShippingAddress: this.companyInformation.companyShippingAddress,
        //   companyZip: this.companyInformation.companyZip,
        //   companyCity: this.companyInformation.companyCity,
        //   companyState: this.companyInformation.companyState,
        //   contactPersonPhoneNumber: this.companyInformation.contactPersonPhoneNumber,
        //   contactPersonName: this.companyInformation.contactPersonName,
        // });
      } else {
        this.companyInformation.isContactAddressSame = true;
        if (this.companyInformation.externalCustomersDetail !== undefined) {
          if (this.companyInformation.externalCustomersDetail.length > 0) {
            if (this.companyInformation.externalCustomersDetail.length === 1) {
              this.customerDetails = this.companyInformation.externalCustomersDetail[0];
              console.log('this.customerDetails', this.customerDetails);
              this.companyInformation.contactPersonName = this.customerDetails.customerName;
              this.companyInformation.contactPersonPhoneNumber = this.customerDetails.contactNumber;
            }
          }
        }
        this.customerForm.reset();
        this.customerForm.patchValue({
          salesRepId: this.salesRepArray[0].salesRepName,
          companyShippingAddress: this.companyInformation.address,
          companyZip: this.companyInformation.zip,
          companyCity: this.companyInformation.city,
          companyState: this.companyInformation.state,
          companyName: this.companyInformation.companyName,
          typeOfUser: this.companyInformation.typeOfUser,
          contactPersonPhoneNumber: this.companyInformation.contactPersonPhoneNumber,
          contactPersonName: this.companyInformation.contactPersonName,
          id: this.companyInformation.id
        });
      }
    }
    if (this.companyInformation.isContactAddressSame === true) {
      this.contactInfo(this.companyInformation, 'similar');
    }
    this.getContractList();

  /*   if (this.companyInformation.pictures !== null) {
      if (this.companyInformation.pictures.length > 0) {
            this.enableViewPicturesUploaded = true;
      this.customerForm.controls.picturesAttached.setValue(true);
      this.companyInformation.pictures.forEach((obj) => {
        this.uploadedPictures.push({
          name: obj,
          image: ''
        });
      });
    // this.filenames=  this.uploadedPictures;
      }
    } else {
      this.uploadedPictures = [];
      this.enableViewPicturesUploaded = false;
      this.customerForm.controls.picturesAttached.setValue(false);
    }

    if(this.companyInformation.prePricing !== null) {
      if (this.companyInformation.prePricing.length > 0) {
     this.enableViewPrePricingPicturesUploaded = true;
     this.customerForm.controls.prePricingAuthorizationAttached.setValue(true);
     this.companyInformation.prePricing.forEach((obj) => {
       this.uploadedPricingPictures.push({
         name: obj,
         image: ''
       });
     });
    }
  //  this.pricingList =  this.uploadedPricingPictures;
    } else {
      this.uploadedPricingPictures = [];
      this.enableViewPrePricingPicturesUploaded = false;
      this.customerForm.controls.prePricingAuthorizationAttached.setValue(false);

    } */

  }

  patchAllValues() {
    // let emptyArray = [];
    // this.invoiceService.setTrafficData(emptyArray);
    let paymentTerm;

if (this.companyInformation.paymentTerms === null || this.companyInformation.paymentTerms === undefined || this.companyInformation.paymentTerms === '')  {
paymentTerm = '20';
this.showDifferentColor = false;

} else {
  paymentTerm = this.companyInformation.paymentTerms;
  if (paymentTerm !== '20') {
    this.showDifferentColor = true;

  } else {
    this.showDifferentColor = false;

  }
}

    console.log('this.patchALlvalues', this.companyInformation);
    this.editSalesrep = false;
    this.customerForm.patchValue({
      companyName: this.companyInformation.companyName,
      isContactAddressSame: this.companyInformation.isContactAddressSame, typeOfUser: true,
      salesRepId: this.companyInformation.salesRepId,
      companyShippingAddress: this.companyInformation.companyShippingAddress,
      companyZip: this.companyInformation.companyZip,
      companyCity: this.companyInformation.companyCity,
      companyState: this.companyInformation.companyState,
      contactPersonPhoneNumber: this.companyInformation.contactPersonPhoneNumber,
      contactPersonDesignation: this.companyInformation.contactPersonDesignation,
      contactPersonName: this.companyInformation.contactPersonName,
      contactPersonFax: this.companyInformation.contactPersonFax,
      picturesAttached: this.companyInformation.picturesAttached,
      prePricingAuthorizationAttached: this.companyInformation.prePricingAuthorizationAttached,
      accountPersonName: this.companyInformation.accountPersonName,
      accountPersonDesignation: this.companyInformation.accountPersonDesignation,
      accountPersonPhoneNumber: this.companyInformation.accountPersonPhoneNumber,
      accountPersonFax: this.companyInformation.accountPersonFax,
      accountPersonShippingAddress: this.companyInformation.accountPersonShippingAddress,
      accountPersonZip: this.companyInformation.accountPersonZip,
      accountPersonCity: this.companyInformation.accountPersonCity,
      accountPersonState: this.companyInformation.accountPersonState,
      potentialAnnualForteRevenue: this.companyInformation.potentialAnnualForteRevenue,
      paymentTerms: paymentTerm,
      estimatedExtendedCredit: this.companyInformation.estimatedExtendedCredit,
      creditReport: this.companyInformation.creditReport,
      bolRequired: this.companyInformation.bolRequired,
      poRequired: this.companyInformation.poRequired,
      ratingNotes: this.companyInformation.ratingNotes,
      createdBy: this.companyInformation.createdBy,
      id: this.companyInformation.id,
      pictures:this.companyInformation.pictures,
      prePricing: this.companyInformation.prePricing
    });
    this.customerForm.patchValue({ salesRepId: this.companyInformation.salesRepId });
      if (this.companyInformation.pictures !== null) {
      if (this.companyInformation.pictures.length > 0 ) {
      this.enableViewPicturesUploaded = true;
      this.customerForm.controls['picturesAttached'].setValue(true);
      this.companyInformation.pictures.forEach((obj: any) => {
        this.uploadedPictures.push({
          name: obj,
          image: ''
        });
        this.picturesNames.push(obj);
      });
    }
    // this.filenames=  this.uploadedPictures;
    } else if (this.companyInformation.pictures === null || this.companyInformation.pictures.length === undefined) {
      this.uploadedPictures = [];
      this.picturesNames = [];
      this.enableViewPicturesUploaded = false;
      this.customerForm.controls['picturesAttached'].setValue(false);
    }

    if(this.companyInformation.prePricing !== null) {
      if (this.companyInformation.prePricing.length > 0) {
        this.enableViewPrePricingPicturesUploaded = true;
        this.customerForm.controls['prePricingAuthorizationAttached'].setValue(true);
        this.companyInformation.prePricing.forEach((obj: any) => {
          this.uploadedPricingPictures.push({
            name: obj,
            image: ''
          });
          this.pricingNames.push(obj);
        });
      }
  //  this.pricingList =  this.uploadedPricingPictures;
    } else {
      this.uploadedPricingPictures = [];
      this.pricingNames = [];
      this.enableViewPrePricingPicturesUploaded = false;
      this.customerForm.controls['prePricingAuthorizationAttached'].setValue(false);

    }
  //   let salesRepId = this.companyInformation.salesRepId;
  //   if (this.salesRepNames.length > 0) {
  //   this.salesRepArray = this.salesRepNames.filter(function(el){
  //     return el.id === salesRepId;
  //   });
  //   this.companyInformation.salesRepId = this.salesRepArray[0].salesRepName;
  // }
  }
  fetchCompanyDetails() {
    this.salesRepArray = [];
    if (this.companyInformation !== null && this.companyInformation !== undefined) {
      let salesRepId = this.companyInformation.salesRepId;
      if (this.salesRepNames!== undefined) {
        if (this.salesRepNames.length > 0) {
      this.salesRepArray = this.salesRepNames.filter(function(el: any){
        return el.id === salesRepId;

      });

      this.companyInformation.salesRepId = this.salesRepArray[0].salesRepName;
    } 
    }
      this.companyInformation.typeOfUser = true;
      console.log('this.companyInformation', this.companyInformation);
      //this.customerForm.patchValue({ companyName: this.companyInformation.companyName });
      this.patchAllValues();
    }

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

  checkForZipCodes(zipcode: any, type: any) {
    this.zipCodeErrorResponse = false;
    this.zipCodeContactErrorResponse = false;
    this.pricingInfoService.getCityState(zipcode).subscribe(response => {
      this.zipcodeResponse = response;
      if (this.zipcodeResponse.length > 0) {
        if (type === 'zip') {
          this.customerForm.patchValue({ companyCity: this.zipcodeResponse[0].city, companyState: this.zipcodeResponse[0].state });
        } else {
          this.customerForm.patchValue({ accountPersonCity: this.zipcodeResponse[0].city, accountPersonState: this.zipcodeResponse[0].state });
        }
      } else {
        if (type === 'zip') {
          if (zipcode !== '') {
            this.zipCodeContactErrorResponse = false;
            this.zipCodeErrorResponse = true;
          } else {
            this.zipCodeContactErrorResponse = false;
            this.zipCodeErrorResponse = false;
          }
        } else {
          this.zipCodeErrorResponse = false;
          this.zipCodeContactErrorResponse = true;
        }
      }
    });
  }

  saveData(customerForm: any) {
    console.log('this.salesRepArray[0]', this.salesRepArray, customerForm.id);
    customerForm.salesRepName = customerForm.salesRepId;
    customerForm.createdBy = this.loginDetails.id;
    // customerForm.pictures = this.base64textString;
    if (this.editSalesrep === true) {
      this.salesRepArray.forEach((ee:any) => {
        if (customerForm.salesRepName === ee.salesRepName) {
          customerForm.salesRepId = ee.id;
        }
      })
    } else {
      if (customerForm.typeOfUser === false) {
        customerForm.salesRepId = this.loginDetails.id;
      } else {
        customerForm.salesRepId = this.salesRepArray[0].id;
      }
    }
    
    customerForm.companyName = customerForm.companyName.toUpperCase();
    if (customerForm.id  === 0) {
      console.log(customerForm);
      if (customerForm.pictures === '') {
        customerForm.pictures = [];
      }
      if (customerForm.prePricing === '') {
        customerForm.prePricing = [];
      }
      if (customerForm.typeOfUser  === false) {
        customerForm.workbookCompany = true;
      }
      console.log('jjjj', customerForm)
      this.invoiceService.saveCustomerInfo1(customerForm).subscribe((response: any) => {
        console.log('response', response);
        this.companyInformation = response.result;
        this.companyInformation.showFlag = false;
        this.setCustomerObject();
        this.toastr.success('Company Information has been stored Sucessfully!');
        // swal({
        //   title: 'Success!',
        //   text: 'Customer Information has been stored Sucessfully!',
        //   icon: 'success',
        // });
        let passingObject = undefined;
        this.invoiceService.setAnalyticsCode(passingObject);
        let emptyArray = null;
        let data = undefined;
        let object = {
          carrier: '',
          values: [],
          invalidData: []
        }
        this.invoiceService.setTrafficData(emptyArray);
        this.invoiceService.setTrafficDataEnable(object);
        this.invoiceService.setUploadedData(data);

        this.router.navigate(['/uploadWorksheet']);
      });
    } else {
      console.log(customerForm);
      if (customerForm.pictures === '' || customerForm.pictures === null ) {
        customerForm.pictures = [];
      } 
      if (customerForm.prePricing === '' || customerForm.prePricing === null) {
        customerForm.prePricing = [];
      }
       this.invoiceService.updateCustomerInfo(customerForm).subscribe((response: any) => {
      console.log('response', response);
      if (this.deletedUploadedPictures.length >0) {
        this.deletedUploadedPictures.forEach((obj: any) => {
          this.invoiceService.deleteUploaded('customerPictures', obj).subscribe((res: any) => {
            console.log(res);
        })
        });
      }
      if (this.deletedUploadedPricingPictures.length > 0) {
        this.deletedUploadedPricingPictures.forEach((element: any)=> {
          this.invoiceService.deleteUploaded('prePricingPictures',element).subscribe((res: any) => {
    console.log(res);
          });
        });
      }
      this.companyInformation = response;
      this.companyInformation.salesRepId = customerForm.salesRepName;
      this.companyInformation.showFlag = false;
      this.setCustomerObject();
      // this.patchAllValues();
      this.toastr.success('Company Information has been stored Sucessfully!');
      // swal({
      //   title: 'Success!',
      //   text: 'Customer Information has been stored Sucessfully!',
      //   icon: 'success',
      // });
      let passingObject = undefined;
      this.invoiceService.setAnalyticsCode(passingObject);
      let emptyArray = null;
      this.invoiceService.setTrafficData(emptyArray);
      let object = {
        carrier: '',
        values: [],
        invalidData: []
      }
      this.invoiceService.setTrafficDataEnable(object);
      let data = undefined;
      this.invoiceService.setUploadedData(data);

      this.router.navigate(['/uploadWorksheet']);
    });
    }
   
  }


  deleteWorkbookCompany() {
    console.log(this.customerForm, this.companyInformation);
    this.customerService.deleteCompany(this.customerForm.value.id,this.loginDetails.id).subscribe((res: any) => {
      console.log(res);
      if (res.result === true) {
        // this.companyNames = [];
        console.log(this.companyNames);
        // this.companyNames.split()
        this.companyNames.forEach((ele:any, index:any) => {
if (this.companyInformation.companyName === ele ) {
  this.companyNames.splice(index,1);
}
        });
        console.log(this.companyNames);

        this.getDetails();
        this.buildForm();
setTimeout(() => {
  // swal({
  //     title: 'Success!',
  //     text: 'Customer Information has been deleted Sucessfully!',
  //     icon: 'success',
  //   });
    Swal.fire('Success!','Customer Information has been deleted Sucessfully!','success')
  //   let object  = undefined;
  //   this.invoiceService.setCompanyInformation1(object);
  //   let emptyArray = null;
  // this.invoiceService.setTrafficData(emptyArray);
  // this.invoiceService.setTrafficDataEnable(emptyArray);
  //   this.router.navigate(['/customerInfoworkbook']);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  // this.toastr.success('Company Information has been deleted Sucessfully!');

}, 1000);
    
      } else {
        // swal({
        //   title: 'Error!',
        //   text: 'Please try again',
        //   icon: 'error',
        // });
        Swal.fire('Error!','Please try again','error',)
      }
    })
  }

  saveData1(customerForm: any) {
    console.log('this.salesRepArray[0]', this.salesRepArray, customerForm.id);
    customerForm.salesRepName = customerForm.salesRepId;
    customerForm.createdBy = this.loginDetails.id;
    // customerForm.pictures = this.base64textString;
    if (customerForm.typeOfUser === false) {
      customerForm.salesRepId = this.loginDetails.id;
    } else {
      customerForm.salesRepId = this.salesRepArray[0].id;
    }
    customerForm.companyName = customerForm.companyName.toUpperCase();
    if (customerForm.id  === 0) {
      console.log(customerForm);
      if (customerForm.pictures === '') {
        customerForm.pictures = [];
      }
      if (customerForm.prePricing === '') {
        customerForm.prePricing = [];
      }
      this.invoiceService.saveCustomerInfo1(customerForm).subscribe((response:any) => {
        console.log('response', response);
        this.companyInformation = response.result;
        this.companyInformation.showFlag = false;
        this.setCustomerObject();
        this.toastr.success('Company Information has been stored Sucessfully!');
        // swal({
        //   title: 'Success!',
        //   text: 'Customer Information has been stored Sucessfully!',
        //   icon: 'success',
        // });
        let passingObject = undefined;
        this.invoiceService.setAnalyticsCode(passingObject);
        let emptyArray = null;
        let data = undefined;
        let object = {
          carrier: '',
          values: [],
          invalidData: []
        }
        this.invoiceService.setTrafficData(emptyArray);
        this.invoiceService.setTrafficDataEnable(object);
        this.invoiceService.setUploadedData(data);

        // this.router.navigate(['/uploadWorksheet']);
      });
    } else {
      console.log(customerForm);
      if (customerForm.pictures === '' || customerForm.pictures === null ) {
        customerForm.pictures = [];
      } 
      if (customerForm.prePricing === '' || customerForm.prePricing === null) {
        customerForm.prePricing = [];
      }
       this.invoiceService.updateCustomerInfo(customerForm).subscribe((response: any) => {
      console.log('response', response);
      if (this.deletedUploadedPictures.length >0) {
        this.deletedUploadedPictures.forEach((obj: any) => {
          this.invoiceService.deleteUploaded('customerPictures', obj).subscribe((res: any) => {
            console.log(res);
        })
        });
      }
      if (this.deletedUploadedPricingPictures.length > 0) {
        this.deletedUploadedPricingPictures.forEach((element: any)=> {
          this.invoiceService.deleteUploaded('prePricingPictures',element).subscribe((res: any) => {
    console.log(res);
          });
        });
      }
      this.companyInformation = response;
      this.companyInformation.showFlag = false;
      this.setCustomerObject();
      // this.patchAllValues();
      this.toastr.success('Company Information has been stored Sucessfully!');
      // swal({
      //   title: 'Success!',
      //   text: 'Customer Information has been stored Sucessfully!',
      //   icon: 'success',
      // });
      let passingObject = undefined;
      this.invoiceService.setAnalyticsCode(passingObject);
      let emptyArray = null;
      this.invoiceService.setTrafficData(emptyArray);
      let object = {
        carrier: '',
        values: [],
        invalidData: []
      }
      this.invoiceService.setTrafficDataEnable(object);
      let data = undefined;
      this.invoiceService.setUploadedData(data);

      // this.router.navigate(['/uploadWorksheet']);
    });
    }
   
  }
  nextTraffic() {
    this.setCustomerObject();
    // let emptyArray = null;
    // this.invoiceService.setTrafficData(emptyArray);
    let object = {
      carrier: '',
      values: [],
      invalidData: []
    }
    this.invoiceService.setTrafficDataEnable(object);
  // {path: 'trafficdatanew', component: TrafficdatanewComponent},
    this.router.navigate(['/trafficdatanew']);
  //  [('/Invoice')]
  }
  nextCarrierAnalytics() {
    this.setCustomerObject();
    let emptyArray = null;
    let data = undefined;
    this.invoiceService.setTrafficData(emptyArray);
    // this.invoiceService.setTrafficDataEnable(emptyArray);
    this.invoiceService.setUploadedData(data);

    this.router.navigate(['/carrierAnalytics']);
  }
  clearCompany() {
    // this.getSalesRepNames();
    this.showDifferentColor = false;

    this.customerForm.patchValue({
      companyName: '',
      companyShippingAddress: '',
      companyZip: '',
      companyCity: '',
      companyState: '',
      contactPersonName: '',
      contactPersonDesignation: '',
      contactPersonPhoneNumber: '',
      contactPersonFax: '',
      picturesAttached: false,
      prePricingAuthorizationAttached: false,
      accountPersonName: '',
      accountPersonDesignation: '',
      accountPersonPhoneNumber: '',
      accountPersonFax: '',
      accountPersonShippingAddress: '',
      accountPersonZip: '',
      accountPersonCity: '',
      accountPersonState: '',
      potentialAnnualForteRevenue: '',
      paymentTerms: '',
      estimatedExtendedCredit: '',
      creditReport: '',
      bolRequired: false,
      poRequired: true,
      ratingNotes: '',
      apCarrier: '',
      arCarrier: '',
      createdBy: '',
      pictures: '',
      id: 0

    });
  }

  clearForm() {
    this.customerForm.reset();
    this.customerForm.patchValue({
      salesRepId: this.loginDetails.salesRepName,
      typeOfUser: true
    });
    (<HTMLInputElement>document.getElementById("contactPersonPhoneNumber")).value = '';
    (<HTMLInputElement>document.getElementById("accountPersonPhoneNumber")).value = '';
    //   this.unSubscribe(this.companyInformationSub);
    // this.invoiceService = null;
    this.companyInformation = null;
    this.companyInformationSub = null;
    this.setCustomerObject();
    // this.invoiceService.customerMethod(this.companyInformation);
  }

  unSubscribe(subscription: Subscription) {
    console.log('subscription', subscription);
    if (subscription != null) {
      subscription.unsubscribe();
    }
  }
  checkEnterKey(event: any, type : any) {
    let carrierData;
    if (event.which === 13) {
      event.preventDefault();
      if (type === 'companyName') {
        (document.getElementById('companyZip')as HTMLFormElement).focus();
        let emptyArray = null;
        this.invoiceService.setTrafficData(emptyArray);
        let object1 = {
          carrier: '',
          values: [],
          invalidData: []
        }
        this.invoiceService.setTrafficDataEnable(object1);
        let object  = undefined;
        this.invoiceService.setCompanyInformation1(object);

        // this.invoiceService.trafficDataEnableSubject.unsubscribe();
        let passingObject = null;
        this.invoiceService.setAnalyticsCode(passingObject);
        event.preventDefault();
      } else if (type === 'companyZip') {
        (document.getElementById('address') as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'companyShippingAddress') {
        (document.getElementById('ratingNotes')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'ratingNotes') {
       (document.getElementById('contactPersonalName')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'contactPersonalName') {
        (document.getElementById('contactPersonDesignation')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'contactPersonDesignation') {
        (document.getElementById('contactPersonPhoneNumber')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'contactPersonPhoneNumber') {
        (document.getElementById('contactPersonFax')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'contactPersonFax') {
        (document.getElementById('accountPersonName')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'accountPersonName') {
        (document.getElementById('accountPersonDesignation')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'accountPersonDesignation') {
        (document.getElementById('accountPersonPhoneNumber')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'accountPersonPhoneNumber') {
        (document.getElementById('accountPersonShippingAddress')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'accountPersonShippingAddress') {
        (document.getElementById('accountPersonFax')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'accountPersonFax') {
        (document.getElementById('accountPersonZip')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'accountPersonZip') {
        (document.getElementById('potentialRevenue')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'potentialRevenue') {
        (document.getElementById('paymentTerms')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'paymentTerms') {
        this.saveData1(this.customerForm.value);
        console.log(this.customerForm.value);
        if (this.customerForm.value.paymentTerms === '20') {
          this.showDifferentColor = false;

        } else {
        this.showDifferentColor = true;
        }
        (document.getElementById('estimatedExtendedCredit')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'estimatedExtendedCredit') {
        (document.getElementById('saveBtn')as HTMLFormElement).focus();
        event.preventDefault();
      }
    }
  }
  next(customerForm: any) {
    console.log('customerForm', customerForm, this.companyInformation);
    if (customerForm !== undefined) {
      if (this.companyInformation !== null && this.companyInformation !== undefined) {
        if (this.companyInformation.id === 0) {
          customerForm.salesRepName = customerForm.salesRepId;
          customerForm.salesRepId = this.loginDetails.id;
          customerForm.createdBy = this.loginDetails.id;
          customerForm.companyName = customerForm.companyName.toUpperCase();
          this.invoiceService.saveCustomerInfo1(customerForm).subscribe((response:any) => {
            console.log('response', response.result);
            this.companyInformation = response;
            this.setCustomerObject();
            let passingObject = undefined;
            this.invoiceService.setAnalyticsCode(passingObject);
            this.router.navigate(['/uploadWorksheet']);
          }, (err: any) => {
            customerForm.salesRepName = customerForm.salesRepId;
            customerForm.salesRepId = this.loginDetails.id;
            customerForm.createdBy = this.loginDetails.id;
            customerForm.companyName = customerForm.companyName.toUpperCase();
            this.companyInformation = customerForm;

            this.setCustomerObject();
            let passingObject = undefined;
            this.invoiceService.setAnalyticsCode(passingObject);
            this.router.navigate(['/uploadWorksheet']);
          });
        } else {
          this.setCustomerObject();
          let passingObject = undefined;
          this.invoiceService.setAnalyticsCode(passingObject);
          this.router.navigate(['/uploadWorksheet']);
        }
      } else {
        customerForm.salesRepName = customerForm.salesRepId;
          customerForm.salesRepId = this.loginDetails.id;
          customerForm.createdBy = this.loginDetails.id;
          customerForm.companyName = customerForm.companyName.toUpperCase();
          this.invoiceService.saveCustomerInfo1(customerForm).subscribe((response:any) => {
            console.log('response', response.result);
            this.companyInformation = response;
            this.setCustomerObject();
            let passingObject = undefined;
            this.invoiceService.setAnalyticsCode(passingObject);
            this.router.navigate(['/uploadWorksheet']);
          }, (err: any) => {
            customerForm.salesRepName = customerForm.salesRepId;
            customerForm.salesRepId = this.loginDetails.id;
            customerForm.createdBy = this.loginDetails.id;
            customerForm.companyName = customerForm.companyName.toUpperCase();
            this.companyInformation = customerForm;

            this.setCustomerObject();
            let passingObject = undefined;
            this.invoiceService.setAnalyticsCode(passingObject);
            this.router.navigate(['/uploadWorksheet']);
          });
        // this.setCustomerObject();
        // this.router.navigate(['/Invoice']);
      }
    } else {
      let passingObject = undefined;
      this.invoiceService.setAnalyticsCode(passingObject);
      this.router.navigate(['/uploadWorksheet']);
    }
  }
  imageClick(imagedata: any) {
    console.log(imagedata);
    this.picShowFlag = true;
    this.imageData = imagedata;
    }
    hidePic(){
    this.picShowFlag = false;
    }
    saveFile(imageurl: any) {
    console.log('download',imageurl);
    const headers = new Headers();
    headers.append('Accept', 'text/plain');
    // this.http.get(imageurl)
    this.http.get(imageurl)
    .toPromise()
    .then((response: any) => this.saveToFileSystem(response));
    }
    
    private saveToFileSystem(response: any) {
    console.log('res', response);
    // const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    // const parts: string[] = contentDispositionHeader.split(';');
    // const filename = parts[1].split('=')[1];
    const blob = new Blob([response._body], { type: 'image/jpg' });
    saveAs(blob, 'filename.jpg');
    }
  nextflow(customerForm:any) {
    console.log('customerForm', customerForm, this.companyInformation);
    if (customerForm !== undefined) {
      if (this.companyInformation !== null && this.companyInformation !== undefined) {
        if (this.companyInformation.id === undefined) {
          customerForm.salesRepName = customerForm.salesRepId;
          customerForm.salesRepId = this.loginDetails.id;
          customerForm.createdBy = this.loginDetails.id;
          customerForm.companyName = customerForm.companyName.toUpperCase();
          this.invoiceService.saveCustomerInfo1(customerForm).subscribe((response:any) => {
            console.log('response', response.result);
            this.companyInformation = response;
            this.setCustomerObject();
            
            this.router.navigate(['/uploadWorksheet']);
          }, (err: any) => {
            customerForm.salesRepName = customerForm.salesRepId;
            customerForm.salesRepId = this.loginDetails.id;
            customerForm.createdBy = this.loginDetails.id;
            customerForm.companyName = customerForm.companyName.toUpperCase();
            this.companyInformation = customerForm;

            this.setCustomerObject();
            this.router.navigate(['/uploadWorksheet']);
          });
        } else {
          this.setCustomerObject();
          this.router.navigate(['/uploadWorksheet']);
        }
      } else {
        customerForm.salesRepName = customerForm.salesRepId;
          customerForm.salesRepId = this.loginDetails.id;
          customerForm.createdBy = this.loginDetails.id;
          customerForm.companyName = customerForm.companyName.toUpperCase();
          this.invoiceService.saveCustomerInfo(customerForm).subscribe((response:any) => {
            console.log('response', response.result);
            this.companyInformation = response;
            if (response) {
              this.setCustomerObject();
              this.router.navigate(['/uploadWorksheet']);
            }
            
          }, (err: any) => {
            customerForm.salesRepName = customerForm.salesRepId;
            customerForm.salesRepId = this.loginDetails.id;
            customerForm.createdBy = this.loginDetails.id;
            customerForm.companyName = customerForm.companyName.toUpperCase();
            this.companyInformation = customerForm;

            // this.setCustomerObject();
            // this.router.navigate(['/uploadWorksheet']);
          });
        // this.setCustomerObject();
        // this.router.navigate(['/Invoice']);
      }
    } else {
      this.router.navigate(['/uploadWorksheet']);
    }
  }
  calculateAmtCredit(value: any) {
    let calculateCredit;
    if (value.potentialAnnualForteRevenue !== '' && value.paymentTerms !== '') {
      calculateCredit = ((Number(value.potentialAnnualForteRevenue) * Number(value.paymentTerms)) / 360).toFixed(2);
      this.customerForm.patchValue({
        estimatedExtendedCredit: calculateCredit
      })
    }
  }
  setCustomerObject() {
    //   if (this.companyInformation !== null) {
    //  this.companyInformation['fromTab']='CompanyInfo';
    //   this.invoiceService.customerMethod(this.companyInformation);
    // }

    if (this.companyInformation !== null && this.companyInformation !== undefined) {
      this.companyInformation.salesRepName = this.companyInformation.salesRepId;
      this.companyInformation.salesRepId = this.companyInformation.salesRepId;
      this.companyInformation.createdBy = this.loginDetails.id;
      this.companyInformation.companyName = this.companyInformation.companyName.toUpperCase();
    }
    console.log('this. setobject', this.companyInformation);
    this.invoiceService.setCompanyInformation1(this.companyInformation);
  }

  contactInfo(formValue: any, type: any) {
    if (type === 'similar') {
      this.customerForm.patchValue({
        accountPersonPhoneNumber: formValue.contactPersonPhoneNumber,
        accountPersonFax: formValue.contactPersonFax,
        accountPersonShippingAddress: formValue.companyShippingAddress,
        accountPersonZip: formValue.companyZip,
        accountPersonCity: formValue.companyCity,
        accountPersonState: formValue.companyState
      });
      (document.getElementById('accountPersonName') as HTMLFormElement).focus();
    } else {
      this.customerForm.patchValue({
        // accountPersonName: '',
        // accountPersonDesignation: '',
        accountPersonPhoneNumber: '',
        accountPersonFax: '',
        accountPersonShippingAddress: '',
        accountPersonZip: '',
        accountPersonCity: '',
        accountPersonState: ''
      });
    }
  }

 
  picturesAttached(name: any){
    this.showPicAttached = true;
    console.log(name);
    name.forEach((obj:any) => {
      this.picturesNames.push(obj.name);
    });
    console.log(this.picturesNames);
    this.customerForm.controls['picturesAttached'].setValue(true);
    this.customerForm.setControl('pictures', new FormControl(this.picturesNames));
    console.log(this.customerForm.value);
    // this.base64 = 'data:image/png;base64,'+ this.base64textString;
    this.toastr.success('Pictures has been uploaded sucessfully!');
    // this.checkForCompany()
  }
  prepricingAttached(name: any) {
    name.forEach((obj: any) => {
      this.pricingNames.push(obj.name);
    });
    console.log(this.pricingNames);
    this.customerForm.controls['prePricingAuthorizationAttached'].setValue(true);
    this.customerForm.setControl('prePricing', new FormControl(this.pricingNames));
    console.log(this.customerForm.value);
    // this.base64 = 'data:image/png;base64,'+ this.base64textString;
    this.toastr.success('Pre Pricing Authorization has been uploaded sucessfully!');
  }
  picturesAttachedCancel() {
    console.log('Cancel');
    this.base64textString = '';
    this.base64 = '';
    this.showPicAttached = false;
    // this.customerForm.controls['picturesAttached'].setValue(false);
    // this.customerForm.controls.prePricingAuthorizationAttached.setValue(false);
  }


handleFileSelect(evt: any){
  console.log(evt);
  var files = evt.target.files;
  this.selectedPictures.push(evt.target.files.name);

  var file = files[0];

if (files && file) {
  console.log(this.selectedPictures);
    var reader = new FileReader();

    reader.onload =this._handleReaderLoaded.bind(this);

    reader.readAsBinaryString(file);
}
}

_handleReaderLoaded(readerEvt: any) {
  var binaryString = readerEvt.target.result;
        this.base64textString= btoa(binaryString);
        console.log(btoa(binaryString));
        console.log('abc',atob(this.base64textString));
}

fileChanged(event: any) {
  // this.uploadedPictures = [];
  console.log(event.target.files.length);
  const files = event.target.files;
  // files.forEach((obj) => {
    for (let i=0; i < event.target.files.length; i ++) {

      const fileData = {name: files[i].name, image: ''}
      this.filenames.push(fileData);
      const file = files[i].name;
      this.file = file;
      var formData = new FormData();
      formData.append('file[]', files[i], files[i].name);
    this.uploadfile(formData);
    console.log(this.uploadedPictures);
    this.uploadedPictures.push(fileData);

    }
  console.log(this.filenames);
}

fileChanged1(event: any) {
  console.log(event.target.files.length);
  const files = event.target.files;
  // files.forEach((obj) => {
    for (let i= 0; i < event.target.files.length; i ++) {

      const fileData = {name: files[i].name, image: ''}
      this.pricingList.push(fileData);
      const file = files[i].name;
      this.file = file;
      var formData = new FormData();
      formData.append('file[]', files[i], files[i].name);
    this.uploadPrepricingfile(formData);
    this.uploadedPricingPictures.push(fileData);

    }
  console.log(files);
}

uploadfile(data: any) {
this.invoiceService.uploadPictures(data).subscribe((response:any) => {
  console.log(response);
  this.customerForm.controls['picturesAttached'].setValue(true);
  // this.viewPicturesUploaded();
}, (err:any) => {
console.log(err);
})

}

uploadPrepricingfile(data: any) {
  this.invoiceService.uploadPricingPictures(data).subscribe((response: any) => {
    console.log(response);
    this.customerForm.controls['prePricingAuthorizationAttached'].setValue(true);
    // this.viewPrePricingPicturesUploaded();
  }, (err: any) => {
  console.log(err);
  })
  
  }

  viewPicturesUploaded() {
    console.log(this.uploadedPictures);
    this.viewImage(this.uploadedPictures);
  }
  viewPrePricingPicturesUploaded() {
    this.viewImage1(this.uploadedPricingPictures);
  }

viewImage(data: any) {
  console.log(data);  
  data.forEach((obj: any, index: any) => {
    let url = 'http://54.176.155.237:3000/api/container/customerPictures/download/' + obj.name;
    this.uploadedPictures[index]['image'] = url;

  })
    // for (let i = 0; i < this.filenames.length; i++) {
    // if (i === index) {
    // } else {
    //   this.filenames[i]['image']= '';

    // }
  // }
  
}

viewImage1(data: any) {
  console.log(data); 
  data.forEach((obj: any, index: any) => {
  let url = 'http://54.176.155.237:3000/api/container/prePricingPictures/download/' + obj.name;
  this.uploadedPricingPictures[index]['image'] = url;
  });
  // this.filenames.forEach((obj, i) => {
  //   if (obj.i === index) {
  //     this.filenames[index]['image'] = url;
  //   } else {
  //     this.filenames[i]['image']= '';
  //   }
  // })

  // for (let i = 0; i < this.filenames.length; i++) {
  //   if (i === index) {
  //     this.pricingList[i]['image'] = url;
  //   } else {
  //     this.pricingList[i]['image']= '';

  //   }
  // }
  
}

viewImageIndex1(data: any, index: any) {
  console.log(data, index);  
  let url = 'http://54.176.155.237:3000/api/container/customerPictures/download/' + data.name;
  // this.filenames.forEach((obj, i) => {
  //   if (obj.i === index) {
  //     this.filenames[index]['image'] = url;
  //   } else {
  //     this.filenames[i]['image']= '';
  //   }
  // })

  for (let i = 0; i < this.filenames.length; i++) {
    if (i === index) {
      this.pricingList[i]['image'] = url;
    } else {
      this.pricingList[i]['image']= '';

    }
  }
  
}
viewImageIndex(data: any, index: any) {
  console.log(data, index);  
  let url = 'http://54.176.155.237:3000/api/container/prePricingPictures/download/' + data.name;
  // this.filenames.forEach((obj, i) => {
  //   if (obj.i === index) {
  //     this.filenames[index]['image'] = url;
  //   } else {
  //     this.filenames[i]['image']= '';
  //   }
  // })

  for (let i = 0; i < this.filenames.length; i++) {
    if (i === index) {
      this.uploadedPricingPictures[i]['image'] = url;
    } else {
      this.uploadedPricingPictures[i]['image']= '';

    }
  }
  
}

deleteImage(data: any, type: any, index: any) {
  console.log(data, type,index);
  console.log(this.customerForm.value);
  
  console.log(this.picturesNames);
  // pricingNames = [];
  console.log(this.pricingNames);
if (type ==='Pictures') {
  // this.invoiceService.deleteUploaded('customerPictures', data).subscribe((res) => {
  //   console.log(res);
    this.uploadedPictures.splice(index, 1);
    this.picturesNames.splice(index,1);
    let ObjIndex = this.customerForm.value.pictures.indexOf(data);
    this.customerForm.value.pictures.splice(ObjIndex, 1);
    this.deletedUploadedPictures.push(data);
    console.log(ObjIndex);
    console.log(this.customerForm.value);
  // });
  
} else if (type === 'prePricingPictures') {
  // this.invoiceService.deleteUploaded('prePricingPictures',data).subscribe((res) => {
  //   console.log(res);
    this.uploadedPricingPictures.splice(index,1);
    this.pricingNames.splice(index,1);
    let ObjIndex = this.customerForm.value.prePricing.indexOf(data);
    this.customerForm.value.prePricing.splice(ObjIndex, 1);
    console.log(ObjIndex);
    console.log(this.customerForm.value);
    this.deletedUploadedPricingPictures.push(data);

  // });
}
}

downloadImage(downloadLink: any) {
  this.customerService.getImage(downloadLink.image).subscribe(
    (res: any) => {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(res);
          a.download = downloadLink.name;
          document.body.appendChild(a);
          a.click();
    });
  }

getBusisnessRule() {
  this.router.navigate(['/promoteRule']);
}

viewLTLContract(data: any) {
  console.log(data);
  this.fxfeApArray = [];
  this.fxfeArArray = [];
  this.fxfpApArray = [];
  this.fxfpArArray = [];
  this.yrcApArray = [];
  this.yrcArArray = [];
  this.reddawayApArray = [];
  this.reddawayArArray = [];
  this.fedexRowspan = 0;
  this.priorityrowspan = 0;
  this.yrcrowspan = 0;
  this.reddawayrowspan = 0;
  this.shippingManagerName = data.contractPersion;
  this.shippingManagerPost = data.contractPosition;
  this.contractAddrss = data.contractAddress;
  this.billadd1 = this.companyInformation.companyName;
      this.billadd2 = 'C/O Forte,';
      this.billadd3 = '301 54th Ave East,';
      this.billadd4 = 'Suite 200,Fife, WA 98424';
  if (this.companyInformation.specificPricing === false) {
    this.showSecondAddress = true;
  } else {
    if (this.companyInformation.specificPricingList.length > 0) {
      if (this.companyInformation.specificPricingList.length >1) {
        this.showSecondAddress = false;
        this.showFirstAddress = true;
       this.companyInformation.specificPricingList.forEach((element: any) => {
         if (element === 'YRC') {
           if (this.displayShipmentName === undefined) {
            this.displayShipmentName = 'YRC';
  
           } else {
             this.displayShipmentName = this.displayShipmentName + ' and YRC';
  
           }
         } else if (element === 'FEDEX ECONOMY' || element === 'FEDEX PRIORITY') {
          if (this.displayShipmentName === undefined) {
            this.displayShipmentName = 'Fedex';
  
           } else {
             this.displayShipmentName = this.displayShipmentName + ' and Fedex';
  
           }
         }
       })
  
      } else {
        // this.showSecondAddress = true;
        this.showFirstAddress = true;
        this.companyInformation.specificPricingList.forEach((element: any) => {
          if (element === 'YRC') {
            if (this.displayShipmentName === undefined) {
             this.displayShipmentName = 'YRC';
   
            } else {
              this.displayShipmentName = this.displayShipmentName + ' and YRC';
   
            }
          } else if (element === 'FEDEX ECONOMY' || element === 'FEDEX PRIORITY') {
           if (this.displayShipmentName === undefined) {
             this.displayShipmentName = 'Fedex';
   
            } else {
              this.displayShipmentName = this.displayShipmentName + ' and Fedex';
   
            }
          }
        })
      }
    }
  }
  console.log(this.companyRulesArray)
  this.companyRulesArray = data.rules;
  console.log(this.companyRulesArray)

  this.companyRulesArray.forEach((el:any, index:any) => {
    el.tempId = index + 1;
  })
  // this.filterArrayValues(this.companyRulesArray);
  let length = 0;
  for (let i =0; i<this.companyRulesArray.length;i++) {
    
    let element = this.companyRulesArray[i];
    // if (element.ruleExist === true){
if (element.ruleExist !== false) {
    
    let  zipState;
    if (element.type === 'FEDEX ECONOMY') {
      console.log(element);
      if (element.category === 'AP') {
    
        console.log(element);
if (element.specificStateFlag ==='true') {

if (element.specificStateList1.length>0 && element.specificStateList2.length>0) {
zipState = element.specificStateList1[0] + '-' + element.specificStateList2[0];
} else if (element.specificCityList1.length>0 && element.specificCityList2.length>0) {
console.log(element.specificCityList1,element.specificCityList2)
zipState = element.specificCityList1[0] + '-' + element.specificCityList2[0];
} else if ((element.specificStateList1.length >0 || element.specificStateList2.length === 0) && (element.specificCityList1.length === 0 || element.specificCityList1.length === 0)) {
zipState = element.specificStateList1[0] ;
} else if ((element.specificStateList1.length >0 && element.specificStateList2.length === 0) && (element.specificCityList1.length > 0 && element.specificCityList1.length === 0)) {
zipState = element.specificStateList1[0] + '-' + element.specificCityList1[0];
}

}
let contractAccess = [];
if (element.liftGate === '' && element.limitedAccessDelivery === '' && element.deliveryAppointmentRequired === '' &&
     element.notify === '' && element.insideDelivery ==='' && element.residential === '' && element.singleShipment === '') {
      contractAccess = [];
     } 
      if (element.liftGate !== '') {
       contractAccess.push({'name':'LiftGate','charge':element.liftGate});
     } 
      if (element.limitedAccessDelivery !== '') {
      contractAccess.push({'name':'LimitedAccessDelivery','charge':element.limitedAccessDelivery});
    } 
     if (element.deliveryAppointmentRequired !== '') {
      contractAccess.push({'name':'DeliveryAppointmentRequired','charge':element.deliveryAppointmentRequired});
    } 
     if (element.notify !== '') {
      contractAccess.push({'name':'Notify','charge':element.notify});
    } 
     if (element.insideDelivery !== '') {
      contractAccess.push({'name':'InsideDelivery','charge':element.insideDelivery});
    } 
     if (element.residential !== '') {
      contractAccess.push({'name':'Residential','charge':element.residential});
    } 
     if (element.singleShipment !== '') {
      contractAccess.push({'name':'SingleShipment','charge':element.singleShipment});
    }
        let fxfeObject = {
          'rulesName': element.directions,
          'zipstate': zipState,
          'discount': element.discount,
          'amc': element.minCharge,
          'accessorials': contractAccess,
          'carrier': element.type,
          'ruleExist': element.ruleExist

        }
        this.fxfeApArray.push(fxfeObject);
        length = length + 1;
      } else if (element.category === 'AR') {
        console.log(element);
        if (element.specificStateFlag ==='true') {
          if (element.specificStateList1.length>0 && element.specificStateList2.length>0) {
            zipState = element.specificStateList1[0] + '-' + element.specificStateList2[0];
          } else if ((element.specificStateList1.length >0 && element.specificStateList2.length === 0) && (element.specificCityList1.length === 0 && element.specificCityList1.length === 0)) {
            zipState = element.specificStateList1[0] ;
          } else if ((element.specificStateList1.length >0 && element.specificStateList2.length === 0) && (element.specificCityList1.length > 0 && element.specificCityList1.length === 0)) {
            zipState = element.specificStateList1[0] + '-' + element.specificCityList1[0];
          } else if (element.specificCityList1.length>0 && element.specificCityList2.length>0) {
            console.log(element.specificCityList1,element.specificCityList2)
            zipState = element.specificCityList1[0] + '-' + element.specificCityList2[0];
          }
        }
        let contractAccess = [];
if (element.liftGate === '' && element.limitedAccessDelivery === '' && element.deliveryAppointmentRequired === '' &&
     element.notify === '' && element.insideDelivery ==='' && element.residential === '' && element.singleShipment === '') {
      contractAccess = [];
     } 
      if (element.liftGate !== '') {
       contractAccess.push({'name':'LiftGate','charge':element.liftGate});
     } 
      if (element.limitedAccessDelivery !== '') {
      contractAccess.push({'name':'LimitedAccessDelivery','charge':element.limitedAccessDelivery});
    } 
     if (element.deliveryAppointmentRequired !== '' && element.deliveryAppointmentRequired !== null ) {
      contractAccess.push({'name':'DeliveryAppointmentRequired','charge':element.deliveryAppointmentRequired});
    } 
     if (element.notify !== '') {
      contractAccess.push({'name':'Notify','charge':element.notify});
    } 
     if (element.insideDelivery !== '') {
      contractAccess.push({'name':'InsideDelivery','charge':element.insideDelivery});
    } 
     if (element.residential !== '') {
      contractAccess.push({'name':'Residential','charge':element.residential});
    } 
     if (element.singleShipment !== '') {
      contractAccess.push({'name':'SingleShipment','charge':element.singleShipment});
    }
        let fxfeObject = {
          'rulesName': element.directions,
          'zipstate': zipState,
          'discount': element.discount,
          'amc': element.minCharge,
          'accessorials': contractAccess,
          'carrier': element.type,
          'ruleExist': element.ruleExist
        }
        this.fxfeArArray.push(fxfeObject);
        length = length + 1;
      }
    
    } else if (element.type === 'FEDEX PRIORITY') {
      console.log(element);
      if (element.category === 'AP') {
        console.log(element);
        if (element.specificStateFlag ==='true') {
          if (element.specificStateList1.length>0 && element.specificStateList2.length>0) {
            zipState = element.specificStateList1[0] + '-' + element.specificStateList2[0];
          } else if ((element.specificStateList1.length >0 && element.specificStateList2.length === 0) && (element.specificCityList1.length === 0 && element.specificCityList1.length === 0)) {
            zipState = element.specificStateList1[0] ;
          } else if ((element.specificStateList1.length >0 && element.specificStateList2.length === 0) && (element.specificCityList1.length > 0 && element.specificCityList1.length === 0)) {
            zipState = element.specificStateList1[0] + '-' + element.specificCityList1[0];
          }else if (element.specificCityList1.length>0 && element.specificCityList2.length>0) {
            zipState = element.specificCityList1[0] + '-' + element.specificCityList2[0];
          }
        }
        let contractAccess = [];
if (element.liftGate === '' && element.limitedAccessDelivery === '' && element.deliveryAppointmentRequired === '' &&
     element.notify === '' && element.insideDelivery ==='' && element.residential === '' && element.singleShipment === '') {
      contractAccess = [];
     } 
      if (element.liftGate !== '') {
       contractAccess.push({'name':'LiftGate','charge':element.liftGate});
     } 
      if (element.limitedAccessDelivery !== '') {
      contractAccess.push({'name':'LimitedAccessDelivery','charge':element.limitedAccessDelivery});
    } 
     if (element.deliveryAppointmentRequired !== '') {
      contractAccess.push({'name':'DeliveryAppointmentRequired','charge':element.deliveryAppointmentRequired});
    } 
     if (element.notify !== '') {
      contractAccess.push({'name':'Notify','charge':element.notify});
    } 
     if (element.insideDelivery !== '') {
      contractAccess.push({'name':'InsideDelivery','charge':element.insideDelivery});
    } 
     if (element.residential !== '') {
      contractAccess.push({'name':'Residential','charge':element.residential});
    } 
     if (element.singleShipment !== '') {
      contractAccess.push({'name':'SingleShipment','charge':element.singleShipment});
    }
        let fxfeObject = {
          'rulesName': element.directions,
          'zipstate': zipState,
          'discount': element.discount,
          'amc': element.minCharge,
          'accessorials': contractAccess,
          'carrier': element.type,
          'ruleExist': element.ruleExist
        }
        this.fxfpApArray.push(fxfeObject);
        length = length + 1;
      } else if (element.category === 'AR') {
        console.log(element);
        if (element.specificStateFlag ==='true') {
          if (element.specificStateList1.length>0 && element.specificStateList2.length>0) {
            zipState = element.specificStateList1[0] + '-' + element.specificStateList2[0];
          } else if ((element.specificStateList1.length >0 && element.specificStateList2.length === 0) && (element.specificCityList1.length === 0 && element.specificCityList1.length === 0)) {
            zipState = element.specificStateList1[0] ;
          } else if ((element.specificStateList1.length >0 && element.specificStateList2.length === 0) && (element.specificCityList1.length > 0 && element.specificCityList1.length === 0)) {
            zipState = element.specificStateList1[0] + '-' + element.specificCityList1[0];
          }else if (element.specificCityList1.length>0 && element.specificCityList2.length>0) {
            zipState = element.specificCityList1[0] + '-' + element.specificCityList2[0];
          }
        }
        let contractAccess = [];
if (element.liftGate === '' && element.limitedAccessDelivery === '' && element.deliveryAppointmentRequired === '' &&
     element.notify === '' && element.insideDelivery ==='' && element.residential === '' && element.singleShipment === '') {
      contractAccess = [];
     } 
      if (element.liftGate !== '') {
       contractAccess.push({'name':'LiftGate','charge':element.liftGate});
     } 
      if (element.limitedAccessDelivery !== '') {
      contractAccess.push({'name':'LimitedAccessDelivery','charge':element.limitedAccessDelivery});
    } 
     if (element.deliveryAppointmentRequired !== '' && element.deliveryAppointmentRequired !== null) {
      contractAccess.push({'name':'DeliveryAppointmentRequired','charge':element.deliveryAppointmentRequired});
    } 
     if (element.notify !== '') {
      contractAccess.push({'name':'Notify','charge':element.notify});
    } 
     if (element.insideDelivery !== '') {
      contractAccess.push({'name':'InsideDelivery','charge':element.insideDelivery});
    } 
     if (element.residential !== '') {
      contractAccess.push({'name':'Residential','charge':element.residential});
    } 
     if (element.singleShipment !== '') {
      contractAccess.push({'name':'SingleShipment','charge':element.singleShipment});
    }
        let fxfeObject = {
          'rulesName': element.directions,
          'zipstate': zipState,
          'discount': element.discount,
          'amc': element.minCharge,
          'accessorials': contractAccess,
          'carrier': element.type,
          'ruleExist': element.ruleExist
        }
        this.fxfpArArray.push(fxfeObject);
        length = length + 1;
      }
    
    } else if (element.type === 'YRC') {
      console.log(element);
      if (element.category === 'AP') {
        console.log(element);
        if (element.specificStateFlag ==='true') {
          if (element.specificStateList1.length>0 && element.specificStateList2.length>0) {
            zipState = element.specificStateList1[0] + '-' + element.specificStateList2[0];
          } else if ((element.specificStateList1.length >0 && element.specificStateList2.length === 0) && (element.specificCityList1.length === 0 && element.specificCityList1.length === 0)) {
            zipState = element.specificStateList1[0] ;
          } else if ((element.specificStateList1.length >0 && element.specificStateList2.length === 0) && (element.specificCityList1.length > 0 && element.specificCityList1.length === 0)) {
            zipState = element.specificStateList1[0] + '-' + element.specificCityList1[0];
          }else if (element.specificCityList1.length>0 && element.specificCityList2.length>0) {
            zipState = element.specificCityList1[0] + '-' + element.specificCityList2[0];
          }
        }
        let contractAccess = [];
if (element.liftGate === '' && element.limitedAccessDelivery === '' && element.deliveryAppointmentRequired === '' &&
     element.notify === '' && element.insideDelivery ==='' && element.residential === '' && element.singleShipment === '') {
      contractAccess = [];
     } 
      if (element.liftGate !== '') {
       contractAccess.push({'name':'LiftGate','charge':element.liftGate});
     } 
      if (element.limitedAccessDelivery !== '') {
      contractAccess.push({'name':'LimitedAccessDelivery','charge':element.limitedAccessDelivery});
    } 
     if (element.deliveryAppointmentRequired !== '') {
      contractAccess.push({'name':'DeliveryAppointmentRequired','charge':element.deliveryAppointmentRequired});
    } 
     if (element.notify !== '') {
      contractAccess.push({'name':'Notify','charge':element.notify});
    } 
     if (element.insideDelivery !== '') {
      contractAccess.push({'name':'InsideDelivery','charge':element.insideDelivery});
    } 
     if (element.residential !== '') {
      contractAccess.push({'name':'Residential','charge':element.residential});
    } 
     if (element.singleShipment !== '') {
      contractAccess.push({'name':'SingleShipment','charge':element.singleShipment});
    }
        let fxfeObject = {
          'rulesName': element.directions,
          'zipstate': zipState,
          'discount': element.discount,
          'amc': element.minCharge,
          'accessorials': contractAccess,
          'carrier': element.type,
          'ruleExist': element.ruleExist
        }
        this.yrcApArray.push(fxfeObject);
        length = length + 1;
      } else if (element.category === 'AR') {
        console.log(element);
        if (element.specificStateFlag ==='true') {
          // if (element.specificStateList1.length>0 && element.specificStateList2.length>0) {
          //   zipState = element.specificStateList1[0] + '-' + element.specificStateList2[0];
          // } else if ((element.specificStateList1.length >0 && element.specificStateList2.length === 0) && (element.specificCityList1.length === 0 && element.specificCityList1.length === 0)) {
          //   zipState = element.specificStateList1[0] ;
          // } else if ((element.specificStateList1.length >0 && element.specificStateList2.length === 0) && (element.specificCityList1.length > 0 && element.specificCityList1.length === 0)) {
          //   zipState = element.specificStateList1[0] + '-' + element.specificCityList1[0];
          // }else if (element.specificCityList1.length>0 && element.specificCityList2.length>0) {
          //  console.log(element.specificCityList1, element.specificCityList1[0]);
          //   zipState = element.specificCityList1[0] + '-' + element.specificCityList2[0];
          // }
          if (element.specificStateList1.length>0 && element.specificStateList2.length>0) {
            zipState = element.specificStateList1[0] + '-' + element.specificStateList2[0];
          } else if ((element.specificStateList1.length >0 && element.specificStateList2.length === 0) && (element.specificCityList1.length > 0 && element.specificCityList2.length === 0)) {
            zipState = element.specificStateList1[0] + '-' + element.specificCityList1[0];
          } else if (element.specificStateList1.length >0 &&  element.specificCityList2.length > 0) {
            zipState = element.specificStateList1[0] + '-' + element.specificCityList2[0];
          }else if (element.specificCityList1.length>0 && element.specificCityList2.length>0) {
           console.log(element.specificCityList1, element.specificCityList2[0]);
            zipState = element.specificCityList1[0] + '-' + element.specificCityList2[0];
          }
        }
        let contractAccess = [];
if (element.liftGate === '' && element.limitedAccessDelivery === '' && element.deliveryAppointmentRequired === '' &&
     element.notify === '' && element.insideDelivery ==='' && element.residential === '' && element.singleShipment === '') {
      contractAccess = [];
     } 
      if (element.liftGate !== '') {
       contractAccess.push({'name':'LiftGate','charge':element.liftGate});
     } 
      if (element.limitedAccessDelivery !== '') {
      contractAccess.push({'name':'LimitedAccessDelivery','charge':element.limitedAccessDelivery});
    } 
     if (element.deliveryAppointmentRequired !== '') {
      contractAccess.push({'name':'DeliveryAppointmentRequired','charge':element.deliveryAppointmentRequired});
    } 
     if (element.notify !== '') {
      contractAccess.push({'name':'Notify','charge':element.notify});
    } 
     if (element.insideDelivery !== '') {
      contractAccess.push({'name':'InsideDelivery','charge':element.insideDelivery});
    } 
     if (element.residential !== '') {
      contractAccess.push({'name':'Residential','charge':element.residential});
    } 
     if (element.singleShipment !== '') {
      contractAccess.push({'name':'SingleShipment','charge':element.singleShipment});
    }
        let fxfeObject = {
          'rulesName': element.directions,
          'zipstate': zipState,
          'discount': element.discount,
          'amc': element.minCharge,
          'accessorials': contractAccess,
          'carrier': element.type,
          'ruleExist': element.ruleExist
        }
        this.yrcArArray.push(fxfeObject);
        length = length + 1;
      }
    
    } else if (element.type === 'REDDAWAY') {
      console.log(element);
      if (element.category === 'AP') {
        console.log(element);
        if (element.specificStateFlag ==='true') {
          if (element.specificStateList1.length>0 && element.specificStateList2.length>0) {
            zipState = element.specificStateList1[0] + '-' + element.specificStateList2[0];
          } else if ((element.specificStateList1.length >0 && element.specificStateList2.length === 0) && (element.specificCityList1.length === 0 && element.specificCityList1.length === 0)) {
            zipState = element.specificStateList1[0] ;
          } else if ((element.specificStateList1.length >0 && element.specificStateList2.length === 0) && (element.specificCityList1.length > 0 && element.specificCityList1.length === 0)) {
            zipState = element.specificStateList1[0] + '-' + element.specificCityList1[0];
          } else if (element.specificCityList1.length>0 && element.specificCityList2.length>0) {
            zipState = element.specificCityList1[0] + '-' + element.specificCityList2[0];
          }
        }
        let contractAccess = [];
if (element.liftGate === '' && element.limitedAccessDelivery === '' && element.deliveryAppointmentRequired === '' &&
     element.notify === '' && element.insideDelivery ==='' && element.residential === '' && element.singleShipment === '') {
      contractAccess = [];
     } 
      if (element.liftGate !== '') {
       contractAccess.push({'name':'LiftGate','charge':element.liftGate});
     } 
      if (element.limitedAccessDelivery !== '') {
      contractAccess.push({'name':'LimitedAccessDelivery','charge':element.limitedAccessDelivery});
    } 
     if (element.deliveryAppointmentRequired !== '') {
      contractAccess.push({'name':'DeliveryAppointmentRequired','charge':element.deliveryAppointmentRequired});
    } 
     if (element.notify !== '') {
      contractAccess.push({'name':'Notify','charge':element.notify});
    } 
     if (element.insideDelivery !== '') {
      contractAccess.push({'name':'InsideDelivery','charge':element.insideDelivery});
    } 
     if (element.residential !== '') {
      contractAccess.push({'name':'Residential','charge':element.residential});
    } 
     if (element.singleShipment !== '') {
      contractAccess.push({'name':'SingleShipment','charge':element.singleShipment});
    }
        let fxfeObject = {
          'rulesName': element.directions,
          'zipstate': zipState,
          'discount': element.discount,
          'amc': element.minCharge,
          'accessorials': contractAccess,
          'carrier': element.type,
          'ruleExist': element.ruleExist
        }
        this.reddawayApArray.push(fxfeObject);
        length = length + 1;
      } else if (element.category === 'AR') {
        console.log(element);
        if (element.specificStateFlag ==='true') {
          if (element.specificStateList1.length>0 && element.specificStateList2.length>0) {
            zipState = element.specificStateList1[0] + '-' + element.specificStateList2[0];
          } else if ((element.specificStateList1.length >0 && element.specificStateList2.length === 0) && (element.specificCityList1.length === 0 && element.specificCityList1.length === 0)) {
            zipState = element.specificStateList1[0] ;
          } else if ((element.specificStateList1.length >0 && element.specificStateList2.length === 0) && (element.specificCityList1.length > 0 && element.specificCityList1.length === 0)) {
            zipState = element.specificStateList1[0] + '-' + element.specificCityList1[0];
          } else if (element.specificCityList1.length>0 && element.specificCityList2.length>0) {
            zipState = element.specificCityList1[0] + '-' + element.specificCityList2[0];
          }
        }
        let contractAccess = [];
if (element.liftGate === '' && element.limitedAccessDelivery === '' && element.deliveryAppointmentRequired === '' &&
     element.notify === '' && element.insideDelivery ==='' && element.residential === '' && element.singleShipment === '') {
      contractAccess = [];
     } 
      if (element.liftGate !== '') {
       contractAccess.push({'name':'LiftGate','charge':element.liftGate});
     } 
      if (element.limitedAccessDelivery !== '') {
      contractAccess.push({'name':'LimitedAccessDelivery','charge':element.limitedAccessDelivery});
    } 
     if (element.deliveryAppointmentRequired !== '' && element.deliveryAppointmentRequired !== null) {
      contractAccess.push({'name':'DeliveryAppointmentRequired','charge':element.deliveryAppointmentRequired});
    } 
     if (element.notify !== '') {
      contractAccess.push({'name':'Notify','charge':element.notify});
    } 
     if (element.insideDelivery !== '') {
      contractAccess.push({'name':'InsideDelivery','charge':element.insideDelivery});
    } 
     if (element.residential !== '') {
      contractAccess.push({'name':'Residential','charge':element.residential});
    } 
     if (element.singleShipment !== '') {
      contractAccess.push({'name':'SingleShipment','charge':element.singleShipment});
    }
        let fxfeObject = {
          'rulesName': element.directions,
          'zipstate': zipState,
          'discount': element.discount,
          'amc': element.minCharge,
          'accessorials': contractAccess,
          'carrier': element.type,
          'ruleExist': element.ruleExist
        }
        this.reddawayArArray.push(fxfeObject);
        length = length + 1;
      }
    
    }
  }
    if (length === this.companyRulesArray.length) {
      break;
    }
  // }
  }
  
  this.fedexRowspan = this.fxfeApArray.length +  this.fxfeArArray.length;
  this.priorityrowspan = this.fxfpApArray.length + this.fxfpArArray.length;
  this.yrcrowspan = this.yrcApArray.length + this.yrcArArray.length;
  this.reddawayrowspan = this.reddawayApArray.length + this.reddawayArArray.length;
  let contractarray:any = [];
  this.territoryArray = [];
  this.passingArray = [];
  this.additionalPricingArray = [];
  this.contractAccessorialsArray = []
  this.specialRulesAccessorialArray = [];
  let contractfilterArray = contractarray.concat(this.fxfeArArray,this.fxfpArArray,this.yrcArArray,this.reddawayArArray);
console.log(contractfilterArray);
this.passingArray = contractfilterArray
this.territoryArray = contractfilterArray.filter((f:any) => f.rulesName !== 'SPECIAL RULES');
console.log(this.territoryArray)
 this.additionalPricingArray = contractfilterArray.filter((f:any) => f.rulesName === 'SPECIAL RULES');
 let contractfilterAccessorialsArray = contractfilterArray.filter((f:any) => f.accessorials.length > 0);
 console.log(contractfilterAccessorialsArray);
 this.contractAccessorialsArray = contractfilterAccessorialsArray;

 console.log(this.contractAccessorialsArray);
 this.costplusArray = [];
 if (this.companyInformation.costPlusFactor !== undefined) {
  this.costplusArray = this.companyInformation.costPlusFactor 

 }
  this.firstDate = this.datePipe.transform(data.contractDate,"MM/dd/yyyy");
  this.secondDate = this.datePipe.transform(data.contractDate,"MM/dd/yyyy");
console.log(this.firstDate);
  $('#ContractModalNew').modal('show');
}
editLTLContract(data: any) {
  console.log(data);
  console.log(data);
  if (this.companyInformation.specificPricing === false) {
    this.showSecondAddress = true;
  } else {
    if (this.companyInformation.specificPricingList.length > 0) {
      if (this.companyInformation.specificPricingList.length >1) {
        this.showSecondAddress = false;
        this.showFirstAddress = true;
       this.companyInformation.specificPricingList.forEach((element:any) => {
         if (element === 'YRC') {
           if (this.displayShipmentName === undefined) {
            this.displayShipmentName = 'YRC';
  
           } else {
             this.displayShipmentName = this.displayShipmentName + ' and YRC';
  
           }
         } else if (element === 'FEDEX ECONOMY' || element === 'FEDEX PRIORITY') {
          if (this.displayShipmentName === undefined) {
            this.displayShipmentName = 'Fedex';
  
           } else {
             this.displayShipmentName = this.displayShipmentName + ' and Fedex';
  
           }
         }
       })
  
      } else {
        // this.showSecondAddress = true;
        this.showFirstAddress = true;
        this.companyInformation.specificPricingList.forEach((element: any) => {
          if (element === 'YRC') {
            if (this.displayShipmentName === undefined) {
             this.displayShipmentName = 'YRC';
   
            } else {
              this.displayShipmentName = this.displayShipmentName + ' and YRC';
   
            }
          } else if (element === 'FEDEX ECONOMY' || element === 'FEDEX PRIORITY') {
           if (this.displayShipmentName === undefined) {
             this.displayShipmentName = 'Fedex';
   
            } else {
              this.displayShipmentName = this.displayShipmentName + ' and Fedex';
   
            }
          }
        })
      }
    }
  }
  this.shippingManagerName = data.contractPersion;
  this.shippingManagerPost = data.contractPosition;
  this.contractAddrss = data.contractAddress;
  this.firstDate = this.datePipe.transform(data.contractDate,"MM/dd/yyyy");
  this.secondDate = this.datePipe.transform(data.contractDate,"MM/dd/yyyy");
  this.contractname = data.contractName;

  $('#ContractModalNew1').modal('show');
}

viewFTLContract(data: any) {
  console.log(data);
  this.shippingManagerName = data.contractPersion;
  this.shippingManagerPost = data.contractPosition;
  this.contractAddrss = data.contractAddress;
  this.firstDate = this.datePipe.transform(data.contractDate,"MM/dd/yyyy");
  this.secondDate = this.datePipe.transform(data.contractDate,"MM/dd/yyyy");
  this.contractname = data.contractName;
console.log(this.firstDate);
  $('#ContractModalNew2').modal('show');
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
editFTLContract(data: any) {
  console.log(data);
  console.log(data);
  this.shippingManagerName = data.contractPersion;
  this.shippingManagerPost = data.contractPosition;
  this.contractAddrss = data.contractAddress;
  this.firstDate = this.datePipe.transform(new Date(),"MM/dd/yyyy");
  this.secondDate = this.datePipe.transform(data.contractDate,"MM/dd/yyyy");
  $('#ContractModalNew3').modal('show');
}

createContractrules() {
  let name = 'LTL_' + this.companyInformation.companyName +'_' + this.firstDate;
  let object = {
    "companyId": this.companyInformation.id,
    "contractName":name ,
    "contractPersion": this.shippingManagerName,
    "contractPosition": this.shippingManagerPost,
    "contractAddress": this.contractAddrss,
    "paymentTerms": this.companyInformation.paymentTerms
  }
  this.invoiceService.saveContract(object).subscribe((data: any) => {
    console.log(data);
    if (data.result !== false) {
      this.getContractList();
      $('#ContractModalNew1').modal('hide');
      $('#contractList-modal').modal('hide');
      // swal("Contract has been created successfully ", {
      //   icon: "success",
      // })
      Swal.fire('Success',"Contract has been created successfully ","success")
    }
  })
   
} 
saveFTLcontract() {
  let name = 'FTL_' + this.companyInformation.companyName +'_' + this.firstDate;
  let object = {
    "companyId": this.companyInformation.id,
    "contractName":name ,
    "contractPersion": this.shippingManagerName,
    "contractPosition": this.shippingManagerPost,
    "contractAddress": this.contractAddrss,
    "paymentTerms": this.companyInformation.paymentTerms
  }
  this.invoiceService.saveContract(object).subscribe((data:any) => {
    console.log(data);
    if (data.result !== false) {
      this.getContractList();
      $('#ContractModalNew3').modal('hide');
      $('#contractList-modal').modal('hide');

      // swal("Contract has been created successfully ", {
      //   icon: "success",
      // })
      Swal.fire('Success',"Contract has been created successfully ","success")
    }
  })
   
}

exportContract() {
  // this.showeditContract = false;
  setTimeout(() =>{
    var data = document.getElementById('capture');
        html2canvas($('#bolContainerNew')[0] ).then((canvas:any) => {
            // Few necessary setting options 
            // var imgWidth = 720;
            // var pageHeight = 1000;
            var imgWidth = 210; 
            var pageHeight = 290;  
            // var pageHeight = 295;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            // alert(canvas.height +'-' + canvas.width);
            const contentDataURL = canvas.toDataURL('image/png');
            let pdf = new jsPDF('p', 'mm'); // A4 size page of PDF 
            var position = 1;
            pdf.addImage(contentDataURL, 'PNG', 1, position, imgWidth, imgHeight)
            heightLeft -= pageHeight;

while (heightLeft >= 0) {
position = heightLeft - imgHeight;
pdf.addPage();
pdf.addImage(contentDataURL, 'PNG', 1, position, imgWidth, imgHeight)
heightLeft -= pageHeight;
}
            pdf.save( this.contractname +".pdf"); // Generated PDF 

        });
        setTimeout(() => {
          $('#ContractModal1').modal('hide');

        },40000)
  })
}
}
