import { Component, OnInit } from '@angular/core';
import { PricingInfoService } from '../services/pricing-info.service';
import { ExternalService } from '../services/external.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  accessToken: any;
  customerType: any;
  salesRep: any;
  salesRepValues: any;
  salesRepId: any;
  salesRepType: any;
  showForExternalCustomer = false;
  showForAdmin = false;
  constructor(
    private pricingInfoService: PricingInfoService,
    private router: Router, 
    private externalService: ExternalService) { }

  ngOnInit() {
    this.getSalesRepDetails();
  }

  logout() {
    this.accessToken = localStorage.getItem('accessToken');
    this.pricingInfoService.callsLogout(this.accessToken);
    localStorage.removeItem('SalesRepName');
    localStorage.removeItem('accesstoken');
    this.router.navigate(['/internalsalesreplogin']);
  }

  getSalesRepDetails() {
    this.customerType = localStorage.getItem(('customerType'));
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.salesRepValues = JSON.parse(this.salesRep);
    this.salesRepId = this.salesRepValues.id;
    this.salesRepType = this.salesRepValues.type;
    if (this.customerType === 'admin') {
      this.showForExternalCustomer = false;
      this.showForAdmin = true;
      this.salesRepValues.salesRepName = this.salesRepValues.salesRepName;
    } else {
      this.showForExternalCustomer = true;
      this.showForAdmin = false;
      this.salesRepValues.salesRepName = this.salesRepValues.customerName;
    }
  }
  routing(type: any) {
    if (type === 'class') {
      this.externalService.setTools('class');
      this.router.navigate(['/calculator', 'class']);
    } else if (type === 'density') {
      this.externalService.setTools('density');
      this.router.navigate(['/calculator', 'density']);
    } else if (type === 'ftl') {
      this.externalService.setTools('ftl');
      this.router.navigate(['/active_request', 'ftltrack']);
    } else if (type === 'activeRequest') {
      this.externalService.setTools('ftl');
      this.router.navigate(['/active_request', 'ftl']);
    }
  }

  getBolScreen() {
    let billOfLadingValues = {};
    this.pricingInfoService.setBillOfLadingValues(billOfLadingValues);
    let createBol = {};
    this.pricingInfoService.setBolQuoteId(createBol);
    this.router.navigate(['/BOLNEW']);
  }

}
