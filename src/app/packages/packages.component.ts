import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebserviceService } from '../services/webservice.service';
import { PricingInfoService } from '../services/pricing-info.service';
import { CustomerService } from '../services/customer.service';
import { ExternalService } from '../services/external.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  packageForm: FormGroup = new FormGroup({});
  pickupForm: FormGroup = new FormGroup({});
  addressTemplateNameForm: FormGroup = new FormGroup({});
  fedexCredentialsForm: FormGroup =new FormGroup({});
  public accessToken: any;
  public salesRep: any;
  public salesRepValues: any;
  public salesRepType: any;
  public customerType: any;
  public getPlaces: any;
  public requestObject: any;
  public showLoader = false;
  public entryLoader = false;
  public showRateDetail = false;
  public resultData: any;
  public showSuccessResponse = false;
  public showFailureResponse = false;
  public inValidOriginZipcode = false;
  public inValidDestZipcode = false;
  public invalidWeightMsg = false;
  public companyData: any;
  public forteFedexFactor: any;
  public failureInFedexSubscription = false;
  public failureInNetwork = false;
  public showForPickUp = false;
  public formValue: any;
  public pickupData: any;
  public pickupResponse: any;
  public pickupLoader = false;
  public invalidDateErrorMsg = false;
  public weightAllowed = false;
  public datePatch: any;
  ismeridian:any;
  public minDate = new Date();
  public shipperTemplates: any = [];
  public consigneeTemplates: any = [];
  public addressTemplates: any;
  public hideShipperTemplate = false;
  public hideConsigneeTemplate = false;
  public showForEnteringfedexSubsctiption = false;
  public originZip: any;
  public responseObject: any;
  public showWhenNoFedexSubscription = false;
  public showForForteSubscription = false;
  public d = new Date();
  public mytime: any;
  public originSettings = {

    "showSearchButton": false,
    "recentStorageName": "componentData4",
    "inputPlaceholderText": "Enter the Origin",
    "noOfRecentSearchSave": 8
  }

  public destinationSettings = {
    "showSearchButton": false,
    "recentStorageName": "componentData4",
    "inputPlaceholderText": "Enter the Destination",
    "noOfRecentSearchSave": 8
  }
  public fedexCredentials: any;
  constructor(private fb: FormBuilder,
    private webService: WebserviceService,
    private pricingInfoService: PricingInfoService,
    private customerService: CustomerService,
  private router: Router, 
  private toastr: ToastrService, 
  private datePipe: DatePipe, private externalService: ExternalService) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.buildForm();
    this.localStorageValues();
  //  this.getImage();
   this.confirmPickUpForm();
   this.addressTemplateData();
   // this.addressTemplateForm()
  }

  getImage() {
    let id = ''
    this.webService.getShipmentLabel(id, this.accessToken).subscribe((response: any)=>{

    })
    // document.getElementById('imgId').setAttribute('src', this.base64Img);
  }
  buildForm() {
    this.packageForm = this.fb.group({
      originZip: [''],
      originCity: [''],
      originState: [''],
      destinationZip: ['', [Validators.required]],
      destinationCity: [''],
      destinationState: [''],
      packagingType: ['', [Validators.required]],
      weightValue: ['', [Validators.required]],
      weightUnit: ['LB', [Validators.required]],
      residential: [''],
      shipperCompanyName: ['', [Validators.required]],
      shipperPhoneNumber: ['', [Validators.required]],
      shipperContactName: [''],
      shipperStreet1: ['', [Validators.required]],
      shipperStreet2: [''],
      shipperCountry: ['USA'],
      consigneeCompanyName: ['', [Validators.required]],
      consigneePhoneNumber: [''],
      consigneeContactName: [''],
      consigneeStreet1: ['', [Validators.required]],
      consigneeStreet2: [''],
      consigneeCountry: ['USA'],
      pickupDate: [this.minDate]
    });
    this.addressTemplateNameForm = this.fb.group({
      addressTempName: ['']
    });
    this.fedexCredentialsForm = this.fb.group({
      key: [''],
      password: [''],
      accountNumber: [''],
      meterNumber: [''],
      id: ['']
    });
    
  }
  pickUpDateConfirm(value: any) {
    console.log('value', value);
  }

  confirmPickUpForm() {
    this.pickupForm = this.fb.group({
      pickUpDate: ['', [Validators.required]],
      pickUpReadyTime: ['', [Validators.required]],
      companyClosingTime: ['', [Validators.required]]
    });
    this.setDate();
  }
  setDate() {
    this.d.setHours(16);
    this.d.setMinutes(0);
    this.mytime = this.d;
    }


  addressTemplateData() {
    this.hideShipperTemplate = false;
    this.hideConsigneeTemplate = false;
    let openType = 'address';
    let category = 'shipper';
    this.externalService.getTemplate(this.salesRepValues.companyId, openType).subscribe(response =>{
      this.addressTemplates = response;
      if (this.addressTemplates.length > 0) {
        for (let a = 0; a < this.addressTemplates.length; a++) {
          if (this.addressTemplates[a].type === 'shipper') {
              this.shipperTemplates.push(this.addressTemplates[a]);
          } else {
            this.consigneeTemplates.push(this.addressTemplates[a]);
          }
        }
        if (this.shipperTemplates.length > 0) {
          this.hideShipperTemplate = false;
        } else {
          this.hideShipperTemplate = true;
        }
        if (this.consigneeTemplates.length > 0) {
          this.hideConsigneeTemplate = false;
        } else {
          this.hideConsigneeTemplate = true;
        }
      } else {
        this.hideShipperTemplate = true;
        this.hideConsigneeTemplate = true;
      }
      
    });
  }

  getAddressClickValues(data: any, type: any) {
    console.log('data', data);
    let contactNumber = this.formatPhoneNumber(data.contactNumber);
    console.log('contactNumber', contactNumber);
    // this.originZip = data.zip;
      if (type === 'shipperid') {
        this.packageForm.patchValue({
          shipperCompanyName: data.companyName,
          shipperPhoneNumber: data.contactNumber,
          shipperContactName: data.contactName,
          shipperStreet1: data.street1,
          shipperStreet2: data.street2,
          originZip: data.zip,
          originCity: data.city,
          originState: data.state
        });
      } else {
        this.packageForm.patchValue({
          consigneeCompanyName: data.companyName,
          consigneePhoneNumber: contactNumber,
          consigneeContactName: data.contactName,
          consigneeStreet1: data.street1,
          consigneeStreet2: data.street2,
          destinationCity: data.city,
          destinationZip: data.zip,
          destinationState: data.state
        })
      }
  }
  formatPhoneNumber(s: any) {
    let s2 = ('' + s).replace(/\D/g, '');
    let m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ')' + m[2] + '-' + m[3];
  }
  getCityState(zip: any, type: any) {
    this.getPlaces = {};
    this.inValidOriginZipcode = false;
    this.inValidDestZipcode = false;
    this.pricingInfoService.getCityState(zip).subscribe((response: any) => {
      this.getPlaces = response[0];
      console.log('this.getPlaces', this.getPlaces);
      if (this.getPlaces) {
        if (type === 'origin') {
          this.packageForm.patchValue({
            originState: this.getPlaces.state,
            originCity: this.getPlaces.city
          });
        } else {
          this.packageForm.patchValue({
            destinationState: this.getPlaces.state,
            destinationCity: this.getPlaces.city
          });
        }
      } else {
        if (type === 'origin') {
          this.packageForm.patchValue({
            originState: '',
            originZip: '',
            originCity: ''
          });
          this.inValidOriginZipcode = true;
        } else {
          this.packageForm.patchValue({
            destinationState: '',
            destinationZip: '',
            destinationCity: ''
          });
          this.inValidDestZipcode = true;
        }
      }
    });
  }

  checkWeightValue(form: any) {
    console.log('form', form);
    this.invalidWeightMsg = false;
     // this.invalidWeightMsg = true;
      if (form.packagingType === 'FEDEX_ENVELOPE') {
        if (form.weightUnit === 'KG'){
          if (Number(form.weightValue) > 4.5) {
            console.log('1');
        this.invalidWeightMsg = true;
      } else {
        console.log('2');
        this.invalidWeightMsg = false;
      }
     } else {
      console.log('3');
      if (Number(form.weightValue) > 10) {
        console.log('4');
      this.invalidWeightMsg = true;
      } else {
        console.log('5');
      this.invalidWeightMsg = false;
      } 
      }
      if (this.invalidWeightMsg === true) {
        console.log('6');
      this.packageForm.patchValue({
        weightValue: ''
      })
    } else {
      console.log('7');
    }
     } else if (form.packagingType === 'FEDEX_SMALL_BOX' || 
     form.packagingType === 'FEDEX_MEDIUM_BOX' || 
     form.packagingType === 'FEDEX_EXTRA_LARGE_BOX'|| 
     form.packagingType === 'FEDEX_LARGE_BOX' || 
     form.packagingType === 'FEDEX_PAK' || 
     form.packagingType === 'FEDEX_TUBE') {
      console.log('8');
      if (form.weightUnit === 'KG'){
        console.log('9');
        if (Number(form.weightValue) > 22.68) {
          console.log('10');
      this.invalidWeightMsg = true;
    } else {
      console.log('11');
      this.invalidWeightMsg = false;
    }
   } else {
    console.log('12');
    if (Number(form.weightValue) > 50) {
      console.log('13');
    this.invalidWeightMsg = true;
    } else {
      console.log('14');
    this.invalidWeightMsg = false;
    } 
    }
    if (this.invalidWeightMsg === true) {
      this.packageForm.patchValue({
        weight: ''
      })
    }
     } else {
      console.log('15');
      this.invalidWeightMsg = false;
    }
  
  }
  localStorageValues() {
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.accessToken = localStorage.getItem(('accessToken'));
    this.salesRepValues = JSON.parse(this.salesRep);
    this.salesRepType = this.salesRepValues.type;
    this.customerType = localStorage.getItem(('customerType'));
    this.packageForm.patchValue({
      shipperCompanyName: this.salesRepValues.companyName,
      shipperPhoneNumber: this.salesRepValues.contactNumber,
      shipperContactName: this.salesRepValues.customerName,
      shipperStreet1: this.salesRepValues.address,
      originZip: this.salesRepValues.zip,
      originCity: this.salesRepValues.city,
      originState: this.salesRepValues.state
      
    });
    
  
    this.getCompanyDetail();
  }
  getCompanyDetail() {
    this.customerService.getAllCompanyDataById(this.accessToken, this.salesRepValues.companyId).subscribe(response => {
      this.companyData = response;
      console.log('this.companyData', this.companyData);
      if (this.companyData.length > 0) {
        for (let c = 0; c < this.companyData.length; c++) {
          if(this.companyData[c].fedexSubscription === true) {
            if (this.companyData[c].subscriptionType === 'fedex') {
              // if (this.companyData[c].fedex)
              this.showForEnteringfedexSubsctiption = true;
              this.showForForteSubscription = false;
            } else {
              this.showForEnteringfedexSubsctiption = false;
              this.showForForteSubscription = true;
              this.fedexCredentials = {};
            }
            
            this.showWhenNoFedexSubscription = false;
          } else {
            this.showForEnteringfedexSubsctiption = false;
            this.showWhenNoFedexSubscription = true;
            this.showForForteSubscription = false;
            this.fedexCredentials = {};
          }
        }
      }
    }, err => {
      this.failureInNetwork = true;
    });
  }
  getRates(form: any) {
    
    console.log('form', form);
    this.entryLoader = true;
    this.showRateDetail = false;
    this.showSuccessResponse = false;
    this.showFailureResponse = false;
    this.failureInNetwork = false;
    let object = {};
    if (form.residential === '' || form.residential === null || form.residential === undefined) {
      form.residential = "false";
    }
    this.formValue = form;
    object = {
      originZip: form.originZip,
      originState: form.originState,
      destinationZip: form.destinationZip,
      destinationState: form.destinationState,
      packagingType: form.packagingType,
      weight: {
        Units: form.weightUnit,
        Value: form.weightValue
      },
      residential: form.residential,
      specialServiceTypes: "",
      companyId: this.salesRepValues.companyId,
      credentials: this.fedexCredentials
    }
    this.requestObject = object;
    if (this.companyData.length > 0) {
      if (this.companyData[0].premiumFactor !== '' && this.companyData[0].premiumFactor !== null && this.companyData[0].premiumFactor !== undefined) {
        this.forteFedexFactor = 1 + (Number(this.companyData[0].premiumFactor) / 100);
      } else {
        this.forteFedexFactor = 1;
      }
    } else {
      this.forteFedexFactor = 1;
    }
    if (this.companyData.length > 0) {
      console.log('object', object);
      // if (this.companyData[0].fedexCredentials !== null) {
      //   if (this.companyData[0].fedexCredentials !== {} && Object.keys(this.companyData[0].fedexCredentials).length !== 0) {
          this.failureInFedexSubscription = false;
          this.webService.getRateService(object, this.accessToken).subscribe((response: any) => {
            console.log('response', response);
            this.resultData = response.result;
            console.log('this.resultData', this.resultData);
            this.entryLoader = false;
            if (this.resultData.RateReplyDetails !== undefined) {
              console.log('this.resultData.RateReplyDetails', this.resultData.RateReplyDetails);
              if (this.resultData.RateReplyDetails.length > 0) {
                for (let r = 0; r < this.resultData.RateReplyDetails.length; r++) {
                  let deliveryTime = this.resultData.RateReplyDetails[r].DeliveryTimestamp;
                  console.log('deliveryTime', deliveryTime);
                  if (deliveryTime !== undefined) {
                    let deliveryTimeNew = deliveryTime.replace('Z', '');
                    console.log('deliveryTimeNew', deliveryTimeNew);
                    this.resultData.RateReplyDetails[r].DeliveryTimestamp = deliveryTimeNew;
                  } else {
                    this.resultData.RateReplyDetails[r].DeliveryTimestamp = '';
                  }

                  // console.log('this.resultData.RateReplyDetails.RatedShipmentDetails.ShipmentRateDetail.TotalNetCharge.Amount', deliveryTime);
                  if (this.resultData.RateReplyDetails[r].RatedShipmentDetails.length > 0) {
                    console.log('1');
                    for (let s = 0; s < this.resultData.RateReplyDetails[r].RatedShipmentDetails.length; s++) {
                      console.log('2');
                      
                      if (this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.Amount!== '') {
                        let forteBaseRate = Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.Amount) * Number(this.forteFedexFactor);
                        console.log('New', forteBaseRate);
                        this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.forteAmount = forteBaseRate.toFixed(2);
                      }
                      if (this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalSurcharges.Amount !== '') {
                        this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalSurcharges.forteSurcharge = (Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalSurcharges.Amount) * Number(this.forteFedexFactor)).toFixed(3); 
                      }
                      if (this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalSurcharges.forteSurcharge !== '' && this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.forteAmount !== '') {
                        this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetCharge.forteNetAmount = (Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalSurcharges.forteSurcharge) + Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.forteAmount)).toFixed(2);
                      }
                      if (this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetCharge.Amount !== '') {
                        console.log('3', this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetCharge.Amount, this.forteFedexFactor);
                        let forteRateNew = Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.forteAmount);
                        console.log('41', forteRateNew);
                        this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].forteRate = forteRateNew.toFixed(2);

                        console.log('4', this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].forteRate);
                        console.log('5', this.resultData.RateReplyDetails[r].RatedShipmentDetails);
                      }
                    }
                  }
                }
              }
              console.log('this.resultData.RateReplyDetails.RatedShipmentDetails', this.resultData.RateReplyDetails.RatedShipmentDetails);
              this.showRateDetail = true;
              this.showSuccessResponse = true;
              this.showFailureResponse = false;
    //           document.getElementById('retailRatesTab').className = 'rtab-item--active';
    // document.getElementById('oneRatesTab').className = 'rtab-item';
            } else {
              this.showRateDetail = true;
              this.showFailureResponse = true;
              this.showSuccessResponse = false;
            }
          }, (err: any) => {
            this.entryLoader = false;
            this.failureInNetwork = true;
          });
      //   } else {
      //     this.failureInFedexSubscription = true;
      //     this.entryLoader = false;
      //   }
      // } else {
      //   this.failureInFedexSubscription = true;
      //   this.entryLoader = false;
      // }
    } else {
      this.failureInFedexSubscription = true;
      this.entryLoader = false;
    }
  }

  getRateForFedexRetailRate() {
    (document.getElementById('retailRatesTab')as HTMLFormElement).className = 'rtab-item--active';
    (document.getElementById('oneRatesTab')as HTMLFormElement).className = 'rtab-item';
    this.showRateDetail = true;
    this.showLoader = true;
    this.showSuccessResponse = false;
    this.showFailureResponse = false;
    this.failureInNetwork = false;
    let object;
    this.requestObject.specialServiceTypes = '';
    console.log('this.requestObject', this.requestObject);
    if (this.companyData.length > 0) {
      if (this.companyData[0].premiumFactor !== '' && this.companyData[0].premiumFactor !== null && this.companyData[0].premiumFactor !== undefined) {
        this.forteFedexFactor = 1 + (Number(this.companyData[0].premiumFactor) / 100);
      } else {
        this.forteFedexFactor = 1;
      }
    } else {
      this.forteFedexFactor = 1;
    }
    if (this.companyData.length > 0) {
      // if (this.companyData[0].fedexCredentials !== null) {
      //   if (this.companyData[0].fedexCredentials !== {} && Object.keys(this.companyData[0].fedexCredentials).length !== 0) {
          this.webService.getRateService(this.requestObject, this.accessToken).subscribe((response: any) => {
            console.log('response', response);
            this.resultData = response.result;
            if (this.resultData.RateReplyDetails !== undefined) {
              console.log('this.resultData.RateReplyDetails', this.resultData.RateReplyDetails);
              // this.showRateDetail = true;
              for (let r = 0; r < this.resultData.RateReplyDetails.length; r++) {
                let deliveryTime = this.resultData.RateReplyDetails[r].DeliveryTimestamp;
                console.log('deliveryTime', deliveryTime);
                if (deliveryTime !== undefined) {
                  let deliveryTimeNew = deliveryTime.replace('Z', '');
                  console.log('deliveryTimeNew', deliveryTimeNew);
                  this.resultData.RateReplyDetails[r].DeliveryTimestamp = deliveryTimeNew;
                } else {
                  this.resultData.RateReplyDetails[r].DeliveryTimestamp = '';
                }

                // console.log('this.resultData.RateReplyDetails.RatedShipmentDetails.ShipmentRateDetail.TotalNetCharge.Amount', deliveryTime);
                // if (this.resultData.RateReplyDetails[r].RatedShipmentDetails.length > 0) {
                //   console.log('1');
                //   for (let s = 0; s < this.resultData.RateReplyDetails[r].RatedShipmentDetails.length; s++) {
                //     console.log('2');
                //     if (this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetCharge.Amount !== '') {
                //       console.log('3', this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetCharge.Amount, this.forteFedexFactor);
                //       let forteRateNew = Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetCharge.Amount) * Number(this.forteFedexFactor);
                //       console.log('41', forteRateNew);
                //       this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].forteRate = forteRateNew.toFixed(2);

                //       console.log('4', this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].forteRate);
                //       console.log('5', this.resultData.RateReplyDetails[r].RatedShipmentDetails);
                //     }
                //   }
                // }
                if (this.resultData.RateReplyDetails[r].RatedShipmentDetails.length > 0) {
                  console.log('1');
                  for (let s = 0; s < this.resultData.RateReplyDetails[r].RatedShipmentDetails.length; s++) {
                    console.log('2');
                    
                    if (this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.Amount!== '') {
                      let forteBaseRate = Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.Amount) * Number(this.forteFedexFactor);
                      console.log('New', forteBaseRate);
                      this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.forteAmount = forteBaseRate.toFixed(2);
                    }
                    if (this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalSurcharges.Amount !== '') {
                      this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalSurcharges.forteSurcharge = (Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalSurcharges.Amount) * Number(this.forteFedexFactor)).toFixed(3); 
                    }
                    if (this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalSurcharges.forteSurcharge !== '' && this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.forteAmount !== '') {
                      this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetCharge.forteNetAmount = (Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalSurcharges.forteSurcharge) + Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.forteAmount)).toFixed(2);
                    }
                    if (this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetCharge.Amount !== '') {
                      console.log('3', this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetCharge.Amount, this.forteFedexFactor);
                      let forteRateNew = Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.forteAmount);
                      console.log('41', forteRateNew);
                      this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].forteRate = forteRateNew.toFixed(2);

                      console.log('4', this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].forteRate);
                      console.log('5', this.resultData.RateReplyDetails[r].RatedShipmentDetails);
                    }
                  }
                }

              }
              console.log('this.resultData.RateReplyDetails.RatedShipmentDetails', this.resultData.RateReplyDetails.RatedShipmentDetails);
              this.showRateDetail = true;

              this.showFailureResponse = false;
              this.showSuccessResponse = true;
            } else {
              // this.showRateDetail = true;
              this.showFailureResponse = true;
              this.showSuccessResponse = false;
            }
            this.showLoader = false;
            // this.showRateDetail = true;
          }, (err: any) => {
            this.showLoader = false;
            this.failureInNetwork = true;
          });
      //   } else {
      //     this.showLoader = false;
      //     this.failureInFedexSubscription = true;
      //   }
      // } else {
      //   this.showLoader = false;
      //   this.failureInFedexSubscription = true;
      // }
    } else {
      this.showLoader = false;
      this.failureInFedexSubscription = true;
    }
  }

  getRateForFedexOneRate() {
    (document.getElementById('retailRatesTab')as HTMLFormElement).className = 'rtab-item';
    (document.getElementById('oneRatesTab')as HTMLFormElement).className = 'rtab-item--active';
    this.showLoader = true;
    this.showRateDetail = true;
    this.showSuccessResponse = false;
    this.showFailureResponse = false;
    this.failureInNetwork = false;
    let object;
    this.requestObject.specialServiceTypes = 'FEDEX_ONE_RATE';
    console.log('this.requestObject', this.requestObject);
    if (this.companyData.length > 0) {
      if (this.companyData[0].premiumFactor !== '' && this.companyData[0].premiumFactor !== null && this.companyData[0].premiumFactor !== undefined) {
        this.forteFedexFactor = 1 + (Number(this.companyData[0].premiumFactor) / 100);
      } else {
        this.forteFedexFactor = 1;
      }
    } else {
      this.forteFedexFactor = 1;
    }
    if (this.companyData.length > 0) {
      // if (this.companyData[0].fedexCredentials !== null) {
      //   if (this.companyData[0].fedexCredentials !== {} && Object.keys(this.companyData[0].fedexCredentials).length !== 0) {
          this.webService.getRateService(this.requestObject, this.accessToken).subscribe((response: any) => {
            console.log('response', response);
            this.resultData = response.result;
            this.showLoader = false;
            if (this.resultData.RateReplyDetails !== undefined) {
              console.log('this.resultData.RateReplyDetails', this.resultData.RateReplyDetails);
              //  this.showRateDetail = true;
              for (let r = 0; r < this.resultData.RateReplyDetails.length; r++) {
                let deliveryTime = this.resultData.RateReplyDetails[r].DeliveryTimestamp;
                console.log('deliveryTime', deliveryTime);
                if (deliveryTime !== undefined) {
                  let deliveryTimeNew = deliveryTime.replace('Z', '');
                  console.log('deliveryTimeNew', deliveryTimeNew);
                  this.resultData.RateReplyDetails[r].DeliveryTimestamp = deliveryTimeNew;
                } else {
                  this.resultData.RateReplyDetails[r].DeliveryTimestamp = '';
                }
                // console.log('this.resultData.RateReplyDetails.RatedShipmentDetails.ShipmentRateDetail.TotalNetCharge.Amount', deliveryTime);
                // if (this.resultData.RateReplyDetails[r].RatedShipmentDetails.length > 0) {
                //   console.log('1');
                //   for (let s = 0; s < this.resultData.RateReplyDetails[r].RatedShipmentDetails.length; s++) {
                //     console.log('2');
                //     if (this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetCharge.Amount !== '') {
                //       console.log('3', this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetCharge.Amount, this.forteFedexFactor);
                //       let forteRateNew = Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetCharge.Amount) * Number(this.forteFedexFactor);
                //       console.log('41', forteRateNew);
                //       this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].forteRate = forteRateNew.toFixed(2);

                //       console.log('4', this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].forteRate);
                //       console.log('5', this.resultData.RateReplyDetails[r].RatedShipmentDetails);
                //     }
                //   }
                // }
                if (this.resultData.RateReplyDetails[r].RatedShipmentDetails.length > 0) {
                  console.log('1');
                  for (let s = 0; s < this.resultData.RateReplyDetails[r].RatedShipmentDetails.length; s++) {
                    console.log('2');
                    
                    if (this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.Amount!== '') {
                      let forteBaseRate = Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.Amount) * Number(this.forteFedexFactor);
                      console.log('New', forteBaseRate);
                      this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.forteAmount = forteBaseRate.toFixed(2);
                    }
                    if (this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalSurcharges.Amount !== '') {
                      this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalSurcharges.forteSurcharge = (Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalSurcharges.Amount) * Number(this.forteFedexFactor)).toFixed(3); 
                    }
                    if (this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalSurcharges.forteSurcharge !== '' && this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.forteAmount !== '') {
                      this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetCharge.forteNetAmount = (Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalSurcharges.forteSurcharge) + Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.forteAmount)).toFixed(2);
                    }
                    if (this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetCharge.Amount !== '') {
                      console.log('3', this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetCharge.Amount, this.forteFedexFactor);
                      let forteRateNew = Number(this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].ShipmentRateDetail.TotalNetFreight.forteAmount);
                      console.log('41', forteRateNew);
                      this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].forteRate = forteRateNew.toFixed(2);

                      console.log('4', this.resultData.RateReplyDetails[r].RatedShipmentDetails[s].forteRate);
                      console.log('5', this.resultData.RateReplyDetails[r].RatedShipmentDetails);
                    }
                  }
                }
              }

              console.log('this.resultData.RateReplyDetails.RatedShipmentDetails', this.resultData.RateReplyDetails.RatedShipmentDetails);
              this.showRateDetail = true;

              this.showFailureResponse = false;
              this.showSuccessResponse = true;
            } else {
              //  this.showRateDetail = true;
              // this.showLoader = true;
              this.showFailureResponse = true;
              this.showSuccessResponse = false;
            }

            // this.showRateDetail = true;
          }, (err: any) => {
            this.showLoader = false;
            this.failureInNetwork = true;
          });
      //   } else {
      //     this.showLoader = false;
      //     this.failureInFedexSubscription = true;
      //   }
      // } else {
      //   this.showLoader = false;
      //   this.failureInFedexSubscription = true;
      // }
    } else {
      this.showLoader = false;
      this.failureInFedexSubscription = true;
    }
  }
  clear() {
    this.packageForm.patchValue({
      originZip: '',
      originState: '',
      destinationZip: '',
      destinationState: '',
      packagingType: '',
      weightValue: '',
      weightUnit: '',
      residential: 'false',
      shipperCompanyName: '',
    });
    this.entryLoader = false;
    this.showLoader = false;
    this.showRateDetail = false;
    this.showSuccessResponse = false;
    this.showFailureResponse = false;
  }

  autoCompleteCallback1(selectedData: any) {
    //do any necessery stuff.
    console.log('selectedData', selectedData);
    let selectedConfig = selectedData.data;
    let zipCodeArray = [], stateArray = [], streetArray1 = [], streetArray2 = [], cityArray = [];
    if (selectedConfig.address_components !== undefined) {
      if (selectedConfig.address_components.length > 0) {
        for (let s = 0; s < selectedConfig.address_components.length; s++) {
          if (selectedConfig.address_components[s].types.length > 0) {
            for (let p = 0; p < selectedConfig.address_components[s].types.length; p++) {
              if (selectedConfig.address_components[s].types[p] === 'street_number') {
                zipCodeArray.push(selectedConfig.address_components[s]);
              } else if (selectedConfig.address_components[s].types[p] === 'postal_code') {
                zipCodeArray.push(selectedConfig.address_components[s]);
              }
              if (selectedConfig.address_components[s].types[p] === 'political') {
                stateArray.push(selectedConfig.address_components[s]);
              }
              if (selectedConfig.address_components[s].types[p] === 'route') {
                streetArray1.push(selectedConfig.address_components[s]);
              }
              if (selectedConfig.address_components[s].types[p] === 'locality') {
                cityArray.push(selectedConfig.address_components[s]);
              }
            }

          }

        }
      }
    }
    let stateNew = [];
    if (stateArray.length > 0) {
      for (let s = 0; s < stateArray.length; s++) {
        for (let t = 0; t < stateArray.length; t++)
          if (stateArray[s].types[t] === 'administrative_area_level_1') {
            stateNew.push(stateArray[s]);
          }
      }
    }
    if (stateNew.length > 0) {
      for (let z = 0; z < stateNew.length; z++) {
        this.packageForm.patchValue({
          originState: stateNew[z].short_name
        });
      }
    }

    if (zipCodeArray.length > 0) {
      for (let z = 0; z < zipCodeArray.length; z++) {
        this.packageForm.patchValue({
          originZip: zipCodeArray[z].short_name
        });
      }
    }

    if (cityArray.length > 0) {
      for (let z = 0; z < cityArray.length; z++) {
        this.packageForm.patchValue({
          originCity: cityArray[z].short_name
        });
      }
    }
    if (streetArray1.length > 0) {
      let streetValues;
      for (let s = 0; s < streetArray1.length; s++) {
        if (zipCodeArray.length > 0) {
          streetValues = zipCodeArray[0].short_name + ',' + streetArray1[s].short_name;
        } else {
          streetValues = streetArray1[s].short_name;
        }
        this.packageForm.patchValue({
          shipperStreet1: streetValues
        });
      }
    }

  }

  autoCompleteCallback2(selectedData: any) {
    console.log('selectedData', selectedData);
    let selectedConfig = selectedData.data;
    let zipCodeArrayDest = [], stateArrayDest = [], streetNumber = [], streetArrayDest1 = [], streetArrayDest2 = [], cityArray = [];
    if (selectedConfig.address_components !== undefined) {
      if (selectedConfig.address_components.length > 0) {
        for (let s = 0; s < selectedConfig.address_components.length; s++) {
          if (selectedConfig.address_components[s].types.length > 0) {
            for (let p = 0; p < selectedConfig.address_components[s].types.length; p++) {
              if (selectedConfig.address_components[s].types[p] === 'street_number') {
                zipCodeArrayDest.push(selectedConfig.address_components[s]);
              } else if (selectedConfig.address_components[s].types[p] === 'postal_code') {
                zipCodeArrayDest.push(selectedConfig.address_components[s]);
              }
              if (selectedConfig.address_components[s].types[p] === 'political') {
                stateArrayDest.push(selectedConfig.address_components[s]);
              }
              if (selectedConfig.address_components[s].types[p] === 'route') {
                streetArrayDest1.push(selectedConfig.address_components[s]);
              }
              if (selectedConfig.address_components[s].types[p] === 'street_number') {
                streetArrayDest2.push(selectedConfig.address_components[s]);
              }
              if (selectedConfig.address_components[s].types[p] === 'locality') {
                cityArray.push(selectedConfig.address_components[s]);
              }
            }

          }

        }
      }
    }
    let stateNew2 = [];
    if (stateArrayDest.length > 0) {
      for (let s = 0; s < stateArrayDest.length; s++) {
        for (let t = 0; t < stateArrayDest.length; t++)
          if (stateArrayDest[s].types[t] === 'administrative_area_level_1') {
            stateNew2.push(stateArrayDest[s]);
          }
      }
    }
    if (stateNew2.length > 0) {
      for (let z = 0; z < stateNew2.length; z++) {
        this.packageForm.patchValue({
          destinationState: stateNew2[z].short_name
        });
      }
    }

    if (zipCodeArrayDest.length > 0) {
      for (let z = 0; z < zipCodeArrayDest.length; z++) {
        this.packageForm.patchValue({
          destinationZip: zipCodeArrayDest[z].short_name
        });
      }
    }
    if (cityArray.length > 0) {
      for (let z = 0; z < cityArray.length; z++) {
        this.packageForm.patchValue({
          destinationCity: cityArray[z].short_name
        });
      }
    }

    if (streetArrayDest1.length > 0) {
      let streetValues;
      for (let s = 0; s < streetArrayDest1.length; s++) {
        if (zipCodeArrayDest.length > 0) {
          streetValues = zipCodeArrayDest[0].short_name + ',' + streetArrayDest1[s].short_name;
        } else {
          streetValues = streetArrayDest1[s].short_name;
        }
        this.packageForm.patchValue({
          consigneeStreet1: streetValues
        });
      }
    }



  }


  addShipment(result: any, rate: any) {
    console.log('addShipment', result, 'rate', rate);
    console.log('hbdhbf', rate.ShipmentRateDetail.TotalNetCharge.forteNetAmount);
    if (this.showForForteSubscription === true) {
      this.pickupData = { serviceType: result.ServiceType, rate: rate.ShipmentRateDetail.TotalNetCharge.Amount};
    } else {
      this.pickupData = { serviceType: result.ServiceType, rate: rate.ShipmentRateDetail.TotalNetCharge.forteNetAmount };
    }
   
    console.log('this.pickupData', this.pickupData);
    this.showForPickUp = true;
   // this.confirmPickUpForm();
    
    this.pickupForm.patchValue({
      pickupDate: '',
      pickUpReadyTime: new Date('9:00'),
      companyClosingTime: new Date('16:00')

    });
    this.datePatch = new Date();
  }   
  invalidDate(pickUpDate: any) {
    console.log('pickupDate', pickUpDate);
    this.invalidDateErrorMsg = false;
    console.log('invalid');
   if(pickUpDate === 'Invalid date') {
       this.invalidDateErrorMsg = true;
   } else {
       this.invalidDateErrorMsg = false;
   }
}
  timePatch() {
    // this.confirmPickUpForm();
    let date = new Date();
    let newDate = moment(date).format('MM/DD/YYYY');
    console.log('soled date', newDate);
    this.datePatch = date;
    this.pickupForm.reset();
    this.pickupForm.patchValue({
      pickupDate: newDate,
      pickUpReadyTime: new Date('09:00'),
      companyClosingTime: new Date('16:00')
    });
  }


  createPickup(form: any) {
    console.log('form', form);
    let object, shipperAddress, consigneeAddress; 
    let date =  this.datePipe.transform(form.pickUpDate, 'yyyy-MM-dd');
     console.log('date', date);
     let newDate = new Date(form.pickUpDate);
     console.log('newDate', newDate);
    let pickUpReadyTime = moment(form.pickUpReadyTime).format('HH:mm:ss');
    console.log("formatReadyTime", pickUpReadyTime);
 let pickUpDate = moment(form.pickUpDate).format('YYYY-MM-DD');
 console.log('format1',pickUpDate);
 let pickUpDateNew = pickUpDate + 'T' + pickUpReadyTime + '-05:00';
 console.log('format1 New',pickUpDateNew);
 
    let companyClosingTime = moment(form.companyClosingTime).format('HH:mm:ss');
    console.log('formatCloseTime', companyClosingTime);
    if (this.formValue.shipperStreet2 !== '' && this.formValue.shipperStreet2 !== null && this.formValue.shipperStreet2 !== undefined) {
      shipperAddress = this.formValue.shipperStreet1 + ',' + this.formValue.shipperStreet2;
    } else {
      shipperAddress = this.formValue.shipperStreet1;
    }
    if (this.formValue.consigneeStreet2 !== '' && this.formValue.consigneeStreet2 !== null && this.formValue.consigneeStreet2 !== undefined) {
      consigneeAddress = this.formValue.consigneeStreet1 + ',' + this.formValue.consigneeStreet2;
    } else {
      consigneeAddress = this.formValue.consigneeStreet1;
    }
    object = {
      'shipper': {
        "Contact": {
          "CompanyName": this.formValue.shipperCompanyName,
          "PhoneNumber": this.formValue.shipperPhoneNumber
        },
        "Address": {
          "StreetLines": [
            shipperAddress
          ],
          "City": this.formValue.originCity,
          "StateOrProvinceCode": this.formValue.originState,
          "PostalCode": this.formValue.originZip,
          "CountryCode": "US"
        },

      },
      'consignee': {

        "Contact": {
          "CompanyName": this.formValue.consigneeCompanyName,
          "PhoneNumber": this.formValue.consigneePhoneNumber
        },
        "Address": {
          "StreetLines": [
            consigneeAddress
          ],
          "City": this.formValue.destinationCity,
          "StateOrProvinceCode": this.formValue.destinationState,
          "PostalCode": this.formValue.destinationZip,
          "CountryCode": "US",
          "Residential": this.formValue.residential
        },
      },
      'weight': {
        'Units': this.formValue.weightUnit,
        'Value': this.formValue.weightValue
      },
      'companyId': this.salesRepValues.companyId,
      'salesRepId': this.salesRepValues.salesRepId,
      'customerId': this.salesRepValues.id,
      'serviceType': this.pickupData.serviceType,
      'packageType': this.formValue.packagingType,
      'pickupDate': pickUpDate,
      'readyTimestamp': pickUpDateNew,
      'companyCloseTime': companyClosingTime,
      'rate': this.pickupData.rate,
      'credentials': this.fedexCredentials
    }
    console.log('form object', object);
    
    this.webService.addPickup(object, this.accessToken).subscribe((response: any) => {
      console.log('response', response);
      this.pickupResponse = response;
      if (this.pickupResponse.result.Notifications[0].Severity === 'SUCCESS') {
        this.toastr.success('Picked up Sucessfully');
        this.pickupLoader = false; 
       
      this.router.navigate(['/list_packages']);
        
      
    } else {
      this.pickupLoader = false; 
      Swal.fire('Oops!',this.pickupResponse.result.Notifications[0].Message,'error');
    }
    }, (err: any) => {
      this.pickupLoader = false; 
      Swal.fire('Oops!','Failure in Response','error');
    });
    
  }

  addressTemplateSave(form: any, type: any, nameForm: any) {
    console.log('form', form);
    let newAddressTemplate;
    if (type === 'address') {
      newAddressTemplate = {
        customerId: this.salesRepValues.id,
        companyId: this.salesRepValues.companyId,
        salesRepId: this.salesRepValues.salesRepId,
        createdOn: new Date(),
        contactNumber: form.consigneePhoneNumber,
        templateName: nameForm.addressTempName,
        companyName: form.consigneeCompanyName,
        contactName: form.consigneeContactName,
        country: form.consigneeCountry,
        street1: form.consigneeStreet1,
        street2: form.consigneeStreet2,
        zip: form.destinationZip,
        city: form.destinationCity,
        state: form.destinationState,
        type: 'consignee'
      };
    } else if (type === 'shipperAddress') {
      newAddressTemplate = {
        customerId: this.salesRepValues.id,
        companyId: this.salesRepValues.companyId,
        salesRepId: this.salesRepValues.salesRepId,
        createdOn: new Date(),
        contactNumber: form.shipperPhoneNumber,
        templateName: nameForm.addressTempName,
        companyName: form.shipperCompanyName,
        contactName: form.shipperContactName,
        country: form.shipperCountry,
        street1: form.shipperStreet1,
        street2: form.shipperStreet2,
        zip: form.originZip,
        city: form.originCity,
        state: form.originState,
        type: 'shipper'
      };
    }

    this.externalService.saveTemplate(newAddressTemplate, type).subscribe((response:any) => {
      console.log('response', response);
      if (response.id !== null && response.id !== '') {
        this.addressTemplateNameForm.reset();
        this.addressTemplateData();
        $('#address-save-modal').modal('hide');
        $('#shipper-address-save-modal').modal('hide');
        Swal.fire("Saved!","Template is saved successfully!","success");
      } else {
        Swal.fire("Oops!","Failed to save Template!","error");
      }
    }, (err: any) => {
      console.log('error', err);
      Swal.fire("Oops!","Failed to save Template!","error");
    });
  }
  updateFedexCredentials(value: any) {
      let object = {
       id: this.salesRepValues.companyId,
        fedexCredentials: {
        key: value.key,
        password: value.password,
        accountNumber: value.accountNumber,
        meterNumber: value.meterNumber
      },
      companyName: this.salesRepValues.companyName,
      salesRepId: this.salesRepValues.salesRepId
      }
      let credentials = {
        key: value.key,
        password: value.password,
        accountNumber: value.accountNumber,
        meterNumber: value.meterNumber
      }
      this.fedexCredentials = credentials;
      localStorage.setItem('fedexCredentials', JSON.stringify(this.fedexCredentials));
      this.showForEnteringfedexSubsctiption = false;
      // this.customerService.updateFedexSubscription(object, this.salesRepValues.companyId, this.accessToken).subscribe(response=>{
      //   this.responseObject = response;
      //   console.log('this.responseObject', this.responseObject);
      //   if (this.responseObject) {
      //   // swal({
      //   //   title: "Fedex Subscrition!",
      //   //   text: "Fedex Account Subscription is done successfully!",
      //   //   icon: "success",

      //   // });
      //   this.showForEnteringfedexSubsctiption = false;
      // } else {
      //   swal({
      //     title: "Oops!",
      //     text: "Failed to Subscribe!",
      //     icon: "error",
      //     dangerMode: true,
      //   });
      // }
      // }, err=> {
      //   swal({
      //     title: "Oops!",
      //     text: "Failed to Subscribe!",
      //     icon: "error",
      //     dangerMode: true,
      //   });
      // });
  }
  fedexDetails() {
    this.fedexCredentialsForm.patchValue({
      key: '',
      password: '',
      accountNumber: '',
      meterNumber: ''
    });
    let parsedValue: any = localStorage.getItem('fedexCredentials');
     this.fedexCredentials = JSON.parse(parsedValue);
     if (this.fedexCredentials !== undefined) {
       if (Object.keys(this.fedexCredentials).length !== 0 && this.fedexCredentials !== {} as any) {
        this.fedexCredentialsForm.patchValue({
                  key: this.fedexCredentials.key,
                  password: this.fedexCredentials.password,
                  accountNumber: this.fedexCredentials.accountNumber,
                  meterNumber: this.fedexCredentials.meterNumber
                });
       }
     }
    // this.fedexCredentials = 
    // if (this.companyData[0].fedexSubscription === true) {
    //   if (this.companyData[0].fedexCredentials!== null){
    //     if (this.companyData[0].fedexCredentials && Object.keys(this.companyData[0].fedexCredentials).length!== 0) {
    //       this.fedexCredentialsForm.patchValue({
    //         key: this.companyData[0].fedexCredentials.key,
    //         password: this.companyData[0].fedexCredentials.password,
    //         accountNumber: this.companyData[0].fedexCredentials.accountNumber,
    //         meterNumber: this.companyData[0].fedexCredentials.meterNumber
    //       });
    //     }
    //   }
    // }
  }

  close() {

  }
}
