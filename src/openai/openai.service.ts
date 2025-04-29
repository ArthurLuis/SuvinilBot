import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

const MODEL = 'gpt-3.5-turbo';
const TEMPERATURE = 0.7;
const INSTRUCTIONS = `You are a helpful assistant. You will be given a question and you will answer it in the best way possible. If you don't know the answer, say "I don't know".`;

@Injectable()
export class OpenaiService {
  constructor(private readonly openai: OpenAI) {}

  async getResponse(text: string) {
    const chatCompletion = await this.openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: INSTRUCTIONS,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: TEMPERATURE,
    });
    return chatCompletion.choices[0].message.content;
  }

  async createEmbedding({
    model,
    input,
  }: {
    model: string;
    input: string;
  }): Promise<OpenAI.Embeddings.CreateEmbeddingResponse> {
    const embedding = await this.openai.embeddings.create({
      model,
      input,
    });
    return embedding;
  }
}
