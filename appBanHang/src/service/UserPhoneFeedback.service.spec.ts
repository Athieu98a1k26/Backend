/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserPhoneFeedbackService } from './UserPhoneFeedback.service';

describe('Service: UserPhoneFeedback', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserPhoneFeedbackService]
    });
  });

  it('should ...', inject([UserPhoneFeedbackService], (service: UserPhoneFeedbackService) => {
    expect(service).toBeTruthy();
  }));
});
