import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { EmbeddingModule } from 'src/embedding/embedding.module';

@Module({
  imports: [EmbeddingModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
