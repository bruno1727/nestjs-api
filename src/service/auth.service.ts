import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  isValidToken(token: string): boolean {
    const valid = ['B1q2hUEKmeVp9zWepx9cnp', 'PXmRJVrtzFAHsxjs7voD5R'];
    return valid.includes(token);
  }
}
