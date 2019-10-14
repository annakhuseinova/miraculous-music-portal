import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'internalization-panel',
  templateUrl: './internalization-panel.component.html',
  styleUrls: ['./internalization-panel.component.css']
})
export class InternalizationPanelComponent implements OnInit {

  @Output() closedInternalizationPanel = new EventEmitter<any>();
  @Output() appliedLanguage = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  closeInternalizationPanel() {

    this.closedInternalizationPanel.emit();
  }

  applyLanguage() {

    this.appliedLanguage.emit();
  }
}
