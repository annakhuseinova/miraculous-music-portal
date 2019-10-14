import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageServiceService} from "../../services/token-storage-service/token-storage-service.service";

@Injectable({
  providedIn: 'root'
})
export class UploadAlbumPageGuardGuard implements CanActivate {

  constructor(private tokenService: TokenStorageServiceService, private router: Router){

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) != null && this.tokenService.getRole(this.tokenService.isRememberMeModeOn()) == "artist"){

      return true;

    } else {

      this.router.navigate(["miraculous/discover"]);
      return false;
    }
  }

}
