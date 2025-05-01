import { Injectable, Logger } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { intentPromptTemplate } from 'src/prompts/intent.prompt';

export type AgentKey = 'environment' | 'resistance' | 'usage';

@Injectable()
export class IntentService {
  private readonly logger = new Logger(IntentService.name);

  constructor(private readonly openai: OpenaiService) {}

  async decideAgents(userMessage: string): Promise<AgentKey[]> {
    this.logger.debug(`Classificando intenção: "${userMessage}"`);

    const prompt = intentPromptTemplate.replace('{question}', userMessage);
    const raw = await this.openai.getResponse(prompt);
    this.logger.verbose('Intent raw: ' + JSON.stringify(raw.reply));

    try {
      const agents = JSON.parse(raw.reply) as AgentKey[];
      this.logger.log('Agentes selecionados: ' + agents.join(', '));
      return agents;
    } catch {
      this.logger.warn('Falha no parse; fallback para ["usage"]');
      return ['usage'];
    }
  }
}
