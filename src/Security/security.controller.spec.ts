import { Test, TestingModule } from '@nestjs/testing';
import { SecurityController } from './auth.controller';
import { AuthService } from './Auth.service';

describe('SecurityController', () => {
  let controller: SecurityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecurityController],
      providers: [AuthService],
    }).compile();

    controller = module.get<SecurityController>(SecurityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
