import { Component, OnInit } from '@angular/core';
import {ArtistServiceService} from "../../../services/artist-service/artist-service.service";
import {AlbumServiceService} from "../../../services/album-service/album-service.service";
import {TrackServiceService} from "../../../services/track-service/track-service.service";
import {UserServiceService} from "../../../services/user-service/user-service.service";

@Component({
  selector: 'statistics-component',
  templateUrl: './statistics-component.component.html',
  styleUrls: ['./statistics-component.component.css']
})
export class StatisticsComponentComponent implements OnInit {

  numberOfUsersRegistered: number ;
  numberOfArtistsRegistered: number ;
  numberOfTUploadedTracks: number ;
  numberOfUploadedAlbums: number;

  constructor(private artistService: ArtistServiceService, private albumService: AlbumServiceService,
              private trackService: TrackServiceService, private userService: UserServiceService) { }

  ngOnInit() {

    this.artistService.getNumberOfRegisteredArtists().subscribe(
      data => {

        this.numberOfArtistsRegistered = data;
      },
      error1 => {
      }
    )

    this.albumService.getNumberOfUploadedAlbums().subscribe(

      data => {

        this.numberOfUploadedAlbums = data;
      },
      error1 => {
      }
    )

    this.trackService.getNumberOfUploadedTracks().subscribe(

      data => {

        this.numberOfTUploadedTracks = data;
      },
      error1 => {
      }
    )

    this.userService.getNumberOfRegisteredUsers().subscribe(

      data => {

        this.numberOfUsersRegistered = data;
      },
      error1 => {
      }
    )
  }

}
