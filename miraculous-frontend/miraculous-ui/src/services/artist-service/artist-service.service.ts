import { Injectable } from '@angular/core';
import {DomainServiceService} from "../domain-service/domain-service.service";
import {HttpClient, HttpEvent, HttpParams, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, ObservableLike} from "rxjs";
import {ArtistProfileDto} from "../../dto/artist-profile-dto/artist-profile-dto";
import {ArtistSettingsDto} from "../../dto/artist-settings-dto/artist-settings-dto";
import {CommentDispatchDto} from "../../dto/comment-dispatch-dto/comment-dispatch-dto";
import {CommentRetrievalDto} from "../../dto/comment-retrieval-dto/comment-retrieval-dto";
import {AlbumLinkDto} from "../../dto/album-link-dto/album-link-dto";
import {PlayableTrackDto} from "../../dto/playable-track-dto/playable-track-dto";
import {ArtistLinkDto} from "../../dto/artist-link-dto/artist-link-dto";
import {ResponseMessageDto} from "../../dto/response-message-dto/response-message-dto";
import {EventRetrievalDto} from "../../dto/event-retreival-dto/event-retrieval-dto";
import {GenreDto} from "../../dto/genre-dto/genre-dto";
import {EventDispatchDto} from "../../dto/event-dispatch-dto/event-dispatch-dto";
import {TokenStorageServiceService} from "../token-storage-service/token-storage-service.service";
import {eraseStyles} from "@angular/animations/browser/src/util";

@Injectable({
  providedIn: 'root'
})
export class ArtistServiceService {

  baseArtistsApi: string  = DomainServiceService.SERVER_DOMAIN+ "/artists/";
  numberOfRegisteredArtistsApi: string = this.baseArtistsApi+"number";
  artistCommentsApi: string = "comments";
  featuredArtistsApi: string = "featured";
  artistSettingsApi: string = "settings";
  allArtistTracksApi: string =  "/tracks/all";
  allArtistAlbumsApi: string =  "/albums/all";
  artistByLoginApi: string = this.baseArtistsApi + "login/";
  artistEventsApi: string = "events"
  artistImagesApi: string = "/images"

  constructor(private httpClient: HttpClient, private tokenService: TokenStorageServiceService) { }

  addNewEventToArtist(eventDispatchDto: EventDispatchDto, file: File): Observable<HttpEvent<any>>{

    let formData = new FormData();
    formData.append("image", file);
    formData.append("eventDispatchDto", new Blob([JSON.stringify(eventDispatchDto)], {type : 'application/json'}));

    let postRequest = new HttpRequest("POST", this.baseArtistsApi + this.artistEventsApi, formData,
      {reportProgress: true,  responseType: "text"});

    return this.httpClient.request(postRequest);

  }

  updateArtistSettings(artistSettingsDto: ArtistSettingsDto, coverPictureFile: File, artistGenres: GenreDto[]): Observable<HttpEvent<any>>{

    let formData = new FormData();
    formData.append("image", coverPictureFile);
    formData.append("artistSettingsDto", new Blob([JSON.stringify(artistSettingsDto)], {type: "application/json"}));
    formData.append("artistGenres", new Blob([JSON.stringify(artistGenres)], {type: "application/json"}));
    let postRequest = new HttpRequest("POST", this.baseArtistsApi + this.artistSettingsApi, formData, {reportProgress: true,
    responseType: "text"});

    return this.httpClient.request(postRequest);

  }

  deleteArtistPhoto(imageUrl: string, artistId: number): Observable<HttpResponse<any>>{

    return this.httpClient.delete<HttpResponse<any>>(this.baseArtistsApi + artistId + this.artistImagesApi + "/" + imageUrl);
  }

  getArtistEvents(artistId: number): Observable<HttpResponse<EventRetrievalDto[]>>{

    return this.httpClient.get<EventRetrievalDto[]>(this.baseArtistsApi + artistId + "/" + this.artistEventsApi, {observe: "response"});
  }

  getArtistComments(artistId: number): Observable<CommentRetrievalDto[]>{

    return this.httpClient.get<CommentRetrievalDto[]>(this.baseArtistsApi + artistId + "/" + this.artistCommentsApi);

  }

  postArtistComment(commentDto: CommentDispatchDto):Observable<HttpResponse<any>>{

    return this.httpClient.post<HttpResponse<any>>(this.baseArtistsApi + this.artistCommentsApi, commentDto, {observe: "response"});
  }

  getFeaturedArtists():Observable<ArtistLinkDto[]>{

    return this.httpClient.get<ArtistLinkDto[]>(this.baseArtistsApi + this.featuredArtistsApi);
  }

  getArtistSettingsInfo(artistId: number):Observable<ArtistSettingsDto>{

    return this.httpClient.get<ArtistSettingsDto>(this.baseArtistsApi + artistId + "/" + this.artistSettingsApi);
  }

  deleteArtistFromFeaturedByArtistId(artistId: number): Observable<HttpResponse<ResponseMessageDto>>{

    return this.httpClient.delete<HttpResponse<ResponseMessageDto>>(this.baseArtistsApi + artistId + "/" + this.featuredArtistsApi, );
  }

  addArtistToFeaturedByArtistId(id: number): Observable<HttpResponse<ResponseMessageDto>>{

    let artist: ArtistLinkDto = new ArtistLinkDto();
    artist.id = id;
    return this.httpClient.post<ResponseMessageDto>(this.baseArtistsApi + this.featuredArtistsApi, artist, {observe: "response"});
  }

  getArtistProfileInfo(artistId: number): Observable<ArtistProfileDto>{
    return this.httpClient.get<ArtistProfileDto>(this.baseArtistsApi+artistId);
  }

  getNumberOfRegisteredArtists(): Observable<number>{
    return this.httpClient.get<number>(this.numberOfRegisteredArtistsApi);
  }

  getArtistAllAlbumsByArtistId(artistId: number): Observable<AlbumLinkDto[]>{

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) != null){

      return this.httpClient.get<AlbumLinkDto[]>(this.baseArtistsApi + artistId + this.allArtistAlbumsApi
        + "?visitorId=" + this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()));

    } else {

      return this.httpClient.get<AlbumLinkDto[]>(this.baseArtistsApi + artistId + this.allArtistAlbumsApi + "?visitorId=" + -1);
    }

  }

  getArtistAllAlbumsByArtistLogin(artistLogin: string): Observable<HttpResponse<any>>{

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn() != null)){

      return this.httpClient.get<HttpResponse<any>>(this.artistByLoginApi + artistLogin + this.allArtistAlbumsApi
        + "?visitorId=" + this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()), {observe: "response"});
    } else {

      return this.httpClient.get<HttpResponse<any>>(this.artistByLoginApi + artistLogin + this.allArtistAlbumsApi + "?visitorId=" + -1, {observe: "response"});
    }

  }

  getArtistAllTracksByArtistId(artistId: number):Observable<PlayableTrackDto[]>{

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) != null){

      return this.httpClient.get<PlayableTrackDto[]>(this.baseArtistsApi + artistId + this.allArtistTracksApi + "?visitorId="
        + this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()));

    } else {

      return this.httpClient.get<PlayableTrackDto[]>(this.baseArtistsApi + artistId + this.allArtistTracksApi + "?visitorId=" + -1);
    }

  }

  getArtistByArtistLogin(artistLogin: string): Observable<HttpResponse<any>>{

    return this.httpClient.get<HttpResponse<any>>(this.artistByLoginApi + artistLogin, {observe: "response"});
  }
}
