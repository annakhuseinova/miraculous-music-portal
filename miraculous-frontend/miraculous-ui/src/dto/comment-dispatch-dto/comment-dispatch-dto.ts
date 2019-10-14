export class CommentDispatchDto {

  authorId: number;
  text: string;
  artistId?: number;
  trackId?: number;
  albumId?: number;


  constructor(authorId?: number, text?: string, artistId?: number, trackId?: number, albumId?: number) {
    this.authorId = authorId;
    this.text = text;
    this.artistId = artistId;
    this.trackId = trackId;
    this.albumId = albumId;
  }
}
