import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { resistancePrompt } from 'src/prompts';

@Injectable()
export class ResistanceAgentService {
  constructor(private readonly openaiService: OpenaiService) {}

  async run(input: string, summary: string): Promise<string> {
    const filledPrompt = await resistancePrompt.format({ input, summary });
    const response = await this.openaiService.getResponse(filledPrompt);
    if (!response) {
      throw new Error('ResistanceAgent: resposta vazia');
    }
    return response;
  }
}
