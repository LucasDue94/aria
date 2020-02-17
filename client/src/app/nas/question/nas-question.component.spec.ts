import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NasQuestionComponent } from './nas-question.component';

describe('NasQuestionComponent', () => {
  let component: NasQuestionComponent;
  let fixture: ComponentFixture<NasQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NasQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NasQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
