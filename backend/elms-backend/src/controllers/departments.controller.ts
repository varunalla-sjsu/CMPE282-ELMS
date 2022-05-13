import { Controller, Get, Param, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { DepartmentsService } from 'src/services/departments.service';
import { departments, departments as departmentsModel, dept_emp } from '.prisma/client';
import { employees_role } from '@prisma/client';
import { Roles } from 'src/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { EmployeeService } from 'src/employee/employee.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly deptService: DepartmentsService, private readonly employeeService: EmployeeService) {}

  @Get('/:id')
  async getDeptById(@Param('id') id: string): Promise<departmentsModel> {
    return this.deptService.deptByDeptId({ dept_no: id });
  }

  @Get('/:id/emps/:page?/:pageSize?')
  async getEmployeesByDeptId(@Param('id') id: string, @Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<Object> {
    if (pageSize === undefined) {
      pageSize = '20';
    }

    if (page === undefined) {
      page = '1';
    }

    const skip = (Number(page) - 1) * Number(pageSize);
    const deptData = await this.deptService.employeesByDeptId({
      where: {
        dept_no: id,
      },
      skip: skip,
      take: Number(pageSize),
    });

    const totalCount = await this.deptService.deptEmpCountByCondition({
      where: {
        dept_no: id,
      },
    });

    var response = {
      data: deptData,
      total: totalCount,
    };
    return response;
  }
  @Roles(employees_role.MANAGER, employees_role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('/mydept/employees/:page?/:pageSize?')
  async getEmployeesForMyDept(@Req() req, @Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<Object> {
    const dept = await this.employeeService.getEmployeeDepartment(
      req.user.emp_no,
    );
    if (pageSize === undefined) {
      pageSize = '20';
    }

    if (page === undefined) {
      page = '1';
    }

    const skip = (Number(page) - 1) * Number(pageSize);
    const deptData = await this.deptService.employeesByDeptId({
      where: {
        dept_no: dept.dept_no,
      },
      skip: skip,
      take: Number(pageSize),
    });

    const totalCount = await this.deptService.deptEmpCountByCondition({
      where: {
        dept_no: dept.dept_no,
      },
    });

    var response = {
      data: deptData,
      total: totalCount,
    };
    return response;
  }
}
