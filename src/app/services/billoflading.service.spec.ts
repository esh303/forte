import { TestBed, inject } from '@angular/core/testing';

import { BillofladingService } from './billoflading.service';

describe('BillofladingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillofladingService]
    });
  });

  it('should ...', inject([BillofladingService], (service: BillofladingService) => {
    expect(service).toBeTruthy();
  }));
});
