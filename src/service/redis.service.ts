import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private conn: Redis;

  constructor(public configService: ConfigService) {
    this.start();
  }

  private async start(): Promise<void> {
    this.conn = new Redis(
      this.configService.get<number>('REDIS_PORT') || 6379,
      this.configService.get<string>('REDIS_HOST') || '127.0.0.1',
    );
  }

  async get(key: string): Promise<string> {
    return this.conn.get(key);
  }

  async set(key: string, value: any) {
    return this.conn.set(key, value);
  }

  async expire(key: string, seconds: number) {
    return this.conn.expire(key, seconds);
  }

  async incr(key: string, expireWhenNew?: number): Promise<any> {
    if (!expireWhenNew) return this.conn.incr(key);
    return (
      await this.conn.multi().incr(key).expire(key, expireWhenNew, 'NX').exec()
    )[0][1];
  }

  async ttl(key: string): Promise<number> {
    return this.conn.ttl(key);
  }
}
