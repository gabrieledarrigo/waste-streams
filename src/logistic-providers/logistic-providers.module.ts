import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogisticProvidersController } from './logistic-providers.controller';
import { LogisticProvidersService } from './logistic-providers.service';
import { LogisticProvider, LogisticProviderSchema } from './schema/logistic-providers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LogisticProvider.name,
        schema: LogisticProviderSchema,
      },
    ]),
  ],
  controllers: [LogisticProvidersController],
  providers: [LogisticProvidersService],
  exports: [MongooseModule],
})
export class LogisticProvidersModule {}
