/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AboutService } from './About.service';

describe('Service: About', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AboutService]
    });
  });

  it('should ...', inject([AboutService], (service: AboutService) => {
    expect(service).toBeTruthy();
  }));
});
