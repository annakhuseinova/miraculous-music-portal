import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistTrackComponent } from './artist-track.component';

describe('ArtistTrackComponent', () => {
  let component: ArtistTrackComponent;
  let fixture: ComponentFixture<ArtistTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
