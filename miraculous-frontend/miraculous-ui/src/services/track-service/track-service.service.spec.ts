import { TestBed } from '@angular/core/testing';

import { TrackServiceService } from './track-service.service';

describe('TrackServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrackServiceService = TestBed.get(TrackServiceService);
    expect(service).toBeTruthy();
  });
});
