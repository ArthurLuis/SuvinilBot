import { Controller, Get } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Get()
  async getResponse() {
    const text = 'What is the capital of France?';
    return this.openaiService.getResponse(text);
  }
}
