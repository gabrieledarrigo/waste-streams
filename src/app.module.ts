import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StreamsModule } from './streams/streams.module';
import { LogisticProvidersModule } from './logistic-providers/logistic-providers.module';
import database from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('mongodb.uri'),
      }),
    }),
    StreamsModule,
    LogisticProvidersModule,
  ],
})
export class AppModule {}
