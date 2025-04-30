import { Module } from '@nestjs/common';
import { EnvironmentAgentModule } from './environment/environment.module';
import { ResistanceAgentModule } from './resistance/resistance.module';
import { UsageAgentModule } from './usage/usage.module';

@Module({
  imports: [EnvironmentAgentModule, ResistanceAgentModule, UsageAgentModule],
  exports: [EnvironmentAgentModule, ResistanceAgentModule, UsageAgentModule],
})
export class AgentsModule {}
