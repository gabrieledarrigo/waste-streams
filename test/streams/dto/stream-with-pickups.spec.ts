/* eslint-disable no-underscore-dangle */
import { LogisticProviderDocument } from '../../../src/logistic-providers/schema/logistic-providers.schema';
import { StreamWithPickUps } from '../../../src/streams/dto/stream-with-pickups';
import { StreamAggregate } from '../../../src/streams/schema/stream.schema';

describe('StreamWithPickUps', () => {
  describe('from', () => {
    it('should create a StreamWithPickUps from a StreamAggregate', () => {
      const aggregate = {
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
        logisticProviders: [
          {
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
            _created: new Date(),
            _modified: new Date(),
          } as LogisticProviderDocument,
        ],
        _active: true,
        _created: new Date('2020-07-30T09:28:34.876Z'),
        _modified: new Date('2022-07-22T13:56:43.161Z'),
      } as any as StreamAggregate;

      const actual = StreamWithPickUps.from(aggregate);

      expect(actual).toEqual({
        _id: aggregate._id,
        type: aggregate.type,
        streamProductId: aggregate.streamProductId,
        image: aggregate.image,
        detailsURL: aggregate.detailsURL,
        textColor: aggregate.textColor,
        backgroundColor: aggregate.backgroundColor,
        name: aggregate.name,
        description: aggregate.description,
        sizes: aggregate.sizes,
        pickUpSlots: [
          {
            logisticProviderId: aggregate.logisticProviders[0]._id,
            logisticProvider: aggregate.logisticProviders[0].name,
            area: aggregate.logisticProviders[0].area,
            day: aggregate.logisticProviders[0].pickUpSlots[0].day,
            hours: aggregate.logisticProviders[0].pickUpSlots[0].hours,
          },
          {
            logisticProviderId: aggregate.logisticProviders[0]._id,
            logisticProvider: aggregate.logisticProviders[0].name,
            area: aggregate.logisticProviders[0].area,
            day: aggregate.logisticProviders[0].pickUpSlots[1].day,
            hours: aggregate.logisticProviders[0].pickUpSlots[1].hours,
          },
        ],
        _active: aggregate._active,
        _created: aggregate._created,
        _modified: aggregate._modified,
      });
    });
  });
});
