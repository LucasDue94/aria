import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportApacheComponent } from './report-apache.component';

describe('ApacheReportComponent', () => {
  let component: ReportApacheComponent;
  let fixture: ComponentFixture<ReportApacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportApacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportApacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
