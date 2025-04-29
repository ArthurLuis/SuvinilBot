import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body('question') question: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.chatService.generateAnswer(question);
  }
}
