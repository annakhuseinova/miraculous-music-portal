import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProgressPanelComponent } from './upload-progress-panel.component';

describe('UploadProgressPanelComponent', () => {
  let component: UploadProgressPanelComponent;
  let fixture: ComponentFixture<UploadProgressPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadProgressPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProgressPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
