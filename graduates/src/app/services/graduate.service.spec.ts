/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GraduateService } from './graduate.service';

describe('Service: Graduate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraduateService]
    });
  });

  it('should ...', inject([GraduateService], (service: GraduateService) => {
    expect(service).toBeTruthy();
  }));
});
