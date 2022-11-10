/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CombineService } from './combine.service';

describe('Service: Combine', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CombineService]
    });
  });

  it('should ...', inject([CombineService], (service: CombineService) => {
    expect(service).toBeTruthy();
  }));
});
