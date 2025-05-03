import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiProperty,
} from '@nestjs/swagger';

// DTO para a requisição
class OpenaiRequest {
  @ApiProperty({
    description: 'A pergunta que será enviada para o modelo OpenAI.',
    type: String,
  })
  question: string;
}

// DTO para a resposta
class OpenaiResponse {
  @ApiProperty({
    description: 'Resposta gerada pelo modelo OpenAI.',
    type: String,
  })
  reply: string;

  @ApiProperty({
    description: 'ID da sessão associada à resposta.',
    type: String,
  })
  sessionId: string;
}

@ApiTags('openai')
@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post()
  @ApiOperation({
    summary: 'Envia uma pergunta para o modelo OpenAI e recebe uma resposta.',
    description:
      'Esse endpoint envia uma pergunta para o modelo OpenAI e retorna a resposta gerada pelo modelo.',
  })
  @ApiResponse({
    status: 200,
    description: 'Resposta gerada com sucesso pelo modelo OpenAI.',
    type: OpenaiResponse, 
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao processar a requisição, dados inválidos.',
  })
  async getResponse(@Body() body: OpenaiRequest): Promise<OpenaiResponse> {
    const { question } = body;
    const { reply, sessionId } = await this.openaiService.getResponse(question);
    return { reply, sessionId };
  }
}
