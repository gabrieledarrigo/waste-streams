import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LogisticProviderDocument } from '../../logistic-providers/schema/logistic-providers.schema';
import { Size } from './size.schema';

export type StreamDocument = Stream & Document;

export type StreamAggregate = StreamDocument & {
  logisticProviders: LogisticProviderDocument[];
};

@Schema({ collection: 'streams' })
export class Stream {
  @Prop()
  type: string;

  @Prop()
  streamProductId: number;

  @Prop()
  image: string;

  @Prop()
  detailsURL: string;

  @Prop()
  textColor: string;

  @Prop()
  backgroundColor: string;

  @Prop({ type: Map, of: String })
  name: {
    [key: string]: string;
  };

  @Prop({ type: Map, of: String })
  description: {
    [key: string]: string;
  };

  @Prop()
  sizes: Size[];

  @Prop()
  _active: boolean;

  @Prop()
  _created: Date;

  @Prop()
  _modified: Date;
}

export const StreamSchema = SchemaFactory.createForClass(Stream);
