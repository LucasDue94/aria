import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntuarioShowComponent } from './prontuario-show.component';

describe('ProntuarioComponent', () => {
  let component: ProntuarioShowComponent;
  let fixture: ComponentFixture<ProntuarioShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProntuarioShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProntuarioShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
