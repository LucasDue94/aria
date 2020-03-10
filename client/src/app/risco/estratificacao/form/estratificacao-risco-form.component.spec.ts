import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstratificacaoRiscoFormComponent } from './estratificacao-risco-form.component';

describe('TevFormComponent', () => {
  let component: EstratificacaoRiscoFormComponent;
  let fixture: ComponentFixture<EstratificacaoRiscoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstratificacaoRiscoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstratificacaoRiscoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
