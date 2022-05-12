import { Controller, Get, Param,Post,Body, Query } from '@nestjs/common';
import { LoanService } from 'src/services/loan.service';
import { loans as loansModel } from '.prisma/client';

@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get()
  getAllLoans(): Promise<loansModel[]> {
    return this.loanService.allLoans();
  } 

  @Get('/:id')
  async getLoansById(@Param('id') id: string): Promise<loansModel> {
    return this.loanService.loansByLoanId({ loanid: Number(id) });
  }  

  @Get('/emp/:id/:page?/:pageSize?')
  async getLoansByEmpId(@Param('id') id: string,@Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<loansModel[]> {

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
            
        },
        skip: skip,
        take: Number(pageSize)
      });
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

}