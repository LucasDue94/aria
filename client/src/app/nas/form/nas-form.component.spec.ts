import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NasFormComponent } from './nas-form.component';

describe('NasFormComponent', () => {
  let component: NasFormComponent;
  let fixture: ComponentFixture<NasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
