import { Component, OnInit } from '@angular/core';
import {GenreServiceService} from "../../../services/genre-service/genre-service.service";
import {DomainServiceService} from "../../../services/domain-service/domain-service.service";
import {GenreDto} from "../../../dto/genre-dto/genre-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {AlbumLinkDto} from "../../../dto/album-link-dto/album-link-dto";
import {TrackServiceService} from "../../../services/track-service/track-service.service";
import {AlbumServiceService} from "../../../services/album-service/album-service.service";
import {PlayableTrackDto} from "../../../dto/playable-track-dto/playable-track-dto";

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.css']
})
export class GenrePageComponent implements OnInit {

  imagesPath: string = DomainServiceService.PICTURES_PATH;
  genre: GenreDto = new GenreDto();
  top10TracksOfGenre: PlayableTrackDto[] = [];
  top10AlbumsOfGenre: AlbumLinkDto[] = [];


  constructor(private genreService:GenreServiceService,
              private activatedRoute: ActivatedRoute,
              private trackService: TrackServiceService,
              private albumService: AlbumServiceService,
              private router: Router) {

  }

  ngOnInit() {

    this.getGenre();
    this.getTop10AlbumsOfGenre();
    this.getTop10TracksOfGenre();

  }


  getGenre(){

    this.genreService.getGenreById(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {
        this.genre = data.body;
      },

      error1 => {

        if (error1.status == 404){

          this.router.navigate(["miraculous/not-found"]);
        }
        console.log(error1.message);
      }
    )
  }

  getTop10TracksOfGenre(){

    this.trackService.getTop10TracksOfGenre(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {

        this.top10TracksOfGenre = data.body;

      },
      error1 => {

        console.log(error1.message);
      }
    )
  }

  getTop10AlbumsOfGenre(){

    this.albumService.getTop10AlbumsOfGenre(this.activatedRoute.snapshot.params["id"]).subscribe(

      data => {

        this.top10AlbumsOfGenre = data.body;

      },
      error1 => {

        console.log(error1.message);
      }
    )
  }

}
