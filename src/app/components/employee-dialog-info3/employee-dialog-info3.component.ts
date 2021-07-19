import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IEmployee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-dialog-info3',
  templateUrl: './employee-dialog-info3.component.html',
  styleUrls: ['./employee-dialog-info3.component.scss']
})
export class EmployeeDialogInfo3Component implements OnInit {

  @Input() employee = {} as IEmployee;
  @Input() dialogForm = {} as FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  addSkill() {
    this.employee.skills?.push(this.dialogForm.controls.skill.value);
    this.dialogForm.controls.skill.patchValue('');
    this.dialogForm.controls.skill.setValidators([]);
    this.dialogForm.controls.skill.updateValueAndValidity();
  }
}
