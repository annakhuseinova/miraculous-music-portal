import { Component, OnInit } from '@angular/core';
import {AlbumLinkDto} from "../../../../dto/album-link-dto/album-link-dto";
import {AlbumServiceService} from "../../../../services/album-service/album-service.service";

@Component({
  selector: 'featured-albums-list',
  templateUrl: './featured-albums-list.component.html',
  styleUrls: ['./featured-albums-list.component.css']
})
export class FeaturedAlbumsListComponent implements OnInit {

  featuredAlbums: AlbumLinkDto[] = [];
  errorMessage: string;

  constructor(private albumService: AlbumServiceService) { }

  ngOnInit() {

    this.albumService.getFeaturedAlbums().subscribe(
      data => {

        this.featuredAlbums = data;
      },

      error1 => {

        this.errorMessage = error1.message.message;
      }
    )
  }

}
