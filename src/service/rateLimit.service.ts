import { Injectable } from '@nestjs/common';
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
}
