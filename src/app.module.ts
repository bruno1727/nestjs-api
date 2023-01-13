import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './guards/auth.guard';
import { IpAddressRateLimiterMiddleware } from './middlewares/rateLimiter/ipAddress.middleware';
import { TokenRateLimiterMiddleware } from './middlewares/rateLimiter/token.middleware';
import { PrivateController } from './private.controller';
import {
  PublicController as PublicAppController,
  PublicController,
} from './public.controller';
import { AuthService } from './service/auth.service';
import { RateLimitService } from './service/rateLimit.service';
import { RedisService } from './service/redis.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PrivateController, PublicAppController],
  providers: [
    IpAddressRateLimiterMiddleware,
    TokenRateLimiterMiddleware,
    RedisService,
    AuthService,
    AuthGuard,
    RateLimitService,
  ],
  exports: [AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IpAddressRateLimiterMiddleware)
      .forRoutes(PublicController)
      .apply(TokenRateLimiterMiddleware)
      .forRoutes(PrivateController);
  }
}
