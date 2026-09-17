export interface EmployeeBasic {
  id?: string | number;
  name?: string;
  employeeNo?: string;
  email?: string;
  departmentId?: string | number;
}
export interface CrtUser {
  id?: string | number;
  name?: string;
  email?: string;
  code?: string;
  roles?: Array<{ name: string }>;
  departments?: Array<{ id: string | number }>;
}
