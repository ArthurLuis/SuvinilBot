import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { responsePrompt } from 'src/prompts/response.prompt';
import { OrchestratorService } from 'src/orchestrator/orchestrator.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly orchestrator: OrchestratorService,
    private readonly openai: OpenaiService,
  ) {}

  async generateAnswer(userQuestion: string): Promise<string> {
    const context = await this.orchestrator.composeContext(userQuestion);
    const filled = await responsePrompt.format({
      context,
      question: userQuestion,
    });
    const answer = await this.openai.getResponse(filled);
    if (!answer) {
      throw new Error('Resposta vazia do OpenAI');
    }
    return answer;
  }
}
