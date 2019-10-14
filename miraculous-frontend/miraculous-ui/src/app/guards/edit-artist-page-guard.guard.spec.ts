import { TestBed, async, inject } from '@angular/core/testing';

import { EditArtistPageGuardGuard } from './edit-artist-page-guard.guard';

describe('EditArtistPageGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditArtistPageGuardGuard]
    });
  });

  it('should ...', inject([EditArtistPageGuardGuard], (guard: EditArtistPageGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
