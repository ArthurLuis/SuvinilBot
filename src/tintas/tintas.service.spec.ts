import { Test, TestingModule } from '@nestjs/testing';
import { TintasService } from './tintas.service';

describe('TintasService', () => {
  let service: TintasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TintasService],
    }).compile();

    service = module.get<TintasService>(TintasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
