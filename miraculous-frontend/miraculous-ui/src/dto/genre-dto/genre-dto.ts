export class GenreDto {

  id: number;
  title: string;
  genrePictureUrlName: string;
  totalNumberOfLikes: number;
  description: string;


  constructor(id?: number, title?: string, genrePictureUrl?: string, totalNumberOfLikes?: number, description?: string) {
    this.id = id;
    this.title = title;
    this.genrePictureUrlName = genrePictureUrl;
    this.totalNumberOfLikes = totalNumberOfLikes;
    this.description = description;
  }
}
