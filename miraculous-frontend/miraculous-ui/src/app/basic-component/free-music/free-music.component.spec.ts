import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeMusicComponent } from './free-music.component';

describe('FreeMusicComponent', () => {
  let component: FreeMusicComponent;
  let fixture: ComponentFixture<FreeMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
