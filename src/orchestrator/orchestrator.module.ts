import { Module } from '@nestjs/common';
import { OrchestratorService } from './orchestrator.service';
import { AgentsModule } from 'src/agents/agents.module';

@Module({
  imports: [AgentsModule],
  providers: [OrchestratorService],
  exports: [OrchestratorService],
})
export class OrchestratorModule {}
