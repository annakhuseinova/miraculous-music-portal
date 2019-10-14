import { Component, OnInit } from '@angular/core';
import {ArtistServiceService} from "../../../services/artist-service/artist-service.service";
import {ArtistLinkDto} from "../../../dto/artist-link-dto/artist-link-dto";
import {DomainServiceService} from "../../../services/domain-service/domain-service.service";

@Component({
  selector: 'featured-artists-carousel',
  templateUrl: './featured-artists.component.html',
  styleUrls: ['./featured-artists.component.css']
})
export class FeaturedArtistsComponent implements OnInit {

  featuredArtists: Array<ArtistLinkDto> = [];
  artistPagePath: string = DomainServiceService.ARTIST_PROFILE_PATH;
  imagesPath: string = DomainServiceService.PICTURES_PATH;


  constructor(private artistService: ArtistServiceService) {

  }

  ngOnInit() {


    this.artistService.getFeaturedArtists().subscribe(

      data=>{

         this.featuredArtists = data;

      },
      error1 => {
        console.log(error1.message);
      }
    )

  }

}
