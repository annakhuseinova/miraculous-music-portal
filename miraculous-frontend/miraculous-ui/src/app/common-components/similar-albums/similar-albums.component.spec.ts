import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarAlbumsComponent } from './similar-albums.component';

describe('SimilarAlbumsComponent', () => {
  let component: SimilarAlbumsComponent;
  let fixture: ComponentFixture<SimilarAlbumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarAlbumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
