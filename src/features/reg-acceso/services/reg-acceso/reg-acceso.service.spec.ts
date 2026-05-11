import { Test, TestingModule } from '@nestjs/testing';
import { RegAccesoService } from './reg-acceso.service';

describe('RegAccesoService', () => {
  let service: RegAccesoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegAccesoService],
    }).compile();

    service = module.get<RegAccesoService>(RegAccesoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
