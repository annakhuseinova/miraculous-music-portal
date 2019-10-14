import {Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {TagComponent} from "../upload-album/tag/tag.component";
import {ArtistSettingsDto} from "../../../dto/artist-settings-dto/artist-settings-dto";
import {ArtistServiceService} from "../../../services/artist-service/artist-service.service";
import {TokenStorageServiceService} from "../../../services/token-storage-service/token-storage-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GenreDto} from "../../../dto/genre-dto/genre-dto";
import {GenreServiceService} from "../../../services/genre-service/genre-service.service";
import {EventRetrievalDto} from "../../../dto/event-retreival-dto/event-retrieval-dto";
import {EventDispatchDto} from "../../../dto/event-dispatch-dto/event-dispatch-dto";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {EventServiceService} from "../../../services/event-service/event-service.service";
import {DomainServiceService} from "../../../services/domain-service/domain-service.service";
import {SiteVisitorServiceService} from "../../../services/site-visitor-service/site-visitor-service.service";

@Component({
  selector: 'app-edit-artist-profile',
  templateUrl: './edit-artist-profile.component.html',
  styleUrls: ['./edit-artist-profile.component.css']
})
export class EditArtistProfileComponent implements OnInit {


  allGenres: GenreDto[] = [];
  artistGenres: GenreDto[] = [];
  errorMessage: string;
  artistSettingsDto: ArtistSettingsDto = new ArtistSettingsDto();
  artistId: number;
  artistEvents: EventRetrievalDto[] = [];
  isUserPictureChosen: boolean;
  isEventPictureChosen: boolean;
  eventToBeAddedToArtist: EventDispatchDto = new EventDispatchDto();
  eventValidationError: EventDispatchDto = new EventDispatchDto();
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  artistValidationError: ArtistSettingsDto = new ArtistSettingsDto();

  @ViewChild("userPhotoInput", {read: ElementRef})
  userPhotoInput: ElementRef;

  @ViewChild("userProfilePicture", {read: ElementRef})
  userProfilePicture: ElementRef;

  @ViewChild("accountDeletionConfirmationComponent", {read: ElementRef})
  accountDeletionConfirmationComponent: ElementRef;

  @ViewChild("selectFavouriteGenres", {read: ElementRef})
  selectFavouriteGenres: ElementRef;

  @ViewChild("favouriteGenres", {read: ElementRef})
  favouriteGenres: ElementRef;

  @ViewChild("eventCoverPicture")
  eventCoverPicture: ElementRef;

  @ViewChild("eventCoverPictureInput")
  eventCoverPicInput: ElementRef;

  @ViewChild("favouriteGenresVsf", {read: ViewContainerRef})
  favouriteGenresVsf: ViewContainerRef;

  @ViewChild("selectFavouriteGenres")
  selectGenres: ElementRef;

  constructor(private genreService: GenreServiceService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private artistService: ArtistServiceService,
              private tokenStorageService: TokenStorageServiceService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private eventService: EventServiceService,
              private siteVisitorService: SiteVisitorServiceService ) { }

  ngOnInit() {

   this.getAllGenres();
   this.getArtistEvents();
   this.getArtistGenres();
   this.getArtistSettingsInfo();
   this.eventToBeAddedToArtist.artistId = this.activatedRoute.snapshot.params["id"];
  }


  getArtistSettingsInfo(){

    this.artistService.getArtistSettingsInfo(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {

        this.artistSettingsDto = data;
        this.tokenStorageService.savePictureUrl(this.tokenStorageService.isRememberMeModeOn(), data.pictureUrlName);
        this.isUserPictureChosen = false;
        this.artistValidationError = new ArtistSettingsDto();
      },
      error1 => {

        if (error1.status == 404){

          this.router.navigate(["miraculous/not-found"]);
        }
        this.errorMessage = error1.message;
      }
    )
  }


  getArtistGenres(){

    this.siteVisitorService.getSiteVisitorGenres(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {

        this.artistGenres = data.body;
        this.showArtistGenres();
      },
      error1 => {

        console.log(error1.message);
      }
    )
  }

  getAllGenres(){

    this.genreService.getAllGenres().subscribe(

      data => {

        this.allGenres = data;
      },
      error1 => {

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

  navigate(path: string) {

    this.router.navigate(['miraculous/'+ path]);
    window.scroll(0,0);

  }

  changeUserPicture() {

    if (this.userPhotoInput.nativeElement.files.length != 0) {

      let userPicturePath = URL.createObjectURL(this.userPhotoInput.nativeElement.files[0]);
      this.userProfilePicture.nativeElement.style = "background-repeat: no-repeat; background-fullAlbumTrackVersionSize: cover; background-image: url(" + userPicturePath + ")";
      this.isUserPictureChosen = true;
    }
  }

  changeEventPicture(){

    let eventCoverPicturePath = URL.createObjectURL(this.eventCoverPicInput.nativeElement.files[0]);
    this.eventCoverPicture.nativeElement.style = "background-repeat: no-repeat; background-fullAlbumTrackVersionSize: cover; background-image: url(" + eventCoverPicturePath + ")";
    this.isEventPictureChosen = true;
  }

  showAccountDeletionBlock() {

    this.accountDeletionConfirmationComponent.nativeElement.style = "pointer-events: all; z-index: 10000;opacity: 1; height: 280px; width: 400px; left: 37%; top: 29%; transition: 2s; position:fixed;";
    this.hideOtherElements();
  }

  closeAccountDeletionBlock() {
    this.accountDeletionConfirmationComponent.nativeElement.style = "pointer:events: none; z-index: 0; opacity: 0; height: 0; width: 0; left: 37%; top: 29%; transition: 0; position:absolute;";
    this.showOtherElements();
  }

  hideOtherElements(){
    document.querySelector(".darkening-overflow").setAttribute("style","display: block; pointer-events: none;");
    document.querySelector(".navigation-panel").setAttribute("style", "opacity: 0.5; transition: 2s");
    document.querySelector("app-basic-component").setAttribute("style", "pointer-events: none");
  }

  showOtherElements(){
    document.querySelector(".darkening-overflow").setAttribute("style","display: none; pointer-events: all;");
    document.querySelector(".navigation-panel").setAttribute("style", "opacity: 1; transition: 2s");
    document.querySelector("app-basic-component").setAttribute("style", "pointer-events: all");
  }

  addTagToSelectedGenres() {

    let tagsContainer = document.querySelector(".favourite-genres-block-selected-genres");
    let selectedIndex = this.selectFavouriteGenres.nativeElement.options.selectedIndex;
    let selectedGenre = this.selectFavouriteGenres.nativeElement.options[selectedIndex].value;

    if (!this.artistGenres.includes(this.allGenres[selectedIndex])) {

      this.artistGenres.push(this.allGenres[selectedIndex]);
      console.log(this.artistGenres);
    }

    for (let i = 0; i < tagsContainer.children.length; i++) {

      if (this.favouriteGenres.nativeElement.children.length == 0) {

        continue;

      } else {
        if (this.favouriteGenres.nativeElement.children[i].textContent == selectedGenre) {
          return;
        }
      }
    }
    let tagFactory = this.componentFactoryResolver.resolveComponentFactory(TagComponent);
    let componentRef = this.favouriteGenresVsf.createComponent(tagFactory);
    componentRef.instance.tagText = selectedGenre;
    componentRef.instance.genreId = this.selectFavouriteGenres.nativeElement.options[selectedIndex].id;
    componentRef.instance.closedElement.subscribe(()=>{

      this.artistGenres.splice(this.artistGenres.findIndex(x => x.id == componentRef.instance.genreId),  1);
      componentRef.destroy();
      console.log(this.artistGenres);
    });
  }

  showArtistGenres(){

    for (let i = 0; i < this.artistGenres.length; i++) {

      let tagFactory = this.componentFactoryResolver.resolveComponentFactory(TagComponent);
      let componentRef = this.favouriteGenresVsf.createComponent(tagFactory);
      componentRef.instance.tagText = this.artistGenres[i].title;
      componentRef.instance.genreId = this.artistGenres[i].id;
      componentRef.instance.closedElement.subscribe(()=>{

        componentRef.destroy();
        this.artistGenres.splice(this.artistGenres.findIndex(x => x.id == componentRef.instance.genreId),  1);
        console.log(this.artistGenres);
      })
    }
  }

  removeUserPhoto() {

    this.userPhotoInput.nativeElement.value = "";
    document.querySelector(".user-profile-picture").setAttribute("style", "background-image:  url("+this.imagesPath+ this.artistSettingsDto.pictureUrlName  +")");
    this.isUserPictureChosen = false;
  }

  removeEventPicture() {

    this.eventCoverPicInput.nativeElement.value = "";
    this.isEventPictureChosen = false;
  }

  addNewArtistEvent() {

    this.artistService.addNewEventToArtist(this.eventToBeAddedToArtist, this.eventCoverPicInput.nativeElement.files[0]).subscribe(

      event => {

        if ((<HttpResponse<any>>event).status == 200){
          this.clearEventFormData();
          this.getArtistEvents();
          this.eventValidationError = new EventDispatchDto();
        }
      },

      error1 => {

        if (error1.status == 400){

          this.eventValidationError = JSON.parse(error1.error);
        }
        console.log(error1.message);
      }
    )
  }

  clearEventFormData(){

    this.eventToBeAddedToArtist.eventLocation = "";
    this.eventToBeAddedToArtist.eventText = "";
    this.eventToBeAddedToArtist.eventTime = "";
    this.eventToBeAddedToArtist.eventTitle = "";
    this.removeEventPicture();
  }

  deleteEvent(eventId: number) {

    this.eventService.deleteArtistEvent(eventId).subscribe(

      result => {

        this.getArtistEvents();
      },
      error1 => {

        console.log(error1.message);
      }
    )
  }


  updateArtistSettings() {

    if (this.artistSettingsDto.password != null){
      if (this.artistSettingsDto.password.trim().length ==0){

          this.artistSettingsDto.password = null;
      }
    }

    if (this.artistSettingsDto.confirmationPassword != null){

      if (this.artistSettingsDto.confirmationPassword.trim().length == 0){

        this.artistSettingsDto.confirmationPassword = null;
      }
    }

    this.artistService.updateArtistSettings(this.artistSettingsDto, this.userPhotoInput.nativeElement.files[0], this.artistGenres).subscribe(

      result => {

        if ((<HttpResponse<any>> result).status == 200){

            this.getArtistSettingsInfo();
        }
      },
      error1 => {

        if (error1.status == 400){

          this.artistValidationError = JSON.parse(error1.error);
        }

        console.log(error1.message);
      }
    )
  }

  completeDeletion() {
    this.showOtherElements();
  }

  deleteArtistPhoto() {

    this.artistService.deleteArtistPhoto(this.artistSettingsDto.pictureUrlName, this.artistSettingsDto.id).subscribe(

      result => {

        this.userPhotoInput.nativeElement.value = "";
        this.getArtistSettingsInfo();
        this.tokenStorageService.savePictureUrl(this.tokenStorageService.isRememberMeModeOn(), null);
        this.isUserPictureChosen = false;
      },
      error1 => {

        console.log(error1.message);
      }
    )
  }
}
