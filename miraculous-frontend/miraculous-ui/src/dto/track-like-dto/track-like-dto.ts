export class TrackLikeDto {

  siteVisitorId: number;
  trackId: number;
  numberOfLikes: number;
  trackLikedByCurrentVisitor: boolean;


  constructor(siteVisitorId?: number, trackId?: number, numberOfLikes?: number, isTrackLikedByCurrentVisitor?: boolean) {
    this.siteVisitorId = siteVisitorId;
    this.trackId = trackId;
    this.numberOfLikes = numberOfLikes;
    this.trackLikedByCurrentVisitor = isTrackLikedByCurrentVisitor;
  }
}
