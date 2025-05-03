import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TintasService } from './tintas.service';
import { CreateTintaDto } from './dto/create-tinta.dto';
import { UpdateTintaDto } from './dto/update-tinta.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tintas')
@Controller('tintas')
export class TintasController {
  constructor(private readonly tintasService: TintasService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria uma nova tinta',
    description:
      'Esse endpoint cria uma nova tinta com base nos dados fornecidos no corpo da requisição.',
  })
  @ApiResponse({
    status: 201,
    description: 'Tinta criada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos no corpo da requisição.',
  })
  create(@Body() createTintaDto: CreateTintaDto) {
    return this.tintasService.create(createTintaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtém todas as tintas',
    description: 'Esse endpoint retorna todas as tintas registradas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tintas retornada com sucesso.',
    isArray: true,
    type: CreateTintaDto,
  })
  findAll() {
    return this.tintasService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtém uma tinta pelo ID',
    description:
      'Esse endpoint retorna uma tinta específica com base no ID fornecido.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tinta encontrada.',
    type: CreateTintaDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Tinta não encontrada.',
  })
  findOne(@Param('id') id: string) {
    return this.tintasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza uma tinta existente',
    description:
      'Esse endpoint atualiza os dados de uma tinta com base no ID e nas informações fornecidas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tinta atualizada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos no corpo da requisição.',
  })
  @ApiResponse({
    status: 404,
    description: 'Tinta não encontrada.',
  })
  update(@Param('id') id: string, @Body() updateTintaDto: UpdateTintaDto) {
    return this.tintasService.update(+id, updateTintaDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove uma tinta pelo ID',
    description:
      'Esse endpoint remove uma tinta específica com base no ID fornecido.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tinta removida com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Tinta não encontrada.',
  })
  remove(@Param('id') id: string) {
    return this.tintasService.remove(+id);
  }
}
