import { Injectable } from '@nestjs/common';
import { waitForDebugger } from 'inspector';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
