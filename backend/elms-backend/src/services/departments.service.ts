import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { departments, dept_emp, loans, Prisma } from '.prisma/client';
import { PrismaService } from './prisma.service';


@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}


  async deptByDeptId(
    departmentsWhereUniqueInput: Prisma.departmentsWhereUniqueInput,
  ): Promise<departments | null> {
    return this.prisma.departments.findUnique({
      where: departmentsWhereUniqueInput,
      include: { 
        dept_emp:true,
      }
    });
  }

  async employeesByDeptId(params: {
    where?: Prisma.departmentsWhereInput;
    skip?: number;
    take?: number;
    }): Promise<dept_emp[]> {
      const { where ,skip,take} = params;
      console.log('skip : ' + skip);
      console.log('take : ' + take);
      const dept = await this.prisma.departments.findMany({
        skip,
        take,
        where,
        select: {
          dept_emp : {
              select:{
                  dept_no : true,
                  to_date : true,
                  from_date : true,
                  emp_no : true,
                  departments : true,
                  employees : true

                  
              }
          }
           
        }   
      });

      console.log(dept);
     return dept[0].dept_emp;

    }


}