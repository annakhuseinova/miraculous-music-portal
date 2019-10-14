export class AlbumUploadDto {

  title: string;
  artistId: number;
  description: string;
  dateOfRelease: string;
  isFree: boolean;
  price: number;
  size: number;
  duration: number;
  numberOfTracks: number;


  constructor(title?: string, artistId?: number, description?: string, dateOfRelease?: string,
               isFree?: boolean, price?: number, size?: number, duration?: number, numberOfTracks?: number) {
    this.title = title;
    this.artistId = artistId;
    this.description = description;
    this.dateOfRelease = dateOfRelease;
    this.isFree = isFree;
    this.price = price;
    this.size = size;
    this.duration = duration;
    this.numberOfTracks = numberOfTracks;
  }
}
