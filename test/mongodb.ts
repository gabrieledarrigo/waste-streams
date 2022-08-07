import 'reflect-metadata';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { customers, logisticProviders, streams } from './fixtures';

export async function prepareMongoDB(): Promise<MongoMemoryServer> {
  const mongo = await MongoMemoryServer.create({
    instance: {
      dbName: 'wasteStreams',
    },
  });

  const connection = new MongoClient(`${mongo.getUri()}wasteStreams`);
  const db = connection.db('wasteStreams');

  await db.collection('streams').insertMany(streams);
  await db.collection('logisticProviders').insertMany(logisticProviders);
  await db.collection('customers').insertMany(customers);
  await connection.close();

  return mongo;
}
