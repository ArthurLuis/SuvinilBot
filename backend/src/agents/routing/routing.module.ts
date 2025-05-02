import { Module } from '@nestjs/common';
import { IntentService } from './intent.service';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [OpenaiModule],
  providers: [IntentService],
  exports: [IntentService],
})
export class RoutingModule {}
