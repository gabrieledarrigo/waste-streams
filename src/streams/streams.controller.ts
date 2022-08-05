import { Controller, Get } from '@nestjs/common';
import { Stream } from './schema/stream.schema';
import { StreamsService } from './streams.service';

@Controller('streams')
export class StreamsController {
  constructor(private streamsService: StreamsService) {}

  @Get()
  async findAll(): Promise<Stream[]> {
   return  this.streamsService.findAll();
  }
}
