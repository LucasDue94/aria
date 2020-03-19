import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoTevClinicoComponent } from './grupo-tev-clinico.component';

describe('FormTevClinicoComponent', () => {
  let component: GrupoTevClinicoComponent;
  let fixture: ComponentFixture<GrupoTevClinicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoTevClinicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoTevClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
