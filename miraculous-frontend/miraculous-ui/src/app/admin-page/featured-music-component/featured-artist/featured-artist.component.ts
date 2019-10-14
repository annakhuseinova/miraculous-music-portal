import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArtistLinkDto} from "../../../../dto/artist-link-dto/artist-link-dto";
import {HttpClient} from "@angular/common/http";
import {ArtistServiceService} from "../../../../services/artist-service/artist-service.service";

@Component({
  selector: 'featured-artist',
  templateUrl: './featured-artist.component.html',
  styleUrls: ['./featured-artist.component.css']
})
export class FeaturedArtistComponent implements OnInit {

  @Input() featuredArtist: ArtistLinkDto = new ArtistLinkDto();
  isDeletionFromFeaturedSuccessful: boolean;
  isDeletionFromFeaturedFailed: boolean;
  errorMessage: string;
  successMessage: string;
  @Output() onDeletionOfArtistFromFeatured = new EventEmitter();

  constructor(private artistsService: ArtistServiceService) { }

  ngOnInit() {
  }

  deleteArtistFromFeatured(){

      this.artistsService.deleteArtistFromFeaturedByArtistId(this.featuredArtist.id).subscribe(

        response => {
            this.isDeletionFromFeaturedSuccessful = true;
            this.onDeletionOfArtistFromFeatured.emit();
        },

        error1 => {
          this.errorMessage = error1.message;
          this.isDeletionFromFeaturedFailed = true;
        }
      )
  }

}
