import { Injectable } from '@angular/core';
import {DomainServiceService} from "../domain-service/domain-service.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {VisitorAuthorizationDto} from "../../dto/visitor-authorization-dto/visitor-authorization-dto";
import {Observable} from "rxjs";
import {JwtResponseDto} from "../../dto/jwt-response-dto/jwt-response-dto";


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  authorizationApiUrl: string = DomainServiceService.SERVER_DOMAIN + "/authorization";

  constructor(private httpClient: HttpClient) { }

  authorizeVisitor(visitor: VisitorAuthorizationDto): Observable<JwtResponseDto>{
    return this.httpClient.post<JwtResponseDto>(this.authorizationApiUrl, visitor);
  }
}
