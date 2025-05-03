import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Catálogo Inteligente de Tintas Suvinil')
    .setDescription(
      'API para recomendação de tintas com IA, busca vetorial e geração de imagens',
    )
    .setVersion('1.0')
    .addTag('tintas')
    .addTag('chat')
    .addTag('agents')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // acessível em http://localhost:3001/api

  await app.listen(3001);
}
bootstrap();
