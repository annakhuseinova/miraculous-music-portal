import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundArtistComponent } from './found-artist.component';

describe('FoundArtistComponent', () => {
  let component: FoundArtistComponent;
  let fixture: ComponentFixture<FoundArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
