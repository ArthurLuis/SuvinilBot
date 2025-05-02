import { Module } from '@nestjs/common';
import { VisualizationService } from './visualization.service';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  providers: [VisualizationService],
  imports: [OpenaiModule],
  exports: [VisualizationService],
})
export class VisualizationModule {}
