import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { loans, Prisma } from '.prisma/client';
import { PrismaService } from './prisma.service';
import { SignKeyObjectInput } from 'crypto';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  async allActiveLoans(params:{
      where? : Prisma.loansWhereInput;
      skip?: number;
      take?: number;
  }): Promise<loans[] | null> {
    const { where ,skip,take} = params;
    return this.prisma.loans.findMany({
        where,
        skip,
        take,
        include:{
            department:true,
            employees:true,
        },
        orderBy:{
            from_date: 'desc'
        }
    });
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
        },
        orderBy:{
            from_date : 'desc'
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


        async createLoan(data: Prisma.loansCreateInput): Promise<loans> {
            return this.prisma.loans.create({
                data,
            });
        }
}