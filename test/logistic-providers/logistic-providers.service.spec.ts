import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
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

describe('LogisticProvidersService', () => {
  let service: LogisticProvidersService;
  let model: Model<LogisticProvider>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogisticProvidersService,
        {
          provide: getModelToken('LogisticProvider'),
          useValue: {
            new: jest.fn().mockResolvedValue(logisticProvider),
            constructor: jest.fn().mockResolvedValue(logisticProvider),
            find: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LogisticProvidersService>(LogisticProvidersService);
    model = module.get<Model<LogisticProvider>>(
      getModelToken('LogisticProvider'),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return all Logistic Providers', async () => {
    const query = {
      exec: jest.fn().mockResolvedValueOnce([logisticProvider]),
    };

    (model.find as jest.Mock).mockReturnValue(query);

    const actual = await service.findAll();

    expect(actual).toEqual([logisticProvider]);
    expect(model.find).toHaveBeenCalled();
    expect(query.exec).toHaveBeenCalled();
  });
});
