import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { LogisticProviderAggregate, LogisticProvider } from '../logistic-providers/schema/logistic-providers.schema';
import { StreamWithPickUps } from './dto/stream-with-pickups';
import { Stream } from './schema/stream.schema';
import { StreamsService } from './streams.service';

const stream = {
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
} as any as Stream;

const logisticProviderAggregate = {
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
    ...stream,
  },
  _created: new Date('2020-07-30T09:28:34.876Z'),
  _modified: new Date('2022-07-22T13:56:43.161Z'),
} as any as LogisticProviderAggregate;

const streamWithPickUps: StreamWithPickUps = {
  ...stream,
  _id: '62ee48f34dd6ed8201a17592',
  pickUpSlots: [
    {
      logisticProviderId: '62ee48f34dd6ed8201a175c7',
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
  let streamModel: Model<Stream>;
  let logisticProviderModel: Model<LogisticProvider>;

  const aggregateQuery = {
    lookup: jest.fn(),
    unwind: jest.fn(),
    project: jest.fn(),
    match: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    aggregateQuery.lookup.mockReturnThis();
    aggregateQuery.unwind.mockReturnThis();
    aggregateQuery.project.mockReturnThis();
    aggregateQuery.match.mockReturnThis();
    aggregateQuery.exec.mockResolvedValueOnce([logisticProviderAggregate]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreamsService,
        {
          provide: getModelToken(Stream.name),
          useValue: {
            find: jest.fn(),
            exec: jest.fn(),
          },
        },
        {
          provide: getModelToken(LogisticProvider.name),
          useValue: {
            aggregate: jest.fn().mockReturnValue(aggregateQuery),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StreamsService>(StreamsService);
    streamModel = module.get<Model<Stream>>(getModelToken(Stream.name));
    logisticProviderModel = module.get<Model<LogisticProvider>>(getModelToken(LogisticProvider.name));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return all Streams', async () => {
    const query = {
      exec: jest.fn().mockResolvedValueOnce([stream]),
    };

    (streamModel.find as jest.Mock).mockReturnValue(query);

    const actual = await service.findAll();

    expect(actual).toEqual([stream]);
    expect(streamModel.find).toHaveBeenCalled();
    expect(query.exec).toHaveBeenCalled();
  });

  it('should aggregate all LogisticProvider with the related Streams', async () => {
    const actual = await service.availableForPickUp();

    expect(actual).toEqual([streamWithPickUps]);
    expect(logisticProviderModel.aggregate).toHaveBeenCalled();
    expect(aggregateQuery.lookup).toHaveBeenCalledWith({
      from: 'streams',
      localField: 'supportedStreams',
      foreignField: 'streamProductId',
      as: 'streams',
    });
    expect(aggregateQuery.unwind).toHaveBeenCalledWith({
      path: '$streams',
    });
    expect(aggregateQuery.project).toHaveBeenCalledWith({
      name: 1,
      pickUpSlots: 1,
      stream: '$streams',
      area: 1,
    });
    expect(aggregateQuery.exec).toHaveBeenCalled();
  });

  it('should aggregate all LogisticProvider with the related Streams, and match only the one in specified area', async () => {
    const postalcode = 1000;
    const actual = await service.availableForPickUp(postalcode);

    expect(actual).toEqual([streamWithPickUps]);
    expect(aggregateQuery.match).toHaveBeenCalledWith({
      $and: [{ 'area.0': { $lte: postalcode } }, { 'area.1': { $gte: postalcode } }],
    });
    expect(aggregateQuery.exec).toHaveBeenCalled();
  });

  it('should aggregate all Streams with the related LogisticProviders and match only the one with the given pickUp weekdays', async () => {
    const weekdays = ['monday', 'friday'];
    const actual = await service.availableForPickUp(undefined, weekdays);

    expect(actual).toEqual([streamWithPickUps]);
    expect(aggregateQuery.match).toHaveBeenCalledWith({
      'pickUpSlots.day': {
        $in: weekdays,
      },
    });
    expect(aggregateQuery.exec).toHaveBeenCalled();
  });
});
