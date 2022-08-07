import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { logisticProviders } from '../../test/fixtures';
import { LogisticProvidersService } from './logistic-providers.service';
import { LogisticProvider } from './schema/logistic-providers.schema';

describe('LogisticProvidersService', () => {
  let service: LogisticProvidersService;
  let model: Model<LogisticProvider>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogisticProvidersService,
        {
          provide: getModelToken(LogisticProvider.name),
          useValue: {
            find: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LogisticProvidersService>(LogisticProvidersService);
    model = module.get<Model<LogisticProvider>>(getModelToken(LogisticProvider.name));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return all Logistic Providers', async () => {
    const query = {
      exec: jest.fn().mockResolvedValueOnce(logisticProviders),
    };

    (model.find as jest.Mock).mockReturnValue(query);

    const actual = await service.findAll();

    expect(actual).toEqual(logisticProviders);
    expect(model.find).toHaveBeenCalled();
    expect(query.exec).toHaveBeenCalled();
  });
});
