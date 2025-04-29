import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class EmbeddingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly openai: OpenaiService,
  ) {}

  async generateEmbedding(texto: string): Promise<number[]> {
    const response = await this.openai.createEmbedding({
      model: 'text-embedding-3-small',
      input: texto,
    });

    if (
      !response ||
      !response.data ||
      !response.data[0] ||
      !response.data[0].embedding
    ) {
      throw new Error('Invalid response from OpenAI service');
    }

    const embedding = response.data[0].embedding;

    return embedding;
  }

  async saveEmbedding(tintaId: number, embeddingArray: number[]) {
    const vectorString = JSON.stringify(embeddingArray);
    await this.prisma.$executeRaw`
    INSERT INTO "Embedding" ("tintaId","vector")
    VALUES (${tintaId}, ${vectorString}::vector)
    ON CONFLICT ("tintaId")
    DO UPDATE SET "vector" = ${vectorString}::vector;
  `;
  }

  async generatePaintEmbedding(tintaId: number): Promise<void> {
    const tinta = await this.prisma.tinta.findUnique({
      where: { id: tintaId },
    });
    if (!tinta) {
      throw new NotFoundException(`Paint with id ${tintaId} not found`);
    }

    const text = [
      String(tinta.nome),
      String(tinta.cor),
      String(tinta.tipo_parede),
      String(tinta.ambiente),
      String(tinta.acabamento),
      ...(Array.isArray(tinta.features) ? tinta.features.map(String) : []),
      String(tinta.linha),
    ].join(' ');

    const embedding = await this.generateEmbedding(text);
    await this.saveEmbedding(tintaId, embedding);
  }

  async generateAllPaintEmbeddings(): Promise<void> {
    const tintas = await this.prisma.tinta.findMany({ select: { id: true } });
    for (const { id } of tintas) {
      await this.generatePaintEmbedding(id);
    }
  }

  async searchSimilarPaints(query: string, k = 5): Promise<any[]> {
    const queryEmbedding = await this.generateEmbedding(query);
    const vectorString = JSON.stringify(queryEmbedding);

    const results = await this.prisma.$queryRaw<any[]>`
    SELECT t.*, e.id as embedding_id, 
    (e.vector <-> ${vectorString}::vector) as distance
    FROM "Tinta" t
    JOIN "Embedding" e ON t.id = e."tintaId"
    ORDER BY distance ASC
    LIMIT ${k};
  `;

    return results;
  }
}
