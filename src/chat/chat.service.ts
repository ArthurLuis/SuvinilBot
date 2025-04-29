import { Injectable } from '@nestjs/common';
import { EmbeddingService } from 'src/embedding/embedding.service';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';

@Injectable()
export class ChatService {
  constructor(private readonly embeddingService: EmbeddingService) {}

  async generateAnswer(userQuestion: string): Promise<string> {
    const tintas = await this.embeddingService.searchSimilarPaints(
      userQuestion,
      5,
    );
    const context = tintas
      .map((t) => `Nome: ${t.nome}\nCor: ${t.cor}\nAcabamento: ${t.acabamento}`)
      .join('\n---\n');

    const prompt = ChatPromptTemplate.fromTemplate(`
Você é um especialista em tintas Suvinil.  
Tome por base as opções abaixo e responda à pergunta do usuário de forma objetiva e completa.

TINTAS DISPONÍVEIS:
{context}

PERGUNTA:
{question}

RESPOSTA:
`);

    const llm = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
    });
    const chain = prompt.pipe(llm);

    const { text } = await chain.invoke({
      context,
      question: userQuestion,
    });

    return text;
  }
}
