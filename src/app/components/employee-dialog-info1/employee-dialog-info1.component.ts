import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEmployee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-dialog-info1',
  templateUrl: './employee-dialog-info1.component.html',
  styleUrls: ['./employee-dialog-info1.component.scss']
})
export class EmployeeDialogInfo1Component implements OnInit {
  @Input() employee = {} as IEmployee;
  @Input() dialogForm = {} as FormGroup;
  @Output() formSubmit: EventEmitter<string> = new EventEmitter();

  activeFromMinDate = new Date(1990, 0, 1);
  activeFromMaxDate = new Date();
  
  activeThroughMinDate = new Date();
  activeThroughMaxDate = new Date(2025, 0, 1);

  constructor() { }

  ngOnInit(): void {
  }
}
