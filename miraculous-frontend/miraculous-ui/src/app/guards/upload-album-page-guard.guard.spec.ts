import { TestBed, async, inject } from '@angular/core/testing';

import { UploadAlbumPageGuardGuard } from './upload-album-page-guard.guard';

describe('UploadAlbumPageGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadAlbumPageGuardGuard]
    });
  });

  it('should ...', inject([UploadAlbumPageGuardGuard], (guard: UploadAlbumPageGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
