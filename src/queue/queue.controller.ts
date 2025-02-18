import { Controller, Post, Body } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('add-task')
  async addTask(@Body() data: any) {
    await this.queueService.addTask(data);
    return { message: 'Task added to queue' };
  }
}
