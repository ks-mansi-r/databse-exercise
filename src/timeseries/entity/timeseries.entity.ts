import { Country } from 'src/country/entity/country.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TimeSeries {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'int' })
  confirmed: number;

  @Column({ type: 'int' })
  deaths: number;

  @Column({ type: 'int',nullable:true })
  recovered: number;

  @ManyToOne(() => Country, (country) => country.timeseries, { onDelete: 'CASCADE' })
  country: Country;
}
