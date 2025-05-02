/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient, Prisma } from '@prisma/client';
import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

type RawTinta = {
  nome: string;
  cor: string;
  tipo_parede: string;
  ambiente: string;
  acabamento: string;
  features: string;
  linha: string;
};

async function main() {
  const filePath = join(__dirname, '../data/tintas.csv');
  const raw      = readFileSync(filePath, 'utf-8');
  const records: RawTinta[] = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  const data: Prisma.TintaCreateManyInput[] = records.map(r => ({
    nome:        r.nome,
    cor:         r.cor,
    tipo_parede: r.tipo_parede,
    ambiente:    r.ambiente,
    acabamento:  r.acabamento,
    features:    r.features.split(',').map(item => item.trim()),
    linha:       r.linha,
  }));

  const result = await prisma.tinta.createMany({
    data,
  });

  console.log(`✅ Inseridas ${result.count} tintas no banco.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
