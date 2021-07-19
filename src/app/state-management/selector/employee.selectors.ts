import { createFeatureSelector, createSelector } from '@ngrx/store';
import { employeeFeatureKey, EmployeeState } from '../reducer/employee.reducer';

export const selectEmployeeState = createFeatureSelector<EmployeeState>(
    employeeFeatureKey,
);

export const selectEmployees = createSelector(
    selectEmployeeState,
    (state: EmployeeState) => state.employees
);