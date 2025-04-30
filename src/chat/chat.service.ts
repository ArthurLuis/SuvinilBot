import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { responsePrompt } from 'src/prompts';
import { OrchestratorService } from 'src/orchestrator/orchestrator.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly orchestrator: OrchestratorService,
    private readonly openaiService: OpenaiService, 
  ) {}

  async generateAnswer(userQuestion: string): Promise<string> {
    const context = await this.orchestrator.composeContext(userQuestion);

    const filledPrompt = await responsePrompt.format({
      context,
      question: userQuestion,
    });

    const response = await this.openaiService.getResponse(filledPrompt);
    if (!response) {
      throw new Error('ChatService: resposta do OpenAI veio vazia');
    }

    return response;
  }
}
