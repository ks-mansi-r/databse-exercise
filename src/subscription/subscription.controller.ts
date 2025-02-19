import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { SubscriptionService } from './subscription/subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post('subscribe')
  async subscribe(@Body() body: { userId: number; countryIds: number[] }) {
    return this.subscriptionService.subscribe(body.userId, body.countryIds);
  }

  @Get(':userId')
  async getSubscriptions(@Param('userId') userId: number) {
    return this.subscriptionService.getSubscriptions(userId);
  }

  @Post('send-emails')
  async sendEmails() {
    return this.subscriptionService.sendEmailToSubscribers();
  }
}
