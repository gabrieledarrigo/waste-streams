import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StreamWithPickUps } from './dto/stream-with-pickups';
import { Stream, StreamAggregate, StreamDocument } from './schema/stream.schema';

@Injectable()
export class StreamsService {
  constructor(
    @InjectModel(Stream.name)
    private stream: Model<StreamDocument>,
  ) {}

  async findAll(): Promise<Stream[]> {
    return this.stream.find().exec();
  }

  async pickUps(postalcode?: number, weekdays?: string[]): Promise<StreamWithPickUps[]> {
    const query = this.stream.aggregate().lookup({
      from: 'logisticProviders',
      localField: 'streamProductId',
      foreignField: 'supportedStreams',
      as: 'logisticProviders',
    });

    if (postalcode) {
      query.match({
        $and: [
          { 'logisticProviders.area.0': { $lte: postalcode } },
          { 'logisticProviders.area.1': { $gte: postalcode } },
        ],
      });
    }

    if (weekdays) {
      query.match({
        'logisticProviders.pickUpSlots.day': {
          $in: weekdays,
        },
      });
    }

    return ((await query.exec()) as StreamAggregate[]).map((aggregate) => StreamWithPickUps.from(aggregate));
  }
}
