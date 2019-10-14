import {Component,  ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {VisitorAuthorizationDto} from "../../../dto/visitor-authorization-dto/visitor-authorization-dto";
import {AuthServiceService} from "../../../services/auth-service/auth-service.service";
import {TokenStorageServiceService} from "../../../services/token-storage-service/token-storage-service.service";

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  visitor: VisitorAuthorizationDto = new VisitorAuthorizationDto();
  visitorAuthError: VisitorAuthorizationDto = new VisitorAuthorizationDto();
  isRememberMeAuthModeOn: boolean;
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  isValidationFailed: boolean = false;
  authorizationErrorMessage = "";
  role: string = "";
  @Output() onSuccessfulAuthorization = new EventEmitter();

  @ViewChild("loginInvalidMessage")
  loginInvalidMessage: ElementRef;

  @ViewChild("rememberMeModeCheckbox")
  rememberMeModeCheckbox: ElementRef;

  @Output() closedLoginComponent = new EventEmitter<any>();
  @Output() switchedToRegistrationComponent = new EventEmitter<any>();
  @Output() switchedToRememberMeAuthMode = new EventEmitter<any>();
  constructor(private authService: AuthServiceService, private tokenStorageService: TokenStorageServiceService) { }

  ngOnInit() {

      if (this.tokenStorageService.getToken(this.isRememberMeAuthModeOn)){
        this.isLoggedIn = true;
        this.role = this.tokenStorageService.getRole(this.isRememberMeAuthModeOn);
      }
  }

  closeLoginComponent() {

      this.closedLoginComponent.emit();
      this.resetAuthorizationForm();
      document.querySelector(".login-message").innerHTML = "";
      this.authorizationErrorMessage = "";
      this.visitor.password = "";
      this.visitor.login = "";
      this.rememberMeModeCheckbox.nativeElement.checked = false;
      this.visitorAuthError = new VisitorAuthorizationDto();
      this.isValidationFailed = false;
  }

  switchToRegistrationComponent() {

    this.switchedToRegistrationComponent.emit();
    this.resetAuthorizationForm();
  }

  resetAuthorizationForm(){
    (<HTMLElement>document.querySelector(".reset-authorization-form-button")).click();
  }

  setRememberMeAuthMode() {

    if (this.isRememberMeAuthModeOn == false){
      this.isRememberMeAuthModeOn = true;

    } else {
      this.isRememberMeAuthModeOn = false;

    }
  }

  submitLoginForm() {
    this.authService.authorizeVisitor(this.visitor).subscribe(

      data  => {

        console.log(data);
        this.tokenStorageService.saveToken(this.rememberMeModeCheckbox.nativeElement.checked, data.accessToken);
        this.tokenStorageService.saveVisitorId(this.rememberMeModeCheckbox.nativeElement.checked, data.visitorId);
        this.tokenStorageService.saveLogin(this.rememberMeModeCheckbox.nativeElement.checked, data.login);
        this.tokenStorageService.savePictureUrl(this.rememberMeModeCheckbox.nativeElement.checked, data.pictureUrlName);
        this.tokenStorageService.saveRole(this.rememberMeModeCheckbox.nativeElement.checked, data.role);
        this.tokenStorageService.saveJwtTokenExpirationTime(this.rememberMeModeCheckbox.nativeElement.checked, data.jwtExpirationTime);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.role = this.tokenStorageService.getRole(this.rememberMeModeCheckbox.nativeElement.checked);
        this.closeLoginComponent();
        this.reloadPage();
      },

      error => {

        if (error.status == 400){

          this.isValidationFailed = true;
          this.visitorAuthError = error.error;

        }else {

          this.visitorAuthError = new VisitorAuthorizationDto();
          this.isValidationFailed = false;
          this.authorizationErrorMessage = error.error.message;
          this.isLoginFailed = true;
        }
      }
    )
  }

  reloadPage(){

    window.location.reload();

  }
}
