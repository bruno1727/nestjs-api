import { HttpException, HttpStatus } from '@nestjs/common';

function msToTime(duration) {
  let seconds: any = Math.floor(duration % 60),
    minutes: any = Math.floor((duration / 60) % 60),
    hours: any = Math.floor((duration / (60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds;
}

export class RateLimitException extends HttpException {
  constructor(timeLeft: number) {
    super(
      `exceeded limit requests, wait ${msToTime(
        timeLeft,
      )} for the next request!`,
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
