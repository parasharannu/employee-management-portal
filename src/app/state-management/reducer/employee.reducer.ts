import { Action, createReducer, on } from '@ngrx/store';
import { IEmployee } from 'src/app/models/employee';
import { addEmployee } from '../action/employee.actions';


export const employeeFeatureKey = 'employee';

export interface EmployeeState {
  employees: IEmployee[];
}

export const initialState: EmployeeState = {
  employees: []
};

export const employeeReducer = createReducer(
  initialState,
  on(addEmployee,
    (state: EmployeeState, { employee }) =>
    ({
      ...state,
      employees: [...state.employees, employee]
    }))
);

export function reducer(state: EmployeeState | undefined, action: Action): any {
  return employeeReducer(state, action);
}

