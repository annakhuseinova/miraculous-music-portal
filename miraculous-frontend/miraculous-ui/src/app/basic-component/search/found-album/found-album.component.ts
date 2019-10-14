import {Component, Input, OnInit} from '@angular/core';
import {AlbumLinkDto} from "../../../../dto/album-link-dto/album-link-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";

@Component({
  selector: 'found-album',
  templateUrl: './found-album.component.html',
  styleUrls: ['./found-album.component.css']
})
export class FoundAlbumComponent implements OnInit {

  @Input() foundAlbum: AlbumLinkDto = new AlbumLinkDto();
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  artistPageUrl: string = DomainServiceService.ARTIST_PROFILE_PATH;
  albumPageUrl: string = DomainServiceService.ALBUM_PAGE_PATH;

  constructor() { }

  ngOnInit() {
  }

}
