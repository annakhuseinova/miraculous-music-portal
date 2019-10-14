import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderBlockComponent } from './preloader-block.component';

describe('PreloaderBlockComponent', () => {
  let component: PreloaderBlockComponent;
  let fixture: ComponentFixture<PreloaderBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloaderBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloaderBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
