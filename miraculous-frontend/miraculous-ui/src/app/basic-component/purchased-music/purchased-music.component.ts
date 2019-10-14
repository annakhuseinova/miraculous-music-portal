import { Component, OnInit } from '@angular/core';
import {TokenStorageServiceService} from "../../../services/token-storage-service/token-storage-service.service";
import {Router} from "@angular/router";
import {PlayableTrackDto} from "../../../dto/playable-track-dto/playable-track-dto";
import {SiteVisitorServiceService} from "../../../services/site-visitor-service/site-visitor-service.service";

@Component({
  selector: 'purchased-music',
  templateUrl: './purchased-music.component.html',
  styleUrls: ['./purchased-music.component.css']
})
export class PurchasedMusicComponent implements OnInit {

  purchasedSingleTracks: PlayableTrackDto[] = [];
  purchasedAlbumTracks: PlayableTrackDto[] = [];

  constructor(private tokenService: TokenStorageServiceService,
              private router: Router,
              private siteVisitorService: SiteVisitorServiceService) { }

  ngOnInit() {

    this.getPurchasedAlbumTracks();
    this.getPurchasedSingleTracks();
  }

  goToDiscoverPage(){

    this.router.navigate(["miraculous/discover"]);
  }

  getPurchasedSingleTracks(){

    this.siteVisitorService.getPurchasedSingleTracks(this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn())).subscribe(

      data => {

        this.purchasedSingleTracks = data.body;

      },
      error1 => {

        console.log(error1.message);
      }
    )
  }

  getPurchasedAlbumTracks(){

    this.siteVisitorService.getPurchasedAlbumTracks(this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn())).subscribe(

      data => {

        this.purchasedAlbumTracks = data.body;

      },
      error1 => {

        console.log(error1.message);
      }
    )
  }


  deleteAllSingleTracksFromPurchased() {

    this.siteVisitorService.deleteAllSingleTracksFromPurchased(this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn())).subscribe(

      result => {

        this.getPurchasedSingleTracks();
      },

      error1 => {

        console.log(error1.message);
      }

    )
  }

  deleteAllAlbumTracksFromPurchased() {

    this.siteVisitorService.deleteAllAlbumTracksFromPurchased(this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn())).subscribe(

      result => {

        this.getPurchasedAlbumTracks();
      },
      error1 => {

        console.log(error1.message);
      }
    )
  }
}
