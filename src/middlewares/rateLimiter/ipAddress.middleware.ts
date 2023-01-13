import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { RateLimitService } from 'src/service/rateLimit.service';

@Injectable()
//could implement or composite within a RateLimiterMiddleware to maintain centralized behavior, considering that can appear more types besides token or ip address
export class IpAddressRateLimiterMiddleware implements NestMiddleware {
  constructor(
    public rateLimitService: RateLimitService,
    public configService: ConfigService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    await this.rateLimitService.incrementAndVerifyLimit(
      this.configService.get<number>('RATE_LIMIT_IP'),
      await (await this.rateLimitService.getCount(req.ip)).toString(),
    );

    next();
  }
}
