import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreAlbumComponent } from './genre-album.component';

describe('GenreAlbumComponent', () => {
  let component: GenreAlbumComponent;
  let fixture: ComponentFixture<GenreAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
