// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { LoggerService } from '../services/logger.service';
import { PricingInfoService } from '../services/pricing-info.service';

@Component({
  selector: 'app-internalviewnew',
  templateUrl: './internalviewnew.component.html',
  styleUrls: ['./internalviewnew.component.css']
})
export class InternalviewnewComponent implements OnInit {
  emergencyStop: any = true;
  emergencyStopYRC:any = true;
  emergencyStopPriority:any = true;
  emergencyStopEconomy:any = true;
  emergencyStopReddaway:any = true;
  transportOrigin: FormGroup = new FormGroup({});
  APForm: FormGroup = new FormGroup({});
  ARForm: FormGroup = new FormGroup({});
  formForOthers: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder,
    private pricingInfoService: PricingInfoService,
    private loggerService: LoggerService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.ngbuild();
  }
  ngbuild() {
    this.transportOrigin = this.formBuilder.group({
      origin: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      destination: ['', [Validators.minLength(5), Validators.maxLength(5)]],
      classification: ['', [Validators.minLength(1), Validators.maxLength(6)]],
      weight: ['', [Validators.minLength(1), Validators.maxLength(6)]],
      customer: ['', [Validators.required]],
      ratingNotes: ['', [Validators.required]]
    });
    this.APForm = this.formBuilder.group({
      id: [''],
      apCompany: [''],
      apDiscount: [''],
      apFsc: [''],
      apAmc: ['']
    });
    this.ARForm = this.formBuilder.group({
      id: [''],
      arCompany: [''],
      arDiscount: [''],
      arFsc: [''],
      arAmc: ['']
    });
    this.formForOthers = this.formBuilder.group({
      reason: ['', [Validators.required]],
      amountIncDec: ['increment', [Validators.required]],
      amount: ['', [Validators.required]]
    });
    this.getAllCompanyNotes();
  }

  getAllCompanyNotes() {
    // this.customerService.getCompanyDetails(this.accessToken).subscribe(getCustomerData => {
    //   this.customerFeaturesAll = getCustomerData;
    //   // this.customerFeaturesAll.sort(this.dynamicSort('companyName'));
    //   console.log('this.customerFeatures', this.customerFeaturesAll);
    //   this.logger = { 'method': 'getCompanyDetails', 'message': 'Customers', 'CustomerDetail ': 'All' };
    //   this.loggerService.info(this.logger);
    // });
  }

}
