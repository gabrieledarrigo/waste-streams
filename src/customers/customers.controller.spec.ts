import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Customer } from './schema/customer.schema';

const customer = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  locality: 'Amsterdam',
  postalCode: '1012',
  _created: new Date(),
  _modified: new Date(),
} as any as Customer;


describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [{
        provide: CustomersService,
        useValue: {
          findAll: jest.fn().mockResolvedValue([customer]),
        },
      }]
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return a list of Logistic Providers', async () => {
    const actual = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(actual).toEqual([customer]);
  });
});
