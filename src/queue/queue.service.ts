import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('taskQueue') private readonly taskQueue: Queue) {}

  async addTask(data: any) {
    await this.taskQueue.add('processTask', data, {
      attempts: 3, // Retry failed jobs 3 times
      backoff: 5000, // Retry after 5 seconds
    });
  }
}
