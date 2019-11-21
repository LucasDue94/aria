import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetorEditComponent } from './setor-edit.component';

describe('SetorEditComponent', () => {
  let component: SetorEditComponent;
  let fixture: ComponentFixture<SetorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
