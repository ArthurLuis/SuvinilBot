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
    this.logger.debug(`Mensagem do usuário recebida: "${userMessage}"`);

    const agents = await this.intent.decideAgents(userMessage);
    this.logger.debug(`Agentes decididos: ${agents.join(', ')}`);

    if (!agents.includes('usage')) {
      agents.push('usage');
      this.logger.debug(`Agente 'usage' adicionado por padrão.`);
    }

    this.logger.debug('Buscando tintas similares para compor o contexto...');
    const tintas = await this.embeddingService.searchSimilarPaints(
      userMessage,
      5,
    );
    this.logger.debug(`Tintas encontradas: ${tintas.length}`);

    const summary = tintas
      .map(
        (t: {
          features: string[] | string;
          nome: string;
          cor: string;
          acabamento: string;
          linha: string;
          tipo_parede: string;
          ambiente: string;
        }) => {
          const features = Array.isArray(t.features)
            ? t.features.join(', ')
            : t.features;
          return `- ${t.nome} (${t.cor}, ${t.acabamento}, linha ${t.linha})\n  Indicado para: ${t.tipo_parede}, ${t.ambiente}\n  Features: ${features}`;
        },
      )
      .join('\n');

    this.logger.debug('Resumo das tintas gerado:\n' + summary);

    const parts: string[] = [];

    if (agents.includes('environment')) {
      this.logger.debug('Executando agente: environment');
      const env = await this.envAgent.run(userMessage, sessionId);
      this.logger.debug('Resposta do agente environment:\n' + env);
      parts.push('**Environment Analysis:**\n' + env);
    }

    if (agents.includes('resistance')) {
      this.logger.debug('Executando agente: resistance');
      const res = await this.resAgent.run(userMessage, summary, sessionId);
      this.logger.debug('Resposta do agente resistance:\n' + res);
      parts.push('**Resistance Analysis:**\n' + res);
    }

    this.logger.debug('Executando agente: usage');
    const usage = await this.usageAgent.run(userMessage, summary, sessionId);
    this.logger.debug('Resposta do agente usage:\n' + usage);
    parts.push('**Usage Analysis:**\n' + usage);

    const context = parts.join('\n\n');
    this.logger.debug('Contexto final composto:\n' + context);

    return { context, agents };
  }
}
