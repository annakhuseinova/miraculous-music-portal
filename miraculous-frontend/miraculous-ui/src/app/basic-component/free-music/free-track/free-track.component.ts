import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PlayableTrackDto} from "../../../../dto/playable-track-dto/playable-track-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";
import {TrackLikeDto} from "../../../../dto/track-like-dto/track-like-dto";
import {TokenStorageServiceService} from "../../../../services/token-storage-service/token-storage-service.service";
import {TrackServiceService} from "../../../../services/track-service/track-service.service";
import {PlayerServiceService} from "../../../../services/player-service/player-service.service";

@Component({
  selector: 'free-track',
  templateUrl: './free-track.component.html',
  styleUrls: ['./free-track.component.css']
})
export class FreeTrackComponent implements OnInit {

  @Input() freeTrack: PlayableTrackDto = new PlayableTrackDto();
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  songsUrl: string = DomainServiceService.TRACKS_PATH;
  trackPageUrl: string = DomainServiceService.TRACK_PAGE_PATH;
  artistPageUrl: string = DomainServiceService.ARTIST_PROFILE_PATH;
  isPlaying: boolean = false;

  @ViewChild("pauseIcon")
  pauseIcon: ElementRef;

  @ViewChild("playIcon")
  playIcon: ElementRef;

  @ViewChild("track")
  track: ElementRef;

  constructor(private tokenService: TokenStorageServiceService,
              private trackService: TrackServiceService,
              private playerService: PlayerServiceService) { }

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

  putLike() {

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null){

      document.querySelector(".login-message").innerHTML = "To be able to like music, you need to sign in";
      this.showSignInPanel();

    }else {

      let trackLikeDto: TrackLikeDto = new TrackLikeDto();
      trackLikeDto.trackId = this.freeTrack.id;
      trackLikeDto.siteVisitorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      this.trackService.putOrRemoveLikeFromTrack(trackLikeDto).subscribe(

        data =>{
          this.freeTrack.likedByCurrentVisitor = data.body.trackLikedByCurrentVisitor;
          this.freeTrack.numberOfLikes = data.body.numberOfLikes;
        },
        error1 => {

          console.log(error1.message);
        }
      )
    }
  }

  showSignInPanel() {

    this.showLoginComponent();
  }


  hideOtherComponents(){

    document.querySelector(".darkening-overflow").setAttribute("style","display: block");
    document.querySelector(".navigation-panel").setAttribute("style","opacity: 0.5; transition: 2s");
    document.querySelector(".basic-component-container").setAttribute("style", "pointer-events: none");

  }

  showLoginComponent(){

    document.querySelector(".login-component").setAttribute("style", "z-index: 1000000 ;opacity: 1; pointer-events: all; transition: 1s; position: fixed; width: 930px; height: 510px; top:22%");
    this.hideOtherComponents();
  }

  addTrackToQueue() {

    this.playerService.playableTracks.push(this.freeTrack);
  }
}
