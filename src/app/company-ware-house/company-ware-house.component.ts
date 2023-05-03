import { Component, OnInit } from '@angular/core';
import { PricingInfoService } from '../services/pricing-info.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { LoggerService } from '../services/logger.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-company-ware-house',
  templateUrl: './company-ware-house.component.html',
  styleUrls: ['./company-ware-house.component.css']
})
export class CompanyWareHouseComponent implements OnInit {
  public accessToken:any;
  public currentPage:any;
  public customerId:any;
  customerForm: FormGroup = new FormGroup({});
  companySummaryForm: FormGroup = new FormGroup({});
  public salesRep:any;
  public salesRepValues:any;
  public salesRepId:any;
  salesRepArray: any;
  public showAllCustomersData = false;
  public salesRepType:any;
  public customerResponse: any;
  public companyFeatures: any;
  public companyResponse: any;
  public showRefreshFlag = false;
  public showDeleteCustomerPopup = false;
  public companyId:any;
  logger:any = { 'method': '', 'message': '', 'salesRepId': '' };
  showContact = false;

  constructor(private fb: FormBuilder,
     private pricingInfoService: PricingInfoService,
     private loggerService: LoggerService,
     private customerService: CustomerService) { }

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
  localStorageValues() {
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.salesRepValues = JSON.parse(this.salesRep);
    this.salesRepId = this.salesRepValues.id;
    this.salesRepType = this.salesRepValues.type;
    this.companyId = this.pricingInfoService.getCustomerId();
    if (this.salesRepType === 'administrator' || this.salesRepType === 'customerServiceRep') {
      this.getAllCompanyDetails();
      // if (this.companyId !== '' && this.companyId !== undefined && this.companyId !== null) {
      //   this.getCustomerInformation(this.companyId, 'chooseCompany');
      // } else {
      //   this.getCustomerData();
      // }
    } else {
      // if (this.companyId !== '' && this.companyId !== undefined && this.companyId !== null) {
      //   this.getCustomerInformation(this.companyId, 'chooseCompany');
      // } else {
      //   this.getCustomerData();
      // }
      this.getCompanyDetailsOfSalesRep();
    }
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
  getCustomerInformation(id:any, type:any) {
    let companyId = id.target.value
    if (companyId === '') {
      // this.getCustomerData();
    } else {
      this.customerService.getAllCompanyDataById(this.accessToken, companyId).subscribe(data => {
        this.companyResponse = data;
        console.log('this.companyResponse', this.companyResponse);
        if (this.companyResponse[0].wms === false) {
          this.showContact = true;
        }
      });
    }
  }

}
