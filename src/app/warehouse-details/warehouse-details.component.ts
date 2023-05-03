import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { PricingInfoService } from '../services/pricing-info.service';

@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrls: ['./warehouse-details.component.css']
})
export class WarehouseDetailsComponent implements OnInit {
  salesRep: any;
  salesRepValues: any;
  salesRepId: any;
  salesRepType: any;
  companyId: any;
  sideMenu = false;
  companyResponse: any;
  accessToken: any;
  showContact = false;

  constructor(private pricingInfoService: PricingInfoService,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.localStorageValues();
  }
  localStorageValues() {
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.salesRepValues = JSON.parse(this.salesRep);
    this.salesRepId = this.salesRepValues.id;
    this.salesRepType = this.salesRepValues.type;
    this.companyId = localStorage.getItem('customerId');
    this.accessToken = localStorage.getItem('accessToken');
    if (this.salesRepType === 'administrator' || this.salesRepType === 'customerServiceRep') {
      this.sideMenu = false;
      // this.getAllCompanyDetails();
      // if (this.companyId !== '' && this.companyId !== undefined && this.companyId !== null) {
      //   this.getCustomerInformation(this.companyId, 'chooseCompany');
      // } else {
      //   this.getCustomerData();
      // }
    } else {
      this.sideMenu = true;
    
      // if (this.companyId !== '' && this.companyId !== undefined && this.companyId !== null) {
        this.getCustomerInformation(this.companyId, 'chooseCompany');
      // } else {
      //   this.getCustomerData();
      // }
      // this.getCompanyDetailsOfSalesRep();
    }
  }

  getCustomerInformation(companyId: any, type: any) {
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
  // accessToken(accessToken: any, companyId: any) {
  //   throw new Error("Method not implemented.");
  // }
}
