import { TestBed, async, inject } from '@angular/core/testing';

import { UploadTrackPageGuardGuard } from './upload-track-page-guard.guard';

describe('UploadTrackPageGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadTrackPageGuardGuard]
    });
  });

  it('should ...', inject([UploadTrackPageGuardGuard], (guard: UploadTrackPageGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
