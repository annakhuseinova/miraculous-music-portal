import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumTrackComponent } from './album-track.component';

describe('AlbumTrackComponent', () => {
  let component: AlbumTrackComponent;
  let fixture: ComponentFixture<AlbumTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
