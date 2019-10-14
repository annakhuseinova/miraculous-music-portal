import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedTrackComponent } from './purchased-track.component';

describe('PurchasedTrackComponent', () => {
  let component: PurchasedTrackComponent;
  let fixture: ComponentFixture<PurchasedTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
