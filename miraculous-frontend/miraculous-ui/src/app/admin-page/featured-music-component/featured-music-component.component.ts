import { Component, OnInit } from '@angular/core';
import {ArtistServiceService} from "../../../services/artist-service/artist-service.service";
import {AlbumServiceService} from "../../../services/album-service/album-service.service";
import {ArtistLinkDto} from "../../../dto/artist-link-dto/artist-link-dto";
import {AlbumLinkDto} from "../../../dto/album-link-dto/album-link-dto";

@Component({
  selector: 'featured-music-component',
  templateUrl: './featured-music-component.component.html',
  styleUrls: ['./featured-music-component.component.css']
})
export class FeaturedMusicComponentComponent implements OnInit {

  featuredArtists: ArtistLinkDto[] = [];
  featuredAlbums: AlbumLinkDto[] = [];

  constructor(private artistsService: ArtistServiceService, private albumsService: AlbumServiceService) { }

  addAlbumToFeaturedByAlbumId(albumId: number){


  }

  ngOnInit() {

    this.getListOfFeaturedAlbums();
    this.getListOfFeaturedArtists();
  }

  getListOfFeaturedArtists() {
    this.artistsService.getFeaturedArtists().subscribe(
      data => {

        this.featuredArtists = data;
      }
    )
  }

  getListOfFeaturedAlbums(){

    this.albumsService.getFeaturedAlbums().subscribe(

      data => {

        this.featuredAlbums = data;
        console.log(this.featuredAlbums);
      },
      error1 => {

        console.log(error1.message);
      }
    )
  }
}
