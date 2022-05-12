import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { loans, Prisma } from '.prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}
  async allLoans(): Promise<loans[] | null> {
    return this.prisma.loans.findMany({});
  }

  async loansByLoanId(
    loansWhereUniqueInput: Prisma.loansWhereUniqueInput,
  ): Promise<loans | null> {
    return this.prisma.loans.findUnique({
      where: loansWhereUniqueInput,
      include: { 
        employees:true,
        department:true

      }
    });
  }


  async loansByEmpId(params: {
    where?: Prisma.loansWhereInput;
    skip?: number;
    take?: number;
    }): Promise<loans[]> {
      const { where ,skip,take} = params;
      console.log('skip : ' + skip);
      console.log('take : ' + take);
      return this.prisma.loans.findMany({
        skip,
        take,
        where,
        include: {
          employees:true,
          department: true
        }
    
      });
    }



    async loansByDeptId(params: {
        where?: Prisma.loansWhereInput;
        skip?: number;
        take?: number;
        }): Promise<loans[]> {
          const { where , skip,take} = params;

          console.log('skip : ' + skip);
            console.log('take : ' + take);
          return this.prisma.loans.findMany({
              skip,
              take,
            where,
            include: {
              employees:true,
              department: true
            },
            orderBy:{
                from_date : 'desc'
            }
    
          });
        }

}