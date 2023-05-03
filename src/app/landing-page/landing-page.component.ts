import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PricingInfoService } from '../services/pricing-info.service';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public token: any;
  public customerDetails:any;
  public logger = {};
  constructor(private router: Router,
    private route: ActivatedRoute,
    private pricingInfoService: PricingInfoService,
    private loggerService: LoggerService) { }

  ngOnInit() {
    this.callFunction();
  }

  callFunction() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token && this.token !== '') {
        // validate token
        this.pricingInfoService.customerValidation(this.token).subscribe((data:any) => {
          this.customerDetails = data;
          // success --  redirect to Main landing Page
          localStorage.setItem('Logistics', this.token);
          this.router.navigate(['/home']);
        }, (err:any) => {
          if (err.status === 0) {
            this.router.navigate(['/internalsalesreplogin']);
          }
          this.logger = {
            'method': 'customerValidation', 'message': 'checking whether the access token is valid',
            'accessToken': this.token
          };
          this.loggerService.info(this.logger);
        });
      } else {
        //  Add Error Page on it
        if (localStorage.getItem('Logistics') !== null) {
          this.token = localStorage.getItem('Logistics');
          this.pricingInfoService.customerValidation(this.token).subscribe((newData:any) => {
            this.customerDetails = newData;
            // success --  redirect to Main landing Page
            this.router.navigate(['/home']);
          }, (err:any) => {
            if (err.status === 0) {
              this.router.navigate(['/home']);
            }
          });
        } else {
          //  change to internalsalesreplogin
          this.router.navigate(['/internalsalesreplogin']);
        }
      }
      this.logger = { 'method': 'customerValidation', 'message': 'the access token is Invalid or undefined', 'accessToken': this.token };
      this.loggerService.info(this.logger);
    });
  }
}
