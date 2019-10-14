import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarTracksComponent } from './similar-tracks.component';

describe('SimilarTracksComponent', () => {
  let component: SimilarTracksComponent;
  let fixture: ComponentFixture<SimilarTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarTracksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
