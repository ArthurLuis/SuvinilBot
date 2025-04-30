import { Module } from '@nestjs/common';
import { ResistanceAgentService } from './resistance-agent.service';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [OpenaiModule],
  providers: [ResistanceAgentService],
  exports: [ResistanceAgentService],
})
export class ResistanceAgentModule {}
