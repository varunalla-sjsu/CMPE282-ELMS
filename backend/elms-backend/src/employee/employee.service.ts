import { Injectable } from '@nestjs/common';
import { EmployeeDetailsDto } from 'src/models/employee-details-dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private prismaService: PrismaService) {}
  getEmployeeDepartment(id: number) {
    return this.prismaService.departments.findFirst({
      where: {},
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
}
