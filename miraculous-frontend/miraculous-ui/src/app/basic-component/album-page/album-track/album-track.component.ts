import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PlayableTrackDto} from "../../../../dto/playable-track-dto/playable-track-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";
import {TokenStorageServiceService} from "../../../../services/token-storage-service/token-storage-service.service";
import {TrackLikeDto} from "../../../../dto/track-like-dto/track-like-dto";
import {TrackServiceService} from "../../../../services/track-service/track-service.service";
import {TrackCartDto} from "../../../../dto/track-cart-dto/track-cart-dto";
import {CartServiceService} from "../../../../services/cart-service/cart-service.service";

@Component({
  selector: 'album-track',
  templateUrl: './album-track.component.html',
  styleUrls: ['./album-track.component.css']
})
export class AlbumTrackComponent implements OnInit {

  @Input() albumTrack: PlayableTrackDto = new PlayableTrackDto();
  albumTrackUrl: string = DomainServiceService.TRACKS_PATH;
  albumTrackPageUrl: string = DomainServiceService.TRACK_PAGE_PATH;
  @Output() onUnauthorizedAttemptToLikeOrAddToCart = new EventEmitter();

  @ViewChild("audio")
  audio: ElementRef;

  @ViewChild("pauseIcon")
  pauseIcon: ElementRef;

  isPlaying: boolean;

  constructor(private tokenService: TokenStorageServiceService,
              private trackService: TrackServiceService,
              private cartService: CartServiceService) { }

  ngOnInit() {

    this.setPlayIcon();
    this.isPlaying = false;
  }

  playAlbumTrack() {

    if(!(<HTMLAudioElement> this.audio.nativeElement).paused){
      
      (<HTMLAudioElement> this.audio.nativeElement).pause();
      this.setPlayIcon();


    }else {

      if (this.isPlaying == false){

        (<HTMLAudioElement> this.audio.nativeElement).play();
        this.setPauseIcon();

      } else {

        (<HTMLAudioElement> this.audio.nativeElement).play();

        this.setPlayIcon();
        this.isPlaying = false;
      }

    }

  }


  setPlayIcon(){

    document.querySelector(".fa-pause").setAttribute("style", "display: none");
    document.querySelector(".fa-play").setAttribute("style", "display: inline-block");
  }


  setPauseIcon(){

    document.querySelector(".fa-pause").setAttribute("style", "display: inline-block");
    document.querySelector(".fa-play").setAttribute("style", "display: none");

  }

  stopAlbumTrack() {

    this.isPlaying = false;
    this.setPlayIcon();
  }

  addTrackToCart() {

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null){

      document.querySelector(".login-message").innerHTML = "In order to use cart, you need to sign in";
      this.onUnauthorizedAttemptToLikeOrAddToCart.emit();

    }else {

      let trackCartDto: TrackCartDto = new TrackCartDto();
      trackCartDto.trackId = this.albumTrack.id;
      trackCartDto.visitorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      this.cartService.putOrRemoveTrackFromCart(trackCartDto).subscribe(

        data => {

          this.albumTrack.inCartOfCurrentVisitor = data.body.inCartOfCurrentVisitor;
        },

        error1 => {

          console.log(error1.message);
        }
      )
    }
  }

  putLike() {

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null){

      document.querySelector(".login-message").innerHTML = "In order to like music, you need to sign in";
      this.onUnauthorizedAttemptToLikeOrAddToCart.emit();

    }else {

      let trackLikeDto: TrackLikeDto = new TrackLikeDto();
      trackLikeDto.trackId = this.albumTrack.id;
      trackLikeDto.siteVisitorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      this.trackService.putOrRemoveLikeFromTrack(trackLikeDto).subscribe(

        data =>{

          this.albumTrack.likedByCurrentVisitor = data.body.trackLikedByCurrentVisitor;
          this.albumTrack.numberOfLikes = data.body.numberOfLikes;

        },
        error1 => {

          console.log(error1.message);
        }
      )
    }
  }
}

