import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventRetrievalDto} from "../../../../dto/event-retreival-dto/event-retrieval-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";

@Component({
  selector: 'artist-event',
  templateUrl: './artist-event.component.html',
  styleUrls: ['./artist-event.component.css']
})
export class ArtistEventComponent implements OnInit {

  @Input() event = new EventRetrievalDto();
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  @Input() isEventDeletionAllowed: boolean;
  @Output() onEventDeletion = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteEvent() {
    this.onEventDeletion.emit();
  }
}
