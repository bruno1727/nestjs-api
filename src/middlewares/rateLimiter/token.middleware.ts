import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import extractToken from 'src/helpers/extractToken';
import { RateLimitService } from 'src/service/rateLimit.service';

@Injectable()
export class TokenRateLimiterMiddleware implements NestMiddleware {
  constructor(
    public rateLimitService: RateLimitService,
    public configService: ConfigService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    await this.rateLimitService.incrementAndVerifyLimit(
      this.configService.get<number>('RATE_LIMIT_TOKEN'),
      extractToken(req),
    );

    next();
  }
}
