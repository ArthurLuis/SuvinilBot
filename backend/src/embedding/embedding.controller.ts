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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('embeddings') 
@Controller('embeddings')
export class EmbeddingController {
  constructor(private readonly embeddingService: EmbeddingService) {}

  @Post('generate-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Gera embeddings para todas as tintas.',
    description:
      'Esse endpoint gera embeddings para todas as tintas cadastradas no sistema.',
  })
  @ApiResponse({
    status: 200,
    description: 'Embeddings gerados para todas as tintas.',
  })
  async generateAllEmbeddings() {
    await this.embeddingService.generateAllPaintEmbeddings();
    return { message: 'All embeddings generated successfully' };
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Gera um embedding para uma tinta específica.',
    description:
      'Esse endpoint gera um embedding para a tinta especificada pelo ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Embedding gerado com sucesso para a tinta especificada.',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao processar a geração do embedding, ID inválido.',
  })
  async generateEmbeddingForPaint(@Param('id') id: string) {
    const paintId = parseInt(id, 10);
    await this.embeddingService.generatePaintEmbedding(paintId);
    return { message: `Embedding generated for paint ${paintId}` };
  }

  @Get('search')
  @ApiOperation({
    summary: 'Busca tintas similares com base no texto.',
    description:
      'Esse endpoint realiza uma busca por tintas similares com base no texto de consulta fornecido.',
  })
  @ApiResponse({
    status: 200,
    description: 'Resultados encontrados para a busca de tintas similares.',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao realizar a busca de tintas, parâmetros inválidos.',
  })
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
