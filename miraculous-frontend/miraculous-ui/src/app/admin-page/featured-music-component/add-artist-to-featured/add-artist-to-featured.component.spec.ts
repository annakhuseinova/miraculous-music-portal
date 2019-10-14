import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArtistToFeaturedComponent } from './add-artist-to-featured.component';

describe('AddArtistToFeaturedComponent', () => {
  let component: AddArtistToFeaturedComponent;
  let fixture: ComponentFixture<AddArtistToFeaturedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArtistToFeaturedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArtistToFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
