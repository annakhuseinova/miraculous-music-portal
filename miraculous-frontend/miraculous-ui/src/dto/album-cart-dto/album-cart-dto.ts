export class AlbumCartDto {

  visitorId: number;
  albumId: number;


  constructor(visitorId?: number, albumId?: number) {
    this.visitorId = visitorId;
    this.albumId = albumId;
  }
}
