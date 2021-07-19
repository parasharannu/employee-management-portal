import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { IEmployee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-dialog-info4',
  templateUrl: './employee-dialog-info4.component.html',
  styleUrls: ['./employee-dialog-info4.component.scss']
})
export class EmployeeDialogInfo4Component implements OnInit {

  @Input() employee = {} as IEmployee;
  @Input() dialogForm = {} as FormGroup;

  supervisorGroup = {} as FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.supervisorGroup = this.dialogForm.get('supervisor') as FormGroup;
  }

  getShifts() {
    return (this.dialogForm.controls.shiftArray as FormArray).controls;
  }
}
