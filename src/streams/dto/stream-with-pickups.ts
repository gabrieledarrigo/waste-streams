/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import { Hours } from "../../logistic-providers/schema/logistic-providers.schema"
import { Stream, StreamAggregate } from "../schema/stream.schema"

export class StreamWithPickUps extends Stream {
  _id: string;

  pickUpSlots: {
    logisticProviderId: string,
    logisticProvider: string,
    area: [number, number],
    day: string,
    hours: Hours,
  }[];

  static from(aggregate: StreamAggregate): StreamWithPickUps {
    const slots = aggregate.logisticProviders.map(({ _id, name, area, pickUpSlots }) => {
      return pickUpSlots.map(({ day, hours }) => ({
        logisticProviderId: _id,
        logisticProvider: name,
        area,
        day,
        hours,
      }))
    }).flat();

    const streamWithPickUps = new StreamWithPickUps();
    streamWithPickUps._id = aggregate._id!;
    streamWithPickUps.type = aggregate.type;
    streamWithPickUps.streamProductId = aggregate.streamProductId;
    streamWithPickUps.image = aggregate.image;
    streamWithPickUps.detailsURL = aggregate.detailsURL;
    streamWithPickUps.textColor = aggregate.textColor;
    streamWithPickUps.backgroundColor = aggregate.backgroundColor;
    streamWithPickUps.name = aggregate.name;
    streamWithPickUps.description = aggregate.description;
    streamWithPickUps.sizes = aggregate.sizes;
    streamWithPickUps.pickUpSlots = slots;
    streamWithPickUps._active = aggregate._active;
    streamWithPickUps._created = aggregate._created;
    streamWithPickUps._modified = aggregate._modified;

    return streamWithPickUps;
  }
}