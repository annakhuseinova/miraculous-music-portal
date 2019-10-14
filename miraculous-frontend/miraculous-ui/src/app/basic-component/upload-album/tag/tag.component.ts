import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  @Output() closedElement = new EventEmitter<any>();

  tagText: string;
  genreId: number;

  constructor() { }

  ngOnInit() {
  }

  closeElement() {

    this.closedElement.emit(event);
  }
}
