import { Controller, Get, Param, Post, Body, Query, Put } from '@nestjs/common';
import { LoanService } from 'src/services/loan.service';
import { loans, loans as loansModel, loan_status } from '.prisma/client';
import { LoanRequest } from 'src/models/LoanRequest';
import { DepartmentsService } from 'src/services/departments.service';

@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService, private readonly deptService: DepartmentsService) {}

  @Get('/:id')
  async getLoansById(@Param('id') id: string): Promise<loansModel> {
    return this.loanService.loansByLoanId({ loanid: Number(id) });
  }

  @Get('/by/empId/:page?/:pageSize?')
  async getLoansByEmpId(@Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<Object> {
    const emp_no = 10002;

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

    var response = {
      data: loans,
      total: totalCount,
    };

    return response;
  }

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

    var response = {
      data: loandata,
      total: totalCount,
    };

    return response;
  }

  @Get('/active/emp/:page?/:pageSize?')
  async getActiveLoansForEmployee(@Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<Object> {
    const emp_no = 10002;

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

    var response = {
      data: loandata,
      total: totalCount,
    };
    return response;
  }

  @Get('/all/active/:page?/:pageSize?')
  async getAllActiveLoans(@Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<Object> {
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

  @Post()
  async createLoan(@Body() loanData: LoanRequest): Promise<loans> {
    const { loan_amount, total_installments } = loanData;
    const from_date = new Date();
    const to_date = this.addMonths(total_installments, new Date());

    const emp_no = 10003;
    const dept = await this.deptService.deptByEmpId({
      where: {
        emp_no: emp_no,
      },
    });

    console.log(dept.dept_no);

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

  @Put('/approve/:id')
  async approveLoan(@Param('id') id: string): Promise<loans> {
    return this.loanService.updateLoan({
      where: { loanid: Number(id) },
      data: { status: loan_status.APPROVED },
    });
  }

  @Put('/reject/:id')
  async rejectLoan(@Param('id') id: string): Promise<loans> {
    return this.loanService.updateLoan({
      where: { loanid: Number(id) },
      data: { status: loan_status.REJECTED },
    });
  }

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
