import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TintasService } from './tintas.service';
import { CreateTintaDto } from './dto/create-tinta.dto';
import { UpdateTintaDto } from './dto/update-tinta.dto';

@Controller('tintas')
export class TintasController {
  constructor(private readonly tintasService: TintasService) {}

  @Post()
  create(@Body() createTintaDto: CreateTintaDto) {
    return this.tintasService.create(createTintaDto);
  }

  @Get()
  findAll() {
    return this.tintasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tintasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTintaDto: UpdateTintaDto) {
    return this.tintasService.update(+id, updateTintaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tintasService.remove(+id);
  }
}
