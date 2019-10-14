import { Component, OnInit } from '@angular/core';
import {ArtistServiceService} from "../../../services/artist-service/artist-service.service";
import {ArtistLinkDto} from "../../../dto/artist-link-dto/artist-link-dto";

@Component({
  selector: 'featured-artists-list',
  templateUrl: './featured-artists-list.component.html',
  styleUrls: ['./featured-artists-list.component.css']
})
export class FeaturedArtistsListComponent implements OnInit {

  featuredArtists: ArtistLinkDto[] = [];
  errorMessage: string;


  constructor(private artistsService: ArtistServiceService) { }

  ngOnInit() {

    this.artistsService.getFeaturedArtists().subscribe(
      data=>{

        this.featuredArtists = data;

      },

      error1 => {

        this.errorMessage = error1.message.message;
      }
    )
  }

}
