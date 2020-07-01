import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteInfoComponent } from './paciente-info.component';

describe('PacienteInfoComponent', () => {
  let component: PacienteInfoComponent;
  let fixture: ComponentFixture<PacienteInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
