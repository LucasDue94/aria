import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortaBalaoFormComponent } from './porta-balao-form.component';

describe('PortaBalaoFormComponent', () => {
  let component: PortaBalaoFormComponent;
  let fixture: ComponentFixture<PortaBalaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortaBalaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortaBalaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
