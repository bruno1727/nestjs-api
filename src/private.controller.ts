import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { TokenRateLimiterGuard } from './guards/tokenRateLimiter.guard';

@Controller('hello')
@UseGuards(TokenRateLimiterGuard, AuthGuard)
export class PrivateController {
  @Get()
  async getHello(): Promise<string> {
    return 'this is some sensitive data, be careful!';
  }
}
