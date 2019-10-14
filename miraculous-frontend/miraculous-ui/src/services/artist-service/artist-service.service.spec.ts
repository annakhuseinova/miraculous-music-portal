import { TestBed } from '@angular/core/testing';

import { ArtistServiceService } from './artist-service.service';

describe('ArtistServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistServiceService = TestBed.get(ArtistServiceService);
    expect(service).toBeTruthy();
  });
});
