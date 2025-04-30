import { Module } from '@nestjs/common';
import { EnvironmentAgentService } from './environment-agent.service';
import { OpenaiModule } from 'src/openai/openai.module';  

@Module({
  imports: [OpenaiModule],     
  providers: [EnvironmentAgentService],
  exports: [EnvironmentAgentService],
})
export class EnvironmentAgentModule {}