import { TestBed } from '@angular/core/testing';

import { CashSegmentService } from './cash-segment.service';

describe('CashSegmentService', () => {
  let service: CashSegmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashSegmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
