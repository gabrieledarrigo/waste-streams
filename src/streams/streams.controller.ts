import { Controller, Get } from '@nestjs/common';

@Controller('streams')
export class StreamsController {
  // eslint-disable-next-line class-methods-use-this
  @Get()
  async getAll() {
    return {
      hello: 'World',
    };
  }
}
