import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer, CustomerSchema } from './schema/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
  ],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
