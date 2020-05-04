import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelLeitosComponent } from './painel-leitos.component';

describe('PainelLeitosComponent', () => {
  let component: PainelLeitosComponent;
  let fixture: ComponentFixture<PainelLeitosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelLeitosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelLeitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
