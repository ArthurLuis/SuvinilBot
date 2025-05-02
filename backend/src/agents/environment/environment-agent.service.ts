import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { environmentPrompt } from 'src/prompts';

@Injectable()
export class EnvironmentAgentService {
  constructor(private readonly openaiService: OpenaiService) {}

  async run(input: string, sessionId?: string): Promise<string> {
    const filledPrompt = await environmentPrompt.format({ input });

    const response = await this.openaiService.getResponse(
      filledPrompt,
      sessionId,
    );

    if (response == null) {
      throw new Error('EnvironmentAgent: resposta do OpenAI veio vazia');
    }

    return response.reply;
  }
}
