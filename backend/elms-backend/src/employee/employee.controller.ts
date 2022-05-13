import { Controller, Get, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { EmployeeResponse } from 'src/models/EmployeeResponse';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}
  @Get('profile')
  async getEmployee(): Promise<EmployeeResponse> {
    const id = 10001;
    try {
      const employee = await this.employeeService.getEmployeeDetails(id);
      if (employee) {
        const manager = employee.dept_emp[0].departments.dept_manager[0].employees;
        //fetch dept_name
        //  let dept =await this.employeeService.getEmployeeDepartment(id);
        const resp: EmployeeResponse = new EmployeeResponse();
        resp.birth_date = employee.birth_date;
        resp.title = employee.titles[0].title;
        resp.first_name = employee.first_name;
        resp.last_name = employee.last_name;
        resp.salary = employee.salaries[0].salary;
        resp.dept_name = employee.dept_emp[0].departments.dept_name;
        resp.dept_manager = manager.first_name + ' ' + manager.last_name; //fetch manager
        resp.hire_date = employee.hire_date;
        return resp;
      }
    } catch (err) {
      console.log(err);
      throw new HttpException(
        { msg: 'Error Fetching details' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    throw new HttpException({ msg: 'No Such Employee' }, HttpStatus.NOT_FOUND);
  }
}
