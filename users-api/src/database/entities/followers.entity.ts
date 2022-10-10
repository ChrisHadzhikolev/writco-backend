import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Followers{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  followerId: string;

  @Column()
  followTime: Date;
}
