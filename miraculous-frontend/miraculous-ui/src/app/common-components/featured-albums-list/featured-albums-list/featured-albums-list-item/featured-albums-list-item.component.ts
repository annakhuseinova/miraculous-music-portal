import {Component, Input, OnInit} from '@angular/core';
import {AlbumLinkDto} from "../../../../../dto/album-link-dto/album-link-dto";
import {DomainServiceService} from "../../../../../services/domain-service/domain-service.service";

@Component({
  selector: 'featured-albums-list-item',
  templateUrl: './featured-albums-list-item.component.html',
  styleUrls: ['./featured-albums-list-item.component.css']
})
export class FeaturedAlbumsListItemComponent implements OnInit {

  @Input() album: AlbumLinkDto = new AlbumLinkDto();
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  albumPagePath: string = DomainServiceService.ALBUM_PAGE_PATH;
  artistPagePath: string = DomainServiceService.ARTIST_PROFILE_PATH;

  constructor() { }

  ngOnInit() {
  }

}
