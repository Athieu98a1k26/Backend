/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MenumanagerService } from './menumanager.service';

describe('Service: Menumanager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenumanagerService]
    });
  });

  it('should ...', inject([MenumanagerService], (service: MenumanagerService) => {
    expect(service).toBeTruthy();
  }));
});
