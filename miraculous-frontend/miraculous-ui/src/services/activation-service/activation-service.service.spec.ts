import { TestBed } from '@angular/core/testing';

import { ActivationServiceService } from './activation-service.service';

describe('ActivationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivationServiceService = TestBed.get(ActivationServiceService);
    expect(service).toBeTruthy();
  });
});
