import { TestBed, async, inject } from '@angular/core/testing';

import { EditUserPageGuardGuard } from './edit-user-page-guard.guard';

describe('EditUserPageGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditUserPageGuardGuard]
    });
  });

  it('should ...', inject([EditUserPageGuardGuard], (guard: EditUserPageGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
