import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'upload-progress-panel',
  templateUrl: './upload-progress-panel.component.html',
  styleUrls: ['./upload-progress-panel.component.css']
})
export class UploadProgressPanelComponent implements OnInit, AfterViewInit {

  @Input() percentOfUpload: number = 0;
  @Output() onGoToArtistPageButtonClicked = new EventEmitter();
  @Output() onCancelledUpload = new EventEmitter();
  @Input() hasValidationFailed: boolean = false;
  @Input() validationMessages: string[] = [];

  @ViewChild("uploadProgressPanel")
  uploadProgressPanel: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

    this.uploadProgressPanel.nativeElement.style = "pointer-events: all";
  }


  goToArtistProfilePage() {

    this.onGoToArtistPageButtonClicked.emit();
  }

  cancelTrackUpload() {

    this.onCancelledUpload.emit();
  }
}
