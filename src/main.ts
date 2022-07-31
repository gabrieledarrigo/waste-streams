import { NestFactory } from '@nestjs/core';
import { StreamsModule } from './streams/streams.module';

async function bootstrap() {
  const app = await NestFactory.create(StreamsModule);
  await app.listen(3000);
}

bootstrap();
