import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiotrackWithDetailsComponent } from './audiotrack-with-details.component';

describe('AudiotrackWithDetailsComponent', () => {
  let component: AudiotrackWithDetailsComponent;
  let fixture: ComponentFixture<AudiotrackWithDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudiotrackWithDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiotrackWithDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
