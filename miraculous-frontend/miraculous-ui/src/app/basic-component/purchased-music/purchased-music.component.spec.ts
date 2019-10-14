import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedMusicComponent } from './purchased-music.component';

describe('PurchasedMusicComponent', () => {
  let component: PurchasedMusicComponent;
  let fixture: ComponentFixture<PurchasedMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
