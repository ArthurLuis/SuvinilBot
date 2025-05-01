import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { systemInstructions } from 'src/prompts/system.prompt';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const MODEL = 'gpt-4-turbo';
const TEMPERATURE = 0.7;

@Injectable()
export class OpenaiService {
  private sessions = new Map<string, ChatMessage[]>();

  constructor(private readonly openai: OpenAI) {}

  private ensureSession(sessionId?: string): string {
    let sid = sessionId;
    if (!sid || !this.sessions.has(sid)) {
      sid = crypto.randomUUID();
      this.sessions.set(sid, []);
    }
    return sid;
  }

  async getResponse(
    text: string,
    sessionId?: string,
  ): Promise<{ reply: string; sessionId: string }> {
    const sid = this.ensureSession(sessionId);
    const history = this.sessions.get(sid)!;

    const messages: ChatMessage[] = [
      { role: 'system', content: systemInstructions.trim() },
      ...history,
      { role: 'user', content: text },
    ];

    const resp = await this.openai.chat.completions.create({
      model: MODEL,
      messages,
      temperature: TEMPERATURE,
    });

    const reply = resp.choices[0].message.content!;
    this.sessions.set(sid, [
      ...history,
      { role: 'user', content: text },
      { role: 'assistant', content: reply },
    ]);

    return { reply, sessionId: sid };
  }

  async createEmbedding(args: {
    model: string;
    input: string;
  }): Promise<OpenAI.Embeddings.CreateEmbeddingResponse> {
    return this.openai.embeddings.create(args);
  }

  async getLightResponse(text: string): Promise<string> {
    const resp = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemInstructions.trim() },
        { role: 'user', content: text },
      ],
      temperature: TEMPERATURE,
    });
    return resp.choices[0].message.content!;
  }
}
