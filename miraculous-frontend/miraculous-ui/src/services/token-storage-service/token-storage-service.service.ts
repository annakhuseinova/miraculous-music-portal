import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

const TOKEN_KEY = "AuthToken";
const VISITOR_ID_KEY = "AuthVisitorId"
const USERNAME_KEY = "AuthLogin";
const ROLE_KEY = "Role";
const PICTURE_URL_KEY = "PictureUrl";
const JWT_EXPIRATION_TIME_KEY = "JwtExpirationTime";


@Injectable({
  providedIn: 'root'
})
export class TokenStorageServiceService {

  private role: string = "";

  constructor(private router: Router) {
  }


  signOut(isRememberMeAuthModeOn: boolean){
    if (isRememberMeAuthModeOn == true){
      window.localStorage.clear();
      window.location.reload();
      this.router.navigate(["miraculous/discover"]);
    }else {
      window.sessionStorage.clear();
      window.location.reload();
      this.router.navigate(["miraculous/discover"]);
    }
  }

  saveVisitorId(isRememberMeAuthModeOn: boolean, visitorId: number){
    if (isRememberMeAuthModeOn == true){
      window.localStorage.removeItem(VISITOR_ID_KEY);
      window.localStorage.setItem(VISITOR_ID_KEY, visitorId.toString());
    } else {
      window.sessionStorage.removeItem(VISITOR_ID_KEY);
      window.sessionStorage.setItem(VISITOR_ID_KEY, visitorId.toString());
    }
  }

  saveJwtTokenExpirationTime(isRememberMeAuthModeOn: boolean, jwtTokenExpirationTime: number){

    if (isRememberMeAuthModeOn == true){

      window.localStorage.removeItem(JWT_EXPIRATION_TIME_KEY);
      window.localStorage.setItem(JWT_EXPIRATION_TIME_KEY, jwtTokenExpirationTime.toString());
    } else {

      window.sessionStorage.removeItem(JWT_EXPIRATION_TIME_KEY);
      window.sessionStorage.setItem(JWT_EXPIRATION_TIME_KEY, jwtTokenExpirationTime.toString());
    }
  }

  getJwtTokenExpirationTime(isRememberMeModeOne: boolean){

    if (isRememberMeModeOne == true){

      return <number><unknown>(window.localStorage.getItem(JWT_EXPIRATION_TIME_KEY));
    }else {

      return <number><unknown>(window.sessionStorage.getItem(JWT_EXPIRATION_TIME_KEY));
    }
  }

  getVisitorId(isRememberMeAuthModeOn: boolean){
    if (isRememberMeAuthModeOn == true){
      return <number><unknown>(window.localStorage.getItem(VISITOR_ID_KEY));
    }else {
      return <number><unknown>(window.sessionStorage.getItem(VISITOR_ID_KEY));
    }
  }


  saveToken(isRememberMeAuthModeOn: boolean, token: string){
    if (isRememberMeAuthModeOn == true){
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.setItem(TOKEN_KEY, token);
    } else {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  getToken(isRememberMeAuthModeOn: boolean): string{
    if (isRememberMeAuthModeOn == true){
        return window.localStorage.getItem(TOKEN_KEY);
    } else {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }
  }

  saveLogin(isRememberMeAuthModeOn: boolean, login: string){
    if (isRememberMeAuthModeOn == true){
      window.localStorage.removeItem(USERNAME_KEY);
      window.localStorage.setItem(USERNAME_KEY, login);
    }else {
      window.sessionStorage.removeItem(USERNAME_KEY);
      window.sessionStorage.setItem(USERNAME_KEY, login);
    }
  }

  getLogin(isRememberMeAuthModeOn: boolean): string{
    if (isRememberMeAuthModeOn == true){
      return window.localStorage.getItem(USERNAME_KEY);
    } else {
      return window.sessionStorage.getItem(USERNAME_KEY);
    }
  }
  
  isRememberMeModeOn(): boolean{
    
    if (window.localStorage.getItem(TOKEN_KEY) != null){
      
      return true;

    } else if (window.sessionStorage.getItem(TOKEN_KEY) != null){

      return false;
    }
  }

  savePictureUrl(isRememberMeAuthModeOn: boolean, pictureUrl: string) {

    if (isRememberMeAuthModeOn == true){

      window.localStorage.removeItem(PICTURE_URL_KEY);
      window.localStorage.setItem(PICTURE_URL_KEY, pictureUrl);

    } else {

      console.log("Ставлю новую картинку");
      window.sessionStorage.removeItem(PICTURE_URL_KEY);
      window.sessionStorage.setItem(PICTURE_URL_KEY, pictureUrl);
    }
  }

  getPictureUrl(isRememberMeAuthModeOn: boolean): string {

    if (isRememberMeAuthModeOn == true){

      return window.localStorage.getItem(PICTURE_URL_KEY);

    } else {

      return window.sessionStorage.getItem(PICTURE_URL_KEY);
    }
  }

  saveRole(isRememberMeAuthModeOn: boolean, role: string){

      if (isRememberMeAuthModeOn == true){
        window.localStorage.removeItem(ROLE_KEY);
        window.localStorage.setItem(ROLE_KEY, role);
      }else {
        window.sessionStorage.removeItem(ROLE_KEY);
        window.sessionStorage.setItem(ROLE_KEY, role);
      }
  }

  getRole(isRememberMeAuthModeOn: boolean): string{

    if (isRememberMeAuthModeOn == true){
      if (window.localStorage.getItem(TOKEN_KEY) != null){
        this.role = window.localStorage.getItem(ROLE_KEY);
      }
    } else {
      if (window.sessionStorage.getItem(TOKEN_KEY) != null){
        this.role = window.sessionStorage.getItem(ROLE_KEY);
      }
    }
    return this.role;
  }


}



