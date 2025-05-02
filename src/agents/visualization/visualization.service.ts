// src/agents/visualization/visualization-agent.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { visualizationMetaPrompt } from 'src/prompts/visualizationMeta.prompt';

export interface VisualizationDetails {
  surface: string;
  environment: string;
  finish: 'matte' | 'satin' | 'glossy';
  lighting: string;
  name: string;
  color: string;
  hex: string;
}

@Injectable()
export class VisualizationService {
  private readonly logger = new Logger(VisualizationService.name);

  constructor(private readonly openaiService: OpenaiService) {}

  async run(
    tinta: string,
    corRecomendada: string,
    userMessage: string,
  ): Promise<string[]> {
    this.logger.debug('Preenchendo visualizationMetaPrompt com valores:');
    this.logger.debug(`- userMessage: ${userMessage}`);
    this.logger.debug(`- tinta:        ${tinta}`);
    const filledMeta = await visualizationMetaPrompt.format({
      userMessage,
      tinta,
      corRecomendada,
    });
    this.logger.verbose('MetaPrompt:\n' + filledMeta);

    const rawJson = await this.openaiService.getLightResponse(filledMeta);
    const jsonStr = rawJson.trim();
    this.logger.verbose('MetaJSON recebido:\n' + jsonStr);

    let details: VisualizationDetails;
    try {
      details = JSON.parse(jsonStr) as VisualizationDetails;
    } catch (err) {
      this.logger.error('Erro ao parsear metadados de visualização', err);
      throw new Error('Não foi possível extrair detalhes de visualização');
    }

const dallePrompt = `
Photo of a clean ${details.environment} space focused on a single smooth ${details.surface} painted entirely in ${details.name} paint (${details.color}, HEX ${details.hex}) with a ${details.finish} finish. The painted surface must cover at least 70% of the frame. Do not paint the ceiling, floor, furniture, or any other surface. No furniture, props, text, stripes, patterns, or distractions. Lighting: ${details.lighting}. High-resolution, realistic photograph. Ensure the painted surface matches exactly the specified color and hex code.
`.trim();

    this.logger.debug('DALL·E prompt final:\n' + dallePrompt);

    const urls = await this.openaiService.generateImage(dallePrompt, 1);
    this.logger.verbose('URLs de imagem geradas:\n' + urls.join('\n'));
    return urls;
  }
}
