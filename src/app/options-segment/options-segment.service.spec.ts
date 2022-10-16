import { TestBed } from '@angular/core/testing';

import { OptionsSegmentService } from './options-segment.service';

describe('OptionsSegmentService', () => {
  let service: OptionsSegmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionsSegmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
