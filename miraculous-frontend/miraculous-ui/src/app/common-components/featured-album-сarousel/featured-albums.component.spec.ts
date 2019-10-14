import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedAlbumsComponent } from './featured-albums.component';

describe('FeaturedAlbumsComponent', () => {
  let component: FeaturedAlbumsComponent;
  let fixture: ComponentFixture<FeaturedAlbumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedAlbumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
