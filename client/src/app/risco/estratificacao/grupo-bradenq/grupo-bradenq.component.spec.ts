import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoBradenqComponent } from './grupo-bradenq.component';

describe('GrupoBradenqComponent', () => {
  let component: GrupoBradenqComponent;
  let fixture: ComponentFixture<GrupoBradenqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoBradenqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoBradenqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
