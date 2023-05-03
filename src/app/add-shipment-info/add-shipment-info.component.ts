import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { WebserviceService } from '../services/webservice.service';
import { PricingInfoService } from '../services/pricing-info.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-shipment-info',
  templateUrl: './add-shipment-info.component.html',
  styleUrls: ['./add-shipment-info.component.css']
})
export class AddShipmentInfoComponent implements OnInit {
  addShipmentForm: FormGroup = new FormGroup({});
  public salesRep: any;
  public accessToken: any;
  public salesRepValues: any;
  public salesRepType: any;
  public customerType: any;
  public getPlaces: any;
  public inValidOriginZipcode = false;
  public inValidDestZipcode = false;
  public resultData: any;
  public loader = false;
  public showCarrierName = false;
  constructor(private fb: FormBuilder, 
    private webserviceService: WebserviceService,
    private pricingInfoService : PricingInfoService,
  private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.buildForm();
    this.localStorage();
  }
  buildForm() {
    this.addShipmentForm = this.fb.group({
      shipperZip: ['', [Validators.required]],
      consigneeZip: ['', [Validators.required]],
      consignee: ['', [Validators.required]],
      bolCarrier: ['', [Validators.required]],
      otherCarrierName: [''],
      bolTrackingNumber: ['', [Validators.required]],
      shipperCity: [''],
      shipperState: [''],
      consigneeCity: [''],
      consigneeState: [''],
      salesRepId: [''],
      companyId: [],
      customerId: []
        });
  }

  getCityState(zip: any, type: any) {
    this.getPlaces = {};
    this.inValidOriginZipcode = false;
    this.inValidDestZipcode = false;
    this.pricingInfoService.getCityState(zip).subscribe((response:any)=>{
      this.getPlaces = response[0];
      console.log('this.getPlaces', this.getPlaces);
      if (this.getPlaces) {
      if (type === 'shipper') {
        this.addShipmentForm.patchValue({
          shipperState: this.getPlaces.state,
          shipperCity: this.getPlaces.city
        });
      } else {
        this.addShipmentForm.patchValue({
          consigneeState: this.getPlaces.state,
          consigneeCity: this.getPlaces.city
        });
      }
    } else {
      if (type === 'shipper') {
        this.addShipmentForm.patchValue({
          shipperState: '',
          shipperCity: '',
          shipperZip: ''
        });
        this.inValidOriginZipcode = true;
      } else {
        this.addShipmentForm.patchValue({
          consigneeCity: '',
          consigneeState: '',
          consigneeZip: ''
        });
        this.inValidDestZipcode = true;
      }
    }
    });
  }
  localStorage() {
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.accessToken = localStorage.getItem(('accessToken'));
    this.salesRepValues = JSON.parse(this.salesRep);
    console.log('this.salesRepValues', this.salesRepValues);
    this.salesRepType = this.salesRepValues.type;
    this.customerType = localStorage.getItem(('customerType'));
    this.addShipmentForm.patchValue({
      salesRepId: this.salesRepValues.salesRepId,
      customerId: this.salesRepValues.id,
      companyId: this.salesRepValues.companyId
    })
  }

  saveOtherCarriers(form: any) {
    console.log('form', form);
    let object = form;
    this.loader = true;
    
    if (object.bolCarrier !== 'OTHERS' ) {
      object.otherCarrierName = form.bolCarrier;
      object.bolCarrier = 'OTHERS';
    } else {
      
    }
    console.log('form New', object);
     this.webserviceService.addShipmentCarrier(object, this.accessToken).subscribe((response: any) => {
       console.log('response', response);
       this.loader = false;
       this.resultData = response;
       if (this.resultData.result === true) {
        this.toastr.success('Shipments has been added successfully');
        this.router.navigate(['/shipments']);
       } else {
        this.loader = false;
        this.toastr.error('Failed to add Shipments');
       }
    }, (err: any) => {
      this.loader = false;
      this.toastr.error('Failed to add Shipments');

    });
  }

  clear() {
    this.addShipmentForm.patchValue({
      shipperZip: '',
      consigneeZip: '',
      consignee: '',
      otherCarrierName: '',
      bolTrackingNumber: '',
      shipperCity: '',
      shipperState: '',
      consigneeCity: '',
      consigneeState: '',
    });
  }
  checkForBolCarrier(value: any) {
    this.showCarrierName = false;
    if (value === 'OTHERS') {
      this.showCarrierName = true;
    } else {
      this.showCarrierName = false;
    }
  }
}
