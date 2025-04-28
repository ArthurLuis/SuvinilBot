import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TintasModule } from './tintas/tintas.module';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { EmbeddingService } from './embedding/embedding.service';

@Module({
  imports: [DatabaseModule, TintasModule, OpenaiModule, ConfigModule.forRoot()],
  providers: [EmbeddingService],
})
export class AppModule {}
