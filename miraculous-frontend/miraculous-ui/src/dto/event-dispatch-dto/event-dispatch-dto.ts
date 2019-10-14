export class EventDispatchDto {

  id: number;
  eventTitle: string;
  eventLocation: string;
  eventTime: string;
  eventText: string;
  artistId: number;


  constructor(id?: number, eventTitle?: string, eventLocation?: string, eventTime?: string, eventText?: string) {
    this.id = id;
    this.eventTitle = eventTitle;
    this.eventLocation = eventLocation;
    this.eventTime = eventTime;
    this.eventText = eventText;
  }
}
