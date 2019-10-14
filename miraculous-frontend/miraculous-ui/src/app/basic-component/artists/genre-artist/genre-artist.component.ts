import {Component, Input, OnInit} from '@angular/core';
import {ArtistLinkDto} from "../../../../dto/artist-link-dto/artist-link-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";

@Component({
  selector: 'genre-artist',
  templateUrl: './genre-artist.component.html',
  styleUrls: ['./genre-artist.component.css']
})
export class GenreArtistComponent implements OnInit {

  @Input() genreArtist: ArtistLinkDto = new ArtistLinkDto();
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  artistPageUrl: string = DomainServiceService.ARTIST_PROFILE_PATH;

  constructor() { }

  ngOnInit() {
  }

}
