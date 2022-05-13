import { Controller, Get, Param,Post,Body, Query } from '@nestjs/common';
import { LoanService } from 'src/services/loan.service';
import { loans, loans as loansModel } from '.prisma/client';
import { LoanRequest } from 'src/models/LoanRequest';
import { DepartmentsService } from 'src/services/departments.service';

@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService, private readonly deptService : DepartmentsService) {}


  @Get('/:id')
  async getLoansById(@Param('id') id: string): Promise<loansModel> {
    return this.loanService.loansByLoanId({ loanid: Number(id) });
  }  

  @Get('/by/empId/:page?/:pageSize?')
  async getLoansByEmpId(@Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<Object> {
    
    const emp_no = 10002;

    if( pageSize === undefined){
        pageSize= "20";
    }
  
    if( page === undefined){
        page ="1";
    }
  
    const skip = (Number(page)-1) * Number(pageSize);
    const loans = await this.loanService.loansByEmpId({
        where: {
         
              emp_no: emp_no,
            
        },
        skip: skip,
        take: Number(pageSize)
      });

      const totalCount = await this.loanService.loansCountByEmpId({
        where: {
         
              emp_no: emp_no,
            
        }
      });

      var response = {
        "data" : loans,
        "total" : totalCount
    };

    return response;
  }
  
  @Get('/dept/:id/:page?/:pageSize?')
  async getLoansByDeptId(@Param('id') id: string,@Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<loansModel[]> {

  if( pageSize === undefined){
      pageSize= "20";
  }

  if( page === undefined){
      page ="1";
  }

  const skip = (Number(page)-1) * Number(pageSize);
    return this.loanService.loansByDeptId({
        where: {
              dept_no: id,
            
        },
        skip: skip,
        take: Number(pageSize)
      });
  }

  @Get('/active/emp/:id/:page?/:pageSize?')
  async getActiveLoansForEmployee(@Param('id') id: string,@Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<loansModel[]> {

  if( pageSize === undefined){
      pageSize= "20";
  }

  if( page === undefined){
      page ="1";
  }

  const skip = (Number(page)-1) * Number(pageSize);
    return this.loanService.loansByEmpId({
        where: {
              emp_no: Number(id),
              status : "APPROVED"
            
        },
        skip: skip,
        take: Number(pageSize)
      });
  }

  @Get('/all/active/:page?/:pageSize?')
  async getAllActiveLoans(@Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<loansModel[]> {


    if( pageSize === undefined){
        pageSize= "20";
    }
  
    if( page === undefined){
        page ="1";
    }
  
    const skip = (Number(page)-1) * Number(pageSize);
      return this.loanService.allActiveLoans({
          where: {
                status : "APPROVED"
              
          },
          skip: skip,
          take: Number(pageSize)
        });
    }


    @Post()
    async createLoan(
        @Body() loanData: LoanRequest,
    ): Promise<loans> {
        const { loan_amount, from_date, to_date, total_installments} = loanData;

        const emp_no = 10003;
        const dept = await this.deptService.deptByEmpId({
            where:{
                emp_no : emp_no
            }
        })

        console.log(dept.dept_no);

        return await this.loanService.createLoan({
            loan_amount,
            from_date,
            to_date,
            total_installments,
            employees:{
                connect :{emp_no : emp_no}
            },
            department :{
                connect : {dept_no : dept.dept_no}
            }
        });

    }
  } 
