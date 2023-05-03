import { TestBed, inject } from '@angular/core/testing';

import { PricingInfoService } from './pricing-info.service';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

describe('PricingInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PricingInfoService],
      imports: [ HttpModule, HttpClientModule ]
    });
  });

  it('should ...', inject([PricingInfoService], (service: PricingInfoService) => {
    expect(service).toBeTruthy();
  }));
});
