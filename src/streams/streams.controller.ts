import { Controller, Get, Query } from '@nestjs/common';
import { PickUpQuery } from './dto';
import { Stream } from './schema/stream.schema';
import { StreamsService } from './streams.service';

@Controller('streams')
export class StreamsController {
  constructor(private streamsService: StreamsService) {}

  @Get()
  async findAll(): Promise<Stream[]> {
    return this.streamsService.findAll();
  }

  @Get('pickups')
  async pickUps(@Query() query: PickUpQuery): Promise<any> {
    return this.streamsService.availableForPickUp(query.postalcode, query.weekdays);
  }
}
