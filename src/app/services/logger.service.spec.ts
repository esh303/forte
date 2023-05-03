import { TestBed, inject } from '@angular/core/testing';

import { LoggerService } from './logger.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('LoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService],
      imports: [ HttpClientModule, HttpModule ]
    });
  });

  it('should ...', inject([LoggerService], (service: LoggerService) => {
    expect(service).toBeTruthy();
  }));
});
