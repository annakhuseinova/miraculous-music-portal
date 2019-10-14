import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {VisitorRegistrationDto} from "../../dto/visitor-registration-dto/visitor-registration-dto";
import {DomainServiceService} from "../domain-service/domain-service.service";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceService {

  registrationApi: string = DomainServiceService.SERVER_DOMAIN + "/registration";

  constructor(private httpClient: HttpClient) { }

  registerVisitor(visitor: VisitorRegistrationDto): Observable<HttpEvent<any>>{

    let postRequest = new HttpRequest("POST", this.registrationApi,  visitor, {responseType: "text", reportProgress: true});
    return this.httpClient.request(postRequest);
  }
}
