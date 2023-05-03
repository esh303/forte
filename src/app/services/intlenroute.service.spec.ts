import { TestBed, inject } from '@angular/core/testing';

import { IntlenrouteService } from './intlenroute.service';

describe('IntlenrouteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntlenrouteService]
    });
  });

  it('should ...', inject([IntlenrouteService], (service: IntlenrouteService) => {
    expect(service).toBeTruthy();
  }));
});
