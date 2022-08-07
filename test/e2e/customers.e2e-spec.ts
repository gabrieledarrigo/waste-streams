import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { prepareMongoDB } from '../mongodb';
import { customers } from '../fixtures';
import { CustomersModule } from '../../src/customers/customers.module';

describe('Customers', () => {
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
        CustomersModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await mongoServer.stop();
    await app.close();
  });

  it(`/GET customers`, () =>
    request(app.getHttpServer())
      .get('/customers')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(customers));
});
