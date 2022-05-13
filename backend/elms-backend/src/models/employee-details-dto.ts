import { departments, dept_emp, employees, salaries, titles } from '@prisma/client';

export interface EmployeeDTO extends employees {
  dept: DepartmentEmpDto;
}
export interface DepartmentDto extends departments {
  manager: EmployeeDTO;
}
export interface DepartmentEmpDto extends dept_emp {
  department: DepartmentDto;
}
export interface EmployeeDetailsDto extends employees {
  dep_emp: DepartmentEmpDto;
  salaries: salaries;
  title: titles;
}
