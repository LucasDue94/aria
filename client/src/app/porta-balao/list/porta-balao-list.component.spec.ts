import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortaBalaoListComponent } from './porta-balao-list.component';

describe('PortaBalaoListComponent', () => {
  let component: PortaBalaoListComponent;
  let fixture: ComponentFixture<PortaBalaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortaBalaoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortaBalaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
