import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {DomainServiceService} from "../domain-service/domain-service.service";
import {Observable} from "rxjs";
import {AlbumLinkDto} from "../../dto/album-link-dto/album-link-dto";
import {AlbumCartDto} from "../../dto/album-cart-dto/album-cart-dto";
import {TrackCartDto} from "../../dto/track-cart-dto/track-cart-dto";
import {TrackLinkDto} from "../../dto/track-link-dto/track-link-dto";

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  baseServerApi: string = DomainServiceService.SERVER_DOMAIN;
  siteVisitorsApi: string = "/site-visitors/";
  allContentsOfCartApi: string = "/cart/all"
  albumsCartApi: string = "/cart/albums";
  tracksCartApi: string = "/cart/tracks";


  constructor(private httpClient: HttpClient) { }

  putOrRemoveAlbumFromCart(albumCartDto: AlbumCartDto):Observable<HttpResponse<AlbumLinkDto>>{

    return this.httpClient.put<AlbumLinkDto>(this.baseServerApi + this.albumsCartApi, albumCartDto, {observe: "response"});
  }

  putOrRemoveTrackFromCart(trackCartDto: TrackCartDto): Observable<HttpResponse<TrackLinkDto>>{

    return this.httpClient.put<TrackLinkDto>(this.baseServerApi + this.tracksCartApi, trackCartDto, {observe: "response"});
  }

  deleteTrackFromCart(siteVisitorId: number, trackId: number): Observable<any>{

    return this.httpClient.delete(this.baseServerApi + this.siteVisitorsApi + siteVisitorId + this.tracksCartApi + "/" + trackId, {observe: "response"});
  }

  deleteAlbumFromCart(siteVisitorId: number, albumId: number): Observable<any>{

    return this.httpClient.delete(this.baseServerApi + this.siteVisitorsApi + siteVisitorId + this.albumsCartApi + "/" + albumId, {observe: "response"});

  }

  deleteAllFromCart(siteVisitorId: number):Observable<any>{

    return this.httpClient.delete(this.baseServerApi + this.siteVisitorsApi + siteVisitorId + this.allContentsOfCartApi);
  }
}

