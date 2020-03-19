import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoFatorRiscoComponent } from './grupo-fator-risco.component';

describe('RiscosComponent', () => {
  let component: GrupoFatorRiscoComponent;
  let fixture: ComponentFixture<GrupoFatorRiscoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoFatorRiscoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoFatorRiscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
