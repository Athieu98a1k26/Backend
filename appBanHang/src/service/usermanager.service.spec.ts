/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsermanagerService } from './usermanager.service';

describe('Service: Usermanager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsermanagerService]
    });
  });

  it('should ...', inject([UsermanagerService], (service: UsermanagerService) => {
    expect(service).toBeTruthy();
  }));
});
