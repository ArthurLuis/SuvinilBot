import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TintasModule } from './tintas/tintas.module';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { EmbeddingService } from './embedding/embedding.service';
import { EmbeddingController } from './embedding/embedding.controller';
import { EmbeddingModule } from './embedding/embedding.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TintasModule,
    OpenaiModule,
    EmbeddingModule,
    ChatModule,
  ],
  providers: [EmbeddingService],
  controllers: [EmbeddingController],
})
export class AppModule {}
