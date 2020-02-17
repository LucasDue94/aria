import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalaoFormComponent } from './balao-form.component';

describe('BalaoFormComponent', () => {
  let component: BalaoFormComponent;
  let fixture: ComponentFixture<BalaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
