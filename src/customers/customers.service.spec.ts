import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { customers } from '../../test/fixtures';
import { CustomersService } from './customers.service';
import { Customer } from './schema/customer.schema';

describe('CustomersService', () => {
  let service: CustomersService;
  let model: Model<Customer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getModelToken(Customer.name),
          useValue: {
            find: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    model = module.get<Model<Customer>>(getModelToken(Customer.name));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return all Customers', async () => {
    const query = {
      exec: jest.fn().mockResolvedValueOnce(customers),
    };

    (model.find as jest.Mock).mockReturnValue(query);

    const actual = await service.findAll();

    expect(actual).toEqual(customers);
    expect(model.find).toHaveBeenCalled();
    expect(query.exec).toHaveBeenCalled();
  });
});
