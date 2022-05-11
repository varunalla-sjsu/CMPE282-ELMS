import { Injectable } from '@nestjs/common';
import { ApiStatus } from './models/ApiStatus';
import { PrismaService } from './services/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getAPIVersion(): ApiStatus {
    return {
      version: '0.1.2',
      name: 'ELMS API',
      status: 'UP',
    };
  }
}
