import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";
import {PlayableTrackDto} from "../../../../dto/playable-track-dto/playable-track-dto";
import {TrackLikeDto} from "../../../../dto/track-like-dto/track-like-dto";
import {TokenStorageServiceService} from "../../../../services/token-storage-service/token-storage-service.service";
import {TrackServiceService} from "../../../../services/track-service/track-service.service";
import {TrackCartDto} from "../../../../dto/track-cart-dto/track-cart-dto";
import {CartServiceService} from "../../../../services/cart-service/cart-service.service";
import {PlayerServiceService} from "../../../../services/player-service/player-service.service";

@Component({
  selector: 'genre-track',
  templateUrl: './genre-track.component.html',
  styleUrls: ['./genre-track.component.css']
})
export class GenreTrackComponent implements OnInit {

  imagesPath: string = DomainServiceService.PICTURES_PATH;
  songsPath: string = DomainServiceService.TRACKS_PATH;
  artistPagePath: string = DomainServiceService.ARTIST_PROFILE_PATH;
  trackPagePath: string = DomainServiceService.TRACK_PAGE_PATH;
  isPlaying: boolean = false;
  @Input() genreTrack: PlayableTrackDto = new PlayableTrackDto();

  @ViewChild("track")
  track: ElementRef;

  @ViewChild("pauseIcon")
  pauseIcon: ElementRef;

  @ViewChild("playIcon")
  playIcon: ElementRef;

  constructor(private tokenService: TokenStorageServiceService,
              private trackService: TrackServiceService,
              private cartService: CartServiceService,
              private playerService: PlayerServiceService) { }

  ngOnInit() {
  }

  playOrPauseTrack(){

    if (this.isPlaying){

      (this.track.nativeElement as HTMLAudioElement).pause();

      this.setPlayIcon();

    } else {

      (this.track.nativeElement as HTMLAudioElement).play();
      this.isPlaying = true;
      this.setPauseIcon();
    }
  }

  setPauseIcon(){

    this.playIcon.nativeElement.style = "display: none";
    this.pauseIcon.nativeElement.style = "display: block";
    this.isPlaying = true;
  }

  setPlayIcon(){

    this.playIcon.nativeElement.style = "display: block";
    this.pauseIcon.nativeElement.style = "display: none";
    this.isPlaying = false;
  }

  addTrackToCart() {

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null){

      document.querySelector(".login-message").innerHTML = "To be able to use cart, you need to sign in";
      this.showSignInPanel();

    }else {

      let trackCartDto: TrackCartDto = new TrackCartDto();
      trackCartDto.trackId = this.genreTrack.id;
      trackCartDto.visitorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      this.cartService.putOrRemoveTrackFromCart(trackCartDto).subscribe(

        data => {

          this.genreTrack.inCartOfCurrentVisitor = data.body.inCartOfCurrentVisitor;
        },

        error1 => {
          console.log(error1.message);
        }
      )
    }
  }

  putLike() {
    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null){

      document.querySelector(".login-message").innerHTML = "To be able to like music, you need to sign in";
      this.showSignInPanel();

    }else {

      let trackLikeDto: TrackLikeDto = new TrackLikeDto();
      trackLikeDto.trackId = this.genreTrack.id;
      trackLikeDto.siteVisitorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      this.trackService.putOrRemoveLikeFromTrack(trackLikeDto).subscribe(

        data =>{

          this.genreTrack.likedByCurrentVisitor = data.body.trackLikedByCurrentVisitor;
          this.genreTrack.numberOfLikes = data.body.numberOfLikes;
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

    this.playerService.playableTracks.push(this.genreTrack);
  }
}
