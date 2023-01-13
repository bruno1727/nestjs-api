import { SetMetadata } from '@nestjs/common';

export const enum Weigth {
  LIGTH = 1,
  MEDIUM = 2,
  HEAVY = 5,
}

export const RateWeigth = (weigth: Weigth) => SetMetadata('rateWeigth', weigth);
