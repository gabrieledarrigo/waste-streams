import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type SizeDocument = Size & Document;

@Schema({ _id: false })
export class Size {
  @Prop()
  id: number;

  @Prop()
  size: number;

  @Prop()
  image: string;

  @Prop()
  sizeDisplay: string;

  @Prop()
  containerProductId: number;

  @Prop()
  discountPercentage: number;

  @Prop()
  unitPricePickup: number;

  @Prop()
  unitPriceRent: number | null;

  @Prop()
  unitPricePlacement: number | null;
}

export const SizeSchema = SchemaFactory.createForClass(Size);
