import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlbumLinkDto} from "../../../../dto/album-link-dto/album-link-dto";
import {HttpClient} from "@angular/common/http";
import {AlbumServiceService} from "../../../../services/album-service/album-service.service";
import {ResponseMessageDto} from "../../../../dto/response-message-dto/response-message-dto";

@Component({
  selector: 'featured-album',
  templateUrl: './featured-album.component.html',
  styleUrls: ['./featured-album.component.css']
})
export class FeaturedAlbumComponent implements OnInit {

  @Input() featuredAlbum: AlbumLinkDto = new AlbumLinkDto();
  @Output() onAlbumDeletionFromFeaturedSuccess = new EventEmitter();
  errorMessage: string;

  constructor(private albumService: AlbumServiceService) {

  }

  deleteAlbumFromFeaturedByAlbumId(){

    this.albumService.deleteAlbumFromFeaturedByAlbumId(this.featuredAlbum.id).subscribe(

      response => {
        this.onAlbumDeletionFromFeaturedSuccess.emit();
      },
      error1 => {

        this.errorMessage = (error1.body as ResponseMessageDto).message;
      }
    )
  }
 
  ngOnInit() {


  }

}
