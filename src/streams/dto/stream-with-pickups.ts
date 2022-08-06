import { Hours, LogisticProviderAggregate } from '../../logistic-providers/schema/logistic-providers.schema';
import { Stream } from '../schema/stream.schema';

export class StreamWithPickUps extends Stream {
  _id: string;

  pickUpSlots: {
    logisticProviderId: string;
    logisticProvider: string;
    area: [number, number];
    day: string;
    hours: Hours;
  }[];

  static fromAggregate(aggregate: LogisticProviderAggregate): StreamWithPickUps {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id, name, area, pickUpSlots, stream } = aggregate;

    const streamWithPickUps = new StreamWithPickUps();
    streamWithPickUps._id = stream._id!;
    streamWithPickUps.type = stream.type;
    streamWithPickUps.streamProductId = stream.streamProductId;
    streamWithPickUps.image = stream.image;
    streamWithPickUps.detailsURL = stream.detailsURL;
    streamWithPickUps.textColor = stream.textColor;
    streamWithPickUps.backgroundColor = stream.backgroundColor;
    streamWithPickUps.name = stream.name;
    streamWithPickUps.description = stream.description;
    streamWithPickUps.sizes = stream.sizes;
    streamWithPickUps.pickUpSlots = pickUpSlots.map((slot) => ({
      logisticProviderId: _id,
      logisticProvider: name,
      area,
      ...slot,
    }));
    streamWithPickUps._active = stream._active;
    streamWithPickUps._created = stream._created;
    streamWithPickUps._modified = stream._modified;

    return streamWithPickUps;
  }

  static fromAggregates(aggregates: LogisticProviderAggregate[]): StreamWithPickUps[] {
    const mapped = aggregates.reduce((acc, aggregate) => {
      const streamWithPickUps = StreamWithPickUps.fromAggregate(aggregate);
      const streamId = streamWithPickUps._id;

      if (acc[streamId]) {
        acc[streamId].pickUpSlots.push(...streamWithPickUps.pickUpSlots);
      } else {
        acc[streamId] = streamWithPickUps;
      }

      return acc;
    }, {} as { [key: string]: StreamWithPickUps });

    return Object.values(mapped);
  }
}
