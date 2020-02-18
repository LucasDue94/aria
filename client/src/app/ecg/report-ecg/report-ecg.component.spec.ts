import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEcgComponent } from './report-ecg.component';

describe('ReportEcgComponent', () => {
  let component: ReportEcgComponent;
  let fixture: ComponentFixture<ReportEcgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEcgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEcgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
