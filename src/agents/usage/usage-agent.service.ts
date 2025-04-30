import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { usagePrompt } from 'src/prompts';
import { EmbeddingService } from 'src/embedding/embedding.service';

@Injectable()
export class UsageAgentService {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly embeddingService: EmbeddingService,
  ) {}

  async run(input: string): Promise<string> {
    const tintas = await this.embeddingService.searchSimilarPaints(input, 5);

    const summary = tintas
      .map((t) => `- ${t.nome} (${t.cor}, acabamento ${t.acabamento})`)
      .join('\n');

    const filledPrompt = await usagePrompt.format({ input, summary });

    const response = await this.openaiService.getResponse(filledPrompt);

    if (response == null) {
      throw new Error('UsageAgent: resposta do OpenAI veio vazia');
    }

    return response;
  }
}
