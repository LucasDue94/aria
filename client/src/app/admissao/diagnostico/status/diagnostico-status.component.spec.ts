import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticoStatusComponent } from './diagnostico-status.component';

describe('StatusComponent', () => {
  let component: DiagnosticoStatusComponent;
  let fixture: ComponentFixture<DiagnosticoStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticoStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
