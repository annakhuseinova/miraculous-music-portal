import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {VisitorRegistrationDto} from "../../../dto/visitor-registration-dto/visitor-registration-dto";
import {RegistrationServiceService} from "../../../services/registration-service/registration-service.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'registration-component',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  visitor: VisitorRegistrationDto = new VisitorRegistrationDto();
  isArtistRoleChosen: boolean = false;
  registrationMessage: string = "";
  isRegistrationSuccessful: boolean = false;
  isRegistrationFailed: boolean = false;
  isValidationFailed: boolean = false;
  registrationValidationError: VisitorRegistrationDto = new VisitorRegistrationDto();
  @Output() closedRegistrationComponent = new EventEmitter<any>();
  @Output() switchedToLoginComponent = new EventEmitter<any>();
  isActivationMailBeingSent: boolean = false;

  constructor(private registrationService: RegistrationServiceService) { }

  ngOnInit() {

    this.visitor.role = "user";
  }

  resetRegistrationForm(){

    (<HTMLElement>document.querySelector(".registration-form-reset-button")).click();
    this.isArtistRoleChosen = false;

  }

  closeRegistrationComponent() {
    this.closedRegistrationComponent.emit();
    this.resetRegistrationForm();
    this.registrationMessage = "";
    this.visitor.role = "user";
  }

  switchToLoginComponent() {
    this.switchedToLoginComponent.emit();
    this.isValidationFailed = false;
    this.isRegistrationFailed = false;
    this.isRegistrationSuccessful = false;
    this.resetRegistrationForm();
  }

  submitRegistrationForm() {
    this.registrationService.registerVisitor(this.visitor).subscribe(
      result => {

        if (result.type == HttpEventType.Sent){

          this.isActivationMailBeingSent = true;
          this.registrationValidationError = new VisitorRegistrationDto();

        } else if (result instanceof HttpResponse){


            this.isActivationMailBeingSent = false;
            this.isRegistrationFailed = false;
            this.isRegistrationSuccessful = true;
            this.isValidationFailed = false;
            this.resetRegistrationForm();
            this.registrationValidationError = new VisitorRegistrationDto();
            this.registrationMessage = "Registration success. Complete registration via email";
        }
      },
      error => {

        this.isActivationMailBeingSent = false;
        if (error.status == 400){

          this.isValidationFailed = true;
          this.registrationValidationError = JSON.parse(error.error);

        }else {

          this.isRegistrationFailed = true;
          this.registrationMessage = JSON.parse(error.error).message;
        }
      }
    )
  }

  showAdditionalDataPanel() {

    this.isArtistRoleChosen = true;
  }

  hideAdditionalDataPanel() {

    this.isArtistRoleChosen = false;
  }
}
