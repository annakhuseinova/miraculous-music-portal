import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDeletionConfirmationComponent } from './account-deletion-confirmation.component';

describe('AccountDeletionConfirmationComponent', () => {
  let component: AccountDeletionConfirmationComponent;
  let fixture: ComponentFixture<AccountDeletionConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDeletionConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDeletionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
