import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoTerapeuticoShowComponent } from './plano-terapeutico-show.component';

describe('PlanoTerapeuticoShowComponent', () => {
  let component: PlanoTerapeuticoShowComponent;
  let fixture: ComponentFixture<PlanoTerapeuticoShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanoTerapeuticoShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoTerapeuticoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
