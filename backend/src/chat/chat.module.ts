import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { EmbeddingModule } from 'src/embedding/embedding.module';
import { OrchestratorModule } from 'src/orchestrator/orchestrator.module';
import { OpenaiModule } from 'src/openai/openai.module';
import { VisualizationModule } from 'src/agents/visualization/visualization.module';

@Module({
  imports: [EmbeddingModule, OrchestratorModule, OpenaiModule, VisualizationModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
