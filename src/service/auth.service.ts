import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}
  isValidToken(token: string): boolean {
    const valid = this.configService.get<string[]>('VALID_UUID_TOKENS') || [
      'B1q2hUEKmeVp9zWepx9cnp',
      'PXmRJVrtzFAHsxjs7voD5R',
    ];
    return valid.includes(token);
  }
}
