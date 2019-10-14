import { Injectable } from '@angular/core';
import {DomainServiceService} from "../domain-service/domain-service.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {TrackLinkDto} from "../../dto/track-link-dto/track-link-dto";
import {Track} from "../../dto/track/track";
import {PlayableTrackDto} from "../../dto/playable-track-dto/playable-track-dto";
import {Observable} from "rxjs";
import {TokenStorageServiceService} from "../token-storage-service/token-storage-service.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {

  playableTracks: PlayableTrackDto[] = [];
  baseServerApi: string = DomainServiceService.SERVER_DOMAIN;
  siteVisitorsApI: string = "/site-visitors";
  playlistApi: string = "/playlist";

  currentTrackIndex: number = 0;

  constructor(private httpClient: HttpClient, private tokenService: TokenStorageServiceService) {

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) != null){

      this.getPlaylistOfSiteVisitor().subscribe(

        data => {

          this.playableTracks = data.body;
          console.log(this.playableTracks);
        },
        error1 => {

          console.log(error1.message);
        }
      )
    }

  }

  getPlaylistOfSiteVisitor(): Observable<HttpResponse<any>>{

    return this.httpClient.get<HttpResponse<any>>(this.baseServerApi + this.siteVisitorsApI + "/" + this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn())
      + this.playlistApi, {observe: "response"});
  }

  saveOrUpdateSiteVisitorPlaylist(): Observable<HttpResponse<any>>{

    let tracksIds = this.playableTracks.map((item)=> {

      return item.id;
    });

    return this.httpClient.put<HttpResponse<any>>(this.baseServerApi + this.siteVisitorsApI + "/" + this.tokenService
      .getVisitorId(this.tokenService.isRememberMeModeOn())+ this.playlistApi, tracksIds);
  }
}
