import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedMusicComponentComponent } from './featured-music-component.component';

describe('FeaturedMusicComponentComponent', () => {
  let component: FeaturedMusicComponentComponent;
  let fixture: ComponentFixture<FeaturedMusicComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedMusicComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedMusicComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
