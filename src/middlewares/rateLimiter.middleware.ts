import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import extractToken from '../helpers/extractToken';
import { RedisService } from '../service/redis.service';

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  private tokenLimit = 500;
  private ipAddressLimit = 50;
  constructor(public redisService: RedisService) {}
  use(req: Request, res: Response, next: NextFunction) {
    if (extractToken(req).length > 0) {
      if (
        this.redisService.getCountToken(extractToken(req)) <= this.tokenLimit
      ) {
        this.redisService.addCountToken(extractToken(req));
      } else {
        throw new HttpException(
          'exceed count token',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
    }

    if (this.redisService.getCountIpAddress(req.ip) <= this.ipAddressLimit) {
      this.redisService.addCountIpAddress(req.ip);
    } else {
      throw new HttpException(
        'exceed count ip address',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    next();
  }
}
