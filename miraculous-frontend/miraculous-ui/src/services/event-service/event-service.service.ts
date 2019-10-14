import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {DomainServiceService} from "../domain-service/domain-service.service";

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  baseEventsApi: string = DomainServiceService.SERVER_DOMAIN + "/events/";


  constructor(private httpClient: HttpClient) { }

  deleteArtistEvent(eventId: number):Observable<HttpResponse<any>>{

    return this.httpClient.delete<HttpResponse<any>>(this.baseEventsApi + eventId);
  }
}
