import { HttpException, HttpStatus } from '@nestjs/common';

export class RateLimitException extends HttpException {
  constructor(timeLeft: number) {
    super(
      `exceed limit requests, wait ${timeLeft}s for the next request!`,
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
