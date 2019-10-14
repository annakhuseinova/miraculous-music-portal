import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpRequest, HttpResponse} from "@angular/common/http";
import {DomainServiceService} from "../domain-service/domain-service.service";
import {Observable, ObservableLike} from "rxjs";
import {ResponseMessageDto} from "../../dto/response-message-dto/response-message-dto";
import {GenreDto} from "../../dto/genre-dto/genre-dto";
import {TrackLinkDto} from "../../dto/track-link-dto/track-link-dto";
import {AlbumLinkDto} from "../../dto/album-link-dto/album-link-dto";
import {ObserveOnMessage} from "rxjs/internal/operators/observeOn";
import {PlayableTrackDto} from "../../dto/playable-track-dto/playable-track-dto";

@Injectable({
  providedIn: 'root'
})
export class SiteVisitorServiceService {


  baseSiteVisitorApi: string = DomainServiceService.SERVER_DOMAIN + "/site-visitors/";
  loginSiteVisitorApi: string = this.baseSiteVisitorApi + "login/";
  siteVisitorsGenresApi: string = "genres";
  cartApi: string = "/cart"
  albumsApi: string = "/albums";
  purchasedApi: string = "/purchased"
  tracksApi: string = "/tracks";

  constructor(private httpClient: HttpClient) {

  }

  transferTracksAndAlbumsToPurchased(siteVisitorId: number): Observable<HttpResponse<any>>{

    return this.httpClient.post<HttpResponse<any>>(this.baseSiteVisitorApi + siteVisitorId +  this.purchasedApi, {},
      {observe: "response"});
  }

  getPurchasedSingleTracks(siteVisitorId: number):Observable<HttpResponse<PlayableTrackDto[]>>{

    return this.httpClient.get<PlayableTrackDto[]>(this.baseSiteVisitorApi + siteVisitorId + this.purchasedApi
      + this.tracksApi, {observe: "response"});
  }

  getPurchasedAlbumTracks(siteVisitorId: number):Observable<HttpResponse<PlayableTrackDto[]>>{

    return this.httpClient.get<PlayableTrackDto[]>(this.baseSiteVisitorApi + siteVisitorId + this.purchasedApi
      + this.albumsApi, {observe: "response"});
  }

  deleteSingleTrackFromPurchased(siteVisitorId: number, trackId: number): Observable<HttpResponse<any>>{

    return this.httpClient.delete<HttpResponse<any>>(this.baseSiteVisitorApi + siteVisitorId + this.purchasedApi
      + this.tracksApi+ "/" + trackId);
  }

  deleteAlbumFromPurchased(siteVisitorId: number, albumId: number): Observable<HttpResponse<any>>{

    return this.httpClient.delete<HttpResponse<any>>(this.baseSiteVisitorApi + siteVisitorId + this.purchasedApi+
      this.albumsApi + "/" + albumId);
  }

  deleteAllSingleTracksFromPurchased(siteVisitorId: number): Observable<HttpResponse<any>>{

    return this.httpClient.delete<HttpResponse<any>>(this.baseSiteVisitorApi + siteVisitorId + this.purchasedApi + this.tracksApi);

  }
  deleteAllAlbumTracksFromPurchased(siteVisitorId: number): Observable<HttpResponse<any>>{

    return this.httpClient.delete<HttpResponse<any>>(this.baseSiteVisitorApi + siteVisitorId + this.purchasedApi + this.albumsApi);
  }

  getSiteVisitorGenres(id: number): Observable<HttpResponse<GenreDto[]>>{

    return this.httpClient.get<GenreDto[]>(this.baseSiteVisitorApi + id + "/" + this.siteVisitorsGenresApi, {observe: "response"});
  }

  getSiteVisitorByLogin(login: string): Observable<any>{

    return this.httpClient.get<any>(this.loginSiteVisitorApi + login, {observe: "response"});
  }

  deleteSiteVisitorById(id: number): Observable<ResponseMessageDto>{

    return this.httpClient.delete<ResponseMessageDto>(this.baseSiteVisitorApi + id);
  }

  getTracksInCartByOwnerId(ownerId: number): Observable<HttpResponse<TrackLinkDto[]>>{

    return this.httpClient.get<TrackLinkDto[]>(this.baseSiteVisitorApi + ownerId + this.cartApi + this.tracksApi, {observe: "response"});
  }

  getAlbumsInCartByOwnerId(ownerId: number): Observable<HttpResponse<AlbumLinkDto[]>>{

    return this.httpClient.get<AlbumLinkDto[]>(this.baseSiteVisitorApi + ownerId + this.cartApi + this.albumsApi, {observe: "response"});
  }
}
