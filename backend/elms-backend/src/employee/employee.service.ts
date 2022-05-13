import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EmployeeDetailsDto } from 'src/models/employee-details-dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private prismaService: PrismaService) {}
  getEmployeeDepartment(id: number) {
    return this.prismaService.dept_emp.findFirst({
      where: {
        emp_no: id,
      },
      include: {
        departments: true,
      },
    });
  }
  getEmployeeByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: {
        emp_email: email,
      },
      include: {
        employee: true,
      },
    });
  }
  getEmployeeDetails(emp_no: number) {
    return this.prismaService.employees.findFirst({
      where: {
        emp_no: emp_no,
      },
      include: {
        dept_emp: {
          include: {
            departments: {
              include: {
                dept_manager: {
                  include: {
                    employees: true,
                  },
                },
              },
            },
          },
          orderBy: {
            from_date: 'desc', // messages for each converastion will be ordered newest first.
          },
        },
        salaries: {
          orderBy: {
            from_date: 'desc',
          },
        },
        titles: true,
      },
    });
  }
  async getAllEmployees(params: { skip?: number; take?: number }) {
    const { skip, take } = params;
    console.log('skip : ' + skip);
    console.log('take : ' + take);
    const dept = await this.prismaService.employees.findMany({
      skip,
      take,
      include: {
        titles: true,
        user: true,
        dept_emp: {
          include: {
            departments: true,
          },
        },
      },
    });

    return dept;
  }
  getAllEmployeesCount(param: { where: Prisma.employeesWhereInput }) {
    return this.prismaService.employees.count({
      where: param.where,
    });
  }
}
