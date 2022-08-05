import { Test, TestingModule } from '@nestjs/testing';
import { Stream } from '../../src/streams/schema/stream.schema';
import { StreamsController } from '../../src/streams/streams.controller';
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

describe('StreamsController', () => {
  let controller: StreamsController;
  let service: StreamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamsController],
      providers: [
        {
          provide: StreamsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([stream]),
          },
        },
      ],
    }).compile();

    controller = module.get<StreamsController>(StreamsController);
    service = module.get<StreamsService>(StreamsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return a list of Streams', async () => {
    const actual = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(actual).toEqual([stream]);
  });
});
