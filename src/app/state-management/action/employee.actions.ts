import { createAction, props } from '@ngrx/store';
import { IEmployee } from 'src/app/models/employee';

export const addEmployee = createAction(
  '[Employee] Add Employee',
  (employee: IEmployee) => ({ employee })
);




