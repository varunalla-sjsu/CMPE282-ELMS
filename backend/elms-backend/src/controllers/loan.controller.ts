import { Controller, Get, Param, Post, Body, Query, Put, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { LoanService } from 'src/services/loan.service';
import { loans, loans as loansModel, loan_status } from '.prisma/client';
import { LoanRequest } from 'src/models/LoanRequest';
import { DepartmentsService } from 'src/services/departments.service';
import { Roles } from 'src/role.decorator';
import { employees_role } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { LoansPaginatedResponse } from 'src/models/LoansPaginatedResponse';
import { EmployeeService } from 'src/employee/employee.service';

@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService, private readonly deptService: DepartmentsService, private readonly employeeService: EmployeeService) {}
  @Roles(employees_role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('/:id')
  async getLoansById(@Param('id') id: string): Promise<loansModel> {
    return this.loanService.loansByLoanId({ loanid: Number(id) });
  }
  @Roles(employees_role.EMPLOYEE)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('/by/empId/:page?/:pageSize?')
  async getLoansByEmpId(@Req() req, @Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<LoansPaginatedResponse> {
    const emp_no = req.user.emp_no;

    if (pageSize === undefined) {
      pageSize = '20';
    }

    if (page === undefined) {
      page = '1';
    }

    const skip = (Number(page) - 1) * Number(pageSize);
    const loans = await this.loanService.loansByEmpId({
      where: {
        emp_no: emp_no,
      },
      skip: skip,
      take: Number(pageSize),
    });

    const totalCount = await this.loanService.loansCountByCondition({
      where: {
        emp_no: emp_no,
      },
    });

    const response: LoansPaginatedResponse = {
      data: loans,
      total: Number(totalCount),
    };

    return response;
  }
  @Roles(employees_role.MANAGER, employees_role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('/mydept/loans/:page?/:pageSize?')
  async getLoansByOfMyDept(@Req() req, @Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<Object> {
    const dept = await this.employeeService.getEmployeeDepartment(req.user.emp_no);
    const id = dept.dept_no;
    if (pageSize === undefined) {
      pageSize = '20';
    }

    if (page === undefined) {
      page = '1';
    }

    const skip = (Number(page) - 1) * Number(pageSize);
    const loandata = await this.loanService.loansByDeptId({
      where: {
        dept_no: id,
      },
      skip: skip,
      take: Number(pageSize),
    });

    const totalCount = await this.loanService.loansCountByCondition({
      where: {
        dept_no: id,
      },
    });

    const response = {
      data: loandata,
      total: totalCount,
    };

    return response;
  }
  @Roles(employees_role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('/dept/:id/:page?/:pageSize?')
  async getLoansByDeptId(@Param('id') id: string, @Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<Object> {
    if (pageSize === undefined) {
      pageSize = '20';
    }

    if (page === undefined) {
      page = '1';
    }

    const skip = (Number(page) - 1) * Number(pageSize);
    const loandata = await this.loanService.loansByDeptId({
      where: {
        dept_no: id,
      },
      skip: skip,
      take: Number(pageSize),
    });

    const totalCount = await this.loanService.loansCountByCondition({
      where: {
        dept_no: id,
      },
    });

    const response = {
      data: loandata,
      total: totalCount,
    };

    return response;
  }
  @Roles(employees_role.ADMIN, employees_role.EMPLOYEE)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('/active/emp/:page?/:pageSize?')
  async getActiveLoansForEmployee(@Req() req, @Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<LoansPaginatedResponse> {
    const emp_no = req.user.emp_no;

    if (pageSize === undefined) {
      pageSize = '20';
    }

    if (page === undefined) {
      page = '1';
    }

    const skip = (Number(page) - 1) * Number(pageSize);
    const loandata = await this.loanService.loansByEmpId({
      where: {
        emp_no: emp_no,
        status: 'APPROVED',
      },
      skip: skip,
      take: Number(pageSize),
    });

    const totalCount = await this.loanService.loansCountByCondition({
      where: {
        emp_no: emp_no,
        status: 'APPROVED',
      },
    });

    const response = {
      data: loandata,
      total: Number(totalCount),
    };
    return response;
  }
  @Roles(employees_role.EMPLOYEE)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('/all/active/:page?/:pageSize?')
  async getAllActiveLoans(@Req() req,@Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<Object> {
    if (pageSize === undefined) {
      pageSize = '20';
    }

    if (page === undefined) {
      page = '1';
    }

    const skip = (Number(page) - 1) * Number(pageSize);
    const loandata = await this.loanService.allActiveLoans({
      where: {
        status: 'APPROVED',
        emp_no: req.user.emp_no,
      },
      skip: skip,
      take: Number(pageSize),
    });

    const totalCount = await this.loanService.loansCountByCondition({
      where: {
        status: 'APPROVED',
      },
    });

    var response = {
      data: loandata,
      total: totalCount,
    };
    return response;
  }
  @Roles(employees_role.EMPLOYEE)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post()
  async createLoan(@Req() req, @Body() loanData: LoanRequest): Promise<loans> {
    const emp_no = req.user.emp_no;
    const { loan_amount, total_installments } = loanData;
    const from_date = new Date();
    const to_date = this.addMonths(total_installments, new Date());

    const dept = await this.deptService.deptByEmpId({
      where: {
        emp_no: emp_no,
      },
    });

    console.log(dept.dept_no);
    // to do verify if he can take this loan
    return await this.loanService.createLoan({
      loan_amount,
      from_date,
      to_date,
      total_installments,
      employees: {
        connect: { emp_no: emp_no },
      },
      department: {
        connect: { dept_no: dept.dept_no },
      },
    });
  }
  @Roles(employees_role.MANAGER)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Put('/approve/:id')
  async approveLoan(@Req() req, @Param('id') id: string): Promise<loans> {
    //fetch emp dept
    const dept = await this.employeeService.getEmployeeDepartment(req.user.emp_no);

    //fetch loan dept
    const loan = await this.loanService.loansByLoanId({ loanid: Number(id) });
    //check if both are same
    if (loan.dept_no == dept.dept_no) {
      //update status
      return this.loanService.updateLoan({
        where: { loanid: Number(id) },
        data: { status: loan_status.APPROVED },
      });
    } else {
      throw new UnauthorizedException();
    }
  }
  @Roles(employees_role.MANAGER)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Put('/reject/:id')
  async rejectLoan(@Req() req, @Param('id') id: string): Promise<loans> {
    //fetch emp dept
    const dept = await this.employeeService.getEmployeeDepartment(req.user.emp_no);
    //fetch loan dept
    const loan = await this.loanService.loansByLoanId({ loanid: Number(id) });
    //check if both are same
    if (loan.dept_no == dept.dept_no) {
      //update status
      return this.loanService.updateLoan({
        where: { loanid: Number(id) },
        data: { status: loan_status.REJECTED },
      });
    } else {
      throw new UnauthorizedException();
    }
  }
  @Roles(employees_role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Put('/preclose/:id')
  async precloseLoan(@Param('id') id: string): Promise<loans> {
    const loans = await this.loanService.loansByLoanId({ loanid: Number(id) });
    return this.loanService.updateLoan({
      where: { loanid: Number(id) },
      data: {
        paid_installments: loans.total_installments,
        status: loan_status.COMPLETED,
      },
    });
  }

  addMonths(numOfMonths: number, date = new Date()) {
    const dateCopy = new Date(date.getTime());

    dateCopy.setMonth(dateCopy.getMonth() + numOfMonths);

    return dateCopy;
  }
}
