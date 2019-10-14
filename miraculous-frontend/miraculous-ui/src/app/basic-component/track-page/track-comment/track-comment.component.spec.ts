import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCommentComponent } from './track-comment.component';

describe('TrackCommentComponent', () => {
  let component: TrackCommentComponent;
  let fixture: ComponentFixture<TrackCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
