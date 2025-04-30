import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { resistancePrompt } from 'src/prompts';

@Injectable()
export class ResistanceAgentService {
  constructor(private readonly openaiService: OpenaiService) {}

  async run(input: string): Promise<string> {
    const filledPrompt = await resistancePrompt.format({ input });
    const response = await this.openaiService.getResponse(filledPrompt);
    if (response == null) {
      throw new Error('ResistanceAgent: resposta do OpenAI veio vazia');
    }

    return response;
  }
}
