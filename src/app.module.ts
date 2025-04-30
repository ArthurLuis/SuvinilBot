import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TintasModule } from './tintas/tintas.module';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { EmbeddingService } from './embedding/embedding.service';
import { EmbeddingController } from './embedding/embedding.controller';
import { EmbeddingModule } from './embedding/embedding.module';
import { ChatModule } from './chat/chat.module';
import { EnvironmentAgentModule } from './agents/environment/environment.module';
import { ResistanceAgentModule } from './agents/resistance/resistance.module';
import { UsageAgentModule } from './agents/usage/usage.module';
import { OrchestratorModule } from './orchestrator/orchestrator.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TintasModule,
    OpenaiModule,
    EmbeddingModule,
    ChatModule,
    EnvironmentAgentModule,
    ResistanceAgentModule,
    UsageAgentModule,
    OrchestratorModule,
  ],
  providers: [EmbeddingService],
  controllers: [EmbeddingController],
})
export class AppModule {}
