import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue, Job } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('hello') private helloQueue: Queue) { }

  async callBull(name: string): Promise<Job> {
    return await this.helloQueue.add('hello', name)
  }

  callTcp(): string {
    return 'Hello World!';
  }
}
