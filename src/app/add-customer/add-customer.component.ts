import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { PricingInfoService } from '../services/pricing-info.service';
import { LoggerService } from '../services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import {CustomerService} from '../services/customer.service';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customerForm : FormGroup = new FormGroup({});;
  customerUpdateForm: FormGroup = new FormGroup({});;
  public customerDetail: any;
  public contactNumber: any;
  public salesRepValues: any;
  public data: any;
  public showCustomerTable = false;
  public HideDetailsForEdit = false;
  public showForEdit = false;
  public showErrorMessageForCustomersList = false;
  public salesRepArray: any;
  public customerResponse: any;
  public salesRepName: any;
  public salesRepId: any;
  numberPerPage:any;
  currentPage:any;
  public showAddCustomer = false;
  public showEmailExistMsg = false;
  public hideDetailsForCustomer = false;
  public customerResponseData: any;
  public zipcodeResponse: any;
  public companyResponse: any;
  public editMode = false;
  public showForExternalCustomer = false;
  public showExistingEmail = false;
  public updateResponse: any;
  public accessToken: any;
  public logger: any;
  public showRequiredFields = false;
  public customerId: any;
  public deleteResponse: any;
  public showInactiveUser = false;
  public accessDeniedMsg = false;
  constructor(private fb: FormBuilder, 
    private customerService: CustomerService, 
    private router: Router, private pricingInfoService: PricingInfoService, 
    private loggerService: LoggerService, private toastr: ToastrService,) {
    this.getSalesRepData();
   }

  ngOnInit() {
    this.buildForm();
    this.localStorageDetails();
    this.viewCustomer();
  }

  buildForm() {
    this.customerForm = this.fb.group({
      salesRepId: [''],
      companyId: [''],
      customerName: [''],
      companyName: [''],
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
      contactNumber: [''],
      ratingNotes: [''],
      type: [''],
      username: [''],
      email: [''],
      password: [''],
      created: ['']
    });
    this.customerUpdateForm = this.fb.group({
      password: ['']
    });
  }

  localStorageDetails() {
    let salesRep:any = localStorage.getItem(('SalesRepName'));
    this.salesRepValues = JSON.parse(salesRep);
    this.accessToken = localStorage.getItem(('accessToken'))
    
  }
  getSalesRepData() {
    this.customerService.getSalesRepDetails(this.accessToken).subscribe(names => {
      this.salesRepArray = names;
      console.log('this.salesRepArray', this.salesRepArray);
    });
  }
  checkForZipcode(zipcode: any) {
    this.pricingInfoService.getCityState(zipcode).subscribe( response => {
      this.zipcodeResponse = response;
      if (this.zipcodeResponse.length > 0) {
        this.customerForm.patchValue({city: this.zipcodeResponse[0].city, state: this.zipcodeResponse[0].state});
      } else {

      }
    });
  }

  viewCustomer() {
    let viewCustomerId = this.customerService.getCustomerFromCompanyId();
    this.customerService.getCustomerDataByCompanyId(viewCustomerId, this.accessToken).subscribe(response => {
      this.customerResponse = response;
      console.log('this.customerResponse', this.customerResponse);
      if (this.customerResponse.length > 0) {
        this.showCustomerTable = true;
        this.customerForm.patchValue({companyName: this.customerResponse[0].companyName});
      } else {
        this.showCustomerTable = false; 
        this.showErrorMessageForCustomersList = true;
      }
    });
  }

  addCustomer(type: any) {
    this.buildForm();
    this.showAddCustomer = true;
    this.showExistingEmail = false;
    this.showCustomerTable = false;
    this.showEmailExistMsg = false;
    this.showRequiredFields = false;
    this.showForExternalCustomer = false;
    this.showErrorMessageForCustomersList = false;
    let viewCustomerId = this.customerService.getCustomerFromCompanyId();
    console.log('this.companyResponse viewCustomerId', viewCustomerId);
    this.customerService.getCompanyById(viewCustomerId, this.accessToken).subscribe(response=>{
      this.companyResponse = response;
      console.log('this.companyResponse', this.companyResponse);
      if (this.companyResponse.length > 0) {
        console.log('this.companyResponse 1');
        this.customerDetail = this.companyResponse[0];
        this.getEditCustomerDetails(type);
      }
    })
    
  }
  editCustomer(customer: any, type: any) {
    console.log('customer', customer);
    this.buildForm();
    this.showAddCustomer = true;
    this.editMode = true;
    this.showCustomerTable = false;
    this.showEmailExistMsg = false;
    this.showRequiredFields = false;
    this.customerDetail = customer;
    if (customer.type === 'externalCustomer') {
      this.HideDetailsForEdit = true;
      this.showForExternalCustomer = true;
      this.showExistingEmail = true;
    } else {
      this.HideDetailsForEdit = true;
      this.showForExternalCustomer = false;
       this.showExistingEmail = false;
    }
    this.getEditCustomerDetails(type);
  }
  
  getEditCustomerDetails(type: any) {
    console.log('this.customerDetail', this.customerDetail);
    if (this.customerDetail !== {} as any && Object.keys(this.customerDetail).length !== 0 && type === 'edit') {
      console.log('this.customerDetail if 1', this.customerDetail);
      this.contactNumber = this.customerDetail.contactNumber;
      let phoneNumber = this.formatPhoneNumber(this.contactNumber);
      let salesId = this.customerDetail.salesRepId;
      let salesRep;
      let salesRepName = this.salesRepArray.filter(function(el: any){
        return el.id === salesId;
      });
      if (salesRepName.length > 0) {
        salesRep = salesRepName[0];
      }
      console.log('salesRepName', salesRep);
      this.customerForm.patchValue({
        salesRepId: this.customerDetail.salesRepId,
        companyId: this.customerDetail.companyId,
        customerName: this.customerDetail.customerName,
        companyName: this.customerDetail.companyName,
        address: this.customerDetail.address,
        city: this.customerDetail.city,
        state: this.customerDetail.state,
        zip: this.customerDetail.zip,
        contactNumber: phoneNumber,
        ratingNotes: this.customerDetail.ratingNotes,
        type: this.customerDetail.type,
        username: this.customerDetail.username,
        email: this.customerDetail.email
      });
    } else {
      console.log('this.customerDetail else 2', this.customerDetail);
      let salesId = this.customerDetail.salesRepId;
      let salesRepName = this.salesRepArray.filter(function(el:any){
        return el.id === salesId;
      });
      console.log('salesRepName else', salesRepName);
      this.customerForm.patchValue({
        salesRepId: this.customerDetail.salesRepId,
        companyId: this.customerDetail.companyId,
        companyName: this.customerDetail.companyName
      });
    } 
  }

  formatPhoneNumber(s: any) {
    let s2 = ('' + s).replace(/\D/g, '');
    let m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ')' + m[2] + '-' + m[3];
  }

  customerType(type: any) {
    this.HideDetailsForEdit = false;
    if (type === 'externalCustomer') {
      this.HideDetailsForEdit = false;
      this.showExistingEmail = false;
      
    } else {
      this.HideDetailsForEdit = true;
      
      this.customerForm.patchValue({email: '', password: '', userName: ''});
    }
  }
  checkContactNumber(value: any) {
    console.log(value);
    if (value !== '' || value !== null) {
    this.contactNumber = value;
    let contactNumberFormat = this.formatPhoneNumber(value);
    console.log(this.contactNumber);
    console.log(contactNumberFormat);
    this.customerForm.patchValue({contactNumber: contactNumberFormat});
    } else {
      this.contactNumber = '';
      console.log(this.contactNumber);
    }
  }

  saveCustomerDetail(formValue: any) {
    this.showRequiredFields = false;
    this.showInactiveUser = false;
    this.accessDeniedMsg = false;
    console.log('formValue', formValue);
    let object: any;
    // if (formValue.type === 'externalCustomer'){
    //   if (formValue.contactNumber === ''&& formValue.username === '' && formValue.email === '' && formValue.password === '') {
    //     this.showRequiredFields = true;
    //   }
    // } else {
    if (formValue.type === 'externalCustomer') {
      if (formValue.contactNumber === ''&& formValue.username === '' && formValue.email === '' && formValue.password === '') {
            this.showRequiredFields = true;
         } else {           
      object = {
      salesRepId: this.customerDetail.salesRepId,
      companyId: this.customerDetail.id,
      customerReferenceId: this.customerDetail.referenceId,
      customerName: formValue.customerName.toUpperCase(),
      companyName: formValue.companyName.toUpperCase(),
      address: this.customerDetail.address,
      city: this.customerDetail.city,
      state: this.customerDetail.state,
      zip: this.customerDetail.zip,
      contactNumber: this.contactNumber,
      ratingNotes: this.customerDetail.ratingNotes,
      type: formValue.type,
      username: formValue.username,
      email: formValue.email,
      password: formValue.password.toString(),
      created: new Date()
    };
  }
  } else if (formValue.type === 'others') {
    object = {
      salesRepId: this.customerDetail.salesRepId,
      companyId: this.customerDetail.id,
      customerName: formValue.customerName.toUpperCase(),
      companyName: formValue.companyName.toUpperCase(),
      address: this.customerDetail.address,
      city: this.customerDetail.city,
      state: this.customerDetail.state,
      zip: this.customerDetail.zip,
      contactNumber: this.contactNumber,
      ratingNotes: this.customerDetail.ratingNotes,
      type: formValue.type,
      username: formValue.username,
      email: formValue.email,
      password: formValue.password.toString(),
      created: new Date()
    }
  } else {

  }
  console.log('object', object);
    this.customerService.setCustomerData(object, 'add', this.accessToken).subscribe((data: any)=>{
      this.customerResponseData = data;
      if (this.customerResponseData.result === 'Email already exists') {
        console.log('object 000', object);
        this.showEmailExistMsg = true;
    } else if (this.customerResponseData.result === 'Email and username already exists') {
      this.showEmailExistMsg = true;
      console.log('object 123', object);
    } else if (this.customerResponseData.result === 'username already exists') {
      this.showEmailExistMsg = true;
      console.log('object 345', object);
    } else if (this.customerResponseData.result === 'Email Id Already Exist') {
      console.log('object 000', object);
      this.showEmailExistMsg = true;
  } else if (this.customerResponseData.result === 'Inactive User') {
    this.showInactiveUser = true;
  }else {
      console.log('object 678', object);
      this.showEmailExistMsg = false;
      this.toastr.success('New customer has been added successfully');
      this.logger = { 'method': 'saveCustomerData',
        'message': 'Adding Customer detail'};
      this.loggerService.info(this.logger);
      this.showAddCustomer = false;
      this.customerForm.patchValue({
        salesRepId: '',
          companyId: '',
          customerName: '',
          companyName: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          contactNumber: '',
          ratingNotes: '',
          type: '',
          username: '',
          email: ''
      })
      this.viewCustomer();

    }
      
    }, (err: any) => {
      this.accessDeniedMsg = true;
    });
  // }
  }
  editSave(formValue: any) {
    console.log('formValue', formValue);
    let updateData;
    this.showInactiveUser = false;
    this.accessDeniedMsg = false;
    if (this.customerDetail.type === 'others' && formValue.type === 'externalCustomer') {
      updateData = {
        'id': this.customerDetail.id,
        'customerName': formValue.customerName.toUpperCase(),
        'companyName': formValue.companyName.toUpperCase(),
        'customerReferenceId': this.customerDetail.referenceId,
        'contactNumber': this.contactNumber,
        'ratingNotes': this.customerDetail.ratingNotes,
        'email': formValue.email,
        'password': formValue.password.toString(),
        'username': formValue.userName,
        'address': this.customerDetail.address,
        'createdOn': this.customerDetail.createdOn,
        'city': this.customerDetail.city,
        'state': this.customerDetail.state,
        'zip': this.customerDetail.zip,
        'salesRepId': this.customerDetail.salesRepId,
        'type': formValue.type
      };
      console.log('finalData Object 3', updateData);
    } else {
      updateData = {
        'id': this.customerDetail.id,
        'customerName': formValue.customerName.toUpperCase(),
        'companyName': formValue.companyName.toUpperCase(),
        'contactNumber': this.contactNumber,
        'customerReferenceId': this.customerDetail.referenceId,
        'ratingNotes': this.customerDetail.ratingNotes,
        'email': formValue.email,
        'password': '',
        'username': formValue.username,
        'address': this.customerDetail.address,
        'createdOn': this.customerDetail.createdOn,
        'city': this.customerDetail.city,
        'state': this.customerDetail.state,
        'zip': this.customerDetail.zip,
        'salesRepId': this.customerDetail.salesRepId,
        'type': formValue.type
      };
      console.log('finalData Object 4', updateData);
    }
    this.customerService.setCustomerData(updateData, 'edit', this.accessToken).subscribe((data: any)=>{
      this.customerResponseData = data;
      if (this.customerResponseData.result === 'Email already exists') {
        this.showEmailExistMsg = true;
    } else if (this.customerResponseData.result === 'Email and username already exists') {
      this.showEmailExistMsg = true;
    } else if (this.customerResponseData.result === 'username already exists') {
      this.showEmailExistMsg = true;
    } else if (this.customerResponseData.result === 'Email Id Already Exist') {
        this.showEmailExistMsg = true;
        this.showAddCustomer = true;
      } else if (this.customerResponseData.result === 'Inactive User') {
        this.showInactiveUser = true;
      } else if (this.customerResponseData.result === true) {
        this.toastr.success('Customer has been updated successfully');
        this.showAddCustomer = false;
        this.editMode = false;
        this.viewCustomer();
      }
      
    }, (err:any) => {
      this.accessDeniedMsg = true;
    });
  }
  returnToCompany() {
    this.router.navigate(['/companySummary']);
  }
  cancel() {
    this.showAddCustomer = false;
    this.showForExternalCustomer = false;
    this.editMode = false;
    this.customerForm.patchValue({
      salesRepId: '',
        companyId: '',
        customerName: '',
        companyName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        contactNumber: '',
        ratingNotes: '',
        type: '',
        username: '',
        email: ''
    });
    this.viewCustomer();
  }
  updatePassword(form: any) {
    this.accessDeniedMsg = false;
    let object;
    if (form.password !== '') {
    object = {
      id : this.customerDetail.id,
      password: form.password.toString()
    };
      console.log('object', object);
      this.customerService.updateCustomerPassword(object, this.accessToken).subscribe((response: any) => {
        console.log('response', response);
        this.updateResponse = response;
        if (this.updateResponse.result === true) {
          this.toastr.success('Password has been updated successfully');
          this.showAddCustomer = false;
          this.viewCustomer();
        }
      }, (err: any) => {
        this.accessDeniedMsg = true;
      });

    } else {
      this.showAddCustomer = true;
    }
    }

    delete(id: any) {
       this.customerId = id;
    }

    deleteCustomerData() {
       this.customerService.deleteCustomer(this.customerId, this.accessToken).subscribe((data: any)=>{
         console.log('data', data);
         this.deleteResponse = data;
         if (this.deleteResponse.result === true) {
          this.toastr.success('Customer has been deleted successfully');
          this.viewCustomer();
         }
       }, (err: any) => {
          this.toastr.error('Failed to delete Customer');
       });
    }
}
