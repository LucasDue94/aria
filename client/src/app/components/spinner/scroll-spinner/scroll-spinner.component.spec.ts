import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollSpinnerComponent } from './scroll-spinner.component';

describe('ScrollSpinnerComponent', () => {
  let component: ScrollSpinnerComponent;
  let fixture: ComponentFixture<ScrollSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
