import {Component, Input, OnInit} from '@angular/core';
import {TrackLinkDto} from "../../../../dto/track-link-dto/track-link-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";

@Component({
  selector: 'found-track',
  templateUrl: './found-track.component.html',
  styleUrls: ['./found-track.component.css']
})
export class FoundTrackComponent implements OnInit {

  @Input() foundTrack: TrackLinkDto = new TrackLinkDto();
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  artistPageUrl: string = DomainServiceService.ARTIST_PROFILE_PATH;
  trackPageUrl: string = DomainServiceService.TRACK_PAGE_PATH;


  constructor() { }

  ngOnInit() {
  }

}
