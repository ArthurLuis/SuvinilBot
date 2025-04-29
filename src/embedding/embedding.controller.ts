import {
  Controller,
  Post,
  Param,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { EmbeddingService } from './embedding.service';

@Controller('embeddings')
export class EmbeddingController {
  constructor(private readonly embeddingService: EmbeddingService) {}

  @Post('generate-all')
  @HttpCode(HttpStatus.OK)
  async generateAllEmbeddings() {
    await this.embeddingService.generateAllPaintEmbeddings();
    return { message: 'All embeddings generated successfully' };
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async generateEmbeddingForPaint(@Param('id') id: string) {
    const paintId = parseInt(id, 10);
    await this.embeddingService.generatePaintEmbedding(paintId);
    return { message: `Embedding generated for paint ${paintId}` };
  }

  @Get('search')
  async directSearch(@Query('q') query: string, @Query('k') k = '5') {
    const limit = parseInt(k, 10);
    const results = await this.embeddingService.searchSimilarPaints(
      query,
      limit,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return results;
  }
}
