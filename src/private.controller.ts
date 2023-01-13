import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';

@Controller('hello')
@UseGuards(AuthGuard)
export class PrivateController {
  @Get()
  async getHello(): Promise<string> {
    return 'this is some sensitive data, be careful!';
  }
}
