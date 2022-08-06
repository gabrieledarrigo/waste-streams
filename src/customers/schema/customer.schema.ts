import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ collection: 'customers' })
export class Customer {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  locality: string;

  @Prop()
  postalcode: string;

  @Prop()
  _created: Date;

  @Prop()
  _modified: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
