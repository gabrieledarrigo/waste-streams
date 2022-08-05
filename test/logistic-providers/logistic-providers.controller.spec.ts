import { Test, TestingModule } from '@nestjs/testing';
import { LogisticProvidersController } from '../../src/logistic-providers/logistic-providers.controller';
import { LogisticProvidersService } from '../../src/logistic-providers/logistic-providers.service';
import { LogisticProvider } from '../../src/logistic-providers/schema/logistic-providers.schema';

const logisticProvider: LogisticProvider = {
  name: 'Retransport',
  supportedStreams: [2, 3],
  supportedContainers: [4, 5, 6, 7],
  area: [1500, 2000],
  pickUpSlots: [
    {
      day: 'monday',
      hours: ['10:00', '12:00'],
    },
    {
      day: 'tuesday',
      hours: ['18:00', '20:00'],
    },
    {
      day: 'thursday',
      hours: ['14:00', '16:00'],
    },
    {
      day: 'friday',
      hours: ['10:00', '12:00'],
    },
  ],
  _created: new Date(),
  _modified: new Date(),
};

describe('LogisticProvidersController', () => {
  let controller: LogisticProvidersController;
  let service: LogisticProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogisticProvidersController],
      providers: [
        {
          provide: LogisticProvidersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([logisticProvider]),
          },
        },
      ],
    }).compile();

    controller = module.get<LogisticProvidersController>(LogisticProvidersController);
    service = module.get<LogisticProvidersService>(LogisticProvidersService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return a list of Logistic Providers', async () => {
    const actual = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(actual).toEqual([logisticProvider]);
  });
});
