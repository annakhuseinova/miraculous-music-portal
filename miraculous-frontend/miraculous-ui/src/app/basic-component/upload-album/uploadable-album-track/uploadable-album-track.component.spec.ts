import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadableAlbumTrackComponent } from './uploadable-album-track.component';

describe('UploadableAlbumTrackComponent', () => {
  let component: UploadableAlbumTrackComponent;
  let fixture: ComponentFixture<UploadableAlbumTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadableAlbumTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadableAlbumTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
