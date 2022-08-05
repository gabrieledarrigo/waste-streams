import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stream, StreamDocument } from './schema/stream.schema';

@Injectable()
export class StreamsService {
  constructor(
    @InjectModel(Stream.name)
    private stream: Model<StreamDocument>,
  ) {}

  async findAll(): Promise<Stream[]> {
    return this.stream.find().exec();
  }
}
