import { TestBed } from '@angular/core/testing';

import { FuturesSegmentService } from './futures-segment.service';

describe('FuturesSegmentService', () => {
  let service: FuturesSegmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuturesSegmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
