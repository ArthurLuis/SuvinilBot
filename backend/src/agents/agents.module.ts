import { Module } from '@nestjs/common';
import { EnvironmentAgentModule } from './environment/environment.module';
import { ResistanceAgentModule } from './resistance/resistance.module';
import { UsageAgentModule } from './usage/usage.module';
import { VisualizationModule } from './visualization/visualization.module';

@Module({
  imports: [
    EnvironmentAgentModule,
    ResistanceAgentModule,
    UsageAgentModule,
    VisualizationModule,
  ],
  exports: [
    EnvironmentAgentModule,
    ResistanceAgentModule,
    UsageAgentModule,
    VisualizationModule,
  ],
})
export class AgentsModule {}
