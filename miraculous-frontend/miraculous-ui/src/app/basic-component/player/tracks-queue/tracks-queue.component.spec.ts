import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksQueueComponent } from './tracks-queue.component';

describe('TracksQueueComponent', () => {
  let component: TracksQueueComponent;
  let fixture: ComponentFixture<TracksQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracksQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
