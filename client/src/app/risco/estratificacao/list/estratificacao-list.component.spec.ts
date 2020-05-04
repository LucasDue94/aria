import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstratificacaoListComponent } from './estratificacao-list.component';

describe('ListComponent', () => {
  let component: EstratificacaoListComponent;
  let fixture: ComponentFixture<EstratificacaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstratificacaoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstratificacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
