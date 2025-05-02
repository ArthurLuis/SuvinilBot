import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

interface ChatRequest {
  sessionId?: string;
  question: string;
}

interface ChatResponse {
  sessionId: string;
  reply: string;
  imageUrls?: string[];
}

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
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
