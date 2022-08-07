import { Test, TestingModule } from '@nestjs/testing';
import { streams, streamsWithPickups } from '../../test/fixtures';
import { PickUpQuery } from './dto';
import { StreamsController } from './streams.controller';
import { StreamsService } from './streams.service';

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
            findAll: jest.fn().mockResolvedValue(streams),
            availableForPickUp: jest.fn().mockResolvedValue(streamsWithPickups),
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
    expect(actual).toEqual(streams);
  });

  it('should return a list of Streams available for pick up', async () => {
    const query = new PickUpQuery();
    query.postalcode = 1000;
    query.weekdays = ['monday', 'tuesday'];

    const actual = await controller.pickUps(query);

    expect(service.availableForPickUp).toHaveBeenCalledWith(query.postalcode, query.weekdays);
    expect(actual).toEqual(streamsWithPickups);
  });
});
