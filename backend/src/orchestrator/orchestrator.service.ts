// src/orchestrator/orchestrator.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { EnvironmentAgentService } from 'src/agents/environment/environment-agent.service';
import { ResistanceAgentService } from 'src/agents/resistance/resistance-agent.service';
import { UsageAgentService } from 'src/agents/usage/usage-agent.service';
import { AgentKey, IntentService } from 'src/agents/routing/intent.service';
import { EmbeddingService } from 'src/embedding/embedding.service';
import { VisualizationService } from 'src/agents/visualization/visualization.service';

@Injectable()
export class OrchestratorService {
  private readonly logger = new Logger(OrchestratorService.name);

  constructor(
    private readonly intent: IntentService,
    private readonly embeddingService: EmbeddingService,
    private readonly envAgent: EnvironmentAgentService,
    private readonly resAgent: ResistanceAgentService,
    private readonly usageAgent: UsageAgentService,
    private readonly vizAgent: VisualizationService,
  ) {}

  async composeContext(userMessage: string): Promise<{
    context: string;
    imageUrls?: string[];
  }> {
    this.logger.debug(`Orquestração iniciada: "${userMessage}"`);

    const agents: AgentKey[] = await this.intent.decideAgents(userMessage);
    if (!agents.includes('usage')) {
      agents.push('usage');
    }

    this.logger.debug('Buscando tintas para summary...');
    const tintas = await this.embeddingService.searchSimilarPaints(
      userMessage,
      5,
    );
    const summary = tintas
      .map((t) => {
        const features = Array.isArray(t.features)
          ? (t.features as string[]).join(', ')
          : (t.features as string);
        return `- ${t.nome} (${t.cor}, ${t.acabamento}, linha ${t.linha})
  Indicado para: ${t.tipo_parede}, ${t.ambiente}
  Features: ${features}`;
      })
      .join('\n');
    this.logger.verbose('Summary de tintas:\n' + summary);

    const parts: string[] = [];

    if (agents.includes('environment')) {
      const envResult = await this.envAgent.run(userMessage);
      parts.push('**Environment Analysis:**\n' + envResult);
    }

    if (agents.includes('resistance')) {
      const resResult = await this.resAgent.run(userMessage, summary);
      parts.push('**Resistance Analysis:**\n' + resResult);
    }

    const usageResult = await this.usageAgent.run(userMessage, summary);
    parts.push('**Usage Analysis:**\n' + usageResult);

    const context = parts.join('\n\n');
    this.logger.verbose('Contexto composto:\n' + context);

    let imageUrls: string[] | undefined;
    if (agents.includes('visualization')) {
      const recommendedPaint =
        summary
          .split('\n')[0]
          .match(/-\s*([^()]+)/)?.[1]
          .trim() ?? '';
      this.logger.debug(`VisualizationAgent: tinta="${recommendedPaint}"`);
      const recommendedColor =
        summary
          .split('\n')[0]
          .match(/\(\s*([^,]+),/)?.[1]
          .trim() ?? '';
      imageUrls = await this.vizAgent.run(
        recommendedPaint,
        recommendedColor,
        userMessage,
      );
    }

    return { context, imageUrls };
  }
}
