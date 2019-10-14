import {Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {TagComponent} from "../upload-album/tag/tag.component";
import {UserSettingsDto} from "../../../dto/user-settings-dto/user-settings-dto";
import {UserServiceService} from "../../../services/user-service/user-service.service";
import {TokenStorageServiceService} from "../../../services/token-storage-service/token-storage-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DomainServiceService} from "../../../services/domain-service/domain-service.service";
import {GenreServiceService} from "../../../services/genre-service/genre-service.service";
import {GenreDto} from "../../../dto/genre-dto/genre-dto";
import {SiteVisitorServiceService} from "../../../services/site-visitor-service/site-visitor-service.service";
import {applySourceSpanToExpressionIfNeeded} from "@angular/compiler/src/output/output_ast";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {

  userSettingsDto: UserSettingsDto = new UserSettingsDto();
  errorMessage: string;
  allGenres: GenreDto[] = [];
  userGenres: GenreDto[] = [];
  isUserCoverPictureChosen: boolean;
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  userSettingsValidationError: UserSettingsDto = new UserSettingsDto();

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

  @ViewChild("favouriteGenresVsf", {read: ViewContainerRef})
  favouriteGenresVsf: ViewContainerRef;

  @ViewChild("fileUploadProgressPanelComponent", {read: ElementRef})
  fileUploadProgressPanelComponent: ElementRef;

  @ViewChild("showLikedMusicCheckbox")
  showLikedMusicCheckbox: ElementRef;


  constructor(private componentFactoryResolver: ComponentFactoryResolver, private userService: UserServiceService,
   private tokenStorageService: TokenStorageServiceService, private activatedRoute: ActivatedRoute,
              private genreService: GenreServiceService, private router: Router, private siteVisitorService: SiteVisitorServiceService) { }

  ngOnInit() {

    this.getAllGenres();
    this.getUserSettings();
    this.getUserFavouriteGenres();

  }

  getUserFavouriteGenres(){

    this.siteVisitorService.getSiteVisitorGenres(this.activatedRoute.snapshot.params["id"]).subscribe(


      data => {

        this.userGenres = data.body;
        this.showUserGenres();

      },
      error1 => {

        console.log(error1.message);
      }
    )
  }

  getUserSettings(){

    this.userService.getUserSettingsDto(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {

        this.userSettingsDto = data.body;
        this.tokenStorageService.savePictureUrl(this.tokenStorageService.isRememberMeModeOn(), data.body.coverPictureUrlName);
        this.isUserCoverPictureChosen = false;
        this.userSettingsValidationError = new UserSettingsDto();
      },
      error1 => {

        if (error1.status == 404){

          this.router.navigate(["miraculous/not-found"]);
        }
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

    if (!this.userGenres.includes(this.allGenres[selectedIndex])) {

      this.userGenres.push(this.allGenres[selectedIndex]);
      console.log(this.userGenres);
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
    console.log(componentRef.instance.genreId);
    componentRef.instance.closedElement.subscribe(()=>{

      this.userGenres.splice(this.userGenres.findIndex(x => x.id == componentRef.instance.genreId),  1);
      componentRef.destroy();
    });
  }

  showUserGenres(){

    for (let i = 0; i < this.userGenres.length; i++) {

      let tagFactory = this.componentFactoryResolver.resolveComponentFactory(TagComponent);
      let componentRef = this.favouriteGenresVsf.createComponent(tagFactory);
      componentRef.instance.tagText = this.userGenres[i].title;
      componentRef.instance.genreId = this.userGenres[i].id;
      componentRef.instance.closedElement.subscribe(()=>{

        componentRef.destroy();
        this.userGenres.splice(this.userGenres.findIndex(x => x.id == componentRef.instance.genreId),  1);

      });
    }
  }

  navigate(path: string) {

    this.router.navigate(['miraculous/'+ path]);
    window.scroll(0,0);

  }

  completeDeletion() {

    this.showOtherElements();
    this.tokenStorageService.signOut(this.tokenStorageService.isRememberMeModeOn());
  }

  changeUserPicture() {

    let userPicturePath = URL.createObjectURL(this.userPhotoInput.nativeElement.files[0]);
    this.userProfilePicture.nativeElement.style = "background-repeat: no-repeat; background-fullAlbumTrackVersionSize: cover; background-image: url(" + userPicturePath + ")";
    this.isUserCoverPictureChosen = true;
  }

  removeCoverPicture() {

    this.userPhotoInput.nativeElement.value = "";
    document.querySelector(".user-profile-picture").setAttribute("style", "background-image:  url("+this.imagesPath+ this.userSettingsDto.coverPictureUrlName +")");
    this.isUserCoverPictureChosen = false;
  }

  updateUserSettings() {

    if (this.userSettingsDto.password != null){
      if (this.userSettingsDto.password.trim().length == 0){
        this.userSettingsDto.password = null;
      }
    }

    if (this.userSettingsDto.confirmationPassword != null){

      if (this.userSettingsDto.confirmationPassword.trim().length == 0){
        this.userSettingsDto.confirmationPassword = null;
      }

    }
    this.userService.updateUserSettings(this.userSettingsDto,this.userPhotoInput.nativeElement.files[0], this.userGenres).subscribe(

      result => {
          if ((<HttpResponse<any>> result).status == 200){

            this.getUserSettings();
          }
      },
      error1 => {

        if (error1.status == 400){

          this.userSettingsValidationError = JSON.parse(error1.error);
        }
        console.log(error1.message);
      }
    )
  }

  deleteUserPhoto() {
    this.userService.deleteUserPhoto(this.userSettingsDto.coverPictureUrlName, this.userSettingsDto.id).subscribe(

      result => {

        this.userPhotoInput.nativeElement.value = "";
        this.getUserSettings();
        this.tokenStorageService.savePictureUrl(this.tokenStorageService.isRememberMeModeOn(), null);
        this.isUserCoverPictureChosen = false;
      },
      error1 => {

        console.log(error1.message);
      }
    )
  }
}
