import { TestBed, inject } from '@angular/core/testing';

import { InternalScreeningService } from './internal-screening.service';

// import { HttpModule } from '@angular/http';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

describe('InternalScreeningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternalScreeningService],
      imports: [  HttpClientModule ]
    });
  });

  it('should ...', inject([InternalScreeningService], (service: InternalScreeningService) => {
    expect(service).toBeTruthy();
  }));
});
