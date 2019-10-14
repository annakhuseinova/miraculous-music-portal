import { Component, OnInit } from '@angular/core';
import {PlayableTrackDto} from "../../../dto/playable-track-dto/playable-track-dto";
import {AlbumLikeDto} from "../../../dto/album-like-dto/album-like-dto";
import {AlbumLinkDto} from "../../../dto/album-link-dto/album-link-dto";
import {TrackServiceService} from "../../../services/track-service/track-service.service";
import {AlbumServiceService} from "../../../services/album-service/album-service.service";

@Component({
  selector: 'app-free-music',
  templateUrl: './free-music.component.html',
  styleUrls: ['./free-music.component.css']
})
export class FreeMusicComponent implements OnInit {

  freeTop10Tracks: PlayableTrackDto[] = [];
  freeTop10Albums: AlbumLinkDto[] = [];

  constructor(private trackService: TrackServiceService, private albumService: AlbumServiceService) { }

  ngOnInit() {

    this.getTop10FreeTracks();
    this.getTop10FreeAlbums();

  }

  getTop10FreeAlbums(){

    this.albumService.getTop10FreeAlbums().subscribe(

      data =>{

        this.freeTop10Albums = data;

      },
      error1 => {

        console.log(error1.message);
      }
    )
  }


  getTop10FreeTracks(){

    this.trackService.getTop10FreeTracks().subscribe(

      data => {


        this.freeTop10Tracks = data;

      },
      error1 => {

        console.log(error1.message);
      }
    )
  }

}
