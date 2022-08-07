import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { prepareMongoDB } from '../mongodb';
import { logisticProviders } from '../fixtures';
import { LogisticProvidersModule } from '../../src/logistic-providers/logistic-providers.module';

describe('LogisticProviders', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await prepareMongoDB();

    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            uri: `${mongoServer.getUri()}wasteStreams`,
          }),
        }),
        LogisticProvidersModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await mongoServer.stop();
    await app.close();
  });

  it(`/GET logistic-providers`, () =>
    request(app.getHttpServer())
      .get('/logistic-providers')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(logisticProviders));
});
