import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './services/auth.service';
import { AuthConfig } from './config/auth.config';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { EmployeeService } from './employee/employee.service';
import { EmployeeController } from './employee/employee.controller';
import { LoanController } from './controllers/loan.controller';
import { LoanService } from './services/loan.service';
import { DepartmentsController } from './controllers/departments.controller';
import { DepartmentsService } from './services/departments.service';
import { LocalStrategy } from './strategies/local.strategy';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
    PassportModule.register({
      defaultStrategy: ['local', 'jwt'],
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, AuthController, EmployeeController, LoanController, DepartmentsController],
  providers: [
    PrismaService,
    AppService,
    AuthService,
    AuthConfig,
    LocalStrategy,
    JwtStrategy,
    EmployeeService,
    LoanService,
    DepartmentsService,
  ],
})
export class AppModule {}
