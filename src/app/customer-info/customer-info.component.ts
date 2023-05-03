import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { InvoiceService } from '../services/invoice.service';
import { PricingInfoService } from '../services/pricing-info.service';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
// import {http} from '@angular/ht'
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/toPromise';
// import { saveAs } from 'file-saver/FileSaver'
import {saveAs}  from 'file-saver';

// import * as FileSaver from 'file-saver';

declare var $: any;
@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {
  customerForm: FormGroup = new FormGroup({});
  accessToken:any;
  salesRepNames:any;
  zipcodeResponse:any;
  companyInfo:any;
  loginDetails:any;
  companyNames:any = [];
  companyDetails:any;
  imageData: any;
  companyInformation:any;
  companyInformationSub: any = Subscription;
  zipCodeErrorResponse = false;
  zipCodeContactErrorResponse = false;
  customerDetails:any;
  salesRepArray:any = [];
  base64textString:any;
  showPicAttached = false;
  base64ToImage: any ='';
  base64:any;
  selectedPictures:any = [];
  file: any;
  picShowFlag = false;
  filenames:any = [];
  viewImageData: any ='';
  picturesNames:any = [];
  uploadedPictures:any = [];
  enableViewPicturesUploaded: any = false;
  pricingList:any = []
  enableViewPrePricingPicturesUploaded: any = false;
  uploadedPricingPictures:any = [];
  pricingNames:any = [];
  deletedUploadedPricingPictures:any = [];
  deletedUploadedPictures:any = [];
  trafficDataEnableSubscriber: any = Subscription;
  constructor(private invoiceService: InvoiceService,
    private fb: FormBuilder,
    private pricingInfoService: PricingInfoService,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router, private http: HttpClient) {
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
    let details:any = localStorage.getItem(('SalesRepName'));
    this.loginDetails = JSON.parse(details);
    this.accessToken = localStorage.getItem('accessToken');
    this.getSalesRepNames();
     this.companyInformation = this.invoiceService.getCompanyInformation();
   // this.companyInformation = null;
    console.log('this.companyInformation', this.companyInformation);
    this.buildForm();
    this.getDetails();
    this.fetchCompanyDetails();
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
      id: [0]
    });
    this.customerForm.patchValue({
      salesRepId: this.loginDetails.salesRepName
    });
  }
  getDetails() {
    this.invoiceService.getCompanyDetails(this.loginDetails.id, this.accessToken).subscribe((response:any) => {
      this.companyDetails = response.result;
      this.companyDetails.sort(this.dynamicSort('companyName'));
      if (this.companyDetails.length > 0) {
        for (let c = 0; c < this.companyDetails.length; c++) {
          this.companyNames.push(this.companyDetails[c].companyName);
        }
      }
    });
  }

  getSalesRepNames() {
    this.invoiceService.getSalesRepDetails(this.accessToken).subscribe(response => {
      this.salesRepNames = response;
      if (this.companyInformation!==null && this.companyInformation!==undefined) {
        let salesRepId = this.companyInformation.salesRepId;
        if (this.salesRepNames!== undefined) {
          if (this.salesRepNames.length > 0) {
        this.salesRepArray = this.salesRepNames.filter(function(el:any){
          return el.id === salesRepId;
  
        });
  
        this.customerForm.patchValue({
          salesRepId: this.salesRepArray[0].salesRepName
        }); 
      }
      }
    }
    });
  }
  patchContactInfo(value:any, type:any) {
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
          accountPersonPhoneNumber: value.contactPersonPhoneNumber
        });
      }
    }
  }
  checkForCompany(event:any, formValue:any) {
    console.log(event);
    let companyValues = [];
    this.uploadedPricingPictures = [];
    this.uploadedPictures = [];
    // this.invoiceService.trafficDataEnableSubject.unsubscribe();
        // this.getSalesRepNames();
        let emptyArray = null;
        this.invoiceService.setTrafficData(emptyArray);
        this.invoiceService.setTrafficDataEnable(emptyArray);
        // this.invoiceService.trafficDataEnableSubject.unsubscribe();

        let passingObject = undefined;
        this.invoiceService.setAnalyticsCode(passingObject);  
          companyValues = this.companyDetails.filter(function (el:any) {
      return el.companyName === event.target.value;
    });
    if (companyValues.length > 0) {
      this.companyInformation = companyValues[0];
      console.log('this.companyInformation', this.companyInformation);
      this.companyInformation.typeOfUser = true;

      let salesRepId = this.companyInformation.salesRepId;
      this.salesRepArray = this.salesRepNames.filter(function (el:any) {
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

    console.log('this.patchALlvalues', this.companyInformation);
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
      paymentTerms: this.companyInformation.paymentTerms,
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
    if (this.companyInformation.pictures !== null) {
      if (this.companyInformation.pictures.length > 0 ) {
      this.enableViewPicturesUploaded = true;
      this.customerForm.controls['picturesAttached'].setValue(true);
      this.companyInformation.pictures.forEach((obj:any) => {
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
        this.companyInformation.prePricing.forEach((obj:any) => {
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
      this.salesRepArray = this.salesRepNames.filter(function(el:any){
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

  checkForZipCodes(zipcode:any, type:any) {
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

  saveData(customerForm:any) {
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
      this.invoiceService.saveCustomerInfo(customerForm).subscribe((response:any) => {
        console.log('response', response);
        this.companyInformation = response;
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
        this.invoiceService.setTrafficData(emptyArray);
        this.invoiceService.setTrafficDataEnable(emptyArray);
        this.router.navigate(['/uploadTrafficFlow']);
      });
    } else {
      console.log(customerForm);
      if (customerForm.pictures === '' || customerForm.pictures === null ) {
        customerForm.pictures = [];
      } 
      if (customerForm.prePricing === '' || customerForm.prePricing === null) {
        customerForm.prePricing = [];
      }
       this.invoiceService.updateCustomerInfo(customerForm).subscribe((response:any) => {
      console.log('response', response);
      if (this.deletedUploadedPictures.length >0) {
        this.deletedUploadedPictures.forEach((obj:any) => {
          this.invoiceService.deleteUploaded('customerPictures', obj).subscribe((res:any) => {
            console.log(res);
        })
        });
      }
      if (this.deletedUploadedPricingPictures.length > 0) {
        this.deletedUploadedPricingPictures.forEach((element:any)=> {
          this.invoiceService.deleteUploaded('prePricingPictures',element).subscribe((res:any) => {
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
      this.invoiceService.setTrafficDataEnable(emptyArray);
      this.router.navigate(['/uploadTrafficFlow']);
    });
    }
   
  }
  nextTraffic() {
    this.setCustomerObject();
    // let emptyArray = null;
    // this.invoiceService.setTrafficData(emptyArray);
    // this.invoiceService.setTrafficDataEnable(emptyArray);
    this.router.navigate(['/trafficdatanew']);
  //  [('/Invoice')]
  }
  nextCarrierAnalytics() {
    this.setCustomerObject();
    let emptyArray = null;
    this.invoiceService.setTrafficData(emptyArray);
    this.invoiceService.setTrafficDataEnable(emptyArray);
    this.router.navigate(['/carrierAnalytics']);
  }
  clearCompany() {
    // this.getSalesRepNames();
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
  checkEnterKey(event:any, type:any) {
    let carrierData;
    if (event.which === 13) {
      event.preventDefault();
      if (type === 'companyName') {
        (document.getElementById('companyZip')as HTMLFormElement).focus();
        let emptyArray = null;
        this.invoiceService.setTrafficData(emptyArray);
        this.invoiceService.setTrafficDataEnable(emptyArray);

        // this.invoiceService.trafficDataEnableSubject.unsubscribe();
        let passingObject = null;
        this.invoiceService.setAnalyticsCode(passingObject);
        event.preventDefault();
      } else if (type === 'companyZip') {
        (document.getElementById('address')as HTMLFormElement).focus();
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
        (document.getElementById('accountPersonDesignation') as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'accountPersonDesignation') {
        (document.getElementById('accountPersonPhoneNumber') as HTMLFormElement).focus();
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
        (document.getElementById('estimatedExtendedCredit')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'estimatedExtendedCredit') {
        (document.getElementById('saveBtn')as HTMLFormElement).focus();
        event.preventDefault();
      }
    }
  }
  next(customerForm:any) {
    console.log('customerForm', customerForm, this.companyInformation);
    if (customerForm !== undefined) {
      if (this.companyInformation !== null && this.companyInformation !== undefined) {
        if (this.companyInformation.id === 0) {
          customerForm.salesRepName = customerForm.salesRepId;
          customerForm.salesRepId = this.loginDetails.id;
          customerForm.createdBy = this.loginDetails.id;
          customerForm.companyName = customerForm.companyName.toUpperCase();
          this.invoiceService.saveCustomerInfo(customerForm).subscribe((response:any) => {
            console.log('response', response);
            this.companyInformation = response;
            this.setCustomerObject();
            let passingObject = undefined;
            this.invoiceService.setAnalyticsCode(passingObject);
            this.router.navigate(['/uploadTrafficFlow']);
          }, (err:any) => {
            customerForm.salesRepName = customerForm.salesRepId;
            customerForm.salesRepId = this.loginDetails.id;
            customerForm.createdBy = this.loginDetails.id;
            customerForm.companyName = customerForm.companyName.toUpperCase();
            this.companyInformation = customerForm;

            this.setCustomerObject();
            let passingObject = undefined;
            this.invoiceService.setAnalyticsCode(passingObject);
            this.router.navigate(['/uploadTrafficFlow']);
          });
        } else {
          this.setCustomerObject();
          let passingObject = undefined;
          this.invoiceService.setAnalyticsCode(passingObject);
          this.router.navigate(['/uploadTrafficFlow']);
        }
      } else {
        customerForm.salesRepName = customerForm.salesRepId;
          customerForm.salesRepId = this.loginDetails.id;
          customerForm.createdBy = this.loginDetails.id;
          customerForm.companyName = customerForm.companyName.toUpperCase();
          this.invoiceService.saveCustomerInfo(customerForm).subscribe((response:any) => {
            console.log('response', response);
            this.companyInformation = response;
            this.setCustomerObject();
            let passingObject = undefined;
            this.invoiceService.setAnalyticsCode(passingObject);
            this.router.navigate(['/uploadTrafficFlow']);
          }, (err:any) => {
            customerForm.salesRepName = customerForm.salesRepId;
            customerForm.salesRepId = this.loginDetails.id;
            customerForm.createdBy = this.loginDetails.id;
            customerForm.companyName = customerForm.companyName.toUpperCase();
            this.companyInformation = customerForm;

            this.setCustomerObject();
            let passingObject = undefined;
            this.invoiceService.setAnalyticsCode(passingObject);
            this.router.navigate(['/uploadTrafficFlow']);
          });
        // this.setCustomerObject();
        // this.router.navigate(['/Invoice']);
      }
    } else {
      let passingObject = undefined;
      this.invoiceService.setAnalyticsCode(passingObject);
      this.router.navigate(['/uploadTrafficFlow']);
    }
  }
  imageClick(imagedata:any) {
    console.log(imagedata);
    this.picShowFlag = true;
    this.imageData = imagedata;
    }
    hidePic(){
    this.picShowFlag = false;
    }
    saveFile(imageurl:any) {
    console.log('download',imageurl);
    const headers = new Headers();
    headers.append('Accept', 'text/plain');
    this.http.get(imageurl)
    .toPromise()
    .then(response => this.saveToFileSystem(response));
    }
    
    private saveToFileSystem(response:any) {
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
          this.invoiceService.saveCustomerInfo(customerForm).subscribe((response:any) => {
            console.log('response', response);
            this.companyInformation = response;
            this.setCustomerObject();
            
            this.router.navigate(['/uploadTrafficFlow']);
          }, (err:any) => {
            customerForm.salesRepName = customerForm.salesRepId;
            customerForm.salesRepId = this.loginDetails.id;
            customerForm.createdBy = this.loginDetails.id;
            customerForm.companyName = customerForm.companyName.toUpperCase();
            this.companyInformation = customerForm;

            this.setCustomerObject();
            this.router.navigate(['/uploadTrafficFlow']);
          });
        } else {
          this.setCustomerObject();
          this.router.navigate(['/uploadTrafficFlow']);
        }
      } else {
        customerForm.salesRepName = customerForm.salesRepId;
          customerForm.salesRepId = this.loginDetails.id;
          customerForm.createdBy = this.loginDetails.id;
          customerForm.companyName = customerForm.companyName.toUpperCase();
          this.invoiceService.saveCustomerInfo(customerForm).subscribe((response:any) => {
            console.log('response', response);
            this.companyInformation = response;
            if (response) {
              this.setCustomerObject();
              this.router.navigate(['/uploadTrafficFlow']);
            }
            
          }, (err:any) => {
            customerForm.salesRepName = customerForm.salesRepId;
            customerForm.salesRepId = this.loginDetails.id;
            customerForm.createdBy = this.loginDetails.id;
            customerForm.companyName = customerForm.companyName.toUpperCase();
            this.companyInformation = customerForm;

            // this.setCustomerObject();
            // this.router.navigate(['/uploadTrafficFlow']);
          });
        // this.setCustomerObject();
        // this.router.navigate(['/Invoice']);
      }
    } else {
      this.router.navigate(['/uploadTrafficFlow']);
    }
  }
  calculateAmtCredit(value:any) {
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
      this.companyInformation.salesRepId = this.loginDetails.id;
      this.companyInformation.createdBy = this.loginDetails.id;
      this.companyInformation.companyName = this.companyInformation.companyName.toUpperCase();
    }
    console.log('this. setobject', this.companyInformation);
    this.invoiceService.setCompanyInformation(this.companyInformation);
  }

  contactInfo(formValue:any, type:any) {
    if (type === 'similar') {
      this.customerForm.patchValue({
        accountPersonPhoneNumber: formValue.contactPersonPhoneNumber,
        accountPersonFax: formValue.contactPersonFax,
        accountPersonShippingAddress: formValue.companyShippingAddress,
        accountPersonZip: formValue.companyZip,
        accountPersonCity: formValue.companyCity,
        accountPersonState: formValue.companyState
      });
      (document.getElementById('accountPersonName')as HTMLFormElement).focus();
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

 
  picturesAttached(name:any){
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
  prepricingAttached(name:any) {
    name.forEach((obj:any) => {
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


handleFileSelect(evt:any){
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

_handleReaderLoaded(readerEvt:any) {
  var binaryString = readerEvt.target.result;
        this.base64textString= btoa(binaryString);
        console.log(btoa(binaryString));
        console.log('abc',atob(this.base64textString));
}

fileChanged(event:any) {
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

fileChanged1(event:any) {
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

uploadfile(data:any) {
this.invoiceService.uploadPictures(data).subscribe((response:any) => {
  console.log(response);
  this.customerForm.controls['picturesAttached'].setValue(true);
  // this.viewPicturesUploaded();
}, (err:any) => {
console.log(err);
})

}

uploadPrepricingfile(data:any) {
  this.invoiceService.uploadPricingPictures(data).subscribe((response:any) => {
    console.log(response);
    this.customerForm.controls['prePricingAuthorizationAttached'].setValue(true);
    // this.viewPrePricingPicturesUploaded();
  }, (err:any) => {
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

viewImage(data:any) {
  console.log(data);  
  data.forEach((obj:any, index:any) => {
    let url = 'http://52.52.76.24:3000/api/container/customerPictures/download/' + obj.name;
    this.uploadedPictures[index]['image'] = url;

  })
    // for (let i = 0; i < this.filenames.length; i++) {
    // if (i === index) {
    // } else {
    //   this.filenames[i]['image']= '';

    // }
  // }
  
}

viewImage1(data:any) {
  console.log(data); 
  data.forEach((obj:any, index:any) => {
  let url = 'http://52.52.76.24:3000/api/container/prePricingPictures/download/' + obj.name;
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

viewImageIndex1(data:any, index:any) {
  console.log(data, index);  
  let url = 'http://52.52.76.24:3000/api/container/customerPictures/download/' + data.name;
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
viewImageIndex(data:any, index:any) {
  console.log(data, index);  
  let url = 'http://52.52.76.24:3000/api/container/prePricingPictures/download/' + data.name;
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

deleteImage(data:any, type:any, index:any) {
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

downloadImage(downloadLink:any) {
  this.customerService.getImage(downloadLink.image).subscribe(
    (res:any) => {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(res);
          a.download = downloadLink.name;
          document.body.appendChild(a);
          a.click();
    });
  }

}