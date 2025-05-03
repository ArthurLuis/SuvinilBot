import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiProperty,
} from '@nestjs/swagger';

class ChatRequest {
  @ApiProperty({
    description: 'A pergunta feita pelo usuário para a IA.',
    type: String,
  })
  question: string;

  @ApiProperty({
    description: 'ID da sessão para continuar a conversa (opcional).',
    type: String,
    required: false,
  })
  sessionId?: string;
}

class ChatResponse {
  @ApiProperty({
    description: 'ID da sessão atualizada após a resposta.',
    type: String,
  })
  sessionId: string;

  @ApiProperty({
    description: 'Resposta gerada pela IA com base na pergunta.',
    type: String,
  })
  reply: string;

  @ApiProperty({
    description: 'URLs das imagens geradas pela IA (opcional).',
    type: [String],
    required: false,
  })
  imageUrls?: string[];
}

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({
    summary:
      'Recebe uma pergunta do usuário e retorna uma resposta com base na IA.',
    description:
      'Esse endpoint recebe uma pergunta do usuário e gera uma resposta com base no histórico da conversa. Opcionalmente, retorna imagens geradas por IA.',
  })
  @ApiResponse({
    status: 200,
    description: 'Resposta gerada com sucesso',
    type: ChatResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na requisição, dados inválidos',
  })
  async chat(@Body() body: ChatRequest): Promise<ChatResponse> {
    const { sessionId, question } = body;

    const {
      reply,
      sessionId: sid,
      imageUrls,
    } = await this.chatService.generateAnswer(question, sessionId);

    return {
      sessionId: sid,
      reply,
      imageUrls: imageUrls?.length ? imageUrls : undefined,
    };
  }
}
