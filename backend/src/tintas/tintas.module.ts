import { Module } from '@nestjs/common';
import { TintasService } from './tintas.service';
import { TintasController } from './tintas.controller';

@Module({
  controllers: [TintasController],
  providers: [TintasService],
})
export class TintasModule {}
