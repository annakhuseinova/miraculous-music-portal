import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ArtistProfileDto} from "../../../dto/artist-profile-dto/artist-profile-dto";
import {ArtistServiceService} from "../../../services/artist-service/artist-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DomainServiceService} from "../../../services/domain-service/domain-service.service";
import {TokenStorageServiceService} from "../../../services/token-storage-service/token-storage-service.service";
import {AlbumLinkDto} from "../../../dto/album-link-dto/album-link-dto";
import {PlayableTrackDto} from "../../../dto/playable-track-dto/playable-track-dto";
import {CommentDispatchDto} from "../../../dto/comment-dispatch-dto/comment-dispatch-dto";
import {CommentRetrievalDto} from "../../../dto/comment-retrieval-dto/comment-retrieval-dto";
import {EventRetrievalDto} from "../../../dto/event-retreival-dto/event-retrieval-dto";
import {GenreDto} from "../../../dto/genre-dto/genre-dto";
import {SiteVisitorServiceService} from "../../../services/site-visitor-service/site-visitor-service.service";

@Component({
  selector: 'artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css']
})
export class ArtistProfileComponent implements OnInit {

  commentToBeSent: CommentDispatchDto = new CommentDispatchDto();
  errorMessage: string;
  artistComments: CommentRetrievalDto[] = [];
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  fullArtistInfoDto: ArtistProfileDto = new ArtistProfileDto();
  artistAlbums: AlbumLinkDto[] = [];
  artistTracks: PlayableTrackDto[] = [];
  artistEvents: EventRetrievalDto[] = [];
  genre: GenreDto = new GenreDto();
  artistGenres: GenreDto[] = [];

  @ViewChild("commentTextArea")
  commentTextArea: ElementRef;

  @ViewChild("navigationPanel")
  navigationPanel: ElementRef;

  @ViewChild("darkeningOverflow")
  darkeningOverflow: ElementRef;

  @ViewChild("loginComponent", {read: ElementRef})
  loginComponent: ElementRef;

  @ViewChild("container")
  basicComponentContainer: ElementRef;

  constructor(private artistService: ArtistServiceService, private activatedRoute: ActivatedRoute,
              private tokenService: TokenStorageServiceService, private siteVisitorService: SiteVisitorServiceService,
              private router: Router) { }


  ngOnInit() {

    this.getArtistComments();
    this.getArtistInfo();
    this.getArtistAlbums();
    this.getArtistTracks();
    this.getArtistEvents();
    this.getArtistGenres();


    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null){

      document.querySelector(".comment-form").setAttribute("style", "display: none");
      document.querySelector(".sign-in-suggestion").setAttribute("style", "display: block");
    }

  }

  getArtistGenres(){

    this.siteVisitorService.getSiteVisitorGenres(this.activatedRoute.snapshot.params["id"]).subscribe(

      data=> {

        this.artistGenres = data.body;

      },error1 => {

        console.log(error1.message);
      }
    )
  }

  getArtistEvents(){

    this.artistService.getArtistEvents(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {

        this.artistEvents = data.body;
      },
      error1 => {

        console.log(error1.message);
      }
    )
  }

  getArtistTracks(){

    this.artistService.getArtistAllTracksByArtistId(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {

        this.artistTracks = data;

      },
      error1 => {

        console.log(error1.message);
      }
    )
  }

  getArtistAlbums(){

    this.artistService.getArtistAllAlbumsByArtistId(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {

        this.artistAlbums = data;
      },
      error1 => {

        console.log(error1.message);
      }
    );
  }

  getArtistInfo(){

    this.artistService.getArtistProfileInfo(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {

        this.fullArtistInfoDto = data;

      },
      error1 => {

        if (error1.status == 404){}

        this.router.navigate(["miraculous/not-found"]);
      }
    );
  }


  getArtistComments(){

    this.artistService.getArtistComments(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {

        this.artistComments = data;
      },
      error1 => {

        this.errorMessage = error1.message;
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

  sendComment() {

    this.commentToBeSent.authorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
    this.commentToBeSent.artistId = this.activatedRoute.snapshot.params["id"];
    this.artistService.postArtistComment(this.commentToBeSent).subscribe(

      response => {

        this.getArtistComments();
        this.clearTextArea();
      },

      error1 => {

        console.log(error1.message);
      }
    )
  }

    clearTextArea() {

    this.commentTextArea.nativeElement.value = "";

  }

}
