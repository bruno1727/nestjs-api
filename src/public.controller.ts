import { Controller, Get } from '@nestjs/common';

@Controller('public/hello')
export class PublicController {
  @Get()
  async getHello(): Promise<string> {
    return `this is public data, feel free to share!`;
  }
}
