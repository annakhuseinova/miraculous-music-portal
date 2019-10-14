import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserServiceService} from "../../../../services/user-service/user-service.service";
import {TokenStorageServiceService} from "../../../../services/token-storage-service/token-storage-service.service";
import {Router} from "@angular/router";
import {SiteVisitorServiceService} from "../../../../services/site-visitor-service/site-visitor-service.service";

@Component({
  selector: 'account-deletion-confirmation',
  templateUrl: './account-deletion-confirmation.component.html',
  styleUrls: ['./account-deletion-confirmation.component.css']
})
export class AccountDeletionConfirmationComponent implements OnInit {


  @Output() onClosedAccountDeletion = new EventEmitter<any>();
  @Output() onDeleteArtistButtonClicked = new EventEmitter<any>();
  errorMessage: string;

  constructor(private siteVisitorService: SiteVisitorServiceService, private userService: UserServiceService,
              private tokenService: TokenStorageServiceService, private router: Router) { }

  ngOnInit() {
  }

  closeAccountDeletionConfirmation() {
    this.onClosedAccountDeletion.emit();
  }

  deleteUser() {

    this.siteVisitorService.deleteSiteVisitorById(this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn())).subscribe(

      response => {

        this.tokenService.signOut(this.tokenService.isRememberMeModeOn());
        this.onDeleteArtistButtonClicked.emit();
      },
      error1 => {

        this.errorMessage = error1.message;
      }
    )
  }
}
