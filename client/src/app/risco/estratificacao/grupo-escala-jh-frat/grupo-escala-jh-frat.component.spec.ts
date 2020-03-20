import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoEscalaJhFratComponent } from './grupo-escala-jh-frat.component';

describe('EscalaJhFratComponent', () => {
  let component: GrupoEscalaJhFratComponent;
  let fixture: ComponentFixture<GrupoEscalaJhFratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoEscalaJhFratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoEscalaJhFratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
