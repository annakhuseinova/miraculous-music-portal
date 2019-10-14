import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {TagComponent} from "./tag/tag.component";
import {AlbumUploadDto} from "../../../dto/album-upload-dto/album-upload-dto";
import {UploadableAlbumTrackComponent} from "./uploadable-album-track/uploadable-album-track.component";
import {GenreServiceService} from "../../../services/genre-service/genre-service.service";
import {GenreDto} from "../../../dto/genre-dto/genre-dto";
import {AlbumServiceService} from "../../../services/album-service/album-service.service";
import {TokenStorageServiceService} from "../../../services/token-storage-service/token-storage-service.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {AlbumTrackUploadDto} from "../../../dto/album-track-upload-dto/album-track-upload-dto";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ConstraintViolationDto} from "../../../dto/constraint-violation-dto/constraint-violation-dto";


@Component({
  selector: 'app-upload-album',
  templateUrl: './upload-album.component.html',
  styleUrls: ['./upload-album.component.css']
})

export class UploadAlbumComponent implements OnInit, AfterViewInit {

  albumUploadDto: AlbumUploadDto = new AlbumUploadDto();
  numberOfTracks: number = 0;
  allGenres: GenreDto[] = [];
  uploadableTrackComponents: UploadableAlbumTrackComponent[] = [];
  isAlbumInFreeAccess: boolean = false;
  albumGenres: GenreDto[] = [];
  isUploadInProgress: boolean = false;
  uploadProgressPercent: number = 0;
  isAlbumCoverPictureChosen: boolean = false;
  albumError: AlbumUploadDto = new AlbumUploadDto();
  constraintViolationDto: ConstraintViolationDto = new ConstraintViolationDto();
  isAlbumSuccessfullyUploaded: boolean = false;
  hasValidationFailed: boolean = false;
  validationErrorMessages: string[] = [];

  @ViewChild("uploadProgressPanel")
  uploadProgressPanel: ElementRef;

  @ViewChild("navigationPanel")
  navigationPanel: ElementRef;

  @ViewChild("darkeningOverflow")
  darkeningOverflow: ElementRef;

  @ViewChild("container")
  basicComponentContainer: ElementRef;

  @ViewChild("albumCoverPicture", {read: ElementRef})
  fileName: ElementRef;

  @ViewChild("albumCover", {read: ElementRef})
  coverBlock: ElementRef;

  @ViewChild("addedTracksBlock", {read: ElementRef})
  addedTracksBlock: ElementRef;

  @ViewChild("selectAccessPolicy", {read: ElementRef})
  selectAccessPolicy: ElementRef;

  @ViewChild("albumPriceInput", {read: ElementRef})
  albumPriceInput: ElementRef;

  @ViewChild("albumPriceInputLabel", {read: ElementRef})
  albumPriceInputLabel: ElementRef;

  @ViewChild("selectedGenres", {read: ElementRef})
  selectedGenres: ElementRef;

  @ViewChild("selectedGenresVcf", {read: ViewContainerRef})
  selectedGenresVcf: ViewContainerRef;

  @ViewChild("selectAlbumGenres", {read: ElementRef})
  selectAlbumGenres: ElementRef;

  @ViewChild("audiotrack", {read: ElementRef})
  audiotrack: ElementRef;

  @ViewChild("addedTracksContainer", {read: ViewContainerRef})
  addedTracksContainer: ViewContainerRef;

  subscription: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private genreService: GenreServiceService,
              private albumService: AlbumServiceService,
              private tokenService: TokenStorageServiceService,
              private router: Router) {

  }

  ngOnInit() {

    this.getAllGenres();
  }

  getTotalDurationOfAlbum(): number{

    let totalDuration: number = 0;
    this.uploadableTrackComponents.forEach((item)=> {

      totalDuration += item.albumTrackUploadDto.duration;
    });
    return totalDuration;
  }

  getTotalSizeOfAlbum(): number{

    let totalSize: number = 0;
    this.uploadableTrackComponents.forEach((item) => {

      totalSize += item.albumTrackUploadDto.previewAlbumTrackVersionSize;
      totalSize += item.albumTrackUploadDto.fullAlbumTrackVersionSize;
    });

    return totalSize;
  }

  getAllGenres(){

    this.genreService.getAllGenres().subscribe(

      data => {

        this.allGenres = data;

      },

      error1 => {

        console.log(error1.message);
      },

    );
  }

  showCoverPicture(){

    let filePath = URL.createObjectURL(this.fileName.nativeElement.files[0]);
    this.coverBlock.nativeElement.style = "background-image: url("+filePath+")";
    this.isAlbumCoverPictureChosen = true;
  }

  togglePriceBlock(){

    let isPaidPolicySelected = this.selectAccessPolicy.nativeElement.options.selectedIndex;
    if (isPaidPolicySelected == 1) {

      this.isAlbumInFreeAccess = true;
      this.setFreeAccessToUploadableAlbumTracks();

    }else {

      this.isAlbumInFreeAccess = false;
      this.setPaidAccessToUploadableAlbumTracks();

    }
  }

  setFreeAccessToUploadableAlbumTracks(){

    this.uploadableTrackComponents.forEach((item)=>{
      item.isInFreeAccess = true;
      item.albumTrackUploadDto.isFree = true;
    });

    this.uploadableTrackComponents.forEach((item) => {

      item.albumTrackUploadDto.previewAlbumTrackVersionSize = 0;
    });
  }

  setPaidAccessToUploadableAlbumTracks(){

    this.uploadableTrackComponents.forEach((item)=>{
      item.isInFreeAccess = false;
      item.albumTrackUploadDto.isFree = false;
    });
  }

  addTagToSelectedGenres(){

    let tagsContainer = document.querySelector(".selected-genres");
    let selectedIndex = this.selectAlbumGenres.nativeElement.options.selectedIndex;
    let selectedGenre = this.selectAlbumGenres.nativeElement.options[selectedIndex].value;

    if (!this.albumGenres.includes(this.allGenres[selectedIndex])) {

      this.albumGenres.push(this.allGenres[selectedIndex]);
    }

    for(let i=0; i < tagsContainer.children.length; i++){

      if (this.selectedGenres.nativeElement.children.length == 0) {

        continue;

      }else {

        if (this.selectedGenres.nativeElement.children[i].textContent == selectedGenre) {
          return;
        }
      }
    }
    let tagFactory = this.componentFactoryResolver.resolveComponentFactory(TagComponent);
    let componentRef = this.selectedGenresVcf.createComponent(tagFactory);
    componentRef.instance.tagText = selectedGenre;
    componentRef.instance.genreId = this.selectAlbumGenres.nativeElement.options[selectedIndex].id;
    componentRef.instance.closedElement.subscribe(()=>{

      this.albumGenres.splice(this.albumGenres.findIndex(x => x.id == componentRef.instance.genreId),  1);
      componentRef.destroy();
    });
  }

  ngAfterViewInit(): void {

    this.selectedGenres.nativeElement.onclick = event =>{
      if (event.target.className == "genre-tag-remove-tag-button") {
        event.target.parentNode.remove();

      }
    }

    let fileinput = document.querySelectorAll(".added-track-file-input");
    for (let i = 0; i < fileinput.length; i++){

        fileinput[i].addEventListener("change", ()=> {

            console.log("added track");
        });
    }

    for (let i=0; i< this.addedTracksBlock.nativeElement.children.length; i++){
      console.log("loaded");
    }

    this.addedTracksContainer.element.nativeElement.addEventListener("DOMNodeInserted", ()=>{
      console.log("log inserted");
      let eventTargetElement = (<ElementRef>(<any>event.target));
      console.log(eventTargetElement);
      let fileInput = eventTargetElement.nativeElement;
      for (let i = 0; i < fileInput.length; i++) {
        fileInput[i].addEventListener("change",
          event =>{
            if (fileInput.files[0] != undefined) {
              if ((fileInput.files[0].fullAlbumTrackVersionSize)/(1024*1024) > 20) {
                alert("You can't upload track of size more than 20 mbs");
                event.target.files[0] = null;
                eventTargetElement.nativeElement.previousSibling.textContent = "Select File";

              }else{
                eventTargetElement.nativeElement.previousSibling.textContent = event.target.files[0].name;

                console.log(event.target.files[0].length);
                console.log(event.target.files[0].name);
              }
            }
          }, false);
      }
    }, false);
  }

  addNewTrack() {

    if (this.addedTracksContainer.length < 20){

      let newTrackFactory = this.componentFactoryResolver.resolveComponentFactory(UploadableAlbumTrackComponent);
      let trackComponentRef = this.addedTracksContainer.createComponent(newTrackFactory);
      trackComponentRef.instance.isInFreeAccess = this.isAlbumInFreeAccess;
      this.uploadableTrackComponents.push(trackComponentRef.instance);
      trackComponentRef.instance.onUploadableAlbumTrackDeletion.subscribe(()=>{
        trackComponentRef.destroy();
        trackComponentRef.instance.albumTrackUploadDto.previewAlbumTrackVersionSize = 0;
        trackComponentRef.instance.albumTrackUploadDto.fullAlbumTrackVersionSize = 0;
        trackComponentRef.instance.albumTrackUploadDto.duration = 0;
        trackComponentRef.instance.albumTrackUploadDto.price = 0;
        trackComponentRef.instance.albumTrackUploadDto.title = "";
        this.uploadableTrackComponents.splice(this.uploadableTrackComponents.indexOf(trackComponentRef.instance), 1);
      })
    } else {
      alert("You cannot upload more than 20 tracks in an album");
    }
  }

  checkIfUploadableAlbumTracksAreValid(isAlbumInFreeAccess: boolean): boolean{

        if (this.uploadableTrackComponents.length == 0) {

             alert("Album must have at least one track");
             return false;
       }

      for (let i = 0; i < this.uploadableTrackComponents.length; i++) {

        if (this.uploadableTrackComponents[i].albumTrackUploadDto.title.length == 0){

          alert("Album must have a title");
          return false;

        } else if (this.uploadableTrackComponents[i].albumTrackUploadDto.price.toString().length == 0 ||
          this.uploadableTrackComponents[i].albumTrackUploadDto.price < 0.5){

          alert("Please, give your album a price. It must be no less than 0.5$");
          return false;

        } else if (this.uploadableTrackComponents[i].trackFullVersion.nativeElement.files.length == 0){

          alert("You must choose full versions of all album tracks");
          return false;

        } else if (!isAlbumInFreeAccess && this.uploadableTrackComponents[i].trackPreviewVersion.nativeElement.files.length == 0){

          alert("You must choose preview versions of all album tracks");
          return false;

        }else if (!isAlbumInFreeAccess && this.uploadableTrackComponents[i].trackPreviewVersion.nativeElement.files[i].size/ (1024*1024) > 20) {

          alert("Tracks cannot be more than 20 Mbs");
          return false;

        }else if (this.uploadableTrackComponents[i].fullTrackVersion.size /(1024*1024) > 20){

          alert("Track cannot be more than 20 Mbs");
          return false;

        }else if (this.albumGenres.length == 0){

          alert("You need to choose at least one genre of album");
          return false;

        } else {

          return true;
        }
      }
  }

  upload() {

    if (this.checkIfUploadableAlbumTracksAreValid(this.isAlbumInFreeAccess)) {

      this.albumUploadDto.artistId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      this.albumUploadDto.isFree = this.isAlbumInFreeAccess;
      this.albumUploadDto.size = this.getTotalSizeOfAlbum();
      this.albumUploadDto.duration = this.getTotalDurationOfAlbum();

      let coverPictureFile: File = this.fileName.nativeElement.files[0];
      let listOfFullVersions: File[] = [];
      let listOfPreviewVersions: File[] = [];
      let albumTrackUploadDtos: AlbumTrackUploadDto[] = [];

      this.uploadableTrackComponents.forEach((item) => {

        albumTrackUploadDtos.push(item.albumTrackUploadDto);
      });
      this.uploadableTrackComponents.forEach((item) => {
        listOfFullVersions.push(item.fullTrackVersion);
      });
      this.uploadableTrackComponents.forEach((item) => {
        listOfPreviewVersions.push(item.previewTrackVersion);
      });

      this.subscription = this.albumService.uploadAlbum(this.albumUploadDto, listOfFullVersions, listOfPreviewVersions, coverPictureFile, this.albumGenres, albumTrackUploadDtos).subscribe(
        result => {

          if (result.type == HttpEventType.UploadProgress) {

            console.log(Math.round(100 * result.loaded / result.total));
            this.isUploadInProgress = true;
            this.hideOtherComponents();
            this.uploadProgressPercent = Math.round(100 * result.loaded / result.total);

          } else if (result instanceof HttpResponse) {

            if (result.status == 200) {

              console.log("File Uploaded");

            }
          }
        },
        error1 => {

          if (error1.status == 400) {

            this.constraintViolationDto = JSON.parse(error1.error);
            this.albumError = JSON.parse(error1.error);
            if (this.constraintViolationDto.typeOfErrorResponse == "MethodArgumentNotValid") {

            } else if (this.constraintViolationDto.typeOfErrorResponse == "ConstraintViolation") {

            }
          }

        }
      )
    }
  }
  hideOtherComponents(){

    document.querySelector(".basic-component-container").setAttribute("style", "pointer-events: none");
    document.querySelector(".darkening-overflow").setAttribute("style", "display: block");
    document.querySelector(".navigation-panel").setAttribute("style", "opacity: 0.5; transition: 2s");

  }

  showOtherComponents(){

    document.querySelector(".basic-component-container").setAttribute("style", "pointer-events: all");
    document.querySelector(".darkening-overflow").setAttribute("style", "display: none");
    document.querySelector(".navigation-panel").setAttribute("style", "opacity: 1;");
  }

  goToArtistProfilePage() {

    this.showOtherComponents();
    this.router.navigate(["miraculous/artists/"+ this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn())]);
  }

  removeAlbumPicture() {

    this.fileName.nativeElement.value = "";
    this.coverBlock.nativeElement.style = "background-image: none";
    this.isAlbumCoverPictureChosen = false;
  }

  cancelUpload() {

    this.subscription.unsubscribe();
    this.isUploadInProgress = false;
    this.uploadProgressPercent = 0;
    this.showOtherComponents();
  }
}

