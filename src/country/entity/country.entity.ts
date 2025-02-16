import { TimeSeries } from 'src/timeseries/entity/timeseries.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
