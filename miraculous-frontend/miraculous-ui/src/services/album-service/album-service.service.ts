import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest, HttpResponse} from "@angular/common/http";
import {DomainServiceService} from "../domain-service/domain-service.service";
import {Observable, ObservableLike} from "rxjs";
import {CommentDispatchDto} from "../../dto/comment-dispatch-dto/comment-dispatch-dto";
import {FullAlbumInfoDto} from "../../dto/full-album-info-dto/full-album-info-dto";
import {AlbumLinkDto} from "../../dto/album-link-dto/album-link-dto";
import {CommentRetrievalDto} from "../../dto/comment-retrieval-dto/comment-retrieval-dto";
import {PlayableTrackDto} from "../../dto/playable-track-dto/playable-track-dto";
import {ResponseMessageDto} from "../../dto/response-message-dto/response-message-dto";
import {AlbumLikeDto} from "../../dto/album-like-dto/album-like-dto";
import {TokenStorageServiceService} from "../token-storage-service/token-storage-service.service";
import {AlbumUploadDto} from "../../dto/album-upload-dto/album-upload-dto";
import {GenreDto} from "../../dto/genre-dto/genre-dto";
import {AlbumTrackUploadDto} from "../../dto/album-track-upload-dto/album-track-upload-dto";

@Injectable({
  providedIn: 'root'
})
export class AlbumServiceService {

  baseAlbumApi: string = DomainServiceService.SERVER_DOMAIN + "/albums/";
  numberOfUploadedAlbumsApi: string = this.baseAlbumApi + "number";
  featuredAlbumsApi: string =  "featured";
  albumCommentsApi: string = "comments";
  top15AlbumsApi: string =  "top-15";
  similarAlbumsApi: string = "/similar-albums";
  tracksOfAlbumApi: string = "/tracks";
  albumLikesApi: string = "likes";
  top10FreeAlbums: string = "top-10/free";
  top10AlbumsOfGenresApi: string = "top-10/genres/";
  albumsApi: string = DomainServiceService.SERVER_DOMAIN + "/albums";

  constructor(private httpClient: HttpClient, private tokenService: TokenStorageServiceService) { }

  getTop10AlbumsOfGenre(genreId: number): Observable<HttpResponse<AlbumLinkDto[]>>{

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) != null){

      return this.httpClient.get<AlbumLinkDto[]>(this.baseAlbumApi +
        this.top10AlbumsOfGenresApi + genreId + "?visitorId=" + this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()) , {observe: "response"});

    } else {

      return this.httpClient.get<AlbumLinkDto[]>(this.baseAlbumApi + this.top10AlbumsOfGenresApi + genreId + "?visitorId=" + -1, {observe: "response"});
    }

  }

  getTop10FreeAlbums(): Observable<AlbumLinkDto[]>{

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) != null){

      return this.httpClient.get<AlbumLinkDto[]>(this.baseAlbumApi + this.top10FreeAlbums
        + "?visitorId=" + this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()));
    } else {

      return this.httpClient.get<AlbumLinkDto[]>(this.baseAlbumApi + this.top10FreeAlbums + "?visitorId=" + -1);
    }

  }

  putOrRemoveLikeFromAlbum(albumLikeDto: AlbumLikeDto):Observable<HttpResponse<AlbumLikeDto>>{

    return this.httpClient.put<AlbumLikeDto>(this.baseAlbumApi + this.albumLikesApi, albumLikeDto, {observe: "response"});
  }

  postComment(commentDto: CommentDispatchDto): Observable<HttpResponse<any>>{

    return this.httpClient.post<HttpResponse<any>>(this.baseAlbumApi + this.albumCommentsApi, commentDto, {observe: "response"});

  }

  getTracksOfAlbum(albumId: number): Observable<HttpResponse<PlayableTrackDto[]>>{

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) != null){

      return this.httpClient.get<PlayableTrackDto[]>(this.baseAlbumApi + albumId + this.tracksOfAlbumApi
        + "?visitorId=" + this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()), {observe: "response"});

    } else {

      return this.httpClient.get<PlayableTrackDto[]>(this.baseAlbumApi + albumId + this.tracksOfAlbumApi + "?visitorId=" + -1, {observe: "response"});
    }

  }

  getNumberOfUploadedAlbums(): Observable<number>{
    return this.httpClient.get<number>(this.numberOfUploadedAlbumsApi);
  }

  getFeaturedAlbums(): Observable<AlbumLinkDto[]>{

    if (this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn())){

      return this.httpClient.get<AlbumLinkDto[]>(this.baseAlbumApi + this.featuredAlbumsApi + "?visitorId=" +
        this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()));

    } else {

      return this.httpClient.get<AlbumLinkDto[]>(this.baseAlbumApi + this.featuredAlbumsApi + "?visitorId=" + -1);
    }

  }

  addAlbumToFeaturedByAlbumId(albumId: number): Observable<HttpResponse<ResponseMessageDto>>{

    return this.httpClient.put<HttpResponse<ResponseMessageDto>>(this.baseAlbumApi + this.featuredAlbumsApi, albumId);
  }

  deleteAlbumFromFeaturedByAlbumId(albumId: number): Observable<HttpResponse<ResponseMessageDto>>{
    return this.httpClient.delete<HttpResponse<ResponseMessageDto>>(this.baseAlbumApi +albumId + "/" + this.featuredAlbumsApi);
  }

  getAlbumFullInfo(albumId: number): Observable<FullAlbumInfoDto>{

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) != null) {

      return this.httpClient.get<FullAlbumInfoDto>(this.baseAlbumApi+albumId + "?visitorId=" + this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()));

    }else {

      return this.httpClient.get<FullAlbumInfoDto>(this.baseAlbumApi+albumId + "?visitorId=" + -1);
    }

  }

  getTop15Albums(): Observable<HttpResponse<AlbumLinkDto[]>>{

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) != null){

      return this.httpClient.get<AlbumLinkDto[]>(this.baseAlbumApi + this.top15AlbumsApi + "?visitorId="
        + this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()), {observe: "response"});

    }else {

      return this.httpClient.get<AlbumLinkDto[]>(this.baseAlbumApi + this.top15AlbumsApi + "?visitorId=" + -1, {observe: "response"});
    }
  }

  getAlbumComments(albumId: number): Observable<CommentRetrievalDto[]>{

    return this.httpClient.get<CommentRetrievalDto[]>(this.baseAlbumApi + albumId + "/" + this.albumCommentsApi);
  }

  getSimilarAlbums(albumId: number): Observable<AlbumLinkDto[]>{

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn())){

      return this.httpClient.get<AlbumLinkDto[]>(this.baseAlbumApi + albumId + this.similarAlbumsApi + "?visitorId="
        + this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()));

    } else {

      return this.httpClient.get<AlbumLinkDto[]>(this.baseAlbumApi + albumId + this.similarAlbumsApi + "?visitorId=" + -1);
    }

  }
  uploadAlbum(albumUploadDto: AlbumUploadDto,
              listOfFullVersions: File[],
              listOfPreviewVersions: File[],
              coverPictureFile: File,
              genres: GenreDto[],
              albumTrackUploadDtos: AlbumTrackUploadDto[]): Observable<HttpEvent<any>>{

    let formData = new FormData();
    formData.append("albumUploadDto", new Blob([JSON.stringify(albumUploadDto)], {type: 'application/json'}));
    formData.append("genres", new Blob([JSON.stringify(genres)], {type: 'application/json'}));
    formData.append("albumTrackUploadDtos", new Blob([JSON.stringify(albumTrackUploadDtos)], {type: 'application/json'}));
    listOfFullVersions.forEach((item) => {
      formData.append("listOfFullVersions", item);
    });

    listOfPreviewVersions.forEach((item)=> {
      formData.append("listOfPreviewVersions", item);
    });
    formData.append("coverPictureFile", coverPictureFile);

    let postRequest = new HttpRequest("POST", this.albumsApi,  formData, {responseType: "text", reportProgress: true});
    return this.httpClient.request(postRequest);
  }

}
