import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NasPacienteListComponent } from './nas-paciente-list.component';

describe('NasPacienteListComponent', () => {
  let component: NasPacienteListComponent;
  let fixture: ComponentFixture<NasPacienteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NasPacienteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NasPacienteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
