import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  LogisticProvider,
  LogisticProviderAggregate,
  LogisticProviderDocument,
} from '../logistic-providers/schema/logistic-providers.schema';
import { StreamWithPickUps } from './dto/stream-with-pickups';
import { Stream, StreamDocument } from './schema/stream.schema';

@Injectable()
export class StreamsService {
  constructor(
    @InjectModel(LogisticProvider.name)
    private logisticProvider: Model<LogisticProviderDocument>,

    @InjectModel(Stream.name)
    private stream: Model<StreamDocument>,
  ) {}

  async findAll(): Promise<Stream[]> {
    return this.stream.find().exec();
  }

  async availableForPickUp(postalcode?: number, weekdays?: string[]): Promise<StreamWithPickUps[]> {
    const query = this.logisticProvider.aggregate();

    if (postalcode) {
      query.match({
        $and: [{ 'area.0': { $lte: postalcode } }, { 'area.1': { $gte: postalcode } }],
      });
    }

    if (weekdays) {
      query.match({
        'pickUpSlots.day': {
          $in: weekdays,
        },
      });
    }

    query
      .lookup({
        from: 'streams',
        localField: 'supportedStreams',
        foreignField: 'streamProductId',
        as: 'streams',
      })
      .unwind({
        path: '$streams',
      })
      .project({
        name: 1,
        pickUpSlots: 1,
        stream: '$streams',
        area: 1,
      });

    const aggregates = (await query.exec()) as LogisticProviderAggregate[];

    return StreamWithPickUps.fromAggregates(aggregates);
  }
}
