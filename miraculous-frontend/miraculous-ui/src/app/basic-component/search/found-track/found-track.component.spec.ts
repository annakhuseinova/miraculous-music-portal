import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundTrackComponent } from './found-track.component';

describe('FoundTrackComponent', () => {
  let component: FoundTrackComponent;
  let fixture: ComponentFixture<FoundTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
