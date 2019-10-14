import { Component, OnInit } from '@angular/core';
import {GenreServiceService} from "../../../services/genre-service/genre-service.service";
import {GenreDto} from "../../../dto/genre-dto/genre-dto";
import {DomainServiceService} from "../../../services/domain-service/domain-service.service";

@Component({
  selector: 'genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  imagesPath: string = DomainServiceService.PICTURES_PATH;
  genres: GenreDto[];
  errorMessage: string;
  constructor(private genreService: GenreServiceService) { }

  ngOnInit() {

    this.genreService.getAllGenres().subscribe(

      data => {
         this.genres = data;
         console.log(this.genres);
      },
      error1 => {

        console.log(error1.message);
      }
    )
  }

}
