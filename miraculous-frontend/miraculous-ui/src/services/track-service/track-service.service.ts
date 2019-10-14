import { Injectable } from '@angular/core';
import {DomainServiceService} from "../domain-service/domain-service.service";
import {HttpClient, HttpEvent, HttpParams, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {CommentDispatchDto} from "../../dto/comment-dispatch-dto/comment-dispatch-dto";
import {FullTrackInfoDto} from "../../dto/full-track-info-dto/full-track-info-dto";
import {PlayableTrackDto} from "../../dto/playable-track-dto/playable-track-dto";
import {TrackLinkDto} from "../../dto/track-link-dto/track-link-dto";
import {CommentRetrievalDto} from "../../dto/comment-retrieval-dto/comment-retrieval-dto";
import {TrackUploadDto} from "../../dto/track-upload-dto/track-upload-dto";
import {GenreDto} from "../../dto/genre-dto/genre-dto";
import {TrackLikeDto} from "../../dto/track-like-dto/track-like-dto";
import {TokenStorageServiceService} from "../token-storage-service/token-storage-service.service";

@Injectable({
  providedIn: 'root'
})
export class TrackServiceService {

  baseTrackApi: string = DomainServiceService.SERVER_DOMAIN +"/tracks";
  numberOfUploadedTracksApi: string = this.baseTrackApi + "/number";
  trackCommentsApi: string = "comments";
  top15TracksApi: string = this.baseTrackApi + "/top-15";
  similarTracksApi: string = "/similar-tracks";
  trackLikesApi: string = "/likes"
  top10FreeTracksApi: string = "/top-10/free";
  top10TracksOfGenreApi: string = "/top-10/genres/";

  constructor(private httpClient: HttpClient, private tokenService: TokenStorageServiceService) {

  }

  putOrRemoveLikeFromTrack(trackLikeDto: TrackLikeDto):Observable<HttpResponse<TrackLikeDto>>{

    return this.httpClient.put<TrackLikeDto>(this.baseTrackApi + this.trackLikesApi, trackLikeDto, {observe: "response"});
  }

  getTrackComments(trackId: number): Observable<HttpResponse<CommentRetrievalDto[]>>{

    return this.httpClient.get<CommentRetrievalDto[]>(this.baseTrackApi + "/" + trackId + "/" + this.trackCommentsApi, {observe: "response"});
  }

  getNumberOfUploadedTracks():Observable<number>{

    return this.httpClient.get<number>(this.numberOfUploadedTracksApi);
  }


  addCommentToTrack(comment: CommentDispatchDto): Observable<HttpResponse<any>>{
    return this.httpClient.post<HttpResponse<any>>(this.baseTrackApi + "/" + this.trackCommentsApi, comment);
  }

  getTrackFullInfo(trackId: number): Observable<HttpResponse<FullTrackInfoDto>>{


    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) != null){

      return this.httpClient.get<FullTrackInfoDto>(this.baseTrackApi + "/" + trackId + "?visitorId=" + this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()) ,
        {observe: "response"});

    } else {

      return this.httpClient.get<FullTrackInfoDto>(this.baseTrackApi + "/" + trackId + "?visitorId=" + -1, {observe: "response"});
    }

  }

  getTop10TracksOfGenre(genreId: number): Observable<HttpResponse<PlayableTrackDto[]>>{

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) != null){

      return this.httpClient.get<PlayableTrackDto[]>(this.baseTrackApi+ this.top10TracksOfGenreApi
        + genreId + "?visitorId=" + this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()), {observe: "response"});

    } else {

      return this.httpClient.get<PlayableTrackDto[]>(this.baseTrackApi+ this.top10TracksOfGenreApi + genreId + "?visitorId=" + -1, {observe: "response"});
    }

  }

  getTop10FreeTracks():Observable<PlayableTrackDto[]>{

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn() != null)){

      return this.httpClient.get<PlayableTrackDto[]>(this.baseTrackApi + this.top10FreeTracksApi +
        "?visitorId="+ this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()));

    } else {

      return this.httpClient.get<PlayableTrackDto[]>(this.baseTrackApi + this.top10FreeTracksApi + "?visitorId=" + -1);
    }

  }

  getTop15Tracks(): Observable<PlayableTrackDto[]>{


    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) != null){

      return this.httpClient.get<PlayableTrackDto[]>(this.top15TracksApi + "?visitorId=" + this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()));

    } else {

      return this.httpClient.get<PlayableTrackDto[]>(this.top15TracksApi + "?visitorId="+ - 1);
    }
  }

  getSimilarTracks(trackId: number): Observable<TrackLinkDto[]>{
    return this.httpClient.get<TrackLinkDto[]>(this.baseTrackApi + "/" + trackId + this.similarTracksApi);
  }

  uploadTrack(trackUploadDto: TrackUploadDto, trackFullVersionFile: File, trackPreviewVersion: File, trackCoverPictureFile: File, trackGenres: GenreDto[]): Observable<HttpEvent<any>>{

    let formData = new FormData();
    formData.append("trackUploadDto", new Blob([JSON.stringify(trackUploadDto)], {type: "application/json"}));
    formData.append("trackGenres", new Blob([JSON.stringify(trackGenres)], {type: "application/json"}));
    formData.append("trackFullVersionFile", trackFullVersionFile);
    formData.append("trackPreviewVersionFile", trackPreviewVersion);
    formData.append("trackCoverPictureFile", trackCoverPictureFile);
    let postRequest = new HttpRequest("POST", this.baseTrackApi, formData, {responseType: "text", reportProgress: true});

    return this.httpClient.request(postRequest);
  }
}
