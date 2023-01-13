import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { RateLimitService } from 'src/service/rateLimit.service';
import extractToken from '../helpers/extractToken';

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  constructor(
    public rateLimitService: RateLimitService,
    public configService: ConfigService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const tokenLimit = this.configService.get<number>('RATE_LIMIT_TOKEN');
    const token = extractToken(req);
    if (token.length > 0) {
      if ((await this.rateLimitService.getCount(token)) <= tokenLimit) {
        await this.rateLimitService.incrementCount(token);
      } else {
        throw new HttpException(
          `exceed limit requests for that token, wait ${await this.rateLimitService.getTimeLeft(
            req.ip,
          )}s for the next request!`,
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
    }

    const ipAddressLimit = this.configService.get<number>('RATE_LIMIT_IP');
    const countIp = await this.rateLimitService.getCount(req.ip);
    if (countIp <= ipAddressLimit) {
      await this.rateLimitService.incrementCount(req.ip);
    } else {
      throw new HttpException(
        `exceed limit requests for that ip address, wait ${await this.rateLimitService.getTimeLeft(
          req.ip,
        )}s for the next request!`,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    next();
  }
}
