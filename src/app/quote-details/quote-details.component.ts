import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PricingInfoService } from '../services/pricing-info.service';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.css']
})
export class QuoteDetailsComponent implements OnInit {
  public token: any;
  public responseData: any;
  public showTable = false;
  public quikeQuote = false;
  public fullQuote = false;
  public nonVolumeType = false;
  public volumeType = false;
  public loader = true;
  public weightTotal = 0;
  public piecesTotal = 0;
  public showLoader = false;
  hazmat:any;
  upDateSuccess: any = false;
  forOther: any = false;
  constructor(private pricingInfoService: PricingInfoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.callFunction();
  }

  callFunction() {
    this.route.queryParams.subscribe( (params: any) => {
      console.log('params', params.token);
      this.token = params['token'];
      console.log('this.token', this.token);
      this.pricingInfoService.quoteMailValidation(this.token).subscribe((data: any) => {
        console.log('data', data);
          this.responseData = data.result;
          if (this.responseData.length > 0) {
            this.responseData = this.responseData[0];
            if (this.responseData.quoteType === 'Quickie quote') {
              this.quikeQuote = true;
              this.fullQuote = false;
              this.nonVolumeType = true;
              this.volumeType = false;
            } else {
              this.fullQuote = true;
              this.quikeQuote = false;
              this.nonVolumeType = false;
              this.volumeType = true;
            }
            this.responseData.lineItem = JSON.parse(this.responseData.lineItem);
            console.log('this.responseData', this.responseData);
            this.loader = false;
            this.showTable = true;
            for (let n = 0; n < this.responseData.lineItem.length; n++) {

              this.weightTotal += Number(this.responseData.lineItem[n].Weight.Value);
              console.log('Weight', Number(this.responseData.lineItem[n].Weight.Value));
              console.log('weightTotal', this.weightTotal);
              this.piecesTotal += Number(this.responseData.lineItem[n].Pieces);
              console.log('piecesTotal', this.piecesTotal);
            }
          }
      });
    });
  }

}
