import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { logisticProviders, streams, streamsWithPickups } from '../../test/fixtures';
import { LogisticProviderAggregate, LogisticProvider } from '../logistic-providers/schema/logistic-providers.schema';
import { Stream } from './schema/stream.schema';
import { StreamsService } from './streams.service';

const [stream] = streams;
const [logisticProvider] = logisticProviders;
const [streamWithPickUps] = streamsWithPickups;
const logisticProviderAggregate = {
 ...logisticProvider,
  stream: {
    ...stream,
  },
} as any as LogisticProviderAggregate;

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
      exec: jest.fn().mockResolvedValueOnce(streams),
    };

    (streamModel.find as jest.Mock).mockReturnValue(query);

    const actual = await service.findAll();

    expect(actual).toEqual(streams);
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
