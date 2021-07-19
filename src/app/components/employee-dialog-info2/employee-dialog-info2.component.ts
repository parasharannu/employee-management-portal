import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IEmployee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-dialog-info2',
  templateUrl: './employee-dialog-info2.component.html',
  styleUrls: ['./employee-dialog-info2.component.scss']
})
export class EmployeeDialogInfo2Component implements OnInit {

  @Input() employee = {} as IEmployee;
  @Input() dialogForm = {} as FormGroup;
  
  constructor() { }

  ngOnInit(): void {
  }

}
