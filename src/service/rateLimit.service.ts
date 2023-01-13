import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';

@Injectable()
export class RateLimitService {
  constructor(public redisService: RedisService) {}

  async getCountToken(token: string): Promise<number> {
    return Number((await this.redisService.get(token)) || 0);
  }

  async addCountToken(token: string) {
    await this.redisService.incr(token);
  }

  async addCountIpAddress(ipAddress: string) {
    await this.redisService.incr(ipAddress);
  }

  async getCountIpAddress(ipAddress: string): Promise<number> {
    return Number((await this.redisService.get(ipAddress)) || 0);
  }
}
