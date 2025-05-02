import { Injectable } from '@nestjs/common';
import { CreateTintaDto } from './dto/create-tinta.dto';
import { UpdateTintaDto } from './dto/update-tinta.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Tinta } from '@prisma/client'; 

@Injectable()
export class TintasService {
  constructor(private prisma: PrismaService) {}

  async create(createTintaDto: CreateTintaDto): Promise<Tinta> {
    return await this.prisma.tinta.create({
      data: createTintaDto,
    });
  }

  async findAll(): Promise<Tinta[]> {
    return await this.prisma.tinta.findMany();
  }

  async findOne(id: number): Promise<Tinta | null> {
    return await this.prisma.tinta.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTintaDto: UpdateTintaDto): Promise<Tinta> {
    return await this.prisma.tinta.update({
      where: { id },
      data: updateTintaDto,
    });
  }

  async remove(id: number): Promise<Tinta> {
    return await this.prisma.tinta.delete({
      where: { id },
    });
  }
}
