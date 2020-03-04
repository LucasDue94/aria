import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBalaoComponent } from './edit-balao.component';

describe('EditBalaoComponent', () => {
  let component: EditBalaoComponent;
  let fixture: ComponentFixture<EditBalaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBalaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBalaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
