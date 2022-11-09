/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { YearService } from './year.service';

describe('Service: Year', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YearService]
    });
  });

  it('should ...', inject([YearService], (service: YearService) => {
    expect(service).toBeTruthy();
  }));
});
