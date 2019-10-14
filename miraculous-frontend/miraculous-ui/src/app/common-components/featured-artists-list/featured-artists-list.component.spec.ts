import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedArtistsListComponent } from './featured-artists-list.component';

describe('FeaturedArtistsListComponent', () => {
  let component: FeaturedArtistsListComponent;
  let fixture: ComponentFixture<FeaturedArtistsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedArtistsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedArtistsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
