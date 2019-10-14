import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlbumLinkDto} from "../../../../../dto/album-link-dto/album-link-dto";
import {AlbumServiceService} from "../../../../../services/album-service/album-service.service";

@Component({
  selector: 'album-to-be-added-to-featured',
  templateUrl: './album-to-be-added-to-featured.component.html',
  styleUrls: ['./album-to-be-added-to-featured.component.css']
})
export class AlbumToBeAddedToFeaturedComponent implements OnInit {

  @Input() album: AlbumLinkDto = new AlbumLinkDto();
  @Output() onAlbumToFeatured = new EventEmitter();
  errorMessage: string;
  successMessage: string;

  constructor(private albumService: AlbumServiceService) { }

  ngOnInit() {
  }

  addAlbumToFeatured() {

    this.albumService.addAlbumToFeaturedByAlbumId(this.album.id).subscribe(

      response => {

        this.onAlbumToFeatured.emit();
      },
      error1 =>  {

        this.errorMessage = error1.message;

      }
    );
    this.onAlbumToFeatured.emit();
  }
}
