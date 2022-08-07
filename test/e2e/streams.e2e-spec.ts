import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { prepareMongoDB } from '../mongodb';
import { streamsWithPickups, streams } from '../fixtures';
import { StreamsModule } from '../../src/streams/streams.module';

describe('Streams', () => {
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
        StreamsModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await mongoServer.stop();
    await app.close();
  });

  it(`/GET streams`, () =>
    request(app.getHttpServer())
      .get('/streams')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(streams));

  it(`/GET streams`, () =>
    request(app.getHttpServer())
      .get('/streams/pickups')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(streamsWithPickups));
});
