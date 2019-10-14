import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAppLinkComponent } from './download-app-link.component';

describe('DownloadAppLinkComponent', () => {
  let component: DownloadAppLinkComponent;
  let fixture: ComponentFixture<DownloadAppLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadAppLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadAppLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
