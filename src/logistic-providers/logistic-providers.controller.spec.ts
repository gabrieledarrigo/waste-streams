import { Test, TestingModule } from '@nestjs/testing';
import { logisticProviders } from '../../test/fixtures';
import { LogisticProvidersController } from './logistic-providers.controller';
import { LogisticProvidersService } from './logistic-providers.service';

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
            findAll: jest.fn().mockResolvedValue(logisticProviders),
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
    expect(actual).toEqual(logisticProviders);
  });
});
