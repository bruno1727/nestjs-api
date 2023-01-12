import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppController as PublicAppController } from './public/app.controller';
import { AppService } from './app.service';
import { RateLimiterMiddleware } from './middlewares/rateLimiter.middleware';
import { AuthService } from './service/auth.service';
import { RedisService } from './service/redis.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [],
  // controllers: [AppController, PublicAppController],
  controllers: [AppController, PublicAppController],
  providers: [
    AppService,
    RateLimiterMiddleware,
    RedisService,
    AuthService,
    AuthGuard,
  ],
  exports: [AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimiterMiddleware).forRoutes('*');
  }
}
