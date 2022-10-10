import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Follower{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  followerId: string;

  @Column()
  followTime: Date;
}
