import { Component, OnInit } from '@angular/core';
import { ExternalService } from '../services/external.service';
import { PricingInfoService } from '../services/pricing-info.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { CustomerService } from '../services/customer.service';
declare var $: any;
// declare var html2canvas: any;
declare var pdfMake: any;
// declare var jsPDF: any;

@Component({
  selector: 'app-mybilloflading',
  templateUrl: './mybilloflading.component.html',
  styleUrls: ['./mybilloflading.component.css']
})
export class MybillofladingComponent implements OnInit {
  billPaidNamePricingname: any;
  billPaidNamePricing: any = false;
  // [x: string]: any;
  // [x: string]: any;
  showModal = true;
  img:any
  myBillOfLading: FormGroup = new FormGroup({});
  byOrderForm: FormGroup = new FormGroup({});
  loading = false;
  public myBolData: any;
  public searchResponse: any;
  public showSearchDetail = false;
  public showErrorMessage = false;
  public searchErrorMessage = false;
  public accessToken;
  public showLoader = false;
  public salesRep: any;
  public salesRepValues: any;
  public customerId: any;
  public salesRepType: any;
  public customerType: any;
  public salesRepId: any;
  public numberPerPage: any;
  public numberOfPages = [5, 10, 15];
  public p = 1;
  public selectPagination: any;
  public totalItems: any = 0;
  public searchLoader = false;
  public recordsNotFoundMsg = false;
  public bolValue: any;
  public externalCustomerValue: any;
  public myBillValue: any;
  public entryLoader = true;
  public showSideMenu = false;
  public totalPieces: any;
  public totalWeights: any;
  public showForAdmin = false;
  public piecesCount: any = [];
  public palletCount: any = [];
  public othersCount: any = [];
  public myBolTotalPieces: any;
  public myBolTotalPallets: any;
  public myBolTotalOthers: any;
  public companyId: any;
  public createBillOfLading: any;
  public showProNumber = false;
  public showTrackingNumber = false;
  public showReddawayNumber = false;
  public showOthersTrackingNumber = false;
  public emailResponse: any;
  public printData: any;
  printCarrier: any;
  countForPrint = 0;
  showTracking: any = false;
  printContent:any = '';
  bolPrint: any;
  printContent1: any = '';
  tableCount:any = 0;
  iterateData: any;
  printcontentLength: any;
  table: any = [];
  bolRequestLineItems: any;
  removeClassification: any;
  showBol: any = false;
  classification: any;
  pdfInBase64:any ='';
  showuploadIcon = true;
  showFileIsUploaded = false;
  showuploadIconDelivery = true;
  showFileIsUploadedDelivery = false;
  showuploadIconWeight = true;
  showFileIsUploadedWeight = false;
  pdfValue: any;
  onlineBOlName: any;
  onlineBolFile: any;
  deliveryFile: any;
  deliveryFileName: any;
  weightFile: any;
  weightFileName: any;
  Names: any = [];
  errorOnUploadMsg = false;
  errorOnUploadMsgDelivery = false;
  errorOnUploadMsgWeight = false;
  errorOnUploadMsgInvoice = false;
  showOnlineBol = false;
  showDelivery = false;
  showWeight = false;
  showInvoice = false;
  editTableValue: any;
  showuploadfileIcon:any = false;
  showuploadfileIconDelivery: any = false;
  showuploadfileIconWeight: any =false;
  dataSelected: any;
  showuploadIconInvoice: any = false;
  invoiceFile: any;
  showuploadfileIconInvoice: any = false;
  invoiceFileName: any;
  showFileIsUploadedInvoice: any = false;
  companyDetails: any;
  companySpecificName: any;
  companyData: any;

  constructor(private externalService: ExternalService,
    private fb: FormBuilder, private router: Router,
    private pricingInfoService: PricingInfoService, private customerService: CustomerService) {
    this.accessToken = localStorage.getItem('accessToken');
    this.localStorageSalesData();
    // this.dataSelected.uploadBol = 'true';
    // this.dataSelected.uploadDelivery = 'true';
    // this.dataSelected.uploadWeight = 'true';
    // this.dataSelected.uploadInvoice = 'true';
  }

  selectRanges(selectPagination: any) {
    this.numberPerPage = Number(selectPagination);
  }

  ngOnInit() {
    this.buildForm();
    this.buildByOrderForm();
    window.scroll(0, 0);
    this.localStorageSalesData();
    this.getAllCompanyNotes();


  }
  getAllCompanyNotes() {
    this.customerService.getCompanyDetails(this.accessToken).subscribe(getCustomerData => {
        this.companyDetails = getCustomerData;
    });
}

  buildForm() {
    this.myBillOfLading = this.fb.group({
      bolReferenceNumber: ['', Validators.required],
      shipper: ['', Validators.required],
      consignee: ['', Validators.required],
      shipperZip: ['', Validators.required],
      consigneeZip: ['', Validators.required],
      bolCarrier: [''],
      proNumber: ['']
    });
  }
  

  buildByOrderForm() {
    this.byOrderForm = this.fb.group({
      bolUpload: ['false'],
      deliveryUpload: ['false'],
      invoiceUpload:['false'],
      weightUpload:['false']
    })
  }
  localStorageSalesData() {
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.accessToken = localStorage.getItem(('accessToken'));
    this.salesRepValues = JSON.parse(this.salesRep);
    this.salesRepType = this.salesRepValues.type;
    this.customerType = localStorage.getItem(('customerType'));
    if (this.customerType === 'admin') {
      this.getMyBillOfLadings();
      this.salesRepId = '';
      this.customerId = '';
      this.showSideMenu = false;
      this.companyId = 0;
    } else {
      this.salesRepId = this.salesRepValues.salesRepId;
      this.customerId = this.salesRepValues.id;
      this.companyId = this.salesRepValues.companyId;
      this.getMyBillForExternalCustomer();
      this.showSideMenu = true;
    }
  }
 
  getMyBillOfLadings() {
    this.externalService.getMyBillnew().subscribe((data: any) => {
      console.log('data', data);
      this.myBolData = data.result;
      this.entryLoader = false;
      this.totalItems = this.myBolData.length;
      
      if (this.totalItems > 10) {
        this.numberPerPage = 10;
      } else {
        this.numberPerPage = this.totalItems;
      }
      if (this.myBolData.length > 0) {
        this.showSearchDetail = true;
        for (let i = 0; i < this.myBolData.length; i++) {
          this.myBolData[i].tempId = i;
          console.log(i,this.myBolData[i].tempId);
          // if(this.myBolData[i].companyId === 0) {
          //   this.myBolDa
          // }
          if (this.myBolData[i].bolPdfDoc !== null) {
            this.myBolData[i].showOnlineBol = true;

          }else {
            this.myBolData[i].showOnlineBol = false;

          }
          if (this.myBolData[i].deliveryPdf !== null) {
            this.myBolData[i].showDelivery = true;

          }else {
            this.myBolData[i].showDelivery = false;

          }
          if (this.myBolData[i].weightPdf !== null) {
            this.myBolData[i].showWeight = true;

          }else {
            this.myBolData[i].showWeight = false;

          }
          if (this.myBolData[i].invoicePdf !== null) {
            this.myBolData[i].showInvoice = true;

          }else {
            this.myBolData[i].showInvoice = false;

          }
          if (this.myBolData[i].uploadBol !== null) {
          
            this.myBolData[i].bolUpload  = this.myBolData[i].uploadBol;
            
          } else {
             if (this.myBolData[i].companyId !== 0) {
            if(this.myBolData[i].companyDetails.bolUpload !== null) {
              this.myBolData[i].bolUpload  =  this.myBolData[i].companyDetails.bolUpload;
            } else {
              this.myBolData[i].bolUpload  =  true;
            }
          } else {
            this.myBolData[i].bolUpload  =  false;

          }
          }
    
    
          if (this.myBolData[i].uploadDelivery !== null) {
            this.myBolData[i].deliveryUpload  = this.myBolData[i].uploadDelivery;
          } else {
            if (this.myBolData[i].companyId !== 0) {
            if(this.myBolData[i].companyDetails.deliveryUpload !== null) {
              this.myBolData[i].deliveryUpload  = this.myBolData[i].companyDetails.deliveryUpload;
            } else {
              this.myBolData[i].deliveryUpload  =  true;
            }
          } else {
            this.myBolData[i].deliveryUpload  =  false;

          }
          }
          if (this.myBolData[i].uploadWeight !== null) {
            this.myBolData[i].weightUpload = this.myBolData[i].uploadWeight;
          } else {
            if (this.myBolData[i].companyId !== 0) {

            if(this.myBolData[i].companyDetails.weightUpload !== null) {
              this.myBolData[i].weightUpload = this.myBolData[i].companyDetails.weightUpload;
            } else {
              this.myBolData[i].weightUpload  =  true;
            }
          } else {
            this.myBolData[i].weightUpload  =  false;

          }

          }
    
    
          if (this.myBolData[i].uploadInvoice !== null) {
            this.myBolData[i].invoiceUpload = this.myBolData[i].uploadInvoice;
          } else {
            if (this.myBolData[i].companyId !== 0) {

            if(this.myBolData[i].companyDetails.invoiceUpload !== null) {
              this.myBolData[i].invoiceUpload = this.myBolData[i].companyDetails.invoiceUpload;
            } else {
              this.myBolData[i].invoiceUpload  =  true;
            }
          } else {
            this.myBolData[i].invoiceUpload  =  false;

          }

          }
    
          // if (this.myBolData[i].bolDoc !== null) {
          //   if (this.myBolData[i].bolDoc.length > 0) {
          //     this.myBolData[i].bolDoc.forEach((el) => {
          //       let splittedValue = el.split('-');
          //       console.log(splittedValue);
          //       if (splittedValue[0] === 'BOL') {
          //         console.log('BOL', this.myBolData[i].bolDoc)
          //         this.myBolData[i].showOnlineBol = true;
          //       } 
          //       if (splittedValue[0] === 'Delivery') {
          //         this.myBolData[i].showDelivery = true;
          //         console.log('BOL1', this.myBolData[i].bolDoc)

          //       }
          //       if (splittedValue[0] === 'Weight') {
          //         this.myBolData[i].showWeight = true;
          //         console.log('BOL2', this.myBolData[i].bolDoc)

          //       }
          //       console.log('data',   this.myBolData[i].showOnlineBol,   this.myBolData[i].showDelivery,  this.myBolData[i].showWeight)
          //     })
          //   } }else {
          //     this.myBolData[i].showOnlineBol = false;
          //     this.myBolData[i].showDelivery = false;
          //     this.myBolData[i].showWeight = false;
          //   }
          let bolRequest = this.myBolData[i].bolRequest;
          let requestParse = JSON.parse(bolRequest);
         
          this.myBolData[i].singletotalPieces = 0;
          this.myBolData[i].totalWeights = 0;
          // let requestParse = JSON.parse(bolRequest);
          this.bolRequestLineItems = requestParse.lineItems;
          console.log(this.bolRequestLineItems);
          if (this.myBolData[i].customerId === 0) {
            this.myBolData[i].createdBy = '';
          } else {
            this.myBolData[i].createdBy = this.myBolData[i].externalCustomersDetail.customerName;

            // this.myBolData[i].createdBy = this.myBolData[i].externalCustomersDetail.customerName;
          }

          for (let j = 0; j < this.bolRequestLineItems.length; j++) {
            // this.myBolData[i].Weight = 0;
            if (this.bolRequestLineItems[j].Pieces !==undefined) {
            this.myBolData[i].singletotalPieces += this.bolRequestLineItems[j].Pieces;
            } else {
              this.myBolData[i].singletotalPieces = 0
            }
            console.log(this.myBolData[i].Weight);

            if (this.bolRequestLineItems[j].Weight !==undefined) {
            this.myBolData[i].totalWeights += this.bolRequestLineItems[j].Weight.Value;
            } else {
              this.myBolData[i].totalWeights = 0
            }
            console.log(this.myBolData[i]);
          }
          this.myBolData[i].handlingUnitsWeights = this.myBolData[i]['singletotalPieces'] + ' Pcs /' + this.myBolData[i]['totalWeights'];
          console.log(this.myBolData[i].handlingUnitsWeights);
          this.myBolData[i].companyName = requestParse.shipper.companyName;
          if (this.myBolData[i].bolCarrier === 'FEDEX_FREIGHT_ECONOMY') {
            this.myBolData[i].carrierName = 'FXFE';
          } else if (this.myBolData[i].bolCarrier === 'FEDEX_FREIGHT_PRIORITY') {
            this.myBolData[i].carrierName = 'FXFP';
          } else {
            this.myBolData[i].carrierName = this.myBolData[i].bolCarrier;
          }
          if (requestParse.shipper !== undefined) {
            if (requestParse.shipper.contactName !== undefined && requestParse.shipper.contactName !== null) {
              this.myBolData[i].shipperContactName = requestParse.shipper.contactName;
            }
          }
          if (requestParse.consignee !== undefined) {
            if (requestParse.consignee.contactName !== undefined && requestParse.consignee.contactName !== null) {
              this.myBolData[i].consigneeContactName = requestParse.consignee.contactName;
            }
            if (requestParse.consignee.companyName !== undefined && requestParse.consignee.companyName !== null) {
              this.myBolData[i].consigneeCompanyName = requestParse.consignee.companyName;
            }
          }
          this.myBolData[i].requestedShipments = requestParse.RequestedShipment;
          this.myBolData[i].shipment = requestParse.shipment;
          let date = this.myBolData[i].createdOn;
          let parseDate = date.split('T')
          this.myBolData[i].createdOn = parseDate[0];

        }
      } else {
        this.showSearchDetail = false;
        this.recordsNotFoundMsg = true;
      }
    }, (error: any) => {
      this.entryLoader = false,
        this.recordsNotFoundMsg = true,
        this.showSearchDetail = false
    });
  }

  getMyBillForExternalCustomer() {
    console.log()
    this.externalService.getExternalBillNew(this.companyId, this.accessToken).subscribe((data: any) => {
      console.log(data,)
      this.myBolData = data.result;
      this.entryLoader = false;
      this.totalItems = this.myBolData.length;
      if (this.totalItems > 10) {
        this.numberPerPage = 10;
      } else {
        this.numberPerPage = this.totalItems;
      }
      if (this.myBolData.length > 0) {
        this.showSearchDetail = true;
        for (let i = 0; i < this.myBolData.length; i++) {
          let bolRequest = this.myBolData[i].bolRequest;
          this.myBolData[i].singletotalPieces = 0;
          this.myBolData[i].totalWeights = 0;
          let requestParse = JSON.parse(bolRequest);
          this.bolRequestLineItems = requestParse.lineItems;
          this.myBolData[i].lineItems = requestParse.lineItems;
          this.myBolData[i].lineItemsFormat = requestParse.lineItemsFormat;
          if(this.myBolData[i].customerId === 0) {
            this.myBolData[i].createdBy = '';
          } else {
            this.myBolData[i].createdBy = this.myBolData[i].externalCustomersDetail.customerName;
          }
          console.log(requestParse);
          // for (let j = 0; j < this.bolRequestLineItems.length; j++) {
          //   this.myBolData[i].singletotalPieces += this.bolRequestLineItems[j].Pieces;
          //   this.myBolData[i].totalWeights += this.bolRequestLineItems[j].Weight.Value;
          // }
          for (let j = 0; j < this.bolRequestLineItems.length; j++) {
            // this.myBolData[i].Weight = 0;
            if (this.bolRequestLineItems[j].Pieces !==undefined) {
            this.myBolData[i].singletotalPieces += this.bolRequestLineItems[j].Pieces;
            } else {
              this.myBolData[i].singletotalPieces = 0
            }
            console.log(this.myBolData[i].Weight);

            if (this.bolRequestLineItems[j].Weight !==undefined) {
            this.myBolData[i].totalWeights += this.bolRequestLineItems[j].Weight.Value;
            } else {
              this.myBolData[i].totalWeights = 0
            }
            console.log(this.myBolData[i]);
          }
          this.myBolData[i].handlingUnitsWeights = this.myBolData[i]['singletotalPieces'] + ' Pcs /' + this.myBolData[i]['totalWeights'];
        
          this.myBolData[i].companyName = requestParse.shipper.companyName;
          if (this.myBolData[i].bolCarrier === 'FEDEX_FREIGHT_ECONOMY') {
            this.myBolData[i].carrierName = 'FXFE';
          } else if (this.myBolData[i].bolCarrier === 'FEDEX_FREIGHT_PRIORITY') {
            this.myBolData[i].carrierName = 'FXFP';
          } else {
            this.myBolData[i].carrierName = this.myBolData[i].bolCarrier;
          }
          if (requestParse.shipper !== undefined) {
            if (requestParse.shipper.contactName !== undefined) {
              this.myBolData[i].shipperContactName = requestParse.shipper.contactName;
            }
          }
          if (requestParse.consignee !== undefined) {
            if (requestParse.consignee.contactName !== undefined && requestParse.consignee.contactName !== null) {
              this.myBolData[i].consigneeContactName = requestParse.consignee.contactName;

            }
            if (requestParse.consignee.companyName !== undefined && requestParse.consignee.companyName !== null) {
              this.myBolData[i].consigneeCompanyName = requestParse.consignee.companyName;
            }
          }

          if (this.myBolData[i].uploadBol !== null) {
          
            this.myBolData[i].uploadBol  = this.myBolData[i].uploadBol;
            
          } else {
              this.myBolData[i].uploadBol  =  this.myBolData[i].companyDetails.bolUpload;
          }
    
    
          if (this.myBolData[i].uploadDelivery !== null) {
            this.myBolData[i].uploadDelivery  = this.myBolData[i].uploadDelivery;
          } else {
            this.myBolData[i].uploadDelivery  = this.myBolData[i].companyDetails.deliveryUpload;
          }
          if (this.myBolData[i].uploadWeight !== null) {
            this.myBolData[i].uploadWeight = this.myBolData[i].uploadWeight;
          } else {
              this.myBolData[i].uploadWeight = this.myBolData[i].companyDetails.weightUpload;
          }
    
    
          if (this.myBolData[i].uploadInvoice !== null) {
            this.myBolData[i].uploadInvoice = this.myBolData[i].uploadInvoice;
          } else {
            this.myBolData[i].uploadInvoice = this.myBolData[i].companyDetails.invoiceUpload;

          }
    
          this.myBolData[i].requestedShipments = requestParse.RequestedShipment;
          this.myBolData[i].shipment = requestParse.shipment;
          let date = this.myBolData[i].createdOn;
          let parseDate = date.split('T')
          this.myBolData[i].createdOn = parseDate[0];
          if (this.myBolData[i].bolPdfDoc !== null) {
            this.myBolData[i].showOnlineBol = true;

          }else {
            this.myBolData[i].showOnlineBol = false;

          }
          if (this.myBolData[i].deliveryPdf !== null) {
            this.myBolData[i].showDelivery = true;

          }else {
            this.myBolData[i].showDelivery = false;

          }
          if (this.myBolData[i].weightPdf !== null) {
            this.myBolData[i].showWeight = true;

          }else {
            this.myBolData[i].showWeight = false;

          }
          if (this.myBolData[i].invoicePdf !== null) {
            this.myBolData[i].showInvoice = true;

          }else {
            this.myBolData[i].showInvoice = false;

          }
          console.log('shipping',this.myBolData[i]);
          // if (this.myBolData[i].bolDoc !== null) {
          //   if (this.myBolData[i].bolDoc.length > 0) {
          //     this.myBolData[i].bolDoc.forEach((el) => {
          //       let splittedValue = el.split('-');
          //       if (splittedValue[0] === 'BOL') {
          //         this.myBolData[i].showOnlineBol = true;
          //       } else  if (splittedValue[0] === 'Delivery') {
          //         this.myBolData[i].showDelivery = true;
          //       } else  if (splittedValue[0] === 'Weight') {
          //         this.myBolData[i].showWeight = true;
  
          //       }
                
          //     })
          //     console.log('data',this.myBolData[i]);
          //   } }else {
          //     this.myBolData[i].showOnlineBol = false;
          //     this.myBolData[i].showDelivery = false;
          //     this.myBolData[i].showWeight = false;
          //   }
        }
      } else {
        this.showSearchDetail = false;
        this.recordsNotFoundMsg = true;
      }
    }, (error: any) => {
      this.entryLoader = false,
        this.recordsNotFoundMsg = true,
        this.showSearchDetail = false
    });
  }

  search(myBillOfLading: any) {
    this.selectPagination = '';
    this.searchLoader = true;
    this.recordsNotFoundMsg = false;
    myBillOfLading.customerId = this.customerId;
    myBillOfLading.salesRepId = this.salesRepId;
    if (myBillOfLading.bolReferenceNumber === '' && myBillOfLading.shipperZip === '' &&
      myBillOfLading.consigneeZip === '' && myBillOfLading.consignee === '' &&
      myBillOfLading.shipper === '' && myBillOfLading.bolCarrier === '' && myBillOfLading.proNumber === '') {
      this.showErrorMessage = true;
      this.searchLoader = false;
    } else {
      this.showErrorMessage = false;
      this.externalService.searchExternalBill(myBillOfLading).subscribe((data: any) => {
        this.searchResponse = data;
        this.myBolData = this.searchResponse.result;
        this.searchLoader = false;
        this.totalItems = this.myBolData.length;
        if (this.totalItems > 10) {
          this.numberPerPage = 10;
        } else {
          this.numberPerPage = this.totalItems;
        }
        if (this.myBolData.length > 0) {
          for (let i = 0; i < this.myBolData.length; i++) {
                      if (this.myBolData[i].bolPdfDoc !== null) {
            this.myBolData[i].showOnlineBol = true;

          }else {
            this.myBolData[i].showOnlineBol = false;

          }
          if (this.myBolData[i].deliveryPdf !== null) {
            this.myBolData[i].showDelivery = true;

          }else {
            this.myBolData[i].showDelivery = false;

          }
          if (this.myBolData[i].weightPdf !== null) {
            this.myBolData[i].showWeight = true;

          }else {
            this.myBolData[i].showWeight = false;

          }
          if (this.myBolData[i].invoicePdf !== null) {
            this.myBolData[i].showInvoice = true;

          }else {
            this.myBolData[i].showInvoice = false;

          }

          if (this.myBolData[i].uploadBol !== null) {
          
            this.myBolData[i].bolUpload  = this.myBolData[i].uploadBol;
            
          } else {
             if (this.myBolData[i].companyId !== 0) {
            if(this.myBolData[i].companyDetails.bolUpload !== null) {
              this.myBolData[i].bolUpload  =  this.myBolData[i].companyDetails.bolUpload;
            } else {
              this.myBolData[i].bolUpload  =  true;
            }
          } else {
            this.myBolData[i].bolUpload  =  false;

          }
          }
    
    
          if (this.myBolData[i].uploadDelivery !== null) {
            this.myBolData[i].deliveryUpload  = this.myBolData[i].uploadDelivery;
          } else {
            if (this.myBolData[i].companyId !== 0) {
            if(this.myBolData[i].companyDetails.deliveryUpload !== null) {
              this.myBolData[i].deliveryUpload  = this.myBolData[i].companyDetails.deliveryUpload;
            } else {
              this.myBolData[i].deliveryUpload  =  true;
            }
          } else {
            this.myBolData[i].deliveryUpload  =  false;

          }
          }
          if (this.myBolData[i].uploadWeight !== null) {
            this.myBolData[i].weightUpload = this.myBolData[i].uploadWeight;
          } else {
            if (this.myBolData[i].companyId !== 0) {

            if(this.myBolData[i].companyDetails.weightUpload !== null) {
              this.myBolData[i].weightUpload = this.myBolData[i].companyDetails.weightUpload;
            } else {
              this.myBolData[i].weightUpload  =  true;
            }
          } else {
            this.myBolData[i].weightUpload  =  false;

          }

          }
    
    
          if (this.myBolData[i].uploadInvoice !== null) {
            this.myBolData[i].invoiceUpload = this.myBolData[i].uploadInvoice;
          } else {
            if (this.myBolData[i].companyId !== 0) {

            if(this.myBolData[i].companyDetails.invoiceUpload !== null) {
              this.myBolData[i].invoiceUpload = this.myBolData[i].companyDetails.invoiceUpload;
            } else {
              this.myBolData[i].invoiceUpload  =  true;
            }
          } else {
            this.myBolData[i].invoiceUpload  =  false;

          }

          }
    
            // if (this.myBolData[i].bolDoc !== null) {
            //   if (this.myBolData[i].bolDoc.length > 0) {
            //     this.myBolData[i].bolDoc.forEach((el) => {
            //       let splittedValue = el.split('-');
            //       console.log(splittedValue);
            //       if (splittedValue[0] === 'BOL') {
            //         console.log('BOL', this.myBolData[i].bolDoc)
            //         this.myBolData[i].showOnlineBol = true;
            //       } 
            //       if (splittedValue[0] === 'Delivery') {
            //         this.myBolData[i].showDelivery = true;
            //         console.log('BOL1', this.myBolData[i].bolDoc)
  
            //       }
            //       if (splittedValue[0] === 'Weight') {
            //         this.myBolData[i].showWeight = true;
            //         console.log('BOL2', this.myBolData[i].bolDoc)
  
            //       }
            //       console.log('data',   this.myBolData[i].showOnlineBol,   this.myBolData[i].showDelivery,  this.myBolData[i].showWeight)
            //     })
            //   } }else {
            //     this.myBolData[i].showOnlineBol = false;
            //     this.myBolData[i].showDelivery = false;
            //     this.myBolData[i].showWeight = false;
            //   }
            let bolRequest = this.myBolData[i].bolRequest;
            let requestParse = JSON.parse(bolRequest);
            if (this.myBolData[i].bolCarrier === 'FEDEX_FREIGHT_ECONOMY') {
              this.myBolData[i].carrierName = 'FXFE';
            } else if (this.myBolData[i].bolCarrier === 'FEDEX_FREIGHT_PRIORITY') {
              this.myBolData[i].carrierName = 'FXFP';
            } else {
              this.myBolData[i].carrierName = this.myBolData[i].bolCarrier;
            }
            this.myBolData[i].companyName = requestParse.shipper.companyName;
            this.myBolData[i].requestedShipments = requestParse.RequestedShipment;
            let date = this.myBolData[i].createdOn;
            let parseDate = date.split('T')
            this.myBolData[i].createdOn = parseDate[0];
            if (requestParse.shipper.contactName !== undefined) {
              this.myBolData[i].shipperContactName = requestParse.shipper.contactName;
            }
            if (requestParse.consignee !== undefined) {
              if (requestParse.consignee.contactName !== undefined && requestParse.consignee.contactName !== null) {
                this.myBolData[i].consigneeContactName = requestParse.consignee.contactName;
              }
              if (requestParse.consignee.companyName !== undefined && requestParse.consignee.companyName !== null) {
                this.myBolData[i].consigneeCompanyName = requestParse.consignee.companyName;
              }
            }
            this.myBolData[i].requestedShipments = requestParse.RequestedShipment;
            this.myBolData[i].shipment = requestParse.shipment;
          }
          this.showSearchDetail = true;
        } else {
          this.showSearchDetail = false;
          this.recordsNotFoundMsg = true;
        }
      }, (err: any) => {
        this.searchLoader = false;
        this.showSearchDetail = false;
        this.recordsNotFoundMsg = true;
      });
    }
  }

  clearForm() {
    this.selectPagination = '';
    this.myBillOfLading.patchValue({
      bolReferenceNumber: '',
      shipper: '',
      consignee: '',
      shipperZip: '',
      consigneeZip: '',
      bolCarrier: '',
      proNumber: ''
    });
    this.showErrorMessage = false;
    this.recordsNotFoundMsg = false;
    this.localStorageSalesData();
  }
  clear() {
    this.clearForm();
  }

  refresh() {
    this.clearForm();
  }
  formatPhoneNumber(s: any) {
    let s2 = ('' + s).replace(/\D/g, '');
    let m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ')' + m[2] + '-' + m[3];
  }
  netChargeArrSum(netCharge: any) {
    let total = 0;
    netCharge.forEach(function (key: any) {
      total = total + Number(key);
    });
    return total;
  }

  printLabel(referenceNumber: any) {
    this.showProNumber = false;
    this.showTracking = false;
    this.showReddawayNumber = false;
    this.showOthersTrackingNumber = false;
    $('#popup-modal').modal('show');
    this.externalService.getMyBolType(this.accessToken, referenceNumber).subscribe((data: any) => {
      console.log(data);
      this.printData = data[0];
      this.printCarrier = this.printData.bolCarrier;
      this.printData.bolRequest = JSON.parse(this.printData.bolRequest);
      this.printData.lineItems = this.printData.bolRequest.lineItems;
      this.printData.shipperName = this.printData.bolRequest.shipper.companyName;
      this.printData.shipperCity = this.printData.bolRequest.shipper.city;
      this.printData.shipperStreet1 = this.printData.bolRequest.shipper.street1;
      this.printData.shipperCountry = this.printData.bolRequest.shipper.country;
      this.printData.shipperZip = this.printData.bolRequest.shipper.postalCode;
      this.printData.shipperState = this.printData.bolRequest.shipper.state;
      this.printData.consigneeState = this.printData.bolRequest.consignee.state;
      this.printData.consigneeStreet1 = this.printData.bolRequest.consignee.street1;
      this.printData.consigneeName = this.printData.bolRequest.consignee.companyName;
      this.printData.consigneeCity = this.printData.bolRequest.consignee.city;
      this.printData.consigneeCountry = this.printData.bolRequest.consignee.country;
      this.printData.consigneeCountry = this.printData.bolRequest.consignee.country;
      this.printData.consigneeZip = this.printData.bolRequest.consignee.postalCode;
      // this.printData.consigneeState = this.printData.bolRequest.consignee.state;
      this.printData.serviceType = this.printData.bolCarrier;
      if (this.printData.bolCarrier === 'FEDEX_FREIGHT_ECONOMY' && this.printData.bolService === true) {
        this.printData.bolResponse = JSON.parse(this.printData.bolResponse);
        this.printData.trackingNumber = this.printData.bolTrackingNumber;
        this.showTracking = true;
      } else if (this.printData.bolCarrier === 'FEDEX_FREIGHT_PRIORITY' && this.printData.bolService === true) {
        this.printData.bolResponse = JSON.parse(this.printData.bolResponse);
        this.printData.trackingNumber = this.printData.bolTrackingNumber;
        this.showTracking = true;
      } else if (this.printData.bolCarrier === 'YRC' && this.printData.bolService === true) {
        this.printData.bolResponse = JSON.parse(this.printData.bolResponse);
        if (this.printData.bolResponse) {
          this.printData.proNumber = this.printData.bolTrackingNumber;
          this.showProNumber = true;
        } else {
          this.showProNumber = false;
        }
      } else {
        if (this.printData.bolCarrier === 'OTHERS' && this.printData.otherCarrierName === 'Rate Quote') {
          if (this.printData.trackLink !== null && this.printData.bolTrackingNumber !== null) {
            this.showOthersTrackingNumber = true;
            this.printData.trackingNumber = this.printData.bolTrackingNumber;
          } else {
            this.showOthersTrackingNumber = false;
          }
        } else if (this.printData.bolCarrier === 'OTHERS') {
          if (this.printData.bolTrackingNumber !== null && this.printData.routinePickup === true) {
            this.showOthersTrackingNumber = true;
            this.printData.trackingNumber = this.printData.bolTrackingNumber;
          } else {
            this.showOthersTrackingNumber = false;
          }
        }
      } 
      // this.printData.lineItems.forEach(())
      this.printData.isHazardous = this.printData.lineItems[0].isHazardous;
      console.log(this.printData);
    });
  }

  printlabel(bolPrint: any) {
    console.log(bolPrint);
    // $('#popup-modal').modal('hide');
    $('#label-modal').modal('hide');
  }

  printlabelForRefNo(data: any) {
  //   this.table = [ {
  //     id: '1'
  //   },
  //   {
  //     id: '2'
  //   },
  //   {
  //     id: '3'
  //   }
  // ]
    this.showBol = true;
    console.log(data);
    this.tableCount = data;
    let m = Math.floor(data / 4);
if (data % 4 === 0) {
  this.iterateData = m;
} else {
  this.iterateData = m + 1;
}
for (let i = 0; i< this.tableCount; i++) {
  this.table.push(this.printData);
}
console.log(this.table);
console.log(m + ',' + data);

// setTimeout(() => {

    if (data !== 0  && data > 0 && data !== '' && data !== null) {
      console.log(data);
      this.printContent = (document.getElementById('print-label')as HTMLFormElement).innerHTML;
      this.printContent1 = (document.getElementById('section1')as HTMLFormElement).innerHTML;
        } else if (data === 0 || data === '' || data === null) {
      
      this.printContent1 = (document.getElementById('section1')as HTMLFormElement).innerHTML;
      // console.log(this.printContent);

    }
    const WindowPrt: any = window.open('', '', 'fullscreen = 1,toolbar=0,scrollbars=0,status=0');
    if (data !== 0) {
      this.printcontentLength = 0;
      WindowPrt.document.open();
      for (let i = 0;i < this.table.length; i ++) {
        console.log('Jefrin');
        // tslint:disable-next-line:max-line-length
        WindowPrt.document.write('<html><head></head><body onload="window.print();setTimeout(function(){window.close();}, 2000)"> ' + this.printContent + '<h2>' + (i + 1) + '  of  ' + this.table.length +  '</h2><div class="pagebreak" style="page-break-after: always;"> </div></body></html>');
      }
      // WindowPrt.moveTo(200, 200);
      
      WindowPrt.document.write('<html><head></head><body onload="window.print();setTimeout(function(){window.close();}, 2000)">' + this.printContent1 + '</body></html>');


    } else {
      console.log(data);
      WindowPrt.document.open();
      WindowPrt.document.write('<html><head></head><body onload="window.print();setTimeout(function(){window.close();}, 2000)">' + this.printContent1 + '</body></html>');
    }
    // WindowPrt.focus();
    // WindowPrt.print();
       WindowPrt.document.close();
      //  WindowPrt.close();
       this.showBol = false;
      this.table = [];

 
    // }, 4000);

    $('#popup-modal').modal('hide');
    $('#bolType-modal').modal('hide');

  }

  printlabelForRefNolabel(data: any) {
    this.showBol = true;
    console.log(data);
    this.tableCount = data;
    let m = Math.floor(data / 4);
if (data % 4 === 0) {
  this.iterateData = m;
} else {
  this.iterateData = m + 1;
}
for (let i = 0; i< this.tableCount; i++) {
  this.table.push(this.printData);
}
console.log(this.table);
console.log(m + ',' + data);
    const WindowPrt: any = window.open('', '', 'fullscreen = 1,toolbar=0,scrollbars=0,status=0');
    // if (data !== 0) {
      this.printcontentLength = 0;
      this.printContent = (document.getElementById('print-label')as HTMLFormElement).innerHTML;

      WindowPrt.document.open();
      for (let i = 0;i < this.table.length; i ++) {
        console.log('Jefrin');
        // tslint:disable-next-line:max-line-length
        WindowPrt.document.write('<html><head></head><body onload="window.print();setTimeout(function(){window.close();}, 2000)"> ' + this.printContent + '<h2>' + (i + 1) + '  of  ' + this.table.length +  '</h2><div class="pagebreak" style="page-break-after: always;"> </div></body></html>');
      }
       WindowPrt.document.close();
       this.showBol = false;
      this.table = [];

 
    // }, 4000);

    // $('#popup-modal').modal('hide');
    // $('#bolType-modal').modal('hide');

  }

  printlabelForRefNoBOL(data: any) {
    this.showBol = true;
    console.log(data);
    this.tableCount = data;
    let m = Math.floor(data / 4);
if (data % 4 === 0) {
  this.iterateData = m;
} else {
  this.iterateData = m + 1;
}
for (let i = 0; i< this.tableCount; i++) {
  this.table.push(this.printData);
}
console.log(this.table);
console.log(m + ',' + data);
    const WindowPrt: any = window.open('', '', 'fullscreen = 1,toolbar=0,scrollbars=0,status=0');
    // if (data !== 0) {
      this.printcontentLength = 0;
      this.printContent = (document.getElementById('section1')as HTMLFormElement).innerHTML;

      WindowPrt.document.open();
      // for (let i = 0;i < this.table.length; i ++) {
        console.log('Jefrin');
        // tslint:disable-next-line:max-line-length
        WindowPrt.document.write('<html><head></head><body onload="window.print();setTimeout(function(){window.close();}, 2000)"> ' + this.printContent + '<div class="pagebreak" style="page-break-after: always;"> </div></body></html>');
      // }
       WindowPrt.document.close();
       this.showBol = false;
      this.table = [];

 
    // }, 4000);

    // $('#popup-modal').modal('hide');
    // $('#bolType-modal').modal('hide');

  }

  closeLabelModal() {
    $('#label-modal').modal('hide');
    // $('#bolType-modal').modal('hide');
  }

  checkEnterKey(event: any, value: any) {
    console.log(event);
    if (event.which === 13) {
      this.printlabelForRefNo(value);
    }
  }

  checkMyBill(bolReferenceNumber: any) {
    console.log(bolReferenceNumber);
    this.piecesCount = [];
    this.palletCount = [];
    this.showProNumber = false;
    this.showTrackingNumber = false;
    this.showReddawayNumber = false;
    this.showOthersTrackingNumber = false;
    
    this.totalPieces = 0;
        this.totalWeights = 0;
    // $('#bolType-modal').modal('show');

    this.externalService.getMyBolTypeById(this.accessToken, bolReferenceNumber.id).subscribe((data: any) => {
      console.log(data);
      this.bolValue = data[0];
      console.log(this.companyDetails);
      this.companyDetails.forEach((obj:any) => {
        if(obj.id === this.bolValue.companyId) {
          this.companySpecificName = obj.companyName;
          this.companyData = obj;
        }
        
      });
      this.bolValue.bolRequest = JSON.parse(this.bolValue.bolRequest);
      this.bolValue.previewTotalPallets = 0;
    this.bolValue.previewTotalPieces = 0;
      if (this.bolValue.bolCarrier === 'FEDEX_FREIGHT_ECONOMY' && this.bolValue.bolService === true) {
        this.bolValue.bolResponse = JSON.parse(this.bolValue.bolResponse);
        this.bolValue.trackingNumber = this.bolValue.bolTrackingNumber;
        this.showTrackingNumber = true;
      } else if (this.bolValue.bolCarrier === 'FEDEX_FREIGHT_PRIORITY' && this.bolValue.bolService === true) {
        this.bolValue.bolResponse = JSON.parse(this.bolValue.bolResponse);
        this.bolValue.trackingNumber = this.bolValue.bolTrackingNumber;
        this.showTrackingNumber = true;
      } else if (this.bolValue.bolCarrier === 'YRC' && this.bolValue.bolService === true) {
        this.bolValue.bolResponse = JSON.parse(this.bolValue.bolResponse);
        if (this.bolValue.bolResponse) {
          this.bolValue.proNumber = this.bolValue.bolTrackingNumber;
          this.showProNumber = true;
        } else {
          this.showProNumber = false;
        }
      } else {
        if (this.bolValue.bolCarrier === 'OTHERS' && this.bolValue.otherCarrierName === 'Rate Quote') {
          if (this.bolValue.trackLink !== null && this.bolValue.bolTrackingNumber !== null) {
            this.showOthersTrackingNumber = true;
            this.bolValue.trackingNumber = this.bolValue.bolTrackingNumber;
          } else {
            this.showOthersTrackingNumber = false;
          }
        } else if (this.bolValue.bolCarrier === 'OTHERS') {
          if (this.bolValue.bolTrackingNumber !== null && this.bolValue.routinePickup === true) {
            this.showOthersTrackingNumber = true;
            this.bolValue.trackingNumber = this.bolValue.bolTrackingNumber;
          } else {
            this.showOthersTrackingNumber = false;
          }
        }
      }

      let classification;
      let lineItemArray = [];
      let lineItemNewArray = [];
      let lineItemFormat = [];
      let object, bolType;
      // console.log(JSON.parse(this.bolValue.bolRequest.lineItems));
      lineItemArray = this.bolValue.bolRequest.lineItems;
      lineItemFormat = this.bolValue.bolRequest.lineItemsFormat;
      this.bolValue.lineItemsFormat = lineItemFormat;
      console.log(this.bolValue);
      if (this.bolValue.lineItemsFormat === undefined) {
        this.bolValue.lineItemsFormat = JSON.parse(this.bolValue.bolRequest.lineItems);
        this.bolValue.lineItems = this.bolValue.bolRequest.lineItems;
        this.bolValue.lineItemsFormat[0].shipmentType ="Non-Itemized";
        this.bolValue.lineItemsFormat[0].bolType="Non Itemize";

      }
      console.log(this.bolValue);

      for (let i = 0; i < this.bolValue.lineItemsFormat.length; i++) {
        console.log(this.bolValue.lineItemsFormat[i].shipmentType);
        if (this.bolValue.lineItemsFormat[i].shipmentType === 'Multi Classed Pallet') {
            this.totalPieces += Number(this.bolValue.lineItemsFormat[i].HandlingUnitQuantity);
            if (this.bolValue.lineItemsFormat[i].HandlingUnitType === 'PLT' || this.bolValue.lineItemsFormat[i].HandlingUnitType === 'PALLET' || this.bolValue.lineItemsFormat[i].HandlingUnitType === 'Pallets') {
                this.bolValue.previewTotalPallets += Number(this.bolValue.lineItemsFormat[i].HandlingUnitQuantity);
            }
            for (let a = 0; a < this.bolValue.lineItemsFormat[i].newAddPieces.length; a++) {
              this.bolValue.previewTotalPieces += Number(this.bolValue.lineItemsFormat[i].newAddPieces[a].Pieces);
                      this.totalWeights += Number(this.bolValue.lineItemsFormat[i].newAddPieces[a].Weight.Value);

          }          
        } 
        else if (this.bolValue.lineItemsFormat[i].shipmentType === 'Itemized') {
          this.totalPieces += Number(this.bolValue.lineItemsFormat[i].HandlingUnitQuantity);
          if (this.bolValue.lineItemsFormat[i].HandlingUnitType === 'PLT' || this.bolValue.lineItemsFormat[i].HandlingUnitType === 'PALLET' || this.bolValue.lineItemsFormat[i].HandlingUnitType === 'Pallets') {
              this.bolValue.previewTotalPallets += Number(this.bolValue.lineItemsFormat[i].HandlingUnitQuantity);
                      this.totalWeights += Number(this.bolValue.lineItemsFormat[i].Weight.Value);

          }
          console.log(this.bolValue.lineItemsFormat[i]);
          for (let a = 0; a < this.bolValue.lineItemsFormat[i].newAddPieces.length; a++) {
              this.bolValue.previewTotalPieces += Number(this.bolValue.lineItemsFormat[i].newAddPieces[a].Pieces);
          }
      } else {
            this.totalPieces += Number(this.bolValue.lineItemsFormat[i].HandlingUnitQuantity);
            if (this.bolValue.lineItemsFormat[i].HandlingUnitType === 'PLT' || this.bolValue.lineItemsFormat[i].HandlingUnitType === 'PALLET' || this.bolValue.lineItemsFormat[i].HandlingUnitType === 'Pallets') {
                this.bolValue.previewTotalPallets += Number(this.bolValue.lineItemsFormat[i].HandlingUnitQuantity);
                        this.totalWeights += Number(this.bolValue.lineItemsFormat[i].Weight.Value);

            }
            this.bolValue.previewTotalPieces += Number(this.bolValue.lineItemsFormat[i].PackageQuantity);

        }
        // this.totalWeights += Number(this.bolValue.lineItemsFormat[i].Weight.Value);
    }
      console.log(this.bolValue);
      if (this.bolValue.bolCarrier === 'YRC') {
        if (this.bolValue.pickupStatus === 'pickUp') {
          if (this.bolValue.pickUpConformationNumber !== null) {
            this.bolValue.pickUpConformationNumber = this.bolValue.pickupConformationNumber;
          } else {
            this.bolValue.pickUpConformationNumber = this.bolValue.pickupConformationNumber;
          }
        }
        this.bolValue.thirdPartyCity = 'Fife';
        this.bolValue.thirdPartyCompanyName = 'Forte';
        this.bolValue.thirdPartyPostalCode = '98424';
        this.bolValue.thirdPartyState = 'WA';
        this.bolValue.thirdPartyStreet = '301 54th Ave. E.Ste 200';
        if (this.bolValue.bolRequest.billPaidTo !== undefined) {
          if (this.bolValue.bolRequest.billPaidTo.name === 'BILLTOFORTE') {
            this.bolValue.billPaidTo = { name: 'to Forte', companyName: this.bolValue.thirdPartyCompanyName, address: this.bolValue.thirdPartyStreet, zip: this.bolValue.thirdPartyPostalCode, city: this.bolValue.thirdPartyCity, state: this.bolValue.thirdPartyState };
          } else if (this.bolValue.bolRequest.billPaidTo.name === 'PREPAID') {
            this.bolValue.billPaidTo = { name: 'Prepaid', companyName: this.bolValue.bolRequest.billPaidTo.companyName, address: this.bolValue.bolRequest.billPaidTo.address, zip: this.bolValue.bolRequest.billPaidTo.zip, city: this.bolValue.bolRequest.billPaidTo.city, state: this.bolValue.bolRequest.billPaidTo.state };
          } else if (this.bolValue.bolRequest.billPaidTo.name === 'COLLECT') {
            this.bolValue.billPaidTo = { name: 'Collect', companyName: this.bolValue.bolRequest.billPaidTo.companyName, address: this.bolValue.bolRequest.billPaidTo.address, zip: this.bolValue.bolRequest.billPaidTo.zip, city: this.bolValue.bolRequest.billPaidTo.city, state: this.bolValue.bolRequest.billPaidTo.state };
          } else {
            this.bolValue.billPaidTo = { name: 'Third Party', companyName: this.bolValue.bolRequest.billPaidTo.companyName, address: this.bolValue.bolRequest.billPaidTo.address, zip: this.bolValue.bolRequest.billPaidTo.zip, city: this.bolValue.bolRequest.billPaidTo.city, state: this.bolValue.bolRequest.billPaidTo.state };
          }
        } else {
          this.bolValue.billPaidTo = { name: 'to Forte', companyName: this.bolValue.thirdPartyCompanyName, address: this.bolValue.thirdPartyStreet, zip: this.bolValue.thirdPartyPostalCode, city: this.bolValue.thirdPartyCity, state: this.bolValue.thirdPartyState };
        }
        this.bolValue.createdOn = this.bolValue.createdOn;
        this.bolValue.serviceType = this.bolValue.bolCarrier;
        this.bolValue.spclInstructions = this.bolValue.bolRequest.specialInstructions;
        this.bolValue.poNumber = this.bolValue.purchaseOrderNumber;
        this.bolValue.shipperNumber = this.bolValue.shipperIdNumber;
        this.bolValue.ReferenceNumber = this.bolValue.bolReferenceNumber;
        this.bolValue.shipperName = this.bolValue.bolRequest.shipper.companyName;
        this.bolValue.shipperCity = this.bolValue.bolRequest.shipper.city;
        this.bolValue.shipperStreet1 = this.bolValue.bolRequest.shipper.street1;
        this.bolValue.shipperCountry = this.bolValue.bolRequest.shipper.country;
        this.bolValue.shipperZip = this.bolValue.bolRequest.shipper.postalCode;
        this.bolValue.shipperState = this.bolValue.bolRequest.shipper.state;
        this.bolValue.shipperContactName = this.bolValue.bolRequest.shipper.contactName;
        this.bolValue.consigneeContactName = this.bolValue.bolRequest.consignee.contactName;
        this.bolValue.consigneeCity = this.bolValue.bolRequest.consignee.city;
        this.bolValue.consigneeCountry = this.bolValue.bolRequest.consignee.country;
        this.bolValue.consigneeZip = this.bolValue.bolRequest.consignee.postalCode;
        this.bolValue.consigneeState = this.bolValue.bolRequest.consignee.state;
        this.bolValue.consigneeStreet1 = this.bolValue.bolRequest.consignee.street1;
        this.bolValue.consigneeStreet2 = this.bolValue.bolRequest.consignee.street2;
        this.bolValue.consigneeName = this.bolValue.bolRequest.consignee.companyName;
        this.bolValue.consigneeContactName = this.bolValue.bolRequest.consignee.contactName;
        if (this.bolValue.bolRequest.pickupDate !== undefined && this.bolValue.bolRequest.pickupDate !== '' && this.bolValue.bolRequest.pickupDate !== null) {
          this.bolValue.shipment = this.bolValue.bolRequest.pickupDate;
        } else {
          this.bolValue.shipment = this.bolValue.bolRequest.shipment;
        }
        if (this.bolValue.bolRequest.shipper.phoneNumber !== '' && this.bolValue.bolRequest.shipper.phoneNumber !== null && this.bolValue.bolRequest.shipper.phoneNumber !== undefined) {
          if (this.bolValue.bolRequest.shipper.phoneNumber.length > 10) {
            this.bolValue.shipperPhoneNumber = this.bolValue.bolRequest.shipper.phoneNumber;
          } else {
            this.bolValue.shipperPhoneNumber = this.formatPhoneNumber(this.bolValue.bolRequest.shipper.phoneNumber);
          }
        }
        if (this.bolValue.bolRequest.consignee.phoneNumber.length > 10) {
          this.bolValue.consigneePhoneNumber = this.bolValue.bolRequest.consignee.phoneNumber;
        } else {
          this.bolValue.consigneePhoneNumber = this.formatPhoneNumber(this.bolValue.bolRequest.consignee.phoneNumber);
        }
        // let accessorialsList = [];
        // // console.log(JSON.parse(this.bolValue.accessorials));
        // if (this.bolValue.accessorials !== '' && this.bolValue.accessorials !== null && this.bolValue.accessorials !== undefined) {
        //   // accessorialsList.push(this.bolValue.accessorials);
        //   accessorialsList =this.bolValue.accessorials;

        //   if (accessorialsList.length > 0) {
        //     this.bolValue.accessorials = accessorialsList;
        //             console.log(this.bolValue.accessorials);

        //     for (let k = 0 ;k < this.bolValue.accessorials.length;k ++) {
        //       if (this.bolValue.accessorials[k] === 'Delivery Appointment Required') {
        //           this.bolValue.accessorials.splice(k,1);
        //       }
        //       if (this.bolValue.accessorials[k] === 'Hazmat') {
        //         this.bolValue.accessorials.splice(k,1);

        //       }
        //   }
        //   } else {
        //     this.bolValue.accessorials = [];
        //   }
        // } else {
        //   this.bolValue.accessorials = [];
        // }
        let accessorialsList = []
        if (this.bolValue.accessorials !== '' && this.bolValue.accessorials !== null && this.bolValue.accessorials !== undefined) {
          // accessorialsList.push(this.bolValue.accessorials);
  
          accessorialsList =JSON.parse(this.bolValue.accessorials);
  
          if (accessorialsList.length > 0) {
            this.bolValue.accessorials = accessorialsList;
                    console.log(this.bolValue.accessorials);
  
            for (let k = 0 ;k < this.bolValue.accessorials.length;k ++) {
              console.log(this.bolValue.accessorials[k])
              if (this.bolValue.accessorials[k] === 'Delivery Appointment Required') {
                  this.bolValue.accessorials.splice(k,1);
              }
              if (this.bolValue.accessorials[k] === 'Hazmat') {
                this.bolValue.accessorials.splice(k,1);
  
              }
          }
          } else {
            this.bolValue.accessorials = [];
          }
        } else {
          this.bolValue.accessorials = [];
        }
        this.bolValue.shipperPhoneNumber = this.bolValue.bolRequest.shipper.phoneNumber;
        lineItemArray = this.bolValue.bolRequest.lineItems;
        lineItemFormat = this.bolValue.bolRequest.lineItemFormat;
        console.log(this.bolValue);
     /*    for (let i = 0; i < lineItemArray.length; i++) {
               // this.removeClassification = lineItemArray[i].FreightClass.replace('CLASS_', '');
               this.removeClassification = lineItemArray[i].FreightClass.split('_')[1];

               console.log(this.removeClassification);            
                 lineItemArray[i].FreightClass = this.removeClassification;
                 console.log(lineItemArray[i]);
            if (lineItemArray[i].bolType === 'Itemize') {
              bolType = 'Itemize';
            } else if (lineItemArray[i].bolType === 'Multi Classed Pallet') {
              bolType = 'Multi Classed Pallet';
            } else {
              bolType = 'Non Itemize';
            }

          
          if (lineItemArray[i].isHazardous !== "" && lineItemArray[i].isHazardous !== undefined && lineItemArray[i].isHazardous !== null) {
            lineItemArray[i].isHazardous = lineItemArray[i].isHazardous;
          } else {
            lineItemArray[i].isHazardous = false;
          }
          if (lineItemArray[i].PackageUnitType !== '' && lineItemArray[i].PackageUnitType !== undefined) {
            this.piecesCount.push(lineItemArray[i].PackageQuantity);
            console.log('pieCount', this.piecesCount);
          }
          if (lineItemArray[i].HandlingUnitType === 'PLT' || lineItemArray[i].HandlingUnitType === 'PALLET' || lineItemArray[i].HandlingUnitType === 'Pallets') {
            this.palletCount.push(lineItemArray[i].HandlingUnitQuantity);
            console.log('palCount', this.palletCount);
          }

          object = {
            'isHazardous': lineItemArray[i].isHazardous,
            'FreightClass': lineItemArray[i].FreightClass,
            'HandlingUnitType': lineItemArray[i].HandlingUnitType,
            'HandlingUnitQuantity': lineItemArray[i].HandlingUnitQuantity,
            'PackageQuantity': lineItemArray[i].PackageQuantity,
            'Pieces': lineItemArray[i].PackageQuantity,
            'nmfc': lineItemArray[i].nmfc,
            'Description': lineItemArray[i].Description,
            'cube': lineItemArray[i].cube,
            'bolType': bolType,
            'Dimensions': {
              'Length': lineItemArray[i].Dimensions.Length,
              'Width': lineItemArray[i].Dimensions.Width,
              'Height': lineItemArray[i].Dimensions.Height
            },
            'Weight': {
              'Units': 'LB',
              'Value': lineItemArray[i].Weight.Value
            }
          };
          lineItemNewArray.push(object);
        }
        if (this.piecesCount.length > 0) {
          this.myBolTotalPieces = this.netChargeArrSum(this.piecesCount);
          console.log('totalPcs', this.myBolTotalPieces);
        } else {
          this.myBolTotalPieces = 0;
        }
        if (this.palletCount.length > 0) {
          this.myBolTotalPallets = this.netChargeArrSum(this.palletCount);
          console.log('totalpall', this.myBolTotalPallets);
        } else {
          this.myBolTotalPallets = 0;
        }
        // if (this.bolValue.bolRequest.lineItemsFormat !== undefined) {
        // this.bolValue.lineItem = this.bolValue.bolRequest.lineItemsFormat;
        // } else {
          this.bolValue.lineItem = lineItemNewArray;
        // }
        console.log('bolLI YRC', this.bolValue.lineItem);
        this.totalPieces = 0;
        this.totalWeights = 0;
        for (let i = 0; i < lineItemArray.length; i++) {
          this.totalPieces += Number(lineItemArray[i].HandlingUnitQuantity);
          this.totalWeights += Number(lineItemArray[i].Weight.Value);
        } */
        if (this.bolValue.lineItemsFormat.length > 0) {
          for (let c = 0; c < this.bolValue.lineItemsFormat.length; c++) {
              if (this.bolValue.lineItemsFormat[c].bolType === "Non Itemized") {
                  this.removeClassification = this.bolValue.lineItemsFormat[c].FreightClass.replace('CLASS_', '');
                  console.log('classification', this.removeClassification);
                  if (this.removeClassification.startsWith('0')) {
                      this.classification = this.removeClassification.replace('0', '');
                  } else {
                      this.classification = this.removeClassification;
                  }
                  if (this.classification.length > 2) {
                      this.bolValue.lineItemsFormat[c].FreightClass = this.classification.replace('_', '.');
                  } else {
                      this.bolValue.lineItemsFormat[c].FreightClass = this.classification;
                  }
                  // this.totalWeights += Number(this.bolValue.lineItemsFormat[c].Weight.Value);
                  // this.bolValue.previewTotalPieces += Number(this.bolValue.lineItemsFormat[c].PackageQuantity);
              }
              if (this.bolValue.lineItemsFormat[c].bolType === "Multi Classed Pallet") {
                  if (this.bolValue.lineItemsFormat[c].newAddPieces.length > 0) {
                      for (let a = 0; a < this.bolValue.lineItemsFormat[c].newAddPieces.length; a++) {
                          if (this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass.length > 0) {
                              this.removeClassification = this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass.replace('CLASS_', '');
                              console.log('classification', this.removeClassification);
                              if (this.removeClassification.startsWith('0')) {
                                  this.classification = this.removeClassification.replace('0', '');
                              } else {
                                 this.classification = this.removeClassification;
                              }
                              if (this.classification.length > 2) {
                                  this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification.replace('_', '.');
                              } else {
                                  this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification;
                              }
                              // this.totalWeights += Number(this.bolValue.lineItemsFormat[c].newAddPieces[a].Weight.Value);
                              // this.bolValue.previewTotalPieces += Number(this.bolValue.lineItemsFormat[c].newAddPieces[a].PackageQuantity);
                          }
                      }
                  }
              } else if (this.bolValue.lineItemsFormat[c].bolType === "Itemized") {
                if (this.bolValue.lineItemsFormat[c].newAddPieces.length > 0) {
                    for (let a = 0; a < this.bolValue.lineItemsFormat[c].newAddPieces.length; a++) {
                        if (this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass.length > 0) {
                            this.removeClassification = this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass.replace('CLASS_', '');
                            console.log('classification', this.removeClassification);
                            if (this.removeClassification.startsWith('0')) {
                                this.classification = this.removeClassification.replace('0', '');
                            } else {
                                this.classification = this.removeClassification;
                            }
                            if (this.classification.length > 2) {
                                this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification.replace('_', '.');
                            } else {
                                this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification;
                            }
                            // this.totalWeights += Number(this.bolValue.lineItemsFormat[c].newAddPieces[a].Weight.Value);
                            // this.pdfValue.previewTotalPieces += Number(this.pdfValue.lineItemsFormat[c].newAddPieces[a].PackageQuantity);
                        }
                    }
                }
            }
          }
      }
      } else if (this.bolValue.bolCarrier === 'REDDAWAY') {
        if (this.bolValue.pickupStatus === 'pickUp') {
          if (this.bolValue.pickUpConformationNumber !== null) {
            this.bolValue.pickUpConformationNumber = this.bolValue.pickupConformationNumber;
          } else {
            this.bolValue.pickUpConformationNumber = this.bolValue.pickupConformationNumber;
          }
        }
        if (this.bolValue.bolService === true && this.bolValue.bolTrackingNumber !== null && this.bolValue.bolTrackingNumber !== '' && this.bolValue.bolTrackingNumber !== undefined) {
          this.showReddawayNumber = true;
        } else {
          this.showReddawayNumber = false;
        }
        this.bolValue.thirdPartyCity = 'Fife';
        this.bolValue.thirdPartyCompanyName = 'Forte';
        this.bolValue.thirdPartyPostalCode = '98424';
        this.bolValue.thirdPartyState = 'WA';
        this.bolValue.thirdPartyStreet = '301 54th Ave. E.Ste 200';
        this.bolValue.createdOn = this.bolValue.createdOn;
        this.bolValue.serviceType = this.bolValue.bolCarrier;
        this.bolValue.poNumber = this.bolValue.purchaseOrderNumber;
        this.bolValue.shipperNumber = this.bolValue.shipperIdNumber;
        this.bolValue.ReferenceNumber = this.bolValue.bolReferenceNumber;
        this.bolValue.shipperName = this.bolValue.bolRequest.shipper.companyName;
        this.bolValue.shipperCity = this.bolValue.bolRequest.shipper.city;
        this.bolValue.shipperStreet1 = this.bolValue.bolRequest.shipper.street1;
        this.bolValue.shipperStreet2 = this.bolValue.bolRequest.shipper.street2;

        this.bolValue.shipperCountry = this.bolValue.bolRequest.shipper.country;
        this.bolValue.shipperZip = this.bolValue.bolRequest.shipper.postalCode;
        this.bolValue.shipperState = this.bolValue.bolRequest.shipper.state;
        this.bolValue.shipperContactName = this.bolValue.bolRequest.shipper.contactName;
        this.bolValue.consigneeName = this.bolValue.bolRequest.consignee.companyName;
        this.bolValue.consigneeCity = this.bolValue.bolRequest.consignee.city;
        this.bolValue.consigneeCountry = this.bolValue.bolRequest.consignee.country;
        this.bolValue.consigneeZip = this.bolValue.bolRequest.consignee.postalCode;
        this.bolValue.consigneeState = this.bolValue.bolRequest.consignee.state;
        this.bolValue.consigneeStreet1 = this.bolValue.bolRequest.consignee.street1;
        this.bolValue.consigneeStreet2 = this.bolValue.bolRequest.consignee.street2;

        this.bolValue.consigneeContactName = this.bolValue.bolRequest.consignee.contactName;
        // let accessorialsList  = [];
        // if (this.bolValue.accessorials !== '' && this.bolValue.accessorials !== null && this.bolValue.accessorials !== undefined) {
        //   accessorialsList.push(this.bolValue.accessorials);
        //   if (accessorialsList.length > 0) {
        //     this.bolValue.accessorials = accessorialsList;
        //   } else {
        //     this.bolValue.accessorials = [];
        //   }
        // } else {
        //   this.bolValue.accessorials = [];
        // }
        let accessorialsList = []
        if (this.bolValue.accessorials !== '' && this.bolValue.accessorials !== null && this.bolValue.accessorials !== undefined) {
          // accessorialsList.push(this.bolValue.accessorials);
  
          accessorialsList =JSON.parse(this.bolValue.accessorials);
  
          if (accessorialsList.length > 0) {
            this.bolValue.accessorials = accessorialsList;
                    console.log(this.bolValue.accessorials);
  
            for (let k = 0 ;k < this.bolValue.accessorials.length;k ++) {
              console.log(this.bolValue.accessorials[k])
              if (this.bolValue.accessorials[k] === 'Delivery Appointment Required') {
                  this.bolValue.accessorials.splice(k,1);
              }
              if (this.bolValue.accessorials[k] === 'Hazmat') {
                this.bolValue.accessorials.splice(k,1);
  
              }
          }
          } else {
            this.bolValue.accessorials = [];
          }
        } else {
          this.bolValue.accessorials = [];
        }
        if (this.bolValue.bolRequest.billPaidTo !== undefined) {
          if (this.bolValue.bolRequest.billPaidTo.name === 'BILLTOFORTE') {
            this.bolValue.billPaidTo = { name: 'to Forte', companyName: this.bolValue.thirdPartyCompanyName, address: this.bolValue.thirdPartyStreet, zip: this.bolValue.thirdPartyPostalCode, city: this.bolValue.thirdPartyCity, state: this.bolValue.thirdPartyState };
          } else {
            this.bolValue.billPaidTo = { name: 'Third Party', companyName: this.bolValue.bolRequest.billPaidTo.companyName, address: this.bolValue.bolRequest.billPaidTo.address, zip: this.bolValue.bolRequest.billPaidTo.zip, city: this.bolValue.bolRequest.billPaidTo.city, state: this.bolValue.bolRequest.billPaidTo.state };
          }
        } else {
          this.bolValue.billPaidTo = { name: 'to Forte', companyName: this.bolValue.thirdPartyCompanyName, address: this.bolValue.thirdPartyStreet, zip: this.bolValue.thirdPartyPostalCode, city: this.bolValue.thirdPartyCity, state: this.bolValue.thirdPartyState };
        }
        if (this.bolValue.pickupDate !== undefined && this.bolValue.pickupDate !== '' && this.bolValue.pickupDate !== null) {
          this.bolValue.shipment = this.bolValue.bolRequest.pickupDate;
        } else {
          this.bolValue.shipment = this.bolValue.bolRequest.shipment;
        }
        this.bolValue.spclInstructions = this.bolValue.bolRequest.specialInstructions;
        if (this.bolValue.bolRequest.shipper.phoneNumber !== '' && this.bolValue.bolRequest.shipper.phoneNumber !== null && this.bolValue.bolRequest.shipper.phoneNumber !== undefined) {
          if (this.bolValue.bolRequest.shipper.phoneNumber.length > 10) {
            this.bolValue.shipperPhoneNumber = this.bolValue.bolRequest.shipper.phoneNumber;
          } else {
            this.bolValue.shipperPhoneNumber = this.formatPhoneNumber(this.bolValue.bolRequest.shipper.phoneNumber);
          }
        }
        if (this.bolValue.bolRequest.consignee.phoneNumber.length > 10) {
          this.bolValue.consigneePhoneNumber = this.bolValue.bolRequest.consignee.phoneNumber;
        } else {
          this.bolValue.consigneePhoneNumber = this.formatPhoneNumber(this.bolValue.bolRequest.consignee.phoneNumber);
        }
        lineItemArray = this.bolValue.bolRequest.lineItems;
        console.log(lineItemArray);
    /*     for (let i = 0; i < lineItemArray.length; i++) {
                  // this.removeClassification = lineItemArray[i].FreightClass.replace('CLASS_', '');
                  this.removeClassification = lineItemArray[i].FreightClass.split('_')[1];

                  console.log(this.removeClassification);
                                      lineItemArray[i].FreightClass = this.removeClassification;
                    console.log(lineItemArray[i]);
            if (lineItemArray[i].bolType === 'Itemize') {
              bolType = 'Itemize';
            } else if (lineItemArray[i].bolType === 'Multi Classed Pallet') {
              bolType = 'Multi Classed Pallet';
            } else {
              bolType = 'Non Itemize';
            }
          
          if (lineItemArray[i].isHazardous !== "" && lineItemArray[i].isHazardous !== undefined && lineItemArray[i].isHazardous !== null) {
            lineItemArray[i].isHazardous = lineItemArray[i].isHazardous;
          } else {
            lineItemArray[i].isHazardous = false;
          }

          if (lineItemArray[i].PackageUnitType !== '' && lineItemArray[i].PackageUnitType !== undefined) {
            this.piecesCount.push(lineItemArray[i].PackageQuantity);
            console.log('pieCount', this.piecesCount);
          }
          if (lineItemArray[i].HandlingUnitType === 'PLT' || lineItemArray[i].HandlingUnitType === 'Pallets' || lineItemArray[i].HandlingUnitType === 'PALLET') {
            this.palletCount.push(lineItemArray[i].HandlingUnitQuantity);
            console.log('palCount', this.palletCount);
          }
          object = {
            'isHazardous': lineItemArray[i].isHazardous,
            'FreightClass': lineItemArray[i].FreightClass,
            'HandlingUnitType': lineItemArray[i].HandlingUnitType,
            'HandlingUnitQuantity': lineItemArray[i].HandlingUnitQuantity,
            'PackageQuantity': lineItemArray[i].PackageQuantity,
            'Pieces': lineItemArray[i].PackageQuantity,
            'nmfc': lineItemArray[i].nmfc,
            'Description': lineItemArray[i].Description,
            'cube': lineItemArray[i].cube,
            'bolType': bolType,
            'Dimensions': {
              'Length': lineItemArray[i].Dimensions.Length,
              'Width': lineItemArray[i].Dimensions.Width,
              'Height': lineItemArray[i].Dimensions.Height
            },
            'Weight': {
              'Units': 'LB',
              'Value': lineItemArray[i].Weight.Value
            }
          };
          lineItemNewArray.push(object);
        }
        if (this.piecesCount.length > 0) {
          this.myBolTotalPieces = this.netChargeArrSum(this.piecesCount);
          console.log('totalPcs', this.myBolTotalPieces);
        } else {
          this.myBolTotalPieces = 0;
        }
        if (this.palletCount.length > 0) {
          this.myBolTotalPallets = this.netChargeArrSum(this.palletCount);
          console.log('totalpall', this.myBolTotalPallets);
        } else {
          this.myBolTotalPallets = 0;
        }
        // if (this.bolValue.bolRequest.lineItemsFormat !== undefined) {
        // this.bolValue.lineItem = this.bolValue.bolRequest.lineItemsFormat;
        // } else {
          this.bolValue.lineItem = lineItemNewArray;
        // }
        console.log('bolLI REDDAWAY', this.bolValue.lineItem);
        this.totalPieces = 0;
        this.totalWeights = 0;
        for (let i = 0; i < lineItemArray.length; i++) {
          this.totalPieces += Number(lineItemArray[i].HandlingUnitQuantity);
          this.totalWeights += Number(lineItemArray[i].Weight.Value);
        } */
        if (this.bolValue.lineItemsFormat.length > 0) {
          for (let c = 0; c < this.bolValue.lineItemsFormat.length; c++) {
            if (this.bolValue.lineItemsFormat[c].bolType === "Non Itemized") {
              this.removeClassification = this.bolValue.lineItemsFormat[c].FreightClass.replace('CLASS_', '');
              console.log('classification', this.removeClassification);
              if (this.removeClassification.startsWith('0')) {
                  this.classification = this.removeClassification.replace('0', '');
              } else {
                  this.classification = this.removeClassification;
              }
              if (this.classification.length > 2) {
                  this.bolValue.lineItemsFormat[c].FreightClass = this.classification.replace('_', '.');
              } else {
                  this.bolValue.lineItemsFormat[c].FreightClass = this.classification;
              }
              // this.totalWeights += Number(this.bolValue.lineItemsFormat[c].Weight.Value);
              // this.bolValue.previewTotalPieces += Number(this.bolValue.lineItemsFormat[c].PackageQuantity);
          }
          if (this.bolValue.lineItemsFormat[c].bolType === "Multi Classed Pallet") {
              if (this.bolValue.lineItemsFormat[c].newAddPieces.length > 0) {
                  for (let a = 0; a < this.bolValue.lineItemsFormat[c].newAddPieces.length; a++) {
                      if (this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass.length > 0) {
                          this.removeClassification = this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass.replace('CLASS_', '');
                          console.log('classification', this.removeClassification);
                          if (this.removeClassification.startsWith('0')) {
                              this.classification = this.removeClassification.replace('0', '');
                          } else {
                             this.classification = this.removeClassification;
                          }
                          if (this.classification.length > 2) {
                              this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification.replace('_', '.');
                          } else {
                              this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification;
                          }
                          // this.totalWeights += Number(this.bolValue.lineItemsFormat[c].newAddPieces[a].Weight.Value);
                          // this.bolValue.previewTotalPieces += Number(this.bolValue.lineItemsFormat[c].newAddPieces[a].PackageQuantity);
                      }
                  }
              }
          } else if (this.bolValue.lineItemsFormat[c].bolType === "Itemized") {
            if (this.bolValue.lineItemsFormat[c].newAddPieces.length > 0) {
                for (let a = 0; a < this.bolValue.lineItemsFormat[c].newAddPieces.length; a++) {
                    if (this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass.length > 0) {
                        this.removeClassification = this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass.replace('CLASS_', '');
                        console.log('classification', this.removeClassification);
                        if (this.removeClassification.startsWith('0')) {
                            this.classification = this.removeClassification.replace('0', '');
                        } else {
                            this.classification = this.removeClassification;
                        }
                        if (this.classification.length > 2) {
                            this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification.replace('_', '.');
                        } else {
                            this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification;
                        }
                        // this.totalWeights += Number(this.bolValue.lineItemsFormat[c].newAddPieces[a].Weight.Value);
                        // this.pdfValue.previewTotalPieces += Number(this.pdfValue.lineItemsFormat[c].newAddPieces[a].PackageQuantity);
                    }
                }
            }
        }
          }
      }
      } else if (this.bolValue.bolCarrier === 'FEDEX_FREIGHT_ECONOMY' || this.bolValue.bolCarrier === 'FEDEX_FREIGHT_PRIORITY') {
        if (this.bolValue.pickupStatus === 'pickUp') {
          if (this.bolValue.pickUpConformationNumber !== null) {
            this.bolValue.pickUpConformationNumber = this.bolValue.pickupConformationNumber;
          } else {
            this.bolValue.pickUpConformationNumber = this.bolValue.pickupConformationNumber;
          }
        }
        let FEDEX;
        FEDEX = this.bolValue.bolCarrier.replace('_', ' ').replace('_', ' ');
        this.bolValue.thirdPartyCity = 'Fife';
        this.bolValue.thirdPartyCompanyName = 'Forte';
        this.bolValue.thirdPartyPostalCode = '98424';
        this.bolValue.thirdPartyState = 'WA';
        this.bolValue.thirdPartyStreet = '301 54th Ave. E.Ste 200';
        this.bolValue.createdOn = this.bolValue.createdOn;
        this.bolValue.serviceType = FEDEX;
        this.bolValue.poNumber = this.bolValue.purchaseOrderNumber;
        this.bolValue.shipperNumber = this.bolValue.shipperIdNumber;
        this.bolValue.ReferenceNumber = this.bolValue.bolReferenceNumber;
        this.bolValue.shipperName = this.bolValue.bolRequest.shipper.companyName;
        this.bolValue.shipperCity = this.bolValue.bolRequest.shipper.city;
        this.bolValue.shipperStreet1 = this.bolValue.bolRequest.shipper.street1;
        this.bolValue.shipperStreet2 = this.bolValue.bolRequest.shipper.street2;

        this.bolValue.shipperCountry = this.bolValue.bolRequest.shipper.country;
        this.bolValue.shipperZip = this.bolValue.bolRequest.shipper.postalCode;
        this.bolValue.shipperState = this.bolValue.bolRequest.shipper.state;
        this.bolValue.shipperContactName = this.bolValue.bolRequest.shipper.contactName;
        this.bolValue.consigneeName = this.bolValue.bolRequest.consignee.companyName;
        this.bolValue.consigneeCity = this.bolValue.bolRequest.consignee.city;
        this.bolValue.consigneeCountry = this.bolValue.bolRequest.consignee.country;
        this.bolValue.consigneeZip = this.bolValue.bolRequest.consignee.postalCode;
        this.bolValue.consigneeState = this.bolValue.bolRequest.consignee.state;
        this.bolValue.consigneeStreet1 = this.bolValue.bolRequest.consignee.street1;
        this.bolValue.consigneeStreet2 = this.bolValue.bolRequest.consignee.street2;

        this.bolValue.consigneeContactName = this.bolValue.bolRequest.consignee.contactName;
        if (this.bolValue.bolRequest.pickupDate !== '' && this.bolValue.bolRequest.pickupDate !== null && this.bolValue.bolRequest.pickupDate !== undefined) {
          this.bolValue.shipment = this.bolValue.bolRequest.pickupDate;
        } else {
          this.bolValue.shipment = this.bolValue.bolRequest.shipment;
        }
        // let accessorialsList = [];
        // if (this.bolValue.accessorials !== '' && this.bolValue.accessorials !== null && this.bolValue.accessorials !== undefined) {
        //   accessorialsList.push(this.bolValue.accessorials);
        //   if (accessorialsList.length > 0) {
        //     this.bolValue.accessorials = accessorialsList;
        //   } else {
        //     this.bolValue.accessorials = [];
        //   }
        // } else {
        //   this.bolValue.accessorials = [];
        // }
        // if (this.bolValue.accessorials !== '' && this.bolValue.accessorials !== null && this.bolValue.accessorials !== undefined) {
        //   // accessorialsList.push(this.bolValue.accessorials);

        //   accessorialsList =JSON.parse(this.bolValue.accessorials);

        //   if (accessorialsList.length > 0) {
        //     this.bolValue.accessorials = accessorialsList;
        //             console.log(this.bolValue.accessorials);

        //     for (let k = 0 ;k < this.bolValue.accessorials.length;k ++) {
        //       console.log(this.bolValue.accessorials[k])
        //       if (this.bolValue.accessorials[k] === 'Delivery Appointment Required') {
        //           this.bolValue.accessorials.splice(k,1);
        //       }
        //       if (this.bolValue.accessorials[k] === 'Hazmat') {
        //         this.bolValue.accessorials.splice(k,1);

        //       }
        //   }
        //   } else {
        //     this.bolValue.accessorials = [];
        //   }
        // } else {
        //   this.bolValue.accessorials = [];
        // }
        let accessorialsList = []
        if (this.bolValue.accessorials !== '' && this.bolValue.accessorials !== null && this.bolValue.accessorials !== undefined) {
          // accessorialsList.push(this.bolValue.accessorials);
  
          accessorialsList =JSON.parse(this.bolValue.accessorials);
  
          if (accessorialsList.length > 0) {
            this.bolValue.accessorials = accessorialsList;
                    console.log(this.bolValue.accessorials);
  
            for (let k = 0 ;k < this.bolValue.accessorials.length;k ++) {
              console.log(this.bolValue.accessorials[k])
              if (this.bolValue.accessorials[k] === 'Delivery Appointment Required') {
                  this.bolValue.accessorials.splice(k,1);
              }
              if (this.bolValue.accessorials[k] === 'Hazmat') {
                this.bolValue.accessorials.splice(k,1);
  
              }
          }
          } else {
            this.bolValue.accessorials = [];
          }
        } else {
          this.bolValue.accessorials = [];
        }
        if (this.bolValue.bolRequest.billPaidTo !== undefined) {
          if (this.bolValue.bolRequest.billPaidTo.name === 'BILLTOFORTE') {
            this.bolValue.billPaidTo = { name: 'to Forte', companyName: this.bolValue.thirdPartyCompanyName, address: this.bolValue.thirdPartyStreet, zip: this.bolValue.thirdPartyPostalCode, city: this.bolValue.thirdPartyCity, state: this.bolValue.thirdPartyState };
          } else {
            this.bolValue.billPaidTo = { name: 'Third Party', companyName: this.bolValue.bolRequest.billPaidTo.companyName, address: this.bolValue.bolRequest.billPaidTo.address, zip: this.bolValue.bolRequest.billPaidTo.zip, city: this.bolValue.bolRequest.billPaidTo.city, state: this.bolValue.bolRequest.billPaidTo.state };
          }
        } else {
          this.bolValue.billPaidTo = { name: 'to Forte', companyName: this.bolValue.thirdPartyCompanyName, address: this.bolValue.thirdPartyStreet, zip: this.bolValue.thirdPartyPostalCode, city: this.bolValue.thirdPartyCity, state: this.bolValue.thirdPartyState };
        }
        this.bolValue.spclInstructions = this.bolValue.bolRequest.specialInstructions;
        if (this.bolValue.bolRequest.shipper.phoneNumber !== '' && this.bolValue.bolRequest.shipper.phoneNumber !== null && this.bolValue.bolRequest.shipper.phoneNumber !== undefined) {
          if (this.bolValue.bolRequest.shipper.phoneNumber.length > 10) {
            this.bolValue.shipperPhoneNumber = this.bolValue.bolRequest.shipper.phoneNumber;
          } else {
            this.bolValue.shipperPhoneNumber = this.formatPhoneNumber(this.bolValue.bolRequest.shipper.phoneNumber);
          }
        }
        if (this.bolValue.bolRequest.consignee.phoneNumber.length > 10) {
          this.bolValue.consigneePhoneNumber = this.bolValue.bolRequest.consignee.phoneNumber;
        } else {
          this.bolValue.consigneePhoneNumber = this.formatPhoneNumber(this.bolValue.bolRequest.consignee.phoneNumber);
        }
        lineItemArray = this.bolValue.bolRequest.lineItems;
        console.log(this.bolValue);
        console.log(lineItemArray);
       /*  for (let i = 0; i < lineItemArray.length; i++) {
          // this.removeClassification = lineItemArray[i].FreightClass.replace('CLASS_', '');
            this.removeClassification = lineItemArray[i].FreightClass.split('_')[1];

            console.log(this.removeClassification);
          // if (Number(this.removeClassification) > 0) {
          //   console.log(this.removeClassification);

          //   if (this.removeClassification.startsWith('0')) {
          //     classification = this.removeClassification.replace('0', '');
          //   } else {
          //     classification = this.removeClassification;
          //   }
          //   if (classification.length > 2) {
          //     lineItemArray[i].FreightClass = classification.replace('_', '.');
          //   } else {
          //     lineItemArray[i].FreightClass = classification;
          //   }
          // }
          
              lineItemArray[i].FreightClass = this.removeClassification;
              console.log(lineItemArray[i]);
          if (lineItemArray[i].bolType === 'Itemize') {
            bolType = 'Itemize';
          } else if (lineItemArray[i].bolType === 'Multi Classed Pallet') {
            bolType = 'Multi Classed Pallet';
          } else {
            bolType = 'Non Itemize';
          }
          if (lineItemArray[i].isHazardous !== "" && lineItemArray[i].isHazardous !== undefined && lineItemArray[i].isHazardous !== null) {
            lineItemArray[i].isHazardous = lineItemArray[i].isHazardous;
          } else {
            lineItemArray[i].isHazardous = false;
          }
          if (lineItemArray[i].PackageUnitType !== '' && lineItemArray[i].PackageUnitType !== undefined) {
            this.piecesCount.push(lineItemArray[i].PackageQuantity);
            console.log('pieCount', this.piecesCount);
          }
          if (lineItemArray[i].HandlingUnitType === 'PALLET' || lineItemArray[i].HandlingUnitType === 'PLT' || lineItemArray[i].HandlingUnitType === 'Pallets') {
            this.palletCount.push(lineItemArray[i].HandlingUnitQuantity);
            console.log('palCount', this.palletCount);
          }
          object = {
            'isHazardous': lineItemArray[i].isHazardous,
            'FreightClass': lineItemArray[i].FreightClass,
            'HandlingUnitType': lineItemArray[i].HandlingUnitType,
            'HandlingUnitQuantity': lineItemArray[i].HandlingUnitQuantity,
            'PackageQuantity': lineItemArray[i].PackageQuantity,
            'Pieces': lineItemArray[i].PackageQuantity,
            'nmfc': lineItemArray[i].nmfc,
            'Description': lineItemArray[i].Description,
            'cube': lineItemArray[i].cube,
            'bolType': bolType,
            'Dimensions': {
              'Length': lineItemArray[i].Dimensions.Length,
              'Width': lineItemArray[i].Dimensions.Width,
              'Height': lineItemArray[i].Dimensions.Height
            },
            'Weight': {
              'Units': 'LB',
              'Value': lineItemArray[i].Weight.Value
            }
          };
          console.log(object);
          lineItemNewArray.push(object);
        }
        if (this.piecesCount.length > 0) {
          this.myBolTotalPieces = this.netChargeArrSum(this.piecesCount);
          console.log('totalPcs', this.myBolTotalPieces);
        } else {
          this.myBolTotalPieces = 0;
        }
        if (this.palletCount.length > 0) {
          this.myBolTotalPallets = this.netChargeArrSum(this.palletCount);
          console.log('totalpall', this.myBolTotalPallets);
        } else {
          this.myBolTotalPallets = 0;
        }
        // if (this.bolValue.bolRequest.lineItemsFormat !== undefined) {
        // this.bolValue.lineItem = this.bolValue.bolRequest.lineItemsFormat;
        // } else {
          this.bolValue.lineItem = lineItemNewArray;
        // }
        console.log('bolLI FXFE FXFP', this.bolValue.lineItem);
        this.totalPieces = 0;
        this.totalWeights = 0;
        for (let i = 0; i < lineItemArray.length; i++) {
          this.totalPieces += Number(lineItemArray[i].HandlingUnitQuantity);
          this.totalWeights += Number(lineItemArray[i].Weight.Value);
        } */
        if (this.bolValue.lineItemsFormat.length > 0) {
          for (let c = 0; c < this.bolValue.lineItemsFormat.length; c++) {
            if (this.bolValue.lineItemsFormat[c].bolType === "Non Itemized") {
              this.removeClassification = this.bolValue.lineItemsFormat[c].FreightClass.replace('CLASS_', '');
              console.log('classification', this.removeClassification);
              if (this.removeClassification.startsWith('0')) {
                  this.classification = this.removeClassification.replace('0', '');
              } else {
                  this.classification = this.removeClassification;
              }
              if (this.classification.length > 2) {
                  this.bolValue.lineItemsFormat[c].FreightClass = this.classification.replace('_', '.');
              } else {
                  this.bolValue.lineItemsFormat[c].FreightClass = this.classification;
              }
              // this.totalWeights += Number(this.bolValue.lineItemsFormat[c].Weight.Value);
              // this.bolValue.previewTotalPieces += Number(this.bolValue.lineItemsFormat[c].PackageQuantity);
          }
          if (this.bolValue.lineItemsFormat[c].bolType === "Multi Classed Pallet") {
              if (this.bolValue.lineItemsFormat[c].newAddPieces.length > 0) {
                  for (let a = 0; a < this.bolValue.lineItemsFormat[c].newAddPieces.length; a++) {
                      if (this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass.length > 0) {
                          this.removeClassification = this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass.replace('CLASS_', '');
                          console.log('classification', this.removeClassification);
                          if (this.removeClassification.startsWith('0')) {
                              this.classification = this.removeClassification.replace('0', '');
                          } else {
                             this.classification = this.removeClassification;
                          }
                          if (this.classification.length > 2) {
                              this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification.replace('_', '.');
                          } else {
                              this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification;
                          }
                          // this.totalWeights += Number(this.bolValue.lineItemsFormat[c].newAddPieces[a].Weight.Value);
                          // this.bolValue.previewTotalPieces += Number(this.bolValue.lineItemsFormat[c].newAddPieces[a].PackageQuantity);
                      }
                  }
              }
          } else if (this.bolValue.lineItemsFormat[c].bolType === "Itemized") {
            if (this.bolValue.lineItemsFormat[c].newAddPieces.length > 0) {
                for (let a = 0; a < this.bolValue.lineItemsFormat[c].newAddPieces.length; a++) {
                    if (this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass.length > 0) {
                        this.removeClassification = this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass.replace('CLASS_', '');
                        console.log('classification', this.removeClassification);
                        if (this.removeClassification.startsWith('0')) {
                            this.classification = this.removeClassification.replace('0', '');
                        } else {
                            this.classification = this.removeClassification;
                        }
                        if (this.classification.length > 2) {
                            this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification.replace('_', '.');
                        } else {
                            this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification;
                        }
                        // this.totalWeights += Number(this.bolValue.lineItemsFormat[c].newAddPieces[a].Weight.Value);
                        // this.pdfValue.previewTotalPieces += Number(this.pdfValue.lineItemsFormat[c].newAddPieces[a].PackageQuantity);
                    }
                }
            }
        }
          }
      }
      }
      else {
        console.log('else');
        if (this.bolValue.otherCarrierName !== "Rate Quote") {
          this.bolValue.serviceType = this.bolValue.otherCarrierName;
          this.bolValue.shipperIdNumber = this.bolValue.shipperIdNumber;
          this.bolValue.shippersBillOfLading = this.bolValue.shippersBillOfLading;
          this.bolValue.purchaseOrderNumber = this.bolValue.purchaseOrderNumber;
          this.bolValue.ReferenceNumber = this.bolValue.bolReferenceNumber;
          lineItemArray = this.bolValue.bolRequest.lineItems;
        } else {
          this.bolValue.serviceType = this.bolValue.bolCarrier;
          this.bolValue.shipperIdNumber = this.bolValue.shipperIdNumber;
          this.bolValue.shippersBillOfLading = this.bolValue.shippersBillOfLading;
          this.bolValue.purchaseOrderNumber = this.bolValue.purchaseOrderNumber;
          this.bolValue.ReferenceNumber = this.bolValue.controlNumber;
          lineItemArray = JSON.parse(this.bolValue.bolRequest.lineItems);
        }
        this.bolValue.thirdPartyCity = 'Fife';
        this.bolValue.thirdPartyCompanyName = 'Forte';
        this.bolValue.thirdPartyPostalCode = '98424';
        this.bolValue.thirdPartyState = 'WA';
        this.bolValue.thirdPartyStreet = '301 54th Ave. E.Ste 200';
        this.bolValue.createdOn = this.bolValue.createdOn;
        if (this.bolValue.rate !== "" && this.bolValue.rate !== null) {
          this.bolValue.amount = this.bolValue.rate;
        } else {
          this.bolValue.amount = '';
        }
        this.bolValue.spclInstructions = this.bolValue.bolRequest.specialInstructions;
        this.bolValue.poNumber = this.bolValue.purchaseOrderNumber;
        this.bolValue.shipperNumber = this.bolValue.shipperIdNumber;
        this.bolValue.shipperName = this.bolValue.bolRequest.shipper.companyName;
        this.bolValue.shipperCity = this.bolValue.bolRequest.shipper.city;
        this.bolValue.shipperStreet1 = this.bolValue.bolRequest.shipper.street1;
        this.bolValue.shipperStreet2 = this.bolValue.bolRequest.shipper.street;

        this.bolValue.shipperCountry = this.bolValue.bolRequest.shipper.country;
        this.bolValue.shipperZip = this.bolValue.bolRequest.shipper.postalCode;
        this.bolValue.shipperState = this.bolValue.bolRequest.shipper.state;
        this.bolValue.shipperContactName = this.bolValue.bolRequest.shipper.contactName;
        this.bolValue.consigneeName = this.bolValue.bolRequest.consignee.companyName;
        this.bolValue.consigneeCity = this.bolValue.bolRequest.consignee.city;
        this.bolValue.consigneeCountry = this.bolValue.bolRequest.consignee.country;
        this.bolValue.consigneeZip = this.bolValue.bolRequest.consignee.postalCode;
        this.bolValue.consigneeState = this.bolValue.bolRequest.consignee.state;
        this.bolValue.consigneeStreet1 = this.bolValue.bolRequest.consignee.street1;
        this.bolValue.consigneeStreet2 = this.bolValue.bolRequest.consignee.street2;

        this.bolValue.consigneeContactName = this.bolValue.bolRequest.consignee.contactName;
        if (this.bolValue.bolRequest.pickupDate !== '' && this.bolValue.bolRequest.pickupDate !== null && this.bolValue.bolRequest.pickupDate !== undefined) {
          this.bolValue.shipment = this.bolValue.bolRequest.pickupDate;
        } else {
          this.bolValue.shipment = this.bolValue.bolRequest.shipment;
        }
         let accessorialsList = []
      if (this.bolValue.accessorials !== '' && this.bolValue.accessorials !== null && this.bolValue.accessorials !== undefined) {
        // accessorialsList.push(this.bolValue.accessorials);

        accessorialsList =JSON.parse(this.bolValue.accessorials);

        if (accessorialsList.length > 0) {
          this.bolValue.accessorials = accessorialsList;
                  console.log(this.bolValue.accessorials);

          for (let k = 0 ;k < this.bolValue.accessorials.length;k ++) {
            console.log(this.bolValue.accessorials[k])
            if (this.bolValue.accessorials[k] === 'Delivery Appointment Required') {
                this.bolValue.accessorials.splice(k,1);
            }
            if (this.bolValue.accessorials[k] === 'Hazmat') {
              this.bolValue.accessorials.splice(k,1);

            }
        }
        } else {
          this.bolValue.accessorials = [];
        }
      } else {
        this.bolValue.accessorials = [];
      }
        if (this.bolValue.bolRequest.billPaidTo !== undefined) {
          if (this.bolValue.bolRequest.billPaidTo.name === 'BILLTOFORTE') {
            this.bolValue.billPaidTo = { name: 'to Forte', companyName: this.bolValue.thirdPartyCompanyName, address: this.bolValue.thirdPartyStreet, zip: this.bolValue.thirdPartyPostalCode, city: this.bolValue.thirdPartyCity, state: this.bolValue.thirdPartyState };
          } else if (this.bolValue.bolRequest.billPaidTo.name === 'THIRDPARTY') {
            this.bolValue.billPaidTo = { name: 'Third Party', companyName: this.bolValue.bolRequest.billPaidTo.companyName, address: this.bolValue.bolRequest.billPaidTo.address, zip: this.bolValue.bolRequest.billPaidTo.zip, city: this.bolValue.bolRequest.billPaidTo.city, state: this.bolValue.bolRequest.billPaidTo.state };
          } else if (this.bolValue.bolRequest.billPaidTo.name === 'PREPAY' || this.bolValue.bolRequest.billPaidTo.name === 'PREPAID') {
            this.bolValue.billPaidTo = { name: 'Prepaid', companyName: this.bolValue.bolRequest.billPaidTo.companyName, address: this.bolValue.bolRequest.billPaidTo.address, zip: this.bolValue.bolRequest.billPaidTo.zip, city: this.bolValue.bolRequest.billPaidTo.city, state: this.bolValue.bolRequest.billPaidTo.state };
          } else if (this.bolValue.bolRequest.billPaidTo.name === 'COLLECT') {
            this.bolValue.billPaidTo = { name: 'Collect', companyName: this.bolValue.bolRequest.billPaidTo.companyName, address: this.bolValue.bolRequest.billPaidTo.address, zip: this.bolValue.bolRequest.billPaidTo.zip, city: this.bolValue.bolRequest.billPaidTo.city, state: this.bolValue.bolRequest.billPaidTo.state };
          }
        } else {
          this.bolValue.billPaidTo = { name: 'to Forte', companyName: this.bolValue.thirdPartyCompanyName, address: this.bolValue.thirdPartyStreet, zip: this.bolValue.thirdPartyPostalCode, city: this.bolValue.thirdPartyCity, state: this.bolValue.thirdPartyState };
        }
        if (this.bolValue.bolRequest.shipper.phoneNumber !== undefined && this.bolValue.bolRequest.shipper.phoneNumber !== null && this.bolValue.bolRequest.shipper.phoneNumber !== '') {
          if (this.bolValue.bolRequest.shipper.phoneNumber.length > 10) {
            this.bolValue.shipperPhoneNumber = this.bolValue.bolRequest.shipper.phoneNumber;
          } else {
            this.bolValue.shipperPhoneNumber = this.formatPhoneNumber(this.bolValue.bolRequest.shipper.phoneNumber);
          }
        } else {
          this.bolValue.shipperPhoneNumber = '-';
        }
        if (this.bolValue.bolRequest.consignee.phoneNumber !== undefined && this.bolValue.bolRequest.consignee.phoneNumber !== null && this.bolValue.bolRequest.consignee.phoneNumber !== '') {
          if (this.bolValue.bolRequest.consignee.phoneNumber.length > 10) {
            this.bolValue.consigneePhoneNumber = this.bolValue.bolRequest.consignee.phoneNumber;
          } else {
            this.bolValue.consigneePhoneNumber = this.formatPhoneNumber(this.bolValue.bolRequest.consignee.phoneNumber);
          }
        } else {
          this.bolValue.consigneePhoneNumber = '-';
        }
    /*     for (let i = 0; i < lineItemArray.length; i++) {
          if (lineItemArray[i].FreightClass !== undefined) {
                    // this.removeClassification = lineItemArray[i].FreightClass.replace('CLASS_', '');
                    this.removeClassification = lineItemArray[i].FreightClass.split('_')[1];

                    console.log(this.removeClassification);
                  // if (Number(this.removeClassification) > 0) {
                  //   console.log(this.removeClassification);
        
                  //   if (this.removeClassification.startsWith('0')) {
                  //     classification = this.removeClassification.replace('0', '');
                  //   } else {
                  //     classification = this.removeClassification;
                  //   }
                  //   if (classification.length > 2) {
                  //     lineItemArray[i].FreightClass = classification.replace('_', '.');
                  //   } else {
                  //     lineItemArray[i].FreightClass = classification;
                  //   }
                  // }
                  
                      lineItemArray[i].FreightClass = this.removeClassification;
                      console.log(lineItemArray[i]);
            if (lineItemArray[i].bolType === 'Itemize') {
              bolType = 'Itemize';
            } else if (lineItemArray[i].bolType === 'Multi Classed Pallet') {
              bolType = 'Multi Classed Pallet';
            } else {
              bolType = 'Non Itemize';
            }
          } else {
          }
          if (lineItemArray[i].bolType === 'Itemize') {
            bolType = 'Itemize';
          } else if (lineItemArray[i].bolType === 'Multi Classed Pallet') {
            bolType = 'Multi Classed Pallet';
          } else {
            bolType = 'Non Itemize';
          }
          if (lineItemArray[i].isHazardous !== "" && lineItemArray[i].isHazardous !== undefined && lineItemArray[i].isHazardous !== null) {
            lineItemArray[i].isHazardous = lineItemArray[i].isHazardous;
          } else {
            lineItemArray[i].isHazardous = false;
          }
          if (lineItemArray[i].PackageUnitType !== '' && lineItemArray[i].PackageUnitType !== undefined) {
            this.piecesCount.push(lineItemArray[i].PackageQuantity);
            console.log('pieCount', this.piecesCount);
          }
          if (lineItemArray[i].HandlingUnitType === 'PALLET' || lineItemArray[i].HandlingUnitType === 'PLT' || lineItemArray[i].HandlingUnitType === 'Pallets') {
            this.palletCount.push(lineItemArray[i].HandlingUnitQuantity);
            console.log('palCount', this.palletCount);
          }
          
          console.log('lineItemArray', lineItemArray[i]);
          console.log('lineItemArray[i].Dimensions', lineItemArray[i].Dimensions);
          if (lineItemArray[i].Dimensions !== undefined) {
            if (lineItemArray[i].Dimensions.Length !== undefined && lineItemArray[i].Dimensions.Length !== null) {
              console.log('lineItemArray', lineItemArray);
              object = {
                'isHazardous': lineItemArray[i].isHazardous,
                'FreightClass': lineItemArray[i].FreightClass,
                'HandlingUnitQuantity': lineItemArray[i].HandlingUnitQuantity,
                'HandlingUnitType': lineItemArray[i].HandlingUnitType,
                'PackageQuantity': lineItemArray[i].PackageQuantity,
                'Pieces': lineItemArray[i].Pieces,
                'nmfc': lineItemArray[i].nmfc,
                'Description': lineItemArray[i].Description,
                'cube': lineItemArray[i].cube,
            'bolType': bolType,
                'Dimensions': {
                  'Length': lineItemArray[i].Dimensions.Length,
                  'Width': lineItemArray[i].Dimensions.Width,
                  'Height': lineItemArray[i].Dimensions.Height
                },
                'Weight': {
                  'Units': 'LB',
                  'Value': lineItemArray[i].Weight.Value
                }
              };
            }
          } else {
            object = {
              'isHazardous': lineItemArray[i].isHazardous,
              'FreightClass': lineItemArray[i].FreightClass,
              'HandlingUnitQuantity': lineItemArray[i].HandlingUnitQuantity,
              'HandlingUnitType': lineItemArray[i].HandlingUnitType,
              'PackageQuantity': lineItemArray[i].PackageQuantity,
              'Pieces': lineItemArray[i].Pieces,
              'nmfc': lineItemArray[i].nmfc,
              'Description': lineItemArray[i].Description,
              'cube': lineItemArray[i].cube,
            'bolType': bolType,
              'Dimensions': {
                'Length': '',
                'Width': '',
                'Height': ''
              },
              'Weight': {
                'Units': 'LB',
                'Value': ''
              }
            };
          }
          lineItemNewArray.push(object);
        }
        // if (this.bolValue.bolRequest.lineItemsFormat !== undefined) {
        // this.bolValue.lineItem = this.bolValue.bolRequest.lineItemsFormat;
        // } else {
          this.bolValue.lineItem = lineItemNewArray;
        // }
        if (this.piecesCount.length > 0) {
          this.myBolTotalPieces = this.netChargeArrSum(this.piecesCount);
          console.log('totalPcs', this.myBolTotalPieces);
        } else {
          this.myBolTotalPieces = 0;
        }
        if (this.palletCount.length > 0) {
          this.myBolTotalPallets = this.netChargeArrSum(this.palletCount);
          console.log('totalpall', this.myBolTotalPallets);
        } else {
          this.myBolTotalPallets = 0;
        }
        console.log('bolLI For Others', this.bolValue.lineItem);
        console.log('this.bolValye.lineItem For Others', this.bolValue.lineItem);
        this.totalPieces = 0;
        this.totalWeights = 0;
        for (let i = 0; i < lineItemArray.length; i++) {
          this.totalPieces += Number(lineItemArray[i].HandlingUnitQuantity);
          this.totalWeights += Number(lineItemArray[i].Weight.Value);
        } */
        if (this.bolValue.lineItemsFormat.length > 0) {
          for (let c = 0; c < this.bolValue.lineItemsFormat.length; c++) {
              if (this.bolValue.lineItemsFormat[c].FreightClass.length > 0) {
                  this.removeClassification = this.bolValue.lineItemsFormat[c].FreightClass.replace('CLASS_', '');
                  console.log('classification', this.removeClassification);
                  if (this.removeClassification.startsWith('0')) {
                      this.classification = this.removeClassification.replace('0', '');
                  } else {
                      this.classification = this.removeClassification;
                  }
                  if (this.classification.length > 2) {
                      this.bolValue.lineItemsFormat[c].FreightClass = this.classification.replace('_', '.');
                  } else {
                      this.bolValue.lineItemsFormat[c].FreightClass = this.classification;
                  }
                  this.totalWeights += Number(this.bolValue.lineItemsFormat[c].Weight.Value);
                  // this.bolValue.previewTotalPieces += Number(this.bolValue.lineItemsFormat[c].PackageQuantity);
              }
              if (this.bolValue.lineItemsFormat[c].bolType === "Multi Classed Pallet") {
                  if (this.bolValue.lineItemsFormat[c].newAddPieces.length > 0) {
                      for (let a = 0; a < this.bolValue.lineItemsFormat[c].newAddPieces.length; a++) {
                          if (this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass.length > 0) {
                              this.removeClassification = this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass.replace('CLASS_', '');
                              console.log('classification', this.removeClassification);
                              if (this.removeClassification.startsWith('0')) {
                                  this.classification = this.removeClassification.replace('0', '');
                              } else {
                                 this.classification = this.removeClassification;
                              }
                              if (this.classification.length > 2) {
                                  this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification.replace('_', '.');
                              } else {
                                  this.bolValue.lineItemsFormat[c].newAddPieces[a].FreightClass = this.classification;
                              }
                              this.totalWeights += Number(this.bolValue.lineItemsFormat[c].newAddPieces[a].Weight.Value);
                              // this.bolValue.previewTotalPieces += Number(this.bolValue.lineItemsFormat[c].newAddPieces[a].PackageQuantity);
                          }
                      }
                  }
              }
          }
      }
      }
      
      if (this.bolValue.bolReferenceNumber !== undefined) {
        // console.log(this.company);
      if (this.companyData.specificPricing === true) {
        let carrierName:any;
        if (this.bolValue.bolCarrier === 'FEDEX_FREIGHT_ECONOMY') {
          carrierName = 'FEDEX ECONOMY'
        } else if (this.bolValue.bolCarrier === 'FEDEX_FREIGHT_PRIORITY') {
          carrierName = 'FEDEX PRIORITY';
        } else {
          carrierName = this.bolValue.bolCarrier;
        }
       this.billPaidNamePricingname =  this.companyData.specificPricingList.find((check:any) => check === carrierName);
       this.billPaidNamePricing = this.billPaidNamePricingname !== undefined ? true: false;
      //  this.pricingInfoService.passPricingValue( this.billPaidNamePricing);
       console.log(this.billPaidNamePricing);
      } else {
        this.billPaidNamePricing = false;
        // this.pricingInfoService.passPricingValue( this.billPaidNamePricing);
      }
      }

    });
  /*   setTimeout(()=>{
      $('#bolType-modal').modal('show');
    }, 3000); */
  }
  close() {
    console.log("Inside Close Button")
    // $('#bolType-modal').modal('hide');

  }
  /* Creating pick up */
  createPickup(bolReferenceNumber: any) {
    this.createBillOfLading = {};
    this.createBillOfLading.previewTotalPieces = 0;
    this.createBillOfLading.previewTotalPallets = 0;
    console.log('bolReferenceNumber', bolReferenceNumber);
    this.palletCount = [];
    this.piecesCount = [];
    this.createBillOfLading.accessorials = [];
    this.externalService.getMyBolType(this.accessToken, bolReferenceNumber).subscribe((data: any) => {
      this.bolValue = data[0];
      console.log('this.bolValue', this.bolValue);
      this.createBillOfLading.bolRequest = JSON.parse(this.bolValue.bolRequest);
      console.log('this.bolValue', this.createBillOfLading);
      this.createBillOfLading.shipperCompanyName = this.createBillOfLading.bolRequest.shipper.companyName;
      this.createBillOfLading.shipperContactName = this.createBillOfLading.bolRequest.shipper.contactName;
      this.createBillOfLading.shipperPhoneNumber = this.createBillOfLading.bolRequest.shipper.phoneNumber;
      this.createBillOfLading.shipperStreet1 = this.createBillOfLading.bolRequest.shipper.street1;
      this.createBillOfLading.shipperStreet2 = this.createBillOfLading.bolRequest.shipper.street2;
      this.createBillOfLading.shipperCountry = this.createBillOfLading.bolRequest.shipper.country;
      this.createBillOfLading.shipperCity = this.createBillOfLading.bolRequest.shipper.city;
      this.createBillOfLading.shipperState = this.createBillOfLading.bolRequest.shipper.state;
      this.createBillOfLading.shipperPostalCode = this.createBillOfLading.bolRequest.shipper.postalCode;
      this.createBillOfLading.consigneeCompanyName = this.createBillOfLading.bolRequest.consignee.companyName;
      this.createBillOfLading.consigneeContactName = this.createBillOfLading.bolRequest.consignee.contactName;
      this.createBillOfLading.consigneePhoneNumber = this.createBillOfLading.bolRequest.consignee.phoneNumber;
      this.createBillOfLading.consigneeStreet1 = this.createBillOfLading.bolRequest.consignee.street1;
      this.createBillOfLading.consigneeStreet2 = this.createBillOfLading.bolRequest.consignee.street2;
      this.createBillOfLading.consigneeCountry = this.createBillOfLading.bolRequest.consignee.country;
      this.createBillOfLading.consigneeCity = this.createBillOfLading.bolRequest.consignee.city;
      this.createBillOfLading.consigneeState = this.createBillOfLading.bolRequest.consignee.state;
      this.createBillOfLading.consigneePostalCode = this.createBillOfLading.bolRequest.consignee.postalCode;
      
      this.createBillOfLading.shipTimestamp = new Date();
      this.createBillOfLading.quoteNumber = this.bolValue.quoteNumber;
      this.createBillOfLading.rate = this.bolValue.rate;
      this.createBillOfLading.serviceType = this.bolValue.bolCarrier;
      this.createBillOfLading.shippersBillOfLading = this.bolValue.shippersBillOfLading;
      this.createBillOfLading.billOfLadingTitle = this.bolValue.bolTitle;
      this.createBillOfLading.purchaseOrderNumber = this.bolValue.purchaseOrderNumber;
      this.createBillOfLading.specialInstructions = this.createBillOfLading.bolRequest.specialInstructions;
      this.createBillOfLading.bolReferenceNumber = this.bolValue.bolReferenceNumber;
      this.createBillOfLading.customerId = this.bolValue.customerId;
      this.createBillOfLading.id = this.bolValue.id;
      if (this.createBillOfLading.bolRequest.lineItemsFormat !== undefined && this.createBillOfLading.bolRequest.lineItemsFormat!== null && this.createBillOfLading.bolRequest.lineItemsFormat!==''){

        this.createBillOfLading.lineItemsFormat = this.createBillOfLading.bolRequest.lineItemsFormat;
      } else {
        this.createBillOfLading.lineItemsFormat = '';
      }
      this.createBillOfLading.lineItems = this.createBillOfLading.bolRequest.lineItems;
      let accessorialsList = [];
      if (this.bolValue.accessorials !== '' && this.bolValue.accessorials !== null && this.bolValue.accessorials !== undefined) {
        accessorialsList.push(this.bolValue.accessorials);
        if (accessorialsList.length > 0) {
          this.createBillOfLading.accessorials = accessorialsList;
        } else {
          this.createBillOfLading.accessorials = [];
        }
      } else {
        this.createBillOfLading.accessorials = [];
      }
      if (this.bolValue.bolRequest.billPaidTo !== undefined) {
        if (this.bolValue.bolRequest.billPaidTo.name === 'BILLTOFORTE') {
          this.createBillOfLading.billPaidTo = { name: this.bolValue.billPaidTo.name, companyName: this.bolValue.thirdPartyCompanyName, address: this.bolValue.thirdPartyStreet, zip: this.bolValue.thirdPartyPostalCode, city: this.bolValue.thirdPartyCity, state: this.bolValue.thirdPartyState };
        } else {
          this.createBillOfLading.billPaidTo = { name: this.bolValue.bolRequest.billPaidTo.name, companyName: this.bolValue.bolRequest.billPaidTo.companyName, address: this.bolValue.bolRequest.billPaidTo.address, zip: this.bolValue.bolRequest.billPaidTo.zip, city: this.bolValue.bolRequest.billPaidTo.city, state: this.bolValue.bolRequest.billPaidTo.state };
        }
      } else {
        this.createBillOfLading.billPaidTo = { name: 'BILLTOFORTE', companyName: this.bolValue.thirdPartyCompanyName, address: this.bolValue.thirdPartyStreet, zip: this.bolValue.thirdPartyPostalCode, city: this.bolValue.thirdPartyCity, state: this.bolValue.thirdPartyState };
      }
      if (this.createBillOfLading.lineItems.length > 0) {
        for (let i = 0; i < this.createBillOfLading.lineItems.length; i++) {
          console.log('this.createBillOfLading.lineItems', this.createBillOfLading.lineItems, i)
          if (this.createBillOfLading.lineItems[i].PackageUnitType !== '' && this.createBillOfLading.lineItems[i].PackageUnitType !== undefined) {
            this.piecesCount.push(this.createBillOfLading.lineItems[i].PackageQuantity);
            console.log('pieCount', this.piecesCount);
          }
          if (this.createBillOfLading.lineItems[i].HandlingUnitType === 'PLT' || this.createBillOfLading.lineItems[i].HandlingUnitType === 'PALLET' || this.createBillOfLading.lineItems[i].HandlingUnitType === 'Pallets') {
            this.palletCount.push(this.createBillOfLading.lineItems[i].HandlingUnitQuantity);
            console.log('palCount', this.palletCount);
          }
        }
      }
      if (this.piecesCount.length > 0) {
        this.createBillOfLading.previewTotalPieces = this.netChargeArrSum(this.piecesCount);
      } else {
        this.createBillOfLading.previewTotalPieces = 0;
      }
      if (this.palletCount.length > 0) {
        this.createBillOfLading.previewTotalPallets = this.netChargeArrSum(this.palletCount);
      } else {
        this.createBillOfLading.previewTotalPallets = 0;
      }


      if (this.bolValue.bolCarrier === 'YRC') {
        this.createBillOfLading.proNumber = this.bolValue.bolTrackingNumber;
      } else if (this.bolValue.bolCarrier === 'FEDEX_FREIGHT_ECONOMY' || this.bolValue.bolCarrier === 'FEDEX_FREIGHT_PRIORITY') {
        this.createBillOfLading.trackingNumber = this.bolValue.bolTrackingNumber;
        this.createBillOfLading.trackingIdType = "FREIGHT";
      } else {
        this.createBillOfLading.refNumber = this.bolValue.bolTrackingNumber;
      }

      this.createBillOfLading.bolService = this.bolValue.bolService;

      this.pricingInfoService.setBillOfLadingValues(this.createBillOfLading);
      this.router.navigate(['/billOfLadingSummary']);
    });
  }
  // generating pdf
  downloadPdfTest(bolValue: any) {
    var data1;
    let bolName: any;
    if (this.bolValue.bolCarrier === 'FEDEX_FREIGHT_ECONOMY' || this.bolValue.bolCarrier === 'FEDEX_FREIGHT_PRIORITY') {
      if (this.bolValue.trackingNumber !== undefined) {
        bolName = "FEDEX" + "_" + this.bolValue.trackingNumber;
      } else {
        bolName = "FEDEX" + "_" + this.bolValue.bolResponse;
      }

    } else if (this.bolValue.bolCarrier === 'YRC') {
      console.log('this.bolValue.proNumber', this.bolValue.proNumber, this.showProNumber, this.bolValue.bolResponse, this.bolValue.bolReferenceNumber);
      if (this.bolValue.proNumber !== undefined) {
        bolName = "YRC" + "_" + this.bolValue.proNumber;
      } else if (this.bolValue.proNumber === undefined && this.showProNumber === false && this.bolValue.bolResponse === '' || Object.keys(this.bolValue.bolResponse).length !== 0) {
        bolName = "YRC" + "_" + this.bolValue.bolReferenceNumber;
      } else {
        bolName = "YRC" + "_" + this.bolValue.bolResponse;
      }

    } else if (this.bolValue.bolCarrier === 'REDDAWAY') {
      bolName = "Reddaway" + "_" + this.bolValue.bolResponse;
    } else {
      bolName = "Others" + "_" + this.bolValue.bolResponse;
    }
    var data:any = document.getElementById('bolContainer');
    html2canvas(data).then((canvas: any) => {
      // Few necessary setting options  
      var imgWidth = 605;
      var pageHeight = 612;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      console.log('contentDataURL', contentDataURL);
      let pdf = new jsPDF('p', 'pt', 'letter'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      // var generatePdf = pdf.addImage()  
      console.log('pdf.addImae', pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight));
      console.log(pdf.save);
      pdf.save(bolName + ".pdf"); // Generated PDF   
      console.log(pdf.save);

    });
  }

  sendMail(bolValue: any) {
    console.log('bolValue', bolValue);
    let time = new Date();
    console.log('time', time);
    var data1;
    let bolName;
    if (this.bolValue.bolCarrier === 'FEDEX_FREIGHT_ECONOMY' || this.bolValue.bolCarrier === 'FEDEX_FREIGHT_PRIORITY') {
      if (this.bolValue.trackingNumber !== undefined) {
        bolName = "FEDEX" + "_" + this.bolValue.trackingNumber;
      } else {
        bolName = "FEDEX" + "_" + this.bolValue.bolResponse;
      }

    } else if (this.bolValue.bolCarrier === 'YRC') {
      console.log('this.bolValue.proNumber', this.bolValue.proNumber, this.showProNumber, this.bolValue.bolResponse, this.bolValue.bolReferenceNumber);
      if (this.bolValue.proNumber !== undefined) {
        bolName = "YRC" + "_" + this.bolValue.proNumber;
      } else if (this.bolValue.proNumber === undefined && this.showProNumber === false && this.bolValue.bolResponse === '' || Object.keys(this.bolValue.bolResponse).length !== 0) {
        bolName = "YRC" + "_" + this.bolValue.bolReferenceNumber;
      } else {
        bolName = "YRC" + "_" + this.bolValue.bolResponse;
      }

    } else if (this.bolValue.bolCarrier === 'REDDAWAY') {
      bolName = "Reddaway" + "_" + this.bolValue.bolResponse;
    } else {
      bolName = "Others" + "_" + this.bolValue.bolResponse;
    }
    var data:any = document.getElementById('bolContainer');
    html2canvas(data).then((canvas: any) => {
      // Few necessary setting options  
      var imgWidth = 605;
      var pageHeight = 612;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      console.log('contentDataURL', contentDataURL);
      const contentDataURLNew = canvas.toDataURL('image/pdf');
      console.log('contentDataURLNew', contentDataURLNew);
      let timeNew = new Date();
      console.log('final time', timeNew);
      //  this.externalService.pdfBase64Upload(contentDataURL, data).subscribe(response =>{
      //    this.emailResponse = response;
      //     if (this.emailResponse.result === true) {
      //       swal({
      //         title: 'Sent Mail!',
      //         text: 'Mail has been sent Sucessfully!',
      //         icon: 'success',
      //       });
      //     } else {
      //       swal({
      //         title: 'Oops!',
      //         text: 'Failed to send Mail!',
      //         icon: 'error',
      //         dangerMode: true,
      //       });
      //     }
      //  }, err =>{
      //   swal({
      //     title: 'Oops!',
      //     text: 'Failed to send Mail!',
      //     icon: 'error',
      //     dangerMode: true,
      //   });

      //  });
    });
  }

  editBol(data: any) {
    console.log(data);
     data.bolRequest  = JSON.parse(data.bolRequest);
     data.lineItemsFormat = data.bolRequest.lineItemsFormat;
     data.lineItems = data.bolRequest.lineItems;
    for (let i =0; i < data.lineItemsFormat.length; i++) {
      if (data.lineItemsFormat[i].shipmentType !== "Multi Classed Pallet") {
      this.removeClassification = data.lineItemsFormat[i].FreightClass.split('_')[1];

      console.log(this.removeClassification);
      data.lineItemsFormat[i].FreightClass = this.removeClassification;
        console.log(data.lineItems[i]);
    }
  }
    for (let i =0; i < data.lineItems.length; i++) {
      if (data.lineItems[i].shipmentType !== "Multi Classed Pallet") {
        this.removeClassification = data.lineItems[i].FreightClass.split('_')[1];

        console.log(this.removeClassification);
        data.lineItems[i].FreightClass = this.removeClassification;
          console.log(data.lineItems[i]);
      }
      
    }
    this.pricingInfoService.passReferenceNumber(data);
    this.pricingInfoService.setBillOfLadingValues(data);
    this.router.navigate(['/BOLNEW']);
  }

  downloadOnlineOdf() {
    this.pdfInBase64 = "JVBERi0xLjQKJeLjz9MKMjI3IDAgb2JqIDw8L1N1YnR5cGUvRm9ybS9GaWx0ZXIvRmxhdGVEZWNvZGUvVHlwZS9YT2JqZWN0L01hdHJpeFsxIDAgMCAxIDAgMF0vRm9ybVR5cGUgMS9SZXNvdXJjZXM8PC9Qcm9jU2V0Wy9QREYvVGV4dC9JbWFnZUIvSW1hZ2VDL0ltYWdlSV0vRm9udDw8L0hlbHYgMTg3IDAgUj4+Pj4vQkJveFswIDAgMTg5LjU5IDYuMjVdL0xlbmd0aCAxMTk+PnN0cmVhbQp4nCXNsQrCMBSF4Vf5R11SE6ja0WpBB8HiBWeR29ASU5qK+PgG5YzfgX+ipZAP9XnPxCrPbitTVqyNK0nKjZihFuxfcVjjHPKkOGp4s0G6DJ7FpY/x/gjK9aUa6MbEKY2RnVcOOvc+zksZft9GcrelydUvNtYiIQplbmRzdHJlYW0KZW5kb2JqCjIxNyAwIG9iaiA8PC9TdWJ0eXBlL0Zvcm0vRmlsdGVyL0ZsYXRlRGVjb2RlL1R5cGUvWE9iamVjdC9NYXRyaXhbMSAwIDAgMSAwIDBdL0Zvcm1UeXBlIDEvUmVzb3VyY2VzPDwvUHJvY1NldFsvUERGL1RleHQvSW1hZ2VCL0ltYWdlQy9JbWFnZUldL0ZvbnQ8PC9IZWx2IDE4NyAwIFI+Pj4+L0JCb3hbMCAwIDI4NS41MyA3LjVdL0xlbmd0aCAxMDk+PnN0cmVhbQp4nB3NsQqDQBBF0V+5pWlWZ3UxtWEhTUBhwNpiDQmJogli/j6DvO6d4i505LrT3C4sFDZ/Di6U1C6wJnom+xtFDhQ84qqAvsmv6bVRo6PBnUyqwgvtY55SWumHH3H4fE/6PDiqlTqidf45IxxUCmVuZHN0cmVhbQplbmRvYmoKMTg2IDAgb2JqIDw8L1N1YnR5cGUvRm9ybS9GaWx0ZXIvRmxhdGVEZWNvZGUvVHlwZS9YT2JqZWN0L01hdHJpeFsxIDAgMCAxIDAgMF0vRm9ybVR5cGUgMS9SZXNvdXJjZXM8PC9Qcm9jU2V0Wy9QREYvVGV4dC9JbWFnZUIvSW1hZ2VDL0ltYWdlSV0vRm9udDw8L0hlbHYgMTg3IDAgUj4+Pj4vQkJveFswIDAgNzAuMTUgNl0vTGVuZ3RoIDk0Pj5zdHJlYW0KeJwrVAhU0A+pUHDydVYoVDAAQnMDPUNTBTOFolSFcIU8oKBTiIIhWMZQwUjBUM/YRCEkV0HfIzWnTMFMz1QhJA0ola6gYWlhbG6kGZIF5rmGAM0NVHAFmgoAUF8WOwplbmRzdHJlYW0KZW5kb2JqCjIyMSAwIG9iaiA8PC9TdWJ0eXBlL0Zvcm0vRmlsdGVyL0ZsYXRlRGVjb2RlL1R5cGUvWE9iamVjdC9NYXRyaXhbMSAwIDAgMSAwIDBdL0Zvcm1UeXBlIDEvUmVzb3VyY2VzPDwvUHJvY1NldFsvUERGL1RleHQvSW1hZ2VCL0ltYWdlQy9JbWFnZUldL0ZvbnQ8PC9IZWx2IDE4NyAwIFI+Pj4+L0JCb3hbMCAwIDk0LjMx"+
    "IDYuODFdL0xlbmd0aCAxMDY+PnN0cmVhbQp4nG2MOwqEQBAFr1LhmozT/kZTRTAxEBr2BCqIChqIx7fXeKmsivcO5OWc8UaVuVQoXGlmZGIg1pu6bzj+9C+7+Vpt/4tCgrgsRzfiblwvAjpZmPkkeRqCl6LykS6vatXeB1r7fgCnBh2GCmVuZHN0cmVhbQplbmRvYmoKMjE5IDAgb2JqIDw8L1N1YnR5cGUvRm9ybS9GaWx0ZXIvRmxhdGVEZWNvZGUvVHlwZS9YT2JqZWN0L01hdHJpeFsxIDAgMCAxIDAgMF0vRm9ybVR5cGUgMS9SZXNvdXJjZXM8PC9Qcm9jU2V0Wy9QREYvVGV4dC9JbWFnZUIvSW1hZ2VDL0ltYWdlSV0vRm9udDw8L0hlbHYgMTg3IDAgUj4+Pj4vQkJveFswIDAgMTM0IDEyXS9MZW5ndGggMTAxPj5zdHJlYW0KeJwrVAhU0A+pUHDydVYoVDAAQkNjEwVDI4WiVIVwhTygmFOIgiFEQsFIwUjPxEIhJFdB3yM1p0zBUg/ISQNKpStoeAUrOOfnFZcUlSaXZObnaYZkgcVdQ4AWBCq4Ao0HAGRJGswKZW5kc3RyZWFtCmVuZG9iagoxODkgMCBvYmogPDwvU3VidHlwZS9Gb3JtL0ZpbHRlci9GbGF0ZURlY29kZS9UeXBlL1hPYmplY3QvTWF0cml4WzEgMCAwIDEgMCAwXS9Gb3JtVHlwZSAxL1Jlc291cmNlczw8L1Byb2NTZXRbL1BERi9UZXh0L0ltYWdlQi9JbWFnZUMvSW1hZ2VJXS9Gb250PDwvSGVsdiAxODcgMCBSPj4+Pi9CQm94WzAgMCAyODMuODIgNy41XS9MZW5ndGggMTA4Pj5zdHJlYW0KeJwdzbEKgzAUheFX+ce6xCYqZo4EunRQLnQuNC2UalDB+vhe5GznG/6ZnlJ2wr1j5qpzvjLe0ZqGJfFg0j8I9kSLw5q6QUbKW/pttMhb4cOl8p6w5P+00uUtMeTnq5DviVG00xO1cgAJjxv9CmVuZHN0cmVhbQplbmRvYmoKMjM2IDAgb2JqIDw8L1N1YnR5cGUvRm9ybS9GaWx0ZXIvRmxhdGVEZWNvZGUvVHlwZS9YT2JqZWN0L01hdHJpeFsxIDAgMCAxIDAgMF0vRm9ybVR5cGUgMS9SZXNvdXJjZXM8PC9Qcm9jU2V0Wy9QREYvVGV4dC9JbWFnZUIvSW1hZ2VDL0ltYWdlSV0vRm9udDw8L0hlbHYgMTg3IDAgUj4+Pj4vQkJveFswIDAgMjg0LjAzIDYuOTddL0xlbmd0aCAxMDk+PnN0cmVhbQp4nB3NsQ6CMBRA0V+5oy6FUoS6lpC4ONS8xJnEakKQBkzQz/eF3PEMdyFSyI9w7VgotcrXpnQ05tyyJu7MCkGwu1oqrKlPyJvikqaNFnkqvDg47wlr/s4furwlbnl4HGXcsRcdRXrd/AEhSRwxCmVuZHN0cmVhbQplbmRvYmoKMjE4IDAgb2JqIDw8L1N1YnR5cGUvRm9ybS9GaWx0ZXIvRmxhdGVEZWNvZGUvVHlwZS9YT2JqZWN0L01hdHJpeF"+
    "sxIDAgMCAxIDAgMF0vRm9ybVR5cGUgMS9SZXNvdXJjZXM8PC9Qcm9jU2V0Wy9QREYvVGV4dC9JbWFnZUIvSW1hZ2VDL0ltYWdlSV0vRm9udDw8L0hlbHYgMTg3IDAgUj4+Pj4vQkJveFswIDAgOTAuOSA1Ljk2XS9MZW5ndGggMTA2Pj5zdHJlYW0KeJxljDsKhEAQBa9S4Zpoj+NvUkXYxEBo2BOoICpoIHt8W1OprIr3dtzDMSFGkDiQx6HgGBjpSfRP3TXs7/xjM12rre/mSLHsS3HoSvIdlpMSHa1NfKrMF1nug0ik86Natf+e1t4vy8sdzgplbmRzdHJlYW0KZW5kb2JqCjIyOCAwIG9iaiA8PC9TdWJ0eXBlL0Zvcm0vRmlsdGVyL0ZsYXRlRGVjb2RlL1R5cGUvWE9iamVjdC9NYXRyaXhbMSAwIDAgMSAwIDBdL0Zvcm1UeXBlIDEvUmVzb3VyY2VzPDwvUHJvY1NldFsvUERGL1RleHQvSW1hZ2VCL0ltYWdlQy9JbWFnZUldL0ZvbnQ8PC9IZWx2IDE4NyAwIFI+Pj4+L0JCb3hbMCAwIDI3My40NSA3LjVdL0xlbmd0aCA5Mz4+c3RyZWFtCnicHYzLCkBQFAB/ZZZscD26e1I2ijplbYHSJRTx9w7NbqZmpyWUm7wu2ImU2CZBmmGDjGOgY1WfC+aPhhjzZVkIq8FdWGTUMOE159M7d26+zL8oRd8tpZ5fznIYxgplbmRzdHJlYW0KZW5kb2JqCjIxNiAwIG9iaiA8PC9TdWJ0eXBlL0Zvcm0vRmlsdGVyL0ZsYXRlRGVjb2RlL1R5cGUvWE9iamVjdC9NYXRyaXhbMSAwIDAgMSAwIDBdL0Zvcm1UeXBlIDEvUmVzb3VyY2VzPDwvUHJvY1NldFsvUERGL1RleHQvSW1hZ2VCL0ltYWdlQy9JbWFnZUldL0ZvbnQ8PC9IZWx2IDE4NyAwIFI+Pj4+L0JCb3hbMCAwIDQwLjQxIDEwLjc1XS9MZW5ndGggOTI+PnN0cmVhbQp4nB3MywpAUBSF4Vf5h0zORcdlTMrEQLY8waGEYiCPb6c1WfXVfzFg5aXuGy6cLjgTPN6ZMueOzJwKteB/9WRkpiqQA9vF/aFEFoWVZBpT2f7bimYHWo1+OCYWPQplbmRzdHJlYW0KZW5kb2JqCjE5MCAwIG9iaiA8PC9TdWJ0eXBlL0Zvcm0vRmlsdGVyL0ZsYXRlRGVjb2RlL1R5cGUvWE9iamVjdC9NYXRyaXhbMSAwIDAgMSAwIDBdL0Zvcm1UeXBlIDEvUmVzb3VyY2VzPDwvUHJvY1NldFsvUERGL1RleHQvSW1hZ2VCL0ltYWdlQy9JbWFnZUldL0ZvbnQ8PC9IZWx2IDE4NyAwIFI+Pj4+L0JCb3hbMCAwIDI3MS42NiA3LjQ1XS9MZW5ndGggOTU+PnN0cmVhbQp4nB3MQQtAQBRF4b9ylmwwwuxJ2VjQK2tliFBjIT/fo7u7Xx1PRywPZVvhSXSpNVFRYKMs53IMnAqlYH41pJiP5CBu3H5jkVlhIejXaXH7eE6hbP9Ti9Y7am2/+2IZKQplbmRzdHJl"+
    "YW0KZW5kb2JqCjIxNCAwIG9iaiA8PC9TdWJ0eXBlL0Zvcm0vRmlsdGVyL0ZsYXRlRGVjb2RlL1R5cGUvWE9iamVjdC9NYXRyaXhbMSAwIDAgMSAwIDBdL0Zvcm1UeXBlIDEvUmVzb3VyY2VzPDwvUHJvY1NldFsvUERGL1RleHQvSW1hZ2VCL0ltYWdlQy9JbWFnZUldL0ZvbnQ8PC9IZWx2IDE4NyAwIFI+Pj4+L0JCb3hbMCAwIDcwLjE1IDZdL0xlbmd0aCA5Mz4+c3RyZWFtCnicHYzBCkBAFEV/5SzZjJnBaLakbCzUK1+AEoqFfL7XdFfnnjo3E4V8tGPHjdU11riawLMwc+nZCi4Zh8eZskJOimE5XoKpkVXVRuZjLEMue6JetDvRa/UHUE4WOwplbmRzdHJlYW0KZW5kb2JqCjE5NSAwIG9iaiA8PC9TdWJ0eXBlL0Zvcm0vRmlsdGVyL0ZsYXRlRGVjb2RlL1R5cGUvWE9iamVjdC9NYXRyaXhbMSAwIDAgMSAwIDBdL0Zvcm1UeXBlIDEvUmVzb3VyY2VzPDwvUHJvY1NldFsvUERGL1RleHQvSW1hZ2VCL0ltYWdlQy9JbWFnZUldL0ZvbnQ8PC9IZWx2IDE4NyAwIFI+Pj4+L0JCb3hbMCAwIDM5Ljg4IDExLjk4XS9MZW5ndGggOTI+PnN0cmVhbQp4nB3MwQpAQBSF4Vf5l2yGMcrMlpSNhVx5gqGEYiGP76azOfXVfzGQyUvdN1zkOheM91hrgueOzJwKtWB/tRQ4U3rkIOvi/lAhi8JKMo2pbP9tRbMDrUY/P0oWVQplbmRzdHJlYW0KZW5kb2JqCjIyMyAwIG9iaiA8PC9TdWJ0eXBlL0Zvcm0vRmlsdGVyL0ZsYXRlRGVjb2RlL1R5cGUvWE9iamVjdC9NYXRyaXhbMSAwIDAgMSAwIDBdL0Zvcm1UeXBlIDEvUmVzb3VyY2VzPDwvUHJvY1NldFsvUERGL1RleHQvSW1hZ2VCL0ltYWdlQy9JbWFnZUldL0ZvbnQ8PC9IZUJvIDIyNCAwIFI+Pj4+L0JCb3hbMCAwIDIxOC4wNCAxNC4yNV0vTGVuZ3RoIDEwMD4+c3RyZWFtCnicHc2xCoQwEIThV/lLr4nZJKK2kYCNhbDgE6hwoOJV9/guMt18MHMzU+ufPA3ceEuQzvmEJBcafisLp0lW5GUhEF0T0YN6XPOFeHQz2alS18bYSyvpo9+3KmoHM8XmHwmPF80KZW5kc3RyZWFtCmVuZG9iagoyMTUgMCBvYmogPDwvU3VidHlwZS9Gb3JtL0ZpbHRlci9GbGF0ZURlY29kZS9UeXBlL1hPYmplY3QvTWF0cml4WzEgMCAwIDEgMCAwXS9Gb3JtVHlwZSAxL1Jlc291cmNlczw8L1Byb2NTZXRbL1BERi9UZXh0L0ltYWdlQi9JbWFnZUMvSW1hZ2VJXS9Gb250PDwvSGVsdiAxODcgMCBSPj4+Pi9CQm94WzAgMCAxMzggMTAuNV0vTGVuZ3RoIDk0Pj5zdHJlYW0KeJwljDEKhEAQwL6S8mx2Z0fFqxXBxkIY8AV6IHqghfh8ByVdAtkZi"+
    "HZR9w074qT8S5JQckyM/N3WRnoTioaqwDZiN60nFTZ7+PGRPGoZVVQyWx7Vmr8HWj/fpMAW7AplbmRzdHJlYW0KZW5kb2JqCjE5OSAwIG9iaiA8PC9TdWJ0eXBlL0Zvcm0vRmlsdGVyL0ZsYXRlRGVjb2RlL1R5cGUvWE9iamVjdC9NYXRyaXhbMSAwIDAgMSAwIDBdL0Zvcm1UeXBlIDEvUmVzb3VyY2VzPDwvUHJvY1NldFsvUERGL1RleHQvSW1hZ2VCL0ltYWdlQy9JbWFnZUldL0ZvbnQ8PC9IZWx2IDE4NyAwIFI+Pj4+L0JCb3hbMCAwIDExNi42NSAxMi41XS9MZW5ndGggMTA0Pj5zdHJlYW0KeJwrVAhU0A+pUHDydVYoVDAAQkNDMz0zUwVDIz1ThaJUhXCFPKCEU4iCIURWwUjBWM/cRCEkV0HfIzWnTMFcISQNKJGuoBGQmJObWlKSr+BSmpdarBmSBRZ2DQFaEajgCrQAAIiuGv0KZW5kc3RyZWFtCmVuZG9iagoxOTEgMCBvYmogPDwvU3VidHlwZS9Gb3JtL0ZpbHRlci9GbGF0ZURlY29kZS9UeXBlL1hPYmplY3QvTWF0cml4WzEgMCAwIDEgMCAwXS9Gb3JtVHlwZSAxL1Jlc291cmNlczw8L1Byb2NTZXRbL1BERi9UZXh0L0ltYWdlQi9JbWFnZUMvSW1hZ2VJXS9Gb250PDwvSGVsdiAxODcgMCBSPj4+Pi9CQm94WzAgMCAxMTIuMjUgMTAuNzVdL0xlbmd0aCA5Mz4+c3RyZWFtCnicK1QIVNAPqVBw8nVWKFQwAEJDQyM9I1MFQwM9c1OFolSFcIU8oIxTiIIhRFrBSMFIz8JMISRXQd8jNadMwVwhJA0oka6gEe6oGZIFZrqGAM0NVHAFmgoASrwWXwplbmRzdHJlYW0KZW5kb2JqCjIwOSAwIG9iaiA8PC9TdWJ0eXBlL0Zvcm0vRmlsdGVyL0ZsYXRlRGVjb2RlL1R5cGUvWE9iamVjdC9NYXRyaXhbMSAwIDAgMSAwIDBdL0Zvcm1UeXBlIDEvUmVzb3VyY2VzPDwvUHJvY1NldFsvUERGL1RleHQvSW1hZ2VCL0ltYWdlQy9JbWFnZUldL0ZvbnQ8PC9IZWx2IDE4NyAwIFI+Pj4+L0JCb3hbMCAwIDEwNiAxMS45OF0vTGVuZ3RoIDkwPj5zdHJlYW0KeJwrVAhU0A+pUHDydVYoVDAAQkMDMwVDQz1LC4WiVIVwhTygsFOIgiFETsFIwVjPxEIhJFdB3yM1p0zBXCEkDSiRrqAR7KwZkgVmuoYADQ1UcAUaCQASNBXQCmVuZHN0cmVhbQplbmRvYmoKMTk3IDAgb2JqIDw8L1N1YnR5cGUvRm9ybS9GaWx0ZXIvRmxhdGVEZWNvZGUvVHlwZS9YT2JqZWN0L01hdHJpeFsxIDAgMCAxIDAgMF0vRm9ybVR5cGUgMS9SZXNvdXJjZXM8PC9Qcm9jU2V0Wy9QREYvVGV4dC9JbWFnZUIvSW1hZ2VDL0ltYWdlSV0vRm9udDw8L0hlbHYgMTg3IDAgUj4+Pj4vQkJveFswIDAgNTY5Lj"+
    "I4IDE0LjY1XS9MZW5ndGggMTYzPj5zdHJlYW0KeJwdjrsOgkAUBX/llEgibzbQyUsxRlG4iQ0N0VUxKwFElL93Q6acYqbDCTr9EO4jdDAkLvM1y4PpaMxFz3FGg5BgztKEBV9joBf0lIsRTHNBN2nuUFQ1znDICAUF0Q7rPNluUlJVIOaiHnk/IWjbATnvPnXPrzgKXr05LpUQKB7VV4b6qWoGrFAqnmOXCzDHXdq+YSzoOUcSksOJnP0D0uEweAplbmRzdHJlYW0KZW5kb2JqCjE5MiAwIG9iaiA8PC9TdWJ0eXBlL0Zvcm0vRmlsdGVyL0ZsYXRlRGVjb2RlL1R5cGUvWE9iamVjdC9NYXRyaXhbMSAwIDAgMSAwIDBdL0Zvcm1UeXBlIDEvUmVzb3VyY2VzPDwvUHJvY1NldFsvUERGL1RleHQvSW1hZ2VCL0ltYWdlQy9JbWFnZUldL0ZvbnQ8PC9IZWx2IDE4NyAwIFI+Pj4+L0JCb3hbMCAwIDE5MS4yNSAxMC4wMl0vTGVuZ3RoIDEwNz4+c3RyZWFtCnicJY3BCoJAFEV/5SxzM84MSLRUmdBFmnahLzBBKrBF+Pk+irs53LM4KwO5NqpLzYq3hVNwsSB45yOfiTtvM5UIf00kugK9yJvp+eWIHvbPHM79qITGsrtdDUu1fZdp+ckkCw0ky+wKCBtzCmVuZHN0cmVhbQplbmRvYmoKMjExIDAgb2JqIDw8L1N1YnR5cGUvRm9ybS9GaWx0ZXIvRmxhdGVEZWNvZGUvVHlwZS9YT2JqZWN0L01hdHJpeFsxIDAgMCAxIDAgMF0vRm9ybVR5cGUgMS9SZXNvdXJjZXM8PC9Qcm9jU2V0Wy9QREYvVGV4dC9JbWFnZUIvSW1hZ2VDL0ltYWdlSV0vRm9udDw8L0hlbHYgMTg3IDAgUj4+Pj4vQkJveFswIDAgMjA3LjIzIDExLjI0XS9MZW5ndGggMTA1Pj5zdHJlYW0KeJwdzbEKwkAQRdFfuWBjms3O7EpqExZsLAID+YJVERUisuTzHcLr3inuykxvG+N1YiX6NA5BEyJBM9/KwsdlNGRnQUlBBHvTX+qrMWA3hzvHU/49OLdK4aAxdvbc/2IemSme+AOE1Bl1CmVuZHN0cmVhbQplbmRvYmoKMjM0IDAgb2JqIDw8L1N1YnR5cGUvRm9ybS9GaWx0ZXIvRmxhdGVEZWNvZGUvVHlwZS9YT2JqZWN0L01hdHJpeFsxIDAgMCAxIDAgMF0vRm9ybVR5cGUgMS9SZXNvdXJjZXM8PC9Qcm9jU2V0Wy9QREYvVGV4dC9JbWFnZUIvSW1hZ2VDL0ltYWdlSV0vRm9udDw8L0hlbHYgMTg3IDAgUj4+Pj4vQkJveFswIDAgMjE1LjU3IDExLjMzXS9MZW5ndGggOTM+PnN0cmVhbQp4nB3MwQpAQBSF4Vf5l2yGO9NkT2RjoW55giFCsZDHd9NZnb76L0YKfamHhovS5iW6WCHiQuBOTJwmtSI/C57gJKIHRZ/2hwqdDRaybp1Trtt/WrXySGvdD4DzFz4KZW5kc3RyZWFtCmVuZG9iagoyMjUgMCBvYmogPDwvU3VidHlwZS9Gb3JtL0ZpbHRlci9GbGF0ZURlY29kZS9UeXBlL1hPYmplY3QvTWF0cml4Wz"+
    "EgMCAwIDEgMCAwXS9Gb3JtVHlwZSAxL1Jlc291cmNlczw8L1Byb2NTZXRbL1BERi9UZXh0L0ltYWdlQi9JbWFnZUMvSW1hZ2VJXS9Gb250PDwvSGVsdiAxODcgMCBSPj4+Pi9CQm94WzAgMCA0MS4zIDEzLjNdL0xlbmd0aCA4OT4+c3RyZWFtCnicK1QIVNAPqVBw8nVWKFQwAEITQz1jBUNjIFGUqhCukAcUdgpRMATLGSoYKZjoGRorhOQq6Huk5pQpmCuEpAEl0hU0wh01Q7LATNcQoKGBCq5AIwENwhW+CmVuZHN0cmVhbQplbmRvYmoKMjIwIDAgb2JqIDw8L1N1YnR5cGUvRm9ybS9GaWx0ZXIvRmxhdGVEZWNvZGUvVHlwZS9YT2JqZWN0L01hdHJpeFsxIDAgMCAxIDAgMF0vRm9ybVR5cGUgMS9SZXNvdXJjZXM8PC9Qcm9jU2V0Wy9QREYvVGV4dC9JbWFnZUIvSW1hZ2VDL0ltYWdlSV0vRm9udDw8L0hlbHYgMTg3IDAgUj4+Pj4vQkJveFswIDAgNjQuNDkgNi43NV0vTGVuZ3RoIDkzPj5zdHJlYW0KeJwdjDsKgDAQBa8ypTbRyPprI4KNhbDgCVQQFWIhHt9FXjVvYCITmb6EsSOS2ypx0lK5uuRemLnsD4r/pafAOynRk2xYjocaXU1sJG0jhaS6/9SrhSd6y35mOxZ9CmVuZHN0cmVhbQplbmRvYmoKMjEzIDAgb2JqIDw8L1N1YnR5cGUvRm9ybS9GaWx0ZXIvRmxhdGVEZWNvZGUvVHlwZS9YT2JqZWN0L01hdHJpeFsxIDAgMCAxIDAgMF0vRm9ybVR5cGUgMS9SZXNvdXJjZXM8PC9Qcm9jU2V0Wy9QREYvVGV4dC9JbWFnZUIvSW1hZ2VDL0ltYWdlSV0vRm9udDw8L0hlbHYgMTg3IDAgUj4+Pj4vQkJveFswIDAgNjYuMDEgMTEuNjZdL0xlbmd0aCA5MT4+c3RyZWFtCnicHczBCkBAFIXhV/mXbGZcauxHysZicuUJUEKxkMd309mc+uq/SHh9iX3DRWELwRWCiAuBe2biNIiK/CqUVK4q0QPfzftDjS4GK9k45Lr9t1XLJlqLfjhdFjoKZW5kc3RyZWFtCmVuZG9iagoxOTYgMCBvYmogPDwvU3VidHlwZS9Gb3JtL0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N1YnR5cGUvRm9ybS9NYXRyaXhbMS4wIDAuMCAwLjAgMS4wIDAuMCAwLjBdL1R5cGUvWE9iamVjdC9Gb3JtVHlwZSAxL1Jlc291cmNlczw8L1Byb2NTZXRbL1BERl0+Pi9CQm94WzAuMCAwLjAgMy4wIDEuMTkwMjVdL0xlbmd0aCAyMj4+c3RyZWFtCjEgZwowIDAgMyAxLjE5MDIgcmUKZgoKZW5kc3RyZWFtCmVuZG9iagoyMDggMCBvYmogPDwvU3VidHlwZS9Gb3JtL01hdHJpeFsxLjAgMC4wIDAuMCAxLjAgMC4wIDAuMF0vVHlwZS9YT2JqZWN0L0Zvcm1UeXBlIDEvUmVzb3VyY2VzPDwvUHJvY1NldFsvUERGXT4+L0JCb3hbMC4wIDAuMCAzLjAgNy40NjM1Nl0vTGVuZ3RoIDIyPj5zdHJlYW0KMSBnCjAgMCAzIDcuNDYzNiByZQpmCgplbmRzdHJlYW0KZW5kb2JqCjIxMCAwIG9iaiA8PC9TdWJ0eXBlL0Zvcm0vTWF0cml4WzEuMCAwLjAgMC4wIDEuMCAwLjAgMC4wXS9UeXBlL1hPYmplY3QvRm9ybVR5cGUgMS9SZXNvdXJjZXM8PC9Qcm9jU2V0Wy9QREZdPj4vQkJveFswLjAgMC4wIDMuMDEzNjMgNi41MzE5OF0vTGVuZ3RoIDI2Pj5zdHJlYW0KMSBnCjAgMCAzLjAxMzYgNi41MzIgcmUKZgoKZW5kc3RyZWFtCmVuZG9iagoyMTIgMCBvYmogPDwvU3VidHlwZS9Gb3JtL01hdHJpeFsxLjAgMC4wIDAuMCAxLjAgMC4wIDAuMF0vVHlwZS9YT2JqZWN0L0Zvcm1UeXBlIDEvUmVzb3VyY2VzPDwvUHJvY1NldFsvUERGXT4+L0JCb3hbMC4wIDAuMCAxNTAuODM2IDUuMTczMV0vTGVuZ3RoIDI4Pj5zdHJlYW0KMSBnCjAgMCAxNTAuODM2IDUuMTczMSByZQpmCgplbmRzdHJlYW0KZW5kb2JqCjIyMiAwIG9iaiA8PC9TdWJ0eXBlL0Zvcm0vTWF0cml4WzEuMCAwLjAgMC4wIDEuMCAwLjAgMC4wXS9UeXBlL1hPYmplY3QvRm9ybVR5cGUgMS9SZXNvdXJjZXM8PC9Qcm9jU2V0Wy9QREZdPj4vQkJveFswLjAgMC4wIDEwOC4wMDkgNi40MDld"+
    "L0xlbmd0aCAyOD4+c3RyZWFtCjEgZwowIDAgMTA4LjAwODggNi40MDkgcmUKZgoKZW5kc3RyZWFtCmVuZG9iagoyMjYgMCBvYmogPDwvU3VidHlwZS9Gb3JtL01hdHJpeFsxLjAgMC4wIDAuMCAxLjAgMC4wIDAuMF0vVHlwZS9YT2JqZWN0L0Zvcm1UeXBlIDEvUmVzb3VyY2VzPDwvUHJvY1NldFsvUERGXT4+L0JCb3hbMC4wIDAuMCAxMDguNzY4IDYuNV0vTGVuZ3RoIDI2Pj5zdHJlYW0KMSBnCjAgMCAxMDguNzY4MiA2LjUgcmUKZgoKZW5kc3RyZWFtCmVuZG9iagoyMjkgMCBvYmogPDwvU3VidHlwZS9Gb3JtL01hdHJpeFsxLjAgMC4wIDAuMCAxLjAgMC4wIDAuMF0vVHlwZS9YT2JqZWN0L0Zvcm1UeXBlIDEvUmVzb3VyY2VzPDwvUHJvY1NldFsvUERGL1RleHRdL0ZvbnQ8PC9IZWx2IDIzMCAwIFI+Pj4+L0JCb3hbMC4wIDAuMCAxOC41IDguNV0vTGVuZ3RoIDc5Pj5zdHJlYW0KL1R4IEJNQyAKcQoxIDEgMTYuNSA2LjUgcmUKVwpuCkJUCi9IZWx2IDYgVGYKMCBnCjIgMi4wMjQgVGQKKFBhZ2UpIFRqCkVUClEKRU1DCgplbmRzdHJlYW0KZW5kb2JqCjIzMiAwIG9iaiA8PC9TdWJ0eXBlL0Zvcm0vTWF0cml4WzEuMCAwLjAgMC4wIDEuMCAwLjAgMC4wXS9UeXBlL1hPYmplY3QvRm9ybVR5cGUgMS9SZXNvdXJjZXM8PC9Qcm9jU2V0Wy9QREYvVGV4dF0vRm9udDw8L0hlbHYgMjMzIDAgUj4+Pj4vQkJveFswLjAgMC4wIDkuNSA3LjVdL0xlbmd0aCA3Nj4+c3RyZWFtCi9UeCBCTUMgCnEKMSAxIDcuNSA1LjUgcmUKVwpuCkJUCi9IZWx2IDYgVGYKMCBnCjIgMS41MjQgVGQKKG9mKSBUagpFVApRCkVNQwoKZW5kc3RyZWFtCmVuZG9iagoyMzUgMCBvYmogPDwvU3VidHlwZS9Gb3JtL01hdHJpeFsxLjAgMC4wIDAuMCAxLjAgMC4wIDAuMF0vVHlwZS9YT2JqZWN0L0Zvcm1UeXBlIDEvUmVzb3VyY2Vz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";
  // this.solution1(pdfInBase64);
    // this.solution1(base64Data);
}
solution2(base64Data: any) {
  var arrBuffer = this.base64ToArrayBuffer(base64Data);
  var newBlob = new Blob([arrBuffer], {type: "application/pdf"});
  const nav = (window.navigator as any);
  if (window.navigator && nav.msSaveOrOpenBlob) {
  nav.msSaveOrOpenBlob(newBlob);
  return;
  }
  var data = window.URL.createObjectURL(newBlob);
  var link = document.createElement('a');
  document.body.appendChild(link); //required in FF, optional for Chrome
  link.href = data;
  link.target = '_blank';
  window.open(data,"_blank");      
  link.click();
  window.URL.revokeObjectURL(data);
  link.remove();
  }
solution1(base64Data: any) {

    var arrBuffer = this.base64ToArrayBuffer(base64Data);
    var newBlob = new Blob([arrBuffer], {type: "application/pdf"});
    const nav = (window.navigator as any);
    if (window.navigator && nav.msSaveOrOpenBlob) {
    nav.msSaveOrOpenBlob(newBlob);
    return;
    }
    var data = window.URL.createObjectURL(newBlob);
    var link = document.createElement('a');
    document.body.appendChild(link); //required in FF, optional for Chrome
    link.href = data;
    link.download = this.bolValue.bolReferenceNumber+".pdf";
    
    link.click();
    window.URL.revokeObjectURL(data);
    link.remove();
    }
    
    base64ToArrayBuffer(data: any) {
    var binaryString = window.atob(data);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
    var ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
    }
    return bytes;
    }


    changeByOrderModal(data: any) {
      this.getBolByIdNew(data);
      this.buildByOrderForm();
      this.dataSelected = data;
      this.showModal = false;
      console.log("test",this.dataSelected);
      
      if (this.dataSelected.uploadBol !== null) {
        this.byOrderForm.patchValue({
          bolUpload : this.dataSelected.uploadBol
        })
      } else {
        this.dataSelected.uploadBol = this.dataSelected.companyDetails.bolUpload;
        this.byOrderForm.patchValue({
          bolUpload : this.dataSelected.companyDetails.bolUpload
        })
      }


      if (this.dataSelected.uploadDelivery !== null) {
        this.byOrderForm.patchValue({
          deliveryUpload : this.dataSelected.uploadDelivery
        })
      } else {
        this.dataSelected.uploadDelivery = this.dataSelected.companyDetails.deliveryUpload;

        this.byOrderForm.patchValue({
          deliveryUpload : this.dataSelected.companyDetails.deliveryUpload
        })
      }


      if (this.dataSelected.uploadWeight !== null) {
        this.byOrderForm.patchValue({
          weightUpload : this.dataSelected.uploadWeight
        })
      } else {
        this.dataSelected.uploadWeight = this.dataSelected.companyDetails.weightUpload;
        this.byOrderForm.patchValue({
          weightUpload : this.dataSelected.companyDetails.weightUpload
        })
      }


      if (this.dataSelected.uploadInvoice !== null) {
        this.byOrderForm.patchValue({
          invoiceUpload : this.dataSelected.uploadInvoice
        })
      } else {
        this.dataSelected.uploadInvoice = this.dataSelected.companyDetails.invoiceUpload;

        this.byOrderForm.patchValue({
          invoiceUpload : this.dataSelected.companyDetails.invoiceUpload
        })
      }
      setTimeout(() => {
        this.showModal = true;

      }, 2000);
    


console.log(this.byOrderForm.value);
console.log(this.pdfValue);


      // $("#popup-Modal").modal('show');
    }

    changeDocumentView(event: any, type: any) {
      console.log(event);
      if (type === "BOL") {
        console.log(type,event.target.checked)
      this.byOrderForm.patchValue({
        bolUpload : event.target.checked
      })
    } else if (type === "Weight") {
      console.log(type,event.target.checked)

      this.byOrderForm.patchValue({
        weightUpload : event.target.checked
      })
    } else if (type === "Delivery") {
      console.log(type,event.target.checked)

      this.byOrderForm.patchValue({
        deliveryUpload : event.target.checked
      })
    } else if (type === "Invoice") {
      console.log(type,event.target.checked)

      this.byOrderForm.patchValue({
        invoiceUpload : event.target.checked
      })
    }
    }

    updateShippingDocuments() {
      console.log(this.byOrderForm.value);
      console.log(this.pdfValue);
      this.loading = true;

      this.pdfValue.uploadBol = this.byOrderForm.value.bolUpload;
      this.pdfValue.uploadDelivery = this.byOrderForm.value.deliveryUpload;
      this.pdfValue.uploadWeight = this.byOrderForm.value.weightUpload;
      this.pdfValue.uploadInvoice = this.byOrderForm.value.invoiceUpload;

      this.externalService.saveBolRepsonse(this.pdfValue).subscribe((res:any) => {
        console.log(res);
        this.loading = false;

        // this.myBolData[this.editTableValue].showWeight = false;

        Swal.fire('Shipping Documents!','Pro Number is updated to view/hide the shipping documents!','success');
        
      });
    }

    getBolYrc(data: any, type: any) {
      this.downloadOnlineOdf();
      console.log(data);
      let i:any;
      this.getBolByIdNew(data);
      this.loading = true;
      // console.log(this.pdfValue);

     
        setTimeout(() => {
          // if (this.pdfValue.bolDoc.length > 0) {
            console.log(this.pdfValue);
            if (type === "BOL") {
          if (this.pdfValue.bolPdfDoc !== null)  {
            // this.pdfValue.bolDoc.forEach((res) => {
              let datavalue = this.pdfValue.bolPdfDoc.split('-');
              this.loading = false;
              if (datavalue[0] === type) {
               let url = 'http://54.176.155.237:3000/api/container/bolDocuments/download/' + this.pdfValue.bolPdfDoc;
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
            //  })
           } 
             } else if (type ==="Delivery") {
            if (this.pdfValue.deliveryPdf !== null)  {
              // this.pdfValue.bolDoc.forEach((res) => {
                let datavalue = this.pdfValue.deliveryPdf.split('-');
                this.loading = false;

                if (datavalue[0] === type) {
                 let url = 'http://54.176.155.237:3000/api/container/bolDocuments/download/' + this.pdfValue.deliveryPdf;
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
              //  })
             } 
              } else if (type ==="Weight") {
              if (this.pdfValue.weightPdf !== null)  {
                // this.pdfValue.bolDoc.forEach((res) => {
                  let datavalue = this.pdfValue.weightPdf.split('-');
                  this.loading = false;

                  if (datavalue[0] === type) {
                   let url = 'http://54.176.155.237:3000/api/container/bolDocuments/download/' + this.pdfValue.weightPdf;
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
                //  })
               } 
              } else if (type ==="Invoice") {
                if (this.pdfValue.invoicePdf !== null)  {
                  // this.pdfValue.bolDoc.forEach((res) => {
                    let datavalue = this.pdfValue.invoicePdf.split('-');
                    this.loading = false;
  
                    // if (datavalue[0] === type) {
                     let url = 'http://54.176.155.237:3000/api/container/bolDocuments/download/' + this.pdfValue.invoicePdf;
                     console.log(url);
                     var link = document.createElement('a');
                     document.body.appendChild(link); //required in FF, optional for Chrome
                     link.href = url;
                     link.target = '_blank';
                    //  window.open(data,"_blank");      
                     link.click();
                    //  window.URL.revokeObjectURL(data);
                     link.remove();
               
                    // }
                  //  })
                 } 
                }
        }, 7000);
        // }
    }

  
      
      fileChanged(event: any, type: any) {
        if (type === 'BOL') {
          this.showuploadIcon = false;
          this.showuploadfileIcon = true;
          this.onlineBolFile = event.target.files;
          this.onlineBOlName = event.target.files[0].name;
          console.log(event);
          console.log(this.onlineBolFile);

        } else if (type === 'Delivery') {
          this.showuploadIconDelivery = false;
          this.deliveryFile = event.target.files;
          this.showuploadfileIconDelivery = true;

          this.deliveryFileName = event.target.files[0].name;
          console.log(event);
          console.log(this.deliveryFile);

        } else if (type === 'Weight') {
          this.showuploadIconWeight = false;
          this.weightFile = event.target.files;
          this.showuploadfileIconWeight = true;

          this.weightFileName = event.target.files[0].name;
          console.log(event);
          console.log(this.weightFileName);

        } else if (type === 'Invoice') {
          this.showuploadIconInvoice = false;
          this.invoiceFile = event.target.files;
          this.showuploadfileIconInvoice = true;

          this.invoiceFileName = event.target.files[0].name;
          console.log(event);
          console.log(this.invoiceFileName);

        }

      }
      uploadDocument(type: any) {
        // let Names = [];
        this.loading = true;
        if (type === 'BOL') {
        this.showFileIsUploaded = true;
        console.log(this.pdfValue);

        console.log(this.pdfValue.id);
        if (this.pdfValue.bolPdfDoc !== null ) {
         let bolFilename = type + '-' +this.pdfValue.bolReferenceNumber + '-' + this.pdfValue.companyId + '-' + this.onlineBOlName;
         this.Names.push(bolFilename);
         this.pdfValue.bolPdfDoc = bolFilename;
         console.log(this.pdfValue);
         this.externalService.saveBolRepsonse(this.pdfValue).subscribe((res:any) => {
           console.log(res);
           if (res !== undefined) {
             var formData = new FormData();
             formData.append('file[]', this.onlineBolFile[0], bolFilename);
             this.externalService.uploadPictures(formData).subscribe((ele:any) => {
               console.log(ele);
               if (ele !== undefined) {
                this.loading = false;
                this.showuploadfileIcon = false;

                this.myBolData[this.editTableValue].showOnlineBol = true;

                 Swal.fire('Online BOL!','Online BOL has been saved successfully to the Pro Number','success'); 
                               }
             })
           }
         })
      //  } 
        
        } else {
          let bolFilename = type + '-' +this.pdfValue.bolReferenceNumber + '-' + this.pdfValue.companyId + '-' + this.onlineBOlName;
          this.Names.push(bolFilename);
          this.pdfValue.bolPdfDoc = bolFilename;
          console.log(this.pdfValue);
          this.externalService.saveBolRepsonse(this.pdfValue).subscribe((res:any) => {
            console.log(res);
            if (res !== undefined) {
              var formData = new FormData();
              formData.append('file[]', this.onlineBolFile[0], bolFilename);
              this.externalService.uploadPictures(formData).subscribe((ele:any) => {
                console.log(ele);
                if (ele !== undefined) {
                  this.loading = false;
                  this.myBolData[this.editTableValue].showOnlineBol = true;
                  this.showuploadfileIcon = false;

                  Swal.fire('Online BOL!','Online BOL has been saved successfully to the Pro Number','success');    
                            }
              })
            }
          })
        }
      } else  if (type === 'Delivery') {
        this.showFileIsUploadedDelivery = true;
        console.log(this.pdfValue.id);
        if (this.pdfValue.deliveryPdf !== null ) {
      //  if (this.pdfValue.bolDoc.length > 0) {
        // this.Names = this.pdfValue.bolDoc;
        //  this.pdfValue.bolDoc.forEach((el, index) => {
        //    let stringedData = el.split('-');
        //    if (stringedData[0]==='Delivery')  {
        //    this.pdfValue.bolDoc.splice(index,1);
        //    this.Names.splice(index,1);
        //    }
        //  })
         let bolFilename = type + '-' +this.pdfValue.bolReferenceNumber + '-' + this.pdfValue.companyId + '-' +this.deliveryFileName;
         this.Names.push(bolFilename);
         this.pdfValue.deliveryPdf = bolFilename;
         console.log(this.pdfValue);
         this.externalService.saveBolRepsonse(this.pdfValue).subscribe((res:any) => {
           console.log(res);
           if (res !== undefined) {
             var formData = new FormData();
             formData.append('file[]', this.deliveryFile[0], bolFilename);
             this.externalService.uploadPictures(formData).subscribe((ele:any) => {
               console.log(ele);
               if (ele !== undefined) {
                this.loading = false;
                this.myBolData[this.editTableValue].showDelivery = true;
                this.showuploadfileIconDelivery = false;

                 Swal.fire('Delivery Receipt!','Delivery Receipt  has been saved successfully to the Pro Number','success');
                                }
             })
           }
         })
      //  } 
        
        } else {
          let bolFilename =type + '-' +this.pdfValue.bolReferenceNumber + '-' + this.pdfValue.companyId + '-' + this.deliveryFileName;
          // this.Names.push(bolFilename);
          this.pdfValue.deliveryPdf = bolFilename;
          console.log(this.pdfValue);
          this.externalService.saveBolRepsonse(this.pdfValue).subscribe((res:any) => {
            console.log(res);
            if (res !== undefined) {
              var formData = new FormData();
              formData.append('file[]', this.deliveryFile[0], bolFilename);
              this.externalService.uploadPictures(formData).subscribe((ele:any) => {
                console.log(ele);
                if (ele !== undefined) {
                  this.loading = false;
                  this.myBolData[this.editTableValue].showDelivery = true;
                  this.showuploadfileIconDelivery = false;
                  Swal.fire('Delivery Receipt!','Delivery Receipt  has been saved successfully to the Pro Number','success');
                }
              })
            }
          })
        }
      } else  if (type === 'Weight') {
        this.showFileIsUploadedWeight = true;
        console.log(this.pdfValue.id);
        if (this.pdfValue.weightPdf !== null ) {
      //  if (this.pdfValue.bolDoc.length > 0) {
        // this.Names = this.pdfValue.bolDoc;

        //  this.pdfValue.bolDoc.forEach((el, index) => {
        //    let stringedData = el.split('-');
        //    if (stringedData[0]==='Weight')  {
        //    this.pdfValue.bolDoc.splice(index,1);
        //    this.Names.splice(index,1);
           
        //    }
        //  })
         let bolFilename = type + '-' +this.pdfValue.bolReferenceNumber + '-' + this.pdfValue.companyId + '-' + this.weightFileName;
        //  this.Names.push(bolFilename);
         this.pdfValue.weightPdf = bolFilename;
         console.log(this.pdfValue);
         this.externalService.saveBolRepsonse(this.pdfValue).subscribe((res:any) => {
           console.log(res);
           if (res !== undefined) {
             var formData = new FormData();
             formData.append('file[]', this.weightFile[0], bolFilename);
             this.externalService.uploadPictures(formData).subscribe((ele:any) => {
               console.log(ele);
               if (ele !== undefined) {
                this.loading = false;
                // this.localStorageSalesData();
this.myBolData[this.editTableValue].showWeight = true;
this.showuploadfileIconWeight = false;

                 Swal.fire('Weight Inspection!','Weight Inspection  has been saved successfully to the Pro Number','success',);
                                }
             })
           }
         })
      
        
        } else {
          let bolFilename = type + '-' +this.pdfValue.bolReferenceNumber + '-' + this.pdfValue.companyId + '-' +this.weightFileName;
          // this.Names.push(bolFilename);
          this.pdfValue.weightPdf = bolFilename;
          console.log(this.pdfValue);
          this.externalService.saveBolRepsonse(this.pdfValue).subscribe((res:any) => {
            console.log(res);
            if (res !== undefined) {
              var formData = new FormData();
              formData.append('file[]', this.weightFile[0], bolFilename);
              this.externalService.uploadPictures(formData).subscribe((ele:any) => {
                console.log(ele);
                if (ele !== undefined) {
                  this.loading = false;
                  this.myBolData[this.editTableValue].showWeight = true;
                  this.showuploadfileIconWeight = false;

                  Swal.fire('Weight Inspection!','Weight Inspection  has been saved successfully to the Pro Number','success',);
                }
              })
            }
          })
        }
      } 
//       else  if (type === 'Invoice') {
//         this.showFileIsUploadedInvoice = true;
//         console.log(this.pdfValue.id);
//         if (this.pdfValue.invoicePdf !== null ) {
//       //  if (this.pdfValue.bolDoc.length > 0) {
//         // this.Names = this.pdfValue.bolDoc;

//         //  this.pdfValue.bolDoc.forEach((el, index) => {
//         //    let stringedData = el.split('-');
//         //    if (stringedData[0]==='Weight')  {
//         //    this.pdfValue.bolDoc.splice(index,1);
//         //    this.Names.splice(index,1);
           
//         //    }
//         //  })
//          let bolFilename = type + '-' +this.pdfValue.bolReferenceNumber + '-' + this.pdfValue.companyId + '-' + this.invoiceFileName;
//         //  this.Names.push(bolFilename);
//          this.pdfValue.invoicePdf = bolFilename;
//          console.log(this.pdfValue);
//          this.externalService.saveBolRepsonse(this.pdfValue).subscribe((res:any) => {
//            console.log(res);
//            if (res !== undefined) {
//              var formData = new FormData();
//              formData.append('file[]', this.invoiceFile[0], bolFilename);
//              this.externalService.uploadPictures(formData).subscribe((ele:any) => {
//                console.log(ele);
//                if (ele !== undefined) {
//                 this.loading = false;
//                 // this.localStorageSalesData();
// this.myBolData[this.editTableValue].showInvoice = true;
// this.showuploadfileIconInvoice = false;

//                  swal({
//                            title: 'Invoice!',
//                            text: 'Invoice  has been saved successfully to the Pro Number',
//                            icon: 'success',
//                          });                }
//              })
//            }
//          })
      
        
//         } else {
//           let bolFilename = type + '-' +this.pdfValue.bolReferenceNumber + '-' + this.pdfValue.companyId + '-' +this.invoiceFileName;
//           // this.Names.push(bolFilename);
//           this.pdfValue.invoicePdf = bolFilename;
//           console.log(this.pdfValue);
//           this.externalService.saveBolRepsonse(this.pdfValue).subscribe((res:any) => {
//             console.log(res);
//             if (res !== undefined) {
//               var formData = new FormData();
//               formData.append('file[]', this.invoiceFile[0], bolFilename);
//               this.externalService.uploadPictures(formData).subscribe((ele:any) => {
//                 console.log(ele);
//                 if (ele !== undefined) {
//                   this.loading = false;
//                   this.myBolData[this.editTableValue].showInvoice = true;
//                   this.showuploadfileIconInvoice = false;

//                   swal({
//                             title: 'Invoice!',
//                             text: 'Invoice  has been saved successfully to the Pro Number',
//                             icon: 'success',
//                           });                }
//               })
//             }
//           })
//         }
//       }
      // this.localStorageSalesData();
    }
    getBolByIdNew(data: any) {
      this.externalService.getMyBolTypeById(this.accessToken, data.id).subscribe((data: any) => {
        console.log(data);
        this.pdfValue = data[0];
      });
    }

      getBolById(data: any, index: any) {
       console.log(index);
       console.log(data.tempId);
       this.showuploadIcon = true;
          // showFileIsUploaded = false;
          this.showuploadIconDelivery = true;
          // showFileIsUploadedDelivery = false;
          this.showuploadIconWeight = true;
          this.showuploadIconInvoice = true;
        if (index !== undefined) {
          this.editTableValue = index;
        }
        this.externalService.getMyBolTypeById(this.accessToken, data.id).subscribe((data: any) => {
          console.log(data);
          this.pdfValue = data[0];
          let res;
          if (this.pdfValue.bolPdfDoc !== null) {
            let splittedValue = this.pdfValue.bolPdfDoc.split('-');
            if (splittedValue[0]==='BOL') {
              this.showuploadIcon = false;
              
              if (splittedValue.length > 4) {
                let dataname = '';
                dataname = splittedValue[3]

                splittedValue.forEach((ele: any, index: any) => {
                 if (index > 3 ) {
                dataname = dataname + '-' + splittedValue[index];
                console.log(dataname);

                }
                });
                this.onlineBOlName = dataname;
              } else {
              this.onlineBOlName = splittedValue[3];
              }

            }
          } else {
            this.showuploadIcon = true;
          }
          if (this.pdfValue.deliveryPdf !== null) {
            let splittedValue = this.pdfValue.deliveryPdf.split('-');
            if (splittedValue[0]==='Delivery') {
              this.showuploadIconDelivery = false;
              if (splittedValue.length > 4) {
                let dataname = '';
                dataname = splittedValue[3]

                splittedValue.forEach((ele: any, index: any) => {
                 if (index > 3 ) {
                dataname = dataname + '-' + splittedValue[index];
                console.log(dataname);

                }
                });
                this.deliveryFileName = dataname;
              } else {
              this.deliveryFileName = splittedValue[3];
              }
            }
          } else {
            this.showuploadIconDelivery = true;
          }

          if (this.pdfValue.weightPdf !== null) {
            let splittedValue = this.pdfValue.weightPdf.split('-');

            if (splittedValue[0]==='Weight') {
              this.showuploadIconWeight = false;
              if (splittedValue.length > 4) {
                let dataname = '';
                dataname = splittedValue[3]

                splittedValue.forEach((ele: any, index: any) => {
                 if (index > 3 ) {
                dataname = dataname + '-' + splittedValue[index];
                console.log(dataname);

                }
                });
                this.weightFileName = dataname;
              } else {
              this.weightFileName = splittedValue[3];
              }
            }

          } else {
            this.showuploadIconWeight = true;
          }
          if (this.pdfValue.invoicePdf !== null) {
            let splittedValue = this.pdfValue.invoicePdf.split('-');
              this.showuploadIconInvoice = false;
              this.invoiceFileName =this.pdfValue.invoicePdf
          } else {
            this.showuploadIconInvoice = true;
          }
            
        
        });
      }

      deleteCarrierdataRequest(name: any,type: any) {
        if (type === 'BOL') {

        }

        Swal.fire("Are you sure ?","Do you want to delete this file?","warning",
        //  buttons: {
        //     cancel: 'No',
        //     confirm: "Yes",
        //   }
        // }
        ).then((willDelete) => {
          if (willDelete) {
           this.deleteCarrierdata(name, type);
          } else {
            Swal.fire('',"Deletion of file has been cancelled", "error");
          }
        });
      }

      deleteCarrierdata(name: any, type: any) {
        this.loading = true;

        console.log(this.pdfValue);
        if (this.pdfValue.bolPdfDoc !== null || this.pdfValue.deliveryPdf !== null || this.pdfValue.weightPdf !== null || this.pdfValue.invoicePdf !== null ) {
          // this.pdfValue.bolDoc.forEach((ele,index) => {
          //   let splittValue = ele.split('-');
          //   if (splittValue[0] === type) {
              if (type === 'BOL') {
                this.onlineBOlName= '';
                this.showuploadIcon= true;
                // this.pdfValue.bolDoc.splice(index,1);
                // if (this.pdfValue.bolDoc.length === 0) {
                  this.pdfValue.bolPdfDoc = null;
                // }
                this.externalService.saveBolRepsonse(this.pdfValue).subscribe((res:any) => {
                  console.log(res);
                  this.loading = false;

                  this.myBolData[this.editTableValue].showOnlineBol = false;
        //  this.localStorageSalesData();
                  Swal.fire('Online BOL!','Online Bol file deleted Sucessfully!','success');
                  
                });
              } else if (type === 'Delivery') {
                this.deliveryFileName= '';
                this.showuploadIconDelivery= true;
                // this.pdfValue.bolDoc.splice(index,1);
                // if (this.pdfValue.bolDoc.length === 0) {
                  this.pdfValue.deliveryPdf = null;
                // }
                this.externalService.saveBolRepsonse(this.pdfValue).subscribe((res:any) => {
                  console.log(res);
                  this.loading = false;
                  this.myBolData[this.editTableValue].showDelivery = false;
                  // this.localStorageSalesData();

                  Swal.fire('Delivery Receipt!','Delivery Receipt file deleted Sucessfully!','success');
                  
                });
              } else if (type === 'Weight') {
                this.weightFileName= '';
                this.showuploadIconWeight= true;
                // this.pdfValue.bolDoc.splice(index,1);
                // if (this.pdfValue.bolDoc.length === 0) {
                  this.pdfValue.weightPdf = null;
                // }
                this.externalService.saveBolRepsonse(this.pdfValue).subscribe((res:any) => {
                  console.log(res);
                  this.loading = false;

                  this.myBolData[this.editTableValue].showWeight = false;

                  Swal.fire({
                            title: 'Weight Inspection Report!',
                            text: 'Weight Inspection Report file deleted Sucessfully!',
                            icon: 'success',
                          });
                  
                });
              }  else if (type === 'Invoice') {
                this.invoiceFileName= '';
                this.showuploadIconInvoice = true;
                // this.pdfValue.bolDoc.splice(index,1);
                // if (this.pdfValue.bolDoc.length === 0) {
                  this.pdfValue.invoicePdf = null;
                // }
                this.externalService.saveBolRepsonse(this.pdfValue).subscribe((res:any) => {
                  console.log(res);
                  this.loading = false;

                  this.myBolData[this.editTableValue].showInvoice = false;

                  Swal.fire({
                            title: 'Invoice!',
                            text: 'Invoice file deleted Sucessfully!',
                            icon: 'success',
                          });
                  
                });
              }
          //   }

          // })

        } else {
          this.loading = false;

          if (type === 'BOL') {
            this.onlineBOlName= '';
            this.showuploadIcon= true;

          } else if (type === 'Delivery') {
            this.deliveryFileName= '';
            this.showuploadIconDelivery= true;
          } else if (type === 'Weight') {
            this.weightFileName= '';
            this.showuploadIconWeight= true;
          } else if (type === 'Invoice') {
            this.invoiceFileName = '';
            this.showuploadIconInvoice = true;
          }

        }
    
      }

}

