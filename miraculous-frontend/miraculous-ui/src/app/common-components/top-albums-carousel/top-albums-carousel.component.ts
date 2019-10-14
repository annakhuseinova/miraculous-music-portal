import { Component, OnInit } from '@angular/core';
import {AlbumServiceService} from "../../../services/album-service/album-service.service";
import {AlbumLinkDto} from "../../../dto/album-link-dto/album-link-dto";
import {DomainServiceService} from "../../../services/domain-service/domain-service.service";
import {TokenStorageServiceService} from "../../../services/token-storage-service/token-storage-service.service";
import {AlbumLikeDto} from "../../../dto/album-like-dto/album-like-dto";

@Component({
  selector: 'top-albums-carousel',
  templateUrl: './top-albums-carousel.component.html',
  styleUrls: ['./top-albums-carousel.component.css']
})
export class TopAlbumsCarouselComponent implements OnInit {

  topAlbums: AlbumLinkDto[] = [];
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  albumPagePath: string = DomainServiceService.ALBUM_PAGE_PATH;
  artistPagePath: string = DomainServiceService.ARTIST_PROFILE_PATH;

  constructor(private albumService: AlbumServiceService) {
  }

  ngOnInit() {

    this.getTop15Albums();
  }


  getTop15Albums() {

    this.albumService.getTop15Albums().subscribe(
      data => {

        this.topAlbums = data.body;

      },
      error1 => {

        console.log(error1.message);
      }
    )
  }
}
