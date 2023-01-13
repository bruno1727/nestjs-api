import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  //this method could be in a RateLimitService, so that RedisService does not have business knowledge
  //for know I ll keep it here for simplicity reasons
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

  async getCountToken(token: string): Promise<number> {
    return Number((await this.get(token)) || 0);
  }

  async addCountToken(token: string) {
    await this.incr(token);
  }

  async addCountIpAddress(ipAddress: string) {
    await this.incr(ipAddress);
  }

  async getCountIpAddress(ipAddress: string): Promise<number> {
    return Number((await this.get(ipAddress)) || 0);
  }
}
