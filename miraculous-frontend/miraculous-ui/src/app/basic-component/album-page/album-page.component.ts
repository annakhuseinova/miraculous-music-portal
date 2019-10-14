import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FullAlbumInfoDto} from "../../../dto/full-album-info-dto/full-album-info-dto";
import {DomainServiceService} from "../../../services/domain-service/domain-service.service";
import {PlayableTrackDto} from "../../../dto/playable-track-dto/playable-track-dto";
import {AlbumLinkDto} from "../../../dto/album-link-dto/album-link-dto";
import {AlbumServiceService} from "../../../services/album-service/album-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageServiceService} from "../../../services/token-storage-service/token-storage-service.service";
import {CommentRetrievalDto} from "../../../dto/comment-retrieval-dto/comment-retrieval-dto";
import {CommentDispatchDto} from "../../../dto/comment-dispatch-dto/comment-dispatch-dto";
import {AlbumLikeDto} from "../../../dto/album-like-dto/album-like-dto";
import {AlbumCartDto} from "../../../dto/album-cart-dto/album-cart-dto";
import {CartServiceService} from "../../../services/cart-service/cart-service.service";

@Component({
  selector: 'album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css']
})
export class AlbumPageComponent implements OnInit {

  album: FullAlbumInfoDto = new FullAlbumInfoDto();
  errorMessage: string;
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  similarAlbums: AlbumLinkDto[] = [];
  albumTracks: PlayableTrackDto[] = [];
  artistPageUrl: string = DomainServiceService.ARTIST_PROFILE_PATH;
  comments: CommentRetrievalDto[] = [];
  commentToBePosted: CommentDispatchDto = new CommentDispatchDto();

  @ViewChild("navigationPanel")
  navigationPanel: ElementRef;

  @ViewChild("darkeningOverflow")
  darkeningOverflow: ElementRef;

  @ViewChild("loginComponent", {read: ElementRef})
  loginComponent: ElementRef;

  @ViewChild("container")
  basicComponentContainer: ElementRef;

  @ViewChild("albumCommentTextArea")
  albumCommentTextArea: ElementRef;


  constructor(private albumService: AlbumServiceService,
              private activatedRoute: ActivatedRoute,
              private tokenService: TokenStorageServiceService,
              private router: Router,
              private cartService: CartServiceService) {

  }


  ngOnInit() {

    this.getAlbumFullInfo();
    this.getSimilarAlbums();
    this.getAlbumTracks();
    this.getAlbumComments();

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null){

      document.querySelector(".album-page-comments-form-block").setAttribute("style", "display: none");
      document.querySelector(".sign-in-suggestion").setAttribute("style", "display: block");
    }
  }

  getAlbumComments(){

    this.albumService.getAlbumComments(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {

        this.comments = data;
      }
    )
  }

  getAlbumTracks(){


    this.albumService.getTracksOfAlbum(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {

        this.albumTracks = data.body;
      },
      error1 => {

        console.log(error1.message);
      }
    )
  }


  getSimilarAlbums(){

    this.albumService.getSimilarAlbums(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {

        this.similarAlbums = data;

      },
      error1 => {

        console.log(error1.message);
      }
    )

  }

  getAlbumFullInfo(){

    this.albumService.getAlbumFullInfo(this.activatedRoute.snapshot.params["id"]).subscribe(

      data =>{
        this.album = data;


      },
      error1 => {

        if (error1.status == 404){

          this.router.navigate(["miraculous/not-found"]);
        }
      }
    )
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

  putLike() {

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null){

      document.querySelector(".login-message").innerHTML = "To be able to use cart, you need to sign in";
      this.showSignInPanel();

    }else {

      let albumLikeDto: AlbumLikeDto = new AlbumLikeDto();
      albumLikeDto.siteVisitorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      albumLikeDto.albumId = this.album.id;
      this.albumService.putOrRemoveLikeFromAlbum(albumLikeDto).subscribe(

        data => {

          this.album.numberOfLikes = data.body.numberOfLikes;
          this.album.likedByCurrentVisitor = data.body.albumLikedByCurrentVisitor;

        },
        error1 => {

          console.log(error1.message);
        }
      )
    }
  }

  addAlbumToCart() {

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null){

      document.querySelector(".login-message").innerHTML = "In order to use cart, you need to sign in";
      this.showSignInPanel();

    }else {

      let albumCartDto: AlbumCartDto = new AlbumCartDto();
      albumCartDto.albumId = this.album.id;
      albumCartDto.visitorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      this.cartService.putOrRemoveAlbumFromCart(albumCartDto).subscribe(

        data => {

          this.album.inCartOfCurrentVisitor = data.body.inCartOfCurrentVisitor;

        },
        error1 => {

          console.log(error1.message);
        }
      )
    }

  }


  postComment() {

    this.commentToBePosted.authorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
    this.commentToBePosted.albumId = this.activatedRoute.snapshot.params["id"];
    this.albumService.postComment(this.commentToBePosted).subscribe(

      result => {

        this.clearTextArea();
        this.getAlbumComments();
      },
      error1 => {

        console.log(error1.message);
      }
    )

  }

  clearTextArea() {

    this.albumCommentTextArea.nativeElement.value = "";

  }

}
