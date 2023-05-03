import { TestBed, inject } from '@angular/core/testing';

import { DomesticenrouteService } from './domesticenroute.service';

describe('DomesticenrouteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomesticenrouteService]
    });
  });

  it('should ...', inject([DomesticenrouteService], (service: DomesticenrouteService) => {
    expect(service).toBeTruthy();
  }));
});
