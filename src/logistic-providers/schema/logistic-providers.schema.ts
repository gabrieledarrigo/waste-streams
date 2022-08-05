import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LogisticProviderDocument = LogisticProvider & Document;

export type Area = [number, number];

export type Hours = [string, string];

export type PickUpSlot = {
  day: string;
  hours: Hours;
};

@Schema({ collection: 'logisticProviders' })
export class LogisticProvider {
  @Prop()
  name: string;

  @Prop()
  supportedStreams: number[];

  @Prop()
  supportedContainers: number[];

  @Prop()
  area: Area;

  @Prop()
  pickUpSlots: PickUpSlot[];

  @Prop()
  _created: Date;

  @Prop()
  _modified: Date;
}

export const LogisticProviderSchema =
  SchemaFactory.createForClass(LogisticProvider);
