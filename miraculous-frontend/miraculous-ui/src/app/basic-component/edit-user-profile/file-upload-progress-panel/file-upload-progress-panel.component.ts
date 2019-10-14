import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'file-upload-progress-panel',
  templateUrl: './file-upload-progress-panel.component.html',
  styleUrls: ['./file-upload-progress-panel.component.css']
})
export class FileUploadProgressPanelComponent implements OnInit {

  @Output() onCancelButtonClicked = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  cancelUpload() {
    this.onCancelButtonClicked.emit();
  }
}
