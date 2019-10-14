import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomainServiceService} from "../domain-service/domain-service.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  searchApi: string = DomainServiceService.SERVER_DOMAIN + "/search/";

  constructor(private httpClient: HttpClient) { }


  getSearchResults(keyword: string):Observable<any>{

    return this.httpClient.get<any>(this.searchApi + keyword);
  }
}
