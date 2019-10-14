import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreTrackComponent } from './genre-track.component';

describe('GenreTrackComponent', () => {
  let component: GenreTrackComponent;
  let fixture: ComponentFixture<GenreTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
