import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  //this method could be in a RateLimitService, so that RedisService does not have business knowledge
  //for know I ll keep it here for simplicity reasons

  private tokenCount = {};
  private ipAddressCount = {};

  public getCountToken(token: string): number {
    return this.tokenCount[token] || 0;
  }

  public addCountToken(token: string): void {
    this.tokenCount[token] = (this.tokenCount[token] || 0) + 1;
  }

  public addCountIpAddress(ipAddress: string): void {
    this.ipAddressCount[ipAddress] = (this.ipAddressCount[ipAddress] || 0) + 1;
  }

  public getCountIpAddress(ipAddress: string): number {
    return this.ipAddressCount[ipAddress] || 0;
  }
}
