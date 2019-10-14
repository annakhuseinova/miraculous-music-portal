import { Injectable } from '@angular/core';
import {DomainServiceService} from "../domain-service/domain-service.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  baseCommentApi: string = DomainServiceService.SERVER_DOMAIN + "/comments/";

  constructor(private httpClient: HttpClient ) {

  }

  deleteComment(commentId: number): Observable<HttpResponse<any>>{
    return this.httpClient.delete<HttpResponse<any>>(this.baseCommentApi+commentId);
  }
}
