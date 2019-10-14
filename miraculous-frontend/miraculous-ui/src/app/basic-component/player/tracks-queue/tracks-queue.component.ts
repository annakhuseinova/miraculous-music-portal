import {Component, ComponentRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {PlayerServiceService} from "../../../../services/player-service/player-service.service";
import {PlayableTrackDto} from "../../../../dto/playable-track-dto/playable-track-dto";
import {TracksQueueItemComponent} from "./tracks-queue-item/tracks-queue-item.component";
import {of} from "rxjs";
import {until} from "selenium-webdriver";
import titleIs = until.titleIs;


@Component({
  selector: 'app-tracks-queue',
  templateUrl: './tracks-queue.component.html',
  styleUrls: ['./tracks-queue.component.css']
})
export class TracksQueueComponent implements OnInit {

  @Output() onClosedTracksQueuePanel = new EventEmitter<any>();
  @Output() onPlayTrack = new EventEmitter<any>();
  @Output() onPauseTrack = new EventEmitter();
  @Output() onZeroTracksLeftInQueue = new EventEmitter();
  @Output() onRemovingPlayingTrackFromQueue = new EventEmitter();
  isQueueSaved: boolean = false;

  @ViewChildren(TracksQueueItemComponent)
  tracksQueueItemComponents: QueryList<TracksQueueItemComponent>;

  playableTracks: PlayableTrackDto[] = this.playerService.playableTracks;

  constructor(private playerService: PlayerServiceService) {

  }

  ngOnInit() {

  }

  saveOrUpdateCurrentPlaylist(){

    this.playerService.saveOrUpdateSiteVisitorPlaylist().subscribe(

      result => {

        this.playerService.getPlaylistOfSiteVisitor().subscribe(

          data => {

            this.playableTracks = data.body;
            this.showThatQueueIsSavedOrUpdatedSuccessfully();
          },
          error1 => {

            console.log(error1);
          }
        )
      },
      error1 => {

        console.log(error1.message);
      }
    );
  }

  showThatQueueIsSavedOrUpdatedSuccessfully(){

    this.isQueueSaved = true;
    setTimeout(()=> {
      this.isQueueSaved = false;
    }, 7000);
  }

  closeTracksQueuePanel() {

      this.onClosedTracksQueuePanel.emit();
  }

  deleteTrackQueueItem(value) {


    if (value > this.playerService.currentTrackIndex){

      this.playerService.playableTracks.splice(value,1);
      this.tracksQueueItemComponents.toArray().splice(value, 1);

    } else if (value < this.playerService.currentTrackIndex){

      let isPlaying: boolean = this.tracksQueueItemComponents.toArray()[this.playerService.currentTrackIndex].isPlaying;
      this.playerService.currentTrackIndex -= 1;
      this.tracksQueueItemComponents.toArray()[this.playerService.currentTrackIndex].isPlaying = isPlaying;
      this.playerService.playableTracks.splice(value,1);
      this.tracksQueueItemComponents.toArray().splice(value, 1);

    } else {

      if (this.playerService.currentTrackIndex == this.playerService.playableTracks.length - 1 && this.playerService.playableTracks.length != 1){
        
        this.tracksQueueItemComponents.toArray()[this.playerService.currentTrackIndex].isPlaying = false;
        this.playerService.currentTrackIndex = this.playerService.playableTracks.length - 2;
      }

      this.playerService.playableTracks.splice(value,1);
      this.tracksQueueItemComponents.toArray().splice(value, 1);
      this.onRemovingPlayingTrackFromQueue.emit();
    }

    console.log(this.playerService.playableTracks);
    if (this.playerService.playableTracks.length == 0){

      this.onZeroTracksLeftInQueue.emit();

    }else {

      if (this.tracksQueueItemComponents.toArray()[this.playerService.currentTrackIndex] == value){

      }
    }

  }

  playTrack(value) {

    this.onPlayTrack.emit(value);
  }

  pauseTrack() {

    this.onPauseTrack.emit();
  }
}
