import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedAlbumTrackComponent } from './purchased-album-track.component';

describe('PurchasedAlbumTrackComponent', () => {
  let component: PurchasedAlbumTrackComponent;
  let fixture: ComponentFixture<PurchasedAlbumTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedAlbumTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedAlbumTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
