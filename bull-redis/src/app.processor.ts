import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('hello')
export class AppProcessor {
  @Process('hello')
  writeHello(job: Job<string>): {} {
    Logger.log(`Hey, hello ${job.data}`);
    job.progress(100);
    return {}
  }
}
