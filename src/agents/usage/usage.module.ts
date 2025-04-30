import { Module } from '@nestjs/common';
import { UsageAgentService } from './usage-agent.service';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [OpenaiModule], 
  providers: [UsageAgentService],
  exports: [UsageAgentService],
})
export class UsageAgentModule {}
