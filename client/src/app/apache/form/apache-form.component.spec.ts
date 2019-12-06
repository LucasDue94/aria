import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApacheFormComponent } from './apache-form.component';

describe('ApacheFormComponent', () => {
  let component: ApacheFormComponent;
  let fixture: ComponentFixture<ApacheFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApacheFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApacheFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
