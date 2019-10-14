import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {DomainServiceService} from "../domain-service/domain-service.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  baseApi: string = DomainServiceService.SERVER_DOMAIN;
  paymentApi: string = "/payment/charge";

  constructor(private httpClient: HttpClient ) {

  }

  chargeCard(token: string, amount: number): Observable<HttpResponse<any>>{

    let options =
      {headers: new HttpHeaders({
        'token': token,
        'amount': amount.toString()})};
    options.headers.set("observe", "response");

    return this.httpClient.post<HttpResponse<any>>(this.baseApi + this.paymentApi, {}, options);
  }
}
