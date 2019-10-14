import { Component, OnInit } from '@angular/core';
import {TrackLinkDto} from "../../../dto/track-link-dto/track-link-dto";
import {TrackServiceService} from "../../../services/track-service/track-service.service";
import {ActivatedRoute} from "@angular/router";
import {DomainServiceService} from "../../../services/domain-service/domain-service.service";

@Component({
  selector: 'similar-tracks',
  templateUrl: './similar-tracks.component.html',
  styleUrls: ['./similar-tracks.component.css']
})
export class SimilarTracksComponent implements OnInit {

  items: Array<any> = [];
  similarTracks: TrackLinkDto[] = [];
  trackPagePath: string = DomainServiceService.TRACK_PAGE_PATH;
  artistPagePath: string = DomainServiceService.ARTIST_PROFILE_PATH;
  imagesPath: string = DomainServiceService.PICTURES_PATH;

  constructor(private tracksService: TrackServiceService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

    this.tracksService.getSimilarTracks(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {

        this.similarTracks = data;

      },
      error1 => {

        console.log(error1.message);
      }
    )
  }

}
