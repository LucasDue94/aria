import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApachePacienteListComponent } from './apache-paciente-list.component';

describe('ApachePacienteListComponent', () => {
  let component: ApachePacienteListComponent;
  let fixture: ComponentFixture<ApachePacienteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApachePacienteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApachePacienteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
