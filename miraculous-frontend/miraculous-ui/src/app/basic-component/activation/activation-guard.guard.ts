import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ActivationServiceService} from "../../../services/activation-service/activation-service.service";

@Injectable({
  providedIn: 'root'
})
export class ActivationGuardGuard implements CanActivate {

  constructor(private activationService: ActivationServiceService){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (route.params["activationCode"] != null){
        
        return true;
    }

    return false;

  }
  
}
