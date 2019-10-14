import { Injectable } from '@angular/core';
import {DomainServiceService} from "../domain-service/domain-service.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {GenreDto} from "../../dto/genre-dto/genre-dto";
import {TrackLinkDto} from "../../dto/track-link-dto/track-link-dto";
import {AlbumLinkDto} from "../../dto/album-link-dto/album-link-dto";
import {ArtistLinkDto} from "../../dto/artist-link-dto/artist-link-dto";

@Injectable({
  providedIn: 'root'
})
export class GenreServiceService {


  baseGenresApi: string = DomainServiceService.SERVER_DOMAIN + "/genres";
  genre10ArtistsApi: string = "/10-artists";

  constructor(private httpClient: HttpClient) { }


  getGenreById(genreId: number):Observable<HttpResponse<GenreDto>>{

    return this.httpClient.get<GenreDto>(this.baseGenresApi + "/" + genreId, {observe: "response"});
  }

  getAllGenres():Observable<GenreDto[]> {
    return this.httpClient.get<GenreDto[]>(this.baseGenresApi);
  }

  get10ArtistsOfGenre(genreId: number): Observable<HttpResponse<ArtistLinkDto[]>>{

    return this.httpClient.get<ArtistLinkDto[]>(this.baseGenresApi + "/" + genreId + this.genre10ArtistsApi,{observe: "response"});
  }

}
