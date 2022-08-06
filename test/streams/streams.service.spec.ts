import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { LogisticProviderDocument } from '../../src/logistic-providers/schema/logistic-providers.schema';
import { StreamWithPickUps } from '../../src/streams/dto/stream-with-pickups';
import { Stream, StreamAggregate } from '../../src/streams/schema/stream.schema';
import { StreamsService } from '../../src/streams/streams.service';

const stream: Stream = {
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
      image:
        'https://d39t4x71zbx2q8.cloudfront.net/containers/Seenons-Piepschuim.png',
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
};

const streamAggregate = {
  ...stream,
  _id: '62ee48f34dd6ed8201a17592',
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
} as StreamAggregate;

const streamWithPickUps: StreamWithPickUps = {
  ...stream,
  _id: '62ee48f34dd6ed8201a17592',
  pickUpSlots: [
    {
      logisticProviderId:  '62ee48f34dd6ed8201a175c7',
      logisticProvider: 'GreenCollect',
      area: [1000, 1099],
      day: 'monday',
      hours: ['10:00', '12:00'],
    },
    {
      logisticProviderId: '62ee48f34dd6ed8201a175c7',
      logisticProvider: 'GreenCollect',
      area: [1000, 1099],
      day: 'monday',
      hours: ['18:00', '20:00'],
    },
  ],
};

describe('StreamsService', () => {
  let service: StreamsService;
  let model: Model<Stream>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreamsService,
        {
          provide: getModelToken('Stream'),
          useValue: {
            new: jest.fn().mockResolvedValue(stream),
            constructor: jest.fn().mockResolvedValue(stream),
            find: jest.fn(),
            aggregate: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StreamsService>(StreamsService);
    model = module.get<Model<Stream>>(getModelToken('Stream'));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return all Streams', async () => {
    const query = {
      exec: jest.fn().mockResolvedValueOnce([stream]),
    };

    (model.find as jest.Mock).mockReturnValue(query);

    const actual = await service.findAll();

    expect(actual).toEqual([stream]);
    expect(model.find).toHaveBeenCalled();
    expect(query.exec).toHaveBeenCalled();
  });

  it('should aggregate all Streams with the related LogisticProviders', async () => {
    const aggregate = {
      lookup: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce([streamAggregate]),
    };

    (model.aggregate as jest.Mock).mockReturnValue(aggregate);

    const actual = await service.pickUps();

    expect(actual).toEqual([streamWithPickUps]);
    expect(aggregate.lookup).toHaveBeenCalledWith({
      from: 'logisticProviders',
      localField: 'streamProductId',
      foreignField: 'supportedStreams',
      as: 'logisticProviders'
    });
    expect(aggregate.exec).toHaveBeenCalled();
  });

  it('should aggregate all Streams with the related LogisticProviders and match only the one in specified area', async () => {
    const aggregate = {
      lookup: jest.fn().mockReturnThis(),
      match: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce([streamAggregate]),
    };

    (model.aggregate as jest.Mock).mockReturnValue(aggregate);

    const postalcode = 1000;
    const actual = await service.pickUps(postalcode);

    expect(actual).toEqual([streamWithPickUps]);
    expect(aggregate.lookup).toHaveBeenCalledWith({
      from: 'logisticProviders',
      localField: 'streamProductId',
      foreignField: 'supportedStreams',
      as: 'logisticProviders'
    });
    expect(aggregate.match).toHaveBeenCalledWith({
      $and: [
        { 'logisticProviders.area.0': { $lte: postalcode } },
        { 'logisticProviders.area.1': { $gte: postalcode } },
      ],
    });
    expect(aggregate.exec).toHaveBeenCalled();
  });

  it('should aggregate all Streams with the related LogisticProviders and match only the one with the given pickUp weekdays', async () => {
    const aggregate = {
      lookup: jest.fn().mockReturnThis(),
      match: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce([streamAggregate]),
    };

    (model.aggregate as jest.Mock).mockReturnValue(aggregate);

    const weekdays = ['monday', 'friday'];
    const actual = await service.pickUps(undefined, weekdays);

    expect(actual).toEqual([streamWithPickUps]);
    expect(aggregate.lookup).toHaveBeenCalledWith({
      from: 'logisticProviders',
      localField: 'streamProductId',
      foreignField: 'supportedStreams',
      as: 'logisticProviders'
    });
    expect(aggregate.match).toHaveBeenCalledWith({
      'logisticProviders.pickUpSlots.day': {
        $in: weekdays,
      },
    });
    expect(aggregate.exec).toHaveBeenCalled();
  });
});
