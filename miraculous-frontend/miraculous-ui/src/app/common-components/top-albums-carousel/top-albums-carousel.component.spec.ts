import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAlbumsCarouselComponent } from './top-albums-carousel.component';

describe('TopAlbumsCarouselComponent', () => {
  let component: TopAlbumsCarouselComponent;
  let fixture: ComponentFixture<TopAlbumsCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAlbumsCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAlbumsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
