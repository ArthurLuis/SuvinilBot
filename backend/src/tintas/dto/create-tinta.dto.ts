import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTintaDto {
  @ApiProperty({
    example: 'Branco Neve',
    description: 'Nome comercial da tinta.',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    example: '#FFFFFF',
    description: 'Cor da tinta em formato hexadecimal.',
  })
  @IsString()
  @IsNotEmpty()
  cor: string;

  @ApiProperty({
    example: 'lisapintada',
    description: 'Tipo de parede: reboco, drywall, cerâmica, etc.',
  })
  @IsString()
  @IsNotEmpty()
  tipo_parede: string;

  @ApiProperty({
    example: 'interno',
    description: 'Tipo de ambiente: interno ou externo.',
  })
  @IsString()
  @IsNotEmpty()
  ambiente: string;

  @ApiProperty({
    example: 'fosco',
    description: 'Acabamento da tinta: fosco, acetinado, semibrilho, etc.',
  })
  @IsString()
  @IsNotEmpty()
  acabamento: string;

  @ApiProperty({
    example: ['antimofo', 'lavável'],
    description: 'Características adicionais da tinta.',
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  features: string[];

  @ApiProperty({
    example: 'Premium',
    description: 'Linha da tinta: Econômica, Standard, Premium, etc.',
  })
  @IsString()
  @IsNotEmpty()
  linha: string;
}
