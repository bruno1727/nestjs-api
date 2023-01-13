import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Weigth } from 'src/decorators/rateWeigth.decorator';
import extractToken from 'src/helpers/extractToken';
import { RateLimitService } from 'src/service/rateLimit.service';

@Injectable()
export class TokenRateLimiterGuard implements CanActivate {
  constructor(
    private rateLimitService: RateLimitService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const rateWeigth =
      this.reflector.get<number>('rateWeigth', context.getHandler()) ||
      Weigth.LIGTH;

    return this.rateLimitService
      .incrementAndVerifyLimit(
        this.configService.get<number>('RATE_LIMIT_TOKEN') || 200,
        extractToken(req),
        rateWeigth,
      )
      .then(() => true);
  }
}
