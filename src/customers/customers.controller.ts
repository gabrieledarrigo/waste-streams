import { Controller, Get } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './schema/customer.schema';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }
}
