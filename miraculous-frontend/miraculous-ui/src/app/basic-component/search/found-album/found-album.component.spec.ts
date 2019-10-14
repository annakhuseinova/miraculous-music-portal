import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundAlbumComponent } from './found-album.component';

describe('FoundAlbumComponent', () => {
  let component: FoundAlbumComponent;
  let fixture: ComponentFixture<FoundAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
