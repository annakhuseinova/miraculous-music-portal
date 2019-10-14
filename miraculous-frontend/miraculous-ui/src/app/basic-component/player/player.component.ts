import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {PlayerServiceService} from "../../../services/player-service/player-service.service";
import {DomainServiceService} from "../../../services/domain-service/domain-service.service";
import {TracksQueueComponent} from "./tracks-queue/tracks-queue.component";

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Output() onToggledPlayerBlock = new EventEmitter<any>();

  @ViewChild('tracksQueue', {read: ElementRef})
  tracksQueue: ElementRef;

  @ViewChild("audio", {read: ElementRef})
  audio: ElementRef;

  @ViewChild(TracksQueueComponent)
  tracksQueueComponent: TracksQueueComponent;

  @ViewChild("trackProgressBar")
  trackProgressBar: ElementRef;

  isPlaying: boolean = false;
  onRepeat: boolean = false;
  trackUrl: string = DomainServiceService.TRACKS_PATH;

  constructor(private playerService: PlayerServiceService) { }

  ngOnInit() {
  }

  setVolume(volume: number): void{

    if (this.audio.nativeElement != null){

      this.audio.nativeElement.volume = volume;
    }
  }

  showTracksQueue() {
    this.tracksQueue.nativeElement.style = "display: flex";
  }

  hideTracksQueue() {
    this.tracksQueue.nativeElement.style = "display: none";
  }

  changeCurrentTrackToPrevious() {

    if (this.playerService.currentTrackIndex == 0){
      if (this.playerService.playableTracks.length != 0){
        this.playerService.currentTrackIndex = this.playerService.playableTracks.length - 1;
        if (this.isPlaying == true){


          (<HTMLAudioElement>this.audio.nativeElement).autoplay = true;

        }else {

          (<HTMLAudioElement>this.audio.nativeElement).autoplay = false;
        }
      }

    }else {

      this.playerService.currentTrackIndex --;

      if (this.isPlaying == true){

        (<HTMLAudioElement>this.audio.nativeElement).autoplay = true;
      }else {

        (<HTMLAudioElement>this.audio.nativeElement).autoplay = false;
      }
    }
  }

  changeCurrentTrackToNext() {
    if (this.playerService.playableTracks.length != 0){

      if (this.playerService.currentTrackIndex != this.playerService.playableTracks.length-1){

        this.playerService.currentTrackIndex ++;

        if (this.isPlaying == true){

          (<HTMLAudioElement>this.audio.nativeElement).autoplay = true;

        }else {

          (<HTMLAudioElement>this.audio.nativeElement).autoplay = false;
        }

      } else {

        this.playerService.currentTrackIndex = 0;
        if (this.isPlaying == true){

          (<HTMLAudioElement>this.audio.nativeElement).autoplay = true;

        }else {

          (<HTMLAudioElement>this.audio.nativeElement).autoplay = false;

        }
      }
    }
  }

  playCurrentTrack(){

    if(this.playerService.playableTracks.length != 0){

      (<HTMLAudioElement>this.audio.nativeElement).autoplay = true;
      (<HTMLAudioElement>this.audio.nativeElement).play();
      this.isPlaying = true;

    }
  }

  playTrack(value) {

      let previousTrackIndex: number = value;
     if(value != null){

       if (this.tracksQueueComponent.tracksQueueItemComponents.toArray()[value] != null){

         this.tracksQueueComponent.tracksQueueItemComponents.toArray()[value].isPlaying = false;

       }else {

         this.playerService.currentTrackIndex = this.playerService.playableTracks.length - 1;

       }
     }

     if (this.playerService.playableTracks[value] == this.playerService.playableTracks[this.playerService.currentTrackIndex]){

       this.playTrackFromBeginning();
       return;
     }

     this.playCurrentTrack();
  }

  pauseTrack(){

    (<HTMLAudioElement> this.audio.nativeElement).pause();
    this.isPlaying = false;
    (<HTMLAudioElement>this.audio.nativeElement).autoplay = false;
  }

  startNextTrack() {

    if (this.onRepeat == true){

      this.playTrack(event);

    } else {

      if (this.playerService.playableTracks.length != this.playerService.currentTrackIndex +1){

        this.tracksQueueComponent.tracksQueueItemComponents.toArray()[this.playerService.currentTrackIndex].isPlaying = false;
        this.playerService.currentTrackIndex ++;
        (<HTMLAudioElement>this.audio.nativeElement).autoplay = true;

      }else {

        this.tracksQueueComponent.tracksQueueItemComponents.toArray()[this.playerService.currentTrackIndex].isPlaying = false;
        this.isPlaying = false;

        if (this.playerService.currentTrackIndex == this.playerService.playableTracks.length -1) {

          this.finishPlaying();
        }
      }
    }
  }

  updateProgressBar() {

    let filling = document.querySelector(".progress-fill");
    let trackHandle = document.querySelector(".track-handle");
    let position = (<HTMLAudioElement>this.audio.nativeElement).currentTime/(<HTMLAudioElement>this.audio.nativeElement).duration;
    filling.setAttribute("style", "width: +"+position*100+"%");
    trackHandle.setAttribute("style", "left: +"+position*100+"%");

  }

  toggleOnRepeat(){

    if (this.onRepeat == false){

      this.onRepeat = true;

    } else {

      this.onRepeat = false;
    }
  }

  togglePlayerBlock() {

    this.onToggledPlayerBlock.emit();
  }

  finishPlaying() {

    let filling = document.querySelector(".progress-fill");
    let trackHandle = document.querySelector(".track-handle");
    filling.setAttribute("style", "width: 0%");
    trackHandle.setAttribute("style", "left: 0%");
    this.isPlaying = false;
    this.pauseTrack();
  }

  playTrackAtChosenMoment(event) {

    if (this.playerService.playableTracks.length != 0){
      let percent = event.offsetX / this.trackProgressBar.nativeElement.offsetWidth;
      (<HTMLAudioElement>this.audio.nativeElement).currentTime = percent * (<HTMLAudioElement>this.audio.nativeElement).duration;
      this.updateProgressBar();
    }

  }

  playTrackFromBeginning(){

    (<HTMLAudioElement>this.audio.nativeElement).currentTime = 0;
    this.playCurrentTrack();
  }
}
