import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogisticProvider, LogisticProviderDocument } from './schema/logistic-providers.schema';

@Injectable()
export class LogisticProvidersService {
  constructor(
    @InjectModel(LogisticProvider.name)
    private logisticProvider: Model<LogisticProviderDocument>,
  ) {}

  async findAll(): Promise<LogisticProvider[]> {
    return this.logisticProvider.find().exec();
  }
}
