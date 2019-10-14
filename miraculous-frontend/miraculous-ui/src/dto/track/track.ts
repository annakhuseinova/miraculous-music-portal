export class Track {
  
  title: string;
  artist: string;
  coverPictureUrl: string;
  url: string;


  constructor(title: string, artist: string, coverPictureUrl: string, url: string) {
    this.title = title;
    this.artist = artist;
    this.coverPictureUrl = coverPictureUrl;
    this.url = url;
  }
}
