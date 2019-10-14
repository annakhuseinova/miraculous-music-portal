import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AlbumServiceService} from "../../../services/album-service/album-service.service";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  topAlbums: string[] = [];

  constructor(private router: Router, private albumService: AlbumServiceService) { }

  ngOnInit() {

    this.getTopAlbumsAsAlbumTitles();
  }

  navigate(path: string) {
    this.router.navigate(['miraculous/'+ path]);
  }

  getTopAlbumsAsAlbumTitles(){

    this.albumService.getTop15Albums().subscribe(

      data => {
        this.topAlbums = data.body.map((title) => {
          return " " + title.title;
        });
      }
    )
  }
}
