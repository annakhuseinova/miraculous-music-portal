import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAlbumComponent } from './cart-album.component';

describe('CartAlbumComponent', () => {
  let component: CartAlbumComponent;
  let fixture: ComponentFixture<CartAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
