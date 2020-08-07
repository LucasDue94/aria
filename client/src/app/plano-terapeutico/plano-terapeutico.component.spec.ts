import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoTerapeuticoComponent } from './plano-terapeutico.component';

describe('PlanoTerapeuticoComponent', () => {
  let component: PlanoTerapeuticoComponent;
  let fixture: ComponentFixture<PlanoTerapeuticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanoTerapeuticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoTerapeuticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
