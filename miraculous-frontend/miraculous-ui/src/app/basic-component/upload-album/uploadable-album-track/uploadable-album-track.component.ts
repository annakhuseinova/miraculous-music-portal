import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AlbumTrackUploadDto} from "../../../../dto/album-track-upload-dto/album-track-upload-dto";
import {TokenStorageServiceService} from "../../../../services/token-storage-service/token-storage-service.service";

@Component({
  selector: 'uploadable-album-track',
  templateUrl: './uploadable-album-track.component.html',
  styleUrls: ['./uploadable-album-track.component.css']
})
export class UploadableAlbumTrackComponent implements OnInit {

  fullTrackVersion: File;
  previewTrackVersion: File;
  albumTrackUploadDto: AlbumTrackUploadDto = new AlbumTrackUploadDto();
  isInFreeAccess: boolean = false;
  @Output() onUploadableAlbumTrackDeletion = new EventEmitter();

  @ViewChild("trackFullVersion")
  trackFullVersion: ElementRef;

  @ViewChild("trackPreviewVersion")
  trackPreviewVersion: ElementRef;

  @ViewChild("fullAlbumTrackAudio")
  fullAlbumTrackAudio: ElementRef;

  constructor(private tokenService: TokenStorageServiceService) { }

  ngOnInit() {

    this.albumTrackUploadDto.duration = 0;
    this.albumTrackUploadDto.fullAlbumTrackVersionSize = 0;
    this.albumTrackUploadDto.previewAlbumTrackVersionSize = 0;
    this.albumTrackUploadDto.title = "";
    this.albumTrackUploadDto.price = 0;
  }

  deleteTrack() {
    this.onUploadableAlbumTrackDeletion.emit();
  }

  selectAlbumTrackFullVersion() {

     if (this.trackFullVersion.nativeElement.files[0].size /(1024*1024) < 20){
      this.fullTrackVersion = this.trackFullVersion.nativeElement.files[0];
      this.albumTrackUploadDto.fullAlbumTrackVersionSize = parseFloat((this.trackFullVersion.nativeElement.files[0].size / (1024*1024)).toFixed(2));
      let urlToAudio = URL.createObjectURL(this.trackFullVersion.nativeElement.files[0]);
      this.fullAlbumTrackAudio.nativeElement.src = urlToAudio;
      (<HTMLAudioElement>this.fullAlbumTrackAudio.nativeElement).onloadeddata = ()=>{
        this.albumTrackUploadDto.duration =  parseFloat(((<HTMLAudioElement>this.fullAlbumTrackAudio.nativeElement).duration / 60).toFixed(2));
      };
      this.albumTrackUploadDto.isFree = this.isInFreeAccess;
      this.albumTrackUploadDto.artistId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      console.log(this.albumTrackUploadDto);

     } else {

    alert("Album Track cannot be more than 20 Mbs");
     }

  }

  selectAlbumTrackPreviewVersion() {

    this.previewTrackVersion = this.trackPreviewVersion.nativeElement.files[0];
    this.albumTrackUploadDto.previewAlbumTrackVersionSize = parseFloat((this.trackPreviewVersion.nativeElement.files[0].size / (1024*1024)).toFixed(2));
  }
}
