import { Controller, Get } from '@nestjs/common';
import { LogisticProvidersService } from './logistic-providers.service';
import { LogisticProvider } from './schema/logistic-providers.schema';

@Controller('logistic-providers')
export class LogisticProvidersController {
  constructor(private logisticProviderService: LogisticProvidersService) {}

  @Get()
  async findAll(): Promise<LogisticProvider[]> {
    return this.logisticProviderService.findAll();
  }
}
