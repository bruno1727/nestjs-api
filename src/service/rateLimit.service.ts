import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RateLimitException } from 'src/exceptions/rateLimit.exception';
import { RedisService } from './redis.service';

@Injectable()
export class RateLimitService {
  constructor(
    public redisService: RedisService,
    public configService: ConfigService,
  ) {}

  async getCount(key: string): Promise<number> {
    return parseInt(await this.redisService.get(key)) || 0;
  }

  async incrementCount(key: string): Promise<number> {
    return await this.redisService.incr(
      key,
      this.configService.get<number>('RATE_LIMIT_SECONDS') || 3600,
    );
  }

  async getTimeLeft(key: string): Promise<number> {
    return (await this.redisService.ttl(key)) || 0;
  }

  async incrementAndVerifyLimit(limit: number, key: string) {
    const count = await this.incrementCount(key);
    if (count > limit) {
      throw new RateLimitException(await this.getTimeLeft(key));
    }
  }
}
