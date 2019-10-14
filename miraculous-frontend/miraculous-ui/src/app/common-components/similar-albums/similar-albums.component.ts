import {Component, Input, OnInit} from '@angular/core';
import {AlbumLinkDto} from "../../../dto/album-link-dto/album-link-dto";
import {DomainServiceService} from "../../../services/domain-service/domain-service.service";

@Component({
  selector: 'similar-albums',
  templateUrl: './similar-albums.component.html',
  styleUrls: ['./similar-albums.component.css']
})
export class SimilarAlbumsComponent implements OnInit {

  @Input() similarAlbums: AlbumLinkDto[] = [];
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  artistProfilePath: string = DomainServiceService.ARTIST_PROFILE_PATH;
  albumProfilePath: string = DomainServiceService.ALBUM_PAGE_PATH;

  constructor() {

  }

  ngOnInit() {
  }

}
