import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalaoListComponent } from './balao-list.component';

describe('BalaoListComponent', () => {
  let component: BalaoListComponent;
  let fixture: ComponentFixture<BalaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalaoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
