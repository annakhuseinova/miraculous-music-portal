import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicComponentComponent } from './basic-component.component';

describe('BasicComponentComponent', () => {
  let component: BasicComponentComponent;
  let fixture: ComponentFixture<BasicComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
