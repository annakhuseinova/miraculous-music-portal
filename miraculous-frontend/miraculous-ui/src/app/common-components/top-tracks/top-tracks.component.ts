import { Component, OnInit } from '@angular/core';
import {TrackServiceService} from "../../../services/track-service/track-service.service";
import {PlayableTrackDto} from "../../../dto/playable-track-dto/playable-track-dto";

@Component({
  selector: 'app-top-tracks',
  templateUrl: './top-tracks.component.html',
  styleUrls: ['./top-tracks.component.css']
})
export class TopTracksComponent implements OnInit {

  topTracks: PlayableTrackDto[];
  errorMessage: string;

  constructor(private trackService: TrackServiceService) {

  }

  ngOnInit() {

    this.trackService.getTop15Tracks().subscribe(

      data =>{

        this.topTracks = data;

      },
      error1 => {

        console.log(error1.message);
      }
    );
  }

}

