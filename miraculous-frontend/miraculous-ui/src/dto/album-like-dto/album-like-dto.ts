export class AlbumLikeDto {

  siteVisitorId: number;
  albumId: number;
  numberOfLikes: number;
  albumLikedByCurrentVisitor: boolean;


  constructor(siteVisitorId?: number, albumId?: number, numberOfLikes?: number, isAlbumLikedByCurrentVisitor?: boolean) {
    this.siteVisitorId = siteVisitorId;
    this.albumId = albumId;
    this.numberOfLikes = numberOfLikes;
    this.albumLikedByCurrentVisitor = isAlbumLikedByCurrentVisitor;
  }
}
