import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTrackComponent } from './cart-track.component';

describe('CartTrackComponent', () => {
  let component: CartTrackComponent;
  let fixture: ComponentFixture<CartTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
