import { Test, TestingModule } from '@nestjs/testing';
import { PrivateController } from './private.controller';

describe('AppController', () => {
  let appController: PrivateController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PrivateController],
    }).compile();

    appController = app.get<PrivateController>(PrivateController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe(
        'this is some sensitive data, be careful!',
      );
    });
  });
});
