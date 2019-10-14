import { TestBed, async, inject } from '@angular/core/testing';

import { PurchasedMusicPageGuardGuard } from './purchased-music-page-guard.guard';

describe('PurchasedMusicPageGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchasedMusicPageGuardGuard]
    });
  });

  it('should ...', inject([PurchasedMusicPageGuardGuard], (guard: PurchasedMusicPageGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
