import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../entity/subscription.entity';
import { User } from 'src/user/user.entity';
import { Country } from 'src/country/entity/country.entity';
import { TimeSeries } from 'src/timeseries/entity/timeseries.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription) private subRepository: Repository<Subscription>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Country) private countryRepository: Repository<Country>,
    @InjectRepository(TimeSeries) private timeSeriesRepository: Repository<TimeSeries>,
    private mailerService: MailerService,
  ) {}

  async subscribe(userId: number, countryIds: number[]) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const subscriptions = await Promise.all(
      countryIds.map(async (countryId) => {
        const country = await this.countryRepository.findOne({ where: { id: countryId } });
        if (!country) throw new Error(`Country not found: ${countryId}`);

        const subscription = this.subRepository.create({ user, country });
        return await this.subRepository.save(subscription);
      }),
    );

    return subscriptions;
  }

  async getSubscriptions(userId: number) {
    return await this.subRepository
      .createQueryBuilder('subscription')
      .leftJoinAndSelect('subscription.country', 'country')
      .leftJoinAndSelect('country.timeseries', 'timeseries')
      .where('subscription.userId = :userId', { userId })
      .orderBy('timeseries.date', 'DESC') 
      .getMany();
  }

  async sendEmailToSubscribers() {
    const subscriptions = await this.subRepository
      .createQueryBuilder('subscription')
      .leftJoinAndSelect('subscription.user', 'user')
      .leftJoinAndSelect('subscription.country', 'country')
      .leftJoin(
        (qb) =>
          qb
            .select('ts.id', 'id')
            .addSelect('ts.countryId', 'countryId')
            .addSelect('ts.date', 'date')
            .addSelect('ts.confirmed', 'confirmed')
            .addSelect('ts.deaths', 'deaths')
            .addSelect('ts.recovered', 'recovered')
            .from(TimeSeries, 'ts')
            .where('ts.date = (SELECT MAX(ts2.date) FROM time_series ts2 WHERE ts2.countryId = ts.countryId)'),
        'latestTimeSeries',
        'latestTimeSeries.countryId = country.id',
      )
      .select(['user.email', 'country.name', 'latestTimeSeries.*'])
      .getRawMany();

    // Group subscriptions by user email
    const userSubscriptions = subscriptions.reduce((acc, sub) => {
      if (!sub.date) return acc; 

      const countryUpdate = `
        <tr>
          <td >${sub.name}</td>
          <td >${sub.date}</td>
          <td >${sub.confirmed}</td>
          <td >${sub.deaths}</td>
          <td >${sub.recovered || 'N/A'}</td>
        </tr>`;

      acc[sub.email] = acc[sub.email] || [];
      acc[sub.email].push(countryUpdate);
      return acc;
    }, {});

    for (const email in userSubscriptions) {
      const htmlContent = `
        <h2>COVID-19 Daily Updates</h2>
        <p>Here are the latest updates for your subscribed countries:</p>
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Date</th>
              <th>Confirmed Cases</th>
              <th>Deaths</th>
              <th>Recovered</th>
            </tr>
          </thead>
          <tbody>
            ${userSubscriptions[email].join('')}
          </tbody>
        </table>
        <br/>
      `;

      await this.mailerService.sendMail({
        to: email,
        subject: 'COVID-19 Daily Update',
        html: htmlContent,
      });
    }
  }

  // Runs at 8 PM every night
  @Cron('0 20 * * *')
  async sendDailyUpdates() {
    console.log('Running daily email updates at 8 PM...');
    await this.sendEmailToSubscribers();
    console.log('Daily email updates sent.');
  }
}
