import { TestBed, async, inject } from '@angular/core/testing';

import { ActivationGuardGuard } from './activation-guard.guard';

describe('ActivationGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivationGuardGuard]
    });
  });

  it('should ...', inject([ActivationGuardGuard], (guard: ActivationGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
