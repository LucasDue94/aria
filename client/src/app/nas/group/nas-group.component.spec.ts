import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NasGroupComponent } from './nas-group.component';

describe('NasGroupComponent', () => {
  let component: NasGroupComponent;
  let fixture: ComponentFixture<NasGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NasGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NasGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
