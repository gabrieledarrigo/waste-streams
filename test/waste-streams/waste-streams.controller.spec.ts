import { Test, TestingModule } from '@nestjs/testing';
import { StreamsController } from '../../src/streams/streams.controller';

describe('WasteStreamsController', () => {
  let controller: StreamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamsController],
    }).compile();

    controller = module.get<StreamsController>(StreamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
