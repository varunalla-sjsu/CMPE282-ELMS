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

import { join } from 'path';
@Module({
  imports: [ ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
    exclude: ['/api*'],
  }),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  ConfigModule.forRoot(),
],
  controllers: [AppController, AuthController],
  providers: [PrismaService, AppService, AuthService, AuthConfig, JwtStrategy],
})
export class AppModule {}
