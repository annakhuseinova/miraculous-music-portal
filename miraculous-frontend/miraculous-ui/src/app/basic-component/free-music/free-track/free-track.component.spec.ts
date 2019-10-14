import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeTrackComponent } from './free-track.component';

describe('FreeTrackComponent', () => {
  let component: FreeTrackComponent;
  let fixture: ComponentFixture<FreeTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
