export class AlbumTrackUploadDto {

  artistId: number;
  title: string;
  price: number;
  fullAlbumTrackVersionSize: number;
  previewAlbumTrackVersionSize: number;
  duration: number;
  isFree: boolean;


  constructor(artistId?: number, title?: string, price?: number, size?: number, duration?: number, previewAlbumTrackVersionSize?: number,
              isFree?: boolean) {
    this.artistId = artistId;
    this.title = title;
    this.price = price;
    this.fullAlbumTrackVersionSize = size;
    this.duration = duration;
    this.previewAlbumTrackVersionSize = previewAlbumTrackVersionSize;
    this.isFree = isFree;
  }
}
