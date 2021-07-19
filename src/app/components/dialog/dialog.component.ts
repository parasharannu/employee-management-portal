import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IEmployee } from 'src/app/models/employee';
import { IShift } from 'src/app/models/shift';
import { addEmployee } from 'src/app/state-management/action/employee.actions';
import { EmployeeState } from 'src/app/state-management/reducer/employee.reducer';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  formGroup = this.fb.group({});

  employee = {} as IEmployee;

  modalShow = 1;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private store: Store<EmployeeState>) { }

  ngOnInit(): void {
    this.employee = this.data;
    this.initializeInfoForm();
  }

  initializeInfoForm() {
    switch (this.modalShow) {
      case 1: {
        this.formGroup = this.fb.group({
          empName: [this.employee.empName, [Validators.required]],
          displayName: [this.employee.displayName, [Validators.required]],
          port: [this.employee.port, [Validators.required]],
          workSite: [this.employee.workSite, [Validators.required]],
          description: [this.employee.description, [Validators.required]]
        });
        break;
      }
      case 2: {
        this.formGroup = this.fb.group({
          idCode: [this.employee.idCode, [Validators.required]],
          workLocation: [this.employee.workLocation, [Validators.required]]
        });
        break;
      }
      case 3: {
        this.employee.skills = this.employee.skills || [];
        this.formGroup = this.fb.group({
          skill: ['', this.employee.skills.length === 0 ? [Validators.required] : []],
          additionalSkill: [this.employee.additionalSkill, [Validators.required]]
        });
        break;
      }
      case 4: {
        this.formGroup = this.fb.group({
          'supervisor': this.createSupervisorGroup(),
          'shiftArray': this.fb.array([
            this.createShiftGroup(1),
            this.createShiftGroup(2),
            this.createShiftGroup(3),
            this.createShiftGroup(4),
          ])
        });
        break;
      }
    }
  }

  createSupervisorGroup() {
    this.employee.empShift = this.employee.empShift || [];
    if (this.employee.empShift.length === 0) {
      this.employee.empShift.push({
        name: 'Supervisor'
      } as IShift);
    }
    const supervisorShift = this.employee.empShift[0];
    return this.fb.group({
      'name': [supervisorShift.name],
      'noOfPositions': [supervisorShift.noOfPositions, [Validators.required]],
      'firstShiftTime': [supervisorShift.shiftTime?.first, [Validators.required]],
      'secondShiftTime': [supervisorShift.shiftTime?.second, [Validators.required]],
      'firstMealTime': [supervisorShift?.mealTime?.first, [Validators.required]],
      'secondMealTime': [supervisorShift?.mealTime?.first, [Validators.required]],
      'rdos': this.createRDOSGroup(supervisorShift),
      'staggerRDO': supervisorShift.staggerRDO
    });
  }

  createRDOSGroup(shift: IShift): FormGroup {
    shift.rdos = shift.rdos || [
      { name: 'sun', value: false },
      { name: 'mon', value: false },
      { name: 'tue', value: false },
      { name: 'wed', value: false },
      { name: 'thu', value: false },
      { name: 'fri', value: false },
      { name: 'sat', value: false },
    ];

    return this.fb.group({
      'sun': [shift.rdos[0].value],
      'mon': [shift.rdos[1].value],
      'tue': [shift.rdos[2].value],
      'wed': [shift.rdos[3].value],
      'thu': [shift.rdos[4].value],
      'fri': [shift.rdos[5].value],
      'sat': [shift.rdos[6].value],
    });
  }

  createShiftGroup(groupNo: number) {
    if (this.employee.empShift.length < (groupNo + 1)) {
      this.employee.empShift.push({
        name: 'Shift ' + (groupNo).toString()
      } as IShift);
    }
    const supervisorShift = this.employee.empShift[groupNo];
    supervisorShift.staggerRDO = 'N/A';
    // return this.fb.group({
    //   'name': [supervisorShift.name],
    //   'noOfPositions': [supervisorShift.noOfPositions, [Validators.required]],
    //   'firstShiftTime': [supervisorShift.shiftTime?.first, [Validators.required]],
    //   'secondShiftTime': [supervisorShift.shiftTime?.second, [Validators.required]],
    //   'firstMealTime': [supervisorShift?.mealTime?.first, [Validators.required]],
    //   'secondMealTime': [supervisorShift?.mealTime?.first, [Validators.required]],
    //   'rdos': this.createRDOSGroup(supervisorShift),
    //   'staggerRDO': supervisorShift.staggerRDO
    // });
    return this.fb.group({
      'name': [supervisorShift.name],
      'noOfPositions': [supervisorShift.noOfPositions],
      'firstShiftTime': [supervisorShift.shiftTime?.first],
      'secondShiftTime': [supervisorShift.shiftTime?.second],
      'firstMealTime': [supervisorShift?.mealTime?.first],
      'secondMealTime': [supervisorShift?.mealTime?.first],
      'rdos': this.createRDOSGroup(supervisorShift),
      'staggerRDO': supervisorShift.staggerRDO
    });
  }

  prevDialog() {
    this.modalShow -= 1;
    this.initializeInfoForm();
  }

  saveInfo1(formValues: any) {
    this.employee = { ...this.employee, ...formValues };
    console.log(this.employee);
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  submit() {
    if (this.formGroup.valid) {
      this.employee = { ...this.employee, ...this.formGroup.value };
      if (this.modalShow === 4) {
        this.store.dispatch(addEmployee(this.employee));
        this.closeDialog();
      } else {
        this.modalShow += 1;
        this.initializeInfoForm();
      }
    }
  }
}
