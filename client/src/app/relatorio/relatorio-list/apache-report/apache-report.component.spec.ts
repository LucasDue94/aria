import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApacheReportComponent } from './apache-report.component';

describe('ApacheReportComponent', () => {
  let component: ApacheReportComponent;
  let fixture: ComponentFixture<ApacheReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApacheReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApacheReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
