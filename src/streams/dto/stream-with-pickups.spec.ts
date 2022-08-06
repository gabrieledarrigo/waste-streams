import { LogisticProviderAggregate } from '../../../src/logistic-providers/schema/logistic-providers.schema';
import { StreamWithPickUps } from '../../../src/streams/dto/stream-with-pickups';

const aggregate = {
  _id: '62ee48f34dd6ed8201a175c7',
  name: 'GreenCollect',
  supportedStreams: [6, 7, 9, 10],
  supportedContainers: [1, 2, 3],
  area: [1000, 1099],
  pickUpSlots: [
    {
      day: 'monday',
      hours: ['10:00', '12:00'],
    },
    {
      day: 'monday',
      hours: ['18:00', '20:00'],
    },
  ],
  stream: {
    _id: '62ee48f34dd6ed8201a17592',
    type: 'piepschuim',
    streamProductId: 11,
    image: 'https://d39t4x71zbx2q8.cloudfront.net/streams/v2/PIEPSCHUIM.png',
    detailsURL: 'https://seenons.com/piepschuim/',
    textColor: '#000000',
    backgroundColor: '#D1C4C4',
    name: {
      'en-gb': 'Styrofoam',
    },
    description: {
      'en-gb': 'Styrofoam',
    },
    sizes: [
      {
        id: 18,
        size: 1000,
        image: 'https://d39t4x71zbx2q8.cloudfront.net/containers/Seenons-Piepschuim.png',
        sizeDisplay: '1m3',
        containerProductId: 32,
        discountPercentage: 0,
        unitPricePickup: 0,
        unitPriceRent: 0,
        unitPricePlacement: 0,
      },
    ],
    _active: true,
    _created: new Date('2020-07-30T09:28:34.876Z'),
    _modified: new Date('2022-07-22T13:56:43.161Z'),
  },
  _created: new Date('2020-07-30T09:28:34.876Z'),
  _modified: new Date('2022-07-22T13:56:43.161Z'),
} as any as LogisticProviderAggregate;

describe('StreamWithPickUps', () => {
  describe('fromAggregate', () => {
    it('should create a StreamWithPickUps from a LogisticProviderAggregate', () => {
      const actual = StreamWithPickUps.fromAggregate(aggregate);

      expect(actual).toEqual({
        _id: aggregate.stream._id,
        type: aggregate.stream.type,
        streamProductId: aggregate.stream.streamProductId,
        image: aggregate.stream.image,
        detailsURL: aggregate.stream.detailsURL,
        textColor: aggregate.stream.textColor,
        backgroundColor: aggregate.stream.backgroundColor,
        name: aggregate.stream.name,
        description: aggregate.stream.description,
        sizes: aggregate.stream.sizes,
        pickUpSlots: [
          {
            logisticProviderId: aggregate._id,
            logisticProvider: aggregate.name,
            area: aggregate.area,
            day: aggregate.pickUpSlots[0].day,
            hours: aggregate.pickUpSlots[0].hours,
          },
          {
            logisticProviderId: aggregate._id,
            logisticProvider: aggregate.name,
            area: aggregate.area,
            day: aggregate.pickUpSlots[1].day,
            hours: aggregate.pickUpSlots[1].hours,
          },
        ],
        _active: aggregate.stream._active,
        _created: aggregate.stream._created,
        _modified: aggregate.stream._modified,
      });
    });
  });

  describe('fromAggregates', () => {
    it('should create an array of StreamWithPickUps from a list of LogisticProviderAggregate', () => {
      const actual = StreamWithPickUps.fromAggregates([aggregate]);

      expect(actual).toEqual([
        {
          _id: aggregate.stream._id,
          type: aggregate.stream.type,
          streamProductId: aggregate.stream.streamProductId,
          image: aggregate.stream.image,
          detailsURL: aggregate.stream.detailsURL,
          textColor: aggregate.stream.textColor,
          backgroundColor: aggregate.stream.backgroundColor,
          name: aggregate.stream.name,
          description: aggregate.stream.description,
          sizes: aggregate.stream.sizes,
          pickUpSlots: [
            {
              logisticProviderId: aggregate._id,
              logisticProvider: aggregate.name,
              area: aggregate.area,
              day: aggregate.pickUpSlots[0].day,
              hours: aggregate.pickUpSlots[0].hours,
            },
            {
              logisticProviderId: aggregate._id,
              logisticProvider: aggregate.name,
              area: aggregate.area,
              day: aggregate.pickUpSlots[1].day,
              hours: aggregate.pickUpSlots[1].hours,
            },
          ],
          _active: aggregate.stream._active,
          _created: aggregate.stream._created,
          _modified: aggregate.stream._modified,
        },
      ]);
    });
  });
});
