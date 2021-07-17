import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDialogInfo2Component } from './employee-dialog-info2.component';

describe('EmployeeDialogInfo2Component', () => {
  let component: EmployeeDialogInfo2Component;
  let fixture: ComponentFixture<EmployeeDialogInfo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDialogInfo2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDialogInfo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
