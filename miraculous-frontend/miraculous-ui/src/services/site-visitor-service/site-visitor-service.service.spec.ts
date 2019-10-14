import { TestBed } from '@angular/core/testing';

import { SiteVisitorServiceService } from './site-visitor-service.service';

describe('SiteVisitorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiteVisitorServiceService = TestBed.get(SiteVisitorServiceService);
    expect(service).toBeTruthy();
  });
});
