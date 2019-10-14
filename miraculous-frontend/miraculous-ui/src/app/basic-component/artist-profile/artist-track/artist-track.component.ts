import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PlayableTrackDto} from "../../../../dto/playable-track-dto/playable-track-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";
import {TokenStorageServiceService} from "../../../../services/token-storage-service/token-storage-service.service";
import {TrackCartDto} from "../../../../dto/track-cart-dto/track-cart-dto";
import {CartServiceService} from "../../../../services/cart-service/cart-service.service";
import {TrackLikeDto} from "../../../../dto/track-like-dto/track-like-dto";
import {TrackServiceService} from "../../../../services/track-service/track-service.service";
import {PlayerServiceService} from "../../../../services/player-service/player-service.service";

@Component({
  selector: 'artist-track',
  templateUrl: './artist-track.component.html',
  styleUrls: ['./artist-track.component.css']
})
export class ArtistTrackComponent implements OnInit {

  @Input() track: PlayableTrackDto = new PlayableTrackDto();
  trackPageUrl: string = DomainServiceService.TRACK_PAGE_PATH;
  trackAudioUrl: string = DomainServiceService.TRACKS_PATH;
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  isPlaying: boolean = false;
  @Output() onUnauthorizedLikeOrAdditionToCart = new EventEmitter();

  @ViewChild("audio")
  audio: ElementRef;

  @ViewChild("pauseIcon")
  pauseIcon: ElementRef;

  @ViewChild("playIcon")
  playIcon: ElementRef;

  constructor(private tokenService: TokenStorageServiceService,
              private cartService: CartServiceService,
              private trackService: TrackServiceService,
              private playerService: PlayerServiceService) {
  }

  ngOnInit() {

  }

  playOrPauseTrack(){

    if (this.isPlaying){

      (this.audio.nativeElement as HTMLAudioElement).pause();

      this.isPlaying = false;

    } else {

      (this.audio.nativeElement as HTMLAudioElement).play();
      this.isPlaying = true;
    }
  }

  putLike() {

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null) {

      document.querySelector(".login-message").innerHTML = "In order to like music, you need to sign in";
      this.onUnauthorizedLikeOrAdditionToCart.emit();

    }else {

      let trackLikeDto: TrackLikeDto = new TrackLikeDto();
      trackLikeDto.trackId = this.track.id;
      trackLikeDto.siteVisitorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      this.trackService.putOrRemoveLikeFromTrack(trackLikeDto).subscribe(

        data =>{

          this.track.likedByCurrentVisitor = data.body.trackLikedByCurrentVisitor;
          this.track.numberOfLikes = data.body.numberOfLikes;
        },
        error1 => {

          console.log(error1.message);
        }
      )
    }
  }

  addToCart() {

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null) {

      document.querySelector(".login-message").innerHTML = "In order to use cart, you need to sign in";
      this.onUnauthorizedLikeOrAdditionToCart.emit();

    }else {

      let trackCartDto: TrackCartDto = new TrackCartDto();
      trackCartDto.trackId = this.track.id;
      trackCartDto.visitorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      this.cartService.putOrRemoveTrackFromCart(trackCartDto).subscribe(

        data => {

          this.track.inCartOfCurrentVisitor = data.body.inCartOfCurrentVisitor;
        },

        error1 => {

          console.log(error1.message);
        }
      )
    }
  }

  endTrack() {
    this.isPlaying = false;
  }

  addTrackToQueue() {
    this.playerService.playableTracks.push(this.track);
  }
}



