import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlbumToFeaturedComponent } from './add-album-to-featured.component';

describe('AddAlbumToFeaturedComponent', () => {
  let component: AddAlbumToFeaturedComponent;
  let fixture: ComponentFixture<AddAlbumToFeaturedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAlbumToFeaturedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlbumToFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
