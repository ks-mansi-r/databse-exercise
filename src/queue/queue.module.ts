import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bullmq';
@Module({
  controllers: [QueueController],
  providers: [QueueService]
  ,
  imports: [
    BullModule.registerQueue({
      name: 'taskQueue',
      connection: {
        host: 'localhost',
        port: 3000,
      },
    }),
  ],
})
export class QueueModule {}
