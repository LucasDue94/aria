import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaResumoComponent } from './tabela-resumo.component';

describe('TabelaResumoComponent', () => {
  let component: TabelaResumoComponent;
  let fixture: ComponentFixture<TabelaResumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaResumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
