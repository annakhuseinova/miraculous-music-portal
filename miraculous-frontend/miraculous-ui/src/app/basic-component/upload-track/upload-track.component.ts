import {Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {TagComponent} from "../upload-album/tag/tag.component";
import {DomSanitizer} from "@angular/platform-browser";
import {TrackUploadDto} from "../../../dto/track-upload-dto/track-upload-dto";
import {GenreServiceService} from "../../../services/genre-service/genre-service.service";
import {GenreDto} from "../../../dto/genre-dto/genre-dto";
import {Router} from "@angular/router";
import {TokenStorageServiceService} from "../../../services/token-storage-service/token-storage-service.service";
import {TrackServiceService} from "../../../services/track-service/track-service.service";
import {Subscription} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-upload-track',
  templateUrl: './upload-track.component.html',
  styleUrls: ['./upload-track.component.css']
})
export class UploadTrackComponent implements OnInit {

  trackUploadDto: TrackUploadDto = new TrackUploadDto();
  trackUploadError: TrackUploadDto = new TrackUploadDto();
  trackDuration: number = 0;
  trackSize: number = 0;
  tagText: string;
  trackCoverPicture: any;
  allGenres: GenreDto[];
  errorMessage: string;
  isTrackCoverPictureChosen: boolean;
  trackGenres: GenreDto[] = [];
  isTrackFullVersionChosen: boolean = false;
  isTrackPreviewVersionChosen: boolean = false;
  isUploadInProgress: boolean = false;
  uploadProgressPercent: number = 0;
  isStatus400Received: boolean = false;
  isStatus406Received: boolean = false;
  isUploadFailed: boolean = true;

  @ViewChild("fullTrackVersionInputForm")
  fullTrackVersionInputForm: ElementRef;

  @ViewChild("fullTrackAudio")
  fullTrackAudio: ElementRef;

  @ViewChild("trackCoverPicture", {read: ElementRef})
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

  @ViewChild("uploadedTrackContainer", {read: ViewContainerRef})
  uploadedTrackContainer: ViewContainerRef;

  @ViewChild("selectAlbumGenres", {read: ElementRef})
  selectAlbumGenres: ElementRef;

  @ViewChild("singleTrackUploadInput", {read: ElementRef})
  singleTrackUploadInput: ElementRef;

  @ViewChild("previewTrackUploadInput", {read: ElementRef})
  previewTrackUploadInput: ElementRef;

  @ViewChild("previewTrackVersionUploadInputLabel", {read: ElementRef})
  previewTrackVersionUploadInputLabel: ElementRef;

  @ViewChild("singleTrackUploadInputLabel", {read: ElementRef})
  singleTrackUploadInputLabel: ElementRef

  @ViewChild("uploadedTrackTemplate", {read: ElementRef})
  uploadedTrackTemplate: ElementRef;

  @ViewChild("chosenTrackFullVersionName")
  chosenTrackFullVersionName: ElementRef;

  @ViewChild("chosenTrackPreviewVersionName")
  chosenTrackPreviewVersionName: ElementRef;

  subscription: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, 
              private domSanitizer: DomSanitizer,
              private genreService: GenreServiceService,
              private router: Router,
              private tokenService: TokenStorageServiceService, 
              private trackService: TrackServiceService) { }

  ngOnInit() {

    this.getAllGenres();
    this.trackUploadDto.artistLogin = this.tokenService.getLogin(this.tokenService.isRememberMeModeOn());
    this.trackUploadDto.artistId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
    this.trackUploadDto.isFree = false;
  }

  uploadTrack(){

    if (this.trackUploadDto.isFree && this.singleTrackUploadInput.nativeElement.files.length == 0){

      alert("You need to choose a track");
      return;
    }else if (!this.trackUploadDto.isFree && (this.singleTrackUploadInput.nativeElement.files.length == 0 || this.previewTrackUploadInput.nativeElement.files.length ==0)){

      alert("You need to choose full and preview versions of track");
      return;;
    }else if(this.trackGenres.length == 0){

      alert("You need to choose at least one genre of track");
      return;
    }

    this.subscription = this.trackService.uploadTrack(
      this.trackUploadDto,
      this.singleTrackUploadInput.nativeElement.files[0],
      this.previewTrackUploadInput.nativeElement.files[0],
      this.fileName.nativeElement.files[0],
      this.trackGenres).subscribe(

        result =>{

              if(result.type == HttpEventType.UploadProgress){


              this.isUploadFailed = false;
              this.isUploadInProgress = true;
              this.isUploadInProgress = true;
              this.uploadProgressPercent = Math.round(100 * result.loaded / result.total);

          }else if (result instanceof HttpResponse && (<HttpResponse<any>>result).status == 200){

            console.log("File Uploaded");
          }
        },
      error1 => {

        this.isUploadInProgress = false;

          if (error1.status == 406){

            this.isStatus400Received = false;
            this.isStatus406Received = true;
            this.errorMessage = JSON.parse(error1.error).message;

          } else if (error1.status == 400){

            this.isStatus406Received = false;
            this.isStatus400Received = true;
            this.trackUploadError = JSON.parse(error1.error);

          } else {

            console.log(error1.message);
          }
      }
    )
  }


  cancelTrackUpload(){

    this.subscription.unsubscribe();
    this.isUploadInProgress = false;
    this.uploadProgressPercent = 0;
    this.showOtherComponents();
  }

  getAllGenres(){

    this.genreService.getAllGenres().subscribe(

      data => {

        this.allGenres = data;
      },

      error1 => {

        this.errorMessage = error1.message;
      },

    );
  }

  togglePriceBlock(){

    let isPaidPolicySelected = this.selectAccessPolicy.nativeElement.options.selectedIndex;

    if (isPaidPolicySelected == 1) {

      this.trackUploadDto.isFree = true;

    }else {

      this.trackUploadDto.isFree = false;
    }
  }

  addTagToSelectedGenres(){

    let tagsContainer = document.querySelector(".selected-genres");
    let selectedIndex = this.selectAlbumGenres.nativeElement.options.selectedIndex;
    let selectedGenre = this.selectAlbumGenres.nativeElement.options[selectedIndex].value;

    if (!this.trackGenres.includes(this.allGenres[selectedIndex])) {

      this.trackGenres.push(this.allGenres[selectedIndex]);
      console.log(this.trackGenres);
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

      this.trackGenres.splice(this.trackGenres.findIndex(x => x.id == componentRef.instance.genreId),  1);
      componentRef.destroy();
    });
  }

  navigate(path: string) {

    this.router.navigate(['miraculous/'+ path]);
    window.scroll(0,0);

  }

  showCoverPicture(){

    let filePath = URL.createObjectURL(this.fileName.nativeElement.files[0]);
    this.coverBlock.nativeElement.style = "background-image: url("+filePath+")";
    this.trackCoverPicture = this.fileName.nativeElement.files[0];
    this.isTrackCoverPictureChosen = true;

  }

  removeCoverPicture() {

    this.fileName.nativeElement.value = "";
    this.coverBlock.nativeElement.style = "background-image: none";
    this.isTrackCoverPictureChosen = false;
  }

  showChosenTrackFullVersionFile() {

    if (parseFloat((this.singleTrackUploadInput.nativeElement.files[0].size / (1024*1024)).toFixed(2)) > 20){

      alert("Track cannot be more than 20 mbs");
      return;
    }
    this.isTrackFullVersionChosen = true;
    this.chosenTrackFullVersionName.nativeElement.textContent = this.singleTrackUploadInput.nativeElement.files[0].name;
    this.trackSize = parseFloat((this.singleTrackUploadInput.nativeElement.files[0].size / (1024*1024)).toFixed(2));
    let urlToAudio = URL.createObjectURL(this.singleTrackUploadInput.nativeElement.files[0]);
    this.fullTrackAudio.nativeElement.src = urlToAudio;
    (<HTMLAudioElement>this.fullTrackAudio.nativeElement).onloadeddata = ()=>{
      this.trackUploadDto.length =  parseFloat(((<HTMLAudioElement>this.fullTrackAudio.nativeElement).duration / 60).toFixed(2));
      this.trackDuration = parseFloat(((<HTMLAudioElement>this.fullTrackAudio.nativeElement).duration / 60).toFixed(2));
    };
    this.trackUploadDto.size = this.trackSize;
  }

  showChosenTrackPreviewVersionFile() {

    if (parseFloat((this.previewTrackUploadInput.nativeElement.files[0].size / (1024*1024)).toFixed(2)) > 20){

      alert("Preview track cannot be more than 20 Mbs");
      return;
    }
    this.isTrackPreviewVersionChosen = true;
    this.chosenTrackPreviewVersionName.nativeElement.textContent = this.previewTrackUploadInput.nativeElement.files[0].name;

  }

  removeChosenTrackPreviewVersionFile(){

    this.previewTrackUploadInput.nativeElement.files[0].value = "";
    this.chosenTrackPreviewVersionName.nativeElement.textContent = "";
    this.isTrackPreviewVersionChosen = false;
  }

  removeChosenTrackFullVersionFile() {

    this.singleTrackUploadInput.nativeElement.files[0].value = "";
    this.isTrackFullVersionChosen = false;
    this.chosenTrackFullVersionName.nativeElement.textContent = "";
    this.trackDuration = 0;
    this.trackSize = 0;
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
}
