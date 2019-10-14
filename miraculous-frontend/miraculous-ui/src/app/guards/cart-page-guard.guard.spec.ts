import { TestBed, async, inject } from '@angular/core/testing';

import { CartPageGuardGuard } from './cart-page-guard.guard';

describe('CartPageGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartPageGuardGuard]
    });
  });

  it('should ...', inject([CartPageGuardGuard], (guard: CartPageGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
