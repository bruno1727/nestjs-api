import { Injectable } from '@nestjs/common';
import { RateLimitException } from 'src/exceptions/rateLimit.exception';
import { RedisService } from './redis.service';

@Injectable()
export class RateLimitService {
  constructor(public redisService: RedisService) {}

  async getCount(key: string): Promise<number> {
    return parseInt(await this.redisService.get(key)) || 0;
  }

  async incrementCount(key: string) {
    await this.redisService.incr(key, 10);
  }

  async getTimeLeft(key: string): Promise<number> {
    return (await this.redisService.ttl(key)) || 0;
  }

  async incrementAndVerifyLimit(limit: number, key: string) {
    if ((await this.getCount(key)) < limit) {
      await this.incrementCount(key);
    } else {
      throw new RateLimitException(await this.getTimeLeft(key));
    }
  }
}
