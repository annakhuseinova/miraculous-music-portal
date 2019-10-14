import {Component, Input, OnInit} from '@angular/core';
import {GenreDto} from "../../../../dto/genre-dto/genre-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";

@Component({
  selector: 'genre-item',
  templateUrl: './genre-item.component.html',
  styleUrls: ['./genre-item.component.css']
})
export class GenreItemComponent implements OnInit {

  @Input() genre: GenreDto;
  @Input() imagePath: string = DomainServiceService.PICTURES_PATH;

  constructor() { }

  ngOnInit() {

  }

}
