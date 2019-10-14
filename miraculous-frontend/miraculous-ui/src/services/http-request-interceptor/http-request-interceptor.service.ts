import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageServiceService} from "../token-storage-service/token-storage-service.service";

const TOKEN_HEADER_KEY = "Authorization";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorService implements HttpInterceptor{

  constructor(private tokenStorageService: TokenStorageServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authorizationRequest = req;
    const token = this.tokenStorageService.getToken(this.tokenStorageService.isRememberMeModeOn());
    if (token != null){

      if (Date.now() >= this.tokenStorageService.getJwtTokenExpirationTime(this.tokenStorageService.isRememberMeModeOn())){

        console.log(Date.now());
        console.log(this.tokenStorageService.getJwtTokenExpirationTime(this.tokenStorageService.isRememberMeModeOn()));
         this.tokenStorageService.signOut(this.tokenStorageService.isRememberMeModeOn());
        return;
      }
      authorizationRequest = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, "Bearer " + token)});
    }
    return next.handle(authorizationRequest);
  }
}



