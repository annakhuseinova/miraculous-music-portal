import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedAlbumsListComponent } from './featured-albums-list.component';

describe('FeaturedAlbumsListComponent', () => {
  let component: FeaturedAlbumsListComponent;
  let fixture: ComponentFixture<FeaturedAlbumsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedAlbumsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedAlbumsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
