import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelCirurgicoComponent } from './painel-cirurgico.component';

describe('PainelCirurgicoComponent', () => {
  let component: PainelCirurgicoComponent;
  let fixture: ComponentFixture<PainelCirurgicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelCirurgicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelCirurgicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
