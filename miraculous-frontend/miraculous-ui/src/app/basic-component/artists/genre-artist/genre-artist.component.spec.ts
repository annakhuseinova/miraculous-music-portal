import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreArtistComponent } from './genre-artist.component';

describe('GenreArtistComponent', () => {
  let component: GenreArtistComponent;
  let fixture: ComponentFixture<GenreArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
