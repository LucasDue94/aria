import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntuarioListComponent } from './prontuario-list.component';

describe('PacienteListComponent', () => {
  let component: ProntuarioListComponent;
  let fixture: ComponentFixture<ProntuarioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProntuarioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProntuarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
