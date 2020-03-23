import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoHumptyDumptyComponent } from './grupo-humpty-dumpty.component';

describe('HumptyDumptyComponent', () => {
  let component: GrupoHumptyDumptyComponent;
  let fixture: ComponentFixture<GrupoHumptyDumptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoHumptyDumptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoHumptyDumptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
