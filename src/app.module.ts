import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './guards/auth.guard';
import { IpAddressRateLimiterGuard } from './guards/ipAddressRateLimiter.guard';
import { TokenRateLimiterGuard } from './guards/tokenRateLimiter.guard';
import { PrivateController } from './private.controller';
import { PublicController as PublicAppController } from './public.controller';
import { AuthService } from './service/auth.service';
import { RateLimitService } from './service/rateLimit.service';
import { RedisService } from './service/redis.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PrivateController, PublicAppController],
  providers: [
    RedisService,
    AuthService,
    AuthGuard,
    RateLimitService,
    IpAddressRateLimiterGuard,
    TokenRateLimiterGuard,
  ],
  exports: [AuthService],
})
export class AppModule {}
