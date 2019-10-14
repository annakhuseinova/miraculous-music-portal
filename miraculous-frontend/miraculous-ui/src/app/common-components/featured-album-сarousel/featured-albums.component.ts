import { Component, OnInit } from '@angular/core';
import {AlbumServiceService} from "../../../services/album-service/album-service.service";
import {AlbumLinkDto} from "../../../dto/album-link-dto/album-link-dto";
import {DomainServiceService} from "../../../services/domain-service/domain-service.service";

@Component({
  selector: 'featured-albums-carousel',
  templateUrl: './featured-albums.component.html',
  styleUrls: ['./featured-albums.component.css']
})
export class FeaturedAlbumsComponent implements OnInit {

  albums: Array<AlbumLinkDto> = [];
  errorMessage: string;
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  albumPagePath: string = "/miraculous/albums";
  artistPagePath: string = "/miraculous/artists"

  constructor(private albumsService: AlbumServiceService) {


  }

  ngOnInit() {

   this.albumsService.getFeaturedAlbums().subscribe(

      data =>{
        this.albums = data;

      },
      error1 => {

        this.errorMessage = error1.message.message;
      }
    )
  }

}





