import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('taskQueue')
export class QueueProcessor extends WorkerHost {
  async process(job: Job) {
    console.log(`Processing job ${job.id} with data:`, job.data);
    // Simulate task processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(`Job ${job.id} completed.`);
    return { status: 'done' };
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    console.error(`Job ${job.id} failed: ${err.message}`);
  }
}
