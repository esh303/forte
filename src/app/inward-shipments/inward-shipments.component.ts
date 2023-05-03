import { Component, OnInit } from '@angular/core';
import { PricingInfoService } from '../services/pricing-info.service';

@Component({
  selector: 'app-inward-shipments',
  templateUrl: './inward-shipments.component.html',
  styleUrls: ['./inward-shipments.component.css']
})
export class InwardShipmentsComponent implements OnInit {
  showSearchDetail = true;
  // accessToken: string;
  public accessToken;
  public showLoader = false;
  public salesRep:any;
  public salesRepValues:any;
  public customerId:any;
  public salesRepType:any;
  public customerType:any;
  public salesRepId:any;
  companyId: any;
  public entryLoader = true;
  public showSideMenu = false;
  tableValues:any;
  loader = false;

  constructor(private priceService: PricingInfoService) { 
    this.accessToken = localStorage.getItem('accessToken');
  }

  ngOnInit() {
    this.showSearchDetail = true;
this.localStorageSalesData();
  }
  localStorageSalesData() {
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.accessToken = localStorage.getItem(('accessToken'));
    this.salesRepValues = JSON.parse(this.salesRep);
    this.salesRepType = this.salesRepValues.type;
    this.customerType = localStorage.getItem(('customerType'));
    if (this.customerType === 'admin') {
      this.getInwards();
      this.salesRepId = '';
      this.customerId = '';
      this.showSideMenu = false;
      this.companyId = 0;
    } else {
      this.salesRepId = this.salesRepValues.salesRepId;
      this.customerId = this.salesRepValues.id;
      this.companyId = this.salesRepValues.companyId;
      this.getMyBillForExternalCustomerInwards();
      this.showSideMenu = true;
    }
  }

  getInwards() {
    this.priceService.getInwardDetails().subscribe((res:any) => {
      console.log(res);
      this.tableValues = res;
      for(let i = 0;i < this.tableValues.length;i++) {
        if(this.tableValues[i].bolPdfDoc !== null) {
          this.tableValues[i].showBOLIcon = true;

        }
        if(this.tableValues[i].deliveryPdf !== null) {
          this.tableValues[i].showDeliveryIcon = true;

        }
        this.tableValues[i].consigneeName = this.tableValues[i].companyDetails.companyName;
      }
    })
  }


  getMyBillForExternalCustomerInwards(){
    this.priceService.getInwardDetailsCustomer(this.companyId, this.accessToken).subscribe((res:any) => {
      console.log(res);
      this.tableValues = res;
      for(let i = 0;i < this.tableValues.length;i++) {
        if(this.tableValues[i].bolPdfDoc !== null) {
          this.tableValues[i].showBOLIcon = true;

        }
        if(this.tableValues[i].deliveryPdf !== null) {
          this.tableValues[i].showDeliveryIcon = true;

        }
        this.tableValues[i].consigneeName = this.tableValues[i].companyDetails.companyName;

      }

    })
  }

  getBolYrc(data:any,type:any) {
    // this.loader = true;
    if (type === 'BOL')  {
      let url = 'http://54.176.155.237:3000/api/container/bolDocuments/download/' + data.bolPdfDoc;
      console.log(url);
      var link = document.createElement('a');
      document.body.appendChild(link); //required in FF, optional for Chrome
      link.href = url;
      link.target = '_blank';
     //  window.open(data,"_blank");      
      link.click();
     //  window.URL.revokeObjectURL(data);
      link.remove();
    } else if (type === 'Delivery')  {
      let url = 'http://54.176.155.237:3000/api/container/bolDocuments/download/' + data.deliveryPdf;
      console.log(url);
      var link = document.createElement('a');
      document.body.appendChild(link); //required in FF, optional for Chrome
      link.href = url;
      link.target = '_blank';
     //  window.open(data,"_blank");      
      link.click();
     //  window.URL.revokeObjectURL(data);
      link.remove();
    }

  }

}
