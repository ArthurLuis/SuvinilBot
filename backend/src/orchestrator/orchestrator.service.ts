import { Injectable, Logger } from '@nestjs/common';
import { EnvironmentAgentService } from 'src/agents/environment/environment-agent.service';
import { ResistanceAgentService } from 'src/agents/resistance/resistance-agent.service';
import { UsageAgentService } from 'src/agents/usage/usage-agent.service';
import { IntentService } from 'src/agents/routing/intent.service';
import { EmbeddingService } from 'src/embedding/embedding.service';

@Injectable()
export class OrchestratorService {
  private readonly logger = new Logger(OrchestratorService.name);

  constructor(
    private readonly intent: IntentService,
    private readonly embeddingService: EmbeddingService,
    private readonly envAgent: EnvironmentAgentService,
    private readonly resAgent: ResistanceAgentService,
    private readonly usageAgent: UsageAgentService,
  ) {}

  async composeContext(
    userMessage: string,
    sessionId?: string,
  ): Promise<{ context: string; agents: string[] }> {
    const agents = await this.intent.decideAgents(userMessage);
    if (!agents.includes('usage')) agents.push('usage');

    this.logger.debug('Buscando tintas similares para compor o contexto...');
    const tintas = await this.embeddingService.searchSimilarPaints(
      userMessage,
      5,
    );

    const summary = tintas
      .map((t: { features: string[] | string; nome: string; cor: string; acabamento: string; linha: string; tipo_parede: string; ambiente: string }) => {
        const features = Array.isArray(t.features)
          ? t.features.join(', ')
          : t.features;
        return `- ${t.nome} (${t.cor}, ${t.acabamento}, linha ${t.linha})\n  Indicado para: ${t.tipo_parede}, ${t.ambiente}\n  Features: ${features}`;
      })
      .join('\n');

    const parts: string[] = [];

    if (agents.includes('environment')) {
      const env = await this.envAgent.run(userMessage, sessionId);
      parts.push('**Environment Analysis:**\n' + env);
    }

    if (agents.includes('resistance')) {
      const res = await this.resAgent.run(userMessage, summary, sessionId);
      parts.push('**Resistance Analysis:**\n' + res);
    }

    const usage = await this.usageAgent.run(userMessage, summary, sessionId);
    parts.push('**Usage Analysis:**\n' + usage);

    const context = parts.join('\n\n');
    return { context, agents };
  }
}
