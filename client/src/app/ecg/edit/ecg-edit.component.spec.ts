import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcgEditComponent } from './ecg-edit.component';

describe('EcgEditComponent', () => {
  let component: EcgEditComponent;
  let fixture: ComponentFixture<EcgEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcgEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcgEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
