import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IEmployee } from 'src/app/models/employee';
import { IShift, IShiftMeal, IShiftTime } from 'src/app/models/shift';
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
          description: [this.employee.description, [Validators.required]],
          activeFrom: [this.employee.activeFrom, [Validators.required]],
          activeThrough: [this.employee.activeThrough, []]
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
    shift.rdos = shift.rdos ||
    {
      'sun': false,
      'mon': false,
      'tue': false,
      'wed': false,
      'thu': false,
      'fri': false,
      'sat': false
    };

    return this.fb.group({
      'sun': [shift.rdos.sun],
      'mon': [shift.rdos.mon],
      'tue': [shift.rdos.tue],
      'wed': [shift.rdos.wed],
      'thu': [shift.rdos.thu],
      'fri': [shift.rdos.fri],
      'sat': [shift.rdos.sat],
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
      if (this.modalShow === 4) {
        this.saveShift();
        this.employee.unitSize = (Math.floor(Math.random() * 10) + 4).toString() + '/' + (Math.floor(Math.random() * 20) + 4).toString();
        this.employee.flexCapable = this.employee.workLocation === "Location1" ? 'Yes' : 'No';
        this.store.dispatch(addEmployee(this.employee));
        this.closeDialog();
      } else {
        this.employee = { ...this.employee, ...this.formGroup.value };
        this.modalShow += 1;
        this.initializeInfoForm();
      }
    }
  }

  saveShift() {
    const formValues = this.formGroup.value;
    if (formValues.supervisor) {
      const mealTimes = {} as IShiftMeal;
      mealTimes.first = formValues.supervisor.firstMealTime;
      mealTimes.second = formValues.supervisor.secondMealTime;
      this.employee.empShift[0].mealTime = mealTimes;

      const shiftTimes = {} as IShiftTime;
      shiftTimes.first = formValues.supervisor.firstShiftTime;
      shiftTimes.second = formValues.supervisor.secondShiftTime;
      this.employee.empShift[0].shiftTime = shiftTimes;

      this.employee.empShift[0].rdos = formValues.supervisor.rdos;

      this.employee.empShift[0].name = formValues.supervisor.name;
      this.employee.empShift[0].noOfPositions = formValues.supervisor.noOfPositions;
      this.employee.empShift[0].staggerRDO = formValues.supervisor.staggerRDO;
    }

    ((this.formGroup.controls.shiftArray as FormArray).controls as FormGroup[]).forEach((group, i) => {
      const mealTimes = {} as IShiftMeal;
      mealTimes.first = group.controls.firstMealTime.value;
      mealTimes.second = group.controls.secondMealTime.value;
      this.employee.empShift[i + 1].mealTime = mealTimes;

      const shiftTimes = {} as IShiftTime;
      shiftTimes.first = group.controls.firstShiftTime.value;
      shiftTimes.first = group.controls.secondShiftTime.value;
      this.employee.empShift[i + 1].shiftTime = shiftTimes;

      this.employee.empShift[i + 1].rdos = formValues.supervisor.rdos;

      this.employee.empShift[i + 1].name = group.controls.name.value;
      this.employee.empShift[i + 1].noOfPositions = group.controls.noOfPositions.value;
      this.employee.empShift[i + 1].staggerRDO = group.controls.staggerRDO.value;
    });

    this.employee.empShift.push()
  }
}
