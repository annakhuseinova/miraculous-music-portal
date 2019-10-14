import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedAlbumsListItemComponent } from './featured-albums-list-item.component';

describe('FeaturedAlbumsListItemComponent', () => {
  let component: FeaturedAlbumsListItemComponent;
  let fixture: ComponentFixture<FeaturedAlbumsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedAlbumsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedAlbumsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
