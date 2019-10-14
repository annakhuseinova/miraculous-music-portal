import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumToBeAddedToFeaturedComponent } from './album-to-be-added-to-featured.component';

describe('AlbumToBeAddedToFeaturedComponent', () => {
  let component: AlbumToBeAddedToFeaturedComponent;
  let fixture: ComponentFixture<AlbumToBeAddedToFeaturedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumToBeAddedToFeaturedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumToBeAddedToFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
