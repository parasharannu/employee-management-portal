import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDialogInfo1Component } from './employee-dialog-info1.component';

describe('EmployeeDialogInfo1Component', () => {
  let component: EmployeeDialogInfo1Component;
  let fixture: ComponentFixture<EmployeeDialogInfo1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDialogInfo1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDialogInfo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
