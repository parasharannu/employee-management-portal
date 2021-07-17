import { Action, createReducer, on } from '@ngrx/store';
import { IEmployee } from 'src/app/models/employee';


export const employeeFeatureKey = 'employee';

export interface State {
  employees: IEmployee[];
}

export const initialState: State = {
  employees: []
};


export const employeeReducer = createReducer(
  initialState
);

