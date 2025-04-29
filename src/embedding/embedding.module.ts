import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { OpenaiService } from '../openai/openai.service';
import { EmbeddingService } from './embedding.service';
import { EmbeddingController } from './embedding.controller';
import { OpenaiModule } from 'src/openai/openai.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [OpenaiModule, ConfigModule],
  providers: [PrismaService, OpenaiService, EmbeddingService],
  controllers: [EmbeddingController],
  exports: [],
})
export class EmbeddingModule {}
