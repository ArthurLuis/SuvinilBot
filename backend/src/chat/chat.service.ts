import { Injectable } from '@nestjs/common';
import { OrchestratorService } from 'src/orchestrator/orchestrator.service';
import { OpenaiService } from 'src/openai/openai.service';
import { responsePrompt } from 'src/prompts/response.prompt';
import { VisualizationService } from 'src/agents/visualization/visualization.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly orchestrator: OrchestratorService,
    private readonly openai: OpenaiService,
    private readonly vizAgent: VisualizationService,
  ) {}

  async generateAnswer(
    userQuestion: string,
    sessionId?: string,
  ): Promise<{ reply: string; sessionId: string; imageUrls?: string[] }> {
    const { context, agents } = await this.orchestrator.composeContext(
      userQuestion,
      sessionId,
    );

    let imageUrls: string[] | undefined;

    const filled = await responsePrompt.format({
      context,
      question: userQuestion,
    });

    const { reply, sessionId: newSid } = await this.openai.getResponse(
      filled,
      sessionId,
    );

    if (agents.includes('visualization')) {
      imageUrls = await this.vizAgent.run(reply, userQuestion, sessionId);
    }


    if (!reply) {
      throw new Error('Resposta vazia do OpenAI');
    }

    return { reply, sessionId: newSid, imageUrls };
  }
}
