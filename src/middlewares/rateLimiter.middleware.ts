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
  private tokenLimit = 5;
  private ipAddressLimit = 5;
  constructor(public redisService: RedisService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (extractToken(req).length > 0) {
      if (
        (await this.redisService.getCountToken(extractToken(req))) <=
        this.tokenLimit
      ) {
        await this.redisService.addCountToken(extractToken(req));
      } else {
        throw new HttpException(
          'exceed count token',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
    }

    const countIp = await this.redisService.getCountIpAddress(req.ip);
    if (countIp <= this.ipAddressLimit) {
      await this.redisService.addCountIpAddress(req.ip);
    } else {
      throw new HttpException(
        'exceed count ip address',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    next();
  }
}
