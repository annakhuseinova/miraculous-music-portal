import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageServiceService} from "../../services/token-storage-service/token-storage-service.service";

@Injectable({
  providedIn: 'root'
})
export class AdminPageGuardGuard implements CanActivate {
  
  
  constructor(private tokenService: TokenStorageServiceService, private router: Router){
    
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) != null && this.tokenService.getRole(this.tokenService.isRememberMeModeOn()) == "admin"){

          return true;

      }else {

        this.router.navigate(["miraculous/discover"]);
        return false;
      }
  }

}
