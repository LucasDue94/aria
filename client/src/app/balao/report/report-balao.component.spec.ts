import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBalaoComponent } from './report-balao.component';

describe('ReportBalaoComponent', () => {
  let component: ReportBalaoComponent;
  let fixture: ComponentFixture<ReportBalaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportBalaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBalaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
