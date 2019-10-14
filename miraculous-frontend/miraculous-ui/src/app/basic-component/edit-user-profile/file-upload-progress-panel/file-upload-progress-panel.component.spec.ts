import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadProgressPanelComponent } from './file-upload-progress-panel.component';

describe('FileUploadProgressPanelComponent', () => {
  let component: FileUploadProgressPanelComponent;
  let fixture: ComponentFixture<FileUploadProgressPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadProgressPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadProgressPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
