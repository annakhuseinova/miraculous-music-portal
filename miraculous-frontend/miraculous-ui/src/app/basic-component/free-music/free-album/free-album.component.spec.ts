import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeAlbumComponent } from './free-album.component';

describe('FreeAlbumComponent', () => {
  let component: FreeAlbumComponent;
  let fixture: ComponentFixture<FreeAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
