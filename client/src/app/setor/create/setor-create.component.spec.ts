import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetorCreateComponent } from './setor-create.component';

describe('SetorCreateComponent', () => {
  let component: SetorCreateComponent;
  let fixture: ComponentFixture<SetorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
