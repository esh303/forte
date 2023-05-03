import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ExternalService} from '../services/external.service';
import {PricingInfoService} from '../services/pricing-info.service';
import  Swal  from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
   myAccount: FormGroup = new FormGroup({});
   public customerType: any;
   public salesRep: any;
   public accessToken;
   public salesRepValues: any;
   public salesRepType: any;
   public loginCustomerId: any;
   public salesRepId: any;
   public customerId:any;
   public saveResponse: any;
   public originCity: any;
   public originState:any;
   public ismeridian = false;
   public getZipCode: any;
   public phoneNumber:any;
   public pickUpInfo: any;
   public saveDetails: any;
   public upDateFlag:any;
   public phoneNumberFlag = false;
   public shipperErrorMessage = false;
   public setDefaultFlag = false;

  constructor(private fb: FormBuilder,private externalService: ExternalService, private pricingInfoService: PricingInfoService) {
    this.accessToken = localStorage.getItem(('accessToken'));
   }
  ngOnInit() {
    this.buildForm();
    this.localStorageSalesData();
    window.scroll(0,0);
  }

  buildForm() {
    this.myAccount = this.fb.group({
      customerName: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      extension: ['', [Validators.required]],
      country: ['USA'],
      address1: ['', [Validators.required]],
      address2: [''],
      zip:['', [Validators.required,Validators.minLength(5), Validators.maxLength(5)]],
      city:['', [Validators.required]],
      state:['', [Validators.required]],
      pickUpTime:['', [Validators.required]],
      closeTime:['', [Validators.required]]
    })
    console.log('myAccount',this.myAccount);
}
localStorageSalesData() {
  this.customerType = localStorage.getItem(('customerType'));
  this.salesRep = localStorage.getItem(('SalesRepName'));
  this.accessToken = localStorage.getItem(('accessToken'));
  this.salesRepValues = JSON.parse(this.salesRep);
  this.pickUpInfo =  this.salesRepValues.pickupInformation;
  console.log("pickUp",this.pickUpInfo);
  console.log('salesRep,this.salesRepValues');
  this.salesRepType = this.salesRepValues.type;
  if (this.customerType === 'admin') {
    this.loginCustomerId = 0;
    this.salesRepId = this.salesRepValues.id;
    this.customerId = this.salesRepValues.id;
  } else {
    this.loginCustomerId = this.salesRepValues.id;
    this.salesRepId = this.salesRepValues.salesRepId;
    this.customerId = this.salesRepValues.id;
  }
  this.externalService.getSalesRepName(this.accessToken,this.salesRepId).subscribe((data: any)=>{
    this.saveDetails = data[0];
    this.salesRepValues.salesRepName = this.saveDetails.salesRepName;
    console.log('detail',this.saveDetails);
  })
  if(this.pickUpInfo !== null){
    this.myAccount.patchValue({
      customerName:this.pickUpInfo.customerName,
      companyName:this.pickUpInfo.companyName,
      contactNumber:this.pickUpInfo.contactNumber,
      extension:this.pickUpInfo.extension,
      country:this.pickUpInfo.country,
      address1:this.pickUpInfo.address1,
      address2:this.pickUpInfo.address2,
      zip:this.pickUpInfo.zip,
      city:this.pickUpInfo.city,
      state:this.pickUpInfo.state,
      pickUpTime:this.pickUpInfo.pickUpTime,
      closeTime:this.pickUpInfo.closeTime
   })
  this.upDateFlag = true;
  }else{
    this.upDateFlag = false;
  }
}
  saveData(myAccount:any){
    console.log('myAccount', myAccount);
    if (myAccount.contactNumber === null || myAccount.contactNumber === '' || myAccount.contactNumber === undefined) {
      this.phoneNumberFlag = true;
    } else {
      console.log('myAccount Else', myAccount);
      this.phoneNumberFlag = false;
      console.log('If', myAccount);
      let object;
      object = {
        'id': this.customerId,
        'pickupInformation': {
          'customerName': myAccount.customerName,
          'companyName': myAccount.companyName,
          'contactNumber' : this.phoneNumber,
          'extension': myAccount.extension,
          'country': myAccount.country,
          'address1': myAccount.address1,
          'address2': myAccount.address2,
          'zip': myAccount.zip,
          'city': myAccount.city,
          'state': myAccount.state,
          'pickUpTime': myAccount.pickUpTime,
          'closeTime': myAccount.closeTime
        }
      };
      this.externalService.getMyAccount(this.accessToken,object).subscribe((data: any) => {
        this.saveResponse = data;

        if(this.saveResponse.result === true){
          Swal.fire({
            title: "Updated!",
            text: "PickUp Information Updated Succesfully!",
            icon: "success",
          });
          this.upDateFlag = true;
          this.setDefaultFlag = false;
        }else{
          Swal.fire({
            title: "Oops!",
            text: "PickUp Information Failled!!",
            icon: "error"
          });
        }

      });
    }
  }
  
  setDefault() {
    let object;
    object = {
      'id': this.customerId,
      'pickupInformation': null
    };
    this.externalService.getMyAccount(this.accessToken,object).subscribe((data:any) => {
      this.saveResponse = data;
      
      if(this.saveResponse.result === true){
        Swal.fire({
          title: "Updated!",
          text: "PickUp Information Updated Succesfully!",
          icon: "success",
        });
        this.salesRepValues.pickupInformation = null;
        console.log('this.pickUpInfo.pickupInformation', this.salesRepValues.pickupInformation);
        localStorage.setItem('SalesRepName', JSON.stringify(this.salesRepValues));
      }else{
        Swal.fire({
          title: "Oops!",
          text: "PickUp Information Failled!!",
          icon: "error"
                });
      }
    })

  }
shipperZipCode(zipcode: any) {
  console.log('zipcode', zipcode);
  this.originCity = '';
  this.originState = '';
  this.pricingInfoService.getCityState(zipcode).subscribe(getArrayValues => {
    this.getZipCode = getArrayValues;
    if (this.getZipCode.length > 0) {
      for (let i = 0; i < this.getZipCode.length; i++) {
        this.originCity = this.getZipCode[i].city;
        this.originState = this.getZipCode[i].state;
        this.myAccount.patchValue({city: this.originCity, state: this.originState});
        this.shipperErrorMessage = false;
      }
    } else {
      this.shipperErrorMessage = true;
    }
  });
}

formatPhoneNumber(s: any) {
  let s2 = ('' + s).replace(/\D/g, '');
  let m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!m) ? null : '(' + m[1] + ')' + m[2] + '-' + m[3];
}
checkContactNumber(value: any) {
  console.log(value);
  if (value !== '' || value !== null) {
    this.phoneNumber = value;
  let contactNumberFormat = this.formatPhoneNumber(value);
  console.log(contactNumberFormat);
  this.myAccount.patchValue({contactNumber: contactNumberFormat});
  } else {
    this.phoneNumber = '';
    console.log(this.phoneNumber);
  }
}
clearData(type: any){
  if (type === 'clear') {
    this.myAccount.reset();
  } else {
    this.myAccount.reset();
    this.setDefaultFlag = true;
  }
  

  }
}
