import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Stream } from '../../src/streams/schema/stream.schema';
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
});
