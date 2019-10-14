import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedArtistsListItemComponent } from './featured-artists-list-item.component';

describe('FeaturedArtistsListItemComponent', () => {
  let component: FeaturedArtistsListItemComponent;
  let fixture: ComponentFixture<FeaturedArtistsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedArtistsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedArtistsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
