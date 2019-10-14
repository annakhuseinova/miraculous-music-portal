import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PlayableTrackDto} from "../../../../dto/playable-track-dto/playable-track-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";
import {TokenStorageServiceService} from "../../../../services/token-storage-service/token-storage-service.service";
import {SiteVisitorServiceService} from "../../../../services/site-visitor-service/site-visitor-service.service";

@Component({
  selector: 'purchased-album-track',
  templateUrl: './purchased-album-track.component.html',
  styleUrls: ['./purchased-album-track.component.css']
})
export class PurchasedAlbumTrackComponent implements OnInit {

  @Input() purchasedAlbumTrack: PlayableTrackDto = new PlayableTrackDto();
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  songsUrl: string = DomainServiceService.TRACKS_PATH;
  trackPageUrl: string = DomainServiceService.TRACK_PAGE_PATH;
  artistPageUrl: string = DomainServiceService.ARTIST_PROFILE_PATH;
  albumPageUrl: string = DomainServiceService.ALBUM_PAGE_PATH;
  isPlaying: boolean = false;
  @Output() onAlbumTrackFromPurchasedDeletion = new EventEmitter();

  @ViewChild("pauseIcon")
  pauseIcon: ElementRef;

  @ViewChild("playIcon")
  playIcon: ElementRef;

  @ViewChild("track")
  track: ElementRef;

  constructor(private tokenService: TokenStorageServiceService, private siteVisitorService: SiteVisitorServiceService) { }

  ngOnInit() {
  }

  playOrPauseTrack(){

    if (this.isPlaying){

      (this.track.nativeElement as HTMLAudioElement).pause();

      this.setPlayIcon();

    } else {

      (this.track.nativeElement as HTMLAudioElement).play();
      this.setPauseIcon();
    }
  }

  setPauseIcon(){

    this.pauseIcon.nativeElement.style = "display: block";
    this.playIcon.nativeElement.style = "display: none";
    this.isPlaying = true;
  }

  setPlayIcon(){

    this.pauseIcon.nativeElement.style = "display: none";
    this.playIcon.nativeElement.style = "display: block";
    this.isPlaying = false;
  }

  deleteAlbumTrackFromPurchased() {

    this.siteVisitorService.deleteAlbumFromPurchased(this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()),
      this.purchasedAlbumTrack.albumId).subscribe(

        result => {

          this.onAlbumTrackFromPurchasedDeletion.emit();

        },
      error1 => {

          console.log(error1.message);
      }
    )
  }
}
