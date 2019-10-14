import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FullTrackInfoDto} from "../../../dto/full-track-info-dto/full-track-info-dto";
import {TrackServiceService} from "../../../services/track-service/track-service.service";
import {TrackLinkDto} from "../../../dto/track-link-dto/track-link-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {DomainServiceService} from "../../../services/domain-service/domain-service.service";
import {TokenStorageServiceService} from "../../../services/token-storage-service/token-storage-service.service";
import {CommentRetrievalDto} from "../../../dto/comment-retrieval-dto/comment-retrieval-dto";
import {CommentDispatchDto} from "../../../dto/comment-dispatch-dto/comment-dispatch-dto";
import {TrackCartDto} from "../../../dto/track-cart-dto/track-cart-dto";
import {CartServiceService} from "../../../services/cart-service/cart-service.service";
import {TrackLikeDto} from "../../../dto/track-like-dto/track-like-dto";

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {

  fullTrackInfoDto: FullTrackInfoDto = new FullTrackInfoDto();
  commentToBePosted: CommentDispatchDto = new CommentDispatchDto();
  trackComments: CommentRetrievalDto[] = [];
  similarTracks: TrackLinkDto[] = [];
  trackAudioUrl: string = DomainServiceService.TRACKS_PATH;
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  artistPageUrl: string = DomainServiceService.ARTIST_PROFILE_PATH;

  @ViewChild("trackCommentTextArea")
  trackCommentTextArea: ElementRef;

  @ViewChild("audio")
  audio: ElementRef;

  @ViewChild("trackProgressBar")
  trackProgressBar: ElementRef;

  @ViewChild("pauseIcon")
  pauseIcon: ElementRef;

  isPlaying: boolean;


  constructor(private trackService: TrackServiceService,
              private activatedRoute: ActivatedRoute,
              private domainService: DomainServiceService,
              private tokenService: TokenStorageServiceService,
              private router: Router,
              private cartService: CartServiceService) {
  }

  ngOnInit() {


    this.setPlayIcon();
    this.isPlaying = false;
    this.getTrackFullInfo();
    this.getSimilarTracks();
    this.getTrackComments();


    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null){

      document.querySelector(".album-page-comments-form-block").setAttribute("style", "display: none");
      document.querySelector(".sign-in-suggestion").setAttribute("style", "display: block");
    }
  }

  getTrackFullInfo(){

    this.trackService.getTrackFullInfo(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {

        this.fullTrackInfoDto = data.body;

      },
      error1 => {

        if (error1.status == 404 ){

          this.router.navigate(["miraculous/not-found"]);
        }
      }
    );
  }


  getSimilarTracks(){

    this.trackService.getSimilarTracks(this.activatedRoute.snapshot.params["id"]).subscribe(
      data => {

        this.similarTracks = data;
      },
      error1 => {

        console.log(error1.message);
      }
    )
  }

  getTrackComments(){
    this.trackService.getTrackComments(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {

        this.trackComments = data.body;
      },
      error1 => {

      }
    )
  }


  showSignInPanel() {

    this.showLoginComponent();
  }


  hideOtherComponents() {

    document.querySelector(".darkening-overflow").setAttribute("style", "display: block");
    document.querySelector(".navigation-panel").setAttribute("style", "opacity: 0.5; transition: 2s");
    document.querySelector(".basic-component-container").setAttribute("style", "pointer-events: none");

  }

  showLoginComponent() {

    document.querySelector(".login-component").setAttribute("style", "z-index: 1000000 ;opacity: 1; pointer-events: all; transition: 1s; position: fixed; width: 930px; height: 510px; top:22%");
    this.hideOtherComponents();

  }

  playTrack() {

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

  updateProgressBar() {
    let filling = document.querySelector(".progress-fill");
    let trackHandle = document.querySelector(".track-handle");
    let position = (<HTMLAudioElement>this.audio.nativeElement).currentTime/(<HTMLAudioElement>this.audio.nativeElement).duration;
    filling.setAttribute("style", "width: +"+position*100+"%");
    trackHandle.setAttribute("style", "left: +"+position*100+"%");
    console.log((<HTMLAudioElement>this.audio.nativeElement).currentTime);

  }

  playTrackAtChosenMoment(event){

    let percent = event.offsetX / this.trackProgressBar.nativeElement.offsetWidth;
    console.log(percent);
    (<HTMLAudioElement>this.audio.nativeElement).currentTime = percent * (<HTMLAudioElement>this.audio.nativeElement).duration;
    this.updateProgressBar();

  }

  setTrackHandleAtTrackStart(){

    let filling = document.querySelector(".progress-fill");
    let trackHandle = document.querySelector(".track-handle");
    filling.setAttribute("style", "width: +"+ 0 +"%");
    trackHandle.setAttribute("style", "left: +"+ 0 +"%");
  }

  stopTrack() {

    this.isPlaying = false;
    this.setPlayIcon();
    this.setTrackHandleAtTrackStart();
  }

  addTrackToCart() {

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null){
      document.querySelector(".login-message").innerHTML = "In order to use cart, you need to sign in";
      this.showSignInPanel();

    }else {

      let trackCartDto: TrackCartDto = new TrackCartDto();
      trackCartDto.trackId = this.fullTrackInfoDto.id;
      trackCartDto.visitorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      this.cartService.putOrRemoveTrackFromCart(trackCartDto).subscribe(

        data => {

          this.fullTrackInfoDto.inCartOfCurrentVisitor = data.body.inCartOfCurrentVisitor;
          console.log(this.fullTrackInfoDto);
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
      this.showSignInPanel();

    }else {

      let trackLikeDto: TrackLikeDto = new TrackLikeDto();
      trackLikeDto.trackId = this.fullTrackInfoDto.id;
      trackLikeDto.siteVisitorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      this.trackService.putOrRemoveLikeFromTrack(trackLikeDto).subscribe(

        data =>{
          this.fullTrackInfoDto.likedByCurrentVisitor = data.body.trackLikedByCurrentVisitor;
          this.fullTrackInfoDto.numberOfLikes = data.body.numberOfLikes;
          console.log(this.fullTrackInfoDto);
        },
        error1 => {

          console.log(error1.message);
        }
      )

    }
  }

  postComment() {

    this.commentToBePosted.authorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
    this.commentToBePosted.trackId = this.activatedRoute.snapshot.params["id"];
    this.trackService.addCommentToTrack(this.commentToBePosted).subscribe(

      result =>{

        this.getTrackComments();
        this.clearTextArea();
      },
      error1 => {

      }
    )
  }

  clearTextArea(){

    this.trackCommentTextArea.nativeElement.value = "";
  }

}
