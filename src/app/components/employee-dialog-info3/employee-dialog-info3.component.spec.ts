import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDialogInfo3Component } from './employee-dialog-info3.component';

describe('EmployeeDialogInfo3Component', () => {
  let component: EmployeeDialogInfo3Component;
  let fixture: ComponentFixture<EmployeeDialogInfo3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDialogInfo3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDialogInfo3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
