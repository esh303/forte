import { Component, OnInit } from '@angular/core';
import { PricingInfoService } from '../services/pricing-info.service';
import { LoggerService } from '../services/logger.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-salesrep',
  templateUrl: './create-salesrep.component.html',
  styleUrls: ['./create-salesrep.component.css']
})
export class CreateSalesrepComponent implements OnInit {
  salesRepForm: FormGroup = new FormGroup({});
  public salesRep:any;
  public salesRepValues:any;
  public salesRepId:any;
  public salesRepType:any;
  public accessToken:any;
  public logger:any;
  public response:any;
  constructor(private pricingInfoService: PricingInfoService, private router: Router,
              private fb: FormBuilder, private loggerService: LoggerService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.buildForm();
    this.salesRepData();
  }

  buildForm() {
    this.salesRepForm = this.fb.group({
      salesRepName: ['', [Validators.required]],
      salesRepId: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      type: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  salesRepData() {
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.accessToken = localStorage.getItem(('accessToken'));
    this.salesRepValues = JSON.parse(this.salesRep);
    this.salesRepId = this.salesRepValues.id;
    this.salesRepType = this.salesRepValues.type;
  }

 saveSalesRep(data:any) {
    const salesRepData = {
      'email' : data.email,
      'mobileNumber': data.mobileNumber,
      'password': data.password,
      'salesRepId': data.salesRepId,
      'salesRepName': data.salesRepName,
      'type': data.type,
      'invalidLoginAttempt': 0
    };
    this.pricingInfoService.createSalesRep(salesRepData, this.accessToken).subscribe( (response:any) => {
      this.response = response;
      if (this.response.result === true) {
        this.toastr.success('Created Successfully');
        this.router.navigate(['/internal']);
      }
      this.logger = { 'method': 'createSalesRep', 'message': 'Calling createSalesRep method',
        'accessToken': this.accessToken };
      this.loggerService.info(this.logger);
    });
  }

}
