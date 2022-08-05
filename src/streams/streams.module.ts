import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogisticProvidersModule } from '../logistic-providers/logistic-providers.module';
import { Stream, StreamSchema } from './schema/stream.schema';
import { StreamsController } from './streams.controller';
import { StreamsService } from './streams.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Stream.name,
        schema: StreamSchema,
      },
    ]),
    LogisticProvidersModule,
  ],
  controllers: [StreamsController],
  providers: [StreamsService],
})
export class StreamsModule {}
