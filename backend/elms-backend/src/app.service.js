import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  apiVersion() {
    return 'Api Version 1.0';
  }
}
