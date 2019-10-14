
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlayerServiceService} from "../../../../../services/player-service/player-service.service";
import {PlayableTrackDto} from "../../../../../dto/playable-track-dto/playable-track-dto";
import {Track} from "../../../../../dto/track/track";
import {DomainServiceService} from "../../../../../services/domain-service/domain-service.service";

@Component({
  selector: 'app-tracks-queue-item',
  templateUrl: './tracks-queue-item.component.html',
  styleUrls: ['./tracks-queue-item.component.css']
})
export class TracksQueueItemComponent implements OnInit {

  @Input() track: PlayableTrackDto;
  @Output() onClickedDeleteTracksQueueItem = new EventEmitter<any>();
  @Output() onPlayTrack = new EventEmitter<any>();
  @Output() onPauseTrack = new EventEmitter();
  @Input() indexOfTrackInPlayer: number;
  previousTrackIndex: number;
  trackUrl: string = DomainServiceService.TRACKS_PATH;
  imageUrl: string = DomainServiceService.PICTURES_PATH;
  albumTitle: string;
  isPlaying: boolean = false;

  constructor(private playerService: PlayerServiceService) { }

  ngOnInit() {

    if (this.track.albumTitle == null){

      this.albumTitle = "none";

    } else {

      this.albumTitle = this.track.albumTitle;
    }
  }

  deleteTracksQueueItem() {
    this.onClickedDeleteTracksQueueItem.emit(this.indexOfTrackInPlayer);
  }

  setCurrentTrackIndex(){
    this.playerService.currentTrackIndex = this.indexOfTrackInPlayer;
  }

  playOrPauseIfIsPlaying() {

    if (this.isPlaying){

      this.isPlaying = false;
      this.onPauseTrack.emit();


    }else {

      this.previousTrackIndex = this.playerService.currentTrackIndex;
      this.setCurrentTrackIndex();
      this.onPlayTrack.emit(this.previousTrackIndex);
      this.isPlaying = true;
    }
  }
}
