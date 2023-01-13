import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Weigth } from 'src/decorators/rateWeigth.decorator';
import { RateLimitService } from 'src/service/rateLimit.service';

//TODO could be centralized (interface or composition) in future, cause both token and ip rate limiters have similar behavior
@Injectable()
export class IpAddressRateLimiterGuard implements CanActivate {
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
        this.configService.get<number>('RATE_LIMIT_IP') || 100,
        req.ip,
        rateWeigth,
      )
      .then(() => true);
  }
}
