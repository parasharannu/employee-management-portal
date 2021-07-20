import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { IEmployee } from 'src/app/models/employee';
import { EmployeeState } from 'src/app/state-management/reducer/employee.reducer';
import { selectEmployees } from 'src/app/state-management/selector/employee.selectors';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  employee = {} as IEmployee;
  employees: Observable<IEmployee[]> = of([]);

  constructor(private dialog: MatDialog,
    private store: Store<EmployeeState>,
    private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.employees = this.store.pipe(select(selectEmployees));
    console.log(this.employees);
  }

  addEmployee() {
    this.employee = {} as IEmployee;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.employee;

    this.dialog.open(DialogComponent, dialogConfig);
  }

  getTimeFormat(value: any) {
    return this.datePipe.transform(value, 'MM/dd/yyyy');
  }

}
