import { Test, TestingModule } from '@nestjs/testing';
import { RegAccesoController } from './reg-acceso.controller';

describe('RegAccesoController', () => {
  let controller: RegAccesoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegAccesoController],
    }).compile();

    controller = module.get<RegAccesoController>(RegAccesoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
