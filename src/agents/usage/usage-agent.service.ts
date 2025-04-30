import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { usagePrompt } from 'src/prompts';

@Injectable()
export class UsageAgentService {
  constructor(private readonly openaiService: OpenaiService) {}

  async run(input: string, summary: string): Promise<string> {
    const filledPrompt = await usagePrompt.format({ input, summary });
    const response = await this.openaiService.getResponse(filledPrompt);
    if (!response) {
      throw new Error('UsageAgent: resposta vazia');
    }
    return response;
  }
}
