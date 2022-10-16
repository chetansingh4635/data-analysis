import { TestBed } from '@angular/core/testing';

import { DerivativeSegmentService } from './derivative-segment.service';

describe('DerivativeSegmentService', () => {
  let service: DerivativeSegmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DerivativeSegmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
