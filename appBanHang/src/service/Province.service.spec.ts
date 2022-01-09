/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProvinceService } from './Province.service';

describe('Service: Province', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProvinceService]
    });
  });

  it('should ...', inject([ProvinceService], (service: ProvinceService) => {
    expect(service).toBeTruthy();
  }));
});
