import { TimeSeries } from 'src/timeseries/entity/timeseries.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Subscription } from 'src/subscription/entity/subscription.entity';
@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', unique: true })
  isoCode: string;

  @Column({ type: 'varchar' })
  flag: string;

  @OneToMany(() => TimeSeries, (time) => time.country)
  timeseries: TimeSeries[];

  @OneToMany(() => Subscription, (subscription) => subscription.country)
  subscriptions: Subscription[];
}
