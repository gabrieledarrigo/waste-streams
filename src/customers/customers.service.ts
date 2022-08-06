import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './schema/customer.schema';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name)
    private customer: Model<CustomerDocument>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customer.find().exec();
  }
}
