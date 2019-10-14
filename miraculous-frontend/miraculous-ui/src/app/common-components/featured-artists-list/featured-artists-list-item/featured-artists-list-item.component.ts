import {Component, Input, OnInit} from '@angular/core';
import {ArtistLinkDto} from "../../../../dto/artist-link-dto/artist-link-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";

@Component({
  selector: 'featured-artists-list-item',
  templateUrl: './featured-artists-list-item.component.html',
  styleUrls: ['./featured-artists-list-item.component.css']
})
export class FeaturedArtistsListItemComponent implements OnInit {

  @Input() artist: ArtistLinkDto = new ArtistLinkDto();
  imageUrl: string = DomainServiceService.PICTURES_PATH;
  artistPageUrl: string = DomainServiceService.ARTIST_PROFILE_PATH;

  constructor() { }

  ngOnInit() {
  }

}
