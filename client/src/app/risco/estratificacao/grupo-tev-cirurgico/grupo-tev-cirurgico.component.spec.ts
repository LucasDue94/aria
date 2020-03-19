import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoTevCirurgicoComponent } from './grupo-tev-cirurgico.component';

describe('FormTevCirurgicoComponent', () => {
  let component: GrupoTevCirurgicoComponent;
  let fixture: ComponentFixture<GrupoTevCirurgicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoTevCirurgicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoTevCirurgicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
