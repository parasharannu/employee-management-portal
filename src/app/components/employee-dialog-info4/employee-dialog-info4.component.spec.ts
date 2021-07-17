import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDialogInfo4Component } from './employee-dialog-info4.component';

describe('EmployeeDialogInfo4Component', () => {
  let component: EmployeeDialogInfo4Component;
  let fixture: ComponentFixture<EmployeeDialogInfo4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDialogInfo4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDialogInfo4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
