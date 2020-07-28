import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticoListComponent } from './diagnostico-list.component';

describe('DiagnosticoListComponent', () => {
  let component: DiagnosticoListComponent;
  let fixture: ComponentFixture<DiagnosticoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
