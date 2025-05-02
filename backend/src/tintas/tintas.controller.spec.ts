import { Test, TestingModule } from '@nestjs/testing';
import { TintasController } from './tintas.controller';
import { TintasService } from './tintas.service';

describe('TintasController', () => {
  let controller: TintasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TintasController],
      providers: [TintasService],
    }).compile();

    controller = module.get<TintasController>(TintasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
