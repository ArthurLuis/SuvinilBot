import { Module } from '@nestjs/common';
import { UsageAgentService } from './usage-agent.service';
import { OpenaiModule } from 'src/openai/openai.module';
import { EmbeddingModule } from 'src/embedding/embedding.module';

@Module({
  imports: [OpenaiModule, EmbeddingModule], 
  providers: [UsageAgentService],
  exports: [UsageAgentService],
})
export class UsageAgentModule {}
