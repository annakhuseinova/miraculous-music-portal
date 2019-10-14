import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalizationPanelComponent } from './internalization-panel.component';

describe('InternalizationPanelComponent', () => {
  let component: InternalizationPanelComponent;
  let fixture: ComponentFixture<InternalizationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalizationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalizationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
