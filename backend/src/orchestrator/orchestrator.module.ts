import { Module } from '@nestjs/common';
import { OrchestratorService } from './orchestrator.service';
import { AgentsModule } from 'src/agents/agents.module';
import { RoutingModule } from 'src/agents/routing/routing.module';
import { EmbeddingModule } from 'src/embedding/embedding.module';

@Module({
  imports: [AgentsModule, RoutingModule, EmbeddingModule],
  providers: [OrchestratorService],
  exports: [OrchestratorService],
})
export class OrchestratorModule {}
