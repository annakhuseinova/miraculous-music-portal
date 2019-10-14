import { TestBed, async, inject } from '@angular/core/testing';

import { AdminPageGuardGuard } from './admin-page-guard.guard';

describe('AdminPageGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminPageGuardGuard]
    });
  });

  it('should ...', inject([AdminPageGuardGuard], (guard: AdminPageGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
