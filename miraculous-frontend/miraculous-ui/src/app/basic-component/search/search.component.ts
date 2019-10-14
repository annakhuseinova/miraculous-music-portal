import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SearchServiceService} from "../../../services/search-service/search-service.service";
import {BasicComponentComponent} from "../basic-component.component";
import {ArtistLinkDto} from "../../../dto/artist-link-dto/artist-link-dto";
import {TrackLinkDto} from "../../../dto/track-link-dto/track-link-dto";
import {AlbumLinkDto} from "../../../dto/album-link-dto/album-link-dto";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  keyword: string;
  numberOfResults: number = 0;
  foundArtists: ArtistLinkDto[] = [];
  foundTracks: TrackLinkDto[] = [];
  foundAlbums: AlbumLinkDto[] = [];

  @ViewChild("searchInput")
  searchInput: ElementRef;

  constructor(private searchService: SearchServiceService) { }

  ngOnInit() {

  }

  getSearchResults(){

    this.searchService.getSearchResults(this.searchInput.nativeElement.value).subscribe(

      data => {

        this.foundArtists = data["foundArtists"];
        this.foundTracks = data["foundTracks"];
        this.foundAlbums = data["foundAlbums"];

        if (this.foundArtists.length == 0 && this.foundTracks.length == 0 && this.foundAlbums.length == 0){

          this.keyword = this.searchInput.nativeElement.value;
          this.numberOfResults = 0;

        }else {

          this.keyword = null;
          this.numberOfResults = (this.foundArtists.length + this.foundTracks.length + this.foundAlbums.length);

        }
      }
    )
  }

}
