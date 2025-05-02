import { Injectable } from '@nestjs/common';
import { OrchestratorService } from 'src/orchestrator/orchestrator.service';
import { OpenaiService } from 'src/openai/openai.service';
import { responsePrompt } from 'src/prompts/response.prompt';

@Injectable()
export class ChatService {
  constructor(
    private readonly orchestrator: OrchestratorService,
    private readonly openai: OpenaiService,
  ) {}

  async generateAnswer(
    userQuestion: string,
    sessionId?: string,
  ): Promise<{ reply: string; sessionId: string; imageUrls?: string[] }> {
    const { context, imageUrls } =
      await this.orchestrator.composeContext(userQuestion);

    const filled = await responsePrompt.format({
      context,
      question: userQuestion,
    });

    const { reply, sessionId: newSid } = await this.openai.getResponse(
      filled,
      sessionId,
    );

    if (!reply) {
      throw new Error('Resposta vazia do OpenAI');
    }

    return { reply, sessionId: newSid, imageUrls };
  }
}
