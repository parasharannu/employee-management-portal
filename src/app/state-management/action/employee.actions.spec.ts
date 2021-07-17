import * as fromEmployee from './employee.actions';

describe('empEmployees', () => {
  it('should return an action', () => {
    expect(fromEmployee.empEmployees().type).toBe('[Employee] Emp Employees');
  });
});
