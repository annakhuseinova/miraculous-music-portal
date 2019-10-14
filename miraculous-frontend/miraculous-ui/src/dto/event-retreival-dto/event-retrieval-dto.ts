export class EventRetrievalDto {

  id: number;
  eventTitle: string;
  eventLocation: string;
  eventTime: string;
  eventText: string;
  eventCoverPictureUrlName: string;
  artistId: number;


  constructor(id?: number, eventTitle?: string, eventLocation?: string, eventTime?: string, eventText?: string, eventCoverPictureUrlName?: string) {
    this.id = id;
    this.eventTitle = eventTitle;
    this.eventLocation = eventLocation;
    this.eventTime = eventTime;
    this.eventText = eventText;
    this.eventCoverPictureUrlName = eventCoverPictureUrlName;
  }
}
