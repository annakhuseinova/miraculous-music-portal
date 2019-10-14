import {Component, Input, OnInit} from '@angular/core';
import {ArtistLinkDto} from "../../../../dto/artist-link-dto/artist-link-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";

@Component({
  selector: 'found-artist',
  templateUrl: './found-artist.component.html',
  styleUrls: ['./found-artist.component.css']
})
export class FoundArtistComponent implements OnInit {

  @Input() foundArtist: ArtistLinkDto = new ArtistLinkDto();
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  artistPageUrl: string = DomainServiceService.ARTIST_PROFILE_PATH;

  constructor() { }

  ngOnInit() {
  }

}
