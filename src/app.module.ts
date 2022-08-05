import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StreamsModule } from './streams/streams.module';
import { LogisticProvidersModule } from './logistic-providers/logistic-providers.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://user:password@localhost:27017/wasteStreams?authSource=admin'),
    StreamsModule,
    LogisticProvidersModule,
  ],
})
export class AppModule {}
