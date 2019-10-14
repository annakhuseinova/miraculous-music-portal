import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksQueueItemComponent } from './tracks-queue-item.component';

describe('TracksQueueItemComponent', () => {
  let component: TracksQueueItemComponent;
  let fixture: ComponentFixture<TracksQueueItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracksQueueItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksQueueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
