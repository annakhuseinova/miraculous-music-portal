import { TestBed } from '@angular/core/testing';

import { GenreServiceService } from './genre-service.service';

describe('GenreServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenreServiceService = TestBed.get(GenreServiceService);
    expect(service).toBeTruthy();
  });
});
