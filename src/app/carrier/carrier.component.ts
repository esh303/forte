import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.css']
})
export class CarrierComponent implements OnInit {
  salesRep: any;
  salesRepValues: any;
  salesRepId:any;
  constructor() { }

  ngOnInit() {
    this.getSalesRepInfo();
  }

  getSalesRepInfo() {
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.salesRepValues = JSON.parse(this.salesRep);
    this.salesRepId = this.salesRepValues.id;
  }
}
