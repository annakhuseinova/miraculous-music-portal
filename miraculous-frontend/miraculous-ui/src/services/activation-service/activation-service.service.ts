import { Injectable } from '@angular/core';
import {DomainServiceService} from "../domain-service/domain-service.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActivationServiceService {


  activationApi: string = DomainServiceService.SERVER_DOMAIN + "/activation?activationCode=";

  constructor(private httpClient: HttpClient) { }

  activateVisitor(activationCode: string): Observable<string>{

    console.log("Activating...")
    return this.httpClient.get<string>(this.activationApi+activationCode);
  }
}
