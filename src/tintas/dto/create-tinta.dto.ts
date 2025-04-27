import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateTintaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cor: string;

  @IsString()
  @IsNotEmpty()
  tipo_parede: string;

  @IsString()
  @IsNotEmpty()
  ambiente: string;

  @IsString()
  @IsNotEmpty()
  acabamento: string;

  @IsArray()
  @IsString({ each: true })
  features: string[];

  @IsString()
  @IsNotEmpty()
  linha: string;
}
