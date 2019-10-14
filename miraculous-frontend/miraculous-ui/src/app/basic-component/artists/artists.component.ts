import { Component, OnInit } from '@angular/core';
import {ArtistLinkDto} from "../../../dto/artist-link-dto/artist-link-dto";
import {GenreServiceService} from "../../../services/genre-service/genre-service.service";

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  tranceArtists: ArtistLinkDto[] = [];
  popArtists: ArtistLinkDto[] = [];
  rockArtists: ArtistLinkDto[] = [];
  rapArtists: ArtistLinkDto[] = [];

  constructor(private genreService: GenreServiceService) { }

  ngOnInit() {

    this.get10PopArtists();
    this.get10RockArtists();
    this.get10TranceArtists();
    this.get10RapArtists();
  }


  get10TranceArtists(){

    this.genreService.get10ArtistsOfGenre(2).subscribe(

      data => {

        this.tranceArtists = data.body;

      },
      error1 => {

        console.log(error1.message);
      }
    )
  }

  get10PopArtists(){

    this.genreService.get10ArtistsOfGenre(1).subscribe(

      data => {

        this.popArtists = data.body;

      },
      error1 => {

        console.log(error1.message);
      }
    )
  }

  get10RockArtists(){

    this.genreService.get10ArtistsOfGenre(3).subscribe(

      data => {

        this.rockArtists = data.body;

      },
      error1 => {

        console.log(error1.message);
      }
    )

  }

  get10RapArtists(){

    this.genreService.get10ArtistsOfGenre(5).subscribe(

      data => {

        this.rapArtists = data.body;
      },
      error1 => {

        console.log(error1.message);
      }
    )
  }

}
