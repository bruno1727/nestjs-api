import { Controller, Get, UseGuards } from '@nestjs/common';
import { RateWeigth, Weigth } from './decorators/rateWeigth.decorator';
import { IpAddressRateLimiterGuard } from './guards/ipAddressRateLimiter.guard';

@Controller('public/hello')
@UseGuards(IpAddressRateLimiterGuard)
export class PublicController {
  @Get()
  async getHello(): Promise<string> {
    return `hello, this is public data, feel free to share!`;
  }

  @RateWeigth(Weigth.MEDIUM)
  @Get('2')
  async getHello2(): Promise<string> {
    return `hello, this is a lot of public data, feel free to share!`;
  }

  @RateWeigth(Weigth.HEAVY)
  @Get('3')
  async getHello3(): Promise<string> {
    return `hello, this is a looot of public data, feel free to share!`;
  }
}
