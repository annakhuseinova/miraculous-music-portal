import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PlayableTrackDto} from "../../../../dto/playable-track-dto/playable-track-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";
import {PlayerServiceService} from "../../../../services/player-service/player-service.service";
import {TokenStorageServiceService} from "../../../../services/token-storage-service/token-storage-service.service";
import {TrackServiceService} from "../../../../services/track-service/track-service.service";
import {CartServiceService} from "../../../../services/cart-service/cart-service.service";
import {TrackCartDto} from "../../../../dto/track-cart-dto/track-cart-dto";
import {TrackLikeDto} from "../../../../dto/track-like-dto/track-like-dto";

@Component({
  selector: 'top-track',
  templateUrl: './top-track.component.html',
  styleUrls: ['./top-track.component.css']
})
export class TopTrackComponent implements OnInit {


  @Input() topTrack: PlayableTrackDto;
  @Input() numberOfTrack: number;

  @ViewChild("audio", {read: ElementRef})
  audio: ElementRef;
  isPlaying: boolean = false;

  albumTitle: string;
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  imageUrlName: string;
  trackPageUrl: string = DomainServiceService.TRACK_PAGE_PATH;
  artistPageUrl: string = DomainServiceService.ARTIST_PROFILE_PATH;
  songPathUrl: string = DomainServiceService.TRACKS_PATH;
  albumPageUrl: string = DomainServiceService.ALBUM_PAGE_PATH;

  constructor(private playerService: PlayerServiceService,
              private tokenService: TokenStorageServiceService,
              private trackService: TrackServiceService,
              private cartService: CartServiceService) { }

  ngOnInit() {

    if (this.topTrack.albumTitle == null){

      this.albumTitle = null;

    } else {

      this.albumTitle = this.topTrack.albumTitle;
    }

    this.imageUrlName = this.topTrack.coverPictureUrlName;

  }

  addTrackToQueue() {

    this.playerService.playableTracks.push(this.topTrack);

  }

  showGifPicture() {

    if (this.isPlaying == false){

      this.imageUrlName = "giphy.gif";

    } else {

      return;
    }
  }

  hideGifPicture() {

    if (this.isPlaying == true){

      return;

    } else {

      this.imageUrlName = this.topTrack.coverPictureUrlName;
    }
  }

  startOrStopPlaying() {

    if (this.isPlaying == false){

      this.imageUrlName = "giphy.gif";
      (<HTMLAudioElement>this.audio.nativeElement).play();
      this.isPlaying = true;

    } else {

      this.imageUrlName = this.topTrack.coverPictureUrlName;
      (<HTMLAudioElement>this.audio.nativeElement).pause();
      this.isPlaying = false;
    }
  }

  setIsPlayingToFalse() {

    this.isPlaying = false;
    this.imageUrlName = this.topTrack.coverPictureUrlName;
  }

  putLike() {

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null){

      document.querySelector(".login-message").innerHTML = "To be able to like music, you need to sign in";
      this.showSignInPanel();

    }else {

        let trackLikeDto: TrackLikeDto = new TrackLikeDto();
        trackLikeDto.trackId = this.topTrack.id;
        trackLikeDto.siteVisitorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
        this.trackService.putOrRemoveLikeFromTrack(trackLikeDto).subscribe(

          data =>{
            this.topTrack.likedByCurrentVisitor = data.body.trackLikedByCurrentVisitor;
            this.topTrack.numberOfLikes = data.body.numberOfLikes;
          },
            error1 => {

            console.log(error1.message);
            }
        )
    }
  }

  addTrackToCart() {

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null){

      document.querySelector(".login-message").innerHTML = "To be able to use cart, you need to sign in";
      this.showSignInPanel();

    }else {

      let trackCartDto: TrackCartDto = new TrackCartDto();
      trackCartDto.trackId = this.topTrack.id;
      trackCartDto.visitorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      this.cartService.putOrRemoveTrackFromCart(trackCartDto).subscribe(

        data => {

          this.topTrack.inCartOfCurrentVisitor = data.body.inCartOfCurrentVisitor;
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
}
