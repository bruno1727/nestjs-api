import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RateLimiterMiddleware } from './middlewares/rateLimiter.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
