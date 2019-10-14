export class TrackUploadDto {

  title: string;
  artistId: number;
  artistLogin: string;
  description: string;
  dateOfRelease: string;
  isFree: boolean;
  price: number;
  size: number;
  length: number;

  constructor(title?: string, artistId?: number, artistLogin?: string, description?: string, dateOfRelease?: string,
              isFree?: boolean, price?: number, size?: number, duration?: number) {
    this.title = title;
    this.artistId = artistId;
    this.artistLogin = artistLogin;
    this.description = description;
    this.dateOfRelease = dateOfRelease;
    this.isFree = isFree;
    this.price = price;
    this.size = size;
    this.length = duration;
  }
}
