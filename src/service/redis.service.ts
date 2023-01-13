import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private conn: Redis;

  constructor() {
    this.start();
  }

  private async start(): Promise<void> {
    this.conn = new Redis();
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

  async incr(key: string) {
    return this.conn.incr(key);
  }
}
