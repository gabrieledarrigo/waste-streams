import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, Matches, Max, Min } from "class-validator";

export const POSTAL_CODE_ERROR_MESSAGE = 'Please specify a valid Dutch postal code in the range 1000 - 9999';
export const WEEKDAYS_ERROR_MESSAGE = 'Please specify a valid day: monday, tuesday, wednesday, thursday, friday, saturday, sunday, or a day-ordinal where ordinal specifies the nth day of the month. For example friday-2nd';

export class PickUpQuery {
  @IsOptional()
  @IsArray()
  @Matches(/^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)-?(1st|2nd|3rd|4th)?$/, {
    each: true,
    message: WEEKDAYS_ERROR_MESSAGE
  })
  @Type(() => String)
  weekdays?: string[];

  @IsOptional()
  @IsInt()
  @Min(1000, {
    message: POSTAL_CODE_ERROR_MESSAGE
  })
  @Max(9999, {
    message: POSTAL_CODE_ERROR_MESSAGE
  })
  @Type(() => Number)
  postalcode?: number;
}
