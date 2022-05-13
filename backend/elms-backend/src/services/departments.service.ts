import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { departments, dept_emp, loans, Prisma } from '.prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class DepartmentsService {
  allDeptCount(param: { where: Prisma.departmentsWhereInput }) {
    return this.prisma.departments.count({
      where: param.where,
    });
  }
  constructor(private prisma: PrismaService) {}

  async deptByDeptId(departmentsWhereUniqueInput: Prisma.departmentsWhereUniqueInput): Promise<departments | null> {
    return this.prisma.departments.findUnique({
      where: departmentsWhereUniqueInput,
      include: {
        dept_emp: true,
      },
    });
  }
  async allDept(skip?: number, take?: number): Promise<departments[] | null> {
    return this.prisma.departments.findMany({
      take,
      skip,
      include: {
        dept_manager: {
          include: {
            employees: true,
          },
        },
      },
    });
  }
  /*async employeesByDeptId(params: {
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

    } */

  async employeesByDeptId(params: { where?: Prisma.dept_empWhereInput; skip?: number; take?: number }): Promise<dept_emp[]> {
    const { where, skip, take } = params;
    console.log('skip : ' + skip);
    console.log('take : ' + take);
    const dept = await this.prisma.dept_emp.findMany({
      skip,
      take,
      where,
      include: {
        departments: true,
        employees: true,
      },
    });

    return dept;
  }

  async deptByEmpId(params: { where?: Prisma.dept_empWhereInput }): Promise<dept_emp | null> {
    const { where } = params;
    const deptEmpt = await this.prisma.dept_emp.findMany({
      where,
    });

    return deptEmpt[0];
  }

  async deptEmpCountByCondition(params: { where?: Prisma.dept_empWhereInput }): Promise<Number> {
    const { where } = params;
    const deptEmpCount = await this.prisma.dept_emp.count({
      where,
    });

    return deptEmpCount;
  }
}
